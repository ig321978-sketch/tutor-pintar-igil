"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B1 Sub-Bab A: tabel nilai tempat enam kolom dengan titik     */
/* polos (banyak titik = digit) dan kartu digit. Tanpa gambar benda.           */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
/** Warna kolom dari ratus ribuan sampai satuan. */
export const WARNA_TEMPAT_K5B1 = ["#C4B5FD", "#FCA5A5", "#FDE68A", "#86EFAC", "#93C5FD", "#F9A8D4"];
/** Nama singkat dua baris untuk kepala kolom (layar sempit). */
export const KEPALA_TEMPAT_K5B1: [string, string][] = [
  ["ratus", "ribuan"],
  ["puluh", "ribuan"],
  ["", "ribuan"],
  ["", "ratusan"],
  ["", "puluhan"],
  ["", "satuan"],
];

/** Titik polos sebanyak digit (0 sampai 9), tersusun tiga per baris. */
export function TitikDigit({ n, warna }: { n: number; warna: string }) {
  return (
    <svg viewBox="0 0 36 36" width={36} height={36} role="img" aria-label={`${n} titik`} className="block">
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={6 + (i % 3) * 12} cy={6 + Math.floor(i / 3) * 12} r={4.6} fill={warna} stroke={BIRU} strokeWidth={1.6} />
      ))}
    </svg>
  );
}

/** Satu kartu digit, bisa dipilih. */
export function KartuDigit({ d, aktif, warna, onKlik, label }: { d: number; aktif: boolean; warna: string; onKlik: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={aktif}
      onClick={onKlik}
      className={`h-14 w-11 shrink-0 rounded-xl border-4 text-2xl font-black text-[#1C01A5] ${aktif ? "border-[#F0AB00] ring-4 ring-[#FFE566]" : "border-[#1C01A5]"}`}
      style={{ background: warna }}
    >
      {d}
    </button>
  );
}
