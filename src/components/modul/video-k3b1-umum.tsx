"use client";

import React from "react";
import { BIRU, EMAS } from "./CeritaBandingB";

/* ------------------------------------------------------------------------ */
/* Bagian gambar SVG bersama video cerita Kelas 3 Bab 1 (Bilangan Cacah sampai   */
/* 1.000): blok satuan, batang puluhan, lempeng ratusan, papan nilai tempat,      */
/* kaleng, kartu angka, jalan, dan tiang bendera. Semua digambar di kotak adegan  */
/* 300 x 208 yang sudah berlatar langit dan rumput. Mesin video dipakai bersama.  */
/* Tanpa API, tanpa berkas video.                                                 */
/* ------------------------------------------------------------------------ */

export { buatAdegan, DaftarVideoCerita, type VideoSiap } from "./video-k2b2-umum";
export { Orang, Ucap, Panah, Angka } from "./video-k2b4-umum";
export { Emo } from "./video-k2b6-umum";
export { BIRU, EMAS };

export const WARNA_BLOK = { r: "#4ADE80", p: "#60A5FA", s: "#F87171" } as const;
export const TEKS_TEMPAT = { r: "#15803D", p: "#1D4ED8", s: "#DC2626" } as const;
const ISI_TEMPAT = { r: "#BBF7D0", p: "#BFDBFE", s: "#FECACA" } as const;

/** Satu blok satuan berukuran c di (x, y) kiri atas. */
export function KubusSvg({ x, y, c = 10 }: { x: number; y: number; c?: number }) {
  return <rect x={x} y={y} width={c} height={c} rx={Math.max(1, c * 0.12)} fill={WARNA_BLOK.s} stroke={BIRU} strokeWidth={Math.min(3.4, Math.max(1, c * 0.12))} />;
}

/** Satu batang puluhan: lebar c, tinggi 10c, bergaris tiap c. */
export function BatangSvg({ x, y, c = 10 }: { x: number; y: number; c?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={c} height={c * 10} rx={Math.max(1, c * 0.12)} fill={WARNA_BLOK.p} stroke={BIRU} strokeWidth={Math.min(3.4, Math.max(1, c * 0.12))} />
      {Array.from({ length: 9 }, (_, j) => (
        <line key={j} x1={x} x2={x + c} y1={y + (j + 1) * c} y2={y + (j + 1) * c} stroke={BIRU} strokeWidth="0.6" opacity="0.55" />
      ))}
    </g>
  );
}

/** Satu lempeng ratusan: persegi 10c x 10c berpetak 10 x 10. */
export function LempengSvg({ x, y, c = 10 }: { x: number; y: number; c?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={c * 10} height={c * 10} rx={Math.max(1, c * 0.12)} fill={WARNA_BLOK.r} stroke={BIRU} strokeWidth={Math.min(3.4, Math.max(1.4, c * 0.12))} />
      {Array.from({ length: 9 }, (_, j) => (
        <g key={j}>
          <line x1={x + (j + 1) * c} x2={x + (j + 1) * c} y1={y} y2={y + c * 10} stroke={BIRU} strokeWidth="0.6" opacity="0.5" />
          <line y1={y + (j + 1) * c} y2={y + (j + 1) * c} x1={x} x2={x + c * 10} stroke={BIRU} strokeWidth="0.6" opacity="0.5" />
        </g>
      ))}
    </g>
  );
}

/** Model bilangan: r lempeng, p batang, s kubus, berjajar dari (x, y) kiri atas. Ukuran sel c. */
export function ModelSvg({ x, y, r, p, s, c = 4 }: { x: number; y: number; r: number; p: number; s: number; c?: number }) {
  const lebarR = r > 0 ? Math.min(r, 5) * (c * 10 + 4) : 0;
  const xP = x + lebarR + (r > 0 ? 8 : 0);
  const lebarP = p * (c + 3);
  const xS = xP + lebarP + (p > 0 ? 8 : 0);
  return (
    <g>
      {Array.from({ length: r }, (_, i) => (
        <LempengSvg key={`r${i}`} x={x + (i % 5) * (c * 10 + 4)} y={y + Math.floor(i / 5) * (c * 10 + 4)} c={c} />
      ))}
      {Array.from({ length: p }, (_, i) => (
        <BatangSvg key={`p${i}`} x={xP + i * (c + 3)} y={y} c={c} />
      ))}
      {Array.from({ length: s }, (_, i) => (
        <KubusSvg key={`s${i}`} x={xS + (i % 5) * (c + 2)} y={y + c * 10 - c - Math.floor(i / 5) * (c + 2)} c={c} />
      ))}
    </g>
  );
}

/** Papan nilai tempat tiga sel. (x, y) kiri atas; w lebar tiap sel. Sel yang ditandai `sorot` diberi bingkai emas. */
export function PapanSvg({ x, y, r, p, s, w = 62, sorot = [], redup = [], tampil = [true, true, true], judul = 11, angka = 30 }: { x: number; y: number; r: number; p: number; s: number; w?: number; sorot?: ("r" | "p" | "s")[]; redup?: ("r" | "p" | "s")[]; tampil?: [boolean, boolean, boolean]; judul?: number; angka?: number }) {
  const sel = [
    { k: "r" as const, judul: "Ratusan", nilai: r },
    { k: "p" as const, judul: "Puluhan", nilai: p },
    { k: "s" as const, judul: "Satuan", nilai: s },
  ];
  return (
    <g>
      {sel.map((c, i) => {
        const cx = x + i * (w + 6);
        return (
          <g key={c.k} opacity={redup.includes(c.k) ? 0.45 : 1}>
            <rect x={cx} y={y} width={w} height="58" rx="9" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
            <path d={`M${cx} ${y + 9} a9 9 0 0 1 9 -9 h${w - 18} a9 9 0 0 1 9 9 v9 h${-w} z`} fill={ISI_TEMPAT[c.k]} stroke={BIRU} strokeWidth="3" />
            <text x={cx + w / 2} y={y + 14} textAnchor="middle" fontSize={judul} fontWeight="900" fill={TEKS_TEMPAT[c.k]}>
              {c.judul}
            </text>
            <text x={cx + w / 2} y={y + 49} textAnchor="middle" fontSize={angka} fontWeight="900" fill={BIRU}>
              {tampil[i] ? c.nilai : ""}
            </text>
            {sorot.includes(c.k) ? <rect className="vc-denyut" x={cx - 3} y={y - 3} width={w + 6} height="64" rx="11" fill="none" stroke={EMAS} strokeWidth="3.4" strokeDasharray="6 4" /> : null}
          </g>
        );
      })}
    </g>
  );
}

/** Kaleng dengan label dan angka kartu di dalamnya. (x, y) tengah atas. */
export function KalengSvg({ x, y, tempat, digit = null, s = 1, tampilLabel = true }: { x: number; y: number; tempat: "r" | "p" | "s"; digit?: number | null; s?: number; tampilLabel?: boolean }) {
  const warna = { r: "#BAE6FD", p: "#DDD6FE", s: "#FEF08A" }[tempat];
  const nama = { r: "Ratusan", p: "Puluhan", s: "Satuan" }[tempat];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="62" rx="26" ry="8" fill={warna} stroke={BIRU} strokeWidth="2.6" />
      <rect x="-26" y="10" width="52" height="52" fill={warna} />
      <line x1="-26" y1="10" x2="-26" y2="62" stroke={BIRU} strokeWidth="2.6" />
      <line x1="26" y1="10" x2="26" y2="62" stroke={BIRU} strokeWidth="2.6" />
      <ellipse cx="0" cy="10" rx="26" ry="8" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.6" />
      {digit !== null ? (
        <text x="0" y="48" textAnchor="middle" fontSize="28" fontWeight="900" fill={BIRU}>
          {digit}
        </text>
      ) : null}
      {tampilLabel ? (
        <text x="0" y="86" textAnchor="middle" fontSize="11" fontWeight="900" fill={TEKS_TEMPAT[tempat]}>
          {nama}
        </text>
      ) : null}
    </g>
  );
}

/** Kartu angka. (x, y) kiri atas. */
export function KartuSvg({ x, y, digit, warna = "#FFE566", w = 34, h = 46 }: { x: number; y: number; digit: number | string; warna?: string; w?: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="7" fill={warna} stroke={BIRU} strokeWidth="2.8" />
      <text x={x + w / 2} y={y + h * 0.7} textAnchor="middle" fontSize={h * 0.62} fontWeight="900" fill={BIRU}>
        {digit}
      </text>
    </g>
  );
}

/** Papan petunjuk jalan dengan jarak. (x, y) tengah bawah tiang. */
export function PetunjukSvg({ x, y, teks, w = 70 }: { x: number; y: number; teks: string; w?: number }) {
  return (
    <g>
      <rect x={x - 3} y={y - 30} width="6" height="30" fill="#8B5E34" stroke={BIRU} strokeWidth="2" />
      <rect x={x - w / 2} y={y - 58} width={w} height="30" rx="6" fill="#F59E0B" stroke={BIRU} strokeWidth="3" />
      <text x={x} y={y - 38} textAnchor="middle" fontSize="15" fontWeight="900" fill="#FFFFFF">
        {teks}
      </text>
    </g>
  );
}

/** Tiang dengan bendera merah. (x, y) dasar tiang. */
export function TiangSvg({ x, y, tinggi = 120 }: { x: number; y: number; tinggi?: number }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y - tinggi} stroke="#8B5E34" strokeWidth="5" strokeLinecap="round" />
      <polygon points={`${x},${y - tinggi} ${x + 36},${y - tinggi + 10} ${x},${y - tinggi + 22}`} fill="#DC2626" stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
    </g>
  );
}

/** Pohon sederhana. (x, y) dasar batang. */
export function PohonSvg({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-4" y="-26" width="8" height="26" fill="#8B5E34" stroke={BIRU} strokeWidth="2" />
      <circle cx="0" cy="-40" r="20" fill="#4ADE80" stroke={BIRU} strokeWidth="2.6" />
      <circle cx="-12" cy="-30" r="12" fill="#22C55E" stroke={BIRU} strokeWidth="2.2" />
      <circle cx="12" cy="-30" r="12" fill="#22C55E" stroke={BIRU} strokeWidth="2.2" />
    </g>
  );
}

/** Tanda perbandingan besar berpusat di (x, y). */
export function TandaSvg({ x, y, tanda, ukuran = 56 }: { x: number; y: number; tanda: string; ukuran?: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={BIRU} stroke="#FFFFFF" strokeWidth={ukuran * 0.07} paintOrder="stroke">
      {tanda}
    </text>
  );
}

/**
 * Penjumlahan bersusun: kolom puluhan dan satuan, simpanan merah di atas puluhan, hasil hijau di bawah garis.
 * (x, y) kiri atas tabel. `tampil` mengatur bagian yang sudah muncul.
 */
export function SusunSvg({ x, y, a, b, tampil = {}, sorot = null }: { x: number; y: number; a: number; b: number; tampil?: { simpan?: boolean; satuan?: boolean; puluhan?: boolean }; sorot?: "p" | "s" | null }) {
  const sa = a % 10;
  const sb = b % 10;
  const jumlahS = sa + sb;
  const simpan = jumlahS >= 10;
  const hasil = a + b;
  const cx = [x + 38, x + 94, x + 150];
  const baris = [y + 38, y + 68, y + 100, y + 144];
  return (
    <g>
      <rect x={x} y={y} width="176" height="160" rx="12" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x={cx[1]} y={y + 17} textAnchor="middle" fontSize="11" fontWeight="900" fill={TEKS_TEMPAT.p}>
        Puluhan
      </text>
      <text x={cx[2]} y={y + 17} textAnchor="middle" fontSize="11" fontWeight="900" fill={TEKS_TEMPAT.s}>
        Satuan
      </text>
      {sorot ? <rect className="vc-denyut" x={sorot === "p" ? cx[1] - 26 : cx[2] - 26} y={y + 22} width="52" height="132" rx="9" fill="none" stroke={EMAS} strokeWidth="3.4" strokeDasharray="6 4" /> : null}
      {simpan && tampil.simpan ? (
        <text x={cx[1]} y={baris[0] - 6} textAnchor="middle" fontSize="20" fontWeight="900" fill="#DC2626">
          1
        </text>
      ) : null}
      <text x={cx[1]} y={baris[1]} textAnchor="middle" fontSize="32" fontWeight="900" fill={BIRU}>
        {Math.floor(a / 10)}
      </text>
      <text x={cx[2]} y={baris[1]} textAnchor="middle" fontSize="32" fontWeight="900" fill={BIRU}>
        {sa}
      </text>
      <text x={cx[0]} y={baris[2]} textAnchor="middle" fontSize="30" fontWeight="900" fill={BIRU}>
        +
      </text>
      <text x={cx[1]} y={baris[2]} textAnchor="middle" fontSize="32" fontWeight="900" fill={BIRU}>
        {Math.floor(b / 10)}
      </text>
      <text x={cx[2]} y={baris[2]} textAnchor="middle" fontSize="32" fontWeight="900" fill={BIRU}>
        {sb}
      </text>
      <line x1={x + 14} y1={y + 110} x2={x + 162} y2={y + 110} stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
      <text x={cx[1]} y={baris[3]} textAnchor="middle" fontSize="34" fontWeight="900" fill="#16A34A">
        {tampil.puluhan ? Math.floor(hasil / 10) : "?"}
      </text>
      <text x={cx[2]} y={baris[3]} textAnchor="middle" fontSize="34" fontWeight="900" fill="#16A34A">
        {tampil.satuan ? hasil % 10 : "?"}
      </text>
    </g>
  );
}
