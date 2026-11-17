"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_LEMBAR, PETUNJUK_URUT_LEMBAR, PUSAT_LEMBAR, SUARA_LEMBAR, TEMPAT_LEMBAR } from "./data";

/**
 * Mind-map Kelas 1 Bab 8 Sub-Bab B: Lembar Centang. Papan jepit dengan kertas centang: kepala lembar = Masalah, tujuh baris bernomor dengan kotak centang
 * = Penyelesaian berurutan (semua metode Story, dibaca dari nomor satu), deretan cap di bawah = Hasil. Label sewarna ditempel; baris bernomor hanya
 * menerima labelnya sendiri. Hanya poin pelajaran.
 */
export default function LembarCentang({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_LEMBAR,
    93,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_LEMBAR, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_LEMBAR;
      return kel ? KELOMPOK_LEMBAR[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_LEMBAR, t, l),
  );
  const kel = (k: string) => TEMPAT_LEMBAR.filter((t) => t.kelompok === k);
  const kartu = (t: Tempat, bentuk: string) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_LEMBAR[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? (t.urutan ? `Baris kosong nomor ${t.urutan}` : `Tempat kosong ${g.nama}`)}
        className={`flex min-h-[46px] w-full items-center justify-center gap-1.5 border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${bentuk} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.9)", borderColor: g.garis }}
      >
        {t.urutan ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-[#14532D] bg-white text-[11px] font-black text-[#14532D]" aria-hidden="true">
            {teks ? "✔" : t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
      </button>
    );
  };
  const baris = kel("metode");

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_LEMBAR)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Lembar centang di papan jepit. Kepalanya berisi masalah, tujuh baris bernomor berisi langkah, cap di bawah berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl">
        <div className="mx-auto h-5 w-28 rounded-t-lg border-4 border-b-0 border-[#475569] bg-[#CBD5E1]" aria-hidden="true" />
        <div className="rounded-lg border-[6px] border-[#92400E] bg-[#C08457] p-2 shadow-[0_5px_0_rgba(63,35,6,0.45)]">
          <div className="rounded-md bg-[#FFFBEB] p-2">
            {/* Kepala lembar (Masalah) */}
            <div className="rounded-md border-4 border-[#A16207] bg-[#FEF3C7] p-2">
              <p className="mb-1 text-center text-xs font-black text-[#78350F]">
                {KELOMPOK_LEMBAR.masalah.ikon} Kepala lembar: Masalah
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">{kel("masalah").map((t) => kartu(t, "rounded-md"))}</div>
            </div>

            {/* Baris bernomor dengan kotak centang (Penyelesaian) */}
            <p className="mt-2 text-center text-sm font-black text-[#14532D]">
              {KELOMPOK_LEMBAR.metode.ikon} {PUSAT_LEMBAR}: centang dari nomor satu
            </p>
            <div className="mt-1 space-y-1.5 border-l-4 border-[#FCA5A5] pl-2" style={{ backgroundImage: "repeating-linear-gradient(180deg,transparent 0 47px,rgba(96,165,250,0.35) 47px 48px)" }}>
              {baris.map((t) => (
                <div key={t.id}>{kartu(t, "rounded-xl")}</div>
              ))}
            </div>

            {/* Cap hasil */}
            <div className="mt-2 rounded-xl border-4 border-[#BE185D] bg-white p-2">
              <p className="mb-1 text-center text-sm font-black tracking-widest text-[#BE185D]">CAP · Hasil</p>
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{kel("hasil").map((t) => kartu(t, "rounded-full"))}</div>
            </div>
          </div>
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#FEF9C3"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_LEMBAR, l);
          return k ? { isi: KELOMPOK_LEMBAR[k].isi, garis: KELOMPOK_LEMBAR[k].garis, ikon: KELOMPOK_LEMBAR[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Lembar lengkap! Dari masalah di kepala lembar, langkah di tiap baris, sampai hasil di cap." : tp.pesan}
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
