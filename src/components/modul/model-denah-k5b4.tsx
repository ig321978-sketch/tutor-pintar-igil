"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B4 Sub-Bab E: denah bersudut siku (poligon polos) dengan     */
/* sisi luar, sekat dalam berupa garis putus, persegi panjang pembungkus,     */
/* dan sisi yang belum diketahui. Tanpa gambar benda.                          */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MERAH = "#DC2626";
const MUDA = "#FFF3B0";
const LEBAR = 340;

type Titik = [number, number];

/**
 * Denah dari titik sudut (kisi bulat). `lewat`: sisi luar yang sudah dijumlah (ditebalkan). `hilang`: indeks sisi yang
 * ditulis "?". `sekat`: ruas garis putus di dalam denah. `bungkus`: gambar persegi panjang pembungkus. `angka`: tulis
 * panjang sisi. `sisi`: panjang tiap sisi (dihitung pemanggil dari titik sudut).
 */
export function GambarDenah({ v, sisi, sekat, lewat, hilang, bungkus, angka }: { v: Titik[]; sisi: number[]; sekat: [number, number, number, number][]; lewat: boolean[]; hilang: number[]; bungkus: boolean; angka: boolean }) {
  const xs = v.map((p) => p[0]);
  const ys = v.map((p) => p[1]);
  const w = Math.max(...xs) - Math.min(...xs);
  const h = Math.max(...ys) - Math.min(...ys);
  const satu = Math.min(250 / Math.max(w, 1), 120 / Math.max(h, 1));
  const x0 = (LEBAR - w * satu) / 2 - Math.min(...xs) * satu;
  const y0 = 26 - Math.min(...ys) * satu;
  const px = (p: Titik): Titik => [x0 + p[0] * satu, y0 + p[1] * satu];
  const t = v.map(px);
  const pusat: Titik = [x0 + ((Math.max(...xs) + Math.min(...xs)) / 2) * satu, y0 + ((Math.max(...ys) + Math.min(...ys)) / 2) * satu];
  const tinggi = h * satu + 54;
  return (
    <svg viewBox={`0 0 ${LEBAR} ${tinggi}`} width="100%" role="img" aria-label={`Denah bersisi ${v.length}`} className="block">
      <polygon points={t.map((p) => p.join(",")).join(" ")} fill={lewat.length > 0 && lewat.every(Boolean) ? MUDA : "#FFFFFF"} />
      {bungkus ? <rect x={x0 + Math.min(...xs) * satu} y={y0 + Math.min(...ys) * satu} width={w * satu} height={h * satu} fill="none" stroke={MERAH} strokeWidth={2.5} strokeDasharray="7 5" /> : null}
      {sekat.map((s, j) => {
        const a = px([s[0], s[1]]);
        const b = px([s[2], s[3]]);
        return <line key={`s${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#6B7280" strokeWidth={2.5} strokeDasharray="5 5" />;
      })}
      {t.map((a, k) => {
        const b = t[(k + 1) % t.length];
        const lw = lewat[k] === true;
        return <line key={k} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={lw ? EMAS : BIRU} strokeWidth={lw ? 7 : 4} strokeLinecap="round" />;
      })}
      {angka
        ? t.map((a, k) => {
            const b = t[(k + 1) % t.length];
            const mx = (a[0] + b[0]) / 2;
            const my = (a[1] + b[1]) / 2;
            const dx = mx - pusat[0];
            const dy = my - pusat[1];
            const d = Math.max(Math.hypot(dx, dy), 1);
            const tanya = hilang.includes(k);
            return (
              <text key={`t${k}`} x={mx + (dx / d) * 13} y={my + (dy / d) * 13 + 4} textAnchor="middle" fontSize={13} fontWeight={800} fill={tanya ? MERAH : BIRU}>
                {tanya ? "?" : sisi[k]}
              </text>
            );
          })
        : null}
    </svg>
  );
}
