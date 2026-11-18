"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_RAK, PETUNJUK_URUT_RAK, PUSAT_RAK, SUARA_RAK, TEMPAT_RAK } from "./data";

/**
 * Mind-map Kelas 2 Bab 3 Sub-Bab C: Rak Mainan Bernama. Rak atas = Hasil, rak tengah dengan tujuh papan bernomor = Penyelesaian berurutan
 * (semua metode Story, termasuk Tas Misteri, Cetak Permukaan, dan Pandangan Atas dan Samping), rak bawah = Masalah. Tiap papan satu tempat;
 * label sewarna dipasang, papan bernomor hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
export default function RakMainan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_RAK,
    73,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_RAK, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_RAK;
      return kel ? KELOMPOK_RAK[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_RAK, t, l),
  );
  const kel = (k: string) => TEMPAT_RAK.filter((t) => t.kelompok === k);
  const papan = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_RAK[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? (t.urutan ? `Papan kosong nomor ${t.urutan}` : `Papan kosong ${g.nama}`)}
        className={`flex min-h-[56px] w-full items-center justify-center gap-1 rounded-md border-b-[5px] px-1.5 py-1 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${teks ? "lm-muncul" : ""} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,251,235,0.95)", boxShadow: `inset 0 0 0 3px ${g.garis}`, borderBottomColor: "#78350F" }}
      >
        {t.urutan ? (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#78350F] bg-[#FDE68A] text-[10px] font-black text-[#78350F]" aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
      </button>
    );
  };
  const rak = (k: string, kelas: string) => (
    <div className="rounded-lg border-4 border-[#92400E] bg-[#FDE68A]/60 p-1.5">
      <p className="mb-1 rounded bg-[#92400E] px-2 py-0.5 text-center text-xs font-black text-[#FEF3C7]">
        {KELOMPOK_RAK[k].ikon} {KELOMPOK_RAK[k].letak}: {KELOMPOK_RAK[k].nama}
      </p>
      <div className={`grid gap-1.5 ${kelas}`}>{kel(k).map((t) => papan(t))}</div>
      <div className="mt-1 h-1.5 rounded-full bg-[#92400E]" aria-hidden="true" />
    </div>
  );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_RAK)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Rak mainan bernama. Rak bawah berisi masalah, rak tengah punya tujuh papan bernomor berisi langkah dari satu sampai tujuh, rak atas berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-3xl border-4 border-[#78350F] bg-[#FEF3C7] p-2" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(146,64,14,0.12) 0 3px,transparent 3px 30px)" }}>
        {rak("hasil", "grid-cols-2 sm:grid-cols-4")}
        <p className="text-center text-sm font-black text-[#78350F]">
          {KELOMPOK_RAK.metode.ikon} {PUSAT_RAK}: papan nomor satu sampai tujuh
        </p>
        {rak("metode", "grid-cols-1 sm:grid-cols-2")}
        {rak("masalah", "grid-cols-1 sm:grid-cols-3")}
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
        {tp.selesai ? "Rak terpasang! Dari masalah di rak bawah, langkah di rak tengah, sampai hasil di rak atas." : tp.pesan}
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
