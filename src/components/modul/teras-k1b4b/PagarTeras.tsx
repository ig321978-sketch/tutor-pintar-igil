"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_PAGAR, PETUNJUK_URUT_PAGAR, PUSAT_PAGAR, SUARA_PAGAR, TEMPAT_PAGAR } from "./data";

/**
 * Mind-map Kelas 1 Bab 4 Sub-Bab B: Pagar Teras. Keset sabut di depan pagar = Masalah, tujuh papan pagar runcing bernomor
 * = Penyelesaian berurutan (semua metode Story, termasuk Pilah Ciri, Tebak Aturan, Cari yang Beda), pot gantung di balok teras = Hasil.
 * Label sewarna ditempel; papan pagar hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const POTONG_PAPAN = "polygon(50% 0,100% 14%,100% 100%,0 100%,0 14%)";
const WARNA_KAYU = ["#E7C9A0", "#DDBB8C", "#E9CFA9", "#D9B47F", "#E3C595", "#DBB685", "#E6CA9E"];

export default function PagarTeras({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PAGAR,
    47,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_PAGAR, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_PAGAR;
      return kel ? KELOMPOK_PAGAR[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_PAGAR, t, l),
  );
  const kel = (k: string) => TEMPAT_PAGAR.filter((t) => t.kelompok === k);
  const keset = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_PAGAR.masalah;
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? "Tempat kosong Masalah"}
        className={`flex min-h-[46px] w-full items-center justify-center rounded-md border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.88)", borderColor: g.garis }}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const papan = (t: Tempat, i: number) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_PAGAR.metode;
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Papan pagar kosong nomor ${t.urutan}`}
        className={`relative flex h-[118px] w-full flex-col items-center justify-start pt-4 text-center text-[11px] font-black leading-tight text-[#1C01A5] sm:text-xs ${tp.goyang === t.id ? "lm-goyang" : ""} ${teks ? "lm-muncul" : ""}`}
        style={{ clipPath: POTONG_PAPAN, background: teks ? g.isi : WARNA_KAYU[i % WARNA_KAYU.length], boxShadow: "inset -4px 0 0 rgba(120,53,15,0.18)" }}
      >
        <span className="mb-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#78350F] text-[10px] text-white">{t.urutan}</span>
        <span className="px-1">{teks ?? "?"}</span>
        <span className="absolute bottom-6 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#57534E]" aria-hidden="true" />
      </button>
    );
  };
  const pot = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_PAGAR.hasil;
    return (
      <div key={t.id} className="flex flex-col items-center">
        <span className="h-4 w-px bg-[#57534E]" aria-hidden="true" />
        <span className="text-base leading-none" aria-hidden="true">
          {"\u{1F33F}"}
        </span>
        <button
          type="button"
          onClick={() => tp.ketukTempat(t)}
          aria-label={teks ?? "Pot gantung kosong"}
          className={`flex min-h-[54px] w-full items-center justify-center border-[3px] px-1.5 text-center text-xs font-black leading-tight text-[#1C01A5] ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
          style={{ background: teks ? g.isi : "#FED7AA", borderColor: g.garis, borderRadius: "6px 6px 40% 40%" }}
        >
          {teks ?? "?"}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_PAGAR)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Pagar teras. Keset berisi masalah, papan pagar bernomor berisi langkah berurutan, pot gantung berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border-4 border-[#1E3A8A] bg-gradient-to-b from-[#E0F2FE] via-[#F0F9FF] to-[#ECFCCB] p-3">
        {/* Keset sabut di depan pagar */}
        <div className="mx-auto mb-3 max-w-md rounded-lg border-4 border-[#7C2D12] p-2" style={{ background: "#B7791F", backgroundImage: "repeating-linear-gradient(90deg,rgba(68,38,10,0.35) 0 2px,transparent 2px 5px)" }}>
          <p className="mb-1.5 text-center text-xs font-black text-[#FFFBEB]">
            {KELOMPOK_PAGAR.masalah.ikon} Keset: Masalah
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">{kel("masalah").map(keset)}</div>
        </div>
        {/* Tujuh papan pagar runcing */}
        <p className="text-center text-sm font-black text-[#78350F]">
          {KELOMPOK_PAGAR.metode.ikon} {PUSAT_PAGAR}: langkah berurutan
        </p>
        <div className="relative mt-1">
          <div className="absolute inset-x-0 top-12 h-2.5 rounded-sm bg-[#92400E]/80" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-5 h-2.5 rounded-sm bg-[#92400E]/80" aria-hidden="true" />
          <div className="relative grid grid-cols-4 gap-1.5 sm:grid-cols-7">{kel("metode").map((t, i) => papan(t, i))}</div>
        </div>
        <div className="h-2 rounded-sm bg-[#65A30D]" aria-hidden="true" />
        {/* Balok teras dengan pot gantung di ujung pagar */}
        <div className="mt-3 h-3 rounded-sm bg-[#78350F]" aria-hidden="true" />
        <p className="mt-1 text-center text-xs font-black text-[#14532D]">
          {KELOMPOK_PAGAR.hasil.ikon} Pot gantung: Hasil
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{kel("hasil").map(pot)}</div>

      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#FEF3C7"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_PAGAR, l);
          return k ? { isi: KELOMPOK_PAGAR[k].isi, garis: KELOMPOK_PAGAR[k].garis, ikon: KELOMPOK_PAGAR[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Pagar teras lengkap! Dari masalah di keset, langkah di papan pagar, sampai hasil di pot gantung." : tp.pesan}
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
