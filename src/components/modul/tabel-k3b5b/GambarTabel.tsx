"use client";

import React from "react";
import { barisKartu, bundelDari, dasarDari, judulKartu, type Baris, type Cara, type Langkah, type Rupa } from "./logika-cpa";

/**
 * Gambar tugas CPA Kelas 3 Bab 5 Sub-Bab B "Tabel Bu Wulan": turus berbundel lima (empat garis tegak dan satu coretan miring melintang, digambar tepat sebanyak datanya),
 * tabel tiga kolom (jenis, turus, banyak), dan kartu kata. Concrete memakai benda klub sepeda beremoji di meja klub, Pictorial memakai turus dan tabel polos di kertas tabel,
 * Abstract memakai kartu kata dan angka. Tanpa skor dan tanpa jaringan.
 */

/** Benda klub sepeda beremoji (Concrete); kunci adalah nama jenis pada data. Emoji paling tinggi U+1FA95 tanpa ZWJ. */
export const EMOJI_BENDA: Record<string, string> = {
  helm: "\u{26D1}",
  pita: "\u{1F380}",
  bel: "\u{1F514}",
  pompa: "\u{1F388}",
  lampu: "\u{1F4A1}",
  baut: "\u{1F529}",
  sepeda: "\u{1F6B2}",
  perkakas: "\u{1F527}",
};
const emojiDari = (nama: string): string => EMOJI_BENDA[nama] ?? "\u{1F6B2}";

const BIRU = "#1C01A5";
const PETAK = "#2563EB";

/** Lebar turus `n` dalam satuan gambar, untuk jarak antargaris `gap`. */
export const lebarTurus = (n: number, gap: number): number => {
  const { bundel, sisa } = bundelDari(n);
  const lw = 5.2 * gap;
  return sisa > 0 ? bundel * lw + (sisa - 1) * gap : bundel > 0 ? (bundel - 1) * lw + 3 * gap + 2.4 : 0;
};

/** Turus `n` (paling banyak dua puluh) pojok kiri-atas (x, y): tiap bundel = empat garis tegak dan satu coretan miring melintang di atasnya, sisa = garis tegak lepas. */
export function TurusSvg({ n, x, y, tinggi = 22, gap = 4, warna = BIRU }: { n: number; x: number; y: number; tinggi?: number; gap?: number; warna?: string }) {
  const { bundel, sisa } = bundelDari(n);
  const lw = 5.2 * gap;
  const garis: React.ReactNode[] = [];
  for (let i = 0; i < bundel; i += 1) {
    const x0 = x + i * lw;
    for (let j = 0; j < 4; j += 1) garis.push(<line key={`b${i}g${j}`} data-turus="tegak" x1={x0 + j * gap} y1={y} x2={x0 + j * gap} y2={y + tinggi} stroke={warna} strokeWidth={1.8} strokeLinecap="round" />);
    garis.push(<line key={`b${i}m`} data-turus="miring" x1={x0 - 1.2} y1={y + tinggi * 0.82} x2={x0 + 3 * gap + 1.2} y2={y + tinggi * 0.18} stroke={warna} strokeWidth={1.8} strokeLinecap="round" />);
  }
  for (let j = 0; j < sisa; j += 1) garis.push(<line key={`s${j}`} data-turus="tegak" x1={x + bundel * lw + j * gap} y1={y} x2={x + bundel * lw + j * gap} y2={y + tinggi} stroke={warna} strokeWidth={1.8} strokeLinecap="round" />);
  return <g aria-label={`turus ${n}`}>{garis}</g>;
}

/** Turus berdiri sendiri (satu gambar) untuk tugas yang hanya menanyakan turus. */
export function PapanTurus({ n, rupa, label }: { n: number; rupa: Rupa; label?: string }) {
  const gap = 6.5;
  const w = lebarTurus(n, gap);
  const mulai = (300 - w) / 2;
  return (
    <svg viewBox="0 0 300 110" className="mx-auto w-full max-w-[420px]" role="img" aria-label={label ?? `turus ${n}`}>
      <rect x={4} y={4} width={292} height={102} rx={10} fill={rupa === "benda" ? "#FFFFFF" : "#FFFBEB"} stroke={rupa === "benda" ? "#B91C1C" : PETAK} strokeWidth={rupa === "benda" ? 3 : 1.5} strokeDasharray={rupa === "benda" ? undefined : "5 3"} />
      <TurusSvg n={n} x={mulai} y={24} tinggi={42} gap={gap} />
      <text x={150} y={92} textAnchor="middle" fontSize={13} fontWeight={900} fill="#B45309">
        {label ?? "banyak = ?"}
      </text>
    </svg>
  );
}

/** Benda beremoji sebanyak `n` (Concrete), disusun berderet. */
export function DeretBenda({ nama, n }: { nama: string; n: number }) {
  return (
    <div className="mx-auto flex max-w-[420px] flex-wrap justify-center gap-1 rounded-xl border-2 border-[#B91C1C]/40 bg-white p-2" role="img" aria-label={`${n} ${nama}`}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} aria-hidden="true" className="text-2xl leading-none">
          {emojiDari(nama)}
        </span>
      ))}
    </div>
  );
}

/** Titik polos sebanyak `n` (Pictorial), disusun lepas tanpa digabung: sepuluh per baris. */
export function DeretTitik({ n }: { n: number }) {
  const baris = Math.ceil(n / 10);
  return (
    <svg viewBox="0 0 300 100" className="mx-auto w-full max-w-[420px]" role="img" aria-label={`${n} titik`}>
      <rect x={4} y={4} width={292} height={92} rx={10} fill="#FFFBEB" stroke={PETAK} strokeWidth={1.5} strokeDasharray="5 3" />
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={30 + (i % 10) * 26} cy={(baris === 1 ? 50 : 36) + Math.floor(i / 10) * 30} r={9} fill="#FACC15" stroke={BIRU} strokeWidth={1.5} />
      ))}
    </svg>
  );
}

/**
 * Tabel tiga kolom (jenis, turus, banyak). `banyak`: tampilkan angka kolom banyak ("?" bila tidak); `kolom3`: judul kolom ketiga ("?" bila belum diberi nama);
 * `sorot`: baris yang diberi bingkai merah; `acuan`: bilangan acuan yang ditulis di bawah tabel. Rupa benda: meja klub dengan benda beremoji; diagram: kertas tabel polos.
 */
export function TabelSvg({ baris, rupa, banyak = true, kolom3 = "banyak", sorot, acuan }: { baris: Baris[]; rupa: Rupa; banyak?: boolean; kolom3?: string; sorot?: number; acuan?: number }) {
  const tb = 36;
  const kep = 26;
  const kol = [92, 130, 62];
  const x0 = 8;
  const kiri = [x0, x0 + kol[0], x0 + kol[0] + kol[1]];
  const tinggi = kep + baris.length * tb + (acuan !== undefined ? 24 : 6) + 6;
  const benda = rupa === "benda";
  const garis = benda ? "#7C2D12" : PETAK;
  return (
    <svg viewBox={`0 0 300 ${tinggi}`} className="mx-auto w-full max-w-[420px]" role="img" aria-label="tabel tiga kolom">
      <rect x={x0} y={4} width={284} height={kep + baris.length * tb} rx={benda ? 6 : 0} fill={benda ? "#FFFFFF" : "#FFFBEB"} stroke={garis} strokeWidth={benda ? 2.5 : 1.5} />
      {["jenis", "turus", kolom3].map((h, c) => (
        <g key={c}>
          <rect x={kiri[c]} y={4} width={kol[c]} height={kep} fill={benda ? "#FDE68A" : "#FEF3C7"} stroke={garis} strokeWidth={1.3} />
          <text x={kiri[c] + kol[c] / 2} y={22} textAnchor="middle" fontSize={12} fontWeight={900} fill={h === "?" ? "#B45309" : BIRU}>
            {h}
          </text>
        </g>
      ))}
      {baris.map((b, r) => {
        const y = 4 + kep + r * tb;
        return (
          <g key={`${b.nama}${r}`}>
            {kol.map((w, c) => (
              <rect key={c} x={kiri[c]} y={y} width={w} height={tb} fill={sorot === r ? "#FEF08A" : benda ? "#FFFFFF" : "#FFFBEB"} stroke={garis} strokeWidth={1.1} />
            ))}
            {benda ? (
              <text x={kiri[0] + 6} y={y + 24} fontSize={18} aria-hidden="true">
                {emojiDari(b.nama)}
              </text>
            ) : null}
            <text x={kiri[0] + (benda ? 30 : 8)} y={y + 22} fontSize={12} fontWeight={800} fill={BIRU}>
              {b.nama}
            </text>
            <TurusSvg n={b.n} x={kiri[1] + 8} y={y + 7} tinggi={22} gap={4} />
            <text x={kiri[2] + kol[2] / 2} y={y + 24} textAnchor="middle" fontSize={banyak ? 16 : 14} fontWeight={900} fill={banyak ? "#15803D" : "#B45309"}>
              {banyak ? b.n : "?"}
            </text>
            {sorot === r ? <rect x={x0} y={y} width={284} height={tb} fill="none" stroke="#DC2626" strokeWidth={3} /> : null}
          </g>
        );
      })}
      {acuan !== undefined ? (
        <text x={150} y={tinggi - 10} textAnchor="middle" fontSize={13} fontWeight={900} fill="#B45309">
          bilangan acuan = {acuan}
        </text>
      ) : null}
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

/** Gambar dasar sebuah tugas menurut jenis tugas dan rupanya: benda beremoji (Concrete), turus dan tabel polos (Pictorial), atau kartu kata (Abstract). */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang") return <KartuKata judul={judulKartu(rupa, d.tipe === "salin" || d.tipe === "cacah" || d.tipe === "bundel" ? "kartu turus" : "kartu tabel")} baris={barisKartu(d, cara)} />;
  switch (d.tipe) {
    case "cacah":
      return (
        <div className="space-y-1.5">
          {rupa === "benda" ? <DeretBenda nama={d.benda} n={d.n} /> : null}
          <PapanTurus n={d.n} rupa={rupa} label={cara === "kanvas" ? "bundel penuh = ?" : "banyak seluruhnya = ?"} />
        </div>
      );
    case "bundel":
      return (
        <div className="space-y-1.5">
          {rupa === "benda" ? <DeretBenda nama={d.benda} n={d.n} /> : <DeretTitik n={d.n} />}
          <p className="text-center text-xs font-black text-[#B45309]">{cara === "kanvas" ? "Tulis dengan turus berlima. Garis sisa = ?" : cara === "suara" ? "Tulis dengan turus berlima. Bundel penuh = ?" : "Tulis dengan turus berlima."}</p>
        </div>
      );
    case "salin":
      return <TabelSvg baris={[{ nama: d.benda, n: d.n }]} rupa={rupa} banyak={false} />;
    case "baca":
      return <TabelSvg baris={d.baris} rupa={rupa} sorot={cara === "suara" ? d.sorot : undefined} />;
    case "isi":
      return <TabelSvg baris={d.baris} rupa={rupa} kolom3={cara === "klik" ? "?" : "banyak"} />;
    case "tanya":
      return <TabelSvg baris={d.baris} rupa={rupa} sorot={cara === "suara" ? d.sorot : undefined} acuan={d.acuan} />;
  }
}
