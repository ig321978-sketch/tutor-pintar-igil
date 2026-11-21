"use client";

import React, { useState } from "react";
import { BARIS_RAK, EMOJI, NAMA } from "./data";
import { kata } from "./logika";
import { CSS_LEMARI, TOMBOL_UTAMA } from "./ui";

/**
 * PILOT Infografis Kelas 1 Bab 1 Sub-Bab A: tabel DATA mainan Igil dari cerita (jenis, gambar, kata, angka).
 * Isi tabel tampil lengkap (digital saja, tanpa kanvas dan tanpa rekam suara). Judul kolom kosong: anak mengetuknya satu per satu,
 * lalu judulnya muncul dan dibacakan guru.
 */
const KOLOM: { id: string; judul: string; arti: string }[] = [
  { id: "mainan", judul: "Mainan", arti: "Kolom ini menunjukkan jenis mainan di lemari Igil." },
  { id: "gambar", judul: "Gambar", arti: "Kolom ini menunjukkan gambar mainan, sebanyak jumlahnya." },
  { id: "kata", judul: "Kata", arti: "Kolom ini menunjukkan jumlah mainan yang ditulis dengan kata." },
  { id: "angka", judul: "Angka", arti: "Kolom ini menunjukkan jumlah mainan yang ditulis dengan angka." },
];

export default function TabelMainan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<string[]>([]);
  const selesai = buka.length === KOLOM.length;

  const ketuk = (id: string) => {
    const k = KOLOM.find((x) => x.id === id);
    if (!k) return;
    speakGuru(k.arti);
    if (!buka.includes(id)) setBuka((b) => [...b, id]);
  };

  const kepala = (id: string) => {
    const k = KOLOM.find((x) => x.id === id)!;
    const terbuka = buka.includes(id);
    return (
      <button
        key={id}
        type="button"
        onClick={() => ketuk(id)}
        aria-label={terbuka ? `Judul kolom: ${k.judul}` : "Judul kolom kosong"}
        className={`min-h-[44px] rounded-lg border-[3px] px-1 text-center text-xs font-black leading-tight sm:text-sm ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0] text-[#1C01A5]" : "border-dashed border-[#B45309] bg-white/80 text-[#B45309]"}`}
      >
        {terbuka ? k.judul : "?"}
      </button>
    );
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button
          type="button"
          onClick={() => speakGuru("Ini tabel mainan Igil. Ketuk tanda tanya di atas tiap kolom untuk melihat judulnya.")}
          className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm"
          aria-label="Dengar petunjuk"
        >
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Tabel mainan Igil. Ketuk tanda tanya di atas tiap kolom untuk melihat judulnya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#78350F] bg-[#FFF8E7] p-2 shadow-[0_5px_0_rgba(120,53,15,0.4)]">
        <div className="mb-2 grid grid-cols-[3.4rem_1fr_3.4rem_3.2rem] items-center gap-1.5">{KOLOM.map((k) => kepala(k.id))}</div>
        {BARIS_RAK.map((b) => (
          <div key={b.jenis} className="grid grid-cols-[3.4rem_1fr_3.4rem_3.2rem] items-center gap-1.5 border-t-2 border-[#E8C48F] py-2">
            <div className="flex flex-col items-center leading-none">
              <span className="text-2xl" aria-hidden="true">
                {EMOJI[b.jenis]}
              </span>
              <span className="mt-0.5 text-[10px] font-black text-[#78350F]">{NAMA[b.jenis]}</span>
            </div>
            <div
              className="grid grid-cols-5 gap-0.5 rounded-lg bg-[#E8C48F]/50 p-1"
              style={{ minHeight: 28 }}
              role="img"
              aria-label={`${b.n} ${NAMA[b.jenis]}`}
              data-banyak={b.n}
            >
              {b.n === 0 ? (
                <span className="col-span-5 text-center text-[11px] font-black leading-7 text-[#78350F]">kosong</span>
              ) : (
                Array.from({ length: b.n }, (_, i) => (
                  <span key={i} aria-hidden="true" className="flex items-center justify-center text-base leading-none">
                    {EMOJI[b.jenis]}
                  </span>
                ))
              )}
            </div>
            <span className="text-center text-xs font-black text-[#1C01A5]">{kata(b.n)}</span>
            <span className="text-center text-2xl font-black text-[#1C01A5]">{b.n}</span>
          </div>
        ))}
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? "Tabel lengkap! Gambar, kata, dan angkanya sama." : `Sudah dibuka ${buka.length} dari ${KOLOM.length} judul.`}
      </p>
      {selesai ? (
        <div className="flex justify-center">
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        </div>
      ) : null}
    </div>
  );
}
