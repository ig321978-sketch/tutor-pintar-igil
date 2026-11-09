"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { BIRU, buatAdegan, DaftarVideoCerita, Emo, KalengSvg, KartuSvg, ModelSvg, Orang, PapanSvg, Panah, type VideoSiap } from "./video-k3b1-umum";
import { SUB_B31 } from "./naskah-k3b1";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 1 Sub-Bab B: Nilai Tempat. Tiga video, sembilan      */
/* adegan. Diputar satu per satu saat siswa mengetuk Putar. Naskah satu sumber:  */
/* naskah-k3b1.ts (SUB_B31.videos). Animasi SVG gratis di perangkat. Tanpa API.  */
/* Naskah: naskah/mtk-3-bab1-video-cerita.md                                     */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_B31.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_B31.videos[v].adegan[a];

const Besar = ({ x, y, teks, ukuran = 40, warna = BIRU }: { x: number; y: number; teks: string; ukuran?: number; warna?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={warna} stroke="#FFFFFF" strokeWidth={ukuran * 0.07} paintOrder="stroke">
    {teks}
  </text>
);

/* ------------------------- Video 1, adegan 1: Mengukur tinggi badan ------------------------- */

function B1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <rect x="30" y="44" width="14" height="140" rx="3" fill="#FDE68A" stroke={BIRU} strokeWidth="3" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1="30" x2={i % 5 === 0 ? 44 : 38} y1={44 + i * 14} y2={44 + i * 14} stroke={BIRU} strokeWidth="1.6" />
      ))}
      {k === 0 ? (
        <>
          <Orang x={110} y={184} nama="tika" s={0.85} tampilNama={false} />
          <Orang x={170} y={184} nama="halim" s={1} tampilNama={false} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Orang x={110} y={184} nama="tika" s={0.85} tampilNama={false} />
          <Muncul tunda={0.2}>
            <Label x={170} y={90} w={110} teks="127 cm" ukuran={20} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <PapanSvg x={74} y={62} w={62} r={1} p={2} s={7} />
          <Label x={64} y={134} w={200} teks="tiga angka: 1, 2, 7" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <PapanSvg x={74} y={62} w={62} r={1} p={2} s={7} sorot={["r", "p", "s"]} />
          <Lompat>
            <Emo x={170} y={42} e="❓" s={30} />
          </Lompat>
          <Label x={64} y={134} w={200} teks="tempat dan nilainya?" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Nilai 251 ------------------------- */

function B1_2({ k }: PropsAdegan) {
  const nilai: { x: number; teks: string; sorot: "r" | "p" | "s" }[] = [
    { x: 68, teks: "200", sorot: "r" },
    { x: 150, teks: "50", sorot: "p" },
    { x: 232, teks: "1", sorot: "s" },
  ];
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <PapanSvg x={30} y={46} w={76} r={2} p={5} s={1} sorot={k >= 1 ? [nilai[k - 1].sorot] : []} />
      {nilai.map((v, i) =>
        k >= i + 1 ? (
          <Muncul key={v.teks} tunda={0.1} dy={-8}>
            <line x1={v.x} y1="106" x2={v.x} y2="126" stroke={BIRU} strokeWidth="3" />
            <Label x={v.x - 34} y={128} w={68} teks={v.teks} ukuran={18} />
          </Muncul>
        ) : null,
      )}
      {k === 0 ? <Label x={40} y={130} w={220} teks="dua ratus lima puluh satu" ukuran={13} /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Angka sama, nilai beda ------------------------- */

function B1_3({ k }: PropsAdegan) {
  const baris: { y: number; angka: string; ket: string }[] = [
    { y: 72, angka: "600", ket: "ratusan = 600" },
    { y: 118, angka: "60", ket: "puluhan = 60" },
    { y: 164, angka: "6", ket: "satuan = 6" },
  ];
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      {baris.map((b, i) => (
        <g key={b.angka} opacity={k === 0 || k === i + 1 ? 1 : 0.35}>
          <Besar x={80} y={b.y + 14} teks={b.angka} ukuran={44} />
          {k === i + 1 ? (
            <Muncul>
              <Label x={140} y={b.y - 8} w={140} teks={b.ket} ukuran={13} />
            </Muncul>
          ) : null}
        </g>
      ))}
      {k === 1 ? <Sorot x={40} y={44} w={70} h={50} /> : null}
      {k === 2 ? <Sorot x={50} y={92} w={60} h={50} /> : null}
      {k === 3 ? <Sorot x={60} y={138} w={40} h={50} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Menyiapkan tiga kaleng ------------------------- */

function B2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {k <= 1 ? (
        <>
          <Muncul tunda={0.0}>
            <KalengSvg x={70} y={66} tempat="r" tampilLabel={k >= 1} />
          </Muncul>
          <Muncul tunda={0.25}>
            <KalengSvg x={150} y={66} tempat="p" tampilLabel={k >= 1} />
          </Muncul>
          <Muncul tunda={0.5}>
            <KalengSvg x={230} y={66} tempat="s" tampilLabel={k >= 1} />
          </Muncul>
          {k === 1 ? (
            <>
              <line x1="104" y1="56" x2="124" y2="56" stroke={BIRU} strokeWidth="3" />
              <line x1="184" y1="56" x2="204" y2="56" stroke={BIRU} strokeWidth="3" />
            </>
          ) : null}
        </>
      ) : null}
      {k >= 2 ? (
        <>
          {Array.from({ length: 10 }, (_, i) => (
            <Muncul key={i} tunda={i * 0.06} dy={-6}>
              <KartuSvg x={14 + (i % 5) * 56} y={48 + Math.floor(i / 5) * 64} digit={i} warna={k === 3 ? ["#FDE68A", "#BBF7D0", "#BFDBFE", "#FBCFE8", "#C7D2FE", "#FED7AA", "#A5F3FC", "#DDD6FE", "#FECACA", "#D9F99D"][i] : "#FFE566"} w={42} h={54} />
            </Muncul>
          ))}
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Mengambil kartu ------------------------- */

function B2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      <KalengSvg x={70} y={78} tempat="r" digit={k >= 1 ? 2 : null} />
      <KalengSvg x={150} y={78} tempat="p" digit={k >= 2 ? 1 : null} />
      <KalengSvg x={230} y={78} tempat="s" digit={k >= 2 ? 9 : null} />
      {k === 0 ? (
        <Muncul tunda={0.2}>
          <Emo x={150} y={48} e="🎲" s={24} />
        </Muncul>
      ) : null}
      {k === 3 ? <Label x={70} y={42} w={160} teks="kartu 2, 1, 9 = 219" ukuran={14} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Nilai tiap kartu ------------------------- */

function B2_3({ k }: PropsAdegan) {
  const nilai = [
    { x: 70, teks: "200", digit: 2, t: "r" as const },
    { x: 150, teks: "10", digit: 1, t: "p" as const },
    { x: 230, teks: "9", digit: 9, t: "s" as const },
  ];
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {nilai.map((v, i) => (
        <g key={v.t}>
          <KalengSvg x={v.x} y={50} tempat={v.t} digit={v.digit} s={0.9} tampilLabel={false} />
          {k >= i && k <= 2 ? (
            <Muncul>
              <Label x={v.x - 34} y={118} w={68} teks={v.teks} ukuran={18} />
            </Muncul>
          ) : null}
          {k === 3 ? <Label x={v.x - 34} y={118} w={68} teks={v.teks} ukuran={18} /> : null}
        </g>
      ))}
      {k === 3 ? (
        <Muncul>
          <Label x={50} y={156} w={200} teks="200 + 10 + 9 = 219" ukuran={15} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Menyusun bilangan ------------------------- */

function B3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k === 0 ? (
        <>
          <ModelSvg x={40} y={60} r={2} p={5} s={1} c={5} />
          <Emo x={250} y={110} e="➕" s={40} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <ModelSvg x={16} y={56} r={2} p={5} s={1} c={4} />
          <Label x={176} y={56} w={112} teks="2 ratusan" ukuran={13} />
          <Label x={176} y={90} w={112} teks="5 puluhan" ukuran={13} />
          <Label x={176} y={124} w={112} teks="1 satuan" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <PapanSvg x={30} y={54} w={76} r={2} p={5} s={1} />
          <Label x={20} y={130} w={260} teks="2 ratusan + 5 puluhan + 1 satuan = 251" ukuran={11} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Besar x={150} y={96} teks="200 + 50 + 1" ukuran={36} />
          <Besar x={150} y={150} teks="= 251" ukuran={44} warna="#16A34A" />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Mengurai bilangan ------------------------- */

function B3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k === 0 ? (
        <>
          <Besar x={64} y={118} teks="251" ukuran={46} />
          <Panah x1={106} y1={104} x2={150} y2={104} />
          <Label x={160} y={56} w={124} teks="ratusan" ukuran={13} />
          <Label x={160} y={92} w={124} teks="puluhan" ukuran={13} />
          <Label x={160} y={128} w={124} teks="satuan" ukuran={13} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <ModelSvg x={12} y={56} r={6} p={0} s={2} c={2.5} />
          <Label x={200} y={56} w={92} teks="6 ratusan" ukuran={12} />
          <Label x={200} y={90} w={92} teks="0 puluhan" ukuran={12} />
          <Label x={200} y={124} w={92} teks="2 satuan" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <PapanSvg x={30} y={54} w={76} r={6} p={0} s={2} sorot={["p"]} />
          <Label x={50} y={130} w={200} teks="602 = 600 + 0 + 2" ukuran={14} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Label x={30} y={56} w={240} teks="menyusun: 600 + 0 + 2 → 602" ukuran={13} />
          <Label x={30} y={96} w={240} teks="mengurai: 602 → 600 + 0 + 2" ukuran={13} />
          <Emo x={150} y={160} e="🔄" s={34} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Isi tabel dengan teliti ------------------------- */

function B3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? (
        <>
          <PapanSvg x={30} y={66} w={76} r={0} p={0} s={0} tampil={[false, false, false]} />
          <Lompat>
            <Emo x={150} y={42} e="🧐" s={26} />
          </Lompat>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <PapanSvg x={30} y={66} w={76} r={9} p={8} s={7} />
          <Label x={60} y={138} w={180} teks="987: isi 9, 8, dan 7" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <g opacity="0.55">
            <PapanSvg x={30} y={66} w={76} r={900} p={80} s={7} />
          </g>
          <line x1="40" y1="70" x2="260" y2="124" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />
          <Label x={30} y={138} w={240} teks="bukan 900, 80, dan 7" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Besar x={150} y={98} teks="900 + 80 + 7" ukuran={38} />
          <Besar x={150} y={150} teks="= 987" ukuran={44} warna="#16A34A" />
        </>
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

export const ADEGAN_VIDEO_K3B1B = SUB_B31.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 3 },
  { a: 1, k: 3 },
  { a: 0, k: 3 },
];

export const VIDEO_SIAP_K3B1B: VideoSiap[] = SUB_B31.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B1B[i], poster: POSTER[i] }));

export function VideoK3B1B({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B1B} speakGuru={speakGuru} />;
}
