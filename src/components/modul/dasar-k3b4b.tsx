import React from "react";
import type { BendaSudut } from "./data-k3b4";

/* ------------------------------------------------------------------------ */
/* Gambar benda nyata untuk tahap Concrete Sub-Bab B (Sudut): buku yang dibuka,   */
/* pintu yang dibuka, gunting yang dibuka, dan irisan pizza untuk satuan sudut    */
/* tidak baku. Tiap benda membentuk sudut `deg` derajat. Hanya dipakai di tahap   */
/* Concrete (dan video cerita). Bagian *Isi tanpa pembungkus svg agar bisa        */
/* ditempatkan di dalam adegan video. Tanpa acak dan tanpa jaringan.              */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const rad = (d: number) => (d * Math.PI) / 180;
const bulat = (n: number) => Math.round(n * 100) / 100;

/** Isi gambar buku (kotak 220 x 130): sampul bawah mendatar ke kanan, sampul atas diputar `deg` derajat berlawanan arah jarum jam. */
export function BukuIsi({ deg }: { deg: number }) {
  const hx = 110;
  const hy = 112;
  const panjang = 90;
  const sampul = (warna: string, halaman: string) => (
    <>
      <rect x={hx} y={hy - 7} width={panjang} height="14" rx="3" fill={warna} stroke={BIRU} strokeWidth="2" />
      <rect x={hx + 4} y={hy - 4} width={panjang - 10} height="8" rx="2" fill={halaman} />
    </>
  );
  return (
    <>
      <g>{sampul("#F59E0B", "#FFFBEB")}</g>
      <g transform={`rotate(${-deg} ${hx} ${hy})`}>{sampul("#2563EB", "#EFF6FF")}</g>
      <circle cx={hx} cy={hy} r="6" fill="#DC2626" stroke={BIRU} strokeWidth="2" />
    </>
  );
}

export function BukuTerbuka({ deg }: { deg: number }) {
  return (
    <svg viewBox="0 0 220 130" className="mx-auto block h-auto w-full" role="img" aria-label="Buku yang dibuka membentuk sudut">
      <BukuIsi deg={deg} />
    </svg>
  );
}

/** Isi gambar pintu dilihat dari atas (kotak 220 x 130): dinding dengan celah, daun pintu berengsel di kiri celah dan diputar `deg` derajat. */
export function PintuIsi({ deg }: { deg: number }) {
  const hx = 108;
  const hy = 104;
  const lebar = 88;
  return (
    <>
      <rect x="8" y={hy - 6} width={hx - 8} height="12" fill="#64748B" stroke={BIRU} strokeWidth="1.5" />
      <rect x={hx + lebar} y={hy - 6} width="20" height="12" fill="#64748B" stroke={BIRU} strokeWidth="1.5" />
      <g transform={`rotate(${-deg} ${hx} ${hy})`}>
        <rect x={hx} y={hy - 5} width={lebar} height="10" rx="2" fill="#B45309" stroke={BIRU} strokeWidth="2" />
        <circle cx={hx + lebar - 8} cy={hy} r="3" fill="#FDE68A" stroke={BIRU} strokeWidth="1" />
      </g>
      <circle cx={hx} cy={hy} r="5.5" fill="#DC2626" stroke={BIRU} strokeWidth="2" />
    </>
  );
}

export function PintuTerbuka({ deg }: { deg: number }) {
  return (
    <svg viewBox="0 0 220 130" className="mx-auto block h-auto w-full" role="img" aria-label="Pintu yang dibuka membentuk sudut">
      <PintuIsi deg={deg} />
    </svg>
  );
}

/** Isi gambar gunting (kotak 220 x 170): dua mata gunting membuka `deg` derajat, gagang ada di seberang titik putar. */
export function GuntingIsi({ deg }: { deg: number }) {
  const px = 74;
  const py = 85;
  const mata = 72;
  const sisi = (arah: number, warna: string) => (
    <g transform={`rotate(${-arah} ${px} ${py})`}>
      <polygon points={`${px - 6},${py - 5} ${px + mata},${py - 1.5} ${px + mata},${py + 3} ${px - 6},${py + 5}`} fill="#CBD5E1" stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
      <line x1={px - 6} y1={py} x2={px - 30} y2={py} stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
      <circle cx={px - 40} cy={py} r="10" fill="none" stroke={warna} strokeWidth="5" />
    </g>
  );
  return (
    <>
      {sisi(deg / 2, "#DC2626")}
      {sisi(-deg / 2, "#2563EB")}
      <circle cx={px} cy={py} r="5" fill="#F59E0B" stroke={BIRU} strokeWidth="2" />
    </>
  );
}

export function GuntingTerbuka({ deg }: { deg: number }) {
  return (
    <svg viewBox="0 0 220 170" className="mx-auto block h-auto w-full" role="img" aria-label="Gunting yang dibuka membentuk sudut">
      <GuntingIsi deg={deg} />
    </svg>
  );
}

/** Pilih gambar benda menurut jenisnya. */
export function BendaSudutSvg({ benda, deg }: { benda: BendaSudut; deg: number }) {
  if (benda === "buku") return <BukuTerbuka deg={deg} />;
  if (benda === "pintu") return <PintuTerbuka deg={deg} />;
  return <GuntingTerbuka deg={deg} />;
}

function irisan(cx: number, cy: number, r: number, dari: number, sampai: number): string {
  const a = { x: cx + r * Math.cos(rad(dari)), y: cy - r * Math.sin(rad(dari)) };
  const b = { x: cx + r * Math.cos(rad(sampai)), y: cy - r * Math.sin(rad(sampai)) };
  return `M ${cx} ${cy} L ${bulat(a.x)} ${bulat(a.y)} A ${r} ${r} 0 ${sampai - dari > 180 ? 1 : 0} 0 ${bulat(b.x)} ${bulat(b.y)} Z`;
}

/** Sudut `deg` derajat yang ditutupi irisan pizza berukuran `satuan` derajat. Kaki OA di kanan, kaki OB di ujung irisan terakhir. */
export function IrisanPizza({ deg, satuan }: { deg: number; satuan: number }) {
  const cx = 95;
  const cy = 128;
  const r = 92;
  const n = Math.round(deg / satuan);
  const potongan = Array.from({ length: n }, (_, i) => i);
  const b = { x: cx + (r + 14) * Math.cos(rad(deg)), y: cy - (r + 14) * Math.sin(rad(deg)) };
  return (
    <svg viewBox="0 0 220 158" className="mx-auto block h-auto w-full" role="img" aria-label={`Sudut yang ditutupi ${n} irisan pizza yang sama besar`}>
      {potongan.map((i) => {
        const dari = i * satuan;
        const sampai = (i + 1) * satuan;
        const tengah = dari + satuan / 2;
        const t = { x: cx + r * 0.62 * Math.cos(rad(tengah)), y: cy - r * 0.62 * Math.sin(rad(tengah)) };
        return (
          <g key={i}>
            <path d={irisan(cx, cy, r, dari, sampai)} fill={i % 2 === 0 ? "#FBBF24" : "#FCD34D"} stroke="#92400E" strokeWidth="2" strokeLinejoin="round" />
            <circle cx={bulat(t.x)} cy={bulat(t.y)} r={satuan >= 30 ? 6 : 3.5} fill="#DC2626" stroke="#7F1D1D" strokeWidth="1" />
          </g>
        );
      })}
      <line x1={cx} y1={cy} x2={cx + r + 14} y2={cy} stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={bulat(b.x)} y2={bulat(b.y)} stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="4.5" fill="#fff" stroke={BIRU} strokeWidth="2" />
      <g fontSize="13" fontWeight="900" fill={BIRU} textAnchor="middle">
        <text x={cx + r + 22} y={cy + 5}>A</text>
        <text x={bulat(cx + (r + 25) * Math.cos(rad(deg)))} y={bulat(cy - (r + 25) * Math.sin(rad(deg)) + 5)}>B</text>
        <text x={cx - 12} y={cy + 17}>O</text>
      </g>
    </svg>
  );
}
