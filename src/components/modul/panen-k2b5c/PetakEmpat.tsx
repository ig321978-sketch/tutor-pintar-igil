"use client";

import React from "react";
import { cocokKelompok, kelompokLabel, type Tempat } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import { KELOMPOK_PETAK, PETUNJUK_URUT_PETAK, PUSAT_PETAK, SUARA_PETAK, TEMPAT_PETAK } from "./data-peta";

/**
 * Mind-map Kelas 2 Bab 5 Sub-Bab C: Petak Empat. Satu petak kebun persegi dibagi empat oleh dua tali bersilang: kiri atas = Masalah (tiga petak),
 * kanan atas dan kiri bawah = Penyelesaian (tujuh petak bernomor berurutan, memuat semua metode Story termasuk Belah Dua Kali, Dinding Pecahan, dan
 * Lipat dan Warnai), kanan bawah = Hasil (empat petak). Tiap petak satu tempat; label sewarna dipasang, petak bernomor hanya menerima labelnya sendiri.
 * Hanya poin pelajaran.
 */
const TANAH = "repeating-linear-gradient(0deg,rgba(120,53,15,0.12) 0 2px,transparent 2px 12px)";

export default function PetakEmpat({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PETAK,
    97,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_PETAK, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_PETAK;
      return kel ? KELOMPOK_PETAK[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_PETAK, t, l),
  );
  const kel = (k: string) => TEMPAT_PETAK.filter((t) => t.kelompok === k);
  const metode = kel("metode");
  const petak = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_PETAK[t.kelompok];
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? (t.urutan ? `Petak kosong nomor ${t.urutan}` : `Petak kosong ${g.nama}`)}
        className={`relative flex min-h-[56px] w-full items-center justify-center gap-1 rounded-md border-[3px] px-1.5 py-1 text-center text-[11px] font-black leading-tight text-[#1C01A5] sm:text-xs ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? g.isi : "rgba(255,251,235,0.92)", borderColor: g.garis }}
      >
        {t.urutan ? (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#78350F] bg-[#FDE68A] text-[10px] font-black text-[#78350F]" aria-hidden="true">
            {t.urutan}
          </span>
        ) : null}
        <span className="flex-1">{teks ?? "?"}</span>
      </button>
    );
  };
  const kotak = (judul: string, ikon: string, isi: Tempat[]) => (
    <div className="space-y-1.5 rounded-lg p-1.5" style={{ backgroundImage: TANAH, backgroundColor: "#D9A066" }}>
      <p className="rounded-sm bg-[#78350F] px-1 py-0.5 text-center text-[11px] font-black text-[#FEF3C7]">
        {ikon} {judul}
      </p>
      <div className="grid gap-1.5">{isi.map((t) => petak(t))}</div>
    </div>
  );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_PETAK)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Petak kebun dibagi empat. Kiri atas berisi masalah, dua petak tengah punya tujuh langkah bernomor, kanan bawah berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl rounded-xl border-[6px] border-dashed border-[#DC2626] bg-[#BEF264] p-2">
        <p className="mb-1.5 text-center text-sm font-black text-[#14532D]">
          {"\u{1F33F}"} {PUSAT_PETAK}
        </p>
        <div className="relative grid grid-cols-2 gap-2">
          <span className="pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-[#DC2626]/70" aria-hidden="true" />
          <span className="pointer-events-none absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-[#DC2626]/70" aria-hidden="true" />
          {kotak(`${KELOMPOK_PETAK.masalah.letak}: ${KELOMPOK_PETAK.masalah.nama}`, KELOMPOK_PETAK.masalah.ikon, kel("masalah"))}
          {kotak("Penyelesaian: langkah satu sampai empat", KELOMPOK_PETAK.metode.ikon, metode.slice(0, 4))}
          {kotak("Penyelesaian: langkah lima sampai tujuh", KELOMPOK_PETAK.metode.ikon, metode.slice(4))}
          {kotak(`${KELOMPOK_PETAK.hasil.letak}: ${KELOMPOK_PETAK.hasil.nama}`, KELOMPOK_PETAK.hasil.ikon, kel("hasil"))}
        </div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#ECFCCB"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_PETAK, l);
          return k ? { isi: KELOMPOK_PETAK[k].isi, garis: KELOMPOK_PETAK[k].garis, ikon: KELOMPOK_PETAK[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Petak terisi! Dari masalah, langkah penyelesaian, sampai hasil: empat bagian sama besar adalah seperempat." : tp.pesan}
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
