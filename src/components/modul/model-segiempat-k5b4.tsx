"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B4 Sub-Bab C: persegi panjang atau persegi polos dengan     */
/* tanda sisi sama (garis kecil pada sisi), dan kisi petak untuk luas.        */
/* Tanpa gambar benda.                                                         */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const MERAH = "#DC2626";
const MUDA = "#FFF3B0";
const LEBAR = 340;

/** Garis tanda sisi sama di tengah sebuah sisi: `n` garis kecil tegak lurus sisi. */
function Tanda({ x1, y1, x2, y2, n }: { x1: number; y1: number; x2: number; y2: number; n: number }) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const d = Math.max(Math.hypot(dx, dy), 1);
  const nx = -dy / d;
  const ny = dx / d;
  const ux = dx / d;
  const uy = dy / d;
  return (
    <g>
      {Array.from({ length: n }, (_, k) => {
        const geser = (k - (n - 1) / 2) * 6;
        const cx = mx + ux * geser;
        const cy = my + uy * geser;
        return <line key={k} x1={cx - nx * 7} y1={cy - ny * 7} x2={cx + nx * 7} y2={cy + ny * 7} stroke={MERAH} strokeWidth={3} />;
      })}
    </g>
  );
}

/**
 * Persegi panjang p kali l (hanya untuk menggambar). `tanda`: "pp" memberi satu garis pada panjang dan dua garis pada
 * lebar, "persegi" memberi satu garis pada keempat sisi, null tanpa tanda. `angka`: tulis panjang sisi.
 */
export function SegiEmpat({ p, l, tanda, angka }: { p: number; l: number; tanda: "pp" | "persegi" | null; angka: boolean }) {
  const satu = Math.min(230 / p, 110 / l);
  const pw = p * satu;
  const ph = l * satu;
  const x0 = (LEBAR - pw) / 2;
  const y0 = 28;
  const sisi: [number, number, number, number][] = [
    [x0, y0, x0 + pw, y0],
    [x0 + pw, y0, x0 + pw, y0 + ph],
    [x0 + pw, y0 + ph, x0, y0 + ph],
    [x0, y0 + ph, x0, y0],
  ];
  const tandaSisi = tanda === "pp" ? [1, 2, 1, 2] : tanda === "persegi" ? [1, 1, 1, 1] : [0, 0, 0, 0];
  return (
    <svg viewBox={`0 0 ${LEBAR} ${ph + 62}`} width="100%" role="img" aria-label={angka ? `Bangun bersisi ${p} dan ${l}` : "Bangun dengan empat sisi"} className="block">
      <rect x={x0} y={y0} width={pw} height={ph} fill="#FFFFFF" stroke={BIRU} strokeWidth={4} />
      {sisi.map(([a, b, c, d], k) => (tandaSisi[k] > 0 ? <Tanda key={k} x1={a} y1={b} x2={c} y2={d} n={tandaSisi[k]} /> : null))}
      {angka ? (
        <>
          <text x={x0 + pw / 2} y={y0 - 8} textAnchor="middle" fontSize={13} fontWeight={800} fill={BIRU}>
            {p}
          </text>
          <text x={x0 + pw + 12} y={y0 + ph / 2 + 4} textAnchor="middle" fontSize={13} fontWeight={800} fill={BIRU}>
            {l}
          </text>
        </>
      ) : null}
    </svg>
  );
}

/** Kisi petak p kali l: isi daerah (luas) dibedakan dari jalur tepi (garis tebal). */
export function KisiLuas({ p, l }: { p: number; l: number }) {
  const satu = Math.min(240 / p, 110 / l);
  const pw = p * satu;
  const ph = l * satu;
  const x0 = (LEBAR - pw) / 2;
  const y0 = 12;
  const petak: React.ReactNode[] = [];
  for (let j = 0; j < l; j += 1) {
    for (let i = 0; i < p; i += 1) petak.push(<rect key={`${i}-${j}`} x={x0 + i * satu} y={y0 + j * satu} width={satu} height={satu} fill={MUDA} stroke={BIRU} strokeOpacity={0.35} strokeWidth={1} />);
  }
  return (
    <svg viewBox={`0 0 ${LEBAR} ${ph + 24}`} width="100%" role="img" aria-label={`Kisi ${p} petak panjang dan ${l} petak lebar`} className="block">
      {petak}
      <rect x={x0} y={y0} width={pw} height={ph} fill="none" stroke={BIRU} strokeWidth={4} />
    </svg>
  );
}
