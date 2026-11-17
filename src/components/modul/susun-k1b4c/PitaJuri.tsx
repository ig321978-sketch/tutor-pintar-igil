"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_PITA, PETUNJUK_URUT_PITA, PUSAT_PITA, SUARA_PITA, TEMPAT_PITA } from "./data";

/**
 * Mind-map Kelas 1 Bab 4 Sub-Bab C: Meja Juri Festival. Papan klip juri berjepit = Masalah, tujuh pita juri (lingkaran berekor)
 * bernomor tergantung di palang = Penyelesaian berurutan (semua metode Story), alas piala bertingkat = Hasil.
 * Label sewarna ditempel; pita hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const WARNA_PITA = ["#60A5FA", "#F472B6", "#34D399", "#FACC15", "#A78BFA", "#FB923C", "#F87171"];

export default function PitaJuri({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PITA,
    47,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_PITA, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_PITA;
      return kel ? KELOMPOK_PITA[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_PITA, t, l),
  );
  const kel = (k: string) => TEMPAT_PITA.filter((t) => t.kelompok === k);
  const kotak = (t: Tempat, gaya: "klip" | "piala") => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_PITA[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Tempat kosong ${g.nama}`}
        className={`flex min-h-[44px] w-full items-center justify-center border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${gaya === "klip" ? "rounded-sm" : "rounded-lg"} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.92)", borderColor: g.garis }}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const pita = (t: Tempat, i: number) => {
    const teks = tp.teksDi(t);
    const w = WARNA_PITA[i % WARNA_PITA.length];
    return (
      <div key={t.id} className="flex flex-col items-center">
        <span className="h-3 w-0.5 bg-[#78350F]" aria-hidden="true" />
        <button
          type="button"
          onClick={() => tp.ketukTempat(t)}
          aria-label={teks ?? `Pita kosong nomor ${t.urutan}`}
          className={`relative flex h-[84px] w-[84px] flex-col items-center justify-center rounded-full border-[5px] text-center text-[11px] font-black leading-tight text-[#1C01A5] sm:text-xs ${tp.goyang === t.id ? "lm-goyang" : ""} ${teks ? "lm-muncul" : ""}`}
          style={{ background: teks ? KELOMPOK_PITA.metode.isi : "#FFFFFF", borderColor: w, boxShadow: `0 0 0 3px #FFFFFF, 0 0 0 6px ${w}` }}
        >
          <span className="mb-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-[10px] text-white">{t.urutan}</span>
          <span className="px-1">{teks ?? "?"}</span>
        </button>
        <svg viewBox="0 0 40 26" className="-mt-1 h-6 w-10" aria-hidden="true">
          <path d="M 10 0 L 4 26 L 12 20 L 18 26 L 18 0 Z M 22 0 L 22 26 L 28 20 L 36 26 L 30 0 Z" fill={w} />
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_PITA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Meja juri festival. Papan klip berisi masalah, pita bernomor berisi langkah berurutan, piala berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border-4 border-[#78350F] p-3" style={{ background: "#FEF3C7", backgroundImage: "repeating-linear-gradient(90deg,rgba(120,53,15,0.08) 0 2px,transparent 2px 26px)" }}>
        {/* Papan klip juri */}
        <div className="relative mx-auto max-w-md rounded-xl border-4 border-[#92400E] bg-[#D6A15E] p-2 pt-6">
          <span className="absolute left-1/2 top-0 h-5 w-24 -translate-x-1/2 rounded-b-lg border-2 border-[#475569] bg-[#CBD5E1]" aria-hidden="true" />
          <div className="rounded-md bg-white p-2 shadow-inner">
            <p className="mb-2 text-center text-xs font-black text-[#7F1D1D]">
              {KELOMPOK_PITA.masalah.ikon} Papan klip juri: Masalah
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">{kel("masalah").map((t) => kotak(t, "klip"))}</div>
          </div>
        </div>

        {/* Palang dengan tujuh pita juri */}
        <p className="mt-3 text-center text-sm font-black text-[#1E3A8A]">
          {KELOMPOK_PITA.metode.ikon} {PUSAT_PITA}: langkah berurutan
        </p>
        <div className="relative mt-1">
          <div className="absolute inset-x-0 top-0 h-2 rounded-full bg-[#78350F]" aria-hidden="true" />
          <div className="relative flex flex-wrap justify-center gap-x-2 gap-y-1 pt-1">{kel("metode").map((t, i) => pita(t, i))}</div>
        </div>

        {/* Piala bertingkat */}
        <div className="mt-2 flex flex-col items-center">
          <span className="text-4xl" aria-hidden="true">
            {KELOMPOK_PITA.hasil.ikon}
          </span>
          <div className="w-full rounded-t-2xl border-4 border-b-0 border-[#B45309] bg-gradient-to-b from-[#FDE68A] to-[#FACC15] p-2">
            <p className="mb-1 text-center text-xs font-black text-[#78350F]">Alas piala: Hasil</p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{kel("hasil").map((t) => kotak(t, "piala"))}</div>
          </div>
          <div className="h-3 w-[104%] rounded-b-md bg-[#78350F]" aria-hidden="true" />
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#FEF3C7"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_PITA, l);
          return k ? { isi: KELOMPOK_PITA[k].isi, garis: KELOMPOK_PITA[k].garis, ikon: KELOMPOK_PITA[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Meja juri lengkap! Dari masalah di papan klip, langkah di pita, sampai hasil di piala." : tp.pesan}
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
