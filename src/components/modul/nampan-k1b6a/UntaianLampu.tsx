"use client";

import React from "react";
import { cocokKelompok, kelompokLabel } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { KELOMPOK_LAMPU, PETUNJUK_URUT_LAMPU, PUSAT_LAMPU, SUARA_LAMPU, TEMPAT_LAMPU } from "./data";

/**
 * Mind-map Kelas 1 Bab 6 Sub-Bab A: Untaian Lampu Bohlam. Untaian atas = Masalah, untaian tengah dengan tujuh bohlam bernomor = Penyelesaian
 * berurutan (semua metode Story, dibaca dari kiri ke kanan, baris demi baris), untaian bawah = Hasil. Bohlam yang sudah diisi menyala.
 * Label sewarna ditempel; bohlam bernomor hanya menerima labelnya sendiri. Hanya poin pelajaran.
 */
const KAP = "mx-auto h-2.5 w-6 rounded-t-md bg-[#4B5563]";

export default function UntaianLampu({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_LAMPU,
    61,
    (l, t) => {
      const kel = kelompokLabel(TEMPAT_LAMPU, l);
      if (kel && kel === t.kelompok && t.urutan !== undefined) return PETUNJUK_URUT_LAMPU;
      return kel ? KELOMPOK_LAMPU[kel].petunjuk : "Coba tempat yang lain.";
    },
    speakGuru,
    (t, l) => cocokKelompok(TEMPAT_LAMPU, t, l),
  );
  const kel = (k: string) => TEMPAT_LAMPU.filter((t) => t.kelompok === k);
  const bohlam = (t: Tempat) => {
    const teks = tp.teksDi(t);
    const g = KELOMPOK_LAMPU[t.kelompok];
    return (
      <div key={t.id} className="flex flex-col items-stretch">
        <span className="mx-auto h-3 w-0.5 bg-[#4B5563]" aria-hidden="true" />
        <span className={KAP} aria-hidden="true" />
        <button
          type="button"
          onClick={() => tp.ketukTempat(t)}
          aria-label={teks ?? (t.urutan ? `Bohlam kosong nomor ${t.urutan}` : `Bohlam kosong ${g.nama}`)}
          className={`flex min-h-[54px] w-full items-center justify-center gap-1.5 rounded-[1.6rem] border-[3px] px-2 py-1 text-center text-xs font-black leading-tight text-[#1C01A5] sm:text-sm ${teks ? "lm-muncul" : "border-dashed"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
          style={{ background: teks ? g.isi : "rgba(255,255,255,0.88)", borderColor: g.garis, boxShadow: teks ? "0 0 16px rgba(250,204,21,0.85)" : undefined }}
        >
          {t.urutan ? (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#78350F] bg-[#FDE047] text-[11px] font-black text-[#78350F]" aria-hidden="true">
              {t.urutan}
            </span>
          ) : null}
          <span className="flex-1">{teks ?? "?"}</span>
        </button>
      </div>
    );
  };
  const tali = (
    <svg viewBox="0 0 300 14" className="mx-auto block w-full max-w-md" aria-hidden="true">
      <path d="M 4 4 Q 150 22 296 4" fill="none" stroke="#4B5563" strokeWidth={2} />
    </svg>
  );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_LAMPU)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Untaian lampu bohlam. Untaian atas berisi masalah, tujuh bohlam bernomor berisi langkah, untaian bawah berisi hasil.</p>
      </div>

      <div className="mx-auto max-w-xl rounded-3xl border-4 border-[#1F2937] bg-gradient-to-b from-[#1E1B4B] to-[#312E81] p-2">
        <p className="text-center text-sm font-black text-[#FDE68A]">
          {KELOMPOK_LAMPU.masalah.ikon} Masalah
        </p>
        {tali}
        <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-3">{kel("masalah").map((t) => bohlam(t))}</div>

        <p className="mt-3 text-center text-sm font-black text-[#FDE68A]">
          {KELOMPOK_LAMPU.metode.ikon} {PUSAT_LAMPU}: ikuti bohlam dari kiri ke kanan
        </p>
        {tali}
        <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-2">{kel("metode").map((t) => bohlam(t))}</div>

        <p className="mt-3 text-center text-sm font-black text-[#FDE68A]">
          {KELOMPOK_LAMPU.hasil.ikon} Hasil
        </p>
        {tali}
        <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-2">{kel("hasil").map((t) => bohlam(t))}</div>
      </div>

      <BakiLabel
        sisa={tp.sisa}
        pilih={tp.pilih}
        onPilih={tp.ketukLabel}
        warna="#EEF2FF"
        gaya={(l) => {
          const k = kelompokLabel(TEMPAT_LAMPU, l);
          return k ? { isi: KELOMPOK_LAMPU[k].isi, garis: KELOMPOK_LAMPU[k].garis, ikon: KELOMPOK_LAMPU[k].ikon } : undefined;
        }}
      />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Semua bohlam menyala! Dari masalah di untaian atas, langkah di tiap bohlam, sampai hasil di untaian bawah." : tp.pesan}
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
