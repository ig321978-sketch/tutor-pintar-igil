"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_SINYAL, PETUNJUK_URUT_SINYAL, PUSAT_SINYAL, SUARA_SINYAL, TEMPAT_SINYAL } from "./data";

/**
 * Mind-map Kelas 1 Bab 3 Sub-Bab C: Lampu Sinyal. Tiang sinyal merah = Masalah, lampu sinyal bulat bernomor yang berderet zig-zag
 * di sepanjang kabel = Penyelesaian berurutan (semua metode Story), palang perlintasan yang terbuka = Hasil. Label sewarna ditempel;
 * lampu hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
export default function PetaSinyal({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_SINYAL,
    47,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_SINYAL, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_SINYAL;
      return kel ? KELOMPOK_SINYAL[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_SINYAL, t, l),
  );
  const slot = (t: Tempat, kelas: string) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_SINYAL[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Tempat kosong ${g.nama}${t.urutan ? ` nomor ${t.urutan}` : ""}`}
        className={`relative flex min-h-[46px] w-full items-center justify-center border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${kelas} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.9)", borderColor: g.garis }}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const kel = (k: string) => TEMPAT_SINYAL.filter((t) => t.kelompok === k);

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_SINYAL)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Peta lampu sinyal. Tiang merah berisi masalah, lampu bernomor berisi langkah berurutan, palang terbuka berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border-4 border-[#1F2937] bg-[#111827] p-3">
        {/* Tiang sinyal merah */}
        <div className="flex gap-2">
          <div className="flex w-8 shrink-0 flex-col items-center gap-1 rounded-full bg-[#374151] py-2" aria-hidden="true">
            <span className="h-5 w-5 rounded-full bg-[#EF4444] shadow-[0_0_10px_#EF4444]" />
            <span className="h-5 w-5 rounded-full bg-[#78350F]" />
            <span className="h-5 w-5 rounded-full bg-[#14532D]" />
          </div>
          <div className="flex-1 rounded-xl border-2 border-[#EF4444] bg-[#7F1D1D]/60 p-2">
            <p className="mb-1 text-center text-xs font-black text-[#FECACA]">
              {KELOMPOK_SINYAL.masalah.ikon} Tiang sinyal merah: Masalah
            </p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kel("masalah").map((t) => slot(t, "rounded-lg"))}</div>
          </div>
        </div>

        {/* Lampu sinyal bernomor zig-zag di sepanjang kabel */}
        <p className="mb-2 mt-3 text-center text-sm font-black text-[#FDE68A]">
          {KELOMPOK_SINYAL.metode.ikon} {PUSAT_SINYAL}
        </p>
        <div className="relative space-y-2">
          <div className="absolute bottom-2 left-1/2 top-2 w-1 -translate-x-1/2 bg-[#FBBF24]/60" aria-hidden="true" />
          {kel("metode").map((t, i) => (
            <div key={t.id} className={`relative flex items-center gap-2 ${i % 2 === 0 ? "" : "flex-row-reverse"}`}>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[3px] border-[#FDE047] bg-[#FACC15] text-sm font-black text-[#1F2937] shadow-[0_0_10px_#FACC15]">{t.urutan}</span>
              <div className="w-[70%] sm:w-[58%]">{slot(t, "rounded-full")}</div>
            </div>
          ))}
        </div>

        {/* Palang perlintasan terbuka */}
        <div className="mt-3 rounded-xl border-2 border-[#22C55E] bg-[#14532D]/60 p-2">
          <div className="mb-1 flex items-center justify-center gap-2" aria-hidden="true">
            <span className="h-3 w-24 -rotate-[25deg] rounded-full" style={{ background: "repeating-linear-gradient(90deg,#FFFFFF 0 10px,#EF4444 10px 20px)" }} />
            <span className="h-3 w-3 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E]" />
          </div>
          <p className="mb-1 text-center text-xs font-black text-[#BBF7D0]">
            {KELOMPOK_SINYAL.hasil.ikon} Palang terbuka: Hasil
          </p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kel("hasil").map((t) => slot(t, "rounded-md"))}</div>
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#F3F4F6"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_SINYAL, l);
          return k ? { isi: KELOMPOK_SINYAL[k].isi, garis: KELOMPOK_SINYAL[k].garis, ikon: KELOMPOK_SINYAL[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Peta lampu sinyal lengkap! Dari masalah di tiang merah, langkah di lampu sinyal, sampai hasil di palang terbuka." : tp.pesan}
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
