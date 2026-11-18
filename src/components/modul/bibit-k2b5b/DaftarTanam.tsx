"use client";

import React from "react";
import type { Tempat } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import { BARIS_DAFTAR, KELOMPOK_DAFTAR, KOLOM_DAFTAR, SUARA_DAFTAR, TEMPAT_DAFTAR } from "./data-peta";

/**
 * Infografis Kelas 2 Bab 5 Sub-Bab B: Daftar Tanam. Papan kayu bertabel di tiang kebun; tiap baris satu cara membagi dari Story
 * (enam jadi tiga dan tiga, empat dan dua, gabung dua setengah, bilangan ganjil, dan pola setengah) dengan tiga kotak kosong:
 * Pembagian, Setiap bagian, Hasil. Petunjuk salah menyebut baris yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { bagi: "Pembagian", bagian: "Setiap bagian", hasil: "Hasil" };

export default function DaftarTanam({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_DAFTAR,
    71,
    (l, tujuan) => {
      const asal = TEMPAT_DAFTAR.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba tempat yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_DAFTAR[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi barisnya keliru. Label ini milik baris ${BARIS_DAFTAR[baris].nama}, bukan baris ${BARIS_DAFTAR[barisTujuan].nama}.`;
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
        className={`flex min-h-[48px] w-full items-center justify-center rounded-md border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D] lm-muncul" : "border-dashed border-[#92400E] bg-[#FEF3C7]/80 text-[#92400E]/60"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[4.4rem_1.2fr_1.1fr_1.1fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_DAFTAR)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Daftar tanam. Tiap baris satu cara membagi. Tempelkan pembagiannya, keadaan tiap bagian, dan hasilnya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl">
        <div className="mx-auto flex justify-between px-8" aria-hidden="true">
          <span className="block h-4 w-3 rounded-b-sm bg-[#92400E]" />
          <span className="block h-4 w-3 rounded-b-sm bg-[#92400E]" />
        </div>
        <div className="overflow-hidden rounded-2xl border-4 border-[#92400E] bg-[#FDE68A] shadow-[0_6px_0_rgba(120,53,15,0.35)]">
          <div className="p-2">
            <p className="text-center text-lg font-black text-[#78350F]">{"\u{1F4CB}"} Daftar Tanam</p>
            <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
              <span className="text-center text-[10px] font-black text-[#78350F]">Cara</span>
              {KOLOM_DAFTAR.map((k) => (
                <span key={k} className="rounded-sm bg-[#78350F] px-0.5 text-center text-[10px] font-black leading-tight text-white">
                  {k}
                </span>
              ))}
            </div>
            {BARIS_DAFTAR.map((b, i) => (
              <div key={b.nama} className="mb-1.5 rounded-md border-2 border-[#D6A15E] bg-white/55 p-1">
                <div className={`grid ${KOL} items-center gap-1`}>
                  <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#78350F]">
                    <span className="text-lg" aria-hidden="true">
                      {b.ikon}
                    </span>
                    {b.nama}
                  </span>
                  {[0, 1, 2].map((c) => kotak(TEMPAT_DAFTAR[i * 3 + c]))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#ECFCCB" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Daftar lengkap! Bagi sama banyak, periksa kedua bagian, dan ingat: bilangan ganjil tidak punya setengah utuh." : tp.pesan}
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
