"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { JUDUL_PETA, LANGKAH_KOTAK, PETUNJUK_PETA, SELESAI_PETA, type GambarMini } from "./data-peta";
import { faktorDari, fpb, persekutuan } from "./logika-data";

/**
 * Mind-map Kelas 5 Bab 2 Sub-Bab D "Kotak Bingkisan Pak Joko" (label kosong): meja kemas kayu dengan enam kotak bingkisan berpita, tiap kotak bergambar kecil sendiri
 * (dua daftar faktor, lingkaran faktor yang sama, tangga faktor dengan FPB, tiga kotak berisi kue, tiga lingkaran, dan hitungan tanpa sisa) dan berlabel kosong "?".
 * Ketuk label: judul langkah muncul, kotak menyala hijau, dan Guru membacakan langkahnya. Komponen sendiri (bukan PetaLabel): gambar dihitung dari logika-data.ts.
 */
const BIRU = "#1E3A8A";
const ORANYE = "#EA580C";
const MERAH = "#DC2626";
const HIJAU = "#15803D";
/** Dua bilangan contoh gambar daftar faktor (hanya hiasan, dihitung dari logika). */
const A_DAFTAR = faktorDari(12);
const B_DAFTAR = faktorDari(18);
const SAMA = persekutuan([12, 18]);
/** Gambar bagi: 6 dan 3 dibagi sama rata ke kotak sebanyak-banyaknya (kotak sama dengan FPB). */
const KOTAK_GAMBAR = fpb([6, 3]);
const ISI_MERAH = 6 / KOTAK_GAMBAR;
const ISI_PUTIH = 3 / KOTAK_GAMBAR;
const TIGA_FPB = fpb([12, 18, 24]);

/** Satu chip bilangan di daftar: kotak kecil berisi angka. */
function Chip({ x, y, isi, cincin = false }: { x: number; y: number; isi: number; cincin?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={17} height={17} rx={3} fill="#FFFFFF" stroke={BIRU} strokeWidth={1.2} />
      <text x={x + 8.5} y={y + 12.5} fontSize={13} fontWeight={800} textAnchor="middle" fill={BIRU}>
        {isi}
      </text>
      {cincin ? <circle cx={x + 8.5} cy={y + 8.5} r={11.5} fill="none" stroke={ORANYE} strokeWidth={2} /> : null}
    </g>
  );
}

/** Gambar kecil tiap langkah (SVG polos, dekoratif), digambar dari data. */
function MiniGambar({ jenis }: { jenis: GambarMini }) {
  const baris = (y: number, nama: number, xs: number[], tandai: number[] = []) => (
    <g key={nama}>
      <text x={2} y={y + 13} fontSize={13} fontWeight={900} fill={BIRU}>
        {nama}
      </text>
      {xs.map((f, i) => (
        <Chip key={`${nama}-${f}`} x={22 + i * 19} y={y} isi={f} cincin={tandai.includes(f)} />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 140 70" aria-hidden="true" className="h-auto w-full max-w-[150px] shrink-0">
      {jenis === "daftar" ? (
        <g>
          {baris(6, 12, A_DAFTAR)}
          {baris(40, 18, B_DAFTAR)}
        </g>
      ) : null}
      {jenis === "sama" ? (
        <g>
          {baris(6, 12, A_DAFTAR, SAMA)}
          {baris(40, 18, B_DAFTAR, SAMA)}
        </g>
      ) : null}
      {jenis === "besar" ? (
        <g transform="translate(10 0)">
          {SAMA.map((f, i) => {
            const tinggi = f * 6;
            const x = 8 + i * 28;
            const puncak = i === SAMA.length - 1;
            return (
              <g key={f}>
                <rect x={x} y={56 - tinggi} width={22} height={tinggi} rx={2} fill={puncak ? "#FDBA74" : "#DBEAFE"} stroke={puncak ? ORANYE : BIRU} strokeWidth={1.5} />
                <text x={x + 11} y={68} fontSize={13} fontWeight={800} textAnchor="middle" fill={BIRU}>
                  {f}
                </text>
                {puncak ? (
                  <text x={x + 11} y={56 - tinggi - 4} fontSize={13} fontWeight={900} textAnchor="middle" fill={ORANYE}>
                    FPB
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>
      ) : null}
      {jenis === "bagi" ? (
        <g transform="translate(10 0)">
          <text x={60} y={13} fontSize={13} fontWeight={900} textAnchor="middle" fill={BIRU}>
            {KOTAK_GAMBAR} kotak
          </text>
          {Array.from({ length: KOTAK_GAMBAR }, (_, i) => {
            const x = 6 + i * 38;
            return (
              <g key={i}>
                <rect x={x} y={20} width={32} height={42} rx={3} fill="#FEF3C7" stroke="#92400E" strokeWidth={1.8} />
                <rect x={x} y={20} width={32} height={8} fill={MERAH} stroke="#7F1D1D" strokeWidth={1.2} />
                {Array.from({ length: ISI_MERAH }, (_m, q) => (
                  <circle key={`m${q}`} cx={x + 10 + q * 12} cy={40} r={5} fill={MERAH} stroke="#7F1D1D" strokeWidth={1} />
                ))}
                {Array.from({ length: ISI_PUTIH }, (_m, q) => (
                  <circle key={`p${q}`} cx={x + 16 + q * 12} cy={53} r={5} fill="#FFFFFF" stroke={BIRU} strokeWidth={1.4} />
                ))}
              </g>
            );
          })}
        </g>
      ) : null}
      {jenis === "tiga" ? (
        <g transform="translate(10 0)">
          <circle cx={42} cy={30} r={25} fill="rgba(220,38,38,0.1)" stroke={MERAH} strokeWidth={1.8} />
          <circle cx={78} cy={30} r={25} fill="rgba(37,99,235,0.1)" stroke="#2563EB" strokeWidth={1.8} />
          <circle cx={60} cy={50} r={22} fill="rgba(22,163,74,0.1)" stroke={HIJAU} strokeWidth={1.8} />
          <text x={26} y={22} fontSize={13} fontWeight={800} textAnchor="middle" fill={BIRU}>
            12
          </text>
          <text x={94} y={22} fontSize={13} fontWeight={800} textAnchor="middle" fill={BIRU}>
            18
          </text>
          <text x={60} y={66} fontSize={13} fontWeight={800} textAnchor="middle" fill={BIRU}>
            24
          </text>
          <text x={60} y={42} fontSize={16} fontWeight={900} textAnchor="middle" fill={ORANYE}>
            {TIGA_FPB}
          </text>
        </g>
      ) : null}
      {jenis === "cek" ? (
        <g transform="translate(10 0)">
          <rect x={8} y={8} width={66} height={54} rx={5} fill="#FFFFFF" stroke={BIRU} strokeWidth={1.8} />
          <text x={41} y={29} fontSize={13} fontWeight={800} textAnchor="middle" fill={BIRU}>
            18 : 6
          </text>
          <text x={41} y={52} fontSize={13} fontWeight={900} textAnchor="middle" fill={HIJAU}>
            = 3
          </text>
          <circle cx={98} cy={35} r={15} fill="#DCFCE7" stroke={HIJAU} strokeWidth={2} />
          <path d="M90 35 L96 42 L107 28" fill="none" stroke={HIJAU} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}
    </svg>
  );
}
export default function PetaKotak({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_KOTAK.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_KOTAK[n - 1].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA}</p>
      </div>

      <div className="mx-auto w-full max-w-xl" data-uji="meja-kemas">
        <div className="rounded-2xl border-[5px] border-[#6B4423] bg-[#B7814A] p-2 shadow-[0_6px_0_rgba(107,68,35,0.35)]" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(107,68,35,0.18) 0 2px,transparent 2px 22px)" }}>
          <p className="mb-2 rounded-md bg-[#7F1D1D] py-1 text-center text-sm font-black text-[#FEF3C7]">
            {"\u{1F381}"} {JUDUL_PETA}
          </p>
          <div className="grid grid-cols-2 gap-x-2 gap-y-3">
            {LANGKAH_KOTAK.map((l, idx) => {
              const n = idx + 1;
              const terbuka = buka.includes(n);
              return (
                <div key={l.judul} className={`relative flex min-w-0 flex-col items-center rounded-lg border-4 px-1.5 pb-1.5 pt-3 ${terbuka ? "border-[#15803D] bg-[#F0FDF4]" : "border-[#92400E] bg-[#FEF3C7]"}`}>
                  <span className="absolute -top-2 left-1/2 h-3.5 w-12 -translate-x-1/2 rounded-sm border-2 border-[#7F1D1D] bg-[#DC2626]" aria-hidden="true" />
                  <span className="absolute -left-1.5 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#7F1D1D] bg-white text-xs font-black text-[#7F1D1D]" aria-hidden="true">
                    {n}
                  </span>
                  <MiniGambar jenis={l.gambar} />
                  <button
                    type="button"
                    onClick={() => ketuk(n)}
                    aria-label={terbuka ? `Langkah ${n}: ${l.judul}` : `Label kosong langkah ${n}`}
                    className={`mt-1 flex min-h-[44px] w-full min-w-0 items-center justify-center rounded-lg border-2 px-1 text-center text-sm font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/90 text-xl text-[#B45309]"}`}
                  >
                    {terbuka ? l.judul : "?"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA : `Sudah dibuka ${buka.length} dari ${LANGKAH_KOTAK.length} langkah.`}
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

export { PetaKotak };
