"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_JUDUL_PETA_LOKET, JUDUL_PETA_LOKET, LANGKAH_LOKET, PETUNJUK_PETA_LOKET, SELESAI_PETA_LOKET } from "./data-peta";
import { WARNA_TEMPAT } from "./data-info";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab A "Loket Tiket Bu Maya" (dirancang sendiri): MUKA LOKET beratap rumbia seperti di Story, lima bagian tersusun dari atap ke bawah:
 * papan nama empat tempat, kartu angka berwarna (3, 4, 0, 6), tiket 3.406 (nol redup), tulisan salah 3.46 yang diperbaiki, papan pengumuman bercentang.
 * Di kanan tiap bagian ada label kosong berbentuk sobekan tiket; diketuk, judul langkah muncul dan dibacakan Guru. Lanjut setelah kelimanya terbuka. Satu layar tanpa gulir.
 */
const LEBAR = 300;
const TINGGI = 372;
const Y0 = 46;
const TB = 64;
const KOLOM_LABEL_X = 196;
const KOLOM_LABEL_W = 102;
const DIGIT_KARTU = [3, 4, 0, 6];
const NAMA_NAMA = ["ribu", "ratus", "puluh", "satuan"];

function Muka() {
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Muka loket tiket beratap rumbia: papan nama empat tempat, kartu angka tiga empat nol enam, tiket 3.406, tulisan 3.46 yang diperbaiki, dan papan pengumuman bercentang" data-uji="muka-loket">
      <rect width={LEBAR} height={TINGGI} rx={10} fill="#FEF3C7" />
      {/* atap rumbia */}
      <polygon points="2,46 26,6 168,6 192,46" fill="#D97706" stroke="#78350F" strokeWidth={3} strokeLinejoin="round" />
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={34 + i * 21} y1={9} x2={24 + i * 23} y2={44} stroke="#92400E" strokeWidth={1.5} opacity={0.45} />
      ))}
      <rect x={52} y={14} width={90} height={22} rx={5} fill="#78350F" />
      <text x={97} y={30} textAnchor="middle" fontSize={13} fontWeight={900} fill="#FFF7ED">
        LOKET TIKET
      </text>
      {/* lima bagian dinding */}
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x={8} y={Y0 + i * TB} width={178} height={TB - 2} rx={6} fill="#FFFBEB" stroke="#92400E" strokeWidth={3} />
      ))}
      {/* 1 papan nama empat tempat */}
      {NAMA_NAMA.map((n, k) => (
        <g key={n}>
          <rect x={12 + k * 41} y={54} width={41} height={34} fill={WARNA_TEMPAT[k]} opacity={0.18} stroke={WARNA_TEMPAT[k]} strokeWidth={2} />
          <text x={32.5 + k * 41} y={75} textAnchor="middle" fontSize={11} fontWeight={800} fill={WARNA_TEMPAT[k]}>
            {n}
          </text>
        </g>
      ))}
      <line x1={14} y1={98} x2={172} y2={98} stroke="#92400E" strokeWidth={3} strokeLinecap="round" />
      <polygon points="182,98 170,91 170,105" fill="#92400E" />
      {/* 2 kartu angka */}
      {DIGIT_KARTU.map((d, k) => (
        <g key={k}>
          <rect x={18 + k * 42} y={Y0 + TB + 6} width={36} height={50} rx={6} fill={WARNA_TEMPAT[k]} stroke="#1F2937" strokeWidth={2} />
          <text x={36 + k * 42} y={Y0 + TB + 42} textAnchor="middle" fontSize={30} fontWeight={900} fill="#FFFFFF">
            {d}
          </text>
        </g>
      ))}
      {/* 3 tiket 3.406 dengan nol redup */}
      <rect x={16} y={Y0 + 2 * TB + 6} width={162} height={50} rx={6} fill="#FDE68A" stroke="#B45309" strokeWidth={3} />
      <circle cx={16} cy={Y0 + 2 * TB + 31} r={7} fill="#FFFBEB" stroke="#B45309" strokeWidth={2} />
      <circle cx={178} cy={Y0 + 2 * TB + 31} r={7} fill="#FFFBEB" stroke="#B45309" strokeWidth={2} />
      <text x={97} y={Y0 + 2 * TB + 42} textAnchor="middle" fontSize={32} fontWeight={900}>
        <tspan fill={WARNA_TEMPAT[0]}>3</tspan>
        <tspan fill="#92400E">.</tspan>
        <tspan fill={WARNA_TEMPAT[1]}>4</tspan>
        <tspan fill="#9CA3AF">0</tspan>
        <tspan fill={WARNA_TEMPAT[3]}>6</tspan>
      </text>
      {/* 4 tulisan salah diperbaiki */}
      <text x={18} y={Y0 + 3 * TB + 38} fontSize={20} fontWeight={900} fill="#DC2626">
        3.46
      </text>
      <line x1={14} y1={Y0 + 3 * TB + 31} x2={68} y2={Y0 + 3 * TB + 31} stroke="#DC2626" strokeWidth={3} />
      <line x1={72} y1={Y0 + 3 * TB + 31} x2={92} y2={Y0 + 3 * TB + 31} stroke="#166534" strokeWidth={3} strokeLinecap="round" />
      <polygon points={`98,${Y0 + 3 * TB + 31} 89,${Y0 + 3 * TB + 25} 89,${Y0 + 3 * TB + 37}`} fill="#166534" />
      <text x={104} y={Y0 + 3 * TB + 38} fontSize={20} fontWeight={900} fill="#166534">
        3.406
      </text>
      <circle cx={137} cy={Y0 + 3 * TB + 31} r={12} fill="none" stroke="#16A34A" strokeWidth={2.5} strokeDasharray="4 3" />
      {/* 5 papan pengumuman bercentang */}
      <rect x={16} y={Y0 + 4 * TB + 6} width={156} height={50} rx={5} fill="#ECFDF5" stroke="#166534" strokeWidth={3} />
      <text x={94} y={Y0 + 4 * TB + 24} textAnchor="middle" fontSize={12} fontWeight={900} fill="#166534">
        PEMENANG
      </text>
      <text x={94} y={Y0 + 4 * TB + 46} textAnchor="middle" fontSize={16} fontWeight={900} fill="#1F2937">
        3.406 · 5.080
      </text>
      <circle cx={172} cy={Y0 + 4 * TB + 8} r={11} fill="#16A34A" />
      <polyline points={`166,${Y0 + 4 * TB + 8} 171,${Y0 + 4 * TB + 13} 179,${Y0 + 4 * TB + 3}`} fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      {/* penunjuk putus-putus ke label */}
      {Array.from({ length: 5 }, (_, i) => (
        <line key={i} x1={186} y1={Y0 + i * TB + 31} x2={KOLOM_LABEL_X + 2} y2={Y0 + i * TB + 31} stroke="#B45309" strokeWidth={2} strokeDasharray="3 3" />
      ))}
    </svg>
  );
}

export default function LoketTiketK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_LOKET.length;
  const ketuk = (i: number) => {
    speakGuru(LANGKAH_LOKET[i].arti);
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };
  return (
    <div className="space-y-2" data-uji="peta-loket">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_LOKET)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_LOKET}</p>
      </div>

      <div className="mx-auto w-full max-w-[300px]">
        <p className="mb-1 rounded-lg bg-[#78350F] py-0.5 text-center text-sm font-black text-[#FDE68A]">
          {IKON_JUDUL_PETA_LOKET} {JUDUL_PETA_LOKET}
        </p>
        <div className="relative w-full" style={{ aspectRatio: `${LEBAR} / ${TINGGI}` }}>
          <Muka />
          {LANGKAH_LOKET.map((l, i) => {
            const terbuka = buka.includes(i);
            return (
              <button
                key={l.judul}
                type="button"
                onClick={() => ketuk(i)}
                aria-label={terbuka ? `Langkah ${i + 1}: ${l.judul}` : `Label kosong langkah ${i + 1}`}
                style={{ left: `${(KOLOM_LABEL_X / LEBAR) * 100}%`, width: `${(KOLOM_LABEL_W / LEBAR) * 100}%`, top: `${((Y0 + i * TB + 3) / TINGGI) * 100}%`, height: 56 }}
                className={`absolute flex items-center justify-center rounded-md border-[3px] border-l-[7px] px-1 text-center font-black leading-tight ${terbuka ? "lm-muncul border-[#15803D] bg-[#DCFCE7] text-[12px] text-[#1C01A5]" : "border-dashed border-[#B45309] bg-white/90 text-2xl text-[#B45309]"}`}
              >
                <span className="min-w-0 break-words">{terbuka ? l.judul : "?"}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_LOKET : `Sudah dibuka ${buka.length} dari ${LANGKAH_LOKET.length} langkah.`}
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
export { LoketTiketK4B1 };
