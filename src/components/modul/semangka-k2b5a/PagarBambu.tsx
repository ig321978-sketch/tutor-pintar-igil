"use client";

import React from "react";
import { cocokKelompok, kelompokLabel, type Tempat } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import { KELOMPOK_PAGAR, PETUNJUK_URUT_PAGAR, PUSAT_PAGAR, SUARA_PAGAR, TEMPAT_PAGAR } from "./data-peta";

/**
 * Mind-map Kelas 2 Bab 5 Sub-Bab A: Pagar Bambu. Pagar bambu tiga susun dengan papan nama: pagar atas = Hasil, pagar tengah dengan tujuh papan bernomor = Penyelesaian berurutan
 * (semua metode Story, termasuk Berbagi Adil, Uji Cermin, dan Pita Pecahan), pagar bawah = Masalah. Tiap papan satu tempat;
 * label sewarna dipasang, papan bernomor hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const RUAS = "repeating-linear-gradient(90deg,rgba(63,98,18,0.0) 0 38px,rgba(63,98,18,0.35) 38px 41px)";

export default function PagarBambu({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PAGAR,
    47,
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
        aria-label={teks ?? (t.urutan ? `Papan kosong nomor ${t.urutan}` : `Papan kosong ${g.nama}`)}
        className={`relative flex min-h-[64px] w-full items-center justify-center gap-1 rounded-sm border-[3px] px-1.5 py-1.5 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(247,254,231,0.96)", borderColor: g.garis }}
      >
        {t.urutan ? (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-2 border-[#3F6212] bg-[#D9F99D] text-[10px] font-black text-[#3F6212]" aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
      </button>
    );
  };
  const papan = (k: string, kelas: string) => (
    <div className="rounded-md border-4 border-[#4D7C0F] bg-[#BEF264] p-1.5" style={{ backgroundImage: RUAS }}>
      <p className="mb-1.5 rounded-sm bg-[#3F6212] px-2 py-0.5 text-center text-xs font-black text-[#ECFCCB]">
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
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Pagar bambu tiga susun. Pagar bawah berisi masalah, pagar tengah punya tujuh papan bernomor berisi langkah dari satu sampai tujuh, pagar atas berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-xl border-[6px] border-[#65A30D] bg-[#ECFCCB] p-2">
        {papan("hasil", "grid-cols-2 sm:grid-cols-4")}
        <p className="text-center text-sm font-black text-[#92400E]">
          {KELOMPOK_PAGAR.metode.ikon} {PUSAT_PAGAR}: papan nomor satu sampai tujuh
        </p>
        {papan("metode", "grid-cols-1 sm:grid-cols-2")}
        {papan("masalah", "grid-cols-1 sm:grid-cols-3")}
        <div className="flex justify-between px-3" aria-hidden="true"><span className="h-5 w-3 rounded-b bg-[#4D7C0F]" /><span className="h-5 w-3 rounded-b bg-[#4D7C0F]" /></div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#ECFCCB"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_PAGAR, l);
          return k ? { isi: KELOMPOK_PAGAR[k].isi, garis: KELOMPOK_PAGAR[k].garis, ikon: KELOMPOK_PAGAR[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Pagar terisi! Dari masalah di pagar bawah, langkah di pagar tengah, sampai hasil di pagar atas." : tp.pesan}
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
