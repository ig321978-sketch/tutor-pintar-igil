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
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";

/* ------------------------------------------------------------------------ */
/* Bab 2 Sub-Bab A: Penjumlahan (Buku Siswa Kelas 1 hlm. 43-50).              */
/* Maskot: Igil si burung hantu. Tokoh buku: Upe, Kira, Malosi, Wei.          */
/* Semua gambar dibuat di klien (SVG). Tidak ada panggilan API.               */
/* ------------------------------------------------------------------------ */

const UNGU = "#A5B4FC";
const MERAH = "#E11D48";
const BIRU_PENSIL = "#2563EB";

function IgilIsi() {
  return (
    <>
      <path d="M24 28 L16 6 L42 18 Z M96 28 L104 6 L78 18 Z" fill="#8B7CF6" stroke={BIRU} strokeWidth="3.2" strokeLinejoin="round" />
      <ellipse cx="60" cy="46" rx="44" ry="31" fill={UNGU} stroke={BIRU} strokeWidth="3.4" />
      <ellipse cx="60" cy="66" rx="22" ry="9" fill="#E0E7FF" />
      <circle cx="40" cy="42" r="15" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <circle cx="80" cy="42" r="15" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <circle cx="42" cy="43" r="7" fill={BIRU} />
      <circle cx="78" cy="43" r="7" fill={BIRU} />
      <circle cx="44" cy="40" r="2.4" fill="#FFFFFF" />
      <circle cx="80" cy="40" r="2.4" fill="#FFFFFF" />
      <path d="M52 52 L60 64 L68 52 Z" fill={EMAS} stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" />
      <ellipse cx="22" cy="56" rx="6" ry="4" fill={MERAH_MUDA} opacity="0.7" />
      <ellipse cx="98" cy="56" rx="6" ry="4" fill={MERAH_MUDA} opacity="0.7" />
    </>
  );
}

/** Wajah Igil untuk maskot di gelembung bicara. */
export function IgilWajah({ kelas = "h-14 w-20" }: { kelas?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={`shrink-0 ${kelas}`} aria-hidden="true">
      <IgilIsi />
    </svg>
  );
}

/* ------------------------------ Gambar benda ---------------------------- */

function Pensil({ x, y, warna, putar = 0 }: { x: number; y: number; warna: string; putar?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${putar})`}>
      <rect x="-3.4" y="-24" width="6.8" height="30" rx="1.4" fill={warna} stroke={BIRU} strokeWidth="1.8" />
      <polygon points="-3.4,6 3.4,6 0,14" fill="#F3C98A" stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      <polygon points="-1.3,10.4 1.3,10.4 0,14" fill={BIRU} />
      <rect x="-3.4" y="-28" width="6.8" height="5" rx="1.4" fill={MERAH_MUDA} stroke={BIRU} strokeWidth="1.6" />
    </g>
  );
}

function MobilMini({ x, y, warna }: { x: number; y: number; warna: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-15 0 V-8 Q-15 -11 -12 -11 H-8 L-4 -18 H6 L10 -11 H12 Q15 -11 15 -8 V0 Z" fill={warna} stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
      <path d="M-3 -11 L-1 -16 H4 L7 -11 Z" fill="#DFF1FF" stroke={BIRU} strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="-8" cy="1" r="4" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
      <circle cx="8" cy="1" r="4" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
    </g>
  );
}

function Bebek({ x, y, s = 1, balik = false }: { x: number; y: number; s?: number; balik?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${balik ? -s : s} ${s})`}>
      <ellipse cx="0" cy="0" rx="13" ry="9" fill={KUNING} stroke={BIRU} strokeWidth="2.2" />
      <path d="M-13 -2 Q-19 -8 -16 -12 Q-10 -6 -8 -4 Z" fill={KUNING} stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="9" cy="-10" r="7" fill={KUNING} stroke={BIRU} strokeWidth="2.2" />
      <path d="M14.5 -10 L21 -8.4 L14.5 -6.6 Z" fill="#F97316" stroke={BIRU} strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="10" cy="-12" r="1.6" fill={BIRU} />
      <path d="M-2 2 Q4 6 9 2" fill="none" stroke={EMAS} strokeWidth="2" strokeLinecap="round" />
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

function Piring({ x, y, lebar = 36 }: { x: number; y: number; lebar?: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y + 3} rx={lebar} ry="8" fill="#C7D2FE" stroke={BIRU} strokeWidth="2.4" />
      <ellipse cx={x} cy={y} rx={lebar} ry="8" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.4" />
      <ellipse cx={x} cy={y} rx={lebar - 10} ry="4.6" fill="none" stroke="#C7D2FE" strokeWidth="2" />
    </g>
  );
}

function PanahKiri({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g className="igil-denyut" style={TENGAH}>
      <path d={`M${x1} ${y} H${x2 + 6}`} stroke={EMAS} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 8" />
      <polygon points={`${x2},${y} ${x2 + 10},${y - 7} ${x2 + 10},${y + 7}`} fill={EMAS} stroke={BIRU} strokeWidth="1.4" strokeLinejoin="round" />
    </g>
  );
}

function Lencana({ x, y, teks }: { x: number; y: number; teks: string }) {
  return (
    <g className="igil-lompat" style={BAWAH}>
      <circle cx={x} cy={y} r="17" fill={EMAS} stroke={BIRU} strokeWidth="3" />
      <text x={x} y={y + 7} textAnchor="middle" fontSize="21" fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 43: empat anak bermain lompat tali, dua anak datang lagi. */
function AdeganTali() {
  return (
    <>
      <Latar />
      <Tokoh x={34} y={186} rambut={BIRU} baju={EMAS} s={0.9} angkat />
      <Tokoh x={186} y={186} rambut="#7A4A1E" baju="#FFFFFF" s={0.9} angkat />
      <path d="M52 148 Q110 82 168 148" fill="none" stroke={MERAH} strokeWidth="3.4" strokeLinecap="round" />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={90} y={172} rambut="#1F2937" baju={HIJAU} s={0.85} />
      </g>
      <g className="igil-lompat" style={{ ...BAWAH, animationDelay: "0.3s" }}>
        <Tokoh x={130} y={172} rambut={MERAH_MUDA} baju={KUNING} s={0.85} />
      </g>
      <Tokoh x={248} y={188} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.8} />
      <Tokoh x={282} y={192} rambut={BIRU} baju={HIJAU} s={0.8} />
      <PanahKiri x1={266} x2={222} y={118} />
      <Lencana x={244} y={92} teks="+2" />
    </>
  );
}

/** Buku hlm. 44: Igil menunjukkan kalimat 4 + 2 = 6 di papan. */
function AdeganPapan() {
  return (
    <>
      <Latar />
      <rect x="82" y="30" width="196" height="108" rx="10" fill="#FFFFFF" stroke="#A8672D" strokeWidth="6" />
      <path d="M130 138 V176 M232 138 V176" stroke="#A8672D" strokeWidth="6" strokeLinecap="round" />
      <text x="180" y="100" textAnchor="middle" fontSize="42" fontWeight="900">
        <tspan fill={BIRU}>4 </tspan>
        <tspan fill="#16A34A">+ </tspan>
        <tspan fill={BIRU}>2 </tspan>
        <tspan fill={EMAS}>= </tspan>
        <tspan fill={BIRU}>6</tspan>
      </text>
      <g className="igil-lompat" style={BAWAH}>
        <svg x="6" y="104" width="84" height="56" viewBox="0 0 120 80">
          <IgilIsi />
        </svg>
      </g>
      <path d="M96 128 L112 120" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
    </>
  );
}

/** Buku hlm. 45: tiga pensil merah dan empat pensil biru digabung ke kotak pensil. */
function AdeganPensil() {
  return (
    <>
      <Latar />
      <Tokoh x={36} y={186} rambut="#7A4A1E" baju="#FFFFFF" s={0.92} angkat />
      <Tokoh x={264} y={186} rambut="#1F2937" baju={KUNING} s={0.92} angkat />
      {[0, 1, 2].map((i) => (
        <Pensil key={`m${i}`} x={22 + i * 11} y={118} warna={MERAH} putar={-14 + i * 12} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Pensil key={`b${i}`} x={236 + i * 10} y={118} warna={BIRU_PENSIL} putar={-16 + i * 11} />
      ))}
      <rect x="108" y="140" width="84" height="40" rx="8" fill="#F3C98A" stroke={BIRU} strokeWidth="3" />
      <path d="M108 154 H192" stroke="#C98A4B" strokeWidth="2.4" />
      {[0, 1, 2].map((i) => (
        <Pensil key={`km${i}`} x={124 + i * 11} y={130} warna={MERAH} putar={-10 + i * 9} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Pensil key={`kb${i}`} x={156 + i * 11} y={130} warna={BIRU_PENSIL} putar={-12 + i * 8} />
      ))}
      <path d="M74 104 H102" stroke={EMAS} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 8" />
      <polygon points="108,104 98,97 98,111" fill={EMAS} stroke={BIRU} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M226 104 H198" stroke={EMAS} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 8" />
      <polygon points="192,104 202,97 202,111" fill={EMAS} stroke={BIRU} strokeWidth="1.4" strokeLinejoin="round" />
    </>
  );
}

/** Buku hlm. 46: empat mobil kuning dan empat mobil merah di atas karpet. */
function AdeganMobil() {
  return (
    <>
      <Latar />
      <rect x="14" y="140" width="214" height="56" rx="8" fill="#FFE4E6" stroke={BIRU} strokeWidth="3" />
      <path d="M22 152 H220 M22 184 H220" stroke={MERAH_MUDA} strokeWidth="3" strokeDasharray="6 6" />
      {[0, 1, 2, 3].map((i) => (
        <g key={`k${i}`} className="igil-lompat" style={{ ...BAWAH, animationDelay: `${i * 0.12}s` }}>
          <MobilMini x={42 + i * 50} y={166} warna={KUNING} />
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <MobilMini key={`m${i}`} x={42 + i * 50} y={190} warna={MERAH} />
      ))}
      <Tokoh x={264} y={190} rambut={BIRU} baju={HIJAU} s={0.95} angkat />
      <Lencana x={256} y={66} teks="8" />
    </>
  );
}

/** Buku hlm. 49: lima bebek di kolam, dua bebek datang lagi. */
function AdeganBebek() {
  return (
    <>
      <Latar />
      <ellipse cx="150" cy="168" rx="136" ry="30" fill="#9FD8FF" stroke={BIRU} strokeWidth="3" />
      <path d="M40 168 Q54 163 68 168 M120 178 Q134 173 148 178 M210 166 Q224 161 238 166" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      {[
        [48, 164],
        [80, 172],
        [110, 162],
        [66, 150],
        [100, 148],
      ].map(([bx, by], i) => (
        <g key={i} className="igil-lompat" style={{ ...BAWAH, animationDelay: `${i * 0.1}s` }}>
          <Bebek x={bx} y={by} s={0.95} />
        </g>
      ))}
      <Bebek x={216} y={160} s={0.95} balik />
      <Bebek x={252} y={172} s={0.95} balik />
      <PanahKiri x1={278} x2={176} y={126} />
      <Lencana x={226} y={96} teks="+2" />
    </>
  );
}

/** Buku hlm. 50: Ayo bermain, lima kelereng di satu piring dan tiga di piring lain. */
function AdeganPiring() {
  const warna = [MERAH_MUDA, HIJAU, KUNING, "#93C5FD", EMAS];
  return (
    <>
      <Latar />
      <Tokoh x={30} y={190} rambut="#7A4A1E" baju={EMAS} s={0.9} angkat />
      <Tokoh x={272} y={190} rambut="#1F2937" baju="#FFFFFF" s={0.9} angkat />
      <rect x="56" y="136" width="188" height="9" rx="3" fill="#C98A4B" stroke={BIRU} strokeWidth="2" />
      <path d="M66 145 V184 M234 145 V184" stroke={BIRU} strokeWidth="3.6" strokeLinecap="round" />
      <Piring x={106} y={130} lebar={38} />
      <Piring x={198} y={130} lebar={38} />
      {[
        [90, 126],
        [104, 123],
        [118, 126],
        [97, 134],
        [112, 134],
      ].map(([kx, ky], i) => (
        <Kelereng key={`a${i}`} x={kx} y={ky} warna={warna[i % warna.length]} />
      ))}
      {[
        [186, 126],
        [200, 123],
        [193, 134],
      ].map(([kx, ky], i) => (
        <Kelereng key={`b${i}`} x={kx} y={ky} warna={warna[(i + 2) % warna.length]} />
      ))}
      <g className="igil-lompat" style={BAWAH}>
        <rect x="112" y="48" width="76" height="34" rx="12" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
        <path d="M144 82 L150 94 L156 82 Z" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
        <rect x="146" y="80" width="8" height="4" fill="#FFFFFF" />
        <text x="150" y="73" textAnchor="middle" fontSize="20" fontWeight="900" fill={BIRU}>
          5 + 3 = ?
        </text>
      </g>
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita penjumlahan">
      {id === "A2-S1" && <AdeganTali />}
      {id === "A2-S2" && <AdeganPapan />}
      {id === "A2-S3" && <AdeganPensil />}
      {id === "A2-S4" && <AdeganMobil />}
      {id === "A2-S5" && <AdeganBebek />}
      {id === "A2-S6" && <AdeganPiring />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 43-50). Tokoh hanya Upe, Kira, Malosi, Wei, dan Igil. */
export const CERITA_A2: Cerita[] = [
  {
    id: "A2-S1",
    sceneType: "tali-datang-lagi",
    voiceNarration:
      "Di halaman sekolah, empat anak bermain lompat tali. Tidak lama kemudian, datang lagi dua anak. Mereka ikut bermain. Sekarang ada enam anak. Anak yang bermain bertambah.",
  },
  {
    id: "A2-S2",
    sceneType: "papan-kalimat",
    voiceNarration:
      "Igil menulis cerita lompat tali di papan. Mula-mula empat anak. Datang lagi dua anak. Semuanya enam anak. Kita tulis: empat, tanda tambah, dua, tanda sama dengan, enam. Kita baca: empat ditambah dua sama dengan enam.",
  },
  {
    id: "A2-S3",
    sceneType: "pensil-digabung",
    voiceNarration:
      "Kira punya tiga pensil merah. Upe punya empat pensil biru. Mereka menggabungkan semua pensil ke satu kotak. Sekarang ada tujuh pensil. Menjumlahkan artinya menggabungkan.",
  },
  {
    id: "A2-S4",
    sceneType: "mobil-mainan",
    voiceNarration:
      "Malosi bermain mobil mainan di atas karpet. Ada empat mobil kuning dan empat mobil merah. Empat ditambah empat sama dengan delapan. Semuanya ada delapan mobil.",
  },
  {
    id: "A2-S5",
    sceneType: "bebek-kolam",
    voiceNarration:
      "Di kolam ada lima bebek yang sedang berenang. Lalu datang lagi dua bebek. Lima ditambah dua sama dengan tujuh. Sekarang ada tujuh bebek di kolam.",
  },
  {
    id: "A2-S6",
    sceneType: "dua-piring-kelereng",
    voiceNarration:
      "Ayo bermain! Upe menaruh lima kelereng di satu piring. Wei menaruh tiga kelereng di piring yang lain. Berapa jumlah semua kelereng? Lima ditambah tiga sama dengan delapan.",
  },
];

/** Peta pikiran empat simpul: mula-mula, datang atau digabung, hitung semua, tulis dan baca. */
export const PETA_PIKIRAN_A2: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Lihat Mula-mula",
    stepDesc:
      "Hitung dulu benda yang sudah ada. Itu bilangan mula-mula. Di lompat tali, mula-mula ada empat anak.",
    icon: "👀",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Datang Lagi atau Digabung",
    stepDesc:
      "Ada yang datang lagi, atau dua kelompok digabung. Bendanya jadi lebih banyak. Itu namanya menjumlahkan, dan kita pakai tanda tambah.",
    icon: "➕",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Hitung Semuanya",
    stepDesc:
      "Hitung semua benda yang sudah bersama. Hasilnya ditulis setelah tanda sama dengan. Empat anak ditambah dua anak, semuanya enam anak.",
    icon: "🔢",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Tulis dan Baca",
    stepDesc:
      "Tulis kalimat matematika: empat tambah dua sama dengan enam. Lalu baca: empat ditambah dua sama dengan enam.",
    icon: "📝",
  },
];

export function CeritaPenjumlahanA({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_A2} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}

/** Pensil kecil bergaya buku untuk permainan (merah atau biru). */
export function PensilIkon({ warna, kelas = "h-10 w-5" }: { warna: "merah" | "biru"; kelas?: string }) {
  return (
    <svg viewBox="-8 -30 16 46" className={`block ${kelas}`} aria-hidden="true">
      <Pensil x={0} y={0} warna={warna === "merah" ? MERAH : BIRU_PENSIL} />
    </svg>
  );
}
