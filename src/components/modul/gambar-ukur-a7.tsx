"use client";

import React from "react";
import { BIRU, BukuCerita, HIJAU, Latar, MERAH_MUDA, type Cerita } from "./CeritaBandingB";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";
import { KupuG } from "./selisih-a6-dasar";
import { AlasTeks, HurufBulat, Ket, Label, MERAH_B7, PensilG, PohonG } from "./ukur-7-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 7 Sub-Bab A: Membandingkan dan Mengurutkan Panjang Benda               */
/* (Buku Siswa Kelas 1 hlm. 199-207). Maskot: Igil si burung hantu. Tokoh     */
/* buku: Kira, Upe, Malosi, Wei. Semua gambar dibuat di klien (SVG), tanpa    */
/* panggilan API.                                                             */
/* Naskah: naskah/mtk-1-bab7-sub-a-membandingkan-mengurutkan-panjang.md       */
/* ------------------------------------------------------------------------ */

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 199: Kira, Upe, Malosi, dan Wei berbaris menunggu mencuci tangan. */
function AdeganMencuci() {
  const anak: { x: number; s: number; nama: string; rambut: string; baju: string }[] = [
    { x: 52, s: 0.74, nama: "Kira", rambut: "#1F2937", baju: MERAH_MUDA },
    { x: 104, s: 0.9, nama: "Upe", rambut: "#7A4A1E", baju: "#FDE047" },
    { x: 156, s: 1.1, nama: "Malosi", rambut: "#111827", baju: HIJAU },
    { x: 208, s: 0.82, nama: "Wei", rambut: "#1F2937", baju: "#93C5FD" },
  ];
  return (
    <>
      <Latar />
      <path d="M26 107 H232" stroke="#F59E0B" strokeWidth="2.4" strokeDasharray="5 5" strokeLinecap="round" />
      <Ket x={214} y={100} teks="paling tinggi" warna="#B45309" ukuran={11} />
      <rect x="240" y="126" width="34" height="24" rx="5" fill="#BFDBFE" stroke={BIRU} strokeWidth="2.4" />
      <path d="M257 126 V114 Q257 108 264 108 H270" fill="none" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
      <AlasTeks y={174} h={33} />
      {anak.map((a) => (
        <g key={a.nama}>
          <Tokoh x={a.x} y={170} rambut={a.rambut} baju={a.baju} s={a.s} />
          <Ket x={a.x} y={185} teks={a.nama} ukuran={10.5} />
        </g>
      ))}
      <Ket x={134} y={201} teks="Tinggi badan berbeda-beda" ukuran={12} />
      <Label x={20} y={2} w={196} teks="Mencuci tangan" ukuran={13} />
    </>
  );
}

/** Buku hlm. 200: pohon A lebih tinggi dari pohon B. */
function AdeganLebihTinggi() {
  return (
    <>
      <Latar />
      <path d="M62 60 H236" stroke="#F59E0B" strokeWidth="2.2" strokeDasharray="5 5" strokeLinecap="round" />
      <path d="M226 62 V84 M222 66 L226 62 L230 66 M222 80 L226 84 L230 80" fill="none" stroke={MERAH_B7} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <PohonG x={96} y={158} tinggi={98} />
      <PohonG x={196} y={158} tinggi={72} />
      <HurufBulat x={96} y={173} teks="A" />
      <HurufBulat x={196} y={173} teks="B" />
      <AlasTeks y={186} h={22} />
      <Ket x={150} y={192} teks="Pohon A lebih tinggi dari pohon B" ukuran={11} />
      <Ket x={150} y={205} teks="Pohon B lebih pendek dari pohon A" ukuran={11} />
      <Label x={20} y={2} w={196} teks="Lebih tinggi, lebih pendek" ukuran={12.5} />
    </>
  );
}

/** Buku hlm. 200: pohon B sama tinggi dengan pohon C. */
function AdeganSamaTinggi() {
  return (
    <>
      <Latar />
      <path d="M62 72 H236" stroke="#F59E0B" strokeWidth="2.2" strokeDasharray="5 5" strokeLinecap="round" />
      <PohonG x={96} y={158} tinggi={86} />
      <PohonG x={196} y={158} tinggi={86} />
      <Ket x={146} y={64} teks="=" warna={MERAH_B7} ukuran={24} />
      <HurufBulat x={96} y={176} teks="B" />
      <HurufBulat x={196} y={176} teks="C" />
      <AlasTeks y={187} h={19} />
      <Ket x={150} y={200} teks="Pohon B sama tinggi dengan pohon C" ukuran={11.5} />
      <Label x={20} y={2} w={150} teks="Sama tinggi" />
    </>
  );
}

/** Buku hlm. 200-201: membandingkan pohon A, B, C, dan D. */
function AdeganPalingTinggi() {
  const pohon: { x: number; t: number; h: string }[] = [
    { x: 42, t: 100, h: "A" },
    { x: 112, t: 82, h: "B" },
    { x: 182, t: 82, h: "C" },
    { x: 252, t: 60, h: "D" },
  ];
  return (
    <>
      <Latar />
      {pohon.map((p) => (
        <g key={p.h}>
          <PohonG x={p.x} y={158} tinggi={p.t} />
          <HurufBulat x={p.x} y={176} teks={p.h} />
        </g>
      ))}
      <Ket x={42} y={50} teks="paling tinggi" warna="#B45309" ukuran={10.5} />
      <Ket x={252} y={92} teks="paling pendek" warna="#B45309" ukuran={10.5} />
      <AlasTeks y={187} h={19} />
      <Ket x={150} y={200} teks="A, B, C, D atau A, C, B, D" ukuran={12} />
      <Label x={10} y={2} w={206} teks="Paling tinggi, paling pendek" ukuran={12.5} />
    </>
  );
}

/** Buku hlm. 202: pensil warna, dibandingkan dari garis awal yang sama. */
function AdeganPensil() {
  return (
    <>
      <Latar />
      <rect x="14" y="36" width="272" height="136" rx="10" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <path d="M40 44 V164" stroke={MERAH_B7} strokeWidth="2.2" strokeDasharray="4 4" strokeLinecap="round" />
      <Ket x={74} y={54} teks="garis awal" warna={MERAH_B7} ukuran={10.5} />
      <PensilG x={40} y={72} panjang={210} warna="#2563EB" />
      <PensilG x={40} y={108} panjang={165} warna="#EF4444" />
      <PensilG x={40} y={144} panjang={120} warna="#22C55E" />
      <AlasTeks y={177} h={30} />
      <Ket x={150} y={191} teks="Pensil biru paling panjang" ukuran={11.5} />
      <Ket x={150} y={205} teks="Pensil hijau paling pendek" ukuran={11.5} />
      <Label x={20} y={2} w={196} teks="Pensil warna" ukuran={13} />
    </>
  );
}

/** Buku hlm. 203: tiga kupu-kupu terbang pada ketinggian yang berbeda. */
function AdeganKupu() {
  const kupu = [
    { x: 74, y: 126, w: "#FACC15" },
    { x: 140, y: 94, w: "#EF4444" },
    { x: 206, y: 62, w: "#4ADE80" },
  ];
  return (
    <>
      <Latar />
      <path d="M22 150 V46" stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" />
      {kupu.map((k) => (
        <g key={k.w}>
          <path d={`M17 ${k.y} H27`} stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" />
          <path d={`M30 ${k.y} H${k.x - 22}`} stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="3 4" strokeLinecap="round" />
          <KupuG x={k.x} y={k.y} s={1.15} warna={k.w} />
        </g>
      ))}
      <AlasTeks y={179} h={29} />
      <Ket x={150} y={192} teks="hijau paling tinggi" ukuran={11.5} />
      <Ket x={150} y={205} teks="kuning paling rendah" ukuran={11.5} />
      <Label x={20} y={2} w={196} teks="Kupu-kupu terbang" ukuran={13} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita membandingkan dan mengurutkan panjang benda">
      {id === "A7-S1" && <AdeganMencuci />}
      {id === "A7-S2" && <AdeganLebihTinggi />}
      {id === "A7-S3" && <AdeganSamaTinggi />}
      {id === "A7-S4" && <AdeganPalingTinggi />}
      {id === "A7-S5" && <AdeganPensil />}
      {id === "A7-S6" && <AdeganKupu />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 199-203): berbaris, dua benda, sama tinggi, tiga benda, panjang, dan posisi. */
export const CERITA_A7: Cerita[] = [
  {
    id: "A7-S1",
    sceneType: "anak-berbaris-tinggi",
    voiceNarration:
      "Waktu istirahat telah tiba. Para siswa akan memakan bekal mereka. Kira, Upe, Malosi, dan Wei segera berbaris. Mereka berdiri berjajar dengan tertib dan menunggu giliran untuk mencuci tangan. Mereka mematuhi pesan Ibu Guru, kita harus mencuci tangan sebelum makan. Coba urutkan siswa berdasarkan tinggi badannya. Bagaimana kamu mengetahuinya? Tinggi badan kita berbeda-beda. Itu adalah ciptaan Tuhan yang harus disyukuri. Kita harus saling menghargai.",
  },
  {
    id: "A7-S2",
    sceneType: "pohon-lebih-tinggi",
    voiceNarration:
      "Ayo kita amati pohon pisang. Pohon mana yang paling tinggi? Pohon mana yang paling pendek? Kita bandingkan tinggi pohon A dan pohon B. Pohon A lebih tinggi dari pohon B. Pohon B lebih pendek dari pohon A. Kita dapat membandingkan tinggi dua benda. Kita menggunakan kata lebih tinggi dan lebih pendek.",
  },
  {
    id: "A7-S3",
    sceneType: "pohon-sama-tinggi",
    voiceNarration:
      "Sekarang kita bandingkan tinggi pohon B dan pohon C. Ujung atas kedua pohon sama tinggi. Pohon B sama tinggi dengan pohon C. Dua benda ada yang sama tingginya. Kita menggunakan kata sama tinggi untuk membandingkannya.",
  },
  {
    id: "A7-S4",
    sceneType: "pohon-paling-tinggi",
    voiceNarration:
      "Kita bandingkan pohon A, B, C, dan D. Pohon A lebih tinggi dari pohon B, C, dan D. Jadi pohon A paling tinggi. Pohon D lebih pendek dari pohon A, B, dan C. Jadi pohon D paling pendek. Urutan pohon dari yang paling tinggi adalah A, B, C, dan D, atau A, C, B, dan D, karena pohon B dan pohon C sama tinggi. Kita dapat membandingkan tinggi tiga benda atau lebih. Kita menggunakan kata paling tinggi dan paling pendek.",
  },
  {
    id: "A7-S5",
    sceneType: "pensil-garis-awal",
    voiceNarration:
      "Amati pensil warna. Semua pensil dimulai dari garis awal yang sama. Pensil hijau lebih pendek dari pensil merah. Pensil merah lebih pendek dari pensil biru. Pensil hijau lebih pendek dari pensil merah dan biru, jadi pensil hijau paling pendek. Pensil biru lebih panjang dari pensil hijau dan merah, jadi pensil biru paling panjang. Kita dapat membandingkan panjang benda. Kita menggunakan kata lebih panjang, lebih pendek, paling panjang, dan paling pendek.",
  },
  {
    id: "A7-S6",
    sceneType: "kupu-kupu-terbang",
    voiceNarration:
      "Di taman ada tiga kupu-kupu, yaitu kuning, merah, dan hijau. Kupu-kupu kuning terbang tinggi. Kupu-kupu merah terbang lebih tinggi dari kupu-kupu kuning. Kupu-kupu hijau terbang lebih tinggi dari kupu-kupu merah dan kupu-kupu kuning. Jadi kupu-kupu hijau terbang paling tinggi dan kupu-kupu kuning terbang paling rendah. Kita dapat membandingkan posisi benda. Kita menggunakan kata lebih tinggi, lebih rendah, paling tinggi, dan paling rendah.",
  },
];

/** Peta pikiran enam simpul: dari mengamati sampai bersyukur atas perbedaan tinggi badan. */
export const PETA_PIKIRAN_A7: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Amati dan Sejajarkan",
    stepDesc:
      "Amati benda yang akan dibandingkan. Letakkan benda pada garis awal yang sama, supaya ujungnya bisa dibandingkan dengan adil.",
    icon: "👀",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Dua Benda",
    stepDesc:
      "Bandingkan dua benda dengan kata lebih tinggi dan lebih pendek. Kalau ujung atasnya sama, gunakan kata sama tinggi.",
    icon: "↕️",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Tiga Benda atau Lebih",
    stepDesc:
      "Bandingkan tiga benda atau lebih dengan kata paling tinggi dan paling pendek. Cari benda yang lebih tinggi dari semua yang lain.",
    icon: "🌴",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Urutkan",
    stepDesc:
      "Susun benda dari yang paling pendek sampai paling tinggi, atau sebaliknya. Kalau ada dua benda sama tinggi, urutannya boleh bertukar.",
    icon: "🔢",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Panjang dan Posisi",
    stepDesc:
      "Untuk panjang, gunakan lebih panjang, lebih pendek, paling panjang, dan paling pendek. Untuk posisi, gunakan lebih tinggi, lebih rendah, paling tinggi, dan paling rendah.",
    icon: "📏",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Ceritakan dan Syukuri",
    stepDesc:
      "Buat kalimat perbandingan dari benda di sekitarmu. Tinggi badan kita berbeda-beda, itu ciptaan Tuhan yang harus disyukuri dan kita saling menghargai.",
    icon: "🙏",
  },
];

export function CeritaUkurA({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_A7} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
