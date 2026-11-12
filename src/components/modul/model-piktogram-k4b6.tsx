"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K4B6 Sub-Bab A: simbol lingkaran polos dan turus (garis).     */
/* Tanpa gambar benda: piktogram cukup bentuk polos sesuai batas concrete.    */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";

/** Satu simbol lingkaran polos. */
export function Simbol({ ukuran = 18, isi = "#FFE566" }: { ukuran?: number; isi?: string }) {
  return (
    <svg viewBox="0 0 20 20" width={ukuran} height={ukuran} aria-hidden="true" className="block shrink-0">
      <circle cx="10" cy="10" r="8" fill={isi} stroke={BIRU} strokeWidth="2.4" />
    </svg>
  );
}

/** Deretan simbol satu baris piktogram. */
export function DeretSimbol({ n, ukuran = 18 }: { n: number; ukuran?: number }) {
  return (
    <span className="flex min-h-5 flex-wrap items-center gap-0.5" role="img" aria-label={`${n} simbol`}>
      {Array.from({ length: n }, (_, i) => (
        <Simbol key={i} ukuran={ukuran} />
      ))}
    </span>
  );
}

/** Turus: tiap kelompok lima berupa empat garis dan satu garis miring. */
export function TurusK4B6({ n, ukuran = 22 }: { n: number; ukuran?: number }) {
  const kelompok = Math.max(1, Math.ceil(n / 5));
  const lebarKel = 27;
  const lebar = kelompok * lebarKel;
  return (
    <svg viewBox={`0 0 ${lebar} 24`} style={{ height: ukuran, width: (lebar * ukuran) / 24 }} className="block shrink-0" role="img" aria-label={`Turus ${n}`}>
      {Array.from({ length: kelompok }, (_, g) => {
        const sisa = Math.min(5, n - g * 5);
        const x0 = g * lebarKel + 4;
        return (
          <g key={g} stroke={BIRU} strokeWidth="2.4" strokeLinecap="round">
            {Array.from({ length: Math.min(4, Math.max(sisa, 0)) }, (_, i) => (
              <path key={i} d={`M${x0 + i * 5.4} 3 V21`} />
            ))}
            {sisa >= 5 ? <path d={`M${x0 - 3} 17 L${x0 + 19} 6`} stroke={EMAS} /> : null}
          </g>
        );
      })}
    </svg>
  );
}

/** Keterangan piktogram: satu simbol mewakili berapa. */
export function Keterangan({ skala, satuan }: { skala: number; satuan: string }) {
  return (
    <p className="flex items-center justify-center gap-1 text-sm font-black text-[#1C01A5]">
      <Simbol ukuran={18} /> = {skala} {satuan}
    </p>
  );
}

/** Piktogram jadi: label tiap baris dan deretan simbolnya. */
export function Piktogram({ judul, baris, skala, satuan }: { judul: string; baris: { label: string; n: number }[]; skala: number; satuan: string }) {
  return (
    <div className="space-y-1 rounded-xl border-2 border-[#1C01A5]/40 bg-white p-2">
      <p className="text-center text-sm font-black text-[#1C01A5]">{judul}</p>
      {baris.map((b) => (
        <div key={b.label} className="grid grid-cols-[4.5rem_1fr] items-center gap-2 border-t border-[#1C01A5]/15 pt-1">
          <span className="text-xs font-black text-[#1C01A5]">{b.label}</span>
          <DeretSimbol n={b.n} />
        </div>
      ))}
      <Keterangan skala={skala} satuan={satuan} />
    </div>
  );
}
