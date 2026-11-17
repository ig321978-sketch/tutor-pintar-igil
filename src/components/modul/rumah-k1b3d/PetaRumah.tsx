"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_RUMAH, PETUNJUK_URUT_RUMAH, PUSAT_RUMAH, SUARA_RUMAH, TEMPAT_RUMAH } from "./data";

/**
 * Mind-map Kelas 1 Bab 3 Sub-Bab D: Halaman Rumah Nenek. Papan nama desa bertiang = Masalah, baju bernomor yang tergantung di tali
 * jemuran = Penyelesaian berurutan (semua metode Story), tikar makan bersama = Hasil. Label sewarna ditempel; baju hanya menerima
 * labelnya sendiri. Hanya poin pelajaran.
 */
export default function PetaRumah({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_RUMAH,
    53,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_RUMAH, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_RUMAH;
      return kel ? KELOMPOK_RUMAH[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_RUMAH, t, l),
  );
  const slot = (t: Tempat, kelas: string, gaya?: React.CSSProperties) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_RUMAH[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Tempat kosong ${g.nama}${t.urutan ? ` nomor ${t.urutan}` : ""}`}
        className={`relative flex min-h-[46px] w-full items-center justify-center border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${kelas} ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.9)", borderColor: g.garis, ...gaya }}
      >
        {t.urutan ? <span className="absolute -top-3 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-[#0369A1] text-[11px] text-white">{t.urutan}</span> : null}
        {teks ?? "?"}
      </button>
    );
  };
  const kel = (k: string) => TEMPAT_RUMAH.filter((t) => t.kelompok === k);

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_RUMAH)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Halaman rumah Nenek. Papan nama desa berisi masalah, baju bernomor di tali jemuran berisi langkah berurutan, tikar makan berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border-4 border-[#3F6212]" style={{ background: "linear-gradient(180deg,#BAE6FD 0 30%,#BBF7D0 30%)" }}>
        {/* Papan nama desa bertiang */}
        <div className="px-3 pt-3">
          <div className="rounded-lg border-4 border-[#78350F] bg-[#FDE68A] p-2">
            <p className="mb-1 text-center text-xs font-black text-[#78350F]">
              {KELOMPOK_RUMAH.masalah.ikon} Papan nama desa: Masalah
            </p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kel("masalah").map((t) => slot(t, "rounded-md"))}</div>
          </div>
          <div className="mx-auto flex w-2/3 justify-between" aria-hidden="true">
            <span className="h-5 w-2 bg-[#78350F]" />
            <span className="h-5 w-2 bg-[#78350F]" />
          </div>
        </div>

        {/* Tali jemuran dengan baju bernomor */}
        <div className="px-3 py-3">
          <p className="mb-3 text-center text-sm font-black text-[#0C4A6E]">
            {KELOMPOK_RUMAH.metode.ikon} {PUSAT_RUMAH}: tali jemuran
          </p>
          {[kel("metode").slice(0, 4), kel("metode").slice(4)].map((baris, r) => (
            <div key={r} className="relative mb-4">
              <div className="absolute left-0 right-0 top-0 h-0.5 bg-[#57534E]" aria-hidden="true" />
              <div className="grid grid-cols-2 gap-x-2 gap-y-5 pt-3 sm:grid-cols-4">
                {baris.map((t) => (
                  <div key={t.id} className="relative">
                    <span className="absolute -top-4 left-1/2 h-3 w-1.5 -translate-x-1/2 rounded-sm bg-[#A16207]" aria-hidden="true" />
                    {slot(t, "rounded-b-xl rounded-t-sm", { clipPath: "polygon(0 0,30% 0,40% 12%,60% 12%,70% 0,100% 0,100% 100%,0 100%)" })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tikar makan bersama */}
        <div className="px-3 pb-3">
          <div className="rounded-xl border-4 border-[#BE185D] p-2" style={{ background: "repeating-linear-gradient(90deg,#FCE7F3 0 14px,#FBCFE8 14px 28px)" }}>
            <p className="mb-1 text-center text-xs font-black text-[#831843]">
              {KELOMPOK_RUMAH.hasil.ikon} Tikar makan bersama: Hasil
            </p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{kel("hasil").map((t) => slot(t, "rounded-full"))}</div>
          </div>
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#F0FDF4"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_RUMAH, l);
          return k ? { isi: KELOMPOK_RUMAH[k].isi, garis: KELOMPOK_RUMAH[k].garis, ikon: KELOMPOK_RUMAH[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Halaman rumah Nenek lengkap! Dari masalah di papan desa, langkah di tali jemuran, sampai hasil di tikar makan." : tp.pesan}
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
