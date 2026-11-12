"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B2 Sub-Bab A: garis bilangan dengan lompatan berjarak sama, */
/* tabel seratus yang bisa diwarnai, dan titik polos dalam kelompok sama banyak. */
/* Tanpa gambar benda.                                                         */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#FFE566";
const LEBAR = 340;

/** Garis bilangan dari nol sampai sepuluh lompatan. Busur menghubungkan tiap pendaratan. */
export function GarisLompat({ jarak, k, maks }: { jarak: number; k: number; maks: number }) {
  const total = jarak * maks;
  const x = (v: number) => 14 + (v / total) * (LEBAR - 28);
  const titikTanda = Array.from({ length: maks + 1 }, (_, i) => i * jarak);
  const arah = Array.from({ length: k }, (_, i) => i + 1);
  return (
    <svg viewBox={`0 0 ${LEBAR} 84`} width="100%" role="img" aria-label={`Garis bilangan, jarak ${jarak}, ${k} pendaratan`} className="block">
      <line x1={x(0)} y1={56} x2={x(total)} y2={56} stroke={BIRU} strokeWidth={3} strokeLinecap="round" />
      {titikTanda.map((v) => (
        <line key={v} x1={x(v)} y1={51} x2={x(v)} y2={61} stroke={BIRU} strokeWidth={1.5} />
      ))}
      {arah.map((i) => {
        const a = x(jarak * (i - 1));
        const b = x(jarak * i);
        return <path key={i} d={`M ${a} 54 Q ${(a + b) / 2} 8 ${b} 54`} fill="none" stroke="#F0AB00" strokeWidth={2.5} />;
      })}
      <circle cx={x(0)} cy={56} r={5} fill="#fff" stroke={BIRU} strokeWidth={2} />
      <text x={x(0)} y={78} textAnchor="middle" fontSize={11} fontWeight={800} fill={BIRU}>
        0
      </text>
      {arah.map((i) => (
        <g key={i}>
          <circle cx={x(jarak * i)} cy={56} r={5.5} fill={EMAS} stroke={BIRU} strokeWidth={2} />
          <text x={x(jarak * i)} y={78} textAnchor="middle" fontSize={10} fontWeight={800} fill={BIRU}>
            {jarak * i}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Tabel seratus: bilangan 1 sampai 100, sepuluh per baris. Ketuk untuk mewarnai atau melepas warna. */
export function TabelSeratus({ warna, onKlik }: { warna: number[]; onKlik: (n: number) => void }) {
  return (
    <div className="grid grid-cols-10 gap-0.5" role="group" aria-label="Tabel seratus">
      {Array.from({ length: 100 }, (_, i) => i + 1).map((n) => {
        const on = warna.includes(n);
        return (
          <button
            key={n}
            type="button"
            aria-label={`Bilangan ${n}`}
            aria-pressed={on}
            onClick={() => onKlik(n)}
            className={`h-8 min-w-0 rounded-md border-2 px-0 text-[11px] font-black leading-none text-[#1C01A5] ${on ? "border-[#1C01A5] bg-[#FFE566]" : "border-[#1C01A5]/30 bg-white"}`}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

/** Titik polos dalam kelompok penuh (kotak biru) dan sisanya (kotak putus-putus). */
export function KelompokTitik({ q, d, r }: { q: number; d: number; r: number }) {
  const titik = (jumlah: number, warna: string) =>
    Array.from({ length: jumlah }, (_, i) => <span key={i} className="inline-block h-3 w-3 rounded-full border-2 border-[#1C01A5]" style={{ background: warna }} />);
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5" role="img" aria-label={`${q} kelompok berisi ${d} titik, sisa ${r} titik`}>
      {Array.from({ length: q }, (_, i) => (
        <span key={i} className="inline-flex gap-0.5 rounded-lg border-2 border-[#1C01A5] bg-[#EEF2FF] p-1">
          {titik(d, EMAS)}
        </span>
      ))}
      {r > 0 ? <span className="inline-flex gap-0.5 rounded-lg border-2 border-dashed border-[#F0AB00] bg-[#FFF8DC] p-1">{titik(r, "#FDBA74")}</span> : null}
    </div>
  );
}
