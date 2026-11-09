"use client";

import React from "react";
import { PenggarisSvg, xCm } from "./diagram-k3b3";
import type { GarisBerhuruf } from "./data-k3b4";

/* ------------------------------------------------------------------------ */
/* Diagram Kelas 3 Bab 4 (Unsur-Unsur Bangun Datar), tahap Picture dan Abstract:   */
/* sinar garis, garis, ruas garis, kurva, ruas garis pada penggaris bermilimeter,  */
/* dan bangun datar polos bernomor huruf. Hanya garis, titik, dan huruf. TIDAK ada */
/* gambar benda dan tidak ada emoji. Benda nyata ada di tahap Concrete.            */
/* ------------------------------------------------------------------------ */

const TINTA = "#1C01A5";
const MERAH = "#DC2626";

const Titik = ({ x, y, huruf, atas = true }: { x: number; y: number; huruf: string; atas?: boolean }) => (
  <g>
    <circle cx={x} cy={y} r="5" fill={MERAH} stroke={TINTA} strokeWidth="2" />
    <text x={x} y={atas ? y - 10 : y + 20} textAnchor="middle" fontSize="15" fontWeight="900" fill={TINTA}>
      {huruf}
    </text>
  </g>
);

/** Tiga bentuk kurva berbeda dari (30, 46) sampai (190, 46). */
const KURVA = ["M30 46 Q110 -14 190 46", "M30 46 C80 6 140 86 190 46", "M30 46 Q110 92 190 46"];

/** Sinar garis, garis, ruas garis, atau kurva dengan dua titik berhuruf. */
export function JenisGarisSvg({ g, ringkas = false }: { g: GarisBerhuruf; ringkas?: boolean }) {
  const nama = g.jenis === "sinar" ? "Sinar garis" : g.jenis === "garis" ? "Garis" : g.jenis === "ruas" ? "Ruas garis" : "Kurva";
  return (
    <svg viewBox="0 0 220 76" className={`mx-auto block h-auto w-full ${ringkas ? "max-w-[150px]" : "max-w-[260px]"}`} role="img" aria-label={`${nama} dengan titik ${g.a} dan ${g.b}`}>
      {g.jenis === "ruas" ? (
        <>
          <line x1="30" y1="40" x2="190" y2="40" stroke={TINTA} strokeWidth="4" strokeLinecap="round" />
          <Titik x={30} y={40} huruf={g.a} />
          <Titik x={190} y={40} huruf={g.b} />
        </>
      ) : null}
      {g.jenis === "sinar" ? (
        <>
          <line x1="30" y1="40" x2="200" y2="40" stroke={TINTA} strokeWidth="4" strokeLinecap="round" />
          <polygon points="214,40 198,31 198,49" fill={TINTA} />
          <Titik x={30} y={40} huruf={g.a} />
          <Titik x={130} y={40} huruf={g.b} />
        </>
      ) : null}
      {g.jenis === "garis" ? (
        <>
          <line x1="16" y1="40" x2="204" y2="40" stroke={TINTA} strokeWidth="4" strokeLinecap="round" />
          <polygon points="6,40 22,31 22,49" fill={TINTA} />
          <polygon points="214,40 198,31 198,49" fill={TINTA} />
          <Titik x={72} y={40} huruf={g.a} />
          <Titik x={148} y={40} huruf={g.b} />
        </>
      ) : null}
      {g.jenis === "kurva" ? (
        <>
          <path d={KURVA[g.v ?? 0]} fill="none" stroke={TINTA} strokeWidth="4" strokeLinecap="round" />
          <Titik x={30} y={46} huruf={g.a} atas={(g.v ?? 0) !== 2} />
          <Titik x={190} y={46} huruf={g.b} atas={(g.v ?? 0) !== 2} />
        </>
      ) : null}
    </svg>
  );
}

/** Ruas garis dari angka 0 sepanjang `mm` milimeter di atas penggaris bermilimeter (titik A di 0, titik B di ujung). */
export function RuasPenggaris({ mm, maks = 15, ringkas = false, huruf = ["A", "B"] }: { mm: number; maks?: number; ringkas?: boolean; huruf?: [string, string] | string[] }) {
  const x1 = xCm(0);
  const x2 = xCm(mm / 10);
  return (
    <PenggarisSvg maks={maks} ringkas={ringkas} mm label={`Ruas garis ${huruf[0]}${huruf[1]} dari angka 0 pada penggaris bermilimeter`}>
      <line x1={x1} y1="22" x2={x2} y2="22" stroke={TINTA} strokeWidth="4" strokeLinecap="round" />
      <circle cx={x1} cy="22" r="4.5" fill={MERAH} stroke={TINTA} strokeWidth="1.8" />
      <circle cx={x2} cy="22" r="4.5" fill={MERAH} stroke={TINTA} strokeWidth="1.8" />
      <text x={x1} y="11" textAnchor="middle" fontSize="12" fontWeight="900" fill={TINTA}>
        {huruf[0]}
      </text>
      <text x={x2} y="11" textAnchor="middle" fontSize="12" fontWeight="900" fill={TINTA}>
        {huruf[1]}
      </text>
    </PenggarisSvg>
  );
}

const WARNA_BANGUN = ["#FECACA", "#FDE68A", "#BBF7D0", "#BFDBFE", "#DDD6FE", "#FBCFE8"];

/** Bangun datar beraturan bersisi `n` (3 sampai 8). Titik sudut boleh diberi huruf. */
export function BangunSvg({ n, huruf, ringkas = false }: { n: number; huruf?: string[]; ringkas?: boolean }) {
  const r = 38;
  const awal = n === 4 ? Math.PI / 4 : -Math.PI / 2;
  const titik = Array.from({ length: n }, (_, i) => {
    const a = awal + (i * 2 * Math.PI) / n;
    return { x: 60 + r * Math.cos(a), y: 54 + r * Math.sin(a) };
  });
  return (
    <svg viewBox="0 0 120 108" className={`mx-auto block h-auto w-full ${ringkas ? "max-w-[110px]" : "max-w-[160px]"}`} role="img" aria-label={`Bangun datar dengan ${n} sisi`}>
      <polygon points={titik.map((p) => `${p.x},${p.y}`).join(" ")} fill={WARNA_BANGUN[n % WARNA_BANGUN.length]} stroke={TINTA} strokeWidth="3.4" strokeLinejoin="round" />
      {huruf
        ? titik.map((p, i) => (
            <text key={i} x={60 + (p.x - 60) * 1.32} y={54 + (p.y - 54) * 1.32 + 5} textAnchor="middle" fontSize="14" fontWeight="900" fill={TINTA}>
              {huruf[i]}
            </text>
          ))
        : null}
    </svg>
  );
}
