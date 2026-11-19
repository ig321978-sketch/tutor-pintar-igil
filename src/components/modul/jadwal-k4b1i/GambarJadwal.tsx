"use client";

import React from "react";
import { barisKartu, dasarDari, judulKartu, kataBil, susunan, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";

/**
 * Gambar tugas CPA Kelas 4 Bab 1 Sub-Bab I "Papan Jadwal Kak Yoga" (faktor dan kelipatan): benda pulau beremoji sebanyak datanya (Concrete), susunan baris-kolom titik
 * dan garis loncat polos (Pictorial), dan kartu kata dan angka (Abstract). Tanpa skor dan tanpa jaringan.
 */

/** Benda pantai dan pulau beremoji (Concrete); kunci adalah nama benda pada data. Emoji paling tinggi U+1FA95 tanpa ZWJ. */
export const EMOJI_BENDA: Record<string, string> = {
  kelapa: "\u{1F965}",
  keranjang: "\u{1F9FA}",
  tiket: "\u{1F3AB}",
  koper: "\u{1F9F3}",
  payung: "\u{1F302}",
  kerang: "\u{1F41A}",
  nanas: "\u{1F34D}",
  sandal: "\u{1F461}",
  lentera: "\u{1F3EE}",
  semangka: "\u{1F349}",
};
const emojiDari = (nama: string): string => EMOJI_BENDA[nama] ?? "\u{1F41A}";

const BIRU = "#1C01A5";
const UNGU = "#7C3AED";

/** Benda beremoji sebanyak `n` (Concrete), disusun di atas pasir dalam kisi `kolom` kolom (baris dan kolom selalu sesuai, tidak membungkus sendiri). */
export function DeretBenda({ nama, n, kolom }: { nama: string; n: number; kolom?: number }) {
  const k = Math.max(1, Math.min(kolom ?? 10, n));
  const sel = n > 24 ? 22 : 26;
  return (
    <div
      className="mx-auto w-fit max-w-full rounded-xl border-2 border-[#0284C7]/40 bg-[#FEF3C7] p-2"
      role="img"
      aria-label={`${n} ${nama}`}
      data-kolom={k}
      style={{ display: "grid", gridTemplateColumns: `repeat(${k}, ${sel}px)`, gridAutoRows: `${sel}px`, gap: 2, justifyContent: "center" }}
    >
      {Array.from({ length: n }, (_, i) => (
        <span key={i} aria-hidden="true" className={`${n > 24 ? "text-lg" : "text-2xl"} flex items-center justify-center leading-none`}>
          {emojiDari(nama)}
        </span>
      ))}
    </div>
  );
}

/** Susunan titik polos sebanyak `n` (Pictorial): `kolom` titik per baris; titik dari nomor `sisaDari` ke atas (sisa bagi) berwarna merah. */
export function TitikSvg({ n, kolom, sisaDari }: { n: number; kolom: number; sisaDari?: number }) {
  const baris = Math.ceil(n / kolom);
  const gap = Math.min(24, Math.floor(280 / kolom));
  const w = (kolom - 1) * gap;
  const x0 = (300 - w) / 2;
  const tinggi = Math.min(150, 30 + baris * gap);
  const dy = (tinggi - 30) / Math.max(1, baris);
  return (
    <svg viewBox={`0 0 300 ${tinggi}`} className="mx-auto w-full max-w-[420px]" role="img" aria-label={`${n} titik dalam ${kolom} kolom`}>
      <rect x={4} y={4} width={292} height={tinggi - 8} rx={10} fill="#F5F3FF" stroke={UNGU} strokeWidth={1.5} strokeDasharray="5 3" />
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x0 + (i % kolom) * gap} cy={22 + Math.floor(i / kolom) * dy} r={Math.max(1.4, Math.min(7, gap / 2 - 1.5, dy / 2 - 1.5))} fill={sisaDari !== undefined && i >= sisaDari ? "#FCA5A5" : "#C4B5FD"} stroke={BIRU} strokeWidth={1.2} data-titik="1" />
      ))}
    </svg>
  );
}

/** Garis loncat polos (Pictorial): lompatan sebesar `b` dari nol sampai `batas`, tanda di tiap lompatan tanpa angka kecuali nol dan batas. */
export function GarisLoncatSvg({ b, batas }: { b: number; batas: number }) {
  const x = (v: number): number => 20 + (v / batas) * 260;
  const loncat = Array.from({ length: Math.floor(batas / b) }, (_, i) => (i + 1) * b);
  return (
    <svg viewBox="0 0 300 80" className="mx-auto w-full max-w-[420px]" role="img" aria-label={`garis loncat sebesar ${b} sampai ${batas}`}>
      <rect x={4} y={4} width={292} height={72} rx={10} fill="#F5F3FF" stroke={UNGU} strokeWidth={1.5} strokeDasharray="5 3" />
      <line x1={x(0)} y1={52} x2={x(batas)} y2={52} stroke={BIRU} strokeWidth={2} />
      {[0, ...loncat].map((v) => (
        <line key={v} x1={x(v)} y1={46} x2={x(v)} y2={58} stroke={BIRU} strokeWidth={1.6} data-loncat="1" />
      ))}
      {[0, ...loncat].slice(0, -1).map((v, i) => (
        <path key={`a${i}`} d={`M${x(v)} 50 Q${(x(v) + x(v + b)) / 2} 20 ${x(v + b)} 50`} fill="none" stroke={UNGU} strokeWidth={1.4} />
      ))}
      <text x={x(0)} y={72} textAnchor="middle" fontSize={11} fontWeight={900} fill={BIRU}>
        0
      </text>
      <text x={x(batas)} y={72} textAnchor="middle" fontSize={11} fontWeight={900} fill={BIRU}>
        {batas}
      </text>
      <text x={150} y={14} textAnchor="middle" fontSize={10} fontWeight={900} fill="#B45309">
        lompat sebesar {b}
      </text>
    </svg>
  );
}

/** Kartu kata dan angka (Abstract): satu baris satu keterangan, tanpa emoji. */
export function KartuKata({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="mx-auto max-w-[420px] space-y-1 rounded-md border-4 border-[#CA8A04] bg-white p-2" role="group" aria-label="Kartu kata">
      <p className="text-xs font-black uppercase tracking-wide text-[#A16207]">{judul}</p>
      {baris.map((b, i) => (
        <p key={`${i}${b}`} className="rounded-md border-2 border-dashed border-[#CA8A04] bg-[#FEFCE8] px-2 py-1 text-sm font-bold text-[#1C01A5]">
          {b}
        </p>
      ))}
    </div>
  );
}

const Keterangan = ({ baris }: { baris: string[] }) => (
  <div className="mx-auto max-w-[420px] space-y-0.5 text-center">
    {baris.map((b) => (
      <p key={b} className="text-xs font-black text-[#B45309]">
        {b}
      </p>
    ))}
  </div>
);

/** Gambar dasar sebuah tugas menurut jenis tugas dan rupanya: benda beremoji (Concrete), diagram polos (Pictorial), atau kartu kata (Abstract). */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d: LangkahDasar = dasarDari(l);
  const kartu = barisKartu(d, cara);
  if (rupa === "lambang") return <KartuKata judul={judulKartu(rupa, d.tipe === "daftar" ? "kartu kelipatan" : d.tipe === "sebut" ? "kartu hubungan" : "kartu faktor")} baris={kartu} />;
  const ket = <Keterangan baris={[kartu[0], kartu[kartu.length - 1]]} />;
  if (rupa === "benda") {
    const bd = susunan(d, cara);
    const nama = d.tipe === "sebut" ? "payung" : d.benda;
    return (
      <div className="space-y-1.5">
        {bd ? <DeretBenda nama={nama} n={bd.n} kolom={bd.kolom} /> : null}
        {ket}
        {d.tipe === "daftar" ? <p className="text-center text-xs font-black text-[#0369A1]">Satu bundel berisi {kataBil(d.b)} benda.</p> : null}
      </div>
    );
  }
  if (d.tipe === "daftar") return (
    <div className="space-y-1.5">
      <GarisLoncatSvg b={d.b} batas={d.batas} />
      {ket}
    </div>
  );
  const bt = susunan(d, cara);
  return (
    <div className="space-y-1.5">
      {bt ? <TitikSvg n={bt.n} kolom={bt.kolom} sisaDari={bt.sisaDari} /> : null}
      {ket}
    </div>
  );
}
