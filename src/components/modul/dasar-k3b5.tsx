"use client";

import React from "react";
import { BENDA_DATA, EMOJI_MANIK, NAMA_MANIK, type Anak, type BendaData, type WarnaManik } from "./data-k3b5";

/* ------------------------------------------------------------------------ */
/* Gambar benda nyata Bab 5 (Penyajian Data dalam Tabel): tumpukan benda,      */
/* lidi, dan manik. Hanya untuk tahap Concrete. Tahap Picture dan Abstract     */
/* memakai diagram-k3b5.tsx tanpa gambar benda. Tanpa API.                     */
/* ------------------------------------------------------------------------ */

export function Ikon({ ikon, ukuran = 28 }: { ikon: string; ukuran?: number }) {
  return (
    <span aria-hidden="true" className="inline-block leading-none" style={{ fontSize: ukuran }}>
      {ikon}
    </span>
  );
}

/** Kumpulan benda nyata: n gambar, tersusun lima-lima supaya mudah dihitung. */
export function Kumpulan({ ikon, n, ukuran = 22, label }: { ikon: string; n: number; ukuran?: number; label?: string }) {
  const kolom = Math.min(5, Math.max(1, n));
  return (
    <span className="inline-grid justify-center gap-[2px]" style={{ gridTemplateColumns: `repeat(${kolom}, auto)` }} role="img" aria-label={label ?? `${n} benda`}>
      {Array.from({ length: n }, (_, i) => (
        <Ikon key={i} ikon={ikon} ukuran={ukuran} />
      ))}
    </span>
  );
}

/** Tumpukan benda dari jenis data Bab 5. */
export function TumpukanBenda({ benda, n, ukuran = 22 }: { benda: BendaData; n: number; ukuran?: number }) {
  const b = BENDA_DATA[benda];
  return <Kumpulan ikon={b.emoji} n={n} ukuran={ukuran} label={`${n} ${b.nama}`} />;
}

/** Kartu anak dengan tumpukan bendanya. */
export function KartuAnakBenda({ anak, benda, ukuran = 18, kecil = false }: { anak: Anak; benda: BendaData; ukuran?: number; kecil?: boolean }) {
  const b = BENDA_DATA[benda];
  return (
    <span className={`flex flex-col items-center gap-0.5 rounded-xl border-2 border-[#1C01A5] bg-white ${kecil ? "px-1 py-1" : "px-2 py-1.5"}`}>
      <span className={`font-black text-[#1C01A5] ${kecil ? "text-[10px]" : "text-xs"}`}>{anak.nama}</span>
      <TumpukanBenda benda={benda} n={anak.n} ukuran={ukuran} />
      <span className={`font-black text-[#B45309] ${kecil ? "text-[10px]" : "text-xs"}`}>
        {anak.n} {b.nama}
      </span>
    </span>
  );
}

/** Deretan kartu anak untuk satu soal. */
export function BarisAnakBenda({ anak, benda, ukuran = 16 }: { anak: readonly Anak[]; benda: BendaData; ukuran?: number }) {
  return (
    <span className="flex flex-wrap justify-center gap-2">
      {anak.map((a) => (
        <KartuAnakBenda key={`${a.nama}${a.n}`} anak={a} benda={benda} ukuran={ukuran} kecil />
      ))}
    </span>
  );
}

/** Satu lidi tegak (tanpa emoji Unicode baru agar tampil di Windows 10). */
export function LidiIkon({ tinggi = 22 }: { tinggi?: number }) {
  return (
    <span aria-hidden="true" className="inline-block rounded-sm bg-[#92400E]" style={{ width: Math.max(3, Math.round(tinggi / 7)), height: tinggi }} />
  );
}

/** Tumpukan lidi untuk Concrete B: n batang, tersusun lima-lima. */
export function TumpukanLidi({ n, ukuran = 20 }: { n: number; ukuran?: number }) {
  const kolom = Math.min(5, Math.max(1, n));
  return (
    <span className="inline-grid justify-center gap-[3px]" style={{ gridTemplateColumns: `repeat(${kolom}, auto)` }} role="img" aria-label={`${n} lidi`}>
      {Array.from({ length: n }, (_, i) => (
        <LidiIkon key={i} tinggi={ukuran} />
      ))}
    </span>
  );
}

/** Satu manik berwarna. */
export function Manik({ warna, ukuran = 22 }: { warna: WarnaManik; ukuran?: number }) {
  return <Ikon ikon={EMOJI_MANIK[warna]} ukuran={ukuran} />;
}

/** Deretan manik dari string warna (m/b/h). */
export function DeretManik({ deret, ukuran = 20 }: { deret: string; ukuran?: number }) {
  return (
    <span className="inline-flex flex-wrap justify-center gap-[2px]" role="img" aria-label={`deretan ${deret.length} manik`}>
      {[...deret].map((c, i) => (
        <Manik key={i} warna={c as WarnaManik} ukuran={ukuran} />
      ))}
    </span>
  );
}

/** Kartu anggota dengan banyak manik merah (digambar ulang sebagai manik merah). */
export function KartuAnggotaManik({ anak, ukuran = 16 }: { anak: Anak; ukuran?: number }) {
  return (
    <span className="flex flex-col items-center gap-0.5 rounded-xl border-2 border-[#1C01A5] bg-white px-2 py-1.5">
      <span className="text-xs font-black text-[#1C01A5]">{anak.nama}</span>
      <Kumpulan ikon={EMOJI_MANIK.m} n={anak.n} ukuran={ukuran} label={`${anak.n} manik merah`} />
      <span className="text-[10px] font-black text-[#B45309]">
        {anak.n} {NAMA_MANIK.m}
      </span>
    </span>
  );
}
