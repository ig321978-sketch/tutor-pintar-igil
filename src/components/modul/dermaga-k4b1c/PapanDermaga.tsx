"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_JUDUL_PETA_DERMAGA, JUDUL_PETA_DERMAGA, LANGKAH_DERMAGA, PETUNJUK_PETA_DERMAGA, SELESAI_PETA_DERMAGA } from "./data-peta";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab C "Papan Dermaga Kak Tiara" (dirancang sendiri): DERMAGA kayu lurus di atas laut, lima titik dari atas ke bawah:
 * dua papan pantai (4.358 dan 4.385, angka ribuan menyala), tiga lencana banding (4=4, 3=3, 5<8), tiga tanda (< > =), tali garis bilangan dengan tiga pelampung, tiga kartu bilangan berurut.
 * Papan penunjuk berlabel kosong berselang-seling di kiri dan kanan dermaga; diketuk, judul langkah muncul dan dibacakan Guru. Lanjut setelah kelimanya terbuka. Satu layar tanpa gulir.
 */
const LEBAR = 300;
const TINGGI = 352;
const Y0 = 6;
const TB = 68;
const LABEL_W = 94;
const LABEL_KIRI_X = 4;
const LABEL_KANAN_X = 202;
const LABEL_H = 54;
const TIANG_KIRI = 106;
const TIANG_KANAN = 194;

const yc = (i: number) => Y0 + i * TB + 8 + LABEL_H / 2;

function Dermaga() {
  const y = (i: number) => Y0 + i * TB;
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Dermaga kayu di atas laut: dua papan pantai 4.358 dan 4.385, lencana banding, tanda kurang dari lebih dari sama dengan, tali garis bilangan dengan tiga pelampung, dan tiga kartu bilangan berurut" data-uji="dermaga-laut">
      <rect width={LEBAR} height={TINGGI} rx={10} fill="#BAE6FD" />
      {[24, 96, 168, 240, 312].map((yy, k) => (
        <path key={yy} d={`M ${k % 2 === 0 ? 8 : 20} ${yy} q 10 -8 20 0 t 20 0 t 20 0 t 20 0`} fill="none" stroke="#FFFFFF" strokeWidth={2.5} opacity={0.7} />
      ))}
      {[40, 112, 184, 256, 328].map((yy, k) => (
        <path key={yy} d={`M ${k % 2 === 0 ? 212 : 224} ${yy} q 10 -8 20 0 t 20 0 t 20 0`} fill="none" stroke="#FFFFFF" strokeWidth={2.5} opacity={0.7} />
      ))}
      {/* dermaga */}
      <rect x={TIANG_KIRI} y={0} width={TIANG_KANAN - TIANG_KIRI} height={TINGGI} fill="#D6A460" />
      {Array.from({ length: 26 }, (_, k) => (
        <line key={k} x1={TIANG_KIRI} y1={14 * k + 8} x2={TIANG_KANAN} y2={14 * k + 8} stroke="#A16207" strokeWidth={1.5} />
      ))}
      <rect x={TIANG_KIRI} y={0} width={4} height={TINGGI} fill="#78350F" />
      <rect x={TIANG_KANAN - 4} y={0} width={4} height={TINGGI} fill="#78350F" />
      {Array.from({ length: 6 }, (_, k) => (
        <g key={k}>
          <circle cx={TIANG_KIRI} cy={y(k)} r={5} fill="#78350F" />
          <circle cx={TIANG_KANAN} cy={y(k)} r={5} fill="#78350F" />
        </g>
      ))}
      {/* penunjuk papan */}
      {Array.from({ length: 5 }, (_, i) => (
        <polygon key={i} points={i % 2 === 0 ? `${LABEL_KIRI_X + LABEL_W},${yc(i) - 7} ${TIANG_KIRI},${yc(i)} ${LABEL_KIRI_X + LABEL_W},${yc(i) + 7}` : `${LABEL_KANAN_X},${yc(i) - 7} ${TIANG_KANAN},${yc(i)} ${LABEL_KANAN_X},${yc(i) + 7}`} fill="#78350F" />
      ))}
      {/* 1 dua papan pantai */}
      {[
        { t: "4.358", yy: y(0) + 6 },
        { t: "4.385", yy: y(0) + 36 },
      ].map((p) => (
        <g key={p.t}>
          <rect x={112} y={p.yy} width={76} height={26} rx={4} fill="#FFFFFF" stroke="#1F2937" strokeWidth={2} />
          <text x={150} y={p.yy + 19} textAnchor="middle" fontSize={14} fontWeight={900}>
            <tspan fill="#DC2626">{p.t[0]}</tspan>
            <tspan fill="#1F2937">{p.t.slice(1)}</tspan>
          </text>
        </g>
      ))}
      {/* 2 lencana banding */}
      {[
        { t: "4=4", c: "#BBF7D0" },
        { t: "3=3", c: "#BBF7D0" },
        { t: "5<8", c: "#FDE68A" },
      ].map((p, k) => (
        <g key={p.t}>
          <rect x={109 + k * 28} y={y(1) + 8} width={26} height={24} rx={4} fill={p.c} stroke="#1F2937" strokeWidth={2} />
          <text x={122 + k * 28} y={y(1) + 25} textAnchor="middle" fontSize={11.5} fontWeight={900} fill="#1F2937">
            {p.t}
          </text>
        </g>
      ))}
      <line x1={112} y1={y(1) + 48} x2={182} y2={y(1) + 48} stroke="#78350F" strokeWidth={3} strokeLinecap="round" />
      <polygon points={`190,${y(1) + 48} 181,${y(1) + 42} 181,${y(1) + 54}`} fill="#78350F" />
      <text x={112} y={y(1) + 66} fontSize={11} fontWeight={800} fill="#78350F">
        kiri
      </text>
      <text x={188} y={y(1) + 66} textAnchor="end" fontSize={11} fontWeight={800} fill="#78350F">
        kanan
      </text>
      {/* 3 tiga tanda */}
      {[
        { t: "<", c: "#DC2626" },
        { t: ">", c: "#2563EB" },
        { t: "=", c: "#16A34A" },
      ].map((p, k) => (
        <g key={p.t}>
          <rect x={109 + k * 28} y={y(2) + 8} width={26} height={34} rx={4} fill="#FFFFFF" stroke={p.c} strokeWidth={3} />
          <text x={122 + k * 28} y={y(2) + 34} textAnchor="middle" fontSize={24} fontWeight={900} fill={p.c}>
            {p.t}
          </text>
        </g>
      ))}
      <text x={150} y={y(2) + 60} textAnchor="middle" fontSize={11} fontWeight={800} fill="#1F2937">
        4.358&lt;4.385
      </text>
      {/* 4 garis bilangan */}
      <line x1={114} y1={y(3) + 30} x2={180} y2={y(3) + 30} stroke="#78350F" strokeWidth={3} strokeLinecap="round" />
      <polygon points={`190,${y(3) + 30} 180,${y(3) + 23} 180,${y(3) + 37}`} fill="#78350F" />
      {[
        { x: 122, r: 5 },
        { x: 150, r: 7 },
        { x: 176, r: 9 },
      ].map((p) => (
        <circle key={p.x} cx={p.x} cy={y(3) + 30} r={p.r} fill="#F97316" stroke="#FFFFFF" strokeWidth={2} />
      ))}
      <text x={112} y={y(3) + 62} fontSize={11} fontWeight={800} fill="#78350F">
        kecil
      </text>
      <text x={188} y={y(3) + 62} textAnchor="end" fontSize={11} fontWeight={800} fill="#78350F">
        besar
      </text>
      {/* 5 tiga kartu berurut */}
      {[
        { t: "4.358", f: "#DBEAFE" },
        { t: "4.385", f: "#BFDBFE" },
        { t: "4.538", f: "#93C5FD" },
      ].map((p, k) => (
        <g key={p.t}>
          <rect x={112} y={y(4) + 6 + k * 21} width={76} height={18} rx={3} fill={p.f} stroke="#1E3A8A" strokeWidth={2} />
          <text x={150} y={y(4) + 19.5 + k * 21} textAnchor="middle" fontSize={12} fontWeight={900} fill="#1E3A8A">
            {p.t}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function PapanDermagaK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_DERMAGA.length;
  const ketuk = (i: number) => {
    speakGuru(LANGKAH_DERMAGA[i].arti);
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };
  return (
    <div className="space-y-2" data-uji="peta-dermaga">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_DERMAGA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_DERMAGA}</p>
      </div>

      <div className="mx-auto w-full max-w-[300px]">
        <p className="mb-1 rounded-lg bg-[#0369A1] py-0.5 text-center text-sm font-black text-[#FDE68A]">
          {IKON_JUDUL_PETA_DERMAGA} {JUDUL_PETA_DERMAGA}
        </p>
        <div className="relative w-full" style={{ aspectRatio: `${LEBAR} / ${TINGGI}` }}>
          <Dermaga />
          {LANGKAH_DERMAGA.map((l, i) => {
            const terbuka = buka.includes(i);
            const kiri = i % 2 === 0;
            return (
              <button
                key={l.judul}
                type="button"
                onClick={() => ketuk(i)}
                aria-label={terbuka ? `Langkah ${i + 1}: ${l.judul}` : `Label kosong langkah ${i + 1}`}
                style={{ left: `${((kiri ? LABEL_KIRI_X : LABEL_KANAN_X) / LEBAR) * 100}%`, width: `${(LABEL_W / LEBAR) * 100}%`, top: `${((Y0 + i * TB + 8) / TINGGI) * 100}%`, height: LABEL_H }}
                className={`absolute flex items-center justify-center rounded-md border-[3px] px-1 text-center font-black leading-tight ${terbuka ? "lm-muncul border-[#15803D] bg-[#DCFCE7] text-[12px] text-[#1C01A5]" : "border-dashed border-[#B45309] bg-[#FEF3C7] text-2xl text-[#B45309]"}`}
              >
                <span className="min-w-0 break-words">{terbuka ? l.judul : "?"}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_DERMAGA : `Sudah dibuka ${buka.length} dari ${LANGKAH_DERMAGA.length} langkah.`}
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
export { PapanDermagaK4B1 };
