"use client";

import React from "react";
import { Lencana } from "./gambar-cara-b2";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { buatAdegan, Angka, BIRU, VideoCeritaSatuLayar, MangkukNasi, Obj, Orang, Padi, Panah, Ucap, type VideoSiap } from "./video-k2b4-umum";
import { PoseG } from "./dasar-k2b4";
import { SUB_A4 } from "./naskah-k2b4";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 4 Sub-Bab A: Posisi Benda. Tiga video, sembilan     */
/* adegan. Diputar satu per satu saat siswa mengetuk Putar. Naskah satu        */
/* sumber: naskah-k2b4.ts (SUB_A4.videos). Animasi SVG gratis di perangkat.    */
/* Tanpa API. Naskah: naskah/mtk-2-bab4-video-cerita.md                         */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_A4.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_A4.videos[v].adegan[a];

const ENAM = ["upe", "lili", "halim", "kira", "malosi", "tika"] as const;
const X6 = [30, 78, 126, 174, 222, 270];

/** Petani membungkuk atau berdiri, di dalam kotak sendiri. */
function Petani({ x, y, w = 40, pose = "membungkuk" }: { x: number; y: number; w?: number; pose?: string }) {
  return (
    <g>
      <svg x={x} y={y} width={w} height={w * 1.1} viewBox="0 0 100 100" overflow="visible">
        <PoseG pose={pose} baju="#F59E0B" />
      </svg>
      <ellipse cx={x + w * (pose === "membungkuk" ? 0.8 : 0.5)} cy={y + w * (pose === "membungkuk" ? 0.2 : 0.1)} rx={w * 0.2} ry={w * 0.06} fill="#E8C468" stroke={BIRU} strokeWidth="1.4" />
    </g>
  );
}

/** Anak dilihat dari belakang. (x, y) tengah dasar. */
function AnakBelakang({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-6 0 V-18 M6 0 V-18" stroke={BIRU} strokeWidth="5" strokeLinecap="round" />
      <rect x="-13" y="-52" width="26" height="36" rx="9" fill="#34D399" stroke={BIRU} strokeWidth="2.4" />
      <path d="M-13 -44 L-22 -26 M13 -44 L22 -26" stroke="#F3C9A0" strokeWidth="5" strokeLinecap="round" />
      <circle cx="0" cy="-64" r="14" fill="#1F2937" stroke={BIRU} strokeWidth="2.4" />
    </g>
  );
}

/* ------------------------- Video 1, adegan 1: Ke sawah bersama Paman ---------------- */

function A1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <Padi y={104} tinggi={56} />
      {k === 0 ? (
        <>
          <Muncul dx={-40} dy={-10}>
            <Obj id="burung" x={40} y={52} w={34} h={26} />
          </Muncul>
          <Muncul dx={40} dy={-10} tunda={0.3}>
            <Obj id="burung" x={230} y={42} w={30} h={22} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          {ENAM.map((n, i) => (
            <Muncul key={n} dy={14} tunda={i * 0.12}>
              <Orang x={84 + i * 40} nama={n} s={0.6} tampilNama={false} caping />
            </Muncul>
          ))}
          <Lompat>
            <Orang x={34} nama="paman" s={0.95} angkat caping />
          </Lompat>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Petani x={30} y={96} w={46} />
          <Petani x={118} y={104} w={42} />
          <Petani x={210} y={98} w={46} />
          {ENAM.map((n, i) => (
            <Orang key={n} x={X6[i]} nama={n} s={0.6} tampilNama={false} caping angkat={i % 2 === 0} />
          ))}
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Padi dan nasi ------------------------- */

function Batang({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 60 Q-4 20 14 -4" fill="none" stroke="#C9A227" strokeWidth="3" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse key={i} cx={10 + i * 1.5} cy={-2 + i * 7} rx="4" ry="7" fill="#E8B923" stroke="#B8860B" strokeWidth="0.9" transform={`rotate(${20 - i * 4} ${10 + i * 1.5} ${-2 + i * 7})`} />
      ))}
    </g>
  );
}

function A1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {k === 0 ? (
        <>
          <Batang x={70} y={64} s={1.5} />
          <Muncul skala={0.3} tunda={0.3}>
            <Panah x1={116} y1={104} x2={180} y2={104} />
          </Muncul>
          <Muncul skala={0.3} tunda={0.6}>
            <MangkukNasi x={226} y={128} s={1.5} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Padi y={112} tinggi={36} />
          <Petani x={60} y={86} w={56} pose="berdiri" />
          {[130, 160, 190, 220].map((x, i) => (
            <Muncul key={x} tunda={i * 0.2} dy={-10}>
              <Batang x={x} y={118} s={0.5} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k >= 2 ? (
        <>
          <Orang x={70} nama="paman" caping />
          <MangkukNasi x={200} y={150} s={1.3} />
        </>
      ) : null}
      {k === 2 ? (
        <Muncul>
          <Ucap x={100} y={48} w={160} teks="Jangan disia-siakan!" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <>
          <Lompat>
            <Orang x={70} nama="paman" s={0.9} angkat caping tampilNama={false} />
          </Lompat>
          <Muncul skala={0.3}>
            <path d="M200 66 C184 50 162 62 200 88 C238 62 216 50 200 66 Z" fill="#EF4444" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
          </Muncul>
          <Label x={104} y={168} w={190} teks="Hargai jerih payah petani" ukuran={11} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Siapa di sebelah mana ----------------- */

function A1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      <Padi y={110} tinggi={50} />
      {ENAM.map((n, i) => (
        <Orang key={n} x={X6[i]} nama={n} s={0.7} caping />
      ))}
      {k === 0 ? (
        <>
          <Muncul dy={-10}>
            <Obj id="burung" x={52} y={44} w={32} h={24} />
          </Muncul>
          <Muncul dy={-10} tunda={0.3}>
            <Obj id="burung" x={220} y={50} w={28} h={22} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Sorot x={104} y={118} w={44} h={78} />
          <Muncul skala={0.3}>
            <Panah x1={86} y1={104} x2={122} y2={104} />
            <Ucap x={52} y={60} w={116} teks="di sebelah kanan Lili" />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Sorot x={152} y={118} w={44} h={78} />
          <Muncul skala={0.3}>
            <Panah x1={214} y1={104} x2={178} y2={104} />
            <Ucap x={140} y={60} w={120} teks="di sebelah kiri Malosi" />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Obj id="burung" x={110} y={36} w={60} h={46} />
          <Panah x1={140} y1={86} x2={140} y2={112} />
          <Ucap x={176} y={46} w={116} teks="di atas padi" />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Kupu-kupu dan bunga ------------------- */

function A2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {k === 0 ? (
        <>
          <Muncul dx={-30}>
            <Obj id="kupu" x={50} y={70} w={44} h={36} />
          </Muncul>
          <Muncul dx={30}>
            <Obj id="bunga" x={196} y={90} w={44} h={70} />
          </Muncul>
        </>
      ) : null}
      {k >= 1 ? (
        <>
          <Obj id="bunga" x={112} y={90} w={76} h={70} />
          <Obj id="kupu" x={120} y={38} w={60} h={50} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Panah x1={206} y1={110} x2={206} y2={64} />
          <Ucap x={210} y={110} w={80} teks="di atas" />
          <Sorot x={116} y={34} w={68} h={58} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Panah x1={206} y1={62} x2={206} y2={108} />
          <Ucap x={210} y={110} w={80} teks="di bawah" />
          <Sorot x={108} y={88} w={84} h={74} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Burung dan ulat ----------------------- */

function A2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      <Muncul dx={20}>
        <Obj id="burung" x={170} y={100} w={90} h={66} />
      </Muncul>
      {k >= 1 ? (
        <Muncul dx={-20}>
          <Obj id="ulat" x={40} y={134} w={96} h={34} />
        </Muncul>
      ) : null}
      {k >= 1 ? <Panah x1={140} y1={92} x2={198} y2={92} /> : null}
      {k === 0 ? (
        <>
          <Sorot x={164} y={96} w={102} h={76} />
          <Ucap x={176} y={56} w={96} teks="di depan" />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Sorot x={34} y={130} w={108} h={42} />
          <Ucap x={40} y={90} w={96} teks="di belakang" />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Ucap x={176} y={56} w={96} teks="depan" />
          <Ucap x={40} y={90} w={96} teks="belakang" />
          <Lencana x={150} y={68} teks="lawan" r={22} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Kata yang berlawanan ------------------ */

function A2_3({ k }: PropsAdegan) {
  const pasang: [string, string][] = [["atas", "bawah"], ["depan", "belakang"], ["kanan", "kiri"]];
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {k <= 2 ? (
        <Muncul skala={0.4}>
          {k < 2 ? (
            <>
              <Ucap x={90} y={50} w={120} teks={pasang[k][0]} ukuran={14} />
              <Panah x1={150} y1={80} x2={150} y2={118} />
              <Panah x1={162} y1={118} x2={162} y2={80} />
              <Ucap x={90} y={124} w={120} teks={pasang[k][1]} ukuran={14} />
            </>
          ) : (
            <>
              <Ucap x={30} y={92} w={100} teks="kanan" ukuran={14} />
              <Panah x1={136} y1={100} x2={166} y2={100} />
              <Panah x1={166} y1={112} x2={136} y2={112} />
              <Ucap x={170} y={92} w={100} teks="kiri" ukuran={14} />
            </>
          )}
        </Muncul>
      ) : null}
      {k === 3 ? (
        <>
          <Obj id="meja" x={90} y={106} w={120} h={70} />
          <Muncul dy={-20}>
            <Obj id="bola" x={132} y={88} w={36} h={36} />
          </Muncul>
          <Ucap x={20} y={44} w={140} teks="bola di atas meja" />
          <Ucap x={150} y={178} w={140} teks="meja di bawah bola" />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Burung dan rumput --------------------- */

function A3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      <Obj id="burung" x={46} y={96} w={80} h={66} />
      <Obj id="rumput" x={178} y={102} w={80} h={62} />
      {k === 0 ? <Ucap x={36} y={56} w={100} teks="di kiri rumput" /> : null}
      {k === 1 ? <Ucap x={170} y={56} w={110} teks="di kanan burung" /> : null}
      {k === 2 ? (
        <>
          <Ucap x={40} y={56} w={90} teks="kiri" ukuran={14} />
          <Ucap x={176} y={56} w={90} teks="kanan" ukuran={14} />
          <Label x={96} y={172} w={108} teks="kita yang membaca" ukuran={11} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Anak membelakangi kita ---------------- */

function A3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      <AnakBelakang x={150} y={196} s={1.15} />
      {k >= 1 ? (
        <Muncul dx={-30}>
          <Obj id="ayam" x={30} y={112} w={64} h={64} />
        </Muncul>
      ) : null}
      {k >= 2 ? (
        <Muncul dx={30}>
          <Obj id="rumput" x={216} y={116} w={64} h={52} />
        </Muncul>
      ) : null}
      {k === 1 ? <Ucap x={20} y={72} w={118} teks="ayam di kiri saya" ukuran={10} /> : null}
      {k === 2 ? <Ucap x={162} y={72} w={130} teks="rumput di kanan saya" ukuran={10} /> : null}
      {k === 3 ? (
        <>
          <Panah x1={150} y1={90} x2={150} y2={46} />
          <Ucap x={176} y={52} w={100} teks="arah yang sama" ukuran={10} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Ayo bermain petunjuk ------------------ */

function A3_3({ k }: PropsAdegan) {
  const nama = ["kira", "malosi", "tika"] as const;
  const xs = [52, 150, 248];
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {nama.map((n, i) => (
        <Lompat key={n} aktif={k === 0 || (k === 1 && i === 0) || (k === 2 && i === 1) || (k === 3 && i === 2)}>
          <Orang x={xs[i]} nama={n} s={0.78} angkat={(k === 1 && i === 0) || (k === 2 && i === 1) || (k === 3 && i === 2)} />
        </Lompat>
      ))}
      {k === 0 ? (
        <Muncul skala={0.3}>
          {xs.map((x, i) => (
            <Angka key={x} x={x} y={96} teks={String(i + 1)} isi="#FFE566" />
          ))}
        </Muncul>
      ) : null}
      {k === 1 ? (
        <Muncul dy={-10}>
          <rect x="22" y="76" width="60" height="38" rx="4" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.6" />
          <path d="M30 88 H74 M30 98 H70 M30 106 H62" stroke="#94A3B8" strokeWidth="2" />
        </Muncul>
      ) : null}
      {k >= 2 ? <Obj id="meja" x={112} y={84} w={76} h={46} /> : null}
      {k === 2 ? (
        <Muncul dy={-14}>
          <Obj id="buku" x={138} y={80} w={24} h={16} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <>
          <Muncul skala={0.4}>
            <Obj id="buku" x={138} y={106} w={24} h={16} />
          </Muncul>
          <Ucap x={90} y={44} w={120} teks="buku di bawah meja" />
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

export const ADEGAN_VIDEO_K2B4A = SUB_A4.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

export const VIDEO_SIAP_K2B4A: VideoSiap[] = SUB_A4.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B4A[i] }));

export function VideoK2B4A({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <VideoCeritaSatuLayar subBab={SUB_A4} videos={VIDEO_SIAP_K2B4A} speakGuru={speakGuru} />;
}
