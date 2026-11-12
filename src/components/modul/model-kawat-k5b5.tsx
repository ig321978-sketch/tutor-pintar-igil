"use client";

import React from "react";
import { KELILING_KAWAT, lebarDari, luasKawat } from "./lab-kawat-k5b5d";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B5 Sub-Bab D: kerangka kawat persegi panjang dengan batang  */
/* luas. Kelilingnya tetap, bentuk dan luasnya berubah. Bentuk polos.         */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MUDA = "#FFF3B0";
const LEBAR = 340;
const TINGGI_GAMBAR = 190;
const LUAS_TERBESAR = 225;

const Teks = ({ x, y, children, anchor = "middle" }: { x: number; y: number; children: React.ReactNode; anchor?: "start" | "middle" | "end" }) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={13} fontWeight={800} fill={BIRU}>
    {children}
  </text>
);

/** Kerangka kawat p kali l. Di bawahnya batang luas yang dibandingkan dengan luas terbesar (persegi 15 kali 15). */
export function GambarKawat({ p }: { p: number }) {
  const l = lebarDari(p);
  const L = luasKawat(p);
  const satu = Math.min(240 / Math.max(p, l), 100 / Math.min(p, l));
  const w = p * satu;
  const h = l * satu;
  const x0 = (LEBAR - w) / 2;
  const y0 = 12 + (100 - h) / 2;
  const batang = (L / LUAS_TERBESAR) * 260;
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI_GAMBAR}`} width="100%" role="img" aria-label={`Kerangka kawat ${KELILING_KAWAT} sentimeter, panjang ${p}, lebar ${l}, luas ${L}`} className="block">
      <rect x={x0} y={y0} width={w} height={h} fill={MUDA} stroke={BIRU} strokeWidth={5} rx={2} />
      <Teks x={x0 + w / 2} y={y0 + h + 18}>{p}</Teks>
      <Teks x={x0 + w + 10} y={y0 + h / 2 + 4} anchor="start">{l}</Teks>
      <rect x={40} y={142} width={260} height={14} rx={7} fill="#FFFFFF" stroke={BIRU} strokeWidth={2} />
      <rect x={40} y={142} width={batang} height={14} rx={7} fill={EMAS} stroke={BIRU} strokeWidth={2} />
      <Teks x={LEBAR / 2} y={178}>luas {L}</Teks>
    </svg>
  );
}
