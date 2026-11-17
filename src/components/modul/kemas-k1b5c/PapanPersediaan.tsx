"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_PAPAN, KELOMPOK_PAPAN, KOLOM_PAPAN, SUARA_PAPAN, TEMPAT_PAPAN } from "./data";

/**
 * Infografis Kelas 1 Bab 5 Sub-Bab C: Papan Persediaan Bermagnet. Papan tulis putih berbingkai aluminium dengan magnet bulat berwarna di tiap
 * kotak; tiap baris satu barang dari Story (pakan, kantong ikan, kerikil hias, sebelas) dengan tiga kotak kosong: Banyak, Puluhan dan satuan, Catatan.
 */
const NAMA_KOLOM: Record<string, string> = { banyak: "Banyak", tempat: "Puluhan dan satuan", catatan: "Catatan" };
const MAGNET = ["#EF4444", "#3B82F6", "#22C55E"];

export default function PapanPersediaan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PAPAN,
    83,
    (l, tujuan) => {
      const t = TEMPAT_PAPAN.find((x) => x.kunci === l.teks);
      if (t && t.kelompok === tujuan.kelompok) return "Kolomnya sudah benar, tetapi barisnya bukan ini. Cocokkan dengan barang di baris ini.";
      return t ? KELOMPOK_PAPAN[t.kelompok] : "Coba tempat yang lain.";
    },
    speakGuru,
  );
  const kotak = (t: Tempat, c: number) => {
    const teks = tp.teksDi(t);
    return (
      <div key={t.id} className="relative pt-1.5">
        <span className="absolute left-1/2 top-0 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-black/30 shadow-[0_2px_0_rgba(0,0,0,0.25)]" style={{ background: MAGNET[c] }} aria-hidden="true" />
        <button
          type="button"
          onClick={() => tp.ketukTempat(t)}
          aria-label={teks ?? `Kotak kosong kolom ${NAMA_KOLOM[t.kelompok]}`}
          className={`flex min-h-[46px] w-full items-center justify-center rounded-md border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-[#FFFBEB] text-[#1C01A5] lm-muncul" : "border-dashed border-[#64748B] bg-white text-[#64748B]"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        >
          {teks ?? "?"}
        </button>
      </div>
    );
  };
  const KOL = "grid-cols-[3.8rem_0.8fr_1.3fr_1.3fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_PAPAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Papan persediaan bermagnet. Tiap baris satu barang. Tempelkan banyaknya, puluhan dan satuannya, dan catatannya.</p>
      </div>

      {/* Papan tulis putih: bingkai aluminium, baki spidol di bawah */}
      <div className="mx-auto w-full max-w-xl rounded-lg p-2" style={{ background: "linear-gradient(180deg,#E5E7EB,#9CA3AF)", boxShadow: "0 4px 0 #6B7280" }}>
        <div className="rounded-sm border-2 border-[#D1D5DB] bg-white px-2 py-3 sm:px-4" style={{ backgroundImage: "linear-gradient(115deg,rgba(255,255,255,0) 40%,rgba(226,232,240,0.6) 50%,rgba(255,255,255,0) 60%)" }}>
          <p className="text-center text-lg font-black text-[#1E3A8A]">{"\u{1F4CB}"} Papan Persediaan Lapak</p>
          <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
            <span className="text-center text-[10px] font-black text-[#1E3A8A]">Barang</span>
            {KOLOM_PAPAN.map((k) => (
              <span key={k} className="rounded-sm bg-[#1E3A8A] px-0.5 text-center text-[10px] font-black leading-tight text-white">
                {k}
              </span>
            ))}
          </div>
          {BARIS_PAPAN.map((b, i) => (
            <div key={b.nama} className="mb-1 border-b-2 border-[#BFDBFE] pb-1">
              <div className={`grid ${KOL} items-center gap-1`}>
                <span className="flex flex-col items-center text-[10px] font-black leading-tight text-[#1E3A8A]">
                  <span className="text-lg" aria-hidden="true">
                    {b.ikon}
                  </span>
                  {b.nama}
                </span>
                {[0, 1, 2].map((c) => kotak(TEMPAT_PAPAN[i * 3 + c], c))}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-1 flex h-3 w-2/3 items-center justify-center gap-2 rounded-b-md bg-[#6B7280]" aria-hidden="true">
          <span className="h-1.5 w-8 rounded-full bg-[#2563EB]" />
          <span className="h-1.5 w-8 rounded-full bg-[#DC2626]" />
        </div>
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#EFF6FF" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Papan persediaan rapi! Angka kiri puluhan, angka kanan satuan." : tp.pesan}
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
