"use client";

import React from "react";
import type { BagianSudut } from "./lab-sudut-k5b6b";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B6 Sub-Bab B: sudut dengan bagian yang bisa disorot, dan     */
/* jam dengan dua jarum. Ukuran sudut hanya dipakai untuk menggambar, tidak     */
/* pernah ditulis di layar.                                                    */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MUDA = "#FFF3B0";
const rad = (deg: number) => (deg * Math.PI) / 180;
const bulat = (n: number) => Math.round(n * 100) / 100;

/**
 * Sudut dari satu titik dengan dua kaki. sorot menandai satu bagian dengan emas tebal. patokan menempelkan garis putus
 * tegak lurus dengan tanda siku kecil. deg di antara 0 dan 180.
 */
export function GambarSudut({ deg, sorot, patokan, nama }: { deg: number; sorot?: BagianSudut | null; patokan?: boolean; nama: string }) {
  const vx = 80;
  const vy = 125;
  const ujung = (d: number, p: number) => ({ x: bulat(vx + p * Math.cos(rad(d))), y: bulat(vy - p * Math.sin(rad(d))) });
  const a = ujung(deg, 95);
  const isi = ujung(deg, 55);
  const garis = (nilai: boolean) => (nilai ? EMAS : BIRU);
  return (
    <svg viewBox="0 0 220 150" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`Gambar ${nama}${sorot ? ", satu bagian disorot" : ""}${patokan ? ", patokan siku-siku menempel" : ""}`}>
      <path d={`M ${vx} ${vy} L ${vx + 55} ${vy} A 55 55 0 0 0 ${isi.x} ${isi.y} Z`} fill={sorot === "daerah" ? EMAS : MUDA} fillOpacity={sorot === "daerah" ? 0.7 : 1} stroke="none" />
      <line x1={vx} y1={vy} x2={vx + 130} y2={vy} stroke={garis(sorot === "kaki1")} strokeWidth={sorot === "kaki1" ? 9 : 5} strokeLinecap="round" />
      <line x1={vx} y1={vy} x2={a.x} y2={a.y} stroke={garis(sorot === "kaki2")} strokeWidth={sorot === "kaki2" ? 9 : 5} strokeLinecap="round" />
      {patokan ? (
        <g>
          <line x1={vx} y1={vy} x2={vx} y2={vy - 105} stroke={EMAS} strokeWidth={3} strokeDasharray="7 5" strokeLinecap="round" />
          <path d={`M ${vx} ${vy - 16} L ${vx + 16} ${vy - 16} L ${vx + 16} ${vy}`} fill="none" stroke={EMAS} strokeWidth={3} />
        </g>
      ) : null}
      <circle cx={vx} cy={vy} r={sorot === "titik" ? 11 : 5} fill={sorot === "titik" ? EMAS : BIRU} stroke={BIRU} strokeWidth={sorot === "titik" ? 3 : 0} />
    </svg>
  );
}

/** Jam dinding pukul bulat: jarum pendek menunjuk jam, jarum panjang menunjuk angka dua belas. */
export function GambarJam({ jam, nama }: { jam: number; nama: string }) {
  const cx = 110;
  const cy = 75;
  const titik = (a: number, p: number) => ({ x: bulat(cx + p * Math.sin(rad(a))), y: bulat(cy - p * Math.cos(rad(a))) });
  const hari = jam * 30;
  const pendek = titik(hari, 38);
  const panjang = titik(0, 56);
  // Daerah sudut terkecil di antara kedua jarum, searah jarum jam dari awal ke akhir.
  const awal = hari <= 180 ? 0 : hari;
  const akhir = hari <= 180 ? hari : 360;
  const p1 = titik(awal, 26);
  const p2 = titik(akhir, 26);
  return (
    <svg viewBox="0 0 220 150" className="mx-auto h-auto w-full max-w-[300px]" role="img" aria-label={`Gambar ${nama}`}>
      <circle cx={cx} cy={cy} r={68} fill="#FFFFFF" stroke={BIRU} strokeWidth={5} />
      {Array.from({ length: 12 }, (_, n) => {
        const luar = titik(n * 30, 62);
        const dalam = titik(n * 30, 55);
        return <line key={n} x1={luar.x} y1={luar.y} x2={dalam.x} y2={dalam.y} stroke={BIRU} strokeWidth={n === 0 ? 4 : 2} />;
      })}
      <path d={`M ${cx} ${cy} L ${p1.x} ${p1.y} A 26 26 0 0 1 ${p2.x} ${p2.y} Z`} fill={MUDA} stroke="none" />
      <line x1={cx} y1={cy} x2={panjang.x} y2={panjang.y} stroke={BIRU} strokeWidth={4} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={pendek.x} y2={pendek.y} stroke={EMAS} strokeWidth={6} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={5} fill={BIRU} />
    </svg>
  );
}
