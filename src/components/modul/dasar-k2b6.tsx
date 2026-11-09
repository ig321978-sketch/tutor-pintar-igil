"use client";

import React from "react";
import { KEGIATAN, NAMA, NAMA_SATUAN, type BeratId, type KegiatanId, type SatuanId, type Rel } from "./data-k2b6";
import { NeracaRangka, type Miring } from "./diagram-k2b6";

/* ------------------------------------------------------------------------ */
/* Benda nyata Matematika Kelas 2 Bab 6 (tahap Concrete): lambang benda, neraca */
/* berisi benda, dan satuan tidak baku. Tahap Picture memakai diagram-k2b6.tsx. */
/* ------------------------------------------------------------------------ */

export type IdBenda = BeratId | SatuanId;

const EMOJI: Partial<Record<IdBenda, string>> = {
  semangka: "🍉", apel: "🍎", jeruk: "🍊", anggur: "🍇", pisang: "🍌", kelapa: "🥥", mangga: "🥭", stroberi: "🍓", tomat: "🍅",
  wortel: "🥕", kol: "🥬", labu: "🎃", terong: "🍆", buku: "📕", pensil: "✏️", tas: "🎒", penggaris: "📏", gunting: "✂️", boneka: "🧸",
  kucing: "🐱", kelinci: "🐰", tikus: "🐭", burung: "🐦", kupu: "🦋", anjing: "🐶", gajah: "🐘", sepeda: "🚲", motor: "🏍️", truk: "🚚",
};

/** Nama yang bisa dibaca untuk benda dan satuan. */
export const namaBenda = (id: IdBenda): string => (id in NAMA ? NAMA[id as BeratId] : NAMA_SATUAN[id as SatuanId]);

function GambarKhusus({ id }: { id: IdBenda }) {
  switch (id) {
    case "pepaya":
      return (
        <svg viewBox="0 0 40 40" className="h-full w-full">
          <ellipse cx="20" cy="22" rx="10" ry="16" fill="#F59E0B" stroke="#B45309" strokeWidth="2" transform="rotate(-18 20 22)" />
          <ellipse cx="20" cy="22" rx="3.5" ry="9" fill="#FB923C" transform="rotate(-18 20 22)" />
          <path d="M23 6 q3 -4 6 -1" stroke="#15803D" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "manggis":
      return (
        <svg viewBox="0 0 40 40" className="h-full w-full">
          <circle cx="20" cy="23" r="13" fill="#7E22CE" stroke="#4C1D95" strokeWidth="2" />
          <path d="M13 11 l7 5 l7 -5 l-3 7 h-8 z" fill="#16A34A" stroke="#14532D" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "penghapus":
      return (
        <svg viewBox="0 0 40 40" className="h-full w-full">
          <rect x="5" y="13" width="30" height="16" rx="4" fill="#FB7185" stroke="#9F1239" strokeWidth="2" />
          <rect x="5" y="13" width="12" height="16" rx="4" fill="#E0E7FF" stroke="#9F1239" strokeWidth="2" />
        </svg>
      );
    case "botol":
      return (
        <svg viewBox="0 0 40 40" className="h-full w-full">
          <rect x="16" y="3" width="8" height="6" rx="2" fill="#1C01A5" />
          <path d="M16 9 h8 v4 q6 3 6 9 v13 q0 3 -3 3 h-14 q-3 0 -3 -3 v-13 q0 -6 6 -9 z" fill="#BAE6FD" stroke="#1C01A5" strokeWidth="2" strokeLinejoin="round" />
          <rect x="11" y="22" width="18" height="9" fill="#38BDF8" opacity="0.75" />
        </svg>
      );
    case "bulu":
      return (
        <svg viewBox="0 0 40 40" className="h-full w-full">
          <path d="M8 34 C8 14 22 5 34 6 C34 18 28 30 12 33 Z" fill="#FDE68A" stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />
          <path d="M8 34 L28 12" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "kelereng":
      return (
        <svg viewBox="0 0 40 40" className="h-full w-full">
          <circle cx="20" cy="20" r="13" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2" />
          <path d="M11 17 q4 -9 12 -7" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
          <circle cx="20" cy="20" r="6" fill="#F472B6" opacity="0.6" />
        </svg>
      );
    case "bolaTenis":
      return (
        <svg viewBox="0 0 40 40" className="h-full w-full">
          <circle cx="20" cy="20" r="14" fill="#BEF264" stroke="#4D7C0F" strokeWidth="2.4" />
          <path d="M9 12 Q20 20 9 28" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M31 12 Q20 20 31 28" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "koin":
      return (
        <svg viewBox="0 0 40 40" className="h-full w-full">
          <circle cx="20" cy="20" r="14" fill="#FBBF24" stroke="#B45309" strokeWidth="2.5" />
          <circle cx="20" cy="20" r="9" fill="none" stroke="#B45309" strokeWidth="1.8" />
          <text x="20" y="25" textAnchor="middle" fontSize="13" fontWeight="900" fill="#92400E">
            5
          </text>
        </svg>
      );
    case "balok":
      return (
        <svg viewBox="0 0 40 40" className="h-full w-full">
          <path d="M6 14 L20 7 L34 14 L20 21 Z" fill="#FDE68A" stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />
          <path d="M6 14 V28 L20 35 V21 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />
          <path d="M34 14 V28 L20 35 V21 Z" fill="#D97706" stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

/** Satu benda nyata. Emoji berwarna untuk yang punya, gambar khusus untuk yang tidak. */
export function BendaB6({ id, ukuran = 40 }: { id: IdBenda; ukuran?: number }) {
  const e = EMOJI[id];
  return (
    <span className="inline-flex shrink-0 items-center justify-center leading-none" style={{ width: ukuran, height: ukuran, fontSize: ukuran * 0.82 }} role="img" aria-label={namaBenda(id)}>
      {e ? e : <GambarKhusus id={id} />}
    </span>
  );
}

/** Beberapa benda sejenis dalam satu piringan. Ukuran mengecil bila banyak. */
export function Tumpukan({ id, n }: { id: IdBenda; n: number }) {
  const u = n <= 3 ? 38 : n <= 6 ? 28 : n <= 10 ? 22 : 17;
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <BendaB6 key={i} id={id} ukuran={u} />
      ))}
    </>
  );
}

/** Rangka neraca yang diisi benda nyata. */
export function NeracaBenda({
  kiri,
  kanan,
  miring,
  label,
  kelas,
  varian,
}: {
  kiri: React.ReactNode;
  kanan: React.ReactNode;
  miring: Miring;
  label: string;
  kelas?: string;
  varian?: "neraca" | "gantung";
}) {
  return <NeracaRangka miring={miring} kiri={kiri} kanan={kanan} label={label} kelas={kelas} varian={varian} />;
}

/** Lambang kegiatan sehari-hari (emoji). Dipakai tahap Concrete Sub-Bab B. */
export const IKON_KEGIATAN: Record<KegiatanId, string> = {
  bangun: "🛏️", sarapan: "🍳", sekolah: "🏫", olahraga: "🏃", mandiPagi: "🚿", kantin: "🍱", pulang: "🎒", bermain: "🧸", bermainBola: "⚽",
  mandiSore: "🛁", makanMalam: "🍽️", belajarMalam: "📚", sikatGigi: "🦷", tidur: "😴", menyisir: "💇", cuciTangan: "🧼",
};

export function IkonKegiatan({ id, ukuran = 38 }: { id: KegiatanId; ukuran?: number }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center leading-none" style={{ width: ukuran, height: ukuran, fontSize: ukuran * 0.82 }} role="img" aria-label={KEGIATAN[id].nama}>
      {IKON_KEGIATAN[id]}
    </span>
  );
}

/** Miring yang dihasilkan hubungan kiri terhadap kanan. */
export const miringDariRel = (r: Rel): Miring => (r === "lebih berat" ? -1 : r === "lebih ringan" ? 1 : 0);
