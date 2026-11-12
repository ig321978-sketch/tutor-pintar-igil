"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B4 Sub-Bab B: segitiga polos yang digambar dari panjang     */
/* ketiga sisinya (hanya garis), dan penggaris untuk membaca panjang sisi.    */
/* Tanpa gambar benda.                                                         */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MUDA = "#FFF3B0";
const LEBAR = 340;

/** Titik sudut dari tiga sisi: sisi pertama mendatar di bawah, sudut ketiga dari hukum kosinus. Hanya untuk menggambar. */
function titik(sisi: number[]): [number, number][] {
  const [a, b, c] = sisi;
  const x = (a * a + c * c - b * b) / (2 * a);
  const y = Math.sqrt(Math.max(c * c - x * x, 0));
  const kiri = Math.min(0, x);
  const kanan = Math.max(a, x);
  const satu = Math.min(260 / Math.max(kanan - kiri, 1), 110 / Math.max(y, 1));
  const lebar = (kanan - kiri) * satu;
  const x0 = (LEBAR - lebar) / 2 - kiri * satu;
  const y0 = 20 + y * satu;
  return [
    [x0, y0],
    [x0 + a * satu, y0],
    [x0 + x * satu, y0 - y * satu],
  ];
}

/**
 * Segitiga dari tiga sisi. `lewat`: sisi yang sudah dijumlah atau diukur (ditebalkan). `angka`: tampilkan panjang sisi,
 * bila tidak, sisi diberi nomor. `tanda`: beri tanda sisi sama pada sisi yang sama panjang.
 */
export function Segitiga({ sisi, lewat, angka, tanda }: { sisi: number[]; lewat: boolean[]; angka: boolean; tanda: boolean }) {
  const p = titik(sisi);
  const ruas: [number, number, number, number][] = [
    [p[0][0], p[0][1], p[1][0], p[1][1]],
    [p[1][0], p[1][1], p[2][0], p[2][1]],
    [p[2][0], p[2][1], p[0][0], p[0][1]],
  ];
  const tinggi = Math.max(...p.map((t) => t[1])) + 36;
  const pusatX = (p[0][0] + p[1][0] + p[2][0]) / 3;
  const pusatY = (p[0][1] + p[1][1] + p[2][1]) / 3;
  return (
    <svg viewBox={`0 0 ${LEBAR} ${tinggi}`} width="100%" role="img" aria-label={angka ? `Segitiga bersisi ${sisi.join(", ")}` : "Segitiga dengan tiga sisi yang diukur"} className="block">
      <polygon points={p.map((t) => t.join(",")).join(" ")} fill={lewat.every(Boolean) ? MUDA : "#FFFFFF"} />
      {ruas.map(([x1, y1, x2, y2], k) => (
        <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={lewat[k] ? EMAS : BIRU} strokeWidth={lewat[k] ? 7 : 3} strokeLinecap="round" />
      ))}
      {ruas.map(([x1, y1, x2, y2], k) => {
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const dx = mx - pusatX;
        const dy = my - pusatY;
        const d = Math.max(Math.hypot(dx, dy), 1);
        const tx = mx + (dx / d) * 14;
        const ty = my + (dy / d) * 14 + 4;
        const ada = tanda && sisi.filter((s) => s === sisi[k]).length > 1;
        return (
          <g key={`t${k}`}>
            <text x={tx} y={ty} textAnchor="middle" fontSize={13} fontWeight={800} fill={BIRU}>
              {angka ? sisi[k] : k + 1}
            </text>
            {ada ? <line x1={mx - (dy / d) * 6} y1={my + (dx / d) * 6} x2={mx + (dy / d) * 6} y2={my - (dx / d) * 6} stroke="#DC2626" strokeWidth={3} /> : null}
          </g>
        );
      })}
    </svg>
  );
}

/** Penggaris 0 sampai `maks` cm. Batang emas dari nol sampai `panjang` (sisi yang diukur); ujungnya dibaca anak. */
export function Penggaris({ panjang, maks }: { panjang: number; maks: number }) {
  const x = (n: number) => 14 + (n / maks) * (LEBAR - 28);
  return (
    <svg viewBox={`0 0 ${LEBAR} 74`} width="100%" role="img" aria-label="Penggaris dari nol sampai dua belas sentimeter dengan sebuah batang yang diukur" className="block">
      <rect x={x(0)} y={8} width={x(panjang) - x(0)} height={14} rx={3} fill={EMAS} stroke={BIRU} strokeWidth={2} />
      <rect x={x(0) - 4} y={30} width={x(maks) - x(0) + 8} height={30} rx={4} fill="#E8F7EE" stroke={BIRU} strokeWidth={2} />
      {Array.from({ length: maks + 1 }, (_, n) => (
        <g key={n}>
          <line x1={x(n)} y1={30} x2={x(n)} y2={n % 1 === 0 ? 44 : 38} stroke={BIRU} strokeWidth={2} />
          <text x={x(n)} y={56} textAnchor="middle" fontSize={11} fontWeight={800} fill={BIRU}>
            {n}
          </text>
        </g>
      ))}
    </svg>
  );
}
