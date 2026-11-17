"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_RUMAH, PETUNJUK_URUT_RUMAH, PUSAT_RUMAH, SUARA_RUMAH, TEMPAT_RUMAH } from "./data";

/**
 * Mind-map Kelas 1 Bab 7 Sub-Bab B: Rumah Pohon. Lantai papan rumah pohon di puncak = Masalah, batang pohon jambu dengan tujuh dahan bernomor
 * = Penyelesaian berurutan (semua metode Story, dibaca dari nomor satu), bendera di tanah = Hasil. Label sewarna ditempel; dahan hanya
 * menerima labelnya sendiri. Hanya poin pelajaran.
 */
export default function RumahPohon({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_RUMAH,
    71,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_RUMAH, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_RUMAH;
      return kel ? KELOMPOK_RUMAH[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_RUMAH, t, l),
  );
  const kel = (k: string) => TEMPAT_RUMAH.filter((t) => t.kelompok === k);
  const kartu = (t: Tempat, bentuk: string) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_RUMAH[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? (t.urutan ? `Dahan kosong nomor ${t.urutan}` : `Tempat kosong ${g.nama}`)}
        className={`flex min-h-[46px] w-full items-center justify-center gap-1.5 border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${bentuk} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.9)", borderColor: g.garis }}
      >
        {t.urutan ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#14532D] bg-[#FACC15] text-[11px] font-black text-[#14532D]" aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
      </button>
    );
  };
  const dahan = kel("metode");

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_RUMAH)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Rumah pohon di dahan jambu. Lantainya berisi masalah, tujuh dahan bernomor berisi langkah, bendera berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl rounded-3xl border-4 border-[#14532D] bg-gradient-to-b from-[#BAE6FD] to-[#DCFCE7] p-2">
        {/* Lantai rumah pohon (Masalah) */}
        <div className="mx-auto h-5 max-w-[70%] rounded-t-xl border-4 border-b-0 border-[#7C2D12] bg-[#B45309]" aria-hidden="true" />
        <div className="mx-auto max-w-md rounded-md border-4 border-[#7C2D12] p-2 shadow-[0_5px_0_rgba(63,35,6,0.45)]" style={{ background: "repeating-linear-gradient(90deg,#E8B979 0 34px,#C8924B 34px 37px)" }}>
          <p className="mb-1 text-center text-xs font-black text-[#451A03]">
            {KELOMPOK_RUMAH.masalah.ikon} Lantai rumah pohon: Masalah
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">{kel("masalah").map((t) => kartu(t, "rounded-md"))}</div>
        </div>

        {/* Batang pohon jambu dengan tujuh dahan bernomor (Penyelesaian) */}
        <p className="mt-2 text-center text-sm font-black text-[#14532D]">
          {KELOMPOK_RUMAH.metode.ikon} {PUSAT_RUMAH}: ikuti dahan dari nomor satu
        </p>
        <div className="relative mx-auto max-w-md py-1">
          <span className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 rounded-sm border-x-4 border-[#78350F] bg-[#A16207]" aria-hidden="true" />
          <div className="relative space-y-1.5">
            {dahan.map((t, i) => (
              <div key={t.id} className={`w-[78%] ${i % 2 === 0 ? "mr-auto" : "ml-auto"}`}>
                {kartu(t, "rounded-xl")}
              </div>
            ))}
          </div>
        </div>

        {/* Bendera di tanah (Hasil) */}
        <div className="relative mx-auto mt-2 max-w-md rounded-xl border-4 border-[#BE185D] bg-white p-2">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl" aria-hidden="true">
            {"\u{1F6A9}"}
          </span>
          <p className="mb-1 mt-1 text-center text-sm font-black tracking-widest text-[#BE185D]">BENDERA · Hasil</p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{kel("hasil").map((t) => kartu(t, "rounded-full"))}</div>
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#F0FDF4"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_RUMAH, l);
          return k ? { isi: KELOMPOK_RUMAH[k].isi, garis: KELOMPOK_RUMAH[k].garis, ikon: KELOMPOK_RUMAH[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Rumah pohon lengkap! Dari masalah di lantai, langkah di tiap dahan, sampai hasil di bendera." : tp.pesan}
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
