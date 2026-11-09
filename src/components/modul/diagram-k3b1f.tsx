"use client";

import React from "react";
import { KartuModel } from "./diagram-k3b1";

/* ------------------------------------------------------------------------ */
/* Diagram Sub-Bab E dan F Kelas 3 Bab 1 (tahap Picture dan Abstract).           */
/* KurangModel: dua model blok dengan tanda kurang.                             */
/* TitikKotak: kotak-kotak berisi titik polos sama banyak.                      */
/* Tanpa gambar benda, tanpa emoji. Titik merah menandai yang ada.              */
/* ------------------------------------------------------------------------ */

/** Dua model blok dengan tanda kurang di antaranya (pengurangan, tahap Picture). */
export function KurangModel({ a, b, skala = 0.8, lebar = "penuh" }: { a: number; b: number; skala?: number; lebar?: "penuh" | "isi" }) {
  return (
    <div className={`flex ${lebar === "penuh" ? "w-full" : "w-auto"} items-center justify-center gap-1.5`} role="img" aria-label={`Model ${a} dikurangi model ${b}`}>
      <div className="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-2xl border-2 border-[#1C01A5]/30 bg-white px-1 py-1">
        <KartuModel n={a} skala={skala} />
        <span className="text-xs font-black text-[#1C01A5]">{a}</span>
      </div>
      <span className="text-3xl font-black text-[#1C01A5]">−</span>
      <div className="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-2xl border-2 border-dashed border-[#1C01A5]/40 bg-[#FFF7CC] px-1 py-1">
        <KartuModel n={b} skala={skala} />
        <span className="text-xs font-black text-[#1C01A5]">{b}</span>
      </div>
    </div>
  );
}

/** Satu kotak berisi n titik polos. */
function Kotak({ n, ukuran }: { n: number; ukuran: number }) {
  const kolom = n <= 3 ? n : n <= 4 ? 2 : n <= 6 ? 3 : 4;
  const kecil = ukuran < 8;
  const sel = ukuran + (kecil ? 2 : 3);
  return (
    <span
      className={`inline-grid shrink-0 items-center justify-items-center rounded-lg bg-white ${kecil ? "border-2 px-0.5 py-0.5" : "rounded-xl border-[3px] px-1 py-1"} border-[#1C01A5]`}
      style={{ gridTemplateColumns: `repeat(${kolom}, ${sel}px)`, width: kolom * sel + (kecil ? 8 : 14) }}
      aria-hidden="true"
    >
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className={`block rounded-full border-[#1C01A5] bg-[#F87171] ${kecil ? "border" : "border-2"}`} style={{ width: ukuran, height: ukuran }} />
      ))}
    </span>
  );
}

/** Satu kotak besar berisi n titik polos (bahan yang akan dibagi, tahap Picture), disusun paling banyak sepuluh per baris. */
export function TitikBanyak({ n, ukuran = 11 }: { n: number; ukuran?: number }) {
  const kolom = Math.min(Math.max(n, 1), 10);
  const sel = ukuran + 3;
  return (
    <span className="inline-grid shrink-0 items-center justify-items-center rounded-xl border-[3px] border-[#1C01A5] bg-white px-1.5 py-1.5" style={{ gridTemplateColumns: `repeat(${kolom}, ${sel}px)` }} role="img" aria-label={`Kotak berisi ${n} titik`}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="block rounded-full border-2 border-[#1C01A5] bg-[#F87171]" style={{ width: ukuran, height: ukuran }} />
      ))}
    </span>
  );
}

/** k kotak kosong bergaris putus yang menunggu pembagian (tahap Picture). */
export function KotakKosong({ k }: { k: number }) {
  return (
    <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5" role="img" aria-label={`${k} kotak kosong`}>
      {Array.from({ length: k }, (_, i) => (
        <span key={i} className="inline-block h-9 w-12 rounded-lg border-[3px] border-dashed border-[#1C01A5]/60 bg-white" aria-hidden="true" />
      ))}
    </span>
  );
}

/** Awal pembagian pada diagram: sebuah kotak berisi t titik dan g kotak kosong. */
export function BagiTitik({ t, g, ukuran = 10 }: { t: number; g: number; ukuran?: number }) {
  return (
    <div className="flex w-full flex-col items-center gap-1.5">
      <TitikBanyak n={t} ukuran={ukuran} />
      <span className="text-xs font-black text-[#1C01A5]">dibagi sama banyak ke {g} kotak</span>
      <KotakKosong k={g} />
    </div>
  );
}

/** k kotak, tiap kotak berisi n titik (perkalian sebagai kelompok titik, tahap Picture). */
export function TitikKotak({ k, n, ukuran = 11 }: { k: number; n: number; ukuran?: number }) {
  return (
    <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5" role="img" aria-label={`${k} kotak, tiap kotak berisi ${n} titik`}>
      {Array.from({ length: k }, (_, i) => (
        <Kotak key={i} n={n} ukuran={ukuran} />
      ))}
    </span>
  );
}
