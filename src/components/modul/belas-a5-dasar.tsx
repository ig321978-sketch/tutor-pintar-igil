"use client";

import React from "react";
import { BIRU, EMAS, KUNING } from "./CeritaBandingB";
import { kata } from "./SubBabBBanding";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan sampai 20       */
/* (Buku Siswa Kelas 1 hlm. 148-158). Bagian gambar yang dipakai bersama.     */
/* Semua dibuat di klien (SVG), tanpa panggilan API.                          */
/* Naskah: naskah/mtk-1-bab5-sub-a-menghitung-membaca-menulis-bilangan.md      */
/* ------------------------------------------------------------------------ */

export const MERAH_B5 = "#E53E3E";
export const BIRU_B5 = "#2563EB";

/** Nama bilangan 0 sampai 20 dalam huruf kecil, untuk kalimat yang dibacakan. */
export const sebut = (n: number) => kata(n).toLowerCase();

/** Banyak "belas": bilangan 11 sampai 19 adalah sepuluh ditambah satuannya. */
export const sisaDariSepuluh = (n: number) => n - 10;

const WARNA_KELERENG = [MERAH_B5, BIRU_B5, "#16A34A", EMAS, "#9333EA", "#EA580C"];

/** Satu kelereng berkilau. Dipakai di tahap Concrete (benda nyata). */
export function Kelereng({ warna = 0, kelas = "h-10 w-10" }: { warna?: number; kelas?: string }) {
  const w = WARNA_KELERENG[warna % WARNA_KELERENG.length];
  return (
    <svg viewBox="0 0 40 40" className={kelas} aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill={w} stroke={BIRU} strokeWidth="2.6" />
      <path d="M10 22 Q20 12 30 22" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.55" />
      <ellipse cx="14" cy="13" rx="4.2" ry="2.8" fill="#FFFFFF" opacity="0.85" transform="rotate(-30 14 13)" />
    </svg>
  );
}

/** Satu pensil berdiri. Dipakai di tahap Concrete untuk permainan mengikat sepuluh. */
export function Pensil({ warna = 0, kelas = "h-14 w-5" }: { warna?: number; kelas?: string }) {
  const w = WARNA_KELERENG[warna % WARNA_KELERENG.length];
  return (
    <svg viewBox="0 0 20 64" className={kelas} aria-hidden="true">
      <rect x="3" y="12" width="14" height="40" fill={w} stroke={BIRU} strokeWidth="2.2" />
      <path d="M3 12 L10 2 L17 12 Z" fill="#FDE68A" stroke={BIRU} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M8 6 L10 2 L12 6 Z" fill={BIRU} />
      <rect x="3" y="52" width="14" height="8" rx="2" fill="#F9A8D4" stroke={BIRU} strokeWidth="2.2" />
      <path d="M8 14 V50" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

/** Posisi pusat sel i (0 sampai 19) pada dua bingkai sepuluh yang berdampingan. */
export function posisiSel(i: number): { x: number; y: number } {
  const bingkai = i < 10 ? 0 : 1;
  const j = i % 10;
  const kolom = j % 5;
  const baris = Math.floor(j / 5);
  return { x: 6 + bingkai * 108 + 10 + kolom * 18, y: 8 + 9 + baris * 18 };
}

export const LEBAR_BINGKAI = 210;
export const TINGGI_BINGKAI = 52;

/** Rangka dua bingkai sepuluh. Bingkai kedua boleh disamarkan kalau tidak dipakai. */
export function RangkaBingkai({ pakaiKedua = true }: { pakaiKedua?: boolean }) {
  return (
    <>
      <rect x="6" y="8" width="94" height="38" rx="4" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.6" />
      <path d="M6 27 H100 M24 8 V46 M42 8 V46 M60 8 V46 M78 8 V46" stroke={BIRU} strokeWidth="1.4" opacity="0.45" />
      <g opacity={pakaiKedua ? 1 : 0.35}>
        <rect x="114" y="8" width="94" height="38" rx="4" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.6" />
        <path d="M114 27 H208 M132 8 V46 M150 8 V46 M168 8 V46 M186 8 V46" stroke={BIRU} strokeWidth="1.4" opacity="0.45" />
      </g>
    </>
  );
}

/**
 * Dua bingkai sepuluh polos (diagram, bukan gambar benda).
 * Merah untuk yang sudah ada, biru untuk yang datang lagi (sepuluh dulu, lalu sisanya).
 */
export function BingkaiGanda({
  isi,
  sepuluhDulu = true,
  kelas = "h-14 w-full max-w-[300px]",
  label,
}: {
  isi: number;
  sepuluhDulu?: boolean;
  kelas?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${LEBAR_BINGKAI + 4} ${TINGGI_BINGKAI}`}
      className={`mx-auto block ${kelas}`}
      role="img"
      aria-label={label ?? `Dua bingkai sepuluh berisi ${isi} titik`}
    >
      <RangkaBingkai pakaiKedua={isi > 10} />
      {Array.from({ length: isi }, (_, i) => {
        const p = posisiSel(i);
        const biru = sepuluhDulu && i >= 10;
        return <circle key={i} cx={p.x} cy={p.y} r="6.6" fill={biru ? BIRU_B5 : MERAH_B5} stroke={BIRU} strokeWidth="1.6" />;
      })}
    </svg>
  );
}

/** Bagan pasangan bilangan: bilangan utuh di atas, dua bagiannya di bawah. */
export function Ikatan({
  atas,
  kiri,
  kanan,
  kelas = "h-24 w-28",
}: {
  atas: number | null;
  kiri: number | null;
  kanan: number | null;
  kelas?: string;
}) {
  const bulat = (cx: number, cy: number, v: number | null, isi: string) => (
    <g>
      <circle cx={cx} cy={cy} r="19" fill={v === null ? "#FFFFFF" : isi} stroke={BIRU} strokeWidth="3" strokeDasharray={v === null ? "4 4" : undefined} />
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize={v !== null && v > 9 ? 20 : 24} fontWeight="900" fill={BIRU}>
        {v === null ? "?" : v}
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 120 104"
      className={`mx-auto block ${kelas}`}
      role="img"
      aria-label={`Pasangan bilangan: ${atas ?? "tanda tanya"} dibagi menjadi ${kiri ?? "tanda tanya"} dan ${kanan ?? "tanda tanya"}`}
    >
      <path d="M50 38 L32 62 M70 38 L88 62" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      {bulat(60, 24, atas, KUNING)}
      {bulat(28, 80, kiri, "#FECACA")}
      {bulat(92, 80, kanan, "#BFDBFE")}
    </svg>
  );
}

/** Garis bilangan 10 sampai 20 dengan tanda yang bisa disorot. Tanpa gambar benda. */
export function GarisBilangan({
  dari = 10,
  sampai = 20,
  lompat = [],
  kelas = "h-20 w-full",
}: {
  dari?: number;
  sampai?: number;
  /** Pasangan [asal, tujuan] yang digambar sebagai lompatan. */
  lompat?: [number, number][];
  kelas?: string;
}) {
  const banyak = sampai - dari;
  const x = (n: number) => 14 + ((n - dari) * 272) / banyak;
  return (
    <svg viewBox="0 0 300 84" className={`block ${kelas}`} role="img" aria-label={`Garis bilangan dari ${dari} sampai ${sampai}`}>
      <path d="M6 52 H294 M288 46 L294 52 L288 58" fill="none" stroke={BIRU} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {Array.from({ length: banyak + 1 }, (_, i) => {
        const n = dari + i;
        const sepuluh = n === 10 || n === 20;
        return (
          <g key={n}>
            <path d={`M${x(n)} ${sepuluh ? 44 : 46} V${sepuluh ? 60 : 58}`} stroke={BIRU} strokeWidth={sepuluh ? 3.4 : 2.4} strokeLinecap="round" />
            <text x={x(n)} y="76" textAnchor="middle" fontSize="12" fontWeight="900" fill={sepuluh ? MERAH_B5 : BIRU}>
              {n}
            </text>
          </g>
        );
      })}
      {lompat.map(([a, b], i) => {
        const tengah = (x(a) + x(b)) / 2;
        return (
          <g key={`${a}-${b}-${i}`}>
            <path d={`M${x(a)} 44 Q${tengah} 8 ${x(b)} 44`} fill="none" stroke={BIRU_B5} strokeWidth="2.8" strokeLinecap="round" />
            <path d={`M${x(b) - 5} 36 L${x(b)} 44 L${x(b) - 8} 45`} fill="none" stroke={BIRU_B5} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
    </svg>
  );
}

/** Sepuluh titik dilingkari, sisanya di luar lingkaran (hlm. 153). Diagram polos. */
export function LingkariSepuluh({ jumlah, kelas = "h-24 w-full max-w-[280px]" }: { jumlah: number; kelas?: string }) {
  const sisa = jumlah - 10;
  return (
    <svg viewBox="0 0 280 96" className={`mx-auto block ${kelas}`} role="img" aria-label={`Sepuluh titik dilingkari, ${sisa} titik di luar lingkaran`}>
      <rect x="6" y="10" width="170" height="76" rx="30" fill="#FFF7CC" stroke={EMAS} strokeWidth="3.4" strokeDasharray="7 5" />
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={30 + (i % 5) * 30} cy={36 + Math.floor(i / 5) * 32} r="10" fill={MERAH_B5} stroke={BIRU} strokeWidth="2" />
      ))}
      {Array.from({ length: sisa }, (_, i) => (
        <circle key={`s${i}`} cx={206 + (i % 2) * 28} cy={26 + Math.floor(i / 2) * 22} r="9" fill={BIRU_B5} stroke={BIRU} strokeWidth="2" />
      ))}
    </svg>
  );
}