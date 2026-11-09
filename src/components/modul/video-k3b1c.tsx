"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { Angka, BIRU, buatAdegan, DaftarVideoCerita, Emo, Orang, PapanSvg, Panah, PetunjukSvg, TandaSvg, type VideoSiap } from "./video-k3b1-umum";
import { SUB_C31 } from "./naskah-k3b1";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 1 Sub-Bab C: Membandingkan dan Mengurutkan. Tiga    */
/* video, sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar.     */
/* Naskah satu sumber: naskah-k3b1.ts (SUB_C31.videos). Animasi SVG gratis di   */
/* perangkat. Tanpa API. Naskah: naskah/mtk-3-bab1-video-cerita.md              */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_C31.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_C31.videos[v].adegan[a];

const Besar = ({ x, y, teks, ukuran = 40, warna = BIRU }: { x: number; y: number; teks: string; ukuran?: number; warna?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={warna} stroke="#FFFFFF" strokeWidth={ukuran * 0.07} paintOrder="stroke">
    {teks}
  </text>
);

/** Dua papan nilai tempat sempit berdampingan. */
function DuaPapan({ a, b, sorot = [], tanda }: { a: number; b: number; sorot?: ("r" | "p" | "s")[]; tanda?: string }) {
  const t = (n: number) => ({ r: Math.floor(n / 100), p: Math.floor(n / 10) % 10, s: n % 10 });
  const x = t(a);
  const y = t(b);
  return (
    <>
      <PapanSvg x={6} y={50} w={40} r={x.r} p={x.p} s={x.s} sorot={sorot} judul={9} angka={28} />
      <PapanSvg x={156} y={50} w={40} r={y.r} p={y.p} s={y.s} sorot={sorot} judul={9} angka={28} />
      {tanda ? <TandaSvg x={150} y={95} tanda={tanda} ukuran={34} /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 1: Rumah siapa lebih jauh ------------------------- */

function C1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <rect x="10" y="118" width="40" height="30" fill="#FDE68A" stroke={BIRU} strokeWidth="3" />
      <polygon points="6,120 30,98 54,120" fill="#DC2626" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <rect x="226" y="118" width="40" height="30" fill="#BFDBFE" stroke={BIRU} strokeWidth="3" />
      <polygon points="222,120 246,98 270,120" fill="#7C3AED" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      {k === 0 ? (
        <>
          <Orang x={64} y={186} nama="tika" s={0.8} tampilNama={false} />
          <Muncul tunda={0.2} dy={-8}>
            <PetunjukSvg x={112} y={186} teks="339 m" w={62} />
          </Muncul>
        </>
      ) : null}
      {k >= 1 ? (
        <>
          <Orang x={64} y={186} nama="tika" s={0.8} tampilNama={false} />
          <PetunjukSvg x={112} y={186} teks="339 m" w={62} />
          <Orang x={236} y={186} nama="upe" s={0.8} tampilNama={false} />
          <Muncul tunda={0.2} dy={-8}>
            <PetunjukSvg x={188} y={186} teks="421 m" w={62} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <Lompat>
          <Emo x={150} y={70} e="❓" s={46} />
        </Lompat>
      ) : null}
      {k === 3 ? (
        <>
          <Emo x={150} y={74} e="⚖️" s={48} />
          <Label x={70} y={108} w={160} teks="bandingkan dua bilangan" ukuran={11} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Bandingkan ratusan ------------------------- */

function C1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <DuaPapan a={339} b={421} sorot={k === 1 ? ["r"] : []} tanda={k >= 3 ? "<" : undefined} />
      {k === 2 ? (
        <Muncul>
          <Label x={50} y={130} w={200} teks="300 kurang dari 400" ukuran={13} />
        </Muncul>
      ) : null}
      {k === 3 ? <Label x={70} y={130} w={160} teks="339 < 421" ukuran={16} /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Lebih dari ------------------------- */

function C1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      <DuaPapan a={583} b={529} sorot={k === 1 ? ["r"] : k === 2 ? ["p"] : []} tanda={k >= 3 ? ">" : undefined} />
      {k === 1 ? <Label x={60} y={130} w={180} teks="ratusan sama: 5 dan 5" ukuran={12} /> : null}
      {k === 2 ? <Label x={50} y={130} w={200} teks="8 puluhan lebih dari 2" ukuran={13} /> : null}
      {k === 3 ? <Label x={70} y={130} w={160} teks="583 > 529" ukuran={16} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Satuan menentukan ------------------------- */

function C2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <DuaPapan a={769} b={761} sorot={k === 1 ? ["r", "p"] : k === 2 ? ["s"] : []} tanda={k >= 3 ? ">" : undefined} />
      {k === 1 ? <Label x={40} y={130} w={220} teks="ratusan dan puluhan sama" ukuran={12} /> : null}
      {k === 2 ? <Label x={50} y={130} w={200} teks="satuan: 9 lebih dari 1" ukuran={13} /> : null}
      {k === 3 ? <Label x={70} y={130} w={160} teks="769 > 761" ukuran={16} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Bilangan yang sama ------------------------- */

function C2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      <DuaPapan a={804} b={804} sorot={k === 1 ? ["r", "p"] : k === 2 ? ["s"] : []} tanda={k >= 3 ? "=" : undefined} />
      {k === 1 ? <Label x={40} y={130} w={220} teks="ratusan 8, puluhan 0" ukuran={12} /> : null}
      {k === 2 ? <Label x={60} y={130} w={180} teks="satuan sama: 4" ukuran={13} /> : null}
      {k === 3 ? <Label x={50} y={130} w={200} teks="804 = 804" ukuran={16} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Tiga langkah ------------------------- */

function C2_3({ k }: PropsAdegan) {
  const langkah = [
    ["1", "Bandingkan ratusan", "#BBF7D0"],
    ["2", "Bila sama, puluhan", "#BFDBFE"],
    ["3", "Bila sama, satuan", "#FECACA"],
  ];
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {langkah.map(([n, teks, warna], i) =>
        k >= i + 1 ? (
          <Muncul key={n} tunda={0.1} dx={-10}>
            <Angka x={44} y={68 + i * 42} teks={n} r={14} isi={warna} />
            <Label x={68} y={55 + i * 42} w={210} teks={teks} ukuran={13} />
          </Muncul>
        ) : null,
      )}
      {k === 0 ? <Emo x={150} y={104} e="🐊" s={64} /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Kelereng tiga sahabat ------------------------- */

function C3_1({ k }: PropsAdegan) {
  const anak = [
    { x: 54, nama: "Alfa", n: 138, p: "3", warna: "tika" as const },
    { x: 150, nama: "Galih", n: 103, p: "0", warna: "upe" as const },
    { x: 246, nama: "Andi", n: 183, p: "8", warna: "lili" as const },
  ];
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {anak.map((a) => (
        <g key={a.nama}>
          <Orang x={a.x} y={170} nama={a.warna} s={0.7} tampilNama={false} />
          <Label x={a.x - 38} y={176} w={76} teks={a.nama} ukuran={12} />
          <Muncul tunda={0.2}>
            <Angka x={a.x} y={74} teks={String(a.n)} r={22} isi={k === 1 ? "#FDE68A" : "#FFFFFF"} />
          </Muncul>
          {k === 1 ? (
            <Muncul>
              <Label x={a.x - 28} y={100} w={56} teks={`${a.p} puluhan`} ukuran={10} />
            </Muncul>
          ) : null}
        </g>
      ))}
      {k === 2 ? <Lompat><Emo x={150} y={112} e="📶" s={30} /></Lompat> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Tiga bilangan ------------------------- */

function C3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k === 0 ? (
        <>
          <Besar x={54} y={110} teks="720" ukuran={34} />
          <Besar x={150} y={110} teks="639" ukuran={34} />
          <Besar x={246} y={110} teks="709" ukuran={34} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Besar x={54} y={110} teks="720" ukuran={32} warna="#9CA3AF" />
          <Besar x={150} y={110} teks="639" ukuran={36} warna="#15803D" />
          <Besar x={246} y={110} teks="709" ukuran={32} warna="#9CA3AF" />
          <Sorot x={108} y={78} w={84} h={42} />
          <Label x={50} y={140} w={200} teks="6 ratusan: paling kecil" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Besar x={90} y={110} teks="709" ukuran={44} />
          <TandaSvg x={150} y={108} tanda="<" ukuran={44} />
          <Besar x={210} y={110} teks="720" ukuran={44} />
          <Label x={40} y={140} w={220} teks="puluhan: 0 kurang dari 2" ukuran={12} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Besar x={150} y={104} teks="639, 709, 720" ukuran={30} warna="#16A34A" />
          <Label x={50} y={134} w={200} teks="dari terkecil ke terbesar" ukuran={12} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Dua arah urutan ------------------------- */

function C3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k <= 1 ? (
        <>
          <Panah x1={40} y1={150} x2={260} y2={150} warna="#16A34A" />
          <Label x={96} y={158} w={108} teks="naik" ukuran={13} />
        </>
      ) : null}
      {k >= 2 ? (
        <>
          <Panah x1={260} y1={150} x2={40} y2={150} warna="#DC2626" />
          <Label x={96} y={158} w={108} teks="turun" ukuran={13} />
        </>
      ) : null}
      {k === 1 ? <Besar x={150} y={104} teks="639, 709, 720" ukuran={30} warna="#16A34A" /> : null}
      {k === 3 ? <Besar x={150} y={104} teks="720, 709, 639" ukuran={30} warna="#DC2626" /> : null}
      {k === 0 ? <Emo x={150} y={96} e="📈" s={54} /> : null}
      {k === 2 ? <Emo x={150} y={96} e="📉" s={54} /> : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [C1_1, C1_2, C1_3],
  [C2_1, C2_2, C2_3],
  [C3_1, C3_2, C3_3],
];

export const ADEGAN_VIDEO_K3B1C = SUB_C31.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 3 },
  { a: 1, k: 3 },
  { a: 1, k: 3 },
];

export const VIDEO_SIAP_K3B1C: VideoSiap[] = SUB_C31.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B1C[i], poster: POSTER[i] }));

export function VideoK3B1C({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B1C} speakGuru={speakGuru} />;
}
