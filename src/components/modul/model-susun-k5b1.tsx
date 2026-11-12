"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B1 Sub-Bab C: kartu berupa persegi polos dan kartu suku.    */
/* Tumpukan kartu menunjukkan banyak kartu tiap jenis.     */
/* Tanpa gambar benda.                                                         */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
/** Warna kartu 10.000, 1.000, 100, 10, dan 1. */
export const WARNA_KARTU_K5B1 = ["#C4B5FD", "#FDE68A", "#86EFAC", "#93C5FD", "#F9A8D4"];

/** Tumpukan persegi polos, lima per baris. */
export function TumpukKartu({ n, warna }: { n: number; warna: string }) {
  const baris = Math.max(1, Math.ceil(n / 5));
  return (
    <svg viewBox={`0 0 50 ${baris * 10}`} width={40} height={baris * 8} role="img" aria-label={`${n} kartu`} className="block">
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={1 + (i % 5) * 9.6} y={1 + Math.floor(i / 5) * 9.6} width={8} height={8} rx={1.5} fill={warna} stroke={BIRU} strokeWidth={1.2} />
      ))}
    </svg>
  );
}

/** Kartu suku yang bisa dipilih (nilai bertitik). */
export function KartuSuku({ teks, aktif, onKlik, label }: { teks: string; aktif: boolean; onKlik: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={aktif}
      onClick={onKlik}
      className={`min-h-11 min-w-16 rounded-xl border-4 px-2 text-base font-black text-[#1C01A5] ${aktif ? "border-[#F0AB00] bg-[#FFE566] ring-4 ring-[#FFE566]/60" : "border-[#1C01A5] bg-white"}`}
    >
      {teks}
    </button>
  );
}
