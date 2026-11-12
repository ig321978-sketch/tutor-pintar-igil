"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B3 Sub-Bab A: garis bilangan yang dibagi sama panjang,      */
/* batang pecahan polos (bagian sama besar), dan batang bulat untuk campuran.  */
/* Tanpa gambar benda.                                                         */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#FFE566";
const LEBAR = 340;

/** Garis bilangan dari nol sampai `maks` bulat, tiap bulat dibagi `q` bagian. Titik pilihan dan titik yang sudah tepat digambar. */
export function GarisPecahan({ q, maks, pos, tempat }: { q: number; maks: number; pos: number; tempat: { p: number; q: number }[] }) {
  const total = maks * q;
  const x = (n: number) => 16 + (n / total) * (LEBAR - 32);
  const tanda = Array.from({ length: total + 1 }, (_, i) => i);
  return (
    <svg viewBox={`0 0 ${LEBAR} 84`} width="100%" role="img" aria-label={`Garis bilangan dari nol sampai ${maks}, tiap bulat dibagi ${q} bagian`} className="block">
      <line x1={x(0)} y1={46} x2={x(total)} y2={46} stroke={BIRU} strokeWidth={3} strokeLinecap="round" />
      {tanda.map((n) => (
        <line key={n} x1={x(n)} y1={n % q === 0 ? 38 : 42} x2={x(n)} y2={n % q === 0 ? 54 : 50} stroke={BIRU} strokeWidth={n % q === 0 ? 2.5 : 1.5} />
      ))}
      {Array.from({ length: maks + 1 }, (_, i) => (
        <text key={i} x={x(i * q)} y={72} textAnchor="middle" fontSize={12} fontWeight={800} fill={BIRU}>
          {i}
        </text>
      ))}
      {tempat.map((t) => (
        <g key={`${t.p}-${t.q}`}>
          <circle cx={x((t.p / t.q) * q)} cy={46} r={6} fill="#86EFAC" stroke={BIRU} strokeWidth={2} />
          <text x={x((t.p / t.q) * q)} y={26} textAnchor="middle" fontSize={10} fontWeight={800} fill={BIRU}>
            {t.p}/{t.q}
          </text>
        </g>
      ))}
      {pos > 0 ? <circle cx={x(pos)} cy={46} r={7} fill={EMAS} stroke={BIRU} strokeWidth={2.5} /> : null}
    </svg>
  );
}

/** Batang pecahan: `q` bagian sama besar, `p` bagian diarsir. Dua batang dengan panjang sama dapat dibandingkan langsung. */
export function BatangPecahan({ p, q, nama }: { p: number; q: number; nama: string }) {
  return (
    <div className="space-y-1" role="img" aria-label={`${nama}: ${p} dari ${q} bagian diarsir`}>
      <p className="text-center text-xs font-black text-[#1C01A5]">{nama}</p>
      <div className="flex h-8 w-full overflow-hidden rounded-lg border-2 border-[#1C01A5]">
        {Array.from({ length: q }, (_, i) => (
          <span key={i} className={`h-full flex-1 ${i > 0 ? "border-l-2 border-[#1C01A5]/60" : ""} ${i < p ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
    </div>
  );
}

/** Campuran: `b` batang penuh dan satu batang berarsir `p` bagian, semuanya dibagi `q` bagian sama besar. */
export function BatangCampuran({ b, p, q }: { b: number; p: number; q: number }) {
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
