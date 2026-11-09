"use client";

import React from "react";
import { DATA, kat, type IdData } from "./data-k2b8";

/* ------------------------------------------------------------------------ */
/* Gambar benda nyata Bab 8 (Berbagai Diagram): emoji benda dari data buku.    */
/* Hanya untuk tahap Concrete. Tahap Picture dan Abstract memakai              */
/* diagram-k2b8.tsx yang tidak memuat gambar benda. Tanpa API.                  */
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

/** Kumpulan benda dari satu kategori data. */
export function KumpulanData({ set, id, ukuran = 22 }: { set: IdData; id: string; ukuran?: number }) {
  const k = kat(set, id);
  return <Kumpulan ikon={k.ikon} n={k.n} ukuran={ukuran} label={`${k.n} ${k.nama}`} />;
}

/** Satu baris gambar benda sebagai lambang diagram gambar (satu benda, satu gambar). */
export function BarisIkon({ ikon, n, ukuran = 20 }: { ikon: string; n: number; ukuran?: number }) {
  return (
    <span className="flex flex-wrap items-center gap-[2px]" role="img" aria-label={`${n} gambar`}>
      {Array.from({ length: n }, (_, i) => (
        <Ikon key={i} ikon={ikon} ukuran={ukuran} />
      ))}
    </span>
  );
}

/** Semua kategori sebuah data, masing-masing satu kumpulan, dengan nama di bawahnya. */
export function SemuaKumpulan({ set, ukuran = 18 }: { set: IdData; ukuran?: number }) {
  return (
    <span className="grid grid-cols-2 gap-2">
      {DATA[set].kategori.map((k) => (
        <span key={k.id} className="flex flex-col items-center gap-0.5 rounded-xl bg-white/80 px-1 py-1">
          <Kumpulan ikon={k.ikon} n={k.n} ukuran={ukuran} />
          <span className="text-[10px] font-black text-[#1C01A5]">{k.nama}</span>
        </span>
      ))}
    </span>
  );
}
