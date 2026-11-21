"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { BlokSvg } from "./GambarEmber";
import { IKON_JUDUL_PETA, JUDUL_PETA, LANGKAH_EMBER, PETUNJUK_PETA, SELESAI_PETA, type LangkahPeta } from "./data-peta";

/**
 * Mind-map Kelas 4 Bab 4 Sub-Bab B "Ember Pak Anto": rak kayu Pak Anto di tepi kolam dengan empat alat yang digambar sungguhan
 * (gelas ukur berair bertanda, balok kubus tiga kali dua kali dua, botol dan ember dengan tangga liter, kubus kecil dengan tetes air).
 * Label kosong menempel di bawah tiap alat; ketuk satu per satu, judul langkah muncul dan dibacakan guru. Lanjut setelah semua terbuka. Satu layar tanpa gulir.
 */
const BIRU = "#1C01A5";

function Alat({ jenis }: { jenis: LangkahPeta["gambar"] }) {
  if (jenis === "blok")
    return (
      <div className="mx-auto w-full max-w-[150px]" data-alat="blok">
        <BlokSvg kolom={3} baris={2} lapis={2} rupa="benda" />
        <p className="text-center text-[11px] font-black leading-tight text-[#92400E]">3 × 2 = 6 kubus, 2 lapisan</p>
      </div>
    );
  return (
    <svg viewBox="0 0 150 100" className="mx-auto w-full max-w-[150px]" role="img" data-alat={jenis} aria-label={jenis === "gelas" ? "gelas ukur berisi air dengan garis tanda" : jenis === "tangga" ? "botol satu liter dan ember dengan tangga" : "kubus kecil dan tetes air"}>
      {jenis === "gelas" ? (
        <g>
          <rect x={52} y={26} width={46} height={66} rx={3} fill="#FFFFFF" stroke="#0284C7" strokeWidth={3} />
          <rect x={54} y={58} width={42} height={32} fill="#7DD3FC" />
          {[0, 1, 2].map((i) => (
            <line key={i} x1={84} y1={40 + i * 16} x2={98} y2={40 + i * 16} stroke={BIRU} strokeWidth={2} />
          ))}
          <text x={32} y={62} textAnchor="middle" fontSize={14} fontWeight={900} fill={BIRU}>
            ml
          </text>
          <text x={104} y={20} fontSize={16}>
            {"\u{1F4A7}"}
          </text>
        </g>
      ) : null}
      {jenis === "tangga" ? (
        <g>
          <rect x={10} y={24} width={32} height={56} rx={5} fill="#DBEAFE" stroke="#0284C7" strokeWidth={2.5} />
          <rect x={20} y={14} width={12} height={12} rx={2} fill="#DBEAFE" stroke="#0284C7" strokeWidth={2} />
          <text x={26} y={58} textAnchor="middle" fontSize={13} fontWeight={900} fill={BIRU}>
            1 l
          </text>
          <line x1={46} y1={52} x2={88} y2={52} stroke="#DC2626" strokeWidth={3} />
          <polygon points="88,45 98,52 88,59" fill="#DC2626" />
          <text x={72} y={42} textAnchor="middle" fontSize={13} fontWeight={900} fill="#DC2626">
            × 1.000
          </text>
          <rect x={104} y={24} width={36} height={56} rx={3} fill="#FFFFFF" stroke="#0284C7" strokeWidth={2.5} />
          <rect x={106} y={30} width={32} height={48} fill="#7DD3FC" />
          {[0, 1, 2].map((i) => (
            <line key={i} x1={128} y1={36 + i * 14} x2={140} y2={36 + i * 14} stroke={BIRU} strokeWidth={1.5} />
          ))}
          <text x={118} y={96} textAnchor="middle" fontSize={13} fontWeight={900} fill={BIRU}>
            1.000 ml
          </text>
        </g>
      ) : null}
      {jenis === "kubik" ? (
        <g>
          <rect x={6} y={8} width={26} height={26} fill="#BAE6FD" stroke={BIRU} strokeWidth={2} />
          <text x={38} y={27} fontSize={13} fontWeight={900} fill={BIRU}>
            1 cm³ = 1 ml
          </text>
          <rect x={6} y={52} width={26} height={26} fill="#BAE6FD" stroke={BIRU} strokeWidth={2.5} />
          <polygon points="6,52 12,46 38,46 32,52" fill="#DBEAFE" stroke={BIRU} strokeWidth={2} />
          <polygon points="32,52 38,46 38,72 32,78" fill="#7DD3FC" stroke={BIRU} strokeWidth={2} />
          <text x={43} y={66} fontSize={13} fontWeight={900} fill={BIRU}>
            1 m³ = 1.000 l
          </text>
          <text x={46} y={86} fontSize={13} fontWeight={900} fill="#DC2626">
            rusuk 1 m
          </text>
        </g>
      ) : null}
    </svg>
  );
}

export default function PetaEmberK4B4({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_EMBER.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_EMBER[n].arti);
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

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#92400E] bg-[#E0F2FE] p-2 shadow-[0_6px_0_rgba(0,0,0,0.25)]" data-uji="rak-ember">
        <p className="mb-2 rounded-lg bg-[#92400E] py-1 text-center text-sm font-black text-[#FDE68A]">
          {IKON_JUDUL_PETA} {JUDUL_PETA}
        </p>
        <div className="grid grid-cols-2 gap-x-2">
          {LANGKAH_EMBER.map((l, n) => {
            const terbuka = buka.includes(n);
            return (
              <div key={l.judul} className={`flex flex-col justify-end ${n < 2 ? "border-b-[8px] border-[#B45309] pb-1" : "pt-2"}`} style={n < 2 ? { marginBottom: 8 } : undefined}>
                <Alat jenis={l.gambar} />
                <button
                  type="button"
                  onClick={() => ketuk(n)}
                  aria-label={terbuka ? `Langkah ${n + 1}: ${l.judul}` : `Label kosong langkah ${n + 1}`}
                  className={`mt-1 flex min-h-[56px] w-full min-w-0 items-center gap-1.5 rounded-xl border-[3px] px-1.5 py-1 text-left text-[13px] font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/80"}`}
                >
                  <span aria-hidden="true" className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm text-white ${terbuka ? "border-[#15803D] bg-[#15803D]" : "border-[#B45309] bg-[#B45309]"}`}>
                    {n + 1}
                  </span>
                  <span className="min-w-0 break-words">{terbuka ? l.judul : "?"}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA : `Sudah dibuka ${buka.length} dari ${LANGKAH_EMBER.length} langkah.`}
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

export { PetaEmberK4B4 };
