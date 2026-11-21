"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { LANGKAH_PERAHU, PETUNJUK_PETA_PERAHU, SELESAI_PETA_PERAHU } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab G "Baris Perahu Bu Marni" (dirancang sendiri): Rute Perahu, lima perahu berjalan zig-zag di air (kiri, kanan, kiri, ...).
 * Tiap perahu membawa gambar satu langkah (lima perahu berpenumpang 12, uraian 10 dan 2, 50 + 10, susunan ke bawah dengan simpanan, lompatan penjumlahan berulang) dan satu label kosong di sampingnya.
 * Anak mengetuk label kosong, judul langkah muncul dan dibacakan Guru; lanjut setelah semua terbuka. Gambar SVG dirender 104 px (sama dengan lebar viewBox, skala 1). Satu layar tanpa gulir.
 */
function Gambar({ n }: { n: number }) {
  const g = { className: "h-[56px] w-[104px]", viewBox: "0 0 104 56", role: "img" as const };
  if (n === 0)
    return (
      <svg {...g} aria-label="Lima perahu, tiap perahu membawa 12 penumpang">
        {Array.from({ length: 5 }, (_, i) => (
          <g key={i}>
            <path d={`M${2 + i * 20},34 h17 l-3,9 h-11 z`} fill="#92400E" />
            <polygon points={`${4 + i * 20},12 ${4 + i * 20},32 ${17 + i * 20},32`} fill="#FFFFFF" stroke="#0369A1" strokeWidth={1} />
            <text x={8 + i * 20} y={28} textAnchor="middle" fontSize={11} fontWeight={900} fill="#0C4A6E">
              12
            </text>
          </g>
        ))}
        <path d="M0,48 q6,-5 12,0 t12,0 t12,0 t12,0 t12,0 t12,0 t12,0 t12,0 t12,0" fill="none" stroke="#0EA5E9" strokeWidth={2} />
      </svg>
    );
  if (n === 1)
    return (
      <svg {...g} aria-label="12 diurai menjadi 10 dan 2">
        <text x={52} y={14} textAnchor="middle" fontSize={14} fontWeight={900} fill="#0C4A6E">
          12
        </text>
        <path d="M44,18 l-14,8 M60,18 l14,8" stroke="#0C4A6E" strokeWidth={2} fill="none" />
        <rect x={4} y={28} width={58} height={24} rx={6} fill="#0369A1" />
        <text x={33} y={46} textAnchor="middle" fontSize={15} fontWeight={900} fill="#FFFFFF">
          10
        </text>
        <rect x={68} y={28} width={32} height={24} rx={6} fill="#EA580C" />
        <text x={84} y={46} textAnchor="middle" fontSize={15} fontWeight={900} fill="#FFFFFF">
          2
        </text>
      </svg>
    );
  if (n === 2)
    return (
      <svg {...g} aria-label="10 kali 5 sama dengan 50, 2 kali 5 sama dengan 10, jumlahnya 60">
        <text x={52} y={20} textAnchor="middle" fontSize={13} fontWeight={900} fill="#0369A1">
          50 + 10
        </text>
        <path d="M52,25 v8" stroke="#0C4A6E" strokeWidth={2} />
        <rect x={22} y={34} width={60} height={20} rx={6} fill="#15803D" />
        <text x={52} y={49} textAnchor="middle" fontSize={15} fontWeight={900} fill="#FFFFFF">
          = 60
        </text>
      </svg>
    );
  if (n === 3)
    return (
      <svg {...g} aria-label="Susunan ke bawah: 12 dikali 5, satuan dulu, tulis 0 simpan 1">
        <text x={30} y={14} textAnchor="end" fontSize={14} fontWeight={900} fill="#0C4A6E" letterSpacing={3}>
          12
        </text>
        <text x={8} y={30} fontSize={14} fontWeight={900} fill="#0C4A6E">
          ×
        </text>
        <text x={30} y={30} textAnchor="end" fontSize={14} fontWeight={900} fill="#0C4A6E">
          5
        </text>
        <path d="M6,34 h26" stroke="#0C4A6E" strokeWidth={2} />
        <text x={30} y={50} textAnchor="end" fontSize={14} fontWeight={900} fill="#EA580C">
          0
        </text>
        <rect x={42} y={6} width={58} height={20} rx={6} fill="#FFEDD5" stroke="#EA580C" strokeWidth={1.5} />
        <text x={71} y={20} textAnchor="middle" fontSize={12} fontWeight={900} fill="#9A3412">
          simpan 1
        </text>
        <rect x={42} y={32} width={58} height={20} rx={6} fill="#DBEAFE" stroke="#0369A1" strokeWidth={1.5} />
        <text x={71} y={46} textAnchor="middle" fontSize={12} fontWeight={900} fill="#0C4A6E">
          tulis 0
        </text>
      </svg>
    );
  return (
    <svg {...g} aria-label="Lompatan 12, 24, 36, 48, 60 pada garis">
      {[12, 24, 36, 48, 60].map((v, i) => (
        <g key={v}>
          <text x={10 + i * 21} y={44} textAnchor="middle" fontSize={11} fontWeight={900} fill={i === 4 ? "#15803D" : "#0C4A6E"}>
            {v}
          </text>
          {i < 4 ? <path d={`M${10 + i * 21},30 q10.5,-18 21,0`} fill="none" stroke="#0369A1" strokeWidth={2} /> : null}
        </g>
      ))}
      <path d="M2,50 h100" stroke="#0EA5E9" strokeWidth={2} />
    </svg>
  );
}

export default function BarisPerahuK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_PERAHU.length;
  const ketuk = (i: number) => {
    speakGuru(LANGKAH_PERAHU[i].arti);
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };
  return (
    <div className="space-y-1.5" data-uji="peta-rute">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_PERAHU)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_PERAHU}</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#0369A1] bg-gradient-to-b from-[#E0F2FE] to-[#7DD3FC] p-2 shadow-[0_6px_0_rgba(0,0,0,0.25)]">
        <div className="space-y-1">
          {LANGKAH_PERAHU.map((l, i) => {
            const terbuka = buka.includes(i);
            const kanan = i % 2 === 1;
            const gambar = (
              <div key="g" className={`flex min-h-[62px] items-center justify-center rounded-lg border-[3px] p-0.5 ${terbuka ? "border-[#15803D] bg-[#ECFDF5]" : "border-[#0369A1] bg-white/90"}`}>
                <Gambar n={i} />
              </div>
            );
            const label = (
              <button
                key="l"
                type="button"
                onClick={() => ketuk(i)}
                aria-label={terbuka ? `Langkah ${i + 1}: ${l.judul}` : `Label kosong langkah ${i + 1}`}
                className={`flex min-h-[62px] w-full min-w-0 items-center gap-1 rounded-xl border-[3px] px-1.5 py-1 text-left font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/80"}`}
              >
                <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-xs text-white ${terbuka ? "border-[#15803D] bg-[#15803D]" : "border-[#B45309] bg-[#B45309]"}`}>
                  {i + 1}
                </span>
                <span className="min-w-0 break-normal text-[13px]">{terbuka ? l.judul : "?"}</span>
              </button>
            );
            return (
              <div key={l.judul} className={`grid items-center gap-2 ${kanan ? "grid-cols-[1fr_7.4rem]" : "grid-cols-[7.4rem_1fr]"}`}>
                {kanan ? [label, gambar] : [gambar, label]}
              </div>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_PERAHU : `Sudah dibuka ${buka.length} dari ${LANGKAH_PERAHU.length} langkah.`}
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
export { BarisPerahuK4B1 };
