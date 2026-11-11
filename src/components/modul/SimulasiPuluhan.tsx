"use client";

import React, { useEffect, useRef, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import type { KeadaanPuluhan } from "./misi-bab5";
import { BendaSvg } from "./data-8-dasar";
import { Cek, CobaIni, KARTU, TOMBOL_BIASA, sebut } from "./simulasi-bersama";
import { BIRU, Bingkai, GarisAngka, KalimatBesar, MERAH, Pengatur, eja } from "./komponen-lab";
import { MAKS, bandingkanNilaiTempat, batas, bisaIkat, kalimatNilai, kalimatSepuluh, ketukBenda, selDuaBingkai, ucapanPuluhan, uraiNilai } from "./lab-puluhan-bab5";

/* ------------------------------------------------------------------------ */
/* Laboratorium Puluhan dan Satuan (Bab 5), metode PhET.                      */
/* Satu bilangan 0 sampai 20 di benda, dua bingkai, kalimat, tabel nilai      */
/* tempat, dan garis bilangan. Logika di lab-puluhan-bab5.ts. Tanpa jaringan. */
/*                                                                            */
/* Di dalam Materi tiap sub-bab hanya menampilkan yang sudah diajarkan:       */
/*  - Sub-Bab A: benda, ikat, bingkai, kalimat sepuluh, garis (tanpa istilah  */
/*    puluhan dan satuan).                                                    */
/*  - Sub-Bab C: benda, ikat, tabel nilai tempat.                             */
/*  - Sub-Bab D: tabel, garis, bandingkan dengan nilai tempat.                */
/* ------------------------------------------------------------------------ */

export type TampilPuluhan = "benda" | "ikat" | "bingkai" | "kalimat" | "tabel" | "garis" | "banding";
export const SEMUA_TAMPIL_PULUHAN: TampilPuluhan[] = ["benda", "ikat", "bingkai", "kalimat", "tabel", "garis", "banding"];

/** Perwakilan yang bisa dinyalakan atau dimatikan (ikat dan banding adalah pengendali, bukan gambar). */
const GAMBAR: { id: Exclude<TampilPuluhan, "ikat" | "banding">; label: string }[] = [
  { id: "benda", label: "Benda" },
  { id: "bingkai", label: "Bingkai" },
  { id: "kalimat", label: "Kalimat" },
  { id: "tabel", label: "Tabel nilai tempat" },
  { id: "garis", label: "Garis bilangan" },
];

/** Langkah selidik "Coba ini!" yang cocok dengan alat yang tampil. Tanpa kunci jawaban. */
function langkahCoba(tampil: TampilPuluhan[]): string[] {
  const ada = (k: TampilPuluhan) => tampil.includes(k);
  const hasil: string[] = [];
  if (ada("benda") && ada("ikat")) {
    hasil.push(ada("tabel") ? "Atur bilangan sampai 10, lalu nyalakan Ikat sepuluh. Apa yang terjadi di tabel?" : "Atur bilangan sampai 10, lalu nyalakan Ikat sepuluh. Apa yang terjadi pada sepuluh benda itu?");
  }
  if (ada("bingkai")) hasil.push("Tambah bilangan sampai lebih dari 10. Bingkai mana yang penuh dulu, dan bingkai mana yang mulai terisi?");
  if (ada("kalimat")) hasil.push("Tambah satu lagi. Lihat kalimat sepuluh ditambah sisanya. Apa yang berubah?");
  if (ada("tabel")) hasil.push("Tambah satu lagi. Apa yang berubah, puluhan atau satuan?");
  if (ada("garis")) hasil.push("Ketuk satu angka di garis bilangan. Letaknya di kiri atau di kanan angka 10?");
  if (ada("banding")) hasil.push("Nyalakan Bandingkan. Lihat mana yang dibandingkan lebih dulu, puluhan atau satuan.");
  return hasil.slice(0, 4);
}

export default function SimulasiPuluhan({
  speakGuru,
  tampil = SEMUA_TAMPIL_PULUHAN,
  onKeadaan,
}: {
  speakGuru: (t: string) => void;
  tampil?: TampilPuluhan[];
  /** Melapor keadaan ke papan misi (bila ada). */
  onKeadaan?: (k: KeadaanPuluhan) => void;
}) {
  const [n, setN] = useState(14);
  const [m, setM] = useState(12);
  const [ikat, setIkat] = useState(false);
  const [banding, setBanding] = useState(false);
  const [lihatMentah, setLihat] = useState<Record<string, boolean>>({ benda: true, bingkai: true, kalimat: true, tabel: true, garis: true });
  const tersedia = GAMBAR.filter((g) => tampil.includes(g.id));
  const lihat = (k: string) => tampil.includes(k as TampilPuluhan) && lihatMentah[k];
  const pakaiPuluhan = tampil.includes("tabel");
  const bolehIkat = tampil.includes("ikat") && tampil.includes("benda");
  const bolehBanding = tampil.includes("banding");
  const u = uraiNilai(n);
  const [bingkai1, bingkai2] = selDuaBingkai(n);
  const kb = bandingkanNilaiTempat(n, m);
  const diikat = bolehIkat && ikat && bisaIkat(n);
  const coba = langkahCoba(tampil);
  const banding2 = bolehBanding && banding;
  const lapor = useRef(onKeadaan);
  lapor.current = onKeadaan;
  const [fBenda, fBingkai, fKalimat, fTabel, fGaris] = (["benda", "bingkai", "kalimat", "tabel", "garis"] as const).map((k) => Boolean(lihat(k)));
  useEffect(() => {
    lapor.current?.({ alat: "puluhan", n, m, ikat: diikat, banding: banding2, benda: fBenda, bingkai: fBingkai, kalimat: fKalimat, tabel: fTabel, garis: fGaris });
  }, [n, m, diikat, banding2, fBenda, fBingkai, fKalimat, fTabel, fGaris]);

  const reset = () => {
    setN(14);
    setM(12);
    setIkat(false);
    setBanding(false);
    setLihat({ benda: true, bingkai: true, kalimat: true, tabel: true, garis: true });
  };

  const blok = (awal: number, jenis: "kelereng-merah" | "kelereng-biru", nama: string) => {
    const adaBungkus = awal === 0 && diikat;
    return (
      <div className={`rounded-2xl px-1.5 py-1.5 ${adaBungkus ? "border-4 border-[#F0AB00] bg-[#FFF7CC]" : "border-2 border-[#1C01A5]/20 bg-white"}`}>
        <p className="mb-1 text-center text-[10px] font-black uppercase tracking-wide text-[#1C01A5]/70">{adaBungkus ? (pakaiPuluhan ? "1 puluhan (diikat)" : "Sepuluh (diikat)") : nama}</p>
        <div className="grid grid-cols-5 gap-1">
          {Array.from({ length: 10 }, (_, k) => {
            const i = awal + k;
            const ada = i < n;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Benda ke-${i + 1}${ada ? "" : ", kosong"}`}
                onClick={() => setN(ketukBenda(n, i))}
                className={`flex flex-col items-center rounded-lg border px-0.5 py-0.5 ${ada ? "border-[#1C01A5]/30 bg-white" : "border-dashed border-[#1C01A5]/20 bg-[#F5F3FF]"}`}
              >
                <span className={ada ? "igil-muncul" : "opacity-15"}>
                  <BendaSvg jenis={jenis} kelas="h-6 w-6" />
                </span>
                <span className={`text-[10px] font-black ${ada ? "text-[#1C01A5]" : "text-[#1C01A5]/25"}`}>{i + 1}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">{pakaiPuluhan ? "Laboratorium Puluhan dan Satuan" : "Laboratorium Bilangan sampai 20"}</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">
            {pakaiPuluhan ? "Atur satu bilangan. Lihat puluhan dan satuannya di semua gambar." : "Atur satu bilangan. Lihat sepuluh dan sisanya di semua gambar."}
          </p>
        </div>
        <TombolSuaraGuru label="Dengarkan bilangan ini" onClick={() => speakGuru(eja(ucapanPuluhan(n, diikat, pakaiPuluhan)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex items-center justify-center">
          <span className="flex h-16 min-w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-4xl font-black text-[#1C01A5]" aria-live="polite" aria-label={`Bilangan ${n}`}>
            {n}
          </span>
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]">{sebut(n)}</p>
        <Pengatur nama="Bilangan" nilai={n} onKurang={() => setN(batas(n - 1))} onTambah={() => setN(batas(n + 1))} kurangMati={n <= 0} tambahMati={n >= MAKS} />
        {banding2 ? <Pengatur nama="Bilangan kedua" nilai={m} warna="#DBEAFE" onKurang={() => setM(batas(m - 1))} onTambah={() => setM(batas(m + 1))} kurangMati={m <= 0} tambahMati={m >= MAKS} /> : null}
        <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih tampilan">
          {tersedia.length > 1
            ? tersedia.map((g) => (
                <Cek key={g.id} aktif={lihatMentah[g.id]} onKlik={() => setLihat((x) => ({ ...x, [g.id]: !x[g.id] }))}>
                  {g.label}
                </Cek>
              ))
            : null}
          {bolehIkat ? (
            <Cek aktif={ikat} onKlik={() => setIkat((x) => !x)}>
              Ikat sepuluh
            </Cek>
          ) : null}
          {bolehBanding ? (
            <Cek aktif={banding} onKlik={() => setBanding((x) => !x)}>
              Bandingkan
            </Cek>
          ) : null}
        </div>
        {bolehIkat && ikat && !bisaIkat(n) ? (
          <p role="status" className="rounded-xl bg-[#F5F3FF] px-3 py-1 text-center text-xs font-black text-[#1C01A5]">
            Belum ada sepuluh benda untuk diikat. Tambah bilangannya sampai 10.
          </p>
        ) : null}
        <div className="flex justify-center">
          <button type="button" className={TOMBOL_BIASA} onClick={reset}>
            ↺ Reset semua
          </button>
        </div>
      </div>

      {lihat("benda") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Benda • ketuk benda untuk mengatur</p>
          <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2">
            {blok(0, "kelereng-merah", "Sepuluh pertama")}
            {blok(10, "kelereng-biru", "Sepuluh berikutnya")}
          </div>
        </div>
      ) : null}

      {lihat("bingkai") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Dua bingkai sepuluh</p>
          <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2">
            <Bingkai sel={bingkai1} nama={`Bingkai pertama: ${Math.min(n, 10)} terisi`} />
            <Bingkai sel={bingkai2} nama={`Bingkai kedua: ${Math.max(0, n - 10)} terisi`} />
          </div>
        </div>
      ) : null}

      {lihat("kalimat") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Sepuluh dulu, lalu sisanya</p>
          <KalimatBesar teks={kalimatSepuluh(n)} warna="bg-[#FFE566]" />
        </div>
      ) : null}

      {lihat("tabel") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tabel nilai tempat</p>
          <div className="mx-auto grid w-full max-w-[280px] grid-cols-2 overflow-hidden rounded-xl border-4 border-[#1C01A5]" role="table" aria-label="Tabel nilai tempat">
            <p role="columnheader" className="bg-[#FEE2E2] py-1 text-center text-sm font-black text-[#7F1D1D]">Puluhan</p>
            <p role="columnheader" className="bg-[#DBEAFE] py-1 text-center text-sm font-black text-[#1E3A8A]">Satuan</p>
            <p role="cell" className="border-t-4 border-[#1C01A5] py-2 text-center text-4xl font-black text-[#1C01A5]">{u.puluhan}</p>
            <p role="cell" className="border-l-4 border-t-4 border-[#1C01A5] py-2 text-center text-4xl font-black text-[#1C01A5]">{u.satuan}</p>
          </div>
          <KalimatBesar teks={kalimatNilai(n)} warna="bg-[#FFE566]" />
        </div>
      ) : null}

      {lihat("garis") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Garis bilangan 0 sampai 20 • ketuk angka untuk mengatur</p>
          <GarisAngka
            maks={MAKS}
            nama={`Garis bilangan 0 sampai 20, bilangan pertama ${n}${banding2 ? `, bilangan kedua ${m}` : ""}`}
            sorot={[10, n]}
            penanda={[{ n, warna: MERAH }, ...(banding2 ? [{ n: m, warna: BIRU }] : [])]}
            onPilih={(x) => setN(batas(x))}
          />
          <p className="text-center text-xs font-bold text-[#1C01A5]/70">Lingkaran emas besar menandai 10 dan bilanganmu.</p>
        </div>
      ) : null}

      {banding2 ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Membandingkan dengan nilai tempat</p>
          <KalimatBesar teks={`${n} ${kb.simbol} ${m}`} warna="bg-[#FFE566]" />
          <p className="text-center text-sm font-black text-[#1C01A5]">{kb.alasan}</p>
        </div>
      ) : null}

      {coba.length > 0 ? (
        <CobaIni
          judul="Coba ini!"
          onDengar={() => speakGuru(eja(`Coba ini. ${coba.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${c}`).join(" ")}`))}
          langkah={coba}
        />
      ) : null}
    </div>
  );
}
