"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_KARCIS, KELOMPOK_KARCIS, KOLOM_KARCIS, SUARA_KARCIS, TEMPAT_KARCIS } from "./data";

/**
 * Infografis Kelas 1 Bab 6 Sub-Bab B: Lembar Karcis. Selembar karcis bergigi panjang; tiap baris satu penjumlahan dari Story (rombongan,
 * genapkan sepuluh, belasan, pilih cara, salah langkah), dipisah garis sobek putus-putus, dengan tiga kotak kosong: Bilangan, Cara, Hasil.
 */
const NAMA_KOLOM: Record<string, string> = { bilangan: "Bilangan", cara: "Cara", hasil: "Hasil" };
const WARNA = ["#FEF08A", "#FBCFE8", "#BAE6FD", "#BBF7D0", "#FED7AA"];

export default function LembarKarcis({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_KARCIS,
    83,
    (l, tujuan) => {
      const t = TEMPAT_KARCIS.find((x) => x.kunci === l.teks);
      if (t && t.kelompok === tujuan.kelompok) {
        const i = Number(/^k(\d+)-/.exec(t.id)?.[1] ?? 0);
        return `Kolomnya sudah benar, tetapi itu milik baris ${BARIS_KARCIS[i].nama}. Cocokkan dengan baris ini.`;
      }
      return t ? KELOMPOK_KARCIS[t.kelompok] : "Coba tempat yang lain.";
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-md border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#B45309] bg-white/60 text-[#B45309]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[4.9rem_1fr_1fr_1fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_KARCIS)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Lembar karcis dari loket. Tiap baris satu penjumlahan. Tempelkan bilangannya, caranya, dan hasilnya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-xl border-4 border-[#B45309] bg-[#FFFBEB] px-2 py-3 shadow-[0_4px_0_rgba(180,83,9,0.35)] sm:px-4">
        <p className="text-center text-lg font-black text-[#92400E]">{"\u{1F39F}\u{FE0F}"} Lembar Karcis Loket</p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
          <span className="text-center text-[10px] font-black text-[#92400E]">Penjumlahan</span>
          {KOLOM_KARCIS.map((k) => (
            <span key={k} className="rounded-sm bg-[#92400E] px-0.5 text-center text-[10px] font-black leading-tight text-[#FEF3C7]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_KARCIS.map((b, i) => (
          <div key={b.nama} className="relative mb-2 rounded-md border-2 border-dashed border-[#B45309] p-1 pl-3" style={{ background: WARNA[i % WARNA.length] }}>
            <span className="absolute -left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-[#B45309] bg-[#FFFBEB]" aria-hidden="true" />
            <span className="absolute -right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-[#B45309] bg-[#FFFBEB]" aria-hidden="true" />
            <div className={`grid ${KOL} items-center gap-1`}>
              <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#78350F]">
                <span className="text-lg" aria-hidden="true">
                  {b.ikon}
                </span>
                {b.nama}
              </span>
              {[0, 1, 2].map((c) => kotak(TEMPAT_KARCIS[i * 3 + c]))}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FEF3C7" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Lembar karcis lengkap! Hitung maju, genapkan sepuluh, dan belasan tambah satuan, semua hasilnya tercatat." : tp.pesan}
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
