"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";

/**
 * Infografis pola label kosong (pilot Kelas 1 Bab 1 Sub-Bab A): dua kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = tabel DATA dari cerita; judul kolom tampil, ISI tiap sel kosong (tanda tanya) sampai diketuk, lalu isinya muncul dan dibacakan.
 * Kartu 2 = kartu acuan (diberikan pemanggil). Digital saja: suara dan kanvas hanya di CPA.
 */
export type SelInfo = { isi: React.ReactNode; suara: string; aria: string };
export type BarisInfo = { kunci: string; sel: SelInfo[] };

export default function InfoKartu({
  kolom,
  grid,
  baris,
  petunjuk1,
  petunjuk2,
  pesanSelesai1,
  pesan2,
  kartu2,
  warna = "#78350F",
  speakGuru,
  onLanjut,
  teksLanjut,
}: {
  kolom: string[];
  /** Kelas grid kolom Tailwind, mis. "grid-cols-[4rem_1fr_1fr]". */
  grid: string;
  baris: BarisInfo[];
  petunjuk1: string;
  petunjuk2: string;
  pesanSelesai1: string;
  pesan2: string;
  kartu2: React.ReactNode;
  warna?: string;
  speakGuru: (t: string) => void;
  onLanjut: () => void;
  teksLanjut: string;
}) {
  const [buka, setBuka] = useState<string[]>([]);
  const [kartu, setKartu] = useState<1 | 2>(1);
  const total = baris.length * kolom.length;
  const selesai = buka.length === total;
  const petunjuk = kartu === 1 ? petunjuk1 : petunjuk2;

  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] bg-[#FFF8E7] p-2 shadow-[0_5px_0_rgba(0,0,0,0.25)]" style={{ borderColor: warna }} data-uji="tabel-data">
          <div className={`mb-1.5 grid ${grid} items-center gap-1.5`}>
            {kolom.map((k) => (
              <span key={k} className="rounded-lg py-1.5 text-center text-xs font-black text-[#FDE68A] sm:text-sm" style={{ background: warna }}>
                {k}
              </span>
            ))}
          </div>
          {baris.map((b) => (
            <div key={b.kunci} className={`grid ${grid} items-center gap-1.5 border-t-2 border-[#E8C48F] py-1.5`}>
              {b.sel.map((s, j) => {
                const kunci = `${b.kunci}-${j}`;
                const terbuka = buka.includes(kunci);
                return (
                  <button
                    key={kunci}
                    type="button"
                    onClick={() => ketuk(kunci, s.suara)}
                    aria-label={terbuka ? s.aria : `Isi kosong, kolom ${kolom[j]}`}
                    className={`flex min-h-[56px] items-center justify-center rounded-lg border-[3px] px-0.5 text-center ${terbuka ? "lm-muncul border-[#15803D] bg-[#ECFDF5]" : "border-dashed border-[#B45309] bg-white/80 text-lg font-black text-[#B45309]"}`}
                  >
                    {terbuka ? s.isi : "?"}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl" data-uji="kartu-acuan">
          {kartu2}
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai ? pesanSelesai1 : `Sudah dibuka ${buka.length} dari ${total} kotak.`) : pesan2}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke tabel data">
            {"⬅️"} Kembali
          </button>
        ) : null}
        {kartu === 1 && selesai ? (
          <button type="button" onClick={() => setKartu(2)} className={TOMBOL_UTAMA}>
            BERIKUTNYA {"➡️"}
          </button>
        ) : null}
        {kartu === 2 ? (
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        ) : null}
      </div>
      <p className="text-center text-[11px] font-black text-[#6B7280]" aria-label={`Kartu ${kartu} dari 2`}>
        {kartu === 1 ? "● ○" : "○ ●"} Kartu {kartu} dari 2
      </p>
    </div>
  );
}
