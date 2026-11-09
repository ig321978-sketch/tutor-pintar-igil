"use client";

import React, { useMemo } from "react";
import { BIRU, EMAS } from "./CeritaBandingB";
import { BendaDatarG, DEKOR_BENDA, Ruang3DG, WARNA_MODEL } from "./dasar-k2b3";
import { bendaRuang, jalurBentuk, jalurTitik, pusatPoligon, tangramKeping, uraiBangun, type IdBentuk, type JenisRuang, type Ruas, type Titik } from "./data-k2b3";

/* ------------------------------------------------------------------------ */
/* Bagian gambar SVG bersama video cerita Kelas 2 Bab 3: bentuk datar, benda   */
/* datar dan benda ruang, bangun terurai, tangram, sarang lebah, kaca          */
/* pembesar, dan panah. Semua ditaruh di kotak adegan 300 x 208.               */
/* Mesin video (DaftarVideoCerita, buatAdegan) dipakai dari video-k2b2-umum.   */
/* ------------------------------------------------------------------------ */

export { buatAdegan, DaftarVideoCerita, KartuTeks, Teks, type VideoSiap } from "./video-k2b2-umum";
export const WARNA_KEPING = ["#FCA5A5", "#93C5FD", "#86EFAC", "#FDE68A", "#C4B5FD", "#FDBA74", "#A5F3FC", "#F9A8D4"];

/** Bentuk polos berukuran w, kiri atas di (x, y). */
export function Sh({ id, x, y, w, warna = "#FDE68A", putar = 0, putus = false, kosong = false, tebal = 4 }: { id: IdBentuk; x: number; y: number; w: number; warna?: string; putar?: number; putus?: boolean; kosong?: boolean; tebal?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${w / 100})`}>
      <g transform={`rotate(${putar} 50 50)`}>
        <path d={jalurBentuk(id)} fill={kosong ? "none" : warna} stroke={BIRU} strokeWidth={tebal} strokeLinejoin="round" strokeDasharray={putus ? "6 5" : undefined} />
      </g>
    </g>
  );
}

/** Poligon sebarang. Koordinat titik dikali `skala`, lalu digeser (x, y). */
export function Pol({ titik, x, y, skala, warna = "#FDE68A", tebal = 3, putus = false, kosong = false }: { titik: readonly Titik[]; x: number; y: number; skala: number; warna?: string; tebal?: number; putus?: boolean; kosong?: boolean }) {
  return <path d={jalurTitik(titik)} transform={`translate(${x} ${y}) scale(${skala})`} fill={kosong ? "none" : warna} stroke={BIRU} strokeWidth={tebal / skala} strokeLinejoin="round" strokeDasharray={putus ? `${5 / skala} ${4 / skala}` : undefined} />;
}

/** Poligon yang kotak pembatasnya diletakkan dengan kiri atas di (ox, oy), diperbesar `skala`. */
export function PolDi({ titik, ox, oy, skala, warna = "#FDE68A", tebal = 3 }: { titik: readonly Titik[]; ox: number; oy: number; skala: number; warna?: string; tebal?: number }) {
  const minX = Math.min(...titik.map((p) => p[0]));
  const minY = Math.min(...titik.map((p) => p[1]));
  return <Pol titik={titik} x={ox - minX * skala} y={oy - minY * skala} skala={skala} warna={warna} tebal={tebal} />;
}

/** Benda datar nyata berukuran w. */
export function ObjDatar({ id, x, y, w }: { id: string; x: number; y: number; w: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${w / 100})`}>
      <BendaDatarG id={id} />
    </g>
  );
}

/** Benda nyata berbentuk bangun ruang berukuran w. */
export function ObjRuang({ id, x, y, w }: { id: string; x: number; y: number; w: number }) {
  const b = bendaRuang(id);
  return (
    <g transform={`translate(${x} ${y}) scale(${w / 100})`}>
      <Ruang3DG jenis={b.jenis} warna={b.warna} dekor={DEKOR_BENDA[id]} />
    </g>
  );
}

/** Model bangun ruang polos berukuran w. */
export function ModelRuang({ jenis, x, y, w }: { jenis: JenisRuang; x: number; y: number; w: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${w / 100})`}>
      <Ruang3DG jenis={jenis} warna={WARNA_MODEL[jenis]} />
    </g>
  );
}

/** Bangun datar terurai oleh garis. Keping berwarna, garis tebal, `jarak` menggeser keping menjauh dari pusat. */
export function UraiG({ titik, batas, ruas, x, y, w, jarak = 0, garis = true }: { titik: readonly Titik[]; batas: number; ruas: readonly Ruas[]; x: number; y: number; w: number; jarak?: number; garis?: boolean }) {
  const hasil = useMemo(() => uraiBangun(titik, batas, ruas), [titik, batas, ruas]);
  const [gx, gy] = pusatPoligon(titik.slice(0, batas));
  return (
    <g transform={`translate(${x} ${y}) scale(${w / 100})`}>
      {hasil.keping.map((k, i) => {
        const pts = k.simpul.map((s) => titik[s]);
        const [cx, cy] = pusatPoligon(pts);
        const dx = hasil.keping.length > 1 ? (cx - gx) * jarak : 0;
        const dy = hasil.keping.length > 1 ? (cy - gy) * jarak : 0;
        return <path key={i} d={jalurTitik(pts)} transform={`translate(${dx} ${dy})`} fill={WARNA_KEPING[i % WARNA_KEPING.length]} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" style={{ transition: "transform .6s ease-out" }} />;
      })}
      {garis && jarak === 0
        ? ruas.map((r) => <line key={`${r[0]}-${r[1]}`} x1={titik[r[0]][0]} y1={titik[r[0]][1]} x2={titik[r[1]][0]} y2={titik[r[1]][1]} stroke={BIRU} strokeWidth="3.6" strokeLinecap="round" />)
        : null}
    </g>
  );
}

/** Garis putus-putus calon guntingan pada bangun berukuran w. */
export function GarisPutus({ titik, ruas, x, y, w }: { titik: readonly Titik[]; ruas: readonly Ruas[]; x: number; y: number; w: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${w / 100})`}>
      {ruas.map((r) => (
        <line key={`${r[0]}-${r[1]}`} x1={titik[r[0]][0]} y1={titik[r[0]][1]} x2={titik[r[1]][0]} y2={titik[r[1]][1]} stroke="#475569" strokeWidth="2.6" strokeDasharray="6 5" strokeLinecap="round" className="vc-denyut" />
      ))}
    </g>
  );
}

/** Tangram dalam kotak w. `terurai` menjauhkan keping dari pusat. */
export function TangramG({ x, y, w, terurai = 0 }: { x: number; y: number; w: number; terurai?: number }) {
  const keping = tangramKeping();
  return (
    <g transform={`translate(${x} ${y}) scale(${w / 100})`}>
      {keping.map((k, i) => {
        const [cx, cy] = pusatPoligon(k.titik);
        return <path key={i} d={jalurTitik(k.titik)} fill={k.warna} stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" style={{ transform: `translate(${(cx - 50) * terurai}px, ${(cy - 50) * terurai}px)`, transition: "transform .6s ease-out" }} />;
      })}
    </g>
  );
}

/** Sarang lebah: tujuh segi enam berdempetan. (x, y) pusat, `s` skala. */
export function SarangG({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const r = 15 * s;
  const jarak = Math.sqrt(3) * r;
  const pusat: [number, number][] = [[x, y]];
  for (let k = 0; k < 6; k += 1) {
    const a = ((30 + 60 * k) * Math.PI) / 180;
    pusat.push([x + jarak * Math.cos(a), y + jarak * Math.sin(a)]);
  }
  return (
    <g>
      {pusat.map(([cx, cy], i) => (
        <path
          key={i}
          d={`M${Array.from({ length: 6 }, (_, j) => `${(cx + (r - 0.6) * Math.cos((Math.PI / 3) * j)).toFixed(1)} ${(cy + (r - 0.6) * Math.sin((Math.PI / 3) * j)).toFixed(1)}`).join(" L")} Z`}
          fill={i === 0 ? "#FBBF24" : "#FDE68A"}
          stroke={BIRU}
          strokeWidth={Math.max(1.4, 2.4 * s)}
          strokeLinejoin="round"
        />
      ))}
    </g>
  );
}

/** Kaca pembesar. (x, y) pusat lensa. */
export function Lup({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className="vc-lompat">
      <path d="M12 12 L30 30" stroke="#92400E" strokeWidth="7" strokeLinecap="round" />
      <circle cx="0" cy="0" r="18" fill="#E0F2FE" fillOpacity="0.7" stroke={BIRU} strokeWidth="4" />
      <path d="M-9 -7 Q-6 -12 0 -13" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

/** Panah lurus dari (x1, y1) ke (x2, y2). */
export function PanahG({ x1, y1, x2, y2, warna = BIRU }: { x1: number; y1: number; x2: number; y2: number; warna?: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const kepala = (da: number) => `${x2 - 9 * Math.cos(a + da)} ${y2 - 9 * Math.sin(a + da)}`;
  return (
    <g>
      <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke={warna} strokeWidth="3.4" strokeLinecap="round" />
      <path d={`M${kepala(0.5)} L${x2} ${y2} L${kepala(-0.5)}`} fill="none" stroke={warna} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/** Gelembung tanya besar. */
export function Tanya({ x, y }: { x: number; y: number }) {
  return (
    <g className="vc-lompat">
      <circle cx={x} cy={y} r="20" fill="#FFFFFF" stroke={BIRU} strokeWidth="3.4" />
      <text x={x} y={y + 11} textAnchor="middle" fontSize="30" fontWeight="900" fill={EMAS}>
        ?
      </text>
    </g>
  );
}