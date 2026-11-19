"use client";

import React from "react";
import { LABEL_BANDUL } from "./logika-cpa";

/**
 * Gambar bandul timbangan kodok yang dipakai tugas CPA (LangkahBandul.tsx) dan Simulasi Meja Bandul:
 * logam kuning (Concrete dan Simulasi) atau logam polos (Pictorial). Satu bandul = persegi panjang bertulisan dengan "x banyaknya" di bawahnya.
 */
export const EMAS = { isi: "#FBBF24", garis: "#92400E", teks: "#78350F" };
export const POLOS = { isi: "#CBD5E1", garis: "#475569", teks: "#1E293B" };
export type Logam = typeof EMAS;
const UNGU = "#1C01A5";

/** Satu bandul logam berukuran sesuai jenisnya. Pojok kiri-atas (x, y). */
export function BarBandul({ x, y, jenis, n, logam }: { x: number; y: number; jenis: number; n: number; logam: Logam }) {
  const w = 26 + jenis * 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={14} rx={3} fill={logam.isi} stroke={logam.garis} strokeWidth={1.2} />
      <text x={x + w / 2} y={y + 9.6} textAnchor="middle" fontSize={6.6} fontWeight={900} fill={logam.teks} aria-hidden="true">
        {LABEL_BANDUL[jenis]}
      </text>
      {n > 1 ? (
        <text x={x + w / 2} y={y + 23} textAnchor="middle" fontSize={8} fontWeight={900} fill={UNGU} aria-hidden="true">
          {`x ${n}`}
        </text>
      ) : null}
    </g>
  );
}

/** Bandul menurut jenisnya (hanya yang ada), tersusun dalam `kolom` kolom. Pojok kiri-atas wilayah (x0, y0), tinggi tiap baris 28. */
export function GrupBandul({ set, x0, y0, logam, kolom = 2, lebarSel = 38 }: { set: readonly number[]; x0: number; y0: number; logam: Logam; kolom?: number; lebarSel?: number }) {
  const ada = set.map((n, i) => ({ n, i })).filter((g) => g.n > 0);
  return (
    <g>
      {ada.map((g, q) => (
        <BarBandul key={g.i} x={x0 + (q % kolom) * lebarSel} y={y0 + Math.floor(q / kolom) * 28} jenis={g.i} n={g.n} logam={logam} />
      ))}
    </g>
  );
}
