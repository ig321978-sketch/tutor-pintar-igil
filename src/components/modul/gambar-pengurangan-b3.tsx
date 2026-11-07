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
import { Lencana } from "./gambar-cara-b2";
import { Tokoh } from "./gambar-maju-mundur-c";
import { KendaraanG } from "./gambar-soal-cerita-c2";
import type { LangkahPeta } from "./PetaPikiranB";

/* ------------------------------------------------------------------------ */
/* Bab 3 Sub-Bab B: Berbagai Cara Melakukan Pengurangan (Buku Siswa Kelas 1   */
/* hlm. 88-100). Tiga cara: pasangan bilangan, menghitung mundur, dan         */
/* pengurangan dari 10. Semua gambar dibuat di klien (SVG), tanpa API.        */
/* Naskah: naskah/mtk-1-bab3-sub-b-berbagai-cara.md                           */
/* ------------------------------------------------------------------------ */

const MERAH = "#E11D48";

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

/** Telur. Titik (x, y) ada di dasar telur. `pecah` memperlihatkan kulit bergerigi dan kuning telur. */
function Telur({ x, y, pecah = false }: { x: number; y: number; pecah?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {pecah ? (
        <>
          <path
            d="M-9 -9 L-5 -14 L-2 -9 L2 -15 L5 -9 L9 -13 L9 -6 Q9 1 0 1 Q-9 1 -9 -6 Z"
            fill="#FFF1D6"
            stroke={BIRU}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="0" cy="-8" r="4" fill="#FBBF24" stroke={BIRU} strokeWidth="1.2" />
        </>
      ) : (
        <>
          <ellipse cx="0" cy="-10" rx="8.5" ry="11" fill="#FFF1D6" stroke={BIRU} strokeWidth="1.8" />
          <path d="M-4.4 -15 Q-3 -19 0 -19.5" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
    </g>
  );
}

/** Balon. Titik (x, y) ada di tengah balon, tali menjulur ke bawah sampai (tx, ty). */
function Balon({ x, y, warna, tx, ty }: { x: number; y: number; warna: string; tx: number; ty: number }) {
  return (
    <g>
      <path d={`M${x} ${y + 15} Q${(x + tx) / 2 + 6} ${(y + ty) / 2} ${tx} ${ty}`} fill="none" stroke={BIRU} strokeWidth="1.4" />
      <ellipse cx={x} cy={y} rx="12" ry="15" fill={warna} stroke={BIRU} strokeWidth="2" />
      <path d={`M${x - 5} ${y - 7} Q${x - 4} ${y - 11} ${x} ${y - 11}`} fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      <path d={`M${x - 3} ${y + 16} L${x + 3} ${y + 16} L${x} ${y + 11} Z`} fill={warna} stroke={BIRU} strokeWidth="1.4" strokeLinejoin="round" />
    </g>
  );
}

function Bola({ x, y, warna }: { x: number; y: number; warna: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="11" fill={warna} stroke={BIRU} strokeWidth="2" />
      <path d="M-6 -2 Q-4 -8 2 -8" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
    </g>
  );
}

/** Bagan pasangan kecil: gabungan di kiri, dua sebagian di kanan. Titik kiri atas (x, y), lebar 96, tinggi 54. */
function Bagan({ x, y, g, a, b }: { x: number; y: number; g: string; a: string; b: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-4" y="-6" width="104" height="66" rx="14" fill="#FFFFFF" fillOpacity="0.88" stroke={BIRU} strokeWidth="2" />
      <path d="M36 26 L66 12 M36 28 L66 44" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="27" r="19" fill={KUNING} stroke={BIRU} strokeWidth="3" />
      <circle cx="80" cy="12" r="13" fill="#C7D2FE" stroke={BIRU} strokeWidth="3" />
      <circle cx="80" cy="44" r="13" fill="#C7D2FE" stroke={BIRU} strokeWidth="3" />
      <g fontWeight="900" fill={BIRU} textAnchor="middle">
        <text x="20" y="35" fontSize="22">
          {g}
        </text>
        <text x="80" y="17.5" fontSize="15">
          {a}
        </text>
        <text x="80" y="49.5" fontSize="15">
          {b}
        </text>
      </g>
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

/** Sungai kecil dengan batu loncatan bernomor. Busur emas menunjukkan lompatan ke belakang. */
function SungaiBatu({ nomor, x0, jarak, dari, ke }: { nomor: number[]; x0: number; jarak: number; dari: number; ke: number }) {
  const px = (n: number) => x0 + (n - nomor[0]) * jarak;
  const busur: number[] = [];
  for (let n = dari; n > ke; n--) busur.push(n);
  return (
    <>
      <path d="M0 146 Q38 138 75 146 T150 146 T225 146 T300 146 V208 H0 Z" fill="#9CCBF5" />
      <path d="M14 186 q8 -5 16 0 M120 196 q8 -5 16 0 M230 188 q8 -5 16 0 M70 200 q8 -5 16 0" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.9" />
      {busur.map((n) => (
        <g key={n}>
          <path
            d={`M${px(n) - 6} 156 Q${(px(n) + px(n - 1)) / 2} 112 ${px(n - 1) + 6} 156`}
            fill="none"
            stroke={EMAS}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="1 8"
          />
          <polygon
            points={`${px(n - 1) + 6},158 ${px(n - 1) + 15},148 ${px(n - 1) + 1},146`}
            fill={EMAS}
            stroke={BIRU}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </g>
      ))}
      {nomor.map((n) => (
        <g key={n}>
          <ellipse cx={px(n)} cy="170" rx="19" ry="11" fill="#9CA3AF" stroke={BIRU} strokeWidth="2.4" />
          <ellipse cx={px(n)} cy="167" rx="19" ry="10" fill="#E5E7EB" stroke={BIRU} strokeWidth="2.4" />
          <text x={px(n)} y="173" textAnchor="middle" fontSize="16" fontWeight="900" fill={BIRU}>
            {n}
          </text>
        </g>
      ))}
    </>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 88: enam telur di piring, empat utuh dan dua pecah. */
function AdeganTelur() {
  return (
    <>
      <Latar />
      <Tokoh x={40} y={190} rambut="#7A4A1E" baju="#FFFFFF" s={1.05} />
      <rect x="64" y="150" width="150" height="9" rx="3" fill="#C98A4B" stroke={BIRU} strokeWidth="2" />
      <path d="M74 159 V188 M204 159 V188" stroke={BIRU} strokeWidth="3.6" strokeLinecap="round" />
      <Piring x={139} y={146} lebar={54} />
      {[
        [112, 146, false],
        [139, 146, false],
        [166, 146, false],
        [125, 137, false],
        [153, 137, true],
        [139, 130, true],
      ].map(([ex, ey, pc], i) => (
        <Telur key={i} x={ex as number} y={ey as number} pecah={pc as boolean} />
      ))}
      <Lencana x={139} y={92} teks="6" />
      <Bagan x={196} y={64} g="6" a="4" b="2" />
      <KotakHitung x={92} y={14} teks="6 − 2 = 4" />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={262} y={192} rambut="#1F2937" baju={HIJAU} s={0.82} angkat />
      </g>
    </>
  );
}

/** Buku hlm. 89: tujuh balon, lima merah dan dua kuning. */
function AdeganBalon() {
  const warna = [MERAH, MERAH, "#FBBF24", MERAH, MERAH, "#FBBF24", MERAH];
  const pos: [number, number][] = [
    [34, 70],
    [58, 48],
    [88, 40],
    [116, 54],
    [138, 82],
    [46, 100],
    [100, 88],
  ];
  return (
    <>
      <Latar />
      {pos.map(([bx, by], i) => (
        <Balon key={i} x={bx} y={by} warna={warna[i]} tx={72} ty={152} />
      ))}
      <Tokoh x={72} y={190} rambut={BIRU} baju={EMAS} s={1} angkat />
      <Bagan x={186} y={20} g="7" a="5" b="2" />
      <KotakHitung x={170} y={102} w={124} teks="7 − 5 = 2" />
      <KotakHitung x={170} y={142} w={124} teks="7 − 2 = 5" />
    </>
  );
}

/** Buku hlm. 90: tiga orang turun dari mobil, pasangan 3 dan 0. */
function AdeganMobilNol() {
  return (
    <>
      <Latar />
      <rect x="0" y="152" width="300" height="56" fill="#CBD5E1" />
      <path d="M0 152 H300" stroke="#94A3B8" strokeWidth="3" />
      <path d="M10 198 H290" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="14 10" strokeLinecap="round" opacity="0.8" />
      <g transform="translate(8 94) scale(1.62)">
        <KendaraanG jenis="mobil" warna="#EA580C" />
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
      <Bagan x={192} y={18} g="3" a="3" b="0" />
      <KotakHitung x={10} y={14} teks="3 − 3 = 0" />
      <KotakHitung x={10} y={54} teks="3 − 0 = 3" />
    </>
  );
}

/** Buku hlm. 94: Upe di batu angka 3 melompat dua langkah ke belakang. */
function AdeganLompatTiga() {
  return (
    <>
      <Latar />
      <SungaiBatu nomor={[1, 2, 3, 4, 5]} x0={44} jarak={53} dari={3} ke={1} />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={150} y={164} rambut={BIRU} baju={EMAS} s={0.78} angkat />
      </g>
      <Lencana x={256} y={76} teks="−2" />
      <KotakHitung x={14} y={14} teks="3 − 2 = 1" />
      <KotakHitung x={14} y={54} w={116} ukuran={15} teks="3 → 2 → 1" />
    </>
  );
}

/** Buku hlm. 94-95: Kira di batu angka 5 melompat tiga langkah ke belakang. */
function AdeganLompatLima() {
  return (
    <>
      <Latar />
      <SungaiBatu nomor={[1, 2, 3, 4, 5, 6]} x0={36} jarak={46} dari={5} ke={2} />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={220} y={164} rambut="#7A4A1E" baju="#FFFFFF" s={0.78} angkat />
      </g>
      <Lencana x={258} y={76} teks="−3" />
      <KotakHitung x={14} y={14} teks="5 − 3 = 2" />
      <KotakHitung x={14} y={54} w={140} ukuran={15} teks="5 → 4 → 3 → 2" />
    </>
  );
}

/** Buku hlm. 98: sepuluh bola, tujuh merah dan tiga biru. */
function AdeganSepuluhBola() {
  return (
    <>
      <Latar />
      <Tokoh x={34} y={190} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.98} angkat />
      <Tokoh x={268} y={190} rambut="#1F2937" baju={KUNING} s={0.92} />
      <rect x="66" y="98" width="168" height="76" rx="16" fill="#FFFFFF" fillOpacity="0.92" stroke={BIRU} strokeWidth="3.4" />
      {Array.from({ length: 10 }, (_, i) => (
        <Bola key={i} x={92 + (i % 5) * 29} y={(i < 5 ? 124 : 152)} warna={i < 7 ? MERAH : "#38BDF8"} />
      ))}
      <g className="igil-denyut" style={TENGAH}>
        <Lencana x={150} y={78} teks="10" />
      </g>
      <Bagan x={196} y={6} g="10" a="7" b="3" />
      <KotakHitung x={10} y={10} teks="10 − 7 = 3" />
      <KotakHitung x={10} y={50} teks="10 − 3 = 7" />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita berbagai cara pengurangan">
      {id === "B3-S1" && <AdeganTelur />}
      {id === "B3-S2" && <AdeganBalon />}
      {id === "B3-S3" && <AdeganMobilNol />}
      {id === "B3-S4" && <AdeganLompatTiga />}
      {id === "B3-S5" && <AdeganLompatLima />}
      {id === "B3-S6" && <AdeganSepuluhBola />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 88-98). Tokoh hanya Kira, Upe, Wei, Halim, Malosi, Tika, dan Igil. */
export const CERITA_B3: Cerita[] = [
  {
    id: "B3-S1",
    sceneType: "telur-pasangan",
    voiceNarration:
      "Igil bertanya: bagaimana caramu melakukan pengurangan? Jelaskan caranya. Cara pertama memakai pasangan bilangan. Ada enam telur di piring. Empat telur masih utuh. Dua telur pecah. Enam adalah gabungan. Empat dan dua adalah sebagian. Empat dan dua jika digabung menjadi enam. Enam dikurangi dua sama dengan empat. Enam dikurangi empat sama dengan dua.",
  },
  {
    id: "B3-S2",
    sceneType: "balon-pasangan",
    voiceNarration:
      "Kira membawa tujuh balon. Lima balon berwarna merah. Dua balon berwarna kuning. Tujuh adalah gabungan. Lima dan dua adalah sebagian. Lima dan dua jika digabung menjadi tujuh. Tujuh dikurangi lima sama dengan dua. Tujuh dikurangi dua sama dengan lima.",
  },
  {
    id: "B3-S3",
    sceneType: "mobil-nol",
    voiceNarration:
      "Mula-mula ada tiga orang di dalam mobil. Sebanyak tiga orang turun dari mobil. Sekarang tidak ada orang di dalam mobil. Tiga dan nol jika digabung menjadi tiga. Tiga dikurangi tiga sama dengan nol. Tiga dikurangi nol sama dengan tiga.",
  },
  {
    id: "B3-S4",
    sceneType: "lompat-mundur-tiga",
    voiceNarration:
      "Cara kedua adalah menghitung mundur. Upe berdiri di batu angka tiga. Upe melompat dua langkah ke belakang. Dua, satu. Upe mendarat di angka satu. Tiga dikurangi dua sama dengan satu.",
  },
  {
    id: "B3-S5",
    sceneType: "lompat-mundur-lima",
    voiceNarration:
      "Kira berdiri di angka lima. Kira melompat tiga langkah ke belakang. Empat, tiga, dua. Kira mendarat di angka dua. Lima dikurangi tiga sama dengan dua. Menghitung mundur artinya menyebut angka dari besar ke kecil.",
  },
  {
    id: "B3-S6",
    sceneType: "sepuluh-bola",
    voiceNarration:
      "Cara ketiga adalah pengurangan dari sepuluh. Ada sepuluh bola. Tujuh bola merah dan tiga bola biru. Kita tulis sepuluh dikurangi tujuh sama dengan tiga. Kita juga bisa menulis sepuluh dikurangi tiga sama dengan tujuh. Sekarang giliranmu: pilih satu cara, lalu jelaskan kepada temanmu.",
  },
];

/** Peta pikiran enam simpul: dari memisahkan gabungan sampai pengurangan dari 10. */
export const PETA_PIKIRAN_B3: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Pisahkan Gabungan",
    stepDesc:
      "Satu kelompok benda boleh dipisah menjadi dua bagian. Kelompok utuhnya disebut gabungan. Dua bagiannya disebut sebagian. Enam telur dipisah menjadi empat utuh dan dua pecah.",
    icon: "🥚",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Gambar Bagan Pasangan",
    stepDesc:
      "Tulis gabungan di lingkaran besar sebelah kiri. Tulis dua sebagian di lingkaran kecil sebelah kanan. Empat dan dua jika digabung menjadi enam.",
    icon: "🔵",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Satu Bagan, Dua Pengurangan",
    stepDesc:
      "Dari satu bagan kita bisa menulis dua pengurangan. Gabungan dikurangi sebagian pertama menghasilkan sebagian kedua, dan sebaliknya. Enam kurang dua sama dengan empat. Enam kurang empat sama dengan dua.",
    icon: "✌️",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Hitung Mundur",
    stepDesc:
      "Mulai dari bilangan yang dikurangi. Lompat ke belakang sebanyak bilangan pengurang. Angka tempat mendarat adalah hasilnya. Lima, lompat tiga ke belakang, mendarat di dua.",
    icon: "🐸",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Nol dan Bilangan Sama",
    stepDesc:
      "Kalau yang dikurangi nol, jawabannya tetap sama dengan bilangan awal. Kalau yang dikurangi sama besar dengan bilangan awal, jawabannya nol. Lima kurang nol sama dengan lima. Lima kurang lima sama dengan nol.",
    icon: "0️⃣",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Pengurangan dari 10",
    stepDesc:
      "Bingkai sepuluh punya sepuluh petak. Petak yang terisi dan petak yang kosong jika digabung menjadi sepuluh. Sepuluh kurang tujuh sama dengan tiga, karena tiga petak masih kosong.",
    icon: "🔟",
  },
];

export function CeritaPenguranganB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_B3} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
