"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_CATATAN, KELOMPOK_CATATAN, KOLOM_CATATAN, SUARA_CATATAN, TEMPAT_CATATAN } from "./data";

/**
 * Infografis Kelas 1 Bab 7 Sub-Bab B: Catatan Kakek Jaya. Papan jepit dengan penjepit besi di atas; tiap baris satu hal yang diukur dari Story
 * (jengkal Igil, jengkal bercelah, tongkat dan tangan Mamah, perkiraan dan hasil, kertas berpetak), dengan tiga kotak kosong:
 * Bilangan, Hasil, Catatan. Tanpa satuan baku.
 */
const NAMA_KOLOM: Record<string, string> = { bilangan: "Bilangan", hasil: "Hasil", catatan: "Catatan" };
const GARIS = ["#DC2626", "#2563EB", "#16A34A", "#CA8A04", "#9333EA"];

export default function CatatanKakek({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_CATATAN,
    83,
    (l, tujuan) => {
      const t = TEMPAT_CATATAN.find((x) => x.kunci === l.teks);
      if (!t) return "Coba tempat yang lain.";
      if (t.kelompok !== tujuan.kelompok) return KELOMPOK_CATATAN[t.kelompok];
      const baris = Number(t.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi barisnya keliru. Label ini milik baris ${BARIS_CATATAN[baris].nama}, bukan baris ${BARIS_CATATAN[barisTujuan].nama}.`;
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-sm border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#475569] bg-white/70 text-[#475569]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
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
        <button type="button" onClick={() => speakGuru(SUARA_CATATAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Catatan Kakek Jaya di papan jepit. Tiap baris satu hal yang diukur. Tempelkan bilangannya, hasilnya, dan catatannya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl">
        {/* Penjepit besi papan jepit */}
        <div className="mx-auto h-5 w-28 rounded-t-lg border-4 border-b-0 border-[#475569] bg-[#CBD5E1]" aria-hidden="true" />
        <div className="rounded-lg border-[6px] border-[#475569] bg-[#FEF9C3] px-2 py-3 shadow-[0_5px_0_rgba(71,85,105,0.4)] sm:px-4">
          <p className="text-center text-lg font-black text-[#1E293B]">{"\u{1F4DD}"} Catatan Kakek Jaya</p>
          <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
            <span className="text-center text-[10px] font-black text-[#1E293B]">Diukur</span>
            {KOLOM_CATATAN.map((k) => (
              <span key={k} className="rounded-sm bg-[#334155] px-0.5 text-center text-[10px] font-black leading-tight text-[#FEF9C3]">
                {k}
              </span>
            ))}
          </div>
          {BARIS_CATATAN.map((b, i) => (
            <div key={b.nama} className="mb-1.5 rounded-md border-l-4 bg-white/85 p-1 shadow-[0_2px_0_rgba(71,85,105,0.25)]" style={{ borderLeftColor: GARIS[i % GARIS.length] }}>
              <div className={`grid ${KOL} items-center gap-1`}>
                <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#1E293B]">
                  <span className="text-lg" aria-hidden="true">
                    {b.ikon}
                  </span>
                  {b.nama}
                </span>
                {[0, 1, 2].map((c) => kotak(TEMPAT_CATATAN[i * 3 + c]))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FEF9C3" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Catatan lengkap! Mulai dari ujung, rapat, satu jenis alat ukur, dan tulis nama alatnya." : tp.pesan}
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
