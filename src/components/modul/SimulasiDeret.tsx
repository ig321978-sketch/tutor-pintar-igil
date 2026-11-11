"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA, sebut } from "./simulasi-bersama";
import { BIRU, EMAS, GarisAngka, HIJAU, MERAH, Pengatur, eja } from "./komponen-lab";
import {
  MAKS,
  MIN,
  awalDeret,
  jejakLompatan,
  jendelaUlat,
  kalimatTetangga,
  kalimatUlat,
  kisiBaris,
  maju,
  mulaiDari,
  mundur,
  ringkasan,
  sekarang,
  tetangga,
  titikAwal,
  ucapanDeret,
  urutan,
} from "./lab-deret-bab5";

/* ------------------------------------------------------------------------ */
/* Simulasi "Maju dan Mundur" (Bab 5, Sub-Bab B), metode PhET.                */
/* Satu bilangan bergerak satu langkah ke kanan (maju, satu lebih banyak)     */
/* atau ke kiri (mundur, satu lebih sedikit). Perjalanan yang sama terlihat   */
/* di garis bilangan, urutan, kisi 1 sampai 20, ulat bilangan, dan tetangga.  */
/* Logika di lab-deret-bab5.ts. Tanpa jaringan.                               */
/* ------------------------------------------------------------------------ */

export type TampilDeret = "garis" | "urutan" | "kisi" | "ulat" | "tetangga";
export const SEMUA_TAMPIL_DERET: TampilDeret[] = ["garis", "urutan", "kisi", "ulat", "tetangga"];

const LABEL: Record<TampilDeret, string> = {
  garis: "Garis bilangan",
  urutan: "Urutan",
  kisi: "Kisi 1 sampai 20",
  ulat: "Ulat bilangan",
  tetangga: "Bilangan tetangga",
};

/** Langkah selidik "Coba ini!" yang cocok dengan alat yang tampil. Tanpa kunci jawaban. */
function langkahCoba(tampil: TampilDeret[]): string[] {
  const ada = (k: TampilDeret) => tampil.includes(k);
  const hasil: string[] = [];
  if (ada("garis")) hasil.push("Tekan Maju tiga kali. Panah di garis bilangan bergerak ke kiri atau ke kanan?");
  if (ada("garis") || ada("urutan")) hasil.push("Tekan Mundur tiga kali. Bilangannya jadi lebih banyak atau lebih sedikit?");
  if (ada("kisi")) hasil.push("Ketuk satu kotak di kisi, lalu tekan Maju. Kotak yang menyala bergeser ke kiri atau ke kanan?");
  if (ada("kisi")) hasil.push("Pindah ke kotak paling kanan di satu baris, lalu tekan Maju. Kotak berikutnya ada di baris mana?");
  if (ada("tetangga")) hasil.push("Tekan Maju satu kali. Bilangan sebelumnya sekarang jadi bilangan apa?");
  if (ada("ulat")) hasil.push("Sembunyikan bilangan sekarang. Tebak dulu bilangan yang hilang, lalu buka lagi untuk memeriksa.");
  return hasil.slice(0, 4);
}

export default function SimulasiDeret({ speakGuru, tampil = SEMUA_TAMPIL_DERET }: { speakGuru: (t: string) => void; tampil?: TampilDeret[] }) {
  const [d, setD] = useState(awalDeret);
  const [sembunyi, setSembunyi] = useState(false);
  const [lihatMentah, setLihat] = useState<Record<TampilDeret, boolean>>({ garis: true, urutan: true, kisi: true, ulat: true, tetangga: true });
  const tersedia = SEMUA_TAMPIL_DERET.filter((k) => tampil.includes(k));
  const lihat = (k: TampilDeret) => tampil.includes(k) && lihatMentah[k];
  const n = sekarang(d);
  const awal = titikAwal(d);
  const t = tetangga(n);
  const lompatan = jejakLompatan(d);
  const denganTetangga = tampil.includes("tetangga") || tampil.includes("ulat");
  const coba = langkahCoba(tampil);
  const sembunyiAktif = sembunyi && lihat("ulat");

  const reset = () => {
    setD(awalDeret());
    setSembunyi(false);
    setLihat({ garis: true, urutan: true, kisi: true, ulat: true, tetangga: true });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">{tampil.includes("kisi") ? "Ulat dan Kisi Bilangan" : "Maju dan Mundur"}</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">
            {tampil.includes("kisi") ? "Geser satu bilangan. Lihat tetangganya di kisi dan di ulat." : "Maju satu langkah, atau mundur satu langkah. Lihat bilangannya bergerak."}
          </p>
        </div>
        <TombolSuaraGuru label="Dengarkan perjalanan ini" onClick={() => speakGuru(eja(ucapanDeret(d, denganTetangga)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex items-center justify-center">
          <span key={n} className="igil-muncul flex h-16 min-w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-4xl font-black text-[#1C01A5]" aria-live="polite" aria-label={`Bilangan sekarang ${n}`}>
            {n}
          </span>
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]">{sebut(n)}</p>
        <Pengatur
          nama="Mulai dari"
          nilai={awal}
          onKurang={() => setD(mulaiDari(awal - 1))}
          onTambah={() => setD(mulaiDari(awal + 1))}
          kurangMati={awal <= MIN}
          tambahMati={awal >= MAKS}
        />
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Geser bilangan">
          <button type="button" className={TOMBOL_UTAMA} onClick={() => setD(mundur(d))} aria-label="Mundur satu langkah">
            ⬅ Mundur 1
          </button>
          <button type="button" className={TOMBOL_UTAMA} onClick={() => setD(maju(d))} aria-label="Maju satu langkah">
            Maju 1 ➡
          </button>
        </div>
        <p role="status" className="rounded-xl bg-[#F5F3FF] px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">
          {d.pesan !== "" ? d.pesan : ringkasan(d)}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih tampilan">
          {tersedia.length > 1
            ? tersedia.map((k) => (
                <Cek key={k} aktif={lihatMentah[k]} onKlik={() => setLihat((x) => ({ ...x, [k]: !x[k] }))}>
                  {LABEL[k]}
                </Cek>
              ))
            : null}
          <button type="button" className={TOMBOL_BIASA} onClick={reset}>
            ↺ Reset semua
          </button>
        </div>
      </div>

      {lihat("garis") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Garis bilangan • ketuk angka untuk mulai dari sana</p>
          <GarisAngka
            maks={MAKS}
            nama={`Garis bilangan 0 sampai 20, mulai dari ${awal}, sekarang ${n}`}
            sorot={[n]}
            penanda={[
              { n: awal, warna: BIRU },
              { n, warna: MERAH },
            ]}
            lompatan={lompatan.map((l) => ({ dari: l.dari, ke: l.ke, warna: l.maju ? HIJAU : EMAS }))}
            onPilih={(x) => setD(mulaiDari(x))}
          />
          <p className="text-center text-xs font-bold text-[#1C01A5]/70">Panah hijau: maju. Panah emas: mundur. Titik biru: awal. Titik merah: sekarang.</p>
        </div>
      ) : null}

      {lihat("urutan") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Urutan bilangan yang kamu lewati</p>
          <p className="rounded-xl bg-[#FFF7CC] px-3 py-2 text-center text-xl font-black text-[#1C01A5]">{urutan(d)}</p>
        </div>
      ) : null}

      {lihat("kisi") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Kisi bilangan 1 sampai 20 • ketuk kotak untuk mulai dari sana</p>
          <div className="mx-auto grid max-w-[320px] grid-cols-5 gap-1" role="group" aria-label="Kisi bilangan 1 sampai 20">
            {kisiBaris().flat().map((x) => {
              const sekarangIni = x === n;
              const pernah = d.jejak.includes(x);
              return (
                <button
                  key={x}
                  type="button"
                  aria-label={`Kotak ${x}${sekarangIni ? ", sekarang" : ""}`}
                  onClick={() => setD(mulaiDari(x))}
                  className={`h-11 rounded-lg border-2 text-lg font-black ${
                    sekarangIni ? "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]" : pernah ? "border-[#F0AB00] bg-[#FFF7CC] text-[#1C01A5]" : "border-[#1C01A5]/30 bg-white text-[#1C01A5]"
                  }`}
                >
                  {x}
                </button>
              );
            })}
          </div>
          <p className="text-center text-xs font-bold text-[#1C01A5]/70">Kiri ke kanan: maju. Kanan ke kiri: mundur. Kotak kuning muda: sudah kamu lewati.</p>
        </div>
      ) : null}

      {lihat("ulat") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Ulat bilangan</p>
          <div className="flex items-center justify-center gap-1" role="group" aria-label="Ulat bilangan">
            {jendelaUlat(n).map((x) => (
              <span
                key={x}
                className={`flex h-12 w-12 items-center justify-center rounded-full border-4 text-xl font-black ${x === n ? "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]" : "border-[#16A34A] bg-[#DCFCE7] text-[#14532D]"}`}
              >
                {x === n && sembunyi ? "?" : x}
              </span>
            ))}
          </div>
          <div className="flex justify-center">
            <Cek aktif={sembunyi} onKlik={() => setSembunyi((x) => !x)}>
              Sembunyikan bilangan sekarang
            </Cek>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatUlat(n, sembunyiAktif)}</p>
        </div>
      ) : null}

      {lihat("tetangga") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Bilangan tetangga</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl border-4 border-[#3B82F6] bg-[#DBEAFE] py-2">
              <p className="text-[10px] font-black uppercase text-[#1E3A8A]">Sebelum</p>
              <p className="text-3xl font-black text-[#1C01A5]">{t.sebelum ?? "–"}</p>
            </div>
            <div className="rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] py-2">
              <p className="text-[10px] font-black uppercase text-[#1C01A5]">Sekarang</p>
              <p className="text-3xl font-black text-[#1C01A5]">{n}</p>
            </div>
            <div className="rounded-xl border-4 border-[#EF4444] bg-[#FEE2E2] py-2">
              <p className="text-[10px] font-black uppercase text-[#7F1D1D]">Sesudah</p>
              <p className="text-3xl font-black text-[#1C01A5]">{t.sesudah ?? "–"}</p>
            </div>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTetangga(n)}</p>
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
