"use client";
import React from "react";
export { buatAdegan, DaftarVideoCerita, type VideoSiap } from "./video-k2b2-umum";
export { Orang, Ucap, Panah, Angka } from "./video-k2b4-umum";
export { Emo } from "./video-k2b6-umum";
export { BIRU, EMAS } from "./CeritaBandingB";
export function Besar({ x, y, teks, ukuran = 28, warna = "#1C01A5" }: { x: number; y: number; teks: string; ukuran?: number; warna?: string }) {
  return <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={warna} stroke="#FFFFFF" strokeWidth={ukuran * 0.06} paintOrder="stroke">{teks}</text>;
}
export function Papan4({ x, y, n }: { x: number; y: number; n: number }) {
  const s = String(n).padStart(4, "0");
  const warna = ["#6D28D9", "#15803D", "#1D4ED8", "#DC2626"];
  return (
    <g>
      {s.split("").map((d, i) => (
        <g key={i}>
          <rect x={x + i * 48} y={y} width={44} height={52} rx="8" fill="#FFFFFF" stroke="#1C01A5" strokeWidth="3" />
          <text x={x + i * 48 + 22} y={y + 36} textAnchor="middle" fontSize="28" fontWeight="900" fill={warna[i]}>{d}</text>
        </g>
      ))}
    </g>
  );
}
