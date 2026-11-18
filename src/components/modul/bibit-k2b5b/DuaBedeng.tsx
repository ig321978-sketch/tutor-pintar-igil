"use client";

import React from "react";
import { cocokKelompok, kelompokLabel, type Tempat } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import { KELOMPOK_BEDENG, PETUNJUK_URUT_BEDENG, PUSAT_BEDENG, SUARA_BEDENG, TEMPAT_BEDENG } from "./data-peta";

/**
 * Mind-map Kelas 2 Bab 5 Sub-Bab B: Dua Bedeng. Tiga bedeng tanah bersusun dengan petak-petak: bedeng atas = Hasil, bedeng tengah dengan tujuh petak bernomor =
 * Penyelesaian berurutan (semua metode Story, termasuk Bagi Satu-Satu, Neraca Seimbang, dan Cek Dua Kali Lipat), bedeng bawah = Masalah. Tiap petak satu tempat;
 * label sewarna ditanam, petak bernomor hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
export default function DuaBedeng({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_BEDENG,
    83,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_BEDENG, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_BEDENG;
      return kel ? KELOMPOK_BEDENG[kel].petunjuk : "Coba petak yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_BEDENG, t, l),
  );
  const kel = (k: string) => TEMPAT_BEDENG.filter((t) => t.kelompok === k);
  const petak = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_BEDENG[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? (t.urutan ? `Petak kosong nomor ${t.urutan}` : `Petak kosong ${g.nama}`)}
        className={`relative flex min-h-[64px] w-full items-center justify-center gap-1 rounded-lg border-[3px] px-1.5 py-1.5 text-center text-xs font-black leading-tight sm:text-sm ${teks ? "lm-muncul text-[#1C01A5]" : "border-dashed text-[#FEF3C7]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "#7C4A21", borderColor: teks ? g.garis : "#D6A15E" }}
      >
        {t.urutan ? (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#15803D] bg-white text-[10px] font-black text-[#15803D]" aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
      </button>
    );
  };
  const bedeng = (k: string, kelas: string) => (
    <div className="rounded-2xl border-4 border-[#78350F] bg-[#B45309] px-2 py-2">
      <p className="mb-1.5 text-center text-xs font-black text-[#FEF3C7]">
        {KELOMPOK_BEDENG[k].ikon} {KELOMPOK_BEDENG[k].letak}: {KELOMPOK_BEDENG[k].nama}
      </p>
      <div className={`grid gap-1.5 ${kelas}`}>{kel(k).map((t) => petak(t))}</div>
    </div>
  );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_BEDENG)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Dua bedeng tanah. Petak masalah berisi masalah, bedeng penyelesaian punya tujuh petak bernomor berisi langkah dari satu sampai tujuh, petak hasil berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-3xl border-4 border-[#15803D] bg-[#DCFCE7] p-2">
        {bedeng("hasil", "grid-cols-1 sm:grid-cols-2")}
        <p className="text-center text-sm font-black text-[#14532D]">
          {KELOMPOK_BEDENG.metode.ikon} {PUSAT_BEDENG}: petak nomor satu sampai tujuh
        </p>
        {bedeng("metode", "grid-cols-1 sm:grid-cols-2")}
        {bedeng("masalah", "grid-cols-1 sm:grid-cols-3")}
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#ECFCCB"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_BEDENG, l);
          return k ? { isi: KELOMPOK_BEDENG[k].isi, garis: KELOMPOK_BEDENG[k].garis, ikon: KELOMPOK_BEDENG[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Dua bedeng terisi! Dari masalah di bawah, langkah di tengah, sampai hasil di atas." : tp.pesan}
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
