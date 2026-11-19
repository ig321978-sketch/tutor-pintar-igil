"use client";

import React from "react";
import { cocokKelompok, kelompokLabel, type Tempat } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TagContoh, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import { KELOMPOK_LINTASAN, PETUNJUK_URUT_LINTASAN, PUSAT_LINTASAN, SUARA_LINTASAN, TEMPAT_LINTASAN } from "./data-peta";

/**
 * Mind-map Kelas 2 Bab 6 Sub-Bab B: Lintasan Lari. Tiga lajur lari merah bergaris putih: lajur satu = Masalah (tiga tempat), lajur dua = Penyelesaian
 * (tujuh rintangan bernomor berurutan, memuat semua metode Story termasuk Garis Waktu Hari, Jalur Jam, dan Batang Lama Kegiatan), lajur tiga = Hasil
 * (empat tempat). Tiap tempat satu label; label sewarna dipasang, rintangan bernomor hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const ASPAL = "repeating-linear-gradient(90deg,rgba(255,255,255,0.18) 0 2px,transparent 2px 14px)";

export default function LintasanLari({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_LINTASAN,
    97,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_LINTASAN, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_LINTASAN;
      return kel ? KELOMPOK_LINTASAN[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_LINTASAN, t, l),
  );
  const kel = (k: string) => TEMPAT_LINTASAN.filter((t) => t.kelompok === k);
  const tempat = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_LINTASAN[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={t.contoh ? `Contoh: ${teks}` : (teks ?? (t.urutan ? `Rintangan kosong nomor ${t.urutan}` : `Tempat kosong ${g.nama}`))}
        className={`relative flex min-h-[56px] w-full items-center justify-center gap-1 rounded-md border-[3px] px-1.5 py-1 text-center text-[11px] font-black leading-tight text-[#1C01A5] sm:text-xs ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""} ${t.contoh ? "!pt-3.5" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.92)", borderColor: g.garis }}
      >
        {t.urutan ? (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#7F1D1D] bg-[#FECACA] text-[10px] font-black text-[#7F1D1D]" aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
        {t.contoh ? <TagContoh /> : null}
      </button>
    );
  };
  const lajur = (judul: string, ikon: string, isi: Tempat[], kolom: string) => (
    <div className="space-y-1.5 rounded-lg border-y-4 border-white/90 p-1.5" style={{ backgroundImage: ASPAL, backgroundColor: "#F87171" }}>
      <p className="rounded-sm bg-[#7F1D1D] px-1 py-0.5 text-center text-[11px] font-black text-[#FEE2E2]">
        {ikon} {judul}
      </p>
      <div className={`grid gap-1.5 ${kolom}`}>{isi.map((t) => tempat(t))}</div>
    </div>
  );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_LINTASAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Lintasan lari punya tiga lajur. Lajur satu berisi masalah, lajur dua punya tujuh rintangan bernomor, lajur tiga berisi hasil. Kotak bertanda contoh sudah terisi sebagai petunjuk.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-xl border-[6px] border-[#16A34A] bg-[#BBF7D0] p-2">
        <p className="text-center text-sm font-black text-[#14532D]">
          {"\u{1F3C1}"} {PUSAT_LINTASAN}
        </p>
        {lajur(`${KELOMPOK_LINTASAN.masalah.letak}: ${KELOMPOK_LINTASAN.masalah.nama}`, KELOMPOK_LINTASAN.masalah.ikon, kel("masalah"), "grid-cols-1 sm:grid-cols-3")}
        {lajur(`${KELOMPOK_LINTASAN.metode.letak}: ${KELOMPOK_LINTASAN.metode.nama}, rintangan satu sampai tujuh`, KELOMPOK_LINTASAN.metode.ikon, kel("metode"), "grid-cols-1 sm:grid-cols-2")}
        {lajur(`${KELOMPOK_LINTASAN.hasil.letak}: ${KELOMPOK_LINTASAN.hasil.nama}`, KELOMPOK_LINTASAN.hasil.ikon, kel("hasil"), "grid-cols-1 sm:grid-cols-2")}
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#ECFCCB"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_LINTASAN, l);
          return k ? { isi: KELOMPOK_LINTASAN[k].isi, garis: KELOMPOK_LINTASAN[k].garis, ikon: KELOMPOK_LINTASAN[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Lintasan terisi! Dari masalah, rintangan penyelesaian, sampai hasil: jam yang dibaca teliti membuat semua kegiatan tepat waktu." : tp.pesan}
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
