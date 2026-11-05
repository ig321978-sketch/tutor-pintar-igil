"use client";

import React from "react";
import { IsiIkonMainan } from "./ikon-mainan";
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
import { Tokoh } from "./gambar-maju-mundur-c";

/* ------------------------------------------------------------------------ */
/* Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan 0 sampai 10.          */
/* Gambar cerita dan bahan gambar. Maskot: Kelinci.                           */
/* Warna dominan: biru ungu royal, kuning emas, putih. Hijau hanya rumput.    */
/* ------------------------------------------------------------------------ */

/** Wajah kelinci untuk maskot di gelembung bicara. */
export function KelinciWajah({ kelas = "h-14 w-20" }: { kelas?: string }) {
  return (
    <svg viewBox="0 -6 120 88" className={`shrink-0 ${kelas}`} aria-hidden="true">
      <g transform="rotate(-12 42 30)">
        <ellipse cx="42" cy="18" rx="11" ry="23" fill="#FFFFFF" stroke={BIRU} strokeWidth="3.4" />
        <ellipse cx="42" cy="20" rx="5" ry="15" fill={MERAH_MUDA} opacity="0.65" />
      </g>
      <g transform="rotate(12 78 30)">
        <ellipse cx="78" cy="18" rx="11" ry="23" fill="#FFFFFF" stroke={BIRU} strokeWidth="3.4" />
        <ellipse cx="78" cy="20" rx="5" ry="15" fill={MERAH_MUDA} opacity="0.65" />
      </g>
      <ellipse cx="60" cy="52" rx="40" ry="27" fill="#FFFFFF" stroke={BIRU} strokeWidth="3.4" />
      <Mata x={44} y={47} r={4.4} />
      <Mata x={76} y={47} r={4.4} />
      <ellipse cx="31" cy="58" rx="7" ry="4.5" fill={MERAH_MUDA} opacity="0.7" />
      <ellipse cx="89" cy="58" rx="7" ry="4.5" fill={MERAH_MUDA} opacity="0.7" />
      <ellipse cx="60" cy="55" rx="4" ry="3" fill={MERAH_MUDA} stroke={BIRU} strokeWidth="1.8" />
      <path d="M60 58 V63 M60 63 Q54 69 48 64 M60 63 Q66 69 72 64" fill="none" stroke={BIRU} strokeWidth="2.8" strokeLinecap="round" />
      <rect x="56" y="64" width="8" height="7" rx="2" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.8" />
    </svg>
  );
}

/** Kelinci duduk untuk di dalam gambar SVG. Titik (x, y) ada di bawah tengah badan. */
export function KelinciSVG({ x, y, s = 1, kelas = "" }: { x: number; y: number; s?: number; kelas?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className={kelas}>
      <circle cx="16" cy="-9" r="4.6" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
      <ellipse cx="-8" cy="-2" rx="8" ry="4" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
      <ellipse cx="8" cy="-2" rx="8" ry="4" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
      <ellipse cx="0" cy="-13" rx="16" ry="12" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.4" />
      <g transform="rotate(-10 -7 -34)">
        <ellipse cx="-7" cy="-46" rx="5" ry="13" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.4" />
        <ellipse cx="-7" cy="-45" rx="2.4" ry="8" fill={MERAH_MUDA} opacity="0.7" />
      </g>
      <g transform="rotate(10 7 -34)">
        <ellipse cx="7" cy="-46" rx="5" ry="13" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.4" />
        <ellipse cx="7" cy="-45" rx="2.4" ry="8" fill={MERAH_MUDA} opacity="0.7" />
      </g>
      <circle cx="0" cy="-30" r="13" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.4" />
      <Mata x={-5} y={-31} r={2} />
      <Mata x={5} y={-31} r={2} />
      <Pipi x={-9} y={-26} r={2.6} />
      <Pipi x={9} y={-26} r={2.6} />
      <ellipse cx="0" cy="-27" rx="2" ry="1.4" fill={MERAH_MUDA} stroke={BIRU} strokeWidth="1" />
      <path d="M-3 -23.5 Q0 -20.5 3 -23.5" fill="none" stroke={BIRU} strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

/** Ikon mainan kotak 48 x 48 dipasang di titik (x, y) dengan skala s. */
function Mainan({ jenis, x, y, s, kelas = "", gaya }: { jenis: string; x: number; y: number; s: number; kelas?: string; gaya?: React.CSSProperties }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={kelas} style={gaya}>
        <IsiIkonMainan jenis={jenis} />
      </g>
    </g>
  );
}

function Angka({ x, y, n, r = 13 }: { x: number; y: number; n: number | string; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={KUNING} stroke={BIRU} strokeWidth="2.6" />
      <text x={x} y={y + r * 0.38} textAnchor="middle" fontSize={r * 1.15} fontWeight="900" fill={BIRU}>
        {n}
      </text>
    </g>
  );
}

/** Bola dengan wajah, dipakai di keranjang. */
function BolaWajah({ x, y, r, warna, jeda = 0 }: { x: number; y: number; r: number; warna: string; jeda?: number }) {
  return (
    <g className="igil-lompat" style={{ ...BAWAH, animationDelay: `${jeda}s` }}>
      <circle cx={x} cy={y} r={r} fill={warna} stroke={BIRU} strokeWidth="2.2" />
      <path d={`M${x - r * 0.8} ${y - r * 0.35} Q${x} ${y - r * 0.8} ${x + r * 0.8} ${y - r * 0.35}`} fill="none" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.7" />
      <Mata x={x - r * 0.32} y={y - r * 0.05} r={r * 0.15} />
      <Mata x={x + r * 0.32} y={y - r * 0.05} r={r * 0.15} />
      <Senyum x={x} y={y + r * 0.3} l={r * 0.26} />
    </g>
  );
}

const WARNA_BOLA = [MERAH_MUDA, EMAS, HIJAU, KUNING, "#9DB7FF"];

/* ------------------------------ Lima adegan ------------------------------ */

function AdeganTaman() {
  return (
    <>
      <Latar />
      <Mainan jenis="jungkat" x={4} y={72} s={2.1} />
      <Mainan jenis="ayunan" x={198} y={70} s={2.1} />
      {[
        { x: 113, rambut: BIRU, baju: EMAS },
        { x: 150, rambut: "#7A4A1E", baju: "#FFFFFF" },
        { x: 187, rambut: EMAS, baju: BIRU },
      ].map((a, i) => (
        <g key={a.x} className="igil-lompat" style={{ ...BAWAH, animationDelay: `${i * 0.25}s` }}>
          <Tokoh x={a.x} y={178} rambut={a.rambut} baju={a.baju} s={1.15} />
        </g>
      ))}
      <path d="M126 160 L137 160 M163 160 L174 160" stroke={BIRU} strokeWidth="3.6" strokeLinecap="round" />
    </>
  );
}

function AdeganMainan() {
  const kelompok = [
    { jenis: "jungkat", xs: [14], n: 1 },
    { jenis: "ayunan", xs: [76, 120], n: 2 },
    { jenis: "perosotan", xs: [172, 212, 252], n: 3 },
  ];
  return (
    <>
      <Latar />
      {kelompok.map((k) => {
        const kiri = k.xs[0] - 6;
        const kanan = k.xs[k.xs.length - 1] + 46;
        return (
          <g key={k.jenis}>
            <rect
              className="igil-denyut"
              x={kiri}
              y={56}
              width={kanan - kiri}
              height={72}
              rx="16"
              fill="#FFFFFF"
              fillOpacity="0.55"
              stroke={EMAS}
              strokeWidth="3"
              strokeDasharray="6 5"
              style={TENGAH}
            />
            {k.xs.map((x, i) => (
              <Mainan key={x} jenis={k.jenis} x={x} y={68} s={0.9} kelas="igil-lompat" gaya={{ ...BAWAH, animationDelay: `${i * 0.2}s` }} />
            ))}
            <Angka x={(kiri + kanan) / 2} y={152} n={k.n} r={15} />
          </g>
        );
      })}
    </>
  );
}

function AdeganSepedaKursi() {
  return (
    <>
      <Latar />
      <rect x="2" y="30" width="242" height="72" rx="16" fill="#FFFFFF" fillOpacity="0.55" stroke={EMAS} strokeWidth="3" strokeDasharray="6 5" />
      <rect x="2" y="108" width="260" height="62" rx="16" fill="#FFFFFF" fillOpacity="0.55" stroke={BIRU} strokeWidth="3" strokeDasharray="6 5" />
      {Array.from({ length: 4 }, (_, i) => (
        <Mainan key={`s${i}`} jenis="sepeda" x={8 + i * 59} y={40} s={1.15} kelas="igil-lompat" gaya={{ ...BAWAH, animationDelay: `${i * 0.2}s` }} />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <Mainan key={`k${i}`} jenis="kursi" x={8 + i * 50} y={114} s={1} kelas="igil-lompat" gaya={{ ...BAWAH, animationDelay: `${i * 0.2}s` }} />
      ))}
      <Angka x={273} y={66} n={4} r={16} />
      <Angka x={282} y={139} n={5} r={16} />
    </>
  );
}

function AdeganBanyakMainan() {
  const baris = [
    { jenis: "balon", n: 6 },
    { jenis: "buku", n: 7 },
    { jenis: "layangan", n: 8 },
    { jenis: "kelereng", n: 9 },
    { jenis: "bola", n: 10 },
  ];
  return (
    <>
      <Latar />
      <rect x="4" y="12" width="292" height="188" rx="18" fill="#FFFFFF" fillOpacity="0.78" stroke={BIRU} strokeWidth="2.4" />
      {baris.map((b, r) => (
        <g key={b.jenis}>
          {Array.from({ length: 10 }, (_, i) =>
            i < b.n ? (
              <Mainan key={i} jenis={b.jenis} x={10 + i * 25.5} y={20 + r * 35} s={0.52} kelas="igil-lompat" gaya={{ ...BAWAH, animationDelay: `${(i + r) * 0.1}s` }} />
            ) : (
              <circle key={i} cx={10 + i * 25.5 + 12.5} cy={20 + r * 35 + 12.5} r="3.2" fill={BIRU} opacity="0.18" />
            )
          )}
          <text x="286" y={20 + r * 35 + 19} textAnchor="end" fontSize="19" fontWeight="900" fill={BIRU}>
            {b.n}
          </text>
        </g>
      ))}
    </>
  );
}

function Keranjang({ x, y, lebar, isi, warna }: { x: number; y: number; lebar: number; isi: number; warna: string }) {
  const kolom = 5;
  const sela = lebar / (kolom + 0.4);
  return (
    <g>
      {Array.from({ length: isi }, (_, i) => {
        const k = i % kolom;
        const b = Math.floor(i / kolom);
        return (
          <BolaWajah
            key={i}
            x={x + sela * 0.7 + k * sela}
            y={y - 6 - b * sela * 0.9}
            r={sela * 0.44}
            warna={WARNA_BOLA[(i + warna.length) % WARNA_BOLA.length]}
            jeda={i * 0.12}
          />
        );
      })}
      <path d={`M${x + 14} ${y + 4} Q${x + lebar / 2} ${y - 44} ${x + lebar - 14} ${y + 4}`} fill="none" stroke="#7C4A1D" strokeWidth="5" strokeLinecap="round" opacity={isi === 0 ? 1 : 0} />
      <path d={`M${x} ${y} H${x + lebar} L${x + lebar - 12} ${y + 50} H${x + 12} Z`} fill="#F3C98A" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <path d={`M${x + 4} ${y + 17} H${x + lebar - 4} M${x + 8} ${y + 34} H${x + lebar - 8}`} stroke="#A8672D" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d={Array.from({ length: 6 }, (_, i) => `M${x + 12 + i * ((lebar - 24) / 5)} ${y + 2} V${y + 48}`).join(" ")}
        stroke="#A8672D"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>
  );
}

function AdeganKeranjang() {
  return (
    <>
      <Latar />
      <Keranjang x={10} y={112} lebar={118} isi={10} warna="a" />
      <Keranjang x={146} y={112} lebar={118} isi={0} warna="b" />
      <Angka x={69} y={46} n={10} r={17} />
      <g className="igil-denyut" style={TENGAH}>
        <circle cx="205" cy="52" r="26" fill={KUNING} stroke={BIRU} strokeWidth="3.4" />
        <text x="205" y="64" textAnchor="middle" fontSize="34" fontWeight="900" fill={BIRU}>
          0
        </text>
      </g>
      <path d="M205 80 V96" stroke={EMAS} strokeWidth="3.4" strokeLinecap="round" strokeDasharray="1 6" />
      <polygon points="198,94 212,94 205,106" fill={EMAS} stroke={BIRU} strokeWidth="1.4" strokeLinejoin="round" />
      <g className="igil-lompat" style={BAWAH}>
        <KelinciSVG x={279} y={176} s={0.8} />
      </g>
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita bilangan nol sampai sepuluh">
      {id === "A-S1" && <AdeganTaman />}
      {id === "A-S2" && <AdeganMainan />}
      {id === "A-S3" && <AdeganSepedaKursi />}
      {id === "A-S4" && <AdeganBanyakMainan />}
      {id === "A-S5" && <AdeganKeranjang />}
    </svg>
  );
}

export function CeritaBilanganA({
  cerita,
  speakGuru,
}: {
  cerita: Cerita[];
  speakGuru: (teks: string) => void;
}) {
  return <BukuCerita cerita={cerita} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
