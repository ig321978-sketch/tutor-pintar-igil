"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_KOMIDI, PETUNJUK_URUT_KOMIDI, PUSAT_KOMIDI, SUARA_KOMIDI, TEMPAT_KOMIDI } from "./data";

/**
 * Mind-map Kelas 1 Bab 6 Sub-Bab B: Komidi Putar. Papan tiket berbohlam di bawah atap = Masalah, atap tenda bergaris merah putih dengan tujuh
 * tiang bernomor = Penyelesaian berurutan (semua metode Story, dibaca dari kiri ke kanan), lantai komidi bergaris = Hasil.
 * Label sewarna ditempel; tiang hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
export default function KomidiPutar({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_KOMIDI,
    61,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_KOMIDI, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_KOMIDI;
      return kel ? KELOMPOK_KOMIDI[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_KOMIDI, t, l),
  );
  const kel = (k: string) => TEMPAT_KOMIDI.filter((t) => t.kelompok === k);
  const kartu = (t: Tempat, bentuk: string) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_KOMIDI[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? (t.urutan ? `Tiang kosong nomor ${t.urutan}` : `Tempat kosong ${g.nama}`)}
        className={`flex min-h-[46px] w-full items-center justify-center gap-1.5 border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${bentuk} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.9)", borderColor: g.garis }}
      >
        {t.urutan ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#7F1D1D] bg-[#FEF08A] text-[11px] font-black text-[#7F1D1D]" aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
      </button>
    );
  };
  const tiang = kel("metode");

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_KOMIDI)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Komidi putar. Papan tiket di bawah atap berisi masalah, tujuh tiang bernomor berisi langkah, lantai komidi berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl rounded-3xl border-4 border-[#7F1D1D] bg-gradient-to-b from-[#312E81] to-[#4C1D95] p-2">
        {/* Atap tenda bergaris merah putih dengan bohlam */}
        <svg viewBox="0 0 300 70" className="mx-auto block w-full max-w-md" aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => {
            const x0 = 8 + (i / 7) * 284;
            const x1 = 8 + ((i + 1) / 7) * 284;
            return <path key={i} d={`M 150 4 L ${x0} 56 Q ${(x0 + x1) / 2} 70 ${x1} 56 Z`} fill={i % 2 ? "#FFFFFF" : "#DC2626"} stroke="#7F1D1D" strokeWidth={1.4} />;
          })}
          {Array.from({ length: 15 }, (_, i) => (
            <circle key={i} cx={14 + i * 20.4} cy={58 + (i % 2 ? 4 : 0)} r={2.4} fill="#FDE047" />
          ))}
          <circle cx={150} cy={4} r={4} fill="#FDE047" stroke="#7F1D1D" strokeWidth={1} />
        </svg>
        {/* Papan tiket (Masalah) */}
        <div className="relative mx-auto max-w-md rounded-lg border-4 border-[#FDE047] bg-[#1E1B4B] p-2">
          <p className="mb-1 text-center text-xs font-black tracking-widest text-[#FDE047]">
            {KELOMPOK_KOMIDI.masalah.ikon} MASALAH · {PUSAT_KOMIDI}
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">{kel("masalah").map((t) => kartu(t, "rounded-md"))}</div>
        </div>

        {/* Tujuh tiang bernomor (Penyelesaian) */}
        <p className="mt-2 text-center text-sm font-black text-[#FDE047]">
          {KELOMPOK_KOMIDI.metode.ikon} Ikuti tiang dari kiri ke kanan
        </p>
        <div className="mx-auto flex max-w-md justify-between px-4" aria-hidden="true">
          {tiang.map((t) => (
            <span key={t.id} className="h-5 w-1.5 rounded-sm bg-gradient-to-b from-[#FDE047] to-[#CA8A04]" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{tiang.map((t) => kartu(t, "rounded-xl"))}</div>

        {/* Lantai komidi (Hasil) */}
        <div className="mt-2 rounded-[2rem] border-4 border-[#FDE047] p-2" style={{ background: "repeating-linear-gradient(90deg,#B91C1C 0 18px,#FEF3C7 18px 36px)" }}>
          <p className="mb-1 rounded-md bg-[#1E1B4B] text-center text-sm font-black tracking-widest text-[#FDE047]">LANTAI · Hasil</p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{kel("hasil").map((t) => kartu(t, "rounded-full"))}</div>
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#EEF2FF"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_KOMIDI, l);
          return k ? { isi: KELOMPOK_KOMIDI[k].isi, garis: KELOMPOK_KOMIDI[k].garis, ikon: KELOMPOK_KOMIDI[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Komidi putar berputar! Dari masalah di papan tiket, langkah di tiap tiang, sampai hasil di lantai." : tp.pesan}
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
