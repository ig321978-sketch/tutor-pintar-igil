"use client";

import React from "react";
import { BIRU, EMAS } from "./CeritaBandingB";
import { BIRU_B5, MERAH_B5 } from "./belas-a5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab D: Membandingkan Bilangan (Buku Siswa Kelas 1 hlm. 165-173). */
/* Bagian gambar yang dipakai bersama. Semua dibuat di klien (SVG dan HTML),  */
/* tanpa panggilan API.                                                       */
/* Naskah: naskah/mtk-1-bab5-sub-d-membandingkan-bilangan.md                  */
/* ------------------------------------------------------------------------ */

export type Hubungan = "lebih" | "kurang" | "sama";

/** Hubungan bilangan pertama terhadap bilangan kedua. */
export const hubungan = (a: number, b: number): Hubungan => (a > b ? "lebih" : a < b ? "kurang" : "sama");

/** Tanda pembanding untuk a terhadap b. */
export const tanda = (a: number, b: number) => (a > b ? ">" : a < b ? "<" : "=");

/** Kalimat dengan kata, bukan simbol. Contoh: "15 lebih banyak dari 11". */
export function kalimatBanyak(a: number, b: number): string {
  if (a === b) return `${a} sama banyak dengan ${b}`;
  return a > b ? `${a} lebih banyak dari ${b}` : `${a} lebih sedikit dari ${b}`;
}

/** Warna tiap pasangan pada permainan memasangkan satu-satu. */
export const WARNA_PASANG = [
  "#E53E3E", "#2563EB", "#16A34A", "#F59E0B", "#9333EA", "#EA580C", "#0891B2", "#DB2777",
  "#65A30D", "#7C3AED", "#0D9488", "#B45309", "#BE123C", "#1D4ED8", "#15803D", "#A21CAF",
];

/** Kumpulan benda berupa emoji (tahap Concrete dan poster). */
export function KumpulanBenda({ n, ikon, kelas = "text-2xl" }: { n: number; ikon: string; kelas?: string }) {
  return (
    <span className={`flex flex-wrap items-center justify-center gap-0.5 leading-none ${kelas}`} role="img" aria-label={`${n} ${ikon}`}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} aria-hidden="true">
          {ikon}
        </span>
      ))}
    </span>
  );
}

/** Satu keranjang berisi jeruk atau benda lain, tanpa angka. */
export function Keranjang({ n, ikon = "🍊", kelas = "w-28" }: { n: number; ikon?: string; kelas?: string }) {
  return (
    <span className={`block rounded-b-3xl rounded-t-md border-4 border-[#A8672D] bg-[#FDE9C4] px-1 pb-1.5 pt-1 ${kelas}`}>
      <span className="flex flex-wrap items-end justify-center gap-0 text-[17px] leading-[1.1]" aria-hidden="true">
        {Array.from({ length: n }, (_, i) => (
          <span key={i}>{ikon}</span>
        ))}
      </span>
    </span>
  );
}

/** Diagram pasangan polos: dua baris titik, titik yang berpasangan dihubungkan, sisanya dilingkari. */
export function DiagramPasangan({ a, b, kelas = "h-36 w-full max-w-[300px]" }: { a: number; b: number; kelas?: string }) {
  const maks = Math.max(a, b);
  const jarak = Math.min(30, 270 / maks);
  const x = (i: number) => 18 + i * jarak + jarak / 2;
  const pasangan = Math.min(a, b);
  return (
    <svg viewBox="0 0 300 134" className={`mx-auto block ${kelas}`} role="img" aria-label={`Diagram memasangkan ${a} titik merah dengan ${b} titik biru satu-satu`}>
      {Array.from({ length: pasangan }, (_, i) => (
        <path key={i} d={`M${x(i)} 36 V94`} stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" />
      ))}
      {Array.from({ length: a }, (_, i) => (
        <circle key={`a${i}`} cx={x(i)} cy="28" r="9" fill={MERAH_B5} stroke={BIRU} strokeWidth="2" />
      ))}
      {Array.from({ length: b }, (_, i) => (
        <circle key={`b${i}`} cx={x(i)} cy="102" r="9" fill={BIRU_B5} stroke={BIRU} strokeWidth="2" />
      ))}
      {a > b ? (
        <rect x={x(b) - jarak / 2 + 3} y="12" width={(a - b) * jarak - 6} height="32" rx="14" fill="none" stroke={EMAS} strokeWidth="3.4" strokeDasharray="6 4" />
      ) : null}
      {b > a ? (
        <rect x={x(a) - jarak / 2 + 3} y="86" width={(b - a) * jarak - 6} height="32" rx="14" fill="none" stroke={EMAS} strokeWidth="3.4" strokeDasharray="6 4" />
      ) : null}
      {a !== b ? (
        <text x="150" y="126" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B45309">
          sisa tanpa pasangan: {Math.abs(a - b)}
        </text>
      ) : (
        <text x="150" y="126" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#15803D">
          semua berpasangan, tidak ada sisa
        </text>
      )}
    </svg>
  );
}

/** Garis bilangan 10 sampai 20 dengan dua bilangan bertanda (diagram polos). */
export function GarisBanding({ tanda1, tanda2, kelas = "h-24 w-full" }: { tanda1?: number; tanda2?: number; kelas?: string }) {
  const x = (n: number) => 14 + ((n - 10) * 272) / 10;
  const tandai = [tanda1, tanda2].filter((v): v is number => v !== undefined);
  return (
    <svg viewBox="0 0 300 92" className={`block ${kelas}`} role="img" aria-label="Garis bilangan 10 sampai 20, bilangan di kanan lebih besar">
      <path d="M6 58 H294 M288 52 L294 58 L288 64" fill="none" stroke={BIRU} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {Array.from({ length: 11 }, (_, i) => {
        const n = 10 + i;
        const sorot = tandai.includes(n);
        return (
          <g key={n}>
            <path d={`M${x(n)} ${sorot ? 48 : 52} V64`} stroke={BIRU} strokeWidth={sorot ? 3.4 : 2.2} strokeLinecap="round" />
            <text x={x(n)} y="82" textAnchor="middle" fontSize={sorot ? 14 : 12} fontWeight="900" fill={sorot ? MERAH_B5 : BIRU}>
              {n}
            </text>
          </g>
        );
      })}
      {tandai.map((n, i) => (
        <g key={`b${n}`}>
          <circle cx={x(n)} cy="36" r="10" fill={i === 0 ? "#FFE566" : "#BFDBFE"} stroke={BIRU} strokeWidth="2.6" />
          <text x={x(n)} y="40.5" textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
            {n}
          </text>
          <path d={`M${x(n)} 46 V50`} stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

/** Timbangan dua pan. Pan yang lebih banyak berisi turun. Kelereng digambar polos di dalam pan. */
export function TimbanganKelereng({ kiri, kanan, kelas = "h-48 w-full max-w-[340px]" }: { kiri: number; kanan: number; kelas?: string }) {
  const sudut = Math.max(-16, Math.min(16, (kiri - kanan) * 3));
  const rad = (sudut * Math.PI) / 180;
  const r = 96;
  const kx = 150 - r * Math.cos(rad);
  const ky = 66 + r * Math.sin(rad);
  const rx = 150 + r * Math.cos(rad);
  const ry = 66 - r * Math.sin(rad);
  const pan = (cx: number, cy: number, n: number, warna: string) => (
    <g>
      <path d={`M${cx} ${cy} L${cx - 38} ${cy + 36} M${cx} ${cy} L${cx + 38} ${cy + 36}`} stroke={BIRU} strokeWidth="2.2" fill="none" />
      <path d={`M${cx - 42} ${cy + 36} Q${cx} ${cy + 60} ${cx + 42} ${cy + 36} Z`} fill="#E0E7FF" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={cx - 31 + (i % 7) * 10.4} cy={cy + 32 - Math.floor(i / 7) * 10} r="4.6" fill={warna} stroke={BIRU} strokeWidth="1.3" />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 300 176" className={`mx-auto block ${kelas}`} role="img" aria-label={`Timbangan: pan kiri berisi ${kiri} kelereng, pan kanan berisi ${kanan} kelereng`}>
      <path d="M150 66 V152 M112 156 H188" stroke={BIRU} strokeWidth="6" strokeLinecap="round" />
      <path d={`M${kx} ${ky} L${rx} ${ry}`} stroke={BIRU} strokeWidth="6" strokeLinecap="round" />
      <circle cx="150" cy="66" r="7" fill={EMAS} stroke={BIRU} strokeWidth="2.6" />
      {pan(kx, ky, kiri, MERAH_B5)}
      {pan(rx, ry, kanan, BIRU_B5)}
      <text x="56" y="172" textAnchor="middle" fontSize="13" fontWeight="900" fill="#B91C1C">
        Kiri: {kiri}
      </text>
      <text x="244" y="172" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1D4ED8">
        Kanan: {kanan}
      </text>
    </svg>
  );
}
