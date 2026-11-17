"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_TELUR, IKON_ATURAN, KELOMPOK_TELUR, KOLOM_TELUR, SUARA_TELUR, TEMPAT_TELUR } from "./data";

/**
 * Infografis Kelas 1 Bab 4 Sub-Bab B: Catatan di Karton Telur. Tabel data dari Story ditulis di lekuk karton telur abu-abu;
 * tiap baris satu aturan (bentuk, warna, ukuran) dengan tiga lekuk kosong: Keranjang, Isi tiap keranjang, Semua.
 */
const NAMA_KOLOM: Record<string, string> = { keranjang: "Keranjang", isi: "Isi tiap keranjang", semua: "Semua" };

export default function KartonTelur({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_TELUR,
    71,
    (l) => {
      const t = TEMPAT_TELUR.find((x) => x.kunci === l.teks);
      return t ? KELOMPOK_TELUR[t.kelompok] : "Coba tempat yang lain.";
    },
    speakGuru,
  );
  const lekuk = (t: Tempat) => {
    const teks = tp.teksDi(t);
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Lekuk kosong kolom ${NAMA_KOLOM[t.kelompok]}`}
        className={`flex min-h-[52px] w-full items-center justify-center rounded-[45%] border-2 px-1.5 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-[#FFFBEB] text-[#1C01A5] lm-muncul" : "border-[#78716C] text-[#57534E]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        style={teks ? undefined : { background: "radial-gradient(ellipse at 50% 40%,#A8A29E 0,#D6D3D1 70%)", boxShadow: "inset 0 4px 6px rgba(68,64,60,0.35)" }}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[3.8rem_1.5fr_0.9fr_1.1fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_TELUR)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Catatan di karton telur. Tiap baris satu aturan. Tempelkan nama keranjang, isi tiap keranjang, dan jumlah semuanya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-4 border-[#57534E] p-2.5" style={{ backgroundColor: "#D6D3D1", backgroundImage: "radial-gradient(rgba(87,83,78,0.18) 1px,transparent 1.5px)", backgroundSize: "5px 5px" }}>
        <p className="text-center text-lg font-black text-[#292524]">{"\u{1F95A}"} Catatan Teras: sembilan barang</p>
        <div className={`mb-1 mt-2 grid ${KOL} gap-1.5`}>
          <span className="text-center text-[10px] font-black text-[#292524]">Aturan</span>
          {KOLOM_TELUR.map((k) => (
            <span key={k} className="rounded-full bg-[#44403C] px-1 text-center text-[10px] font-black text-[#FDE68A]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_TELUR.map((b, i) => (
          <div key={b.aturan} className="mb-1.5 rounded-xl border-2 border-[#78716C] bg-[#E7E5E4] p-1">
            <div className={`grid ${KOL} items-center gap-1.5`}>
              <span className="flex flex-col items-center text-[10px] font-black text-[#292524]">
                <span className="text-xl" aria-hidden="true">
                  {IKON_ATURAN[b.aturan]}
                </span>
                {b.aturan}
              </span>
              {[0, 1, 2].map((c) => lekuk(TEMPAT_TELUR[i * 3 + c]))}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#F5F5F4" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Catatan lengkap! Aturannya berbeda, tetapi semuanya tetap sembilan barang." : tp.pesan}
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
