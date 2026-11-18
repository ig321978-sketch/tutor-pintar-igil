"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_PAPAN, PETUNJUK_URUT_PAPAN, PUSAT_PAPAN, SUARA_PAPAN, TEMPAT_PAPAN } from "./data";

/**
 * Mind-map Kelas 2 Bab 3 Sub-Bab B: Papan Puzzle Raksasa. Baris atas = Hasil, baris tengah dengan tujuh keping bernomor = Penyelesaian
 * berurutan (semua metode Story, termasuk Pola Blok, Lipat Kertas, dan Teka-Teki Bayangan), baris bawah = Masalah. Tiap keping puzzle satu tempat;
 * label sewarna dipasang, keping bernomor hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
export default function PapanPuzzleRaksasa({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PAPAN,
    83,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_PAPAN, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_PAPAN;
      return kel ? KELOMPOK_PAPAN[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_PAPAN, t, l),
  );
  const kel = (k: string) => TEMPAT_PAPAN.filter((t) => t.kelompok === k);
  const keping = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_PAPAN[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? (t.urutan ? `Keping kosong nomor ${t.urutan}` : `Keping kosong ${g.nama}`)}
        className={`relative flex min-h-[64px] w-full items-center justify-center gap-1 rounded-xl border-4 px-1.5 py-1.5 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,251,235,0.95)", borderColor: g.garis }}
      >
        <span aria-hidden="true" className="absolute -right-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2" style={{ background: teks ? g.isi : "#FFFBEB", borderColor: g.garis }} />
        {t.urutan ? (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#78350F] bg-[#FDE68A] text-[10px] font-black text-[#78350F]" aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
      </button>
    );
  };
  const baris = (k: string, kelas: string) => (
    <div className="rounded-lg border-2 border-dashed border-[#78350F]/50 bg-white/50 p-1.5">
      <p className="mb-1 rounded bg-[#78350F] px-2 py-0.5 text-center text-xs font-black text-[#FEF3C7]">
        {KELOMPOK_PAPAN[k].ikon} {KELOMPOK_PAPAN[k].letak}: {KELOMPOK_PAPAN[k].nama}
      </p>
      <div className={`grid gap-2 pr-2 ${kelas}`}>{kel(k).map((t) => keping(t))}</div>
    </div>
  );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_PAPAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Papan puzzle raksasa. Baris bawah berisi masalah, baris tengah punya tujuh keping bernomor berisi langkah dari satu sampai tujuh, baris atas berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-3xl border-[6px] border-[#92400E] bg-[#BAE6FD] p-2 shadow-[0_6px_0_rgba(120,53,15,0.35)]" style={{ backgroundImage: "linear-gradient(180deg,#BAE6FD 0 60%,#86EFAC 60% 100%)" }}>
        {baris("hasil", "grid-cols-2 sm:grid-cols-4")}
        <p className="text-center text-sm font-black text-[#78350F]">
          {KELOMPOK_PAPAN.metode.ikon} {PUSAT_PAPAN}: keping nomor satu sampai tujuh
        </p>
        {baris("metode", "grid-cols-1 sm:grid-cols-2")}
        {baris("masalah", "grid-cols-1 sm:grid-cols-3")}
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
        {tp.selesai ? "Papan puzzle terpasang! Dari masalah di baris bawah, langkah di baris tengah, sampai hasil di baris atas." : tp.pesan}
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
