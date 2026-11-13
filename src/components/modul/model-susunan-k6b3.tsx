"use client";

import React from "react";
import { ejaK6B3 } from "./eja-k6b3";

/* ------------------------------------------------------------------------ */
/* Model gambar K6B3 Sub-Bab A: tumpukan kubus isometrik (tiap kubus digambar */
/* satu per satu, kubus tertutup tetap dihitung lewat kisi per lantai), kisi  */
/* lantai, dan pilihan tiga jawaban yang dibaca suara guru. Bilangan bulat.   */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const WARNA_LANTAI = [
  { atas: "#FFE566", kiri: "#F0AB00", kanan: "#C98A00" },
  { atas: "#DDD6FE", kiri: "#8B7CF6", kanan: "#6D5BD0" },
  { atas: "#BFDBFE", kiri: "#60A5FA", kanan: "#3B82F6" },
  { atas: "#BBF7D0", kiri: "#4ADE80", kanan: "#22C55E" },
];

const OPSI_TOMBOL = "min-h-12 min-w-16 rounded-xl border-4 border-[#1C01A5] bg-white px-3 py-1 text-center text-lg font-black text-[#1C01A5]";

/** Satu baris pertanyaan dengan tiga pilihan. */
export function PilihTiga({ judul, awalan, opsi, onPilih }: { judul: string; awalan: string; opsi: readonly (string | number)[]; onPilih: (o: number) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-center text-sm font-black text-[#1C01A5]">{judul}</p>
      <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label={judul}>
        {opsi.map((v, o) => (
          <button key={String(v)} type="button" aria-label={`${awalan} ${ejaK6B3(String(v))}`} onClick={() => onPilih(o)} className={OPSI_TOMBOL}>
            {String(v)}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Ukuran gambar: separuh lebar 14, kedalaman 8, tinggi 16 per kubus. */
const LEBAR = 14;
const DALAM = 8;
const TINGGI = 16;

type Kubus = readonly [number, number, number];

/** Tumpukan kubus isometrik. `melayang` menandai kubus yang digambar dengan garis putus merah. */
export function Tumpukan({ kubus, label, melayang = [] }: { kubus: readonly Kubus[]; label: string; melayang?: readonly Kubus[] }) {
  const maxX = Math.max(0, ...kubus.map((k) => k[0]));
  const maxY = Math.max(0, ...kubus.map((k) => k[1]));
  const maxZ = Math.max(0, ...kubus.map((k) => k[2]));
  const kiri = -(maxY * LEBAR) - LEBAR - 2;
  const lebar = (maxX + maxY) * LEBAR + 2 * LEBAR + 4;
  const atas = -(maxZ * TINGGI) - 2;
  const tinggi = (maxX + maxY) * DALAM + 2 * TINGGI + maxZ * TINGGI + 6;
  const urut = [...kubus].sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
  const apungSet = new Set(melayang.map((k) => k.join(",")));
  return (
    <svg viewBox={`${kiri} ${atas} ${lebar} ${tinggi}`} className="mx-auto h-auto w-full max-w-[240px]" role="img" aria-label={label}>
      {urut.map((k) => {
        const sx = (k[0] - k[1]) * LEBAR;
        const sy = (k[0] + k[1]) * DALAM - k[2] * TINGGI;
        const w = WARNA_LANTAI[k[2] % WARNA_LANTAI.length];
        const apung = apungSet.has(k.join(","));
        const garis = apung ? "#DC2626" : BIRU;
        const putus = apung ? "3 2" : undefined;
        return (
          <g key={k.join(",")} stroke={garis} strokeWidth={1.2} strokeDasharray={putus} strokeLinejoin="round">
            <polygon points={`${sx},${sy} ${sx + LEBAR},${sy + DALAM} ${sx},${sy + 2 * DALAM} ${sx - LEBAR},${sy + DALAM}`} fill={w.atas} />
            <polygon points={`${sx - LEBAR},${sy + DALAM} ${sx},${sy + 2 * DALAM} ${sx},${sy + 2 * DALAM + TINGGI} ${sx - LEBAR},${sy + DALAM + TINGGI}`} fill={w.kiri} />
            <polygon points={`${sx},${sy + 2 * DALAM} ${sx + LEBAR},${sy + DALAM} ${sx + LEBAR},${sy + DALAM + TINGGI} ${sx},${sy + 2 * DALAM + TINGGI}`} fill={w.kanan} />
          </g>
        );
      })}
    </svg>
  );
}

/** Kisi satu lantai: petak berisi kubus berwarna, petak kosong putih. `merah` menandai petak yang melayang. */
export function KisiLantai({ nama, lantai, ke, p, l, merah = [] }: { nama: string; lantai: readonly (readonly [number, number])[]; ke: number; p: number; l: number; merah?: readonly (readonly [number, number])[] }) {
  const w = WARNA_LANTAI[ke % WARNA_LANTAI.length];
  const isi = (c: number, r: number) => lantai.some((q) => q[0] === c && q[1] === r);
  const apung = (c: number, r: number) => merah.some((q) => q[0] === c && q[1] === r);
  const SEL = 18;
  return (
    <figure className="m-0 text-center" role="img" aria-label={`${nama}: ${lantai.length} kubus`}>
      <svg viewBox={`0 0 ${p * SEL + 2} ${l * SEL + 2}`} className="mx-auto h-auto w-full" style={{ maxWidth: `${p * 34 + 4}px` }} aria-hidden="true">
        {Array.from({ length: l }, (_, r) =>
          Array.from({ length: p }, (_, c) => (
            <rect
              key={`${c},${r}`}
              x={1 + c * SEL}
              y={1 + r * SEL}
              width={SEL}
              height={SEL}
              fill={isi(c, r) ? w.atas : "#fff"}
              stroke={apung(c, r) ? "#DC2626" : BIRU}
              strokeWidth={apung(c, r) ? 2 : 1}
              strokeDasharray={apung(c, r) ? "3 2" : undefined}
            />
          )),
        )}
      </svg>
      <figcaption className="text-xs font-black text-[#1C01A5]">
        {nama}: {lantai.length}
      </figcaption>
    </figure>
  );
}
