"use client";

import React from "react";
import { BIRU } from "./CeritaBandingB";

/* ------------------------------------------------------------------------ */
/* Bab 4 Sub-Bab C: Menyusun dan Mengurai Bentuk Bangun (Buku Siswa Kelas 1  */
/* hlm. 134-139). Gambar dasar yang dipakai Story, Infografis, Concrete,      */
/* Picture, dan Abstract. Semua dibuat di klien (SVG), tanpa API.             */
/*  - KERETA: kereta mainan balok kayu. Dipakai Story, Infografis, Concrete.   */
/*  - FIGUR_1 dan FIGUR_2: bangun gabungan polos untuk Picture (tanpa benda). */
/*  - Segitiga siku-siku dan persegi untuk tahap menggabungkan.               */
/* Naskah: naskah/mtk-1-bab4-sub-c-menyusun-dan-mengurai-bentuk.md             */
/* ------------------------------------------------------------------------ */

export type Gol3 = "segiempat" | "segitiga" | "lengkung";

export const NAMA_GOL3: Record<Gol3, string> = {
  segiempat: "segi empat",
  segitiga: "segitiga",
  lengkung: "bentuk lengkung",
};

export const WARNA_C = {
  merah: "#F25C54",
  biru: "#5B9BFF",
  kuning: "#FFD93D",
  hijau: "#5CC47F",
  merahmuda: "#F7A8C4",
  jingga: "#FFA94D",
  ungu: "#A866D9",
} as const;

type Titik = [number, number];

/** Satu bagian penyusun. Geometri ada di kanvas bersama pemiliknya. */
export type Bagian = {
  id: string;
  nama: string;
  g: Gol3;
  warna: string;
} & (
  | { k: "rect"; x: number; y: number; w: number; h: number }
  | { k: "tri"; p: [Titik, Titik, Titik] }
  | { k: "bulat"; cx: number; cy: number; r: number }
);

/** Kotak pembatas satu bagian. Dipakai untuk menaruh zona seret dan lencana angka. */
export function kotakBagian(b: Bagian): { x: number; y: number; w: number; h: number } {
  if (b.k === "rect") return { x: b.x, y: b.y, w: b.w, h: b.h };
  if (b.k === "bulat") return { x: b.cx - b.r, y: b.cy - b.r, w: b.r * 2, h: b.r * 2 };
  const xs = b.p.map((t) => t[0]);
  const ys = b.p.map((t) => t[1]);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
}

/** Gambar satu bagian pada kanvas pemiliknya. */
export function GambarBagian({
  b,
  isi,
  garis = BIRU,
  tebal = 3,
  putus = false,
  opacity = 1,
}: {
  b: Bagian;
  isi?: string;
  garis?: string;
  tebal?: number;
  putus?: boolean;
  opacity?: number;
}) {
  const sifat = {
    fill: isi ?? b.warna,
    stroke: garis,
    strokeWidth: tebal,
    strokeLinejoin: "round" as const,
    strokeDasharray: putus ? "5 4" : undefined,
    opacity,
  };
  if (b.k === "rect") return <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="2" {...sifat} />;
  if (b.k === "bulat") return <circle cx={b.cx} cy={b.cy} r={b.r} {...sifat} />;
  return <polygon points={b.p.map((t) => t.join(",")).join(" ")} {...sifat} />;
}

/** Gambar satu bagian dengan kotak pembatas dipindah ke kanvas sendiri (untuk keping di nampan). */
export function KepingMandiri({ b, kelas = "h-14 w-14", label, skala }: { b: Bagian; kelas?: string; label?: string; skala?: number }) {
  const k = kotakBagian(b);
  const pad = 4;
  return (
    <svg
      viewBox={`${k.x - pad} ${k.y - pad} ${k.w + pad * 2} ${k.h + pad * 2}`}
      className={`shrink-0 ${skala ? "" : kelas}`}
      style={skala ? { width: (k.w + pad * 2) * skala, height: (k.h + pad * 2) * skala } : undefined}
      role="img"
      aria-label={label ?? b.nama}
      preserveAspectRatio="xMidYMid meet"
    >
      <GambarBagian b={b} tebal={2.6} />
    </svg>
  );
}

/* ------------------------------ Kereta balok kayu ------------------------ */

/** Kanvas kereta 300 kali 150. Lima segi empat, satu segitiga, tiga bentuk lengkung. */
export const KERETA: Bagian[] = [
  { id: "cerobong", nama: "Cerobong", g: "segiempat", warna: WARNA_C.biru, k: "rect", x: 74, y: 36, w: 16, h: 38 },
  { id: "mesin", nama: "Mesin", g: "segiempat", warna: WARNA_C.hijau, k: "rect", x: 66, y: 74, w: 46, h: 36 },
  { id: "kabin", nama: "Kabin", g: "segiempat", warna: WARNA_C.merah, k: "rect", x: 112, y: 44, w: 58, h: 66 },
  { id: "jendela", nama: "Jendela", g: "segiempat", warna: WARNA_C.kuning, k: "rect", x: 126, y: 56, w: 28, h: 28 },
  { id: "gerbong", nama: "Gerbong", g: "segiempat", warna: WARNA_C.biru, k: "rect", x: 174, y: 62, w: 104, h: 48 },
  { id: "moncong", nama: "Moncong", g: "segitiga", warna: WARNA_C.merahmuda, k: "tri", p: [[22, 110], [66, 110], [66, 74]] },
  { id: "roda1", nama: "Roda", g: "lengkung", warna: WARNA_C.kuning, k: "bulat", cx: 66, cy: 122, r: 14 },
  { id: "roda2", nama: "Roda", g: "lengkung", warna: WARNA_C.kuning, k: "bulat", cx: 138, cy: 122, r: 14 },
  { id: "roda3", nama: "Roda", g: "lengkung", warna: WARNA_C.kuning, k: "bulat", cx: 226, cy: 122, r: 14 },
];

export const JUMLAH_KERETA: Record<Gol3, number> = {
  segiempat: KERETA.filter((b) => b.g === "segiempat").length,
  segitiga: KERETA.filter((b) => b.g === "segitiga").length,
  lengkung: KERETA.filter((b) => b.g === "lengkung").length,
};

/** Kereta utuh sebagai gambar mandiri. */
export function GambarKereta({ kelas = "w-full", label = "Kereta mainan dari balok kayu" }: { kelas?: string; label?: string }) {
  return (
    <svg viewBox="0 0 300 150" className={`block h-auto ${kelas}`} role="img" aria-label={label}>
      <path d="M8 138 H292" stroke="#A8672D" strokeWidth="4" strokeLinecap="round" />
      {KERETA.map((b) => (
        <GambarBagian key={b.id} b={b} tebal={2.8} />
      ))}
    </svg>
  );
}

/* ------------------------------ Bangun gabungan polos (Picture) ---------- */

/** Dua bangun gabungan polos. Tidak diberi nama benda. Kanvas 200 kali 150. */
export const FIGUR_1: Bagian[] = [
  { id: "f1a", nama: "persegi panjang", g: "segiempat", warna: WARNA_C.merah, k: "rect", x: 50, y: 80, w: 100, h: 44 },
  { id: "f1b", nama: "persegi", g: "segiempat", warna: WARNA_C.biru, k: "rect", x: 80, y: 42, w: 40, h: 38 },
  { id: "f1c", nama: "segitiga", g: "segitiga", warna: WARNA_C.kuning, k: "tri", p: [[80, 42], [120, 42], [100, 14]] },
  { id: "f1d", nama: "bentuk lengkung", g: "lengkung", warna: WARNA_C.hijau, k: "bulat", cx: 62, cy: 128, r: 12 },
  { id: "f1e", nama: "bentuk lengkung", g: "lengkung", warna: WARNA_C.hijau, k: "bulat", cx: 138, cy: 128, r: 12 },
];

export const FIGUR_2: Bagian[] = [
  { id: "f2a", nama: "persegi panjang", g: "segiempat", warna: WARNA_C.hijau, k: "rect", x: 30, y: 70, w: 140, h: 40 },
  { id: "f2b", nama: "segitiga", g: "segitiga", warna: WARNA_C.merahmuda, k: "tri", p: [[30, 70], [70, 70], [50, 38]] },
  { id: "f2c", nama: "segitiga", g: "segitiga", warna: WARNA_C.kuning, k: "tri", p: [[80, 70], [120, 70], [100, 38]] },
  { id: "f2d", nama: "segitiga", g: "segitiga", warna: WARNA_C.merahmuda, k: "tri", p: [[130, 70], [170, 70], [150, 38]] },
  { id: "f2e", nama: "persegi", g: "segiempat", warna: WARNA_C.biru, k: "rect", x: 88, y: 114, w: 24, h: 24 },
  { id: "f2f", nama: "bentuk lengkung", g: "lengkung", warna: WARNA_C.merah, k: "bulat", cx: 56, cy: 124, r: 13 },
  { id: "f2g", nama: "bentuk lengkung", g: "lengkung", warna: WARNA_C.merah, k: "bulat", cx: 144, cy: 124, r: 13 },
];

export const hitungGol = (daftar: Bagian[], g: Gol3) => daftar.filter((b) => b.g === g).length;

/* ------------------------------ Segitiga siku-siku dan persegi ----------- */

/**
 * Satu keping segitiga siku-siku pada kanvas 120 kali 80. Dipakai Story, Infografis, dan
 * permainan menggabungkan. `titik` memakai koordinat kanvas.
 */
export function Keping({ titik, isi, garis = BIRU, tebal = 2.6, opacity = 1, putus = false }: { titik: Titik[]; isi: string; garis?: string; tebal?: number; opacity?: number; putus?: boolean }) {
  return (
    <polygon
      points={titik.map((t) => t.join(",")).join(" ")}
      fill={isi}
      stroke={garis}
      strokeWidth={tebal}
      strokeLinejoin="round"
      strokeDasharray={putus ? "5 4" : undefined}
      opacity={opacity}
    />
  );
}
