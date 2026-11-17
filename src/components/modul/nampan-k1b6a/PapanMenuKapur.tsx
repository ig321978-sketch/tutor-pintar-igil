"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_MENU, KELOMPOK_MENU, KOLOM_MENU, SUARA_MENU, TEMPAT_MENU } from "./data";

/**
 * Infografis Kelas 1 Bab 6 Sub-Bab A: Papan Menu Kapur. Papan hitam bertulisan kapur berdiri di tiang lapak; tiap baris satu perbandingan
 * dari Story (dua nampan, menyamakan, lampion, es lilin, garis bilangan) dengan tiga kotak kosong: Bilangan, Hasil, Catatan.
 * Petunjuk salah menyebut baris yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { bilangan: "Bilangan", hasil: "Hasil", catatan: "Catatan" };

export default function PapanMenuKapur({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_MENU,
    83,
    (l, tujuan) => {
      const asal = TEMPAT_MENU.find((x) => x.kunci === l.teks);
      if (asal && asal.kelompok === tujuan.kelompok) {
        const i = Number(/^p(\d+)-/.exec(asal.id)?.[1] ?? 0);
        return `Kolomnya sudah benar, tetapi label ini milik baris ${BARIS_MENU[i].nama}. Cocokkan dengan baris ini.`;
      }
      return asal ? KELOMPOK_MENU[asal.kelompok] : "Coba tempat yang lain.";
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-md border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#F8FAFC] bg-[#1F3A2E] text-[#F8FAFC] lm-muncul" : "border-dashed border-[#F8FAFC]/70 bg-transparent text-[#F8FAFC]/60"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[4.9rem_1fr_1fr_1fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_MENU)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Papan menu kapur di lapak. Tiap baris satu perbandingan. Tempelkan bilangannya, hasilnya, dan catatannya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl">
        <div className="flex">
          {/* Tiang kiri */}
          <div className="w-3 shrink-0 rounded-b-sm bg-[#78350F]" aria-hidden="true" />
          {/* Papan kapur */}
          <div className="flex-1 rounded-md border-[6px] border-[#B45309] bg-[#1F3A2E] px-2 py-3 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] sm:px-4">
            <p className="text-center text-lg font-black tracking-wide text-[#F8FAFC]">{"\u{1F4CB}"} MENU PERBANDINGAN</p>
            <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
              <span className="text-center text-[10px] font-black text-[#FDE68A]">Perbandingan</span>
              {KOLOM_MENU.map((k) => (
                <span key={k} className="border-b-2 border-[#FDE68A] px-0.5 text-center text-[10px] font-black leading-tight text-[#FDE68A]">
                  {k}
                </span>
              ))}
            </div>
            {BARIS_MENU.map((b, i) => (
              <div key={b.nama} className="mb-1.5 border-t border-dashed border-[#F8FAFC]/40 pt-1.5">
                <div className={`grid ${KOL} items-center gap-1`}>
                  <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#F8FAFC]">
                    <span className="text-lg" aria-hidden="true">
                      {b.ikon}
                    </span>
                    {b.nama}
                  </span>
                  {[0, 1, 2].map((c) => kotak(TEMPAT_MENU[i * 3 + c]))}
                </div>
              </div>
            ))}
            <p className="mt-1 text-right text-[10px] font-black text-[#F8FAFC]/70" aria-hidden="true">
              {"\u{1F58D}\u{FE0F}"} kapur
            </p>
          </div>
          {/* Tiang kanan */}
          <div className="w-3 shrink-0 rounded-b-sm bg-[#78350F]" aria-hidden="true" />
        </div>
        <div className="mx-auto h-3 w-3/4 rounded-b-md bg-[#78350F]/70" aria-hidden="true" />
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#F0FDF4" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Papan menu lengkap! Pasangkan satu-satu, selisih adalah beda banyaknya, dan samakan dengan menambah atau mengambil." : tp.pesan}
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
