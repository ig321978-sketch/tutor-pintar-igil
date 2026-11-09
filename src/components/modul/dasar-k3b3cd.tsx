"use client";

import React from "react";
import { JarumTimbangan } from "./diagram-k3b3cd";
import { NAMA_BANDUL, URUT_BANDUL, teksSusunan, type JenisBandul, type Susunan } from "./data-k3b3";

/* ------------------------------------------------------------------------ */
/* Benda nyata Kelas 3 Bab 3 Sub-Bab C dan D (tahap Concrete): timbangan digital  */
/* dan timbangan duduk dengan benda di atasnya, serta bandul timbangan kodok.     */
/* Tahap Picture memakai layar, jarum, dan garis polos dari berkas diagram bab    */
/* ini, tanpa gambar benda.                                                      */
/* ------------------------------------------------------------------------ */

const TINTA = "#1C01A5";

/** Timbangan digital dengan satu benda (emoji) di atasnya. Tanpa `emoji`, hanya timbangannya. */
export function TimbanganDigital({ emoji, gram, ringkas = false }: { emoji?: string; gram: number; ringkas?: boolean }) {
  return (
    <div className="flex w-full flex-col items-center" role="img" aria-label={`Timbangan digital menunjukkan ${gram} gram`}>
      {emoji ? (
        <span className={`${ringkas ? "text-3xl" : "text-5xl"} leading-none`} aria-hidden="true">
          {emoji}
        </span>
      ) : null}
      <svg viewBox="0 0 200 86" className={`block h-auto w-full ${ringkas ? "max-w-[150px]" : "max-w-[220px]"}`} aria-hidden="true">
        <rect x="22" y="4" width="156" height="14" rx="6" fill="#E5E7EB" stroke={TINTA} strokeWidth="2.4" />
        <path d="M10 24 H190 L180 80 H20 Z" fill="#6B7280" stroke={TINTA} strokeWidth="2.4" strokeLinejoin="round" />
        <rect x="46" y="34" width="108" height="32" rx="5" fill="#D9F99D" stroke="#14532D" strokeWidth="2" />
        <text x="132" y="60" textAnchor="end" fontSize="26" fontWeight="900" fill="#14532D" fontFamily="ui-monospace, Menlo, Consolas, monospace">
          {gram}
        </text>
        <text x="137" y="60" fontSize="15" fontWeight="900" fill="#14532D">
          g
        </text>
      </svg>
    </div>
  );
}

/** Timbangan duduk (berjarum) dengan satu benda (emoji) di atas piringannya. */
export function TimbanganDuduk({ emoji, gram, ringkas = false }: { emoji?: string; gram: number; ringkas?: boolean }) {
  return (
    <div className="flex w-full flex-col items-center" role="img" aria-label={`Timbangan duduk, jarum menunjuk ${gram} gram`}>
      {emoji ? (
        <span className={`${ringkas ? "text-3xl" : "text-5xl"} leading-none`} aria-hidden="true">
          {emoji}
        </span>
      ) : null}
      <div className="h-2.5 w-28 rounded-t-xl border-2 border-[#1C01A5] bg-[#BFDBFE]" aria-hidden="true" />
      <div className={`flex w-full justify-center rounded-3xl border-4 border-[#1C01A5] bg-[#60A5FA] p-1.5 ${ringkas ? "max-w-[150px]" : "max-w-[190px]"}`} aria-hidden="true">
        <JarumTimbangan gram={gram} ringkas={ringkas} />
      </div>
    </div>
  );
}

const LEBAR_BANDUL: Record<JenisBandul, number> = { k: 46, sk: 42, d: 38, s: 34, ss: 30 };

/** Satu bandul timbangan kodok: logam kuning dengan tulisan beratnya. */
export function Bandul({ jenis }: { jenis: JenisBandul }) {
  const [a, b] = NAMA_BANDUL[jenis].split(" ");
  const w = LEBAR_BANDUL[jenis];
  return (
    <svg viewBox="0 0 48 62" width={w} height={(w * 62) / 48} aria-hidden="true" className="shrink-0">
      <circle cx="24" cy="7" r="5" fill="#FDE68A" stroke={TINTA} strokeWidth="2" />
      <path d="M12 12 H36 L44 56 H4 Z" fill="#FBBF24" stroke={TINTA} strokeWidth="2.4" strokeLinejoin="round" />
      <text x="24" y="33" textAnchor="middle" fontSize="15" fontWeight="900" fill={TINTA}>
        {a}
      </text>
      <text x="24" y="49" textAnchor="middle" fontSize="13" fontWeight="900" fill={TINTA}>
        {b}
      </text>
    </svg>
  );
}

/** Kumpulan bandul yang diletakkan bersama. */
export function BandulSusun({ s }: { s: Susunan }) {
  return (
    <span className="inline-flex max-w-full flex-wrap items-end justify-center gap-0.5 rounded-xl border-2 border-[#1C01A5]/30 bg-white px-1.5 py-1.5" role="img" aria-label={`Bandul: ${teksSusunan(s)}`}>
      {URUT_BANDUL.flatMap((j) => Array.from({ length: s[j] ?? 0 }, (_, i) => <Bandul key={`${j}${i}`} jenis={j} />))}
    </span>
  );
}
