"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { Pec } from "./Pec";
import { JEPIT_GARIS, KAIN_LIPAT, LANGKAH_LIPAT, PETUNJUK_PETA_LIPAT, SELESAI_PETA_LIPAT } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 2 Sub-Bab A "Kain Lipat Bu Wulan" (dirancang sendiri): tali jemuran Bu Wulan seperti di Story.
 * Tiga kain putih tergantung dengan jepitan (lipat dua, empat, delapan bagian sama besar; satu bagian diarsir ungu, digambar sungguh sebanyak bagiannya),
 * di bawahnya garis pecahan dari nol sampai satu dengan tiga jepitan pecahan. Lima label kosong menempel pada gambar yang cocok.
 * Diketuk, judul langkah muncul dan dibacakan Guru; lanjut setelah semua terbuka. Satu layar tanpa gulir.
 */
const LEBAR_GARIS = 300;
const X0 = 14;
const X1 = LEBAR_GARIS - 14;
const xPada = (nilai: number): number => X0 + (X1 - X0) * nilai;

function Kain({ n }: { n: number }) {
  return (
    <span className="grid h-[54px] w-[90px] border-2 border-[#6D28D9] bg-white shadow-[0_2px_0_rgba(0,0,0,0.2)]" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }} role="img" aria-label={`Kain dilipat jadi ${n} bagian sama besar, satu bagian diarsir`} data-bagian={n} data-arsir={1}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} aria-hidden="true" className={`block ${i > 0 ? "border-l border-[#6D28D9]" : ""} ${i === 0 ? "bg-[#A78BFA]" : "bg-white"}`} />
      ))}
    </span>
  );
}

function GarisPecahan() {
  return (
    <svg viewBox={`0 0 ${LEBAR_GARIS} 78`} className="block h-auto w-full max-w-[300px]" role="img" aria-label="Garis pecahan dari nol sampai satu dengan jepitan satu per delapan, satu per empat, dan satu per dua" data-jepit={JEPIT_GARIS.length}>
      <line x1={X0} y1={42} x2={X1} y2={42} stroke="#6D28D9" strokeWidth={4} strokeLinecap="round" />
      {[0, 1].map((t) => (
        <g key={t}>
          <line x1={xPada(t)} y1={34} x2={xPada(t)} y2={50} stroke="#6D28D9" strokeWidth={3} />
          <text x={xPada(t)} y={66} textAnchor="middle" fontSize={14} fontWeight={900} fill="#4C1D95">
            {t}
          </text>
        </g>
      ))}
      {JEPIT_GARIS.map((q) => (
        <g key={q}>
          <rect x={xPada(1 / q) - 4} y={30} width={8} height={18} rx={2} fill="#F59E0B" stroke="#92400E" strokeWidth={1.5} />
          <text x={xPada(1 / q)} y={22} textAnchor="middle" fontSize={13} fontWeight={900} fill="#1C01A5">
            {`1/${q}`}
          </text>
        </g>
      ))}
      <text x={LEBAR_GARIS / 2} y={72} textAnchor="middle" fontSize={12} fontWeight={900} fill="#4C1D95">
        {"kecil ➡ besar"}
      </text>
    </svg>
  );
}

export default function MejaLipatK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_LIPAT.length;
  const ketuk = (i: number) => {
    speakGuru(LANGKAH_LIPAT[i].arti);
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };
  const tag = (i: number, tegak = false) => {
    const terbuka = buka.includes(i);
    return (
      <button
        key={i}
        type="button"
        onClick={() => ketuk(i)}
        aria-label={terbuka ? `Langkah ${i + 1}: ${LANGKAH_LIPAT[i].judul}` : `Label kosong langkah ${i + 1}`}
        className={`relative mt-1 flex min-h-[46px] w-full min-w-0 ${tegak ? "flex-col" : ""} items-center justify-center gap-1 rounded-xl border-[3px] px-1 py-1 text-center text-xs font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/90"}`}
      >
        <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs text-white ${terbuka ? "bg-[#15803D]" : "bg-[#B45309]"}`}>
          {i + 1}
        </span>
        <span className="min-w-0 break-words">{terbuka ? LANGKAH_LIPAT[i].judul : "?"}</span>
      </button>
    );
  };

  return (
    <div className="space-y-1.5" data-uji="peta-tali-jemuran">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_LIPAT)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_LIPAT}</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#6D28D9] bg-[#F5F3FF] p-2 shadow-[0_6px_0_rgba(0,0,0,0.25)]">

        {/* tali jemuran dengan tiga kain */}
        <div className="grid grid-cols-3 gap-0 border-t-[5px] border-[#92400E]">
          {KAIN_LIPAT.map((n, i) => (
            <div key={n} className="relative flex flex-col items-center px-1 pt-2">
              <span aria-hidden="true" className="absolute -top-[5px] h-[14px] w-[8px] rounded-sm border border-[#92400E] bg-[#F59E0B]" />
              <Kain n={n} />
              <span className="mt-1">
                <Pec p={1} q={n} />
              </span>
              {tag(i, true)}
            </div>
          ))}
        </div>

        {/* garis pecahan: label empat di atas, label lima di bawah */}
        <div className="mt-1 rounded-xl bg-white/80 p-0.5">
          {tag(3)}
          <div className="flex justify-center">
            <GarisPecahan />
          </div>
          {tag(4)}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_LIPAT : `Sudah dibuka ${buka.length} dari ${LANGKAH_LIPAT.length} langkah.`}
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
export { MejaLipatK4B2 };
