"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { JEMBATAN, KISI, LANGKAH_METERAN, NOL, PETUNJUK_PETA, PITA, SELESAI_PETA, type LangkahPeta } from "./data-peta";

/**
 * Mind-map Kelas 4 Bab 2 Sub-Bab D "Meteran Kain Pak Bagas": kain bermeteran Pak Bagas dengan lima gambar sungguhan
 * (pita satu meter sepuluh bagian dengan tiga diwarnai, kisi seratus kotak dengan dua puluh tujuh diwarnai, dua jembatan pecahan ke desimal, tiga kotak dengan nol penjaga).
 * Label kosong menempel di bawah atau di samping tiap gambar; ketuk satu per satu, judul langkah muncul dan dibacakan guru. Lanjut setelah semua terbuka. Satu layar tanpa gulir.
 */
const BIRU = "#1C01A5";
const TEAL = "#0F766E";
const EMAS = "#F59E0B";

/** Pita satu meter: PITA.n bagian sama besar, PITA.k bagian diwarnai, dengan angka nol dan satu meter di ujungnya. */
function PitaMeter() {
  const w = 23;
  return (
    <svg viewBox="0 0 270 46" className="w-full" role="img" aria-label="kain satu meter dibagi sepuluh bagian sama besar, tiga bagian diwarnai" data-gambar="pita" data-bagian={PITA.n} data-warna={PITA.k}>
      {Array.from({ length: PITA.n }, (_, i) => (
        <g key={i}>
          <rect x={20 + i * w} y={18} width={w} height={24} fill={i < PITA.k ? TEAL : "#FFFFFF"} stroke={BIRU} strokeWidth={1.5} data-arsir={i < PITA.k ? 1 : 0} />
          <line x1={20 + i * w} y1={18} x2={20 + i * w} y2={12} stroke={BIRU} strokeWidth={1.5} />
        </g>
      ))}
      <line x1={20 + PITA.n * w} y1={18} x2={20 + PITA.n * w} y2={12} stroke={BIRU} strokeWidth={1.5} />
      <text x={20} y={10} textAnchor="middle" fontSize={13} fontWeight={900} fill={BIRU}>
        0
      </text>
      <text x={20 + PITA.n * w} y={10} textAnchor="middle" fontSize={13} fontWeight={900} fill={BIRU}>
        1 m
      </text>
    </svg>
  );
}

/** Kisi seratus kotak (sepuluh kali sepuluh); KISI.k kotak pertama (baris demi baris) diwarnai. */
function KisiSeratus() {
  const s = 10;
  return (
    <svg viewBox="0 0 110 110" className="mx-auto w-full max-w-[92px]" role="img" aria-label="kisi seratus kotak, dua puluh tujuh kotak diwarnai" data-gambar="kisi" data-bagian={KISI.n} data-warna={KISI.k}>
      {Array.from({ length: KISI.n }, (_, i) => (
        <rect key={i} x={5 + (i % 10) * s} y={5 + Math.floor(i / 10) * s} width={s} height={s} fill={i < KISI.k ? TEAL : "#FFFFFF"} stroke={BIRU} strokeWidth={1} data-arsir={i < KISI.k ? 1 : 0} />
      ))}
    </svg>
  );
}

/** Dua jembatan: pecahan di kiri, desimal di kanan, busur di antaranya. */
function DuaJembatan() {
  return (
    <svg viewBox="0 0 130 110" className="mx-auto w-full max-w-[104px]" role="img" aria-label="dua jembatan dari pecahan ke desimal" data-gambar="jembatan" data-jembatan={JEMBATAN.length}>
      {JEMBATAN.map((j, i) => {
        const y = 28 + i * 54;
        return (
          <g key={j.des} data-jembatan-baris={j.des}>
            <text x={20} y={y - 3} textAnchor="middle" fontSize={13} fontWeight={900} fill={BIRU}>
              {j.p}
            </text>
            <line x1={6} y1={y} x2={34} y2={y} stroke={BIRU} strokeWidth={1.8} />
            <text x={20} y={y + 14} textAnchor="middle" fontSize={13} fontWeight={900} fill={BIRU}>
              {j.den}
            </text>
            <path d={`M40 ${y + 8} Q62 ${y - 22} 84 ${y + 8}`} fill="none" stroke={EMAS} strokeWidth={4} strokeLinecap="round" />
            <line x1={36} y1={y + 8} x2={88} y2={y + 8} stroke="#92400E" strokeWidth={3} />
            <text x={90} y={y + 12} fontSize={14} fontWeight={900} fill={TEAL}>
              {j.des}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Tiga kotak dari seratus (kisi kecil) dan angka nol koma nol tiga dengan nol penjaga bersorot. */
function NolPenjaga() {
  const s = 5;
  const kotak = ["0", ",", "0", String(NOL.p)];
  const lebar = [22, 10, 22, 22];
  let x = 64;
  return (
    <svg viewBox="0 0 150 56" className="w-full" role="img" aria-label="tiga kotak dari seratus ditulis nol koma nol tiga, nol di depan angka tiga disorot" data-gambar="nol" data-bagian={100} data-warna={NOL.p}>
      {Array.from({ length: 100 }, (_, i) => (
        <rect key={i} x={3 + (i % 10) * s} y={3 + Math.floor(i / 10) * s} width={s} height={s} fill={i < NOL.p ? TEAL : "#FFFFFF"} stroke={BIRU} strokeWidth={0.6} data-arsir={i < NOL.p ? 1 : 0} />
      ))}
      {kotak.map((c, i) => {
        const x0 = x;
        x += lebar[i] + 2;
        return (
          <g key={i}>
            <rect x={x0} y={14} width={lebar[i]} height={28} rx={4} fill={i === 2 ? "#FDE68A" : "#FFFFFF"} stroke={i === 2 ? "#B45309" : BIRU} strokeWidth={i === 2 ? 2.5 : 1.5} data-penjaga={i === 2 ? 1 : 0} />
            <text x={x0 + lebar[i] / 2} y={35} textAnchor="middle" fontSize={20} fontWeight={900} fill={i === 2 ? "#B45309" : BIRU}>
              {c}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Label({ n, l, terbuka, onKetuk }: { n: number; l: LangkahPeta; terbuka: boolean; onKetuk: () => void }) {
  return (
    <button
      type="button"
      onClick={onKetuk}
      aria-label={terbuka ? `Langkah ${n + 1}: ${l.judul}` : `Label kosong langkah ${n + 1}`}
      className={`flex min-h-[48px] w-full min-w-0 items-center gap-1.5 rounded-xl border-[3px] px-1.5 py-1 text-left text-[13px] font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#0F766E] bg-white"}`}
    >
      <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-xs text-white ${terbuka ? "border-[#15803D] bg-[#15803D]" : "border-[#0F766E] bg-[#0F766E]"}`}>
        {n + 1}
      </span>
      <span className="min-w-0 break-words">{terbuka ? l.judul : "?"}</span>
    </button>
  );
}

export default function PetaMeteranK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_METERAN.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_METERAN[n].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  const lb = (n: number) => <Label n={n} l={LANGKAH_METERAN[n]} terbuka={buka.includes(n)} onKetuk={() => ketuk(n)} />;
  const kotak = "rounded-xl border-2 border-[#99F6E4] bg-white/85 p-0.5 space-y-0.5";
  return (
    <div className="space-y-2">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-center gap-1.5 rounded-xl border-[3px] border-[#1C01A5] bg-[#FFF7CC] p-1.5">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-[13px] font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA}</p>
      </div>

      <div className="mx-auto w-full max-w-xl space-y-1 rounded-2xl border-[5px] border-[#0F766E] bg-[#F0FDFA] p-1.5 shadow-[0_6px_0_rgba(0,0,0,0.25)]" data-uji="meteran-kain">
        <div className={kotak}>
          <PitaMeter />
          <div className="grid grid-cols-2 gap-1.5">
            {lb(0)}
            {lb(1)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className={kotak}>
            <KisiSeratus />
            {lb(2)}
          </div>
          <div className={kotak}>
            <DuaJembatan />
            {lb(3)}
          </div>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_7.5rem] items-center gap-2 rounded-xl border-2 border-[#99F6E4] bg-white/85 p-1">
          <NolPenjaga />
          {lb(4)}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA : `Sudah dibuka ${buka.length} dari ${LANGKAH_METERAN.length} langkah.`}
      </p>
      {selesai ? (
        <div className="flex justify-center">
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export { PetaMeteranK4B2 };
