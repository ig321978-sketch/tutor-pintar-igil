"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_JUDUL_PETA_TRIBUN, JUDUL_PETA_TRIBUN, LANGKAH_TRIBUN, PETUNJUK_PETA_TRIBUN, SELESAI_PETA_TRIBUN } from "./data-kartu";

/**
 * Mind-map Kelas 5 Bab 1 Sub-Bab A "Tiket Tribun Bu Ningsih": papan angka Stadion Kota (dua tiang lampu sorot, papan hijau tua dengan angka kuning di kotak tempat)
 * di atas tribun bertangga. Lima anak tangga, tiap anak tangga punya satu tiket label kosong. Anak mengetuk tiket, judul langkah muncul dan dibacakan Guru.
 * Anak tidak membuat konsep; konsep diberitahukan. Satu layar tanpa gulir (kisi tetap).
 */
/** Angka papan (dari kiri): lima kotak tempat; titik pemisah dipasang di antara kotak kedua dan ketiga. */
const ANGKA_PAPAN = ["2", "4", "3", "5", "0"];

function PapanStadion() {
  return (
    <svg viewBox="0 0 300 100" className="block h-auto w-full" role="img" aria-label="Papan angka Stadion Kota dengan dua tiang lampu sorot">
      <rect x={0} y={0} width={300} height={100} fill="#BFDBFE" />
      {[14, 286].map((x) => (
        <g key={x}>
          <rect x={x - 3} y={22} width={6} height={64} fill="#64748B" />
          <rect x={x - 12} y={8} width={24} height={14} rx={3} fill="#1E293B" />
          {[-7, 0, 7].map((d) => (
            <circle key={d} cx={x + d} cy={15} r={2.6} fill="#FEF08A" />
          ))}
        </g>
      ))}
      <rect x={42} y={14} width={216} height={64} rx={6} fill="#14532D" stroke="#451A03" strokeWidth={4} />
      <text x={150} y={30} textAnchor="middle" fontSize={11} fontWeight={900} fill="#FEF9C3">
        {"⚽ STADION KOTA"}
      </text>
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 64 + i * 34 + (i >= 2 ? 8 : 0);
        const angka = ANGKA_PAPAN[i];
        return (
          <g key={i}>
            <rect x={x} y={38} width={30} height={34} rx={4} fill="#FEF9C3" stroke="#B45309" strokeWidth={2} />
            <text x={x + 15} y={64} textAnchor="middle" fontSize={24} fontWeight={900} fill="#14532D">
              {angka}
            </text>
          </g>
        );
      })}
      <circle cx={64 + 2 * 34 + 2} cy={69} r={3.4} fill="#B91C1C" />
      <rect x={0} y={86} width={300} height={14} fill="#16A34A" />
    </svg>
  );
}

export default function PetaTribun({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_TRIBUN.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_TRIBUN[n - 1].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_TRIBUN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_TRIBUN}</p>
      </div>

      <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border-[6px] border-[#1D4ED8] bg-[#E2E8F0] shadow-[0_6px_0_rgba(0,0,0,0.25)]" data-rupa="tribun">
        <PapanStadion />
        <p className="mt-1 text-center text-sm font-black text-[#1E3A8A]">
          {IKON_JUDUL_PETA_TRIBUN} {JUDUL_PETA_TRIBUN}
        </p>
        <div className="space-y-1 px-1.5 pb-1.5 pt-1">
          {LANGKAH_TRIBUN.map((l, i) => {
            const n = i + 1;
            const terbuka = buka.includes(n);
            return (
              <div key={l.judul} className="rounded-sm border-b-4 border-[#64748B] bg-[#CBD5E1]" style={{ marginLeft: i * 9 }}>
                <button
                  type="button"
                  onClick={() => ketuk(n)}
                  aria-label={terbuka ? `Langkah ${n}: ${l.judul}` : `Tiket kosong langkah ${n}`}
                  className={`flex min-h-[44px] w-full min-w-0 items-center gap-2 rounded-lg border-[3px] px-2 py-1 text-left font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#1D4ED8] bg-[#FEF9C3]"}`}
                >
                  <span aria-hidden="true" className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm text-white ${terbuka ? "border-[#15803D] bg-[#15803D]" : "border-[#1D4ED8] bg-[#1D4ED8]"}`}>
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
        {selesai ? SELESAI_PETA_TRIBUN : `Sudah dibuka ${buka.length} dari ${LANGKAH_TRIBUN.length} langkah.`}
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
export { PetaTribun };
