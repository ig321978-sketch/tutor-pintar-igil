"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_MEJA, KELOMPOK_MEJA, KOLOM_MEJA, SUARA_MEJA, TEMPAT_MEJA } from "./data";

/**
 * Infografis Kelas 2 Bab 3 Sub-Bab B: Meja Gambar guru seni. Tabel di atas meja kayu berisi enam baris dari Story (persegi dua cara, dua segitiga siku-siku dua cara,
 * segi enam dua cara) dengan dua kotak kosong tiap baris: Cara dan Keping hasil. Petunjuk salah menyebut baris yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { cara: "Cara", hasil: "Keping hasil" };

export default function MejaGambar({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_MEJA,
    47,
    (l, tujuan) => {
      const asal = TEMPAT_MEJA.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba tempat yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_MEJA[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi barisnya keliru. Label ini milik bangun ${BARIS_MEJA[baris].nama.toLowerCase()}, bukan ${BARIS_MEJA[barisTujuan].nama.toLowerCase()} di baris ini.`;
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-md border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#92400E] bg-white/80 text-[#92400E]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[5.2rem_1fr_1fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_MEJA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Meja gambar guru seni. Tiap baris satu bangun. Tempelkan cara mengurai atau menyusunnya, dan keping hasilnya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#92400E] p-2 shadow-[0_6px_0_rgba(120,53,15,0.35)]" style={{ backgroundColor: "#E7C08E", backgroundImage: "repeating-linear-gradient(90deg,rgba(146,64,14,0.18) 0 2px,transparent 2px 30px)" }}>
        <p className="text-center text-lg font-black text-[#78350F]">{"\u{1F3A8}"} Meja Gambar</p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
          <span className="text-center text-[10px] font-black text-[#78350F]">Bangun</span>
          {KOLOM_MEJA.map((k) => (
            <span key={k} className="rounded-sm bg-[#78350F] px-0.5 text-center text-[10px] font-black leading-tight text-[#FEF3C7]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_MEJA.map((b, i) => (
          <div key={`${b.nama}-${i}`} className="mb-1.5 rounded-lg border-2 border-[#92400E] bg-white/85 p-1 shadow-[0_2px_0_rgba(120,53,15,0.25)]">
            <div className={`grid ${KOL} items-center gap-1`}>
              <span className="text-center text-[10px] font-black leading-tight text-[#78350F]">{b.nama}</span>
              {[0, 1].map((c) => kotak(TEMPAT_MEJA[i * 2 + c]))}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FEF3C7" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Meja gambar lengkap! Cara mengurai dan menyusun memengaruhi keping hasilnya." : tp.pesan}
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
