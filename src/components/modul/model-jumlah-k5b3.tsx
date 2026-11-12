"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B3 Sub-Bab B: batang berbagi bagian sama besar dengan dua    */
/* arsiran yang bertemu pada satu batang (arsiran pertama emas, kedua jingga). */
/* Tanpa gambar benda.                                                         */
/* ------------------------------------------------------------------------ */

/** Satu batang dengan `q` bagian sama besar. `p1` bagian pertama diarsir emas, lalu `p2` bagian kedua diarsir jingga. */
export function BatangDua({ q, p1, p2, nama }: { q: number; p1: number; p2: number; nama: string }) {
  return (
    <div className="space-y-1" role="img" aria-label={`${nama}: ${p1} bagian dan ${p2} bagian diarsir dari ${q} bagian`}>
      <p className="text-center text-xs font-black text-[#1C01A5]">{nama}</p>
      <div className="flex h-8 w-full overflow-hidden rounded-lg border-2 border-[#1C01A5]">
        {Array.from({ length: q }, (_, i) => {
          const warna = i < p1 ? "bg-[#FFE566]" : i < p1 + p2 ? "bg-[#FDBA74]" : "bg-white";
          return <span key={i} className={`h-full flex-1 ${i > 0 ? "border-l-2 border-[#1C01A5]/60" : ""} ${warna}`} />;
        })}
      </div>
    </div>
  );
}

/** Batang yang tiap bulatnya dibagi `q` bagian: `b` batang penuh dan satu batang berarsir `p` bagian. */
export function BatangBulat({ b, p, q }: { b: number; p: number; q: number }) {
  const batang = (isi: number, kunci: string) => (
    <div key={kunci} className="flex h-7 min-w-0 flex-1 overflow-hidden rounded-md border-2 border-[#1C01A5]">
      {Array.from({ length: q }, (_, i) => (
        <span key={i} className={`h-full flex-1 ${i > 0 ? "border-l border-[#1C01A5]/60" : ""} ${i < isi ? "bg-[#FFE566]" : "bg-white"}`} />
      ))}
    </div>
  );
  return (
    <div className="flex flex-wrap items-center gap-1.5" role="img" aria-label={`${b} batang penuh dan satu batang dengan ${p} dari ${q} bagian diarsir`}>
      {Array.from({ length: b }, (_, i) => batang(q, `b${i}`))}
      {batang(p, "p")}
    </div>
  );
}
