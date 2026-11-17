"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_PERON, PETUNJUK_URUT_PERON, PUSAT_PERON, SUARA_PERON, TEMPAT_PERON } from "./data";

/**
 * Mind-map Kelas 1 Bab 3 Sub-Bab B: Peta Peron. Papan pengumuman dengan pengeras suara = Masalah, jalur peron bernomor yang
 * bertumpuk dari atas ke bawah (tiap jalur berpapan nomor dan rel) = Penyelesaian berurutan (semua metode Story), kereta lanjutan
 * dengan jendela = Hasil. Label sewarna ditempel; jalur hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
export default function PetaPeron({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PERON,
    43,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_PERON, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_PERON;
      return kel ? KELOMPOK_PERON[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_PERON, t, l),
  );
  const slot = (t: Tempat, kelas: string) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_PERON[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Tempat kosong ${g.nama}${t.urutan ? ` nomor ${t.urutan}` : ""}`}
        className={`relative flex min-h-[44px] w-full items-center justify-center border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${kelas} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.88)", borderColor: g.garis }}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const kel = (k: string) => TEMPAT_PERON.filter((t) => t.kelompok === k);

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_PERON)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Peta peron belajar. Papan pengumuman berisi masalah, jalur peron bernomor berisi langkah berurutan, kereta lanjutan berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border-4 border-[#1E1B4B] bg-[#E5E7EB]">
        {/* Papan pengumuman dengan pengeras suara */}
        <div className="flex items-stretch gap-2 bg-[#1E1B4B] px-3 py-3">
          <span className="self-center text-3xl" aria-hidden="true">
            {KELOMPOK_PERON.masalah.ikon}
          </span>
          <div className="flex-1 rounded-lg border-2 border-[#FACC15] bg-[#111827] p-2">
            <p className="mb-1 text-center text-xs font-black text-[#FDE68A]">Papan pengumuman: Masalah</p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kel("masalah").map((t) => slot(t, "rounded-md"))}</div>
          </div>
        </div>

        {/* Jalur peron bernomor bertumpuk */}
        <div className="px-3 py-3">
          <p className="mb-2 text-center text-sm font-black text-[#312E81]">
            {KELOMPOK_PERON.metode.ikon} {PUSAT_PERON}: jalur peron
          </p>
          <div className="space-y-2">
            {kel("metode").map((t) => (
              <div key={t.id} className="flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border-2 border-white bg-[#312E81] text-sm font-black text-[#FDE68A] shadow">{t.urutan}</span>
                <div className="relative flex-1">
                  <div className="absolute -bottom-1.5 left-0 right-0 h-1.5 border-y border-[#475569]" style={{ background: "repeating-linear-gradient(90deg,#78350F 0 5px,transparent 5px 12px)" }} aria-hidden="true" />
                  {slot(t, "rounded-sm")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kereta lanjutan dengan jendela */}
        <div className="px-3 pb-3">
          <div className="rounded-l-[2.5rem] rounded-r-xl border-4 border-[#047857] bg-[#D1FAE5] p-2">
            <p className="mb-1 text-center text-xs font-black text-[#064E3B]">
              {KELOMPOK_PERON.hasil.ikon} Kereta lanjutan: Hasil
            </p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kel("hasil").map((t) => slot(t, "rounded-xl"))}</div>
            <div className="mt-1 flex justify-around" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-4 w-4 rounded-full border-2 border-[#1F2937] bg-[#6B7280]" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#EEF2FF"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_PERON, l);
          return k ? { isi: KELOMPOK_PERON[k].isi, garis: KELOMPOK_PERON[k].garis, ikon: KELOMPOK_PERON[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Peta peron lengkap! Dari masalah di papan pengumuman, langkah di jalur peron, sampai hasil di kereta lanjutan." : tp.pesan}
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
