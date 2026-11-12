"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B2 Sub-Bab C: titik polos tersusun dalam baris sama banyak, */
/* dengan titik sisa (bila ada) di baris tambahan. Tanpa gambar benda.         */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#FFE566";
const SISA = "#FDBA74";
const JARAK = 13;

/** baris baris, tiap baris berisi q titik. Titik sisa (r) digambar di baris tambahan berwarna lain. */
export function SusunanTitik({ baris, q, r }: { baris: number; q: number; r: number }) {
  const kolom = Math.max(q, r, 1);
  const lebar = kolom * JARAK + 6;
  const tinggi = (baris + (r > 0 ? 1 : 0)) * JARAK + (r > 0 ? 6 : 0) + 6;
  return (
    <svg
      viewBox={`0 0 ${lebar} ${tinggi}`}
      width="100%"
      style={{ maxHeight: 210 }}
      role="img"
      aria-label={`${baris} baris berisi ${q} titik, sisa ${r} titik`}
      className="block"
    >
      {Array.from({ length: baris }, (_, i) =>
        Array.from({ length: q }, (_, j) => <circle key={`${i}-${j}`} cx={6 + j * JARAK} cy={6 + i * JARAK} r={4.8} fill={EMAS} stroke={BIRU} strokeWidth={1.4} />),
      )}
      {Array.from({ length: r }, (_, j) => (
        <circle key={`s${j}`} cx={6 + j * JARAK} cy={12 + baris * JARAK} r={4.8} fill={SISA} stroke={BIRU} strokeWidth={1.4} strokeDasharray="2 1.5" />
      ))}
    </svg>
  );
}
