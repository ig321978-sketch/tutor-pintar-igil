"use client";

import React, { useState } from "react";
import { BIRU, EMAS } from "./CeritaBandingB";
import { Tokoh } from "./gambar-maju-mundur-c";
import { KupuG } from "./selisih-a6-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 7: Mengukur Panjang Benda (Buku Siswa Kelas 1 hlm. 197-218).           */
/* Bagian gambar dan alat bantu yang dipakai bersama Sub-Bab A dan Sub-Bab B. */
/* Semua dibuat di klien (SVG dan HTML), tanpa panggilan API.                 */
/* Naskah: naskah/mtk-1-bab7-sub-a-membandingkan-mengurutkan-panjang.md       */
/*         naskah/mtk-1-bab7-sub-b-mengukur-panjang-benda.md                  */
/* ------------------------------------------------------------------------ */

export const KULIT_B7 = "#FFD9B3";
export const MERAH_B7 = "#DC2626";
export const WARNA_BATANG = ["#BFDBFE", "#FECACA", "#BBF7D0", "#FDE68A", "#E9D5FF"];
export const WARNA_PENSIL: Record<string, string> = {
  biru: "#2563EB",
  merah: "#EF4444",
  hijau: "#22C55E",
  kuning: "#EAB308",
  ungu: "#9333EA",
};

/* ------------------------------ Pilihan teks ---------------------------- */

/** Tombol pilihan berisi kata atau kalimat pendek. Tanpa gambar. */
export function PilihKata({
  opsi,
  keliru,
  onPilih,
  kolom = 3,
  mati = false,
  kecil = false,
}: {
  opsi: string[];
  keliru: string | null;
  onPilih: (t: string) => void;
  kolom?: 1 | 2 | 3;
  mati?: boolean;
  kecil?: boolean;
}) {
  const grid = kolom === 1 ? "grid-cols-1" : kolom === 2 ? "grid-cols-2" : "grid-cols-3";
  return (
    <div className={`grid gap-2 ${grid}`}>
      {opsi.map((t) => (
        <button
          key={`${t}-${keliru === t ? "x" : "o"}`}
          type="button"
          aria-label={`Pilih ${t}`}
          disabled={mati}
          onClick={() => onPilih(t)}
          className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1.5 font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-40 ${
            kecil ? "py-2 text-sm" : "py-3 text-base"
          } ${keliru === t ? "igil-goyang" : ""}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/** Catatanku di akhir sub-bab. Ketuk kotak kalau jawabannya iya. */
export function RefleksiBab7({ items, speakGuru }: { items: string[]; speakGuru: (t: string) => void }) {
  const [iya, setIya] = useState<boolean[]>(() => items.map(() => false));
  return (
    <div className="space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-[#F5F3FF] px-2 py-2">
      <p className="text-center text-base font-black text-[#1C01A5]">📝 Catatanku</p>
      <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk kotak kalau jawabanmu iya.</p>
      {items.map((tx, i) => (
        <button
          key={tx}
          type="button"
          aria-pressed={iya[i]}
          aria-label={`${tx} ${iya[i] ? "Iya" : "Belum dicentang"}`}
          onClick={() => {
            const baru = iya.slice();
            baru[i] = !baru[i];
            setIya(baru);
            speakGuru(baru[i] ? `${tx} Iya.` : tx);
          }}
          className="flex w-full items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1 text-left"
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-4 border-[#1C01A5] text-xl ${iya[i] ? "bg-[#FFE566]" : "bg-white"}`}>{iya[i] ? "😊" : ""}</span>
          <span className="min-w-0 flex-1 text-sm font-black leading-tight text-[#1C01A5]">{tx}</span>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------ Anak ------------------------------------ */

/** Anak berdiri. `tinggi` adalah skala badan (0,7 sampai 1,2). Alas gambar selalu sama, jadi tinggi badan bisa dibandingkan. */
export function AnakSvg({ tinggi, rambut, baju, kelas = "h-20 w-12" }: { tinggi: number; rambut: string; baju: string; kelas?: string }) {
  return (
    <svg viewBox="-24 -72 48 76" className={`block ${kelas}`} aria-hidden="true">
      <Tokoh x={0} y={0} rambut={rambut} baju={baju} s={tinggi} />
    </svg>
  );
}

/* ------------------------------ Pensil ---------------------------------- */

/** Pensil mendatar. (x, y) adalah ujung kiri (penghapus) di garis tengah. `panjang` adalah panjang seluruh pensil. Minimal 44. */
export function PensilG({ x, y, panjang, warna = "#2563EB" }: { x: number; y: number; panjang: number; warna?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="-6" width="7" height="12" rx="2.4" fill="#F9A8D4" stroke={BIRU} strokeWidth="1.8" />
      <rect x="7" y="-6" width="5" height="12" fill="#CBD5E1" stroke={BIRU} strokeWidth="1.8" />
      <rect x="12" y="-6" width={panjang - 22} height="12" fill={warna} stroke={BIRU} strokeWidth="1.8" />
      <path d={`M${panjang - 10} -6 L${panjang} 0 L${panjang - 10} 6 Z`} fill="#FDE68A" stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
      <path d={`M${panjang - 4} -1.6 L${panjang} 0 L${panjang - 4} 1.6 Z`} fill={BIRU} />
      <path d={`M15 -2.4 H${panjang - 13}`} stroke="#FFFFFF" strokeWidth="1.6" opacity="0.5" strokeLinecap="round" />
    </g>
  );
}

/* ------------------------------ Pohon pisang ---------------------------- */

/**
 * Pohon pisang. (x, y) adalah pangkal batang. `tinggi` adalah tinggi seluruh pohon sampai ujung daun
 * tertinggi (minimal 44), jadi dua pohon bisa dibandingkan dari ujung atasnya.
 */
export function PohonG({ x, y, tinggi, s = 1 }: { x: number; y: number; tinggi: number; s?: number }) {
  const batang = tinggi - 24;
  const sudut = [-72, -36, 36, 72, 0];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="1" rx="16" ry="3.4" fill="#8B5E3C" opacity="0.35" />
      <path d={`M-4.4 0 L-3.2 ${-batang} L3.2 ${-batang} L4.4 0 Z`} fill="#A3B86C" stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
      <path d={`M-1 -4 V${-batang + 6}`} stroke="#FFFFFF" strokeWidth="1.4" opacity="0.45" strokeLinecap="round" />
      <ellipse cx="5" cy={-batang + 5} rx="3.2" ry="4.4" fill="#FDE047" stroke={BIRU} strokeWidth="1.3" />
      {sudut.map((a) => (
        <g key={a} transform={`translate(0 ${-batang}) rotate(${a})`}>
          <ellipse cx="0" cy="-11" rx="5.6" ry="13" fill={a === 0 ? "#22C55E" : "#4ADE80"} stroke={BIRU} strokeWidth="1.8" />
          <path d="M0 -2 V-21" stroke="#15803D" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

/* ------------------------------ Burung, balon, payung ------------------- */

export function BurungG({ x, y, s = 1, warna = "#EF4444" }: { x: number; y: number; s?: number; warna?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-12 -2 L-23 -10 L-19 3 Z" fill={warna} stroke={BIRU} strokeWidth="2.2" strokeLinejoin="round" />
      <ellipse cx="0" cy="0" rx="13" ry="9.6" fill={warna} stroke={BIRU} strokeWidth="2.4" />
      <path d="M-7 1 Q-3 -13 8 -11 Q6 -1 -7 1 Z" fill="#FFFFFF" opacity="0.45" stroke={BIRU} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M12 -2 L20 1 L12 4 Z" fill={EMAS} stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="6" cy="-3" r="2.2" fill={BIRU} />
      <circle cx="6.8" cy="-3.8" r="0.8" fill="#FFFFFF" />
    </g>
  );
}

export function BalonG({ x, y, s = 1, warna = "#EF4444" }: { x: number; y: number; s?: number; warna?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 15 Q-5 22 2 27 Q6 31 0 36" fill="none" stroke={BIRU} strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="0" cy="0" rx="12" ry="15" fill={warna} stroke={BIRU} strokeWidth="2.4" />
      <path d="M-3 14 L3 14 L0 18 Z" fill={BIRU} />
      <ellipse cx="-4.6" cy="-6.6" rx="3" ry="4.6" fill="#FFFFFF" opacity="0.65" transform="rotate(20 -4.6 -6.6)" />
    </g>
  );
}

export function PayungG({ x, y, s = 1, warna = "#F59E0B", panjang = 60 }: { x: number; y: number; s?: number; warna?: string; panjang?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={`M0 ${-panjang + 18} V0 Q0 8 6 8 Q10 8 10 3`} fill="none" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      <path d={`M-22 ${-panjang + 20} Q-22 ${-panjang - 2} 0 ${-panjang - 2} Q22 ${-panjang - 2} 22 ${-panjang + 20} Q11 ${-panjang + 14} 0 ${-panjang + 20} Q-11 ${-panjang + 14} -22 ${-panjang + 20} Z`} fill={warna} stroke={BIRU} strokeWidth="2.2" strokeLinejoin="round" />
    </g>
  );
}

export function KupuWarna({ warna, kelas = "h-10 w-12" }: { warna: string; kelas?: string }) {
  return (
    <svg viewBox="-24 -26 48 46" className={`block ${kelas}`} aria-hidden="true">
      <KupuG x={0} y={0} s={1} warna={warna} />
    </svg>
  );
}

export function BurungWarna({ warna, kelas = "h-10 w-12" }: { warna: string; kelas?: string }) {
  return (
    <svg viewBox="-28 -18 56 36" className={`block ${kelas}`} aria-hidden="true">
      <BurungG x={0} y={0} s={1} warna={warna} />
    </svg>
  );
}

export function BalonWarna({ warna, kelas = "h-12 w-9" }: { warna: string; kelas?: string }) {
  return (
    <svg viewBox="-16 -19 32 56" className={`block ${kelas}`} aria-hidden="true">
      <BalonG x={0} y={0} s={1} warna={warna} />
    </svg>
  );
}

/* ------------------------------ Alat ukur (satuan tak baku) ------------- */

const KOMBINASI_SEDOTAN = ["#60A5FA", "#F87171"];

/** Sedotan. (x, y) adalah pojok kiri atas. Warna berganti supaya tiap sedotan bisa dihitung. */
export function SedotanG({ x, y, w, h = 8, urut = 0 }: { x: number; y: number; w: number; h?: number; urut?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0.8" y="0.8" width={w - 1.6} height={h - 1.6} rx={h / 2.4} fill={KOMBINASI_SEDOTAN[urut % 2]} stroke={BIRU} strokeWidth="1.6" />
      <path d={`M${w * 0.18} ${h * 0.5} H${w * 0.82}`} stroke="#FFFFFF" strokeWidth="1.4" opacity="0.6" strokeLinecap="round" />
    </g>
  );
}

/** Stik es krim. (x, y) adalah pojok kiri atas. */
export function StikG({ x, y, w, h = 14 }: { x: number; y: number; w: number; h?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0.8" y="0.8" width={w - 1.6} height={h - 1.6} rx={h / 2.2} fill="#EBC27A" stroke={BIRU} strokeWidth="1.8" />
      <path d={`M${w * 0.2} ${h * 0.5} H${w * 0.8}`} stroke="#B98A44" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
    </g>
  );
}

/** Koin. (x, y) adalah pojok kiri atas kotak berukuran d kali d. */
export function KoinG({ x, y, d }: { x: number; y: number; d: number }) {
  const r = d / 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={r} cy={r} r={r - 0.9} fill="#CBD5E1" stroke={BIRU} strokeWidth="1.8" />
      <circle cx={r} cy={r} r={Math.max(2, r * 0.62)} fill="none" stroke="#94A3B8" strokeWidth="1.4" />
    </g>
  );
}

/** Penjepit kertas. (x, y) adalah pojok kiri atas. */
export function KlipG({ x, y, w, h = 12 }: { x: number; y: number; w: number; h?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="1.2" y="1.2" width={w - 2.4} height={h - 2.4} rx={(h - 2.4) / 2} fill="none" stroke="#2563EB" strokeWidth="2.2" />
      <rect x={w * 0.2} y={h * 0.3} width={w * 0.62} height={h * 0.4} rx={h * 0.2} fill="none" stroke="#2563EB" strokeWidth="2.2" />
    </g>
  );
}

/** Satu alat ukur sesuai jenisnya. Dipakai di rantai satuan. */
export type JenisSatuan = "stik" | "koin" | "sedotan" | "klip";

export function SatuanG({ jenis, x, y, w, h, urut = 0 }: { jenis: JenisSatuan; x: number; y: number; w: number; h: number; urut?: number }) {
  if (jenis === "stik") return <StikG x={x} y={y + (h - 14) / 2} w={w} h={14} />;
  if (jenis === "koin") return <KoinG x={x} y={y + (h - w) / 2} d={w} />;
  if (jenis === "sedotan") return <SedotanG x={x} y={y + (h - 9) / 2} w={w} h={9} urut={urut} />;
  return <KlipG x={x} y={y + (h - 12) / 2} w={w} h={12} />;
}

export const NAMA_SATUAN: Record<JenisSatuan, string> = {
  stik: "stik es krim",
  koin: "koin",
  sedotan: "sedotan",
  klip: "penjepit kertas",
};

/** Telapak tangan terbuka untuk jengkal. (x, y) adalah tengah telapak. Rentang jempol ke kelingking sekitar 42. */
export function TanganG({ x, y, s = 1, panah = false }: { x: number; y: number; s?: number; panah?: boolean }) {
  const jari: [number, number, number, number][] = [
    [-9, 6, -25, -4],
    [-6, -4, -10, -24],
    [-1, -6, -1, -28],
    [4, -5, 8, -25],
    [9, -1, 17, -18],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {jari.map(([a, b, c, d], i) => (
        <g key={i}>
          <line x1={a} y1={b} x2={c} y2={d} stroke={BIRU} strokeWidth="8.4" strokeLinecap="round" />
        </g>
      ))}
      {jari.map(([a, b, c, d], i) => (
        <line key={`k${i}`} x1={a} y1={b} x2={c} y2={d} stroke={KULIT_B7} strokeWidth="5" strokeLinecap="round" />
      ))}
      <ellipse cx="0" cy="7" rx="12" ry="10" fill={KULIT_B7} stroke={BIRU} strokeWidth="2.2" />
      {panah ? (
        <g>
          <path d="M-24 24 H17" stroke={MERAH_B7} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M-20 21 L-24 24 L-20 27 M13 21 L17 24 L13 27" fill="none" stroke={MERAH_B7} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}
    </g>
  );
}

/** Telapak kaki, ujung jari menghadap kanan. (x, y) adalah tengah telapak. Panjang sekitar 44. */
export function KakiG({ x, y, s = 1, panah = false }: { x: number; y: number; s?: number; panah?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g transform="rotate(90)">
        <path d="M-7 -20 C-13 -14 -13 2 -9 12 C-6 20 5 20 7 12 C10 4 10 -6 8 -13 C6 -19 -2 -24 -7 -20 Z" fill={KULIT_B7} stroke={BIRU} strokeWidth="2.2" strokeLinejoin="round" />
        {[
          [-7, -21, 3.2],
          [-1.5, -24, 2.6],
          [3.4, -23, 2.4],
          [7, -19, 2.2],
          [9.6, -14, 2],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={KULIT_B7} stroke={BIRU} strokeWidth="1.4" />
        ))}
      </g>
      {panah ? (
        <g>
          <path d="M-22 26 H24" stroke={MERAH_B7} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M-18 23 L-22 26 L-18 29 M20 23 L24 26 L20 29" fill="none" stroke={MERAH_B7} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}
    </g>
  );
}

/** Anak merentangkan tangan untuk depa. (x, y) adalah telapak kaki. */
export function DepaG({ x, y, s = 1, panah = false, baju = "#FBBF24" }: { x: number; y: number; s?: number; panah?: boolean; baju?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-4 -14 V-2 M4 -14 V-2" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M-30 -30 L30 -30" stroke={BIRU} strokeWidth="7.4" strokeLinecap="round" />
      <path d="M-30 -30 L30 -30" stroke={KULIT_B7} strokeWidth="4" strokeLinecap="round" />
      <rect x="-9" y="-36" width="18" height="24" rx="6" fill={baju} stroke={BIRU} strokeWidth="2.2" />
      <circle cx="0" cy="-46" r="9.4" fill={KULIT_B7} stroke={BIRU} strokeWidth="2.2" />
      <path d="M-9.6 -48 C-10 -60 10 -60 9.6 -48 C4 -53 -4 -53 -9.6 -48 Z" fill="#1F2937" stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="-3.4" cy="-45" r="1.5" fill={BIRU} />
      <circle cx="3.4" cy="-45" r="1.5" fill={BIRU} />
      <path d="M-3 -41 Q0 -38 3 -41" fill="none" stroke={BIRU} strokeWidth="1.4" strokeLinecap="round" />
      {panah ? (
        <g>
          <path d="M-30 8 H30" stroke={MERAH_B7} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M-26 5 L-30 8 L-26 11 M26 5 L30 8 L26 11" fill="none" stroke={MERAH_B7} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}
    </g>
  );
}

/* ------------------------------ Meja dan buku --------------------------- */

/** Meja tampak samping. (x, y) adalah pojok kiri atas papan meja. `kaki` adalah panjang kaki meja. */
export function MejaG({ x, y, w, kaki = 34 }: { x: number; y: number; w: number; kaki?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="10" y="10" width="10" height={kaki} fill="#E9A15B" stroke={BIRU} strokeWidth="2.2" />
      <rect x={w - 20} y="10" width="10" height={kaki} fill="#E9A15B" stroke={BIRU} strokeWidth="2.2" />
      <rect x="0" y="0" width={w} height="12" rx="3" fill="#FDBA74" stroke={BIRU} strokeWidth="2.4" />
    </g>
  );
}

export function BukuG({ x, y, w, h = 36 }: { x: number; y: number; w: number; h?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width={w} height={h} rx="4" fill="#4CAF6A" stroke={BIRU} strokeWidth="2.4" />
      <rect x={w * 0.55} y={h * 0.16} width={w * 0.3} height={h * 0.46} rx="3" fill="#86D39A" />
      <path d={`M3 ${h - 6} H${w - 3}`} stroke="#FFFFFF" strokeWidth="2" opacity="0.8" strokeLinecap="round" />
    </g>
  );
}

/* ------------------------------ Diagram polos ---------------------------- */

/** Batang dengan huruf di lingkaran. Diagram polos untuk tahap Picture. (x, y) adalah pojok kiri atas batang. */
export function BatangDatar({ x, y, w, h = 22, isi, huruf, sorot = false }: { x: number; y: number; w: number; h?: number; isi: string; huruf?: string; sorot?: boolean }) {
  return (
    <g>
      {huruf ? (
        <g>
          <circle cx={x - 16} cy={y + h / 2} r="10" fill="#FFFFFF" stroke={sorot ? EMAS : BIRU} strokeWidth="2.4" />
          <text x={x - 16} y={y + h / 2 + 4.4} textAnchor="middle" fontSize="12.5" fontWeight="900" fill={BIRU}>
            {huruf}
          </text>
        </g>
      ) : null}
      <rect x={x} y={y} width={w} height={h} rx="4" fill={sorot ? "#FDE047" : isi} stroke={BIRU} strokeWidth={sorot ? 3.4 : 2.4} />
    </g>
  );
}

/* ------------------------------ Teks adegan ------------------------------ */

/** Label putih berbingkai untuk judul adegan. */
export function Label({ x, y, w, teks, ukuran = 14 }: { x: number; y: number; w: number; teks: string; ukuran?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="28" rx="12" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x={x + w / 2} y={y + 20} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}

export function Ket({ x, y, teks, warna = BIRU, ukuran = 12.5 }: { x: number; y: number; teks: string; warna?: string; ukuran?: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={warna}>
      {teks}
    </text>
  );
}

/** Lingkaran kecil berisi huruf pohon atau batang. */
export function HurufBulat({ x, y, teks, r = 9.5 }: { x: number; y: number; teks: string; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2.2" />
      <text x={x} y={y + 4.2} textAnchor="middle" fontSize="11.5" fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}

/** Alas putih agar teks keterangan di bagian bawah adegan tetap terbaca di atas rumput dan bunga. */
export function AlasTeks({ y, h }: { y: number; h: number }) {
  return <rect x="12" y={y} width="276" height={h} rx="9" fill="#FFFFFF" fillOpacity="0.82" />;
}