"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_JUDUL_PETA_UBIN, JUDUL_PETA_UBIN, LANGKAH_UBIN, PETUNJUK_PETA_UBIN, SELESAI_PETA_UBIN } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 4 Sub-Bab A "Lantai Ubin Bu Sinta" (dirancang sendiri): denah lantai tepi kolam Bu Sinta seperti di Story, dengan ubin sungguhan (3 baris, 4 kolom).
 * Empat bagian denah masing-masing punya label kosong di sebelahnya: ubin (tutup lantai), baris dan kolom (kali), tulisan luas (satuan), dan tangga satuan.
 * Anak mengetuk label kosong, judul langkah muncul dan dibacakan Guru; lanjut setelah semua terbuka. Satu layar tanpa gulir.
 */
const B = 3;
const K = 4;

function Bagian({ n }: { n: number }) {
  if (n === 0)
    return (
      <span className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${K}, 15px)` }} role="img" aria-label={`${B} baris, ${K} kolom ubin`} data-baris={B} data-kolom={K}>
        {Array.from({ length: B * K }, (_, i) => (
          <span key={i} aria-hidden="true" className="block h-[15px] w-[15px] border border-[#0369A1] bg-[#BAE6FD]">
          </span>
        ))}
      </span>
    );
  if (n === 1)
    return (
      <span className="flex flex-col items-center text-center leading-tight">
        <span className="text-sm font-black text-[#0C4A6E]">
          {B} baris × {K} kolom
        </span>
        <span className="text-[10px] font-black text-[#0369A1]">{"⬅️ baris ➡️ kolom"}</span>
      </span>
    );
  if (n === 2)
    return (
      <span className="rounded-lg border-[3px] border-dashed border-[#15803D] bg-[#F0FDF4] px-2 py-1 text-base font-black text-[#14532D]">
        {B * K} cm²
      </span>
    );
  return (
    <svg viewBox="0 0 120 52" className="h-[40px] w-[96px]" role="img" aria-label="Tangga satuan: sentimeter persegi di anak tangga bawah, meter persegi di anak tangga atas">
      <rect x={4} y={26} width={52} height={22} fill="#BAE6FD" stroke="#0369A1" strokeWidth={2} />
      <text x={30} y={41} textAnchor="middle" fontSize={11} fontWeight={900} fill="#0C4A6E">
        cm²
      </text>
      <rect x={56} y={6} width={58} height={42} fill="#E0F2FE" stroke="#0369A1" strokeWidth={2} />
      <text x={85} y={31} textAnchor="middle" fontSize={12} fontWeight={900} fill="#0C4A6E">
        m²
      </text>
    </svg>
  );
}

export default function PetaUbin({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_UBIN.length;
  const ketuk = (i: number) => {
    speakGuru(LANGKAH_UBIN[i].arti);
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };
  return (
    <div className="space-y-1.5" data-uji="peta-denah">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_UBIN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_UBIN}</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#0369A1] bg-[#E0F2FE] p-2 shadow-[0_6px_0_rgba(0,0,0,0.25)]">
        <p className="mb-1.5 rounded-lg bg-[#0369A1] py-0.5 text-center text-sm font-black text-[#FDE68A]">
          {IKON_JUDUL_PETA_UBIN} {JUDUL_PETA_UBIN}
        </p>
        <div className="space-y-1">
          {LANGKAH_UBIN.map((l, i) => {
            const terbuka = buka.includes(i);
            return (
              <div key={l.judul} className="grid grid-cols-[7.4rem_1fr] items-center gap-2 rounded-xl bg-white/70 p-1">
                <div className={`flex min-h-[44px] items-center justify-center rounded-lg border-[3px] p-0.5 ${terbuka ? "border-[#15803D] bg-[#ECFDF5]" : "border-[#0369A1] bg-[#F0F9FF]"}`}>
                  <Bagian n={i} />
                </div>
                <button
                  type="button"
                  onClick={() => ketuk(i)}
                  aria-label={terbuka ? `Langkah ${i + 1}: ${l.judul}` : `Label kosong langkah ${i + 1}`}
                  className={`flex min-h-[44px] w-full min-w-0 items-center gap-2 rounded-xl border-[3px] px-2 py-1 text-left font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/80"}`}
                >
                  <span aria-hidden="true" className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-base text-white ${terbuka ? "border-[#15803D] bg-[#15803D]" : "border-[#B45309] bg-[#B45309]"}`}>
                    {i + 1}
                  </span>
                  <span className="min-w-0 break-words text-sm">{terbuka ? l.judul : "?"}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_UBIN : `Sudah dibuka ${buka.length} dari ${LANGKAH_UBIN.length} langkah.`}
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
export { PetaUbin };
