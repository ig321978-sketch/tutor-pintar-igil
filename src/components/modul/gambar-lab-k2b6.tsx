"use client";

import React from "react";
import { BendaB6 } from "./dasar-k2b6";
import type { BendaNeraca } from "./lab-neraca-k2b6";
import { UKURAN_NERACA, NAMA_BENDA_NERACA } from "./lab-neraca-k2b6";

/* ------------------------------------------------------------------------ */
/* Gambar benda untuk Lab Neraca dan Mesin Tebak (Kelas 2 Bab 6, Sub-Bab A).    */
/* Batu digambar sendiri (tidak ada emoji batu yang aman), balon memakai emoji.  */
/* Ukuran gambar bisa mengikuti ukuran asli benda supaya anak melihat bahwa      */
/* benda besar belum tentu berat.                                                */
/* ------------------------------------------------------------------------ */

function Batu({ ukuran }: { ukuran: number }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center" style={{ width: ukuran, height: ukuran }} role="img" aria-label="batu">
      <svg viewBox="0 0 40 40" className="h-full w-full">
        <path d="M5 30 Q3 20 11 13 Q17 7 26 10 Q36 14 35 25 Q34 33 26 33 H11 Q6 33 5 30 Z" fill="#9CA3AF" stroke="#4B5563" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M13 17 Q17 13 22 14" stroke="#E5E7EB" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M22 27 Q27 25 30 27" stroke="#6B7280" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** Piksel gambar untuk benda: ukuran seragam, atau mengikuti ukuran asli (1 sampai 5). */
export const pikselBenda = (id: BendaNeraca, asli: boolean): number => (asli ? 22 + UKURAN_NERACA[id] * 8 : 38);

export function BendaLab({ id, ukuran = 38 }: { id: BendaNeraca; ukuran?: number }) {
  if (id === "batu") return <Batu ukuran={ukuran} />;
  if (id === "balon") {
    return (
      <span className="inline-flex shrink-0 items-center justify-center leading-none" style={{ width: ukuran, height: ukuran, fontSize: ukuran * 0.82 }} role="img" aria-label={NAMA_BENDA_NERACA[id]}>
        🎈
      </span>
    );
  }
  return <BendaB6 id={id} ukuran={ukuran} />;
}

/** Dua tangan terbuka sebagai timbangan: sisi yang lebih berat turun. */
export function DuaTangan({ miring, kiri, kanan, label }: { miring: -1 | 0 | 1; kiri: React.ReactNode; kanan: React.ReactNode; label: string }) {
  const trans = "transform 0.8s cubic-bezier(.3,1.35,.5,1)";
  const sisi = (dy: number, isi: React.ReactNode, nama: string) => (
    <div className="flex w-1/2 flex-col items-center" style={{ transform: `translateY(${dy}px)`, transition: trans }}>
      <div className="flex min-h-[68px] flex-wrap content-end items-end justify-center gap-0.5 px-1">{isi}</div>
      <svg viewBox="0 0 90 70" className="h-[70px] w-[90px]" aria-hidden="true">
        <path d="M10 14 H80 Q82 26 70 28 H20 Q8 26 10 14 Z" fill="#FDBA74" stroke="#1C01A5" strokeWidth="3" strokeLinejoin="round" />
        <path d="M18 14 V6 M30 14 V3 M42 14 V2 M54 14 V3 M66 14 V6" stroke="#1C01A5" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
        <rect x="34" y="28" width="22" height="42" rx="8" fill="#FDBA74" stroke="#1C01A5" strokeWidth="3" />
      </svg>
      <span className="text-[11px] font-black text-[#1C01A5]/70">{nama}</span>
    </div>
  );
  return (
    <div className="mx-auto flex w-full max-w-[360px] items-start justify-center gap-2 pt-4" style={{ minHeight: 190 }} role="img" aria-label={label}>
      {sisi(-miring * 16, kiri, "tangan kiri")}
      {sisi(miring * 16, kanan, "tangan kanan")}
    </div>
  );
}
