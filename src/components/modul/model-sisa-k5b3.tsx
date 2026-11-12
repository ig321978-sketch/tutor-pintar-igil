"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B3 Sub-Bab C: satu batang berbagi bagian sama besar. Bagian   */
/* yang tersisa berwarna emas, bagian yang diambil berwarna jingga bergaris.    */
/* Tanpa gambar benda.                                                          */
/* ------------------------------------------------------------------------ */

/** Batang dengan `q` bagian. `p` bagian diarsir semula, `ambil` bagian di antaranya diambil (jingga), sisanya emas. */
export function BatangAmbil({ q, p, ambil, nama }: { q: number; p: number; ambil: number; nama: string }) {
  return (
    <div className="space-y-1" role="img" aria-label={`${nama}: ${p} dari ${q} bagian diarsir, ${ambil} bagian diambil`}>
      <p className="text-center text-xs font-black text-[#1C01A5]">{nama}</p>
      <div className="flex h-8 w-full overflow-hidden rounded-lg border-2 border-[#1C01A5]">
        {Array.from({ length: q }, (_, i) => {
          const sisa = i < p - ambil;
          const diambil = !sisa && i < p;
          return (
            <span
              key={i}
              className={`h-full flex-1 ${i > 0 ? "border-l-2 border-[#1C01A5]/60" : ""} ${sisa ? "bg-[#FFE566]" : diambil ? "bg-[repeating-linear-gradient(45deg,#FDBA74,#FDBA74_3px,#fff_3px,#fff_6px)]" : "bg-white"}`}
            />
          );
        })}
      </div>
    </div>
  );
}
