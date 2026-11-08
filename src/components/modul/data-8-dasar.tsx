"use client";

import React from "react";
import { BIRU } from "./CeritaBandingB";

/* ------------------------------------------------------------------------ */
/* Bab 8: Mengenal Diagram (Buku Siswa Kelas 1 hlm. 219-242).                 */
/* Gambar benda, turus, tabel, dan alat bantu yang dipakai bersama Sub-Bab A  */
/* (Mengelompokkan Data) dan Sub-Bab B (Diagram Gambar). Semua dibuat di      */
/* klien (SVG dan HTML), tanpa panggilan API.                                 */
/* Naskah: naskah/mtk-1-bab8-sub-a-mengelompokkan-data.md                     */
/*         naskah/mtk-1-bab8-sub-b-diagram-gambar.md                          */
/* ------------------------------------------------------------------------ */

/* ------------------------------ Pengacak tetap -------------------------- */

/** Letak tersebar yang tetap (bukan acak sungguhan), supaya tampilan sama setiap kali dibuka. */
export function tebar(n: number, lebar: number, tinggi: number, benih: number): { x: number; y: number; rot: number }[] {
  const kol = Math.max(1, Math.round(Math.sqrt((n * lebar) / tinggi)));
  const baris = Math.ceil(n / kol);
  const cw = lebar / kol;
  const ch = tinggi / baris;
  let s = (benih >>> 0) || 1;
  const acak = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const sel = Array.from({ length: kol * baris }, (_, i) => i);
  for (let i = sel.length - 1; i > 0; i--) {
    const j = Math.floor(acak() * (i + 1));
    [sel[i], sel[j]] = [sel[j], sel[i]];
  }
  return Array.from({ length: n }, (_, i) => {
    const c = sel[i] % kol;
    const r = Math.floor(sel[i] / kol);
    return {
      x: (c + 0.5) * cw + (acak() - 0.5) * cw * 0.3,
      y: (r + 0.5) * ch + (acak() - 0.5) * ch * 0.3,
      rot: Math.round((acak() - 0.5) * 50),
    };
  });
}

/** Mengocok daftar dengan cara yang tetap. */
export function kocok<T>(daftar: T[], benih: number): T[] {
  const hasil = daftar.slice();
  let s = (benih >>> 0) || 1;
  for (let i = hasil.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = Math.floor((s / 4294967296) * (i + 1));
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }
  return hasil;
}

/* ------------------------------ Gambar benda ---------------------------- */

export type JenisBenda =
  | "pesawat"
  | "mobil"
  | "boneka"
  | "bola"
  | "gasing"
  | "bola-merah"
  | "bola-kuning"
  | "bola-hijau"
  | "bola-biru"
  | "kelereng-merah"
  | "kelereng-biru"
  | "kelereng-kuning"
  | "kelereng-hijau"
  | "jagung"
  | "wortel"
  | "brokoli"
  | "kol"
  | "jeruk"
  | "apel"
  | "mangga"
  | "belimbing"
  | "ayam"
  | "bebek"
  | "kelinci"
  | "karet";

export const NAMA_BENDA: Record<JenisBenda, string> = {
  pesawat: "pesawat",
  mobil: "mobil-mobilan",
  boneka: "boneka",
  bola: "bola",
  gasing: "gasing",
  "bola-merah": "bola merah",
  "bola-kuning": "bola kuning",
  "bola-hijau": "bola hijau",
  "bola-biru": "bola biru",
  "kelereng-merah": "kelereng merah",
  "kelereng-biru": "kelereng biru",
  "kelereng-kuning": "kelereng kuning",
  "kelereng-hijau": "kelereng hijau",
  jagung: "jagung",
  wortel: "wortel",
  brokoli: "brokoli",
  kol: "kol",
  jeruk: "jeruk",
  apel: "apel",
  mangga: "mangga",
  belimbing: "belimbing",
  ayam: "ayam",
  bebek: "bebek",
  kelinci: "kelinci",
  karet: "karet gelang",
};

export const WARNA_TITIK: Record<string, string> = {
  merah: "#EF4444",
  kuning: "#FACC15",
  hijau: "#22C55E",
  biru: "#3B82F6",
};

function Kilap({ x, y, r }: { x: number; y: number; r: number }) {
  return <ellipse cx={x} cy={y} rx={r} ry={r * 0.66} fill="#FFFFFF" opacity="0.75" transform={`rotate(-30 ${x} ${y})`} />;
}

/** Satu benda di dalam kotak -14 sampai 14. (x, y) adalah pusat, s adalah skala. */
export function BendaG({ jenis, x = 0, y = 0, s = 1 }: { jenis: JenisBenda; x?: number; y?: number; s?: number }) {
  const garis = { stroke: BIRU, strokeWidth: 1.7, strokeLinejoin: "round" as const };
  let isi: React.ReactNode = null;
  if (jenis.startsWith("bola-") || jenis.startsWith("kelereng-")) {
    const w = WARNA_TITIK[jenis.split("-")[1]];
    isi = (
      <g>
        <circle cx="0" cy="0" r={jenis.startsWith("bola-") ? 11 : 10} fill={w} {...garis} />
        <Kilap x={-4} y={-5} r={3.6} />
      </g>
    );
  } else if (jenis === "pesawat") {
    isi = (
      <g>
        <path d="M-12 0 L-14 -6 L-10 -6 L-7 -1 Z" fill="#2563EB" {...garis} />
        <path d="M-2 -1 L-8 -11 L-3 -11 L5 -2 Z" fill="#2563EB" {...garis} />
        <path d="M-2 1 L-8 11 L-3 11 L5 2 Z" fill="#2563EB" {...garis} />
        <path d="M-12 0 L9 -3.4 Q13.5 -3 13.5 0 Q13.5 3 9 3.4 Z" fill="#60A5FA" {...garis} />
      </g>
    );
  } else if (jenis === "mobil") {
    isi = (
      <g>
        <path d="M-7 -1 L-4 -8 H5 L8 -1 Z" fill="#FDE68A" {...garis} />
        <rect x="-12.5" y="-2" width="25" height="9.5" rx="3" fill="#FACC15" {...garis} />
        <circle cx="-6.4" cy="8" r="3.2" fill={BIRU} />
        <circle cx="6.4" cy="8" r="3.2" fill={BIRU} />
      </g>
    );
  } else if (jenis === "boneka") {
    isi = (
      <g>
        <ellipse cx="-4.4" cy="-9" rx="2.8" ry="6" fill="#F9A8D4" {...garis} />
        <ellipse cx="4.4" cy="-9" rx="2.8" ry="6" fill="#F9A8D4" {...garis} />
        <ellipse cx="0" cy="9" rx="7.4" ry="5" fill="#F9A8D4" {...garis} />
        <circle cx="0" cy="-1" r="8" fill="#FBCFE8" {...garis} />
        <circle cx="-3" cy="-2" r="1.4" fill={BIRU} />
        <circle cx="3" cy="-2" r="1.4" fill={BIRU} />
        <path d="M-1.6 2 Q0 3.6 1.6 2" fill="none" stroke={BIRU} strokeWidth="1.3" strokeLinecap="round" />
      </g>
    );
  } else if (jenis === "bola") {
    isi = (
      <g>
        <circle cx="0" cy="0" r="11" fill="#FFFFFF" {...garis} />
        <path d="M0 0 L0 -11 A11 11 0 0 1 9.5 5.5 Z" fill="#EF4444" />
        <path d="M0 0 L-9.5 5.5 A11 11 0 0 0 0 11 Z" fill="#3B82F6" />
        <path d="M0 0 L9.5 5.5 A11 11 0 0 1 0 11 Z" fill="#FACC15" />
        <circle cx="0" cy="0" r="11" fill="none" {...garis} />
        <Kilap x={-4.5} y={-5.5} r={3} />
      </g>
    );
  } else if (jenis === "gasing") {
    isi = (
      <g>
        <rect x="-2.6" y="-12" width="5.2" height="5" rx="2" fill="#7C3AED" {...garis} />
        <path d="M-10 -6 Q0 -9 10 -6 L0 12 Z" fill="#A78BFA" {...garis} />
        <path d="M-6 -4 Q0 -6 6 -4" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
      </g>
    );
  } else if (jenis === "jagung") {
    isi = (
      <g>
        <path d="M0 12 Q-10 7 -8 -5 Q-3 2 0 12 Z" fill="#4ADE80" {...garis} />
        <path d="M0 12 Q10 7 8 -5 Q3 2 0 12 Z" fill="#4ADE80" {...garis} />
        <ellipse cx="0" cy="-2" rx="5.6" ry="10.5" fill="#FACC15" {...garis} />
        <path d="M-3 -9 V4 M0 -11 V6 M3 -9 V4 M-5 -3 H5" stroke="#CA8A04" strokeWidth="1" opacity="0.6" />
      </g>
    );
  } else if (jenis === "wortel") {
    isi = (
      <g>
        <path d="M0 -6 Q-6 -10 -4 -13 Q0 -10 0 -6 M0 -6 Q6 -10 4 -13 Q0 -10 0 -6" fill="#4ADE80" {...garis} />
        <path d="M-6.4 -6 H6.4 L0 13 Z" fill="#FB923C" {...garis} />
        <path d="M-3 -2 H2 M-2 3 H1.5" stroke="#C2410C" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      </g>
    );
  } else if (jenis === "brokoli") {
    isi = (
      <g>
        <rect x="-2.8" y="3" width="5.6" height="9.5" rx="2" fill="#86EFAC" {...garis} />
        <circle cx="-5.6" cy="-1" r="6" fill="#22C55E" {...garis} />
        <circle cx="5.6" cy="-1" r="6" fill="#22C55E" {...garis} />
        <circle cx="0" cy="-6" r="6.4" fill="#16A34A" {...garis} />
      </g>
    );
  } else if (jenis === "kol") {
    isi = (
      <g>
        <circle cx="0" cy="0" r="11" fill="#BBF7D0" {...garis} />
        <path d="M-7 -5 Q0 3 7 -5 M-8 3 Q-1 9 8 2 M0 -11 Q-2 0 0 11" fill="none" stroke="#16A34A" strokeWidth="1.3" strokeLinecap="round" />
      </g>
    );
  } else if (jenis === "jeruk") {
    isi = (
      <g>
        <circle cx="0" cy="1" r="10" fill="#FB923C" {...garis} />
        <path d="M0 -9 Q3 -13 7 -11 Q4 -8 0 -9 Z" fill="#4ADE80" {...garis} />
        <Kilap x={-4} y={-3} r={3} />
      </g>
    );
  } else if (jenis === "apel") {
    isi = (
      <g>
        <path d="M0 -8 Q1 -12 4 -12" fill="none" stroke="#7C4A1E" strokeWidth="2" strokeLinecap="round" />
        <path d="M0 -8 C-13 -13 -14 8 -6 11 C-3 12 -1 10 0 10 C1 10 3 12 6 11 C14 8 13 -13 0 -8 Z" fill="#EF4444" {...garis} />
        <Kilap x={-5} y={-3} r={3} />
      </g>
    );
  } else if (jenis === "mangga") {
    isi = (
      <g>
        <path d="M-1 -10 Q3 -14 7 -12 Q4 -9 -1 -10 Z" fill="#4ADE80" {...garis} />
        <ellipse cx="0" cy="1" rx="9" ry="11" fill="#FBBF24" transform="rotate(25)" {...garis} />
        <path d="M-5 -2 Q-3 3 -4 7" fill="none" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      </g>
    );
  } else if (jenis === "belimbing") {
    isi = (
      <g>
        <path d="M0 -12 L3.2 -5 L11 -4 L5 1.5 L7 9.5 L0 5.5 L-7 9.5 L-5 1.5 L-11 -4 L-3.2 -5 Z" fill="#FDE047" {...garis} />
        <path d="M0 -6 V4" stroke="#CA8A04" strokeWidth="1.2" opacity="0.6" />
      </g>
    );
  } else if (jenis === "ayam") {
    isi = (
      <g>
        <circle cx="-1" cy="3" r="9" fill="#FDE047" {...garis} />
        <circle cx="5" cy="-6" r="5.4" fill="#FDE047" {...garis} />
        <path d="M5 -12 Q7 -15 8 -11 Z" fill="#EF4444" {...garis} />
        <path d="M10 -6 L14 -4.6 L10 -3.4 Z" fill="#FB923C" {...garis} />
        <circle cx="6" cy="-7" r="1.2" fill={BIRU} />
        <path d="M-9 4 Q-13 0 -12 -4" fill="none" stroke={BIRU} strokeWidth="1.6" strokeLinecap="round" />
      </g>
    );
  } else if (jenis === "bebek") {
    isi = (
      <g>
        <ellipse cx="-1" cy="4" rx="10.5" ry="7.4" fill="#FFFBEB" {...garis} />
        <circle cx="6" cy="-5" r="5.6" fill="#FFFBEB" {...garis} />
        <ellipse cx="12" cy="-4" rx="3.6" ry="1.8" fill="#FB923C" {...garis} />
        <circle cx="7" cy="-6" r="1.2" fill={BIRU} />
        <path d="M-6 3 Q-1 8 5 3" fill="none" stroke={BIRU} strokeWidth="1.4" strokeLinecap="round" />
      </g>
    );
  } else if (jenis === "kelinci") {
    isi = (
      <g>
        <ellipse cx="-3.6" cy="-9" rx="2.8" ry="6.4" fill="#E5E7EB" {...garis} />
        <ellipse cx="3.6" cy="-9" rx="2.8" ry="6.4" fill="#E5E7EB" {...garis} />
        <ellipse cx="0" cy="8" rx="8" ry="5.4" fill="#E5E7EB" {...garis} />
        <circle cx="0" cy="-1" r="8" fill="#F3F4F6" {...garis} />
        <circle cx="-3" cy="-2" r="1.3" fill={BIRU} />
        <circle cx="3" cy="-2" r="1.3" fill={BIRU} />
        <circle cx="0" cy="1.6" r="1.4" fill="#F472B6" />
      </g>
    );
  } else if (jenis === "karet") {
    isi = <ellipse cx="0" cy="0" rx="11" ry="5.2" fill="none" stroke="#DC2626" strokeWidth="2.8" />;
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} aria-hidden="true">
      {isi}
    </g>
  );
}

/** Satu benda berdiri sendiri (HTML). Dipakai di tahap Concrete (benda nyata). */
export function BendaSvg({ jenis, kelas = "h-9 w-9" }: { jenis: JenisBenda; kelas?: string }) {
  return (
    <svg viewBox="-15 -15 30 30" className={`block shrink-0 ${kelas}`} aria-hidden="true">
      <BendaG jenis={jenis} />
    </svg>
  );
}

/* ------------------------------ Turus ----------------------------------- */

/** Catatan turus: tiap lima goresan, empat tegak lalu satu miring yang mencoret. */
export function Turus({ n, tinggi = 22, warna = BIRU, kelas = "" }: { n: number; tinggi?: number; warna?: string; kelas?: string }) {
  const kelompok = Math.ceil(Math.max(n, 1) / 5);
  const lebarKel = 27;
  const lebar = kelompok * lebarKel;
  return (
    <svg viewBox={`0 0 ${lebar} 24`} style={{ height: tinggi, width: (lebar * tinggi) / 24 }} className={`block shrink-0 ${kelas}`} role="img" aria-label={`Turus ${n}`}>
      {Array.from({ length: kelompok }, (_, g) => {
        const sisa = Math.min(5, n - g * 5);
        const x0 = g * lebarKel + 4;
        return (
          <g key={g} stroke={warna} strokeWidth="2.4" strokeLinecap="round">
            {Array.from({ length: Math.min(4, Math.max(sisa, 0)) }, (_, i) => (
              <path key={i} d={`M${x0 + i * 5.4} 3 V21`} />
            ))}
            {sisa >= 5 ? <path d={`M${x0 - 3} 17 L${x0 + 19} 6`} stroke="#DC2626" /> : null}
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------ Tabel ----------------------------------- */

const SEL = "border-[#1C01A5]/40";

/** Tabel menurun: kolom pertama nama, kolom kedua banyak. `sorot` menandai baris (mulai 0 untuk data) atau kolom. */
export function TabelMenurun({
  judul,
  kepala,
  baris,
  sorotBaris = -1,
  sorotKolom = -1,
  kecil = false,
}: {
  judul?: string;
  kepala: [string, string];
  baris: [string, number | string][];
  sorotBaris?: number;
  sorotKolom?: number;
  kecil?: boolean;
}) {
  const t = kecil ? "py-1 text-xs" : "py-1.5 text-sm";
  return (
    <div className="mx-auto w-full max-w-sm space-y-0.5">
      {judul ? <p className="text-center text-sm font-black text-[#1C01A5]">{judul}</p> : null}
      <div role="table" aria-label={judul ?? "Tabel menurun"} className="overflow-hidden rounded-xl border-4 border-[#1C01A5] bg-white text-center">
        <div role="row" className="grid grid-cols-2 bg-[#E9D8F3] font-black text-[#1C01A5]">
          {kepala.map((k, c) => (
            <span key={k} role="columnheader" className={`${t} ${c === 0 ? `border-r-2 ${SEL}` : ""} ${sorotKolom === c ? "bg-[#FFE566]" : ""}`}>
              {k}
            </span>
          ))}
        </div>
        {baris.map(([nama, nilai], r) => (
          <div key={nama} role="row" className={`grid grid-cols-2 border-t-2 ${SEL} font-black text-[#1C01A5] ${sorotBaris === r ? "bg-[#FFE566]" : r % 2 ? "bg-[#F5F3FF]" : "bg-white"}`}>
            <span role="rowheader" className={`${t} border-r-2 ${SEL} ${sorotKolom === 0 ? "bg-[#FFF7CC]" : ""}`}>
              {nama}
            </span>
            <span role="cell" className={`${t} ${sorotKolom === 1 ? "bg-[#FFF7CC]" : ""}`}>
              {nilai}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Tabel mendatar: baris pertama nama, baris kedua banyak. */
export function TabelMendatar({
  judul,
  labelNama,
  labelBanyak,
  nama,
  nilai,
  kecil = false,
}: {
  judul?: string;
  labelNama: string;
  labelBanyak: string;
  nama: string[];
  nilai: (number | string)[];
  kecil?: boolean;
}) {
  const t = kecil ? "py-1 text-[11px]" : "py-1.5 text-sm";
  const kolom = { gridTemplateColumns: `1.4fr repeat(${nama.length}, 1fr)` };
  return (
    <div className="mx-auto w-full max-w-md space-y-0.5">
      {judul ? <p className="text-center text-sm font-black text-[#1C01A5]">{judul}</p> : null}
      <div role="table" aria-label={judul ?? "Tabel mendatar"} className="overflow-hidden rounded-xl border-4 border-[#1C01A5] bg-white text-center">
        <div role="row" className="grid bg-[#E9D8F3] font-black text-[#1C01A5]" style={kolom}>
          <span role="columnheader" className={`${t} border-r-2 ${SEL}`}>
            {labelNama}
          </span>
          {nama.map((k) => (
            <span key={k} role="columnheader" className={`${t} border-l-2 ${SEL} leading-tight`}>
              {k}
            </span>
          ))}
        </div>
        <div role="row" className={`grid border-t-2 ${SEL} font-black text-[#1C01A5]`} style={kolom}>
          <span role="rowheader" className={`${t} border-r-2 ${SEL} bg-[#F5F3FF] leading-tight`}>
            {labelBanyak}
          </span>
          {nilai.map((v, i) => (
            <span key={i} role="cell" className={`${t} border-l-2 ${SEL}`}>
              {v}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Ruang toko mainan untuk adegan cerita. */
export function RuangToko() {
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#FDF2D6" />
      <rect x="0" y="150" width="300" height="58" fill="#E8CFA0" />
      <path d="M0 150 H300" stroke="#C9A96A" strokeWidth="2" />
    </>
  );
}

/** Simbol diagram: lingkaran polos atau wajah tersenyum. Tanpa gambar benda. */
export function SimbolSvg({ jenis = "bulat", warna = "#FACC15", kelas = "h-7 w-7" }: { jenis?: "bulat" | "bintang" | "wajah"; warna?: string; kelas?: string }) {
  return (
    <svg viewBox="-12 -12 24 24" className={`block shrink-0 ${kelas}`} aria-hidden="true">
      {jenis === "bintang" ? (
        <path d="M0 -10 L2.9 -3.4 L10 -3 L4.5 1.8 L6.3 8.8 L0 5 L-6.3 8.8 L-4.5 1.8 L-10 -3 L-2.9 -3.4 Z" fill={warna} stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      ) : (
        <g>
          <circle cx="0" cy="0" r="10" fill={warna} stroke={BIRU} strokeWidth="1.8" />
          {jenis === "wajah" ? (
            <g>
              <circle cx="-3.4" cy="-2.4" r="1.3" fill={BIRU} />
              <circle cx="3.4" cy="-2.4" r="1.3" fill={BIRU} />
              <path d="M-4 2.4 Q0 7 4 2.4" fill="none" stroke={BIRU} strokeWidth="1.5" strokeLinecap="round" />
            </g>
          ) : null}
        </g>
      )}
    </svg>
  );
}
