"use client";

import React from "react";
import type { Lambang } from "./data-k2b8";

/* ------------------------------------------------------------------------ */
/* Diagram Bab 8 (Berbagai Diagram): lambang polos (bintang, lingkaran, hati,   */
/* wajah tersenyum), baris lambang, tabel turus, dan tabel diagram gambar.      */
/* Berkas ini tidak memuat gambar benda: aman dipakai tahap Picture dan         */
/* Abstract. Gambar benda nyata ada di dasar-k2b8.tsx. Tanpa API.               */
/* ------------------------------------------------------------------------ */

const TINTA = "#1C01A5";

/** Satu lambang polos berwarna. */
export function LambangSvg({ jenis, warna, ukuran = 22 }: { jenis: Lambang; warna: string; ukuran?: number }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      {jenis === "bintang" ? <path d="M12 2.4 14.9 8.7 21.7 9.4 16.6 14 18 20.7 12 17.3 6 20.7 7.4 14 2.3 9.4 9.1 8.7Z" fill={warna} stroke={TINTA} strokeWidth="1.6" strokeLinejoin="round" /> : null}
      {jenis === "lingkaran" ? <circle cx="12" cy="12" r="9" fill={warna} stroke={TINTA} strokeWidth="1.8" /> : null}
      {jenis === "hati" ? <path d="M12 21C4.5 15 2.6 10.6 2.6 7.8A4.7 4.7 0 0 1 12 6.4 4.7 4.7 0 0 1 21.4 7.8C21.4 10.6 19.5 15 12 21Z" fill={warna} stroke={TINTA} strokeWidth="1.6" strokeLinejoin="round" /> : null}
      {jenis === "senyum" ? (
        <g>
          <circle cx="12" cy="12" r="9.2" fill={warna} stroke={TINTA} strokeWidth="1.8" />
          <circle cx="8.8" cy="10" r="1.3" fill={TINTA} />
          <circle cx="15.2" cy="10" r="1.3" fill={TINTA} />
          <path d="M7.6 14.2Q12 18.6 16.4 14.2" fill="none" stroke={TINTA} strokeWidth="1.7" strokeLinecap="round" />
        </g>
      ) : null}
    </svg>
  );
}

/** Satu baris lambang polos: n gambar berurutan dari kiri. */
export function BarisLambang({ n, jenis = "bintang", warna = "#F59E0B", ukuran = 22, kelas = "" }: { n: number; jenis?: Lambang; warna?: string; ukuran?: number; kelas?: string }) {
  return (
    <span className={`flex flex-wrap items-center gap-[3px] ${kelas}`} role="img" aria-label={`${n} gambar`}>
      {Array.from({ length: n }, (_, i) => (
        <LambangSvg key={i} jenis={jenis} warna={warna} ukuran={ukuran} />
      ))}
    </span>
  );
}

/** Gambar turus: n goresan dengan tinggi tetap (px). Empat garis tegak lalu satu coretan miring per kelompok lima. */
export function GambarTurus({ n, tinggi = 30 }: { n: number; tinggi?: number }) {
  const grup = Math.max(1, Math.ceil(n / 5));
  const lebar = grup * 46;
  return (
    <svg viewBox={`0 0 ${lebar} 40`} width={(lebar * tinggi) / 40} height={tinggi} className="block shrink-0" role="img" aria-label={`${n} goresan turus`}>
      {Array.from({ length: n }, (_, i) => {
        const g = Math.floor(i / 5);
        const k = i % 5;
        const gx = g * 46 + 4;
        return k < 4 ? (
          <line key={i} x1={gx + 6 + k * 8} y1={5} x2={gx + 6 + k * 8} y2={35} stroke={TINTA} strokeWidth={4} strokeLinecap="round" />
        ) : (
          <line key={i} x1={gx + 1} y1={31} x2={gx + 38} y2={9} stroke="#E53E3E" strokeWidth={4} strokeLinecap="round" />
        );
      })}
    </svg>
  );
}

/** Kartu turus: gambar turus di dalam kotak putih. */
export function KartuTurus({ n, kecil = false }: { n: number; kecil?: boolean }) {
  return (
    <span className="flex items-center justify-center rounded-xl bg-white px-1 py-1">
      <GambarTurus n={n} tinggi={kecil ? 26 : 36} />
    </span>
  );
}

const SEL = "border border-[#A78BFA]/70 px-2 py-1.5";
const KEPALA = "border border-[#A78BFA]/70 bg-[#EDE9FE] px-2 py-1.5 text-center text-xs font-black text-[#1C01A5]";

export type BarisTurus = { nama: string; n: number; turus?: boolean; banyak?: boolean };

/** Tabel diagram turus: nama, turus, dan banyaknya. Turus atau banyaknya boleh dikosongkan. */
export function TabelTurus({ judul, kolom, baris, kecil = false }: { judul: string; kolom: [string, string, string]; baris: BarisTurus[]; kecil?: boolean }) {
  return (
    <div className="w-full">
      <p className="pb-1 text-center text-xs font-black text-[#1C01A5]">{judul}</p>
      <table className="w-full border-collapse overflow-hidden rounded-xl bg-white text-sm font-black text-[#1C01A5]">
        <thead>
          <tr>
            {kolom.map((k) => (
              <th key={k} className={KEPALA}>
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {baris.map((b) => (
            <tr key={b.nama}>
              <td className={`${SEL} text-left`}>{b.nama}</td>
              <td className={`${SEL} text-center`}>{b.turus === false ? <span className="text-[#1C01A5]/40">…</span> : b.n > 0 ? <span className="flex justify-center"><GambarTurus n={b.n} tinggi={kecil ? 22 : 30} /></span> : null}</td>
              <td className={`${SEL} text-center text-base`}>{b.banyak === false ? <span className="text-[#1C01A5]/40">…</span> : b.n}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type BarisGambarTabel = { nama: string; isi: React.ReactNode };

/** Tabel diagram gambar: nama dan baris gambar. Isi baris diberikan dari luar. */
export function TabelGambar({ judul, kolom, baris, keterangan }: { judul: string; kolom: [string, string]; baris: BarisGambarTabel[]; keterangan?: React.ReactNode }) {
  return (
    <div className="w-full">
      <p className="pb-1 text-center text-xs font-black text-[#1C01A5]">{judul}</p>
      <table className="w-full border-collapse overflow-hidden rounded-xl bg-white text-sm font-black text-[#1C01A5]">
        <thead>
          <tr>
            {kolom.map((k) => (
              <th key={k} className={KEPALA}>
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {baris.map((b) => (
            <tr key={b.nama}>
              <td className={`${SEL} w-[28%] text-left`}>{b.nama}</td>
              <td className={SEL}>{b.isi}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {keterangan ? <p className="pt-1 text-center text-[11px] font-black text-[#1C01A5]">{keterangan}</p> : null}
    </div>
  );
}

/** Keterangan "Setiap gambar [lambang] mewakili 1 anak." */
export function Keterangan({ jenis, warna, satuan }: { jenis: Lambang; warna: string; satuan: string }) {
  return (
    <span className="inline-flex items-center justify-center gap-1">
      Setiap gambar <LambangSvg jenis={jenis} warna={warna} ukuran={16} /> mewakili 1 {satuan}.
    </span>
  );
}
