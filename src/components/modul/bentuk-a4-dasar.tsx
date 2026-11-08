"use client";

import React from "react";
import { BIRU, EMAS, HIJAU, KUNING, MERAH_MUDA } from "./CeritaBandingB";

/* ------------------------------------------------------------------------ */
/* Bab 4 Sub-Bab A: gambar dasar. Semua dibuat di klien (SVG), tanpa API.     */
/*  - Benda: gambar benda nyata berwarna (dipakai Story, Infografis, Concrete) */
/*  - Bangun: gambar bentuk polos tanpa benda (dipakai Picture dan Abstract)  */
/* Naskah: naskah/mtk-1-bab4-sub-a-mendeskripsikan-bentuk.md                   */
/* ------------------------------------------------------------------------ */

export type Golongan = "lengkung" | "segitiga" | "segiempat";

export const NAMA_GOLONGAN: Record<Golongan, string> = {
  lengkung: "bentuk lengkung",
  segitiga: "segitiga",
  segiempat: "segi empat",
};

export const NAMA_PENDEK: Record<Golongan, string> = {
  lengkung: "Lengkung",
  segitiga: "Segitiga",
  segiempat: "Segi empat",
};

/** Banyak sisi lurus dan sudut (pojok) tiap golongan. Bentuk lengkung tidak punya keduanya. */
export const CIRI: Record<Golongan, { sisi: number; sudut: number }> = {
  lengkung: { sisi: 0, sudut: 0 },
  segitiga: { sisi: 3, sudut: 3 },
  segiempat: { sisi: 4, sudut: 4 },
};

export const WARNA_GOLONGAN: Record<Golongan, string> = {
  lengkung: KUNING,
  segitiga: MERAH_MUDA,
  segiempat: HIJAU,
};

export const GOLONGAN_URUT: Golongan[] = ["lengkung", "segitiga", "segiempat"];

/* ------------------------------------------------------------------------ */
/* Benda nyata                                                                */
/* ------------------------------------------------------------------------ */

export type JenisBenda =
  | "donat"
  | "piring"
  | "telur"
  | "melon"
  | "jam"
  | "bola"
  | "semangka"
  | "risol"
  | "penggaris"
  | "lupis"
  | "tenda"
  | "lapis"
  | "jendela"
  | "pintu"
  | "buku"
  | "bingkai"
  | "bendera";

export const DAFTAR_BENDA: Record<JenisBenda, { nama: string; golongan: Golongan }> = {
  donat: { nama: "Donat", golongan: "lengkung" },
  piring: { nama: "Piring", golongan: "lengkung" },
  telur: { nama: "Telur", golongan: "lengkung" },
  melon: { nama: "Melon", golongan: "lengkung" },
  jam: { nama: "Jam dinding", golongan: "lengkung" },
  bola: { nama: "Bola", golongan: "lengkung" },
  semangka: { nama: "Irisan semangka", golongan: "segitiga" },
  risol: { nama: "Kue risol", golongan: "segitiga" },
  penggaris: { nama: "Penggaris segitiga", golongan: "segitiga" },
  lupis: { nama: "Kue lupis", golongan: "segitiga" },
  tenda: { nama: "Tenda", golongan: "segitiga" },
  lapis: { nama: "Kue lapis", golongan: "segiempat" },
  jendela: { nama: "Jendela", golongan: "segiempat" },
  pintu: { nama: "Pintu", golongan: "segiempat" },
  buku: { nama: "Buku", golongan: "segiempat" },
  bingkai: { nama: "Bingkai foto", golongan: "segiempat" },
  bendera: { nama: "Bendera", golongan: "segiempat" },
};

/** Kalimat penjelas satu benda. Dipakai Suara Guru saat benda diketuk atau dijawab. */
export function ciriBenda(jenis: JenisBenda): string {
  const { nama, golongan } = DAFTAR_BENDA[jenis];
  if (golongan === "lengkung") return `${nama} tepinya melengkung. Tidak ada sisi lurus dan tidak ada sudut. Jadi ${nama.toLowerCase()} berbentuk lengkung.`;
  if (golongan === "segitiga") return `${nama} punya tiga sisi lurus dan tiga sudut. Jadi ${nama.toLowerCase()} berbentuk segitiga.`;
  return `${nama} punya empat sisi lurus dan empat sudut. Jadi ${nama.toLowerCase()} berbentuk segi empat.`;
}

const TEBAL = 2.6;

/** Isi gambar benda pada kanvas 64 kali 64. Dipakai di dalam svg lain. */
export function GambarBenda({ jenis }: { jenis: JenisBenda }) {
  switch (jenis) {
    case "donat":
      return (
        <>
          <circle cx="32" cy="32" r="26" fill="#F3C98A" stroke={BIRU} strokeWidth={TEBAL} />
          <circle cx="32" cy="32" r="21" fill={MERAH_MUDA} stroke={BIRU} strokeWidth="1.6" />
          <circle cx="32" cy="32" r="8" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.2" />
          <path d="M20 20 l4 -2 M42 17 l-1 4 M47 34 l4 1 M38 48 l2 -4 M20 42 l-4 -1 M30 13 l1 4" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M14 30 l3 3 M47 46 l3 -3" stroke={EMAS} strokeWidth="2.2" strokeLinecap="round" />
        </>
      );
    case "piring":
      return (
        <>
          <circle cx="32" cy="32" r="27" fill="#FFFFFF" stroke={BIRU} strokeWidth={TEBAL} />
          <circle cx="32" cy="32" r="18" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="2.4" />
          <path d="M16 20 Q22 12 32 10" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </>
      );
    case "telur":
      return (
        <>
          <ellipse cx="32" cy="34" rx="18" ry="24" fill="#FFF3D6" stroke={BIRU} strokeWidth={TEBAL} />
          <path d="M22 24 Q24 16 30 13" fill="none" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" />
        </>
      );
    case "melon":
      return (
        <>
          <circle cx="32" cy="34" r="25" fill="#A7E3B5" stroke={BIRU} strokeWidth={TEBAL} />
          <path d="M32 9 C21 22 21 46 32 59 M32 9 C43 22 43 46 32 59 M8 34 H56" fill="none" stroke="#5FAE79" strokeWidth="2" strokeLinecap="round" />
          <path d="M28 9 Q32 3 36 9" fill="none" stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
          <path d="M16 24 Q19 18 24 16" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </>
      );
    case "jam":
      return (
        <>
          <circle cx="32" cy="32" r="27" fill="#FFFFFF" stroke={EMAS} strokeWidth="5" />
          <circle cx="32" cy="32" r="27" fill="none" stroke={BIRU} strokeWidth="1.6" />
          <path d="M32 8 V13 M56 32 H51 M32 56 V51 M8 32 H13" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
          <path d="M32 32 V17 M32 32 L43 38" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
          <circle cx="32" cy="32" r="2.8" fill={EMAS} stroke={BIRU} strokeWidth="1.4" />
        </>
      );
    case "bola":
      return (
        <>
          <circle cx="32" cy="32" r="26" fill="#EF4444" stroke={BIRU} strokeWidth={TEBAL} />
          <path d="M8 27 Q32 42 56 27" fill="none" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M17 17 Q21 12 27 10" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        </>
      );
    case "semangka":
      return (
        <>
          <polygon points="6,14 58,14 32,58" fill="#F87171" stroke={BIRU} strokeWidth={TEBAL} strokeLinejoin="round" />
          <path d="M8 14 H56" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" />
          <path d="M8 14 H56" stroke={BIRU} strokeWidth="1.2" strokeDasharray="1 6" transform="translate(0 3.4)" />
          {[
            [22, 25],
            [32, 24],
            [42, 25],
            [27, 35],
            [37, 35],
            [32, 45],
          ].map(([x, y]) => (
            <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="1.8" ry="2.8" fill={BIRU} />
          ))}
        </>
      );
    case "risol":
      return (
        <>
          <polygon points="32,7 59,55 5,55" fill="#F3C98A" stroke={BIRU} strokeWidth={TEBAL} strokeLinejoin="round" />
          <polygon points="32,17 50,50 14,50" fill="#E7B16A" opacity="0.65" />
          {[
            [32, 28],
            [26, 38],
            [38, 38],
            [32, 46],
            [21, 48],
            [43, 48],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.7" fill="#A8672D" />
          ))}
        </>
      );
    case "penggaris":
      return (
        <>
          <polygon points="8,8 8,57 57,57" fill="#BFDBFE" stroke={BIRU} strokeWidth={TEBAL} strokeLinejoin="round" />
          <polygon points="17,30 17,48 35,48" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8 16 H15 M8 24 H13 M8 32 H15 M8 40 H13 M8 48 H15" stroke={BIRU} strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
    case "lupis":
      return (
        <>
          <polygon points="32,6 59,57 5,57" fill="#86D3A0" stroke={BIRU} strokeWidth={TEBAL} strokeLinejoin="round" />
          <path d="M32 6 V57 M21 28 H43 M13 43 H51" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />
          <path d="M5 57 H59" stroke="#FFFFFF" strokeWidth="3.4" strokeDasharray="2 5" strokeLinecap="round" transform="translate(0 -4)" />
        </>
      );
    case "tenda":
      return (
        <>
          <polygon points="32,6 60,57 4,57" fill="#FDBA74" stroke={BIRU} strokeWidth={TEBAL} strokeLinejoin="round" />
          <polygon points="32,30 44,57 20,57" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
          <path d="M32 6 V0" stroke={BIRU} strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "lapis":
      return (
        <>
          {["#F9A8D4", "#FFF3D6", "#F9A8D4", "#FFF3D6", "#F9A8D4"].map((w, i) => (
            <rect key={i} x="6" y={16 + i * 6.8} width="52" height="6.9" fill={w} />
          ))}
          <rect x="6" y="16" width="52" height="34" rx="3" fill="none" stroke={BIRU} strokeWidth={TEBAL} />
        </>
      );
    case "jendela":
      return (
        <>
          <rect x="6" y="6" width="52" height="52" rx="2" fill="#8B5E34" stroke={BIRU} strokeWidth={TEBAL} />
          <rect x="12" y="12" width="40" height="40" fill="#DFF1FF" stroke={BIRU} strokeWidth="1.6" />
          <path d="M32 12 V52 M12 32 H52" stroke="#8B5E34" strokeWidth="3.4" />
          <path d="M16 20 L24 16 M16 26 L28 20" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
        </>
      );
    case "pintu":
      return (
        <>
          <rect x="14" y="4" width="36" height="57" rx="2" fill="#C98A4B" stroke={BIRU} strokeWidth={TEBAL} />
          <rect x="19" y="10" width="26" height="19" fill="none" stroke="#8B5E34" strokeWidth="2" />
          <rect x="19" y="35" width="26" height="19" fill="none" stroke="#8B5E34" strokeWidth="2" />
          <circle cx="43" cy="32" r="2.6" fill={EMAS} stroke={BIRU} strokeWidth="1.2" />
        </>
      );
    case "buku":
      return (
        <>
          <rect x="10" y="6" width="44" height="52" rx="3" fill="#6D5BDE" stroke={BIRU} strokeWidth={TEBAL} />
          <rect x="10" y="6" width="8" height="52" rx="3" fill="#4C3BC0" stroke={BIRU} strokeWidth="1.6" />
          <rect x="24" y="14" width="24" height="14" rx="2" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.4" />
          <path d="M27 19 H45 M27 24 H40" stroke={BIRU} strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
    case "bingkai":
      return (
        <>
          <rect x="4" y="8" width="56" height="48" rx="2" fill="#A8672D" stroke={BIRU} strokeWidth={TEBAL} />
          <rect x="11" y="15" width="42" height="34" fill="#E0F2FE" stroke={BIRU} strokeWidth="1.6" />
          <circle cx="24" cy="26" r="5" fill={EMAS} stroke={BIRU} strokeWidth="1.4" />
          <path d="M11 49 L26 34 L36 44 L42 38 L53 49 Z" fill={HIJAU} stroke={BIRU} strokeWidth="1.4" strokeLinejoin="round" />
        </>
      );
    case "bendera":
      return (
        <>
          <rect x="8" y="5" width="4" height="55" rx="1.6" fill="#6B7280" stroke={BIRU} strokeWidth="1.6" />
          <rect x="12" y="10" width="44" height="14" fill="#E11D48" />
          <rect x="12" y="24" width="44" height="14" fill="#FFFFFF" />
          <rect x="12" y="10" width="44" height="28" fill="none" stroke={BIRU} strokeWidth={TEBAL} />
        </>
      );
    default:
      return null;
  }
}

/** Satu benda nyata sebagai gambar mandiri. */
export function Benda({ jenis, kelas = "h-14 w-14", bayangan = false }: { jenis: JenisBenda; kelas?: string; bayangan?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`shrink-0 ${kelas}`}
      role="img"
      aria-label={bayangan ? "Bayangan benda" : DAFTAR_BENDA[jenis].nama}
      style={bayangan ? { filter: "brightness(0)", opacity: 0.78 } : undefined}
    >
      <GambarBenda jenis={jenis} />
    </svg>
  );
}

/** Benda di dalam adegan SVG yang lebih besar. Titik (x, y) ada di pojok kiri atas. */
export function BendaDi({ jenis, x, y, w }: { jenis: JenisBenda; x: number; y: number; w: number }) {
  return (
    <svg x={x} y={y} width={w} height={w} viewBox="0 0 64 64" overflow="visible">
      <GambarBenda jenis={jenis} />
    </svg>
  );
}

/* ------------------------------------------------------------------------ */
/* Bangun polos (tanpa benda)                                                 */
/* ------------------------------------------------------------------------ */

export type JenisBangun =
  | "bulat"
  | "lonjong"
  | "segitiga"
  | "segitigaTerbalik"
  | "segitigaSiku"
  | "persegi"
  | "persegiPanjang"
  | "persegiPanjangTegak"
  | "belahKetupat";

export const GOLONGAN_BANGUN: Record<JenisBangun, Golongan> = {
  bulat: "lengkung",
  lonjong: "lengkung",
  segitiga: "segitiga",
  segitigaTerbalik: "segitiga",
  segitigaSiku: "segitiga",
  persegi: "segiempat",
  persegiPanjang: "segiempat",
  persegiPanjangTegak: "segiempat",
  belahKetupat: "segiempat",
};

export const NAMA_BANGUN: Record<JenisBangun, string> = {
  bulat: "bentuk bulat",
  lonjong: "bentuk lonjong",
  segitiga: "segitiga",
  segitigaTerbalik: "segitiga terbalik",
  segitigaSiku: "segitiga miring",
  persegi: "persegi",
  persegiPanjang: "persegi panjang",
  persegiPanjangTegak: "persegi panjang tegak",
  belahKetupat: "segi empat miring",
};

export function Bangun({
  jenis,
  isi = "#FFFFFF",
  garis = BIRU,
  tebal = 3,
  kelas = "h-16 w-16",
  label,
}: {
  jenis: JenisBangun;
  isi?: string;
  garis?: string;
  tebal?: number;
  kelas?: string;
  label?: string;
}) {
  const sifat = { fill: isi, stroke: garis, strokeWidth: tebal, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 64 64" className={`shrink-0 ${kelas}`} role="img" aria-label={label ?? NAMA_BANGUN[jenis]}>
      {jenis === "bulat" ? <circle cx="32" cy="32" r="26" {...sifat} /> : null}
      {jenis === "lonjong" ? <ellipse cx="32" cy="32" rx="28" ry="17" {...sifat} /> : null}
      {jenis === "segitiga" ? <polygon points="32,6 60,56 4,56" {...sifat} /> : null}
      {jenis === "segitigaTerbalik" ? <polygon points="4,10 60,10 32,58" {...sifat} /> : null}
      {jenis === "segitigaSiku" ? <polygon points="8,8 8,56 58,56" {...sifat} /> : null}
      {jenis === "persegi" ? <rect x="10" y="10" width="44" height="44" {...sifat} /> : null}
      {jenis === "persegiPanjang" ? <rect x="4" y="16" width="56" height="32" {...sifat} /> : null}
      {jenis === "persegiPanjangTegak" ? <rect x="16" y="4" width="32" height="56" {...sifat} /> : null}
      {jenis === "belahKetupat" ? <polygon points="32,4 60,32 32,60 4,32" {...sifat} /> : null}
    </svg>
  );
}
