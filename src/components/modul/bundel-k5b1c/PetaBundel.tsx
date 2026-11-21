"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_JUDUL_PETA_BUNDEL, JUDUL_PETA_BUNDEL, LANGKAH_BUNDEL, PETUNJUK_PETA_BUNDEL, SELESAI_PETA_BUNDEL } from "./data-kartu";

/**
 * Mind-map Kelas 5 Bab 1 Sub-Bab C "Bundel Tiket Bu Lestari": gambar rak gudang tiket bertingkat (rangka kayu, palang kuning-hitam) dengan empat rak,
 * tiap rak menyimpan tiga bundel (kardus, dus, pak, ikat) dan satu label kosong. Anak mengetuk label, judul langkah muncul dan dibacakan Guru.
 * Anak tidak membuat konsep; konsep diberitahukan. Satu layar tanpa gulir (kisi tetap).
 */
const WARNA = [
  { isi: "#B45309", garis: "#7C2D12", w: 22, h: 22 },
  { isi: "#F59E0B", garis: "#B45309", w: 18, h: 18 },
  { isi: "#FDE047", garis: "#A16207", w: 16, h: 13 },
  { isi: "#FB923C", garis: "#C2410C", w: 13, h: 10 },
];

/** Tiga bundel sejenis di atas papan rak. Ukuran bundel mengecil dari kardus sampai ikat. */
function Bundelan({ ke }: { ke: number }) {
  const c = WARNA[ke];
  return (
    <svg viewBox="0 0 70 34" className="block h-[34px] w-[70px]" role="img" aria-label={`Tiga ${["kardus", "dus", "pak", "ikat"][ke]} di rak`} data-bundelan={ke}>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={4 + i * 21 + (22 - c.w) / 2} y={30 - c.h} width={c.w} height={c.h} rx={2.5} fill={c.isi} stroke={c.garis} strokeWidth={1.6} />
          {ke <= 1 ? <rect x={4 + i * 21 + 11 - 1.5} y={30 - c.h} width={3} height={c.h} fill={c.garis} fillOpacity={0.45} /> : null}
          {ke === 3 ? <line x1={4 + i * 21 + (22 - c.w) / 2} y1={30 - c.h / 2} x2={4 + i * 21 + (22 + c.w) / 2} y2={30 - c.h / 2} stroke={c.garis} strokeWidth={1.4} /> : null}
        </g>
      ))}
      <rect x={0} y={30} width={70} height={4} rx={1} fill="#92400E" />
    </svg>
  );
}

export default function PetaBundel({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_BUNDEL.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_BUNDEL[n - 1].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_BUNDEL)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_BUNDEL}</p>
      </div>

      <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border-[6px] border-[#78350F] bg-[#FEF3C7] shadow-[0_6px_0_rgba(0,0,0,0.25)]" data-rupa="rak">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#FACC15 0 15px,#1F2937 15px 30px)" }} aria-hidden="true" />
        <p className="my-0.5 text-center text-sm font-black text-[#78350F]">
          {IKON_JUDUL_PETA_BUNDEL} {JUDUL_PETA_BUNDEL}
        </p>
        <div className="space-y-1 px-2 pb-1.5">
          {LANGKAH_BUNDEL.map((l, i) => {
            const n = i + 1;
            const terbuka = buka.includes(n);
            return (
              <div key={l.judul} className="grid grid-cols-[4.6rem_1fr] items-end gap-2 rounded-lg border-x-4 border-[#92400E] bg-[#FDE68A] px-1.5 pt-1">
                <Bundelan ke={i} />
                <button
                  type="button"
                  onClick={() => ketuk(n)}
                  aria-label={terbuka ? `Langkah ${n}: ${l.judul}` : `Label kosong langkah ${n}`}
                  className={`mb-1 flex min-h-[44px] w-full min-w-0 items-center gap-2 rounded-xl border-[3px] px-2 py-1 text-left font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/80"}`}
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
        {selesai ? SELESAI_PETA_BUNDEL : `Sudah dibuka ${buka.length} dari ${LANGKAH_BUNDEL.length} langkah.`}
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
export { PetaBundel };
