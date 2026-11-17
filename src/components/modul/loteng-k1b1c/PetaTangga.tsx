"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_TANGGA, PETUNJUK_URUT_TANGGA, PUSAT_TANGGA, SUARA_TANGGA, TEMPAT_TANGGA } from "./data";

/**
 * Mind-map Kelas 1 Bab 1 Sub-Bab C: Tangga Belajar. Lantai = Masalah, anak tangga bernomor naik menyerong = Penyelesaian berurutan
 * (semua metode Story), loteng = Hasil. Label sewarna ditempel; anak tangga hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
export default function PetaTangga({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_TANGGA,
    53,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_TANGGA, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_TANGGA;
      return kel ? KELOMPOK_TANGGA[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_TANGGA, t, l),
  );
  const slot = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_TANGGA[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Tempat kosong ${g.nama}${t.urutan ? ` nomor ${t.urutan}` : ""}`}
        className={`flex min-h-[40px] w-full items-center justify-center rounded-lg border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.8)", borderColor: g.garis }}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const kelompok = (k: string) => TEMPAT_TANGGA.filter((t) => t.kelompok === k);
  const anak = kelompok("metode");

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_TANGGA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Tangga belajar. Isi lantai dengan masalah, anak tangga sesuai urutan langkah, lalu loteng dengan hasil.</p>
      </div>

      <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border-4 border-[#78350F]" style={{ background: "linear-gradient(180deg,#EEF2FF 0%,#FFFBEB 60%,#FDE7C8 100%)" }}>
        <div className="border-b-8 border-[#B45309] bg-[#E0E7FF] p-2">
          <p className="mb-1 text-center text-xs font-black text-[#4338CA]">
            {KELOMPOK_TANGGA.hasil.ikon} Loteng: Hasil
          </p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kelompok("hasil").map(slot)}</div>
        </div>
        <ol className="space-y-1 px-2 py-2" aria-label="Anak tangga Penyelesaian">
          {[...anak].reverse().map((t) => {
            const no = t.urutan ?? 0;
            return (
              <li key={t.id} className="flex items-center gap-1.5" style={{ marginLeft: `${(no - 1) * 3.2}%`, marginRight: `${(anak.length - no) * 3.2}%` }}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 border-[#78350F] bg-[#D6A15E] text-sm font-black text-white shadow-[0_3px_0_#78350F]">{no}</span>
                {slot(t)}
              </li>
            );
          })}
        </ol>
        <div className="border-t-8 border-[#78350F] bg-[#FDE7C8] p-2">
          <p className="mb-1 text-center text-xs font-black text-[#B91C1C]">
            {KELOMPOK_TANGGA.masalah.ikon} Lantai: Masalah · {PUSAT_TANGGA}
          </p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kelompok("masalah").map(slot)}</div>
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#FFFBEB"
        gaya={(l) => {
          const kel = kelompokLabel(TEMPAT_TANGGA, l);
          return kel ? { isi: KELOMPOK_TANGGA[kel].isi, garis: KELOMPOK_TANGGA[kel].garis, ikon: KELOMPOK_TANGGA[kel].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Tangga lengkap! Dari masalah di lantai, naik langkah demi langkah, sampai hasil di loteng." : tp.pesan}
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
