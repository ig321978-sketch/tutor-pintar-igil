"use client";

import React from "react";

/**
 * Gambar turus Kelas 3 Bab 5: garis tegak, dan tiap garis kelima dicoret miring di atas empat garis tegak.
 * Hanya garis polos (batas Concrete dan Picture terjaga).
 */
export default function GambarTurusK3B5({ n, warna = "#1C01A5", tinggi = 28, label }: { n: number; warna?: string; tinggi?: number; label?: string }) {
  if (n <= 0) return <span className="text-sm font-bold text-[#1C01A5]/40">—</span>;
  const jarak = 7;
  const celah = 10;
  const penuh = Math.floor(n / 5);
  const sisa = n % 5;
  const lebarKelompok = 4 * jarak + celah;
  const lebar = penuh * lebarKelompok + sisa * jarak + 6;
  const h = 24;
  const garis: React.ReactNode[] = [];
  for (let g = 0; g < penuh; g += 1) {
    const x0 = 4 + g * lebarKelompok;
    for (let i = 0; i < 4; i += 1) garis.push(<line key={`g${g}-${i}`} x1={x0 + i * jarak} y1={3} x2={x0 + i * jarak} y2={h - 3} stroke={warna} strokeWidth="2.5" strokeLinecap="round" />);
    garis.push(<line key={`g${g}-m`} x1={x0 - 3} y1={h - 5} x2={x0 + 3 * jarak + 3} y2={5} stroke={warna} strokeWidth="2.5" strokeLinecap="round" />);
  }
  for (let i = 0; i < sisa; i += 1) {
    const x = 4 + penuh * lebarKelompok + i * jarak;
    garis.push(<line key={`s${i}`} x1={x} y1={3} x2={x} y2={h - 3} stroke={warna} strokeWidth="2.5" strokeLinecap="round" />);
  }
  return (
    <svg viewBox={`0 0 ${lebar} ${h}`} style={{ height: tinggi, width: (lebar * tinggi) / h }} className="inline-block shrink-0" role="img" aria-label={label ?? `turus ${n}`}>
      {garis}
    </svg>
  );
}
