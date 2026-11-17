"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_PESANAN, KELOMPOK_PESANAN, KOLOM_PESANAN, SUARA_PESANAN, TEMPAT_PESANAN } from "./data";

/**
 * Infografis Kelas 1 Bab 5 Sub-Bab D: Papan Pesanan. Papan kayu tergantung di bawah atap lapak bergaris biru putih; tiap baris
 * satu perbandingan dari Story (guppy dan koki dipasangkan, sama banyak, paling banyak dan paling sedikit, urutan, pesanan Pak RT dan
 * tetangga), ditandai paku payung, dengan tiga kotak kosong: Bilangan, Hasil, Catatan.
 */
const NAMA_KOLOM: Record<string, string> = { bilangan: "Bilangan", hasil: "Hasil", catatan: "Catatan" };
const PAKU = ["#DC2626", "#2563EB", "#16A34A", "#CA8A04", "#9333EA"];

export default function PapanPesanan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_PESANAN,
    79,
    (l, tujuan) => {
      const t = TEMPAT_PESANAN.find((x) => x.kunci === l.teks);
      if (t && t.kelompok === tujuan.kelompok) return "Kolomnya sudah benar, tetapi barisnya bukan ini. Cocokkan dengan pesanan di baris ini.";
      return t ? KELOMPOK_PESANAN[t.kelompok] : "Coba tempat yang lain.";
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
        className={`flex min-h-[44px] w-full items-center justify-center rounded-sm border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#92400E] bg-[#FFFBEB]/70 text-[#92400E]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
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
        <button type="button" onClick={() => speakGuru(SUARA_PESANAN)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Papan pesanan di lapak. Tiap baris satu perbandingan. Tempelkan bilangannya, hasilnya, dan catatannya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl">
        {/* Atap lapak bergaris biru putih dengan tepi bergelombang */}
        <div
          className="h-8 rounded-t-xl"
          style={{ background: "repeating-linear-gradient(90deg,#2563EB 0 24px,#FFFFFF 24px 48px)", maskImage: "radial-gradient(circle at 12px 100%,transparent 9px,#000 9.5px)", maskSize: "24px 100%", WebkitMaskImage: "radial-gradient(circle at 12px 100%,transparent 9px,#000 9.5px)", WebkitMaskSize: "24px 100%" }}
          aria-hidden="true"
        />
        <div className="flex justify-around px-10" aria-hidden="true">
          <span className="h-5 w-0.5 bg-[#57534E]" />
          <span className="h-5 w-0.5 bg-[#57534E]" />
        </div>
        {/* Papan kayu */}
        <div className="rounded-lg border-[6px] border-[#78350F] px-2 py-3 sm:px-4" style={{ background: "repeating-linear-gradient(180deg,#D6A35C 0 22px,#C8924B 22px 24px)" }}>
          <p className="text-center text-lg font-black text-[#451A03]">{"\u{1F4CB}"} Papan Pesanan Lapak</p>
          <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
            <span className="text-center text-[10px] font-black text-[#451A03]">Perbandingan</span>
            {KOLOM_PESANAN.map((k) => (
              <span key={k} className="rounded-sm bg-[#451A03] px-0.5 text-center text-[10px] font-black leading-tight text-[#FEF3C7]">
                {k}
              </span>
            ))}
          </div>
          {BARIS_PESANAN.map((b, i) => (
            <div key={b.nama} className="relative mb-1.5 rounded-md bg-[#FFFBEB]/85 p-1 shadow-[0_2px_0_rgba(69,26,3,0.3)]">
              <span className="absolute -left-1 -top-1 h-3 w-3 rounded-full border border-black/30" style={{ background: PAKU[i % PAKU.length] }} aria-hidden="true" />
              <div className={`grid ${KOL} items-center gap-1`}>
                <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#451A03]">
                  <span className="text-lg" aria-hidden="true">
                    {b.ikon}
                  </span>
                  {b.nama}
                </span>
                {[0, 1, 2].map((c) => kotak(TEMPAT_PESANAN[i * 3 + c]))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FEF3C7" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Papan pesanan lengkap! Pasangkan satu-satu, puluhan dulu lalu satuan, dan urutkan sebelum melayani." : tp.pesan}
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
