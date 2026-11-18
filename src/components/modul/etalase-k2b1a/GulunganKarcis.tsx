"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_GULUNGAN, KELOMPOK_GULUNGAN, KOLOM_GULUNGAN, SUARA_GULUNGAN, TEMPAT_GULUNGAN } from "./data";

/**
 * Infografis Kelas 2 Bab 1 Sub-Bab A: Gulungan Karcis Nomor Antrean. Satu gulungan karcis berlubang; tiap karcis satu bilangan dari Story
 * (kue lapis, dua nomor antrean, nomor yang sobek, dan contoh Hitung Lanjut) dengan tiga kotak kosong: Banyak, Dibaca, Penjumlahan.
 * Petunjuk salah menyebut karcis yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { banyak: "Banyak", dibaca: "Dibaca", jumlah: "Penjumlahan" };

export default function GulunganKarcis({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_GULUNGAN,
    89,
    (l, tujuan) => {
      const asal = TEMPAT_GULUNGAN.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba tempat yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_GULUNGAN[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi karcisnya keliru. Label ini milik karcis ${BARIS_GULUNGAN[baris].nama}, bukan karcis ${BARIS_GULUNGAN[barisTujuan].nama}.`;
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-md border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#B45309] bg-white/70 text-[#B45309]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[4.8rem_1fr_1.3fr_1fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_GULUNGAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Gulungan karcis nomor antrean. Tiap karcis satu bilangan. Tempelkan lambangnya, cara membacanya, dan puluhan ditambah satuannya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#F59E0B] bg-[#FEF3C7] p-2 shadow-[0_6px_0_rgba(180,83,9,0.3)]">
        <p className="text-center text-lg font-black text-[#92400E]">{"\u{1F39F}"} Gulungan Karcis Antrean</p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
          <span className="text-center text-[10px] font-black text-[#92400E]">Karcis</span>
          {KOLOM_GULUNGAN.map((k) => (
            <span key={k} className="rounded-sm bg-[#92400E] px-0.5 text-center text-[10px] font-black leading-tight text-[#FEF3C7]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_GULUNGAN.map((b, i) => (
          <div key={b.nama} className="relative mb-2 rounded-lg border-2 border-dashed border-[#B45309] bg-white/90 p-1 pl-4">
            <span className="absolute left-0.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#F59E0B] bg-[#FEF3C7]" aria-hidden="true" />
            <div className={`grid ${KOL} items-center gap-1`}>
              <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#78350F]">
                <span className="text-lg" aria-hidden="true">
                  {b.ikon}
                </span>
                {b.nama}
              </span>
              {[0, 1, 2].map((c) => kotak(TEMPAT_GULUNGAN[i * 3 + c]))}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FEF3C7" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Gulungan karcis lengkap! Tiap bilangan bisa dibaca dan ditulis sebagai puluhan ditambah satuan." : tp.pesan}
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
