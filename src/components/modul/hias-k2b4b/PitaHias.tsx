"use client";

import React from "react";
import { cocokKelompok, kelompokLabel, type Tempat } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import { KELOMPOK_PITA, PETUNJUK_URUT_PITA, PUSAT_PITA, SUARA_PITA, TEMPAT_PITA } from "./data-peta";

/**
 * Mind-map Kelas 2 Bab 4 Sub-Bab B: Pita Hias. Tiga pita hias bertingkat dengan ujung bergerigi: pita atas = Hasil, pita tengah dengan tujuh kotak bernomor =
 * Penyelesaian berurutan (semua metode Story, termasuk Pita Pola, Kode Huruf, dan Tepuk Irama), pita bawah = Masalah. Tiap kotak satu tempat;
 * label sewarna dipasang, kotak bernomor hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const GERIGI = "polygon(0 0,100% 0,98% 50%,100% 100%,0 100%,2% 50%)";
const KOTAK_KOTAK = "linear-gradient(90deg,rgba(255,255,255,0.35) 50%,transparent 50%)";

export default function PitaHias({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PITA,
    97,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_PITA, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_PITA;
      return kel ? KELOMPOK_PITA[kel].petunjuk : "Coba kotak yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_PITA, t, l),
  );
  const kel = (k: string) => TEMPAT_PITA.filter((t) => t.kelompok === k);
  const kotak = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_PITA[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? (t.urutan ? `Kotak kosong nomor ${t.urutan}` : `Kotak kosong ${g.nama}`)}
        className={`relative flex min-h-[64px] w-full items-center justify-center gap-1 rounded-md border-[3px] px-1.5 py-1.5 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.9)", borderColor: g.garis }}
      >
        {t.urutan ? (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-[#6D28D9] bg-white text-[10px] font-black text-[#6D28D9]" aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
      </button>
    );
  };
  const pita = (k: string, kelas: string) => (
    <div className="px-3 py-2" style={{ clipPath: GERIGI, background: `${KOTAK_KOTAK},${KELOMPOK_PITA[k].garis}`, backgroundSize: "20px 100%, 100% 100%" }}>
      <p className="mb-1.5 text-center text-xs font-black text-white">
        {KELOMPOK_PITA[k].ikon} {KELOMPOK_PITA[k].letak}: {KELOMPOK_PITA[k].nama}
      </p>
      <div className={`grid gap-1.5 rounded-md bg-white/30 p-1.5 ${kelas}`}>{kel(k).map((t) => kotak(t))}</div>
    </div>
  );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_PITA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Pita hias bertingkat. Pita bawah berisi masalah, pita tengah punya tujuh kotak bernomor berisi langkah dari satu sampai tujuh, pita atas berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-3xl border-4 border-[#C026D3] bg-[#FDF4FF] p-2">
        {pita("hasil", "grid-cols-2 sm:grid-cols-4")}
        <p className="text-center text-sm font-black text-[#86198F]">
          {KELOMPOK_PITA.metode.ikon} {PUSAT_PITA}: kotak nomor satu sampai tujuh
        </p>
        {pita("metode", "grid-cols-1 sm:grid-cols-2")}
        {pita("masalah", "grid-cols-1 sm:grid-cols-3")}
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#FAE8FF"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_PITA, l);
          return k ? { isi: KELOMPOK_PITA[k].isi, garis: KELOMPOK_PITA[k].garis, ikon: KELOMPOK_PITA[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Pita hias terpasang! Dari masalah di pita bawah, langkah di pita tengah, sampai hasil di pita atas." : tp.pesan}
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
