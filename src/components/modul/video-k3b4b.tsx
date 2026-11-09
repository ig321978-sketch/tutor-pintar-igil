"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { Besar, BIRU, buatAdegan, DaftarVideoCerita, type VideoSiap } from "./video-k3b3-umum";
import { BukuIsi, GuntingIsi, PintuIsi } from "./dasar-k3b4b";
import { jalurBusur, jalurJuring, titikPolar } from "./diagram-k3b4b";
import { SUB_B34 } from "./naskah-k3b4";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 4 Sub-Bab B: Sudut pada Bidang Datar. Tiga video,     */
/* sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar. Naskah satu  */
/* sumber: naskah-k3b4.ts (SUB_B34.videos). Animasi SVG gratis di perangkat.      */
/* Tanpa API. Naskah: naskah/mtk-3-bab4-video-cerita.md                           */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_B34.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_B34.videos[v].adegan[a];
const MERAH = "#DC2626";
const bulat = (n: number) => Math.round(n * 100) / 100;

/** Sudut dengan dua kaki, juring lembut, dan busur penanda (tanda kotak untuk 90 derajat). Kaki OA ke kanan. */
function SudutAdegan({ cx, cy, deg, L = 70, r = 24, tanda = true, juring = true }: { cx: number; cy: number; deg: number; L?: number; r?: number; tanda?: boolean; juring?: boolean }) {
  const b = titikPolar(cx, cy, L, deg);
  return (
    <g>
      {juring ? <path d={jalurJuring(cx, cy, L - 8, deg)} fill="#FEF3C7" opacity="0.9" /> : null}
      <line x1={cx} y1={cy} x2={cx + L} y2={cy} stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={bulat(b.x)} y2={bulat(b.y)} stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
      {deg === 90 && tanda ? <polyline points={`${cx + 14},${cy} ${cx + 14},${cy - 14} ${cx},${cy - 14}`} fill="none" stroke={MERAH} strokeWidth="2.5" /> : <path d={jalurBusur(cx, cy, r, deg)} fill="none" stroke={MERAH} strokeWidth="3" strokeLinecap="round" />}
      <circle cx={cx} cy={cy} r="5" fill={MERAH} stroke={BIRU} strokeWidth="2" />
    </g>
  );
}

/** Sepasang strip karton dengan pengait, kaki kedua diputar `deg` derajat. */
function StripAdegan({ cx, cy, deg, panjang = 100 }: { cx: number; cy: number; deg: number; panjang?: number }) {
  return (
    <g>
      <rect x={cx} y={cy - 8} width={panjang} height="16" rx="3" fill="#D97706" stroke={BIRU} strokeWidth="2" />
      <g transform={`rotate(${-deg} ${cx} ${cy})`}>
        <rect x={cx} y={cy - 8} width={panjang} height="16" rx="3" fill="#6366F1" stroke={BIRU} strokeWidth="2" />
      </g>
      <circle cx={cx} cy={cy} r="7" fill="#FDE68A" stroke={BIRU} strokeWidth="2.5" />
    </g>
  );
}

function irisan(cx: number, cy: number, r: number, dari: number, sampai: number): string {
  const a = titikPolar(cx, cy, r, dari);
  const b = titikPolar(cx, cy, r, sampai);
  return `M ${cx} ${cy} L ${bulat(a.x)} ${bulat(a.y)} A ${r} ${r} 0 ${sampai - dari > 180 ? 1 : 0} 0 ${bulat(b.x)} ${bulat(b.y)} Z`;
}

/** Busur derajat sederhana: setengah lingkaran dengan garis tiap 10 derajat dan angka 0, 90, 180. */
function BusurAdegan({ cx, cy, R }: { cx: number; cy: number; R: number }) {
  return (
    <g>
      <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy} Z`} fill="#E0F2FE" stroke={BIRU} strokeWidth="2.5" />
      {Array.from({ length: 19 }, (_, i) => {
        const t = i * 10;
        const p = titikPolar(cx, cy, R, t);
        const q = titikPolar(cx, cy, R - (t % 30 === 0 ? 14 : 8), t);
        return <line key={t} x1={bulat(p.x)} y1={bulat(p.y)} x2={bulat(q.x)} y2={bulat(q.y)} stroke={BIRU} strokeWidth={t % 30 === 0 ? 2 : 1.2} />;
      })}
      <g fontSize="11" fontWeight="900" fill={BIRU} textAnchor="middle">
        <text x={cx + R - 22} y={cy - 6}>0</text>
        <text x={cx} y={cy - R + 28}>90</text>
        <text x={cx - R + 24} y={cy - 6}>180</text>
      </g>
    </g>
  );
}

/* ------------------------- Video 1, adegan 1: Sudut di sekitar kita ------------------------- */

function B1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      {k === 0 ? (
        <>
          <SudutAdegan cx={80} cy={150} deg={55} L={100} />
          <Label x={150} y={80} w={130} teks="bertemu di satu titik" ukuran={12} />
          <Label x={20} y={162} w={80} teks="titik" ukuran={13} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <g transform="translate(55 26) scale(1.05)">
            <BukuIsi deg={50} />
          </g>
          <Label x={90} y={172} w={120} teks="buku dibuka" ukuran={14} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <g transform="translate(55 26) scale(1.05)">
            <BukuIsi deg={130} />
          </g>
          <Label x={75} y={172} w={150} teks="sudut makin besar" ukuran={14} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <g transform="translate(6 56) scale(0.62)">
            <PintuIsi deg={60} />
          </g>
          <g transform="translate(158 46) scale(0.62)">
            <GuntingIsi deg={50} />
          </g>
          <Label x={40} y={140} w={80} teks="pintu" ukuran={13} />
          <Label x={186} y={150} w={80} teks="gunting" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Strip sudut ------------------------- */

function B1_2({ k }: PropsAdegan) {
  const deg = k === 2 ? 115 : k === 3 ? 20 : 40;
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <StripAdegan cx={90} cy={140} deg={deg} />
      {k === 0 ? (
        <>
          <Label x={190} y={60} w={100} teks="dua karton" ukuran={13} />
          <Label x={10} y={158} w={80} teks="pengait" ukuran={13} />
        </>
      ) : null}
      {k === 1 ? <Label x={60} y={166} w={180} teks="sepasang strip sudut" ukuran={14} /> : null}
      {k === 2 ? (
        <>
          <path d={jalurBusur(90, 140, 40, 115)} fill="none" stroke={MERAH} strokeWidth="3" strokeLinecap="round" />
          <Label x={190} y={70} w={100} teks="lebih besar" ukuran={14} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <path d={jalurBusur(90, 140, 40, 20)} fill="none" stroke={MERAH} strokeWidth="3" strokeLinecap="round" />
          <Label x={190} y={70} w={100} teks="lebih kecil" ukuran={14} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Sudut siku-siku ------------------------- */

function B1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      {k <= 1 ? (
        <>
          <rect x="80" y="56" width="140" height="112" rx="3" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="2.5" />
          <line x1="150" y1="56" x2="150" y2="168" stroke="#CA8A04" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="80" y1="112" x2="220" y2="112" stroke="#CA8A04" strokeWidth="2" strokeDasharray="6 4" />
          {k === 0 ? <Label x={90} y={172} w={120} teks="lipat dua kali" ukuran={13} /> : null}
          {k === 1 ? (
            <>
              <polyline points="80,138 106,138 106,168" fill="none" stroke={MERAH} strokeWidth="3" />
              <circle cx="80" cy="168" r="6" fill={MERAH} stroke={BIRU} strokeWidth="2" />
              <Label x={170} y={140} w={110} teks="pojok kertas" ukuran={13} />
            </>
          ) : null}
        </>
      ) : null}
      {k === 2 ? (
        <>
          <SudutAdegan cx={70} cy={150} deg={90} L={90} />
          <Besar x={205} y={108} teks="90°" ukuran={40} warna="#16A34A" />
          <Label x={160} y={160} w={130} teks="tepat 90 derajat" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <rect x="70" y="60" width="96" height="96" fill="none" stroke="#CA8A04" strokeWidth="2.5" strokeDasharray="6 4" />
          <polyline points="70,156 70,60" fill="none" stroke="#CA8A04" strokeWidth="2.5" />
          <SudutAdegan cx={70} cy={156} deg={45} L={100} juring={false} />
          <Label x={190} y={100} w={100} teks="lebih kecil" ukuran={14} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Satuan sudut tidak baku ------------------------- */

function B2_1({ k }: PropsAdegan) {
  const satuan = k === 2 ? 30 : 15;
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {k <= 1 ? <SudutAdegan cx={70} cy={150} deg={90} L={92} /> : null}
      {k >= 2 ? (
        <g>
          {Array.from({ length: 90 / satuan }, (_, i) => (
            <path key={i} d={irisan(70, 150, 88, i * satuan, (i + 1) * satuan)} fill={i % 2 === 0 ? "#FBBF24" : "#FCD34D"} stroke="#92400E" strokeWidth="2.2" strokeLinejoin="round" />
          ))}
          <line x1="70" y1="150" x2="162" y2="150" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
          <line x1="70" y1="150" x2="70" y2="58" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
          <circle cx="70" cy="150" r="5" fill={MERAH} stroke={BIRU} strokeWidth="2" />
        </g>
      ) : null}
      <g fontSize="14" fontWeight="900" fill={BIRU} textAnchor="middle">
        <text x="180" y="155">A</text>
        <text x="70" y="52">B</text>
        <text x="52" y="170">O</text>
      </g>
      {k === 1 ? (
        <>
          <Label x={100} y={166} w={130} teks="titik sudut O" ukuran={12} />
          <Label x={196} y={118} w={90} teks="kaki OA" ukuran={12} />
          <Label x={100} y={60} w={90} teks="kaki OB" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? <Label x={190} y={92} w={96} teks="3 satuan" ukuran={15} /> : null}
      {k === 3 ? <Label x={190} y={92} w={96} teks="6 satuan" ukuran={15} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Busur derajat ------------------------- */

function B2_2({ k }: PropsAdegan) {
  const cx = 150;
  const cy = 168;
  const R = 104;
  const b = titikPolar(cx, cy, R + 8, 50);
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      <BusurAdegan cx={cx} cy={cy} R={R} />
      {k >= 1 ? <circle cx={cx} cy={cy} r="8" fill="none" stroke={MERAH} strokeWidth="3" /> : null}
      {k >= 2 ? <line x1={cx} y1={cy} x2={cx + R + 8} y2={cy} stroke={BIRU} strokeWidth="4" strokeLinecap="round" /> : null}
      {k === 3 ? (
        <>
          <line x1={cx} y1={cy} x2={bulat(b.x)} y2={bulat(b.y)} stroke={MERAH} strokeWidth="4" strokeLinecap="round" />
          <Besar x={cx - 10} y={cy - 50} teks="50°" ukuran={30} warna="#16A34A" />
        </>
      ) : null}
      <g fontSize="14" fontWeight="900" fill={BIRU} textAnchor="middle">
        <text x={cx - 18} y={cy + 18}>O</text>
        {k >= 2 ? <text x={cx + R + 16} y={cy + 20}>A</text> : null}
        {k === 3 ? <text x={bulat(b.x + 8)} y={bulat(b.y - 6)}>B</text> : null}
      </g>
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Satu derajat ------------------------- */

function B2_3({ k }: PropsAdegan) {
  const cx = 150;
  const cy = 108;
  const r = 54;
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {k <= 1 ? (
        <>
          <circle cx={cx} cy={cy} r={r} fill="#FEF3C7" stroke={BIRU} strokeWidth="3" />
          {Array.from({ length: 36 }, (_, i) => {
            const p = titikPolar(cx, cy, r, i * 10);
            return <line key={i} x1={cx} y1={cy} x2={bulat(p.x)} y2={bulat(p.y)} stroke={BIRU} strokeWidth="1" opacity="0.55" />;
          })}
          {k === 1 ? <path d={irisan(cx, cy, r, 0, 10)} fill={MERAH} stroke={BIRU} strokeWidth="1.5" /> : null}
          {k === 0 ? <Label x={55} y={168} w={190} teks="360 bagian sama besar" ukuran={14} /> : null}
          {k === 1 ? <Label x={75} y={168} w={150} teks="satu bagian = 1°" ukuran={14} /> : null}
        </>
      ) : null}
      {k === 2 ? (
        <>
          <line x1="70" y1="110" x2="220" y2="110" stroke={MERAH} strokeWidth="8" strokeLinecap="round" opacity="0.6" />
          <line x1="70" y1="110" x2="220" y2="110" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
          <circle cx="70" cy="110" r="5.5" fill={MERAH} stroke={BIRU} strokeWidth="2" />
          <Besar x={150} y={156} teks="0°" ukuran={36} warna="#16A34A" />
          <Label x={170} y={70} w={110} teks="kaki berimpit" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          {[25, 50, 80].map((d, i) => (
            <path key={d} d={jalurBusur(60, 152, 24 + i * 16, d)} fill="none" stroke={i === 2 ? MERAH : "#F59E0B"} strokeWidth="3" strokeLinecap="round" />
          ))}
          {[25, 50, 80].map((d) => {
            const p = titikPolar(60, 152, 104, d);
            return <line key={d} x1="60" y1="152" x2={bulat(p.x)} y2={bulat(p.y)} stroke={BIRU} strokeWidth="3" strokeLinecap="round" />;
          })}
          <line x1="60" y1="152" x2="170" y2="152" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="152" r="5" fill={MERAH} stroke={BIRU} strokeWidth="2" />
          <Label x={196} y={100} w={92} teks="makin besar" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Siku-siku dan lancip ------------------------- */

function B3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k === 0 ? (
        <>
          <SudutAdegan cx={70} cy={150} deg={90} L={90} />
          <Besar x={205} y={108} teks="90°" ukuran={40} warna="#16A34A" />
          <Label x={160} y={160} w={120} teks="siku-siku" ukuran={14} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <SudutAdegan cx={70} cy={150} deg={45} L={110} />
          <Label x={180} y={80} w={100} teks="lancip" ukuran={14} />
          <Besar x={230} y={140} teks="< 90°" ukuran={22} warna="#B45309" />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <rect x="70" y="60" width="96" height="96" fill="none" stroke="#CA8A04" strokeWidth="2.5" strokeDasharray="6 4" />
          <polyline points="70,156 70,60" fill="none" stroke="#CA8A04" strokeWidth="2.5" />
          <SudutAdegan cx={70} cy={156} deg={45} L={100} juring={false} />
          <Label x={190} y={100} w={100} teks="lebih kecil" ukuran={14} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <SudutAdegan cx={90} cy={156} deg={90} L={100} />
          <Label x={160} y={110} w={120} teks="tanda kotak kecil" ukuran={12} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Tumpul dan lurus ------------------------- */

function B3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k === 0 ? (
        <>
          <SudutAdegan cx={150} cy={150} deg={130} L={95} r={26} />
          <Label x={196} y={112} w={90} teks="tumpul" ukuran={14} />
          <Besar x={240} y={92} teks="130°" ukuran={30} warna="#16A34A" />
        </>
      ) : null}
      {k === 1 || k === 3 ? (
        <>
          <SudutAdegan cx={150} cy={140} deg={180} L={100} r={30} />
          {k === 1 ? <Label x={110} y={158} w={80} teks="lurus" ukuran={14} /> : null}
          {k === 1 ? <Besar x={150} y={96} teks="180°" ukuran={30} warna="#16A34A" /> : null}
          {k === 3 ? <Label x={60} y={160} w={180} teks="kaki membentuk garis lurus" ukuran={12} /> : null}
        </>
      ) : null}
      {k === 2 ? (
        <>
          <line x1="50" y1="150" x2="250" y2="150" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
          <line x1="150" y1="150" x2="150" y2="60" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
          <polyline points="164,150 164,136 150,136" fill="none" stroke={MERAH} strokeWidth="2.5" />
          <polyline points="136,150 136,136 150,136" fill="none" stroke={MERAH} strokeWidth="2.5" />
          <circle cx="150" cy="150" r="5" fill={MERAH} stroke={BIRU} strokeWidth="2" />
          <Besar x={150} y={184} teks="90° + 90° = 180°" ukuran={17} warna="#16A34A" />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Sudut refleks ------------------------- */

function B3_3({ k }: PropsAdegan) {
  const cx = 110;
  const cy = 112;
  const L = 56;
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? (
        <>
          <SudutAdegan cx={cx} cy={cy} deg={300} L={L} r={30} />
          <Label x={190} y={70} w={100} teks="refleks" ukuran={14} />
          <Besar x={235} y={140} teks="300°" ukuran={32} warna="#16A34A" />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <SudutAdegan cx={cx} cy={cy} deg={60} L={L + 10} r={22} />
          <path d={`M ${bulat(titikPolar(cx, cy, 40, 60).x)} ${bulat(titikPolar(cx, cy, 40, 60).y)} A 40 40 0 1 0 ${bulat(titikPolar(cx, cy, 40, 0).x)} ${bulat(titikPolar(cx, cy, 40, 0).y)}`} fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
          <Label x={196} y={70} w={90} teks="lancip 60°" ukuran={13} />
          <Label x={196} y={130} w={90} teks="refleks 300°" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <Muncul>
          <Besar x={150} y={100} teks="60° + 300°" ukuran={30} warna="#B45309" />
          <Besar x={150} y={152} teks="= 360°" ukuran={36} warna="#16A34A" />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <Muncul>
          <Besar x={150} y={100} teks="360° − 300°" ukuran={30} warna="#B45309" />
          <Besar x={150} y={152} teks="= 60°" ukuran={36} warna="#16A34A" />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [B1_1, B1_2, B1_3],
  [B2_1, B2_2, B2_3],
  [B3_1, B3_2, B3_3],
];

export const ADEGAN_VIDEO_K3B4B = SUB_B34.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 2 },
  { a: 1, k: 3 },
  { a: 0, k: 1 },
];

export const VIDEO_SIAP_K3B4B: VideoSiap[] = SUB_B34.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B4B[i], poster: POSTER[i] }));

export function VideoK3B4B({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B4B} speakGuru={speakGuru} />;
}
