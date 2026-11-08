"use client";

import React from "react";
import { BIRU, EMAS, HIJAU } from "./CeritaBandingB";
import { GambarBenda, type Golongan } from "./bentuk-a4-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 4 Sub-Bab B: gambar dasar untuk mengelompokkan benda. Semua dibuat di   */
/* klien (SVG), tanpa panggilan API.                                          */
/*  - BendaB: benda nyata berwarna (kue, buah, mainan). Dipakai Story,         */
/*    Infografis, dan Concrete. Mainan bisa diganti warna dan ukurannya.       */
/*  - Bentuk polos tanpa benda memakai Bangun dari bentuk-a4-dasar            */
/*    (dipakai Picture dan Abstract).                                          */
/* Naskah: naskah/mtk-1-bab4-sub-b-mengelompokkan-benda.md                     */
/* ------------------------------------------------------------------------ */

/* ------------------------------ Ciri: warna dan ukuran ------------------- */

export type Warna = "merah" | "kuning" | "hijau" | "biru" | "cokelat" | "ungu" | "merahmuda";

export const WARNA_ISI: Record<Warna, string> = {
  merah: "#F25C54",
  kuning: "#FFD93D",
  hijau: "#5CC47F",
  biru: "#5B9BFF",
  cokelat: "#B9824A",
  ungu: "#A866D9",
  merahmuda: "#F7A8C4",
};

export const NAMA_WARNA: Record<Warna, string> = {
  merah: "merah",
  kuning: "kuning",
  hijau: "hijau",
  biru: "biru",
  cokelat: "cokelat",
  ungu: "ungu",
  merahmuda: "merah muda",
};

export type Ukuran = "besar" | "kecil";

export const KELAS_UKURAN: Record<Ukuran, string> = {
  besar: "h-16 w-16",
  kecil: "h-9 w-9",
};

/** Tiga aturan mengelompokkan yang dipelajari di Sub-Bab B. */
export type Aturan = "bentuk" | "warna" | "ukuran";

export const NAMA_ATURAN: Record<Aturan, string> = {
  bentuk: "bentuk",
  warna: "warna",
  ukuran: "ukuran",
};

/* ------------------------------ Benda nyata ------------------------------ */

export type KueB = "cucur" | "risol" | "talam" | "lapisHijau" | "brownies" | "lupis";
export type BuahB = "semangka" | "melon" | "anggur" | "sawo";
export type MainanB = "bola" | "kotak" | "topi";
export type JenisBendaB = KueB | BuahB | MainanB;

export const DAFTAR_KUE: KueB[] = ["cucur", "risol", "talam", "lapisHijau", "brownies", "lupis"];
export const DAFTAR_BUAH: BuahB[] = ["semangka", "melon", "anggur", "sawo"];

type AtributB = { nama: string; bentuk: Golongan; warna?: Warna; ukuran?: Ukuran };

/**
 * Ciri tetap tiap benda. Kue dan buah warnanya tetap. Mainan (bola, kotak, topi)
 * warnanya dipilih saat dipakai, jadi `warna` kosong di sini.
 */
export const ATRIBUT_B: Record<JenisBendaB, AtributB> = {
  cucur: { nama: "Kue cucur", bentuk: "lengkung", warna: "cokelat" },
  risol: { nama: "Kue risol", bentuk: "segitiga", warna: "cokelat" },
  talam: { nama: "Kue talam", bentuk: "lengkung", warna: "hijau" },
  lapisHijau: { nama: "Kue lapis hijau", bentuk: "segiempat", warna: "hijau" },
  brownies: { nama: "Bolu cokelat", bentuk: "segiempat", warna: "cokelat" },
  lupis: { nama: "Kue lupis", bentuk: "segitiga", warna: "hijau" },
  semangka: { nama: "Semangka", bentuk: "lengkung", warna: "hijau", ukuran: "besar" },
  melon: { nama: "Melon", bentuk: "lengkung", warna: "hijau", ukuran: "besar" },
  anggur: { nama: "Anggur", bentuk: "lengkung", warna: "ungu", ukuran: "kecil" },
  sawo: { nama: "Sawo", bentuk: "lengkung", warna: "cokelat", ukuran: "kecil" },
  bola: { nama: "Bola", bentuk: "lengkung" },
  kotak: { nama: "Kotak hadiah", bentuk: "segiempat" },
  topi: { nama: "Topi pesta", bentuk: "segitiga" },
};

/** Satu benda yang dipakai di permainan. Mainan membawa warna dan ukurannya sendiri. */
export type ItemB = { jenis: JenisBendaB; warna?: Warna; ukuran?: Ukuran };

export const bentukItem = (i: ItemB): Golongan => ATRIBUT_B[i.jenis].bentuk;
export const warnaItem = (i: ItemB): Warna => ATRIBUT_B[i.jenis].warna ?? i.warna ?? "merah";
export const ukuranItem = (i: ItemB): Ukuran => i.ukuran ?? ATRIBUT_B[i.jenis].ukuran ?? "besar";

/** Nama lengkap yang dibacakan, misalnya "bola merah besar". Kue dan buah cukup namanya. */
export function namaItem(i: ItemB): string {
  const a = ATRIBUT_B[i.jenis];
  if (a.warna) return a.nama;
  return `${a.nama} ${NAMA_WARNA[warnaItem(i)]}${i.ukuran ? ` ${i.ukuran}` : ""}`;
}

const TEBAL = 2.6;

/** Isi gambar benda pada kanvas 64 kali 64. Dipakai di dalam svg lain. */
export function GambarBendaB({ jenis, warna = "merah" }: { jenis: JenisBendaB; warna?: Warna }) {
  const isi = WARNA_ISI[warna];
  switch (jenis) {
    case "cucur":
      return (
        <>
          <circle cx="32" cy="34" r="25" fill="#B8742F" stroke={BIRU} strokeWidth={TEBAL} />
          <circle cx="32" cy="34" r="19" fill="#D79A4E" />
          <circle cx="32" cy="34" r="7" fill="#B8742F" opacity="0.7" />
          <path d="M14 26 Q18 20 24 18" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
          <path d="M44 22 l3 2 M50 36 l3 0 M42 50 l2 3 M20 48 l-3 2" stroke="#8A5322" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "risol":
      return <GambarBenda jenis="risol" />;
    case "lupis":
      return <GambarBenda jenis="lupis" />;
    case "talam":
      return (
        <>
          <path d="M10 32 H54 L50 54 Q32 60 14 54 Z" fill="#FFFFFF" stroke={BIRU} strokeWidth={TEBAL} strokeLinejoin="round" />
          <path d="M8 32 Q8 12 32 12 Q56 12 56 32 Z" fill="#5CC47F" stroke={BIRU} strokeWidth={TEBAL} strokeLinejoin="round" />
          <path d="M16 26 Q20 19 27 17" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
        </>
      );
    case "lapisHijau":
      return (
        <>
          {["#5CC47F", "#D1F2DC", "#5CC47F", "#D1F2DC", "#5CC47F"].map((w, i) => (
            <rect key={i} x="6" y={16 + i * 6.8} width="52" height="6.9" fill={w} />
          ))}
          <rect x="6" y="16" width="52" height="34" rx="3" fill="none" stroke={BIRU} strokeWidth={TEBAL} />
        </>
      );
    case "brownies":
      return (
        <>
          <rect x="6" y="18" width="52" height="34" rx="3" fill="#5B3420" stroke={BIRU} strokeWidth={TEBAL} />
          <rect x="6" y="18" width="52" height="11" rx="3" fill="#7A4A2E" />
          {[
            [16, 23],
            [26, 22],
            [36, 24],
            [46, 22],
            [52, 26],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2.3" fill="#F2C14E" />
          ))}
          <rect x="6" y="18" width="52" height="34" rx="3" fill="none" stroke={BIRU} strokeWidth={TEBAL} />
        </>
      );
    case "semangka":
      return (
        <>
          <circle cx="32" cy="34" r="27" fill="#2F9E5B" stroke={BIRU} strokeWidth={TEBAL} />
          <path
            d="M32 7 C22 20 22 48 32 61 M32 7 C42 20 42 48 32 61 M14 14 C20 28 20 42 14 54 M50 14 C44 28 44 42 50 54"
            fill="none"
            stroke="#1B6B3C"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path d="M16 22 Q19 15 26 12" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </>
      );
    case "melon":
      return <GambarBenda jenis="melon" />;
    case "anggur":
      return (
        <>
          <path d="M33 14 Q35 6 42 6" fill="none" stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
          <ellipse cx="46" cy="9" rx="6" ry="3" fill={HIJAU} stroke={BIRU} strokeWidth="1.4" />
          <circle cx="23" cy="40" r="15" fill="#8B3FB5" stroke={BIRU} strokeWidth={TEBAL} />
          <circle cx="42" cy="30" r="13" fill="#A866D9" stroke={BIRU} strokeWidth={TEBAL} />
          <path d="M14 34 Q16 29 21 27" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" opacity="0.8" />
          <path d="M36 24 Q38 20 42 19" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
        </>
      );
    case "sawo":
      return (
        <>
          <circle cx="19" cy="42" r="14" fill="#C2956A" stroke={BIRU} strokeWidth={TEBAL} />
          <circle cx="45" cy="40" r="14" fill="#B9824A" stroke={BIRU} strokeWidth={TEBAL} />
          <circle cx="32" cy="20" r="14" fill="#CDA070" stroke={BIRU} strokeWidth={TEBAL} />
          <path d="M26 14 Q28 10 32 9 M10 36 Q12 32 16 31 M38 34 Q40 30 44 29" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
        </>
      );
    case "bola":
      return (
        <>
          <circle cx="32" cy="32" r="26" fill={isi} stroke={BIRU} strokeWidth={TEBAL} />
          <path d="M8 27 Q32 42 56 27" fill="none" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M17 17 Q21 12 27 10" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        </>
      );
    case "kotak":
      return (
        <>
          <rect x="8" y="18" width="48" height="40" rx="3" fill={isi} stroke={BIRU} strokeWidth={TEBAL} />
          <rect x="29" y="18" width="6" height="40" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.4" />
          <path d="M8 34 H56" stroke="#FFFFFF" strokeWidth="5" opacity="0.75" />
          <path d="M32 18 Q20 4 15 12 Q15 19 32 18 Q49 4 49 12 Q49 19 32 18" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
        </>
      );
    case "topi":
      return (
        <>
          <polygon points="32,10 58,58 6,58" fill={isi} stroke={BIRU} strokeWidth={TEBAL} strokeLinejoin="round" />
          <path d="M20 44 H44 M26 30 H38" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
          <circle cx="32" cy="9" r="5" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
          <circle cx="32" cy="52" r="2.4" fill="#FFFFFF" />
        </>
      );
    default:
      return <circle cx="32" cy="32" r="20" fill={EMAS} />;
  }
}

/** Satu benda nyata sebagai gambar mandiri. */
export function BendaB({
  jenis,
  warna,
  kelas = "h-14 w-14",
  bayangan = false,
  label,
}: {
  jenis: JenisBendaB;
  warna?: Warna;
  kelas?: string;
  bayangan?: boolean;
  label?: string;
}) {
  const nama = label ?? namaItem({ jenis, warna });
  return (
    <svg
      viewBox="0 0 64 64"
      className={`shrink-0 ${kelas}`}
      role="img"
      aria-label={bayangan ? "Bayangan benda" : nama}
      style={bayangan ? { filter: "brightness(0)", opacity: 0.78 } : undefined}
    >
      <GambarBendaB jenis={jenis} warna={warna} />
    </svg>
  );
}

/** Satu item permainan. Ukuran besar atau kecil ikut dari ciri benda bila tidak diberi kelas. */
export function GambarItem({ item, kelas }: { item: ItemB; kelas?: string }) {
  return <BendaB jenis={item.jenis} warna={item.warna} kelas={kelas ?? (item.ukuran ? KELAS_UKURAN[item.ukuran] : "h-14 w-14")} label={namaItem(item)} />;
}

/** Benda di dalam adegan SVG yang lebih besar. Titik (x, y) ada di pojok kiri atas. */
export function BendaBDi({ jenis, warna, x, y, w }: { jenis: JenisBendaB; warna?: Warna; x: number; y: number; w: number }) {
  return (
    <svg x={x} y={y} width={w} height={w} viewBox="0 0 64 64" overflow="visible">
      <GambarBendaB jenis={jenis} warna={warna} />
    </svg>
  );
}

/* ------------------------------ Bentuk polos dengan warna dan ukuran ----- */

/** Tiga ukuran bentuk polos. Dipakai untuk membandingkan besar dan kecil. */
export const KELAS_BANGUN: Record<"besar" | "sedang" | "kecil", string> = {
  besar: "h-20 w-20",
  sedang: "h-14 w-14",
  kecil: "h-8 w-8",
};
