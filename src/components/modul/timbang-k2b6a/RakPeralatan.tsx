"use client";

import React from "react";
import { cocokKelompok, kelompokLabel, type Tempat } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TagContoh, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import { KELOMPOK_RAK, PETUNJUK_URUT_RAK, PUSAT_RAK, SUARA_RAK, TEMPAT_RAK } from "./data-peta";

/**
 * Mind-map Kelas 2 Bab 6 Sub-Bab A: Rak Peralatan. Troli peralatan tiga rak dengan kotak-kotak kosong: rak atas = Hasil, rak tengah dengan tujuh kotak bernomor = Penyelesaian berurutan
 * (semua metode Story, termasuk Model Batang, Neraca Titik, dan Berat di Dasar), rak bawah = Masalah. Tiap kotak satu tempat;
 * label sewarna dipasang, kotak bernomor hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const BESI = "repeating-linear-gradient(90deg,rgba(71,85,105,0.0) 0 38px,rgba(71,85,105,0.22) 38px 40px)";

export default function RakPeralatan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_RAK,
    59,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_RAK, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_RAK;
      return kel ? KELOMPOK_RAK[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_RAK, t, l),
  );
  const kel = (k: string) => TEMPAT_RAK.filter((t) => t.kelompok === k);
  const petak = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_RAK[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={t.contoh ? `Contoh: ${teks}` : (teks ?? (t.urutan ? `Kotak kosong nomor ${t.urutan}` : `Kotak kosong ${g.nama}`))}
        className={`relative flex min-h-[64px] w-full items-center justify-center gap-1 rounded-md border-[3px] px-1.5 py-1.5 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""} ${t.contoh ? "!pt-3.5" : ""}`}
        style={{ background: teks ? g.isi : "rgba(248,250,252,0.96)", borderColor: g.garis }}
      >
        {t.urutan ? (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-[#C2410C] bg-[#FFEDD5] text-[10px] font-black text-[#C2410C]" aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
        {t.contoh ? <TagContoh /> : null}
      </button>
    );
  };
  const rak = (k: string, kelas: string) => (
    <div className="rounded-md border-4 border-[#64748B] bg-[#E2E8F0] p-1.5" style={{ backgroundImage: BESI }}>
      <p className="mb-1.5 rounded-sm bg-[#475569] px-2 py-0.5 text-center text-xs font-black text-[#F1F5F9]">
        {KELOMPOK_RAK[k].ikon} {KELOMPOK_RAK[k].letak}: {KELOMPOK_RAK[k].nama}
      </p>
      <div className={`grid gap-1.5 ${kelas}`}>{kel(k).map((t) => petak(t))}</div>
    </div>
  );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_RAK)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Troli peralatan tiga rak. Rak bawah berisi masalah, rak tengah punya tujuh kotak bernomor berisi langkah dari satu sampai tujuh, rak atas berisi hasil. Kotak bertanda contoh sudah terisi sebagai petunjuk.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-xl border-[6px] border-[#475569] bg-[#CBD5E1] p-2">
        {rak("hasil", "grid-cols-2 sm:grid-cols-4")}
        <p className="text-center text-sm font-black text-[#C2410C]">
          {KELOMPOK_RAK.metode.ikon} {PUSAT_RAK}: kotak nomor satu sampai tujuh
        </p>
        {rak("metode", "grid-cols-1 sm:grid-cols-2")}
        {rak("masalah", "grid-cols-1 sm:grid-cols-3")}
        <div className="flex justify-between px-4" aria-hidden="true">
          <span className="block h-6 w-6 rounded-full border-4 border-[#0F172A] bg-[#334155]" />
          <span className="block h-6 w-6 rounded-full border-4 border-[#0F172A] bg-[#334155]" />
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#F1F5F9"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_RAK, l);
          return k ? { isi: KELOMPOK_RAK[k].isi, garis: KELOMPOK_RAK[k].garis, ikon: KELOMPOK_RAK[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Rak terisi! Dari masalah di rak bawah, langkah di rak tengah, sampai hasil di rak atas." : tp.pesan}
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
