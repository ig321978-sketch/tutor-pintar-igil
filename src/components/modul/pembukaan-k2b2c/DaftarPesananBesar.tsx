"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_DAFTAR, KELOMPOK_DAFTAR, KOLOM_DAFTAR, SUARA_DAFTAR, TEMPAT_DAFTAR } from "./data";

/**
 * Infografis Kelas 2 Bab 2 Sub-Bab C: Daftar Pesanan Besar. Papan jepit dengan klip berisi tabel; tiap baris satu cerita hitungan dari Story
 * (penggaris kurangnya, jumlah, selisih, tiga bilangan, bilangan awal, cerita buatan) dengan tiga kotak kosong: Kata petunjuk, Hitungan, Hasil.
 * Petunjuk salah menyebut baris yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { kata: "Kata petunjuk", hitung: "Hitungan", hasil: "Hasil" };

export default function DaftarPesananBesar({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_DAFTAR,
    67,
    (l, tujuan) => {
      const asal = TEMPAT_DAFTAR.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba tempat yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_DAFTAR[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi barisnya keliru. Label ini milik baris ${BARIS_DAFTAR[baris].nama}, bukan baris ${BARIS_DAFTAR[barisTujuan].nama}.`;
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-md border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#1D4ED8] bg-white/80 text-[#1D4ED8]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[4.2rem_1.1fr_1.2fr_0.8fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_DAFTAR)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Daftar pesanan besar. Tiap baris satu cerita hitungan. Tempelkan kata petunjuknya, hitungannya, dan hasilnya.</p>
      </div>

      <div className="relative mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#92400E] bg-[#E9C58F] p-2 pt-5 shadow-[0_6px_0_rgba(120,53,15,0.35)]">
        <span className="absolute -top-3 left-1/2 block h-6 w-20 -translate-x-1/2 rounded-md border-2 border-[#475569] bg-[#CBD5E1]" aria-hidden="true" />
        <div className="rounded-lg bg-white p-2" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(59,130,246,0.14) 0 1px,transparent 1px 22px)" }}>
          <p className="text-center text-lg font-black text-[#1D4ED8]">{"\u{1F4CB}"} Daftar Pesanan Besar</p>
          <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
            <span className="text-center text-[10px] font-black text-[#1D4ED8]">Cerita</span>
            {KOLOM_DAFTAR.map((k) => (
              <span key={k} className="rounded-sm bg-[#1D4ED8] px-0.5 text-center text-[10px] font-black leading-tight text-white">
                {k}
              </span>
            ))}
          </div>
          {BARIS_DAFTAR.map((b, i) => (
            <div key={b.nama} className="mb-1.5 rounded-lg border-2 border-[#93C5FD] bg-[#F8FAFC] p-1">
              <div className={`grid ${KOL} items-center gap-1`}>
                <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#1D4ED8]">
                  <span className="text-lg" aria-hidden="true">
                    {b.ikon}
                  </span>
                  {b.nama}
                </span>
                {[0, 1, 2].map((c) => kotak(TEMPAT_DAFTAR[i * 3 + c]))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FEF3C7" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Daftar lengkap! Cari kata petunjuk, pilih tambah atau kurang, hitung, lalu simpulkan." : tp.pesan}
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
