"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_LOKER, PETUNJUK_URUT_LOKER, PUSAT_LOKER, SUARA_LOKER, TEMPAT_LOKER } from "./data";

/**
 * Mind-map Kelas 1 Bab 2 Sub-Bab C: Loker Pos. Amplop masuk = Masalah, sembilan loker bernomor (tiga kali tiga) = Penyelesaian
 * berurutan (semua metode Story), kantong kirim = Hasil. Label sewarna ditempel; loker hanya menerima labelnya sendiri.
 * Hanya poin pelajaran.
 */
export default function PetaLoker({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_LOKER,
    53,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_LOKER, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_LOKER;
      return kel ? KELOMPOK_LOKER[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_LOKER, t, l),
  );
  const slot = (t: Tempat, gaya: "amplop" | "loker" | "kantong") => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_LOKER[t.kelompok];
    const bentuk = gaya === "amplop" ? "rounded-sm" : gaya === "loker" ? "rounded-md" : "rounded-b-[1.4rem] rounded-t-sm";
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Tempat kosong ${g.nama}${t.urutan ? ` nomor ${t.urutan}` : ""}`}
        className={`relative flex min-h-[58px] w-full items-center justify-center border-[3px] px-1.5 pt-2 text-center text-[11px] font-black leading-tight text-[#1C01A5] sm:text-xs ${bentuk} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{
          background: teks ? g.isi : gaya === "amplop" ? "linear-gradient(160deg,transparent 48%,#FDE68A 49% 51%,transparent 52%),linear-gradient(20deg,transparent 48%,#FDE68A 49% 51%,transparent 52%),#FFFBEB" : gaya === "loker" ? "#EEF2FF" : "#F0FDF4",
          borderColor: g.garis,
        }}
      >
        {t.urutan ? <span className="absolute left-1 top-0.5 rounded bg-[#4338CA] px-1 text-[10px] text-white">{t.urutan}</span> : null}
        {gaya === "loker" ? <span className="absolute right-1.5 top-1 h-1.5 w-4 rounded-full bg-[#4338CA]/40" aria-hidden="true" /> : null}
        {teks ?? "?"}
      </button>
    );
  };
  const kel = (k: string) => TEMPAT_LOKER.filter((t) => t.kelompok === k);

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_LOKER)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Loker pos belajar. Amplop masuk berisi masalah, loker bernomor berisi langkah berurutan, kantong kirim berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-3xl bg-[#F1F5F9] p-3">
        <p className="text-center text-xs font-black text-[#B45309]">
          {KELOMPOK_LOKER.masalah.ikon} Amplop masuk: Masalah
        </p>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kel("masalah").map((t) => slot(t, "amplop"))}</div>

        <div className="rounded-xl border-[6px] border-[#4338CA] bg-[#312E81] p-2 shadow-[0_6px_0_#1E1B4B]">
          <p className="mb-2 text-center text-sm font-black text-white">
            {KELOMPOK_LOKER.metode.ikon} {PUSAT_LOKER}
          </p>
          <div className="grid grid-cols-3 gap-1.5">{kel("metode").map((t) => slot(t, "loker"))}</div>
        </div>

        <p className="text-center text-xs font-black text-[#15803D]">
          {KELOMPOK_LOKER.hasil.ikon} Kantong kirim: Hasil
        </p>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kel("hasil").map((t) => slot(t, "kantong"))}</div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#EEF2FF"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_LOKER, l);
          return k ? { isi: KELOMPOK_LOKER[k].isi, garis: KELOMPOK_LOKER[k].garis, ikon: KELOMPOK_LOKER[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Loker pos lengkap! Dari masalah di amplop, langkah di loker, sampai hasil di kantong kirim." : tp.pesan}
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
