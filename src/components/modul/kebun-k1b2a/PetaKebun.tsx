"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_KEBUN, PETUNJUK_URUT_KEBUN, PUSAT_KEBUN, SUARA_KEBUN, TEMPAT_KEBUN } from "./data";

/**
 * Mind-map Kelas 1 Bab 2 Sub-Bab A: Peta Kebun. Papan pagar = Masalah, bedeng bernomor berkelok di sepanjang jalan setapak =
 * Penyelesaian berurutan (semua metode Story), keranjang panen = Hasil. Label sewarna ditempel; bedeng hanya menerima labelnya
 * sendiri. Hanya poin pelajaran.
 */
export default function PetaKebun({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_KEBUN,
    37,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_KEBUN, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_KEBUN;
      return kel ? KELOMPOK_KEBUN[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_KEBUN, t, l),
  );
  const slot = (t: Tempat, gaya: "papan" | "bedeng" | "keranjang") => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_KEBUN[t.kelompok];
    const bentuk = gaya === "papan" ? "rounded-sm" : gaya === "bedeng" ? "rounded-[1.2rem]" : "rounded-b-[1.4rem] rounded-t-md";
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Tempat kosong ${g.nama}${t.urutan ? ` nomor ${t.urutan}` : ""}`}
        className={`relative flex min-h-[48px] w-full items-center justify-center border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${bentuk} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : gaya === "bedeng" ? "rgba(214,161,94,0.55)" : "rgba(255,255,255,0.85)", borderColor: g.garis }}
      >
        {t.urutan ? <span className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#4D7C0F] text-[11px] text-white">{t.urutan}</span> : null}
        {teks ?? (gaya === "bedeng" ? "\u{1F331} ?" : "?")}
      </button>
    );
  };
  const kel = (k: string) => TEMPAT_KEBUN.filter((t) => t.kelompok === k);

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_KEBUN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Peta kebun belajar. Papan pagar berisi masalah, bedeng bernomor di jalan setapak berisi langkah berurutan, keranjang panen berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border-4 border-[#4D7C0F] bg-[#BBF7D0]">
        {/* Pagar dengan papan masalah */}
        <div className="relative px-2 pb-2 pt-3" style={{ background: "repeating-linear-gradient(90deg,#FDBA74 0 14px,#FB923C 14px 16px,transparent 16px 26px)", backgroundColor: "#DCFCE7" }}>
          <div className="absolute left-0 right-0 top-[38%] h-2 bg-[#C2410C]/70" aria-hidden="true" />
          <p className="relative mb-1 text-center text-xs font-black text-[#7C2D12]">
            {KELOMPOK_KEBUN.masalah.ikon} Papan pagar: Masalah
          </p>
          <div className="relative grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kel("masalah").map((t) => slot(t, "papan"))}</div>
        </div>

        {/* Jalan setapak berkelok dengan bedeng bernomor */}
        <div className="relative px-3 py-3">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 0 C 20 15, 80 28, 50 42 S 20 70, 50 84 S 70 96, 50 100" fill="none" stroke="#FDE68A" strokeWidth={9} strokeLinecap="round" />
            <path d="M50 0 C 20 15, 80 28, 50 42 S 20 70, 50 84 S 70 96, 50 100" fill="none" stroke="#D97706" strokeWidth={0.8} strokeDasharray="2 3" />
          </svg>
          <p className="relative mb-2 text-center text-sm font-black text-[#365314]">
            {"\u{1F33F}"} {PUSAT_KEBUN}: jalan setapak
          </p>
          <div className="relative space-y-2">
            {kel("metode").map((t, i) => (
              <div key={t.id} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <div className="w-[68%] sm:w-[58%]">{slot(t, "bedeng")}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Keranjang panen */}
        <div className="px-3 pb-3">
          <div className="rounded-b-[2.5rem] rounded-t-lg border-4 border-[#A16207] p-2" style={{ background: "repeating-linear-gradient(45deg,#FDE68A 0 8px,#FCD34D 8px 16px)" }}>
            <p className="mb-1 text-center text-xs font-black text-[#713F12]">
              {KELOMPOK_KEBUN.hasil.ikon} Keranjang panen: Hasil
            </p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kel("hasil").map((t) => slot(t, "keranjang"))}</div>
          </div>
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#F7FEE7"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_KEBUN, l);
          return k ? { isi: KELOMPOK_KEBUN[k].isi, garis: KELOMPOK_KEBUN[k].garis, ikon: KELOMPOK_KEBUN[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Peta kebun lengkap! Dari masalah di pagar, langkah di bedeng, sampai hasil di keranjang panen." : tp.pesan}
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
