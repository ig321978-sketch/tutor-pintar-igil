"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B4 Sub-Bab D: segi-n beraturan polos dengan tanda sisi      */
/* sama, dan segi banyak yang sisinya tidak sama (gambar hanya garis).        */
/* Tanpa gambar benda.                                                         */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MERAH = "#DC2626";
const MUDA = "#FFF3B0";
const LEBAR = 340;
const TINGGI = 170;
const PUSAT: [number, number] = [LEBAR / 2, TINGGI / 2];

/** Titik sudut: `r` jari-jari tiap sudut, sudut pertama di atas, searah jarum jam. Hanya untuk menggambar. */
function titik(r: number[]): [number, number][] {
  const n = r.length;
  return r.map((jari, k) => {
    const sudut = (2 * Math.PI * k) / n - Math.PI / 2;
    return [PUSAT[0] + jari * Math.cos(sudut), PUSAT[1] + jari * Math.sin(sudut)];
  });
}

/** Segi-n beraturan: n sisi sama panjang, tanda sisi sama pada tiap sisi bila `tanda`; panjang sisi ditulis di satu sisi. */
export function SegiBeraturan({ n, s, tanda }: { n: number; s: number; tanda: boolean }) {
  const p = titik(Array.from({ length: n }, () => 66));
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} width="100%" role="img" aria-label={`Segi ${n} beraturan, tiap sisi ${s}`} className="block">
      <polygon points={p.map((t) => t.join(",")).join(" ")} fill="#FFFFFF" stroke={BIRU} strokeWidth={4} strokeLinejoin="round" />
      {p.map((a, k) => {
        const b = p[(k + 1) % n];
        const mx = (a[0] + b[0]) / 2;
        const my = (a[1] + b[1]) / 2;
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const d = Math.max(Math.hypot(dx, dy), 1);
        return tanda ? <line key={k} x1={mx - (dy / d) * 7} y1={my + (dx / d) * 7} x2={mx + (dy / d) * 7} y2={my - (dx / d) * 7} stroke={MERAH} strokeWidth={3} /> : null;
      })}
      <text x={(p[0][0] + p[1][0]) / 2 + 14} y={(p[0][1] + p[1][1]) / 2 - 4} textAnchor="middle" fontSize={13} fontWeight={800} fill={BIRU}>
        {s}
      </text>
    </svg>
  );
}

/** Segi banyak dengan sisi tidak sama: jari-jari sudut berbeda, panjang tiap sisi ditulis. Sisi yang sudah dijumlah ditebalkan. */
export function SegiBeda({ sisi, lewat }: { sisi: number[]; lewat: boolean[] }) {
  const n = sisi.length;
  const p = titik(sisi.map((v, k) => 50 + 7 * ((v + k) % 4)));
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} width="100%" role="img" aria-label={`Segi ${n} dengan sisi ${sisi.join(", ")}`} className="block">
      <polygon points={p.map((t) => t.join(",")).join(" ")} fill={semuaLewat(lewat) ? MUDA : "#FFFFFF"} />
      {p.map((a, k) => {
        const b = p[(k + 1) % n];
        return <line key={k} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={lewat[k] ? EMAS : BIRU} strokeWidth={lewat[k] ? 7 : 3} strokeLinecap="round" />;
      })}
      {p.map((a, k) => {
        const b = p[(k + 1) % n];
        const mx = (a[0] + b[0]) / 2;
        const my = (a[1] + b[1]) / 2;
        const dx = mx - PUSAT[0];
        const dy = my - PUSAT[1];
        const d = Math.max(Math.hypot(dx, dy), 1);
        return (
          <text key={`t${k}`} x={mx + (dx / d) * 13} y={my + (dy / d) * 13 + 4} textAnchor="middle" fontSize={13} fontWeight={800} fill={BIRU}>
            {sisi[k]}
          </text>
        );
      })}
    </svg>
  );
}

const semuaLewat = (a: boolean[]): boolean => a.every(Boolean);
