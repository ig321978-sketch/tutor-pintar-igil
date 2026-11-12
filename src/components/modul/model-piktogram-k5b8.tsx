"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B8 Sub-Bab B: piktogram. Tiap baris punya simbol utuh dan   */
/* bila perlu setengah simbol. Keterangan kunci ditulis di bawah gambar.      */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MERAH = "#B91C1C";
const JARAK = 24;
const X0 = 100;

export type BarisPik = {
  nama: string;
  penuh: number;
  setengah: boolean;
  /** Simbol digambar lebih besar (cacat ukuran). */
  besar?: boolean;
  /** Tulisan setelah simbol, misalnya sisa yang tidak bisa digambar. */
  tanda?: string;
};

function Simbol({ cx, cy, r, setengah }: { cx: number; cy: number; r: number; setengah: boolean }) {
  if (setengah) {
    return <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} Z`} fill={EMAS} stroke={BIRU} strokeWidth={2} strokeLinejoin="round" />;
  }
  return <circle cx={cx} cy={cy} r={r} fill={EMAS} stroke={BIRU} strokeWidth={2} />;
}

/** Piktogram: kunci null berarti keterangan kunci hilang. */
export function GambarPiktogram({ baris, kunci, nama }: { baris: BarisPik[]; kunci: number | null; nama: string }) {
  const tinggi = baris.length * 34 + 30;
  return (
    <svg viewBox={`0 0 310 ${tinggi}`} className="mx-auto h-auto w-full max-w-[340px]" role="img" aria-label={`Piktogram ${nama}`}>
      {baris.map((b, j) => {
        const cy = 20 + j * 34;
        const total = b.penuh + (b.setengah ? 1 : 0);
        const r = b.besar ? 13 : 9;
        return (
          <g key={b.nama}>
            <text x={4} y={cy + 4} fontSize={11} fontWeight={800} fill={BIRU}>
              {b.nama}
            </text>
            {Array.from({ length: b.penuh }, (_, n) => (
              <Simbol key={n} cx={X0 + n * JARAK} cy={cy} r={r} setengah={false} />
            ))}
            {b.setengah ? <Simbol cx={X0 + b.penuh * JARAK} cy={cy} r={r} setengah /> : null}
            {b.tanda ? (
              <text x={X0 + total * JARAK + 2} y={cy + 4} fontSize={11} fontWeight={800} fill={MERAH}>
                {b.tanda}
              </text>
            ) : null}
          </g>
        );
      })}
      <g transform={`translate(4 ${tinggi - 12})`}>
        <text x={0} y={0} fontSize={11} fontWeight={800} fill={kunci === null ? MERAH : BIRU}>
          {kunci === null ? "Kunci: ?" : `Kunci: 1 simbol = ${kunci}`}
        </text>
      </g>
    </svg>
  );
}
