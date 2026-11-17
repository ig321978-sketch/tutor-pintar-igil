"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_GEROBAK, PETUNJUK_URUT_GEROBAK, PUSAT_GEROBAK, SUARA_GEROBAK, TEMPAT_GEROBAK } from "./data";

/**
 * Mind-map Kelas 1 Bab 2 Sub-Bab B: Gerobak Panen. Bendera di pegangan gerobak = Masalah, karung bernomor di bak gerobak =
 * Penyelesaian berurutan (semua metode Story), peti di depan gerobak = Hasil. Label sewarna ditempel; karung hanya menerima
 * labelnya sendiri. Hanya poin pelajaran.
 */
export default function PetaGerobak({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_GEROBAK,
    43,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_GEROBAK, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_GEROBAK;
      return kel ? KELOMPOK_GEROBAK[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_GEROBAK, t, l),
  );
  const slot = (t: Tempat, gaya: "bendera" | "karung" | "peti") => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_GEROBAK[t.kelompok];
    const bentuk = gaya === "bendera" ? "rounded-r-2xl rounded-l-sm" : gaya === "karung" ? "rounded-t-[1.6rem] rounded-b-xl" : "rounded-md";
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Tempat kosong ${g.nama}${t.urutan ? ` nomor ${t.urutan}` : ""}`}
        className={`relative flex min-h-[52px] w-full items-center justify-center border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${bentuk} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{
          background: teks ? g.isi : gaya === "peti" ? "repeating-linear-gradient(0deg,#DBEAFE 0 10px,#EFF6FF 10px 12px)" : "rgba(255,255,255,0.88)",
          borderColor: g.garis,
        }}
      >
        {t.urutan ? <span className="absolute -top-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-[#7C4A1E] text-[11px] text-white">{t.urutan}</span> : null}
        {teks ?? "?"}
      </button>
    );
  };
  const kel = (k: string) => TEMPAT_GEROBAK.filter((t) => t.kelompok === k);

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_GEROBAK)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Gerobak panen belajar. Bendera berisi masalah, karung bernomor di bak berisi langkah berurutan, peti di depan berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl rounded-3xl bg-[#E0F2FE] p-3">
        {/* Pegangan dengan bendera masalah */}
        <div className="flex items-stretch gap-2">
          <div className="w-2 shrink-0 rounded-full bg-[#7C4A1E]" aria-hidden="true" />
          <div className="flex-1 space-y-1.5">
            <p className="text-xs font-black text-[#B91C1C]">
              {KELOMPOK_GEROBAK.masalah.ikon} Bendera: Masalah
            </p>
            {kel("masalah").map((t) => (
              <div key={t.id} className="w-[82%]">
                {slot(t, "bendera")}
              </div>
            ))}
          </div>
        </div>

        {/* Bak gerobak berisi karung bernomor */}
        <div className="mt-3 rounded-b-3xl rounded-t-md border-[6px] border-[#7C4A1E] p-3" style={{ background: "repeating-linear-gradient(90deg,#C08552 0 24px,#A86B3C 24px 26px)" }}>
          <p className="mb-3 text-center text-sm font-black text-white drop-shadow">
            {KELOMPOK_GEROBAK.metode.ikon} {PUSAT_GEROBAK}
          </p>
          <div className="grid grid-cols-2 gap-x-2 gap-y-4">{kel("metode").map((t) => slot(t, "karung"))}</div>
        </div>
        {/* Roda */}
        <div className="-mt-3 flex justify-around" aria-hidden="true">
          {[0, 1].map((i) => (
            <span key={i} className="h-10 w-10 rounded-full border-[6px] border-[#374151] bg-[#9CA3AF]" />
          ))}
        </div>

        {/* Peti hasil */}
        <p className="mt-1 text-center text-xs font-black text-[#1D4ED8]">
          {KELOMPOK_GEROBAK.hasil.ikon} Peti di depan gerobak: Hasil
        </p>
        <div className="mt-1 grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kel("hasil").map((t) => slot(t, "peti"))}</div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#FEF2F2"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_GEROBAK, l);
          return k ? { isi: KELOMPOK_GEROBAK[k].isi, garis: KELOMPOK_GEROBAK[k].garis, ikon: KELOMPOK_GEROBAK[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Gerobak panen lengkap! Dari masalah di bendera, langkah di karung, sampai hasil di peti." : tp.pesan}
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
