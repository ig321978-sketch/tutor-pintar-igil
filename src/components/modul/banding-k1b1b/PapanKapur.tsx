"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_PAPAN, EMOJI, KELOMPOK_PAPAN, KOLOM_PAPAN, SUARA_PAPAN, TEMPAT_PAPAN } from "./data";

/**
 * Infografis Kelas 1 Bab 1 Sub-Bab B: Papan Kapur Banding. Tabel data berbingkai kayu dengan permukaan hijau;
 * tiap baris satu perbandingan dari Story (benda sudah digambar), tiga petak kosong per baris: Angka, Cara, Hasil.
 */
export default function PapanKapur({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PAPAN,
    41,
    (l) => {
      const t = TEMPAT_PAPAN.find((x) => x.kunci === l.teks);
      return t ? KELOMPOK_PAPAN[t.kelompok] : "Coba petak yang lain.";
    },
    speakGuru,
  );

  const petak = (t: Tempat) => {
    const teks = tp.teksDi(t);
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Petak kosong kolom ${t.kelompok === "angka" ? "Angka" : t.kelompok === "cara" ? "Cara" : "Hasil"}`}
        className={`flex min-h-[44px] items-center justify-center rounded-md border-2 px-1 text-center font-black leading-tight ${t.kelompok === "angka" ? "text-base" : "text-[11px] sm:text-xs"} ${teks ? "border-transparent text-white lm-muncul" : "border-dashed border-white/50 text-white/50"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ fontFamily: "'Comic Sans MS','Chalkboard SE',cursive", textShadow: teks ? "0 0 2px rgba(255,255,255,0.6)" : undefined, color: teks && t.kelompok === "angka" ? "#FDE68A" : undefined }}
      >
        {teks ?? "..."}
      </button>
    );
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_PAPAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Papan kapur catatan banding. Tiap baris satu perbandingan dari cerita. Tempelkan angka, cara, dan hasilnya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[10px] border-[#8B5A2B] bg-[#14532D] p-2 shadow-[inset_0_0_30px_rgba(0,0,0,0.45),0_6px_0_rgba(80,45,10,0.5)]">
        <div className="mb-1 grid grid-cols-[3.6rem_0.9fr_1.1fr_1.2fr] gap-1 border-b-2 border-white/60 pb-1">
          <span className="text-center text-[11px] font-black text-[#FDE68A]">Benda</span>
          {KOLOM_PAPAN.map((k) => (
            <span key={k} className="text-center text-[11px] font-black text-[#FDE68A]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_PAPAN.map((b, i) => (
          <div key={i} className="grid grid-cols-[3.6rem_0.9fr_1.1fr_1.2fr] items-center gap-1 border-b border-dashed border-white/25 py-1 last:border-b-0">
            <span className="text-center text-xl leading-none" aria-label={`${b.benda[0]} dan ${b.benda[1]}`}>
              {EMOJI[b.benda[0]]}
              {b.benda[1] !== b.benda[0] ? EMOJI[b.benda[1]] : ""}
            </span>
            {petak(TEMPAT_PAPAN[i * 3])}
            {petak(TEMPAT_PAPAN[i * 3 + 1])}
            {petak(TEMPAT_PAPAN[i * 3 + 2])}
          </div>
        ))}
        <div aria-hidden="true" className="mt-1 flex justify-end gap-1">
          <span className="h-2 w-8 rounded-sm bg-white/90" />
          <span className="h-2 w-6 rounded-sm bg-[#FDE68A]" />
        </div>
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#ECFDF5" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Papan kapur lengkap! Nol paling sedikit, tanpa sisa berarti sama banyak." : tp.pesan}
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
