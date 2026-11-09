"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { BandulAdegan, Besar, buatAdegan, DaftarVideoCerita, Emo, Orang, TimbanganAdegan, type VideoSiap } from "./video-k3b3-umum";
import { SUB_D33 } from "./naskah-k3b3";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 3 Sub-Bab D: Hubungan Antarsatuan Baku Berat.         */
/* Tiga video, sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar.  */
/* Naskah satu sumber: naskah-k3b3.ts (SUB_D33.videos). Animasi SVG gratis di     */
/* perangkat. Tanpa API. Naskah: naskah/mtk-3-bab3-video-cerita.md                */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_D33.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_D33.videos[v].adegan[a];

/** Deretan bandul satu ons berjajar (untuk menunjukkan 10 ons = 1 kg). */
const DeretOns = ({ x, y, n }: { x: number; y: number; n: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <BandulAdegan key={i} x={x + i * 26} y={y} a="1" b="ons" w={24} />
    ))}
  </>
);

/* ------------------------- Video 1, adegan 1: Di pasar ------------------------- */

function D1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      {k === 0 ? (
        <>
          <Orang x={70} y={190} nama="paman" s={0.85} tampilNama={false} />
          <Emo x={196} y={108} e="🛒" s={64} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Emo x={150} y={84} e="🏋️" s={60} />
          <Label x={50} y={120} w={200} teks="timbangan kodok" ukuran={14} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <BandulAdegan x={110} y={70} a="1" b="kg" w={46} />
          <BandulAdegan x={170} y={80} a="1" b="ons" w={34} />
          <Label x={60} y={150} w={180} teks="bandul = ukuran berat" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <Lompat>
          <Emo x={150} y={112} e="❓" s={70} />
        </Lompat>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Jenis bandul ------------------------- */

function D1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {k === 0 ? <Besar x={150} y={116} teks="5 jenis bandul" ukuran={36} /> : null}
      {k >= 1 ? (
        <Muncul>
          <BandulAdegan x={30} y={56} a="1/2" b="ons" w={40} />
          <BandulAdegan x={80} y={52} a="1" b="ons" w={44} />
          <BandulAdegan x={132} y={48} a="2" b="ons" w={48} />
        </Muncul>
      ) : null}
      {k >= 2 ? (
        <Muncul>
          <BandulAdegan x={192} y={44} a="1/2" b="kg" w={54} />
          <BandulAdegan x={254} y={40} a="1" b="kg" w={58} />
        </Muncul>
      ) : null}
      {k === 3 ? <Label x={50} y={162} w={200} teks="jumlahkan bandulnya" ukuran={14} /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Telur dua timbangan ------------------------- */

function D1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      <Emo x={64} y={78} e="🥚" s={34} />
      <BandulAdegan x={30} y={96} a="1" b="kg" w={52} />
      {k >= 1 ? (
        <Muncul>
          <Emo x={226} y={64} e="🥚" s={34} />
          <TimbanganAdegan x={164} y={84} teks="1000" />
        </Muncul>
      ) : null}
      {k === 0 ? <Label x={20} y={168} w={120} teks="kodok: 1 kg" ukuran={12} /> : null}
      {k === 1 ? <Label x={160} y={168} w={130} teks="digital: 1.000 g" ukuran={12} /> : null}
      {k === 2 ? <Label x={50} y={168} w={200} teks="jumlah telur sama" ukuran={13} /> : null}
      {k === 3 ? <Besar x={150} y={184} teks="1 kg = 1.000 g" ukuran={32} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Kilogram dan ons ------------------------- */

function D2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {k === 0 ? <Besar x={150} y={116} teks="1 kg = 10 ons" ukuran={40} /> : null}
      {k === 1 ? (
        <>
          <BandulAdegan x={14} y={48} a="1" b="kg" w={48} />
          <Besar x={84} y={92} teks="=" ukuran={34} />
          <DeretOns x={104} y={64} n={7} />
          <Label x={40} y={140} w={220} teks="10 bandul 1 ons" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <BandulAdegan x={30} y={52} a="1/2" b="kg" w={50} />
          <Besar x={106} y={96} teks="=" ukuran={34} />
          <DeretOns x={130} y={64} n={5} />
          <Label x={60} y={140} w={180} teks="1/2 kg = 5 ons" ukuran={14} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Emo x={150} y={84} e="🛒" s={56} />
          <Label x={50} y={126} w={200} teks="ons di timbangan kodok" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Ons dan gram ------------------------- */

function D2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {k === 0 ? (
        <>
          <BandulAdegan x={44} y={60} a="1" b="ons" w={56} />
          <Besar x={190} y={112} teks="= 100 g" ukuran={40} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <BandulAdegan x={44} y={60} a="2" b="ons" w={56} />
          <Besar x={190} y={112} teks="= 200 g" ukuran={40} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <BandulAdegan x={44} y={64} a="1/2" b="ons" w={52} />
          <Besar x={190} y={112} teks="= 50 g" ukuran={40} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Besar x={150} y={90} teks="10 ons" ukuran={40} />
          <Besar x={150} y={142} teks="= 1.000 g = 1 kg" ukuran={30} warna="#16A34A" />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Kilogram ke gram ------------------------- */

function D2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {k === 0 ? (
        <>
          <Besar x={150} y={100} teks="kg ke g" ukuran={44} />
          <Besar x={150} y={152} teks="× 1.000" ukuran={46} warna="#DC2626" />
        </>
      ) : null}
      {k === 1 ? <Besar x={150} y={120} teks="3 kg = 3 × 1.000 g" ukuran={28} /> : null}
      {k === 2 ? <Besar x={150} y={120} teks="= 3.000 g" ukuran={48} warna="#16A34A" /> : null}
      {k === 3 ? <Besar x={150} y={120} teks="20 kg = 20.000 g" ukuran={30} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Tepung Meutia ------------------------- */

function D3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k === 0 ? (
        <>
          <Orang x={70} y={190} nama="lili" s={0.85} tampilNama={false} />
          <Label x={130} y={90} w={150} teks="menimbang tepung" ukuran={13} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <TimbanganAdegan x={90} y={70} teks="1753" />
          <Label x={70} y={150} w={160} teks="1.753 gram" ukuran={14} />
        </>
      ) : null}
      {k === 2 ? <Besar x={150} y={120} teks="... kg ... g" ukuran={44} /> : null}
      {k === 3 ? <Besar x={150} y={120} teks="1.000 g = 1 kg" ukuran={34} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Pecah gramnya ------------------------- */

function D3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k === 0 ? <Besar x={150} y={120} teks="1.753 = 1.000 + 753" ukuran={26} /> : null}
      {k === 1 ? (
        <>
          <Besar x={150} y={96} teks="1.000 g" ukuran={44} />
          <Besar x={150} y={150} teks="= 1 kg" ukuran={44} warna="#16A34A" />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Besar x={150} y={96} teks="1.753 g" ukuran={40} />
          <Besar x={150} y={150} teks="= 1 kg 753 g" ukuran={34} warna="#16A34A" />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Emo x={150} y={62} e="🏋️" s={40} />
          <Besar x={150} y={130} teks="1 kg 753 g" ukuran={44} warna="#16A34A" />
          <Label x={60} y={152} w={180} teks="berat tepung Meutia" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Mangga dan jeruk ------------------------- */

function D3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? (
        <>
          <Besar x={150} y={96} teks="mangga 8.000 g" ukuran={32} />
          <Besar x={150} y={148} teks="dijual 4 kg" ukuran={32} warna="#B45309" />
        </>
      ) : null}
      {k === 1 ? <Besar x={150} y={120} teks="8.000 g = 8 kg" ukuran={36} /> : null}
      {k === 2 ? <Besar x={150} y={120} teks="8 − 4 = 4 kg" ukuran={42} warna="#16A34A" /> : null}
      {k === 3 ? (
        <>
          <Emo x={90} y={84} e="🍊" s={44} />
          <Emo x={210} y={84} e="🍊" s={44} />
          <Besar x={150} y={150} teks="500 + 500 = 1 kg" ukuran={28} warna="#16A34A" />
        </>
      ) : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [D1_1, D1_2, D1_3],
  [D2_1, D2_2, D2_3],
  [D3_1, D3_2, D3_3],
];

export const ADEGAN_VIDEO_K3B3D = SUB_D33.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 3 },
  { a: 0, k: 0 },
  { a: 1, k: 2 },
];

export const VIDEO_SIAP_K3B3D: VideoSiap[] = SUB_D33.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B3D[i], poster: POSTER[i] }));

export function VideoK3B3D({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B3D} speakGuru={speakGuru} />;
}
