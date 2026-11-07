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
/* Sub-Bab D: Pasangan Bilangan. Gambar cerita dan perangkat gambar bersama.  */
/* Maskot: Tupai. Tokoh buku: Upe, Kira, Malosi, Wei, Halim, Tika.            */
/* ------------------------------------------------------------------------ */

const COKLAT = "#E8A25F";
const KRIM = "#FFF1D6";

/** Wajah tupai untuk maskot di gelembung bicara. */
export function TupaiWajah({ kelas = "h-14 w-20" }: { kelas?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={`shrink-0 ${kelas}`} aria-hidden="true">
      <path
        d="M104 62 C124 58 126 28 108 18 C118 34 108 44 92 50"
        fill={COKLAT}
        stroke={BIRU}
        strokeWidth="3.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="28" cy="20" r="13" fill={COKLAT} stroke={BIRU} strokeWidth="3.4" />
      <circle cx="28" cy="21" r="6" fill={MERAH_MUDA} opacity="0.7" />
      <circle cx="78" cy="20" r="13" fill={COKLAT} stroke={BIRU} strokeWidth="3.4" />
      <circle cx="78" cy="21" r="6" fill={MERAH_MUDA} opacity="0.7" />
      <ellipse cx="53" cy="46" rx="42" ry="30" fill={COKLAT} stroke={BIRU} strokeWidth="3.4" />
      <ellipse cx="53" cy="56" rx="26" ry="17" fill={KRIM} />
      <circle cx="36" cy="40" r="5" fill={BIRU} />
      <circle cx="70" cy="40" r="5" fill={BIRU} />
      <circle cx="38" cy="38" r="1.8" fill="#FFFFFF" />
      <circle cx="72" cy="38" r="1.8" fill="#FFFFFF" />
      <ellipse cx="53" cy="49" rx="5" ry="3.6" fill={BIRU} />
      <path d="M53 52 V57 M45 59 Q53 66 61 59" fill="none" stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
      <rect x="49.5" y="59" width="7" height="8" rx="2" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.8" />
      <ellipse cx="22" cy="54" rx="6" ry="4" fill={MERAH_MUDA} opacity="0.7" />
      <ellipse cx="84" cy="54" rx="6" ry="4" fill={MERAH_MUDA} opacity="0.7" />
    </svg>
  );
}

/* ------------------------------ Gambar benda ---------------------------- */

function Donat({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r="9" fill="#E7B16A" stroke={BIRU} strokeWidth="2" />
      <path d="M-8 -1 C-8 -9 8 -9 8 -1 C5 -4 3 -2 0 -4 C-3 -2 -5 -4 -8 -1 Z" fill={MERAH_MUDA} stroke={BIRU} strokeWidth="1.2" />
      <circle r="3" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.6" />
      <path d="M-5 -5 l1.5 1 M3 -6 l1.4 1.2 M5 -1 l1.5 .6" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  );
}

function Bolu({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-10 6 L-8 -4 Q0 -12 8 -4 L10 6 Z" fill={KUNING} stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
      <path d="M-9 -2 Q0 -9 9 -2" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="0" cy="-8" r="2.4" fill={MERAH_MUDA} stroke={BIRU} strokeWidth="1.2" />
    </g>
  );
}

function Piring({ x, y, lebar = 38 }: { x: number; y: number; lebar?: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y + 3} rx={lebar} ry="8" fill="#C7D2FE" stroke={BIRU} strokeWidth="2.4" />
      <ellipse cx={x} cy={y} rx={lebar} ry="8" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.4" />
      <ellipse cx={x} cy={y} rx={lebar - 10} ry="4.6" fill="none" stroke="#C7D2FE" strokeWidth="2" />
    </g>
  );
}

function Bola({ x, y, warna, s = 1 }: { x: number; y: number; warna: string; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r="10" fill={warna} stroke={BIRU} strokeWidth="2.2" />
      <path d="M-7 -2 Q-4 -8 3 -8" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
    </g>
  );
}

function Panah({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g className="igil-denyut" style={TENGAH}>
      <path d={`M${x1} ${y} H${x2 - 6}`} stroke={EMAS} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 8" />
      <polygon points={`${x2},${y} ${x2 - 10},${y - 7} ${x2 - 10},${y + 7}`} fill={EMAS} stroke={BIRU} strokeWidth="1.4" strokeLinejoin="round" />
    </g>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 29: lima kue di satu piring, dipisahkan menjadi dua piring. */
function AdeganKue() {
  return (
    <>
      <Latar />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={30} y={184} rambut={BIRU} baju={EMAS} s={0.95} angkat />
      </g>
      <rect x="62" y="150" width="82" height="9" rx="3" fill="#C98A4B" stroke={BIRU} strokeWidth="2" />
      <path d="M70 159 V182 M136 159 V182" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
      <Piring x={103} y={146} lebar={34} />
      <Donat x={90} y={136} />
      <Donat x={110} y={134} />
      <Bolu x={126} y={138} />
      <Bolu x={96} y={146} s={0.9} />
      <Bolu x={114} y={147} s={0.9} />
      <Panah x1={150} x2={176} y={128} />
      <Piring x={226} y={112} lebar={32} />
      <Donat x={214} y={103} />
      <Donat x={236} y={103} />
      <Piring x={238} y={168} lebar={34} />
      <Bolu x={222} y={158} />
      <Bolu x={240} y={157} />
      <Bolu x={258} y={158} />
      <g className="igil-lompat" style={{ ...BAWAH, animationDelay: "0.3s" }}>
        <text x="190" y="104" fontSize="22" fontWeight="900" fill={BIRU}>
          2
        </text>
        <text x="196" y="170" fontSize="22" fontWeight="900" fill={BIRU}>
          3
        </text>
      </g>
    </>
  );
}

/** Buku hlm. 30: tiga bola hijau dan empat bola merah digabungkan. */
function AdeganBola() {
  return (
    <>
      <Latar />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={44} y={186} rambut="#7A4A1E" baju="#FFFFFF" s={0.95} angkat />
      </g>
      <g className="igil-lompat" style={{ ...BAWAH, animationDelay: "0.25s" }}>
        <Tokoh x={256} y={186} rambut="#1F2937" baju={KUNING} s={0.95} angkat />
      </g>
      <Bola x={20} y={190} warna={HIJAU} />
      <Bola x={36} y={196} warna={HIJAU} />
      <Bola x={52} y={192} warna={HIJAU} />
      <Bola x={236} y={196} warna={MERAH_MUDA} />
      <Bola x={252} y={200} warna={MERAH_MUDA} />
      <Bola x={268} y={196} warna={MERAH_MUDA} />
      <Bola x={282} y={190} warna={MERAH_MUDA} />
      <path d="M104 150 H196 L188 190 H112 Z" fill="#F3C98A" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <path d="M108 160 H192 M110 170 H190 M112 180 H188" stroke="#C98A4B" strokeWidth="2" strokeLinecap="round" />
      <Bola x={122} y={146} warna={HIJAU} />
      <Bola x={150} y={142} warna={HIJAU} />
      <Bola x={178} y={146} warna={HIJAU} />
      <Bola x={136} y={134} warna={MERAH_MUDA} />
      <Bola x={164} y={133} warna={MERAH_MUDA} />
      <Bola x={150} y={122} warna={MERAH_MUDA} />
      <Bola x={190} y={132} warna={MERAH_MUDA} />
      <Panah x1={76} x2={100} y={118} />
      <Panah x1={224} x2={200} y={118} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita pasangan bilangan">
      {id === "D-S1" && <AdeganKue />}
      {id === "D-S2" && <AdeganBola />}
    </svg>
  );
}

/** Dua adegan, sesuai dua halaman cerita buku (hlm. 29 dan 30). Naskah tidak memakai tokoh di luar buku. */
const CERITA_D: Cerita[] = [
  {
    id: "D-S1",
    sceneType: "kue-dipisahkan",
    voiceNarration:
      "Kira mempunyai lima kue di piring besar. Ada dua donat dan tiga kue bolu. Kira memisahkan lima kue itu ke dua piring kecil. Satu bilangan bisa dipisahkan menjadi dua bilangan. Lima dipisahkan menjadi dua dan tiga.",
  },
  {
    id: "D-S2",
    sceneType: "bola-digabungkan",
    voiceNarration:
      "Upe membawa tiga bola hijau. Wei membawa empat bola merah. Mereka memasukkan semua bola ke satu keranjang besar. Dua bilangan bisa digabungkan menjadi satu bilangan. Tiga dan empat digabungkan menjadi tujuh.",
  },
];

/** Peta pikiran empat simpul: Gabungan dan Sebagian, dipisahkan, digabungkan, banyak pasangan. */
export const PETA_PIKIRAN_D: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Kenali Gabungan dan Sebagian",
    stepDesc:
      "Gabungan adalah seluruh banyaknya. Sebagian adalah bagian-bagiannya. Lima kue terdiri dari dua dan tiga. Lima adalah Gabungan. Dua dan tiga adalah Sebagian.",
    icon: "🧺",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Pisahkan Satu Bilangan",
    stepDesc:
      "Satu bilangan bisa dipisahkan menjadi dua bilangan. Bagi benda dari Gabungan ke dua tempat, lalu hitung isi tiap tempat.",
    icon: "✂️",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Gabungkan Dua Bilangan",
    stepDesc:
      "Dua bilangan bisa digabungkan menjadi satu bilangan. Kumpulkan benda dari dua tempat ke satu tempat, lalu hitung semuanya.",
    icon: "🤝",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Temukan Banyak Pasangan",
    stepDesc:
      "Satu bilangan punya banyak pasangan. Pindahkan benda satu per satu dari tempat kiri ke tempat kanan untuk menemukan semua pasangannya.",
    icon: "🌻",
  },
];

export function CeritaPasanganD({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_D} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}

/* ------------------------------ Bagan pasangan -------------------------- */

export type Sel = number | "?" | null;

function Lingkar({
  cx,
  cy,
  r,
  isi,
  isiWarna,
  tepi,
  nyala,
}: {
  cx: number;
  cy: number;
  r: number;
  isi: Sel;
  isiWarna: string;
  tepi: string;
  nyala?: boolean;
}) {
  const kosong = isi === null || isi === "?";
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={kosong ? "#FFFFFF" : isiWarna}
        stroke={nyala ? EMAS : tepi}
        strokeWidth={nyala ? 5 : 3.4}
        strokeDasharray={kosong ? "5 4" : undefined}
      />
      <text
        x={cx}
        y={cy + r * 0.38}
        textAnchor="middle"
        fontSize={r * 1.05}
        fontWeight="900"
        fill={BIRU}
        opacity={isi === "?" ? 0.55 : 1}
      >
        {isi === null ? "" : isi}
      </text>
    </g>
  );
}

/** Bagan pasangan: satu Gabungan di kiri, dua Sebagian di kanan. */
export function Bagan({
  gabungan,
  a,
  b,
  kelas = "w-full max-w-[220px]",
  nyala = [],
  nama = false,
}: {
  gabungan: Sel;
  a: Sel;
  b: Sel;
  kelas?: string;
  nyala?: ("g" | "a" | "b")[];
  nama?: boolean;
}) {
  return (
    <svg viewBox={nama ? "0 0 170 114" : "0 0 170 100"} className={`mx-auto block h-auto ${kelas}`} role="img" aria-label="Bagan pasangan bilangan">
      <path d="M62 38 L108 22 M62 62 L108 78" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
      <Lingkar cx={38} cy={50} r={27} isi={gabungan} isiWarna={KUNING} tepi={BIRU} nyala={nyala.includes("g")} />
      <Lingkar cx={132} cy={22} r={19} isi={a} isiWarna="#C7D2FE" tepi={BIRU} nyala={nyala.includes("a")} />
      <Lingkar cx={132} cy={78} r={19} isi={b} isiWarna="#C7D2FE" tepi={BIRU} nyala={nyala.includes("b")} />
      {nama ? (
        <g fontSize="8.5" fontWeight="900" fill={BIRU}>
          <text x="38" y="96" textAnchor="middle">
            Gabungan
          </text>
          <text x="132" y="53" textAnchor="middle">
            Sebagian
          </text>
          <text x="132" y="110" textAnchor="middle">
            Sebagian
          </text>
        </g>
      ) : null}
    </svg>
  );
}


/**
 * Pohon pasangan tiga tingkat (hlm. 38).
 * Urutan sel: [puncak, daun kiri, simpul 1, simpul 2, daun kanan, daun bawah kiri, daun bawah kanan].
 */
export function PohonPasangan({ sel, sorot }: { sel: Sel[]; sorot?: number }) {
  const titik: [number, number, number, boolean][] = [
    [110, 26, 22, true],
    [48, 86, 19, false],
    [162, 86, 21, true],
    [124, 148, 19, true],
    [204, 148, 17, false],
    [84, 196, 15, false],
    [164, 196, 15, false],
  ];
  return (
    <svg viewBox="0 0 230 220" className="mx-auto block h-auto w-full max-w-[290px]" role="img" aria-label="Pohon pasangan bilangan">
      <path
        d="M96 44 L58 70 M124 44 L152 66 M150 106 L132 130 M178 104 L196 132 M114 166 L92 184 M134 166 L156 184"
        stroke={BIRU}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      {titik.map(([cx, cy, r, gabung], i) => (
        <Lingkar
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          isi={sel[i] ?? null}
          isiWarna={gabung ? KUNING : "#C7D2FE"}
          tepi={BIRU}
          nyala={sorot === i}
        />
      ))}
    </svg>
  );
}
