"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_JUDUL_PETA_JAJANAN, JUDUL_PETA_JAJANAN, LANGKAH_JAJANAN, PETUNJUK_PETA_JAJANAN, SELESAI_PETA_JAJANAN } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 6 Sub-Bab A "Piktogram Jajanan Bu Rini": gambar tenda jajanan (awning merah-putih berumbai, papan data kayu) dengan lima baris,
 * tiap baris punya deret ikon jajanan yang makin panjang dan satu label kosong. Anak mengetuk label, judul langkah muncul dan dibacakan Guru.
 * Anak tidak membuat konsep; konsep diberitahukan. Satu layar tanpa gulir (kisi tetap).
 */
const IKON_BARIS = ["\u{1F362}", "\u{1F95F}", "\u{1F361}", "\u{1F369}", "\u{1F32D}"];

function Awning() {
  const n = 10;
  return (
    <svg viewBox="0 0 300 36" className="block h-auto w-full" role="img" aria-label="Tenda jajanan Bu Rini dengan awning merah putih">
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={i * 30} y={0} width={30} height={26} fill={i % 2 === 0 ? "#DC2626" : "#FFFFFF"} />
          <path d={`M${i * 30} 26 q15 18 30 0 z`} fill={i % 2 === 0 ? "#DC2626" : "#FFFFFF"} stroke="#991B1B" strokeWidth={1} />
        </g>
      ))}
      <rect x={0} y={0} width={300} height={3} fill="#991B1B" />
    </svg>
  );
}

export default function PetaJajanan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_JAJANAN.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_JAJANAN[n - 1].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_JAJANAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_JAJANAN}</p>
      </div>

      <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border-[6px] border-[#991B1B] bg-[#FEF3C7] shadow-[0_6px_0_rgba(0,0,0,0.25)]" data-rupa="tenda">
        <Awning />
        <p className="-mt-2 mb-0.5 text-center text-sm font-black text-[#991B1B]">
          {IKON_JUDUL_PETA_JAJANAN} {JUDUL_PETA_JAJANAN}
        </p>
        <div className="space-y-1 px-2 pb-1.5">
          {LANGKAH_JAJANAN.map((l, i) => {
            const n = i + 1;
            const terbuka = buka.includes(n);
            return (
              <div key={l.judul} className="grid grid-cols-[4.8rem_1fr] items-center gap-2 rounded-xl border-b-4 border-[#92400E] bg-[#FDE68A] px-1.5 py-0.5">
                <span className="whitespace-nowrap text-[10px] leading-none" aria-hidden="true">
                  {IKON_BARIS[i].repeat(n)}
                </span>
                <button
                  type="button"
                  onClick={() => ketuk(n)}
                  aria-label={terbuka ? `Langkah ${n}: ${l.judul}` : `Label kosong langkah ${n}`}
                  className={`flex min-h-[44px] w-full min-w-0 items-center gap-2 rounded-xl border-[3px] px-2 py-1 text-left font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/80"}`}
                >
                  <span aria-hidden="true" className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm text-white ${terbuka ? "border-[#15803D] bg-[#15803D]" : "border-[#B45309] bg-[#B45309]"}`}>
                    {n}
                  </span>
                  <span className="min-w-0 break-words text-sm">{terbuka ? `${l.ikon} ${l.judul}` : "?"}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_JAJANAN : `Sudah dibuka ${buka.length} dari ${LANGKAH_JAJANAN.length} langkah.`}
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
export { PetaJajanan };
