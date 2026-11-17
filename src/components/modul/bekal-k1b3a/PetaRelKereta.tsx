"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_REL, PETUNJUK_URUT_REL, PUSAT_REL, SUARA_REL, TEMPAT_REL } from "./data";

/**
 * Mind-map Kelas 1 Bab 3 Sub-Bab A: Peta Rel. Papan keberangkatan = Masalah, rangkaian gerbong bernomor di atas rel =
 * Penyelesaian berurutan (semua metode Story), stasiun tujuan beratap = Hasil. Label sewarna ditempel; gerbong hanya menerima
 * labelnya sendiri. Hanya poin pelajaran.
 */
export default function PetaRelKereta({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_REL,
    41,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_REL, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_REL;
      return kel ? KELOMPOK_REL[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_REL, t, l),
  );
  const slot = (t: Tempat, gaya: "papan" | "gerbong" | "stasiun") => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_REL[t.kelompok];
    const bentuk = gaya === "papan" ? "rounded-none" : gaya === "gerbong" ? "rounded-t-xl rounded-b-md" : "rounded-md";
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Tempat kosong ${g.nama}${t.urutan ? ` nomor ${t.urutan}` : ""}`}
        className={`relative flex min-h-[48px] w-full items-center justify-center border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${bentuk} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : gaya === "gerbong" ? "rgba(219,234,254,0.75)" : "rgba(255,255,255,0.9)", borderColor: g.garis }}
      >
        {t.urutan ? <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#1D4ED8] text-[11px] text-white">{t.urutan}</span> : null}
        {teks ?? "?"}
        {gaya === "gerbong" ? (
          <span className="pointer-events-none absolute -bottom-2 left-0 right-0 flex justify-between px-3" aria-hidden="true">
            <span className="h-3 w-3 rounded-full border-2 border-[#334155] bg-[#94A3B8]" />
            <span className="h-3 w-3 rounded-full border-2 border-[#334155] bg-[#94A3B8]" />
          </span>
        ) : null}
      </button>
    );
  };
  const kel = (k: string) => TEMPAT_REL.filter((t) => t.kelompok === k);
  const gerbong = kel("metode");

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_REL)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Peta rel belajar. Papan keberangkatan berisi masalah, gerbong bernomor berisi langkah berurutan, stasiun tujuan berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border-4 border-[#334155] bg-[#E0F2FE]">
        {/* Papan keberangkatan bertiang */}
        <div className="px-3 pb-2 pt-3">
          <div className="rounded-md border-4 border-[#7F1D1D] bg-[#FEF2F2] p-2 shadow-[0_6px_0_#7F1D1D]">
            <p className="mb-1 text-center text-xs font-black text-[#7F1D1D]">
              {KELOMPOK_REL.masalah.ikon} Papan keberangkatan: Masalah
            </p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kel("masalah").map((t) => slot(t, "papan"))}</div>
          </div>
          <div className="mx-auto flex w-1/2 justify-between" aria-hidden="true">
            <span className="h-4 w-2 bg-[#7F1D1D]" />
            <span className="h-4 w-2 bg-[#7F1D1D]" />
          </div>
        </div>

        {/* Rangkaian gerbong di atas rel, berbelok seperti huruf S */}
        <div className="px-3 pb-3">
          <p className="mb-2 text-center text-sm font-black text-[#1E3A8A]">
            {"\u{1F682}"} {PUSAT_REL}: rangkaian gerbong
          </p>
          {[gerbong.slice(0, 4), gerbong.slice(4)].map((baris, r) => (
            <div key={r} className="relative mb-4">
              <div className="absolute bottom-[-10px] left-0 right-0 h-2 border-y-2 border-[#475569]" style={{ background: "repeating-linear-gradient(90deg,#78350F 0 6px,transparent 6px 16px)" }} aria-hidden="true" />
              <div className={`relative grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-4 ${r === 1 ? "sm:[direction:rtl]" : ""}`}>
                {baris.map((t) => (
                  <div key={t.id} className="[direction:ltr]">
                    {slot(t, "gerbong")}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stasiun tujuan beratap */}
        <div className="px-3 pb-3">
          <div className="h-7 w-full" style={{ background: "#15803D", clipPath: "polygon(50% 0,100% 100%,0 100%)" }} aria-hidden="true" />
          <div className="rounded-b-lg border-4 border-t-0 border-[#15803D] bg-[#F0FDF4] p-2">
            <p className="mb-1 text-center text-xs font-black text-[#14532D]">
              {KELOMPOK_REL.hasil.ikon} Stasiun tujuan: Hasil
            </p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{kel("hasil").map((t) => slot(t, "stasiun"))}</div>
          </div>
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#EFF6FF"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_REL, l);
          return k ? { isi: KELOMPOK_REL[k].isi, garis: KELOMPOK_REL[k].garis, ikon: KELOMPOK_REL[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Peta rel lengkap! Dari masalah di papan, langkah di gerbong, sampai hasil di stasiun tujuan." : tp.pesan}
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
