"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_TAPLAK, KELOMPOK_TAPLAK, KOLOM_TAPLAK, SUARA_TAPLAK, TEMPAT_TAPLAK } from "./data";

/**
 * Infografis Kelas 2 Bab 1 Sub-Bab C: Taplak Pesta Kue. Taplak kotak-kotak di meja Pesta Kue berisi tabel; tiap baris satu nampan dari Story
 * (lapis, donat, pastel, bolu, dan dua dari tiga nampan) dengan tiga kotak kosong: Bilangan, Puluhan dan satuan, Hasil. Petunjuk salah menyebut baris yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { banyak: "Bilangan", ps: "Puluhan dan satuan", hasil: "Hasil" };

export default function TaplakPesta({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_TAPLAK,
    59,
    (l, tujuan) => {
      const asal = TEMPAT_TAPLAK.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba tempat yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_TAPLAK[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi barisnya keliru. Label ini milik nampan ${BARIS_TAPLAK[baris].nama}, bukan nampan ${BARIS_TAPLAK[barisTujuan].nama}.`;
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-md border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#B91C1C] bg-white/80 text-[#B91C1C]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
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
        <button type="button" onClick={() => speakGuru(SUARA_TAPLAK)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Taplak Pesta Kue. Tiap baris satu nampan. Tempelkan bilangannya, puluhan dan satuannya, dan hasil membandingkannya.</p>
      </div>

      <div
        className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#DC2626] p-2 shadow-[0_6px_0_rgba(127,29,29,0.3)]"
        style={{ backgroundColor: "#FFF1F2", backgroundImage: "repeating-linear-gradient(0deg,rgba(220,38,38,0.2) 0 20px,transparent 20px 40px),repeating-linear-gradient(90deg,rgba(220,38,38,0.2) 0 20px,transparent 20px 40px)" }}
      >
        <p className="text-center text-lg font-black text-[#7F1D1D]">{"\u{1F382}"} Taplak Pesta Kue</p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
          <span className="text-center text-[10px] font-black text-[#7F1D1D]">Nampan</span>
          {KOLOM_TAPLAK.map((k) => (
            <span key={k} className="rounded-sm bg-[#7F1D1D] px-0.5 text-center text-[10px] font-black leading-tight text-[#FEF3C7]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_TAPLAK.map((b, i) => (
          <div key={b.nama} className="mb-1.5 rounded-lg border-2 border-[#DC2626] bg-white/85 p-1 shadow-[0_2px_0_rgba(127,29,29,0.25)]">
            <div className={`grid ${KOL} items-center gap-1`}>
              <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#7F1D1D]">
                <span className="text-lg" aria-hidden="true">
                  {b.ikon}
                </span>
                {b.nama}
              </span>
              {[0, 1, 2].map((c) => kotak(TEMPAT_TAPLAK[i * 3 + c]))}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FEF3C7" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Taplak lengkap! Perkirakan dulu, bandingkan puluhannya, lihat satuannya, lalu pasang tandanya." : tp.pesan}
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
