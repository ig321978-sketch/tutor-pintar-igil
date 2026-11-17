"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_MENU, EMOJI, KELOMPOK_MENU, KOLOM_MENU, SUARA_MENU, TEMPAT_MENU } from "./data";

/**
 * Infografis Kelas 1 Bab 1 Sub-Bab D: Kartu Menu Pesta. Tabel data berbentuk kartu menu berbingkai pita; tiap baris satu benda
 * pesta dari Story, tiga titik kosong bergaya garis menu: Utuh, Bagian, Cara.
 */
export default function KartuMenu({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_MENU,
    83,
    (l) => {
      const t = TEMPAT_MENU.find((x) => x.kunci === l.teks);
      return t ? KELOMPOK_MENU[t.kelompok] : "Coba tempat yang lain.";
    },
    speakGuru,
  );
  const isian = (t: Tempat) => {
    const teks = tp.teksDi(t);
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Isian kosong kolom ${t.kelompok === "utuh" ? "Utuh" : t.kelompok === "bagian" ? "Bagian" : "Cara"}`}
        className={`flex min-h-[40px] items-center justify-center border-b-2 px-1 text-center font-black leading-tight ${t.kelompok === "utuh" ? "text-lg text-[#BE185D]" : "text-[11px] text-[#1C01A5] sm:text-xs"} ${teks ? "border-solid border-[#BE185D] lm-muncul" : "border-dotted border-[#9CA3AF] text-[#9CA3AF]"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {teks ?? "..."}
      </button>
    );
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_MENU)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Kartu menu pesta. Tiap baris satu benda pesta dari cerita. Tempelkan utuhnya, bagian-bagiannya, dan caranya.</p>
      </div>

      <div className="relative mx-auto w-full max-w-xl rounded-2xl border-[3px] border-[#BE185D] bg-[#FFFBF5] p-3 shadow-[0_6px_18px_rgba(190,24,93,0.2)]" style={{ outline: "6px double #F9A8D4", outlineOffset: "-12px" }}>
        <p className="text-center text-lg font-black text-[#BE185D]" style={{ fontFamily: "Georgia, serif" }}>
          {"\u{1F380}"} Menu Pesta Rumah Rapi {"\u{1F380}"}
        </p>
        <div className="mb-1 mt-2 grid grid-cols-[4.6rem_0.7fr_1.3fr_1.1fr] gap-1.5 border-b-2 border-[#BE185D] pb-1">
          <span className="text-center text-[11px] font-black italic text-[#BE185D]">Benda</span>
          {KOLOM_MENU.map((k) => (
            <span key={k} className="text-center text-[11px] font-black italic text-[#BE185D]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_MENU.map((b, i) => (
          <div key={b.nama} className="grid grid-cols-[4.6rem_0.7fr_1.3fr_1.1fr] items-end gap-1.5 py-1">
            <span className="flex flex-col items-center text-[10px] font-black text-[#1C01A5]">
              <span className="text-xl" aria-hidden="true">
                {EMOJI[b.benda]}
              </span>
              {b.nama}
            </span>
            {isian(TEMPAT_MENU[i * 3])}
            {isian(TEMPAT_MENU[i * 3 + 1])}
            {isian(TEMPAT_MENU[i * 3 + 2])}
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FFF1F2" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Kartu menu lengkap! Dua bagian digabung selalu menjadi utuh." : tp.pesan}
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
