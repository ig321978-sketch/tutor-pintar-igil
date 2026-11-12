"use client";

import React from "react";
import type { BangunKali, BangunSetengah, BangunTrap } from "./lab-rumus-k5b5b";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B5 Sub-Bab B: bangun datar polos dengan ukuran di sisinya.  */
/* Garis putus menandai tinggi, persegi panjang, atau bangun kedua.            */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MUDA = "#FFF3B0";
const LEBAR = 340;
const TINGGI_GAMBAR = 170;

const Teks = ({ x, y, children, anchor = "middle" }: { x: number; y: number; children: React.ReactNode; anchor?: "start" | "middle" | "end" }) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={13} fontWeight={800} fill={BIRU}>
    {children}
  </text>
);
const titik = (p: number[][]): string => p.map(([x, y]) => `${x},${y}`).join(" ");

/** Persegi panjang, persegi, dan jajargenjang. Garis putus tegak lurus alas adalah tinggi. */
export function GambarKali({ d, tinggiOk }: { d: BangunKali; tinggiOk: boolean }) {
  const satu = Math.min(150 / d.alas, 80 / d.tinggi);
  const w = d.alas * satu;
  const h = d.tinggi * satu;
  const geser = d.miring === null ? 0 : Math.sqrt(d.miring * d.miring - d.tinggi * d.tinggi) * satu;
  const x0 = (LEBAR - w - geser) / 2;
  const y0 = 28;
  const bawah = y0 + h;
  const poligon = d.jenis === "jajar" ? [[x0 + geser, y0], [x0 + geser + w, y0], [x0 + w, bawah], [x0, bawah]] : [[x0, y0], [x0 + w, y0], [x0 + w, bawah], [x0, bawah]];
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI_GAMBAR}`} width="100%" role="img" aria-label={`${d.nama}: alas ${d.alas}, tinggi ${d.tinggi}${d.miring === null ? "" : `, sisi miring ${d.miring}`}`} className="block">
      <polygon points={titik(poligon)} fill={MUDA} stroke={BIRU} strokeWidth={3} />
      {d.jenis === "jajar" ? (
        <>
          <line x1={x0 + geser} y1={y0} x2={x0 + geser} y2={bawah} stroke={tinggiOk ? EMAS : BIRU} strokeWidth={tinggiOk ? 5 : 2.5} strokeDasharray="6 5" />
          <Teks x={x0 + geser + 12} y={y0 + h / 2 + 4} anchor="start">{d.tinggi}</Teks>
          <Teks x={x0 + geser / 2 - 14} y={y0 + h / 2 + 4} anchor="end">{d.miring}</Teks>
        </>
      ) : (
        <Teks x={x0 + w + 10} y={y0 + h / 2 + 4} anchor="start">{d.tinggi}</Teks>
      )}
      <Teks x={x0 + w / 2} y={bawah + 20}>{d.alas}</Teks>
    </svg>
  );
}

/** Segitiga, belah ketupat, dan layang-layang. Bila ganda, persegi panjang dari dua bangun yang sama digambar putus-putus. */
export function GambarSetengah({ d, ganda }: { d: BangunSetengah; ganda: boolean }) {
  const satu = Math.min(170 / d.a, 90 / d.t);
  const w = d.a * satu;
  const h = d.t * satu;
  const x0 = (LEBAR - w) / 2;
  const y0 = 24;
  const bawah = y0 + h;
  const cx = x0 + w / 2;
  const poligon =
    d.jenis === "segitiga"
      ? [[x0, bawah], [x0 + w, bawah], [x0 + w * 0.3, y0]]
      : d.jenis === "belah"
        ? [[x0, y0 + h / 2], [cx, y0], [x0 + w, y0 + h / 2], [cx, bawah]]
        : [[x0, y0 + h * 0.35], [cx, y0], [x0 + w, y0 + h * 0.35], [cx, bawah]];
  const kedua = d.jenis === "segitiga" ? [[x0 + w, y0], [x0, y0], [x0 + w * 0.7, bawah]] : null;
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI_GAMBAR}`} width="100%" role="img" aria-label={`${d.nama}${ganda ? ", disusun menjadi persegi panjang" : ""}`} className="block">
      {ganda ? <rect x={x0} y={y0} width={w} height={h} fill="none" stroke={EMAS} strokeWidth={4} strokeDasharray="7 5" /> : null}
      <polygon points={titik(poligon)} fill={MUDA} stroke={BIRU} strokeWidth={3} />
      {ganda && kedua ? <polygon points={titik(kedua)} fill="#FFFFFF" fillOpacity={0.7} stroke={BIRU} strokeWidth={2} strokeDasharray="5 4" /> : null}
      {d.jenis !== "segitiga" ? (
        <>
          <line x1={x0} y1={d.jenis === "belah" ? y0 + h / 2 : y0 + h * 0.35} x2={x0 + w} y2={d.jenis === "belah" ? y0 + h / 2 : y0 + h * 0.35} stroke={BIRU} strokeWidth={1.5} strokeDasharray="4 4" />
          <line x1={cx} y1={y0} x2={cx} y2={bawah} stroke={BIRU} strokeWidth={1.5} strokeDasharray="4 4" />
        </>
      ) : null}
      <Teks x={cx} y={bawah + 20}>{d.a}</Teks>
      <Teks x={x0 + w + 10} y={y0 + h / 2 + 4} anchor="start">{d.t}</Teks>
    </svg>
  );
}

/** Trapesium sama kaki. Bila ganda, trapesium kedua diputar dan disambung hingga membentuk jajargenjang. */
export function GambarTrap({ d, ganda }: { d: BangunTrap; ganda: boolean }) {
  const jumlah = d.a + d.b;
  const satu = Math.min(280 / (ganda ? d.a + jumlah / 2 : d.a), 90 / d.t);
  const a = d.a * satu;
  const b = d.b * satu;
  const h = d.t * satu;
  const lebarTotal = ganda ? a + (a + b) / 2 : a;
  const x0 = (LEBAR - lebarTotal) / 2;
  const y0 = 24;
  const pertama = [[x0, y0 + h], [x0 + a, y0 + h], [x0 + (a + b) / 2, y0], [x0 + (a - b) / 2, y0]];
  const kedua = pertama.map(([x, y]) => [x0 + a - (x - x0) + (a + b) / 2, y0 + h - (y - y0)]);
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI_GAMBAR}`} width="100%" role="img" aria-label={`Trapesium sisi sejajar ${d.a} dan ${d.b}, tinggi ${d.t}${ganda ? ", disusun menjadi jajargenjang" : ""}`} className="block">
      <polygon points={titik(pertama)} fill={MUDA} stroke={BIRU} strokeWidth={3} />
      {ganda ? <polygon points={titik(kedua)} fill="#FFFFFF" fillOpacity={0.7} stroke={BIRU} strokeWidth={2} strokeDasharray="5 4" /> : null}
      <line x1={x0 + (a - b) / 2} y1={y0} x2={x0 + (a - b) / 2} y2={y0 + h} stroke={EMAS} strokeWidth={3} strokeDasharray="6 5" />
      <Teks x={x0 + a / 2} y={y0 + h + 20}>{d.a}</Teks>
      <Teks x={x0 + a / 2} y={y0 - 8}>{d.b}</Teks>
      <Teks x={x0 + (a - b) / 2 + 10} y={y0 + h / 2 + 4} anchor="start">{d.t}</Teks>
    </svg>
  );
}
