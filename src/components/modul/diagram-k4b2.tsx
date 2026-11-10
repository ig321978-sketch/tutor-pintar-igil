"use client";
import React from "react";
import type { Pec } from "./data-k4b2";
import { teksPec } from "./data-k4b2";

const ARSIR = "#F59E0B";
const KOSONG = "#FEF3C7";
const TEPI = "#1C01A5";

/** Lingkaran pecahan: q irisan, p diarsir. */
export function LingkaranPecahan({ pec, ukuran = 120, label = true }: { pec: Pec; ukuran?: number; label?: boolean }) {
  const { p, q } = pec;
  const r = 46;
  const cx = 50;
  const cy = 50;
  const iris = Array.from({ length: q }, (_, i) => {
    const a0 = (i / q) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((i + 1) / q) * Math.PI * 2 - Math.PI / 2;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const large = 2 * Math.PI / q > Math.PI ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`;
    return <path key={i} d={d} fill={i < p ? ARSIR : KOSONG} stroke={TEPI} strokeWidth="1.5" />;
  });
  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg viewBox="0 0 100 100" width={ukuran} height={ukuran} aria-label={teksPec(pec)}>{iris}</svg>
      {label ? <span className="text-sm font-black text-[#1C01A5]">{teksPec(pec)}</span> : null}
    </div>
  );
}

/** Batang pecahan horizontal. */
export function BatangPecahan({ pec, lebar = 160, tinggi = 36, label = true }: { pec: Pec; lebar?: number; tinggi?: number; label?: boolean }) {
  const { p, q } = pec;
  const w = lebar / q;
  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width={lebar} height={tinggi} viewBox={`0 0 ${lebar} ${tinggi}`} aria-label={teksPec(pec)}>
        {Array.from({ length: q }, (_, i) => (
          <rect key={i} x={i * w} y={2} width={w - 1.5} height={tinggi - 4} rx={4} fill={i < p ? ARSIR : KOSONG} stroke={TEPI} strokeWidth="1.5" />
        ))}
      </svg>
      {label ? <span className="text-sm font-black text-[#1C01A5]">{teksPec(pec)}</span> : null}
    </div>
  );
}

/** Kotak/grid pecahan (untuk senilai, mis. 4 dari 16). */
export function KotakPecahan({ pec, kolom, label = true }: { pec: Pec; kolom?: number; label?: boolean }) {
  const { p, q } = pec;
  const k = kolom ?? Math.ceil(Math.sqrt(q));
  const baris = Math.ceil(q / k);
  const cell = 18;
  const W = k * cell;
  const H = baris * cell;
  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-label={teksPec(pec)}>
        {Array.from({ length: q }, (_, i) => {
          const x = (i % k) * cell;
          const y = Math.floor(i / k) * cell;
          return <rect key={i} x={x + 1} y={y + 1} width={cell - 2} height={cell - 2} rx={3} fill={i < p ? ARSIR : KOSONG} stroke={TEPI} strokeWidth="1.2" />;
        })}
      </svg>
      {label ? <span className="text-sm font-black text-[#1C01A5]">{teksPec(pec)}</span> : null}
    </div>
  );
}

export function NotasiPecahan({ pec, besar = false }: { pec: Pec; besar?: boolean }) {
  return (
    <span className={`inline-flex flex-col items-center font-black text-[#1C01A5] ${besar ? "text-3xl" : "text-xl"}`} aria-label={teksPec(pec)}>
      <span className="leading-none">{pec.p}</span>
      <span className="my-0.5 h-0.5 w-full bg-[#1C01A5]" />
      <span className="leading-none">{pec.q}</span>
    </span>
  );
}

export function DuaPecahan({ a, b, mode = "lingkaran", op }: { a: Pec; b: Pec; mode?: "lingkaran" | "batang" | "kotak"; op?: string }) {
  const satu = (pec: Pec) =>
    mode === "batang" ? <BatangPecahan pec={pec} lebar={100} tinggi={28} /> : mode === "kotak" ? <KotakPecahan pec={pec} /> : <LingkaranPecahan pec={pec} ukuran={88} />;
  return (
    <div className="flex items-center justify-center gap-2">
      {satu(a)}
      {op ? <span className="text-2xl font-black text-[#1C01A5]">{op}</span> : null}
      {satu(b)}
    </div>
  );
}
