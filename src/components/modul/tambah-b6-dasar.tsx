"use client";

import React from "react";
import { BIRU } from "./CeritaBandingB";
import { BIRU_B5, MERAH_B5 } from "./belas-a5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 6 Sub-Bab B: Penjumlahan yang Hasilnya Kurang dari 20                  */
/* (Buku Siswa Kelas 1 hlm. 182-189). Bagian gambar yang dipakai bersama.     */
/* Semua dibuat di klien (SVG dan HTML), tanpa panggilan API.                 */
/* Naskah: naskah/mtk-1-bab6-sub-b-penjumlahan-kurang-dari-20.md              */
/* ------------------------------------------------------------------------ */

/** Kalimat penjumlahan dengan kata. Contoh: "tujuh ditambah enam sama dengan tiga belas". */
export const jumlahDua = (a: number, b: number) => a + b;

/**
 * Deret kotak bernomor dengan lompatan maju di atasnya (hlm. 182 dan 184). Diagram polos.
 * `dari` sampai `sampai` ditampilkan. Setiap pasang kotak berurutan dihubungkan lengkungan.
 */
export function DeretMaju({ dari, sampai, kelas = "h-20 w-full" }: { dari: number; sampai: number; kelas?: string }) {
  const banyak = sampai - dari + 1;
  const lebar = Math.min(40, 280 / banyak);
  const mulai = (300 - banyak * lebar) / 2;
  const pusat = (i: number) => mulai + i * lebar + lebar / 2;
  return (
    <svg viewBox="0 0 300 84" className={`block ${kelas}`} role="img" aria-label={`Deret bilangan dari ${dari} sampai ${sampai}, menghitung maju ${banyak - 1} langkah`}>
      {Array.from({ length: banyak - 1 }, (_, i) => (
        <g key={i}>
          <path d={`M${pusat(i)} 30 Q${(pusat(i) + pusat(i + 1)) / 2} 4 ${pusat(i + 1) - 3} 28`} fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <path d={`M${pusat(i + 1) - 9} 22 L${pusat(i + 1) - 3} 28 L${pusat(i + 1) - 11} 32`} fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      {Array.from({ length: banyak }, (_, i) => (
        <g key={i}>
          <rect x={mulai + i * lebar} y="36" width={lebar} height="36" fill={i === 0 ? "#FDE68A" : i % 2 ? "#F3E8FF" : "#E9D5F3"} stroke={BIRU} strokeWidth="2.4" />
          <text x={pusat(i)} y="60" textAnchor="middle" fontSize={lebar < 30 ? 14 : 17} fontWeight="900" fill={BIRU}>
            {dari + i}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Tabel nilai tempat untuk penjumlahan bersusun: bilangan pertama, bilangan kedua, lalu hasil. */
export function TabelTambah({
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
      <div
        role="table"
        aria-label={`Tabel penjumlahan nilai tempat: ${a} ditambah ${b}`}
        className="grid w-full grid-cols-2 overflow-hidden rounded-xl border-4 border-[#1C01A5] bg-white text-center"
      >
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
        <span role="cell" className={`border-r-2 border-[#1C01A5]/50 font-black text-[#B91C1C] ${tinggi}`}>
          {Math.floor(b / 10) > 0 ? Math.floor(b / 10) : ""}
        </span>
        <span role="cell" className={`font-black text-[#1D4ED8] ${tinggi}`}>
          {b % 10}
        </span>
        <span role="cell" className={`border-r-2 border-t-4 border-r-[#1C01A5]/50 border-t-[#1C01A5] font-black text-[#B91C1C] ${tinggi} ${isiHasil(puluhHasil)}`}>
          {sel(puluhHasil)}
        </span>
        <span role="cell" className={`border-t-4 border-t-[#1C01A5] font-black text-[#1D4ED8] ${tinggi} ${isiHasil(satuHasil)}`}>
          {sel(satuHasil)}
        </span>
      </div>
      <span className={`absolute font-black text-[#1C01A5] ${kecil ? "text-2xl" : "text-4xl"}`} style={{ right: 0, top: "44%" }} aria-hidden="true">
        +
      </span>
    </div>
  );
}

/** Garis bilangan dengan titik mulai dan lompatan maju yang sudah dilakukan. Diagram polos. */
export function GarisLompat({
  dari,
  sampai,
  mulai,
  lompat,
  kelas = "h-24 w-full",
}: {
  dari: number;
  sampai: number;
  mulai: number;
  /** Bilangan tempat mendarat tiap lompatan, berurutan. */
  lompat: number[];
  kelas?: string;
}) {
  const banyak = sampai - dari;
  const x = (n: number) => 16 + ((n - dari) * 268) / banyak;
  const rangkaian = [mulai, ...lompat];
  return (
    <svg viewBox="0 0 300 96" className={`block ${kelas}`} role="img" aria-label={`Garis bilangan ${dari} sampai ${sampai}, mulai dari ${mulai} lalu melompat ${lompat.length} kali`}>
      <path d="M6 62 H294 M288 56 L294 62 L288 68" fill="none" stroke={BIRU} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {Array.from({ length: banyak + 1 }, (_, i) => {
        const n = dari + i;
        const sorot = n === mulai || n === rangkaian[rangkaian.length - 1];
        return (
          <g key={n}>
            <path d={`M${x(n)} ${sorot ? 54 : 56} V68`} stroke={BIRU} strokeWidth={sorot ? 3.4 : 2.2} strokeLinecap="round" />
            <text x={x(n)} y="86" textAnchor="middle" fontSize={sorot ? 13.5 : 11.5} fontWeight="900" fill={sorot ? MERAH_B5 : BIRU}>
              {n}
            </text>
          </g>
        );
      })}
      {lompat.map((n, i) => {
        const a = rangkaian[i];
        const tengah = (x(a) + x(n)) / 2;
        return <path key={`${a}-${n}`} d={`M${x(a)} 52 Q${tengah} 18 ${x(n)} 52`} fill="none" stroke={BIRU_B5} strokeWidth="2.8" strokeLinecap="round" />;
      })}
      <g>
        <circle cx={x(mulai)} cy="12" r="9" fill="#FFE566" stroke={BIRU} strokeWidth="2.4" />
        <path d={`M${x(mulai)} 21 V50`} stroke={BIRU} strokeWidth="2" strokeLinecap="round" strokeDasharray="1 5" />
      </g>
    </svg>
  );
}
