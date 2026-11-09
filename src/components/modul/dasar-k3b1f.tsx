"use client";

import React from "react";
import { BendaB7 } from "./dasar-k2b7";
import { BENDA_INFO, type BendaId } from "./data-k2b7";
import { KoleksiDari } from "./dasar-k3b1";

/* ------------------------------------------------------------------------ */
/* Benda nyata Sub-Bab E dan F Kelas 3 Bab 1 (tahap Concrete).                   */
/* KurangKoleksi: sebuah kumpulan dikurangi kumpulan yang diambil.              */
/* KelompokBenda: beberapa kelompok (piring) dengan isi yang sama.              */
/* Gambar benda memakai BendaB7 dari bab 7 kelas 2. Tahap Picture memakai       */
/* diagram-k3b1f.tsx tanpa gambar benda.                                        */
/* ------------------------------------------------------------------------ */

/** Dua kumpulan benda dengan tanda kurang di antaranya: ada sebanyak a, diambil sebanyak b (pengurangan, tahap Concrete). */
export function KurangKoleksi({ a, b, benda, ukuran = 30, lebar = "penuh" }: { a: number; b: number; benda: BendaId; ukuran?: number; lebar?: "penuh" | "isi" }) {
  const ringkas = ukuran < 16;
  return (
    <div className={`flex ${lebar === "penuh" ? "w-full" : "w-auto"} items-center justify-center gap-1.5`} role="img" aria-label={`${a} ${BENDA_INFO[benda].nama} diambil ${b}`}>
      <div className="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-2xl border-2 border-[#1C01A5]/30 bg-white px-1 py-1">
        <KoleksiDari n={a} benda={benda} ukuran={ukuran} />
        <span className="text-xs font-black text-[#1C01A5]">{ringkas ? a : `Ada ${a}`}</span>
      </div>
      <span className="text-3xl font-black text-[#1C01A5]">−</span>
      <div className="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-2xl border-2 border-dashed border-[#1C01A5]/40 bg-[#FFF7CC] px-1 py-1">
        <KoleksiDari n={b} benda={benda} ukuran={ukuran} />
        <span className="text-xs font-black text-[#1C01A5]">{ringkas ? b : `Diambil ${b}`}</span>
      </div>
    </div>
  );
}

/** Satu piring berisi n benda, disusun tiga kolom. */
function Piring({ n, benda, ukuran }: { n: number; benda: BendaId; ukuran: number }) {
  const kolom = n <= 3 ? n : n <= 4 ? 2 : 3;
  const kecil = ukuran < 10;
  const sel = ukuran + 2;
  return (
    <span
      className={`inline-grid shrink-0 items-center justify-items-center bg-white border-[#1C01A5]/60 ${kecil ? "rounded-lg border-2 px-0.5 py-0.5" : "rounded-2xl border-[3px] px-1 py-1"}`}
      style={{ gridTemplateColumns: `repeat(${kolom}, ${sel}px)`, width: kolom * sel + (kecil ? 8 : 14) }}
      aria-hidden="true"
    >
      {Array.from({ length: n }, (_, i) => (
        <BendaB7 key={i} id={benda} ukuran={ukuran} />
      ))}
    </span>
  );
}

/** k piring, tiap piring berisi n benda (perkalian sebagai kelompok yang sama banyak, tahap Concrete). */
export function KelompokBenda({ k, n, benda, ukuran = 16 }: { k: number; n: number; benda: BendaId; ukuran?: number }) {
  return (
    <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5" role="img" aria-label={`${k} piring, tiap piring berisi ${n} ${BENDA_INFO[benda].nama}`}>
      {Array.from({ length: k }, (_, i) => (
        <Piring key={i} n={n} benda={benda} ukuran={ukuran} />
      ))}
    </span>
  );
}
