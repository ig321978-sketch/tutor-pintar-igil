"use client";

import React from "react";
import { SimbolSvg, Turus } from "./data-8-dasar";
import type { Lambang } from "./lab-data-k2b8";

/* ------------------------------------------------------------------------ */
/* Potongan tampilan bersama alat simulasi Kelas 2 Bab 8 (Berbagai Diagram). */
/* Hanya tampilan: logika ada di lab-data-k2b8.ts.                            */
/* ------------------------------------------------------------------------ */

export const TOMBOL_JAWAB =
  "min-h-12 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-2 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5";

/** Satu lambang diagram: bintang, lingkaran, hati, atau wajah tersenyum. Tanpa gambar benda. */
export function LambangSvg({ jenis, warna = "#FACC15", kelas = "h-6 w-6" }: { jenis: Lambang; warna?: string; kelas?: string }) {
  if (jenis === "hati") {
    return (
      <svg viewBox="-12 -12 24 24" className={`block shrink-0 ${kelas}`} aria-hidden="true">
        <path d="M0 9 C-13 0 -10 -9 -5 -9 C-2 -9 0 -6.5 0 -5 C0 -6.5 2 -9 5 -9 C10 -9 13 0 0 9 Z" fill={warna} stroke="#1C01A5" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  return <SimbolSvg jenis={jenis === "lingkaran" ? "bulat" : jenis === "senyum" ? "wajah" : "bintang"} warna={warna} kelas={kelas} />;
}

/** Satu baris lambang yang sama bentuk dan ukuran, rapat tanpa celah. */
export function BarisLambang({ n, jenis, warna, kelas = "h-6 w-6" }: { n: number; jenis: Lambang; warna: string; kelas?: string }) {
  return (
    <span className="flex flex-wrap items-center gap-0.5" role="img" aria-label={`${n} gambar`}>
      {Array.from({ length: n }, (_, i) => (
        <LambangSvg key={i} jenis={jenis} warna={warna} kelas={kelas} />
      ))}
    </span>
  );
}

/** Turus. Dengan kelompok lima: empat garis dicoret garis miring. Tanpa kelompok lima: garis berjajar biasa. */
export function TurusBaris({ n, kelompok, tinggi = 22, warna = "#1C01A5" }: { n: number; kelompok: boolean; tinggi?: number; warna?: string }) {
  if (n <= 0) return null;
  if (kelompok) return <Turus n={n} tinggi={tinggi} warna={warna} />;
  const lebar = n * 6 + 6;
  return (
    <svg viewBox={`0 0 ${lebar} 24`} style={{ height: tinggi, width: (lebar * tinggi) / 24 }} className="block shrink-0" role="img" aria-label={`${n} garis berjajar`}>
      <g stroke={warna} strokeWidth="2.4" strokeLinecap="round">
        {Array.from({ length: n }, (_, i) => (
          <path key={i} d={`M${5 + i * 6} 3 V21`} />
        ))}
      </g>
    </svg>
  );
}
