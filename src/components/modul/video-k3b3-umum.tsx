"use client";

import React from "react";
import { BIRU, EMAS } from "./video-k3b1-umum";

/* ------------------------------------------------------------------------ */
/* Bagian gambar SVG bersama video cerita Kelas 3 Bab 3 (Pengukuran Panjang dan   */
/* Berat): penggaris, pensil, meteran gulung, dan pita meteran. Semua digambar di  */
/* kotak adegan 300 x 208. Mesin video dipakai bersama. Tanpa API.                 */
/* ------------------------------------------------------------------------ */

export { buatAdegan, DaftarVideoCerita, Emo, Orang, type VideoSiap } from "./video-k3b1-umum";
export { Besar } from "./video-k3b2-umum";
export { BIRU, EMAS };

/** Penggaris 0 sampai `cm` sentimeter. Kiri atas (x, y), tiap sentimeter selebar `skala`. `sorot` melingkari satu angka. */
export function PenggarisAdegan({ x, y, cm = 20, skala = 13, sorot = null }: { x: number; y: number; cm?: number; skala?: number; sorot?: number | null }) {
  return (
    <g>
      <rect x={x - 8} y={y} width={cm * skala + 16} height="34" rx="6" fill="#FEF3C7" stroke={BIRU} strokeWidth="2.6" />
      {Array.from({ length: cm + 1 }, (_, i) => (
        <g key={i}>
          <line x1={x + i * skala} x2={x + i * skala} y1={y} y2={y + (i % 5 === 0 ? 16 : 11)} stroke={BIRU} strokeWidth={i % 5 === 0 ? 2 : 1.4} />
          <text x={x + i * skala} y={y + 28} textAnchor="middle" fontSize="8.5" fontWeight="900" fill={sorot === i ? "#B45309" : BIRU}>
            {i}
          </text>
        </g>
      ))}
      {sorot !== null ? <circle cx={x + sorot * skala} cy={y + 19} r="10" fill="none" stroke="#F0AB00" strokeWidth="3" className="vc-denyut" /> : null}
    </g>
  );
}

/** Pensil sepanjang `cm` sentimeter di atas penggaris (y adalah sisi atas penggaris), ujung kirinya di `offset`. */
export function PensilAdegan({ x, y, cm, offset = 0, skala = 13 }: { x: number; y: number; cm: number; offset?: number; skala?: number }) {
  const x0 = x + offset * skala;
  const w = cm * skala;
  return (
    <g>
      <polygon points={`${x0},${y - 12} ${x0 + 14},${y - 22} ${x0 + 14},${y - 2}`} fill="#F5D0A9" stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
      <polygon points={`${x0},${y - 12} ${x0 + 6},${y - 15} ${x0 + 6},${y - 9}`} fill="#374151" stroke={BIRU} strokeWidth="1.2" strokeLinejoin="round" />
      <rect x={x0 + 14} y={y - 22} width={Math.max(8, w - 14 - 18)} height="20" fill="#FBBF24" stroke={BIRU} strokeWidth="2" />
      <rect x={x0 + w - 18} y={y - 22} width="6" height="20" fill="#9CA3AF" stroke={BIRU} strokeWidth="1.6" />
      <rect x={x0 + w - 12} y={y - 22} width="12" height="20" rx="5" fill="#F9A8D4" stroke={BIRU} strokeWidth="2" />
    </g>
  );
}

/** Meteran gulung: kotak kuning bulat dengan pita yang keluar. */
export function MeteranGulung({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="0" y="0" width="54" height="48" rx="15" fill="#FBBF24" stroke={BIRU} strokeWidth="3" />
      <circle cx="27" cy="24" r="12" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.4" />
      <circle cx="27" cy="24" r="4" fill={BIRU} />
      <rect x="54" y="30" width="16" height="10" rx="2" fill="#FEF3C7" stroke={BIRU} strokeWidth="2.4" />
    </g>
  );
}

/** Pita meteran mendatar: 0 sampai `meter` meter. Penanda tiap 10 cm, tiap 50 cm, dan angka tiap 1 meter. `sorot` melingkari satu ukuran (cm). */
export function PitaMeter({ x, y, meter = 2, skala = 110, sorot = null }: { x: number; y: number; meter?: number; skala?: number; sorot?: number | null }) {
  const px = (cm: number) => x + (cm * skala) / 100;
  return (
    <g>
      <rect x={x - 6} y={y} width={meter * skala + 12} height="36" rx="6" fill="#FEF3C7" stroke={BIRU} strokeWidth="2.6" />
      {Array.from({ length: meter * 10 + 1 }, (_, i) => (
        <line key={i} x1={px(i * 10)} x2={px(i * 10)} y1={y} y2={y + (i % 10 === 0 ? 20 : i % 5 === 0 ? 14 : 8)} stroke={BIRU} strokeWidth={i % 10 === 0 ? 2.4 : 1.2} />
      ))}
      {Array.from({ length: meter + 1 }, (_, i) => (
        <text key={i} x={px(i * 100)} y={y + 32} textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
          {i === 0 ? "0" : `${i} m`}
        </text>
      ))}
      {sorot !== null ? <circle cx={px(sorot)} cy={y + 18} r="12" fill="none" stroke="#F0AB00" strokeWidth="3" className="vc-denyut" /> : null}
    </g>
  );
}

/** Batang berwarna dengan teks di dalamnya (pita yang akan disambung). */
export function BatangTeks({ x, y, w, teks, warna = "#FECACA" }: { x: number; y: number; w: number; teks: string; warna?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="28" rx="8" fill={warna} stroke={BIRU} strokeWidth="2.6" />
      <text x={x + w / 2} y={y + 19} textAnchor="middle" fontSize="13" fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}

/* ---------------------------- Bagian berat (Sub-Bab C dan D) ---------------------------- */

/** Timbangan digital di adegan: piring, badan, dan layar berisi `teks`. (x, y) kiri atas, lebar 120. */
export function TimbanganAdegan({ x, y, teks }: { x: number; y: number; teks: string }) {
  return (
    <g>
      <rect x={x + 10} y={y} width="100" height="10" rx="4" fill="#E5E7EB" stroke={BIRU} strokeWidth="2.4" />
      <path d={`M${x} ${y + 16} H${x + 120} L${x + 112} ${y + 54} H${x + 8} Z`} fill="#6B7280" stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
      <rect x={x + 22} y={y + 25} width="76" height="21" rx="4" fill="#D9F99D" stroke="#14532D" strokeWidth="1.8" />
      <text x={x + 60} y={y + 41} textAnchor="middle" fontSize="15" fontWeight="900" fill="#14532D">
        {teks}
      </text>
    </g>
  );
}

/** Jarum timbangan duduk di adegan: lingkaran berpusat (x, y), jarum menunjuk `gram` (satu putaran = 5 kg). */
export function JarumAdegan({ x, y, gram, r = 40 }: { x: number; y: number; gram: number; r?: number }) {
  const sudut = (gram / 5000) * 2 * Math.PI;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#EFF6FF" stroke={BIRU} strokeWidth="3" />
      {Array.from({ length: 25 }, (_, i) => {
        const a = (i / 25) * 2 * Math.PI;
        const besar = i % 5 === 0;
        return <line key={i} x1={x + (r - 3) * Math.sin(a)} y1={y - (r - 3) * Math.cos(a)} x2={x + (r - (besar ? 11 : 7)) * Math.sin(a)} y2={y - (r - (besar ? 11 : 7)) * Math.cos(a)} stroke={BIRU} strokeWidth={besar ? 2.4 : 1.2} />;
      })}
      {[0, 1, 2, 3, 4].map((k) => (
        <text key={k} x={x + (r - 19) * Math.sin((k * 2 * Math.PI) / 5)} y={y - (r - 19) * Math.cos((k * 2 * Math.PI) / 5) + 4} textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
          {k}
        </text>
      ))}
      <line x1={x} y1={y} x2={x + (r - 14) * Math.sin(sudut)} y2={y - (r - 14) * Math.cos(sudut)} stroke="#DC2626" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx={x} cy={y} r="4.5" fill={BIRU} />
    </g>
  );
}

/** Satu bandul timbangan kodok di adegan: logam kuning dengan dua baris tulisan. (x, y) kiri atas, lebar `w`. */
export function BandulAdegan({ x, y, a, b, w = 30 }: { x: number; y: number; a: string; b: string; w?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${w / 48})`}>
      <circle cx="24" cy="7" r="5" fill="#FDE68A" stroke={BIRU} strokeWidth="2.2" />
      <path d="M12 12 H36 L44 56 H4 Z" fill="#FBBF24" stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" />
      <text x="24" y="33" textAnchor="middle" fontSize="15" fontWeight="900" fill={BIRU}>
        {a}
      </text>
      <text x="24" y="49" textAnchor="middle" fontSize="13" fontWeight="900" fill={BIRU}>
        {b}
      </text>
    </g>
  );
}