"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Papan, type PropsAdegan } from "./video-cerita";
import { BatangTeks, Besar, buatAdegan, DaftarVideoCerita, Emo, MeteranGulung, Orang, PenggarisAdegan, PitaMeter, type VideoSiap } from "./video-k3b3-umum";
import { SUB_B33 } from "./naskah-k3b3";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 3 Sub-Bab B: Hubungan Antarsatuan Baku Panjang.       */
/* Tiga video, sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar.  */
/* Naskah satu sumber: naskah-k3b3.ts (SUB_B33.videos). Animasi SVG gratis di     */
/* perangkat. Tanpa API. Naskah: naskah/mtk-3-bab3-video-cerita.md                */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_B33.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_B33.videos[v].adegan[a];

/* ------------------------- Video 1, adegan 1: Memakai meteran ------------------------- */

function B1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      {k === 0 ? (
        <>
          <Orang x={60} y={190} nama="paman" s={0.85} tampilNama={false} />
          <MeteranGulung x={150} y={90} s={1.2} />
          <Label x={50} y={44} w={200} teks="cara memakai meteran" ukuran={13} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <PenggarisAdegan x={24} y={70} cm={20} skala={12} />
          <PitaMeter x={30} y={126} meter={2} skala={110} />
          <Label x={70} y={168} w={160} teks="sama dengan penggaris" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <PitaMeter x={30} y={96} meter={2} skala={110} sorot={0} />
          <Label x={70} y={150} w={160} teks="mulai dari 0" ukuran={14} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <MeteranGulung x={48} y={72} s={1.2} />
          <Lompat>
            <Emo x={220} y={104} e="❓" s={60} />
          </Lompat>
          <Label x={60} y={150} w={180} teks="satuan meteran?" ukuran={14} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Seratus sentimeter ------------------------- */

function B1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <PitaMeter x={30} y={72} meter={2} skala={110} sorot={k === 1 ? 100 : null} />
      {k === 0 ? <Label x={50} y={130} w={200} teks="meteran 0 sampai 100" ukuran={13} /> : null}
      {k === 1 ? <Besar x={150} y={158} teks="100 cm = 1 m" ukuran={40} warna="#16A34A" /> : null}
      {k === 2 ? <Besar x={150} y={158} teks="1 m = 100 cm" ukuran={40} warna="#16A34A" /> : null}
      {k === 3 ? <Besar x={150} y={158} teks="2 m = 200 cm" ukuran={40} warna="#B45309" /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Panjang pintu ------------------------- */

function B1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      <PitaMeter x={30} y={132} meter={2} skala={110} sorot={k === 1 ? 200 : null} />
      {k <= 1 ? (
        <>
          <Emo x={76} y={80} e="🚪" s={56} />
          <Orang x={230} y={118} nama="paman" s={0.55} tampilNama={false} />
        </>
      ) : null}
      {k === 1 ? <Besar x={150} y={56} teks="200 cm" ukuran={36} /> : null}
      {k === 2 ? <Besar x={150} y={90} teks="100 cm = 1 m" ukuran={38} warna="#B45309" /> : null}
      {k === 3 ? <Besar x={150} y={90} teks="200 cm = 2 m" ukuran={40} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Dari meter ke sentimeter ------------------------- */

function B2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {k === 0 ? <Besar x={150} y={118} teks="1 m = 100 cm" ukuran={42} /> : null}
      {k === 1 ? (
        <>
          <Besar x={150} y={96} teks="m ke cm" ukuran={44} />
          <Besar x={150} y={150} teks="× 100" ukuran={52} warna="#DC2626" />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Besar x={150} y={86} teks="3 m = 3 × 100 cm" ukuran={28} />
          <Besar x={150} y={142} teks="= 300 cm" ukuran={44} warna="#16A34A" />
        </>
      ) : null}
      {k === 3 ? <Besar x={150} y={120} teks="4 m = 400 cm" ukuran={42} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Dari sentimeter ke meter ------------------------- */

function B2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {k === 0 ? (
        <>
          <Besar x={150} y={96} teks="cm ke m" ukuran={44} />
          <Besar x={150} y={150} teks="÷ 100" ukuran={52} warna="#2563EB" />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Besar x={150} y={86} teks="700 cm : 100" ukuran={32} />
          <Besar x={150} y={142} teks="= 7 m" ukuran={48} warna="#16A34A" />
        </>
      ) : null}
      {k === 2 ? <Besar x={150} y={120} teks="900 cm = 9 m" ukuran={40} warna="#16A34A" /> : null}
      {k === 3 ? (
        <>
          <Emo x={60} y={104} e="🌳" s={44} />
          <Emo x={240} y={104} e="🏠" s={44} />
          <line x1="86" x2="214" y1="112" y2="112" stroke="#1C01A5" strokeWidth="4" strokeDasharray="8 6" />
          <Label x={60} y={140} w={180} teks="jarak: 900 cm = 9 m" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Meter dan sentimeter ------------------------- */

function B2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {k === 0 ? (
        <>
          <Orang x={70} y={192} nama="lili" s={0.85} tampilNama={false} />
          <Besar x={190} y={96} teks="1 m 17 cm" ukuran={38} />
          <Label x={132} y={120} w={116} teks="tinggi badan" ukuran={12} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Besar x={150} y={90} teks="100 + 17 = 117 cm" ukuran={27} />
          <Label x={50} y={120} w={200} teks="1 m sama dengan 100 cm" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Besar x={150} y={90} teks="115 cm = 1 m 15 cm" ukuran={26} />
          <Label x={50} y={120} w={200} teks="tinggi badan Eri" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Besar x={150} y={90} teks="1 m 17 cm" ukuran={36} warna="#16A34A" />
          <Besar x={150} y={148} teks="= 117 cm" ukuran={36} warna="#2563EB" />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Menyambung pita ------------------------- */

function B3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k === 0 ? (
        <>
          <Orang x={70} y={194} nama="lili" s={0.85} tampilNama={false} />
          <BatangTeks x={130} y={86} w={130} teks="pita" warna="#FECACA" />
          <BatangTeks x={150} y={122} w={110} teks="pita" warna="#BFDBFE" />
        </>
      ) : null}
      {k >= 1 ? <BatangTeks x={30} y={70} w={110} teks="4 m 37 cm" warna="#FECACA" /> : null}
      {k >= 2 ? <BatangTeks x={30} y={110} w={190} teks="7 m 43 cm" warna="#BFDBFE" /> : null}
      {k === 3 ? (
        <Lompat>
          <Emo x={150} y={170} e="❓" s={46} />
        </Lompat>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Jumlahkan ------------------------- */

function B3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k === 0 ? <Besar x={150} y={116} teks="4 + 7 = 11 m" ukuran={42} warna="#DC2626" /> : null}
      {k === 1 ? <Besar x={150} y={116} teks="37 + 43 = 80 cm" ukuran={30} warna="#2563EB" /> : null}
      {k === 2 ? (
        <>
          <Besar x={150} y={96} teks="11 m 80 cm" ukuran={52} warna="#16A34A" />
          <Label x={50} y={124} w={200} teks="panjang pita disambung" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Besar x={150} y={90} teks="m + m" ukuran={40} warna="#DC2626" />
          <Besar x={150} y={148} teks="cm + cm" ukuran={40} warna="#2563EB" />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Kain katun ------------------------- */

function B3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? (
        <>
          <Orang x={70} y={192} nama="paman" s={0.85} tampilNama={false} />
          <Besar x={196} y={106} teks="75 m 80 cm" ukuran={32} />
          <Label x={150} y={124} w={96} teks="kain katun" ukuran={12} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Besar x={150} y={84} teks="75 m 80 cm" ukuran={34} />
          <Besar x={150} y={140} teks="− 38 m 45 cm" ukuran={34} warna="#DC2626" />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Besar x={150} y={88} teks="75 − 38 = 37 m" ukuran={30} warna="#DC2626" />
          <Besar x={150} y={144} teks="80 − 45 = 35 cm" ukuran={30} warna="#2563EB" />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Besar x={150} y={110} teks="37 m 35 cm" ukuran={48} warna="#16A34A" />
          <Label x={70} y={134} w={160} teks="sisa kain" ukuran={14} />
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

export const ADEGAN_VIDEO_K3B3B = SUB_B33.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 1 },
  { a: 0, k: 2 },
  { a: 1, k: 2 },
];

export const VIDEO_SIAP_K3B3B: VideoSiap[] = SUB_B33.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B3B[i], poster: POSTER[i] }));

export function VideoK3B3B({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B3B} speakGuru={speakGuru} />;
}
