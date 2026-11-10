"use client";
import React from "react";
import { lima, lambang, type Lima } from "./data-k5b1";

const TINTA = "#1C01A5";
export const WARNA = {
  pr: { isi: "#FEF3C7", blok: "#F59E0B" },
  rb: { isi: "#EDE9FE", blok: "#A78BFA" },
  r: { isi: "#BBF7D0", blok: "#4ADE80" },
  p: { isi: "#BFDBFE", blok: "#60A5FA" },
  s: { isi: "#FECACA", blok: "#F87171" },
} as const;

/** Papan nilai tempat 5 kolom. */
export function PapanLima({ n, kecil = false }: { n: number; kecil?: boolean }) {
  const d = lima(n);
  const kol = [
    { nama: "PR", nilai: d.pr, warna: WARNA.pr.isi },
    { nama: "RB", nilai: d.rb, warna: WARNA.rb.isi },
    { nama: "R", nilai: d.r, warna: WARNA.r.isi },
    { nama: "P", nilai: d.p, warna: WARNA.p.isi },
    { nama: "S", nilai: d.s, warna: WARNA.s.isi },
  ];
  return (
    <div className={`flex flex-col items-center gap-1 ${kecil ? "scale-90" : ""}`}>
      <div className="flex gap-1">
        {kol.map((k) => (
          <div key={k.nama} className="flex w-10 flex-col items-center rounded-lg border-2 border-[#1C01A5]" style={{ background: k.warna }}>
            <span className="text-[9px] font-black text-[#1C01A5]">{k.nama}</span>
            <span className="text-lg font-black text-[#1C01A5]">{k.nilai}</span>
          </div>
        ))}
      </div>
      <span className="text-sm font-black text-[#1C01A5]">{lambang(n)}</span>
    </div>
  );
}

/** Blok place-value sederhana (kotak berlabel). */
export function ModelLima({ d, skala = 1 }: { d: Lima; skala?: number }) {
  const items = [
    { n: d.pr, label: "10rb", c: WARNA.pr.blok },
    { n: d.rb, label: "1rb", c: WARNA.rb.blok },
    { n: d.r, label: "100", c: WARNA.r.blok },
    { n: d.p, label: "10", c: WARNA.p.blok },
    { n: d.s, label: "1", c: WARNA.s.blok },
  ];
  return (
    <div className="flex flex-wrap items-end justify-center gap-1" style={{ transform: `scale(${skala})` }}>
      {items.map((it) =>
        it.n > 0 ? (
          <div key={it.label} className="flex flex-col items-center gap-0.5">
            {Array.from({ length: Math.min(it.n, 9) }, (_, i) => (
              <div
                key={i}
                className="flex h-6 w-8 items-center justify-center rounded border-2 border-[#1C01A5] text-[9px] font-black text-white"
                style={{ background: it.c, color: TINTA, backgroundColor: it.c }}
              >
                <span className="font-black text-[#1C01A5]">{it.label}</span>
              </div>
            ))}
            <span className="text-[9px] font-black text-[#1C01A5]">×{it.n}</span>
          </div>
        ) : null,
      )}
    </div>
  );
}

export function BandingMini({ a, b, tanda }: { a: number; b: number; tanda: string }) {
  return (
    <div className="flex items-center gap-2 font-black text-[#1C01A5]">
      <span className="text-lg">{lambang(a)}</span>
      <span className="rounded-full bg-amber-400 px-2 text-xl text-indigo-950">{tanda}</span>
      <span className="text-lg">{lambang(b)}</span>
    </div>
  );
}
