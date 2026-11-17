"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_NOTA, EMOJI, KELOMPOK_NOTA, KOLOM_NOTA, SUARA_NOTA, TEMPAT_NOTA } from "./data";

/**
 * Infografis Kelas 1 Bab 2 Sub-Bab B: Nota Panen. Tabel data berbentuk nota kertas panjang bertepi bergerigi dengan huruf
 * mesin ketik; tiap baris satu sayur dari Story, tiga isian kosong bergaris titik: Bilangan, Cara, Kalimat.
 */
const NAMA_KOLOM: Record<string, string> = { bilangan: "Bilangan", cara: "Cara", kalimat: "Kalimat" };
const GERIGI = "radial-gradient(circle at 8px 0,transparent 7px,#FFFFFF 7.5px)";

export default function NotaPanen({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_NOTA,
    67,
    (l) => {
      const t = TEMPAT_NOTA.find((x) => x.kunci === l.teks);
      return t ? KELOMPOK_NOTA[t.kelompok] : "Coba tempat yang lain.";
    },
    speakGuru,
  );
  const isian = (t: Tempat) => {
    const teks = tp.teksDi(t);
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Isian kosong kolom ${NAMA_KOLOM[t.kelompok]}`}
        className={`flex min-h-[38px] items-center justify-center border-b-2 px-1 text-center font-mono font-black leading-tight ${t.kelompok === "kalimat" ? "text-sm" : "text-[11px] sm:text-xs"} ${teks ? "border-solid border-[#1C01A5] text-[#1C01A5] lm-muncul" : "border-dotted border-[#94A3B8] text-[#94A3B8]"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "........"}
      </button>
    );
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_NOTA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Nota panen. Tiap baris satu sayur dari cerita. Isi dua bilangannya, caranya, dan kalimat penjumlahannya.</p>
      </div>

      <div className="mx-auto w-full max-w-lg bg-[#E2E8F0] p-3">
        <div className="h-2" style={{ background: GERIGI, backgroundSize: "16px 8px", transform: "scaleY(-1)" }} aria-hidden="true" />
        <div className="bg-white px-3 pb-2 pt-1 font-mono shadow-sm">
          <p className="text-center text-base font-black tracking-widest text-[#1C01A5]">NOTA PANEN</p>
          <p className="text-center text-[11px] font-bold text-[#64748B]">Kebun Sayur Mamah</p>
          <div className="my-1 border-t-2 border-dashed border-[#94A3B8]" />
          <div className="grid grid-cols-[5.2rem_0.9fr_1fr_1.2fr] gap-1">
            <span className="text-[11px] font-black text-[#64748B]">Sayur</span>
            {KOLOM_NOTA.map((k) => (
              <span key={k} className="text-center text-[11px] font-black text-[#64748B]">
                {k}
              </span>
            ))}
          </div>
          {BARIS_NOTA.map((b, i) => (
            <div key={b.nama} className="grid grid-cols-[5.2rem_0.9fr_1fr_1.2fr] items-end gap-1 py-0.5">
              <span className="flex items-center gap-1 text-[11px] font-black text-[#1C01A5]">
                <span className="text-lg" aria-hidden="true">
                  {EMOJI[b.benda]}
                </span>
                {b.nama}
              </span>
              {isian(TEMPAT_NOTA[i * 3])}
              {isian(TEMPAT_NOTA[i * 3 + 1])}
              {isian(TEMPAT_NOTA[i * 3 + 2])}
            </div>
          ))}
          <div className="my-1 border-t-2 border-dashed border-[#94A3B8]" />
          <p className="text-center text-[11px] font-bold text-[#64748B]">Terima kasih. Sayur segar dari kebun!</p>
        </div>
        <div className="h-2" style={{ background: GERIGI, backgroundSize: "16px 8px" }} aria-hidden="true" />
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#F1F5F9" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Nota lengkap! Banyak cara menjumlah, hasilnya tetap benar." : tp.pesan}
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
