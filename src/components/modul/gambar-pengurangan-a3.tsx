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
import { KendaraanG } from "./gambar-soal-cerita-c2";
import type { LangkahPeta } from "./PetaPikiranB";

/* ------------------------------------------------------------------------ */
/* Bab 3 Sub-Bab A: Cerita Pengurangan (Buku Siswa Kelas 1 hlm. 76-87).       */
/* Maskot: Igil si burung hantu. Tokoh buku: Kira, Upe, Wei, Halim, Malosi,   */
/* Tika. Semua gambar dibuat di klien (SVG). Tidak ada panggilan API.         */
/* Naskah: naskah/mtk-1-bab3-sub-a-cerita-pengurangan.md                      */
/* ------------------------------------------------------------------------ */

const MERAH = "#E11D48";
const UNGU_MUDA = "#C4B5FD";

/* ------------------------------ Gambar benda ---------------------------- */

function Piring({ x, y, lebar = 36 }: { x: number; y: number; lebar?: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y + 3} rx={lebar} ry="8" fill="#C7D2FE" stroke={BIRU} strokeWidth="2.4" />
      <ellipse cx={x} cy={y} rx={lebar} ry="8" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.4" />
      <ellipse cx={x} cy={y} rx={lebar - 10} ry="4.6" fill="none" stroke="#C7D2FE" strokeWidth="2" />
    </g>
  );
}

/** Kue mangkuk kecil. Titik (x, y) ada di dasar kue. */
function Kue({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-10 0 L-8 -11 H8 L10 0 Z" fill="#F3C98A" stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M-11 -11 Q-12 -20 -3 -21 Q0 -27 6 -21 Q13 -20 11 -11 Z" fill={MERAH_MUDA} stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="1" cy="-25" r="3" fill={MERAH} stroke={BIRU} strokeWidth="1.2" />
    </g>
  );
}

function Kelereng({ x, y, warna }: { x: number; y: number; warna: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="6.5" fill={warna} stroke={BIRU} strokeWidth="1.8" />
      <path d="M-3.6 -1.4 Q-2 -4.6 1.6 -4.8" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
    </g>
  );
}

/** Kupu-kupu. Titik (x, y) ada di tengah badan. */
function Kupu({ x, y, s = 1, warna, putar = 0 }: { x: number; y: number; s?: number; warna: string; putar?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${putar}) scale(${s})`}>
      <ellipse cx="-9" cy="-6" rx="9" ry="7" fill={warna} stroke={BIRU} strokeWidth="1.8" />
      <ellipse cx="9" cy="-6" rx="9" ry="7" fill={warna} stroke={BIRU} strokeWidth="1.8" />
      <ellipse cx="-7" cy="5" rx="6" ry="5" fill={KUNING} stroke={BIRU} strokeWidth="1.8" />
      <ellipse cx="7" cy="5" rx="6" ry="5" fill={KUNING} stroke={BIRU} strokeWidth="1.8" />
      <rect x="-1.8" y="-10" width="3.6" height="22" rx="1.8" fill={BIRU} />
      <path d="M-1 -10 Q-5 -18 -9 -17 M1 -10 Q5 -18 9 -17" fill="none" stroke={BIRU} strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

function PanahKanan({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g className="igil-denyut" style={TENGAH}>
      <path d={`M${x1} ${y} H${x2 - 6}`} stroke={EMAS} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 8" />
      <polygon points={`${x2},${y} ${x2 - 10},${y - 7} ${x2 - 10},${y + 7}`} fill={EMAS} stroke={BIRU} strokeWidth="1.4" strokeLinejoin="round" />
    </g>
  );
}

function KotakHitung({ x, y, w = 116, teks, ukuran = 20 }: { x: number; y: number; w?: number; teks: string; ukuran?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="34" rx="14" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x={x + w / 2} y={y + 24} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 77: enam sekawan bermain tutup mata, Malosi dan Tika pulang. */
function AdeganTutupMata() {
  return (
    <>
      <Latar />
      <Tokoh x={34} y={190} rambut={BIRU} baju={EMAS} s={0.88} angkat />
      <Tokoh x={74} y={178} rambut="#7A4A1E" baju="#FFFFFF" s={0.82} />
      <Tokoh x={114} y={190} rambut="#1F2937" baju={HIJAU} s={0.88} angkat />
      <Tokoh x={154} y={178} rambut={MERAH_MUDA} baju={KUNING} s={0.82} />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={238} y={176} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.78} />
      </g>
      <g className="igil-lompat" style={{ ...BAWAH, animationDelay: "0.3s" }}>
        <Tokoh x={276} y={190} rambut={BIRU} baju={HIJAU} s={0.78} />
      </g>
      <PanahKanan x1={176} x2={214} y={126} />
      <Lencana x={250} y={92} teks="−2" />
      <Lencana x={94} y={112} teks="4" r={15} />
      <KotakHitung x={92} y={14} teks="6 − 2 = 4" />
    </>
  );
}

/** Buku hlm. 78: Igil menunjukkan kalimat 6 − 2 = 4 di papan. */
function AdeganPapan() {
  return (
    <>
      <Latar />
      <rect x="82" y="30" width="196" height="108" rx="10" fill="#FFFFFF" stroke="#A8672D" strokeWidth="6" />
      <path d="M130 138 V176 M232 138 V176" stroke="#A8672D" strokeWidth="6" strokeLinecap="round" />
      <text x="180" y="100" textAnchor="middle" fontSize="42" fontWeight="900">
        <tspan fill={BIRU}>6 </tspan>
        <tspan fill={MERAH}>− </tspan>
        <tspan fill={BIRU}>2 </tspan>
        <tspan fill={EMAS}>= </tspan>
        <tspan fill={BIRU}>4</tspan>
      </text>
      <g className="igil-lompat" style={BAWAH}>
        <svg x="6" y="104" width="84" height="56" viewBox="0 0 120 80">
          <IgilWajahIsi />
        </svg>
      </g>
      <path d="M96 128 L112 120" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
    </>
  );
}

/** Buku hlm. 79: Ibu punya enam kue, Upe memakan satu kue. */
function AdeganKueIbu() {
  return (
    <>
      <Latar />
      <Tokoh x={44} y={190} rambut="#1F2937" baju={MERAH_MUDA} s={1.05} />
      <rect x="82" y="150" width="136" height="9" rx="3" fill="#C98A4B" stroke={BIRU} strokeWidth="2" />
      <path d="M92 159 V188 M208 159 V188" stroke={BIRU} strokeWidth="3.6" strokeLinecap="round" />
      <Piring x={150} y={146} lebar={52} />
      {[
        [124, 144],
        [150, 144],
        [176, 144],
        [137, 132],
        [163, 132],
      ].map(([kx, ky], i) => (
        <Kue key={i} x={kx} y={ky} />
      ))}
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={256} y={190} rambut="#7A4A1E" baju={EMAS} s={0.98} angkat />
      </g>
      <Kue x={276} y={150} s={0.9} />
      <Lencana x={226} y={92} teks="−1" />
      <KotakHitung x={92} y={14} teks="6 − 1 = 5" />
    </>
  );
}

/** Buku hlm. 79: tiga orang turun dari mobil, mobil menjadi kosong. */
function AdeganMobil() {
  return (
    <>
      <Latar />
      <rect x="0" y="152" width="300" height="56" fill="#CBD5E1" />
      <path d="M0 152 H300" stroke="#94A3B8" strokeWidth="3" />
      <path d="M10 198 H290" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="14 10" strokeLinecap="round" opacity="0.8" />
      <g transform="translate(8 94) scale(1.62)">
        <KendaraanG jenis="mobil" warna="#2563EB" />
      </g>
      {[
        [206, "#1F2937", HIJAU],
        [238, "#7A4A1E", KUNING],
        [270, MERAH_MUDA, "#FFFFFF"],
      ].map(([tx, rambut, baju], i) => (
        <g key={i} className="igil-lompat" style={{ ...BAWAH, animationDelay: `${i * 0.18}s` }}>
          <Tokoh x={tx as number} y={192} rambut={rambut as string} baju={baju as string} s={0.8} angkat={i === 1} />
        </g>
      ))}
      <PanahKanan x1={150} x2={192} y={122} />
      <Lencana x={236} y={96} teks="−3" />
      <Lencana x={88} y={62} teks="0" />
      <KotakHitung x={92} y={14} teks="3 − 3 = 0" />
    </>
  );
}

/** Buku hlm. 81: enam kupu-kupu di bunga, dua kupu-kupu terbang. */
function AdeganKupu() {
  const kelopak: [number, number][] = [
    [90, 70],
    [112, 82],
    [112, 108],
    [90, 120],
    [68, 108],
    [68, 82],
  ];
  return (
    <>
      <Latar />
      <path d="M90 100 C88 130 94 152 90 176" fill="none" stroke="#2F9E57" strokeWidth="7" strokeLinecap="round" />
      <path d="M90 150 Q64 138 54 152 Q72 164 90 154 Z M90 140 Q116 128 128 142 Q108 154 90 144 Z" fill="#4ADE80" stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
      {kelopak.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="15" fill={i % 2 === 0 ? MERAH_MUDA : "#F9A8D4"} stroke={BIRU} strokeWidth="2.4" />
      ))}
      <circle cx="90" cy="95" r="14" fill={KUNING} stroke={BIRU} strokeWidth="2.6" />
      <Kupu x={90} y={64} s={0.8} warna={UNGU_MUDA} />
      <Kupu x={124} y={92} s={0.8} warna="#93C5FD" putar={50} />
      <Kupu x={54} y={96} s={0.8} warna={UNGU_MUDA} putar={-50} />
      <Kupu x={90} y={126} s={0.8} warna="#93C5FD" putar={180} />
      <g className="igil-lompat" style={BAWAH}>
        <Kupu x={200} y={62} s={0.95} warna="#FDBA74" putar={20} />
      </g>
      <g className="igil-lompat" style={{ ...BAWAH, animationDelay: "0.3s" }}>
        <Kupu x={256} y={36} s={0.95} warna="#FCA5A5" putar={30} />
      </g>
      <PanahKanan x1={148} x2={186} y={96} />
      <Lencana x={236} y={112} teks="−2" />
      <KotakHitung x={150} y={160} w={124} teks="6 − 2 = 4" />
    </>
  );
}

/** Buku hlm. 80: Ayo bermain, lima kelereng di piring, satu kelereng diambil. */
function AdeganKelereng() {
  const warna = [MERAH_MUDA, HIJAU, KUNING, "#93C5FD", EMAS];
  return (
    <>
      <Latar />
      <Tokoh x={36} y={190} rambut="#7A4A1E" baju={EMAS} s={0.95} angkat />
      <Tokoh x={266} y={190} rambut="#1F2937" baju="#FFFFFF" s={0.92} />
      <rect x="64" y="136" width="172" height="9" rx="3" fill="#C98A4B" stroke={BIRU} strokeWidth="2" />
      <path d="M74 145 V184 M226 145 V184" stroke={BIRU} strokeWidth="3.6" strokeLinecap="round" />
      <Piring x={150} y={130} lebar={42} />
      {[
        [133, 126],
        [150, 123],
        [167, 126],
        [141, 134],
      ].map(([kx, ky], i) => (
        <Kelereng key={i} x={kx} y={ky} warna={warna[i % warna.length]} />
      ))}
      <g className="igil-lompat" style={BAWAH}>
        <Kelereng x={58} y={150} warna={warna[4]} />
      </g>
      <PanahKanan x1={96} x2={116} y={118} />
      <g className="igil-lompat" style={BAWAH}>
        <rect x="104" y="40" width="92" height="34" rx="12" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
        <path d="M144 74 L150 86 L156 74 Z" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
        <rect x="146" y="72" width="8" height="4" fill="#FFFFFF" />
        <text x="150" y="65" textAnchor="middle" fontSize="20" fontWeight="900" fill={BIRU}>
          5 − 1 = ?
        </text>
      </g>
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita pengurangan">
      {id === "A3-S1" && <AdeganTutupMata />}
      {id === "A3-S2" && <AdeganPapan />}
      {id === "A3-S3" && <AdeganKueIbu />}
      {id === "A3-S4" && <AdeganMobil />}
      {id === "A3-S5" && <AdeganKupu />}
      {id === "A3-S6" && <AdeganKelereng />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 77-81). Tokoh hanya Kira, Upe, Wei, Halim, Malosi, Tika, dan Igil. */
export const CERITA_A3: Cerita[] = [
  {
    id: "A3-S1",
    sceneType: "tutup-mata-pulang",
    voiceNarration:
      "Enam sekawan sedang bermain tutup mata. Tetapi, Malosi dan Tika harus pulang. Sekarang tersisa Kira, Upe, Wei, dan Halim. Apakah jumlah anak menjadi lebih sedikit? Ya. Mula-mula enam anak, berkurang dua anak, sisanya empat anak.",
  },
  {
    id: "A3-S2",
    sceneType: "papan-kurang",
    voiceNarration:
      "Igil menulis cerita tutup mata di papan. Mula-mula enam anak. Berkurang dua anak. Sisanya empat anak. Tanda kurang dipakai untuk pengurangan. Kita tulis: enam, tanda kurang, dua, tanda sama dengan, empat. Kita baca: enam dikurangi dua sama dengan empat. Boleh juga dibaca: enam dikurangi dua hasilnya empat. Pengurangan artinya jumlah yang berkurang.",
  },
  {
    id: "A3-S3",
    sceneType: "kue-ibu",
    voiceNarration:
      "Ibu mempunyai enam kue. Upe memakan satu kue. Sisa kue Ibu adalah lima. Kita tulis: enam kurang satu sama dengan lima. Enam dikurangi satu hasilnya lima.",
  },
  {
    id: "A3-S4",
    sceneType: "mobil-turun",
    voiceNarration:
      "Mula-mula ada tiga orang di dalam mobil. Sebanyak tiga orang turun dari mobil. Sekarang tidak ada orang dalam mobil. Tiga dikurangi tiga hasilnya nol. Nol artinya tidak ada yang tersisa.",
  },
  {
    id: "A3-S5",
    sceneType: "kupu-terbang",
    voiceNarration:
      "Ada enam kupu-kupu di bunga. Lalu dua kupu-kupu terbang. Sekarang tersisa empat kupu-kupu di bunga. Enam dikurangi dua sama dengan empat.",
  },
  {
    id: "A3-S6",
    sceneType: "kelereng-ambil",
    voiceNarration:
      "Ayo bermain! Kira menaruh lima kelereng di atas piring. Kira mengambil satu kelereng. Sekarang tersisa empat kelereng. Lima dikurangi satu sama dengan empat. Sekarang giliranmu: buat cerita pengurangan, lalu minta temanmu menjawabnya.",
  },
];

/** Peta pikiran enam simpul: dari menghitung mula-mula sampai memeriksa dengan menggabung. */
export const PETA_PIKIRAN_A3: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Hitung Mula-mula",
    stepDesc:
      "Hitung dulu semua benda sebelum ada yang pergi. Itu bilangan mula-mula. Di permainan tutup mata, mula-mula ada enam anak.",
    icon: "👀",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Cari yang Berkurang",
    stepDesc:
      "Cari benda yang pergi, turun, dimakan, terbang, atau pecah. Banyaknya adalah bilangan yang berkurang. Dua anak pulang, jadi berkurang dua.",
    icon: "👋",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Pakai Tanda Kurang",
    stepDesc:
      "Bendanya jadi lebih sedikit. Itu namanya mengurangi, dan kita pakai tanda kurang. Pengurangan artinya jumlah yang berkurang.",
    icon: "➖",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Hitung Sisanya",
    stepDesc:
      "Hitung benda yang masih tinggal. Itu sisanya. Boleh mencoret atau menyingkirkan benda satu per satu, lalu menghitung yang tinggal. Enam kurangi dua, sisanya empat.",
    icon: "🔢",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Tulis dan Baca",
    stepDesc:
      "Tulis kalimat matematika: enam kurang dua sama dengan empat. Lalu baca: enam dikurangi dua sama dengan empat, atau enam dikurangi dua hasilnya empat.",
    icon: "📝",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Periksa dengan Menggabung",
    stepDesc:
      "Periksa jawabanmu dengan penjumlahan. Sisa empat digabung dengan yang pergi dua, hasilnya enam lagi. Kalau sama dengan mula-mula, jawabanmu benar.",
    icon: "✅",
  },
];

export function CeritaPenguranganA({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_A3} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
