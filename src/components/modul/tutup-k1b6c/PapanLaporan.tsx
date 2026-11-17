"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_LAPORAN, KELOMPOK_LAPORAN, KOLOM_LAPORAN, SUARA_LAPORAN, TEMPAT_LAPORAN } from "./data";

/**
 * Infografis Kelas 1 Bab 6 Sub-Bab C: Papan Laporan Pak RT. Papan jepit kayu dengan penjepit logam di atas dan kertas bergaris;
 * tiap baris satu hitungan dari Story (kue cubit dimakan, balon lepas, mundur di garis bilangan, periksa dengan menambah, pilih cara),
 * dengan tiga kotak kosong: Mula-mula, Berubah, Hasil.
 */
const NAMA_KOLOM: Record<string, string> = { semula: "Mula-mula", ubah: "Berubah", hasil: "Hasil" };

export default function PapanLaporan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_LAPORAN,
    83,
    (l, tujuan) => {
      const t = TEMPAT_LAPORAN.find((x) => x.kunci === l.teks);
      if (t && t.kelompok === tujuan.kelompok) {
        const i = Number(/^p(\d+)-/.exec(t.id)?.[1] ?? 0);
        return `Kolomnya sudah benar, tetapi itu milik baris ${BARIS_LAPORAN[i].nama}. Cocokkan dengan baris ini.`;
      }
      return t ? KELOMPOK_LAPORAN[t.kelompok] : "Coba tempat yang lain.";
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-sm border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#475569] bg-white/70 text-[#475569]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
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
        <button type="button" onClick={() => speakGuru(SUARA_LAPORAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Papan laporan Pak RT. Tiap baris satu hitungan. Tempelkan bilangan mula-mula, yang berubah, dan hasilnya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl">
        {/* Papan jepit kayu dengan penjepit logam */}
        <div className="relative rounded-xl border-[6px] border-[#78350F] bg-[#A16207] px-2 pb-3 pt-6 sm:px-4" style={{ background: "repeating-linear-gradient(0deg,#B7791F 0 18px,#A16207 18px 20px)" }}>
          <div className="absolute -top-3 left-1/2 flex h-7 w-24 -translate-x-1/2 items-center justify-center rounded-md border-2 border-[#475569] bg-gradient-to-b from-[#E2E8F0] to-[#94A3B8]" aria-hidden="true">
            <span className="h-2.5 w-10 rounded-full border border-[#475569] bg-[#CBD5E1]" />
          </div>
          {/* Kertas laporan bergaris */}
          <div className="rounded-sm bg-white p-2 shadow-[0_2px_0_rgba(0,0,0,0.25)]" style={{ backgroundImage: "repeating-linear-gradient(180deg,transparent 0 26px,#BFDBFE 26px 27px)" }}>
            <p className="text-center text-lg font-black text-[#1E3A8A]">{"\u{1F4CB}"} Laporan Pak RT</p>
            <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
              <span className="text-center text-[10px] font-black text-[#1E3A8A]">Hitungan</span>
              {KOLOM_LAPORAN.map((k) => (
                <span key={k} className="rounded-sm bg-[#1E3A8A] px-0.5 text-center text-[10px] font-black leading-tight text-white">
                  {k}
                </span>
              ))}
            </div>
            {BARIS_LAPORAN.map((b, i) => (
              <div key={b.nama} className="mb-1.5 rounded-md border border-[#BFDBFE] bg-[#F8FAFC]/90 p-1">
                <div className={`grid ${KOL} items-center gap-1`}>
                  <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#1E3A8A]">
                    <span className="text-lg" aria-hidden="true">
                      {b.ikon}
                    </span>
                    {b.nama}
                  </span>
                  {[0, 1, 2].map((c) => kotak(TEMPAT_LAPORAN[i * 3 + c]))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#E0F2FE" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Laporan lengkap! Mundur, kurangi satuan, dan periksa dengan menambah, semuanya mencari sisa." : tp.pesan}
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
