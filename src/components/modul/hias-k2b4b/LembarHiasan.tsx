"use client";

import React from "react";
import type { Tempat } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import { BARIS_LEMBAR, KELOMPOK_LEMBAR, KOLOM_LEMBAR, SUARA_LEMBAR, TEMPAT_LEMBAR } from "./data-peta";

/**
 * Infografis Kelas 2 Bab 4 Sub-Bab B: Lembar Hiasan. Lembar krem berpita kotak-kotak berisi tabel; tiap baris satu jenis pola dari Story
 * (pola warna, bentuk, gerakan, suara, dan susunan yang bukan pola) dengan tiga kotak kosong: Contoh, Satuan pola, Kode huruf.
 * Petunjuk salah menyebut baris yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { contoh: "Contoh", satuan: "Satuan pola", kode: "Kode huruf" };
const PITA_TEPI = "repeating-linear-gradient(90deg,#F87171 0 14px,#FFFFFF 14px 28px)";

export default function LembarHiasan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_LEMBAR,
    61,
    (l, tujuan) => {
      const asal = TEMPAT_LEMBAR.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba tempat yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_LEMBAR[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi barisnya keliru. Label ini milik ${BARIS_LEMBAR[baris].nama}, bukan ${BARIS_LEMBAR[barisTujuan].nama}.`;
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
        className={`flex min-h-[48px] w-full items-center justify-center rounded-md border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#7C3AED] bg-[#EDE9FE] text-[#4C1D95] lm-muncul" : "border-dashed border-[#A78BFA] bg-white/70 text-[#7C3AED]/60"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[4.4rem_1.3fr_1.1fr_0.9fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_LEMBAR)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Lembar hiasan. Tiap baris satu jenis pola. Tempelkan contohnya, satuan polanya, dan kode hurufnya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border-2 border-[#F87171] bg-[#FFFBEB] shadow-[0_6px_0_rgba(153,27,27,0.25)]">
        <div className="h-3" style={{ background: PITA_TEPI }} aria-hidden="true" />
        <div className="p-2">
          <p className="text-center text-lg font-black text-[#9D174D]">{"\u{1F380}"} Lembar Hiasan</p>
          <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
            <span className="text-center text-[10px] font-black text-[#9D174D]">Jenis</span>
            {KOLOM_LEMBAR.map((k) => (
              <span key={k} className="rounded-sm bg-[#9D174D] px-0.5 text-center text-[10px] font-black leading-tight text-white">
                {k}
              </span>
            ))}
          </div>
          {BARIS_LEMBAR.map((b, i) => (
            <div key={b.nama} className="mb-1.5 rounded-md border-2 border-[#F9A8D4] bg-white/60 p-1">
              <div className={`grid ${KOL} items-center gap-1`}>
                <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#9D174D]">
                  <span className="text-lg" aria-hidden="true">
                    {b.ikon}
                  </span>
                  {b.nama}
                </span>
                {[0, 1, 2].map((c) => kotak(TEMPAT_LEMBAR[i * 3 + c]))}
              </div>
            </div>
          ))}
        </div>
        <div className="h-3" style={{ background: PITA_TEPI }} aria-hidden="true" />
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FAE8FF" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Lembar lengkap! Cari satuan polanya, tulis kode hurufnya, dan ingat: susunan acak bukan pola." : tp.pesan}
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
