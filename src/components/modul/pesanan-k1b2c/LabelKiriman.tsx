"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_LABEL, EMOJI, KELOMPOK_LABEL, KOLOM_LABEL, SUARA_LABEL, TEMPAT_LABEL } from "./data";

/**
 * Infografis Kelas 1 Bab 2 Sub-Bab C: Label Kiriman. Tabel data berupa tiga label paket bertepi garis-garis kode batang;
 * tiap label satu pesanan dari Story (penerima sudah tertulis), tiga kolom kosong: Bilangan, Kalimat, Jawaban.
 */
const NAMA_KOLOM: Record<string, string> = { bilangan: "Bilangan", kalimat: "Kalimat", jawaban: "Jawaban" };

export default function LabelKiriman({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_LABEL,
    79,
    (l) => {
      const t = TEMPAT_LABEL.find((x) => x.kunci === l.teks);
      return t ? KELOMPOK_LABEL[t.kelompok] : "Coba tempat yang lain.";
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
        aria-label={teks ?? `Isian kosong kolom ${NAMA_KOLOM[t.kelompok]}`}
        className={`flex min-h-[40px] items-center justify-center rounded border-2 px-1 text-center font-black leading-tight ${t.kelompok === "kalimat" ? "text-sm" : "text-[11px] sm:text-xs"} ${teks ? "border-solid border-[#111827] bg-[#FEF9C3] text-[#1C01A5] lm-muncul" : "border-dashed border-[#9CA3AF] bg-white text-[#9CA3AF]"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_LABEL)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Label kiriman. Tiap label satu pesanan dari cerita. Tempelkan dua bilangannya, kalimatnya, dan jawaban lengkapnya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl space-y-2">
        <div className="grid grid-cols-[6rem_0.9fr_1fr_1.1fr] gap-1.5 px-2">
          <span className="text-[11px] font-black text-[#374151]">Kepada</span>
          {KOLOM_LABEL.map((k) => (
            <span key={k} className="text-center text-[11px] font-black text-[#374151]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_LABEL.map((b, i) => (
          <div key={b.untuk} className="rounded-lg border-2 border-[#111827] bg-[#FFFBEB] p-2 shadow-[3px_3px_0_#D97706]">
            <div className="mb-1 h-2" style={{ background: "repeating-linear-gradient(90deg,#111827 0 2px,transparent 2px 4px,#111827 4px 7px,transparent 7px 9px)" }} aria-hidden="true" />
            <div className="grid grid-cols-[6rem_0.9fr_1fr_1.1fr] items-center gap-1.5">
              <span className="flex items-center gap-1 text-[11px] font-black text-[#1C01A5]">
                <span className="text-lg" aria-hidden="true">
                  {EMOJI[b.benda]}
                </span>
                {b.untuk}
              </span>
              {isian(TEMPAT_LABEL[i * 3])}
              {isian(TEMPAT_LABEL[i * 3 + 1])}
              {isian(TEMPAT_LABEL[i * 3 + 2])}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FFFBEB" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Label kiriman lengkap! Tiap pesanan punya kalimat dan jawaban lengkap." : tp.pesan}
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
