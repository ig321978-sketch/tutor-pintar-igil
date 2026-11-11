"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import {
  BLOK,
  NAMA_ATURAN,
  SEMUA_ATURAN,
  ciriBlok,
  kalimatJumlah,
  kalimatKelompok,
  kelompokBlok,
  kelompokkan,
  namaBlok,
  nilaiBlok,
  ucapanBlok,
  ucapanKelompok,
  type Aturan,
  type Blok,
} from "./lab-kelompok-bab4";

/**
 * Perwakilan yang boleh tampil. Di dalam Materi, Simulasi 1 hanya memakai `benda` dan `tabel` (satu aturan, hitung
 * anggota). Simulasi 2 memakai `benda`, `ciri`, dan `kalimat` (satu balok, banyak kelompok, jumlah semuanya).
 */
export type TampilKelompok = "benda" | "tabel" | "kalimat" | "ciri";
export const SEMUA_TAMPIL_KELOMPOK: TampilKelompok[] = ["benda", "tabel", "kalimat", "ciri"];

const LABEL_TAMPIL: Record<TampilKelompok, string> = {
  benda: "Nampan",
  tabel: "Tabel hitung",
  kalimat: "Kalimat jumlah",
  ciri: "Ciri balok",
};

const WARNA_ISI: Record<string, string> = { merah: "#EF4444", biru: "#3B82F6", kuning: "#FACC15" };

/** Langkah selidik "Coba ini!" yang cocok dengan perwakilan yang tampil. Tanpa kunci jawaban. */
function langkahCoba(tampil: TampilKelompok[]): string[] {
  const ada = (k: TampilKelompok) => tampil.includes(k);
  const hasil: string[] = [];
  if (ada("benda")) hasil.push("Ketuk Bentuk, lalu Warna, lalu Ukuran. Apakah balok yang sama pindah nampan?");
  if (ada("tabel")) hasil.push("Lihat tabel hitung. Berapa balok di tiap kelompok? Berapa semuanya?");
  if (ada("ciri")) hasil.push("Ketuk satu balok. Lihat tiga cirinya dan tiga kelompoknya.");
  if (ada("kalimat")) hasil.push("Ganti aturannya. Apakah jumlah semuanya ikut berubah?");
  return hasil.slice(0, 4);
}

const KATA_URUT = ["Satu", "Dua", "Tiga", "Empat"];

/** Satu balok: bentuk (lengkung, segitiga, segi empat), warna, dan ukuran (besar atau kecil). */
export function BlokSvg({ b, kelas = "h-10 w-10" }: { b: Blok; kelas?: string }) {
  const r = b.ukuran === "besar" ? 16 : 10;
  const isi = WARNA_ISI[b.warna];
  return (
    <svg viewBox="0 0 40 40" className={kelas} aria-hidden="true">
      {b.bentuk === "lengkung" ? <circle cx="20" cy="20" r={r} fill={isi} stroke="#1C01A5" strokeWidth="2" /> : null}
      {b.bentuk === "segitiga" ? <polygon points={`20,${20 - r} ${20 + r},${20 + r * 0.85} ${20 - r},${20 + r * 0.85}`} fill={isi} stroke="#1C01A5" strokeWidth="2" strokeLinejoin="round" /> : null}
      {b.bentuk === "segiempat" ? <rect x={20 - r} y={20 - r} width={r * 2} height={r * 2} fill={isi} stroke="#1C01A5" strokeWidth="2" strokeLinejoin="round" /> : null}
    </svg>
  );
}

/* ------------------------------------------------------------------------ */
/* Simulasi (Bab 4, Sub-Bab B): Laboratorium Kelompok, metode PhET.           */
/* Aturan diganti, balok yang sama pindah kelompok. Logika di                 */
/* lab-kelompok-bab4.ts. Tanpa jaringan.                                      */
/* ------------------------------------------------------------------------ */

export default function SimulasiKelompok({
  speakGuru,
  tampil = SEMUA_TAMPIL_KELOMPOK,
}: {
  speakGuru: (t: string) => void;
  /** Perwakilan yang tersedia. Bawaan: semuanya. */
  tampil?: TampilKelompok[];
}) {
  const [aturan, setAturan] = useState<Aturan>("bentuk");
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [lihatMentah, setLihat] = useState<Record<TampilKelompok, boolean>>({ benda: true, tabel: true, kalimat: true, ciri: true });

  const tersedia = SEMUA_TAMPIL_KELOMPOK.filter((k) => tampil.includes(k));
  const lihat = (k: TampilKelompok) => tampil.includes(k) && lihatMentah[k];
  const bisaDiatur = tersedia.length > 1;
  const coba = langkahCoba(tampil);

  const kelompok = kelompokkan(aturan);
  const blok = BLOK.find((b) => b.id === terpilih) ?? null;
  const idKelompokBlok = blok ? nilaiBlok(blok, aturan) : null;
  const ucapan = blok && tampil.includes("ciri") ? ucapanBlok(blok, aturan) : ucapanKelompok(aturan);

  const reset = () => {
    setAturan("bentuk");
    setTerpilih(null);
    setLihat({ benda: true, tabel: true, kalimat: true, ciri: true });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Kelompok</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Pilih satu aturan. Lihat balok yang sama masuk ke nampan yang berbeda.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kelompok ini" onClick={() => speakGuru(ucapan)} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Aturan pengelompokan</p>
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih aturan">
          {SEMUA_ATURAN.map((a) => (
            <Pilihan key={a} aktif={aturan === a} onKlik={() => setAturan(a)}>
              {NAMA_ATURAN[a]}
            </Pilihan>
          ))}
        </div>
        {bisaDiatur ? (
          <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih tampilan">
            {tersedia.map((k) => (
              <Cek key={k} aktif={lihatMentah[k]} onKlik={() => setLihat((x) => ({ ...x, [k]: !x[k] }))}>
                {LABEL_TAMPIL[k]}
              </Cek>
            ))}
          </div>
        ) : null}
        <div className="flex justify-center">
          <button type="button" className={TOMBOL_BIASA} onClick={reset}>
            ↺ Reset semua
          </button>
        </div>
      </div>

      {lihat("benda") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Nampan menurut {NAMA_ATURAN[aturan].toLowerCase()} • ketuk balok</p>
          <div className={`grid gap-2 ${kelompok.length === 2 ? "grid-cols-2" : "grid-cols-3"}`} role="group" aria-label={`Nampan menurut ${NAMA_ATURAN[aturan].toLowerCase()}`}>
            {kelompok.map((k) => (
              <div key={k.id} className={`rounded-2xl border-2 p-1.5 ${idKelompokBlok === k.id ? "border-[#F0AB00] bg-[#FFFDF2]" : "border-[#1C01A5]/30 bg-[#F5F3FF]"}`} role="group" aria-label={`Nampan ${k.nama.toLowerCase()}`}>
                <p className="text-center text-xs font-black text-[#1C01A5]">{k.nama}</p>
                <div className="mt-1 flex min-h-[3rem] flex-wrap items-center justify-center gap-1">
                  {k.anggota.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      aria-label={`${namaBlok(b)}${terpilih === b.id ? ", dipilih" : ""}`}
                      aria-pressed={terpilih === b.id}
                      onClick={() => setTerpilih(terpilih === b.id ? null : b.id)}
                      className={`flex h-11 w-11 items-center justify-center rounded-lg border-2 bg-white transition-transform ${terpilih === b.id ? "scale-110 border-[#F0AB00] ring-2 ring-[#F0AB00]" : "border-[#1C01A5]/30"}`}
                    >
                      <BlokSvg b={b} />
                    </button>
                  ))}
                  {k.jumlah === 0 ? <span className="text-xs font-bold text-[#1C01A5]/50">kosong</span> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {lihat("tabel") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tabel hitung</p>
          <table className="w-full border-collapse text-center text-base font-black text-[#1C01A5]" aria-label="Tabel banyak balok tiap kelompok">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-[#1C01A5]/70">
                <th className="border-b-2 border-[#1C01A5]/30 py-1">{NAMA_ATURAN[aturan]}</th>
                <th className="border-b-2 border-[#1C01A5]/30 py-1">Banyak balok</th>
              </tr>
            </thead>
            <tbody>
              {kelompok.map((k) => (
                <tr key={k.id} className={idKelompokBlok === k.id ? "bg-[#FFF7CC]" : ""}>
                  <td className="border-b border-[#1C01A5]/15 py-1">{k.nama}</td>
                  <td className="border-b border-[#1C01A5]/15 py-1 text-2xl">{k.jumlah}</td>
                </tr>
              ))}
              <tr className="bg-[#E8F7EE]">
                <td className="py-1">Semua</td>
                <td className="py-1 text-2xl">{kelompok.reduce((s, k) => s + k.jumlah, 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}

      {lihat("ciri") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Ciri balok</p>
          {blok ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <BlokSvg b={blok} kelas="h-14 w-14" />
                <p className="text-base font-black text-[#1C01A5]">{namaBlok(blok)}</p>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center" role="list" aria-label="Kelompok balok menurut tiga aturan">
                {kelompokBlok(blok).map((k) => (
                  <p key={k.aturan} role="listitem" className={`rounded-xl px-1 py-1.5 text-sm font-black ${k.aturan === aturan ? "bg-[#FFF7CC] text-[#1C01A5]" : "bg-[#F5F3FF] text-[#1C01A5]"}`}>
                    <span className="block text-xs uppercase tracking-wide text-[#1C01A5]/70">{NAMA_ATURAN[k.aturan]}</span>
                    {ciriBlok(blok)[k.aturan]}
                    <span className="block text-xs font-bold text-[#1C01A5]/70">kelompok ada {k.jumlah}</span>
                  </p>
                ))}
              </div>
              <p className="text-center text-sm font-black text-[#14532D]">Satu balok bisa masuk kelompok yang berbeda. Semuanya tergantung aturannya.</p>
            </div>
          ) : (
            <p className="text-center text-sm font-black text-[#1C01A5]/60">Ketuk satu balok untuk melihat tiga cirinya.</p>
          )}
        </div>
      ) : null}

      {lihat("kalimat") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Kalimat jumlah</p>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatKelompok(aturan)}</p>
          <KalimatBesar teks={kalimatJumlah(aturan)} warna="bg-[#FFE566]" />
        </div>
      ) : null}

      <CobaIni
        judul="Coba ini!"
        onDengar={() => speakGuru(`Coba ini. ${coba.map((l, i) => `${KATA_URUT[i]}, ${l}`).join(" ")}`)}
        langkah={coba}
      />
    </div>
  );
}
