"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_AERATOR, PETUNJUK_URUT_AERATOR, PUSAT_AERATOR, SUARA_AERATOR, TEMPAT_AERATOR } from "./data";

/**
 * Mind-map Kelas 1 Bab 5 Sub-Bab B: Pompa Udara dengan Selang Aerator. Tabung pompa di atas = Masalah, selang utama turun dengan tujuh katup
 * cabang bernomor = Penyelesaian berurutan (semua metode Story, dibaca dari atas ke bawah), batu aerasi berbuih di ujung selang = Hasil.
 * Label sewarna ditempel; katup hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
export default function PipaAerator({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_AERATOR,
    53,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_AERATOR, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_AERATOR;
      return kel ? KELOMPOK_AERATOR[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_AERATOR, t, l),
  );
  const kel = (k: string) => TEMPAT_AERATOR.filter((t) => t.kelompok === k);
  const kartu = (t: Tempat, gaya: "pompa" | "batu") => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_AERATOR[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Tempat kosong ${g.nama}`}
        className={`flex min-h-[46px] w-full items-center justify-center border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${gaya === "pompa" ? "rounded-md" : "rounded-full"} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.88)", borderColor: g.garis }}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const katup = (t: Tempat, i: number) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_AERATOR.metode;
    const kiri = i % 2 === 0;
    return (
      <div key={t.id} className={`relative flex items-center ${kiri ? "flex-row-reverse" : ""}`}>
        {/* Selang utama di tengah */}
        <div className="absolute left-1/2 top-0 h-full w-3 -translate-x-1/2 bg-[#A7F3D0]/90 shadow-[inset_0_0_0_2px_#047857]" aria-hidden="true" />
        <div className="w-1/2" />
        <div className={`relative flex w-1/2 items-center ${kiri ? "flex-row-reverse pr-1.5" : "pl-1.5"}`}>
          {/* Cabang selang dan roda katup bernomor */}
          <span className="h-2.5 w-4 shrink-0 bg-[#A7F3D0] shadow-[inset_0_0_0_2px_#047857]" aria-hidden="true" />
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[3px] border-[#B91C1C] bg-[#FCA5A5] text-[11px] font-black text-[#7F1D1D]" aria-hidden="true">
            {t.urutan}
          </span>
          <span className="h-2.5 w-2 shrink-0 bg-[#A7F3D0] shadow-[inset_0_0_0_2px_#047857]" aria-hidden="true" />
          <button
            type="button"
            onClick={() => tp.ketukTempat(t)}
            aria-label={teks ?? `Katup kosong nomor ${t.urutan}`}
            className={`my-1 flex min-h-[48px] flex-1 items-center justify-center rounded-xl border-[3px] px-1.5 text-center text-[11px] font-black leading-tight text-[#1C01A5] sm:text-xs ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
            style={{ borderColor: g.garis, background: teks ? g.isi : "rgba(255,255,255,0.85)" }}
          >
            {teks ?? "?"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_AERATOR)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Pompa udara akuarium. Tabung pompa berisi masalah, katup bernomor di selang berisi langkah, batu aerasi berbuih berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl rounded-3xl border-4 border-[#065F46] bg-gradient-to-b from-[#ECFDF5] to-[#CFFAFE] p-2">
        {/* Tabung pompa udara (Masalah) */}
        <div className="mx-auto max-w-md rounded-[1.4rem] border-4 border-[#475569] bg-gradient-to-b from-[#F1F5F9] to-[#CBD5E1] p-2 shadow-[inset_0_-6px_0_rgba(71,85,105,0.3)]">
          <div className="mb-1 flex items-center justify-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#22C55E] shadow-[0_0_6px_#22C55E]" aria-hidden="true" />
            <p className="text-center text-xs font-black text-[#7F1D1D]">
              {KELOMPOK_AERATOR.masalah.ikon} Tabung pompa: Masalah
            </p>
            <span className="flex gap-0.5" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-3 w-0.5 bg-[#64748B]" />
              ))}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">{kel("masalah").map((t) => kartu(t, "pompa"))}</div>
        </div>

        {/* Selang aerator dengan tujuh katup cabang bernomor (Penyelesaian) */}
        <p className="mt-2 text-center text-sm font-black text-[#065F46]">
          {KELOMPOK_AERATOR.metode.ikon} {PUSAT_AERATOR}: ikuti katup dari atas ke bawah {"\u{2B07}\u{FE0F}"}
        </p>
        <div className="flex flex-col">{kel("metode").map((t, i) => katup(t, i))}</div>
        <div className="mx-auto h-4 w-3 bg-[#A7F3D0] shadow-[inset_0_0_0_2px_#047857]" aria-hidden="true" />

        {/* Batu aerasi berbuih (Hasil) */}
        <div className="relative mx-auto max-w-md">
          <div className="mb-1 flex justify-center gap-2" aria-hidden="true">
            {[10, 7, 12, 8, 11, 6, 9].map((d, i) => (
              <span key={i} className="rounded-full border-2 border-[#38BDF8] bg-white/80" style={{ width: d, height: d, marginTop: (i % 3) * 4 }} />
            ))}
          </div>
          <div className="rounded-[2.5rem] border-4 border-[#57534E] p-2" style={{ background: "radial-gradient(circle,rgba(255,255,255,0.35) 0 1.5px,transparent 2px),linear-gradient(180deg,#A8A29E,#78716C)", backgroundSize: "7px 7px,auto" }}>
            <p className="mb-1 text-center text-xs font-black text-white drop-shadow">
              {KELOMPOK_AERATOR.hasil.ikon} Batu aerasi berbuih: Hasil
            </p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{kel("hasil").map((t) => kartu(t, "batu"))}</div>
          </div>
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#ECFDF5"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_AERATOR, l);
          return k ? { isi: KELOMPOK_AERATOR[k].isi, garis: KELOMPOK_AERATOR[k].garis, ikon: KELOMPOK_AERATOR[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Udara mengalir! Dari masalah di tabung pompa, langkah di tiap katup, sampai hasil di batu aerasi." : tp.pesan}
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
