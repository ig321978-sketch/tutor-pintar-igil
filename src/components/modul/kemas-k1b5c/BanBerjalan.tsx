"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_BAN, PETUNJUK_URUT_BAN, PUSAT_BAN, SUARA_BAN, TEMPAT_BAN } from "./data";

/**
 * Mind-map Kelas 1 Bab 5 Sub-Bab C: Ban Berjalan Pengemasan. Mesin segel kantong di kiri atas = Masalah, ban berjalan dengan tujuh kantong
 * tersegel bernomor = Penyelesaian berurutan (semua metode Story, dibaca dari kiri), peti kayu siap jual di ujung ban = Hasil.
 * Label sewarna ditempel; kantong hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
export default function BanBerjalan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_BAN,
    61,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_BAN, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_BAN;
      return kel ? KELOMPOK_BAN[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_BAN, t, l),
  );
  const kel = (k: string) => TEMPAT_BAN.filter((t) => t.kelompok === k);
  const kartu = (t: Tempat, gaya: "mesin" | "peti") => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_BAN[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Tempat kosong ${g.nama}`}
        className={`flex min-h-[46px] w-full items-center justify-center border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${gaya === "mesin" ? "rounded-md" : "rounded-sm"} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.9)", borderColor: g.garis }}
      >
        {teks ?? "?"}
      </button>
    );
  };
  /** Kantong plastik tersegel: garis segel bergerigi di atas, tag nomor di sudut. */
  const kantong = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_BAN.metode;
    return (
      <div key={t.id} className="relative flex flex-col items-center">
        <span
          className="h-2 w-[86%] rounded-t-sm"
          style={{ background: "repeating-linear-gradient(90deg,#94A3B8 0 4px,#E2E8F0 4px 8px)" }}
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={() => tp.ketukTempat(t)}
          aria-label={teks ?? `Kantong kosong nomor ${t.urutan}`}
          className={`flex min-h-[64px] w-full items-center justify-center rounded-b-[1.2rem] border-[3px] border-t-0 px-1.5 pt-2 text-center text-[11px] font-black leading-tight text-[#1C01A5] sm:text-xs ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
          style={{ borderColor: g.garis, background: teks ? g.isi : "linear-gradient(160deg,rgba(255,255,255,0.95),rgba(224,242,254,0.85))" }}
        >
          {teks ?? "?"}
        </button>
        <span className="absolute -left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#A16207] bg-[#FEF08A] text-[11px] font-black text-[#713F12]" aria-hidden="true">
          {t.urutan}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_BAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Ban berjalan pengemasan. Mesin segel berisi masalah, kantong bernomor di ban berisi langkah, peti siap jual berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl rounded-3xl border-4 border-[#334155] bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0] p-2">
        {/* Mesin segel kantong (Masalah) */}
        <div className="mx-auto max-w-md rounded-xl border-4 border-[#475569] bg-gradient-to-b from-[#CBD5E1] to-[#94A3B8] p-2 shadow-[inset_0_-6px_0_rgba(51,65,85,0.35)]">
          <div className="mb-1 flex items-center justify-center gap-2">
            <span className="h-3.5 w-3.5 rounded-full border-2 border-[#7F1D1D] bg-[#EF4444]" aria-hidden="true" />
            <p className="text-center text-xs font-black text-[#1E293B]">
              {KELOMPOK_BAN.masalah.ikon} Mesin segel kantong: Masalah
            </p>
            <span className="h-3 w-8 rounded-sm bg-[#1E293B]" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">{kel("masalah").map((t) => kartu(t, "mesin"))}</div>
        </div>
        <div className="mx-auto h-3 w-10 rounded-b-md bg-[#475569]" aria-hidden="true" />

        {/* Ban berjalan dengan tujuh kantong tersegel bernomor (Penyelesaian) */}
        <p className="mt-1 text-center text-sm font-black text-[#1E293B]">
          {KELOMPOK_BAN.metode.ikon} {PUSAT_BAN}: ikuti kantong dari kiri {"\u{27A1}\u{FE0F}"}
        </p>
        <div className="rounded-2xl border-4 border-[#1E293B] bg-[#334155] p-2">
          <div className="grid grid-cols-2 gap-x-2 gap-y-3 sm:grid-cols-4">{kel("metode").map((t) => kantong(t))}</div>
          <div
            className="mt-2 h-4 rounded-full border-2 border-[#0F172A]"
            style={{ background: "radial-gradient(circle at center,#94A3B8 0 4px,#1E293B 5px) 0 0/22px 100%,#1E293B" }}
            aria-hidden="true"
          />
        </div>
        <div className="mx-auto h-4 w-0 border-x-[10px] border-t-[12px] border-x-transparent border-t-[#334155]" aria-hidden="true" />

        {/* Peti kayu siap jual (Hasil) */}
        <div
          className="mx-auto max-w-md rounded-md border-4 border-[#78350F] p-2"
          style={{ background: "repeating-linear-gradient(180deg,#D97706 0 18px,#B45309 18px 20px),#D97706" }}
        >
          <p className="mb-1 text-center text-xs font-black text-white drop-shadow">
            {KELOMPOK_BAN.hasil.ikon} Peti siap jual: Hasil
          </p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{kel("hasil").map((t) => kartu(t, "peti"))}</div>
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#F1F5F9"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_BAN, l);
          return k ? { isi: KELOMPOK_BAN[k].isi, garis: KELOMPOK_BAN[k].garis, ikon: KELOMPOK_BAN[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Semua kantong tersegel! Dari masalah di mesin segel, langkah di ban berjalan, sampai hasil di peti siap jual." : tp.pesan}
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
