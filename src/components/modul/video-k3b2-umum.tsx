"use client";

import React from "react";
import { BIRU, EMAS } from "./video-k3b1-umum";

/* ------------------------------------------------------------------------ */
/* Bagian gambar SVG bersama video cerita Kelas 3 Bab 2 (Kalimat Matematika):     */
/* teks besar, bagan bagian-keseluruhan, tabel kecil, dan kelereng. Semua         */
/* digambar di kotak adegan 300 x 208. Mesin video dipakai bersama. Tanpa API.     */
/* ------------------------------------------------------------------------ */

export { buatAdegan, DaftarVideoCerita, Emo, Orang, type VideoSiap } from "./video-k3b1-umum";
export { BIRU, EMAS };

export const Besar = ({ x, y, teks, ukuran = 40, warna = BIRU }: { x: number; y: number; teks: string; ukuran?: number; warna?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={warna} stroke="#FFFFFF" strokeWidth={ukuran * 0.07} paintOrder="stroke">
    {teks}
  </text>
);

/** Satu kelereng berwarna. */
export const Kelereng = ({ x, y, i = 0, redup = false }: { x: number; y: number; i?: number; redup?: boolean }) => (
  <g opacity={redup ? 0.3 : 1}>
    <circle cx={x} cy={y} r="7" fill={["#F87171", "#60A5FA", "#FBBF24", "#4ADE80", "#C084FC"][i % 5]} stroke={BIRU} strokeWidth="2" />
    <circle cx={x - 2.4} cy={y - 2.4} r="1.8" fill="#FFFFFF" opacity="0.8" />
  </g>
);

/** Satu permen: lingkaran dengan dua ujung bungkus. */
export const Permen = ({ x, y, i = 0 }: { x: number; y: number; i?: number }) => (
  <g>
    <polygon points={`${x - 13},${y - 5} ${x - 7},${y} ${x - 13},${y + 5}`} fill="#FDE68A" stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
    <polygon points={`${x + 13},${y - 5} ${x + 7},${y} ${x + 13},${y + 5}`} fill="#FDE68A" stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx={x} cy={y} r="8" fill={["#F472B6", "#60A5FA", "#4ADE80"][i % 3]} stroke={BIRU} strokeWidth="2" />
  </g>
);

type Hilang = 0 | 1 | 2 | null;

function BatangSvg({ x, y, w, h, teks, hilang, isi }: { x: number; y: number; w: number; h: number; teks: string; hilang: boolean; isi: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="5" fill={hilang ? "#FFF7CC" : isi} stroke={hilang ? "#F0AB00" : BIRU} strokeWidth={hilang ? 3 : 2.4} strokeDasharray={hilang ? "6 4" : undefined} className={hilang ? "vc-denyut" : undefined} />
      <text x={x + w / 2} y={y + h / 2 + 7} textAnchor="middle" fontSize="20" fontWeight="900" fill={hilang ? "#B45309" : BIRU}>
        {teks}
      </text>
    </g>
  );
}

/**
 * Bagan bagian-keseluruhan di (x, y) kiri atas. Batang atas: keseluruhan `total`. Dua batang di bawahnya: bagian a dan b.
 * `hilang` memilih batang yang masih bertanda tanya: 0 keseluruhan, 1 bagian a, 2 bagian b.
 */
export function BaganSvg({ x, y, w = 240, total, a, b, hilang = null, nama = "" }: { x: number; y: number; w?: number; total: number; a: number; b: number; hilang?: Hilang; nama?: string }) {
  const wa = Math.max(44, Math.min(w - 44, (w * a) / total));
  return (
    <g>
      <BatangSvg x={x} y={y} w={w} h={28} teks={hilang === 0 ? "?" : String(total)} hilang={hilang === 0} isi="#C7D2FE" />
      {nama ? (
        <text x={x + 6} y={y + 11} fontSize="9" fontWeight="900" fill={BIRU}>
          {nama}
        </text>
      ) : null}
      <BatangSvg x={x} y={y + 36} w={wa} h={28} teks={hilang === 1 ? "?" : String(a)} hilang={hilang === 1} isi="#FECACA" />
      <BatangSvg x={x + wa} y={y + 36} w={w - wa} h={28} teks={hilang === 2 ? "?" : String(b)} hilang={hilang === 2} isi="#BFDBFE" />
    </g>
  );
}

/** Tabel tiga kolom kecil: judul kolom dan beberapa baris isi. */
export function TabelSvg({ x, y, kepala, baris, w = 260 }: { x: number; y: number; kepala: [string, string, string]; baris: [string, string, string][]; w?: number }) {
  const lc = w / 3;
  return (
    <g>
      <rect x={x} y={y} width={w} height={26 + baris.length * 30} rx="10" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      {kepala.map((k, i) => (
        <text key={k} x={x + lc * i + lc / 2} y={y + 17} textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
          {k}
        </text>
      ))}
      <line x1={x + 6} x2={x + w - 6} y1={y + 24} y2={y + 24} stroke={BIRU} strokeWidth="2" />
      {baris.map((r, j) =>
        r.map((c, i) => (
          <text key={`${j}-${i}`} x={x + lc * i + lc / 2} y={y + 24 + 22 + j * 30} textAnchor="middle" fontSize="22" fontWeight="900" fill={c === "…" ? "#B45309" : BIRU}>
            {c}
          </text>
        )),
      )}
    </g>
  );
}
