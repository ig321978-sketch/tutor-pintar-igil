"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { Besar, BIRU, buatAdegan, DaftarVideoCerita, type VideoSiap } from "./video-k3b3-umum";
import { SUB_C34 } from "./naskah-k3b4";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 4 Sub-Bab C: Garis Tegak Lurus, Garis Sejajar, dan      */
/* Bangun Datar Sederhana. Tiga video, sembilan adegan. Diputar satu per satu saat  */
/* siswa mengetuk Putar. Naskah satu sumber: naskah-k3b4.ts (SUB_C34.videos).       */
/* Animasi SVG gratis di perangkat. Tanpa API. Naskah: naskah/mtk-3-bab4-video-cerita.md */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_C34.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_C34.videos[v].adegan[a];
const MERAH = "#DC2626";
const KUNING = "#FACC15";
const BIRU_GARIS = "#2563EB";

/** Garis tebal dengan tepi gelap supaya garis putih terlihat di atas langit. */
const Garis = ({ x1, y1, x2, y2, warna, tebal = 5, putus = false }: { x1: number; y1: number; x2: number; y2: number; warna: string; tebal?: number; putus?: boolean }) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={BIRU} strokeWidth={tebal + 3} strokeLinecap="round" strokeDasharray={putus ? "7 6" : undefined} />
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={warna} strokeWidth={tebal} strokeLinecap="round" strokeDasharray={putus ? "7 6" : undefined} />
  </g>
);

/** Kisi petak dengan pojok kiri atas di (x, y), n petak lebar dan tinggi, tiap petak selebar s. */
function Kisi({ x, y, nx, ny, s }: { x: number; y: number; nx: number; ny: number; s: number }) {
  return (
    <g>
      <rect x={x} y={y} width={nx * s} height={ny * s} fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
      {Array.from({ length: nx + 1 }, (_, i) => (
        <line key={`v${i}`} x1={x + i * s} y1={y} x2={x + i * s} y2={y + ny * s} stroke="#CBD5E1" strokeWidth="1" />
      ))}
      {Array.from({ length: ny + 1 }, (_, i) => (
        <line key={`h${i}`} x1={x} y1={y + i * s} x2={x + nx * s} y2={y + i * s} stroke="#CBD5E1" strokeWidth="1" />
      ))}
    </g>
  );
}

const Titik = ({ x, y, h, atas = false, kanan = false }: { x: number; y: number; h: string; atas?: boolean; kanan?: boolean }) => (
  <g>
    <circle cx={x} cy={y} r="5" fill={MERAH} stroke={BIRU} strokeWidth="2" />
    <text x={kanan ? x + 14 : x - 14} y={atas ? y - 8 : y + 18} textAnchor="middle" fontSize="14" fontWeight="900" fill={BIRU}>
      {h}
    </text>
  </g>
);

/* ------------------------- Video 1, adegan 1: Garis yang bertemu ------------------------- */

function C1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <Garis x1={40} y1={90} x2={130} y2={160} warna={KUNING} />
      <Garis x1={40} y1={160} x2={130} y2={90} warna={BIRU_GARIS} />
      <Garis x1={170} y1={100} x2={270} y2={100} warna="#FFFFFF" />
      <Garis x1={170} y1={140} x2={270} y2={140} warna="#FFFFFF" />
      {k === 1 ? (
        <>
          <circle cx={85} cy={125} r="9" fill="none" stroke={MERAH} strokeWidth="3" />
          <Label x={14} y={168} w={146} teks="bertemu di satu titik" ukuran={11} />
        </>
      ) : null}
      {k === 2 ? <Label x={170} y={156} w={110} teks="tidak bertemu" ukuran={13} /> : null}
      {k === 3 ? <Besar x={150} y={186} teks="⊥ dan //" ukuran={30} warna="#B45309" /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Tegak lurus ------------------------- */

function C1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <Garis x1={110} y1={150} x2={110} y2={68} warna={KUNING} />
      <Garis x1={110} y1={150} x2={210} y2={150} warna={BIRU_GARIS} />
      <polyline points="110,128 132,128 132,150" fill="none" stroke={MERAH} strokeWidth="3" />
      <Titik x={110} y={68} h="A" atas />
      <Titik x={110} y={150} h="B" />
      <Titik x={210} y={150} h="C" kanan />
      {k === 1 ? <Label x={160} y={92} w={110} teks="tegak lurus" ukuran={13} /> : null}
      {k === 2 ? <Besar x={220} y={100} teks="AB ⊥ BC" ukuran={26} warna="#16A34A" /> : null}
      {k === 3 ? <Label x={170} y={104} w={100} teks="sudut 90°" ukuran={13} /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Kertas lipat ------------------------- */

function C1_3({ k }: PropsAdegan) {
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
              <polyline points="80,142 106,142 106,168" fill="none" stroke={MERAH} strokeWidth="3" />
              <circle cx="80" cy="168" r="6" fill={MERAH} stroke={BIRU} strokeWidth="2" />
              <Label x={160} y={140} w={120} teks="pojok kertas lipat" ukuran={12} />
            </>
          ) : null}
        </>
      ) : (
        <>
          <Garis x1={110} y1={150} x2={110} y2={78} warna={KUNING} />
          <Garis x1={110} y1={150} x2={200} y2={150} warna={BIRU_GARIS} />
          <polyline points="110,114 146,114 146,150" fill="none" stroke="#CA8A04" strokeWidth="3" strokeDasharray="5 4" />
          <polyline points="110,114 110,150" fill="none" stroke="#CA8A04" strokeWidth="3" />
          {k === 2 ? <Label x={170} y={90} w={110} teks="pojok di sini" ukuran={13} /> : null}
          {k === 3 ? (
            <Muncul>
              <Besar x={210} y={110} teks="✓ pas" ukuran={34} warna="#16A34A" />
              <Label x={170} y={124} w={110} teks="tegak lurus" ukuran={13} />
            </Muncul>
          ) : null}
        </>
      )}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Jarak yang sama ------------------------- */

function C2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <Kisi x={60} y={56} nx={8} ny={5} s={22} />
      <Garis x1={82} y1={78} x2={214} y2={78} warna="#FFFFFF" tebal={4} />
      <Garis x1={82} y1={122} x2={214} y2={122} warna="#FFFFFF" tebal={4} />
      {k >= 1 ? (
        <>
          <line x1="70" y1="78" x2="70" y2="122" stroke={MERAH} strokeWidth="3" strokeDasharray="4 3" />
          <Label x={2} y={92} w={58} teks="2 petak" ukuran={10} />
        </>
      ) : null}
      {k >= 2 ? (
        <>
          <line x1="226" y1="78" x2="226" y2="122" stroke={MERAH} strokeWidth="3" strokeDasharray="4 3" />
          <Label x={232} y={92} w={58} teks="2 petak" ukuran={10} />
        </>
      ) : null}
      {k === 3 ? <Besar x={150} y={186} teks="2 = 2: sejajar" ukuran={22} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Tanda dan lambang ------------------------- */

function C2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      <Garis x1={50} y1={86} x2={240} y2={86} warna={KUNING} />
      <Garis x1={50} y1={136} x2={240} y2={136} warna={BIRU_GARIS} />
      {k >= 0 ? (
        <>
          <polygon points="256,86 238,78 238,94" fill={BIRU} />
          <polygon points="256,136 238,128 238,144" fill={BIRU} />
        </>
      ) : null}
      <Titik x={50} y={86} h="A" atas />
      <Titik x={240} y={86} h="B" atas kanan />
      <Titik x={50} y={136} h="C" />
      <Titik x={240} y={136} h="D" kanan />
      {k === 0 ? <Label x={90} y={102} w={130} teks="anak panah: sejajar" ukuran={11} /> : null}
      {k === 1 ? <Label x={90} y={102} w={130} teks="AB sejajar CD" ukuran={13} /> : null}
      {k === 2 ? <Besar x={150} y={120} teks="AB // CD" ukuran={28} warna="#16A34A" /> : null}
      {k === 3 ? <Label x={70} y={166} w={170} teks="tidak pernah bertemu" ukuran={13} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Bukan sejajar ------------------------- */

function C2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <Kisi x={50} y={50} nx={10} ny={7} s={20} />
      <Garis x1={70} y1={70} x2={230} y2={70} warna={KUNING} tebal={4} />
      <Garis x1={70} y1={110} x2={230} y2={150} warna={BIRU_GARIS} tebal={4} />
      {k >= 0 ? (
        <>
          <line x1="64" y1="70" x2="64" y2="110" stroke={MERAH} strokeWidth="3" strokeDasharray="4 3" />
          <Label x={2} y={80} w={56} teks="2 petak" ukuran={10} />
        </>
      ) : null}
      {k >= 1 ? (
        <>
          <line x1="236" y1="70" x2="236" y2="150" stroke={MERAH} strokeWidth="3" strokeDasharray="4 3" />
          <Label x={240} y={100} w={56} teks="4 petak" ukuran={10} />
        </>
      ) : null}
      {k === 2 ? <Besar x={150} y={184} teks="2 ≠ 4" ukuran={26} warna={MERAH} /> : null}
      {k === 3 ? <Label x={30} y={170} w={240} teks="bertemu bila diperpanjang" ukuran={13} /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Segitiga ------------------------- */

function C3_1({ k }: PropsAdegan) {
  const a: [number, number] = [150, 56];
  const b: [number, number] = [80, 160];
  const c: [number, number] = [220, 160];
  const warna = ["#DC2626", "#2563EB", "#16A34A"];
  const sisi: [[number, number], [number, number]][] = [
    [a, b],
    [b, c],
    [c, a],
  ];
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      <polygon points={[a, b, c].map((p) => p.join(",")).join(" ")} fill="#FEF3C7" opacity={k >= 1 ? 0.8 : 0} />
      {sisi.map(([p, q], i) => (
        <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={k >= 1 ? warna[i] : "#B45309"} strokeWidth={k === 0 ? 9 : 6} strokeLinecap="round" />
      ))}
      {k >= 2 ? (
        <g fontSize="15" fontWeight="900" fill={BIRU} textAnchor="middle">
          <text x={a[0]} y={a[1] - 8}>A</text>
          <text x={b[0] - 12} y={b[1] + 6}>B</text>
          <text x={c[0] + 12} y={c[1] + 6}>C</text>
        </g>
      ) : null}
      {k === 1 ? <Besar x={150} y={124} teks="3 sisi" ukuran={30} warna="#16A34A" /> : null}
      {k === 2 ? <Besar x={150} y={124} teks="3 sudut" ukuran={28} warna="#16A34A" /> : null}
      {k === 3 ? <Label x={60} y={176} w={180} teks="tertutup: minimal 3 ruas" ukuran={12} /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Persegi panjang dan persegi ------------------------- */

function C3_2({ k }: PropsAdegan) {
  const kecil = k >= 2;
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {kecil ? (
        <>
          <rect x="105" y="70" width="90" height="90" fill="#FEF3C7" stroke={BIRU} strokeWidth="5" strokeLinejoin="round" />
          {[
            [150, 70, true],
            [150, 160, true],
            [105, 115, false],
            [195, 115, false],
          ].map(([x, y, mendatar], i) => (
            <line key={i} x1={mendatar ? Number(x) - 6 : Number(x) - 5} y1={mendatar ? Number(y) - 5 : Number(y) - 6} x2={mendatar ? Number(x) + 6 : Number(x) + 5} y2={mendatar ? Number(y) + 5 : Number(y) + 6} stroke={MERAH} strokeWidth="3" />
          ))}
          {k === 3 ? <Label x={200} y={100} w={92} teks="4 sisi sama" ukuran={11} /> : null}
          {k === 2 ? <Label x={200} y={100} w={92} teks="persegi" ukuran={14} /> : null}
        </>
      ) : (
        <>
          <rect x="60" y="80" width="180" height="76" fill="#FEF3C7" stroke="#B45309" strokeWidth={k === 0 ? 9 : 5} strokeLinejoin="round" />
          {k === 1 ? (
            <>
              {[
                [60, 80],
                [240, 80],
                [60, 156],
                [240, 156],
              ].map(([x, y], i) => (
                <polyline key={i} points={`${x + (x < 150 ? 12 : -12)},${y} ${x + (x < 150 ? 12 : -12)},${y + (y < 120 ? 12 : -12)} ${x},${y + (y < 120 ? 12 : -12)}`} fill="none" stroke={MERAH} strokeWidth="3" />
              ))}
              <Besar x={150} y={124} teks="4 sisi, 4 sudut" ukuran={20} warna="#16A34A" />
            </>
          ) : null}
          {k === 0 ? <Label x={90} y={170} w={120} teks="persegi panjang" ukuran={13} /> : null}
        </>
      )}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Lingkaran dan segilima ------------------------- */

function C3_3({ k }: PropsAdegan) {
  const pusat: [number, number] = k === 2 ? [150, 118] : [150, 116];
  const segilima = Array.from({ length: 5 }, (_, i) => [Math.round(pusat[0] + 58 * Math.cos(((-90 + i * 72) * Math.PI) / 180)), Math.round(pusat[1] + 58 * Math.sin(((-90 + i * 72) * Math.PI) / 180))]);
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k <= 1 ? <circle cx={150} cy={116} r={56} fill="#FEF3C7" stroke={BIRU} strokeWidth="5" /> : null}
      {k === 0 ? <Label x={60} y={178} w={180} teks="dibatasi garis lengkung" ukuran={12} /> : null}
      {k === 1 ? <Besar x={150} y={124} teks="tanpa sudut" ukuran={22} warna="#16A34A" /> : null}
      {k === 2 ? (
        <>
          <polygon points={segilima.map((p) => p.join(",")).join(" ")} fill="#FEF3C7" stroke={BIRU} strokeWidth="5" strokeLinejoin="round" />
          <Besar x={150} y={124} teks="5 sisi" ukuran={28} warna="#16A34A" />
        </>
      ) : null}
      {k === 3 ? (
        <g>
          <polygon points="50,160 84,160 67,124" fill="#FEF3C7" stroke={BIRU} strokeWidth="3.5" strokeLinejoin="round" />
          <rect x="100" y="122" width="38" height="38" fill="#FEF3C7" stroke={BIRU} strokeWidth="3.5" />
          <rect x="152" y="130" width="52" height="30" fill="#FEF3C7" stroke={BIRU} strokeWidth="3.5" />
          <circle cx="238" cy="141" r="20" fill="#FEF3C7" stroke={BIRU} strokeWidth="3.5" />
          <Label x={50} y={170} w={200} teks="dikenali dari sisi dan sudut" ukuran={12} />
        </g>
      ) : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [C1_1, C1_2, C1_3],
  [C2_1, C2_2, C2_3],
  [C3_1, C3_2, C3_3],
];

export const ADEGAN_VIDEO_K3B4C = SUB_C34.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 2 },
  { a: 0, k: 3 },
  { a: 1, k: 3 },
];

export const VIDEO_SIAP_K3B4C: VideoSiap[] = SUB_C34.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B4C[i], poster: POSTER[i] }));

export function VideoK3B4C({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B4C} speakGuru={speakGuru} />;
}
