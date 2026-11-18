"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_ETALASE, PETUNJUK_URUT_ETALASE, PUSAT_ETALASE, SUARA_ETALASE, TEMPAT_ETALASE } from "./data";

/**
 * Mind-map Kelas 2 Bab 1 Sub-Bab A: Etalase Kaca bertingkat. Rak atas = Hasil, rak tengah dengan tujuh sekat bernomor = Penyelesaian
 * berurutan (semua metode Story), rak bawah = Masalah. Tiap sekat kaca satu tempat; label sewarna ditempel, sekat bernomor hanya menerima labelnya sendiri.
 * Hanya poin pelajaran.
 */
const KACA = "linear-gradient(115deg,rgba(255,255,255,0.85) 0 10%,rgba(255,255,255,0.15) 10% 16%,rgba(255,255,255,0.6) 16% 19%,rgba(186,230,253,0.55) 19% 100%)";

export default function EtalaseKaca({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_ETALASE,
    71,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_ETALASE, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_ETALASE;
      return kel ? KELOMPOK_ETALASE[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_ETALASE, t, l),
  );
  const kel = (k: string) => TEMPAT_ETALASE.filter((t) => t.kelompok === k);
  const sekat = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_ETALASE[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? (t.urutan ? `Sekat kosong nomor ${t.urutan}` : `Sekat kosong ${g.nama}`)}
        className={`flex min-h-[52px] w-full items-center justify-center gap-1.5 rounded-md border-[3px] px-2 text-center text-xs font-black leading-tight text-[#0C4A6E] sm:text-sm ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.72)", borderColor: g.garis }}
      >
        {t.urutan ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#0369A1] bg-white text-[11px] font-black text-[#0369A1]" aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
      </button>
    );
  };
  const rak = (k: string, kelas: string) => (
    <div className="rounded-xl border-4 border-[#38BDF8] p-1.5 shadow-[inset_0_-8px_0_rgba(2,132,199,0.25)]" style={{ background: KACA }}>
      <p className="mb-1 rounded-full bg-[#0369A1] px-2 py-0.5 text-center text-xs font-black text-white">
        {KELOMPOK_ETALASE[k].ikon} {KELOMPOK_ETALASE[k].letak}: {KELOMPOK_ETALASE[k].nama}
      </p>
      <div className={`grid gap-1.5 ${kelas}`}>{kel(k).map((t) => sekat(t))}</div>
    </div>
  );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_ETALASE)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Etalase kaca bertingkat di kantin. Rak bawah berisi masalah, rak tengah punya tujuh sekat bernomor berisi langkah dari satu sampai tujuh, rak atas berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-3xl border-[6px] border-[#0EA5E9] bg-[#E0F2FE] p-2 shadow-[0_6px_0_rgba(3,105,161,0.3)]">
        {rak("hasil", "grid-cols-2 sm:grid-cols-4")}
        <p className="text-center text-sm font-black text-[#0C4A6E]">
          {KELOMPOK_ETALASE.metode.ikon} {PUSAT_ETALASE}: sekat nomor satu sampai tujuh
        </p>
        {rak("metode", "grid-cols-1 sm:grid-cols-2")}
        {rak("masalah", "grid-cols-1 sm:grid-cols-3")}
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#E0F2FE"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_ETALASE, l);
          return k ? { isi: KELOMPOK_ETALASE[k].isi, garis: KELOMPOK_ETALASE[k].garis, ikon: KELOMPOK_ETALASE[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Etalase selesai! Dari masalah di rak bawah, langkah di rak tengah, sampai hasil di rak atas." : tp.pesan}
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
