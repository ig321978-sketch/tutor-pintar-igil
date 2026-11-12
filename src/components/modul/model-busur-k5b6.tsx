"use client";

import React from "react";
import type { Sisi } from "./lab-busur-k5b6c";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B6 Sub-Bab C: busur derajat di atas sudut, dan sudut dengan   */
/* ukuran sampai 360 derajat.                                                 */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MUDA = "#FFF3B0";
const rad = (deg: number) => (deg * Math.PI) / 180;
const bulat = (n: number) => Math.round(n * 100) / 100;

/**
 * Sudut dengan titik sudut di (130, 125). Kaki pertama menghadap ke sisi (kanan: arah 0 derajat, kiri: arah 180 derajat), kaki kedua
 * dibuka deg derajat darinya ke arah atas. Busur derajat dipasang di atasnya: geser (langkah, ke kanan positif) dan putar (derajat,
 * berlawanan arah jarum jam positif). Bila skala ditampilkan, angka skala luar (nol di kiri) dan skala dalam (nol di kanan) tertulis tiap 30.
 */
export function GambarBusur({ deg, sisi, geser, putar, skala, nama }: { deg: number; sisi: Sisi; geser: number; putar: number; skala: boolean; nama: string }) {
  const vx = 130;
  const vy = 125;
  const sejajar = geser === 0 && putar === 0;
  const arah1 = sisi === "kanan" ? 0 : 180;
  const arah2 = sisi === "kanan" ? deg : 180 - deg;
  const ujung = (a: number, p: number) => ({ x: bulat(vx + p * Math.cos(rad(a))), y: bulat(vy - p * Math.sin(rad(a))) });
  const k1 = ujung(arah1, 118);
  const k2 = ujung(arah2, 118);
  const tanda = ujung(arah2, 100);
  const pos = (phi: number, p: number) => ({ x: bulat(p * Math.cos(rad(phi))), y: bulat(-p * Math.sin(rad(phi))) });
  const tik = Array.from({ length: 19 }, (_, n) => n * 10);
  const label = Array.from({ length: 7 }, (_, n) => n * 30);
  return (
    <svg viewBox="0 0 260 150" className="mx-auto h-auto w-full max-w-[340px]" role="img" aria-label={`Gambar busur derajat di atas ${nama}${sejajar ? ", terpasang dengan benar" : ", belum terpasang dengan benar"}`}>
      <g transform={`translate(${vx + geser * 14} ${vy}) rotate(${-putar})`}>
        <path d="M -100 0 A 100 100 0 0 1 100 0 Z" fill="#FFFFFF" fillOpacity={0.75} stroke={sejajar ? EMAS : BIRU} strokeWidth={sejajar ? 4 : 2.5} />
        {tik.map((phi) => {
          const a = pos(phi, phi % 30 === 0 ? 86 : 92);
          const b = pos(phi, 100);
          return <line key={phi} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={BIRU} strokeWidth={phi % 30 === 0 ? 2 : 1} />;
        })}
        {skala
          ? label.map((phi) => {
              const dalam = pos(phi, 74);
              const luar = pos(phi, 111);
              return (
                <g key={phi} fontSize={9} fontWeight={800} fill={BIRU} textAnchor="middle" dominantBaseline="middle">
                  <text x={dalam.x} y={dalam.y}>{phi}</text>
                  <text x={luar.x} y={luar.y}>{180 - phi}</text>
                </g>
              );
            })
          : null}
        <circle cx={0} cy={0} r={4} fill={sejajar ? EMAS : BIRU} stroke={BIRU} strokeWidth={1.5} />
      </g>
      <line x1={vx} y1={vy} x2={k1.x} y2={k1.y} stroke={BIRU} strokeWidth={4} strokeLinecap="round" />
      <line x1={vx} y1={vy} x2={k2.x} y2={k2.y} stroke={EMAS} strokeWidth={4} strokeLinecap="round" />
      {skala ? <circle cx={tanda.x} cy={tanda.y} r={5} fill={EMAS} stroke={BIRU} strokeWidth={2} /> : null}
      <circle cx={vx} cy={vy} r={3} fill={BIRU} />
    </svg>
  );
}

/** Sudut berukuran 0 sampai 360 derajat: kaki pertama ke kanan, kaki kedua searah berlawanan jarum jam, daerahnya diwarnai. */
export function GambarUkuran({ deg, nama }: { deg: number; nama: string }) {
  const vx = 110;
  const vy = 90;
  const ujung = (a: number, p: number) => ({ x: bulat(vx + p * Math.cos(rad(a))), y: bulat(vy - p * Math.sin(rad(a))) });
  const k2 = ujung(deg, 80);
  const akhir = ujung(deg === 360 ? 359.9 : deg, 38);
  return (
    <svg viewBox="0 0 220 180" className="mx-auto h-auto w-full max-w-[280px]" role="img" aria-label={`Gambar ${nama}`}>
      {deg > 0 ? <path d={`M ${vx} ${vy} L ${vx + 38} ${vy} A 38 38 0 ${deg > 180 ? 1 : 0} 0 ${akhir.x} ${akhir.y} Z`} fill={MUDA} stroke={EMAS} strokeWidth={2} /> : null}
      <line x1={vx} y1={vy} x2={vx + 80} y2={vy} stroke={BIRU} strokeWidth={5} strokeLinecap="round" />
      <line x1={vx} y1={vy} x2={k2.x} y2={k2.y} stroke={BIRU} strokeWidth={5} strokeLinecap="round" strokeDasharray={deg === 0 || deg === 360 ? "2 9" : undefined} />
      <circle cx={vx} cy={vy} r={5} fill={BIRU} />
    </svg>
  );
}
