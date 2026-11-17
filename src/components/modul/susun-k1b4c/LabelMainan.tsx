"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_LABEL, EMOJI_LABEL, KELOMPOK_LABEL, KOLOM_LABEL, SUARA_LABEL, TEMPAT_LABEL } from "./data";

/**
 * Infografis Kelas 1 Bab 4 Sub-Bab C: Label Gantung Mainan. Tiap baris adalah label karton manila bertali dengan lubang bercincin,
 * satu mainan dari Story (kereta, perahu tangram, pohon balok pola, rumah lidi), berisi tiga kotak kosong: Kalimat, Banyak, Diurai.
 */
const NAMA_KOLOM: Record<string, string> = { kalimat: "Kalimat", banyak: "Banyak", urai: "Diurai" };

export default function LabelMainan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_LABEL,
    71,
    (l) => {
      const t = TEMPAT_LABEL.find((x) => x.kunci === l.teks);
      return t ? KELOMPOK_LABEL[t.kelompok] : "Coba tempat yang lain.";
    },
    speakGuru,
  );
  const kotak = (t: Tempat) => {
    const teks = tp.teksDi(t);
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Kotak kosong kolom ${NAMA_KOLOM[t.kelompok]}`}
        className={`flex min-h-[44px] w-full items-center justify-center rounded-md border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#A16207] bg-[#FEF9C3] text-[#A16207]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[4.6rem_1.3fr_1fr_1.1fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_LABEL)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Label gantung mainan festival. Tiap label satu mainan. Tempelkan kalimat tambah, banyak bagian, dan hasil saat diurai.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-3xl border-4 border-[#1E3A8A] bg-[#DBEAFE] p-2.5">
        <p className="text-center text-lg font-black text-[#1E3A8A]">{"\u{1F3F7}\u{FE0F}"} Label Mainan Festival</p>
        <div className="relative mb-1 mt-1 h-2" aria-hidden="true">
          <div className="absolute inset-x-2 top-0.5 h-1 rounded-full bg-[#78350F]" />
        </div>
        <div className={`mb-1 grid ${KOL} gap-1 pl-6`}>
          <span className="text-center text-[10px] font-black text-[#1E3A8A]">Mainan</span>
          {KOLOM_LABEL.map((k) => (
            <span key={k} className="rounded-md bg-[#1E3A8A] text-center text-[10px] font-black text-[#FDE68A]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_LABEL.map((b, i) => (
          <div key={b.nama} className="mb-1.5 flex items-stretch">
            {/* Tali dan lubang bercincin */}
            <div className="flex w-6 shrink-0 items-center" aria-hidden="true">
              <span className="h-0.5 w-3 bg-[#78350F]" />
              <span className="h-3 w-3 rounded-full border-[3px] border-[#94A3B8] bg-[#DBEAFE]" />
            </div>
            <div className={`grid flex-1 ${KOL} items-center gap-1 border-2 border-[#A16207] bg-[#FDE68A] p-1`} style={{ clipPath: "polygon(10px 0,100% 0,100% 100%,10px 100%,0 50%)" }}>
              <span className="flex flex-col items-center pl-2 text-[10px] font-black text-[#78350F]">
                <span className="text-xl" aria-hidden="true">
                  {EMOJI_LABEL[b.jenis]}
                </span>
                {b.nama}
                <span className="text-[9px] font-bold">{b.cara}</span>
              </span>
              {[0, 1, 2].map((c) => kotak(TEMPAT_LABEL[i * 3 + c]))}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#DBEAFE" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Label mainan lengkap! Menyusun menambah bagian, mengurai mengurangi bagian." : tp.pesan}
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
