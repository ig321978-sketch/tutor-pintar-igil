"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_BAGASI, EMOJI, KELOMPOK_BAGASI, KOLOM_BAGASI, SUARA_BAGASI, TEMPAT_BAGASI } from "./data";

/**
 * Infografis Kelas 1 Bab 3 Sub-Bab B: Label Bagasi. Tabel data berupa label bagasi yang tergantung di tali; tiap label satu baris
 * (satu cerita dari Story) berujung runcing dengan lubang tali, berisi empat kolom kosong: Utuh, Diketahui, Dicari, Kalimat.
 */
const NAMA_KOLOM: Record<string, string> = { utuh: "Utuh", tahu: "Diketahui", cari: "Dicari", kalimat: "Kalimat" };

export default function LabelBagasi({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_BAGASI,
    67,
    (l) => {
      const t = TEMPAT_BAGASI.find((x) => x.kunci === l.teks);
      return t ? KELOMPOK_BAGASI[t.kelompok] : "Coba tempat yang lain.";
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
        className={`flex min-h-[38px] w-full items-center justify-center rounded border-2 px-1 text-center font-black leading-tight ${t.kelompok === "kalimat" ? "text-sm" : "text-xs"} ${teks ? "border-[#7C2D12] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#B45309]/60 bg-[#FFF7ED]/70 text-[#B45309]/60"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[3.2rem_0.7fr_1fr_1fr_1.4fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_BAGASI)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Label bagasi. Tiap label satu cerita. Tempelkan utuhnya, yang diketahui, yang dicari, dan kalimatnya.</p>
      </div>

      <div className="relative mx-auto w-full max-w-xl rounded-2xl border-4 border-[#57534E] bg-[#E7E5E4] px-2 pb-2 pt-5">
        <div className="absolute left-3 right-3 top-2 h-1 rounded bg-[#57534E]" aria-hidden="true" />
        <p className="text-center text-lg font-black text-[#44403C]">{"\u{1F9F3}"} Label Bagasi Pindah Kereta</p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1 pr-6`}>
          <span className="text-center text-[10px] font-black text-[#44403C]">Cerita</span>
          {KOLOM_BAGASI.map((k) => (
            <span key={k} className="rounded bg-[#78350F] text-center text-[10px] font-black text-[#FEF3C7]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_BAGASI.map((b, i) => (
          <div key={b.nama} className="relative mb-2 flex items-center">
            <div className={`grid flex-1 ${KOL} items-center gap-1 rounded-l-lg border-2 border-r-0 border-[#B45309] bg-[#FDBA74] p-1.5`}>
              <span className="flex flex-col items-center text-[10px] font-black text-[#7C2D12]">
                <span className="text-xl" aria-hidden="true">
                  {EMOJI[b.benda]}
                </span>
                {b.nama}
              </span>
              {[0, 1, 2, 3].map((c) => kolom(TEMPAT_BAGASI[i * 4 + c]))}
            </div>
            <div className="flex h-full w-6 items-center justify-center self-stretch border-2 border-l-0 border-[#B45309] bg-[#FDBA74]" style={{ clipPath: "polygon(0 0,100% 30%,100% 70%,0 100%)" }} aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-[#78350F] bg-[#E7E5E4]" />
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FFEDD5" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Label bagasi lengkap! Utuh dikurangi yang diketahui sama dengan yang dicari." : tp.pesan}
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
