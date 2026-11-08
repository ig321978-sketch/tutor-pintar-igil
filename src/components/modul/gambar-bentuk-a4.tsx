"use client";

import React from "react";
import {
  BAWAH,
  BIRU,
  BukuCerita,
  EMAS,
  HIJAU,
  KUNING,
  Latar,
  MERAH_MUDA,
  TENGAH,
  type Cerita,
} from "./CeritaBandingB";
import { IgilWajahIsi, Lencana } from "./gambar-cara-b2";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";
import { BendaDi, type JenisBenda } from "./bentuk-a4-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 4 Sub-Bab A: Mendeskripsikan Benda Berdasarkan Bentuk (Buku Siswa       */
/* Kelas 1 hlm. 117-126). Maskot: Igil si burung hantu. Tokoh buku: Kira,     */
/* Upe, Wei, Halim, Malosi, Tika. Semua gambar dibuat di klien (SVG), tanpa    */
/* panggilan API.                                                             */
/* Naskah: naskah/mtk-1-bab4-sub-a-mendeskripsikan-bentuk.md                   */
/* ------------------------------------------------------------------------ */

const COKELAT = "#A8672D";

/** Label putih berbingkai. */
export function Label({ x, y, w, teks, ukuran = 15 }: { x: number; y: number; w: number; teks: string; ukuran?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="28" rx="12" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x={x + w / 2} y={y + 20} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}

/** Ruang dalam rumah. Dinding krem dan lantai kayu. */
export function Ruang() {
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#FFF7E6" />
      <rect x="0" y="150" width="300" height="58" fill="#F3C98A" />
      <rect x="0" y="146" width="300" height="6" fill={COKELAT} />
      <path d="M0 176 H300 M0 196 H300" stroke="#E0A867" strokeWidth="2" />
    </>
  );
}

export function Meja({ x, y, lebar }: { x: number; y: number; lebar: number }) {
  return (
    <g>
      <rect x={x} y={y} width={lebar} height="9" rx="3" fill="#C98A4B" stroke={BIRU} strokeWidth="2.2" />
      <path d={`M${x + 8} ${y + 9} V${y + 40} M${x + lebar - 8} ${y + 9} V${y + 40}`} stroke={BIRU} strokeWidth="3.6" strokeLinecap="round" />
    </g>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 117: enam teman piknik, tiap anak membawa makanan berbentuk lain. */
function AdeganPiknik() {
  return (
    <>
      <Latar />
      <path d="M28 160 H276 L292 196 H12 Z" fill="#FDE68A" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <path d="M44 160 L32 196 M82 160 L74 196 M122 160 L118 196 M162 160 L162 196 M202 160 L206 196 M242 160 L250 196" stroke="#F59E0B" strokeWidth="3" opacity="0.55" />
      <BendaDi jenis="donat" x={74} y={134} w={44} />
      <BendaDi jenis="semangka" x={132} y={136} w={44} />
      <BendaDi jenis="lapis" x={190} y={136} w={44} />
      <Tokoh x={34} y={178} rambut={BIRU} baju={EMAS} s={0.86} angkat />
      <Tokoh x={266} y={178} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.86} angkat />
      <Lencana x={150} y={86} teks="?" r={19} />
      <Label x={86} y={14} w={128} teks="Bentuk apa?" />
    </>
  );
}

/** Buku hlm. 118: Igil menunjukkan tiga bentuk di papan. */
function AdeganPapan() {
  return (
    <>
      <Latar />
      <rect x="70" y="22" width="216" height="124" rx="10" fill="#FFFFFF" stroke={COKELAT} strokeWidth="6" />
      <path d="M118 146 V178 M238 146 V178" stroke={COKELAT} strokeWidth="6" strokeLinecap="round" />
      <circle cx="116" cy="70" r="26" fill={KUNING} stroke={BIRU} strokeWidth="3.4" />
      <polygon points="178,44 204,94 152,94" fill={MERAH_MUDA} stroke={BIRU} strokeWidth="3.4" strokeLinejoin="round" />
      <rect x="226" y="46" width="48" height="48" fill={HIJAU} stroke={BIRU} strokeWidth="3.4" />
      <text x="116" y="124" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
        lengkung
      </text>
      <text x="178" y="124" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
        segitiga
      </text>
      <text x="250" y="124" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
        segi empat
      </text>
      <g className="igil-lompat" style={BAWAH}>
        <svg x="2" y="102" width="80" height="54" viewBox="0 0 120 80">
          <IgilWajahIsi />
        </svg>
      </g>
    </>
  );
}

/** Buku hlm. 119: benda-benda yang tepinya melengkung. */
function AdeganLengkung() {
  const dimeja: { j: JenisBenda; x: number; y: number; w: number }[] = [
    { j: "piring", x: 66, y: 86, w: 40 },
    { j: "donat", x: 112, y: 86, w: 40 },
    { j: "melon", x: 160, y: 84, w: 42 },
    { j: "telur", x: 206, y: 90, w: 36 },
  ];
  return (
    <>
      <Ruang />
      <BendaDi jenis="jam" x={116} y={8} w={58} />
      <Meja x={58} y={126} lebar={196} />
      {dimeja.map((d) => (
        <BendaDi key={d.j} jenis={d.j} x={d.x} y={d.y + 4} w={d.w} />
      ))}
      <Tokoh x={28} y={190} rambut="#1F2937" baju={HIJAU} s={0.9} angkat />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={276} y={190} rambut="#7A4A1E" baju={KUNING} s={0.88} />
      </g>
      <Label x={96} y={64} w={108} teks="Lengkung" ukuran={14} />
    </>
  );
}

/** Buku hlm. 118-119: benda-benda yang berbentuk segitiga. */
function AdeganSegitiga() {
  return (
    <>
      <Latar />
      <BendaDi jenis="tenda" x={100} y={78} w={96} />
      <BendaDi jenis="semangka" x={20} y={118} w={50} />
      <BendaDi jenis="risol" x={206} y={124} w={46} />
      <BendaDi jenis="penggaris" x={252} y={120} w={42} />
      <BendaDi jenis="lupis" x={70} y={140} w={42} />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={156} y={198} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.72} angkat />
      </g>
      <Label x={96} y={14} w={108} teks="Segitiga" ukuran={16} />
    </>
  );
}

/** Buku hlm. 119: benda-benda yang berbentuk segi empat. */
function AdeganSegiEmpat() {
  return (
    <>
      <Ruang />
      <BendaDi jenis="jendela" x={14} y={18} w={66} />
      <BendaDi jenis="bingkai" x={104} y={20} w={58} />
      <BendaDi jenis="bendera" x={176} y={14} w={50} />
      <BendaDi jenis="pintu" x={234} y={44} w={62} />
      <Meja x={96} y={124} lebar={110} />
      <BendaDi jenis="lapis" x={102} y={90} w={40} />
      <BendaDi jenis="buku" x={152} y={88} w={42} />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={40} y={190} rambut="#1F2937" baju={EMAS} s={0.9} angkat />
      </g>
      <Label x={86} y={60} w={128} teks="Segi empat" ukuran={14} />
    </>
  );
}

/** Buku hlm. 120: Ayo bermain. Tubuh membentuk bulat, segitiga, dan segi empat. */
function AdeganBermain() {
  return (
    <>
      <Latar />
      <ellipse cx="62" cy="150" rx="52" ry="30" fill="none" stroke={EMAS} strokeWidth="4" strokeDasharray="3 8" strokeLinecap="round" />
      <Tokoh x={34} y={176} rambut={BIRU} baju={EMAS} s={0.7} />
      <Tokoh x={62} y={168} rambut="#7A4A1E" baju="#FFFFFF" s={0.66} />
      <Tokoh x={90} y={176} rambut="#1F2937" baju={HIJAU} s={0.7} />
      <polygon points="168,88 200,170 136,170" fill="none" stroke={MERAH_MUDA} strokeWidth="4" strokeDasharray="3 8" strokeLinecap="round" strokeLinejoin="round" />
      <Tokoh x={150} y={188} rambut={MERAH_MUDA} baju={KUNING} s={0.72} angkat />
      <Tokoh x={186} y={188} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.72} angkat />
      <rect x="226" y="108" width="62" height="70" fill="none" stroke={HIJAU} strokeWidth="4" strokeDasharray="3 8" strokeLinecap="round" />
      <Tokoh x={258} y={194} rambut={BIRU} baju={HIJAU} s={0.9} angkat />
      <g className="igil-denyut" style={TENGAH}>
        <Label x={86} y={14} w={128} teks="Ayo bermain!" ukuran={15} />
      </g>
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita mengenal bentuk benda">
      {id === "A4-S1" && <AdeganPiknik />}
      {id === "A4-S2" && <AdeganPapan />}
      {id === "A4-S3" && <AdeganLengkung />}
      {id === "A4-S4" && <AdeganSegitiga />}
      {id === "A4-S5" && <AdeganSegiEmpat />}
      {id === "A4-S6" && <AdeganBermain />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 117-120). Tokoh hanya Kira, Upe, Wei, Halim, Malosi, Tika, dan Igil. */
export const CERITA_A4: Cerita[] = [
  {
    id: "A4-S1",
    sceneType: "piknik-bersama",
    voiceNarration:
      "Piknik bersama! Kira, Upe, Wei, Halim, Malosi, dan Tika berpiknik di taman. Setiap teman membawa makanan. Ada donat yang bulat. Ada irisan semangka yang runcing. Ada kue lapis yang berpojok empat. Bentuk apa saja yang kamu temukan? Dapatkah kamu mengelompokkannya?",
  },
  {
    id: "A4-S2",
    sceneType: "papan-tiga-bentuk",
    voiceNarration:
      "Igil menggambar tiga bentuk di papan. Bentuk pertama bernama bentuk lengkung. Tepinya melengkung dan tidak punya sudut. Bentuk kedua bernama segitiga. Punya tiga sisi lurus dan tiga sudut. Bentuk ketiga bernama segi empat. Punya empat sisi lurus dan empat sudut. Semua benda di sekitar kita bisa kita kelompokkan dengan tiga bentuk ini.",
  },
  {
    id: "A4-S3",
    sceneType: "benda-lengkung",
    voiceNarration:
      "Lihat meja makan Tika! Jam dinding, piring, donat, melon, dan telur. Semuanya punya tepi yang melengkung. Kita tidak menemukan ujung yang runcing, dan tidak ada sudut. Benda seperti ini berbentuk lengkung. Ada yang bulat, ada juga yang lonjong seperti telur. Keduanya tetap bentuk lengkung.",
  },
  {
    id: "A4-S4",
    sceneType: "benda-segitiga",
    voiceNarration:
      "Halim menemukan benda berbentuk segitiga. Ada tenda, irisan semangka, kue risol, penggaris segitiga, dan kue lupis. Ujung-ujungnya runcing. Hitung sisinya: satu, dua, tiga. Hitung sudutnya: satu, dua, tiga. Segitiga punya tiga sisi lurus dan tiga sudut.",
  },
  {
    id: "A4-S5",
    sceneType: "benda-segi-empat",
    voiceNarration:
      "Wei mencari benda di dalam rumah. Jendela, pintu, bingkai foto, bendera, kue lapis, dan buku. Semuanya berbentuk segi empat. Hitung sisinya: satu, dua, tiga, empat. Hitung sudutnya: satu, dua, tiga, empat. Segi empat punya empat sisi lurus dan empat sudut.",
  },
  {
    id: "A4-S6",
    sceneType: "bermain-bentuk-tubuh",
    voiceNarration:
      "Ayo bermain! Bentuk apa yang bisa dibuat dengan tubuh kita? Tiga teman berdiri melingkar membuat bentuk lengkung. Dua teman membuat atap dengan lengan membentuk segitiga. Satu teman membuat bingkai dengan jari membentuk segi empat. Sekarang giliranmu: buat bentuk dengan teman-temanmu, lalu tebak bentuk apa itu.",
  },
];

/** Peta pikiran enam simpul: dari mengamati benda sampai mengecek bentuk dari posisi lain. */
export const PETA_PIKIRAN_A4: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Amati Bendanya",
    stepDesc:
      "Lihat benda dengan teliti, seperti detektif. Jangan lihat warnanya atau kegunaannya dulu. Lihat garis tepinya saja. Donat, jam dinding, dan telur kelihatan sama-sama membulat.",
    icon: "👀",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Rasakan Tepinya",
    stepDesc:
      "Telusuri tepi benda dengan jari. Kalau jarimu mengikuti garis yang melengkung terus, itu bentuk lengkung. Kalau jarimu berjalan lurus lalu berbelok di sudut, itu bentuk bersisi lurus.",
    icon: "☝️",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Hitung Sisi dan Sudut",
    stepDesc:
      "Hitung garis lurusnya, itu sisi. Hitung pojok tempat dua garis bertemu, itu sudut. Tiga sisi dan tiga sudut itu segitiga. Empat sisi dan empat sudut itu segi empat. Tidak ada sisi lurus dan sudut, itu bentuk lengkung.",
    icon: "🔢",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Beri Nama Bentuknya",
    stepDesc:
      "Sebut namanya dengan lengkap. Ada bentuk lengkung, segitiga, dan segi empat. Pintu, jendela, buku, dan bingkai foto semuanya segi empat, walaupun ukurannya berbeda.",
    icon: "🏷️",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Kelompokkan",
    stepDesc:
      "Kumpulkan benda yang bentuknya sama ke dalam satu kelompok. Donat, piring, dan melon masuk kelompok bentuk lengkung. Tenda dan irisan semangka masuk kelompok segitiga. Buku dan pintu masuk kelompok segi empat.",
    icon: "🧺",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Cek dari Posisi Lain",
    stepDesc:
      "Putar bendanya, miringkan, atau balik. Segitiga yang terbalik tetap segitiga. Segi empat yang miring tetap segi empat. Bentuk tidak berubah karena posisinya berubah, dan tidak berubah karena ukurannya berbeda.",
    icon: "🔄",
  },
];

export function CeritaBentukA({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_A4} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
