"use client";

import React from "react";
import { Lencana } from "./gambar-cara-b2";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { buatAdegan, Angka, BarisG, BIRU, DaftarVideoCerita, lebarBaris, Obj, Orang, Padi, Panah, Tanda, Ucap, type VideoSiap } from "./video-k2b4-umum";
import { Tanya } from "./video-k2b3-umum";
import { BunyiG } from "./dasar-k2b4";
import { susunPola } from "./data-k2b4";
import { SUB_B4 } from "./naskah-k2b4";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 4 Sub-Bab B: Pola. Tiga video, sembilan adegan.     */
/* Diputar satu per satu saat siswa mengetuk Putar. Naskah satu sumber:        */
/* naskah-k2b4.ts (SUB_B4.videos). Animasi SVG gratis di perangkat. Tanpa API. */
/* Naskah: naskah/mtk-2-bab4-video-cerita.md                                    */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_B4.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_B4.videos[v].adegan[a];

const ENAM = ["upe", "lili", "halim", "kira", "malosi", "tika"] as const;
const X6 = [30, 78, 126, 174, 222, 270];
const JK = ["L", "P", "L", "P", "L", "P"];

const Tag = ({ x, y, j }: { x: number; y: number; j: string }) => <Angka x={x} y={y} teks={j} r={12} isi={j === "L" ? "#BFDBFE" : "#FBCFE8"} />;

/* ------------------------- Video 1, adegan 1: Berbaris di sawah ---------------------- */

function B1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <Padi y={104} tinggi={56} />
      {ENAM.map((n, i) => (
        <Orang key={n} x={X6[i]} nama={n} s={0.7} caping angkat={k === 0 && i % 2 === 0} />
      ))}
      {k === 1
        ? ENAM.map((n, i) => (
            <Muncul key={n} skala={0.3} tunda={i * 0.2}>
              <Angka x={X6[i]} y={96} teks={String(i + 1)} isi="#FFE566" />
            </Muncul>
          ))
        : null}
      {k === 2 ? (
        <Muncul skala={0.3}>
          <path d="M14 200 H286" stroke={BIRU} strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" />
          <Ucap x={84} y={54} w={132} teks="rapi dan teratur" />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Laki-laki dan perempuan ---------------- */

function B1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {ENAM.map((n, i) => (
        <Orang key={n} x={X6[i]} nama={n} s={0.7} caping />
      ))}
      {k >= 0 && k <= 1
        ? [0, 1, 2].map((q) => {
            const i = k * 3 + q;
            return (
              <Muncul key={i} skala={0.3} tunda={q * 0.2}>
                <Tag x={X6[i]} y={96} j={JK[i]} />
              </Muncul>
            );
          })
        : null}
      {k >= 2
        ? ENAM.map((_, i) => (
            <Muncul key={i} skala={0.3} tunda={k === 2 ? i * 0.15 : 0}>
              <Tag x={X6[i]} y={96} j={JK[i]} />
            </Muncul>
          ))
        : null}
      {k === 3 ? (
        <>
          <Lencana x={150} y={62} teks="POLA" r={22} />
          <Ucap x={62} y={128} w={176} teks="berulang dan teratur" />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Mencari pola --------------------------- */

function B1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      {ENAM.map((n, i) => (
        <Orang key={n} x={X6[i]} nama={n} s={0.7} caping angkat={k === 1 && i % 2 === 0} />
      ))}
      {k === 0 ? <Tanya x={150} y={86} /> : null}
      {k === 1 ? (
        <>
          {ENAM.map((_, i) => (
            <Tag key={i} x={X6[i]} y={96} j={JK[i]} />
          ))}
          <Sorot x={10} y={112} w={282} h={88} />
          <Ucap x={40} y={46} w={220} teks="L P L P L P berulang" ukuran={11} />
        </>
      ) : null}
      {k === 2 ? <Tanya x={150} y={86} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Taplak meja ---------------------------- */

function Taplak({ x, y, w, h, warna, children }: { x: number; y: number; w: number; h: number; warna: string; children: React.ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="5" fill={warna} stroke={BIRU} strokeWidth="2.6" />
      {children}
      <path d={`M${x} ${y + h} v10 h${w} v-10`} fill="none" stroke={BIRU} strokeWidth="2" opacity="0.4" />
    </g>
  );
}

function B2_1({ k }: PropsAdegan) {
  const bunga = [0, 1, 2, 3, 4, 5];
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <Muncul dy={-10}>
        <Taplak x={30} y={44} w={240} h={52} warna="#FEF3C7">
          {bunga.map((i) => (i % 2 === 0 ? <Obj key={i} id="bunga" x={44 + i * 36} y={52} w={26} h={36} /> : <rect key={i} x={46 + i * 36} y={58} width="24" height="24" rx="2" fill="#60A5FA" stroke={BIRU} strokeWidth="2.4" />))}
        </Taplak>
      </Muncul>
      <Muncul dy={10} tunda={0.2}>
        <Taplak x={30} y={118} w={240} h={52} warna="#FCE7F3">
          <BarisG jenis="bentuk" seq={susunPola(["hati", "hati", "segitiga", "segitiga"], 8)} x={42} y={128} w={24} gap={4} />
        </Taplak>
      </Muncul>
      {k === 1 ? <Sorot x={26} y={40} w={248} h={62} /> : null}
      {k === 2 ? <Sorot x={26} y={114} w={248} h={62} /> : null}
      {k === 1 ? <Ucap x={90} y={180} w={120} teks="taplak meja 1" /> : null}
      {k === 2 ? <Ucap x={90} y={180} w={120} teks="taplak meja 2" /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Kaus dan gelas ------------------------- */

function Kaus({ x, y }: { x: number; y: number }) {
  const baris = ["#EF4444", "#3B82F6", "#EF4444", "#3B82F6", "#EF4444", "#3B82F6"];
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id="kaus-klip">
        <path d="M30 0 L52 8 Q70 18 88 8 L110 0 L136 30 L112 46 L106 38 V110 H34 V38 L28 46 L4 30 Z" />
      </clipPath>
      <g clipPath="url(#kaus-klip)">
        {baris.map((w, i) => (
          <rect key={i} x="0" y={i * 19} width="140" height="19" fill={w} />
        ))}
      </g>
      <path d="M30 0 L52 8 Q70 18 88 8 L110 0 L136 30 L112 46 L106 38 V110 H34 V38 L28 46 L4 30 Z" fill="none" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
    </g>
  );
}

function Gelas({ x, y }: { x: number; y: number }) {
  const ikan = ["#F97316", "#3B82F6", "#F97316", "#3B82F6"];
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0 L70 0 L62 100 L8 100 Z" fill="#F0F9FF" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      {ikan.map((w, i) => (
        <g key={i} transform={`translate(${14 + (i % 2) * 22} ${14 + i * 21})`}>
          <ellipse cx="14" cy="6" rx="12" ry="7" fill={w} stroke={BIRU} strokeWidth="1.6" />
          <path d="M26 6 L34 0 V12 Z" fill={w} stroke={BIRU} strokeWidth="1.4" />
          <circle cx="8" cy="4" r="1.6" fill="#FFFFFF" />
        </g>
      ))}
    </g>
  );
}

function B2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {k === 0 ? (
        <>
          <Muncul skala={0.4}>
            <Ucap x={70} y={56} w={160} teks="warna berganti teratur" ukuran={12} />
          </Muncul>
          <Muncul dx={-30}>
            <Kaus x={20} y={92} />
          </Muncul>
          <Muncul dx={30}>
            <Gelas x={210} y={86} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Kaus x={80} y={50} />
          <Sorot x={74} y={44} w={152} h={122} />
          <Ucap x={90} y={172} w={120} teks="merah, biru, ..." />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Gelas x={115} y={46} />
          <Sorot x={108} y={40} w={84} h={112} />
          <Ucap x={70} y={160} w={160} teks="warna ikan berpola" />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Pola atau bukan ------------------------ */

function B2_3({ k }: PropsAdegan) {
  const pola = susunPola(["lingkaran", "segitiga"], 6);
  const bukan = ["lingkaran", "segitiga", "segitiga", "lingkaran", "segitiga", "lingkaran"];
  const w = 30;
  const x0 = (300 - lebarBaris(6, w, 6)) / 2;
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {k === 0 ? <Tanya x={150} y={104} /> : null}
      {k === 1 ? (
        <>
          <Ucap x={50} y={70} w={200} teks="berulang dan teratur" ukuran={14} />
          <Panah x1={150} y1={100} x2={150} y2={130} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <BarisG jenis="bentuk" seq={pola} x={x0} y={82} w={w} gap={6} />
          <Tanda x={150} y={140} benar />
          <Ucap x={90} y={156} w={120} teks="ini pola" />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <BarisG jenis="bentuk" seq={bukan} x={x0} y={82} w={w} gap={6} />
          <Tanda x={150} y={140} benar={false} />
          <Ucap x={70} y={156} w={160} teks="bukan pola" />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Gerakan berpola ------------------------ */

function B3_1({ k }: PropsAdegan) {
  const w = 38;
  const seq = k === 2 ? susunPola(["tanganNaik", "berdiri"], 6) : susunPola(["membungkuk", "berdiri"], 6);
  const x0 = (300 - lebarBaris(6, w, 8)) / 2;
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      <BarisG jenis="gerakan" seq={seq} x={x0} y={82} w={w} h={w * 1.4} gap={8} baju />
      {k === 1 ? (
        <>
          <Sorot x={x0 - 4} y={78} w={2 * (w + 8) + 2} h={w * 1.4 + 8} />
          <Ucap x={70} y={160} w={160} teks="pola gerakan" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? <Ucap x={50} y={160} w={200} teks="tangan naik, berdiri" ukuran={12} /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Tepuk tangan --------------------------- */

function B3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k <= 1
        ? [1, 2, 3, 4].map((n, g) => (
            <Muncul key={n} skala={0.4} tunda={g * 0.2}>
              <rect x={18 + g * 70} y={88} width="60" height="56" rx="10" fill="#FFF7CC" stroke={BIRU} strokeWidth="3" />
              {Array.from({ length: n }, (_, i) => (
                <circle key={i} cx={34 + g * 70 + (i % 2) * 24} cy={106 + Math.floor(i / 2) * 22} r="9" fill="#F0AB00" stroke={BIRU} strokeWidth="2.4" />
              ))}
              <text x={48 + g * 70} y={160} textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
                tepuk {n}
              </text>
            </Muncul>
          ))
        : null}
      {k === 1 ? (
        <Muncul skala={0.3}>
          <path d="M264 80 Q150 36 36 80" fill="none" stroke={BIRU} strokeWidth="3.4" strokeDasharray="8 6" />
          <path d="M44 70 L34 82 L50 86" fill="none" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          <Ucap x={100} y={44} w={100} teks="ulangi" />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <>
          <svg x={90} y={52} width={120} height={120} viewBox="0 0 100 100" overflow="visible">
            <BunyiG bunyi="keras" />
          </svg>
          <Ucap x={90} y={168} w={120} teks="pola suara" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Pola di sekitar kita ------------------- */

function B3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? (
        <>
          <Orang x={60} nama="kira" angkat />
          <Muncul dx={40}>
            <Obj id="kotak" x={140} y={130} w={44} h={44} />
          </Muncul>
          <Muncul dx={40} tunda={0.2}>
            <Obj id="bunga" x={200} y={104} w={34} h={56} />
          </Muncul>
          <Muncul dx={40} tunda={0.4}>
            <Obj id="bola" x={248} y={138} w={30} h={30} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <Muncul skala={0.4}>
          <rect x="36" y="50" width="228" height="120" rx="8" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
          <path d="M150 50 V170 M36 80 H264" stroke={BIRU} strokeWidth="2.4" />
          <text x="93" y="70" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>Pola Warna</text>
          <text x="207" y="70" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>Pola Bentuk</text>
          <BarisG jenis="warna" seq={["merah", "biru", "merah", "biru"]} x={50} y={104} w={22} gap={4} />
          <BarisG jenis="bentuk" seq={["hati", "segitiga", "hati", "segitiga"]} x={164} y={104} w={22} gap={4} />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <>
          {ENAM.map((n, i) => (
            <Lompat key={n} aktif={i % 2 === 0}>
              <Orang x={X6[i]} nama={n} s={0.62} tampilNama={false} angkat={i % 2 === 0} />
            </Lompat>
          ))}
          <Ucap x={50} y={60} w={200} teks="gerakan dan suara" ukuran={12} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Lompat>
            <Orang x={150} nama="kira" s={0.95} angkat />
          </Lompat>
          <Label x={70} y={50} w={160} teks="Kelompokku maju!" ukuran={12} />
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

export const ADEGAN_VIDEO_K2B4B = SUB_B4.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 3 },
  { a: 0, k: 1 },
  { a: 0, k: 0 },
];

export const VIDEO_SIAP_K2B4B: VideoSiap[] = SUB_B4.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B4B[i], poster: POSTER[i] }));

export function VideoK2B4B({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K2B4B} speakGuru={speakGuru} />;
}
