"use client";

import React from "react";
import { cocokKelompok, kelompokLabel, type Label, type Tempat } from "./logika";
import { KELOMPOK_POHON, PETUNJUK_URUTAN, PUSAT_POHON, SUARA_POHON, TEMPAT_POHON } from "./data";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel, type GayaLabel } from "./ui";

/**
 * Mind-map Kelas 1 Bab 1 Sub-Bab A: Pohon Menghitung. Akar = Masalah, daun = Penyelesaian, buah = Hasil (hanya poin pelajaran matematika).
 * Tempat kosong dan label memakai warna kelompok yang sama (cokelat, hijau, merah) ditambah ikon, jadi anak cukup mencocokkan warna.
 * Label sekelompok boleh ditempel di tempat kosong mana pun yang sewarna, KECUALI langkah penyelesaian (daun) yang berurutan dan bernomor:
 * hanya cocok di nomornya. Salah warna: guru menyebut warna yang benar. Warna benar tetapi salah nomor: guru mengingatkan urutan.
 */

/** Letak tengah tiap tempat dalam persen (x, y) dan lebarnya. */
const LETAK: Record<string, { x: number; y: number; w: number }> = {
  "buah-1": { x: 18, y: 8, w: 31 },
  "buah-2": { x: 50, y: 8, w: 31 },
  "buah-3": { x: 82, y: 8, w: 31 },
  "daun-1": { x: 21, y: 24, w: 39 },
  "daun-2": { x: 79, y: 24, w: 39 },
  "daun-3": { x: 21, y: 36, w: 39 },
  "daun-4": { x: 79, y: 36, w: 39 },
  "daun-5": { x: 21, y: 48, w: 39 },
  "daun-6": { x: 79, y: 48, w: 39 },
  "akar-1": { x: 18, y: 88, w: 31 },
  "akar-2": { x: 50, y: 88, w: 31 },
  "akar-3": { x: 82, y: 88, w: 31 },
};

/** Warna tiap kelompok: garis, isi tempat kosong (muda), dan isi label atau tempat yang sudah terisi (tua). */
const WARNA: Record<string, { garis: string; muda: string; tua: string }> = {
  masalah: { garis: "#B45309", muda: "#FDEBD0", tua: "#F8CF94" },
  metode: { garis: "#15803D", muda: "#DCFCE7", tua: "#86EFAC" },
  hasil: { garis: "#B91C1C", muda: "#FEE2E2", tua: "#FCA5A5" },
};
const KELOMPOK_PETUNJUK = Object.fromEntries(Object.entries(KELOMPOK_POHON).map(([k, v]) => [k, v.petunjuk]));

export default function PetaPohon({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_POHON,
    11,
    (l: Label, t: Tempat) =>
      t.urutan !== undefined && kelompokLabel(TEMPAT_POHON, l) === t.kelompok
        ? PETUNJUK_URUTAN
        : (KELOMPOK_PETUNJUK[kelompokLabel(TEMPAT_POHON, l) ?? ""] ?? "Cocokkan warna label dengan warna tempatnya."),
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_POHON, t, l),
  );

  const gayaLabel = (l: Label): GayaLabel | undefined => {
    const k = kelompokLabel(TEMPAT_POHON, l);
    return k ? { isi: WARNA[k].tua, garis: WARNA[k].garis, ikon: KELOMPOK_POHON[k].ikon } : undefined;
  };

  const slot = (t: Tempat) => {
    const p = LETAK[t.id];
    const w = WARNA[t.kelompok];
    const k = KELOMPOK_POHON[t.kelompok];
    const teks = tp.teksDi(t);
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={
          teks
            ? `${t.urutan !== undefined ? `Langkah ${t.urutan}` : k.nama}: ${teks}`
            : t.urutan !== undefined
              ? `Tempat kosong berwarna ${k.warna}, ${k.nama}, langkah ${t.urutan}, di ${k.letak}`
              : `Tempat kosong berwarna ${k.warna}, ${k.nama}, di ${k.letak}`
        }
        className="absolute"
        style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}%`, transform: "translate(-50%, -50%)" }}
      >
        <span
          className={`flex min-h-[46px] w-full items-center justify-center gap-1 rounded-2xl border-[3px] px-1.5 py-1 text-center text-[11px] font-black leading-tight text-[#1C01A5] sm:text-sm ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
          style={{ borderColor: w.garis, background: teks ? w.tua : w.muda }}
        >
          {t.urutan !== undefined ? (
            <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-black text-white sm:h-7 sm:w-7 sm:text-sm" style={{ borderColor: w.garis, background: w.garis }}>
              {t.urutan}
            </span>
          ) : (
            <span aria-hidden="true">{k.ikon}</span>
          )}
          <span>{teks ?? (t.urutan !== undefined ? "? Langkah" : `? ${k.nama}`)}</span>
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
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold leading-snug text-[#1C01A5]">Ketuk label, lalu ketuk tempat kosong yang warnanya sama.</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5" aria-label="Arti warna">
            {Object.entries(KELOMPOK_POHON).map(([kode, k]) => (
              <li key={kode} className="rounded-full border-[3px] px-2 py-0.5 text-xs font-black text-[#1C01A5]" style={{ borderColor: WARNA[kode].garis, background: WARNA[kode].tua }}>
                {k.ikon} {k.nama} = {k.letak}
                {kode === "metode" ? " (berurutan 1, 2, 3...)" : ""}
              </li>
            ))}
          </ul>
        </div>
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
          <path d="M50 22 L50 11 M50 18 L22 10 M50 18 L78 10" stroke="#92400E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <rect x="44.5" y="18" width="11" height="56" rx="3" fill="#B45309" />
          <g stroke="#92400E" strokeWidth="1.6" fill="none" strokeLinecap="round">
            <path d="M48 74 Q40 86 27 98" />
            <path d="M52 74 Q60 86 73 98" />
            <path d="M50 74 L50 92" />
          </g>
        </svg>
        <div className="absolute left-1/2 top-[63%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-xl border-[3px] border-[#78350F] bg-[#FDE68A] px-1 py-1 text-center text-[11px] font-black leading-tight text-[#78350F] sm:text-sm">
          {PUSAT_POHON}
        </div>
        {TEMPAT_POHON.map(slot)}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} gaya={gayaLabel} />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Pohon lengkap! Masalah, penyelesaian, dan hasilnya sudah di tempat yang sewarna." : tp.pesan}
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
