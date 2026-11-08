"use client";

import React from "react";
import { BIRU, EMAS, KUNING } from "./CeritaBandingB";
import { BIRU_B5, MERAH_B5 } from "./belas-a5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab B: Menghitung Maju dan Mundur (Buku Siswa Kelas 1            */
/* hlm. 158-160). Bagian gambar yang dipakai bersama. Semua dibuat di klien   */
/* (SVG dan HTML), tanpa panggilan API.                                       */
/* Naskah: naskah/mtk-1-bab5-sub-b-menghitung-maju-dan-mundur.md              */
/* ------------------------------------------------------------------------ */

/** Warna baris kelereng Halim pada buku: 10 merah, 11 jingga, 12 biru muda, 13 hijau, 14 merah muda, 15 ungu. */
export const WARNA_BARIS = ["#E53E3E", "#F59E0B", "#0EA5E9", "#16A34A", "#DB2777", "#7C3AED"];
export const warnaBaris = (n: number) => WARNA_BARIS[Math.abs(n - 10) % WARNA_BARIS.length];

/** Arah menghitung. */
export type Arah = "maju" | "mundur";

/** Tiga pilihan angka di sekitar kunci (1 sampai 20). Urutan diputar supaya kunci tidak selalu di tengah. */
export function opsiSekitar(n: number): number[] {
  const calon = [n - 1, n, n + 1].filter((x) => x >= 1 && x <= 20);
  if (calon.length < 3) calon.push(n >= 20 ? n - 2 : n + 2);
  const urut = calon.sort((a, b) => a - b);
  const putar = n % 3;
  return [...urut.slice(putar), ...urut.slice(0, putar)];
}

export const NAMA_ARAH: Record<Arah, string> = { maju: "maju", mundur: "mundur" };

/** Barisan kelereng Halim seperti pada buku: tiap baris lebih banyak satu. Poster, boleh memakai gambar benda. */
export function BarisKelerengPoster({
  dari = 10,
  sampai = 15,
  kosong = [],
  kelas = "h-auto w-full max-w-[320px]",
}: {
  dari?: number;
  sampai?: number;
  /** Nomor baris yang labelnya disamarkan (tanda titik-titik). */
  kosong?: number[];
  kelas?: string;
}) {
  const baris: number[] = [];
  for (let n = sampai; n >= dari; n--) baris.push(n);
  const tinggiBaris = 17;
  const tinggi = baris.length * tinggiBaris + 6;
  return (
    <svg viewBox={`0 0 232 ${tinggi}`} className={`mx-auto block ${kelas}`} role="img" aria-label={`Barisan kelereng dari ${dari} sampai ${sampai}, tiap baris lebih banyak satu`}>
      {baris.map((n, i) => (
        <g key={n}>
          <text x="24" y={i * tinggiBaris + 17} textAnchor="end" fontSize="13" fontWeight="900" fill={BIRU}>
            {kosong.includes(n) ? "…" : n}
          </text>
          {Array.from({ length: n }, (_, j) => (
            <g key={j}>
              <circle cx={34 + j * 12.2 + 5.4} cy={i * tinggiBaris + 12} r="5.4" fill={warnaBaris(n)} stroke={BIRU} strokeWidth="1.5" />
              <ellipse cx={34 + j * 12.2 + 3.6} cy={i * tinggiBaris + 9.6} rx="1.8" ry="1.2" fill="#FFFFFF" opacity="0.85" />
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

/**
 * Garis bilangan dua arah. Lompatan maju digambar di atas garis (biru), lompatan mundur di bawah garis (merah).
 * Diagram polos, tanpa gambar benda.
 */
export function GarisDuaArah({
  dari,
  sampai,
  mulai,
  akhir,
  tampilMaju = true,
  tampilMundur = true,
  kelas = "h-32 w-full",
}: {
  dari: number;
  sampai: number;
  mulai: number;
  akhir: number;
  tampilMaju?: boolean;
  tampilMundur?: boolean;
  kelas?: string;
}) {
  const banyak = sampai - dari;
  const x = (n: number) => 16 + ((n - dari) * 268) / banyak;
  const kecil = Math.min(mulai, akhir);
  const besar = Math.max(mulai, akhir);
  const maju: number[] = [];
  const mundur: number[] = [];
  for (let a = kecil; a < besar; a++) maju.push(a);
  for (let a = besar; a > kecil; a--) mundur.push(a);
  return (
    <svg viewBox="0 0 300 112" className={`block ${kelas}`} role="img" aria-label={`Garis bilangan ${dari} sampai ${sampai}. Maju dari ${kecil} ke ${besar} ke kanan, mundur dari ${besar} ke ${kecil} ke kiri.`}>
      <path d="M6 48 H294 M288 42 L294 48 L288 54" fill="none" stroke={BIRU} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {Array.from({ length: banyak + 1 }, (_, i) => {
        const n = dari + i;
        const ujung = n === kecil || n === besar;
        return (
          <g key={n}>
            <path d={`M${x(n)} 42 V54`} stroke={BIRU} strokeWidth={ujung ? 3.4 : 2.2} strokeLinecap="round" />
            <text x={x(n)} y="68" textAnchor="middle" fontSize="12" fontWeight="900" fill={ujung ? MERAH_B5 : BIRU}>
              {n}
            </text>
          </g>
        );
      })}
      {tampilMaju
        ? maju.map((a) => {
            const m = (x(a) + x(a + 1)) / 2;
            return (
              <g key={`maju-${a}`}>
                <path d={`M${x(a)} 40 Q${m} 8 ${x(a + 1)} 40`} fill="none" stroke={BIRU_B5} strokeWidth="2.8" strokeLinecap="round" />
                <path d={`M${x(a + 1) - 5} 31 L${x(a + 1)} 40 L${x(a + 1) - 8} 41`} fill="none" stroke={BIRU_B5} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            );
          })
        : null}
      {tampilMundur
        ? mundur.map((a) => {
            const m = (x(a) + x(a - 1)) / 2;
            return (
              <g key={`mundur-${a}`}>
                <path d={`M${x(a)} 76 Q${m} 108 ${x(a - 1)} 76`} fill="none" stroke={MERAH_B5} strokeWidth="2.8" strokeLinecap="round" />
                <path d={`M${x(a - 1) + 5} 85 L${x(a - 1)} 76 L${x(a - 1) + 8} 75`} fill="none" stroke={MERAH_B5} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            );
          })
        : null}
    </svg>
  );
}

/** Kisi bilangan 1 sampai 20: lima kotak tiap baris, empat baris (hlm. 160). Dipakai sebagai poster. */
export function KisiBilangan({
  sorot = [],
  kosong = [],
  kelas = "w-full max-w-[300px]",
}: {
  sorot?: number[];
  kosong?: number[];
  kelas?: string;
}) {
  return (
    <div className={`mx-auto grid grid-cols-5 overflow-hidden rounded-xl border-4 border-[#1C01A5] bg-white ${kelas}`} role="table" aria-label="Kisi bilangan satu sampai dua puluh">
      {Array.from({ length: 20 }, (_, i) => {
        const n = i + 1;
        const hilang = kosong.includes(n);
        return (
          <span
            key={n}
            role="cell"
            className={`flex h-11 items-center justify-center border border-[#1C01A5]/40 text-2xl font-black text-[#1C01A5] ${
              sorot.includes(n) ? "bg-[#FFE566]" : hilang ? "bg-[#FFF7CC]" : "bg-white"
            }`}
          >
            {hilang ? "?" : n}
          </span>
        );
      })}
    </div>
  );
}

/** Isi kepala ulat (kotak 52 kali 52), untuk disisipkan di dalam gambar lain. */
export function IsiKepalaUlat() {
  return (
    <g>
      <path d="M17 11 Q13 3 8 5 M35 11 Q39 3 44 5" fill="none" stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="8" cy="4.6" r="2.8" fill="#EF4444" stroke={BIRU} strokeWidth="1.4" />
      <circle cx="44" cy="4.6" r="2.8" fill="#EF4444" stroke={BIRU} strokeWidth="1.4" />
      <circle cx="26" cy="29" r="20" fill="#86EFAC" stroke={BIRU} strokeWidth="3" />
      <circle cx="18" cy="25" r="5.4" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.8" />
      <circle cx="34" cy="25" r="5.4" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.8" />
      <circle cx="19" cy="25.5" r="2.4" fill={BIRU} />
      <circle cx="35" cy="25.5" r="2.4" fill={BIRU} />
      <path d="M17 37 Q26 45 35 37" fill="none" stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="12" cy="34" rx="3.4" ry="2.2" fill="#F9A8D4" opacity="0.8" />
      <ellipse cx="40" cy="34" rx="3.4" ry="2.2" fill="#F9A8D4" opacity="0.8" />
    </g>
  );
}

/** Kepala ulat bilangan sebagai gambar sendiri. */
export function KepalaUlat({ kelas = "h-14 w-14" }: { kelas?: string }) {
  return (
    <svg viewBox="0 0 52 52" className={kelas} aria-hidden="true">
      <IsiKepalaUlat />
    </svg>
  );
}

const WARNA_ESKRIM = ["#F9A8D4", "#FDE68A", "#A7F3D0", "#BAE6FD", "#DDD6FE", "#FDBA74"];

/** Satu es krim bernomor. `n` menentukan warna agar es krim mudah dibedakan. */
export function EsKrim({ n, kelas = "h-24 w-16" }: { n: number; kelas?: string }) {
  const warna = WARNA_ESKRIM[n % WARNA_ESKRIM.length];
  return (
    <svg viewBox="0 0 60 92" className={kelas} aria-hidden="true">
      <polygon points="10,46 50,46 30,89" fill="#F3B76B" stroke={BIRU} strokeWidth="2.8" strokeLinejoin="round" />
      <path d="M17 54 L43 54 M22 64 L38 64 M17 54 L30 82 M43 54 L30 82 M23 48 L35 76 M37 48 L25 76" stroke="#B9722C" strokeWidth="1.2" opacity="0.7" fill="none" />
      <path d="M6 38 C4 22 14 8 30 8 C46 8 56 22 54 38 C50 46 44 42 40 48 C36 42 28 50 22 44 C16 48 10 44 6 38 Z" fill={warna} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="18" cy="20" rx="5" ry="3" fill="#FFFFFF" opacity="0.7" transform="rotate(-25 18 20)" />
      <text x="30" y="36" textAnchor="middle" fontSize={n > 9 ? 19 : 22} fontWeight="900" fill={BIRU}>
        {n}
      </text>
    </svg>
  );
}

/** Roket mainan untuk hitung mundur. `nyala` memperlihatkan api di bawah roket. */
export function Roket({ nyala = false, kelas = "h-20 w-12" }: { nyala?: boolean; kelas?: string }) {
  return (
    <svg viewBox="0 0 48 80" className={kelas} aria-hidden="true">
      {nyala ? (
        <g className="igil-denyut">
          <path d="M16 56 Q24 86 32 56 Z" fill="#F97316" stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
          <path d="M20 56 Q24 74 28 56 Z" fill={KUNING} />
        </g>
      ) : null}
      <path d="M24 3 C36 14 38 34 36 56 H12 C10 34 12 14 24 3 Z" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 3 C30 8 33 14 34 19 H14 C15 14 18 8 24 3 Z" fill={MERAH_B5} stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="24" cy="32" r="6.2" fill="#BFDBFE" stroke={BIRU} strokeWidth="2.4" />
      <path d="M12 44 L2 60 L12 56 Z M36 44 L46 60 L36 56 Z" fill={EMAS} stroke={BIRU} strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="15" y="54" width="18" height="6" rx="2" fill={BIRU_B5} stroke={BIRU} strokeWidth="2" />
    </svg>
  );
}

/** Bola lampu hitung mundur. `nyala` berarti lampu masih menyala (belum disebut). */
export function Lampu({ n, nyala, kelas = "h-14 w-14" }: { n: number; nyala: boolean; kelas?: string }) {
  return (
    <svg viewBox="0 0 56 56" className={kelas} aria-hidden="true">
      <circle cx="28" cy="26" r="21" fill={nyala ? KUNING : "#E5E7EB"} stroke={BIRU} strokeWidth="3" />
      {nyala ? <circle cx="28" cy="26" r="26" fill="none" stroke={EMAS} strokeWidth="2" strokeDasharray="3 5" opacity="0.8" /> : null}
      <path d="M17 18 Q22 10 30 11" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity={nyala ? 0.9 : 0.5} />
      <text x="28" y="35" textAnchor="middle" fontSize={n > 9 ? 22 : 26} fontWeight="900" fill={nyala ? BIRU : "#9CA3AF"}>
        {n}
      </text>
      <rect x="19" y="46" width="18" height="8" rx="3" fill="#9CA3AF" stroke={BIRU} strokeWidth="2" />
    </svg>
  );
}
