"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B2 Sub-Bab D: deretan kotak polos untuk kelompok (vas atau  */
/* paket). Kotak emas bila semua benda terbagi rata, kotak putus-putus bila  */
/* ada sisa. Tanpa gambar benda.                                              */
/* ------------------------------------------------------------------------ */

/** k kotak kelompok. rata: semua benda terbagi sama banyak, tanpa sisa. */
export function KotakKelompok({ k, rata, nama }: { k: number; rata: boolean; nama: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5" role="img" aria-label={`${k} ${nama}, ${rata ? "rata" : "belum rata"}`}>
      {Array.from({ length: k }, (_, i) => (
        <span
          key={i}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border-2 text-xs font-black text-[#1C01A5] ${rata ? "border-[#1C01A5] bg-[#FFE566]" : "border-dashed border-[#F0AB00] bg-[#FFF8DC]"}`}
        >
          {i + 1}
        </span>
      ))}
    </div>
  );
}
