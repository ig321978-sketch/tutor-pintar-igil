"use client";

import React from "react";
import { BIRU, EMAS } from "./CeritaBandingB";
import { BIRU_B5, MERAH_B5 } from "./belas-a5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 6 Sub-Bab A: Mengenal Konsep Lebih dari, Kurang dari, dan Selisih      */
/* (Buku Siswa Kelas 1 hlm. 176-182). Bagian gambar yang dipakai bersama.     */
/* Semua dibuat di klien (SVG dan HTML), tanpa panggilan API.                 */
/* Naskah: naskah/mtk-1-bab6-sub-a-lebih-dari-kurang-dari-selisih.md          */
/* ------------------------------------------------------------------------ */

/** Selisih dua bilangan: yang besar dikurangi yang kecil. */
export const selisihDua = (a: number, b: number) => Math.abs(a - b);

/** Kalimat perbandingan lengkap dengan kata lebihnya dan kurangnya. */
export function kalimatSelisih(namaBesar: string, namaKecil: string, d: number): string {
  return `Banyak ${namaBesar} ${d} lebihnya dari banyak ${namaKecil}. Banyak ${namaKecil} ${d} kurangnya dari banyak ${namaBesar}. Beda banyaknya adalah ${d}.`;
}

/* ------------------------------ Donat ----------------------------------- */

const TABUR = ["#FFFFFF", "#FDE68A", "#BFDBFE", "#FBCFE8", "#BBF7D0"];
const TITIK_TABUR: [number, number][] = [
  [-8, -9],
  [8, -10],
  [11, 3],
  [3, 11],
  [-10, 6],
];

/** Isi gambar donat (grup SVG) berpusat di (0, 0). Jari-jari luar 17. */
function IsiDonat({ coklat }: { coklat: boolean }) {
  return (
    <g>
      <circle cx="0" cy="0" r="17" fill="#E0A458" stroke={BIRU} strokeWidth="2.6" />
      <circle cx="0" cy="0" r="13" fill={coklat ? "#6B3410" : "#F472B6"} />
      <circle cx="0" cy="0" r="5" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
      {TITIK_TABUR.map(([x, y], i) => (
        <rect key={i} x={x - 2} y={y - 0.9} width="4" height="1.8" rx="0.9" fill={TABUR[i % TABUR.length]} transform={`rotate(${i * 47} ${x} ${y})`} />
      ))}
    </g>
  );
}

/** Satu donat berdiri sendiri (HTML). Dipakai di tahap Concrete (benda nyata). */
export function Donat({ coklat = false, kelas = "h-9 w-9" }: { coklat?: boolean; kelas?: string }) {
  return (
    <svg viewBox="-20 -20 40 40" className={kelas} aria-hidden="true">
      <IsiDonat coklat={coklat} />
    </svg>
  );
}

/** Satu donat di dalam adegan cerita. (x, y) adalah pusat, s adalah skala. */
export function DonatG({ x, y, s = 1, coklat = false }: { x: number; y: number; s?: number; coklat?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <IsiDonat coklat={coklat} />
    </g>
  );
}

/* ------------------------------ Kupu-kupu ------------------------------- */

/** Kupu-kupu kuning di dalam adegan cerita. (x, y) adalah pusat badan. */
export function KupuG({ x, y, s = 1, warna = "#FACC15" }: { x: number; y: number; s?: number; warna?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="-9" cy="-5" rx="9" ry="12" fill={warna} stroke={BIRU} strokeWidth="2.2" transform="rotate(-24 -9 -5)" />
      <ellipse cx="9" cy="-5" rx="9" ry="12" fill={warna} stroke={BIRU} strokeWidth="2.2" transform="rotate(24 9 -5)" />
      <ellipse cx="-7" cy="8" rx="6.5" ry="8" fill="#FDBA74" stroke={BIRU} strokeWidth="2" transform="rotate(18 -7 8)" />
      <ellipse cx="7" cy="8" rx="6.5" ry="8" fill="#FDBA74" stroke={BIRU} strokeWidth="2" transform="rotate(-18 7 8)" />
      <rect x="-2.6" y="-9" width="5.2" height="24" rx="2.6" fill="#7C2D12" stroke={BIRU} strokeWidth="1.6" />
      <path d="M-1.5 -9 Q-6 -19 -9 -17 M1.5 -9 Q6 -19 9 -17" fill="none" stroke={BIRU} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

/* ------------------------------ Diagram polos --------------------------- */

/**
 * Diagram pasangan polos: baris atas titik merah, baris bawah titik biru. Titik yang berpasangan
 * dihubungkan, titik yang tidak punya pasangan dilingkari dan disebut lebihnya. Tanpa gambar benda.
 */
export function DiagramSelisih({ a, b, kelas = "h-36 w-full max-w-[300px]" }: { a: number; b: number; kelas?: string }) {
  const maks = Math.max(a, b);
  const jarak = Math.min(30, 270 / maks);
  const x = (i: number) => 18 + i * jarak + jarak / 2;
  const pasangan = Math.min(a, b);
  const d = Math.abs(a - b);
  return (
    <svg viewBox="0 0 300 138" className={`mx-auto block ${kelas}`} role="img" aria-label={`Diagram memasangkan ${a} titik merah dengan ${b} titik biru satu-satu. Selisihnya ${d}.`}>
      {Array.from({ length: pasangan }, (_, i) => (
        <path key={i} d={`M${x(i)} 36 V98`} stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" />
      ))}
      {Array.from({ length: a }, (_, i) => (
        <circle key={`a${i}`} cx={x(i)} cy="28" r="9" fill={MERAH_B5} stroke={BIRU} strokeWidth="2" />
      ))}
      {Array.from({ length: b }, (_, i) => (
        <circle key={`b${i}`} cx={x(i)} cy="106" r="9" fill={BIRU_B5} stroke={BIRU} strokeWidth="2" />
      ))}
      {a > b ? <rect x={x(b) - jarak / 2 + 3} y="12" width={(a - b) * jarak - 6} height="32" rx="14" fill="none" stroke={EMAS} strokeWidth="3.4" strokeDasharray="6 4" /> : null}
      {b > a ? <rect x={x(a) - jarak / 2 + 3} y="90" width={(b - a) * jarak - 6} height="32" rx="14" fill="none" stroke={EMAS} strokeWidth="3.4" strokeDasharray="6 4" /> : null}
      <text x="150" y="132" textAnchor="middle" fontSize="12" fontWeight="900" fill={d === 0 ? "#15803D" : "#B45309"}>
        {d === 0 ? "semua berpasangan, tidak ada sisa" : `lebihnya ${d} • selisih ${d}`}
      </text>
    </svg>
  );
}

/**
 * Model batang polos: dua batang kotak sejajar. Kotak yang melebihi batang pendek berwarna emas.
 * `a` batang atas (merah), `b` batang bawah (biru).
 */
export function BatangBanding({ a, b, kelas = "h-28 w-full max-w-[320px]" }: { a: number; b: number; kelas?: string }) {
  const maks = Math.max(a, b);
  const sisi = Math.min(22, 262 / maks);
  const mulai = 30;
  const d = Math.abs(a - b);
  const kotak = (n: number, y: number, warna: string, lebih: number) => (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const dilebihkan = i >= n - lebih;
        return <rect key={i} x={mulai + i * sisi} y={y} width={sisi} height={sisi} fill={dilebihkan ? "#FDE68A" : warna} stroke={BIRU} strokeWidth="1.8" />;
      })}
    </g>
  );
  return (
    <svg viewBox="0 0 320 112" className={`mx-auto block ${kelas}`} role="img" aria-label={`Model batang: batang A ${a} kotak, batang B ${b} kotak, selisih ${d} kotak`}>
      <text x="14" y={14 + sisi * 0.72} textAnchor="middle" fontSize="14" fontWeight="900" fill={BIRU}>
        A
      </text>
      <text x="14" y={54 + sisi * 0.72} textAnchor="middle" fontSize="14" fontWeight="900" fill={BIRU}>
        B
      </text>
      {kotak(a, 14, "#FCA5A5", a > b ? d : 0)}
      {kotak(b, 54, "#93C5FD", b > a ? d : 0)}
      <text x="160" y="104" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#B45309">
        kotak emas = selisih {d}
      </text>
    </svg>
  );
}

/**
 * Garis bilangan dengan dua bendera. Setiap langkah dari bilangan kecil ke bilangan besar digambar
 * sebagai lompatan. Banyak lompatan sama dengan selisih. Tanpa gambar benda.
 */
export function GarisSelisih({
  dari,
  sampai,
  kecil,
  besar,
  kelas = "h-28 w-full",
}: {
  dari: number;
  sampai: number;
  kecil: number;
  besar: number;
  kelas?: string;
}) {
  const banyak = sampai - dari;
  const x = (n: number) => 16 + ((n - dari) * 268) / banyak;
  const d = besar - kecil;
  return (
    <svg viewBox="0 0 300 108" className={`block ${kelas}`} role="img" aria-label={`Garis bilangan dari ${dari} sampai ${sampai}. ${kecil} dan ${besar} berselisih ${d} langkah.`}>
      <path d="M6 66 H294 M288 60 L294 66 L288 72" fill="none" stroke={BIRU} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {Array.from({ length: banyak + 1 }, (_, i) => {
        const n = dari + i;
        const sorot = n === kecil || n === besar;
        return (
          <g key={n}>
            <path d={`M${x(n)} ${sorot ? 58 : 60} V72`} stroke={BIRU} strokeWidth={sorot ? 3.4 : 2.2} strokeLinecap="round" />
            <text x={x(n)} y="90" textAnchor="middle" fontSize={sorot ? 13.5 : 11.5} fontWeight="900" fill={sorot ? MERAH_B5 : BIRU}>
              {n}
            </text>
          </g>
        );
      })}
      {Array.from({ length: d }, (_, i) => {
        const a = kecil + i;
        const b = a + 1;
        const tengah = (x(a) + x(b)) / 2;
        return <path key={i} d={`M${x(a)} 56 Q${tengah} 28 ${x(b)} 56`} fill="none" stroke={BIRU_B5} strokeWidth="2.8" strokeLinecap="round" />;
      })}
      {[kecil, besar].map((n, i) => (
        <g key={n}>
          <circle cx={x(n)} cy="14" r="10" fill={i === 0 ? "#BFDBFE" : "#FFE566"} stroke={BIRU} strokeWidth="2.6" />
          <text x={x(n)} y="18.5" textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
            {n}
          </text>
          <path d={`M${x(n)} 24 V54`} stroke={BIRU} strokeWidth="2" strokeLinecap="round" strokeDasharray="1 5" />
        </g>
      ))}
    </svg>
  );
}
