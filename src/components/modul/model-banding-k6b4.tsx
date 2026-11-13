"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K6B4 Sub-Bab B: wadah dengan hasil menguntungkan bergaris      */
/* tebal, dua batang peluang pada total yang sama, dan deretan hasil permainan */
/* berwarna menurut pemain yang menang. Bilangan bulat. Gambar dibatasi lebar. */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const WARNA: Record<string, string> = {
  merah: "#DC2626",
  biru: "#3B82F6",
  kuning: "#FACC15",
  hijau: "#22C55E",
  putih: "#FFFFFF",
  gambar: "#FDE68A",
  angka: "#E5E7EB",
};
const SEL = 28;

function Benda({ isi, tebal }: { isi: string; tebal: boolean }) {
  const garis = tebal ? 3 : 1;
  if (/^\d+$/.test(isi)) {
    return (
      <g>
        <rect x={2} y={2} width={SEL - 4} height={SEL - 4} rx={3} fill="#fff" stroke={BIRU} strokeWidth={garis} />
        <text x={SEL / 2} y={SEL / 2 + 4} textAnchor="middle" fontSize={12} fontWeight={900} fill={BIRU}>
          {isi}
        </text>
      </g>
    );
  }
  const huruf = isi === "gambar" ? "G" : isi === "angka" ? "A" : "";
  return (
    <g>
      <circle cx={SEL / 2} cy={SEL / 2} r={SEL / 2 - 3} fill={WARNA[isi] ?? "#fff"} stroke={BIRU} strokeWidth={garis} />
      {huruf ? (
        <text x={SEL / 2} y={SEL / 2 + 4} textAnchor="middle" fontSize={11} fontWeight={900} fill={BIRU}>
          {huruf}
        </text>
      ) : null}
    </g>
  );
}

/** Wadah berisi hasil, satu gambar untuk tiap hasil. Hasil yang menguntungkan bergaris tebal, yang lain agak pudar. */
export function WadahCocok({ isi, cocok, label }: { isi: readonly string[]; cocok: readonly string[]; label: string }) {
  const lebar = Math.min(isi.length, 10);
  const baris = Math.ceil(isi.length / 10);
  return (
    <svg viewBox={`0 0 ${lebar * SEL} ${baris * SEL}`} className="mx-auto h-auto w-full" style={{ maxWidth: `${lebar * 32}px` }} role="img" aria-label={label}>
      {isi.map((v, i) => (
        <g key={i} transform={`translate(${(i % 10) * SEL}, ${Math.floor(i / 10) * SEL})`} opacity={cocok.includes(v) ? 1 : 0.55}>
          <Benda isi={v} tebal={cocok.includes(v)} />
        </g>
      ))}
    </svg>
  );
}

/** Deretan hasil permainan: sel berwarna biru muda bila pemain A menang, emas bila pemain B menang. */
export function HasilPemain({ isi, a, b, label }: { isi: readonly string[]; a: readonly string[]; b: readonly string[]; label: string }) {
  const lebar = Math.min(isi.length, 10);
  const baris = Math.ceil(isi.length / 10);
  return (
    <svg viewBox={`0 0 ${lebar * SEL} ${baris * SEL}`} className="mx-auto h-auto w-full" style={{ maxWidth: `${lebar * 36}px` }} role="img" aria-label={label}>
      {isi.map((v, i) => {
        const pemilik = a.includes(v) ? "#BFDBFE" : b.includes(v) ? "#FDE68A" : "#FFFFFF";
        const angka = /^\d+$/.test(v);
        return (
          <g key={i} transform={`translate(${(i % 10) * SEL}, ${Math.floor(i / 10) * SEL})`}>
            <rect x={2} y={2} width={SEL - 4} height={SEL - 4} rx={5} fill={pemilik} stroke={BIRU} strokeWidth={1.5} />
            {angka ? (
              <text x={SEL / 2} y={SEL / 2 + 4} textAnchor="middle" fontSize={12} fontWeight={900} fill={BIRU}>
                {v}
              </text>
            ) : (
              <circle cx={SEL / 2} cy={SEL / 2} r={6} fill={WARNA[v] ?? "#fff"} stroke={BIRU} strokeWidth={1} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export type BarisBatang = { nama: string; teks: string; isi: number; total: number };

/** Batang peluang: panjang isi dibanding total yang sama untuk semua baris. */
export function BatangBanding({ baris, label }: { baris: readonly BarisBatang[]; label: string }) {
  return (
    <div className="mx-auto w-full max-w-[420px] space-y-2" role="img" aria-label={label}>
      {baris.map((r) => (
        <div key={r.nama} className="space-y-1">
          <p className="text-xs font-black text-[#1C01A5]">
            {r.nama}: {r.teks}
          </p>
          <div className="h-5 w-full overflow-hidden rounded-md border-2 border-[#1C01A5] bg-white">
            <div className="h-full bg-[#FFC800]" style={{ width: `${(r.isi * 100) / r.total}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
