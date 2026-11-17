"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_REL, PETUNJUK_URUT_REL, PUSAT_REL, SUARA_REL, TEMPAT_REL } from "./data";

/**
 * Mind-map Kelas 1 Bab 1 Sub-Bab B: Rel Kereta Belajar. Stasiun awal = Masalah, gerbong bernomor = Penyelesaian berurutan
 * (semua metode Story), stasiun akhir = Hasil. Label diketuk lalu ditempel di tempat kosong yang sewarna; gerbong hanya
 * menerima label dengan nomornya sendiri. Hanya poin pelajaran, tanpa poin cerita.
 */
export default function PetaRel({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_REL,
    31,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_REL, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_REL;
      return kel ? KELOMPOK_REL[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_REL, t, l),
  );
  const gaya = (kel: string) => KELOMPOK_REL[kel];

  const slot = (t: Tempat, kecil = false) => {
    const teks = tp.teksDi(t);
    const g = gaya(t.kelompok);
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Tempat kosong ${g.nama}${t.urutan ? ` nomor ${t.urutan}` : ""}`}
        className={`flex min-h-[44px] w-full items-center justify-center rounded-xl border-[3px] px-2 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""} ${kecil ? "" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,255,255,0.75)", borderColor: g.garis }}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const stasiun = (kel: "masalah" | "hasil") => {
    const g = gaya(kel);
    return (
      <div className="rounded-2xl border-4 p-2 shadow-[0_4px_0_rgba(28,1,165,0.2)]" style={{ borderColor: g.garis, background: `${g.isi}66` }}>
        <div className="mb-1.5 flex items-center justify-center gap-2">
          <span className="rounded-md px-2 py-0.5 text-xs font-black text-white" style={{ background: g.garis }}>
            {g.ikon} {g.letak}: {g.nama}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{TEMPAT_REL.filter((t) => t.kelompok === kel).map((t) => slot(t))}</div>
      </div>
    );
  };
  const gerbong = TEMPAT_REL.filter((t) => t.kelompok === "metode");

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_REL)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Rel kereta belajar. Isi stasiun awal, gerbong bernomor sesuai urutan langkah, lalu stasiun akhir.</p>
      </div>

      <div className="mx-auto max-w-xl space-y-2 rounded-3xl border-4 border-[#1C01A5] bg-[#E0F2FE] p-2" style={{ backgroundImage: "linear-gradient(180deg,#E0F2FE,#F0FDF4)" }}>
        <p className="mx-auto w-fit rounded-lg border-2 border-[#1C01A5] bg-white px-3 py-1 text-center text-sm font-black text-[#1C01A5]">
          {"\u{1F689}"} {PUSAT_REL}
        </p>
        {stasiun("masalah")}
        <div className="relative pl-7">
          <div aria-hidden="true" className="absolute bottom-0 left-2 top-0 w-3 rounded" style={{ background: "repeating-linear-gradient(180deg,#78350F 0 4px,transparent 4px 12px)", borderLeft: "3px solid #475569", borderRight: "3px solid #475569" }} />
          <p className="mb-1 text-2xl" aria-hidden="true">
            {"\u{1F682}"}
          </p>
          <ol className="space-y-2.5">
            {gerbong.map((t) => (
              <li key={t.id} className="relative">
                <div className="flex items-center gap-2 rounded-xl border-[3px] border-[#B45309] bg-[#FEF3C7] p-1.5 shadow-[0_3px_0_rgba(120,53,15,0.35)]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#B45309] text-sm font-black text-white">{t.urutan}</span>
                  {slot(t)}
                </div>
                <div aria-hidden="true" className="flex justify-around px-8">
                  <span className="-mt-1 h-3 w-3 rounded-full bg-[#334155]" />
                  <span className="-mt-1 h-3 w-3 rounded-full bg-[#334155]" />
                </div>
              </li>
            ))}
          </ol>
        </div>
        {stasiun("hasil")}
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#F8FAFC"
        gaya={(l) => {
          const kel = kelompokLabel(TEMPAT_REL, l);
          return kel ? { isi: gaya(kel).isi, garis: gaya(kel).garis, ikon: gaya(kel).ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Rel lengkap! Kereta belajar sampai di stasiun akhir." : tp.pesan}
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
