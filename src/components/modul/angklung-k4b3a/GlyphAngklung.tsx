import React from "react";

/**
 * Gambar kecil angklung (dua tabung bambu di bingkai kayu) untuk Mind-map dan Infografis Sub-Bab A.
 * Satu gambar = satu angklung, jadi banyak gambar sama dengan banyak angklung di datanya. Tanpa teks.
 */
export const LEBAR_GLYPH = 11;

export function Glyph({ x = 0, y = 0, hantu = false }: { x?: number; y?: number; hantu?: boolean }) {
  const garis = hantu ? "#A16207" : "#78350F";
  const isi = hantu ? "none" : "#F59E0B";
  const dash = hantu ? "1.5 1" : undefined;
  return (
    <g transform={`translate(${x} ${y})`} data-glyph={hantu ? "hantu" : "angklung"}>
      <rect x={0.5} y={12} width={10} height={2} fill={hantu ? "none" : "#92400E"} stroke={garis} strokeWidth={0.6} strokeDasharray={dash} />
      <rect x={1.2} y={4} width={3} height={8} fill={isi} stroke={garis} strokeWidth={0.7} strokeDasharray={dash} />
      <rect x={6.2} y={1} width={3} height={11} fill={isi} stroke={garis} strokeWidth={0.7} strokeDasharray={dash} />
    </g>
  );
}

/** Satu baris angklung berjajar ke kanan (paling banyak sepuluh), tinggi 14. */
export function BarisGlyph({ n, hantu = false, label }: { n: number; hantu?: boolean; label: string }) {
  return (
    <svg viewBox={`0 0 ${Math.max(n, 1) * LEBAR_GLYPH} 14`} width={Math.max(n, 1) * LEBAR_GLYPH} height={14} role="img" aria-label={label} data-banyak={n}>
      {Array.from({ length: n }, (_, i) => (
        <Glyph key={i} x={i * LEBAR_GLYPH} hantu={hantu} />
      ))}
    </svg>
  );
}

/** Susunan per lima: n angklung dalam baris berisi lima, baris demi baris (paling banyak sepuluh: dua baris). */
export function BlokLima({ n, label }: { n: number; label: string }) {
  const baris = Math.max(1, Math.ceil(n / 5));
  return (
    <svg viewBox={`0 0 ${5 * LEBAR_GLYPH} ${baris * 14}`} width={5 * LEBAR_GLYPH} height={baris * 14} className="h-auto max-w-full" role="img" aria-label={label} data-banyak={n} data-baris={baris}>
      {Array.from({ length: n }, (_, i) => (
        <Glyph key={i} x={(i % 5) * LEBAR_GLYPH} y={Math.floor(i / 5) * 14} />
      ))}
    </svg>
  );
}
