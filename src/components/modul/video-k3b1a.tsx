"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { BIRU, buatAdegan, DaftarVideoCerita, Emo, KartuSvg, KubusSvg, BatangSvg, LempengSvg, Orang, PapanSvg, PetunjukSvg, PohonSvg, TiangSvg, type VideoSiap } from "./video-k3b1-umum";
import { SUB_A31 } from "./naskah-k3b1";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 1 Sub-Bab A: Bilangan dan Lambang Bilangan. Tiga    */
/* video, sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar.     */
/* Naskah satu sumber: naskah-k3b1.ts (SUB_A31.videos). Animasi SVG gratis di   */
/* perangkat. Tanpa API. Naskah: naskah/mtk-3-bab1-video-cerita.md              */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_A31.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_A31.videos[v].adegan[a];

const Besar = ({ x, y, teks, ukuran = 40, warna = BIRU }: { x: number; y: number; teks: string; ukuran?: number; warna?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={warna} stroke="#FFFFFF" strokeWidth={ukuran * 0.07} paintOrder="stroke">
    {teks}
  </text>
);

/** Angka tiga warna: ratusan hijau, puluhan biru, satuan merah. */
function Angka3({ x, y, n, ukuran = 40 }: { x: number; y: number; n: number; ukuran?: number }) {
  const t = String(n);
  const w = ukuran * 0.62;
  return (
    <g>
      {t.split("").map((d, i) => (
        <Besar key={i} x={x + (i - 1) * w} y={y} teks={d} ukuran={ukuran} warna={["#15803D", "#1D4ED8", "#DC2626"][i]} />
      ))}
    </g>
  );
}

/* ------------------------- Video 1, adegan 1: Kegiatan Pramuka ------------------------- */

function A1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      {k === 0 ? (
        <>
          <Orang x={70} y={182} nama="upe" s={0.85} tampilNama={false} />
          <Orang x={150} y={182} nama="tika" s={0.85} tampilNama={false} />
          <Orang x={230} y={182} nama="lili" s={0.85} tampilNama={false} />
          <polygon points="12,150 40,98 68,150" fill="#16A34A" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Orang x={130} y={182} nama="upe" s={0.9} tampilNama={false} />
          <Muncul tunda={0.2} dy={-10}>
            <TiangSvg x={178} y={182} tinggi={128} />
          </Muncul>
          <Label x={30} y={50} w={110} teks="ketua barung" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Orang x={110} y={182} nama="upe" s={0.9} tampilNama={false} />
          <TiangSvg x={158} y={182} tinggi={128} />
          <Muncul tunda={0.3}>
            <Emo x={230} y={110} e="📅" s={44} />
          </Muncul>
          <Label x={186} y={150} w={100} teks="selalu dibawa" ukuran={11} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Orang x={110} y={182} nama="upe" s={0.9} tampilNama={false} />
          <TiangSvg x={158} y={182} tinggi={128} />
          <Sorot x={146} y={50} w={50} h={136} />
          <Lompat>
            <Emo x={236} y={104} e="❓" s={58} />
          </Lompat>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Satuan, puluhan, ratusan ------------------------- */

function A1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {k === 0 ? (
        <>
          <Muncul>
            <KubusSvg x={118} y={78} c={64} />
          </Muncul>
          <Label x={86} y={160} w={128} teks="1 satuan" ukuran={15} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Muncul>
            <BatangSvg x={50} y={44} c={11} />
          </Muncul>
          <Muncul tunda={0.4} dx={30}>
            <KubusSvg x={118} y={140} c={11} />
          </Muncul>
          <Label x={150} y={74} w={134} teks="10 satuan" ukuran={13} />
          <Label x={150} y={110} w={134} teks="= 1 puluhan" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          {Array.from({ length: 10 }, (_, i) => (
            <Muncul key={i} tunda={i * 0.12} dy={-12}>
              <BatangSvg x={110 + i * 8} y={48} c={8} />
            </Muncul>
          ))}
          <Label x={60} y={146} w={180} teks="10 puluhan ditumpuk" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Muncul>
            <LempengSvg x={110} y={48} c={8} />
          </Muncul>
          <Sorot x={104} y={42} w={92} h={92} />
          <Label x={40} y={146} w={220} teks="100 satuan = 1 ratusan" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Tongkat 160 ------------------------- */

function A1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      {k === 0 ? (
        <>
          <Orang x={90} y={182} nama="upe" s={0.9} tampilNama={false} />
          <TiangSvg x={140} y={182} tinggi={128} />
          <line x1="190" y1="54" x2="190" y2="182" stroke={BIRU} strokeWidth="3" />
          <line x1="182" y1="54" x2="198" y2="54" stroke={BIRU} strokeWidth="3" />
          <line x1="182" y1="182" x2="198" y2="182" stroke={BIRU} strokeWidth="3" />
          <Muncul tunda={0.3}>
            <Label x={208} y={104} w={80} teks="160 cm" ukuran={15} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <PapanSvg x={30} y={64} w={76} r={1} p={6} s={0} />
          <Label x={60} y={140} w={180} teks="tongkat 160 cm" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <PapanSvg x={30} y={64} w={76} r={1} p={6} s={0} sorot={["r", "p"]} />
          <Muncul tunda={0.2}>
            <Label x={30} y={132} w={76} teks="seratus" ukuran={12} />
          </Muncul>
          <Muncul tunda={0.5}>
            <Label x={112} y={132} w={76} teks="enam puluh" ukuran={11} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <PapanSvg x={30} y={64} w={76} r={1} p={6} s={0} redup={["s"]} />
          <line x1="204" y1="70" x2="270" y2="122" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
          <Label x={40} y={140} w={220} teks="160 = seratus enam puluh" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Berjalan ke sekolah ------------------------- */

function Jalan() {
  return <path d="M10 176 Q80 134 150 164 T290 150" stroke="#C08457" strokeWidth="18" fill="none" strokeLinecap="round" />;
}

function A2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <Jalan />
      <rect x="12" y="104" width="38" height="30" fill="#FDE68A" stroke={BIRU} strokeWidth="3" />
      <polygon points="8,106 31,84 54,106" fill="#DC2626" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <rect x="226" y="86" width="64" height="48" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <polygon points="222,88 258,62 294,88" fill="#F59E0B" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      {k === 0 ? (
        <>
          <Orang x={90} y={176} nama="lili" s={0.8} tampilNama={false} />
          <Orang x={124} y={178} nama="tika" s={0.8} tampilNama={false} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Orang x={100} y={176} nama="lili" s={0.8} tampilNama={false} />
          <Muncul tunda={0.2} dy={-10}>
            <PetunjukSvg x={170} y={166} teks="671 m" w={76} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Orang x={110} y={176} nama="lili" s={0.8} tampilNama={false} />
          <Lompat>
            <Emo x={150} y={56} e="💚" s={34} />
          </Lompat>
          <Label x={70} y={80} w={160} teks="jalan kaki itu sehat" ukuran={12} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Muncul tunda={0.0}>
            <KartuSvg x={86} y={70} digit={6} warna="#BBF7D0" w={40} h={54} />
          </Muncul>
          <Muncul tunda={0.3}>
            <KartuSvg x={130} y={70} digit={7} warna="#BFDBFE" w={40} h={54} />
          </Muncul>
          <Muncul tunda={0.6}>
            <KartuSvg x={174} y={70} digit={1} warna="#FECACA" w={40} h={54} />
          </Muncul>
          <Label x={70} y={134} w={160} teks="bilangan tiga angka" ukuran={12} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Minimarket 759 ------------------------- */

function A2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {k === 0 ? (
        <>
          <Jalan />
          <rect x="200" y="84" width="84" height="52" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
          <path d="M196 86 h92 v14 h-92 z" fill="#DC2626" stroke={BIRU} strokeWidth="3" />
          <path d="M196 86 h23 v14 h-23 z M242 86 h23 v14 h-23 z" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
          <Orang x={80} y={176} nama="lili" s={0.8} tampilNama={false} />
          <Muncul tunda={0.2} dy={-10}>
            <PetunjukSvg x={150} y={168} teks="759 m" w={76} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Muncul tunda={0.0}>
            <KartuSvg x={84} y={74} digit={7} warna="#BBF7D0" w={42} h={58} />
          </Muncul>
          <Muncul tunda={0.3}>
            <KartuSvg x={129} y={74} digit={5} warna="#BFDBFE" w={42} h={58} />
          </Muncul>
          <Muncul tunda={0.6}>
            <KartuSvg x={174} y={74} digit={9} warna="#FECACA" w={42} h={58} />
          </Muncul>
          <Label x={60} y={146} w={180} teks="kartu 7, 5, dan 9" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <PapanSvg x={30} y={64} w={76} r={7} p={5} s={9} />
          <Label x={40} y={140} w={220} teks="tujuh ratus lima puluh sembilan" ukuran={12} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <PapanSvg x={30} y={54} w={76} r={7} p={5} s={9} />
          <Muncul tunda={0.1}>
            <Label x={30} y={122} w={76} teks="tujuh ratus" ukuran={11} />
          </Muncul>
          <Muncul tunda={0.35}>
            <Label x={112} y={122} w={76} teks="lima puluh" ukuran={11} />
          </Muncul>
          <Muncul tunda={0.6}>
            <Label x={194} y={122} w={76} teks="sembilan" ukuran={12} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Bilangan dengan nol ------------------------- */

function A2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {k === 0 ? (
        <>
          <PapanSvg x={30} y={64} w={76} r={7} p={0} s={3} sorot={["p"]} />
          <Label x={70} y={140} w={160} teks="puluhannya nol" ukuran={13} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Angka3 x={150} y={102} n={703} ukuran={52} />
          <Label x={30} y={124} w={240} teks="tujuh ratus tiga" ukuran={14} />
          <Label x={40} y={158} w={220} teks="bukan tujuh ratus nol tiga" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <PapanSvg x={30} y={64} w={76} r={9} p={0} s={0} redup={["p", "s"]} />
          <Label x={50} y={140} w={200} teks="sembilan ratus" ukuran={14} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <PapanSvg x={30} y={54} w={76} r={6} p={3} s={4} />
          <Label x={20} y={124} w={260} teks="enam ratus tiga puluh empat" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Ke taman kota ------------------------- */

function Taman() {
  return (
    <>
      <PohonSvg x={36} y={150} s={0.9} />
      <PohonSvg x={262} y={152} s={1} />
      <rect x="98" y="120" width="70" height="8" rx="3" fill="#8B5E34" stroke={BIRU} strokeWidth="2.4" />
      <rect x="104" y="128" width="6" height="16" fill="#8B5E34" stroke={BIRU} strokeWidth="2" />
      <rect x="156" y="128" width="6" height="16" fill="#8B5E34" stroke={BIRU} strokeWidth="2" />
    </>
  );
}

function A3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      <Taman />
      {k === 0 ? <Orang x={190} y={182} nama="tika" s={0.85} tampilNama={false} /> : null}
      {k === 1 ? (
        <>
          <Orang x={110} y={182} nama="tika" s={0.8} tampilNama={false} />
          <Muncul tunda={0.2} dy={-10}>
            <PetunjukSvg x={190} y={176} teks="572 m" w={76} />
          </Muncul>
          <Label x={30} y={50} w={240} teks="lima ratus tujuh puluh dua" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Orang x={110} y={182} nama="tika" s={0.8} tampilNama={false} />
          <Lompat>
            <Emo x={190} y={96} e="❓" s={58} />
          </Lompat>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Orang x={110} y={182} nama="tika" s={0.8} tampilNama={false} />
          <Muncul tunda={0.1}>
            <Emo x={190} y={100} e="✏️" s={52} />
          </Muncul>
          <Label x={150} y={146} w={130} teks="dengar, lalu tulis" ukuran={11} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Menulis 354 ------------------------- */

function A3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k === 0 ? (
        <>
          <Orang x={80} y={182} nama="halim" s={0.9} tampilNama={false} />
          <Muncul tunda={0.2}>
            <Label x={110} y={72} w={176} teks="tiga ratus lima puluh empat" ukuran={11} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <PapanSvg x={30} y={62} w={76} r={3} p={0} s={0} tampil={[true, false, false]} sorot={["r"]} />
          <Label x={30} y={134} w={240} teks="ratusan: tiga, ditulis 3" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <PapanSvg x={30} y={62} w={76} r={3} p={5} s={4} sorot={["p", "s"]} />
          <Label x={30} y={134} w={240} teks="puluhan 5, satuan 4" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Angka3 x={150} y={118} n={354} ukuran={78} />
          <Label x={60} y={140} w={180} teks="bilangannya 354" ukuran={14} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Nol penjaga tempat ------------------------- */

function A3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? (
        <>
          <PapanSvg x={30} y={64} w={76} r={4} p={0} s={5} sorot={["p"]} />
          <Label x={50} y={140} w={200} teks="empat ratus lima" ukuran={13} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Angka3 x={150} y={108} n={405} ukuran={64} />
          <Label x={40} y={130} w={220} teks="4 ratusan, 0 puluhan, 5 satuan" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Besar x={80} y={100} teks="405" ukuran={46} />
          <Besar x={150} y={100} teks="≠" ukuran={36} />
          <Besar x={220} y={100} teks="45" ukuran={46} warna="#DC2626" />
          <Label x={50} y={126} w={200} teks="nilainya jauh berbeda" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <PapanSvg x={30} y={64} w={76} r={4} p={0} s={5} sorot={["p"]} />
          <Lompat>
            <Emo x={150} y={42} e="🛡️" s={26} />
          </Lompat>
          <Label x={40} y={140} w={220} teks="nol menjaga tempat puluhan" ukuran={12} />
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

export const ADEGAN_VIDEO_K3B1A = SUB_A31.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 2, k: 1 },
  { a: 1, k: 2 },
  { a: 1, k: 3 },
];

export const VIDEO_SIAP_K3B1A: VideoSiap[] = SUB_A31.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B1A[i], poster: POSTER[i] }));

export function VideoK3B1A({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B1A} speakGuru={speakGuru} />;
}
