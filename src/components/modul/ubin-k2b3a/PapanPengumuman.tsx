"use client";

import React from "react";
import type { Tempat } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import { BARIS_PAPAN, KELOMPOK_PAPAN, KOLOM_PAPAN, SUARA_PAPAN, TEMPAT_PAPAN } from "./data-peta";

/**
 * Infografis Kelas 2 Bab 3 Sub-Bab A: Papan Pengumuman taman bermain. Papan hijau bertepi kayu berisi tabel; tiap baris satu benda dari Story
 * (sarang lebah, perosotan, rumah burung, ubin tiga sisi, uang logam, ubin telur) dengan tiga kotak kosong: Tepinya, Hitungan sisi, Nama bentuk.
 * Petunjuk salah menyebut baris yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { tepi: "Tepinya", sisi: "Hitungan sisi", bentuk: "Nama bentuk" };

export default function PapanPengumuman({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PAPAN,
    47,
    (l, tujuan) => {
      const asal = TEMPAT_PAPAN.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba tempat yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_PAPAN[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi barisnya keliru. Label ini milik ${BARIS_PAPAN[baris].nama}, bukan ${BARIS_PAPAN[barisTujuan].nama}.`;
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-sm border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#F8FAFC] bg-[#166534] text-[#F8FAFC] lm-muncul" : "border-dashed border-[#F8FAFC]/70 bg-[#14532D] text-[#F8FAFC]/60"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[4.2rem_1fr_1.25fr_1.25fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_PAPAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Papan pengumuman taman bermain. Tiap baris satu benda. Tempelkan tepinya, hitungan sisinya, dan nama bentuknya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[8px] border-[#92400E] bg-[#166534] p-2 shadow-[0_6px_0_rgba(69,26,3,0.35)]">
        <p className="text-center text-lg font-black text-[#FEF08A]">{"\u{1F4CB}"} Papan Pengumuman Taman</p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
          <span className="text-center text-[10px] font-black text-[#F8FAFC]">Benda</span>
          {KOLOM_PAPAN.map((k) => (
            <span key={k} className="rounded-sm bg-[#F8FAFC] px-0.5 text-center text-[10px] font-black leading-tight text-[#14532D]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_PAPAN.map((b, i) => (
          <div key={b.nama} className="mb-1.5 rounded-md border-2 border-[#F8FAFC]/80 p-1">
            <div className={`grid ${KOL} items-center gap-1`}>
              <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#F8FAFC]">
                <span className="text-lg" aria-hidden="true">
                  {b.ikon}
                </span>
                {b.nama}
              </span>
              {[0, 1, 2].map((c) => kotak(TEMPAT_PAPAN[i * 3 + c]))}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FEF3C7" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Papan lengkap! Lihat tepinya, hitung sisinya dengan tanda awal, lalu sebut namanya." : tp.pesan}
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
