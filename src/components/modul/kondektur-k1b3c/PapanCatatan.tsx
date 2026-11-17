"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_CATATAN, KELOMPOK_CATATAN, KOLOM_CATATAN, SUARA_CATATAN, TEMPAT_CATATAN } from "./data";

/**
 * Infografis Kelas 1 Bab 3 Sub-Bab C: Papan Catatan Kondektur. Tabel data di papan jepit kondektur (penjepit logam di atas, kertas
 * bergaris); tiap baris satu catatan dari Story, berisi tiga kolom kosong: Kalimat, Kebalikannya, Keluarga.
 */
const NAMA_KOLOM: Record<string, string> = { kalimat: "Kalimat", balik: "Kebalikannya", keluarga: "Keluarga" };

export default function PapanCatatan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_CATATAN,
    71,
    (l) => {
      const t = TEMPAT_CATATAN.find((x) => x.kunci === l.teks);
      return t ? KELOMPOK_CATATAN[t.kelompok] : "Coba tempat yang lain.";
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
        className={`flex min-h-[42px] w-full items-center justify-center rounded-md border-2 px-1 text-center text-sm font-black leading-tight ${teks ? "border-[#1E3A8A] bg-[#EFF6FF] text-[#1C01A5] lm-muncul" : "border-dashed border-[#64748B] bg-white/60 text-[#64748B]"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[3.6rem_1fr_1fr_1fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_CATATAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Papan catatan kondektur. Tiap baris satu catatan. Tempelkan kalimatnya, kebalikannya, dan keluarganya.</p>
      </div>

      <div className="relative mx-auto w-full max-w-xl rounded-xl border-[6px] border-[#78350F] bg-[#A16207] p-2 pt-6">
        <div className="absolute left-1/2 top-0 h-6 w-28 -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-[#334155] bg-gradient-to-b from-[#E2E8F0] to-[#94A3B8]" aria-hidden="true" />
        <div className="rounded-md bg-white p-2" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent 0 27px,#BFDBFE 27px 28px)" }}>
          <p className="text-center text-lg font-black text-[#1E3A8A]">{"\u{1F9D1}"} Catatan Kondektur</p>
          <div className={`mb-1 mt-2 grid ${KOL} gap-1.5`}>
            <span className="text-center text-[10px] font-black text-[#1E3A8A]">Catatan</span>
            {KOLOM_CATATAN.map((k) => (
              <span key={k} className="rounded bg-[#1E3A8A] text-center text-[10px] font-black text-white">
                {k}
              </span>
            ))}
          </div>
          {BARIS_CATATAN.map((b, i) => (
            <div key={b.nama} className={`mb-1.5 grid ${KOL} items-center gap-1.5 border-b-2 border-dashed border-[#CBD5E1] pb-1.5`}>
              <span className="flex flex-col items-center text-[10px] font-black text-[#1E3A8A]">
                <span className="text-lg" aria-hidden="true">
                  {b.ikon}
                </span>
                {b.nama}
              </span>
              {[0, 1, 2].map((c) => kolom(TEMPAT_CATATAN[i * 3 + c]))}
            </div>
          ))}
        </div>
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#EFF6FF" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Papan catatan lengkap! Tiap kalimat punya kebalikan dan tiga bilangan sekeluarga." : tp.pesan}
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
