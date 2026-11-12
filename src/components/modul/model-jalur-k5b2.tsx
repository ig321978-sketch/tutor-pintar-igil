"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B2 Sub-Bab B: dua garis bilangan sejajar untuk dua pelompat, */
/* dan deretan kartu angka polos untuk daftar kelipatan. Tanpa gambar benda.   */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#FFE566";
const LEBAR = 340;

/** Dua garis bilangan sejajar. Titik di jalur atas dan bawah; garis emas menghubungkan bilangan yang didarati keduanya. */
export function JalurGanda({ a, b, daftarA, daftarB, maks }: { a: number; b: number; daftarA: number[]; daftarB: number[]; maks: number }) {
  const x = (v: number) => 14 + (v / maks) * (LEBAR - 28);
  const sama = daftarA.filter((v) => daftarB.includes(v));
  return (
    <svg viewBox={`0 0 ${LEBAR} 96`} width="100%" role="img" aria-label={`Dua jalur, jarak ${a} dan jarak ${b}`} className="block">
      <line x1={x(0)} y1={24} x2={x(maks)} y2={24} stroke={BIRU} strokeWidth={3} strokeLinecap="round" />
      <line x1={x(0)} y1={72} x2={x(maks)} y2={72} stroke={BIRU} strokeWidth={3} strokeLinecap="round" />
      {sama.map((v) => (
        <line key={v} x1={x(v)} y1={24} x2={x(v)} y2={72} stroke="#F0AB00" strokeWidth={4} strokeDasharray="4 3" />
      ))}
      <circle cx={x(0)} cy={24} r={5} fill="#fff" stroke={BIRU} strokeWidth={2} />
      <circle cx={x(0)} cy={72} r={5} fill="#fff" stroke={BIRU} strokeWidth={2} />
      <text x={x(0)} y={10} textAnchor="middle" fontSize={10} fontWeight={800} fill={BIRU}>
        0
      </text>
      {daftarA.map((v) => (
        <g key={`a${v}`}>
          <circle cx={x(v)} cy={24} r={5.5} fill={sama.includes(v) ? "#F0AB00" : EMAS} stroke={BIRU} strokeWidth={2} />
          <text x={x(v)} y={10} textAnchor="middle" fontSize={10} fontWeight={800} fill={BIRU}>
            {v}
          </text>
        </g>
      ))}
      {daftarB.map((v) => (
        <g key={`b${v}`}>
          <circle cx={x(v)} cy={72} r={5.5} fill={sama.includes(v) ? "#F0AB00" : "#C4B5FD"} stroke={BIRU} strokeWidth={2} />
          <text x={x(v)} y={92} textAnchor="middle" fontSize={10} fontWeight={800} fill={BIRU}>
            {v}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Satu kartu angka polos. Dipakai untuk daftar pendaratan dan daftar kelipatan. */
export function KartuAngka({ n, tandai, onKlik, label, warna = EMAS }: { n: number; tandai: boolean; onKlik?: () => void; label?: string; warna?: string }) {
  const kelas = `min-w-9 rounded-lg border-2 px-1.5 py-1 text-sm font-black text-[#1C01A5] ${tandai ? "border-[#1C01A5] ring-4 ring-[#F0AB00]" : "border-[#1C01A5]/50"}`;
  if (!onKlik)
    return (
      <span className={kelas} style={{ background: warna }}>
        {n}
      </span>
    );
  return (
    <button type="button" aria-label={label ?? `Bilangan ${n}`} aria-pressed={tandai} onClick={onKlik} className={kelas} style={{ background: tandai ? EMAS : "#fff" }}>
      {n}
    </button>
  );
}
