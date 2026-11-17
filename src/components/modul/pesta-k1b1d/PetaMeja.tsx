"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_MEJA, PETUNJUK_URUT_MEJA, PUSAT_MEJA, SUARA_MEJA, TEMPAT_MEJA } from "./data";

/**
 * Mind-map Kelas 1 Bab 1 Sub-Bab D: Meja Pesta. Kartu undangan = Masalah, piring bernomor mengelilingi meja = Penyelesaian
 * berurutan (semua metode Story), kado = Hasil. Label sewarna ditempel; piring hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
export default function PetaMeja({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_MEJA,
    71,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_MEJA, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_MEJA;
      return kel ? KELOMPOK_MEJA[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_MEJA, t, l),
  );
  const slot = (t: Tempat, bundar = false) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_MEJA[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Tempat kosong ${g.nama}${t.urutan ? ` nomor ${t.urutan}` : ""}`}
        className={`relative flex min-h-[48px] w-full items-center justify-center border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${bundar ? "rounded-full" : "rounded-lg"} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.85)", borderColor: g.garis }}
      >
        {t.urutan ? <span className="absolute -left-1 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#B45309] text-[11px] text-white">{t.urutan}</span> : null}
        {teks ?? "?"}
      </button>
    );
  };
  const kel = (k: string) => TEMPAT_MEJA.filter((t) => t.kelompok === k);

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_MEJA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Meja pesta belajar. Kartu undangan berisi masalah, piring bernomor berisi langkah berurutan, kado berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-3xl border-4 border-[#BE185D] bg-[#FDF2F8] p-2">
        <p className="text-center text-xs font-black text-[#BE185D]">
          {KELOMPOK_MEJA.masalah.ikon} Kartu undangan: Masalah
        </p>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kel("masalah").map((t) => slot(t))}</div>

        <div className="rounded-[2.5rem] border-[6px] border-[#92400E] p-3 shadow-[0_6px_0_#78350F]" style={{ background: "repeating-linear-gradient(90deg,#FEE2E2 0 18px,#FFFFFF 18px 36px)" }}>
          <p className="mb-2 text-center text-sm font-black text-[#92400E]">
            {"\u{1F37D}\u{FE0F}"} {PUSAT_MEJA}
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{kel("metode").map((t) => slot(t, true))}</div>
        </div>

        <p className="text-center text-xs font-black text-[#15803D]">
          {KELOMPOK_MEJA.hasil.ikon} Kado: Hasil
        </p>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kel("hasil").map((t) => slot(t))}</div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#FFF1F2"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_MEJA, l);
          return k ? { isi: KELOMPOK_MEJA[k].isi, garis: KELOMPOK_MEJA[k].garis, ikon: KELOMPOK_MEJA[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Meja pesta lengkap! Dari masalah di undangan, langkah di piring, sampai hasil di kado." : tp.pesan}
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
