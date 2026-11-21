"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { KAPUR_JATAH, LANGKAH_JATAH, PETUNJUK_PETA_JATAH, SELESAI_PETA_JATAH } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab H "Papan Jatah Bu Ratna" (dirancang sendiri): papan tulis hijau berbingkai kayu dengan pembagian bersusun 56 : 4 ditulis kapur baris demi baris
 * (empat pintu kamar, bagi puluhan, turun satuan, bagi lagi, periksa kali, sisa 59 : 4). Di kanan tiap baris menempel kertas tempel kuning berlabel kosong.
 * Anak mengetuk kertas tempel, judul langkah muncul dan dibacakan Guru; lanjut setelah semua terbuka. Satu layar tanpa gulir.
 */
export default function PapanJatahK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_JATAH.length;
  const ketuk = (i: number) => {
    speakGuru(LANGKAH_JATAH[i].arti);
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };
  return (
    <div className="space-y-1.5" data-uji="peta-papan-tulis">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_JATAH)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_JATAH}</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#B45309] bg-[#FEF3C7] p-2 shadow-[0_6px_0_rgba(0,0,0,0.25)]">
        <div className="relative">
          <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-[7rem] rounded-lg border-[5px] border-[#92400E] bg-[#14532D]" />
          <div className="relative space-y-0">
            {LANGKAH_JATAH.map((l, i) => {
              const terbuka = buka.includes(i);
              return (
                <div key={l.judul} className="grid grid-cols-[7rem_1fr] items-center gap-2" data-baris-papan={i + 1}>
                  <div className="flex min-h-[54px] flex-col items-center justify-center px-1 text-center font-black leading-tight text-[#FEF9C3]" style={{ borderTop: i === 0 ? "none" : "2px dashed rgba(254,249,195,0.35)" }}>
                    {i === 0 ? (
                      <span className="text-base leading-none" role="img" aria-label="empat pintu kamar">
                        {"\u{1F6AA}\u{1F6AA}\u{1F6AA}\u{1F6AA}"}
                      </span>
                    ) : null}
                    <span className="text-[15px]">{KAPUR_JATAH[i][0]}</span>
                    <span className="text-[11px] text-[#BBF7D0]">{KAPUR_JATAH[i][1]}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => ketuk(i)}
                    aria-label={terbuka ? `Langkah ${i + 1}: ${l.judul}` : `Label kosong langkah ${i + 1}`}
                    className={`my-0.5 flex min-h-[46px] w-full min-w-0 items-center gap-1 rounded-md border-[3px] px-1.5 py-1 text-left font-black leading-tight text-[#1C01A5] shadow-[2px_3px_0_rgba(0,0,0,0.2)] ${i % 2 === 0 ? "-rotate-1" : "rotate-1"} ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-[#FEF08A]"}`}
                  >
                    <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-xs text-white ${terbuka ? "border-[#15803D] bg-[#15803D]" : "border-[#B45309] bg-[#B45309]"}`}>
                      {i + 1}
                    </span>
                    <span className="min-w-0 break-normal text-[13px]">{terbuka ? l.judul : "?"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_JATAH : `Sudah dibuka ${buka.length} dari ${LANGKAH_JATAH.length} langkah.`}
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
export { PapanJatahK4B1 };
