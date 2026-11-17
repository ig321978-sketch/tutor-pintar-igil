"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_JENDELA, EMOJI, KELOMPOK_JENDELA, KOLOM_JENDELA, SUARA_JENDELA, TEMPAT_JENDELA } from "./data";

/**
 * Infografis Kelas 1 Bab 3 Sub-Bab A: Jendela Gerbong. Tabel data di dinding gerbong kereta; tiap baris satu jendela panjang
 * berbingkai bulat (satu cerita dari Story), dengan empat kaca kosong: Mula-mula, Berkurang, Sisa, Kalimat.
 */
const NAMA_KOLOM: Record<string, string> = { mula: "Mula-mula", kurang: "Berkurang", sisa: "Sisa", kalimat: "Kalimat" };

export default function JendelaGerbong({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_JENDELA,
    61,
    (l) => {
      const t = TEMPAT_JENDELA.find((x) => x.kunci === l.teks);
      return t ? KELOMPOK_JENDELA[t.kelompok] : "Coba tempat yang lain.";
    },
    speakGuru,
  );
  const kaca = (t: Tempat) => {
    const teks = tp.teksDi(t);
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Kaca kosong kolom ${NAMA_KOLOM[t.kelompok]}`}
        className={`flex min-h-[40px] w-full items-center justify-center rounded-lg border-2 px-1 text-center font-black leading-tight ${t.kelompok === "kalimat" ? "text-sm" : "text-xs"} ${teks ? "border-[#1D4ED8] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#93C5FD] text-[#1D4ED8]/60"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={teks ? undefined : { background: "linear-gradient(135deg,rgba(191,219,254,0.9) 0 45%,rgba(255,255,255,0.9) 45% 55%,rgba(191,219,254,0.9) 55%)" }}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[3.4rem_0.8fr_1fr_0.9fr_1.4fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_JENDELA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Jendela gerbong. Tiap jendela satu cerita. Tempelkan mula-mula, yang berkurang, sisanya, dan kalimatnya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-[1.6rem] border-[6px] border-[#1E3A8A] bg-[#2563EB] p-2.5" style={{ backgroundImage: "linear-gradient(180deg,transparent 0 92%,#FACC15 92% 96%,transparent 96%)" }}>
        <p className="text-center text-lg font-black text-white">{"\u{1F683}"} Catatan Perjalanan Kaka</p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
          <span className="text-center text-[10px] font-black text-[#DBEAFE]">Cerita</span>
          {KOLOM_JENDELA.map((k) => (
            <span key={k} className="rounded bg-[#1E3A8A] text-center text-[10px] font-black text-[#FDE68A]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_JENDELA.map((b, i) => (
          <div key={b.nama} className="mb-2 rounded-2xl border-4 border-[#CBD5E1] bg-[#DBEAFE] p-1.5 shadow-[inset_0_0_0_2px_#64748B]">
            <div className={`grid ${KOL} items-center gap-1`}>
              <span className="flex flex-col items-center text-[10px] font-black text-[#1C01A5]">
                <span className="text-xl" aria-hidden="true">
                  {EMOJI[b.benda]}
                </span>
                {b.nama}
              </span>
              {[0, 1, 2, 3].map((c) => kaca(TEMPAT_JENDELA[i * 4 + c]))}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#DBEAFE" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Jendela gerbong lengkap! Mula-mula dikurangi yang berkurang, sisanya ditulis setelah tanda sama dengan." : tp.pesan}
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
