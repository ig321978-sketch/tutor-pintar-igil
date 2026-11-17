"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_LACI, KELOMPOK_LACI, KOLOM_LACI, SUARA_LACI, TEMPAT_LACI } from "./data";

/**
 * Infografis Kelas 1 Bab 8 Sub-Bab A: Laci Kartu Peminjam. Laci kayu di mobil pustaka berisi kartu berlubang; tiap kartu satu jenis kotak dari Story
 * (hewan, laut, roket, bunga, dan semuanya) dengan tiga kotak kosong: Banyak, Turus, Catatan. Petunjuk salah menyebut kartu yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { banyak: "Banyak", turus: "Turus", catatan: "Catatan" };

export default function LaciKartu({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_LACI,
    97,
    (l, tujuan) => {
      const asal = TEMPAT_LACI.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba tempat yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_LACI[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi barisnya keliru. Label ini milik kartu ${BARIS_LACI[baris].nama}, bukan kartu ${BARIS_LACI[barisTujuan].nama}.`;
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-md border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#92400E] bg-[#FFFBEB]/80 text-[#92400E]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[4.6rem_1fr_1fr_1fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_LACI)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Laci kartu peminjam di mobil pustaka. Tiap kartu satu jenis kotak. Tempelkan banyaknya, goresan turusnya, dan catatannya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#78350F] p-2 shadow-[0_6px_0_rgba(69,26,3,0.35)]" style={{ background: "repeating-linear-gradient(90deg,#C9924B 0 26px,#BE8541 26px 28px)" }}>
        <p className="text-center text-lg font-black text-[#451A03]">{"\u{1F5C3}\u{FE0F}"} Laci Kartu Peminjam</p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
          <span className="text-center text-[10px] font-black text-[#451A03]">Kartu</span>
          {KOLOM_LACI.map((k) => (
            <span key={k} className="rounded-sm bg-[#451A03] px-0.5 text-center text-[10px] font-black leading-tight text-[#FEF3C7]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_LACI.map((b, i) => (
          <div key={b.nama} className="relative mb-1.5 rounded-lg border-2 border-[#92400E] bg-[#FFFBEB] p-1 shadow-[0_2px_0_rgba(69,26,3,0.3)]">
            <span className="absolute left-1 top-1 h-2.5 w-2.5 rounded-full border border-black/40 bg-[#78350F]" aria-hidden="true" />
            <div className={`grid ${KOL} items-center gap-1`}>
              <span className="flex flex-col items-center pt-2 text-center text-[10px] font-black leading-tight text-[#451A03]">
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

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FEF3C7" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Laci kartu lengkap! Pilah menurut jenis, hitung dengan turus, tulis di tabel, lalu bandingkan." : tp.pesan}
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
