"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_LACI, KELOMPOK_LACI, KOLOM_LACI, SUARA_LACI, TEMPAT_LACI } from "./data";

/**
 * Infografis Kelas 2 Bab 2 Sub-Bab A: Lemari Laci Alat Tulis. Lima laci bergagang, tiap laci satu penjumlahan dari Story (pensil, baju olahraga, dan tiga contoh metode global)
 * dengan tiga kotak kosong: Penjumlahan, Hasil, Dibaca. Petunjuk salah menyebut laci yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { jumlah: "Penjumlahan", hasil: "Hasil", dibaca: "Dibaca" };

export default function LaciAlatTulis({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_LACI,
    91,
    (l, tujuan) => {
      const asal = TEMPAT_LACI.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba kotak yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_LACI[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi lacinya keliru. Label ini milik laci ${BARIS_LACI[baris].nama}, bukan laci ${BARIS_LACI[barisTujuan].nama}.`;
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-md border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#B45309] bg-white/70 text-[#B45309]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[5rem_1.2fr_0.9fr_1.2fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_LACI)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Lemari laci alat tulis. Tiap laci satu penjumlahan. Tempelkan penjumlahannya, hasilnya, dan cara membaca hasilnya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#92400E] bg-[#FDBA74] p-2 shadow-[0_6px_0_rgba(124,45,18,0.3)]">
        <p className="text-center text-lg font-black text-[#7C2D12]">{"\u{1F5C4}\u{FE0F}"} Lemari Laci Alat Tulis</p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
          <span className="text-center text-[10px] font-black text-[#7C2D12]">Laci</span>
          {KOLOM_LACI.map((k) => (
            <span key={k} className="rounded-sm bg-[#7C2D12] px-0.5 text-center text-[10px] font-black leading-tight text-[#FFEDD5]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_LACI.map((b, i) => (
          <div key={b.nama} className="relative mb-2 rounded-lg border-[3px] border-[#92400E] bg-[#FFF7ED] p-1 pb-2">
            <span className="absolute -bottom-1 left-1/2 h-2 w-10 -translate-x-1/2 rounded-full border-2 border-[#92400E] bg-[#FDE68A]" aria-hidden="true" />
            <div className={`grid ${KOL} items-center gap-1`}>
              <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#78350F]">
                <span className="text-lg" aria-hidden="true">
                  {b.ikon}
                </span>
                {b.nama}
              </span>
              {[0, 1, 2].map((c) => kotak(TEMPAT_LACI[i * 3 + c]))}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FFEDD5" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Semua laci lengkap! Tiap penjumlahan punya hasil yang bisa dibaca." : tp.pesan}
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
