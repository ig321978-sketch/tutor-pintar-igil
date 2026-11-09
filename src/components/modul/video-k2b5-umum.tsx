"use client";

import React, { useId } from "react";
import { BIRU, EMAS, MERAH_MUDA } from "./CeritaBandingB";
import { Tokoh } from "./gambar-maju-mundur-c";
import { BENDA_POTONG, BENTUK_P, bagiBanyak, kepingFigura, kepingSisa, type Garis, type IdBentukP, type JenisItem, type JenisPotong, type SisaPotong } from "./data-k2b5";
import { BendaPotongG, ItemG, jalur } from "./dasar-k2b5";

/* ------------------------------------------------------------------------ */
/* Bagian gambar SVG bersama video cerita Kelas 2 Bab 5 (Pecahan). Semua       */
/* ditaruh di kotak adegan 300 x 208 yang sudah berlatar langit dan rumput.    */
/* Mesin video (VideoCeritaSatuLayar, buatAdegan) dipakai dari video-k2b2-umum.   */
/* Tanpa API, tanpa berkas video.                                              */
/* ------------------------------------------------------------------------ */

export { buatAdegan, VideoCeritaSatuLayar, KartuTeks, Teks, type VideoSiap } from "./video-k2b2-umum";
export { BIRU, EMAS };
export const MERAH = "#E53E3E";
export const V: Garis = [[50, 0], [50, 100]];
export const H: Garis = [[0, 50], [100, 50]];
export const D1: Garis = [[0, 0], [100, 100]];
export const D2: Garis = [[100, 0], [0, 100]];

export const TOKOH = {
  kira: { rambut: "#1F2937", baju: MERAH_MUDA },
  tika: { rambut: "#7A4A1E", baju: "#60A5FA" },
  malosi: { rambut: "#111827", baju: "#34D399" },
  upe: { rambut: "#92400E", baju: "#FBBF24" },
  halim: { rambut: "#374151", baju: "#A78BFA" },
  ibu: { rambut: "#4B5563", baju: "#F472B6" },
} as const;
export type NamaTokoh = keyof typeof TOKOH;

/** Tokoh berdiri di rumput, dengan nama kecil di atas kepala. */
export function Tk({ x, y = 198, nama, s = 0.95, angkat = false, tampilNama = true }: { x: number; y?: number; nama: NamaTokoh; s?: number; angkat?: boolean; tampilNama?: boolean }) {
  const t = TOKOH[nama];
  return (
    <g>
      <Tokoh x={x} y={y} rambut={t.rambut} baju={t.baju} s={s} angkat={angkat} />
      {tampilNama ? (
        <text x={x} y={y - 64 * s} textAnchor="middle" fontSize="10" fontWeight="900" fill={BIRU} stroke="#FFFFFF" strokeWidth="3" paintOrder="stroke">
          {nama.charAt(0).toUpperCase() + nama.slice(1)}
        </text>
      ) : null}
    </g>
  );
}

/** Benda yang dipotong. Kiri atas (x, y), lebar w. Pakai `garis` (garis lurus penuh) atau `sisa`. */
export function PotG({ jenis, x, y, w, garis = [], jarak = 0, sisa, variasi = 0 }: { jenis: JenisPotong; x: number; y: number; w: number; garis?: Garis[]; jarak?: number; sisa?: SisaPotong; variasi?: number }) {
  const id = useId().replace(/:/g, "");
  const poly = BENTUK_P[BENDA_POTONG[jenis].bentuk].titik;
  const k = sisa ? kepingSisa(jenis, sisa, variasi) : null;
  const ada = k ? k.ada : bagiBanyak(poly, garis);
  return (
    <g transform={`translate(${x} ${y}) scale(${w / 100})`}>
      <BendaPotongG jenis={jenis} ada={ada} hilang={k?.hilang} jarak={jarak} idKlip={id} />
    </g>
  );
}

/** Benda satuan (kelereng, apel, pensil, ikan, jeruk, balon). Kiri atas (x, y), lebar w. */
export function ItG({ jenis, x, y, w, warna }: { jenis: JenisItem; x: number; y: number; w: number; warna?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${w / 100})`}>
      <ItemG jenis={jenis} warna={warna} />
    </g>
  );
}

/** Bangun polos berbagi bagian. `diwarnai[i]` mewarnai keping ke-i. `putus` menggambar garis lipat putus-putus. */
export function FigG({ bentuk, garis = [], diwarnai = [], x, y, w, warna = "#F59E0B", putus = [], alas = "#FFFFFF" }: { bentuk: IdBentukP; garis?: Garis[]; diwarnai?: boolean[]; x: number; y: number; w: number; warna?: string; putus?: Garis[]; alas?: string }) {
  const id = useId().replace(/:/g, "");
  const keping = kepingFigura({ bentuk, garis });
  const poly = BENTUK_P[bentuk].titik;
  return (
    <g transform={`translate(${x} ${y}) scale(${w / 100})`}>
      {keping.map((k, i) => (
        <path key={i} d={jalur(k)} fill={diwarnai[i] ? warna : alas} stroke={BIRU} strokeWidth={3.2} strokeLinejoin="round" />
      ))}
      {putus.length ? (
        <>
          <clipPath id={`${id}-c`}>
            <path d={jalur(poly)} />
          </clipPath>
          <g clipPath={`url(#${id}-c)`}>
            {putus.map(([a, b], i) => (
              <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#475569" strokeWidth="3" strokeDasharray="7 5" strokeLinecap="round" className="vc-denyut" />
            ))}
          </g>
        </>
      ) : null}
    </g>
  );
}

/** Pisau makan yang aman: bilah bulat dan gagang cokelat. (x, y) ujung bilah. */
export function Pisau({ x, y, putar = 0, s = 1 }: { x: number; y: number; putar?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${putar}) scale(${s})`}>
      <path d="M0 0 L8 -4 L34 -4 L34 5 L8 5 Z" fill="#E5E7EB" stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
      <rect x="34" y="-5" width="26" height="11" rx="4" fill="#92400E" stroke={BIRU} strokeWidth="2.4" />
    </g>
  );
}

/** Lingkaran putus-putus mengelilingi sekelompok benda. */
export function Gelang({ x, y, w, h, warna = BIRU }: { x: number; y: number; w: number; h: number; warna?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={Math.min(18, h / 2)} fill="none" stroke={warna} strokeWidth="3" strokeDasharray="6 4" />;
}

/** Angka atau lambang besar di dalam lingkaran putih. */
export function Angka({ x, y, teks, r = 18, warna = BIRU, isi = "#FFFFFF" }: { x: number; y: number; teks: string; r?: number; warna?: string; isi?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={isi} stroke={BIRU} strokeWidth="3" />
      <text x={x} y={y + r * 0.38} textAnchor="middle" fontSize={r * (teks.length > 2 ? 0.85 : 1.2)} fontWeight="900" fill={warna}>
        {teks}
      </text>
    </g>
  );
}

/** Tanda benar atau salah kecil. */
export function Tanda({ x, y, benar }: { x: number; y: number; benar: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r="14" fill={benar ? "#16A34A" : MERAH} stroke="#FFFFFF" strokeWidth="2.6" />
      <text x={x} y={y + 7} textAnchor="middle" fontSize="19" fontWeight="900" fill="#FFFFFF">
        {benar ? "✓" : "✕"}
      </text>
    </g>
  );
}

/** Meja kayu pendek untuk menaruh benda. (x, y) kiri atas permukaan. */
export function Meja({ x, y, w = 150 }: { x: number; y: number; w?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="8" rx="3" fill="#C98A3B" stroke={BIRU} strokeWidth="2.4" />
      <rect x={x + 8} y={y + 8} width="8" height="30" fill="#A8672D" stroke={BIRU} strokeWidth="2" />
      <rect x={x + w - 16} y={y + 8} width="8" height="30" fill="#A8672D" stroke={BIRU} strokeWidth="2" />
    </g>
  );
}

/** Gelas atau sendok berisi sesuatu: level 0 sampai 1. (x, y) kiri atas, lebar w. */
export function GelasG({ x, y, w, level, warna = "#38BDF8" }: { x: number; y: number; w: number; level: number; warna?: string }) {
  const tinggi = 82 * level;
  return (
    <g transform={`translate(${x} ${y}) scale(${w / 100})`}>
      <path d="M22 10 L78 10 L70 92 L30 92 Z" fill="#F0F9FF" />
      <clipPath id={`gl-${x}-${y}`}>
        <path d="M22 10 L78 10 L70 92 L30 92 Z" />
      </clipPath>
      <rect x="0" y={92 - tinggi} width="100" height={tinggi} fill={warna} clipPath={`url(#gl-${x}-${y})`} />
      <path d="M22 10 L78 10 L70 92 L30 92 Z" fill="none" stroke={BIRU} strokeWidth="3.4" strokeLinejoin="round" />
    </g>
  );
}

/** Sendok berisi gula setengah penuh. (x, y) kiri atas. */
export function SendokG({ x, y, s = 1, isi = 0.5 }: { x: number; y: number; s?: number; isi?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M44 6 L74 -14" stroke="#9CA3AF" strokeWidth="6" strokeLinecap="round" />
      <path d="M0 0 C0 18 36 18 36 0 Z" fill="#F3F4F6" stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" />
      {isi > 0 ? <path d={`M2 0 C4 ${-12 * isi * 2} 32 ${-12 * isi * 2} 34 0 Z`} fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.6" /> : null}
    </g>
  );
}