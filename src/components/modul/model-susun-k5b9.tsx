"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B9 Sub-Bab C: tabel tempat enam kolom dengan isi berupa     */
/* angka, tanda tanya (kosong), atau nilai. Kolom yang ditandai bergaris emas. */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const KEPALA = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];

/** isi: teks tiap kolom (null berarti kosong). kecil: huruf lebih kecil untuk nilai panjang. */
export function TabelSusun({ isi, sorot = [], kecil = false, nama }: { isi: (string | number | null)[]; sorot?: number[]; kecil?: boolean; nama: string }) {
  return (
    <div className="mx-auto w-full max-w-md" role="img" aria-label={`Tabel susun ${nama}`}>
      <div className="grid grid-cols-6 gap-1">
        {KEPALA.map((nm) => (
          <div key={nm} className="rounded-md bg-[#1C01A5] px-0.5 py-1 text-center text-[10px] font-black leading-tight text-white">
            {nm}
          </div>
        ))}
        {isi.map((v, k) => {
          const aktif = sorot.includes(k);
          return (
            <div
              key={`${k}-${v}`}
              className={`flex min-h-12 items-center justify-center rounded-md px-0.5 text-center font-black ${kecil ? "text-[9px] tracking-tighter" : "text-2xl"}`}
              style={{ color: v === null ? "#9ca3af" : BIRU, border: `3px solid ${aktif ? EMAS : BIRU}`, background: aktif ? "#FFF6CC" : "#fff" }}
            >
              {v === null ? "?" : v}
            </div>
          );
        })}
      </div>
    </div>
  );
}
