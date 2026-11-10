"use client";
import React from "react";
export { buatAdegan, DaftarVideoCerita, type VideoSiap } from "./video-k2b2-umum";
export { Orang, Ucap, Panah, Angka } from "./video-k2b4-umum";
export { Emo } from "./video-k2b6-umum";
export { BIRU, EMAS } from "./CeritaBandingB";
export function Besar({ x, y, teks, ukuran = 28, warna = "#1C01A5" }: { x: number; y: number; teks: string; ukuran?: number; warna?: string }) {
  return <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={warna} stroke="#FFFFFF" strokeWidth={ukuran * 0.06} paintOrder="stroke">{teks}</text>;
}
export function Pizza({ x, y, q, p, r = 42 }: { x: number; y: number; q: number; p: number; r?: number }) {
  const iris = Array.from({ length: q }, (_, i) => {
    const a0 = (i / q) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((i + 1) / q) * Math.PI * 2 - Math.PI / 2;
    const x0 = x + r * Math.cos(a0);
    const y0 = y + r * Math.sin(a0);
    const x1 = x + r * Math.cos(a1);
    const y1 = y + r * Math.sin(a1);
    const large = (2 * Math.PI) / q > Math.PI ? 1 : 0;
    const d = `M ${x} ${y} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`;
    return <path key={i} d={d} fill={i < p ? "#F59E0B" : "#FEF3C7"} stroke="#1C01A5" strokeWidth="2" />;
  });
  return <g>{iris}</g>;
}
export function Batang({ x, y, q, p, w = 160, h = 28 }: { x: number; y: number; q: number; p: number; w?: number; h?: number }) {
  const cell = w / q;
  return (
    <g>
      {Array.from({ length: q }, (_, i) => (
        <rect key={i} x={x + i * cell} y={y} width={cell - 1.5} height={h} rx={4} fill={i < p ? "#F59E0B" : "#FEF3C7"} stroke="#1C01A5" strokeWidth="1.5" />
      ))}
    </g>
  );
}
