"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_REL, PETUNJUK_URUT_REL, PUSAT_REL, SUARA_REL, TEMPAT_REL } from "./data";

/**
 * Mind-map Kelas 2 Bab 1 Sub-Bab B: Rel Kertas Pesanan di meja kasir. Rel atas = Hasil, rel tengah dengan tujuh jepitan bernomor = Penyelesaian
 * berurutan (semua metode Story), rel bawah = Masalah. Tiap jepitan memegang satu kertas pesanan kosong; label sewarna dijepit, jepitan bernomor
 * hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const BESI = "linear-gradient(180deg,#E2E8F0,#94A3B8 55%,#64748B)";

export default function RelPesanan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_REL,
    71,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_REL, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_REL;
      return kel ? KELOMPOK_REL[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_REL, t, l),
  );
  const kel = (k: string) => TEMPAT_REL.filter((t) => t.kelompok === k);
  const kertas = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_REL[t.kelompok];
    return (
      <div key={t.id} className="relative pt-3">
        <span className="absolute left-1/2 top-0 z-10 h-4 w-5 -translate-x-1/2 rounded-sm border-2 border-[#475569]" style={{ background: BESI }} aria-hidden="true" />
        <button
          type="button"
          onClick={() => tp.ketukTempat(t)}
          aria-label={teks ?? (t.urutan ? `Jepitan kosong nomor ${t.urutan}` : `Jepitan kosong ${g.nama}`)}
          className={`flex min-h-[58px] w-full items-center justify-center gap-1.5 rounded-b-md border-[3px] px-2 pt-2 text-center text-xs font-black leading-tight text-[#1C01A5] shadow-[0_3px_0_rgba(71,85,105,0.25)] sm:text-sm ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
          style={{ background: teks ? g.isi : "#FFFBEB", borderColor: g.garis }}
        >
          {t.urutan ? (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#475569] bg-white text-[11px] font-black text-[#475569]" aria-hidden="true">
              {t.urutan}
            </span>
          ) : null}
          <span className="flex-1">{teks ?? "?"}</span>
        </button>
      </div>
    );
  };
  const rel = (k: string, kelas: string) => (
    <div className="rounded-lg border-2 border-[#CBD5E1] bg-[#F8FAFC] p-1.5">
      <p className="mb-1 rounded bg-[#475569] px-2 py-0.5 text-center text-xs font-black text-white">
        {KELOMPOK_REL[k].ikon} {KELOMPOK_REL[k].letak}: {KELOMPOK_REL[k].nama}
      </p>
      <div className="h-2.5 rounded-full border border-[#475569]" style={{ background: BESI }} aria-hidden="true" />
      <div className={`grid gap-x-1.5 gap-y-0.5 ${kelas}`}>{kel(k).map((t) => kertas(t))}</div>
    </div>
  );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_REL)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Rel kertas pesanan di meja kasir. Rel bawah berisi masalah, rel tengah punya tujuh jepitan bernomor berisi langkah dari satu sampai tujuh, rel atas berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-3xl border-4 border-[#78350F] bg-[#C2884D] p-2">
        {rel("hasil", "grid-cols-2 sm:grid-cols-4")}
        <p className="text-center text-sm font-black text-[#FEF3C7]">
          {KELOMPOK_REL.metode.ikon} {PUSAT_REL}: jepitan nomor satu sampai tujuh
        </p>
        {rel("metode", "grid-cols-1 sm:grid-cols-2")}
        {rel("masalah", "grid-cols-1 sm:grid-cols-3")}
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#FEF3C7"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_REL, l);
          return k ? { isi: KELOMPOK_REL[k].isi, garis: KELOMPOK_REL[k].garis, ikon: KELOMPOK_REL[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Rel selesai! Dari masalah di rel bawah, langkah di rel tengah, sampai hasil di rel atas." : tp.pesan}
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
