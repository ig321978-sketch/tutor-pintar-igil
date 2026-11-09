"use client";

import React from "react";
import { PenggarisSvg, xCm, U } from "./diagram-k3b3";
import { NAMA_BENDA, type JenisBenda } from "./data-k3b3";

/* ------------------------------------------------------------------------ */
/* Benda nyata Kelas 3 Bab 3 (tahap Concrete): benda sehari-hari yang diukur     */
/* dengan penggaris (pensil, krayon, penghapus, sendok, sikat gigi) dan pita      */
/* tersusun dari potongan meter, sepuluh sentimeter, dan sentimeter. Penggaris     */
/* berasal dari diagram-k3b3.tsx. Tahap Picture memakai batang polos di berkas    */
/* itu, tanpa gambar benda.                                                      */
/* ------------------------------------------------------------------------ */

const TINTA = "#1C01A5";

/** Satu benda sepanjang `panjang` sentimeter, ujung kirinya di `offset` sentimeter pada penggaris. */
export function BendaUkur({ jenis, panjang, offset = 0 }: { jenis: JenisBenda; panjang: number; offset?: number }) {
  const x = xCm(offset);
  const w = panjang * U;
  const sw = 2.2;
  if (jenis === "pensil") {
    return (
      <g>
        <polygon points={`${x},19 ${x + 18},8 ${x + 18},30`} fill="#F5D0A9" stroke={TINTA} strokeWidth={sw} strokeLinejoin="round" />
        <polygon points={`${x},19 ${x + 7},15.5 ${x + 7},22.5`} fill="#374151" stroke={TINTA} strokeWidth="1.2" strokeLinejoin="round" />
        <rect x={x + 18} y="8" width={Math.max(10, w - 18 - 16)} height="22" fill="#FBBF24" stroke={TINTA} strokeWidth={sw} />
        <rect x={x + w - 16} y="8" width="5" height="22" fill="#9CA3AF" stroke={TINTA} strokeWidth="1.6" />
        <rect x={x + w - 11} y="8" width="11" height="22" rx="5" fill="#F9A8D4" stroke={TINTA} strokeWidth={sw} />
      </g>
    );
  }
  if (jenis === "krayon") {
    return (
      <g>
        <polygon points={`${x},19 ${x + 12},9 ${x + 12},29`} fill="#EF4444" stroke={TINTA} strokeWidth={sw} strokeLinejoin="round" />
        <rect x={x + 12} y="9" width={Math.max(10, w - 12)} height="20" rx="4" fill="#EF4444" stroke={TINTA} strokeWidth={sw} />
        <rect x={x + 12 + Math.max(0, (w - 12) * 0.15)} y="9" width={Math.max(8, (w - 12) * 0.6)} height="20" fill="#FDE68A" stroke={TINTA} strokeWidth="1.6" />
      </g>
    );
  }
  if (jenis === "penghapus") {
    return (
      <g>
        <rect x={x} y="9" width={w} height="20" rx="5" fill="#BFDBFE" stroke={TINTA} strokeWidth={sw} />
        <rect x={x + w * 0.62} y="9" width={w * 0.38} height="20" rx="5" fill="#F9A8D4" stroke={TINTA} strokeWidth={sw} />
      </g>
    );
  }
  if (jenis === "sendok") {
    const mangkuk = Math.min(32, w * 0.34);
    return (
      <g>
        <rect x={x} y="15" width={w - mangkuk + 6} height="8" rx="4" fill="#D1D5DB" stroke={TINTA} strokeWidth={sw} />
        <ellipse cx={x + w - mangkuk / 2} cy="19" rx={mangkuk / 2} ry="11" fill="#E5E7EB" stroke={TINTA} strokeWidth={sw} />
      </g>
    );
  }
  const kepala = Math.min(34, w * 0.36);
  return (
    <g>
      <rect x={x} y="14" width={w - kepala + 4} height="10" rx="5" fill="#A78BFA" stroke={TINTA} strokeWidth={sw} />
      <rect x={x + w - kepala} y="9" width={kepala} height="20" rx="4" fill="#FFFFFF" stroke={TINTA} strokeWidth={sw} />
      {Array.from({ length: Math.floor(kepala / 6) }, (_, i) => (
        <line key={i} x1={x + w - kepala + 4 + i * 6} x2={x + w - kepala + 4 + i * 6} y1="10" y2="28" stroke="#3B82F6" strokeWidth="2.2" strokeLinecap="round" />
      ))}
    </g>
  );
}

/** Penggaris dengan satu benda nyata di atasnya. */
export function PenggarisBenda({ jenis, panjang, offset = 0, maks = 15, ringkas = false, mm = false }: { jenis: JenisBenda; panjang: number; offset?: number; maks?: number; ringkas?: boolean; mm?: boolean }) {
  return (
    <PenggarisSvg maks={maks} ringkas={ringkas} mm={mm} label={`${NAMA_BENDA[jenis]} sepanjang ${panjang} sentimeter pada penggaris, ujung kirinya di angka ${offset}`}>
      <BendaUkur jenis={jenis} panjang={panjang} offset={offset} />
    </PenggarisSvg>
  );
}

/**
 * Pita yang tersusun dari potongan: r potongan 1 meter (100 cm), p potongan 10 cm, dan s potongan 1 cm.
 * Potongan tidak digambar sesuai skala, hanya urutan dan jenisnya.
 */
export function PitaSusun({ r, p, s }: { r: number; p: number; s: number }) {
  return (
    <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-0.5 rounded-xl border-2 border-[#1C01A5]/30 bg-white px-1.5 py-1.5" role="img" aria-label={`Pita: ${r} meter, ${p} potong sepuluh sentimeter, dan ${s} sentimeter`}>
      {Array.from({ length: r }, (_, i) => (
        <span key={`r${i}`} className="inline-flex h-7 w-[3.4rem] items-center justify-center rounded-md border-2 border-[#1C01A5] bg-[#F87171] text-[11px] font-black text-white">
          1 m
        </span>
      ))}
      {Array.from({ length: p }, (_, i) => (
        <span key={`p${i}`} className="inline-flex h-7 w-[2.1rem] items-center justify-center rounded-md border-2 border-[#1C01A5] bg-[#60A5FA] text-[10px] font-black text-white">
          10
        </span>
      ))}
      {Array.from({ length: s }, (_, i) => (
        <span key={`s${i}`} className="inline-flex h-7 w-[0.9rem] items-center justify-center rounded-sm border-2 border-[#1C01A5] bg-[#FBBF24] text-[8px] font-black text-[#1C01A5]">
          1
        </span>
      ))}
    </span>
  );
}

/** Pita dari satu bilangan sentimeter, dibagi menjadi meter, sepuluh sentimeter, dan sentimeter. */
export function PitaDari({ cm }: { cm: number }) {
  return <PitaSusun r={Math.floor(cm / 100)} p={Math.floor((cm % 100) / 10)} s={cm % 10} />;
}
