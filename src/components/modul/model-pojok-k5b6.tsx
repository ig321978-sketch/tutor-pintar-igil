"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B6 Sub-Bab A: pojok benda dan patokan siku-siku. Ukuran      */
/* pojok hanya dipakai untuk menggambar, tidak pernah ditulis di layar.        */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MUDA = "#FFF3B0";
const rad = (deg: number) => (deg * Math.PI) / 180;
const bulat = (n: number) => Math.round(n * 100) / 100;

/**
 * Pojok sebuah benda: dua sisi dari satu titik. Bila patokan ditempel, garis putus emas tegak lurus ikut tergambar
 * dengan tanda siku kecil. deg di antara 0 dan 180.
 */
export function GambarPojok({ deg, patokan, nama }: { deg: number; patokan: boolean; nama: string }) {
  const vx = 80;
  const vy = 125;
  const ujung = (d: number, p: number) => ({ x: bulat(vx + p * Math.cos(rad(d))), y: bulat(vy - p * Math.sin(rad(d))) });
  const a = ujung(deg, 90);
  const tepi = ujung(deg, 34);
  return (
    <svg viewBox="0 0 220 150" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`Gambar ${nama}${patokan ? ", patokan siku-siku menempel" : ""}`}>
      <path d={`M ${vx} ${vy} L ${vx + 34} ${vy} A 34 34 0 0 0 ${tepi.x} ${tepi.y} Z`} fill={MUDA} stroke="none" />
      <line x1={vx} y1={vy} x2={vx + 125} y2={vy} stroke={BIRU} strokeWidth={5} strokeLinecap="round" />
      <line x1={vx} y1={vy} x2={a.x} y2={a.y} stroke={BIRU} strokeWidth={5} strokeLinecap="round" />
      {patokan ? (
        <g>
          <line x1={vx} y1={vy} x2={vx} y2={vy - 100} stroke={EMAS} strokeWidth={3} strokeDasharray="7 5" strokeLinecap="round" />
          <path d={`M ${vx} ${vy - 16} L ${vx + 16} ${vy - 16} L ${vx + 16} ${vy}`} fill="none" stroke={EMAS} strokeWidth={3} />
        </g>
      ) : null}
      <circle cx={vx} cy={vy} r={4.5} fill={BIRU} />
    </svg>
  );
}

/**
 * Kertas yang dilipat. langkah 0: kertas dengan tepi sobek. langkah 1: lipatan pertama (garis mendatar) dan lipatan kedua
 * yang masih bisa digeser (miring sebesar geser derajat dari tegak lurus). langkah 2: lipatan kedua tegak lurus dengan tanda siku.
 */
export function GambarKertas({ langkah, geser, nama }: { langkah: 0 | 1 | 2; geser: number; nama: string }) {
  const miring = langkah === 2 ? 0 : geser;
  const ex = bulat(110 + 82 * Math.sin(rad(miring)));
  const ey = bulat(105 - 82 * Math.cos(rad(miring)));
  return (
    <svg viewBox="0 0 220 150" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`Gambar ${nama}, ${langkah === 0 ? "belum dilipat" : langkah === 1 ? "sudah dilipat sekali" : "sudah dilipat dua kali"}`}>
      <polygon points="26,22 192,30 198,128 22,134 36,90" fill={MUDA} stroke={BIRU} strokeWidth={3} strokeLinejoin="round" />
      {langkah >= 1 ? (
        <g>
          <line x1={24} y1={105} x2={198} y2={105} stroke={BIRU} strokeWidth={4} strokeLinecap="round" />
          <line x1={110} y1={105} x2={ex} y2={ey} stroke={langkah === 2 ? EMAS : BIRU} strokeWidth={4} strokeDasharray={langkah === 2 ? undefined : "8 5"} strokeLinecap="round" />
          {langkah === 2 ? <path d="M 110 89 L 126 89 L 126 105" fill="none" stroke={EMAS} strokeWidth={3} /> : null}
          <circle cx={110} cy={105} r={4.5} fill={BIRU} />
        </g>
      ) : null}
    </svg>
  );
}
