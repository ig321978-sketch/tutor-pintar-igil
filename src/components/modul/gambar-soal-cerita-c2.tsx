"use client";

import React from "react";
import {
  BAWAH,
  BIRU,
  BukuCerita,
  EMAS,
  Latar,
  MERAH_MUDA,
  type Cerita,
} from "./CeritaBandingB";
import { IgilWajahIsi, Lencana } from "./gambar-cara-b2";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";

/* ------------------------------------------------------------------------ */
/* Bab 2 Sub-Bab C: Soal Cerita Penjumlahan (Buku Siswa hlm. 65-74).          */
/* Maskot: Igil. Tokoh buku: Kira, Upe, Wei, Halim, Malosi, Tika.            */
/* Semua gambar dibuat di klien (SVG). Tidak ada panggilan API.               */
/* Naskah: naskah/mtk-1-bab2-sub-c-soal-cerita.md                             */
/* ------------------------------------------------------------------------ */

const MERAH = "#E11D48";
const BIRU_BOLA = "#38BDF8";

/* ------------------------------ Kendaraan ------------------------------- */

export type JenisKendaraan = "sepeda" | "becak" | "motor" | "mobil";

/** Banyak roda tiap kendaraan. Sepeda 2, becak 3, motor 2, mobil 4. */
export const RODA_PER: Record<JenisKendaraan, number> = { sepeda: 2, becak: 3, motor: 2, mobil: 4 };

export const NAMA_KENDARAAN: Record<JenisKendaraan, string> = {
  sepeda: "sepeda",
  becak: "becak",
  motor: "motor",
  mobil: "mobil",
};

const WARNA_KENDARAAN: Record<JenisKendaraan, string> = {
  sepeda: "#F97316",
  becak: "#38BDF8",
  motor: "#E11D48",
  mobil: "#16A34A",
};

function Roda({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#374151" stroke={BIRU} strokeWidth="2.6" />
      <circle cx={cx} cy={cy} r={r * 0.5} fill="#FFFFFF" stroke={BIRU} strokeWidth="1.8" />
      <circle cx={cx} cy={cy} r={r * 0.16} fill={BIRU} />
    </g>
  );
}

/** Isi gambar kendaraan di bidang 100 x 60. Roda paling bawah di sekitar y = 56. */
function IsiKendaraan({ jenis, warna }: { jenis: JenisKendaraan; warna: string }) {
  if (jenis === "sepeda") {
    return (
      <g>
        <path d="M24 42 L44 42 L38 22 L62 22 L76 42 M44 42 L62 22" stroke={BIRU} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 42 L44 42 L38 22 L62 22 L76 42 M44 42 L62 22" stroke={warna} strokeWidth="3.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M31 19 H46" stroke={BIRU} strokeWidth="4.4" strokeLinecap="round" />
        <path d="M62 22 L58 11 H69" stroke={BIRU} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <Roda cx={24} cy={42} r={13} />
        <Roda cx={76} cy={42} r={13} />
      </g>
    );
  }
  if (jenis === "becak") {
    return (
      <g>
        <path d="M58 40 H72 L84 45 M72 40 L70 28 H80 M62 30 H74" stroke={BIRU} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="8" y="22" width="50" height="22" rx="4" fill={warna} stroke={BIRU} strokeWidth="3" />
        <path d="M3 22 Q33 -4 63 22 Z" fill="#FDE68A" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
        <path d="M14 30 H52" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <Roda cx={20} cy={46} r={10} />
        <Roda cx={46} cy={46} r={10} />
        <Roda cx={84} cy={45} r={11} />
      </g>
    );
  }
  if (jenis === "motor") {
    return (
      <g>
        <path d="M66 42 L74 16 M70 14 H85" stroke={BIRU} strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="77" cy="23" r="3.4" fill="#FDE68A" stroke={BIRU} strokeWidth="1.6" />
        <path d="M24 42 Q22 24 42 24 H56 L66 42 Z" fill={warna} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
        <rect x="26" y="16" width="26" height="9" rx="4.5" fill="#1F2937" stroke={BIRU} strokeWidth="2" />
        <path d="M56 42 H70" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
        <Roda cx={20} cy={46} r={11} />
        <Roda cx={82} cy={46} r={11} />
      </g>
    );
  }
  return (
    <g>
      <path
        d="M6 46 V34 Q6 27 13 27 H24 L34 10 H66 L80 27 H89 Q96 27 96 34 V46 Z"
        fill={warna}
        stroke={BIRU}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M29 27 L37 14 H48 V27 Z M53 14 H64 L74 27 H53 Z" fill="#BAE6FD" stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
      <rect x="89" y="32" width="7" height="5" rx="1.5" fill="#FDE68A" stroke={BIRU} strokeWidth="1.4" />
      <Roda cx={26} cy={46} r={10} />
      <Roda cx={74} cy={46} r={10} />
    </g>
  );
}

/** Kendaraan sebagai kelompok SVG, dipakai di dalam adegan (bidang 100 x 60). */
export function KendaraanG({ jenis, warna }: { jenis: JenisKendaraan; warna?: string }) {
  return <IsiKendaraan jenis={jenis} warna={warna ?? WARNA_KENDARAAN[jenis]} />;
}

/** Kendaraan berdiri sendiri, dipakai di permainan dan poster. */
export function Kendaraan({
  jenis,
  warna,
  kelas = "w-full max-w-[96px]",
}: {
  jenis: JenisKendaraan;
  warna?: string;
  kelas?: string;
}) {
  return (
    <svg viewBox="0 0 100 60" className={`mx-auto block h-auto ${kelas}`} role="img" aria-label={`Gambar ${NAMA_KENDARAAN[jenis]}`}>
      <IsiKendaraan jenis={jenis} warna={warna ?? WARNA_KENDARAAN[jenis]} />
    </svg>
  );
}

/* ------------------------------ Gambar benda ---------------------------- */

/** Burung. Titik (x, y) ada di kaki. Menghadap kiri bila `kiri`. */
function Burung({
  x,
  y,
  s = 1,
  terbang = false,
  kiri = true,
  warna = "#C2410C",
}: {
  x: number;
  y: number;
  s?: number;
  terbang?: boolean;
  kiri?: boolean;
  warna?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${kiri ? -s : s} ${s})`}>
      {terbang ? null : <path d="M-3 0 V-7 M3 0 V-7" stroke="#B45309" strokeWidth="2.4" strokeLinecap="round" />}
      <path d="M-11 -13 L-23 -8 L-21 -18 Z" fill="#7C2D12" stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="0" cy="-15" rx="13" ry="10" fill={warna} stroke={BIRU} strokeWidth="2.4" />
      <ellipse cx="2" cy="-10" rx="7" ry="4.6" fill="#FED7AA" />
      {terbang ? (
        <>
          <path d="M-4 -20 Q-10 -40 -24 -38 Q-18 -26 -4 -20 Z" fill="#9A3412" stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
          <path d="M2 -21 Q6 -40 20 -40 Q16 -27 2 -21 Z" fill="#B45309" stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
        </>
      ) : (
        <path d="M-7 -16 Q3 -26 10 -14 Q2 -10 -7 -16 Z" fill="#9A3412" stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
      )}
      <circle cx="10" cy="-25" r="7.6" fill={warna} stroke={BIRU} strokeWidth="2.4" />
      <polygon points="16,-26 24,-23.5 16,-21" fill={EMAS} stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="11.6" cy="-26.6" r="2" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.2" />
      <circle cx="12" cy="-26.6" r="0.9" fill={BIRU} />
    </g>
  );
}

/** Pensil berdiri. Titik (x, y) ada di pangkal, ujung ke atas setinggi sekitar 29. */
function Pensil({ x, y, putar = 0, warna }: { x: number; y: number; putar?: number; warna: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${putar})`}>
      <rect x="-3.4" y="-22" width="6.8" height="22" rx="1.4" fill={warna} stroke={BIRU} strokeWidth="1.6" />
      <rect x="-3.4" y="-1" width="6.8" height="4" rx="1.6" fill="#F9A8D4" stroke={BIRU} strokeWidth="1.4" />
      <polygon points="-3.4,-22 3.4,-22 0,-30" fill="#FDE68A" stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      <polygon points="-1.2,-27 1.2,-27 0,-30" fill={BIRU} />
    </g>
  );
}

/** Posisi kelereng di dalam stoples, relatif ke titik dasar tengah. Maksimal 10. */
function posisiKelereng(i: number, n: number): [number, number] {
  if (i < 4) {
    const dalamBaris = Math.min(n, 4);
    return [(i - (dalamBaris - 1) / 2) * 17, -11];
  }
  const sisa = Math.min(n - 4, 3);
  if (i < 7) return [(i - 4 - (sisa - 1) / 2) * 17, -28];
  const sisa2 = n - 7;
  return [(i - 7 - (sisa2 - 1) / 2) * 17, -45];
}

function Stoples({ x, y, n, warna }: { x: number; y: number; n: number; warna: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-38" y="-80" width="76" height="80" rx="15" fill="#DBEAFE" fillOpacity="0.7" stroke={BIRU} strokeWidth="3" />
      <rect x="-34" y="-92" width="68" height="14" rx="5" fill="#93C5FD" stroke={BIRU} strokeWidth="3" />
      <path d="M-28 -66 V-30" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      {Array.from({ length: n }, (_, i) => {
        const [dx, dy] = posisiKelereng(i, n);
        return (
          <g key={i}>
            <circle cx={dx} cy={dy} r="8" fill={warna} stroke={BIRU} strokeWidth="1.8" />
            <circle cx={dx - 2.6} cy={dy - 2.8} r="2" fill="#FFFFFF" opacity="0.85" />
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

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

/** Buku hlm. 65: empat burung di dahan, datang lagi dua burung. */
function AdeganBurung() {
  return (
    <>
      <Latar />
      <rect x="-8" y="80" width="26" height="80" rx="6" fill="#8A5322" stroke={BIRU} strokeWidth="3" />
      <path d="M12 104 L252 88" stroke={BIRU} strokeWidth="15" strokeLinecap="round" />
      <path d="M12 104 L252 88" stroke="#A8672D" strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="14" cy="76" rx="24" ry="15" fill="#4ADE80" stroke={BIRU} strokeWidth="3" />
      <ellipse cx="250" cy="84" rx="15" ry="9" fill="#4ADE80" stroke={BIRU} strokeWidth="3" />
      <Burung x={58} y={95} />
      <Burung x={100} y={92} />
      <Burung x={142} y={89} />
      <Burung x={184} y={86} />
      <g className="igil-lompat" style={BAWAH}>
        <Burung x={226} y={62} s={0.92} terbang />
      </g>
      <g className="igil-lompat" style={BAWAH}>
        <Burung x={268} y={42} s={0.92} terbang />
      </g>
      <Lencana x={104} y={52} teks="4" />
      <Lencana x={248} y={110} teks="+2" />
      <KotakHitung x={92} y={158} teks="4 + 2 = 6" />
    </>
  );
}

/** Buku hlm. 67: Halim memegang tiga pensil merah dan empat pensil hijau. */
function AdeganPensil() {
  return (
    <>
      <Latar />
      <Tokoh x={96} y={200} rambut="#1F2937" baju="#22D3EE" s={1.5} angkat>
        {[-14, 0, 14].map((p, i) => (
          <Pensil key={`m${i}`} x={-16 + (i - 1) * 5} y={-17} putar={p} warna={MERAH} />
        ))}
        {[-21, -7, 7, 21].map((p, i) => (
          <Pensil key={`h${i}`} x={17 + (i - 1.5) * 4.5} y={-36} putar={p} warna="#16A34A" />
        ))}
      </Tokoh>
      <rect x="168" y="30" width="122" height="122" rx="12" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      {[0, 1, 2].map((i) => (
        <Pensil key={`tm${i}`} x={196 + i * 24} y={86} warna={MERAH} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Pensil key={`th${i}`} x={184 + i * 24} y={134} warna="#16A34A" />
      ))}
      <Lencana x={50} y={138} teks="3" r={15} />
      <Lencana x={140} y={104} teks="4" r={15} />
      <KotakHitung x={172} y={162} w={112} teks="3 + 4 = 7" />
    </>
  );
}

/** Buku hlm. 68: lima siswa di kelas, tiga siswa datang dari pintu. */
function AdeganKelas() {
  const rambut = ["#1F2937", "#7A4A1E", MERAH_MUDA, "#1F2937", "#7A4A1E", "#1F2937", MERAH_MUDA, "#7A4A1E"];
  return (
    <>
      <rect x="0" y="0" width="300" height="152" fill="#DFF1FF" />
      <rect x="0" y="150" width="300" height="58" fill="#E8D2A8" />
      <path d="M0 150 H300" stroke="#C9A96E" strokeWidth="3" />
      <rect x="14" y="14" width="156" height="64" rx="5" fill="#3F6F7A" stroke="#8A5322" strokeWidth="5" />
      <text x="92" y="56" textAnchor="middle" fontSize="24" fontWeight="900" fill="#FFFFFF">
        5 + 3 = 8
      </text>
      <rect x="200" y="22" width="90" height="130" rx="4" fill="#F1B77A" stroke={BIRU} strokeWidth="3" />
      <rect x="210" y="32" width="70" height="120" fill="#FFF3D6" stroke={BIRU} strokeWidth="2" />
      {[30, 62, 94, 126, 158].map((x, i) => (
        <Tokoh key={`a${i}`} x={x} y={190} rambut={rambut[i]} baju="#FFFFFF" s={0.82} angkat={i % 2 === 0} />
      ))}
      {[224, 250, 276].map((x, i) => (
        <g key={`b${i}`} className="igil-lompat" style={{ ...BAWAH, animationDelay: `${i * 160}ms` }}>
          <Tokoh x={x} y={190} rambut={rambut[5 + i]} baju="#FFFFFF" s={0.82} />
        </g>
      ))}
      <Lencana x={94} y={112} teks="5" r={15} />
      <Lencana x={250} y={108} teks="+3" />
    </>
  );
}

/** Buku hlm. 69: tiga sepeda dan satu becak di jalan. */
function AdeganJalan() {
  return (
    <>
      <Latar />
      <rect x="260" y="92" width="14" height="66" rx="4" fill="#8A5322" stroke={BIRU} strokeWidth="3" />
      <circle cx="267" cy="76" r="28" fill="#4ADE80" stroke={BIRU} strokeWidth="3" />
      <rect x="0" y="150" width="300" height="58" fill="#CBD5E1" />
      <path d="M0 150 H300" stroke="#94A3B8" strokeWidth="3" />
      <path d="M10 196 H290" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="14 10" strokeLinecap="round" opacity="0.8" />
      <g transform="translate(8 115) scale(0.7)">
        <KendaraanG jenis="becak" />
      </g>
      {[92, 146, 200].map((x, i) => (
        <g key={x} transform={`translate(${x} 127) scale(0.52)`}>
          <KendaraanG jenis="sepeda" warna={["#F97316", "#A855F7", MERAH][i]} />
        </g>
      ))}
      <Lencana x={172} y={104} teks="3" />
      <Lencana x={44} y={90} teks="1" />
      <KotakHitung x={92} y={162} teks="3 + 1 = 4" />
    </>
  );
}

/** Buku hlm. 72: tiga motor dan dua mobil di tempat parkir. */
function AdeganParkir() {
  return (
    <>
      <Latar />
      <rect x="0" y="100" width="300" height="108" fill="#9CA3AF" />
      <path d="M0 100 H300" stroke="#6B7280" strokeWidth="3" />
      <path d="M99 108 V150 M191 108 V150" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <path d="M8 154 H292" stroke="#FACC15" strokeWidth="4" strokeDasharray="18 10" strokeLinecap="round" />
      <rect x="258" y="58" width="5" height="46" fill="#6B7280" />
      <circle cx="260" cy="50" r="17" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x="260" y="58" textAnchor="middle" fontSize="22" fontWeight="900" fill={BIRU}>
        P
      </text>
      {[16, 104].map((x, i) => (
        <g key={x} transform={`translate(${x} 102) scale(0.78)`}>
          <KendaraanG jenis="mobil" warna={i === 0 ? "#16A34A" : "#2563EB"} />
        </g>
      ))}
      {[8, 78, 148].map((x, i) => (
        <g key={x} transform={`translate(${x} 160) scale(0.66)`}>
          <KendaraanG jenis="motor" warna={i === 1 ? "#1D4ED8" : MERAH} />
        </g>
      ))}
      <Lencana x={206} y={124} teks="2" />
      <Lencana x={244} y={180} teks="3" />
      <KotakHitung x={92} y={14} teks="3 + 2 = 5" />
    </>
  );
}

/** Buku hlm. 73: Tika membuat cerita sendiri dari dua stoples kelereng. */
function AdeganStoples() {
  return (
    <>
      <Latar />
      <Tokoh x={150} y={152} rambut={MERAH_MUDA} baju={EMAS} s={1.05} angkat />
      <rect x="8" y="150" width="284" height="10" rx="4" fill="#A8672D" stroke={BIRU} strokeWidth="2.6" />
      <Stoples x={64} y={150} n={4} warna={MERAH} />
      <Stoples x={236} y={150} n={3} warna={BIRU_BOLA} />
      <rect x="40" y="168" width="220" height="32" rx="14" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x="150" y="191" textAnchor="middle" fontSize="20" fontWeight="900" fill={BIRU}>
        … + … = …
      </text>
      <g className="igil-lompat" style={BAWAH}>
        <svg x="196" y="14" width="76" height="50" viewBox="0 0 120 80">
          <IgilWajahIsi />
        </svg>
      </g>
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita soal penjumlahan">
      {id === "C2-S1" && <AdeganBurung />}
      {id === "C2-S2" && <AdeganPensil />}
      {id === "C2-S3" && <AdeganKelas />}
      {id === "C2-S4" && <AdeganJalan />}
      {id === "C2-S5" && <AdeganParkir />}
      {id === "C2-S6" && <AdeganStoples />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 65-73). Tokoh hanya Kira, Upe, Wei, Halim, Malosi, Tika, dan Igil. */
export const CERITA_C2: Cerita[] = [
  {
    id: "C2-S1",
    sceneType: "burung-dahan",
    voiceNarration:
      "Ada empat burung di pohon. Datang lagi dua burung. Igil bertanya: berapa jumlah semua burung? Ini namanya soal cerita. Empat ditambah dua sama dengan enam. Semuanya ada enam burung.",
  },
  {
    id: "C2-S2",
    sceneType: "pensil-halim",
    voiceNarration:
      "Halim mempunyai tiga pensil merah di tangan kiri. Halim juga mempunyai empat pensil hijau di tangan kanan. Berapa jumlah semua pensil Halim? Tiga ditambah empat sama dengan tujuh. Halim memiliki tujuh pensil.",
  },
  {
    id: "C2-S3",
    sceneType: "siswa-kelas",
    voiceNarration:
      "Ada lima siswa di dalam kelas. Datang lagi tiga siswa dari pintu. Berapakah jumlah semua siswa sekarang? Lima ditambah tiga sama dengan delapan. Di dalam kelas ada delapan siswa.",
  },
  {
    id: "C2-S4",
    sceneType: "sepeda-becak",
    voiceNarration:
      "Di jalan ada tiga sepeda. Ada satu becak. Berapa jumlah semua kendaraan? Tiga ditambah satu sama dengan empat. Semuanya ada empat kendaraan. Satu cerita bisa punya dua pertanyaan. Berapa jumlah semua rodanya? Tiap sepeda punya dua roda, jadi tiga sepeda ada enam roda. Becak punya tiga roda. Enam ditambah tiga sama dengan sembilan roda.",
  },
  {
    id: "C2-S5",
    sceneType: "motor-mobil",
    voiceNarration:
      "Di tempat parkir ada tiga motor. Ada dua mobil. Berapa jumlah semua kendaraan? Tiga ditambah dua sama dengan lima. Semuanya ada lima kendaraan.",
  },
  {
    id: "C2-S6",
    sceneType: "stoples-kelereng",
    voiceNarration:
      "Tika membuat ceritanya sendiri. Dia punya dua stoples. Di stoples pertama ada kelereng merah. Di stoples kedua ada kelereng biru. Kalimat penjumlahannya masih kosong. Ayo buat ceritamu sendiri, gambar, tulis kalimatnya, hitung hasilnya, lalu ceritakan di depan kelas.",
  },
];

/** Peta pikiran enam simpul: dari membaca cerita sampai memeriksa jawaban. */
export const PETA_PIKIRAN_C2: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Baca Ceritanya",
    stepDesc:
      "Baca atau dengar ceritanya sampai selesai. Soal cerita punya tiga bagian: berapa yang ada, berapa yang datang lagi, dan pertanyaannya.",
    icon: "📖",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Cari Bilangannya",
    stepDesc:
      "Temukan dua bilangan di dalam cerita. Ada empat burung, datang lagi dua burung. Empat dan dua yang kita pakai. Kata pohon dan kelas hanya hiasan cerita.",
    icon: "🔍",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Pilih Tanda Tambah",
    stepDesc:
      "Kata datang lagi, ditambah, bergabung, dan jumlah semua memberi petunjuk bahwa bendanya bertambah. Kita pakai tanda tambah.",
    icon: "➕",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Tulis dan Hitung",
    stepDesc:
      "Tulis penyelesaian: bilangan pertama, tanda tambah, bilangan kedua, tanda sama dengan, lalu hasilnya. Hitung dengan cara yang kamu suka: gambar, garis bilangan, jari, atau pasangan bilangan.",
    icon: "✏️",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Jawab dengan Kalimat",
    stepDesc:
      "Tulis jawaban dalam kalimat lengkap. Semuanya ada enam burung. Jangan lupa nama bendanya.",
    icon: "💬",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Periksa dan Ceritakan",
    stepDesc:
      "Periksa dengan cara lain, misalnya tukar tempat atau menghitung maju. Setelah yakin, ceritakan hasilnya di depan kelas.",
    icon: "🌟",
  },
];

export function CeritaSoalC({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_C2} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}