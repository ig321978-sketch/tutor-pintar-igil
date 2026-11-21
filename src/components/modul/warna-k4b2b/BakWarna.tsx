"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { Pec } from "../lipat-k4b2a/Pec";
import { TangkiBak } from "./TangkiBak";
import { BAK_PASANG, BAK_URUT, LANGKAH_WARNA, LAPIS_BAK, PETUNJUK_PETA_WARNA, SELESAI_PETA_WARNA } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 2 Sub-Bab B "Bak Warna Pak Joyo" (dirancang sendiri): halaman belakang sanggar seperti di Story.
 * Bak biru (tiga per delapan) dan bak merah (enam per delapan) berdiri berdampingan, tiga bak kecil (dua, lima, tujuh per delapan) di bawahnya, lalu garis pecahan per delapan.
 * Tiap bak digambar sungguh delapan lapis, terisi sebanyak pembilangnya. Lima label kosong berupa papan kapur menempel pada gambar yang cocok.
 * Diketuk, judul langkah muncul dan dibacakan Guru; lanjut setelah semua terbuka. Satu layar tanpa gulir.
 */
const LEBAR = 280;
const X0 = 12;
const X1 = LEBAR - 12;
const xBagian = (k: number): number => X0 + ((X1 - X0) * k) / LAPIS_BAK;

function GarisDelapan() {
  return (
    <svg viewBox={`0 0 ${LEBAR} 62`} className="block h-auto w-full max-w-[300px]" role="img" aria-label="Garis pecahan dari nol sampai satu dibagi delapan, dengan titik dua per delapan, lima per delapan, dan tujuh per delapan" data-bagian={LAPIS_BAK} data-titik={BAK_URUT.length}>
      <line x1={X0} y1={34} x2={X1} y2={34} stroke="#334155" strokeWidth={4} strokeLinecap="round" />
      {Array.from({ length: LAPIS_BAK + 1 }, (_, k) => (
        <line key={k} x1={xBagian(k)} y1={k === 0 || k === LAPIS_BAK ? 26 : 29} x2={xBagian(k)} y2={k === 0 || k === LAPIS_BAK ? 42 : 39} stroke="#334155" strokeWidth={k === 0 || k === LAPIS_BAK ? 3 : 2} />
      ))}
      {[0, LAPIS_BAK].map((k) => (
        <text key={k} x={xBagian(k)} y={59} textAnchor="middle" fontSize={14} fontWeight={900} fill="#0F172A">
          {k === 0 ? 0 : 1}
        </text>
      ))}
      {BAK_URUT.map((b) => (
        <g key={b.kunci}>
          <circle cx={xBagian(b.isi)} cy={34} r={6} fill="#F59E0B" stroke="#92400E" strokeWidth={2} />
          <text x={xBagian(b.isi)} y={18} textAnchor="middle" fontSize={13} fontWeight={900} fill="#1C01A5">
            {`${b.isi}/${LAPIS_BAK}`}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function BakWarnaK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_WARNA.length;
  const ketuk = (i: number) => {
    speakGuru(LANGKAH_WARNA[i].arti);
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };
  const papan = (i: number) => {
    const terbuka = buka.includes(i);
    return (
      <button
        key={i}
        type="button"
        onClick={() => ketuk(i)}
        aria-label={terbuka ? `Langkah ${i + 1}: ${LANGKAH_WARNA[i].judul}` : `Label kosong langkah ${i + 1}`}
        className={`flex min-h-[44px] w-full min-w-0 items-center gap-1.5 rounded-lg border-[3px] px-1.5 py-1 text-left text-xs font-black leading-tight ${terbuka ? "lm-muncul border-[#15803D] bg-[#14532D] text-white" : "border-dashed border-[#FDE68A] bg-[#1E293B] text-[#FDE68A]"}`}
      >
        <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${terbuka ? "bg-[#BBF7D0] text-[#14532D]" : "bg-[#FDE68A] text-[#1E293B]"}`}>
          {i + 1}
        </span>
        <span className="min-w-0 break-words">{terbuka ? LANGKAH_WARNA[i].judul : "?"}</span>
      </button>
    );
  };

  return (
    <div className="space-y-1.5" data-uji="peta-halaman-bak">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_WARNA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_WARNA}</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#9A3412] bg-[#FFEDD5] p-2 shadow-[0_6px_0_rgba(0,0,0,0.25)]">

        {/* dua bak yang dibandingkan, tiga papan di tengah */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1.5 rounded-xl bg-white/70 p-1">
          <div className="flex flex-col items-center gap-1">
            <TangkiBak isi={BAK_PASANG[0].isi} warna={BAK_PASANG[0].warna} lebar={46} lapisTinggi={8} nama={BAK_PASANG[0].nama} />
            <Pec p={BAK_PASANG[0].isi} q={LAPIS_BAK} />
          </div>
          <div className="space-y-1">
            {papan(0)}
            {papan(1)}
            {papan(2)}
          </div>
          <div className="flex flex-col items-center gap-1">
            <TangkiBak isi={BAK_PASANG[1].isi} warna={BAK_PASANG[1].warna} lebar={46} lapisTinggi={8} nama={BAK_PASANG[1].nama} />
            <Pec p={BAK_PASANG[1].isi} q={LAPIS_BAK} />
          </div>
        </div>

        {/* tiga bak yang diurutkan */}
        <div className="mt-1 grid grid-cols-[auto_1fr] items-center gap-2 rounded-xl bg-white/70 p-1">
          <div className="grid grid-cols-3 gap-2">
            {BAK_URUT.map((b) => (
              <div key={b.kunci} className="flex flex-col items-center gap-1">
                <TangkiBak isi={b.isi} warna={b.warna} lebar={34} lapisTinggi={7} nama={b.nama} />
                <Pec p={b.isi} q={LAPIS_BAK} />
              </div>
            ))}
          </div>
          {papan(3)}
        </div>

        {/* garis pecahan per delapan */}
        <div className="mt-1 rounded-xl bg-white/70 p-1">
          <div className="flex justify-center">
            <GarisDelapan />
          </div>
          {papan(4)}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_WARNA : `Sudah dibuka ${buka.length} dari ${LANGKAH_WARNA.length} langkah.`}
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
export { BakWarnaK4B2 };
