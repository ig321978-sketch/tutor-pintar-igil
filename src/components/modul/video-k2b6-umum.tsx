"use client";

import React from "react";
import { BIRU, EMAS } from "./CeritaBandingB";
import { IsiJam } from "./diagram-k2b6";

/* ------------------------------------------------------------------------ */
/* Bagian gambar SVG bersama video cerita Kelas 2 Bab 6 (Pengukuran: Berat dan  */
/* Waktu). Semua ditaruh di kotak adegan 300 x 208 yang sudah berlatar langit    */
/* dan rumput. Mesin video (DaftarVideoCerita, buatAdegan) dipakai bersama.      */
/* Tanpa API, tanpa berkas video.                                              */
/* ------------------------------------------------------------------------ */

export { buatAdegan, DaftarVideoCerita, type VideoSiap } from "./video-k2b2-umum";
export { Orang, Ucap, Panah, Obj, Angka } from "./video-k2b4-umum";
export { BIRU, EMAS };

/** Satu lambang (emoji) berpusat di (x, y). */
export function Emo({ x, y, e, s = 26 }: { x: number; y: number; e: string; s?: number }) {
  return (
    <text x={x} y={y + s * 0.36} textAnchor="middle" fontSize={s} aria-hidden="true">
      {e}
    </text>
  );
}

/** Banyak lambang yang sama disusun berbaris. (x, y) tengah baris pertama. */
export function Baris({ x, y, e, n, s = 18, kolom = 5, gap = 2 }: { x: number; y: number; e: string; n: number; s?: number; kolom?: number; gap?: number }) {
  const k = Math.min(kolom, n);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <Emo key={i} x={x + ((i % kolom) - (k - 1) / 2) * (s + gap)} y={y - Math.floor(i / kolom) * (s + gap)} e={e} s={s} />
      ))}
    </g>
  );
}

/** Latar ruang kelas: dinding krem, lantai kayu, jendela, dan papan tulis. Menutupi latar luar ruangan. */
export function RuangKelas() {
  return (
    <g>
      <rect x="0" y="0" width="300" height="208" fill="#FEF3C7" />
      <rect x="0" y="132" width="300" height="76" fill="#D6B98C" />
      <path d="M0 132 H300" stroke="#A8672D" strokeWidth="3" />
      <rect x="204" y="44" width="74" height="60" rx="5" fill="#BAE6FD" stroke={BIRU} strokeWidth="3" />
      <path d="M241 44 V104 M204 74 H278" stroke={BIRU} strokeWidth="2.4" />
      <rect x="22" y="48" width="86" height="52" rx="4" fill="#166534" stroke="#A8672D" strokeWidth="4" />
      <path d="M32 64 H70 M32 78 H86" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
    </g>
  );
}

/** Langit malam bertabur bintang. Menutupi latar siang. */
export function LangitMalam() {
  return (
    <g>
      <rect x="0" y="0" width="300" height="208" fill="#1E1B4B" />
      <rect x="0" y="152" width="300" height="56" fill="#312E81" />
      {[[30, 52], [78, 78], [130, 46], [190, 70], [250, 50], [276, 96], [56, 110], [160, 108]].map(([a, b], i) => (
        <text key={i} x={a} y={b} fontSize={i % 2 ? 11 : 14} fill="#FDE68A" textAnchor="middle" aria-hidden="true">
          ✦
        </text>
      ))}
      <circle cx="244" cy="46" r="22" fill="#FEF9C3" />
      <circle cx="254" cy="40" r="19" fill="#1E1B4B" />
    </g>
  );
}

/** Matahari di langit pada posisi (x, y) dengan warna menurut bagian hari. */
export function MatahariSvg({ x, y, warna = "#FBBF24", r = 16 }: { x: number; y: number; warna?: string; r?: number }) {
  return (
    <g style={{ transform: `translate(${x}px, ${y}px)`, transition: "transform 1s ease-in-out" }}>
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={Math.cos((i * Math.PI) / 4) * (r + 4)} y1={Math.sin((i * Math.PI) / 4) * (r + 4)} x2={Math.cos((i * Math.PI) / 4) * (r + 11)} y2={Math.sin((i * Math.PI) / 4) * (r + 11)} stroke={warna} strokeWidth="3" strokeLinecap="round" />
      ))}
      <circle r={r} fill={warna} stroke={BIRU} strokeWidth="2.4" />
    </g>
  );
}

/**
 * Neraca atau gantungan baju. (x, y) adalah titik tumpu. `miring` -1: kiri turun, 0: seimbang, 1: kanan turun.
 * `kiri` dan `kanan` digambar dengan titik (0, 0) di dasar piringan (benda di atasnya, y negatif).
 */
export function NeracaSvg({
  x,
  y,
  s = 1,
  miring,
  kiri,
  kanan,
  gantung = false,
}: {
  x: number;
  y: number;
  s?: number;
  miring: -1 | 0 | 1;
  kiri?: React.ReactNode;
  kanan?: React.ReactNode;
  gantung?: boolean;
}) {
  const dy = 13;
  const trans = "transform 0.8s cubic-bezier(.3,1.35,.5,1)";
  const pan = (ex: number, d: number, isi: React.ReactNode) => (
    <g style={{ transform: `translate(${ex}px, ${40 + d}px)`, transition: trans }}>
      {gantung ? (
        <>
          <path d="M0 -40 L-24 -26 M0 -40 L24 -26" stroke={BIRU} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M-24 -26 H24 Q27 10 0 10 Q-27 10 -24 -26 Z" fill="rgba(255,255,255,0.85)" stroke={BIRU} strokeWidth="2.4" strokeDasharray="5 3" />
        </>
      ) : (
        <>
          <path d="M0 -40 L-26 0 M0 -40 L26 0" stroke={BIRU} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M-30 0 H30 Q24 11 0 11 Q-24 11 -30 0 Z" fill="#FFE566" stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" />
        </>
      )}
      {isi}
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {gantung ? (
        <>
          <path d="M0 0 V-34" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
          <path d="M0 -34 q0 -10 -9 -10 q-8 0 -8 7" stroke={BIRU} strokeWidth="3.4" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M0 0 L-17 78 H17 Z" fill="#C7D2FE" stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" />
          <rect x="-32" y="76" width="64" height="9" rx="4" fill={BIRU} />
        </>
      )}
      <g style={{ transform: `rotate(${miring * 10.7}deg)`, transformOrigin: "0px 0px", transition: trans }}>
        <line x1="-72" y1="0" x2="72" y2="0" stroke={BIRU} strokeWidth="5.4" strokeLinecap="round" />
        <circle cx="-72" cy="0" r="3.6" fill={EMAS} stroke={BIRU} strokeWidth="1.6" />
        <circle cx="72" cy="0" r="3.6" fill={EMAS} stroke={BIRU} strokeWidth="1.6" />
      </g>
      {pan(-70, -miring * dy, kiri)}
      {pan(70, miring * dy, kanan)}
      <circle r="6" fill={EMAS} stroke={BIRU} strokeWidth="2.4" />
    </g>
  );
}

/** Jam dinding di dalam adegan. (x, y) kiri atas, ukuran w x w. */
export function JamSvg({ x, y, w = 70, jam, menit = 0, gaya = "dinding", tonjol }: { x: number; y: number; w?: number; jam: number; menit?: number; gaya?: "garis" | "dinding"; tonjol?: "pendek" | "panjang" }) {
  return (
    <svg x={x} y={y} width={w} height={w} viewBox="0 0 120 120" overflow="visible">
      <IsiJam jam={jam} menit={menit} gaya={gaya} tonjol={tonjol} />
    </svg>
  );
}

/** Batang lama kegiatan mendatar. (x, y) kiri atas, panjang w. */
export function BatangWaktu({ x, y, w, h = 18, warna = "#7FCB96", teks }: { x: number; y: number; w: number; h?: number; warna?: string; teks?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="5" fill={warna} stroke={BIRU} strokeWidth="2.6" style={{ transition: "width 0.8s" }} />
      {teks ? (
        <text x={x + w + 6} y={y + h * 0.72} fontSize="11" fontWeight="900" fill={BIRU}>
          {teks}
        </text>
      ) : null}
    </g>
  );
}

/** Kemoceng sederhana. (x, y) ujung bulu, miring ke bawah kanan. */
export function Kemoceng({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 L26 26" stroke="#A8672D" strokeWidth="4" strokeLinecap="round" />
      {[-12, -6, 0, 6, 12].map((d) => (
        <path key={d} d={`M${d} -4 Q${d * 1.4} -18 ${d * 0.6} -26`} stroke="#F472B6" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      ))}
    </g>
  );
}

/** Satuan tidak baku berpusat di (x, y), berdiameter sekitar `s`. */
export function SatuanSvg({ id, x, y, s = 18 }: { id: "balok" | "kelereng" | "koin" | "bolaTenis"; x: number; y: number; s?: number }) {
  const r = s / 2;
  if (id === "balok") {
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d={`M${-r} ${-r * 0.4} L0 ${-r} L${r} ${-r * 0.4} L0 ${r * 0.2} Z`} fill="#FDE68A" stroke="#B45309" strokeWidth="1.6" strokeLinejoin="round" />
        <path d={`M${-r} ${-r * 0.4} V${r * 0.6} L0 ${r} V${r * 0.2} Z`} fill="#F59E0B" stroke="#B45309" strokeWidth="1.6" strokeLinejoin="round" />
        <path d={`M${r} ${-r * 0.4} V${r * 0.6} L0 ${r} V${r * 0.2} Z`} fill="#D97706" stroke="#B45309" strokeWidth="1.6" strokeLinejoin="round" />
      </g>
    );
  }
  if (id === "kelereng") {
    return (
      <g transform={`translate(${x} ${y})`}>
        <circle r={r} fill="#2563EB" stroke="#1E3A8A" strokeWidth="1.6" />
        <path d={`M${-r * 0.6} ${-r * 0.1} q${r * 0.3} ${-r * 0.7} ${r * 0.8} ${-r * 0.5}`} stroke="#FFFFFF" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8" />
      </g>
    );
  }
  if (id === "koin") {
    return (
      <g transform={`translate(${x} ${y})`}>
        <circle r={r} fill="#FBBF24" stroke="#B45309" strokeWidth="1.8" />
        <circle r={r * 0.62} fill="none" stroke="#B45309" strokeWidth="1.2" />
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#BEF264" stroke="#4D7C0F" strokeWidth="1.8" />
      <path d={`M${-r * 0.8} ${-r * 0.5} q${r * 0.9} ${r * 0.5} 0 ${r}`} stroke="#FFFFFF" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d={`M${r * 0.8} ${-r * 0.5} q${-r * 0.9} ${r * 0.5} 0 ${r}`} stroke="#FFFFFF" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
  );
}

/** Dinding ruang rumah: krem dengan lantai kayu. Menutupi latar luar ruangan. */
export function Dinding() {
  return (
    <g>
      <rect x="0" y="0" width="300" height="208" fill="#FDE9C4" />
      <rect x="0" y="150" width="300" height="58" fill="#D6B98C" />
      <path d="M0 150 H300" stroke="#A8672D" strokeWidth="3" />
    </g>
  );
}

export type FaseHari = "pagi" | "siang" | "sore" | "malam";
const LANGIT: Record<FaseHari, { langit: string; rumput: string }> = {
  pagi: { langit: "#FEF3C7", rumput: "#B7E0C0" },
  siang: { langit: "#BAE6FD", rumput: "#9ADBA8" },
  sore: { langit: "#FDBA74", rumput: "#A7C99B" },
  malam: { langit: "#1E1B4B", rumput: "#312E81" },
};
const POSISI_MATAHARI: Record<FaseHari, [number, number, string]> = {
  pagi: [236, 134, "#FB923C"],
  siang: [150, 54, "#FBBF24"],
  sore: [64, 128, "#EF4444"],
  malam: [250, 48, "#FEF9C3"],
};

/** Langit satu hari. Matahari bergeser halus bila `fase` berubah. Menutupi latar siang. */
export function LangitHari({ fase }: { fase: FaseHari }) {
  const l = LANGIT[fase];
  const [mx, my, mw] = POSISI_MATAHARI[fase];
  return (
    <g>
      <rect x="0" y="0" width="300" height="208" fill={l.langit} style={{ transition: "fill 0.8s" }} />
      {fase === "malam"
        ? [[30, 52], [78, 78], [130, 40], [190, 70], [276, 96], [56, 112], [160, 100]].map(([a, b], i) => (
            <text key={i} x={a} y={b} fontSize={i % 2 ? 11 : 14} fill="#FDE68A" textAnchor="middle" aria-hidden="true">
              ✦
            </text>
          ))
        : null}
      <rect x="0" y="152" width="300" height="56" fill={l.rumput} style={{ transition: "fill 0.8s" }} />
      <MatahariSvg x={mx} y={my} warna={mw} r={fase === "malam" ? 14 : 16} />
    </g>
  );
}