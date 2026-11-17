"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_BENDERA, PETUNJUK_URUT_BENDERA, PUSAT_BENDERA, SUARA_BENDERA, TEMPAT_BENDERA } from "./data";

/**
 * Mind-map Kelas 1 Bab 4 Sub-Bab A: Untaian Bendera Festival. Papan pengumuman berpaku payung = Masalah, tujuh bendera segitiga
 * bernomor pada tali yang melengkung = Penyelesaian berurutan (semua metode Story), panggung festival bertirai = Hasil.
 * Label sewarna ditempel; bendera hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const POTONG_BENDERA = "polygon(0 0,100% 0,100% 62%,50% 100%,0 62%)";
const WARNA_KAIN = ["#FDE68A", "#FBCFE8", "#BAE6FD", "#BBF7D0", "#FED7AA", "#DDD6FE", "#FECACA"];

export default function BenderaFestival({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_BENDERA,
    43,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_BENDERA, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_BENDERA;
      return kel ? KELOMPOK_BENDERA[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_BENDERA, t, l),
  );
  const kel = (k: string) => TEMPAT_BENDERA.filter((t) => t.kelompok === k);
  const kartu = (t: Tempat, gaya: "papan" | "panggung") => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_BENDERA[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Tempat kosong ${g.nama}`}
        className={`relative flex min-h-[46px] w-full items-center justify-center border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${gaya === "papan" ? "rounded-sm" : "rounded-full"} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.92)", borderColor: g.garis }}
      >
        {gaya === "papan" ? <span className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-[#DC2626]" aria-hidden="true" /> : null}
        {teks ?? "?"}
      </button>
    );
  };
  const bendera = (t: Tempat, i: number) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_BENDERA.metode;
    return (
      <div key={t.id} className="flex flex-col items-center" style={{ marginTop: `${[0, 10, 16, 18, 16, 10, 0][i] ?? 0}px` }}>
        <span className="h-2 w-0.5 bg-[#1F2937]" aria-hidden="true" />
        <button
          type="button"
          onClick={() => tp.ketukTempat(t)}
          aria-label={teks ?? `Bendera kosong nomor ${t.urutan}`}
          className={`relative flex h-[104px] w-full flex-col items-center justify-start pt-1 text-center text-[11px] font-black leading-tight text-[#1C01A5] sm:text-xs ${tp.goyang === t.id ? "lm-goyang" : ""} ${teks ? "lm-muncul" : ""}`}
          style={{ clipPath: POTONG_BENDERA, background: teks ? g.isi : WARNA_KAIN[i % WARNA_KAIN.length], opacity: teks ? 1 : 0.85 }}
        >
          <span className="mb-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B45309] text-[10px] text-white">{t.urutan}</span>
          <span className="px-1">{teks ?? "?"}</span>
        </button>
      </div>
    );
  };
  const metode = kel("metode");

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_BENDERA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Untaian bendera festival. Papan pengumuman berisi masalah, bendera bernomor berisi langkah berurutan, panggung berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border-4 border-[#1E3A8A] bg-gradient-to-b from-[#BFDBFE] to-[#EFF6FF] p-3">
        {/* Papan pengumuman gabus */}
        <div className="rounded-lg border-[6px] border-[#92400E] p-2" style={{ background: "#D8B48A", backgroundImage: "radial-gradient(rgba(120,53,15,0.25) 1px,transparent 1.5px)", backgroundSize: "6px 6px" }}>
          <p className="mb-2 text-center text-xs font-black text-[#7F1D1D]">
            {KELOMPOK_BENDERA.masalah.ikon} Papan pengumuman: Masalah
          </p>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">{kel("masalah").map((t) => kartu(t, "papan"))}</div>
        </div>

        {/* Tali dengan tujuh bendera segitiga */}
        <p className="mt-3 text-center text-sm font-black text-[#1E3A8A]">
          {KELOMPOK_BENDERA.metode.ikon} {PUSAT_BENDERA}: langkah berurutan
        </p>
        <div className="relative mt-1">
          <svg viewBox="0 0 700 40" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-6 w-full" aria-hidden="true">
            <path d="M 0 2 Q 350 44 700 2" fill="none" stroke="#1F2937" strokeWidth={3} />
          </svg>
          <div className="relative grid grid-cols-4 gap-1.5 pt-1 sm:grid-cols-7">{metode.map((t, i) => bendera(t, i))}</div>
        </div>

        {/* Panggung festival bertirai */}
        <div className="mt-3">
          <div className="flex h-6 items-stretch overflow-hidden rounded-t-lg" aria-hidden="true">
            {Array.from({ length: 14 }, (_, i) => (
              <span key={i} className="flex-1" style={{ background: i % 2 ? "#B91C1C" : "#DC2626", borderRadius: "0 0 50% 50%" }} />
            ))}
          </div>
          <div className="rounded-b-lg border-4 border-t-0 border-[#15803D] bg-[#F0FDF4] p-2">
            <p className="mb-1 text-center text-xs font-black text-[#14532D]">
              {KELOMPOK_BENDERA.hasil.ikon} Panggung festival: Hasil
            </p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{kel("hasil").map((t) => kartu(t, "panggung"))}</div>
          </div>
          <div className="h-3 rounded-b-md bg-[#78350F]" aria-hidden="true" />
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#EFF6FF"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_BENDERA, l);
          return k ? { isi: KELOMPOK_BENDERA[k].isi, garis: KELOMPOK_BENDERA[k].garis, ikon: KELOMPOK_BENDERA[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Untaian bendera lengkap! Dari masalah di papan, langkah di bendera, sampai hasil di panggung." : tp.pesan}
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
