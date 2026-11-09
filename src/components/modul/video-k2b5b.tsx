"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Gerak, Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { buatAdegan, Angka, VideoCeritaSatuLayar, Gelang, ItG, Tanda, Tk, BIRU, type VideoSiap } from "./video-k2b5-umum";
import { Tanya } from "./video-k2b3-umum";
import { NAMA_ITEM, type JenisItem } from "./data-k2b5";
import { SUB_B5 } from "./naskah-k2b5";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 5 Sub-Bab B: Setengah dari Kumpulan Benda. Tiga     */
/* video, sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar.     */
/* Naskah satu sumber: naskah-k2b5.ts (SUB_B5.videos). Tanpa API.               */
/* Naskah: naskah/mtk-2-bab5-video-cerita.md                                    */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_B5.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_B5.videos[v].adegan[a];
const wrn = (j: JenisItem, i: number) => NAMA_ITEM[j].warna[i % NAMA_ITEM[j].warna.length];

/** Benda satuan tersusun rapi. Kiri atas (x, y), `kolom` per baris. */
function Isi({ jenis, n, x, y, kolom, w = 24, gap = 3, mulai = 0 }: { jenis: JenisItem; n: number; x: number; y: number; kolom: number; w?: number; gap?: number; mulai?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <ItG key={i} jenis={jenis} x={x + (i % kolom) * (w + gap)} y={y + Math.floor(i / kolom) * (w + gap)} w={w} warna={wrn(jenis, i + mulai)} />
      ))}
    </g>
  );
}

const lebarIsi = (n: number, kolom: number, w = 24, gap = 3) => Math.min(n, kolom) * (w + gap) - gap;
const tinggiIsi = (n: number, kolom: number, w = 24, gap = 3) => Math.ceil(n / kolom) * (w + gap) - gap;

/** Mangkuk setengah lingkaran. (x, y) tengah tepi atas. */
function Mangkuk({ x, y, w = 76 }: { x: number; y: number; w?: number }) {
  return <path d={`M${x - w / 2} ${y} Q${x - w / 2} ${y + w * 0.46} ${x} ${y + w * 0.46} Q${x + w / 2} ${y + w * 0.46} ${x + w / 2} ${y} Z`} fill="#FDE68A" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />;
}

/** Kelompok benda dalam gelang. Kiri atas (x, y), kolom, dengan gelang di sekelilingnya. */
function Kelompok({ jenis, n, x, y, kolom, w = 24, warna = BIRU, mulai = 0 }: { jenis: JenisItem; n: number; x: number; y: number; kolom: number; w?: number; warna?: string; mulai?: number }) {
  const lw = lebarIsi(n, kolom, w);
  const th = tinggiIsi(n, kolom, w);
  return (
    <>
      <Gelang x={x - 8} y={y - 8} w={lw + 16} h={th + 16} warna={warna} />
      <Isi jenis={jenis} n={n} x={x} y={y} kolom={kolom} w={w} mulai={mulai} />
    </>
  );
}

/* ------------------------- Video 1, adegan 1: Malosi dan Upe bermain ----------------- */

function B1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <Lompat aktif={k === 0}>
        <Tk x={56} nama="malosi" angkat={k === 0} />
      </Lompat>
      <Lompat aktif={k === 0}>
        <Tk x={244} nama="upe" angkat={k === 0} />
      </Lompat>
      {k >= 1 ? (
        <Muncul dy={-12}>
          <Mangkuk x={56} y={100} w={80} />
          <Isi jenis="kelereng" n={4} x={32} y={64} kolom={2} w={24} />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <>
          <Sorot x={26} y={58} w={60} h={56} />
          <Muncul dx={-30}>
            <path d="M92 86 L196 86" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
            <path d="M186 78 L198 86 L186 94" fill="none" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          </Muncul>
          <Label x={104} y={52} w={92} teks="beri setengah" ukuran={11} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Mangkuk x={244} y={100} w={80} />
          <Tanya x={244} y={68} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Membagi bergantian --------------------- */

const AWAL_X = [100, 124, 148, 172];
const AWAL_Y = 92;
const TUJUAN: [number, number][] = [
  [226, 80],
  [32, 80],
  [250, 80],
  [56, 80],
];

function B1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <Tk x={56} nama="malosi" />
      <Tk x={244} nama="upe" />
      <Mangkuk x={56} y={100} w={80} />
      <Mangkuk x={244} y={100} w={80} />
      {AWAL_X.map((ax, i) => {
        const pindah = (i < 2 && k >= 1) || (i >= 2 && k >= 2);
        const dx = pindah ? TUJUAN[i][0] - ax : 0;
        const dy = pindah ? TUJUAN[i][1] - AWAL_Y : 0;
        return (
          <Gerak key={i} x={dx} y={dy} durasi={0.9}>
            <ItG jenis="kelereng" x={ax} y={AWAL_Y} w={24} warna={wrn("kelereng", i)} />
          </Gerak>
        );
      })}
      {k === 1 ? <Label x={96} y={128} w={108} teks="sisa 2" ukuran={13} /> : null}
      {k === 3 ? (
        <>
          <Muncul skala={0.3}>
            <Angka x={56} y={50} teks="2" r={16} />
            <Angka x={244} y={50} teks="2" r={16} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Jadi, setengahnya ---------------------- */

function B1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      {k === 0 ? <Isi jenis="kelereng" n={4} x={92} y={74} kolom={4} w={28} /> : null}
      {k === 1 ? (
        <>
          <Kelompok jenis="kelereng" n={2} x={66} y={76} kolom={2} w={28} />
          <Kelompok jenis="kelereng" n={2} x={178} y={76} kolom={2} w={28} mulai={2} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Kelompok jenis="kelereng" n={2} x={66} y={60} kolom={2} w={28} />
          <Kelompok jenis="kelereng" n={2} x={178} y={60} kolom={2} w={28} mulai={2} />
          <Muncul skala={0.3}>
            <Label x={60} y={120} w={180} teks="tiap kelompok: 2" ukuran={14} />
            <Angka x={150} y={168} teks="2" r={20} isi="#FFE566" />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Halim dan enam ikan -------------------- */

function Akuarium() {
  return (
    <g>
      <rect x="48" y="44" width="204" height="94" rx="8" fill="#BAE6FD" stroke={BIRU} strokeWidth="3.4" />
      <rect x="52" y="48" width="196" height="12" fill="#E0F2FE" opacity="0.8" />
      <path d="M70 138 q8 -22 16 0 M214 138 q8 -18 16 0" stroke="#16A34A" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  );
}

function B2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {k === 0 ? (
        <>
          <Akuarium />
          <Isi jenis="ikan" n={6} x={74} y={56} kolom={3} w={32} gap={14} />
          <Tk x={274} nama="halim" s={0.7} tampilNama={false} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Tk x={150} nama="halim" />
          <g>
            <rect x="20" y="96" width="80" height="44" rx="10" fill="#FEF3C7" stroke={BIRU} strokeWidth="3" strokeDasharray="6 4" />
            <rect x="200" y="96" width="80" height="44" rx="10" fill="#FEF3C7" stroke={BIRU} strokeWidth="3" strokeDasharray="6 4" />
            <Label x={20} y={64} w={80} teks="tempat 1" ukuran={12} />
            <Label x={200} y={64} w={80} teks="tempat 2" ukuran={12} />
          </g>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Isi jenis="ikan" n={6} x={74} y={46} kolom={3} w={30} gap={14} />
          <Lompat>
            <Tk x={150} nama="halim" angkat />
          </Lompat>
          <Tanya x={252} y={92} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Setengah dari 6 ikan ------------------- */

function B2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      <Kelompok jenis="ikan" n={3} x={32} y={74} kolom={3} w={30} />
      <Kelompok jenis="ikan" n={3} x={172} y={74} kolom={3} w={30} mulai={1} />
      {k >= 1 ? (
        <Muncul skala={0.3}>
          <Angka x={78} y={140} teks="3" r={16} />
          <Angka x={218} y={140} teks="3" r={16} />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <Muncul skala={0.3}>
          <Label x={60} y={168} w={180} teks="3 + 3 = 6 ikan" ukuran={14} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Bukan setengah ------------------------- */

function B2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <Kelompok jenis="ikan" n={4} x={34} y={62} kolom={2} w={30} warna={k >= 2 ? "#E53E3E" : BIRU} />
      <Kelompok jenis="ikan" n={2} x={188} y={62} kolom={2} w={30} mulai={1} warna={k >= 2 ? "#E53E3E" : BIRU} />
      {k === 1 ? (
        <Muncul skala={0.3}>
          <Label x={26} y={138} w={90} teks="4 ikan" ukuran={13} />
          <Label x={180} y={138} w={90} teks="2 ikan" ukuran={13} />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <>
          <Tanda x={150} y={102} benar={false} />
          <Label x={70} y={150} w={160} teks="bukan setengah" ukuran={14} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Lompat>
            <Tk x={256} y={198} nama="halim" s={0.8} angkat />
          </Lompat>
          <Label x={40} y={144} w={172} teks="harus sama banyak" ukuran={12} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Delapan pensil Tika -------------------- */

function B3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k === 0 ? (
        <>
          <Tk x={52} nama="tika" />
          <Isi jenis="pensil" n={8} x={96} y={76} kolom={4} w={34} gap={6} />
        </>
      ) : null}
      {k >= 1 ? (
        <>
          <Kelompok jenis="pensil" n={4} x={40} y={66} kolom={2} w={36} />
          <Kelompok jenis="pensil" n={4} x={176} y={66} kolom={2} w={36} mulai={1} />
        </>
      ) : null}
      {k === 2 ? (
        <Muncul skala={0.3}>
          <Label x={50} y={150} w={200} teks="tiap bagian: 4 pensil" ukuran={14} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Mencari pola --------------------------- */

const BARIS_POLA = [
  [4, 2],
  [6, 3],
  [8, 4],
  [10, 5],
];

function B3_2({ k }: PropsAdegan) {
  const tampil = (i: number) => (k === 0 ? i === 0 : k === 1 ? i <= 2 : true);
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {BARIS_POLA.map(([a, b], i) =>
        tampil(i) ? (
          <Muncul key={i} dx={-20} tunda={k === 1 && i > 0 ? (i - 1) * 0.3 : 0}>
            <rect x="52" y={44 + i * 26} width="196" height="22" rx="8" fill={i % 2 ? "#F5F3FF" : "#FFFFFF"} stroke={BIRU} strokeWidth="2.4" />
            <text x="96" y={60 + i * 26} textAnchor="middle" fontSize="15" fontWeight="900" fill="#2563EB">
              {a}
            </text>
            <text x="150" y={60 + i * 26} textAnchor="middle" fontSize="15" fontWeight="900" fill={BIRU}>
              →
            </text>
            <text x="204" y={60 + i * 26} textAnchor="middle" fontSize="15" fontWeight="900" fill="#16A34A">
              {b}
            </text>
          </Muncul>
        ) : null,
      )}
      {k === 3 ? (
        <>
          <Sorot x={48} y={40} w={204} h={108} />
          <Label x={64} y={156} w={172} teks="ada pola setengah" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Kalau banyaknya ganjil ----------------- */

function B3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? <Isi jenis="kelereng" n={5} x={64} y={78} kolom={5} w={32} /> : null}
      {k >= 1 ? (
        <>
          <Kelompok jenis="kelereng" n={2} x={34} y={72} kolom={2} w={32} />
          <Kelompok jenis="kelereng" n={2} x={206} y={72} kolom={2} w={32} mulai={2} />
          <Muncul skala={0.4}>
            <ItG jenis="kelereng" x={134} y={78} w={32} warna={wrn("kelereng", 4)} />
          </Muncul>
        </>
      ) : null}
      {k >= 1 ? (
        <>
          <Label x={26} y={140} w={90} teks="Upe: 2" ukuran={12} />
          <Label x={186} y={140} w={90} teks="Malosi: 2" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Sorot x={126} y={70} w={48} h={48} />
          <Label x={112} y={124} w={76} teks="sisa 1" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Label x={42} y={166} w={216} teks="5 tidak punya setengah" ukuran={13} />
          <Tanya x={150} y={58} />
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

export const ADEGAN_VIDEO_K2B5B = SUB_B5.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p), { minimal: vi === 0 && ai === 1 ? { 1: 2.6, 2: 2.6 } : undefined })));

export const VIDEO_SIAP_K2B5B: VideoSiap[] = SUB_B5.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B5B[i] }));

export function VideoK2B5B({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <VideoCeritaSatuLayar subBab={SUB_B5} videos={VIDEO_SIAP_K2B5B} speakGuru={speakGuru} />;
}
