"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_PITA, PETUNJUK_URUT_PITA, PUSAT_PITA, SUARA_PITA, TEMPAT_PITA } from "./data";

/**
 * Mind-map Kelas 2 Bab 2 Sub-Bab C: Tali Pita Gunting. Pita atas = Hasil, pita tengah yang berkelok dengan tujuh petak bernomor = Penyelesaian
 * berurutan (semua metode Story, termasuk Bagian dan Utuh, Peragakan Cerita, dan Berpikir Mundur), pita bawah = Masalah. Tiap petak satu tempat; potongan label sewarna
 * dipasang, petak bernomor hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const UJUNG = "polygon(0 0,100% 0,94% 50%,100% 100%,0 100%,6% 50%)";

export default function TaliPitaGunting({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PITA,
    83,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_PITA, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_PITA;
      return kel ? KELOMPOK_PITA[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_PITA, t, l),
  );
  const kel = (k: string) => TEMPAT_PITA.filter((t) => t.kelompok === k);
  const potongan = (t: Tempat, gaya?: React.CSSProperties) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_PITA[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? (t.urutan ? `Petak kosong nomor ${t.urutan}` : `Potongan kosong ${g.nama}`)}
        className={`flex min-h-[60px] w-full items-center justify-center gap-1 px-4 py-1.5 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${teks ? "lm-muncul" : ""} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ clipPath: UJUNG, background: teks ? g.isi : "rgba(255,255,255,0.92)", boxShadow: `inset 0 0 0 3px ${g.garis}`, ...gaya }}
      >
        {t.urutan ? (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#7F1D1D] bg-[#FEE2E2] text-[10px] font-black text-[#7F1D1D]" aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
      </button>
    );
  };
  const pita = (k: string, kelas: string) => (
    <div className="rounded-lg border-2 border-dashed border-[#B91C1C]/60 bg-white/60 p-1.5">
      <p className="mb-1 rounded bg-[#B91C1C] px-2 py-0.5 text-center text-xs font-black text-[#FEF3C7]">
        {KELOMPOK_PITA[k].ikon} {KELOMPOK_PITA[k].letak}: {KELOMPOK_PITA[k].nama}
      </p>
      <div className={`grid gap-1.5 ${kelas}`}>{kel(k).map((t) => potongan(t))}</div>
    </div>
  );
  /** Pita tengah berkelok: baris ganjil berbalik arah, nomor tetap berurutan. */
  const berkelok = kel("metode").map((t, i) => {
    const baris = Math.floor(i / 2);
    const kolom = baris % 2 === 0 ? (i % 2) + 1 : 2 - (i % 2);
    return potongan(t, { gridRow: baris + 1, gridColumn: kolom });
  });

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_PITA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Pita yang akan digunting. Pita bawah berisi masalah, pita tengah punya tujuh petak bernomor berisi langkah dari satu sampai tujuh, pita atas berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-3xl border-4 border-[#B91C1C] bg-[#FEF2F2] p-2">
        {pita("hasil", "grid-cols-1 sm:grid-cols-2")}
        <p className="text-center text-sm font-black text-[#7F1D1D]">
          {"✂\u{FE0F}"} {PUSAT_PITA}: petak nomor satu sampai tujuh
        </p>
        <div className="rounded-lg border-2 border-dashed border-[#B91C1C]/60 bg-white/60 p-1.5">
          <p className="mb-1 rounded bg-[#B91C1C] px-2 py-0.5 text-center text-xs font-black text-[#FEF3C7]">
            {KELOMPOK_PITA.metode.ikon} {KELOMPOK_PITA.metode.letak}: {KELOMPOK_PITA.metode.nama} (berkelok)
          </p>
          <div className="grid grid-cols-2 gap-1.5">{berkelok}</div>
        </div>
        {pita("masalah", "grid-cols-1 sm:grid-cols-3")}
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#FEF3C7"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_PITA, l);
          return k ? { isi: KELOMPOK_PITA[k].isi, garis: KELOMPOK_PITA[k].garis, ikon: KELOMPOK_PITA[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Pita terpasang! Dari masalah di pita bawah, langkah di pita tengah, sampai hasil di pita atas." : tp.pesan}
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
