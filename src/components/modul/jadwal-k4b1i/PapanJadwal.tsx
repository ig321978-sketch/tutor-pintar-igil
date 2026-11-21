"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { LANGKAH_JADWAL, PETUNJUK_PETA_JADWAL, SELESAI_PETA_JADWAL } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab I "Papan Jadwal Kak Yoga" (dirancang sendiri): Peta Pantai, lima petak pasir dalam susunan mozaik (2 + 2 + 1 petak).
 * Tiap petak berisi gambar satu langkah (24 payung dua baris, empat pasangan faktor, 24 payung baris lima dengan sisa empat, jam perahu tiap empat jam, enam gugus empat payung)
 * dan satu bendera kosong yang tertancap di atasnya. Anak mengetuk bendera, judul langkah muncul dan dibacakan Guru; lanjut setelah semua terbuka.
 * Gambar SVG dirender selebar lajurnya (viewBox 124 untuk petak setengah, 280 untuk petak penuh), teks gambar minimal 11. Satu layar tanpa gulir.
 */
const WARNA = ["#EF4444", "#F59E0B", "#22C55E", "#0EA5E9", "#A855F7", "#EC4899"];

/** Satu payung: setengah lingkaran berwarna dan gagang. u = lebar payung. */
function Payung({ x, y, u, warna }: { x: number; y: number; u: number; warna: string }) {
  return (
    <g data-payung="1">
      <path d={`M${x},${y + u / 2} a${u / 2},${u / 2} 0 0 1 ${u},0 z`} fill={warna} />
      <path d={`M${x + u / 2},${y + u / 2} v${u * 0.45}`} stroke="#78350F" strokeWidth={1} />
    </g>
  );
}

function Gambar({ n }: { n: number }) {
  if (n === 0)
    return (
      <svg viewBox="0 0 124 46" className="h-auto w-full" role="img" aria-label="24 payung ditata 2 baris, tiap baris 12 payung">
        {Array.from({ length: 24 }, (_, i) => (
          <Payung key={i} x={(i % 12) * 10.3} y={Math.floor(i / 12) * 11.5} u={9.6} warna={WARNA[Math.floor(i / 12) * 3 + (i % 3)]} />
        ))}
        <text x={62} y={41} textAnchor="middle" fontSize={13} fontWeight={900} fill="#78350F">
          2 × 12 = 24
        </text>
      </svg>
    );
  if (n === 1)
    return (
      <svg viewBox="0 0 124 46" className="h-auto w-full" role="img" aria-label="Pasangan faktor 24: 1 kali 24, 2 kali 12, 3 kali 8, 4 kali 6">
        {["1 × 24", "2 × 12", "3 × 8", "4 × 6"].map((t, i) => (
          <g key={t}>
            <rect x={2 + (i % 2) * 62} y={1 + Math.floor(i / 2) * 22} width={58} height={20} rx={6} fill={i % 2 === 0 ? "#DBEAFE" : "#FFEDD5"} stroke={i % 2 === 0 ? "#0369A1" : "#EA580C"} strokeWidth={1.5} />
            <text x={31 + (i % 2) * 62} y={15 + Math.floor(i / 2) * 22} textAnchor="middle" fontSize={13} fontWeight={900} fill="#0C4A6E">
              {t}
            </text>
          </g>
        ))}
      </svg>
    );
  if (n === 2)
    return (
      <svg viewBox="0 0 124 62" className="h-auto w-full" role="img" aria-label="24 payung ditata baris berisi 5, tersisa 4 payung">
        {Array.from({ length: 24 }, (_, i) => (
          <Payung key={i} x={2 + (i % 5) * 12} y={Math.floor(i / 5) * 11.5} u={10.4} warna={i >= 20 ? "#DC2626" : WARNA[i % 5]} />
        ))}
        <text x={68} y={20} fontSize={13} fontWeight={900} fill="#78350F">
          24 : 5
        </text>
        <text x={68} y={37} fontSize={13} fontWeight={900} fill="#78350F">
          = 4
        </text>
        <text x={68} y={54} fontSize={13} fontWeight={900} fill="#DC2626">
          sisa 4
        </text>
      </svg>
    );
  if (n === 3)
    return (
      <svg viewBox="0 0 124 62" className="h-auto w-full" role="img" aria-label="Jam perahu berangkat: 4, 8, 12, 16, 20, 24, tambah 4 tiap jam">
        {[4, 8, 12, 16, 20, 24].map((v, i) => (
          <g key={v}>
            <text x={11 + i * 20} y={36} textAnchor="middle" fontSize={12} fontWeight={900} fill={i === 5 ? "#15803D" : "#0C4A6E"}>
              {v}
            </text>
            {i < 5 ? <path d={`M${11 + i * 20 + 5},24 q5,-14 10,0`} fill="none" stroke="#0369A1" strokeWidth={1.5} /> : null}
          </g>
        ))}
        <path d="M2,42 h120" stroke="#0EA5E9" strokeWidth={2} />
        <text x={62} y={59} textAnchor="middle" fontSize={12} fontWeight={900} fill="#0369A1">
          tambah 4 tiap kali
        </text>
      </svg>
    );
  return (
    <svg viewBox="0 0 280 64" className="h-auto w-full" role="img" aria-label="24 payung dalam 6 gugus, tiap gugus 4 payung: 24 dibagi 4 sama dengan 6">
      {[4, 8, 12, 16, 20, 24].map((v, i) => (
        <g key={v}>
          <text x={25 + i * 46} y={12} textAnchor="middle" fontSize={13} fontWeight={900} fill="#0C4A6E">
            {v}
          </text>
          {Array.from({ length: 4 }, (_, k) => (
            <Payung key={k} x={14 + i * 46 + (k % 2) * 12} y={16 + Math.floor(k / 2) * 12} u={10.4} warna={WARNA[i]} />
          ))}
        </g>
      ))}
      <text x={140} y={61} textAnchor="middle" fontSize={13} fontWeight={900} fill="#15803D">
        24 : 4 = 6, tanpa sisa
      </text>
    </svg>
  );
}

export default function PapanJadwalK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_JADWAL.length;
  const ketuk = (i: number) => {
    speakGuru(LANGKAH_JADWAL[i].arti);
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };
  return (
    <div className="space-y-1.5" data-uji="peta-pantai">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_JADWAL)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_JADWAL}</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#0891B2] bg-[#FDE68A] p-2 shadow-[0_6px_0_rgba(0,0,0,0.25)]">
        <div className="grid grid-cols-2 gap-1.5">
          {LANGKAH_JADWAL.map((l, i) => {
            const terbuka = buka.includes(i);
            return (
              <div key={l.judul} className={`rounded-lg border-2 border-[#F59E0B] bg-[#FFFBEB] p-1 ${i === 4 ? "col-span-2" : ""}`} data-petak={i + 1}>
                <button
                  type="button"
                  onClick={() => ketuk(i)}
                  aria-label={terbuka ? `Langkah ${i + 1}: ${l.judul}` : `Label kosong langkah ${i + 1}`}
                  className={`mb-0.5 flex min-h-[40px] w-full min-w-0 items-center rounded-r-lg border-[3px] border-l-[7px] px-1.5 py-0.5 text-left font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white"}`}
                >
                  <span className="min-w-0 break-normal text-[13px]">{terbuka ? l.judul : "?"}</span>
                </button>
                <div className="flex items-center justify-center rounded-md bg-[#FEF3C7] p-0.5">
                  <Gambar n={i} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_JADWAL : `Sudah dibuka ${buka.length} dari ${LANGKAH_JADWAL.length} langkah.`}
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
export { PapanJadwalK4B1 };
