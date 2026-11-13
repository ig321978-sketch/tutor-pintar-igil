"use client";

import React from "react";
import { ejaK6B3 } from "./eja-k6b3";

/* ------------------------------ Model gambar K6B3 Sub-Bab C ------------------------------ */
/* Kisi berpetak: huruf A sampai F menurun di sisi kiri, angka 1 sampai 6 mendatar di sisi    */
/* atas, titik berhuruf, dan jalur lurus dari awal ke tujuan. Bilangan bulat.                 */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const UNGU = "#8B7CF6";
const HURUF = "ABCDEF";
const SEL = 30;
const TEPI = 22;

const OPSI_TOMBOL = "min-h-12 min-w-16 rounded-xl border-4 border-[#1C01A5] bg-white px-3 py-1 text-center text-lg font-black text-[#1C01A5]";

/** Satu baris pertanyaan dengan tiga pilihan. */
export function PilihTiga({ judul, awalan, opsi, onPilih }: { judul: string; awalan: string; opsi: readonly (string | number)[]; onPilih: (o: number) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-center text-sm font-black text-[#1C01A5]">{judul}</p>
      <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label={judul}>
        {opsi.map((v, o) => (
          <button key={String(v)} type="button" aria-label={`${awalan} ${ejaK6B3(String(v))}`} onClick={() => onPilih(o)} className={`${OPSI_TOMBOL} ${String(v).length > 16 ? "text-sm" : ""}`}>
            {String(v)}
          </button>
        ))}
      </div>
    </div>
  );
}

export type TitikGambar = { t: string; nama: string; warna: "emas" | "ungu" };

const baris = (t: string): number => HURUF.indexOf(t[0]);
const kolom = (t: string): number => Number(t.slice(1)) - 1;
const pusatX = (t: string): number => TEPI + kolom(t) * SEL + SEL / 2;
const pusatY = (t: string): number => TEPI + baris(t) * SEL + SEL / 2;

/** Kisi 6 kali 6 dengan titik dan jalur lurus (mendatar dulu, lalu menurun atau menaik). */
export function KisiPetak({ titik, jalur, label }: { titik: readonly TitikGambar[]; jalur?: { dari: string; ke: string }; label: string }) {
  const lebar = TEPI + 6 * SEL + 2;
  const tinggi = TEPI + 6 * SEL + 2;
  const sudut = jalur ? `${pusatX(jalur.dari)},${pusatY(jalur.dari)} ${pusatX(jalur.ke)},${pusatY(jalur.dari)} ${pusatX(jalur.ke)},${pusatY(jalur.ke)}` : null;
  return (
    <svg viewBox={`0 0 ${lebar} ${tinggi}`} className="mx-auto h-auto w-full max-w-[260px]" role="img" aria-label={label}>
      {Array.from({ length: 6 }, (_, c) => (
        <text key={`k${c}`} x={TEPI + c * SEL + SEL / 2} y={TEPI - 7} textAnchor="middle" fontSize="13" fontWeight="800" fill={BIRU}>
          {c + 1}
        </text>
      ))}
      {Array.from({ length: 6 }, (_, r) => (
        <text key={`b${r}`} x={TEPI / 2} y={TEPI + r * SEL + SEL / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill={BIRU}>
          {HURUF[r]}
        </text>
      ))}
      {Array.from({ length: 6 }, (_, r) =>
        Array.from({ length: 6 }, (_, c) => <rect key={`${r},${c}`} x={TEPI + c * SEL} y={TEPI + r * SEL} width={SEL} height={SEL} fill="#fff" stroke={BIRU} strokeWidth={1} />),
      )}
      {sudut ? <polyline points={sudut} fill="none" stroke="#DC2626" strokeWidth={3} strokeLinejoin="round" strokeDasharray="5 3" /> : null}
      {titik.map((p) => (
        <g key={`${p.t}-${p.nama}`}>
          <circle cx={pusatX(p.t)} cy={pusatY(p.t)} r={11} fill={p.warna === "emas" ? EMAS : UNGU} stroke={BIRU} strokeWidth={2} />
          <text x={pusatX(p.t)} y={pusatY(p.t) + 4} textAnchor="middle" fontSize="10" fontWeight="800" fill={BIRU}>
            {p.nama}
          </text>
        </g>
      ))}
    </svg>
  );
}
