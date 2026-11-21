"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { BELAHAN_SEGIENAM, HASIL_DERET, IKON_JUDUL_PETA, JUDUL_PETA, LANGKAH_MOSAIK, MEJA, PETUNJUK_PETA, SELESAI_PETA } from "./data-peta";
import { WARNA_KEPING } from "./GambarMosaik";
import type { Bidang } from "./logika-cpa";

/**
 * Mind-map Kelas 4 Bab 5 Sub-Bab B "Mosaik Pak Rudi" (rancangan bebas): gambar MEJA KERJA Pak Rudi dengan sebuah mosaik dari keping bangun sungguhan (SVG dari koordinat) di atas papan.
 * Tiga label kosong (?) menempel pada bagian mosaik yang sesuai langkahnya: dua keping yang akan dipasang (Pasang keping), segienam yang dibelah dari titik tengah (Bagi jadi segitiga),
 * dan deret segitiga yang menyusun trapesium (Mosaik banyak cara). Ketuk: judul langkah muncul dan Guru membacakan. Tombol lanjut muncul setelah ketiganya terbuka. Satu layar tanpa gulir.
 */
const LEBAR = 300;
const TINGGI = 160;
const titik = (b: Bidang, k: number, dx: number, dy: number): string => b.map((t) => `${t[0] * k + dx},${t[1] * k + dy}`).join(" ");
/** Posisi label pada gambar (persen dari lebar dan tinggi gambar), satu untuk tiap langkah. */
const POSISI = [
  { x: 16, y: 21 },
  { x: 62, y: 17 },
  { x: 82, y: 17 },
];

export default function PetaMosaikK4B5({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const [terakhir, setTerakhir] = useState(-1);
  const selesai = buka.length === LANGKAH_MOSAIK.length;
  const ketuk = (i: number) => {
    speakGuru(LANGKAH_MOSAIK[i].arti);
    setTerakhir(i);
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };
  return (
    <div className="space-y-3" data-uji="meja-mosaik">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA}</p>
      </div>

      <div className="mx-auto w-full max-w-md rounded-2xl border-[6px] border-[#78350F] bg-[#FDE68A] p-2 shadow-[0_6px_0_rgba(0,0,0,0.25)]">
        <p className="mb-2 rounded-lg bg-[#78350F] py-1 text-center text-sm font-black text-[#FDE68A]">
          {IKON_JUDUL_PETA} {JUDUL_PETA}
        </p>
        <div className="relative">
          <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} className="block w-full" role="img" aria-label="meja kerja dengan mosaik: dua keping segitiga, segienam dibelah enam segitiga, dan deret tiga segitiga" data-segitiga-segienam={BELAHAN_SEGIENAM.length} data-segitiga-deret={MEJA.deret.length}>
            <rect x={6} y={6} width={288} height={116} rx={8} fill="#FEF3C7" stroke="#B45309" strokeWidth={3} />
            {/* Dua keping yang akan dipasang: sisi miring saling berhadapan. */}
            {MEJA.keping.map((p, i) => (
              <polygon key={`k${i}`} points={titik(p, 14, 26 + (i === 0 ? -3 : 3), 52 + (i === 0 ? 3 : -3))} fill={WARNA_KEPING[i * 3]} stroke="#92400E" strokeWidth={2.4} strokeLinejoin="round" />
            ))}
            {/* Segienam beraturan dibelah dari titik tengah. */}
            {BELAHAN_SEGIENAM.map((p, i) => (
              <polygon key={`h${i}`} points={titik(p, 40, 150, 66)} fill={WARNA_KEPING[i % WARNA_KEPING.length]} stroke="#92400E" strokeWidth={2} strokeLinejoin="round" />
            ))}
            {/* Deret tiga segitiga sama sisi menyusun trapesium. */}
            {MEJA.deret.map((p, i) => (
              <polygon key={`d${i}`} points={titik(p, 17, 212, 46)} fill={WARNA_KEPING[(i * 2 + 1) % WARNA_KEPING.length]} stroke="#92400E" strokeWidth={2} strokeLinejoin="round" />
            ))}
            <polygon points={titik(HASIL_DERET, 17, 212, 46)} fill="none" stroke="#7C2D12" strokeWidth={1.4} strokeDasharray="4 3" />
            {/* Meja: papan atas, kaki, dan palu karet. */}
            <rect x={0} y={122} width={300} height={16} fill="#B45309" />
            <rect x={14} y={138} width={12} height={22} fill="#78350F" />
            <rect x={274} y={138} width={12} height={22} fill="#78350F" />
            <rect x={206} y={110} width={30} height={8} rx={2} fill="#F59E0B" stroke="#92400E" strokeWidth={1.5} />
          </svg>
          {LANGKAH_MOSAIK.map((l, i) => {
            const terbuka = buka.includes(i);
            return (
              <button
                key={l.judul}
                type="button"
                onClick={() => ketuk(i)}
                aria-label={terbuka ? `Langkah ${i + 1}: ${l.judul}` : `Langkah ${i + 1} belum dibuka`}
                className={`absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] text-lg font-black ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0] text-[#14532D]" : "border-dashed border-[#B45309] bg-white/90 text-[#B45309]"}`}
                style={{ left: `${POSISI[i].x}%`, top: `${POSISI[i].y}%` }}
                data-langkah={i + 1}
              >
                {terbuka ? i + 1 : "?"}
              </button>
            );
          })}
        </div>
        <div className="mt-2 space-y-1">
          {LANGKAH_MOSAIK.map((l, i) => {
            const terbuka = buka.includes(i);
            return (
              <button
                key={l.judul}
                type="button"
                onClick={() => ketuk(i)}
                className={`flex min-h-[44px] w-full items-center gap-2 rounded-xl border-[3px] px-2 py-1 text-left text-sm font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/80"}`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#B45309] bg-white text-xs">{i + 1}</span>
                <span className="min-w-0 break-words">{terbuka ? `${l.ikon} ${l.judul}` : "?"}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[2.5rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA : terakhir >= 0 ? `Sudah dibuka ${buka.length} dari ${LANGKAH_MOSAIK.length} langkah.` : "Ketuk tanda tanya di meja untuk membuka langkah."}
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

export { PetaMosaikK4B5 };
