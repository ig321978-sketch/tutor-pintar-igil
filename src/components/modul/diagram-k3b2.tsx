"use client";

import React from "react";
import { type KM } from "./data-k3b2";

/* ------------------------------------------------------------------------ */
/* Diagram Kelas 3 Bab 2 (tahap Picture dan Abstract): bagan bagian-keseluruhan  */
/* (bar model) dan kalimat Matematika besar. Hanya batang dan angka. TIDAK ada   */
/* gambar benda dan tidak ada emoji. Batang yang belum diketahui bertanda tanya   */
/* dan berwarna kuning bergaris putus.                                           */
/* ------------------------------------------------------------------------ */

const TINTA = "#1C01A5";

function Batang({ x, y, w, h, teks, hilang = false, isi = "#FECACA", kecil = false }: { x: number; y: number; w: number; h: number; teks: string; hilang?: boolean; isi?: string; kecil?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="5" fill={hilang ? "#FFF7CC" : isi} stroke={hilang ? "#F0AB00" : TINTA} strokeWidth={hilang ? 3 : 2.4} strokeDasharray={hilang ? "6 4" : undefined} />
      <text x={x + w / 2} y={y + h / 2 + (kecil ? 5 : 7)} textAnchor="middle" fontSize={kecil ? 15 : 20} fontWeight="900" fill={hilang ? "#B45309" : TINTA}>
        {teks}
      </text>
    </g>
  );
}

/**
 * Bagan bagian-keseluruhan untuk x op y = z. Penjumlahan: keseluruhan z, bagian x dan y. Pengurangan: keseluruhan x,
 * bagian y (yang dikurangkan) dan z (sisa). Batang yang belum diketahui bertanda tanya.
 */
export function BaganKM({ p }: { p: KM }) {
  const plus = p.op === "+";
  const total = plus ? p.z : p.x;
  const bagian = plus ? [p.x, p.y] : [p.y, p.z];
  const bagianHilang = plus ? (p.hilang === "x" ? 0 : 1) : p.hilang === "y" ? 0 : -1;
  const totalHilang = !plus && p.hilang === "x";
  const W = 268;
  const w0 = Math.max(46, Math.min(W - 46, (W * bagian[0]) / total));
  const nama = plus ? "jumlah" : "awal";
  return (
    <svg viewBox="0 0 280 96" className="block h-auto w-full max-w-[300px]" role="img" aria-label={`Bagan: ${nama} ${totalHilang ? "belum diketahui" : total}, bagian ${bagianHilang === 0 ? "belum diketahui" : bagian[0]} dan ${bagianHilang === 1 ? "belum diketahui" : bagian[1]}`}>
      <g transform="translate(6 4)">
        <Batang x={0} y={0} w={W} h={34} teks={totalHilang ? "?" : String(total)} hilang={totalHilang} isi="#C7D2FE" />
        <text x={6} y={12} fontSize="9" fontWeight="900" fill={TINTA}>
          {nama}
        </text>
        <Batang x={0} y={48} w={w0} h={34} teks={bagianHilang === 0 ? "?" : String(bagian[0])} hilang={bagianHilang === 0} isi="#FECACA" />
        <Batang x={w0} y={48} w={W - w0} h={34} teks={bagianHilang === 1 ? "?" : String(bagian[1])} hilang={bagianHilang === 1} isi="#BFDBFE" />
      </g>
    </svg>
  );
}

/** Bagan dua bagian yang digabung: dipakai untuk pasangan bilangan yang mungkin. */
export function BaganGabung({ a, b }: { a: number; b: number }) {
  const W = 268;
  const wa = Math.max(40, Math.min(W - 40, (W * a) / (a + b)));
  return (
    <svg viewBox="0 0 280 50" className="block h-auto w-full max-w-[220px]" role="img" aria-label={`Dua bagian ${a} dan ${b}`}>
      <g transform="translate(6 6)">
        <Batang x={0} y={0} w={wa} h={34} teks={String(a)} isi="#FECACA" kecil />
        <Batang x={wa} y={0} w={W - wa} h={34} teks={String(b)} isi="#BFDBFE" kecil />
      </g>
    </svg>
  );
}

/** Kalimat Matematika besar dengan titik-titik yang disorot. */
export function KalimatBesar({ p, kecil = false }: { p: KM; kecil?: boolean }) {
  const hilang = (
    <span className="inline-block min-w-[2.2rem] rounded-xl border-[3px] border-dashed border-[#F0AB00] bg-[#FFF7CC] px-1 text-center text-[#B45309]">…</span>
  );
  return (
    <p className={`flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-[#FFF7CC] px-4 py-2 font-black text-[#1C01A5] ${kecil ? "text-2xl" : "text-4xl"}`} aria-label={`Kalimat Matematika: ${p.hilang === "x" ? "titik-titik" : p.x} ${p.op} ${p.hilang === "y" ? "titik-titik" : p.y} sama dengan ${p.z}`}>
      {p.hilang === "x" ? hilang : <span>{p.x}</span>}
      <span>{p.op}</span>
      {p.hilang === "y" ? hilang : <span>{p.y}</span>}
      <span>=</span>
      <span>{p.z}</span>
    </p>
  );
}
