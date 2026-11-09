"use client";

import React from "react";
import { BIRU, EMAS } from "./CeritaBandingB";
import { Tokoh } from "./gambar-maju-mundur-c";
import { BendaG, UnsurG } from "./dasar-k2b4";
import type { BendaId } from "./data-k2b4";

/* ------------------------------------------------------------------------ */
/* Bagian gambar SVG bersama video cerita Kelas 2 Bab 4 (Posisi Benda dan      */
/* Pola). Semua ditaruh di kotak adegan 300 x 208 yang sudah berlatar langit    */
/* dan rumput. Mesin video (VideoCeritaSatuLayar, buatAdegan) dipakai bersama.     */
/* Tanpa API, tanpa berkas video.                                              */
/* ------------------------------------------------------------------------ */

export { buatAdegan, VideoCeritaSatuLayar, type VideoSiap } from "./video-k2b2-umum";
export { BIRU, EMAS };

export const MERAH = "#E53E3E";

export const WARNA_ORANG = {
  upe: { rambut: "#92400E", baju: "#FBBF24" },
  lili: { rambut: "#1F2937", baju: "#F472B6" },
  halim: { rambut: "#374151", baju: "#A78BFA" },
  kira: { rambut: "#1F2937", baju: "#EC4899" },
  malosi: { rambut: "#111827", baju: "#34D399" },
  tika: { rambut: "#7A4A1E", baju: "#60A5FA" },
  paman: { rambut: "#4B5563", baju: "#F59E0B" },
} as const;
export type NamaOrang = keyof typeof WARNA_ORANG;

/** Orang berdiri di rumput, dengan nama kecil di atas kepala dan topi caping bila `caping`. */
export function Orang({ x, y = 198, nama, s = 0.9, angkat = false, tampilNama = true, caping = false }: { x: number; y?: number; nama: NamaOrang; s?: number; angkat?: boolean; tampilNama?: boolean; caping?: boolean }) {
  const w = WARNA_ORANG[nama];
  return (
    <g>
      <Tokoh x={x} y={y} rambut={w.rambut} baju={w.baju} s={s} angkat={angkat} />
      {caping ? (
        <g>
          <ellipse cx={x} cy={y - 53 * s} rx={18 * s} ry={5 * s} fill="#E8C468" stroke={BIRU} strokeWidth="1.6" />
          <path d={`M${x - 10 * s} ${y - 53 * s} Q${x} ${y - 72 * s} ${x + 10 * s} ${y - 53 * s} Z`} fill="#F1D78A" stroke={BIRU} strokeWidth="1.6" />
        </g>
      ) : null}
      {tampilNama ? (
        <text x={x} y={y - (caping ? 76 : 66) * s} textAnchor="middle" fontSize="10" fontWeight="900" fill={BIRU} stroke="#FFFFFF" strokeWidth="3" paintOrder="stroke">
          {nama.charAt(0).toUpperCase() + nama.slice(1)}
        </text>
      ) : null}
    </g>
  );
}

/** Benda dari perpustakaan benda, di kotak (x, y, w, h). */
export function Obj({ id, x, y, w, h }: { id: BendaId; x: number; y: number; w: number; h: number }) {
  return (
    <svg x={x} y={y} width={w} height={h} viewBox="0 0 100 100" preserveAspectRatio="none" overflow="visible">
      <BendaG id={id} />
    </svg>
  );
}

/** Hamparan padi menguning: dua jalur batang di belakang tokoh. */
export function Padi({ y = 112, tinggi = 40 }: { y?: number; tinggi?: number }) {
  return (
    <g>
      <rect x="0" y={y} width="300" height={tinggi} fill="#F4D77A" opacity="0.85" />
      {Array.from({ length: 30 }, (_, i) => (
        <g key={i}>
          <path d={`M${5 + i * 10} ${y + tinggi} V${y + 6 + (i % 3) * 3}`} stroke="#C9A227" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx={5 + i * 10} cy={y + 5 + (i % 3) * 3} rx="2.6" ry="5" fill="#E8B923" stroke="#B8860B" strokeWidth="0.8" />
        </g>
      ))}
    </g>
  );
}

/** Mangkuk nasi. (x, y) tengah dasar. */
export function MangkukNasi({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-22 -22 Q-22 0 0 0 Q22 0 22 -22 Z" fill="#F87171" stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M-20 -22 Q-14 -40 0 -40 Q14 -40 20 -22 Z" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
      {[[-8, -30], [4, -34], [10, -28]].map(([a, b], i) => (
        <circle key={i} cx={a} cy={b} r="1.8" fill="#E5E7EB" />
      ))}
    </g>
  );
}

/** Baris unsur pola (manik, bentuk, gerakan, suara). Kiri atas (x, y), tiap unsur berukuran w x h. */
export function BarisG({ jenis, seq, x, y, w, h = w, gap = 4, baju }: { jenis: string; seq: readonly string[]; x: number; y: number; w: number; h?: number; gap?: number; baju?: boolean }) {
  const kaus = ["#3B82F6", "#EC4899", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444"];
  return (
    <g>
      {seq.map((t, i) => (
        <svg key={i} x={x + i * (w + gap)} y={y} width={w} height={h} viewBox="0 0 100 100" overflow="visible">
          <UnsurG jenis={jenis} token={t} baju={baju ? kaus[i % kaus.length] : undefined} />
        </svg>
      ))}
    </g>
  );
}

/** Lebar total baris unsur. */
export const lebarBaris = (n: number, w: number, gap = 4) => n * w + (n - 1) * gap;

/** Kotak ucapan. (x, y) kiri atas. */
export function Ucap({ x, y, w, teks, ukuran = 11 }: { x: number; y: number; w: number; teks: string; ukuran?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="24" rx="11" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.6" />
      <text x={x + w / 2} y={y + 16} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}

/** Panah lurus. */
export function Panah({ x1, y1, x2, y2, warna = BIRU }: { x1: number; y1: number; x2: number; y2: number; warna?: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const k = (da: number) => `${x2 - 9 * Math.cos(a + da)} ${y2 - 9 * Math.sin(a + da)}`;
  return (
    <g>
      <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke={warna} strokeWidth="3.4" strokeLinecap="round" />
      <path d={`M${k(0.5)} L${x2} ${y2} L${k(-0.5)}`} fill="none" stroke={warna} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

export function Tanda({ x, y, benar }: { x: number; y: number; benar: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r="14" fill={benar ? "#16A34A" : MERAH} stroke="#FFFFFF" strokeWidth="2.6" />
      <text x={x} y={y + 7} textAnchor="middle" fontSize="19" fontWeight="900" fill="#FFFFFF">
        {benar ? "✓" : "✕"}
      </text>
    </g>
  );
}

export function Angka({ x, y, teks, r = 14, isi = "#FFFFFF" }: { x: number; y: number; teks: string; r?: number; isi?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={isi} stroke={BIRU} strokeWidth="3" />
      <text x={x} y={y + r * 0.36} textAnchor="middle" fontSize={r * 1.1} fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}
