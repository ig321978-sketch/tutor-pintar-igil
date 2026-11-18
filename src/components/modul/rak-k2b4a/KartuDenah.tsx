"use client";

import React from "react";
import type { Tempat } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import { BARIS_DENAH, KELOMPOK_DENAH, KOLOM_DENAH, SUARA_DENAH, TEMPAT_DENAH } from "./data-peta";

/**
 * Infografis Kelas 2 Bab 4 Sub-Bab A: Kartu Denah Bu Sari. Kertas krem bertepi cokelat berisi tabel; tiap baris satu karya dari Story
 * (guci, kendi, topeng, wayang kertas, boneka kain) dengan tiga kotak kosong: Kata posisi, Kalimat posisi, Kalimat lawannya.
 * Petunjuk salah menyebut baris yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { kata: "Kata posisi", kalimat: "Kalimat posisi", lawan: "Kalimat lawannya" };

export default function KartuDenah({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_DENAH,
    61,
    (l, tujuan) => {
      const asal = TEMPAT_DENAH.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba tempat yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_DENAH[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi barisnya keliru. Label ini milik ${BARIS_DENAH[baris].nama}, bukan ${BARIS_DENAH[barisTujuan].nama}.`;
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-sm border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1D4ED8] bg-[#DBEAFE] text-[#1C01A5] lm-muncul" : "border-dashed border-[#B45309]/70 bg-white/80 text-[#B45309]/60"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[4.2rem_0.9fr_1.25fr_1.3fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_DENAH)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Kartu denah Bu Sari. Tiap baris satu karya. Tempelkan kata posisinya, kalimat posisinya, dan kalimat lawannya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-xl border-[6px] border-[#B45309] bg-[#FEF9C3] p-2 shadow-[0_6px_0_rgba(69,26,3,0.3)]">
        <p className="text-center text-lg font-black text-[#92400E]">
          {"\u{1F4CB}"} Kartu Denah Bu Sari
        </p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
          <span className="text-center text-[10px] font-black text-[#92400E]">Karya</span>
          {KOLOM_DENAH.map((k) => (
            <span key={k} className="rounded-sm bg-[#92400E] px-0.5 text-center text-[10px] font-black leading-tight text-[#FEF9C3]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_DENAH.map((b, i) => (
          <div key={b.nama} className="mb-1.5 rounded-md border-2 border-[#B45309]/70 bg-white/50 p-1">
            <div className={`grid ${KOL} items-center gap-1`}>
              <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#92400E]">
                <span className="text-lg" aria-hidden="true">
                  {b.ikon}
                </span>
                {b.nama}
              </span>
              {[0, 1, 2].map((c) => kotak(TEMPAT_DENAH[i * 3 + c]))}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FEF3C7" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Kartu denah lengkap! Setiap kalimat punya lawannya: benda dan acuan bertukar tempat, dan kata posisinya berganti lawannya." : tp.pesan}
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
