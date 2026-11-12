"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B8 Sub-Bab A: turus berkelompok lima. Satu kelompok memuat   */
/* empat garis tegak dan satu garis miring yang memotongnya.                   */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const LEBAR_KELOMPOK = 30;
const JARAK = 6;

/** Turus satu kategori: tiap lima garis menjadi satu kelompok. */
export function TurusSatu({ jumlah, nama }: { jumlah: number; nama: string }) {
  const penuh = Math.floor(jumlah / 5);
  const sisa = jumlah % 5;
  const lebar = Math.max(LEBAR_KELOMPOK, penuh * LEBAR_KELOMPOK + (sisa > 0 ? sisa * JARAK + 6 : 0));
  const garis: React.ReactNode[] = [];
  for (let g = 0; g < penuh; g += 1) {
    const x0 = 4 + g * LEBAR_KELOMPOK;
    for (let i = 0; i < 4; i += 1) garis.push(<line key={`t${g}-${i}`} x1={x0 + i * JARAK} y1={4} x2={x0 + i * JARAK} y2={22} stroke={BIRU} strokeWidth={2.6} strokeLinecap="round" />);
    garis.push(<line key={`m${g}`} x1={x0 - 3} y1={19} x2={x0 + 3 * JARAK + 3} y2={7} stroke={EMAS} strokeWidth={2.6} strokeLinecap="round" />);
  }
  const x1 = 4 + penuh * LEBAR_KELOMPOK;
  for (let i = 0; i < sisa; i += 1) garis.push(<line key={`s${i}`} x1={x1 + i * JARAK} y1={4} x2={x1 + i * JARAK} y2={22} stroke={BIRU} strokeWidth={2.6} strokeLinecap="round" />);
  return (
    <svg viewBox={`0 0 ${lebar} 26`} style={{ width: `${Math.min(lebar, 190)}px`, height: "26px" }} role="img" aria-label={`Turus ${nama}, ${penuh} kelompok lima dan ${sisa} garis`}>
      {garis}
    </svg>
  );
}
