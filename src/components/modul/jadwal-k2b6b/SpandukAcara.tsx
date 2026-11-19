"use client";

import React from "react";
import type { Tempat } from "../lemari-k1b1a/logika";
import { BakiLabel, CSS_LEMARI, TagContoh, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import { BARIS_SPANDUK, KELOMPOK_SPANDUK, KOLOM_SPANDUK, SUARA_SPANDUK, TEMPAT_SPANDUK } from "./data-peta";

/**
 * Infografis Kelas 2 Bab 6 Sub-Bab B: Spanduk Acara. Spanduk jadwal bertali dengan tabel; tiap baris satu kegiatan dari Story (pembukaan, lomba lari,
 * makan siang, tarik tambang, pesta penutupan) dengan tiga kotak kosong: Urutan acara, Ditulis dengan kata, Jam digital. Petunjuk salah menyebut baris yang keliru.
 */
const NAMA_KOLOM: Record<string, string> = { urutan: "Urutan acara", kata: "Ditulis dengan kata", digital: "Jam digital" };

export default function SpandukAcara({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_SPANDUK,
    71,
    (l, tujuan) => {
      const asal = TEMPAT_SPANDUK.find((x) => x.kunci === l.teks);
      if (!asal) return "Coba tempat yang lain.";
      if (asal.kelompok !== tujuan.kelompok) return KELOMPOK_SPANDUK[asal.kelompok];
      const baris = Number(asal.id.slice(1, 2));
      const barisTujuan = Number(tujuan.id.slice(1, 2));
      return `Kolomnya sudah benar, tetapi barisnya keliru. Label ini milik ${BARIS_SPANDUK[baris].nama}, bukan ${BARIS_SPANDUK[barisTujuan].nama}.`;
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
        aria-label={t.contoh ? `Contoh: ${teks}` : (teks ?? `Kotak kosong kolom ${NAMA_KOLOM[t.kelompok]}`)}
        className={`relative flex min-h-[48px] w-full items-center justify-center rounded-sm border-2 px-1 text-center text-[11px] font-black leading-tight ${teks ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D] lm-muncul" : "border-dashed border-[#1D4ED8]/70 bg-white/80 text-[#1D4ED8]/60"} ${tp.goyang === t.id ? "lm-goyang" : ""} ${t.contoh ? "!pt-3.5" : ""}`}
      >
        {teks ?? "?"}
        {t.contoh ? <TagContoh /> : null}
      </button>
    );
  };
  const KOL = "grid-cols-[4.6rem_0.8fr_1.1fr_0.8fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_SPANDUK)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Spanduk jadwal acara. Tiap baris satu kegiatan. Tempelkan urutannya, jamnya dengan kata, dan jam digitalnya. Kotak bertanda contoh sudah terisi sebagai petunjuk.</p>
      </div>

      <div className="mx-auto w-full max-w-xl">
        <div className="flex justify-between px-4" aria-hidden="true">
          <span className="h-5 w-0.5 bg-[#1C01A5]" />
          <span className="h-5 w-0.5 bg-[#1C01A5]" />
        </div>
        <div className="rounded-lg border-[6px] border-[#DC2626] bg-[#FEF2F2] p-2 shadow-[0_6px_0_rgba(127,29,29,0.3)]">
          <p className="text-center text-lg font-black tracking-wide text-[#991B1B]">
            {"\u{1F3C1}"} Jadwal Hari Olahraga
          </p>
          <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
            <span className="text-center text-[10px] font-black text-[#991B1B]">Kegiatan</span>
            {KOLOM_SPANDUK.map((k) => (
              <span key={k} className="rounded-sm bg-[#1D4ED8] px-0.5 text-center text-[10px] font-black leading-tight text-[#EFF6FF]">
                {k}
              </span>
            ))}
          </div>
          {BARIS_SPANDUK.map((b, i) => (
            <div key={b.nama} className="mb-1.5 rounded-md border-2 border-[#DC2626]/50 bg-white/60 p-1">
              <div className={`grid ${KOL} items-center gap-1`}>
                <span className="flex flex-col items-center text-center text-[10px] font-black leading-tight text-[#991B1B]">
                  <span className="text-lg" aria-hidden="true">
                    {b.ikon}
                  </span>
                  {b.nama}
                </span>
                {[0, 1, 2].map((c) => kotak(TEMPAT_SPANDUK[i * 3 + c]))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#ECFCCB" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Spanduk lengkap! Urutan acara, jam dengan kata, dan jam digital berjalan bersama supaya semua lomba tepat waktu." : tp.pesan}
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
