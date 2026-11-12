"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B1 Sub-Bab B: garis bilangan sepuluh ruas yang bisa         */
/* diketuk, dengan penanda huruf polos dan bilangan acuan. Tanpa gambar benda. */
/* ------------------------------------------------------------------------ */

export const WARNA_PENANDA_K5B1 = ["#FCA5A5", "#93C5FD", "#86EFAC", "#FDE68A"];
export const HURUF_PENANDA_K5B1 = ["A", "B", "C", "D"];

const titik = (n: number): string => (n >= 1000 ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));

/** Garis bilangan: tiap ruas tombol; penanda huruf bilangan yang sudah diletakkan tampil di ruasnya. */
export function GarisRuas({
  dari,
  langkah,
  ruas,
  acuan,
  letak,
  onRuas,
}: {
  dari: number;
  langkah: number;
  ruas: number;
  acuan: number;
  letak: (number | null)[];
  onRuas: (r: number) => void;
}) {
  const ujung = dari + ruas * langkah;
  const posAcuan = ((acuan - dari) / (ujung - dari)) * 100;
  return (
    <div className="space-y-1">
      <div className="flex h-16 items-stretch overflow-hidden rounded-xl border-4 border-[#1C01A5] bg-white" role="group" aria-label="Ruas garis bilangan">
        {Array.from({ length: ruas }, (_, r) => {
          const lo = dari + r * langkah;
          const isi = letak.map((v, j) => (v === r ? j : -1)).filter((j) => j >= 0);
          return (
            <button
              key={r}
              type="button"
              aria-label={`Ruas ${titik(lo)} sampai ${titik(lo + langkah)}`}
              onClick={() => onRuas(r)}
              className="flex min-w-0 flex-1 flex-col items-center justify-end gap-0.5 border-r border-dashed border-[#1C01A5]/30 pb-1 last:border-r-0"
              style={{ background: lo >= acuan ? "#FFF8DC" : "#EEF2FF" }}
            >
              {isi.map((j) => (
                <span key={j} className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#1C01A5] text-[10px] font-black text-[#1C01A5]" style={{ background: WARNA_PENANDA_K5B1[j] }}>
                  {HURUF_PENANDA_K5B1[j]}
                </span>
              ))}
            </button>
          );
        })}
      </div>
      <div className="relative h-5 text-[10px] font-black text-[#1C01A5]">
        <span className="absolute left-0">{titik(dari)}</span>
        <span className="absolute -translate-x-1/2 rounded bg-[#FFE566] px-1" style={{ left: `${posAcuan}%` }}>
          acuan {titik(acuan)}
        </span>
        <span className="absolute right-0">{titik(ujung)}</span>
      </div>
    </div>
  );
}
