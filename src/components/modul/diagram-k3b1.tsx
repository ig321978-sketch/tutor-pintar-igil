"use client";

import React from "react";
import { tiga } from "./data-k3b1";

/* ------------------------------------------------------------------------ */
/* Diagram bersama Matematika Kelas 3 Bab 1 (Bilangan Cacah sampai 1.000).      */
/* Hanya blok ratusan (persegi 10 x 10), batang puluhan, kotak satuan, papan    */
/* nilai tempat, dan tabel angka. TIDAK ada gambar benda dan tidak ada emoji,   */
/* supaya aman dipakai tahap Picture dan Abstract. Benda nyata ada di berkas     */
/* dasar tahap Concrete. Warna mengikuti buku: ratusan hijau,                   */
/* puluhan biru, satuan merah.                                                  */
/* ------------------------------------------------------------------------ */

const TINTA = "#1C01A5";
export const WARNA_TEMPAT = {
  ratusan: { teks: "#15803D", isi: "#BBF7D0", blok: "#4ADE80" },
  puluhan: { teks: "#1D4ED8", isi: "#BFDBFE", blok: "#60A5FA" },
  satuan: { teks: "#DC2626", isi: "#FECACA", blok: "#F87171" },
} as const;

/** Model blok: r persegi ratusan, p batang puluhan, s kotak satuan. */
export function ModelTiga({ r, p, s, skala = 1, label }: { r: number; p: number; s: number; skala?: number; label?: string }) {
  const rs = 40;
  const g = 4;
  const kolR = Math.min(r, 5);
  const barisR = Math.ceil(r / 5);
  const lebarR = r > 0 ? kolR * (rs + g) - g : 0;
  const bw = 6;
  const gb = 3;
  const lebarP = p > 0 ? p * (bw + gb) - gb : 0;
  const cw = 7;
  const gc = 2;
  const kolS = Math.min(s, 5);
  const lebarS = s > 0 ? kolS * (cw + gc) - gc : 0;
  const jarak = 10;
  const bagian = [lebarR, lebarP, lebarS].filter((x) => x > 0);
  const W = Math.max(bagian.reduce((a, b) => a + b, 0) + jarak * Math.max(0, bagian.length - 1), 10);
  const H = Math.max(barisR > 0 ? barisR * (rs + g) - g : 0, p > 0 ? rs : 0, s > 0 ? 2 * (cw + gc) - gc : 0, 10);
  const xP = lebarR + (lebarR > 0 ? jarak : 0);
  const xS = xP + lebarP + (lebarP > 0 ? jarak : 0);
  const sw = 1.4;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W * skala} height={H * skala} className="block max-w-full" style={{ height: "auto" }} role="img" aria-label={label ?? `${r} ratusan, ${p} puluhan, dan ${s} satuan`}>
      {Array.from({ length: r }, (_, i) => {
        const x = (i % 5) * (rs + g);
        const y = Math.floor(i / 5) * (rs + g);
        return (
          <g key={`r${i}`}>
            <rect x={x} y={y} width={rs} height={rs} rx="2" fill={WARNA_TEMPAT.ratusan.blok} stroke={TINTA} strokeWidth={sw} />
            {Array.from({ length: 9 }, (_, j) => (
              <g key={j}>
                <line x1={x + ((j + 1) * rs) / 10} x2={x + ((j + 1) * rs) / 10} y1={y} y2={y + rs} stroke={TINTA} strokeWidth="0.5" opacity="0.5" />
                <line y1={y + ((j + 1) * rs) / 10} y2={y + ((j + 1) * rs) / 10} x1={x} x2={x + rs} stroke={TINTA} strokeWidth="0.5" opacity="0.5" />
              </g>
            ))}
          </g>
        );
      })}
      {Array.from({ length: p }, (_, i) => {
        const x = xP + i * (bw + gb);
        return (
          <g key={`p${i}`}>
            <rect x={x} y="0" width={bw} height={rs} rx="1.5" fill={WARNA_TEMPAT.puluhan.blok} stroke={TINTA} strokeWidth={sw} />
            {Array.from({ length: 9 }, (_, j) => (
              <line key={j} x1={x} x2={x + bw} y1={((j + 1) * rs) / 10} y2={((j + 1) * rs) / 10} stroke={TINTA} strokeWidth="0.5" opacity="0.55" />
            ))}
          </g>
        );
      })}
      {Array.from({ length: s }, (_, i) => (
        <rect key={`s${i}`} x={xS + (i % 5) * (cw + gc)} y={Math.floor(i / 5) * (cw + gc)} width={cw} height={cw} rx="1.5" fill={WARNA_TEMPAT.satuan.blok} stroke={TINTA} strokeWidth={sw} />
      ))}
    </svg>
  );
}

/** Model dari satu bilangan tiga angka. */
export const ModelDari = ({ n, skala = 1 }: { n: number; skala?: number }) => {
  const d = tiga(n);
  return <ModelTiga r={d.r} p={d.p} s={d.s} skala={skala} />;
};

/** Papan nilai tempat tiga kolom. Angka tersembunyi ditulis "?". */
export function PapanTempat({ r, p, s, tanya = [false, false, false], kecil = false }: { r: number | null; p: number | null; s: number | null; tanya?: [boolean, boolean, boolean]; kecil?: boolean }) {
  const nilai = [r, p, s];
  const judul = ["Ratusan", "Puluhan", "Satuan"] as const;
  const kunci = ["ratusan", "puluhan", "satuan"] as const;
  return (
    <div className="flex items-center justify-center gap-1.5" role="img" aria-label={`Papan nilai tempat: ratusan ${tanya[0] ? "belum diketahui" : r}, puluhan ${tanya[1] ? "belum diketahui" : p}, satuan ${tanya[2] ? "belum diketahui" : s}`}>
      {judul.map((j, i) => (
        <div key={j} className="flex flex-col items-center overflow-hidden rounded-xl border-[3px] border-[#1C01A5] bg-white">
          <span className={`w-full text-center font-black ${kecil ? "px-2 py-0 text-[10px]" : "px-3 py-0.5 text-xs"}`} style={{ backgroundColor: WARNA_TEMPAT[kunci[i]].isi, color: WARNA_TEMPAT[kunci[i]].teks }}>
            {j}
          </span>
          <span className={`flex items-center justify-center font-black text-[#1C01A5] ${kecil ? "h-8 w-11 text-xl" : "h-12 w-[4.2rem] text-4xl"}`}>{tanya[i] || nilai[i] === null ? "?" : nilai[i]}</span>
        </div>
      ))}
    </div>
  );
}

/** Papan dari satu bilangan. */
export const PapanDari = ({ n, kecil = false, tanya }: { n: number; kecil?: boolean; tanya?: [boolean, boolean, boolean] }) => {
  const d = tiga(n);
  return <PapanTempat r={d.r} p={d.p} s={d.s} kecil={kecil} tanya={tanya} />;
};

/** Kartu model kecil: model dari satu bilangan di dalam kartu putih. */
export function KartuModel({ n, skala = 0.7 }: { n: number; skala?: number }) {
  return (
    <span className="flex min-h-[48px] items-center justify-center rounded-xl bg-white px-1 py-1" role="img" aria-label={`Model bilangan`}>
      <ModelDari n={n} skala={skala} />
    </span>
  );
}

/** Tiga angka berwarna: ratusan hijau, puluhan biru, satuan merah. */
export function AngkaBerwarna({ n, ukuran = "text-3xl" }: { n: number; ukuran?: string }) {
  const d = tiga(n);
  return (
    <span className={`inline-flex font-black tracking-wide ${ukuran}`} aria-label={String(n)}>
      <span style={{ color: WARNA_TEMPAT.ratusan.teks }}>{d.r}</span>
      <span style={{ color: WARNA_TEMPAT.puluhan.teks }}>{d.p}</span>
      <span style={{ color: WARNA_TEMPAT.satuan.teks }}>{d.s}</span>
    </span>
  );
}

/** Tabel tiga kolom nilai tempat. Tiap baris punya bilangan dan tiga isi. */
export function TabelTempat({ baris, kepala = ["Bilangan", "Ratusan", "Puluhan", "Satuan"] }: { baris: { n: string; r: string; p: string; s: string }[]; kepala?: [string, string, string, string] }) {
  const warna = ["#FEF3C7", WARNA_TEMPAT.ratusan.isi, WARNA_TEMPAT.puluhan.isi, WARNA_TEMPAT.satuan.isi];
  const tinta = [TINTA, WARNA_TEMPAT.ratusan.teks, WARNA_TEMPAT.puluhan.teks, WARNA_TEMPAT.satuan.teks];
  return (
    <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
      <div className="grid grid-cols-4 text-center text-[11px] font-black leading-tight">
        {kepala.map((k, i) => (
          <span key={k} className="px-1 py-1" style={{ backgroundColor: warna[i], color: tinta[i] }}>
            {k}
          </span>
        ))}
      </div>
      {baris.map((b, i) => (
        <div key={b.n} className={`grid grid-cols-4 items-center text-center text-base font-black text-[#1C01A5] ${i % 2 ? "bg-[#F5F3FF]" : "bg-white"}`}>
          <span className="px-1 py-1">{b.n}</span>
          <span className="px-1 py-1" style={{ color: tinta[1] }}>{b.r}</span>
          <span className="px-1 py-1" style={{ color: tinta[2] }}>{b.p}</span>
          <span className="px-1 py-1" style={{ color: tinta[3] }}>{b.s}</span>
        </div>
      ))}
    </div>
  );
}
