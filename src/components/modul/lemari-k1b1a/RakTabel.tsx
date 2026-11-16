"use client";

import React from "react";
import type { Tempat } from "./logika";
import { BARIS_RAK, EMOJI, KELOMPOK_RAK, KOLOM_RAK, NAMA, SUARA_RAK, TEMPAT_RAK } from "./data";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "./ui";

/**
 * Infografis Kelas 1 Bab 1 Sub-Bab A: Rak Catatan. Tabel data berbentuk lemari kayu; tiap papan rak satu baris
 * (mainan dari Story), tiga stiker kosong per baris: cara menghitung, lambang angka, dan nama angka.
 */
export default function RakTabel({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_RAK,
    23,
    (l) => {
      const t = TEMPAT_RAK.find((x) => x.kunci === l.teks);
      return t ? KELOMPOK_RAK[t.kelompok] : "Coba papan rak yang lain.";
    },
    speakGuru,
  );

  const stiker = (t: Tempat, warna: string) => {
    const teks = tp.teksDi(t);
    const angka = t.kelompok === "angka";
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ? teks : `Stiker kosong kolom ${t.kelompok === "cara" ? "Cara" : t.kelompok === "angka" ? "Angka" : "Dibaca"}`}
        className={`flex min-h-[46px] items-center justify-center rounded-lg border-[3px] px-1 text-center font-black leading-tight text-[#1C01A5] shadow-[0_2px_0_rgba(120,53,15,0.35)] ${angka ? "text-xl" : "text-[11px] sm:text-xs"} ${teks ? `border-[#1C01A5] lm-muncul` : "border-dashed border-[#78350F]/60"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? warna : "rgba(255,255,255,0.55)" }}
      >
        {teks ?? "?"}
      </button>
    );
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_RAK)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Rak catatan mainan Igil. Tiap papan rak satu baris data. Tempelkan cara menghitung, angkanya, dan cara membacanya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-[1.4rem] border-[6px] border-[#78350F] bg-[#C08A4E] p-2 shadow-[0_6px_0_rgba(120,53,15,0.45)]">
        <div className="mb-1 grid grid-cols-[3.4rem_1.5fr_0.8fr_1fr] gap-1.5 px-1">
          <span className="rounded-md bg-[#78350F] py-1 text-center text-[11px] font-black text-[#FDE68A]">Mainan</span>
          {KOLOM_RAK.map((k) => (
            <span key={k} className="rounded-md bg-[#78350F] py-1 text-center text-[11px] font-black text-[#FDE68A]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_RAK.map((b, i) => (
          <div key={b.jenis} className="grid grid-cols-[3.4rem_1.5fr_0.8fr_1fr] items-center gap-1.5 border-b-[6px] border-[#78350F] bg-[#E8C48F] px-1 py-1.5 first:rounded-t-xl last:rounded-b-xl last:border-b-0">
            <div className="flex flex-col items-center leading-none">
              <span className="text-3xl" aria-hidden="true">
                {EMOJI[b.jenis]}
              </span>
              <span className="mt-0.5 text-[10px] font-black text-[#78350F]">{NAMA[b.jenis]}</span>
            </div>
            {stiker(TEMPAT_RAK[i * 3], "#BBF7D0")}
            {stiker(TEMPAT_RAK[i * 3 + 1], "#FFE566")}
            {stiker(TEMPAT_RAK[i * 3 + 2], "#BFDBFE")}
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FDF2E9" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Rak catatan lengkap! Kereta nol karena kotaknya kosong." : tp.pesan}
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
