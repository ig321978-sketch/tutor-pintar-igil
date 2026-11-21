"use client";

import React from "react";
import { bagian, barisKartu, dasarDari, judulKartu, type Cara, type Langkah, type Rupa } from "./logika-cpa";

/**
 * Gambar tugas CPA Kelas 4 Bab 1 Sub-Bab G "Baris Perahu Bu Marni": baris perahu sebanyak data (tiap perahu bernomor penumpang), uraian puluhan dan satuan,
 * dan papan hitung susun pendek. Concrete memakai perahu dan benda pulau beremoji di dermaga kayu, Pictorial memakai perahu dan kotak polos di kertas kotak,
 * Abstract memakai kartu kata dan angka. Tanpa skor dan tanpa jaringan.
 */

/** Benda pulau beremoji (Concrete); kunci adalah nama benda pada data. Emoji paling tinggi U+1FA95 tanpa ZWJ. */
export const EMOJI_BENDA: Record<string, string> = {
  perahu: "\u{1F6F6}",
  layar: "\u{26F5}",
  kelapa: "\u{1F965}",
  kerang: "\u{1F41A}",
  nanas: "\u{1F34D}",
  semangka: "\u{1F349}",
  koper: "\u{1F9F3}",
  lentera: "\u{1F3EE}",
};
const emojiDari = (nama: string): string => EMOJI_BENDA[nama] ?? "\u{26F5}";

const BIRU = "#1C01A5";
const KOTAK = "#0369A1";

/** Satu perahu beremoji (Concrete) atau polos (Pictorial) di pusat (cx, cy) dengan muatan `a`. */
function Perahu({ cx, cy, a, rupa, benda }: { cx: number; cy: number; a: number; rupa: Rupa; benda: string }) {
  return (
    <g data-perahu="1">
      {rupa === "benda" ? (
        <>
          <text x={cx} y={cy + 8} textAnchor="middle" fontSize={28} aria-hidden="true">
            {"\u{26F5}"}
          </text>
          <text x={cx - 16} y={cy - 10} textAnchor="middle" fontSize={13} aria-hidden="true">
            {emojiDari(benda)}
          </text>
        </>
      ) : (
        <>
          <polygon points={`${cx - 22},${cy} ${cx + 22},${cy} ${cx + 15},${cy + 14} ${cx - 15},${cy + 14}`} fill="#BAE6FD" stroke={KOTAK} strokeWidth={1.6} />
          <polygon points={`${cx - 14},${cy - 1} ${cx},${cy - 14} ${cx + 14},${cy - 1}`} fill="#FFFFFF" stroke={KOTAK} strokeWidth={1.4} />
        </>
      )}
      <text x={cx} y={cy + 32} textAnchor="middle" fontSize={14} fontWeight={900} fill={BIRU}>
        {a}
      </text>
    </g>
  );
}

/** Baris perahu: `b` perahu (paling banyak sembilan), tiap perahu bermuatan `a`; lima perahu per baris. `tanya`: tulisan di bawah baris. */
export function DeretPerahu({ a, b, rupa, benda, tanya }: { a: number; b: number; rupa: Rupa; benda: string; tanya: string }) {
  const baris = Math.ceil(b / 5);
  const tinggi = 14 + baris * 62 + 24;
  const benda0 = rupa === "benda";
  return (
    <svg viewBox={`0 0 300 ${tinggi}`} className="mx-auto w-full max-w-[420px]" role="img" aria-label={`${b} perahu, tiap perahu ${a}`}>
      <rect x={4} y={4} width={292} height={tinggi - 8} rx={benda0 ? 10 : 0} fill={benda0 ? "#FEF3C7" : "#EFF6FF"} stroke={benda0 ? "#B45309" : KOTAK} strokeWidth={benda0 ? 3 : 1.5} strokeDasharray={benda0 ? undefined : "5 3"} />
      {Array.from({ length: b }, (_, i) => (
        <Perahu key={i} cx={34 + (i % 5) * 58} cy={30 + Math.floor(i / 5) * 62} a={a} rupa={rupa} benda={benda} />
      ))}
      <text x={150} y={tinggi - 10} textAnchor="middle" fontSize={13} fontWeight={900} fill="#B45309">
        {tanya}
      </text>
    </svg>
  );
}

/** Uraian: a = puluhan + satuan dalam dua kotak berwarna, dengan pengali b. `tanya`: tulisan di bawah. */
export function PapanUrai({ a, b, rupa, tanya }: { a: number; b: number; rupa: Rupa; tanya: string }) {
  const g = bagian(a, b);
  const benda0 = rupa === "benda";
  return (
    <svg viewBox="0 0 300 120" className="mx-auto w-full max-w-[420px]" role="img" aria-label={`${a} diurai menjadi ${g.t * 10} dan ${g.u}, dikali ${b}`}>
      <rect x={4} y={4} width={292} height={112} rx={benda0 ? 10 : 0} fill={benda0 ? "#FEF3C7" : "#EFF6FF"} stroke={benda0 ? "#B45309" : KOTAK} strokeWidth={benda0 ? 3 : 1.5} strokeDasharray={benda0 ? undefined : "5 3"} />
      <text x={150} y={30} textAnchor="middle" fontSize={20} fontWeight={900} fill={BIRU}>
        {a} × {b}
      </text>
      <rect x={60} y={44} width={90} height={34} fill="#BFDBFE" stroke={KOTAK} strokeWidth={1.6} />
      <rect x={156} y={44} width={84} height={34} fill="#FDE68A" stroke="#A16207" strokeWidth={1.6} />
      <text x={105} y={67} textAnchor="middle" fontSize={18} fontWeight={900} fill={BIRU}>
        {g.t * 10}
      </text>
      <text x={198} y={67} textAnchor="middle" fontSize={18} fontWeight={900} fill={BIRU}>
        {g.u}
      </text>
      <text x={105} y={92} textAnchor="middle" fontSize={11} fontWeight={800} fill="#475569">
        puluhan
      </text>
      <text x={198} y={92} textAnchor="middle" fontSize={11} fontWeight={800} fill="#475569">
        satuan
      </text>
      <text x={150} y={110} textAnchor="middle" fontSize={13} fontWeight={900} fill="#B45309">
        {tanya}
      </text>
    </svg>
  );
}

/** Papan hitung susun pendek: a di atas, b di bawah, garis, dan tulisan tanya di baris hasil. `simpan`: angka simpanan yang ditampilkan di atas kolom puluhan. */
export function PapanSusunSvg({ a, b, rupa, tanya, simpan }: { a: number; b: number; rupa: Rupa; tanya: string; simpan?: number }) {
  const g = bagian(a, b);
  const benda0 = rupa === "benda";
  return (
    <svg viewBox="0 0 300 150" className="mx-auto w-full max-w-[420px]" role="img" aria-label={`${a} dikali ${b} ditulis ke bawah`}>
      <rect x={4} y={4} width={292} height={142} rx={benda0 ? 10 : 0} fill={benda0 ? "#FEF3C7" : "#EFF6FF"} stroke={benda0 ? "#B45309" : KOTAK} strokeWidth={benda0 ? 3 : 1.5} strokeDasharray={benda0 ? undefined : "5 3"} />
      {simpan !== undefined ? (
        <text x={120} y={26} textAnchor="middle" fontSize={13} fontWeight={900} fill="#7C3AED">
          {simpan}
        </text>
      ) : null}
      <text x={120} y={56} textAnchor="middle" fontSize={28} fontWeight={900} fill={BIRU}>
        {g.t}
      </text>
      <text x={160} y={56} textAnchor="middle" fontSize={28} fontWeight={900} fill={BIRU}>
        {g.u}
      </text>
      <text x={78} y={92} textAnchor="middle" fontSize={26} fontWeight={900} fill="#DC2626">
        {"×"}
      </text>
      <text x={160} y={92} textAnchor="middle" fontSize={28} fontWeight={900} fill={BIRU}>
        {b}
      </text>
      <line x1={70} y1={102} x2={200} y2={102} stroke={BIRU} strokeWidth={2.4} />
      <text x={135} y={136} textAnchor="middle" fontSize={15} fontWeight={900} fill="#B45309">
        {tanya}
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

/** Gambar dasar sebuah tugas menurut jenis tugas dan rupanya: perahu beremoji (Concrete), perahu dan kotak polos (Pictorial), atau kartu kata (Abstract). */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang") return <KartuKata judul={judulKartu(rupa, d.tipe === "kali" || d.tipe === "tambah" ? "kartu perahu" : d.tipe === "urai" ? "kartu uraian" : "kartu susun")} baris={barisKartu(d, cara)} />;
  switch (d.tipe) {
    case "kali":
      return <DeretPerahu a={d.a} b={d.b} rupa={rupa} benda={d.benda} tanya={cara === "kanvas" ? "angka puluhan jumlah = ?" : "jumlah penumpang = ?"} />;
    case "tambah":
      return (
        <div className="space-y-1.5">
          <DeretPerahu a={d.a} b={d.b} rupa={rupa} benda={d.benda} tanya={cara === "klik" ? `${d.a} × ${d.b} = penjumlahan berulang?` : cara === "kanvas" ? "dijumlahkan berapa kali?" : `${d.a} × ${d.b}: dua suku pertama = ?`} />
        </div>
      );
    case "urai":
      return <PapanUrai a={d.a} b={d.b} rupa={rupa} tanya={cara === "klik" ? "hasil: ? + ?" : cara === "kanvas" ? "hasil kali satuan = ?" : "hasil kali puluhan = ?"} />;
    case "susun":
      if (rupa === "benda")
        return (
          <div className="space-y-1.5">
            <DeretPerahu a={d.a} b={d.b} rupa={rupa} benda={d.benda} tanya={`${d.b} perahu, tiap perahu ${d.a}`} />
            <PapanSusunSvg a={d.a} b={d.b} rupa={rupa} tanya={cara === "klik" ? "tulis ?, simpan ?" : cara === "kanvas" ? (bagian(d.a, d.b).simpan > 0 ? "angka yang disimpan = ?" : "angka satuan yang ditulis = ?") : d.kata ? "puluhan: ditulis atau disimpan?" : "angka puluhan hasil = ?"} />
          </div>
        );
      return <PapanSusunSvg a={d.a} b={d.b} rupa={rupa} tanya={cara === "klik" ? "tulis ?, simpan ?" : cara === "kanvas" ? (bagian(d.a, d.b).simpan > 0 ? "angka yang disimpan = ?" : "angka satuan yang ditulis = ?") : d.kata ? "puluhan: ditulis atau disimpan?" : "angka puluhan hasil = ?"} />;
  }
}
