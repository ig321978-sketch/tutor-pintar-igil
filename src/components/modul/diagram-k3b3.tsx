"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Diagram Kelas 3 Bab 3 (Pengukuran Panjang dan Berat), tahap Picture dan       */
/* Abstract: penggaris, batang polos, dan garis meteran. Hanya garis, angka, dan  */
/* batang berwarna. TIDAK ada gambar benda dan tidak ada emoji. Benda nyata di   */
/* tahap Concrete ada di berkas dasar bab ini dan memakai penggaris dari sini.     */
/* ------------------------------------------------------------------------ */

const TINTA = "#1C01A5";
/** Lebar satu sentimeter pada penggaris (satuan gambar) dan titik nol. */
export const U = 20;
export const X0 = 12;
/** Posisi x untuk sebuah ukuran sentimeter pada penggaris. */
export const xCm = (cm: number): number => X0 + cm * U;

/**
 * Penggaris 0 sampai `maks` sentimeter. Lapisan benda (anak) digambar di atas penggaris dengan koordinat `xCm`.
 * Tinggi lapisan benda 4 sampai 34, penggaris 36 sampai 74.
 */
export function PenggarisSvg({ maks = 15, children, label, ringkas = false, mm = false }: { maks?: number; children?: React.ReactNode; label?: string; ringkas?: boolean; mm?: boolean }) {
  const W = X0 * 2 + maks * U;
  return (
    <svg viewBox={`0 0 ${W} 78`} className="block h-auto w-full max-w-[340px]" role="img" aria-label={label ?? `Penggaris dari 0 sampai ${maks} sentimeter`}>
      {children}
      <rect x="2" y="36" width={W - 4} height="38" rx="6" fill="#FEF3C7" stroke={TINTA} strokeWidth="2.4" />
      {mm
        ? Array.from({ length: maks * 10 }, (_, i) => (i % 5 === 0 ? null : <line key={`m${i}`} x1={xCm(i / 10)} x2={xCm(i / 10)} y1="36" y2="41" stroke={TINTA} strokeWidth="0.9" />))
        : null}
      {Array.from({ length: maks }, (_, i) => (
        <line key={`s${i}`} x1={xCm(i + 0.5)} x2={xCm(i + 0.5)} y1="36" y2="44" stroke={TINTA} strokeWidth="1.4" />
      ))}
      {Array.from({ length: maks + 1 }, (_, i) => (
        <g key={i}>
          <line x1={xCm(i)} x2={xCm(i)} y1="36" y2="52" stroke={TINTA} strokeWidth="2.2" />
          {!ringkas || maks <= 10 || i % 5 === 0 ? (
            <text x={xCm(i)} y="68" textAnchor="middle" fontSize={ringkas ? 17 : 12} fontWeight="900" fill={TINTA}>
              {i}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}

/** Batang polos di atas penggaris, mulai dari `offset` sentimeter dengan panjang `panjang` sentimeter. */
export function BatangUkur({ offset = 0, panjang, warna = "#F87171" }: { offset?: number; panjang: number; warna?: string }) {
  return <rect x={xCm(offset)} y="8" width={panjang * U} height="24" rx="6" fill={warna} stroke={TINTA} strokeWidth="2.4" />;
}

/** Penggaris dengan satu batang polos. Dipakai tahap Picture. */
export function PenggarisBatang({ panjang, offset = 0, maks = 15, warna, ringkas = false }: { panjang: number; offset?: number; maks?: number; warna?: string; ringkas?: boolean }) {
  return (
    <PenggarisSvg maks={maks} ringkas={ringkas} label={`Batang sepanjang ${panjang} sentimeter pada penggaris, dimulai dari angka ${offset}`}>
      <BatangUkur offset={offset} panjang={panjang} warna={warna} />
    </PenggarisSvg>
  );
}

/** Penggaris dengan dua batang polos yang sama-sama mulai dari 0 (membandingkan dua panjang). */
export function PenggarisDuaBatang({ a, b, maks = 15 }: { a: number; b: number; maks?: number }) {
  return (
    <svg viewBox={`0 0 ${X0 * 2 + maks * U} 108`} className="block h-auto w-full max-w-[340px]" role="img" aria-label={`Dua batang: ${a} dan ${b} sentimeter pada penggaris`}>
      <g>
        <rect x={xCm(0)} y="4" width={a * U} height="22" rx="6" fill="#F87171" stroke={TINTA} strokeWidth="2.4" />
        <rect x={xCm(0)} y="30" width={b * U} height="22" rx="6" fill="#60A5FA" stroke={TINTA} strokeWidth="2.4" />
      </g>
      <g transform="translate(0 30)">
        <rect x="2" y="26" width={X0 * 2 + maks * U - 4} height="38" rx="6" fill="#FEF3C7" stroke={TINTA} strokeWidth="2.4" />
        {Array.from({ length: maks + 1 }, (_, i) => (
          <g key={i}>
            <line x1={xCm(i)} x2={xCm(i)} y1="26" y2="42" stroke={TINTA} strokeWidth="2.2" />
            <text x={xCm(i)} y="57" textAnchor="middle" fontSize="12" fontWeight="900" fill={TINTA}>
              {i}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/**
 * Garis meteran 0 sampai `meter` meter. Batang berwarna menunjukkan `cm` sentimeter. Penanda tiap 50 cm, angka tiap 1 meter.
 * Dipakai tahap Picture bab hubungan satuan panjang.
 */
export function MeteranSvg({ cm, meter = 3, ringkas = false }: { cm: number; meter?: number; ringkas?: boolean }) {
  const W = 300;
  const L = 250;
  const s = L / (meter * 100);
  const x = (v: number) => 22 + v * s;
  return (
    <svg viewBox={`0 0 ${W} 74`} className="block h-auto w-full max-w-[330px]" role="img" aria-label={`Garis meteran dari 0 sampai ${meter} meter dengan batang sepanjang ${cm} sentimeter`}>
      <rect x={x(0)} y="6" width={cm * s} height="22" rx="6" fill="#F87171" stroke={TINTA} strokeWidth="2.4" />
      <rect x="4" y="34" width={W - 8} height="34" rx="6" fill="#FEF3C7" stroke={TINTA} strokeWidth="2.4" />
      {Array.from({ length: meter * 2 + 1 }, (_, i) => (
        <g key={i}>
          <line x1={x(i * 50)} x2={x(i * 50)} y1="34" y2={i % 2 === 0 ? "52" : "46"} stroke={TINTA} strokeWidth={i % 2 === 0 ? 2.6 : 1.6} />
          {i % 2 === 0 ? (
            <text x={x(i * 50)} y="65" textAnchor="middle" fontSize={ringkas ? 19 : 12} fontWeight="900" fill={TINTA}>
              {i === 0 ? "0" : `${i / 2} m`}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}

/** Dua garis meteran yang disambung: batang pertama lalu batang kedua. */
export function MeteranSambung({ a, b, meter = 4 }: { a: number; b: number; meter?: number }) {
  const W = 300;
  const L = 250;
  const s = L / (meter * 100);
  const x = (v: number) => 22 + v * s;
  return (
    <svg viewBox={`0 0 ${W} 74`} className="block h-auto w-full max-w-[330px]" role="img" aria-label={`Dua batang disambung: ${a} sentimeter lalu ${b} sentimeter`}>
      <rect x={x(0)} y="6" width={a * s} height="22" rx="6" fill="#F87171" stroke={TINTA} strokeWidth="2.4" />
      <rect x={x(a)} y="6" width={b * s} height="22" rx="6" fill="#60A5FA" stroke={TINTA} strokeWidth="2.4" />
      <rect x="4" y="34" width={W - 8} height="34" rx="6" fill="#FEF3C7" stroke={TINTA} strokeWidth="2.4" />
      {Array.from({ length: meter * 2 + 1 }, (_, i) => (
        <g key={i}>
          <line x1={x(i * 50)} x2={x(i * 50)} y1="34" y2={i % 2 === 0 ? "52" : "46"} stroke={TINTA} strokeWidth={i % 2 === 0 ? 2.6 : 1.6} />
          {i % 2 === 0 ? (
            <text x={x(i * 50)} y="64" textAnchor="middle" fontSize="12" fontWeight="900" fill={TINTA}>
              {i === 0 ? "0" : `${i / 2} m`}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}
