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
  type Cerita,
} from "./CeritaBandingB";
import { Lencana } from "./gambar-cara-b2";
import { Daun, KepikG, KotakHitung } from "./gambar-hubungan-c3";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";

/* ------------------------------------------------------------------------ */
/* Bab 3 Sub-Bab D: Soal Cerita Pengurangan (Buku Siswa Kelas 1 hlm. 106-108  */
/* dan Ayo Berkarya hlm. 113). Mula-mula, pergi, sisa. Mencari sisa, yang     */
/* pergi, dan mula-mula. Mengurangi dua kali.                                 */
/* Semua gambar dibuat di klien (SVG), tanpa API.                             */
/* Naskah: naskah/mtk-1-bab3-sub-d-soal-cerita.md                             */
/* ------------------------------------------------------------------------ */

const MERAH = "#E11D48";
export const WARNA_BURUNG = "#B9573F";

/* ------------------------------ Gambar benda ---------------------------- */

/** Burung hinggap menghadap kanan. viewBox 0 0 46 44. Sayap terangkat bila `terbang`. */
function BadanBurung({ terbang = false }: { terbang?: boolean }) {
  return (
    <>
      <path d="M12 26 L1 22 L3 30 L1 36 L13 33 Z" fill="#8F3E2B" stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
      {!terbang ? (
        <>
          <path d="M20 36 V43 M28 36 V43" stroke="#F59E0B" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M14 43 H22 M22 43 H30" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : null}
      <ellipse cx="24" cy="26" rx="15.5" ry="11" fill={WARNA_BURUNG} stroke={BIRU} strokeWidth="2.2" />
      <ellipse cx="28" cy="31" rx="8.5" ry="5.6" fill="#FBD9B0" />
      {terbang ? (
        <path d="M14 22 Q10 4 28 2 Q26 12 30 22 Z" fill="#8F3E2B" stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
      ) : (
        <path d="M12 24 Q20 15 31 23 Q24 32 14 29 Z" fill="#8F3E2B" stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
      )}
      <circle cx="34" cy="15" r="9" fill={WARNA_BURUNG} stroke={BIRU} strokeWidth="2.2" />
      <circle cx="37.2" cy="13.4" r="2.8" fill="#FFFFFF" stroke={BIRU} strokeWidth="1" />
      <circle cx="38" cy="13.6" r="1.4" fill={BIRU} />
      <path d="M42 14 L46 17 L42 19.5 Z" fill="#F59E0B" stroke={BIRU} strokeWidth="1.4" strokeLinejoin="round" />
    </>
  );
}

export function BurungSVG({ kelas = "h-11 w-11", terbang = false }: { kelas?: string; terbang?: boolean }) {
  return (
    <svg viewBox="0 0 48 44" className={`block ${kelas}`} aria-hidden="true">
      <BadanBurung terbang={terbang} />
    </svg>
  );
}

/** Burung di adegan. Titik (x, y) ada di dasar kaki. */
function BurungG({ x, y, s = 0.8, terbang = false, kiri = false, putar = 0 }: { x: number; y: number; s?: number; terbang?: boolean; kiri?: boolean; putar?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${putar}) scale(${kiri ? -s : s} ${s}) translate(-23 -${terbang ? 22 : 43})`}>
      <BadanBurung terbang={terbang} />
    </g>
  );
}

/** Bola pantai tiga warna. viewBox 0 0 40 40. */
export function BolaSVG({ kelas = "h-10 w-10" }: { kelas?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`block ${kelas}`} aria-hidden="true">
      <circle cx="20" cy="20" r="17" fill="#FACC15" />
      <path d="M20 20 L20 3 A17 17 0 0 1 34.7 11.5 Z" fill="#EF4444" />
      <path d="M20 20 L5.3 28.5 A17 17 0 0 1 5.3 11.5 Z" fill="#38BDF8" />
      <path d="M20 20 L34.7 28.5 A17 17 0 0 1 20 37 Z" fill="#22C55E" />
      <circle cx="20" cy="20" r="17" fill="none" stroke={BIRU} strokeWidth="2.6" />
      <circle cx="20" cy="20" r="3.2" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.6" />
      <path d="M10 15 Q12 9 19 7.5" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

function BolaG({ x, y, s = 0.8 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) translate(-20 -37)`}>
      <circle cx="20" cy="20" r="17" fill="#FACC15" />
      <path d="M20 20 L20 3 A17 17 0 0 1 34.7 11.5 Z" fill="#EF4444" />
      <path d="M20 20 L5.3 28.5 A17 17 0 0 1 5.3 11.5 Z" fill="#38BDF8" />
      <path d="M20 20 L34.7 28.5 A17 17 0 0 1 20 37 Z" fill="#22C55E" />
      <circle cx="20" cy="20" r="17" fill="none" stroke={BIRU} strokeWidth="2.6" />
      <circle cx="20" cy="20" r="3.2" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.6" />
    </g>
  );
}

/** Kelereng kaca. viewBox 0 0 36 36. */
export function KelerengSVG({ warna, kelas = "h-8 w-8" }: { warna: string; kelas?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={`block ${kelas}`} aria-hidden="true">
      <circle cx="18" cy="18" r="15" fill={warna} stroke={BIRU} strokeWidth="2.4" />
      <path d="M6 20 Q14 10 30 16" fill="none" stroke="#FFFFFF" strokeWidth="2.2" opacity="0.55" strokeLinecap="round" />
      <path d="M9 13 Q11 8 17 7" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

function KelerengG({ x, y, warna, s = 0.5 }: { x: number; y: number; warna: string; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) translate(-18 -33)`}>
      <circle cx="18" cy="18" r="15" fill={warna} stroke={BIRU} strokeWidth="2.6" />
      <path d="M9 13 Q11 8 17 7" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    </g>
  );
}

/** Kardus terbuka. viewBox 0 0 120 84. */
export function KardusSVG({ kelas = "h-20 w-[120px]" }: { kelas?: string }) {
  return (
    <svg viewBox="0 0 120 84" className={`block ${kelas}`} aria-hidden="true">
      <KardusBadan />
    </svg>
  );
}

function KardusBadan() {
  return (
    <>
      <polygon points="8,26 0,10 32,4 36,26" fill="#D49A5C" stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" />
      <polygon points="112,26 120,10 88,4 84,26" fill="#D49A5C" stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" />
      <rect x="12" y="30" width="96" height="48" rx="3" fill="#E0A96D" stroke={BIRU} strokeWidth="3" />
      <rect x="8" y="24" width="104" height="10" rx="3" fill="#C98B4B" stroke={BIRU} strokeWidth="2.6" />
      <rect x="54" y="34" width="12" height="44" fill="#F3D9A8" opacity="0.85" />
      <path d="M20 46 H44 M76 46 H100" stroke="#B9783E" strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

/** Siswa berdiri. viewBox -22 -60 44 64. */
export function SiswaSVG({ baju, rambut, kelas = "h-14 w-10" }: { baju: string; rambut: string; kelas?: string }) {
  return (
    <svg viewBox="-22 -60 44 64" className={`block ${kelas}`} aria-hidden="true">
      <Tokoh x={0} y={0} rambut={rambut} baju={baju} />
    </svg>
  );
}

export const BAJU_SISWA = [HIJAU, EMAS, MERAH_MUDA, "#FFFFFF", KUNING, "#C7D2FE", "#FDBA74", "#99F6E4", "#E9D5FF", "#FCA5A5"];
export const RAMBUT_SISWA = ["#1F2937", "#7A4A1E", BIRU, "#7A4A1E", "#1F2937", "#7A4A1E", "#1F2937", BIRU, "#7A4A1E", "#1F2937"];

/* ------------------------------ Potongan adegan ---------------------------- */

function Dahan() {
  return (
    <g>
      <path d="M-6 132 Q70 108 150 120 T306 106" fill="none" stroke="#7A4A1E" strokeWidth="15" strokeLinecap="round" />
      <path d="M-6 132 Q70 108 150 120 T306 106" fill="none" stroke="#A8672D" strokeWidth="9" strokeLinecap="round" />
      <path d="M262 108 Q290 80 306 74" fill="none" stroke="#7A4A1E" strokeWidth="8" strokeLinecap="round" />
      {[
        [36, 112],
        [96, 108],
        [196, 118],
        [276, 100],
      ].map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="14" ry="6" transform={`rotate(-20 ${x} ${y})`} fill="#4ADE80" stroke={BIRU} strokeWidth="2" />
      ))}
    </g>
  );
}

/** Buku hlm. 106: enam burung hinggap, dua terbang. */
function AdeganBurung() {
  return (
    <>
      <Latar />
      <Dahan />
      {Array.from({ length: 6 }, (_, i) => (
        <BurungG key={i} x={32 + i * 31} y={i % 2 === 0 ? 119 : 114} s={0.7} />
      ))}
      <g className="igil-lompat" style={BAWAH}>
        <BurungG x={236} y={64} s={0.72} terbang putar={-12} />
      </g>
      <g className="igil-lompat" style={BAWAH}>
        <BurungG x={270} y={40} s={0.62} terbang putar={-18} />
      </g>
      <path d="M200 92 Q226 72 246 66" fill="none" stroke={EMAS} strokeWidth="3.4" strokeLinecap="round" strokeDasharray="1 8" />
      <Lencana x={26} y={40} teks="8" r={15} />
      <KotakHitung x={10} y={150} w={134} teks="8 − 2 = 6" />
      <text x="156" y="173" fontSize="13" fontWeight="900" fill={BIRU}>
        Sisa 6 burung
      </text>
    </>
  );
}

/** Buku hlm. 106: sepuluh kepik di daun, dua terbang. */
function AdeganKepik() {
  const pos: [number, number, number][] = [
    [96, 136, -10],
    [124, 130, 8],
    [152, 134, -6],
    [180, 126, 10],
    [110, 154, 6],
    [140, 152, -8],
    [170, 150, 6],
    [198, 140, -4],
  ];
  return (
    <>
      <Latar />
      <Daun x={60} y={112} />
      {pos.map(([x, y, p], i) => (
        <KepikG key={i} x={x} y={y} s={0.52} putar={p} />
      ))}
      <g className="igil-lompat" style={BAWAH}>
        <KepikG x={236} y={64} s={0.72} terbang putar={14} />
      </g>
      <g className="igil-lompat" style={BAWAH}>
        <KepikG x={268} y={92} s={0.62} terbang putar={20} />
      </g>
      <Lencana x={26} y={40} teks="10" r={16} />
      <KotakHitung x={10} y={168} w={134} teks="10 − 2 = 8" />
    </>
  );
}

/** Buku hlm. 107: tujuh siswa, lima masih di kelas, dua pergi lewat pintu. */
function AdeganKelas() {
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#7DD3E8" />
      <rect x="0" y="150" width="300" height="58" fill="#D4D4D8" />
      <path d="M0 150 H300" stroke="#A1A1AA" strokeWidth="3" />
      <rect x="14" y="14" width="136" height="76" rx="6" fill="#2F4F4F" stroke="#8A5322" strokeWidth="5" />
      <text x="28" y="48" fontSize="18" fontWeight="900" fill="#FFFFFF">
        7 − 5 = 2
      </text>
      <rect x="226" y="20" width="62" height="136" rx="4" fill="#F4A261" stroke={BIRU} strokeWidth="3" />
      <circle cx="240" cy="92" r="4" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
      {Array.from({ length: 5 }, (_, i) => (
        <Tokoh key={i} x={34 + i * 34} y={176} rambut={["#1F2937", "#7A4A1E", BIRU, "#7A4A1E", "#1F2937"][i]} baju={["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"][i]} s={0.78} angkat={i === 1} />
      ))}
      {[0, 1].map((i) => (
        <Tokoh key={`p${i}`} x={228 + i * 30} y={170 + i * 6} rambut={i === 0 ? "#1F2937" : "#7A4A1E"} baju="#FFFFFF" s={0.7} angkat />
      ))}
      <path d="M214 132 H262" stroke={EMAS} strokeWidth="3.4" strokeLinecap="round" strokeDasharray="1 8" />
      <polygon points="266,132 256,127 256,137" fill={EMAS} stroke={BIRU} strokeWidth="1.2" strokeLinejoin="round" />
      <Lencana x={104} y={118} teks="5" r={15} />
      <Lencana x={256} y={198} teks="2" r={13} />
    </>
  );
}

/** Buku hlm. 107: Kira, kardus berisi bola, tiga bola di luar. */
function AdeganKardus() {
  return (
    <>
      <Latar />
      <rect x="0" y="150" width="300" height="58" fill="#F5D9B8" />
      <path d="M0 150 H300" stroke="#D6A46B" strokeWidth="3" />
      {[
        [172, 118],
        [190, 114],
        [208, 118],
        [226, 114],
        [244, 118],
        [181, 106],
        [217, 106],
      ].map(([x, y], i) => (
        <BolaG key={i} x={x} y={y + 14} s={0.62} />
      ))}
      <g transform="translate(160 112) scale(1)">
        <KardusBadan />
      </g>
      <Tokoh x={52} y={196} rambut="#1F2937" baju="#F472B6" s={1} angkat />
      {[
        [108, 196],
        [134, 198],
        [284, 198],
      ].map(([x, y], i) => (
        <BolaG key={`l${i}`} x={x} y={y} s={0.7} />
      ))}
      <Lencana x={26} y={34} teks="10" r={16} />
      <KotakHitung x={150} y={14} w={140} teks="10 − 3 = 7" />
    </>
  );
}

/** Buku hlm. 108: Kira memberi Tika beberapa bola. Sisa enam. */
function AdeganBeriBola() {
  return (
    <>
      <Latar />
      <rect x="0" y="150" width="300" height="58" fill="#F5D9B8" />
      <path d="M0 150 H300" stroke="#D6A46B" strokeWidth="3" />
      {[
        [38, 124],
        [58, 120],
        [78, 124],
        [48, 110],
        [68, 108],
        [88, 112],
      ].map(([x, y], i) => (
        <BolaG key={i} x={x} y={y + 14} s={0.56} />
      ))}
      <g transform="translate(14 118) scale(0.9)">
        <KardusBadan />
      </g>
      <Tokoh x={146} y={196} rambut="#1F2937" baju="#F472B6" s={0.96} angkat />
      <Tokoh x={262} y={196} rambut="#7A4A1E" baju={EMAS} s={0.96} angkat />
      <path d="M170 92 Q210 52 248 90" fill="none" stroke={EMAS} strokeWidth="3.4" strokeLinecap="round" strokeDasharray="1 8" />
      {[
        [188, 70],
        [208, 60],
        [228, 68],
        [244, 84],
      ].map(([x, y], i) => (
        <g key={i} className="igil-lompat" style={BAWAH}>
          <BolaG x={x} y={y + 14} s={0.5} />
        </g>
      ))}
      <Lencana x={26} y={34} teks="10" r={16} />
      <KotakHitung x={148} y={12} w={146} teks="10 − ... = 6" ukuran={19} />
    </>
  );
}

/** Buku hlm. 108: Malosi memberi Kira dua dan Upe empat kelereng. */
function AdeganKelereng() {
  const w = ["#EF4444", "#38BDF8", "#FACC15", "#22C55E"];
  return (
    <>
      <Latar />
      <rect x="0" y="150" width="300" height="58" fill="#F5D9B8" />
      <path d="M0 150 H300" stroke="#D6A46B" strokeWidth="3" />
      <Tokoh x={150} y={190} rambut="#1F2937" baju={HIJAU} s={1.1} angkat />
      <Tokoh x={50} y={196} rambut="#1F2937" baju="#F472B6" s={0.84} angkat />
      <Tokoh x={252} y={196} rambut="#7A4A1E" baju={EMAS} s={0.84} angkat />
      {[0, 1, 2].map((i) => (
        <KelerengG key={`m${i}`} x={118 + i * 18} y={196} warna={w[i]} s={0.52} />
      ))}
      {[0, 1].map((i) => (
        <KelerengG key={`k${i}`} x={30 + i * 18} y={206} warna={w[(i + 1) % 4]} s={0.5} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <KelerengG key={`u${i}`} x={218 + i * 17} y={206} warna={w[(i + 2) % 4]} s={0.5} />
      ))}
      <path d="M126 112 Q96 82 62 100" fill="none" stroke={MERAH} strokeWidth="3.2" strokeLinecap="round" strokeDasharray="1 8" />
      <polygon points="58,102 70,98 68,110" fill={MERAH} stroke={BIRU} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M176 112 Q206 82 240 100" fill="none" stroke="#F59E0B" strokeWidth="3.2" strokeLinecap="round" strokeDasharray="1 8" />
      <polygon points="244,102 232,98 234,110" fill="#F59E0B" stroke={BIRU} strokeWidth="1.2" strokeLinejoin="round" />
      <Lencana x={90} y={78} teks="−2" r={15} />
      <Lencana x={210} y={78} teks="−4" r={15} />
      <KotakHitung x={86} y={10} w={128} teks="9 − 2 − 4 = 3" ukuran={19} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita soal pengurangan">
      {id === "D3-S1" && <AdeganBurung />}
      {id === "D3-S2" && <AdeganKepik />}
      {id === "D3-S3" && <AdeganKelas />}
      {id === "D3-S4" && <AdeganKardus />}
      {id === "D3-S5" && <AdeganBeriBola />}
      {id === "D3-S6" && <AdeganKelereng />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 106-108). */
export const CERITA_D3: Cerita[] = [
  {
    id: "D3-S1",
    sceneType: "burung-pohon",
    voiceNarration:
      "Lihat burung di dahan pohon. Mula-mula ada delapan burung di pohon. Sebanyak dua burung terbang. Berapakah sisa burung sekarang? Delapan dikurangi dua sama dengan enam. Sekarang ada enam burung tersisa.",
  },
  {
    id: "D3-S2",
    sceneType: "kepik-daun",
    voiceNarration:
      "Ada kepik di atas daun. Mula-mula ada sepuluh kepik di atas daun. Sebanyak dua kepik terbang. Berapakah sisa kepik sekarang? Sepuluh dikurangi dua sama dengan delapan. Sekarang tersisa delapan kepik.",
  },
  {
    id: "D3-S3",
    sceneType: "siswa-kelas",
    voiceNarration:
      "Di dalam kelas ada tujuh siswa. Lima siswa masih di dalam kelas. Siswa lainnya pergi. Berapa banyak siswa yang pergi? Yang kita cari sekarang adalah bagian yang pergi. Tujuh dikurangi lima sama dengan dua. Ada dua siswa yang pergi.",
  },
  {
    id: "D3-S4",
    sceneType: "bola-kardus",
    voiceNarration:
      "Kira mempunyai sepuluh bola. Tiga bola ada di luar kardus. Berapa banyak bola di dalam kardus? Sepuluh dikurangi tiga sama dengan tujuh. Ada tujuh bola di dalam kardus.",
  },
  {
    id: "D3-S5",
    sceneType: "beri-bola",
    voiceNarration:
      "Kira mempunyai sepuluh bola. Beberapa bola diberikan kepada Tika. Sisa bola Kira adalah enam. Berapa bola yang diberikan kepada Tika? Yang hilang adalah bola yang diberikan. Sepuluh dikurangi enam sama dengan empat. Ada empat bola yang diberikan kepada Tika. Periksa: enam ditambah empat sama dengan sepuluh.",
  },
  {
    id: "D3-S6",
    sceneType: "kelereng-dua-kali",
    voiceNarration:
      "Malosi mempunyai sembilan kelereng. Malosi memberi Kira dua kelereng. Malosi juga memberi Upe empat kelereng. Berapakah sisa kelereng Malosi? Kita kurangi dua kali. Sembilan dikurangi dua sama dengan tujuh. Tujuh dikurangi empat sama dengan tiga. Sisa kelereng Malosi ada tiga.",
  },
];

/** Peta pikiran enam simpul: dari membaca cerita sampai menjawab dan memeriksa. */
export const PETA_PIKIRAN_D3: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Baca Pelan-Pelan",
    stepDesc:
      "Baca ceritanya sampai selesai. Tanyakan pada dirimu: siapa atau apa yang ada di cerita? Ada berapa mula-mula? Apa yang terjadi? Apa yang ditanyakan?",
    icon: "📖",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Mula-Mula, Pergi, Sisa",
    stepDesc:
      "Cerita pengurangan punya tiga bagian. Mula-mula adalah jumlah di awal. Pergi adalah yang berkurang. Sisa adalah yang masih tinggal. Delapan burung, dua terbang, sisa enam.",
    icon: "🧩",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Cari Kata Kunci",
    stepDesc:
      "Kata terbang, pergi, diberikan, dimakan, dan diambil memberi tahu kita bahwa jumlahnya berkurang. Kalau ada kata itu, kita pakai tanda kurang.",
    icon: "🔑",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Tulis Kalimat Matematika",
    stepDesc:
      "Tulis kalimatnya dengan tiga kotak. Kotak pertama mula-mula, kotak kedua yang berkurang, kotak ketiga hasilnya. Delapan kurang dua sama dengan enam.",
    icon: "✍️",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Apa yang Dicari?",
    stepDesc:
      "Kadang yang dicari adalah sisa. Kadang yang dicari adalah yang pergi. Kadang yang dicari adalah mula-mula. Pada soal dua kali mengurangi, kita kurangi satu per satu dari kiri ke kanan.",
    icon: "❓",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Jawab dan Periksa",
    stepDesc:
      "Tulis jawaban dalam satu kalimat lengkap dengan bendanya. Lalu periksa dengan penjumlahan. Sisa ditambah yang pergi harus sama dengan mula-mula.",
    icon: "✅",
  },
];

export function CeritaSoalCeritaD({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_D3} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}