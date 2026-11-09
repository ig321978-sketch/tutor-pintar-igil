"use client";

import React from "react";
import { BIRU, EMAS } from "./CeritaBandingB";
import { Muncul, Sorot } from "./video-cerita";
import type { Lambang } from "./data-k2b8";

/* ------------------------------------------------------------------------ */
/* Bagian gambar SVG bersama video cerita Kelas 2 Bab 8 (Berbagai Diagram):    */
/* turus, lambang, tabel diagram, dan awan kumpulan benda. Semua digambar di   */
/* kotak adegan 300 x 208 yang sudah berlatar langit dan rumput. Mesin video   */
/* dipakai bersama. Tanpa API, tanpa berkas video.                             */
/* ------------------------------------------------------------------------ */

export { buatAdegan, DaftarVideoCerita, type VideoSiap } from "./video-k2b2-umum";
export { Orang, Ucap, Panah, Angka } from "./video-k2b4-umum";
export { Emo } from "./video-k2b6-umum";
export { BIRU, EMAS };

/** Lebar sebuah gambar turus n goresan. */
export const lebarTurus = (n: number, jarak = 5.5): number => {
  const kel = Math.ceil(n / 5);
  return kel * (4 * jarak + 10) - 10 + 4;
};

/** Turus: n goresan mulai di (x, y) kiri atas. Goresan kelima mencoret miring, dan bisa diberi warna merah. */
export function TurusSvg({ x, y, n, tinggi = 18, jarak = 5.5, warna = BIRU, tebal = 2.6, miring = "#E53E3E" }: { x: number; y: number; n: number; tinggi?: number; jarak?: number; warna?: string; tebal?: number; miring?: string }) {
  const gaji = 4 * jarak + 10;
  return (
    <g strokeLinecap="round">
      {Array.from({ length: n }, (_, i) => {
        const g = Math.floor(i / 5);
        const k = i % 5;
        const gx = x + g * gaji + 2;
        return k < 4 ? (
          <line key={i} x1={gx + k * jarak} y1={y} x2={gx + k * jarak} y2={y + tinggi} stroke={warna} strokeWidth={tebal} />
        ) : (
          <line key={i} x1={gx - 3} y1={y + tinggi * 0.86} x2={gx + 4 * jarak + 3} y2={y + tinggi * 0.14} stroke={miring} strokeWidth={tebal} />
        );
      })}
    </g>
  );
}

/** Satu lambang berpusat di (x, y). */
export function LambangVideo({ jenis, x, y, r = 8, warna }: { jenis: Lambang; x: number; y: number; r?: number; warna: string }) {
  if (jenis === "bintang") {
    const titik = Array.from({ length: 10 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 === 0 ? r : r * 0.46;
      return `${x + Math.cos(a) * rr},${y + Math.sin(a) * rr}`;
    }).join(" ");
    return <polygon points={titik} fill={warna} stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />;
  }
  if (jenis === "lingkaran") return <circle cx={x} cy={y} r={r * 0.88} fill={warna} stroke={BIRU} strokeWidth="1.7" />;
  if (jenis === "hati") {
    const s = r / 12;
    return <path transform={`translate(${x - 12 * s} ${y - 12 * s}) scale(${s})`} d="M12 21C4.5 15 2.6 10.6 2.6 7.8A4.7 4.7 0 0 1 12 6.4 4.7 4.7 0 0 1 21.4 7.8C21.4 10.6 19.5 15 12 21Z" fill={warna} stroke={BIRU} strokeWidth={1.6 / s} strokeLinejoin="round" />;
  }
  return (
    <g>
      <circle cx={x} cy={y} r={r * 0.9} fill={warna} stroke={BIRU} strokeWidth="1.7" />
      <circle cx={x - r * 0.3} cy={y - r * 0.2} r={r * 0.11} fill={BIRU} />
      <circle cx={x + r * 0.3} cy={y - r * 0.2} r={r * 0.11} fill={BIRU} />
      <path d={`M${x - r * 0.4} ${y + r * 0.22} Q${x} ${y + r * 0.65} ${x + r * 0.4} ${y + r * 0.22}`} fill="none" stroke={BIRU} strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

/** Satu baris lambang berjajar dari (x, y) kiri atas dengan jarak d. */
export function BarisLambangSvg({ x, y, n, jenis = "bintang", warna, r = 7.5, d = 17 }: { x: number; y: number; n: number; jenis?: Lambang; warna: string; r?: number; d?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <LambangVideo key={i} jenis={jenis} x={x + r + i * d} y={y + r} r={r} warna={warna} />
      ))}
    </g>
  );
}

/** Satu baris gambar benda (emoji) berjajar dari (x, y) kiri atas. */
export function BarisEmo({ x, y, n, e, s = 14, d = 15 }: { x: number; y: number; n: number; e: string; s?: number; d?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <text key={i} x={x + s / 2 + i * d} y={y + s * 0.82} textAnchor="middle" fontSize={s} aria-hidden="true">
          {e}
        </text>
      ))}
    </g>
  );
}

export type BarisTabelSvg = { nama: string; isi?: (tinggi: number) => React.ReactNode; angka?: string | number };

/**
 * Tabel diagram: nama, isi (turus atau gambar), dan banyaknya. Hanya `tampil` baris pertama yang muncul,
 * dan baris dalam `sorot` diberi bingkai berdenyut. `isi` digambar dengan titik (0, 0) di kiri atas selnya.
 */
export function TabelSvg({
  x = 14,
  y = 44,
  w = 272,
  kepala,
  baris,
  tampil,
  kolomNama = 76,
  kolomAngka = 42,
  tinggi = 28,
  sorot = [],
  tampilAngka = true,
}: {
  x?: number;
  y?: number;
  w?: number;
  kepala?: [string, string, string];
  baris: BarisTabelSvg[];
  tampil?: number;
  kolomNama?: number;
  kolomAngka?: number;
  tinggi?: number;
  sorot?: number[];
  tampilAngka?: boolean;
}) {
  const kh = kepala ? 17 : 0;
  const total = baris.length;
  const t = tampil ?? total;
  const xa = x + w - kolomAngka;
  return (
    <g>
      <rect x={x} y={y} width={w} height={kh + total * tinggi} rx="8" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      {kepala ? (
        <g>
          <rect x={x} y={y} width={w} height={kh} rx="8" fill="#EDE9FE" stroke={BIRU} strokeWidth="3" />
          <text x={x + kolomNama / 2} y={y + 12} textAnchor="middle" fontSize="9" fontWeight="900" fill={BIRU}>
            {kepala[0]}
          </text>
          <text x={x + kolomNama + (w - kolomNama - kolomAngka) / 2} y={y + 12} textAnchor="middle" fontSize="9" fontWeight="900" fill={BIRU}>
            {kepala[1]}
          </text>
          <text x={xa + kolomAngka / 2} y={y + 12} textAnchor="middle" fontSize="9" fontWeight="900" fill={BIRU}>
            {kepala[2]}
          </text>
        </g>
      ) : null}
      {Array.from({ length: total - 1 }, (_, i) => (
        <line key={i} x1={x} y1={y + kh + (i + 1) * tinggi} x2={x + w} y2={y + kh + (i + 1) * tinggi} stroke="#A78BFA" strokeWidth="1.4" />
      ))}
      <line x1={x + kolomNama} y1={y} x2={x + kolomNama} y2={y + kh + total * tinggi} stroke="#A78BFA" strokeWidth="1.4" />
      <line x1={xa} y1={y} x2={xa} y2={y + kh + total * tinggi} stroke="#A78BFA" strokeWidth="1.4" />
      {baris.slice(0, t).map((b, i) => {
        const y0 = y + kh + i * tinggi;
        return (
          <Muncul key={b.nama} tunda={0.05} dy={-4}>
            <text x={x + 7} y={y0 + tinggi * 0.64} fontSize={b.nama.length > 10 ? 9 : 11} fontWeight="900" fill={BIRU}>
              {b.nama}
            </text>
            {b.isi ? <g transform={`translate(${x + kolomNama + 7} ${y0})`}>{b.isi(tinggi)}</g> : null}
            {tampilAngka && b.angka !== undefined ? (
              <text x={xa + kolomAngka / 2} y={y0 + tinggi * 0.68} textAnchor="middle" fontSize="15" fontWeight="900" fill={BIRU}>
                {b.angka}
              </text>
            ) : null}
          </Muncul>
        );
      })}
      {sorot.filter((i) => i < t).map((i) => (
        <Sorot key={i} x={x - 2} y={y + kh + i * tinggi - 1} w={w + 4} h={tinggi + 2} r={6} />
      ))}
    </g>
  );
}

/** Awan biru berisi benda bertebaran, seperti gambar data buah pada buku. */
export function AwanData({ benda, x = 40, y = 60, w = 220, h = 90 }: { benda: { e: string; s?: number }[]; x?: number; y?: number; w?: number; h?: number }) {
  const kol = Math.ceil(Math.sqrt((benda.length * w) / h));
  const baris = Math.ceil(benda.length / kol);
  return (
    <g>
      <ellipse cx={x + w / 2} cy={y + h / 2} rx={w / 2 + 6} ry={h / 2 + 8} fill="#7DD3FC" stroke={BIRU} strokeWidth="3" />
      {benda.map((b, i) => {
        const r = Math.floor(i / kol);
        const k = i % kol;
        const jx = (((i * 37) % 7) - 3) * 1.6;
        const jy = (((i * 53) % 7) - 3) * 1.3;
        return (
          <Muncul key={i} tunda={0.03 * i} dy={-5}>
            <text x={x + ((k + 0.5) / kol) * w + jx} y={y + ((r + 0.5) / baris) * h + jy + (b.s ?? 22) * 0.34} textAnchor="middle" fontSize={b.s ?? 22} aria-hidden="true">
              {b.e}
            </text>
          </Muncul>
        );
      })}
    </g>
  );
}
