"use client";

import React from "react";
import { cocokKelompok, kelompokLabel, type Tempat } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import { KELOMPOK_PAGAR, PETUNJUK_URUT_PAGAR, PUSAT_PAGAR, SUARA_PAGAR, TEMPAT_PAGAR } from "./data-peta";

/**
 * Mind-map Kelas 2 Bab 3 Sub-Bab A: Pagar Petak. Pagar taman bermain dengan tiga papan petak: papan atas = Hasil, papan tengah dengan tujuh petak bernomor =
 * Penyelesaian berurutan (semua metode Story, termasuk Papan Paku, Diagram Venn, dan Berburu Bentuk), papan bawah = Masalah. Tiap petak satu tempat;
 * label sewarna dipasang, petak bernomor hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const PAKU = "radial-gradient(circle at 6px 6px,#78350F 0 2px,transparent 3px)";

export default function PagarPetak({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PAGAR,
    83,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_PAGAR, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_PAGAR;
      return kel ? KELOMPOK_PAGAR[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_PAGAR, t, l),
  );
  const kel = (k: string) => TEMPAT_PAGAR.filter((t) => t.kelompok === k);
  const petak = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_PAGAR[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? (t.urutan ? `Petak kosong nomor ${t.urutan}` : `Petak kosong ${g.nama}`)}
        className={`relative flex min-h-[64px] w-full items-center justify-center gap-1 rounded-sm border-[3px] px-1.5 py-1.5 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(254,252,232,0.95)", borderColor: g.garis }}
      >
        {t.urutan ? (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-2 border-[#78350F] bg-[#FDE68A] text-[10px] font-black text-[#78350F]" aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
      </button>
    );
  };
  const papan = (k: string, kelas: string) => (
    <div className="rounded-md border-4 border-[#78350F] bg-[#D6A15E] p-1.5" style={{ backgroundImage: PAKU, backgroundSize: "100% 14px" }}>
      <p className="mb-1.5 rounded-sm bg-[#78350F] px-2 py-0.5 text-center text-xs font-black text-[#FEF3C7]">
        {KELOMPOK_PAGAR[k].ikon} {KELOMPOK_PAGAR[k].letak}: {KELOMPOK_PAGAR[k].nama}
      </p>
      <div className={`grid gap-1.5 ${kelas}`}>{kel(k).map((t) => petak(t))}</div>
    </div>
  );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_PAGAR)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Pagar taman bermain. Papan bawah berisi masalah, papan tengah punya tujuh petak bernomor berisi langkah dari satu sampai tujuh, papan atas berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-3xl border-4 border-[#16A34A] bg-[#DCFCE7] p-2">
        {papan("hasil", "grid-cols-2 sm:grid-cols-4")}
        <p className="text-center text-sm font-black text-[#166534]">
          {KELOMPOK_PAGAR.metode.ikon} {PUSAT_PAGAR}: petak nomor satu sampai tujuh
        </p>
        {papan("metode", "grid-cols-1 sm:grid-cols-2")}
        {papan("masalah", "grid-cols-1 sm:grid-cols-3")}
        <div className="h-3 rounded-full bg-[#78350F]/70" aria-hidden="true" />
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
        {tp.selesai ? "Pagar terpasang! Dari masalah di papan bawah, langkah di papan tengah, sampai hasil di papan atas." : tp.pesan}
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
