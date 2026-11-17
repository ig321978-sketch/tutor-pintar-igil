"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_GABUS, KELOMPOK_GABUS, KOLOM_GABUS, SUARA_GABUS, TEMPAT_GABUS } from "./data";

/**
 * Infografis Kelas 1 Bab 1 Sub-Bab C: Papan Gabus Catatan Loteng. Tabel data di atas papan gabus cokelat; tiap baris
 * satu kejadian dari Story (kertas tempel berpaku payung), tiga kertas kosong per baris: Angka, Cara, Hasil.
 */
const WARNA_KERTAS: Record<string, string> = { angka: "#FEF08A", cara: "#BBF7D0", hasil: "#FBCFE8" };

export default function PapanGabus({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_GABUS,
    61,
    (l) => {
      const t = TEMPAT_GABUS.find((x) => x.kunci === l.teks);
      return t ? KELOMPOK_GABUS[t.kelompok] : "Coba kertas yang lain.";
    },
    speakGuru,
  );
  const kertas = (t: Tempat, miring: number) => {
    const teks = tp.teksDi(t);
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Kertas kosong kolom ${t.kelompok === "angka" ? "Angka" : t.kelompok === "cara" ? "Cara" : "Hasil"}`}
        className={`relative flex min-h-[44px] items-center justify-center px-1 pt-1 text-center text-[11px] font-black leading-tight text-[#1C01A5] shadow-[2px_3px_0_rgba(0,0,0,0.25)] sm:text-xs ${teks ? "lm-muncul" : "opacity-70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={{ background: teks ? WARNA_KERTAS[t.kelompok] : "rgba(255,255,255,0.6)", transform: `rotate(${miring}deg)`, border: teks ? "none" : "2px dashed #78350F" }}
      >
        <span aria-hidden="true" className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#DC2626] shadow" />
        {teks ?? "?"}
      </button>
    );
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_GABUS)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Papan gabus catatan loteng. Tiap baris satu kejadian dari cerita. Tempelkan deret angka, cara, dan hasilnya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-xl border-[8px] border-[#A16207] p-2" style={{ backgroundColor: "#C8956D", backgroundImage: "radial-gradient(#B07B52 1px,transparent 1.5px)", backgroundSize: "7px 7px" }}>
        <div className="mb-1 grid grid-cols-[5.2rem_1fr_1fr_1fr] gap-1.5">
          <span className="rounded bg-white/85 py-0.5 text-center text-[11px] font-black text-[#78350F]">Kejadian</span>
          {KOLOM_GABUS.map((k) => (
            <span key={k} className="rounded bg-white/85 py-0.5 text-center text-[11px] font-black text-[#78350F]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_GABUS.map((b, i) => (
          <div key={b.kejadian} className="grid grid-cols-[5.2rem_1fr_1fr_1fr] items-center gap-1.5 py-1.5">
            <span className="rounded-sm bg-white px-1 py-1 text-center text-[10px] font-black leading-tight text-[#1C01A5] shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
              <span aria-hidden="true">{b.ikon} </span>
              {b.kejadian}
            </span>
            {kertas(TEMPAT_GABUS[i * 3], i % 2 ? -2 : 2)}
            {kertas(TEMPAT_GABUS[i * 3 + 1], i % 2 ? 1.5 : -1.5)}
            {kertas(TEMPAT_GABUS[i * 3 + 2], i % 2 ? -1 : 1)}
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FFFBEB" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Papan gabus lengkap! Maju makin besar, mundur makin kecil." : tp.pesan}
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
