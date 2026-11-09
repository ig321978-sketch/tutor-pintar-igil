"use client";

import React from "react";
import { BIRU, EMAS } from "./video-k3b1-umum";
import { TurusSvg, lebarTurus } from "./video-k2b8-umum";

/* ------------------------------------------------------------------------ */
/* Bagian gambar SVG bersama video cerita Kelas 3 Bab 5 (Penyajian Data):      */
/* turus, tabel kecil, chip nilai, dan lidi. Semua digambar di kotak adegan    */
/* 300 x 208. Mesin video dipakai bersama. Tanpa API, tanpa berkas video.      */
/* ------------------------------------------------------------------------ */

export { buatAdegan, DaftarVideoCerita, Emo, Orang, type VideoSiap } from "./video-k3b1-umum";
export { Besar } from "./video-k3b2-umum";
export { TabelSvg } from "./video-k3b2-umum";
export { BIRU, EMAS, TurusSvg, lebarTurus };

/** Chip nilai kecil di (x, y). */
export function ChipNilai({ x, y, n, aktif = false }: { x: number; y: number; n: number; aktif?: boolean }) {
  return (
    <g>
      <rect x={x - 14} y={y - 12} width="28" height="24" rx="8" fill={aktif ? "#FEF3C7" : "#EEF2FF"} stroke={BIRU} strokeWidth="2.2" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="900" fill={BIRU}>
        {n}
      </text>
    </g>
  );
}

/** Deretan chip nilai dari array. */
export function DeretNilai({ x, y, data, sorot }: { x: number; y: number; data: readonly number[]; sorot?: number }) {
  return (
    <g>
      {data.map((n, i) => (
        <ChipNilai key={i} x={x + (i % 10) * 28} y={y + Math.floor(i / 10) * 28} n={n} aktif={sorot !== undefined && n === sorot} />
      ))}
    </g>
  );
}

/** Satu lidi tegak atau miring. */
export function LidiSvg({ x, y, tinggi = 28, miring = false, warna = BIRU }: { x: number; y: number; tinggi?: number; miring?: boolean; warna?: string }) {
  return miring ? (
    <line x1={x - 6} y1={y + tinggi * 0.88} x2={x + 18} y2={y + tinggi * 0.12} stroke="#E53E3E" strokeWidth="3" strokeLinecap="round" />
  ) : (
    <line x1={x} y1={y} x2={x} y2={y + tinggi} stroke={warna} strokeWidth="3" strokeLinecap="round" />
  );
}

/** Tumpukan lidi sebagai turus di (x, y). */
export function TumpukanLidiSvg({ x, y, n, tinggi = 26 }: { x: number; y: number; n: number; tinggi?: number }) {
  return <TurusSvg x={x} y={y} n={n} tinggi={tinggi} />;
}

/** Manik SVG berwarna. */
export function ManikSvg({ x, y, warna, r = 8 }: { x: number; y: number; warna: string; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={warna} stroke={BIRU} strokeWidth="2" />
      <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.22} fill="#FFFFFF" opacity="0.75" />
    </g>
  );
}

/** Huruf besar di kotak. */
export function HurufKotak({ x, y, huruf, aktif = false }: { x: number; y: number; huruf: string; aktif?: boolean }) {
  return (
    <g>
      <rect x={x - 16} y={y - 16} width="32" height="32" rx="8" fill={aktif ? "#FEF3C7" : "#FFFFFF"} stroke={BIRU} strokeWidth="2.4" />
      <text x={x} y={y + 7} textAnchor="middle" fontSize="18" fontWeight="900" fill={BIRU}>
        {huruf}
      </text>
    </g>
  );
}
