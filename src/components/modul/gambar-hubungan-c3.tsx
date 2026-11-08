"use client";

import React from "react";
import {
  BAWAH,
  BIRU,
  BukuCerita,
  EMAS,
  HIJAU,
  KUNING,
  Latar,
  MERAH_MUDA,
  TENGAH,
  type Cerita,
} from "./CeritaBandingB";
import { Lencana } from "./gambar-cara-b2";
import { Tokoh } from "./gambar-maju-mundur-c";
import { KendaraanG } from "./gambar-soal-cerita-c2";
import type { LangkahPeta } from "./PetaPikiranB";

/* ------------------------------------------------------------------------ */
/* Bab 3 Sub-Bab C: Hubungan Penjumlahan dan Pengurangan (Buku Siswa Kelas 1  */
/* hlm. 101-105). Satu keluarga bilangan punya dua penjumlahan dan dua        */
/* pengurangan. Pengurangan adalah kebalikan dari penjumlahan.                */
/* Semua gambar dibuat di klien (SVG), tanpa API.                             */
/* Naskah: naskah/mtk-1-bab3-sub-c-hubungan.md                                */
/* ------------------------------------------------------------------------ */

const MERAH = "#E11D48";
export const WARNA_COKELAT = "#C8793A";
export const WARNA_HITAM = "#3F3F46";

/* ------------------------------ Gambar benda ---------------------------- */

/** Kelinci duduk menghadap kanan. viewBox 0 0 44 50. */
function BadanKelinci({ warna }: { warna: string }) {
  const hitam = warna === WARNA_HITAM;
  return (
    <>
      <ellipse cx="9" cy="37" rx="5" ry="4.6" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
      <ellipse cx="21" cy="35" rx="14.5" ry="12" fill={warna} stroke={BIRU} strokeWidth="2.2" />
      <ellipse cx="16" cy="44.5" rx="6" ry="3.2" fill={warna} stroke={BIRU} strokeWidth="1.8" />
      <ellipse cx="31" cy="45" rx="5" ry="3" fill={warna} stroke={BIRU} strokeWidth="1.8" />
      <ellipse cx="25.5" cy="7.5" rx="3.3" ry="9.5" transform="rotate(-8 25.5 7.5)" fill={warna} stroke={BIRU} strokeWidth="2" />
      <ellipse cx="25.5" cy="8.5" rx="1.4" ry="6.2" transform="rotate(-8 25.5 8.5)" fill={MERAH_MUDA} />
      <ellipse cx="33.5" cy="8.5" rx="3.3" ry="9.2" transform="rotate(10 33.5 8.5)" fill={warna} stroke={BIRU} strokeWidth="2" />
      <ellipse cx="33.5" cy="9.5" rx="1.4" ry="6" transform="rotate(10 33.5 9.5)" fill={MERAH_MUDA} />
      <circle cx="30" cy="23" r="10" fill={warna} stroke={BIRU} strokeWidth="2.2" />
      <circle cx="33.5" cy="21.5" r="2.3" fill="#FFFFFF" />
      <circle cx="34.2" cy="21.7" r="1.2" fill={BIRU} />
      <ellipse cx="38.8" cy="25.2" rx="1.8" ry="1.3" fill={MERAH_MUDA} stroke={BIRU} strokeWidth="1" />
      {hitam ? <path d="M26 16 Q29 13.5 33 15" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" /> : null}
    </>
  );
}

export function KelinciSVG({ warna, kelas = "h-14 w-12" }: { warna: string; kelas?: string }) {
  return (
    <svg viewBox="0 0 44 50" className={`block ${kelas}`} aria-hidden="true">
      <BadanKelinci warna={warna} />
    </svg>
  );
}

/** Kelinci di dalam adegan. Titik (x, y) ada di dasar kelinci. */
function KelinciG({ x, y, warna, s = 0.8, kiri = false }: { x: number; y: number; warna: string; s?: number; kiri?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${kiri ? -s : s} ${s}) translate(-22 -49)`}>
      <BadanKelinci warna={warna} />
    </g>
  );
}

/** Kaos. viewBox 0 0 48 46. */
function BadanKaos({ warna }: { warna: string }) {
  return (
    <>
      <path
        d="M15 4 L6 9 L1 20 L9 24 L12 19 L12 43 L36 43 L36 19 L39 24 L47 20 L42 9 L33 4 Q24 12 15 4 Z"
        fill={warna}
        stroke={BIRU}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M17 6 Q24 12 31 6" fill="none" stroke={BIRU} strokeWidth="1.6" opacity="0.5" />
      <path d="M18 12 Q16 22 17 34" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" opacity="0.55" />
    </>
  );
}

export function KaosSVG({ warna, kelas = "h-12 w-12" }: { warna: string; kelas?: string }) {
  return (
    <svg viewBox="0 0 48 46" className={`block ${kelas}`} aria-hidden="true">
      <BadanKaos warna={warna} />
    </svg>
  );
}

function KaosG({ x, y, warna, s = 0.9 }: { x: number; y: number; warna: string; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) translate(-24 0)`}>
      <BadanKaos warna={warna} />
    </g>
  );
}

/** Kepik. viewBox 0 0 40 36. Sayap terbuka bila `terbang`. */
function BadanKepik({ terbang = false }: { terbang?: boolean }) {
  return (
    <>
      {terbang ? (
        <>
          <ellipse cx="10" cy="12" rx="9" ry="6" transform="rotate(-25 10 12)" fill="#E0F2FE" stroke={BIRU} strokeWidth="1.6" opacity="0.9" />
          <ellipse cx="30" cy="12" rx="9" ry="6" transform="rotate(25 30 12)" fill="#E0F2FE" stroke={BIRU} strokeWidth="1.6" opacity="0.9" />
        </>
      ) : null}
      <circle cx="20" cy="9" r="6.2" fill="#27272A" stroke={BIRU} strokeWidth="1.8" />
      <ellipse cx="20" cy="22" rx="15" ry="12.5" fill={MERAH} stroke={BIRU} strokeWidth="2.2" />
      <path d="M20 10 V34" stroke={BIRU} strokeWidth="2" />
      {(
        [
          [12, 17],
          [28, 17],
          [10, 27],
          [30, 27],
          [16, 31],
          [24, 31],
        ] as [number, number][]
      ).map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.6" fill="#27272A" />
      ))}
    </>
  );
}

export function KepikSVG({ kelas = "h-10 w-10", terbang = false }: { kelas?: string; terbang?: boolean }) {
  return (
    <svg viewBox="0 0 40 36" className={`block ${kelas}`} aria-hidden="true">
      <BadanKepik terbang={terbang} />
    </svg>
  );
}

export function KepikG({ x, y, s = 1, terbang = false, putar = 0 }: { x: number; y: number; s?: number; terbang?: boolean; putar?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${putar}) scale(${s}) translate(-20 -18)`}>
      <BadanKepik terbang={terbang} />
    </g>
  );
}

/** Gelas terbalik penutup benda. viewBox 0 0 70 64. */
export function GelasSVG({ kelas = "h-16 w-[70px]" }: { kelas?: string }) {
  return (
    <svg viewBox="0 0 70 64" className={`block ${kelas}`} aria-hidden="true">
      <path d="M8 60 L16 6 Q35 -2 54 6 L62 60 Z" fill="#BFDBFE" fillOpacity="0.92" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <path d="M20 14 Q22 38 24 54" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <ellipse cx="35" cy="60" rx="27" ry="3.4" fill="#93C5FD" stroke={BIRU} strokeWidth="2" />
    </svg>
  );
}

/* ------------------------------ Segitiga keluarga ---------------------------- */

type Sel = number | "?" | null;

function Titik({ cx, cy, r, isi, warna, nyala }: { cx: number; cy: number; r: number; isi: Sel; warna: string; nyala?: boolean }) {
  return (
    <g>
      {nyala ? <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke={EMAS} strokeWidth="4" strokeDasharray="3 6" strokeLinecap="round" /> : null}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={isi === "?" ? KUNING : warna}
        stroke={BIRU}
        strokeWidth="3.4"
        strokeDasharray={isi === null ? "5 5" : undefined}
      />
      {isi !== null ? (
        <text x={cx} y={cy + r * 0.36} textAnchor="middle" fontSize={r * 1.05} fontWeight="900" fill={BIRU}>
          {isi}
        </text>
      ) : null}
    </g>
  );
}

/**
 * Segitiga keluarga bilangan. Puncak = gabungan (bilangan terbesar), dua sudut bawah = sebagian.
 * Hanya diagram. Titik kiri atas (0, 0), lebar 170, tinggi 150.
 */
export function SegitigaIsi({ g, a, b, nyala = [] }: { g: Sel; a: Sel; b: Sel; nyala?: ("g" | "a" | "b")[] }) {
  return (
    <g>
      <path d="M85 30 L28 120 L142 120 Z" fill="#EEF2FF" fillOpacity="0.9" stroke={BIRU} strokeWidth="3.2" strokeLinejoin="round" />
      <path d="M85 30 L85 120" stroke={BIRU} strokeWidth="1.6" strokeDasharray="2 6" strokeLinecap="round" opacity="0.35" />
      <Titik cx={85} cy={30} r={25} isi={g} warna={KUNING} nyala={nyala.includes("g")} />
      <Titik cx={28} cy={120} r={20} isi={a} warna="#C7D2FE" nyala={nyala.includes("a")} />
      <Titik cx={142} cy={120} r={20} isi={b} warna="#C7D2FE" nyala={nyala.includes("b")} />
    </g>
  );
}

export function SegitigaBilangan({
  g,
  a,
  b,
  nyala = [],
  nama = false,
  kelas = "w-full max-w-[200px]",
}: {
  g: Sel;
  a: Sel;
  b: Sel;
  nyala?: ("g" | "a" | "b")[];
  nama?: boolean;
  kelas?: string;
}) {
  const baca = [g, a, b].map((x) => (x === null ? "kosong" : x === "?" ? "tanda tanya" : x));
  return (
    <svg
      viewBox={nama ? "0 0 170 160" : "0 0 170 148"}
      className={`mx-auto block h-auto ${kelas}`}
      role="img"
      aria-label={`Segitiga keluarga bilangan: puncak ${baca[0]}, kiri ${baca[1]}, kanan ${baca[2]}`}
    >
      <SegitigaIsi g={g} a={a} b={b} nyala={nyala} />
      {nama ? (
        <g fontSize="9.5" fontWeight="900" fill={BIRU} textAnchor="middle">
          <text x="85" y="156">
            puncak = jumlah terbesar
          </text>
        </g>
      ) : null}
    </svg>
  );
}

/* ------------------------------ Potongan adegan ---------------------------- */

export function KotakHitung({ x, y, w = 116, teks, ukuran = 20 }: { x: number; y: number; w?: number; teks: string; ukuran?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="34" rx="14" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x={x + w / 2} y={y + 24} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}

function Kandang({ x, y, w = 112, h = 70 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g>
      <path d={`M${x - 6} ${y + 6} L${x + w / 2} ${y - 18} L${x + w + 6} ${y + 6} Z`} fill="#C2410C" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <rect x={x} y={y + 6} width={w} height={h} rx="5" fill="#FDBA74" stroke={BIRU} strokeWidth="3" />
      <rect x={x + 10} y={y + 16} width={w - 20} height={h - 26} rx="4" fill="#FFF7ED" stroke={BIRU} strokeWidth="2" />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={`v${i}`} d={`M${x + 10 + ((i + 1) * (w - 20)) / 7} ${y + 16} V${y + h - 10}`} stroke="#94A3B8" strokeWidth="1.6" />
      ))}
      {Array.from({ length: 3 }, (_, i) => (
        <path key={`h${i}`} d={`M${x + 10} ${y + 16 + ((i + 1) * (h - 26)) / 4} H${x + w - 10}`} stroke="#94A3B8" strokeWidth="1.6" />
      ))}
    </g>
  );
}

export function Daun({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 40 Q10 -20 120 -4 Q150 20 112 52 Q50 80 0 40 Z" fill="#4ADE80" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <path d="M0 40 Q60 22 130 14" fill="none" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 32 L52 10 M70 26 L84 4 M92 22 L110 6 M52 34 L66 54 M84 28 L96 48" fill="none" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
      <path d="M0 40 L-26 58" stroke="#15803D" strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 101: empat kelinci cokelat dan tiga kelinci hitam digabung. */
function AdeganKelinciGabung() {
  return (
    <>
      <Latar />
      <Kandang x={176} y={34} w={112} h={64} />
      <Tokoh x={36} y={192} rambut="#1F2937" baju="#FFFFFF" s={0.98} angkat />
      {[0, 1, 2, 3].map((i) => (
        <KelinciG key={`c${i}`} x={86 + i * 30} y={196} warna={WARNA_COKELAT} s={0.72} />
      ))}
      {[0, 1, 2].map((i) => (
        <KelinciG key={`h${i}`} x={86 + (4 + i) * 30} y={196} warna={WARNA_HITAM} s={0.72} />
      ))}
      <path d="M72 150 H178" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      <path d="M72 144 V154 M178 144 V154" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      <path d="M178 150 H268" stroke={MERAH} strokeWidth="3" strokeLinecap="round" />
      <path d="M178 144 V154 M268 144 V154" stroke={MERAH} strokeWidth="3" strokeLinecap="round" />
      <Lencana x={125} y={126} teks="4" r={15} />
      <Lencana x={223} y={126} teks="3" r={15} />
      <KotakHitung x={10} y={12} teks="4 + 3 = 7" />
      <KotakHitung x={10} y={52} teks="3 + 4 = 7" />
    </>
  );
}

/** Buku hlm. 101: tujuh kelinci, kelinci hitam atau cokelat pergi (dicoret). */
function AdeganKelinciPergi() {
  return (
    <>
      <Latar />
      <Tokoh x={36} y={192} rambut="#7A4A1E" baju={HIJAU} s={0.98} angkat />
      {[0, 1, 2, 3].map((i) => (
        <KelinciG key={`c${i}`} x={86 + i * 30} y={196} warna={WARNA_COKELAT} s={0.72} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={`h${i}`} opacity="0.5">
          <KelinciG x={86 + (4 + i) * 30} y={196} warna={WARNA_HITAM} s={0.72} />
        </g>
      ))}
      <path d="M200 156 L284 142" stroke={MERAH} strokeWidth="4.4" strokeLinecap="round" />
      <path d="M208 120 Q230 96 258 112" fill="none" stroke={EMAS} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 8" />
      <polygon points="258,112 248,108 250,122" fill={EMAS} stroke={BIRU} strokeWidth="1.2" strokeLinejoin="round" />
      <Lencana x={256} y={84} teks="−3" />
      <KotakHitung x={10} y={12} teks="7 − 3 = 4" />
      <KotakHitung x={10} y={52} teks="7 − 4 = 3" />
    </>
  );
}

/** Buku hlm. 103: tiga kaos kuning dan dua kaos merah muda di tali jemuran. */
function AdeganJemuran() {
  const warna = ["#FACC15", "#FACC15", "#FACC15", "#F472B6", "#F472B6"];
  return (
    <>
      <Latar />
      <path d="M22 160 V58 M278 160 V58" stroke="#8A5322" strokeWidth="7" strokeLinecap="round" />
      <path d="M22 62 Q150 82 278 62" fill="none" stroke={BIRU} strokeWidth="3" />
      {warna.map((w, i) => {
        const x = 52 + i * 49;
        const y = 70 + Math.sin((i + 0.5) * 0.62) * 9;
        return (
          <g key={i}>
            <KaosG x={x} y={y + 3} warna={w} s={0.98} />
            <rect x={x - 11} y={y - 2} width="5" height="9" rx="1.5" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.6" />
            <rect x={x + 6} y={y - 2} width="5" height="9" rx="1.5" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.6" />
          </g>
        );
      })}
      <Tokoh x={266} y={196} rambut={BIRU} baju={EMAS} s={0.82} angkat />
      <KotakHitung x={8} y={150} w={112} teks="3 + 2 = 5" ukuran={18} />
      <KotakHitung x={126} y={150} w={112} teks="5 − 2 = 3" ukuran={18} />
    </>
  );
}

/** Buku hlm. 103: tiga kepik di daun dan satu kepik terbang. */
function AdeganKepik() {
  return (
    <>
      <Latar />
      <Daun x={70} y={118} />
      <KepikG x={106} y={146} s={0.72} putar={-8} />
      <KepikG x={142} y={140} s={0.72} putar={6} />
      <KepikG x={176} y={148} s={0.72} putar={-4} />
      <g className="igil-lompat" style={BAWAH}>
        <KepikG x={230} y={92} s={0.9} terbang putar={14} />
      </g>
      <Lencana x={260} y={150} teks="4" r={15} />
      <KotakHitung x={10} y={12} teks="3 + 1 = 4" />
      <KotakHitung x={10} y={52} teks="4 − 1 = 3" />
      <Tokoh x={34} y={192} rambut="#7A4A1E" baju="#FFFFFF" s={0.82} />
    </>
  );
}

/** Buku hlm. 105: papan tulis berisi 6 + ... = 9 dan Wei yang berpikir. */
function AdeganPapanTulis() {
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#22B8CF" />
      <rect x="0" y="162" width="300" height="46" fill="#CBD5E1" />
      <rect x="18" y="16" width="190" height="126" rx="8" fill="#2F4F4F" stroke="#8A5322" strokeWidth="6" />
      <g fill="#FFFFFF" fontWeight="900" fontSize="26" fontFamily="inherit">
        <text x="34" y="52">
          6 + ... = 9
        </text>
        <text x="34" y="96" fill="#FDE68A">
          9 − 6 = 3
        </text>
        <text x="34" y="132" fontSize="17" fill="#BBF7D0">
          6 + 3 = 9 ✓
        </text>
      </g>
      <path d="M120 66 Q150 74 118 82" fill="none" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
      <polygon points="118,82 128,76 126,88" fill="#FDE68A" />
      <rect x="226" y="30" width="58" height="132" rx="4" fill="#F4A261" stroke={BIRU} strokeWidth="3" />
      <circle cx="240" cy="96" r="4" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
      <Tokoh x={248} y={196} rambut="#1F2937" baju="#FFFFFF" s={1.02}>
        <g className="igil-denyut" style={TENGAH}>
          <circle cx="-26" cy="-70" r="4" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.8" />
          <circle cx="-34" cy="-80" r="6" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.8" />
        </g>
      </Tokoh>
      <Lencana x={120} y={176} teks="↔" r={16} />
    </>
  );
}

/** Buku hlm. 104: enam anak di teras dan dua anak bersepeda. */
function AdeganSepedaTeman() {
  const baju = [HIJAU, EMAS, MERAH_MUDA, "#FFFFFF", KUNING, "#C7D2FE"];
  const rambut = ["#1F2937", "#7A4A1E", BIRU, "#7A4A1E", "#1F2937", "#7A4A1E"];
  return (
    <>
      <Latar />
      <rect x="0" y="144" width="300" height="64" fill="#F5D9B8" />
      <path d="M0 144 H300" stroke="#D6A46B" strokeWidth="3" />
      {baju.map((b, i) => (
        <Tokoh key={i} x={30 + i * 26} y={156 + (i % 2) * 6} rambut={rambut[i]} baju={b} s={0.58} angkat={i === 2} />
      ))}
      <g transform="translate(176 126) scale(0.5)">
        <KendaraanG jenis="sepeda" warna="#2563EB" />
      </g>
      <Tokoh x={202} y={146} rambut="#1F2937" baju="#FFFFFF" s={0.5} angkat />
      <g transform="translate(232 138) scale(0.5)">
        <KendaraanG jenis="sepeda" warna="#16A34A" />
      </g>
      <Tokoh x={258} y={158} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.5} angkat />
      <Lencana x={104} y={104} teks="6" r={15} />
      <Lencana x={232} y={110} teks="2" r={15} />
      <KotakHitung x={10} y={10} w={112} teks="6 + 2 = 8" ukuran={18} />
      <KotakHitung x={10} y={50} w={112} teks="8 − 2 = 6" ukuran={18} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita hubungan penjumlahan dan pengurangan">
      {id === "C3-S1" && <AdeganKelinciGabung />}
      {id === "C3-S2" && <AdeganKelinciPergi />}
      {id === "C3-S3" && <AdeganJemuran />}
      {id === "C3-S4" && <AdeganKepik />}
      {id === "C3-S5" && <AdeganPapanTulis />}
      {id === "C3-S6" && <AdeganSepedaTeman />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 101-105). Tokoh hanya anak-anak dalam buku dan Igil. */
export const CERITA_C3: Cerita[] = [
  {
    id: "C3-S1",
    sceneType: "kelinci-gabung",
    voiceNarration:
      "Ada kandang kelinci di halaman. Empat kelinci berwarna cokelat. Tiga kelinci berwarna hitam. Berapa jumlah semua kelinci? Kelinci cokelat ditambah kelinci hitam. Empat ditambah tiga sama dengan tujuh. Kalau kelinci hitam ditambah kelinci cokelat, tiga ditambah empat juga sama dengan tujuh. Jumlahnya tetap sama.",
  },
  {
    id: "C3-S2",
    sceneType: "kelinci-pergi",
    voiceNarration:
      "Sekarang kita lihat kelinci yang pergi. Ada tujuh kelinci. Ada berapa kelinci cokelat? Kelinci hitam pergi dari kandang. Tujuh dikurangi tiga sama dengan empat. Ada empat kelinci cokelat. Ada berapa kelinci hitam? Sekarang kelinci cokelat yang pergi. Tujuh dikurangi empat sama dengan tiga. Ada tiga kelinci hitam.",
  },
  {
    id: "C3-S3",
    sceneType: "jemuran-kaos",
    voiceNarration:
      "Ibu menjemur kaos. Tiga kaos berwarna kuning. Dua kaos berwarna merah muda. Tiga ditambah dua sama dengan lima. Dua ditambah tiga juga sama dengan lima. Kalau dua kaos merah muda diambil, tinggal tiga kaos kuning. Lima dikurangi dua sama dengan tiga. Kalau tiga kaos kuning diambil, tinggal dua. Lima dikurangi tiga sama dengan dua.",
  },
  {
    id: "C3-S4",
    sceneType: "kepik-daun",
    voiceNarration:
      "Ada kepik di atas daun. Tiga kepik duduk di daun. Satu kepik sedang terbang. Semua kepik ada empat. Tiga ditambah satu sama dengan empat. Kalau satu kepik terbang pergi, tinggal tiga. Empat dikurangi satu sama dengan tiga. Penjumlahan dan pengurangan saling berhubungan.",
  },
  {
    id: "C3-S5",
    sceneType: "papan-tulis-hilang",
    voiceNarration:
      "Wei melihat papan tulis. Di papan ada soal: enam ditambah berapa sama dengan sembilan. Wei berpikir: pengurangan adalah kebalikan dari penjumlahan. Jadi Wei menghitung sembilan dikurangi enam sama dengan tiga. Angka yang hilang adalah tiga. Lalu Wei memeriksa: enam ditambah tiga sama dengan sembilan. Cocok!",
  },
  {
    id: "C3-S6",
    sceneType: "sepeda-teman",
    voiceNarration:
      "Tika dan teman-teman berkumpul di teras. Ada enam anak yang duduk dan dua anak bersepeda. Semua anak ada delapan. Enam ditambah dua sama dengan delapan. Dua ditambah enam juga sama dengan delapan. Kalau dua anak bersepeda pergi, tinggal enam anak. Delapan dikurangi dua sama dengan enam. Sekarang giliranmu: ambil benda bersama temanmu, buat cerita penjumlahan, lalu buat cerita pengurangannya. Jelaskan hubungannya.",
  },
];

/** Peta pikiran enam simpul: dari menggabung dua kelompok sampai memeriksa dan mencari yang hilang. */
export const PETA_PIKIRAN_C3: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Gabungkan Dua Kelompok",
    stepDesc:
      "Dua kelompok benda boleh digabung. Empat kelinci cokelat digabung dengan tiga kelinci hitam menjadi tujuh kelinci. Kita tulis empat tambah tiga sama dengan tujuh.",
    icon: "🐰",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Tukar Tempat",
    stepDesc:
      "Dalam penjumlahan, dua kelompok boleh bertukar tempat. Empat tambah tiga sama dengan tujuh. Tiga tambah empat juga sama dengan tujuh. Jumlahnya tetap sama.",
    icon: "🔄",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Pisahkan Salah Satu",
    stepDesc:
      "Dari kelompok yang sudah digabung, kita boleh mengambil salah satu kelompok. Ada tujuh kelinci. Tiga kelinci hitam pergi. Tinggal empat kelinci cokelat.",
    icon: "🚪",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Dua Kalimat Pengurangan",
    stepDesc:
      "Satu keluarga bilangan punya dua pengurangan. Tujuh kurang tiga sama dengan empat. Tujuh kurang empat sama dengan tiga. Bilangan terbesar ditulis paling depan.",
    icon: "✌️",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Kebalikan",
    stepDesc:
      "Pengurangan adalah kebalikan dari penjumlahan. Tiga tambah empat sama dengan tujuh, maka tujuh kurang tiga sama dengan empat. Maju tiga langkah, lalu mundur tiga langkah, kita kembali ke tempat semula.",
    icon: "↩️",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Periksa dan Cari yang Hilang",
    stepDesc:
      "Periksa pengurangan dengan penjumlahan, dan periksa penjumlahan dengan pengurangan. Untuk mencari angka yang hilang, pakai kebalikan. Enam tambah berapa sama dengan sembilan? Hitung sembilan kurang enam.",
    icon: "🔍",
  },
];

export function CeritaHubunganC({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_C3} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
