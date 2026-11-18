"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_PAPAN, PETUNJUK_URUT_PAPAN, PUSAT_PAPAN, SUARA_PAPAN, TEMPAT_PAPAN } from "./data";

/**
 * Mind-map Kelas 2 Bab 2 Sub-Bab B: Papan Kartu Stok di koperasi. Papan gabus berpaku: deret atas = Hasil, deret tengah dengan tujuh paku bernomor = Penyelesaian
 * berurutan (semua metode Story, termasuk tiga metode global dengan nama Indonesia), deret bawah = Masalah. Tiap paku memegang satu kartu stok kosong;
 * label sewarna dipaku, paku bernomor hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const GABUS = "radial-gradient(circle at 20% 30%,rgba(120,72,24,0.35) 0 2px,transparent 3px),radial-gradient(circle at 70% 60%,rgba(120,72,24,0.28) 0 1.5px,transparent 2.5px),#C9A66B";

export default function PapanKartuStok({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PAPAN,
    71,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_PAPAN, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_PAPAN;
      return kel ? KELOMPOK_PAPAN[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_PAPAN, t, l),
  );
  const kel = (k: string) => TEMPAT_PAPAN.filter((t) => t.kelompok === k);
  const kartu = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_PAPAN[t.kelompok];
    return (
      <div key={t.id} className="relative pt-3">
        <span className="absolute left-1/2 top-0.5 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[#7F1D1D] bg-[#DC2626] shadow-[0_2px_0_rgba(69,26,3,0.35)]" aria-hidden="true" />
        <button
          type="button"
          onClick={() => tp.ketukTempat(t)}
          aria-label={teks ?? (t.urutan ? `Paku kosong nomor ${t.urutan}` : `Paku kosong ${g.nama}`)}
          className={`flex min-h-[58px] w-full items-center justify-center gap-1.5 rounded-sm border-2 px-2 pt-2 text-center text-xs font-black leading-tight text-[#1C01A5] shadow-[0_3px_0_rgba(69,26,3,0.3)] sm:text-sm ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
          style={{ background: teks ? g.isi : "#FFFBEB", borderColor: g.garis }}
        >
          {t.urutan ? (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#92400E] bg-white text-[11px] font-black text-[#92400E]" aria-hidden="true">
              {t.urutan}
            </span>
          ) : null}
          <span className="flex-1">{teks ?? "?"}</span>
        </button>
      </div>
    );
  };
  const deret = (k: string, kelas: string) => (
    <div className="rounded-md border-2 border-[#92400E] bg-[#FFFBEB]/70 p-1.5">
      <p className="mb-1 rounded bg-[#92400E] px-2 py-0.5 text-center text-xs font-black text-white">
        {KELOMPOK_PAPAN[k].ikon} {KELOMPOK_PAPAN[k].letak}: {KELOMPOK_PAPAN[k].nama}
      </p>
      <div className={`grid gap-x-1.5 gap-y-0.5 ${kelas}`}>{kel(k).map((t) => kartu(t))}</div>
    </div>
  );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_PAPAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Papan gabus koperasi. Deret bawah berisi masalah, deret tengah punya tujuh paku bernomor berisi langkah dari satu sampai tujuh, deret atas berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-lg border-[8px] border-[#A16207] p-2" style={{ background: GABUS }}>
        {deret("hasil", "grid-cols-2 sm:grid-cols-4")}
        <p className="rounded bg-[#FFFBEB]/85 px-2 text-center text-sm font-black text-[#92400E]">
          {KELOMPOK_PAPAN.metode.ikon} {PUSAT_PAPAN}: paku nomor satu sampai tujuh
        </p>
        {deret("metode", "grid-cols-1 sm:grid-cols-2")}
        {deret("masalah", "grid-cols-1 sm:grid-cols-3")}
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#FEF3C7"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_PAPAN, l);
          return k ? { isi: KELOMPOK_PAPAN[k].isi, garis: KELOMPOK_PAPAN[k].garis, ikon: KELOMPOK_PAPAN[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Papan selesai! Dari masalah di deret bawah, langkah di deret tengah, sampai hasil di deret atas." : tp.pesan}
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
