"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_KARTU, EMOJI, KELOMPOK_KARTU, KOLOM_KARTU, SUARA_KARTU, TEMPAT_KARTU } from "./data";

/**
 * Infografis Kelas 1 Bab 4 Sub-Bab A: Kartu Bahan di sisi kardus. Tabel data ditulis di sisi kardus bergelombang berlakban;
 * tiap baris satu bahan dari Story, dengan empat kotak kosong: Bentuk, Sisi dan sudut, Banyak, Dipakai.
 */
const NAMA_KOLOM: Record<string, string> = { bentuk: "Bentuk", ciri: "Sisi dan sudut", banyak: "Banyak", pakai: "Dipakai" };

export default function KartuBahan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_KARTU,
    67,
    (l) => {
      const t = TEMPAT_KARTU.find((x) => x.kunci === l.teks);
      return t ? KELOMPOK_KARTU[t.kelompok] : "Coba tempat yang lain.";
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-sm border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-[#FFFBEB] text-[#1C01A5] lm-muncul" : "border-dashed border-[#78350F] bg-[#F5DEB3]/70 text-[#78350F]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ fontFamily: teks ? undefined : "ui-monospace, monospace" }}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[3.6rem_1fr_1.2fr_0.8fr_0.8fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_KARTU)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Kartu bahan di sisi kardus. Tiap baris satu bahan. Tempelkan bentuk, sisi dan sudut, banyaknya, dan kegunaannya.</p>
      </div>

      <div
        className="relative mx-auto w-full max-w-xl rounded-md border-4 border-[#78350F] p-2.5 pt-5"
        style={{ backgroundColor: "#C9955A", backgroundImage: "repeating-linear-gradient(90deg,rgba(120,53,15,0.18) 0 2px,transparent 2px 8px)" }}
      >
        <span className="absolute left-1/2 top-0 h-4 w-28 -translate-x-1/2 bg-[#FDE68A]/80" aria-hidden="true" />
        <p className="text-center text-lg font-black text-[#451A03]">{"\u{1F4E6}"} Kartu Bahan Festival</p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
          <span className="text-center text-[10px] font-black text-[#451A03]">Bahan</span>
          {KOLOM_KARTU.map((k) => (
            <span key={k} className="rounded-sm bg-[#451A03] text-center text-[10px] font-black text-[#FDE68A]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_KARTU.map((b, i) => (
          <div key={b.nama} className="mb-1.5 rounded-sm border-2 border-[#78350F]/60 bg-[#E8C9A0] p-1">
            <div className={`grid ${KOL} items-center gap-1`}>
              <span className="flex flex-col items-center text-[10px] font-black text-[#451A03]">
                <span className="text-xl" aria-hidden="true">
                  {EMOJI[b.jenis]}
                </span>
                {b.nama}
              </span>
              {[0, 1, 2, 3].map((c) => kotak(TEMPAT_KARTU[i * 4 + c]))}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FDE7C8" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Kartu bahan lengkap! Lengkung untuk roda, segitiga untuk atap, segi empat untuk badan." : tp.pesan}
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
