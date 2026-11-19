"use client";

import React from "react";
import type { Tempat } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TagContoh, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import { BARIS_PAPAN, KELOMPOK_PAPAN, KOLOM_PAPAN, SUARA_PAPAN, TEMPAT_PAPAN } from "./data-peta";

/**
 * Infografis Kelas 2 Bab 6 Sub-Bab A: Papan Lapangan. Papan pengumuman yang dipasang di tiang gawang lapangan, berisi tabel; tiap baris satu kejadian dari Story
 * (kerucut dan kantong, dua kantong, dua bola, boneka harimau, rantai buah) dengan tiga kotak kosong: Cara menimbang, Yang terjadi, Katanya.
 * Petunjuk salah menyebut baris yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { cara: "Cara menimbang", terjadi: "Yang terjadi", hasil: "Katanya" };

export default function PapanLapangan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PAPAN,
    67,
    (l, tujuan) => {
      const asal = TEMPAT_PAPAN.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba tempat yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_PAPAN[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi barisnya keliru. Label ini milik baris ${BARIS_PAPAN[baris].nama}, bukan baris ${BARIS_PAPAN[barisTujuan].nama}.`;
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
        aria-label={t.contoh ? `Contoh: ${teks}` : (teks ?? `Kotak kosong kolom ${NAMA_KOLOM[t.kelompok]}`)}
        className={`relative flex min-h-[44px] w-full items-center justify-center rounded-sm border-2 px-1 text-center text-xs font-black leading-tight [overflow-wrap:anywhere] ${teks ? "border-[#15803D] bg-[#DCFCE7] text-[#1C01A5] lm-muncul" : "border-dashed border-[#64748B]/70 bg-white/85 text-[#64748B]/60"} ${tp.goyang === t.id ? "lm-goyang" : ""} ${t.contoh ? "!pt-3.5" : ""}`}
      >
        {teks ?? "?"}
        {t.contoh ? <TagContoh /> : null}
      </button>
    );
  };
  const KOL = "sm:grid-cols-[4.4rem_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_PAPAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Papan lapangan. Tiap baris satu kejadian. Tempelkan cara menimbangnya, yang terjadi pada alatnya, dan katanya. Kotak bertanda contoh sudah terisi sebagai petunjuk.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-xl border-[6px] border-[#FFFFFF] bg-[#16A34A] p-2 shadow-[0_6px_0_rgba(20,83,45,0.35)]">
        <p className="text-center text-lg font-black text-white">
          {"\u{1F4E3}"} Papan Lapangan
        </p>
        <div className={`mb-1 mt-2 hidden sm:grid ${KOL} gap-1`}>
          <span className="text-center text-[10px] font-black text-white">Kejadian</span>
          {KOLOM_PAPAN.map((k) => (
            <span key={k} className="rounded-sm bg-white px-0.5 text-center text-[10px] font-black leading-tight text-[#15803D]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_PAPAN.map((b, i) => (
          <div key={b.nama} className="mb-1.5 rounded-md border-2 border-white/80 bg-white/60 p-1">
            <div className={`grid grid-cols-1 ${KOL} items-center gap-1`}>
              <span className="flex flex-row items-center justify-center gap-1 text-center text-xs font-black leading-tight text-[#14532D] sm:flex-col sm:text-[10px]">
                <span className="text-lg" aria-hidden="true">
                  {b.ikon}
                </span>
                {b.nama}
              </span>
              {[0, 1, 2].map((c) => (
                <div key={c} className="min-w-0">
                  <span className="block text-[10px] font-black leading-tight text-[#14532D] sm:hidden">{KOLOM_PAPAN[c]}</span>
                  {kotak(TEMPAT_PAPAN[i * 3 + c])}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#DCFCE7" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Papan lapangan lengkap! Benda yang turun lebih berat, papan datar berarti sama berat, dan satuan dihitung banyaknya." : tp.pesan}
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
