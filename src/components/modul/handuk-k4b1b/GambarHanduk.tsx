"use client";

import React from "react";
import { NAMA_TEMPAT, barisKartu, dasarDari, digitDari, judulKartu, type Cara, type Langkah, type Rupa } from "./logika-cpa";
import { ATAS, MULAI, PK, PX, TINGGI_ANGKA, TINGGI_BALOK, TINGGI_BARIS, TINGGI_KEPALA, susunBalok, tengahKolom } from "./tata";

/**
 * Gambar tugas CPA Kelas 4 Bab 1 Sub-Bab B "Gudang Handuk Pak Laode": balok cacah (peti, kotak, ikat, dan lembar di rak gudang untuk Concrete; kubus, lempeng, dan batang polos untuk Pictorial),
 * papan empat kotak atau bagan tempat (ribuan, ratusan, puluhan, satuan), dan kartu kata. Concrete memakai benda pulau wisata beremoji di rak gudang kayu, Pictorial memakai gambar polos di kertas denah biru,
 * Abstract memakai kartu kata dan angka. Banyak balok sungguh sebanyak angka pada tempatnya (tata.ts). Tanpa skor dan tanpa jaringan.
 */

/** Benda pulau wisata beremoji (Concrete); kunci adalah nama benda pada data. Emoji paling tinggi U+1FA95 tanpa ZWJ. */
export const EMOJI_BENDA: Record<string, string> = {
  kelapa: "\u{1F965}",
  kerang: "\u{1F41A}",
  tiket: "\u{1F3AB}",
  payung: "\u{1F302}",
  nanas: "\u{1F34D}",
  semangka: "\u{1F349}",
  lentera: "\u{1F3EE}",
  sandal: "\u{1F461}",
  keranjang: "\u{1F9FA}",
  koper: "\u{1F9F3}",
};
const emojiDari = (nama: string): string => EMOJI_BENDA[nama] ?? "\u{1F9FA}";

const BIRU = "#1C01A5";
const PETAK = "#2563EB";
const COKLAT = "#92400E";
const WARNA_POLOS = ["#3B82F6", "#F59E0B", "#10B981", "#FACC15"];

/** Rak kayu dengan benda beremoji (hiasan Concrete): enam benda duduk di papan kayu. */
export function RakBenda({ benda }: { benda: string }) {
  return (
    <div className="mx-auto max-w-[420px]" role="img" aria-label={`rak gudang berisi ${benda}`}>
      <div className="flex justify-around rounded-t-md bg-[#FEF3C7] px-2 pt-1">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} aria-hidden="true" className="text-2xl leading-none">
            {emojiDari(benda)}
          </span>
        ))}
      </div>
      <div className="h-2 rounded-b-md border-2 border-[#92400E] bg-[#B45309]" aria-hidden="true" />
    </div>
  );
}

/** Satu balok pada baris `baris`: Concrete = peti, kotak, ikat, atau benda beremoji; Pictorial = bangun polos berwarna. */
function IkonBalok({ baris, x, y, w, h, rupa, benda }: { baris: number; x: number; y: number; w: number; h: number; rupa: "benda" | "diagram"; benda: string }) {
  if (rupa === "diagram")
    return (
      <g data-balok={baris}>
        <rect x={x} y={y} width={w} height={h} rx={baris === 3 ? 1 : 2} fill={WARNA_POLOS[baris]} stroke="#1E3A8A" strokeWidth={1.2} />
        {baris === 0 ? (
          <>
            <line x1={x + w / 3} y1={y} x2={x + w / 3} y2={y + h} stroke="#1E3A8A" strokeWidth={0.7} />
            <line x1={x + (2 * w) / 3} y1={y} x2={x + (2 * w) / 3} y2={y + h} stroke="#1E3A8A" strokeWidth={0.7} />
            <line x1={x} y1={y + h / 3} x2={x + w} y2={y + h / 3} stroke="#1E3A8A" strokeWidth={0.7} />
            <line x1={x} y1={y + (2 * h) / 3} x2={x + w} y2={y + (2 * h) / 3} stroke="#1E3A8A" strokeWidth={0.7} />
          </>
        ) : null}
        {baris === 1 ? (
          <>
            <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke="#1E3A8A" strokeWidth={0.7} />
            <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke="#1E3A8A" strokeWidth={0.7} />
          </>
        ) : null}
      </g>
    );
  if (baris === 0)
    return (
      <g data-balok={baris}>
        <rect x={x} y={y} width={w} height={h} rx={2} fill="#A16207" stroke="#451A03" strokeWidth={1.5} />
        <line x1={x + 2} y1={y + 2} x2={x + w - 2} y2={y + h - 2} stroke="#451A03" strokeWidth={1.2} />
        <line x1={x + w - 2} y1={y + 2} x2={x + 2} y2={y + h - 2} stroke="#451A03" strokeWidth={1.2} />
      </g>
    );
  if (baris === 1)
    return (
      <g data-balok={baris}>
        <rect x={x} y={y} width={w} height={h} rx={1.5} fill="#E9C48A" stroke="#92400E" strokeWidth={1.3} />
        <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke="#F59E0B" strokeWidth={2.4} />
      </g>
    );
  if (baris === 2)
    return (
      <g data-balok={baris}>
        <rect x={x} y={y} width={w} height={h} rx={5} fill="#60A5FA" stroke="#1E3A8A" strokeWidth={1.2} />
        <line x1={x + w * 0.3} y1={y} x2={x + w * 0.3} y2={y + h} stroke="#FFFFFF" strokeWidth={1.6} />
        <line x1={x + w * 0.7} y1={y} x2={x + w * 0.7} y2={y + h} stroke="#FFFFFF" strokeWidth={1.6} />
      </g>
    );
  return (
    <text data-balok={baris} x={x + w / 2} y={y + h - 2} textAnchor="middle" fontSize={17} aria-hidden="true">
      {emojiDari(benda)}
    </text>
  );
}

/**
 * Susunan balok untuk bilangan `n`: empat baris (ribuan, ratusan, puluhan, satuan), balok sebanyak angka tiap tempat, baris tanpa balok bertulisan kosong.
 * `tanda`: baris yang dilingkari merah (-1 bila tidak ada). Banyak balok sungguh sebanyak datanya.
 */
export function BalokSvg({ n, rupa, benda = "keranjang", tanda = -1, label = true }: { n: number; rupa: Rupa; benda?: string; tanda?: number; label?: boolean }) {
  const jenis: "benda" | "diagram" = rupa === "benda" ? "benda" : "diagram";
  const ikon = susunBalok(n, jenis);
  const d = digitDari(n);
  return (
    <svg viewBox={`0 0 300 ${TINGGI_BALOK}`} className="mx-auto w-full max-w-[420px]" role="img" aria-label="susunan balok cacah">
      <rect x={2} y={2} width={296} height={TINGGI_BALOK - 4} rx={jenis === "benda" ? 8 : 0} fill={jenis === "benda" ? "#FFFBEB" : "#EFF6FF"} stroke={jenis === "benda" ? COKLAT : PETAK} strokeWidth={jenis === "benda" ? 3 : 1.5} strokeDasharray={jenis === "benda" ? undefined : "5 3"} />
      {NAMA_TEMPAT.map((nm, b) => (
        <g key={nm}>
          {label ? (
            <text x={10} y={ATAS + b * TINGGI_BARIS + TINGGI_BARIS / 2 + 4} fontSize={11} fontWeight={900} fill={BIRU}>
              {nm}
            </text>
          ) : null}
          {d[b] === 0 ? (
            <text x={MULAI} y={ATAS + b * TINGGI_BARIS + TINGGI_BARIS / 2 + 4} fontSize={10} fontWeight={800} fill="#94A3B8">
              kosong
            </text>
          ) : null}
          {tanda === b ? <rect x={5} y={ATAS + b * TINGGI_BARIS + 1} width={290} height={TINGGI_BARIS - 2} rx={6} fill="none" stroke="#DC2626" strokeWidth={3} data-tanda="baris" /> : null}
        </g>
      ))}
      {ikon.map((x) => (
        <IkonBalok key={`${x.baris}-${x.i}`} baris={x.baris} x={x.x} y={x.y} w={x.w} h={x.h} rupa={jenis} benda={benda} />
      ))}
    </svg>
  );
}

/**
 * Papan empat kotak (bagan tempat). `digit`: empat angka yang tampil; `kepala`: tulis nama tempat (ribuan sampai satuan) di atas kolom; `tanda`: kolom yang angkanya dilingkari merah;
 * `tukar`: dua kolom yang ditukar (anak panah melengkung di bawah papan); `pilih`: kolom yang diberi latar kuning (dipilih anak). Rupa benda: papan kayu di rak gudang; diagram: kertas denah polos.
 */
export function PapanSvg({ digit, rupa, kepala = false, tanda = -1, tukar, pilih = [] }: { digit: number[]; rupa: Rupa; kepala?: boolean; tanda?: number; tukar?: [number, number]; pilih?: number[] }) {
  const benar = rupa === "benda";
  const atas = 6;
  const yAngka = atas + (kepala ? TINGGI_KEPALA : 0);
  const dasar = yAngka + TINGGI_ANGKA;
  const tinggi = dasar + (tukar ? 34 : 10);
  const garis = benar ? COKLAT : PETAK;
  return (
    <svg viewBox={`0 0 300 ${tinggi}`} className="mx-auto w-full max-w-[420px]" role="img" aria-label="papan empat kotak">
      <rect x={PX - 4} y={atas - 4} width={PK * 4 + 8} height={dasar - atas + 8} rx={benar ? 9 : 0} fill={benar ? "#FDE68A" : "#EFF6FF"} stroke={garis} strokeWidth={benar ? 3 : 1.5} strokeDasharray={benar ? undefined : "5 3"} />
      {[0, 1, 2, 3].map((c) => (
        <g key={c}>
          {kepala ? (
            <>
              <rect x={PX + c * PK} y={atas} width={PK} height={TINGGI_KEPALA} fill={benar ? "#FCD34D" : "#DBEAFE"} stroke={garis} strokeWidth={1.2} />
              <text x={tengahKolom(c)} y={atas + 15} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={BIRU}>
                {NAMA_TEMPAT[c]}
              </text>
            </>
          ) : null}
          <rect x={PX + c * PK} y={yAngka} width={PK} height={TINGGI_ANGKA} fill={pilih.includes(c) ? "#FEF08A" : "#FFFFFF"} stroke={garis} strokeWidth={1.2} />
          <text x={tengahKolom(c)} y={yAngka + 36} textAnchor="middle" fontSize={32} fontWeight={900} fill={BIRU} data-kolom={c}>
            {digit[c]}
          </text>
          {tanda === c ? <circle cx={tengahKolom(c)} cy={yAngka + TINGGI_ANGKA / 2} r={25} fill="none" stroke="#DC2626" strokeWidth={3} data-tanda="angka" /> : null}
        </g>
      ))}
      {tukar ? (
        <g aria-label="tukar tempat">
          <path d={`M ${tengahKolom(tukar[0])} ${dasar + 3} L ${tengahKolom(tukar[0])} ${dasar + 16} L ${tengahKolom(tukar[1])} ${dasar + 16} L ${tengahKolom(tukar[1])} ${dasar + 3}`} fill="none" stroke="#7C3AED" strokeWidth={2.4} />
          <path d={`M ${tengahKolom(tukar[0]) - 5} ${dasar + 9} L ${tengahKolom(tukar[0])} ${dasar + 3} L ${tengahKolom(tukar[0]) + 5} ${dasar + 9}`} fill="none" stroke="#7C3AED" strokeWidth={2.4} />
          <path d={`M ${tengahKolom(tukar[1]) - 5} ${dasar + 9} L ${tengahKolom(tukar[1])} ${dasar + 3} L ${tengahKolom(tukar[1]) + 5} ${dasar + 9}`} fill="none" stroke="#7C3AED" strokeWidth={2.4} />
          <text x={(tengahKolom(tukar[0]) + tengahKolom(tukar[1])) / 2} y={dasar + 30} textAnchor="middle" fontSize={11} fontWeight={900} fill="#7C3AED">
            tukar
          </text>
        </g>
      ) : null}
    </svg>
  );
}

/** Kartu kata dan angka (Abstract): satu baris satu keterangan, tanpa emoji. */
export function KartuKata({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="mx-auto max-w-[420px] space-y-1 rounded-md border-4 border-[#BE185D] bg-white p-2" role="group" aria-label="Kartu kata">
      <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">{judul}</p>
      {baris.map((b, i) => (
        <p key={`${i}${b}`} className="rounded-md border-2 border-dashed border-[#BE185D] bg-[#FDF2F8] px-2 py-1 text-sm font-bold text-[#1C01A5]">
          {b}
        </p>
      ))}
    </div>
  );
}

/** Gambar dasar sebuah tugas menurut jenis tugas dan rupanya: rak gudang dan benda beremoji (Concrete), balok dan bagan polos (Pictorial), atau kartu kata (Abstract). */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang") return <KartuKata judul={judulKartu(rupa, d.tipe === "balok" ? "kartu balok" : d.tipe === "bagan" ? "kartu bagan" : d.tipe === "tukar" ? "kartu tukar" : "kartu bilangan")} baris={barisKartu(d, cara)} />;
  const hiasan = rupa === "benda" ? <RakBenda benda={d.benda} /> : null;
  switch (d.tipe) {
    case "tempat":
      return (
        <div className="space-y-1.5">
          {hiasan}
          <PapanSvg digit={digitDari(d.n)} rupa={rupa} tanda={d.tanda} />
        </div>
      );
    case "balok":
      return (
        <div className="space-y-1.5">
          {hiasan}
          <BalokSvg n={d.n} rupa={rupa} benda={d.benda} tanda={cara === "klik" ? -1 : d.tanda} />
        </div>
      );
    case "bagan":
      return (
        <div className="space-y-1.5">
          {hiasan}
          <PapanSvg digit={digitDari(d.n)} rupa={rupa} kepala />
        </div>
      );
    case "tukar":
      return (
        <div className="space-y-1.5">
          {hiasan}
          <PapanSvg digit={digitDari(d.n)} rupa={rupa} kepala tukar={[d.a, d.b]} />
          <p className="text-center text-xs font-black text-[#B45309]">{`Tukar tempat ${NAMA_TEMPAT[d.a]} dan tempat ${NAMA_TEMPAT[d.b]}.`}</p>
        </div>
      );
  }
}

