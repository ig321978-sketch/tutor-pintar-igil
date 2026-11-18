"use client";

import React from "react";
import { cocokKelompok, kelompokLabel, type Tempat } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import { KELOMPOK_RAK, PETUNJUK_URUT_RAK, PUSAT_RAK, SUARA_RAK, TEMPAT_RAK } from "./data-peta";

/**
 * Mind-map Kelas 2 Bab 4 Sub-Bab A: Rak Kayu. Rak kayu bertingkat tiga: tingkat atas = Hasil, tingkat tengah dengan tujuh petak bernomor = Penyelesaian berurutan
 * (semua metode Story, termasuk Simon Berkata, Peta Harta Karun, dan Permainan Sekat), tingkat bawah = Masalah. Tiap petak satu tempat;
 * label sewarna dipasang, petak bernomor hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const SERAT = "repeating-linear-gradient(0deg,rgba(120,53,15,0.14) 0 2px,transparent 2px 11px)";

export default function RakKayu({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_RAK,
    83,
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
    <div className="rounded-md border-4 border-[#78350F] bg-[#D6A15E] p-1.5" style={{ backgroundImage: SERAT }}>
      <p className="mb-1.5 rounded-sm bg-[#78350F] px-2 py-0.5 text-center text-xs font-black text-[#FEF3C7]">
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
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Rak kayu bertingkat. Tingkat bawah berisi masalah, tingkat tengah punya tujuh petak bernomor berisi langkah dari satu sampai tujuh, tingkat atas berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-xl border-[6px] border-[#92400E] bg-[#FFE8C2] p-2">
        {papan("hasil", "grid-cols-2 sm:grid-cols-4")}
        <p className="text-center text-sm font-black text-[#92400E]">
          {KELOMPOK_RAK.metode.ikon} {PUSAT_RAK}: petak nomor satu sampai tujuh
        </p>
        {papan("metode", "grid-cols-1 sm:grid-cols-2")}
        {papan("masalah", "grid-cols-1 sm:grid-cols-3")}
        <div className="flex justify-between px-3" aria-hidden="true"><span className="h-5 w-3 rounded-b bg-[#78350F]" /><span className="h-5 w-3 rounded-b bg-[#78350F]" /></div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#FEF3C7"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_RAK, l);
          return k ? { isi: KELOMPOK_RAK[k].isi, garis: KELOMPOK_RAK[k].garis, ikon: KELOMPOK_RAK[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Rak terisi! Dari masalah di tingkat bawah, langkah di tingkat tengah, sampai hasil di tingkat atas." : tp.pesan}
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
