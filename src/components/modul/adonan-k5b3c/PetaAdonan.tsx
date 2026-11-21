"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_JUDUL_PETA_ADONAN, JUDUL_PETA_ADONAN, LANGKAH_ADONAN, PETUNJUK_PETA_ADONAN, SELESAI_PETA_ADONAN } from "./data-kartu";

/**
 * Mind-map Kelas 5 Bab 3 Sub-Bab C "Sisa Adonan Bu Nani": gambar rak oven kayu dengan enam loyang (dua kolom, tiga rak).
 * Tiap loyang memuat gambar bar pecahan kecil sesuai langkahnya (penyebut sama, penyebut disamakan, pembilang dikurangi, bulat dipisah,
 * hasil disederhanakan, hasil diperiksa) dan satu label kosong. Anak mengetuk label, judul langkah muncul dan dibacakan Guru.
 * Anak tidak membuat konsep; konsep diberitahukan. Satu layar tanpa gulir.
 */
const ISI = { isi: "#93C5FD", garis: "#1E40AF" };
const AMBIL = { isi: "#FDBA74", garis: "#C2410C" };

/** Bar kecil berisi `q` bagian sama lebar: `isi` bagian biru, `coret` bagian bersilang, `ambil` bagian jingga, sisanya kosong. Digambar sungguh sebanyak `q`. */
function BarMini({ x, y, w, q, isi, coret = 0, ambil = 0, tinggi = 14 }: { x: number; y: number; w: number; q: number; isi: number; coret?: number; ambil?: number; tinggi?: number }) {
  const c = w / q;
  return (
    <g data-bar-mini={q}>
      {Array.from({ length: q }, (_, j) => {
        const biru = j < isi;
        const silang = j >= isi && j < isi + coret;
        const jingga = j >= isi + coret && j < isi + coret + ambil;
        const warna = biru ? ISI : jingga ? AMBIL : { isi: silang ? "#FEE2E2" : "#FFFFFF", garis: silang ? "#B91C1C" : "#94A3B8" };
        return (
          <g key={j}>
            <rect x={x + j * c + 0.5} y={y} width={Math.max(2, c - 1)} height={tinggi} rx={1.5} fill={warna.isi} stroke={warna.garis} strokeWidth={1} strokeDasharray={!biru && !silang && !jingga ? "2 1.5" : undefined} />
            {silang ? (
              <g stroke="#DC2626" strokeWidth={1.4} strokeLinecap="round">
                <line x1={x + j * c + 2} y1={y + 2} x2={x + (j + 1) * c - 2} y2={y + tinggi - 2} />
                <line x1={x + (j + 1) * c - 2} y1={y + 2} x2={x + j * c + 2} y2={y + tinggi - 2} />
              </g>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

const PANAH = (x: number, y: number) => (
  <g stroke="#9D174D" strokeWidth={2} strokeLinecap="round" fill="none">
    <line x1={x} y1={y} x2={x + 20} y2={y} />
    <polyline points={`${x + 14},${y - 5} ${x + 20},${y} ${x + 14},${y + 5}`} />
  </g>
);

/** Gambar kecil tiap loyang: enam gambar berbeda menurut langkahnya. */
function IsiLoyang({ ke }: { ke: number }) {
  return (
    <svg viewBox="0 0 140 50" className="block h-auto w-full" role="img" aria-label={["Dua bar berpenyebut sama", "Penyebut disamakan", "Pembilang dikurangi", "Bulat dan pecahan dipisah", "Hasil disederhanakan", "Hasil diperiksa dengan tambah"][ke]} data-loyang-peta={ke}>
      {ke === 0 ? (
        <g>
          <BarMini x={8} y={8} w={100} q={5} isi={3} />
          <BarMini x={8} y={28} w={100} q={5} isi={1} />
          <text x={124} y={32} textAnchor="middle" fontSize={20} fontWeight={900} fill="#15803D">
            =
          </text>
        </g>
      ) : null}
      {ke === 1 ? (
        <g>
          <BarMini x={6} y={8} w={44} q={2} isi={1} />
          <BarMini x={6} y={28} w={44} q={3} isi={1} />
          {PANAH(57, 25)}
          <BarMini x={84} y={8} w={50} q={6} isi={3} />
          <BarMini x={84} y={28} w={50} q={6} isi={2} />
        </g>
      ) : null}
      {ke === 2 ? <BarMini x={8} y={15} w={124} q={8} isi={3} coret={2} tinggi={20} /> : null}
      {ke === 3 ? (
        <g>
          <BarMini x={8} y={6} w={60} q={4} isi={4} />
          <BarMini x={8} y={28} w={60} q={4} isi={3} />
          <line x1={78} y1={4} x2={78} y2={46} stroke="#9D174D" strokeWidth={1.6} strokeDasharray="4 3" />
          <text x={108} y={34} textAnchor="middle" fontSize={22}>
            {"\u{2702}\u{FE0F}"}
          </text>
        </g>
      ) : null}
      {ke === 4 ? (
        <g>
          <BarMini x={6} y={18} w={54} q={6} isi={4} />
          {PANAH(66, 25)}
          <BarMini x={92} y={18} w={42} q={3} isi={2} />
        </g>
      ) : null}
      {ke === 5 ? (
        <g>
          <BarMini x={8} y={8} w={124} q={8} isi={3} ambil={2} tinggi={18} />
          <text x={70} y={43} textAnchor="middle" fontSize={14} fontWeight={900} fill="#15803D">
            {"✔"}
          </text>
        </g>
      ) : null}
    </svg>
  );
}

export default function PetaAdonan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_ADONAN.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_ADONAN[n - 1].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_ADONAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_ADONAN}</p>
      </div>

      <div className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border-[7px] border-[#92400E] bg-[#FEF3C7] shadow-[0_6px_0_rgba(120,53,15,0.4)]" data-rupa="rak-oven">
        <p className="bg-[#92400E] py-0.5 text-center text-sm font-black text-[#FEF3C7]">
          {IKON_JUDUL_PETA_ADONAN} {JUDUL_PETA_ADONAN}
        </p>
        <div className="grid grid-cols-2 gap-x-2 px-1.5 pb-1.5">
          {LANGKAH_ADONAN.map((l, i) => {
            const n = i + 1;
            const terbuka = buka.includes(n);
            return (
              <div key={l.judul} className={`pt-1.5 ${i < 4 ? "border-b-[6px] border-[#B45309] pb-1" : ""}`}>
                <div className="rounded-lg border-2 border-[#F9A8D4] bg-white/90 p-1">
                  <IsiLoyang ke={i} />
                </div>
                <button
                  type="button"
                  onClick={() => ketuk(n)}
                  aria-label={terbuka ? `Langkah ${n}: ${l.judul}` : `Label kosong langkah ${n}`}
                  className={`mt-1 flex min-h-[44px] w-full min-w-0 items-center gap-1.5 rounded-xl border-[3px] px-1.5 py-1 text-left font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#BE185D] bg-[#FBCFE8]" : "border-dashed border-[#92400E] bg-white"}`}
                >
                  <span aria-hidden="true" className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs text-white ${terbuka ? "border-[#BE185D] bg-[#BE185D]" : "border-[#92400E] bg-[#92400E]"}`}>
                    {n}
                  </span>
                  <span className="min-w-0 text-[11px]">{terbuka ? l.judul : "?"}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_ADONAN : `Sudah dibuka ${buka.length} dari ${LANGKAH_ADONAN.length} langkah.`}
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
export { PetaAdonan };
