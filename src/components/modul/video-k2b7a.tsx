"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { AngkaBesar, BarisWadah, buatAdegan, BIRU, DaftarVideoCerita, Emo, ItemMini, IkanSebar, Orang, Panah, PapanSvg, WadahSvg, type VideoSiap } from "./video-k2b7-umum";
import { SUB_A7 } from "./naskah-k2b7";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 7 Sub-Bab A: Menghitung, Membaca, dan Menulis       */
/* Bilangan sampai 100. Tiga video, sembilan adegan. Diputar satu per satu saat  */
/* siswa mengetuk Putar. Naskah satu sumber: naskah-k2b7.ts (SUB_A7.videos).     */
/* Animasi SVG gratis di perangkat. Tanpa API.                                  */
/* Naskah: naskah/mtk-2-bab7-video-cerita.md                                    */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_A7.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_A7.videos[v].adegan[a];

/** Lapak kue cubit: meja dan atap bergaris. */
function Lapak() {
  return (
    <g>
      <path d="M26 54 H274 L284 80 H16 Z" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      {[0, 2, 4, 6, 8, 10].map((i) => (
        <path key={i} d={`M${26 + i * 20.7} 54 H${26 + (i + 1) * 20.7} L${16 + (i + 1) * 21.7} 80 H${16 + i * 21.7} Z`} fill="#EF4444" />
      ))}
      <rect x="30" y="128" width="240" height="34" rx="6" fill="#C08457" stroke={BIRU} strokeWidth="3" />
      <rect x="30" y="128" width="240" height="9" rx="4" fill="#E0A872" stroke={BIRU} strokeWidth="2" />
    </g>
  );
}

/** Banyak wadah dalam satu baris-baris dengan angka kelipatan sepuluh di bawah tiap wadah. */
function Kelipatan({ n, kolom, w, h, gap }: { n: number; kolom: number; w: number; h: number; gap: number }) {
  const x0 = (300 - (kolom * w + (kolom - 1) * gap)) / 2;
  return (
    <g>
      <BarisWadah jenis="kue" n={n} x={x0} y={64} w={w} h={h} kolom={kolom} gap={gap} />
      {Array.from({ length: n }, (_, i) => (
        <text key={i} x={x0 + (i % kolom) * (w + gap) + w / 2} y={64 + Math.floor(i / kolom) * (h + gap + 6) + h + 11} textAnchor="middle" fontSize="10" fontWeight="900" fill={BIRU}>
          {(i + 1) * 10}
        </text>
      ))}
    </g>
  );
}

/* ------------------------- Video 1, adegan 1: Penjual kue cubit ------------------ */

function A1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      {k === 0 ? (
        <>
          <Orang x={150} y={162} nama="paman" s={1.2} tampilNama={false} angkat />
          <Lapak />
          <Muncul tunda={0.3}>
            <Label x={104} y={168} w={92} teks="Pak Ahmad" ukuran={12} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Lompat>
            <ItemMini jenis="kue" x={150} y={98} r={36} />
          </Lompat>
          <Muncul tunda={0.3}>
            <Emo x={236} y={112} e="🍫" s={34} />
          </Muncul>
          <Label x={60} y={160} w={180} teks="kue tradisional Betawi" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Muncul skala={0.5}>
            <WadahSvg jenis="kue" x={90} y={62} w={120} h={72} />
          </Muncul>
          <Muncul tunda={0.4}>
            <Label x={70} y={150} w={160} teks="1 bungkus = 10 kue" ukuran={13} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <BarisWadah jenis="kue" n={10} x={25} y={48} w={46} h={28} kolom={5} gap={6} />
          <Lompat>
            <Emo x={150} y={152} e="❓" s={44} />
          </Lompat>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Satu bungkus, satu puluhan --------- */

function A1_2({ k }: PropsAdegan) {
  const sepuluh = (x0: number, y0: number) => (
    <g>
      {Array.from({ length: 10 }, (_, i) => (
        <Muncul key={i} tunda={i * 0.06} dy={-8}>
          <ItemMini jenis="kue" x={x0 + (i % 5) * 20} y={y0 + Math.floor(i / 5) * 20} r={8} />
        </Muncul>
      ))}
    </g>
  );
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {k === 0 ? (
        <>
          {sepuluh(36, 82)}
          <Muncul tunda={0.7}>
            <Panah x1={134} y1={92} x2={170} y2={92} />
          </Muncul>
          <Muncul tunda={0.9} skala={0.4}>
            <WadahSvg jenis="kue" x={176} y={62} w={96} h={60} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          {sepuluh(30, 76)}
          <text x="140" y="96" textAnchor="middle" fontSize="34" fontWeight="900" fill={BIRU}>
            =
          </text>
          <WadahSvg jenis="kue" x={168} y={56} w={104} h={64} />
          <Label x={22} y={130} w={106} teks="10 satuan" ukuran={13} />
          <Label x={176} y={130} w={90} teks="1 puluhan" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Kelipatan n={5} kolom={5} w={46} h={30} gap={6} />
          <Muncul tunda={0.6}>
            <Label x={74} y={140} w={152} teks="5 puluhan = 50" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Kelipatan n={6} kolom={6} w={38} h={28} gap={4} />
          <Muncul tunda={0.6}>
            <Label x={74} y={140} w={152} teks="6 puluhan = 60" ukuran={14} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Sampai seratus --------------------- */

function A1_3({ k }: PropsAdegan) {
  const n = [7, 8, 9, 10][k];
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      <BarisWadah jenis="kue" n={n} x={25} y={60} w={44} h={28} kolom={5} gap={6} />
      <Muncul key={k} skala={0.4}>
        <AngkaBesar x={150} y={164} teks={String(n * 10)} w={k === 3 ? 120 : 90} />
      </Muncul>
      {k === 3 ? (
        <Muncul tunda={0.4}>
          <Label x={216} y={152} w={78} teks="seratus" ukuran={13} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Rambutan Halim --------------------- */

const KANOPI: [number, number][] = [[54, 74], [76, 58], [100, 70], [64, 92], [92, 92], [112, 86], [80, 76]];

function A2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {k === 0 ? (
        <>
          <rect x="74" y="104" width="14" height="48" rx="3" fill="#92400E" stroke={BIRU} strokeWidth="3" />
          <circle cx="80" cy="76" r="36" fill="#4ADE80" stroke={BIRU} strokeWidth="3" />
          <circle cx="54" cy="92" r="24" fill="#4ADE80" stroke={BIRU} strokeWidth="3" />
          <circle cx="108" cy="92" r="24" fill="#4ADE80" stroke={BIRU} strokeWidth="3" />
          <circle cx="80" cy="88" r="30" fill="#4ADE80" />
          {KANOPI.map(([a, b], i) => (
            <Muncul key={i} tunda={0.2 + i * 0.1} dy={-6}>
              <ItemMini jenis="rambutan" x={a} y={b} r={5} />
            </Muncul>
          ))}
          <Lompat>
            <Orang x={216} y={196} nama="halim" s={1} angkat />
          </Lompat>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <WadahSvg jenis="rambutan" x={90} y={66} w={120} h={72} />
          <Muncul tunda={0.3}>
            <Label x={56} y={152} w={188} teks="1 keranjang = 10 buah" ukuran={13} />
          </Muncul>
        </>
      ) : null}
      {k >= 2 ? (
        <>
          <BarisWadah jenis="rambutan" n={5} x={22} y={48} w={46} h={30} kolom={5} gap={6} />
          {[0, 1, 2].map((i) => (
            <Muncul key={i} tunda={0.3 + i * 0.2} dy={-8}>
              <ItemMini jenis="rambutan" x={34 + i * 28} y={124} r={10} />
            </Muncul>
          ))}
          <Label x={22} y={82} w={110} teks="5 puluhan" ukuran={12} />
          <Label x={22} y={138} w={110} teks="3 satuan" ukuran={12} />
        </>
      ) : null}
      {k === 3 ? (
        <Muncul tunda={0.3}>
          <AngkaBesar x={150} y={184} teks="50 + 3 = 53" w={188} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Kelereng ayah Malosi --------------- */

function A2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {k === 0 ? (
        <>
          <Orang x={70} y={196} nama="malosi" s={1} angkat />
          {Array.from({ length: 12 }, (_, i) => (
            <Muncul key={i} tunda={0.2 + i * 0.07} dy={-10}>
              <ItemMini jenis="kelereng" i={i} x={150 + (i % 4) * 24} y={130 + Math.floor(i / 4) * 20} r={9} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 1 ? (
        <>
          <WadahSvg jenis="kelereng" x={90} y={70} w={120} h={72} />
          <Label x={56} y={154} w={188} teks="1 kantong = 10 kelereng" ukuran={12} />
        </>
      ) : null}
      {k >= 2 ? (
        <>
          <BarisWadah jenis="kelereng" n={6} x={22} y={48} w={38} h={28} kolom={6} gap={6} />
          {Array.from({ length: 7 }, (_, i) => (
            <Muncul key={i} tunda={0.3 + i * 0.1} dy={-8}>
              <ItemMini jenis="kelereng" i={i} x={32 + i * 22} y={124} r={9} />
            </Muncul>
          ))}
          <Label x={22} y={82} w={110} teks="6 puluhan" ukuran={12} />
          <Label x={22} y={138} w={110} teks="7 satuan" ukuran={12} />
        </>
      ) : null}
      {k === 3 ? (
        <Muncul tunda={0.3}>
          <AngkaBesar x={150} y={184} teks="60 + 7 = 67" w={188} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Dua cara menulis ------------------- */

function A2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {k === 0 ? (
        <>
          <Muncul dx={-20}>
            <Label x={10} y={74} w={134} teks="Nilai tempat" ukuran={14} />
            <PapanSvg x={44} y={110} p={5} s={3} w={26} />
          </Muncul>
          <Muncul dx={20} tunda={0.4}>
            <Label x={156} y={74} w={134} teks="Pasangan bilangan" ukuran={13} />
            <text x="223" y="146" textAnchor="middle" fontSize="26" fontWeight="900" fill={BIRU}>
              50 dan 3
            </text>
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <PapanSvg x={104} y={58} p={5} s={3} w={44} />
          <Label x={40} y={140} w={220} teks="5 puluhan dan 3 satuan" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <g>
          <path d="M150 88 L100 124 M150 88 L200 124" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
          {[[150, 66, 26, "53", "#FFE566"], [100, 148, 24, "50", "#BAE6FD"], [200, 148, 24, "3", "#FDE68A"]].map(([a, b, r, t, w]) => (
            <g key={t as string}>
              <circle cx={a as number} cy={b as number} r={r as number} fill={w as string} stroke={BIRU} strokeWidth="3.4" />
              <text x={a as number} y={(b as number) + (r as number) * 0.36} textAnchor="middle" fontSize={(r as number) * 0.95} fontWeight="900" fill={BIRU}>
                {t as string}
              </text>
            </g>
          ))}
        </g>
      ) : null}
      {k === 3 ? (
        <>
          <PapanSvg x={36} y={66} p={5} s={3} w={40} />
          <Muncul tunda={0.3}>
            <Panah x1={148} y1={104} x2={184} y2={104} />
          </Muncul>
          <Muncul tunda={0.6}>
            <Label x={188} y={90} w={104} teks="lima puluh tiga" ukuran={12} />
          </Muncul>
          <Sorot x={30} y={60} w={92} h={64} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Menebak banyak ikan ---------------- */

function Kolam() {
  return (
    <g>
      <ellipse cx="150" cy="116" rx="132" ry="58" fill="#7DD3FC" stroke={BIRU} strokeWidth="3" />
      <ellipse cx="150" cy="116" rx="132" ry="58" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 8" opacity="0.7" />
    </g>
  );
}

function A3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      <Kolam />
      <IkanSebar n={62} x={46} y={80} w={208} h={72} />
      <Orang x={24} y={198} nama="kira" s={0.62} tampilNama={false} />
      <Orang x={276} y={198} nama="malosi" s={0.62} tampilNama={false} />
      {k >= 1 ? (
        <>
          <Muncul tunda={0.2}>
            <Label x={6} y={150} w={56} teks="50" ukuran={16} />
          </Muncul>
          <Muncul tunda={0.5}>
            <Label x={238} y={150} w={56} teks="60" ukuran={16} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <Muncul tunda={0.3}>
          <Emo x={150} y={176} e="🤔" s={40} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Kelompok sepuluh ------------------- */

function A3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k === 0 ? (
        <>
          <Kolam />
          <IkanSebar n={62} x={46} y={80} w={208} h={72} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Muncul skala={0.5}>
            <WadahSvg jenis="ikan" x={14} y={52} w={92} h={44} />
          </Muncul>
          <IkanSebar n={52} x={116} y={56} w={168} h={86} />
          <Label x={10} y={104} w={100} teks="10 ikan" ukuran={13} />
        </>
      ) : null}
      {k >= 2 ? (
        <>
          <BarisWadah jenis="ikan" n={6} x={22} y={38} w={84} h={36} kolom={3} gap={8} />
          {[0, 1].map((i) => (
            <Muncul key={i} tunda={0.4 + i * 0.2}>
              <ItemMini jenis="ikan" i={i} x={226 + i * 30} y={138} r={8} />
            </Muncul>
          ))}
          {k === 2 ? <Label x={22} y={128} w={140} teks="6 kelompok" ukuran={12} /> : null}
          {k === 2 ? <Label x={206} y={150} w={84} teks="2 sisa" ukuran={12} /> : null}
        </>
      ) : null}
      {k === 3 ? (
        <Muncul tunda={0.3}>
          <AngkaBesar x={150} y={184} teks="60 + 2 = 62" w={170} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Tebakan siapa yang dekat ----------- */

const px = (n: number) => 20 + (n - 48) * 16.25;

function A3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      <path d="M20 112 H280" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
      {[48, 50, 52, 54, 56, 58, 60, 62, 64].map((n) => (
        <g key={n}>
          <path d={`M${px(n)} 106 V118`} stroke={BIRU} strokeWidth="2.4" />
          <text x={px(n)} y="134" textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
            {n}
          </text>
        </g>
      ))}
      {[[50, "Kira", "#FECACA"], [60, "Malosi", "#BBF7D0"], [62, "ikan", "#FFE566"]].map(([n, nama, w]) => (
        <Muncul key={nama as string} tunda={0.1}>
          <circle cx={px(n as number)} cy="112" r="8" fill={w as string} stroke={BIRU} strokeWidth="3" />
          <text x={px(n as number)} y={n === 62 ? 70 : 82} textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
            {nama as string}
          </text>
        </Muncul>
      ))}
      {k === 1 ? (
        <>
          <path d={`M${px(50)} 148 V156 H${px(62)} V148`} fill="none" stroke="#E53E3E" strokeWidth="3" strokeLinecap="round" />
          <text x={(px(50) + px(62)) / 2} y="174" textAnchor="middle" fontSize="14" fontWeight="900" fill="#E53E3E">
            beda 12
          </text>
          <path d={`M${px(60)} 148 V156 H${px(62)} V148`} fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
          <text x={px(61)} y="174" textAnchor="middle" fontSize="14" fontWeight="900" fill="#16A34A">
            beda 2
          </text>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Sorot x={px(60) - 14} y={96} w={px(62) - px(60) + 28} h={32} />
          <Muncul tunda={0.2}>
            <Label x={78} y={154} w={144} teks="Malosi lebih dekat" ukuran={13} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <WadahSvg jenis="ikan" x={104} y={150} w={92} h={44} />
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

export const ADEGAN_VIDEO_K2B7A = SUB_A7.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 1 },
  { a: 0, k: 2 },
  { a: 1, k: 2 },
];

export const VIDEO_SIAP_K2B7A: VideoSiap[] = SUB_A7.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B7A[i], poster: POSTER[i] }));

export function VideoK2B7A({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K2B7A} speakGuru={speakGuru} />;
}
