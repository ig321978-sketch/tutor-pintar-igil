"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_GANTUNGAN, PETUNJUK_URUT_GANTUNGAN, PUSAT_GANTUNGAN, SUARA_GANTUNGAN, TEMPAT_GANTUNGAN } from "./data";

/**
 * Mind-map Kelas 2 Bab 2 Sub-Bab A: Gantungan Seragam. Tiga batang gantung bertingkat: batang atas = Hasil, batang tengah dengan tujuh hanger bernomor = Penyelesaian
 * berurutan (semua metode Story, termasuk tiga metode global dengan nama Indonesia), batang bawah = Masalah. Tiap hanger membawa satu label; label sewarna digantung,
 * hanger bernomor hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
export default function GantunganSeragam({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_GANTUNGAN,
    73,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_GANTUNGAN, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_GANTUNGAN;
      return kel ? KELOMPOK_GANTUNGAN[kel].petunjuk : "Coba hanger yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_GANTUNGAN, t, l),
  );
  const kel = (k: string) => TEMPAT_GANTUNGAN.filter((t) => t.kelompok === k);
  const hanger = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_GANTUNGAN[t.kelompok];
    return (
      <div key={t.id} className="flex flex-col items-center">
        <span className="block h-3 w-1 rounded-b bg-[#92400E]" aria-hidden="true" />
        <span className="-mt-0.5 block h-2 w-5 rounded-t-full border-2 border-b-0 border-[#92400E]" aria-hidden="true" />
        <button
          type="button"
          onClick={() => tp.ketukTempat(t)}
          aria-label={teks ?? (t.urutan ? `Hanger kosong nomor ${t.urutan}` : `Hanger kosong ${g.nama}`)}
          className={`flex min-h-[56px] w-full items-center justify-center gap-1.5 rounded-b-xl rounded-t-3xl border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1E293B] sm:text-sm ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
          style={{ background: teks ? g.isi : "rgba(255,255,255,0.78)", borderColor: g.garis }}
        >
          {t.urutan ? (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#1D4ED8] bg-white text-[11px] font-black text-[#1D4ED8]" aria-hidden="true">
              {t.urutan}
            </span>
          ) : null}
          <span className="flex-1">{teks ?? "?"}</span>
        </button>
      </div>
    );
  };
  const batang = (k: string, kelas: string) => (
    <div className="rounded-xl border-4 border-[#FDBA74] bg-[#FFF7ED] p-1.5 shadow-[0_4px_0_rgba(194,65,12,0.25)]">
      <p className="mb-1 rounded-full bg-[#92400E] px-2 py-0.5 text-center text-xs font-black text-white">
        {KELOMPOK_GANTUNGAN[k].ikon} {KELOMPOK_GANTUNGAN[k].letak}: {KELOMPOK_GANTUNGAN[k].nama}
      </p>
      <div className="h-2 rounded-full bg-[#92400E]" aria-hidden="true" />
      <div className={`grid gap-x-1.5 gap-y-1 ${kelas}`}>{kel(k).map((t) => hanger(t))}</div>
    </div>
  );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_GANTUNGAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Tiga batang gantungan seragam di koperasi. Batang bawah berisi masalah, batang tengah punya tujuh hanger bernomor berisi langkah dari satu sampai tujuh, batang atas berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-3xl border-[6px] border-[#C2410C] bg-[#FFEDD5] p-2 shadow-[0_6px_0_rgba(124,45,18,0.3)]">
        {batang("hasil", "grid-cols-2 sm:grid-cols-4")}
        <p className="text-center text-sm font-black text-[#7C2D12]">
          {KELOMPOK_GANTUNGAN.metode.ikon} {PUSAT_GANTUNGAN}: hanger nomor satu sampai tujuh
        </p>
        {batang("metode", "grid-cols-1 sm:grid-cols-2")}
        {batang("masalah", "grid-cols-1 sm:grid-cols-3")}
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#FFEDD5"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_GANTUNGAN, l);
          return k ? { isi: KELOMPOK_GANTUNGAN[k].isi, garis: KELOMPOK_GANTUNGAN[k].garis, ikon: KELOMPOK_GANTUNGAN[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Gantungan penuh! Dari masalah di batang bawah, langkah di batang tengah, sampai hasil di batang atas." : tp.pesan}
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
