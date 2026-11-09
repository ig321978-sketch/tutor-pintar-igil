"use client";

import React from "react";
import { BIRU, EMAS } from "./CeritaBandingB";
import { sebarTitik } from "./data-k2b7";

/* ------------------------------------------------------------------------ */
/* Bagian gambar SVG bersama video cerita Kelas 2 Bab 7 (Ayo Membilang sampai   */
/* dengan 100). Semua ditaruh di kotak adegan 300 x 208 yang sudah berlatar      */
/* langit dan rumput. Mesin video dipakai bersama. Tanpa API, tanpa berkas video.*/
/* ------------------------------------------------------------------------ */

export { buatAdegan, DaftarVideoCerita, type VideoSiap } from "./video-k2b2-umum";
export { Orang, Ucap, Panah, Angka } from "./video-k2b4-umum";
export { Emo, Dinding, LangitHari, SatuanSvg } from "./video-k2b6-umum";
export { BIRU, EMAS };

export type JenisWadah = "kue" | "kelereng" | "rambutan" | "ikan";

/** Satu benda kecil berpusat di (x, y). */
export function ItemMini({ jenis, x, y, r = 4, i = 0 }: { jenis: JenisWadah; x: number; y: number; r?: number; i?: number }) {
  if (jenis === "kue") {
    return (
      <g>
        <circle cx={x} cy={y} r={r} fill="#D9A441" stroke="#92400E" strokeWidth={Math.max(0.8, r * 0.18)} />
        <circle cx={x - r * 0.3} cy={y - r * 0.1} r={r * 0.2} fill="#451A03" />
        <circle cx={x + r * 0.35} cy={y + r * 0.25} r={r * 0.2} fill="#451A03" />
      </g>
    );
  }
  if (jenis === "kelereng") {
    return (
      <g>
        <circle cx={x} cy={y} r={r} fill={["#2563EB", "#DC2626", "#16A34A", "#9333EA"][i % 4]} stroke="#1E1B4B" strokeWidth={Math.max(0.8, r * 0.18)} />
        <path d={`M${x - r * 0.5} ${y - r * 0.1} q${r * 0.25} ${-r * 0.6} ${r * 0.65} ${-r * 0.45}`} stroke="#FFFFFF" strokeWidth={Math.max(0.8, r * 0.25)} fill="none" strokeLinecap="round" opacity="0.8" />
      </g>
    );
  }
  if (jenis === "rambutan") {
    return (
      <g>
        {Array.from({ length: 8 }, (_, k) => {
          const a = (k * Math.PI * 2) / 8;
          return <line key={k} x1={x + Math.cos(a) * r * 0.8} y1={y + Math.sin(a) * r * 0.8} x2={x + Math.cos(a) * r * 1.3} y2={y + Math.sin(a) * r * 1.3} stroke="#B91C1C" strokeWidth={Math.max(0.8, r * 0.22)} strokeLinecap="round" />;
        })}
        <circle cx={x} cy={y} r={r * 0.85} fill="#EF4444" stroke="#7F1D1D" strokeWidth={Math.max(0.8, r * 0.16)} />
      </g>
    );
  }
  const warna = ["#FB923C", "#38BDF8", "#F472B6", "#FACC15"][i % 4];
  return (
    <g>
      <ellipse cx={x} cy={y} rx={r * 1.15} ry={r * 0.7} fill={warna} stroke="#1E3A8A" strokeWidth={Math.max(0.7, r * 0.15)} />
      <path d={`M${x - r * 1.1} ${y} L${x - r * 1.9} ${y - r * 0.7} L${x - r * 1.9} ${y + r * 0.7} Z`} fill={warna} stroke="#1E3A8A" strokeWidth={Math.max(0.7, r * 0.15)} strokeLinejoin="round" />
      <circle cx={x + r * 0.55} cy={y - r * 0.12} r={r * 0.16} fill="#1E1B4B" />
    </g>
  );
}

const WADAH_GAYA: Record<JenisWadah, { latar: string; tepi: string; rx: number }> = {
  kue: { latar: "#FEF3C7", tepi: "#B45309", rx: 5 },
  kelereng: { latar: "rgba(186,230,253,0.7)", tepi: "#1D4ED8", rx: 9 },
  rambutan: { latar: "#FDE9C4", tepi: "#A8672D", rx: 6 },
  ikan: { latar: "#E0F2FE", tepi: "#0369A1", rx: 14 },
};

/** Satu wadah penuh berisi sepuluh benda (dua baris lima). (x, y) kiri atas, lebar w, tinggi h. */
export function WadahSvg({ jenis, x, y, w = 56, h = 34, terisi = 10 }: { jenis: JenisWadah; x: number; y: number; w?: number; h?: number; terisi?: number }) {
  const g = WADAH_GAYA[jenis];
  const r = Math.min(w / 12.5, h / 5.6);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={g.rx} fill={g.latar} stroke={g.tepi} strokeWidth="2.4" strokeDasharray={jenis === "ikan" ? "4 3" : undefined} />
      {jenis === "kelereng" ? <path d={`M${x + w / 2 - 6} ${y} l6 -7 l6 7`} fill="none" stroke={g.tepi} strokeWidth="2.4" strokeLinecap="round" /> : null}
      {jenis === "rambutan" ? <path d={`M${x + 4} ${y} Q${x + w / 2} ${y - 10} ${x + w - 4} ${y}`} fill="none" stroke={g.tepi} strokeWidth="2.4" /> : null}
      {Array.from({ length: terisi }, (_, i) => (
        <ItemMini key={i} jenis={jenis} i={i} r={r} x={x + w * 0.12 + (i % 5) * (w * 0.19)} y={y + h * 0.3 + Math.floor(i / 5) * (h * 0.4)} />
      ))}
    </g>
  );
}

/** Baris wadah penuh: n wadah dengan ukuran w x h, mulai dari (x, y), berbaris `kolom` per baris. */
export function BarisWadah({ jenis, n, x, y, w = 40, h = 26, kolom = 5, gap = 4 }: { jenis: JenisWadah; n: number; x: number; y: number; w?: number; h?: number; kolom?: number; gap?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <WadahSvg key={i} jenis={jenis} x={x + (i % kolom) * (w + gap)} y={y + Math.floor(i / kolom) * (h + gap + 6)} w={w} h={h} />
      ))}
    </g>
  );
}

/** Garis angka berupa kotak berurutan. Satu bilangan bisa ditandai (penanda meluncur halus) dan beberapa disembunyikan. */
export function StripSvg({
  x,
  y,
  dari,
  sampai,
  tandai = null,
  sembunyi = [],
  penanda,
  lebarSel = 30,
  tinggi = 28,
  sorot = [],
}: {
  x: number;
  y: number;
  dari: number;
  sampai: number;
  tandai?: number | null;
  sembunyi?: number[];
  penanda?: React.ReactNode;
  lebarSel?: number;
  tinggi?: number;
  sorot?: number[];
}) {
  const n = sampai - dari + 1;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const b = dari + i;
        const aktif = tandai === b;
        const nyala = sorot.includes(b);
        return (
          <g key={b}>
            <rect x={x + i * lebarSel} y={y} width={lebarSel - 2} height={tinggi} rx="5" fill={aktif ? "#FFF7CC" : nyala ? "#BBF7D0" : "#FFFFFF"} stroke={aktif ? "#F0AB00" : BIRU} strokeWidth={aktif ? 3.2 : 2.4} />
            <text x={x + i * lebarSel + (lebarSel - 2) / 2} y={y + tinggi * 0.68} textAnchor="middle" fontSize={lebarSel > 26 ? 13 : 11} fontWeight="900" fill={BIRU}>
              {sembunyi.includes(b) ? "?" : b}
            </text>
          </g>
        );
      })}
      {tandai !== null && penanda ? (
        <g style={{ transform: `translate(${x + (tandai - dari) * lebarSel + (lebarSel - 2) / 2}px, ${y - 20}px)`, transition: "transform 0.9s cubic-bezier(.3,1.3,.5,1)" }}>{penanda}</g>
      ) : null}
    </g>
  );
}

/** Papan nilai tempat kecil. (x, y) kiri atas. */
export function PapanSvg({ x, y, p, s, w = 40, sorotP = false, sorotS = false }: { x: number; y: number; p: number | string; s: number | string; w?: number; sorotP?: boolean; sorotS?: boolean }) {
  const kotak = (dx: number, judul: string, isi: number | string, warna: string, sorot: boolean) => (
    <g>
      <rect x={x + dx} y={y} width={w} height={w * 1.15} rx="6" fill="#FFFFFF" stroke={sorot ? "#F0AB00" : BIRU} strokeWidth={sorot ? 4 : 3} />
      <rect x={x + dx} y={y} width={w} height={w * 0.34} rx="5" fill={warna} stroke={sorot ? "#F0AB00" : BIRU} strokeWidth={sorot ? 4 : 3} />
      <text x={x + dx + w / 2} y={y + w * 0.26} textAnchor="middle" fontSize={w * 0.2} fontWeight="900" fill={BIRU}>
        {judul}
      </text>
      <text x={x + dx + w / 2} y={y + w * 0.98} textAnchor="middle" fontSize={w * 0.58} fontWeight="900" fill={BIRU}>
        {isi}
      </text>
    </g>
  );
  return (
    <g>
      {kotak(0, "Puluhan", p, "#BAE6FD", sorotP)}
      {kotak(w + 4, "Satuan", s, "#FDE68A", sorotS)}
    </g>
  );
}

/** Ikan hias bertebaran: n ikan dengan posisi tetap di kotak (x, y, w, h). */
export function IkanSebar({ n, x, y, w, h }: { n: number; x: number; y: number; w: number; h: number }) {
  const pos = sebarTitik(n, w, h);
  return (
    <g>
      {pos.map(([a, b], i) => (
        <ItemMini key={i} jenis="ikan" i={i} r={3.4} x={x + a} y={y + b} />
      ))}
    </g>
  );
}

/** Orang-orangan nama bilangan besar di tengah adegan (angka besar dalam lencana). */
export function AngkaBesar({ x, y, teks, w = 90 }: { x: number; y: number; teks: string; w?: number }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - 22} width={w} height="44" rx="14" fill={EMAS} stroke={BIRU} strokeWidth="3.4" />
      <text x={x} y={y + 12} textAnchor="middle" fontSize="32" fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}
