"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_LEMBAR, KELOMPOK_LEMBAR, KOLOM_LEMBAR, SUARA_LEMBAR, TEMPAT_LEMBAR } from "./data";

/**
 * Infografis Kelas 2 Bab 2 Sub-Bab B: Lembar Stok berklip. Papan jepit koperasi dengan lembar kertas bertabel; tiap baris satu barang dari Story
 * (penggaris, kotak pensil warna, topi dan dasi) dengan tiga kolom kosong: Awal, Dikurangi, Hasil. Petunjuk salah menyebut baris yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { awal: "Awal", kurang: "Dikurangi", hasil: "Hasil" };

export default function LembarStok({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_LEMBAR,
    53,
    (l, tujuan) => {
      const asal = TEMPAT_LEMBAR.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba tempat yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_LEMBAR[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi barisnya keliru. Label ini milik ${BARIS_LEMBAR[baris].nama}, bukan ${BARIS_LEMBAR[barisTujuan].nama}.`;
    },
    speakGuru,
  );
  const bilik = (t: Tempat) => {
    const teks = tp.teksDi(t);
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Sel kosong kolom ${NAMA_KOLOM[t.kelompok]}`}
        className={`flex min-h-[48px] w-full items-center justify-center rounded-lg border-2 px-1 text-center text-xs font-black leading-tight shadow-[inset_0_2px_0_rgba(28,1,165,0.12)] ${teks ? "lm-muncul border-[#1C01A5] bg-white text-[#1C01A5]" : "border-dashed border-[#1D4ED8] bg-[#EFF6FF] text-[#1D4ED8]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[5.2rem_1fr_1fr_1fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_LEMBAR)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Lembar stok koperasi. Tiap baris satu barang. Taruh banyak awalnya, yang dikurangkan, dan hasilnya di kolom yang pas.</p>
      </div>

      <div className="relative mx-auto w-full max-w-xl rounded-lg border-[6px] border-[#475569] bg-[#E2E8F0] p-2 pt-5 shadow-[0_6px_0_rgba(30,41,59,0.3)]">
        <span className="absolute -top-2 left-1/2 h-5 w-20 -translate-x-1/2 rounded-md border-2 border-[#334155] bg-[#94A3B8]" aria-hidden="true" />
        <p className="text-center text-lg font-black text-[#1E293B]">{"\u{1F4D1}"} Lembar Stok Koperasi</p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
          <span className="text-center text-[10px] font-black text-[#1E293B]">Barang</span>
          {KOLOM_LEMBAR.map((k) => (
            <span key={k} className="rounded-sm bg-[#1E3A8A] px-0.5 text-center text-[10px] font-black leading-tight text-white">
              {k}
            </span>
          ))}
        </div>
        {BARIS_LEMBAR.map((b, i) => (
          <div key={b.nama} className="mb-1.5 rounded-md border-2 border-[#1E3A8A] bg-white p-1 shadow-[0_2px_0_rgba(30,41,59,0.25)]">
            <div className={`grid ${KOL} items-center gap-1`}>
              <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#451A03]">
                {b.nama}
              </span>
              {[0, 1, 2].map((c) => bilik(TEMPAT_LEMBAR[i * 3 + c]))}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FEF3C7" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Lembar lengkap! Awal, dikurangi, lalu hasilnya." : tp.pesan}
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
