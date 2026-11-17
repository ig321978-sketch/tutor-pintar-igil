"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_RESEP, EMOJI, KELOMPOK_RESEP, KOLOM_RESEP, SUARA_RESEP, TEMPAT_RESEP } from "./data";

/**
 * Infografis Kelas 1 Bab 3 Sub-Bab D: Kartu Resep Nenek. Tabel data berupa kartu-kartu resep bergaris merah di atas kotak kayu;
 * tiap kartu satu cerita dari Story, berisi tiga kolom kosong: Kata kunci, Kalimat, Jawaban.
 */
const NAMA_KOLOM: Record<string, string> = { kunci: "Kata kunci", kalimat: "Kalimat", jawaban: "Jawaban" };

export default function KartuResep({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_RESEP,
    73,
    (l) => {
      const t = TEMPAT_RESEP.find((x) => x.kunci === l.teks);
      return t ? KELOMPOK_RESEP[t.kelompok] : "Coba tempat yang lain.";
    },
    speakGuru,
  );
  const kolom = (t: Tempat) => {
    const teks = tp.teksDi(t);
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Kolom kosong ${NAMA_KOLOM[t.kelompok]}`}
        className={`flex min-h-[40px] w-full items-center justify-center rounded border-2 px-1 text-center font-black leading-tight ${t.kelompok === "kalimat" ? "text-sm" : "text-xs"} ${teks ? "border-[#B91C1C] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#FCA5A5] bg-white/70 text-[#B91C1C]/60"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[3.4rem_1.2fr_1.2fr_1fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_RESEP)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Kartu resep Nenek. Tiap kartu satu cerita. Tempelkan kata kunci, kalimat, dan jawabannya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#78350F] bg-[#B45309] p-2" style={{ backgroundImage: "repeating-linear-gradient(90deg,rgba(120,53,15,0.35) 0 2px,transparent 2px 60px)" }}>
        <p className="text-center text-lg font-black text-[#FEF3C7]">{"\u{1F475}"} Kartu Resep Nenek</p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
          <span className="text-center text-[10px] font-black text-[#FEF3C7]">Cerita</span>
          {KOLOM_RESEP.map((k) => (
            <span key={k} className="rounded bg-[#7F1D1D] text-center text-[10px] font-black text-white">
              {k}
            </span>
          ))}
        </div>
        {BARIS_RESEP.map((b, i) => (
          <div key={b.nama} className="mb-2 rounded-md bg-[#FFFBEB] p-1.5 shadow-[2px_3px_0_rgba(0,0,0,0.25)]" style={{ backgroundImage: "linear-gradient(transparent 0 8px,#EF4444 8px 10px,transparent 10px),repeating-linear-gradient(0deg,transparent 0 17px,#BFDBFE 17px 18px)" }}>
            <div className={`grid ${KOL} items-center gap-1 pt-1.5`}>
              <span className="flex flex-col items-center text-[10px] font-black text-[#7F1D1D]">
                <span className="text-xl" aria-hidden="true">
                  {EMOJI[b.benda]}
                </span>
                {b.nama}
              </span>
              {[0, 1, 2].map((c) => kolom(TEMPAT_RESEP[i * 3 + c]))}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FEF2F2" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Kartu resep lengkap! Kata kunci menunjukkan pengurangan, lalu jawab dengan kalimat lengkap." : tp.pesan}
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
