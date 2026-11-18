"use client";

import React from "react";
import type { Tempat } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import { BARIS_JADWAL, KELOMPOK_JADWAL, KOLOM_JADWAL, SUARA_JADWAL, TEMPAT_JADWAL } from "./data-peta";

/**
 * Infografis Kelas 2 Bab 5 Sub-Bab C: Jadwal Panen. Papan kayu bertiang berisi tabel; tiap baris satu benda dari Story (labu, petak tanah, kertas
 * persegi, kertas pojok, lingkaran) dengan tiga kotak kosong: Cara membagi, Bentuk bagian, Hasil. Petunjuk salah menyebut baris yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { cara: "Cara membagi", bentuk: "Bentuk bagian", hasil: "Hasil" };

export default function JadwalPanen({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_JADWAL,
    71,
    (l, tujuan) => {
      const asal = TEMPAT_JADWAL.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba tempat yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_JADWAL[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi barisnya keliru. Label ini milik ${BARIS_JADWAL[baris].nama}, bukan ${BARIS_JADWAL[barisTujuan].nama}.`;
    },
    speakGuru,
  );
  const kotak = (t: Tempat) => {
    const teks = tp.teksDi(t);
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Kotak kosong kolom ${NAMA_KOLOM[t.kelompok]}`}
        className={`flex min-h-[48px] w-full items-center justify-center rounded-sm border-2 px-1 text-center text-[11px] font-black leading-tight ${teks ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D] lm-muncul" : "border-dashed border-[#78350F]/70 bg-white/80 text-[#78350F]/60"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[4.4rem_1fr_0.9fr_1fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_JADWAL)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Papan jadwal panen raya. Tiap baris satu benda. Tempelkan cara membagi, bentuk tiap bagian, dan hasilnya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl">
        <div className="flex justify-between px-6" aria-hidden="true">
          <span className="h-4 w-3 bg-[#78350F]" />
          <span className="h-4 w-3 bg-[#78350F]" />
        </div>
        <div className="rounded-xl border-[6px] border-[#78350F] bg-[#F5E6C8] p-2 shadow-[0_6px_0_rgba(69,26,3,0.3)]">
          <p className="text-center text-lg font-black text-[#14532D]">
            {"\u{1F33E}"} Jadwal Panen Raya
          </p>
          <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
            <span className="text-center text-[10px] font-black text-[#78350F]">Benda</span>
            {KOLOM_JADWAL.map((k) => (
              <span key={k} className="rounded-sm bg-[#166534] px-0.5 text-center text-[10px] font-black leading-tight text-[#F0FDF4]">
                {k}
              </span>
            ))}
          </div>
          {BARIS_JADWAL.map((b, i) => (
            <div key={b.nama} className="mb-1.5 rounded-md border-2 border-[#78350F]/60 bg-white/50 p-1">
              <div className={`grid ${KOL} items-center gap-1`}>
                <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#78350F]">
                  <span className="text-lg" aria-hidden="true">
                    {b.ikon}
                  </span>
                  {b.nama}
                </span>
                {[0, 1, 2].map((c) => kotak(TEMPAT_JADWAL[i * 3 + c]))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between px-6" aria-hidden="true">
          <span className="h-4 w-3 bg-[#78350F]" />
          <span className="h-4 w-3 bg-[#78350F]" />
        </div>
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#ECFCCB" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Jadwal lengkap! Apa pun bendanya, empat bagian harus sama besar supaya tiap bagian seperempat." : tp.pesan}
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
