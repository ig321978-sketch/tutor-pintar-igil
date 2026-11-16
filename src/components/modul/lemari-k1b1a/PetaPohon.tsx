"use client";

import React from "react";
import type { Tempat } from "./logika";
import { KELOMPOK_POHON, PUSAT_POHON, SUARA_POHON, TEMPAT_POHON } from "./data";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "./ui";

/**
 * Mind-map Kelas 1 Bab 1 Sub-Bab A: Pohon Cerita. Akar = masalah, daun cabang = cara, buah = hasil.
 * Semua tempat kosong; anak mengetuk label lalu mengetuk tempat. Salah: tempat bergoyang dan guru menyebut letak yang benar.
 */

/** Letak tengah tiap tempat dalam persen (x, y) dan lebarnya. */
const LETAK: Record<string, { x: number; y: number; w: number }> = {
  "buah-1": { x: 18, y: 7, w: 31 },
  "buah-2": { x: 50, y: 7, w: 31 },
  "buah-3": { x: 82, y: 7, w: 31 },
  "daun-1": { x: 21, y: 24, w: 39 },
  "daun-2": { x: 79, y: 24, w: 39 },
  "daun-3": { x: 21, y: 36, w: 39 },
  "daun-4": { x: 79, y: 36, w: 39 },
  "daun-5": { x: 21, y: 48, w: 39 },
  "daun-6": { x: 79, y: 48, w: 39 },
  "akar-1": { x: 26, y: 86, w: 44 },
  "akar-2": { x: 74, y: 86, w: 44 },
};
const GAYA: Record<string, { kosong: string; isi: string; ikon: string }> = {
  masalah: { kosong: "border-[#92400E] bg-[#FDE7C8]/80", isi: "border-[#92400E] bg-[#F5D7A1]", ikon: "\u{1F331}" },
  metode: { kosong: "border-[#15803D] bg-[#DCFCE7]/80", isi: "border-[#15803D] bg-[#BBF7D0]", ikon: "\u{1F343}" },
  hasil: { kosong: "border-[#B91C1C] bg-[#FEE2E2]/80", isi: "border-[#B91C1C] bg-[#FECACA]", ikon: "\u{1F34E}" },
};
const KELOMPOK_PETUNJUK = Object.fromEntries(Object.entries(KELOMPOK_POHON).map(([k, v]) => [k, v.petunjuk]));

export default function PetaPohon({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_POHON,
    11,
    (l) => {
      const t = TEMPAT_POHON.find((x) => x.kunci === l.teks);
      return t ? KELOMPOK_PETUNJUK[t.kelompok] : "Coba tempat yang lain.";
    },
    speakGuru,
  );

  const slot = (t: Tempat) => {
    const p = LETAK[t.id];
    const g = GAYA[t.kelompok];
    const teks = tp.teksDi(t);
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ? `${KELOMPOK_POHON[t.kelompok].nama}: ${teks}` : `Tempat kosong ${KELOMPOK_POHON[t.kelompok].nama} di ${KELOMPOK_POHON[t.kelompok].letak}`}
        className="absolute"
        style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}%`, transform: "translate(-50%, -50%)" }}
      >
        <span className={`flex min-h-[42px] w-full items-center justify-center gap-1 rounded-2xl border-[3px] px-1.5 py-1 text-center text-[11px] font-black leading-tight text-[#1C01A5] sm:text-xs ${teks ? `${g.isi} lm-muncul` : `${g.kosong} border-dashed`} ${tp.goyang === t.id ? "lm-goyang" : ""}`}>
          <span aria-hidden="true">{g.ikon}</span>
          <span>{teks ?? "?"}</span>
        </span>
      </button>
    );
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_POHON)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">
          Pohon cerita Igil: <b>akar</b> = masalah, <b>daun cabang</b> = cara, <b>buah</b> = hasil. Ketuk label, lalu ketuk tempatnya.
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border-4 border-[#1C01A5] bg-gradient-to-b from-[#E0F2FE] via-[#F0FDF4] to-[#FEF3C7]" style={{ aspectRatio: "100 / 120" }}>
        <svg viewBox="0 0 100 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <ellipse cx="50" cy="34" rx="49" ry="31" fill="#86EFAC" opacity="0.45" />
          <rect x="0" y="72" width="100" height="48" fill="#E7C9A0" opacity="0.6" />
          <line x1="0" y1="72" x2="100" y2="72" stroke="#92400E" strokeWidth="0.8" />
          {[29, 43, 58].map((y) => (
            <g key={y} stroke="#92400E" strokeWidth="2" strokeLinecap="round" fill="none">
              <path d={`M50 ${y + 6} Q42 ${y + 2} 38 ${y}`} />
              <path d={`M50 ${y + 6} Q58 ${y + 2} 62 ${y}`} />
            </g>
          ))}
          <path d="M50 22 L50 10 M50 18 L22 9 M50 18 L78 9" stroke="#92400E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <rect x="44.5" y="18" width="11" height="56" rx="3" fill="#B45309" />
          <g stroke="#92400E" strokeWidth="1.6" fill="none" strokeLinecap="round">
            <path d="M48 74 Q40 86 27 98" />
            <path d="M52 74 Q60 86 73 98" />
            <path d="M50 74 L50 92" />
          </g>
        </svg>
        <div className="absolute left-1/2 top-[63%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-xl border-[3px] border-[#78350F] bg-[#FDE68A] px-1 py-1 text-center text-[11px] font-black leading-tight text-[#78350F] sm:text-xs">
          {"\u{1F9F8}"} {PUSAT_POHON}
        </div>
        {TEMPAT_POHON.map(slot)}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Pohon cerita lengkap! Masalah, cara, dan hasilnya sudah cocok." : tp.pesan}
      </p>
      {tp.selesai ? (
        <div className="flex justify-center">
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        </div>
      ) : null}
    </div>
  );
}
