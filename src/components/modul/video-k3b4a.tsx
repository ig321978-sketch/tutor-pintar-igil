"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { Besar, BIRU, buatAdegan, DaftarVideoCerita, Emo, PenggarisAdegan, type VideoSiap } from "./video-k3b3-umum";
import { SUB_A34 } from "./naskah-k3b4";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 4 Sub-Bab A: Sisi pada Bangun Datar. Tiga video,      */
/* sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar. Naskah satu  */
/* sumber: naskah-k3b4.ts (SUB_A34.videos). Animasi SVG gratis di perangkat.      */
/* Tanpa API. Naskah: naskah/mtk-3-bab4-video-cerita.md                           */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_A34.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_A34.videos[v].adegan[a];
const MERAH = "#DC2626";

/** Titik berhuruf di adegan. */
const Tt = ({ x, y, h, bawah = false }: { x: number; y: number; h: string; bawah?: boolean }) => (
  <g>
    <circle cx={x} cy={y} r="5.5" fill={MERAH} stroke={BIRU} strokeWidth="2" />
    <text x={x} y={bawah ? y + 20 : y - 10} textAnchor="middle" fontSize="14" fontWeight="900" fill={BIRU}>
      {h}
    </text>
  </g>
);

/** Penggaris dengan garis milimeter: 0 sampai `cm` sentimeter, tiap sentimeter selebar `skala`. */
function PenggarisMm({ x, y, cm = 4, skala = 60 }: { x: number; y: number; cm?: number; skala?: number }) {
  const n = cm * 10;
  return (
    <g>
      <rect x={x - 8} y={y} width={cm * skala + 16} height="36" rx="6" fill="#FEF3C7" stroke={BIRU} strokeWidth="2.6" />
      {Array.from({ length: n + 1 }, (_, i) => (
        <line key={i} x1={x + (i * skala) / 10} x2={x + (i * skala) / 10} y1={y} y2={y + (i % 10 === 0 ? 18 : i % 5 === 0 ? 13 : 8)} stroke={BIRU} strokeWidth={i % 10 === 0 ? 2.2 : 1.1} />
      ))}
      {Array.from({ length: cm + 1 }, (_, i) => (
        <text key={i} x={x + i * skala} y={y + 31} textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
          {i}
        </text>
      ))}
    </g>
  );
}

/* ------------------------- Video 1, adegan 1: Mengingat garis ------------------------- */

function A1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <line x1="30" y1="92" x2="130" y2="92" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
      <path d="M160 110 Q205 56 270 110" fill="none" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
      {k >= 0 ? <Label x={30} y={116} w={100} teks="garis lurus" ukuran={12} /> : null}
      {k >= 1 ? <Label x={170} y={118} w={100} teks="kurva" ukuran={13} /> : null}
      {k === 2 ? (
        <Muncul>
          <Besar x={150} y={176} teks="sinar • garis • ruas" ukuran={22} warna="#B45309" />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <Muncul>
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={i} cx={36 + i * 28} cy={164} r="4.5" fill={MERAH} stroke={BIRU} strokeWidth="1.8" />
          ))}
          <Label x={50} y={176} w={200} teks="garis dari banyak titik" ukuran={12} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Sinar garis dan garis ------------------------- */

function A1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {k <= 1 ? (
        <>
          <line x1="50" y1="100" x2="268" y2="100" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
          <polygon points="288,100 266,89 266,111" fill={BIRU} />
          <Tt x={50} y={100} h="A" />
          <Tt x={170} y={100} h="B" />
          {k === 0 ? <Label x={80} y={140} w={140} teks="sinar garis AB" ukuran={14} /> : null}
          {k === 1 ? (
            <>
              <Label x={80} y={140} w={140} teks="satu sisi saja" ukuran={14} />
              <text x="30" y="110" fontSize="26" fontWeight="900" fill={MERAH}>
                ✕
              </text>
            </>
          ) : null}
        </>
      ) : (
        <>
          <line x1="30" y1="100" x2="270" y2="100" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
          <polygon points="12,100 34,89 34,111" fill={BIRU} />
          <polygon points="288,100 266,89 266,111" fill={BIRU} />
          <Tt x={100} y={100} h="C" />
          <Tt x={200} y={100} h="D" />
          {k === 2 ? <Label x={60} y={140} w={180} teks="garis CD: kedua sisi" ukuran={14} /> : null}
          {k === 3 ? <Label x={60} y={140} w={180} teks="tidak punya ujung" ukuran={14} /> : null}
        </>
      )}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Ruas garis ------------------------- */

function A1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      <line x1="46" y1="86" x2="254" y2="86" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
      <Tt x={46} y={86} h="K" />
      <Tt x={254} y={86} h="L" />
      {k === 0 ? <Label x={60} y={116} w={180} teks="dua titik ujung" ukuran={14} /> : null}
      {k === 1 ? <Label x={60} y={116} w={180} teks="panjang tetap" ukuran={14} /> : null}
      {k === 2 ? <Besar x={150} y={150} teks="KL" ukuran={46} warna="#16A34A" /> : null}
      {k === 3 ? (
        <>
          <PenggarisAdegan x={36} y={120} cm={20} skala={11} />
          <Label x={80} y={170} w={140} teks="diukur penggaris" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Dua titik ------------------------- */

function A2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <Tt x={60} y={110} h="P" />
      <Tt x={240} y={110} h="Q" />
      {k >= 1 ? <line x1="60" y1="110" x2="240" y2="110" stroke={BIRU} strokeWidth="4" strokeLinecap="round" /> : null}
      {k === 0 ? <Label x={60} y={146} w={180} teks="dua titik berbeda" ukuran={14} /> : null}
      {k === 1 ? <Label x={50} y={146} w={200} teks="satu ruas garis lurus" ukuran={14} /> : null}
      {k === 2 ? <Besar x={150} y={168} teks="PQ" ukuran={44} warna="#16A34A" /> : null}
      {k === 3 ? <Emo x={150} y={168} e="📏" s={44} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Banyak kurva ------------------------- */

function A2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {k >= 1 ? <path d="M50 120 Q150 30 250 120" fill="none" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" /> : null}
      {k >= 1 ? <path d="M50 120 C110 160 190 40 250 120" fill="none" stroke={MERAH} strokeWidth="4" strokeLinecap="round" /> : null}
      {k >= 1 ? <path d="M50 120 Q150 190 250 120" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" /> : null}
      <Tt x={50} y={120} h="E" />
      <Tt x={250} y={120} h="F" />
      {k === 0 ? <Label x={60} y={170} w={180} teks="titik E dan F" ukuran={14} /> : null}
      {k === 2 ? <Label x={40} y={172} w={220} teks="kurva tak terhingga banyaknya" ukuran={12} /> : null}
      {k === 3 ? <Label x={50} y={172} w={200} teks="ruas satu, kurva banyak" ukuran={13} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Bukan kurva ------------------------- */

function A2_3({ k }: PropsAdegan) {
  const t = [
    [40, 130],
    [100, 80],
    [170, 120],
    [220, 70],
    [264, 120],
  ];
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <polyline points={t.map((p) => p.join(",")).join(" ")} fill="none" stroke={BIRU} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
      {k >= 2 ? t.map((p, i) => <Tt key={i} x={p[0]} y={p[1]} h={["P", "K", "L", "M", "Q"][i]} bawah={i % 2 === 0} />) : null}
      {k === 0 ? <Label x={50} y={168} w={200} teks="tampak melengkung?" ukuran={14} /> : null}
      {k === 1 ? <Label x={40} y={168} w={220} teks="gabungan empat ruas garis" ukuran={13} /> : null}
      {k === 3 ? <Label x={50} y={176} w={200} teks="bukan garis lengkung" ukuran={14} /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Sentimeter dan milimeter ------------------------- */

function A3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      <PenggarisMm x={30} y={78} cm={4} skala={60} />
      {k === 1 ? <Sorot x={26} y={74} w={68} h={44} /> : null}
      {k === 2 ? <Sorot x={26} y={74} w={14} h={44} /> : null}
      {k === 0 ? <Label x={60} y={140} w={180} teks="cm dan garis kecil" ukuran={14} /> : null}
      {k === 1 ? <Label x={50} y={140} w={200} teks="1 cm jadi 10 bagian" ukuran={14} /> : null}
      {k === 2 ? <Label x={60} y={140} w={180} teks="satu bagian = 1 mm" ukuran={14} /> : null}
      {k === 3 ? <Besar x={150} y={166} teks="1 cm = 10 mm" ukuran={34} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Mengukur AB ------------------------- */

function A3_2({ k }: PropsAdegan) {
  const panjang = k === 3 ? 5.5 : 5;
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      <PenggarisAdegan x={20} y={100} cm={8} skala={32} sorot={k === 0 ? 0 : k === 1 ? 5 : null} />
      <line x1={20} y1="80" x2={20 + panjang * 32} y2="80" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
      <Tt x={20} y={80} h={k === 3 ? "M" : "A"} />
      <Tt x={20 + panjang * 32} y={80} h={k === 3 ? "N" : "B"} />
      {k === 0 ? <Label x={60} y={150} w={180} teks="angka 0 di titik A" ukuran={14} /> : null}
      {k === 1 ? <Label x={60} y={150} w={180} teks="lihat angka di titik B" ukuran={13} /> : null}
      {k === 2 ? <Besar x={150} y={176} teks="AB = 5 cm" ukuran={34} warna="#16A34A" /> : null}
      {k === 3 ? <Besar x={150} y={176} teks="MN = 5,5 cm" ukuran={30} warna="#B45309" /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Ruas garis dan sisi ------------------------- */

function A3_3({ k }: PropsAdegan) {
  const e: [number, number] = [150, 38];
  const f: [number, number] = [60, 150];
  const g: [number, number] = [240, 150];
  const warna = ["#DC2626", "#2563EB", "#16A34A"];
  const sisi: [[number, number], [number, number]][] = [
    [e, f],
    [f, g],
    [g, e],
  ];
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k <= 3 ? <polygon points={[e, f, g].map((p) => p.join(",")).join(" ")} fill="#FEF3C7" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" /> : null}
      {k >= 1 ? sisi.map(([p, q], i) => <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={warna[i]} strokeWidth="6" strokeLinecap="round" />) : null}
      <Tt x={e[0]} y={e[1]} h="E" />
      <Tt x={f[0]} y={f[1]} h="F" bawah />
      <Tt x={g[0]} y={g[1]} h="G" bawah />
      {k === 2 ? <Besar x={150} y={116} teks="3 sisi" ukuran={36} warna="#16A34A" /> : null}
      {k === 3 ? <Label x={90} y={100} w={120} teks="segiempat: 4 sisi" ukuran={11} /> : null}
      {k === 0 ? <Label x={90} y={100} w={120} teks="segitiga EFG" ukuran={13} /> : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [A1_1, A1_2, A1_3],
  [A2_1, A2_2, A2_3],
  [A3_1, A3_2, A3_3],
];

export const ADEGAN_VIDEO_K3B4A = SUB_A34.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 0 },
  { a: 1, k: 3 },
  { a: 1, k: 2 },
];

export const VIDEO_SIAP_K3B4A: VideoSiap[] = SUB_A34.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B4A[i], poster: POSTER[i] }));

export function VideoK3B4A({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B4A} speakGuru={speakGuru} />;
}
