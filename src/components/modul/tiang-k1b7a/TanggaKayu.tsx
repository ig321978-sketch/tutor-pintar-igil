"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_TANGGA, PETUNJUK_URUT_TANGGA, PUSAT_TANGGA, SUARA_TANGGA, TEMPAT_TANGGA } from "./data";

/**
 * Mind-map Kelas 1 Bab 7 Sub-Bab A: Tangga Kayu. Tanah di kaki tangga = Masalah, tujuh anak tangga bernomor dari bawah ke atas = Penyelesaian
 * berurutan (semua metode Story), rumah pohon di puncak tangga = Hasil. Label sewarna ditempel; anak tangga hanya menerima labelnya sendiri.
 * Hanya poin pelajaran.
 */
export default function TanggaKayu({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_TANGGA,
    71,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_TANGGA, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_TANGGA;
      return kel ? KELOMPOK_TANGGA[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_TANGGA, t, l),
  );
  const kel = (k: string) => TEMPAT_TANGGA.filter((t) => t.kelompok === k);
  const kartu = (t: Tempat, bentuk: string) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_TANGGA[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? (t.urutan ? `Anak tangga kosong nomor ${t.urutan}` : `Tempat kosong ${g.nama}`)}
        className={`flex min-h-[46px] w-full items-center justify-center gap-1.5 border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${bentuk} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.9)", borderColor: g.garis }}
      >
        {t.urutan ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#78350F] bg-[#FDE68A] text-[11px] font-black text-[#78350F]" aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
      </button>
    );
  };
  /** Anak tangga dari atas (nomor tujuh) ke bawah (nomor satu), supaya terbaca naik dari bawah. */
  const anakTangga = [...kel("metode")].sort((a, b) => (b.urutan ?? 0) - (a.urutan ?? 0));

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_TANGGA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Tangga kayu ke rumah pohon. Tanah berisi masalah, tujuh anak tangga bernomor berisi langkah dari bawah ke atas, rumah pohon berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl rounded-3xl border-4 border-[#92400E] bg-gradient-to-b from-[#E0F2FE] to-[#ECFCCB] p-2">
        {/* Rumah pohon di puncak (Hasil) */}
        <div className="mx-auto max-w-md" aria-hidden="true">
          <div className="mx-auto h-0 w-0 border-x-[60px] border-b-[26px] border-x-transparent border-b-[#B45309]" />
        </div>
        <div className="mx-auto max-w-md rounded-md border-4 border-[#92400E] bg-[#FEF3C7] p-2 shadow-[0_4px_0_rgba(120,53,15,0.35)]">
          <p className="mb-1 text-center text-xs font-black text-[#78350F]">
            {KELOMPOK_TANGGA.hasil.ikon} Rumah pohon: Hasil
          </p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{kel("hasil").map((t) => kartu(t, "rounded-md"))}</div>
        </div>

        {/* Tangga: dua sisi kayu dan tujuh anak tangga */}
        <p className="mt-2 text-center text-sm font-black text-[#78350F]">
          {KELOMPOK_TANGGA.metode.ikon} {PUSAT_TANGGA}: naik dari anak tangga bawah
        </p>
        <div className="relative mx-auto max-w-md px-5 py-1">
          <span className="absolute inset-y-0 left-1 w-2.5 rounded bg-[#92400E]" aria-hidden="true" />
          <span className="absolute inset-y-0 right-1 w-2.5 rounded bg-[#92400E]" aria-hidden="true" />
          <div className="space-y-1.5">{anakTangga.map((t) => kartu(t, "rounded-lg"))}</div>
        </div>

        {/* Tanah di kaki tangga (Masalah) */}
        <div className="mx-auto mt-1 max-w-md rounded-xl border-4 border-[#A16207] bg-[#BBF7D0] p-2">
          <p className="mb-1 text-center text-xs font-black text-[#14532D]">
            {KELOMPOK_TANGGA.masalah.ikon} Tanah di kaki tangga: Masalah
          </p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kel("masalah").map((t) => kartu(t, "rounded-md"))}</div>
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#FEF3C7"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_TANGGA, l);
          return k ? { isi: KELOMPOK_TANGGA[k].isi, garis: KELOMPOK_TANGGA[k].garis, ikon: KELOMPOK_TANGGA[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Tangga selesai! Dari masalah di tanah, langkah di tiap anak tangga, sampai hasil di rumah pohon." : tp.pesan}
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
