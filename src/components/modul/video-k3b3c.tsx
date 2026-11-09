"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { Besar, buatAdegan, DaftarVideoCerita, Emo, JarumAdegan, Orang, TimbanganAdegan, type VideoSiap } from "./video-k3b3-umum";
import { SUB_C33 } from "./naskah-k3b3";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 3 Sub-Bab C: Pengukuran Berat dengan Satuan Baku.     */
/* Tiga video, sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar.  */
/* Naskah satu sumber: naskah-k3b3.ts (SUB_C33.videos). Animasi SVG gratis di     */
/* perangkat. Tanpa API. Naskah: naskah/mtk-3-bab3-video-cerita.md                */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_C33.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_C33.videos[v].adegan[a];

/* ------------------------- Video 1, adegan 1: Keluarkan isi tas ------------------------- */

function C1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <rect x="14" y="128" width="272" height="14" rx="5" fill="#D6A56B" stroke="#1C01A5" strokeWidth="3" />
      {k === 0 ? (
        <>
          <Orang x={60} y={190} nama="lili" s={0.7} tampilNama={false} />
          <Orang x={150} y={190} nama="halim" s={0.7} tampilNama={false} />
          <Orang x={240} y={190} nama="kira" s={0.7} tampilNama={false} />
          <Label x={70} y={50} w={160} teks="satu kelompok" ukuran={14} />
        </>
      ) : null}
      {k >= 1 ? (
        <Muncul>
          <Emo x={60} y={112} e="✏️" s={34} />
          <Emo x={120} y={112} e="📖" s={34} />
          <Emo x={180} y={112} e="🍬" s={34} />
          <Emo x={240} y={112} e="🔑" s={34} />
        </Muncul>
      ) : null}
      {k === 1 ? <Label x={40} y={160} w={220} teks="barang dari tas di atas meja" ukuran={12} /> : null}
      {k === 2 ? <TimbanganAdegan x={90} y={150} teks="0" /> : null}
      {k === 3 ? <Label x={50} y={160} w={200} teks="ukur berat tiap barang" ukuran={14} /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Timbang barangnya ------------------------- */

function C1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <Emo x={150} y={k === 0 ? 72 : 82} e="📖" s={44} />
      <TimbanganAdegan x={90} y={100} teks={k === 0 ? "0" : "200"} />
      {k === 1 ? <Sorot x={112} y={125} w={76} h={22} /> : null}
      {k === 0 ? <Label x={60} y={168} w={180} teks="letakkan di timbangan" ukuran={13} /> : null}
      {k === 2 ? <Besar x={150} y={180} teks="200 gram" ukuran={34} warna="#16A34A" /> : null}
      {k === 3 ? <Label x={40} y={168} w={220} teks="tulis nama dan beratnya" ukuran={13} /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Satuan berat ------------------------- */

function C1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      {k === 0 ? (
        <>
          <Orang x={70} y={190} nama="tika" s={0.8} tampilNama={false} />
          <Label x={120} y={96} w={150} teks="presentasi hasil" ukuran={13} />
        </>
      ) : null}
      {k === 1 ? (
        <Lompat>
          <Emo x={150} y={112} e="❓" s={70} />
        </Lompat>
      ) : null}
      {k === 2 ? (
        <>
          <Besar x={150} y={110} teks="g • kg" ukuran={58} />
          <Label x={50} y={140} w={200} teks="gram dan kilogram" ukuran={14} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Besar x={80} y={112} teks="g" ukuran={56} />
          <Besar x={220} y={112} teks="kg" ukuran={56} warna="#B45309" />
          <Label x={30} y={140} w={100} teks="gram" ukuran={13} />
          <Label x={170} y={140} w={100} teks="kilogram" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Ke pasar ------------------------- */

function C2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {k === 0 ? (
        <>
          <Orang x={70} y={190} nama="lili" s={0.85} tampilNama={false} />
          <Emo x={190} y={106} e="🛒" s={64} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Orang x={50} y={190} nama="paman" s={0.8} tampilNama={false} />
          <Emo x={170} y={72} e="🍎" s={40} />
          <TimbanganAdegan x={116} y={92} teks="1" />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Emo x={90} y={104} e="⚖️" s={60} />
          <Lompat>
            <Emo x={210} y={104} e="❓" s={56} />
          </Lompat>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Label x={20} y={60} w={110} teks="timbangan kodok" ukuran={11} />
          <Label x={150} y={60} w={130} teks="timbangan duduk" ukuran={11} />
          <Label x={70} y={120} w={160} teks="timbangan digital" ukuran={12} />
          <Emo x={150} y={176} e="⚖️" s={36} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Nama dan satuan ------------------------- */

function C2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {k === 0 ? (
        <>
          <Emo x={150} y={106} e="🏋️" s={64} />
          <Label x={70} y={140} w={160} teks="timbangan kodok: bandul" ukuran={12} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <JarumAdegan x={150} y={100} gram={3000} r={52} />
          <Label x={60} y={160} w={180} teks="timbangan duduk: jarum" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <TimbanganAdegan x={90} y={70} teks="250" />
          <Label x={60} y={146} w={180} teks="timbangan digital: layar" ukuran={12} />
        </>
      ) : null}
      {k === 3 ? <Besar x={150} y={120} teks="g atau kg" ukuran={50} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Gram atau kilogram ------------------------- */

function C2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {k <= 1 ? (
        <>
          <Besar x={150} y={64} teks="gram" ukuran={34} warna="#16A34A" />
          <Muncul aktif={k >= 1}>
            <Emo x={60} y={124} e="✏️" s={38} />
            <Emo x={120} y={124} e="📖" s={38} />
            <Emo x={180} y={124} e="🍬" s={38} />
            <Emo x={240} y={124} e="🔑" s={38} />
          </Muncul>
        </>
      ) : null}
      {k >= 2 ? (
        <>
          <Besar x={150} y={64} teks="kilogram" ukuran={34} warna="#B45309" />
          <Muncul aktif={k >= 3}>
            <Emo x={70} y={124} e="🧒" s={44} />
            <Emo x={150} y={124} e="🍉" s={44} />
            <Emo x={230} y={124} e="🥔" s={44} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Menimbang bahan ------------------------- */

function C3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k === 0 ? (
        <>
          <Orang x={70} y={190} nama="lili" s={0.85} tampilNama={false} />
          <Label x={130} y={96} w={150} teks="membuat kue" ukuran={14} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Label x={20} y={86} w={80} teks="gula" ukuran={13} />
          <Label x={110} y={86} w={80} teks="tepung" ukuran={13} />
          <Emo x={245} y={100} e="🥚" s={44} />
          <Label x={205} y={124} w={80} teks="telur" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Besar x={150} y={84} teks="gula 1.000 g" ukuran={32} />
          <Besar x={150} y={134} teks="tepung 1.250 g" ukuran={32} warna="#B45309" />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Emo x={150} y={62} e="🥚" s={44} />
          <TimbanganAdegan x={90} y={84} teks="250" />
          <Label x={60} y={160} w={180} teks="telur 250 gram" ukuran={14} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Mulai dari nol ------------------------- */

function C3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k === 0 ? (
        <>
          <JarumAdegan x={150} y={104} gram={0} r={52} />
          <Label x={50} y={168} w={200} teks="lihat angka awal" ukuran={14} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <JarumAdegan x={150} y={104} gram={0} r={52} />
          <Sorot x={130} y={46} w={40} h={30} />
          <Label x={40} y={168} w={220} teks="jarum harus di angka 0" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <JarumAdegan x={150} y={104} gram={1000} r={52} />
          <Label x={50} y={168} w={200} teks="bukan 0, hasil keliru" ukuran={14} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Emo x={150} y={34} e="🍎" s={34} />
          <JarumAdegan x={150} y={110} gram={0} r={52} />
          <Label x={50} y={172} w={200} teks="baru letakkan benda" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Stroberi tambahan ------------------------- */

function C3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      <Emo x={76} y={74} e="🍓" s={38} />
      <TimbanganAdegan x={16} y={92} teks="100" />
      {k >= 1 ? (
        <Muncul>
          <Emo x={226} y={66} e="🍓" s={42} />
          <TimbanganAdegan x={164} y={92} teks="500" />
        </Muncul>
      ) : null}
      {k === 2 ? <Besar x={150} y={186} teks="500 − 100" ukuran={34} warna="#DC2626" /> : null}
      {k === 3 ? <Besar x={150} y={186} teks="tambahan 400 g" ukuran={32} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [C1_1, C1_2, C1_3],
  [C2_1, C2_2, C2_3],
  [C3_1, C3_2, C3_3],
];

export const ADEGAN_VIDEO_K3B3C = SUB_C33.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 2 },
  { a: 2, k: 3 },
  { a: 2, k: 3 },
];

export const VIDEO_SIAP_K3B3C: VideoSiap[] = SUB_C33.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B3C[i], poster: POSTER[i] }));

export function VideoK3B3C({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B3C} speakGuru={speakGuru} />;
}
