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
  Mata,
  Pipi,
  Senyum,
  TENGAH,
  type Cerita,
} from "./CeritaBandingB";

/* ------------------------------------------------------------------------ */
/* Sub-Bab C: Menghitung Maju dan Mundur. Gambar cerita dan bahan gambar.     */
/* Maskot: Katak. Tokoh buku: Upe, Kira, Malosi, Wei, Halim, Tika.            */
/* Warna dominan: biru ungu royal, kuning emas, putih. Hijau hanya katak.     */
/* ------------------------------------------------------------------------ */

const PUCAT = "#E3E8FF";
const KULIT = "#FFE0BD";

/** Wajah katak untuk maskot di gelembung bicara. */
export function KatakWajah({ kelas = "h-14 w-20" }: { kelas?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={`shrink-0 ${kelas}`} aria-hidden="true">
      <ellipse cx="60" cy="50" rx="46" ry="28" fill={HIJAU} stroke={BIRU} strokeWidth="3.4" />
      <circle cx="33" cy="26" r="16" fill={HIJAU} stroke={BIRU} strokeWidth="3.4" />
      <circle cx="87" cy="26" r="16" fill={HIJAU} stroke={BIRU} strokeWidth="3.4" />
      <circle cx="33" cy="26" r="11" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
      <circle cx="87" cy="26" r="11" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
      <circle cx="36" cy="27" r="5.5" fill={BIRU} />
      <circle cx="84" cy="27" r="5.5" fill={BIRU} />
      <circle cx="38" cy="24.5" r="2" fill="#FFFFFF" />
      <circle cx="86" cy="24.5" r="2" fill="#FFFFFF" />
      <ellipse cx="22" cy="56" rx="7" ry="4.5" fill={MERAH_MUDA} opacity="0.7" />
      <ellipse cx="98" cy="56" rx="7" ry="4.5" fill={MERAH_MUDA} opacity="0.7" />
      <path d="M28 52 Q60 80 92 52" fill="none" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="54" cy="42" r="1.8" fill={BIRU} />
      <circle cx="66" cy="42" r="1.8" fill={BIRU} />
    </svg>
  );
}

/** Katak duduk, dipakai di dalam gambar SVG. Titik (x, y) ada di bawah tengah badan. */
export function KatakSVG({ x, y, s = 1, kelas = "" }: { x: number; y: number; s?: number; kelas?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className={kelas}>
      <ellipse cx="-13" cy="-2" rx="8" ry="4" fill={HIJAU} stroke={BIRU} strokeWidth="2" />
      <ellipse cx="13" cy="-2" rx="8" ry="4" fill={HIJAU} stroke={BIRU} strokeWidth="2" />
      <ellipse cx="0" cy="-14" rx="20" ry="14" fill={HIJAU} stroke={BIRU} strokeWidth="2.6" />
      <ellipse cx="0" cy="-9" rx="11" ry="7" fill="#DFF5E6" />
      <circle cx="-10" cy="-27" r="8" fill={HIJAU} stroke={BIRU} strokeWidth="2.6" />
      <circle cx="10" cy="-27" r="8" fill={HIJAU} stroke={BIRU} strokeWidth="2.6" />
      <circle cx="-10" cy="-27" r="5" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.4" />
      <circle cx="10" cy="-27" r="5" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.4" />
      <circle cx="-9" cy="-26.5" r="2.6" fill={BIRU} />
      <circle cx="11" cy="-26.5" r="2.6" fill={BIRU} />
      <path d="M-8 -16 Q0 -9 8 -16" fill="none" stroke={BIRU} strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="-14" cy="-15" rx="3.4" ry="2.2" fill={MERAH_MUDA} opacity="0.7" />
      <ellipse cx="14" cy="-15" rx="3.4" ry="2.2" fill={MERAH_MUDA} opacity="0.7" />
    </g>
  );
}

/** Anak berdiri utuh. Titik (x, y) ada di telapak kaki. Tangan kanan bisa memegang papan. */
export function Tokoh({
  x,
  y,
  rambut,
  baju,
  s = 1,
  angkat = false,
  children,
}: {
  x: number;
  y: number;
  rambut: string;
  baju: string;
  s?: number;
  angkat?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-5 -14 V-4 M5 -14 V-4" stroke={BIRU} strokeWidth="3.6" strokeLinecap="round" />
      <ellipse cx="-6" cy="-1.5" rx="6" ry="3" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.8" />
      <ellipse cx="6" cy="-1.5" rx="6" ry="3" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.8" />
      <path
        d={angkat ? "M10 -26 L17 -36" : "M10 -26 L16 -17"}
        stroke={BIRU}
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M-10 -26 L-16 -17" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <rect x="-10" y="-31" width="20" height="19" rx="6" fill={baju} stroke={BIRU} strokeWidth="2.4" />
      <circle cx="0" cy="-42" r="12" fill={KULIT} stroke={BIRU} strokeWidth="2.4" />
      <path
        d="M-12 -44 C-13 -61 13 -61 12 -44 C6 -52 -6 -52 -12 -44 Z"
        fill={rambut}
        stroke={BIRU}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <Mata x={-4.5} y={-41} r={2} />
      <Mata x={4.5} y={-41} r={2} />
      <Pipi x={-8} y={-36.5} r={2.4} />
      <Pipi x={8} y={-36.5} r={2.4} />
      <Senyum x={0} y={-37} l={3.4} />
      {children}
    </g>
  );
}

const LANTAI = 172;
const LEBAR_ANAK_TANGGA = 25;
const X_AWAL = 24;

function Anak10({ n, tinggi, nyala, nomor }: { n: number; tinggi: number; nyala: boolean; nomor: number }) {
  const x = X_AWAL + n * LEBAR_ANAK_TANGGA;
  return (
    <g>
      <rect
        x={x}
        y={LANTAI - tinggi}
        width={LEBAR_ANAK_TANGGA}
        height={tinggi}
        rx="3"
        fill={nyala ? KUNING : PUCAT}
        stroke={BIRU}
        strokeWidth="2.2"
      />
      <text
        x={x + LEBAR_ANAK_TANGGA / 2}
        y={LANTAI - tinggi + 14}
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="900"
        fill={BIRU}
      >
        {nomor}
      </text>
    </g>
  );
}

function PanahLengkung({ d, kepala, warna }: { d: string; kepala: string; warna: string }) {
  return (
    <g>
      <path d={d} fill="none" stroke={warna} strokeWidth="3.6" strokeLinecap="round" strokeDasharray="1 7" />
      <polygon points={kepala} fill={warna} stroke={BIRU} strokeWidth="1.4" strokeLinejoin="round" />
    </g>
  );
}

function AdeganNaik() {
  return (
    <>
      <Latar />
      <rect x="10" y={LANTAI} width="282" height="8" rx="3" fill="#8FC9A0" />
      {Array.from({ length: 10 }, (_, n) => (
        <Anak10 key={n} n={n} tinggi={10 * (n + 1)} nyala={n < 3} nomor={n + 1} />
      ))}
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={X_AWAL + 2 * LEBAR_ANAK_TANGGA + 12.5} y={LANTAI - 30} rambut={BIRU} baju={EMAS} s={0.9} />
      </g>
      <g className="igil-denyut" style={TENGAH}>
        <PanahLengkung d="M98 104 Q112 82 124 98" kepala="127,90 128,104 116,100" warna={EMAS} />
      </g>
    </>
  );
}

function AdeganTurun() {
  return (
    <>
      <Latar />
      <rect x="10" y={LANTAI} width="282" height="8" rx="3" fill="#8FC9A0" />
      {Array.from({ length: 10 }, (_, n) => (
        <Anak10 key={n} n={n} tinggi={10 * (10 - n)} nyala={n < 3} nomor={10 - n} />
      ))}
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={X_AWAL + 2 * LEBAR_ANAK_TANGGA + 12.5} y={LANTAI - 80} rambut={BIRU} baju={EMAS} s={0.9} />
      </g>
      <g className="igil-denyut" style={TENGAH}>
        <PanahLengkung d="M104 62 Q122 58 126 84" kepala="120,82 132,82 126,94" warna={BIRU} />
      </g>
    </>
  );
}

const PESERTA = [
  { rambut: BIRU, baju: EMAS },
  { rambut: "#7A4A1E", baju: "#FFFFFF" },
  { rambut: EMAS, baju: BIRU },
  { rambut: "#1F2937", baju: KUNING },
  { rambut: "#7A4A1E", baju: "#C7D2FE" },
  { rambut: BIRU, baju: "#FFFFFF" },
];

function AdeganBerantai() {
  return (
    <>
      <Latar />
      {PESERTA.map((p, i) => {
        const x = 24 + i * 49;
        return (
          <g key={i}>
            <g className="igil-lompat" style={{ ...BAWAH, animationDelay: `${i * 0.18}s` }}>
              <Tokoh x={x} y={152} rambut={p.rambut} baju={p.baju} s={0.85} angkat>
                <path d="M17 -36 V-76" stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
                <rect x="1" y="-104" width="32" height="28" rx="6" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.6" />
                <text x="17" y="-83" textAnchor="middle" fontSize="20" fontWeight="900" fill={BIRU}>
                  {i + 3}
                </text>
              </Tokoh>
            </g>
            {i < PESERTA.length - 1 ? (
              <g>
                <path d={`M${x + 31} 76 H${x + 43}`} stroke={EMAS} strokeWidth="3.4" strokeLinecap="round" />
                <polygon points={`${x + 49},76 ${x + 42},71 ${x + 42},81`} fill={EMAS} stroke={BIRU} strokeWidth="1.2" strokeLinejoin="round" />
              </g>
            ) : null}
          </g>
        );
      })}
    </>
  );
}

function AdeganKatakBatu() {
  const pusat = (n: number) => 20 + (n - 1) * 29;
  return (
    <>
      <Latar />
      <rect x="0" y="118" width="300" height="90" fill="#BFE3FF" />
      <path d="M0 118 C30 112 60 124 90 118 C120 112 150 124 180 118 C210 112 240 124 270 118 C285 115 295 118 300 118" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 184 q8 -6 16 0 M232 190 q8 -6 16 0 M110 196 q8 -6 16 0" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <ellipse cx="46" cy="178" rx="15" ry="6" fill={HIJAU} stroke={BIRU} strokeWidth="2" />
      <ellipse cx="258" cy="174" rx="13" ry="5.5" fill={HIJAU} stroke={BIRU} strokeWidth="2" />
      {Array.from({ length: 10 }, (_, i) => {
        const n = i + 1;
        const tengah = n === 6;
        const tetangga = n === 5 || n === 7;
        return (
          <g key={n}>
            {tetangga ? (
              <ellipse
                className="igil-denyut"
                cx={pusat(n)}
                cy="150"
                rx="17"
                ry="11"
                fill="none"
                stroke={n === 7 ? EMAS : BIRU}
                strokeWidth="3"
                strokeDasharray="5 4"
                style={TENGAH}
              />
            ) : null}
            <ellipse cx={pusat(n)} cy="151" rx="13" ry="8" fill={tengah ? KUNING : "#F1ECE0"} stroke={BIRU} strokeWidth="2.2" />
            <text x={pusat(n)} y="154.5" textAnchor="middle" fontSize="10.5" fontWeight="900" fill={BIRU}>
              {n}
            </text>
          </g>
        );
      })}
      <g className="igil-lompat" style={BAWAH}>
        <KatakSVG x={pusat(6)} y={146} s={1.15} />
      </g>
      <PanahLengkung d="M176 94 Q192 72 204 112" kepala="198,106 211,108 205,119" warna={EMAS} />
      <PanahLengkung d="M154 94 Q138 72 126 112" kepala="132,106 119,108 125,119" warna={BIRU} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita menghitung maju dan mundur">
      {id === "C-S1" && <AdeganNaik />}
      {id === "C-S2" && <AdeganTurun />}
      {id === "C-S3" && <AdeganBerantai />}
      {id === "C-S4" && <AdeganKatakBatu />}
    </svg>
  );
}

export function CeritaMajuMundurC({
  cerita,
  speakGuru,
}: {
  cerita: Cerita[];
  speakGuru: (teks: string) => void;
}) {
  return <BukuCerita cerita={cerita} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
