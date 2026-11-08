"use client";

import React from "react";
import { BIRU } from "./CeritaBandingB";
import { BIRU_B5, MERAH_B5 } from "./belas-a5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 6 Sub-Bab C: Pengurangan yang Hasilnya Kurang dari 20                  */
/* (Buku Siswa Kelas 1 hlm. 189-195). Bagian gambar yang dipakai bersama.     */
/* Semua dibuat di klien (SVG dan HTML), tanpa panggilan API.                 */
/* Naskah: naskah/mtk-1-bab6-sub-c-pengurangan-kurang-dari-20.md              */
/* ------------------------------------------------------------------------ */

/** Tiga pilihan digit 0 sampai 9 di sekitar kunci. Urutan diputar supaya kunci tidak selalu di tengah. */
export function opsiDigit(n: number): number[] {
  const mulai = n <= 0 ? 0 : n >= 9 ? 7 : n - 1;
  const dasar = [mulai, mulai + 1, mulai + 2];
  const putar = n % 3;
  return [...dasar.slice(putar), ...dasar.slice(0, putar)];
}

/* ------------------------------ Apel ------------------------------------ */

/** Isi gambar apel (grup SVG) berpusat di (0, 0). Apel yang digigit ulat punya lubang dan ulat hijau. */
function IsiApel({ gigit }: { gigit: boolean }) {
  return (
    <g>
      <path d="M0 -12 Q-2 -19 3 -21" fill="none" stroke="#7C4A1E" strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="8" cy="-16" rx="6.4" ry="3.2" fill="#4ADE80" stroke={BIRU} strokeWidth="1.8" transform="rotate(-18 8 -16)" />
      <path d="M0 -11 C-19 -19 -21 9 -9 15 C-5 17 -2 14 0 14 C2 14 5 17 9 15 C21 9 19 -19 0 -11 Z" fill="#EF4444" stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
      <ellipse cx="-8" cy="-3" rx="2.6" ry="4.2" fill="#FFFFFF" opacity="0.5" />
      {gigit ? (
        <g>
          <circle cx="9.5" cy="2" r="6" fill="#FEF3C7" stroke={BIRU} strokeWidth="1.8" />
          <path d="M9 6 Q3 11 7 16" fill="none" stroke="#16A34A" strokeWidth="3.6" strokeLinecap="round" />
          <circle cx="8" cy="17" r="3" fill="#16A34A" stroke={BIRU} strokeWidth="1.4" />
        </g>
      ) : null}
    </g>
  );
}

/** Satu apel berdiri sendiri (HTML). Dipakai di tahap Concrete (benda nyata). */
export function Apel({ gigit = false, kelas = "h-9 w-9" }: { gigit?: boolean; kelas?: string }) {
  return (
    <svg viewBox="-24 -24 48 48" className={kelas} aria-hidden="true">
      <IsiApel gigit={gigit} />
    </svg>
  );
}

/** Satu apel di dalam adegan cerita. (x, y) adalah pusat, s adalah skala. */
export function ApelG({ x, y, s = 1, gigit = false }: { x: number; y: number; s?: number; gigit?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <IsiApel gigit={gigit} />
    </g>
  );
}

/* ------------------------------ Bolu kukus ------------------------------ */

function IsiBolu() {
  return (
    <g>
      <path d="M-14 4 H14 L11 16 H-11 Z" fill="#FBBF24" stroke={BIRU} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M-9 4 L-7 16 M-3 4 V16 M3 4 V16 M9 4 L7 16" stroke={BIRU} strokeWidth="1.2" opacity="0.45" />
      <path d="M-16 5 C-18 -8 -6 -14 0 -14 C6 -14 18 -8 16 5 Z" fill="#F9A8D4" stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="0" cy="-17" r="3.4" fill="#EF4444" stroke={BIRU} strokeWidth="1.6" />
      <path d="M-8 -4 Q-3 -9 2 -6" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
    </g>
  );
}

/** Satu bolu kukus berdiri sendiri (HTML). */
export function Bolu({ kelas = "h-9 w-9" }: { kelas?: string }) {
  return (
    <svg viewBox="-20 -24 40 44" className={kelas} aria-hidden="true">
      <IsiBolu />
    </svg>
  );
}

/** Satu bolu kukus di dalam adegan cerita. */
export function BoluG({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <IsiBolu />
    </g>
  );
}

/* ------------------------------ Diagram polos --------------------------- */

/**
 * Deret kotak bernomor dengan lompatan mundur di atasnya (hlm. 190 dan 191). Diagram polos.
 * Kotak paling kanan (bilangan awal) berwarna emas dan lengkungan menunjuk ke kiri.
 */
export function DeretMundur({ dari, sampai, kelas = "h-20 w-full" }: { dari: number; sampai: number; kelas?: string }) {
  const banyak = sampai - dari + 1;
  const lebar = Math.min(40, 280 / banyak);
  const mulai = (300 - banyak * lebar) / 2;
  const pusat = (i: number) => mulai + i * lebar + lebar / 2;
  return (
    <svg viewBox="0 0 300 84" className={`block ${kelas}`} role="img" aria-label={`Deret bilangan dari ${sampai} turun sampai ${dari}, menghitung mundur ${banyak - 1} langkah`}>
      {Array.from({ length: banyak - 1 }, (_, i) => (
        <g key={i}>
          <path d={`M${pusat(i + 1)} 30 Q${(pusat(i) + pusat(i + 1)) / 2} 4 ${pusat(i) + 3} 28`} fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <path d={`M${pusat(i) + 9} 22 L${pusat(i) + 3} 28 L${pusat(i) + 11} 32`} fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      {Array.from({ length: banyak }, (_, i) => (
        <g key={i}>
          <rect x={mulai + i * lebar} y="36" width={lebar} height="36" fill={i === banyak - 1 ? "#FDE68A" : i % 2 ? "#F3E8FF" : "#E9D5F3"} stroke={BIRU} strokeWidth="2.4" />
          <text x={pusat(i)} y="60" textAnchor="middle" fontSize={lebar < 30 ? 14 : 17} fontWeight="900" fill={BIRU}>
            {dari + i}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Tabel nilai tempat untuk pengurangan bersusun: bilangan pertama, bilangan yang dikurangkan, lalu hasil. */
export function TabelKurang({
  a,
  b,
  puluhHasil = null,
  satuHasil = null,
  lebarMaks = 240,
  kecil = false,
}: {
  a: number;
  b: number;
  puluhHasil?: number | "?" | null;
  satuHasil?: number | "?" | null;
  lebarMaks?: number;
  kecil?: boolean;
}) {
  const sel = (v: number | "?" | null) => (v === null ? "" : v);
  const tinggi = kecil ? "py-0.5 text-2xl" : "py-1.5 text-4xl";
  const kepala = kecil ? "py-0.5 text-[10px] leading-tight" : "py-1 text-sm";
  const isiHasil = (v: number | "?" | null) => (v === "?" ? "bg-[#FFF7CC]" : v === null ? "bg-[#FAFAFA]" : "bg-[#E8F7EE]");
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: lebarMaks, paddingRight: kecil ? 20 : 30 }}>
      <div role="table" aria-label={`Tabel pengurangan nilai tempat: ${a} dikurangi ${b}`} className="grid w-full grid-cols-2 overflow-hidden rounded-xl border-4 border-[#1C01A5] bg-white text-center">
        <span role="columnheader" className={`border-r-2 border-[#1C01A5]/50 bg-[#E9D8F3] font-black text-[#1C01A5] ${kepala}`}>
          Puluhan
        </span>
        <span role="columnheader" className={`bg-[#E9D8F3] font-black text-[#1C01A5] ${kepala}`}>
          Satuan
        </span>
        <span role="cell" className={`border-r-2 border-[#1C01A5]/50 font-black text-[#B91C1C] ${tinggi}`}>
          {Math.floor(a / 10)}
        </span>
        <span role="cell" className={`font-black text-[#1D4ED8] ${tinggi}`}>
          {a % 10}
        </span>
        <span role="cell" className={`border-r-2 border-[#1C01A5]/50 font-black text-[#B91C1C] ${tinggi}`} />
        <span role="cell" className={`font-black text-[#1D4ED8] ${tinggi}`}>
          {b}
        </span>
        <span role="cell" className={`border-r-2 border-t-4 border-r-[#1C01A5]/50 border-t-[#1C01A5] font-black text-[#B91C1C] ${tinggi} ${isiHasil(puluhHasil)}`}>
          {sel(puluhHasil)}
        </span>
        <span role="cell" className={`border-t-4 border-t-[#1C01A5] font-black text-[#1D4ED8] ${tinggi} ${isiHasil(satuHasil)}`}>
          {sel(satuHasil)}
        </span>
      </div>
      <span className={`absolute font-black text-[#1C01A5] ${kecil ? "text-2xl" : "text-4xl"}`} style={{ right: 0, top: "44%" }} aria-hidden="true">
        –
      </span>
    </div>
  );
}

/**
 * Bagan bagian dan keseluruhan: batang utuh di atas, lalu dua bagian di bawahnya (sisa dan diambil).
 * Diagram polos untuk menunjukkan utuh – diambil = sisa dan sisa + diambil = utuh.
 */
export function BagianUtuh({ utuh, diambil, kelas = "h-28 w-full max-w-[320px]" }: { utuh: number; diambil: number; kelas?: string }) {
  const sisa = utuh - diambil;
  const kotak = 270 / 20;
  const x0 = 15;
  const batang = (dari: number, banyak: number, y: number, isi: string) => (
    <g>
      {Array.from({ length: banyak }, (_, i) => (
        <rect key={i} x={x0 + (dari + i) * kotak} y={y} width={kotak} height="22" fill={isi} stroke={BIRU} strokeWidth="1.6" />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 300 128" className={`mx-auto block ${kelas}`} role="img" aria-label={`Bagan: utuh ${utuh}, sisa ${sisa}, diambil ${diambil}`}>
      <text x={x0 + (utuh * kotak) / 2} y="14" textAnchor="middle" fontSize="13" fontWeight="900" fill={BIRU}>
        utuh {utuh}
      </text>
      {batang(0, utuh, 20, "#FDE68A")}
      <path d={`M${x0} 44 V54 M${x0 + utuh * kotak} 44 V54`} stroke={BIRU_B5} strokeWidth="2" strokeLinecap="round" strokeDasharray="1 4" />
      {batang(0, sisa, 56, "#BFDBFE")}
      {batang(sisa, diambil, 56, "#FECACA")}
      <text x={x0 + (sisa * kotak) / 2} y="94" textAnchor="middle" fontSize="12.5" fontWeight="900" fill={BIRU}>
        sisa {sisa}
      </text>
      <text x={x0 + (sisa + diambil / 2) * kotak} y="94" textAnchor="middle" fontSize="12.5" fontWeight="900" fill={MERAH_B5}>
        diambil {diambil}
      </text>
      <text x="150" y="118" textAnchor="middle" fontSize="12" fontWeight="900" fill="#B45309">
        {utuh} – {diambil} = {sisa} • {sisa} + {diambil} = {utuh}
      </text>
    </svg>
  );
}
