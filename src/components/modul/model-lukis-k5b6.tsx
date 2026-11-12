"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B6 Sub-Bab D: sudut yang dilukis langkah demi langkah di      */
/* atas busur derajat (kaki pertama ke kanan, skala dalam).                    */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const rad = (deg: number) => (deg * Math.PI) / 180;
const bulat = (n: number) => Math.round(n * 100) / 100;

/**
 * langkah 0: kertas kosong. 1: titik sudut dan kaki pertama. 2: busur terpasang. 3: tanda emas di angka tanda. 4: kaki kedua
 * digambar melalui tanda. Titik sudut di (60, 125); kaki pertama menghadap ke kanan; busur berjari-jari 100.
 */
export function GambarLukis({ langkah, tanda, nama }: { langkah: 0 | 1 | 2 | 3 | 4; tanda: number | null; nama: string }) {
  const vx = 60;
  const vy = 125;
  const ujung = (a: number, p: number) => ({ x: bulat(vx + p * Math.cos(rad(a))), y: bulat(vy - p * Math.sin(rad(a))) });
  const pos = (phi: number, p: number) => ({ x: bulat(p * Math.cos(rad(phi))), y: bulat(-p * Math.sin(rad(phi))) });
  const tik = Array.from({ length: 19 }, (_, n) => n * 10);
  const label = Array.from({ length: 7 }, (_, n) => n * 30);
  const m = tanda === null ? null : ujung(tanda, 100);
  const k2 = tanda === null ? null : ujung(tanda, 112);
  return (
    <svg viewBox="0 0 220 150" className="mx-auto h-auto w-full max-w-[340px]" role="img" aria-label={`Gambar lukisan ${nama}, langkah ${langkah} dari 4`}>
      {langkah >= 2 ? (
        <g transform={`translate(${vx} ${vy})`}>
          <path d="M -100 0 A 100 100 0 0 1 100 0 Z" fill="#FFFFFF" fillOpacity={0.75} stroke={EMAS} strokeWidth={3.5} />
          {tik.map((phi) => {
            const a = pos(phi, phi % 30 === 0 ? 88 : 93);
            const b = pos(phi, 100);
            return <line key={phi} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={BIRU} strokeWidth={phi % 30 === 0 ? 1.6 : 0.8} />;
          })}
          {label.map((phi) => {
            const p = pos(phi, 77);
            return (
              <text key={phi} x={p.x} y={p.y} fontSize={8} fontWeight={800} fill={BIRU} textAnchor="middle" dominantBaseline="middle">
                {phi}
              </text>
            );
          })}
        </g>
      ) : null}
      {langkah >= 1 ? <line x1={vx} y1={vy} x2={vx + 150} y2={vy} stroke={BIRU} strokeWidth={4} strokeLinecap="round" /> : null}
      {langkah >= 3 && m ? <circle cx={m.x} cy={m.y} r={4.5} fill={EMAS} stroke={BIRU} strokeWidth={2} /> : null}
      {langkah >= 4 && k2 ? <line x1={vx} y1={vy} x2={k2.x} y2={k2.y} stroke={EMAS} strokeWidth={4} strokeLinecap="round" /> : null}
      {langkah >= 1 ? <circle cx={vx} cy={vy} r={4.5} fill={BIRU} /> : null}
    </svg>
  );
}
