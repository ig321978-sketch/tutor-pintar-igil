"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_UMBUL, PETUNJUK_URUT_UMBUL, PUSAT_UMBUL, SUARA_UMBUL, TEMPAT_UMBUL } from "./data";

/**
 * Mind-map Kelas 2 Bab 1 Sub-Bab C: Tali Umbul-Umbul Pesta Kue. Tali atas = Hasil, tali tengah dengan tujuh bendera bernomor = Penyelesaian
 * berurutan (semua metode Story, termasuk Garis Bilangan, Bilangan Patokan, dan Model Batang), tali bawah = Masalah. Tiap bendera satu tempat; label sewarna
 * dipasang, bendera bernomor hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const EKOR = "polygon(0 0,100% 0,100% 100%,50% 84%,0 100%)";

export default function UmbulUmbul({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_UMBUL,
    71,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_UMBUL, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_UMBUL;
      return kel ? KELOMPOK_UMBUL[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_UMBUL, t, l),
  );
  const kel = (k: string) => TEMPAT_UMBUL.filter((t) => t.kelompok === k);
  const bendera = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_UMBUL[t.kelompok];
    return (
      <div key={t.id} className="flex flex-col items-center">
        <span className="block h-2 w-px bg-[#78350F]" aria-hidden="true" />
        <button
          type="button"
          onClick={() => tp.ketukTempat(t)}
          aria-label={teks ?? (t.urutan ? `Bendera kosong nomor ${t.urutan}` : `Bendera kosong ${g.nama}`)}
          className={`flex min-h-[64px] w-full items-start justify-center gap-1 px-1.5 pb-4 pt-1.5 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${teks ? "lm-muncul" : ""} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
          style={{ clipPath: EKOR, background: teks ? g.isi : "rgba(255,251,235,0.95)", boxShadow: `inset 0 0 0 3px ${g.garis}` }}
        >
          {t.urutan ? (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#78350F] bg-[#FDE68A] text-[10px] font-black text-[#78350F]" aria-hidden="true">
              {t.urutan}
            </span>
          ) : null}
          <span className="flex-1">{teks ?? "?"}</span>
        </button>
      </div>
    );
  };
  const tali = (k: string, kelas: string) => (
    <div className="rounded-lg border-2 border-dashed border-[#78350F]/50 bg-white/50 p-1.5">
      <p className="mb-1 rounded bg-[#78350F] px-2 py-0.5 text-center text-xs font-black text-[#FEF3C7]">
        {KELOMPOK_UMBUL[k].ikon} {KELOMPOK_UMBUL[k].letak}: {KELOMPOK_UMBUL[k].nama}
      </p>
      <div className="h-1 rounded-full bg-[#78350F]" aria-hidden="true" />
      <div className={`grid gap-x-1.5 ${kelas}`}>{kel(k).map((t) => bendera(t))}</div>
    </div>
  );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_UMBUL)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Tali umbul-umbul Pesta Kue. Tali bawah berisi masalah, tali tengah punya tujuh bendera bernomor berisi langkah dari satu sampai tujuh, tali atas berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-3xl border-4 border-[#DB2777] bg-[#FFF1F2] p-2" style={{ backgroundImage: "repeating-linear-gradient(90deg,rgba(220,38,38,0.1) 0 18px,transparent 18px 36px)" }}>
        {tali("hasil", "grid-cols-2 sm:grid-cols-4")}
        <p className="text-center text-sm font-black text-[#9D174D]">
          {KELOMPOK_UMBUL.metode.ikon} {PUSAT_UMBUL}: bendera nomor satu sampai tujuh
        </p>
        {tali("metode", "grid-cols-1 sm:grid-cols-2")}
        {tali("masalah", "grid-cols-1 sm:grid-cols-3")}
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#FEF3C7"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_UMBUL, l);
          return k ? { isi: KELOMPOK_UMBUL[k].isi, garis: KELOMPOK_UMBUL[k].garis, ikon: KELOMPOK_UMBUL[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Umbul-umbul terpasang! Dari masalah di tali bawah, langkah di tali tengah, sampai hasil di tali atas." : tp.pesan}
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
