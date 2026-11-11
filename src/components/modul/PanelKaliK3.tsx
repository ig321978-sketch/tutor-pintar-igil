"use client";

import React from "react";
import { KalimatBesar } from "./komponen-lab";
import { barisTambah, type StateKel } from "./lab-kelompok-k3b1";

/* Perwakilan mode Kali pada Lab Kelompok (K3B1 Sub-Bab F): kelompok titik, penjumlahan berulang, */
/* kalimat kali, garis loncat, dan tukar tempat. Hanya titik polos (bukan gambar benda).             */

const WARNA = ["#EF4444", "#3B82F6", "#16A34A", "#F0AB00", "#8B5CF6"];

/** k kotak, tiap kotak berisi n titik. */
export function KelompokTitik({ k, n, ukuran = 12, nama }: { k: number; n: number; ukuran?: number; nama: string }) {
  return (
    <div className="flex flex-wrap items-start justify-center gap-1.5" role="img" aria-label={nama}>
      {Array.from({ length: k }, (_, i) => (
        <div key={i} className="rounded-xl border-2 border-[#1C01A5]/40 bg-white p-1" style={{ maxWidth: 5 * (ukuran + 3) + 14 }}>
          <div className="flex flex-wrap gap-[3px]">
            {Array.from({ length: n }, (_, j) => (
              <span key={j} className="inline-block rounded-full" style={{ width: ukuran, height: ukuran, backgroundColor: WARNA[i % WARNA.length] }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Garis loncat: k loncatan, tiap loncatan sepanjang n, dari 0 sampai k x n. */
function GarisLoncat({ k, n }: { k: number; n: number }) {
  const p = k * n;
  const W = 340;
  const x = (v: number) => 14 + (v * (W - 28)) / p;
  return (
    <svg viewBox={`0 0 ${W} 86`} className="mx-auto block w-full max-w-md" role="img" aria-label={`Garis loncat: ${k} loncatan, tiap loncatan ${n}, sampai ${p}`}>
      <line x1={x(0)} y1="58" x2={x(p)} y2="58" stroke="#1C01A5" strokeWidth="3" strokeLinecap="round" />
      {Array.from({ length: k }, (_, i) => {
        const a = x(i * n);
        const b = x((i + 1) * n);
        const tengah = (a + b) / 2;
        return (
          <g key={i}>
            <path d={`M ${a} 54 Q ${tengah} ${14} ${b} 54`} fill="none" stroke={WARNA[i % WARNA.length]} strokeWidth="3" strokeLinecap="round" />
            <text x={tengah} y="22" textAnchor="middle" fontSize="11" fontWeight="900" fill={WARNA[i % WARNA.length]} stroke="#FFFFFF" strokeWidth="3" paintOrder="stroke">
              +{n}
            </text>
          </g>
        );
      })}
      {Array.from({ length: k + 1 }, (_, i) => i * n).map((v) => (
        <g key={v}>
          <circle cx={x(v)} cy="58" r="4.5" fill="#FFFFFF" stroke="#1C01A5" strokeWidth="2" />
          <text x={x(v)} y="78" textAnchor="middle" fontSize="11" fontWeight="900" fill="#1C01A5">
            {v}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function PanelKaliK3({ x }: { x: StateKel }) {
  const p = x.k * x.n;
  return (
    <div className="space-y-2">
      <KelompokTitik k={x.k} n={x.n} ukuran={x.k * x.n > 60 ? 8 : 12} nama={`${x.k} kelompok, tiap kelompok ${x.n} titik`} />
      <p className="text-center text-sm font-black text-[#1C01A5]">
        {x.k} kelompok, isi tiap kelompok {x.n}. Semuanya {p}.
      </p>
      {x.tampil.tambah ? <KalimatBesar teks={barisTambah(x.k, x.n)} /> : null}
      {x.tampil.kalimat ? (
        <div className="space-y-1">
          <KalimatBesar teks={`${x.k} × ${x.n} = ${p}`} warna="bg-[#E8F7EE]" />
          <p className="text-center text-xs font-bold text-[#1C01A5]/80">Banyak kelompok dikali isi tiap kelompok.</p>
        </div>
      ) : null}
      {x.tampil.garis ? <GarisLoncat k={x.k} n={x.n} /> : null}
      {x.tampil.tukar ? (
        <div className="space-y-1 rounded-2xl bg-[#F5F3FF] p-2">
          <KalimatBesar teks={`${x.n} × ${x.k} = ${p}`} warna="bg-[#E8F7EE]" />
          <KelompokTitik k={x.n} n={x.k} ukuran={8} nama={`${x.n} kelompok, tiap kelompok ${x.k} titik`} />
          <p className="text-center text-xs font-bold text-[#1C01A5]/80">
            {x.n} kelompok isi {x.k}. Susunannya berbeda, hasilnya tetap {p}.
          </p>
        </div>
      ) : null}
    </div>
  );
}
