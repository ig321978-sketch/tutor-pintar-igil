"use client";

import React, { useMemo } from "react";
import type { LangkahPeta } from "./PetaPikiranB";
import { SUB_A3, SUB_B3, SUB_C3 } from "./naskah-k2b3";
import { BIRU, WARNA_BENTUK } from "./dasar-k2b3";
import { jalurTitik, pusatPoligon, uraiBangun, type Ruas, type Titik } from "./data-k2b3";

/* ------------------------------------------------------------------------ */
/* Kerangka bersama Kelas 2 Bab 3: peta pikiran dari naskah dan gambar kecil    */
/* bangun terurai untuk poster Infografis. Isi teks hanya ada di naskah-k2b3.ts.*/
/* Poster dan halaman Poin Penting memakai kit-k2b2 (satu bentuk untuk semua).  */
/* ------------------------------------------------------------------------ */

export const PETA_PIKIRAN_K2B3A: LangkahPeta[] = SUB_A3.mindMaps;
export const PETA_PIKIRAN_K2B3B: LangkahPeta[] = SUB_B3.mindMaps;
export const PETA_PIKIRAN_K2B3C: LangkahPeta[] = SUB_C3.mindMaps;

const WARNA_KEPING = ["#FCA5A5", "#93C5FD", "#86EFAC", "#FDE68A", "#C4B5FD", "#FDBA74", "#A5F3FC", "#F9A8D4"];

/** Gambar diam bangun datar dengan garis pengurai. Keping diwarnai, garis tebal. */
export function FiguraUrai({ titik, batas, ruas, kelas = "h-24 w-24", label, jarak = 0 }: { titik: readonly Titik[]; batas: number; ruas: readonly Ruas[]; kelas?: string; label: string; jarak?: number }) {
  const hasil = useMemo(() => uraiBangun(titik, batas, ruas), [titik, batas, ruas]);
  const [gx, gy] = pusatPoligon(titik.slice(0, batas));
  return (
    <svg viewBox="-6 -6 112 112" className={kelas} role="img" aria-label={label}>
      {hasil.keping.map((k, i) => {
        const pts = k.simpul.map((s) => titik[s]);
        const [cx, cy] = pusatPoligon(pts);
        const dx = hasil.keping.length > 1 ? (cx - gx) * jarak : 0;
        const dy = hasil.keping.length > 1 ? (cy - gy) * jarak : 0;
        return <path key={i} d={jalurTitik(pts)} fill={WARNA_KEPING[i % WARNA_KEPING.length]} stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" transform={`translate(${dx} ${dy})`} />;
      })}
      {ruas.map((r) => (
        <line key={`${r[0]}-${r[1]}`} x1={titik[r[0]][0]} y1={titik[r[0]][1]} x2={titik[r[1]][0]} y2={titik[r[1]][1]} stroke={BIRU} strokeWidth="3.2" strokeLinecap="round" />
      ))}
    </svg>
  );
}

/** Kotak kecil berisi gambar dan keterangan pendek untuk poster. */
export function KotakKecil({ children, ket, warna = "#FFFFFF" }: { children: React.ReactNode; ket: string; warna?: string }) {
  return (
    <div className="flex flex-col items-center justify-between gap-0.5 rounded-2xl border-4 border-[#1C01A5] px-1 py-1.5 text-center" style={{ backgroundColor: warna }}>
      {children}
      <p className="text-[11px] font-black leading-tight text-[#1C01A5]">{ket}</p>
    </div>
  );
}

export { WARNA_BENTUK };
