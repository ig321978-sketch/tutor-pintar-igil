"use client";

import React from "react";
import { BIRU, EMAS } from "./CeritaBandingB";
import { BIRU_B5, Kelereng, MERAH_B5, Pensil } from "./belas-a5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab C: Nilai Tempat (Buku Siswa Kelas 1 hlm. 160-164).           */
/* Bagian gambar yang dipakai bersama. Semua dibuat di klien (SVG dan HTML),  */
/* tanpa panggilan API.                                                       */
/* Naskah: naskah/mtk-1-bab5-sub-c-nilai-tempat.md                            */
/* ------------------------------------------------------------------------ */

export type JenisBenda5 = "pensil" | "kelereng" | "balok";

/** Nama benda untuk kalimat. `puluh` adalah satu kelompok sepuluh dari benda itu. */
export const NAMA_BENDA5: Record<JenisBenda5, { satu: string; puluh: string }> = {
  pensil: { satu: "pensil", puluh: "ikat pensil" },
  kelereng: { satu: "kelereng", puluh: "kantong kelereng" },
  balok: { satu: "balok", puluh: "menara balok" },
};

const WARNA_GOL = [MERAH_B5, BIRU_B5, "#16A34A", EMAS, "#9333EA", "#EA580C"];

/* ------------------------------ Isi gambar (<g>) ------------------------ */
/* Dipakai di dalam adegan cerita. Tiap isi punya kotak ukur sendiri.        */

/** Sepuluh pensil biru diikat pita kuning. Kotak 84 kali 76. */
export function IsiIkatPensil() {
  return (
    <g>
      {Array.from({ length: 10 }, (_, i) => {
        const x = 3 + i * 7.8;
        return (
          <g key={i}>
            <rect x={x} y="16" width="7" height="50" fill={BIRU_B5} stroke={BIRU} strokeWidth="1.3" />
            <path d={`M${x} 16 L${x + 3.5} 5 L${x + 7} 16 Z`} fill="#FDE68A" stroke={BIRU} strokeWidth="1.2" strokeLinejoin="round" />
            <path d={`M${x + 2.4} 9 L${x + 3.5} 5 L${x + 4.6} 9 Z`} fill={BIRU} />
            <path d={`M${x + 2.4} 20 V62`} stroke="#FFFFFF" strokeWidth="1.2" opacity="0.5" />
          </g>
        );
      })}
      <rect x="1" y="38" width="82" height="9" rx="2.5" fill="#FACC15" stroke={BIRU} strokeWidth="1.8" />
    </g>
  );
}

/** Kantong bening berisi sepuluh kelereng. Kotak 80 kali 84. */
export function IsiKantong() {
  const posisi: [number, number, number][] = [
    [27, 40, 0], [40, 36, 1], [53, 40, 2],
    [21, 54, 3], [34, 52, 4], [47, 52, 5], [60, 54, 0],
    [28, 67, 1], [41, 68, 2], [54, 67, 3],
  ];
  return (
    <g>
      <path d="M26 15 Q40 3 54 15 L51 24 Q75 38 71 62 Q67 80 40 80 Q13 80 9 62 Q5 38 29 24 Z" fill="#EEF2F7" fillOpacity="0.9" stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M29 24 Q40 19 51 24" fill="none" stroke={BIRU} strokeWidth="2" />
      <path d="M32 12 Q40 4 48 12 Q40 16 32 12 Z" fill="#CBD5E1" stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
      {posisi.map(([x, y, w], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6.4" fill={WARNA_GOL[w]} stroke={BIRU} strokeWidth="1.6" />
          <ellipse cx={x - 2} cy={y - 2.4} rx="1.9" ry="1.2" fill="#FFFFFF" opacity="0.85" />
        </g>
      ))}
    </g>
  );
}

/** Satu balok merah dengan dua tonjolan. Kotak 44 kali 30. */
export function IsiBalok() {
  return (
    <g>
      <rect x="4" y="9" width="36" height="17" rx="3" fill="#EF4444" stroke={BIRU} strokeWidth="2.2" />
      <rect x="9" y="3" width="10" height="7" rx="2" fill="#F87171" stroke={BIRU} strokeWidth="1.8" />
      <rect x="25" y="3" width="10" height="7" rx="2" fill="#F87171" stroke={BIRU} strokeWidth="1.8" />
      <path d="M8 13 H36" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.5" strokeLinecap="round" />
    </g>
  );
}

/** Menara sepuluh balok tersusun. Kotak 44 kali 108. */
export function IsiMenara() {
  return (
    <g>
      {Array.from({ length: 10 }, (_, i) => {
        const y = 94 - i * 9.4;
        return <rect key={i} x="6" y={y} width="32" height="9.4" rx="1.6" fill={i % 2 ? "#F87171" : "#EF4444"} stroke={BIRU} strokeWidth="1.6" />;
      })}
      <rect x="10" y="-2" width="9" height="6" rx="2" fill="#F87171" stroke={BIRU} strokeWidth="1.6" />
      <rect x="25" y="-2" width="9" height="6" rx="2" fill="#F87171" stroke={BIRU} strokeWidth="1.6" />
    </g>
  );
}

/** Satu pensil berdiri. Kotak 20 kali 64. */
export function IsiPensil({ warna = BIRU_B5 }: { warna?: string }) {
  return (
    <g>
      <rect x="3" y="12" width="14" height="40" fill={warna} stroke={BIRU} strokeWidth="2" />
      <path d="M3 12 L10 2 L17 12 Z" fill="#FDE68A" stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
      <path d="M8 6 L10 2 L12 6 Z" fill={BIRU} />
      <rect x="3" y="52" width="14" height="8" rx="2" fill="#F9A8D4" stroke={BIRU} strokeWidth="2" />
      <path d="M8 14 V50" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
    </g>
  );
}

/** Satu kelereng. Kotak 40 kali 40. */
export function IsiKelereng({ warna = 0 }: { warna?: number }) {
  const w = WARNA_GOL[warna % WARNA_GOL.length];
  return (
    <g>
      <circle cx="20" cy="20" r="16" fill={w} stroke={BIRU} strokeWidth="2.6" />
      <ellipse cx="14" cy="13" rx="4.2" ry="2.8" fill="#FFFFFF" opacity="0.85" transform="rotate(-30 14 13)" />
    </g>
  );
}

/* ------------------------------ Gambar berdiri sendiri ------------------ */

function Bungkus({ w, h, kelas, children }: { w: number; h: number; kelas: string; children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={kelas} aria-hidden="true">
      {children}
    </svg>
  );
}

export function IkatPensil({ kelas = "h-16 w-[4.5rem]" }: { kelas?: string }) {
  return (
    <Bungkus w={84} h={76} kelas={kelas}>
      <IsiIkatPensil />
    </Bungkus>
  );
}

export function KantongKelereng({ kelas = "h-16 w-16" }: { kelas?: string }) {
  return (
    <Bungkus w={80} h={84} kelas={kelas}>
      <IsiKantong />
    </Bungkus>
  );
}

export function MenaraBalok({ kelas = "h-24 w-10" }: { kelas?: string }) {
  return (
    <Bungkus w={44} h={106} kelas={kelas}>
      <IsiMenara />
    </Bungkus>
  );
}

export function BalokSatu({ kelas = "h-9 w-12" }: { kelas?: string }) {
  return (
    <Bungkus w={44} h={30} kelas={kelas}>
      <IsiBalok />
    </Bungkus>
  );
}

/** Benda satu kelompok sepuluh menurut jenisnya (tahap Concrete). */
export function ObjekPuluhan({ jenis, kelas }: { jenis: JenisBenda5; kelas?: string }) {
  if (jenis === "pensil") return <IkatPensil kelas={kelas ?? "h-16 w-[4.5rem]"} />;
  if (jenis === "kelereng") return <KantongKelereng kelas={kelas ?? "h-16 w-16"} />;
  return <MenaraBalok kelas={kelas ?? "h-24 w-10"} />;
}

/** Satu benda menurut jenisnya (tahap Concrete). */
export function ObjekSatuan({ jenis, warna = 0, kelas }: { jenis: JenisBenda5; warna?: number; kelas?: string }) {
  if (jenis === "pensil") return <Pensil warna={1} kelas={kelas ?? "h-12 w-4"} />;
  if (jenis === "kelereng") return <Kelereng warna={warna} kelas={kelas ?? "h-9 w-9"} />;
  return <BalokSatu kelas={kelas ?? "h-9 w-12"} />;
}

/** Kubus satuan (alat peraga Dienes). */
export function KubusSatuan({ kelas = "h-8 w-8", terpilih = false }: { kelas?: string; terpilih?: boolean }) {
  return (
    <svg viewBox="0 0 28 28" className={kelas} aria-hidden="true">
      <rect x="2.5" y="2.5" width="23" height="23" rx="3" fill={terpilih ? "#FDBA74" : "#FDE68A"} stroke={BIRU} strokeWidth="2.6" />
      <path d="M7 9 H21" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/** Batang sepuluh (alat peraga Dienes): sepuluh kubus tersambung. */
export function BatangSepuluh({ kelas = "h-24 w-8" }: { kelas?: string }) {
  return (
    <svg viewBox="0 0 28 108" className={kelas} aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x="2.5" y={2.5 + i * 10.3} width="23" height="10.3" fill="#FBBF24" stroke={BIRU} strokeWidth="1.8" />
      ))}
      <path d="M7 6 V100" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/* ------------------------------ Diagram polos (Picture) ----------------- */

/** Diagram batang polos: tiap batang sama dengan sepuluh kotak kecil, lalu kotak kecil sisanya. Tanpa gambar benda. */
export function DiagramBatang({ puluhan, satuan, kelas = "h-36 w-44" }: { puluhan: number; satuan: number; kelas?: string }) {
  const kotak = 11;
  const tinggiBatang = kotak * 10;
  const awalSatuan = 10 + puluhan * 34 + 26;
  const tengahPuluhan = 10 + 11 + ((puluhan - 1) * 34) / 2;
  const lebar = awalSatuan + 22 + 14;
  return (
    <svg viewBox={`0 0 ${Math.max(lebar, 130)} 130`} className={`mx-auto block ${kelas}`} role="img" aria-label={`Diagram: ${puluhan} batang sepuluh dan ${satuan} kotak kecil`}>
      {Array.from({ length: puluhan }, (_, p) => (
        <g key={p}>
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={10 + p * 34} y={6 + i * kotak} width="22" height={kotak} fill="#BFDBFE" stroke={BIRU} strokeWidth="1.6" />
          ))}
          <rect x={10 + p * 34} y="6" width="22" height={tinggiBatang} fill="none" stroke={BIRU} strokeWidth="3" />
        </g>
      ))}
      {Array.from({ length: satuan }, (_, i) => (
        <rect key={i} x={awalSatuan} y={6 + tinggiBatang - (i + 1) * kotak} width="22" height={kotak} fill="#FECACA" stroke={BIRU} strokeWidth="1.6" />
      ))}
      <text x={tengahPuluhan} y="126" textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU_B5}>
        puluhan
      </text>
      <text x={awalSatuan + 11} y="126" textAnchor="middle" fontSize="11" fontWeight="900" fill={MERAH_B5}>
        satuan
      </text>
    </svg>
  );
}
/** Tabel nilai tempat dua kolom: Puluhan dan Satuan. */
export function TabelNilai({
  puluhan,
  satuan,
  kelas = "max-w-[220px]",
  kecil = false,
}: {
  puluhan: number | "?" | null;
  satuan: number | "?" | null;
  kelas?: string;
  kecil?: boolean;
}) {
  const sel = (v: number | "?" | null) => (v === null ? "" : v);
  return (
    <div
      role="table"
      aria-label={`Tabel nilai tempat: ${puluhan === null ? "kosong" : puluhan} puluhan, ${satuan === null ? "kosong" : satuan} satuan`}
      className={`mx-auto grid w-full grid-cols-2 overflow-hidden rounded-xl border-4 border-[#1C01A5] bg-white text-center ${kelas}`}
    >
      <span role="columnheader" className={`border-r-2 border-[#1C01A5]/50 bg-[#E9D8F3] font-black text-[#1C01A5] ${kecil ? "py-0.5 text-[10px] leading-tight" : "py-1 text-sm"}`}>
        Puluhan
      </span>
      <span role="columnheader" className={`bg-[#E9D8F3] font-black text-[#1C01A5] ${kecil ? "py-0.5 text-[10px] leading-tight" : "py-1 text-sm"}`}>
        Satuan
      </span>
      <span role="cell" className={`border-r-2 border-[#1C01A5]/50 font-black text-[#B91C1C] ${kecil ? "py-1 text-2xl" : "py-2 text-4xl"}`}>
        {sel(puluhan)}
      </span>
      <span role="cell" className={`font-black text-[#1D4ED8] ${kecil ? "py-1 text-2xl" : "py-2 text-4xl"}`}>
        {sel(satuan)}
      </span>
    </div>
  );
}

/** Kalimat nilai tempat: "1 puluhan dan 3 satuan = 13". */
export function kalimatNilai(puluhan: number, satuan: number): string {
  return `${puluhan} puluhan dan ${satuan} satuan = ${puluhan * 10 + satuan}`;
}
