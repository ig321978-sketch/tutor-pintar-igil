"use client";

import React, { useContext } from "react";
import { LencanaSuara, SuaraCtx } from "./tahap-b-gaya";

/* ------------------------------------------------------------------------ */
/* Bentuk diagram Tahap 5 (Picture / Pictorial).                              */
/*                                                                            */
/* BATAS KETAT dengan Tahap 4 (Concrete):                                     */
/*  - Concrete: benda nyata (apel, kue, kelereng, jari). Anak memegang,        */
/*    memindahkan, memasukkan, menghitung benda satu-satu.                     */
/*  - Picture : TIDAK ADA gambar benda. Hanya diagram: bingkai sepuluh,        */
/*    bagan pasangan, garis bilangan, model batang, titik polos, goresan       */
/*    tally, dan tabel. Anak mewarnai, menandai, mengisi, menjodohkan,         */
/*    atau memilih. Nama benda boleh muncul sebagai KATA di teks cerita,       */
/*    tidak pernah sebagai gambar.                                             */
/* ------------------------------------------------------------------------ */

export const WARNA_ADA = "#E11D48";
export const WARNA_DATANG = "#38BDF8";
const TINTA = "#1C01A5";

/** Teks cerita. Diketuk, Suara Guru membacakannya. */
export function TeksCerita({ baris }: { baris: string[] }) {
  const ucap = useContext(SuaraCtx);
  const semua = baris.join(" ");
  return (
    <button
      type="button"
      aria-label={`Dengarkan cerita: ${semua}`}
      onClick={() => ucap(semua)}
      className="igil-tanpa-tepi flex w-full items-center justify-between gap-2 rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-3 py-2 text-left"
    >
      <span className="min-w-0 space-y-0.5">
        {baris.map((b, i) => (
          <span key={i} className="block text-lg font-black leading-snug text-[#1C01A5]">
            {b}
          </span>
        ))}
      </span>
      <LencanaSuara />
    </button>
  );
}

/** Baris titik polos. Titik adalah diagram, bukan benda. */
export function BarisTitik({ n, warna = WARNA_ADA, kelas = "" }: { n: number; warna?: string; kelas?: string }) {
  return (
    <span className={`flex flex-wrap items-center justify-center gap-1 ${kelas}`} role="img" aria-label={`${n} titik`}>
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          className="inline-block h-5 w-5 rounded-full border-[3px] border-[#1C01A5]"
          style={{ backgroundColor: warna }}
        />
      ))}
    </span>
  );
}

/** Dua kelompok titik berwarna beda, dipisah garis tegak. */
export function DuaKelompokTitik({ a, b }: { a: number; b: number }) {
  return (
    <span className="flex flex-wrap items-center justify-center gap-2">
      <BarisTitik n={a} warna={WARNA_ADA} />
      <span className="h-6 w-1 rounded-full bg-[#1C01A5]/40" aria-hidden="true" />
      <BarisTitik n={b} warna={WARNA_DATANG} />
    </span>
  );
}

/** Goresan tally. Empat garis tegak, goresan kelima mencoret miring. */
export function Tally({ n, kelas = "w-full max-w-[200px]" }: { n: number; kelas?: string }) {
  const grup = Math.max(1, Math.ceil(n / 5));
  return (
    <svg viewBox={`0 0 ${grup * 46} 40`} className={`block h-auto ${kelas}`} role="img" aria-label={`${n} goresan tally`}>
      <line x1={2} y1={37} x2={grup * 46 - 2} y2={37} stroke="#D1D5DB" strokeWidth={2} strokeDasharray="4 4" />
      {Array.from({ length: n }, (_, i) => {
        const g = Math.floor(i / 5);
        const k = i % 5;
        const gx = g * 46 + 4;
        return k < 4 ? (
          <line key={i} x1={gx + 6 + k * 8} y1={5} x2={gx + 6 + k * 8} y2={33} stroke={TINTA} strokeWidth={4} strokeLinecap="round" />
        ) : (
          <line key={i} x1={gx + 1} y1={29} x2={gx + 38} y2={9} stroke={TINTA} strokeWidth={4} strokeLinecap="round" />
        );
      })}
    </svg>
  );
}

/** Model batang sepuluh petak. Petak merah = yang ada, biru = yang datang lagi. */
export function BatangSepuluh({ a, b = 0, kelas = "" }: { a: number; b?: number; kelas?: string }) {
  return (
    <div
      className={`grid grid-cols-10 overflow-hidden rounded-lg border-[3px] border-[#1C01A5] ${kelas}`}
      role="img"
      aria-label={`Batang: ${a} petak merah${b > 0 ? ` dan ${b} petak biru` : ""}`}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className="h-7 border-r-2 border-[#1C01A5]/40 last:border-r-0"
          style={{ backgroundColor: i < a ? WARNA_ADA : i < a + b ? WARNA_DATANG : "#FFFFFF" }}
        />
      ))}
    </div>
  );
}

/** Garis bilangan mini 1 sampai 10. Titik emas = mulai, lengkung = lompatan, titik merah = mendarat. */
export function GarisMini({ mulai, lompat, kelas = "w-full" }: { mulai: number; lompat: number; kelas?: string }) {
  const x = (i: number) => 12 + (i - 1) * 21.3;
  const akhir = mulai + lompat;
  return (
    <svg viewBox="0 0 224 62" className={`block h-auto ${kelas}`} role="img" aria-label={`Garis bilangan: mulai ${mulai}, lompat ${lompat} kali`}>
      <line x1={x(1) - 6} y1={38} x2={x(10) + 6} y2={38} stroke={TINTA} strokeWidth={3} strokeLinecap="round" />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <line x1={x(i + 1)} y1={33} x2={x(i + 1)} y2={43} stroke={TINTA} strokeWidth={2.5} />
          <text x={x(i + 1)} y={58} textAnchor="middle" fontSize={11} fontWeight={900} fill={TINTA}>
            {i + 1}
          </text>
        </g>
      ))}
      {Array.from({ length: lompat }, (_, h) => (
        <path
          key={h}
          d={`M ${x(mulai + h)} 36 Q ${(x(mulai + h) + x(mulai + h + 1)) / 2} 6 ${x(mulai + h + 1)} 36`}
          fill="none"
          stroke={WARNA_DATANG}
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}
      <circle cx={x(mulai)} cy={38} r={6} fill="#FFE566" stroke={TINTA} strokeWidth={2.5} />
      <circle cx={x(akhir)} cy={38} r={6} fill={WARNA_ADA} stroke={TINTA} strokeWidth={2.5} />
    </svg>
  );
}
