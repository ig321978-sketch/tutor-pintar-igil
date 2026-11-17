"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_RENCANA, KELOMPOK_RENCANA, KOLOM_RENCANA, SUARA_RENCANA, TEMPAT_RENCANA } from "./data";

/**
 * Infografis Kelas 1 Bab 7 Sub-Bab A: Papan Rencana Tukang. Papan kayu dipaku di batang pohon jambu; tiap baris satu perbandingan dari Story
 * (dua tiang, empat tiang, tali pegangan, burung di dahan, tongkat kayu) dengan tiga kotak kosong: Banyak benda, Kata dipakai, Catatan.
 * Petunjuk salah menyebut baris pemilik label yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { banyak: "Banyak benda", kata: "Kata dipakai", catatan: "Catatan" };
const PAKU = ["#DC2626", "#2563EB", "#16A34A", "#CA8A04", "#9333EA"];

export default function PapanRencana({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_RENCANA,
    83,
    (l, tujuan) => {
      const asal = TEMPAT_RENCANA.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba tempat yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_RENCANA[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi barisnya keliru. Label ini milik baris ${BARIS_RENCANA[baris].nama}, bukan baris ${BARIS_RENCANA[barisTujuan].nama}.`;
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-sm border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#92400E] bg-[#FFFBEB]/70 text-[#92400E]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
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
        <button type="button" onClick={() => speakGuru(SUARA_RENCANA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Papan rencana tukang di batang pohon. Tiap baris satu perbandingan. Tempelkan banyak bendanya, kata yang dipakai, dan catatannya.</p>
      </div>

      <div className="mx-auto flex w-full max-w-xl items-stretch gap-2">
        {/* Batang pohon jambu di sisi papan */}
        <div className="hidden w-6 shrink-0 rounded-md border-2 border-[#78350F] sm:block" style={{ background: "repeating-linear-gradient(180deg,#92400E 0 14px,#78350F 14px 16px)" }} aria-hidden="true" />
        <div className="min-w-0 flex-1 rounded-lg border-[6px] border-[#78350F] px-2 py-3 sm:px-4" style={{ background: "repeating-linear-gradient(180deg,#E2B97A 0 22px,#D3A55F 22px 24px)" }}>
          <p className="text-center text-lg font-black text-[#451A03]">{"\u{1F4CB}"} Papan Rencana Tukang</p>
          <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
            <span className="text-center text-[10px] font-black text-[#451A03]">Perbandingan</span>
            {KOLOM_RENCANA.map((k) => (
              <span key={k} className="rounded-sm bg-[#451A03] px-0.5 text-center text-[10px] font-black leading-tight text-[#FEF3C7]">
                {k}
              </span>
            ))}
          </div>
          {BARIS_RENCANA.map((b, i) => (
            <div key={b.nama} className="relative mb-1.5 rounded-md bg-[#FFFBEB]/85 p-1 shadow-[0_2px_0_rgba(69,26,3,0.3)]">
              <span className="absolute -left-1 -top-1 h-3 w-3 rounded-full border border-black/30" style={{ background: PAKU[i % PAKU.length] }} aria-hidden="true" />
              <div className={`grid ${KOL} items-center gap-1`}>
                <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#451A03]">
                  <span className="text-lg" aria-hidden="true">
                    {b.ikon}
                  </span>
                  {b.nama}
                </span>
                {[0, 1, 2].map((c) => kotak(TEMPAT_RENCANA[i * 3 + c]))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FEF3C7" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Papan rencana lengkap! Mulai dari garis awal yang sama, pakai lebih untuk dua benda dan paling untuk tiga benda atau lebih." : tp.pesan}
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
