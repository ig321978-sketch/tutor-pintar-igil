"use client";

import React from "react";
import { puluhan, satuan, sebarTitik } from "./data-k2b7";

/* ------------------------------------------------------------------------ */
/* Diagram bersama Matematika Kelas 2 Bab 7 (Ayo Membilang sampai dengan 100). */
/* Hanya batang puluhan, kotak satuan, titik, papan nilai tempat, garis dan    */
/* tabel angka. TIDAK ada gambar benda dan tidak ada emoji, supaya aman dipakai */
/* tahap Picture. Tahap Concrete memakai dasar-k2b7.tsx untuk benda nyata.     */
/* ------------------------------------------------------------------------ */

const TINTA = "#1C01A5";

/** Model batang puluhan dan kotak satuan. p batang (tiap batang sepuluh kotak) dan s kotak lepas. */
export function ModelBilangan({ p, s, skala = 1, label }: { p: number; s: number; skala?: number; label?: string }) {
  const bw = 11 * skala;
  const bh = 66 * skala;
  const gap = 3.5 * skala;
  const cw = 11 * skala;
  const kolomKubus = Math.min(s, 5);
  const lebarBatang = p > 0 ? p * (bw + gap) - gap : 0;
  const lebarKubus = s > 0 ? kolomKubus * (cw + gap) - gap : 0;
  const jarak = p > 0 && s > 0 ? 9 * skala : 0;
  const W = Math.max(lebarBatang + jarak + lebarKubus, 8);
  return (
    <svg viewBox={`0 0 ${W} ${bh}`} width={W} height={bh} className="block max-w-full" role="img" aria-label={label ?? `${p} puluhan dan ${s} satuan`} style={{ height: "auto" }}>
      {Array.from({ length: p }, (_, i) => (
        <g key={`b${i}`}>
          <rect x={i * (bw + gap)} y="0" width={bw} height={bh} rx={2 * skala} fill="#7DD3FC" stroke={TINTA} strokeWidth={1.6 * skala} />
          {Array.from({ length: 9 }, (_, j) => (
            <line key={j} x1={i * (bw + gap)} x2={i * (bw + gap) + bw} y1={((j + 1) * bh) / 10} y2={((j + 1) * bh) / 10} stroke={TINTA} strokeWidth={0.9 * skala} opacity="0.55" />
          ))}
        </g>
      ))}
      {Array.from({ length: s }, (_, i) => {
        const baris = Math.floor(i / 5);
        const kol = i % 5;
        return <rect key={`k${i}`} x={lebarBatang + jarak + kol * (cw + gap)} y={bh - cw - baris * (cw + gap)} width={cw} height={cw} rx={2 * skala} fill="#FDE047" stroke={TINTA} strokeWidth={1.6 * skala} />;
      })}
    </svg>
  );
}

/** Papan nilai tempat dua kolom. Angka tersembunyi ditulis "?". */
export function PapanNilai({ p, s, tanyaP = false, tanyaS = false, kecil = false }: { p: number; s: number; tanyaP?: boolean; tanyaS?: boolean; kecil?: boolean }) {
  const sel = (judul: string, isi: string, warna: string) => (
    <div className="flex flex-col items-center overflow-hidden rounded-xl border-[3px] border-[#1C01A5] bg-white">
      <span className={`w-full text-center font-black text-[#1C01A5] ${kecil ? "px-2 py-0 text-[10px]" : "px-3 py-0.5 text-xs"}`} style={{ backgroundColor: warna }}>
        {judul}
      </span>
      <span className={`flex items-center justify-center font-black text-[#1C01A5] ${kecil ? "h-8 w-11 text-xl" : "h-12 w-16 text-4xl"}`}>{isi}</span>
    </div>
  );
  return (
    <div className="flex items-center justify-center gap-1.5" role="img" aria-label={`Papan nilai tempat: puluhan ${tanyaP ? "belum diketahui" : p}, satuan ${tanyaS ? "belum diketahui" : s}`}>
      {sel("Puluhan", tanyaP ? "?" : String(p), "#BAE6FD")}
      {sel("Satuan", tanyaS ? "?" : String(s), "#FDE68A")}
    </div>
  );
}

/** Papan nilai tempat dari satu bilangan. */
export const PapanBilangan = ({ n, kecil = false }: { n: number; kecil?: boolean }) => <PapanNilai p={puluhan(n)} s={satuan(n)} kecil={kecil} />;

/** Model dari satu bilangan. */
export const ModelDari = ({ n, skala = 1 }: { n: number; skala?: number }) => <ModelBilangan p={puluhan(n)} s={satuan(n)} skala={skala} />;

/** Bagan pasangan bilangan: jumlah di atas, dua bagian di bawah. Bagian yang null ditulis "?". */
export function BaganPasangan({ total, a, b }: { total: number; a: number | null; b: number | null }) {
  const lingkar = (cx: number, cy: number, r: number, isi: number | null, warna: string) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={isi === null ? "#FFFFFF" : warna} stroke={TINTA} strokeWidth="3.4" strokeDasharray={isi === null ? "5 4" : undefined} />
      <text x={cx} y={cy + r * 0.36} textAnchor="middle" fontSize={r * 1.0} fontWeight="900" fill={TINTA}>
        {isi === null ? "?" : isi}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 200 130" className="block h-auto w-full max-w-[240px]" role="img" aria-label={`Pasangan bilangan ${total}: bagian ${a ?? "belum diketahui"} dan ${b ?? "belum diketahui"}`}>
      <path d="M100 52 L52 86 M100 52 L148 86" stroke={TINTA} strokeWidth="3.4" strokeLinecap="round" />
      {lingkar(100, 30, 26, total, "#FFE566")}
      {lingkar(50, 100, 24, a, "#BAE6FD")}
      {lingkar(150, 100, 24, b, "#FDE68A")}
    </svg>
  );
}

/** Garis angka statis (bukan tombol): kotak berurutan dengan angka, satu bisa ditandai atau disembunyikan. */
export function StripAngka({
  dari,
  sampai,
  langkah = 1,
  tandai = null,
  sembunyi = [],
  penanda,
}: {
  dari: number;
  sampai: number;
  langkah?: number;
  tandai?: number | null;
  sembunyi?: number[];
  /** Gambar kecil di atas kotak yang ditandai (kupu-kupu atau bulatan). */
  penanda?: React.ReactNode;
}) {
  const angka: number[] = [];
  for (let x = dari; x <= sampai; x += langkah) angka.push(x);
  return (
    <div className="flex w-full items-end justify-center gap-0.5" role="img" aria-label={`Garis angka ${dari} sampai ${sampai}${tandai !== null ? `, penanda di ${tandai}` : ""}`}>
      {angka.map((x) => (
        <div key={x} className="flex min-w-0 flex-1 flex-col items-center gap-0.5">
          <div className="flex h-8 items-end justify-center text-2xl leading-none">{tandai === x ? penanda : null}</div>
          <div className={`flex h-9 w-full items-center justify-center rounded-md border-[3px] text-sm font-black text-[#1C01A5] ${tandai === x ? "border-[#F0AB00] bg-[#FFF7CC]" : "border-[#1C01A5] bg-white"}`}>{sembunyi.includes(x) ? "?" : x}</div>
        </div>
      ))}
    </div>
  );
}

/** Titik tersebar (tebak banyak benda tanpa gambar benda). */
export function TitikSebar({ n, warna = "#38BDF8", skala = 1 }: { n: number; warna?: string; skala?: number }) {
  const pos = sebarTitik(n, 100, 60);
  return (
    <svg viewBox="0 0 100 60" className="block h-auto w-full rounded-xl border-4 border-[#1C01A5] bg-white" style={{ maxWidth: 300 * skala }} role="img" aria-label="Banyak titik tersebar, belum dikelompokkan">
      {pos.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill={warna} stroke={TINTA} strokeWidth="0.8" />
      ))}
    </svg>
  );
}

/** Titik yang sudah dikelompokkan sepuluh-sepuluh (satu baris sepuluh titik dilingkari), sisanya lepas. */
export function TitikKelompok({ n }: { n: number }) {
  const p = puluhan(n);
  const s = satuan(n);
  const baris = p + (s > 0 ? 1 : 0);
  const tinggi = Math.max(baris, 1) * 17 + 4;
  return (
    <svg viewBox={`0 0 130 ${tinggi}`} className="block h-auto w-full max-w-[260px] rounded-xl border-4 border-[#1C01A5] bg-white" role="img" aria-label={`${p} kelompok sepuluh titik dan ${s} titik lepas`}>
      {Array.from({ length: p }, (_, r) => (
        <g key={r}>
          <rect x="3" y={3 + r * 17} width="124" height="14" rx="7" fill="#E0F2FE" stroke={TINTA} strokeWidth="1.6" strokeDasharray="4 2" />
          {Array.from({ length: 10 }, (_, c) => (
            <circle key={c} cx={13 + c * 11.6} cy={10 + r * 17} r="4" fill="#38BDF8" stroke={TINTA} strokeWidth="0.9" />
          ))}
        </g>
      ))}
      {Array.from({ length: s }, (_, c) => (
        <circle key={`s${c}`} cx={13 + c * 11.6} cy={10 + p * 17} r="4" fill="#FDE047" stroke={TINTA} strokeWidth="0.9" />
      ))}
    </svg>
  );
}

/** Tabel seratus: bilangan dari `dari` sampai `sampai` dalam sepuluh kolom. Sel tersembunyi ditulis "?", sel aktif disorot. */
export function GridSeratus({ dari = 51, sampai = 100, tersembunyi = [], terisi = [], aktif = null }: { dari?: number; sampai?: number; tersembunyi?: number[]; terisi?: number[]; aktif?: number | null }) {
  const angka: number[] = [];
  for (let x = dari; x <= sampai; x += 1) angka.push(x);
  return (
    <div className="grid grid-cols-10 gap-[2px] rounded-xl border-4 border-[#1C01A5] bg-[#1C01A5]/30 p-[2px]" role="img" aria-label={`Tabel bilangan ${dari} sampai ${sampai}`}>
      {angka.map((x) => {
        const sembunyi = tersembunyi.includes(x) && !terisi.includes(x);
        const sorot = aktif === x;
        return (
          <span key={x} className={`flex h-7 items-center justify-center rounded-[4px] text-[11px] font-black leading-none ${sorot ? "bg-[#FFE566] text-[#1C01A5] ring-2 ring-[#F0AB00]" : sembunyi ? "bg-[#E0E7FF] text-[#1C01A5]/50" : "bg-white text-[#1C01A5]"}`}>
            {sembunyi ? "?" : x}
          </span>
        );
      })}
    </div>
  );
}

/** Dua papan berdampingan dengan huruf A dan B (untuk membandingkan). */
export function DuaPapan({ a, b }: { a: number; b: number }) {
  return (
    <div className="flex items-start justify-center gap-3">
      <div className="space-y-1 text-center">
        <p className="text-sm font-black text-[#1C01A5]">Papan A</p>
        <PapanBilangan n={a} kecil />
      </div>
      <div className="space-y-1 text-center">
        <p className="text-sm font-black text-[#1C01A5]">Papan B</p>
        <PapanBilangan n={b} kecil />
      </div>
    </div>
  );
}
