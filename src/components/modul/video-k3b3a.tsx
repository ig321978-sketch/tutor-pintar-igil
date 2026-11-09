"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { Besar, buatAdegan, DaftarVideoCerita, Emo, MeteranGulung, Orang, PenggarisAdegan, PensilAdegan, PitaMeter, type VideoSiap } from "./video-k3b3-umum";
import { SUB_A33 } from "./naskah-k3b3";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 3 Sub-Bab A: Pengukuran Panjang dengan Satuan Baku.   */
/* Tiga video, sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar.  */
/* Naskah satu sumber: naskah-k3b3.ts (SUB_A33.videos). Animasi SVG gratis di     */
/* perangkat. Tanpa API. Naskah: naskah/mtk-3-bab3-video-cerita.md                */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_A33.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_A33.videos[v].adegan[a];

/* ------------------------- Video 1, adegan 1: Ke posyandu ------------------------- */

function A1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      {k === 0 ? (
        <>
          <Emo x={150} y={112} e="🏥" s={72} />
          <Label x={90} y={150} w={120} teks="Posyandu" ukuran={15} />
        </>
      ) : null}
      {k === 1 ? (
        <Muncul>
          <Orang x={60} y={190} nama="tika" s={0.8} tampilNama={false} />
          <Emo x={160} y={116} e="👶" s={54} />
          <Emo x={236} y={112} e="⚖️" s={44} />
          <Label x={70} y={150} w={160} teks="tinggi dan berat badan" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <>
          <rect x="130" y="46" width="22" height="130" rx="6" fill="#FEF3C7" stroke="#1C01A5" strokeWidth="3" />
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1="130" x2={i % 2 === 0 ? 142 : 138} y1={58 + i * 13} y2={58 + i * 13} stroke="#1C01A5" strokeWidth="2" />
          ))}
          <Lompat>
            <Emo x={216} y={110} e="❓" s={56} />
          </Lompat>
          <Label x={30} y={96} w={84} teks="alat ukur" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Besar x={150} y={112} teks="cm • m" ukuran={56} />
          <Label x={70} y={140} w={160} teks="satuan baku?" ukuran={14} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Satuan tidak baku ------------------------- */

function A1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <rect x="40" y="96" width="220" height="16" rx="5" fill="#D6A56B" stroke="#1C01A5" strokeWidth="3" />
      <rect x="52" y="112" width="8" height="46" fill="#B07A3E" stroke="#1C01A5" strokeWidth="2" />
      <rect x="240" y="112" width="8" height="46" fill="#B07A3E" stroke="#1C01A5" strokeWidth="2" />
      {k === 0 ? (
        <Muncul>
          {[0, 1, 2].map((i) => (
            <Emo key={i} x={72 + i * 62} y={82} e="🖐️" s={34} />
          ))}
          <Label x={74} y={44} w={152} teks="meja diukur jengkal" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 1 ? (
        <>
          <Orang x={56} y={198} nama="lili" s={0.62} tampilNama={false} />
          <Orang x={244} y={198} nama="halim" s={0.62} tampilNama={false} />
          <Label x={32} y={40} w={96} teks="jengkal Lili" ukuran={12} />
          <Label x={172} y={40} w={104} teks="jengkal Halim" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Besar x={150} y={78} teks="7 ≠ 8" ukuran={46} warna="#B45309" />
          <Label x={50} y={134} w={200} teks="hasil ukur bisa berbeda" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Besar x={150} y={76} teks="cm • m" ukuran={44} warna="#16A34A" />
          <Label x={50} y={134} w={200} teks="satuan baku yang sama" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Satuan baku panjang ------------------------- */

function A1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      {k === 0 ? (
        <>
          <Besar x={80} y={118} teks="cm" ukuran={52} />
          <Besar x={220} y={118} teks="m" ukuran={52} warna="#B45309" />
          <Label x={30} y={140} w={100} teks="sentimeter" ukuran={13} />
          <Label x={170} y={140} w={100} teks="meter" ukuran={13} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Besar x={150} y={96} teks="cm • m" ukuran={50} />
          <Label x={30} y={116} w={240} teks="sentimeter = cm, meter = m" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <PenggarisAdegan x={20} y={88} cm={20} skala={13} />
          <Label x={74} y={140} w={152} teks="penggaris: cm" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <MeteranGulung x={30} y={56} s={1.2} />
          <PitaMeter x={30} y={132} meter={2} skala={110} />
          <Label x={96} y={80} w={150} teks="meter dan cm" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Siapkan alat ------------------------- */

function A2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <rect x="14" y="128" width="272" height="14" rx="5" fill="#D6A56B" stroke="#1C01A5" strokeWidth="3" />
      {k >= 1 ? (
        <Muncul>
          <Emo x={60} y={114} e="✏️" s={34} />
          <Emo x={120} y={112} e="📖" s={34} />
          <Emo x={180} y={114} e="🎒" s={34} />
          <Emo x={240} y={114} e="📏" s={34} />
        </Muncul>
      ) : null}
      {k === 0 ? <Label x={40} y={60} w={220} teks="pensil, buku, kotak pensil" ukuran={13} /> : null}
      {k === 1 ? <Label x={50} y={160} w={200} teks="di atas meja" ukuran={14} /> : null}
      {k === 2 ? <Sorot x={216} y={92} w={48} h={44} /> : null}
      {k === 2 ? <Label x={60} y={160} w={180} teks="penggaris = alat ukur" ukuran={13} /> : null}
      {k === 3 ? <Label x={60} y={160} w={180} teks="ukur panjang tiap benda" ukuran={13} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Mulai dari nol ------------------------- */

function A2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      <PenggarisAdegan x={20} y={110} cm={20} skala={13} sorot={k === 1 ? 0 : null} />
      <PensilAdegan x={20} y={110} cm={15} />
      {k === 0 ? <Label x={34} y={60} w={232} teks="ujung penggaris = ujung pensil" ukuran={12} /> : null}
      {k === 1 ? <Label x={62} y={60} w={176} teks="ujung pensil di angka 0" ukuran={12} /> : null}
      {k === 2 ? <Sorot x={206} y={72} w={20} h={74} /> : null}
      {k === 2 ? <Label x={50} y={160} w={200} teks="lihat ujung yang lain" ukuran={13} /> : null}
      {k === 3 ? <Besar x={150} y={176} teks="angka itu panjangnya" ukuran={22} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Tulis hasilnya ------------------------- */

function A2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <PenggarisAdegan x={20} y={96} cm={20} skala={13} sorot={k === 0 ? 15 : null} />
      <PensilAdegan x={20} y={96} cm={15} />
      {k === 0 ? <Label x={52} y={150} w={196} teks="ujung lain di angka 15" ukuran={13} /> : null}
      {k === 1 ? <Besar x={150} y={174} teks="15 sentimeter" ukuran={34} warna="#16A34A" /> : null}
      {k === 2 ? <Besar x={150} y={176} teks="15 cm" ukuran={46} warna="#16A34A" /> : null}
      {k === 3 ? <Label x={50} y={150} w={200} teks="satuan: sentimeter" ukuran={14} /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Benda panjang ------------------------- */

function A3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k === 0 ? (
        <>
          <MeteranGulung x={86} y={70} s={1.5} />
          <Label x={56} y={150} w={188} teks="meteran: benda panjang" ukuran={13} />
        </>
      ) : null}
      {k === 1 ? (
        <Muncul>
          <Emo x={70} y={104} e="📺" s={44} />
          <Emo x={150} y={104} e="🚪" s={50} />
          <Emo x={230} y={104} e="🛏️" s={44} />
          <Label x={50} y={148} w={200} teks="televisi, pintu, tempat tidur" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <>
          <Emo x={90} y={110} e="🚪" s={70} />
          <Lompat>
            <Emo x={210} y={108} e="❓" s={56} />
          </Lompat>
          <Label x={150} y={150} w={140} teks="alat untuk pintu?" ukuran={12} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Emo x={80} y={112} e="🚪" s={60} />
          <MeteranGulung x={160} y={86} s={1.1} />
          <Label x={50} y={152} w={200} teks="pintu panjang: meteran" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Cara memakai meteran ------------------------- */

function A3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      <MeteranGulung x={12} y={56} s={0.9} />
      <PitaMeter x={86} y={84} meter={2} skala={96} sorot={k === 1 ? 0 : null} />
      {k === 0 ? <Label x={66} y={140} w={168} teks="seperti penggaris" ukuran={13} /> : null}
      {k === 1 ? <Label x={70} y={140} w={160} teks="mulai dari angka 0" ukuran={13} /> : null}
      {k === 2 ? <Label x={60} y={140} w={180} teks="satuan: m dan cm" ukuran={13} /> : null}
      {k === 3 ? (
        <>
          <Emo x={120} y={170} e="📍" s={30} />
          <Emo x={260} y={170} e="📍" s={30} />
          <Label x={100} y={140} w={110} teks="jarak dua benda" ukuran={11} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Memilih alat ------------------------- */

function A3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? (
        <>
          <Emo x={70} y={104} e="✏️" s={50} />
          <Emo x={190} y={106} e="📏" s={56} />
          <Besar x={130} y={110} teks="→" ukuran={34} warna="#B45309" />
          <Label x={50} y={148} w={200} teks="benda pendek: penggaris" ukuran={13} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <rect x="44" y="56" width="62" height="86" rx="6" fill="#D6A56B" stroke="#1C01A5" strokeWidth="3" />
          <line x1="75" x2="75" y1="56" y2="142" stroke="#1C01A5" strokeWidth="2" />
          <MeteranGulung x={156} y={84} s={1.1} />
          <Label x={50} y={150} w={200} teks="benda panjang: meteran" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Orang x={70} y={190} nama="kira" s={0.85} tampilNama={false} />
          <MeteranGulung x={150} y={80} s={1.1} />
          <Label x={30} y={44} w={240} teks="tinggi badan: meteran" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Besar x={150} y={100} teks="✓" ukuran={64} warna="#16A34A" />
          <Label x={50} y={134} w={200} teks="alat yang tepat" ukuran={14} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [A1_1, A1_2, A1_3],
  [A2_1, A2_2, A2_3],
  [A3_1, A3_2, A3_3],
];

export const ADEGAN_VIDEO_K3B3A = SUB_A33.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 2, k: 2 },
  { a: 2, k: 2 },
  { a: 0, k: 3 },
];

export const VIDEO_SIAP_K3B3A: VideoSiap[] = SUB_A33.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B3A[i], poster: POSTER[i] }));

export function VideoK3B3A({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B3A} speakGuru={speakGuru} />;
}
