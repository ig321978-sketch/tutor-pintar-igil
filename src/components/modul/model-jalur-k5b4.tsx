"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B4 Sub-Bab A: bangun polos untuk ditelusuri sisinya, tanah   */
/* berpetak untuk dipasangi ruas pagar, dan kisi petak untuk isi. Tanpa gambar  */
/* benda: hanya garis dan petak polos.                                          */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MUDA = "#FFF3B0";
const LEBAR = 340;

/** Persegi atau persegi panjang dengan sisi p, l, p, l. Sisi yang sudah dilewati ditebalkan, anak panah di sudut sekarang. */
export function BangunJalan({ sisi, langkah, selesai }: { sisi: number[]; langkah: number; selesai: boolean }) {
  const w = sisi[0];
  const h = sisi[1];
  const satu = Math.min(230 / w, 110 / h);
  const pw = w * satu;
  const ph = h * satu;
  const x0 = (LEBAR - pw) / 2;
  const y0 = 28;
  const sudut = [
    [x0, y0],
    [x0 + pw, y0],
    [x0 + pw, y0 + ph],
    [x0, y0 + ph],
  ];
  const sekarang = selesai ? 0 : langkah % 4;
  const label = [
    [x0 + pw / 2, y0 - 8],
    [x0 + pw + 12, y0 + ph / 2 + 4],
    [x0 + pw / 2, y0 + ph + 16],
    [x0 - 12, y0 + ph / 2 + 4],
  ];
  return (
    <svg viewBox={`0 0 ${LEBAR} ${ph + 60}`} width="100%" role="img" aria-label={`Bangun dengan sisi ${sisi.join(", ")}. ${langkah} sisi sudah dilewati.`} className="block">
      <rect x={x0} y={y0} width={pw} height={ph} fill={selesai ? MUDA : "#FFFFFF"} />
      {sisi.map((s, k) => {
        const [ax, ay] = sudut[k];
        const [bx, by] = sudut[(k + 1) % 4];
        const lewat = k < langkah;
        return <line key={k} x1={ax} y1={ay} x2={bx} y2={by} stroke={lewat ? EMAS : BIRU} strokeWidth={lewat ? 7 : 3} strokeLinecap="round" strokeDasharray={lewat ? undefined : "6 5"} />;
      })}
      {sisi.map((s, k) => (
        <text key={`t${k}`} x={label[k][0]} y={label[k][1]} textAnchor="middle" fontSize={13} fontWeight={800} fill={BIRU}>
          {s}
        </text>
      ))}
      <circle cx={sudut[0][0]} cy={sudut[0][1]} r={5} fill={BIRU} />
      <text x={sudut[0][0] - 6} y={sudut[0][1] - 8} textAnchor="end" fontSize={10} fontWeight={800} fill={BIRU}>
        awal
      </text>
      <circle cx={sudut[sekarang][0]} cy={sudut[sekarang][1]} r={9} fill="#FFE566" stroke={BIRU} strokeWidth={3} />
    </svg>
  );
}

/** Tanah w petak panjang dan h petak lebar. Ruas pagar dipasang searah jarum jam: atas dari kiri, kanan dari atas, bawah dari kanan, kiri dari bawah. */
export function KisiTanah({ w, h, ruas }: { w: number; h: number; ruas: number[] }) {
  const satu = Math.min(240 / w, 130 / h);
  const pw = w * satu;
  const ph = h * satu;
  const x0 = (LEBAR - pw) / 2;
  const y0 = 16;
  const garis: React.ReactNode[] = [];
  for (let i = 0; i < w; i += 1) {
    garis.push(<line key={`a${i}`} x1={x0 + i * satu} y1={y0} x2={x0 + (i + 1) * satu} y2={y0} stroke={i < ruas[0] ? EMAS : BIRU} strokeWidth={i < ruas[0] ? 7 : 2} strokeLinecap="round" strokeOpacity={i < ruas[0] ? 1 : 0.5} />);
    garis.push(<line key={`b${i}`} x1={x0 + pw - i * satu} y1={y0 + ph} x2={x0 + pw - (i + 1) * satu} y2={y0 + ph} stroke={i < ruas[2] ? EMAS : BIRU} strokeWidth={i < ruas[2] ? 7 : 2} strokeLinecap="round" strokeOpacity={i < ruas[2] ? 1 : 0.5} />);
  }
  for (let j = 0; j < h; j += 1) {
    garis.push(<line key={`c${j}`} x1={x0 + pw} y1={y0 + j * satu} x2={x0 + pw} y2={y0 + (j + 1) * satu} stroke={j < ruas[1] ? EMAS : BIRU} strokeWidth={j < ruas[1] ? 7 : 2} strokeLinecap="round" strokeOpacity={j < ruas[1] ? 1 : 0.5} />);
    garis.push(<line key={`d${j}`} x1={x0} y1={y0 + ph - j * satu} x2={x0} y2={y0 + ph - (j + 1) * satu} stroke={j < ruas[3] ? EMAS : BIRU} strokeWidth={j < ruas[3] ? 7 : 2} strokeLinecap="round" strokeOpacity={j < ruas[3] ? 1 : 0.5} />);
  }
  const dalam: React.ReactNode[] = [];
  for (let i = 1; i < w; i += 1) dalam.push(<line key={`v${i}`} x1={x0 + i * satu} y1={y0} x2={x0 + i * satu} y2={y0 + ph} stroke={BIRU} strokeOpacity={0.18} strokeWidth={1} />);
  for (let j = 1; j < h; j += 1) dalam.push(<line key={`h${j}`} x1={x0} y1={y0 + j * satu} x2={x0 + pw} y2={y0 + j * satu} stroke={BIRU} strokeOpacity={0.18} strokeWidth={1} />);
  return (
    <svg viewBox={`0 0 ${LEBAR} ${ph + 32}`} width="100%" role="img" aria-label={`Tanah ${w} petak panjang dan ${h} petak lebar, ${ruas.reduce((a, b) => a + b, 0)} ruas pagar terpasang`} className="block">
      <rect x={x0} y={y0} width={pw} height={ph} fill="#E8F7EE" />
      {dalam}
      {garis}
    </svg>
  );
}

/** Kisi petak: jalur tepi (garis tebal) dan isi (petak), untuk dibedakan. */
export function KisiBanding({ w, h }: { w: number; h: number }) {
  const satu = Math.min(240 / w, 120 / h);
  const pw = w * satu;
  const ph = h * satu;
  const x0 = (LEBAR - pw) / 2;
  const y0 = 12;
  const petak: React.ReactNode[] = [];
  for (let j = 0; j < h; j += 1) {
    for (let i = 0; i < w; i += 1) petak.push(<rect key={`${i}-${j}`} x={x0 + i * satu} y={y0 + j * satu} width={satu} height={satu} fill={MUDA} stroke={BIRU} strokeOpacity={0.35} strokeWidth={1} />);
  }
  return (
    <svg viewBox={`0 0 ${LEBAR} ${ph + 24}`} width="100%" role="img" aria-label={`Bangun ${w} petak panjang dan ${h} petak lebar`} className="block">
      {petak}
      <rect x={x0} y={y0} width={pw} height={ph} fill="none" stroke={BIRU} strokeWidth={4} />
    </svg>
  );
}
