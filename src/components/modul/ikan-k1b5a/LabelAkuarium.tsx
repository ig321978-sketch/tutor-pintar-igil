"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_LABEL, EMOJI, KELOMPOK_LABEL, KOLOM_LABEL, SUARA_LABEL, TEMPAT_LABEL } from "./data";

/**
 * Infografis Kelas 1 Bab 5 Sub-Bab A: Label di Kaca Akuarium. Tabel data ditempel di kaca akuarium berbingkai; tiap baris satu jenis ikan
 * dari Story, dengan empat kotak kosong: Sepuluh dan sisa, Banyak (lambang), Nama bilangan, Catatan hitung.
 */
const NAMA_KOLOM: Record<string, string> = { sepuluh: "Sepuluh dan sisa", banyak: "Banyak", nama: "Nama bilangan", catatan: "Catatan hitung" };

export default function LabelAkuarium({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_LABEL,
    71,
    (l, tujuan) => {
      const t = TEMPAT_LABEL.find((x) => x.kunci === l.teks);
      if (t && t.kelompok === tujuan.kelompok) return "Kolomnya sudah benar, tetapi barisnya bukan ini. Cocokkan dengan jenis ikan di baris ini.";
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#0369A1] bg-white/40 text-[#0369A1]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[3.4rem_1fr_0.8fr_1.1fr_1fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_LABEL)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Label di kaca akuarium. Tiap baris satu jenis ikan. Tempelkan sepuluh dan sisanya, lambang, nama bilangan, dan catatan hitungnya.</p>
      </div>

      {/* Kaca akuarium berbingkai hitam dengan pantulan cahaya */}
      <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-lg border-[6px] border-[#1E293B] p-2.5" style={{ background: "linear-gradient(115deg,rgba(255,255,255,0.55) 0 8%,transparent 8% 14%,rgba(255,255,255,0.35) 14% 17%,transparent 17%),linear-gradient(180deg,#BAE6FD,#7DD3FC 70%,#38BDF8)" }}>
        <p className="text-center text-lg font-black text-[#0C4A6E]">{"\u{1F420}"} Label Akuarium Abang</p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
          <span className="text-center text-[10px] font-black text-[#0C4A6E]">Ikan</span>
          {KOLOM_LABEL.map((k) => (
            <span key={k} className="rounded-sm bg-[#0C4A6E] px-0.5 text-center text-[10px] font-black leading-tight text-[#E0F2FE]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_LABEL.map((b, i) => (
          <div key={b.nama} className="mb-1.5 rounded-md border-2 border-white/80 bg-white/45 p-1 backdrop-blur-sm">
            <div className={`grid ${KOL} items-center gap-1`}>
              <span className="flex flex-col items-center text-[10px] font-black text-[#0C4A6E]">
                <span className="text-xl" aria-hidden="true">
                  {EMOJI[b.jenis]}
                </span>
                {b.nama}
              </span>
              {[0, 1, 2, 3].map((c) => kotak(TEMPAT_LABEL[i * 4 + c]))}
            </div>
          </div>
        ))}
        <div className="mt-1 h-3 rounded-sm bg-[#E9C98F]" aria-hidden="true" />
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#E0F2FE" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Label akuarium lengkap! Belasan adalah sepuluh dan sisanya. Dua puluh adalah dua sepuluh." : tp.pesan}
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
