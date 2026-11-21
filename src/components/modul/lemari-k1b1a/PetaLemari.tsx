"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "./ui";

/**
 * PILOT Mind-map Kelas 1 Bab 1 Sub-Bab A: gambar tema cerita (lemari mainan Igil) dengan empat label kosong.
 * Anak tidak menyusun konsep: ia mengetuk label satu per satu, lalu judul langkahnya muncul dan dibacakan guru.
 * Isi = LANGKAH (Infografis berikutnya berisi DATA dari langkah keempat).
 */
const LANGKAH: { nomor: number; judul: string; arti: string; ikon: string }[] = [
  { nomor: 1, judul: "Kelompokkan", arti: "Langkah satu. Kelompokkan mainan yang sejenis di satu tempat.", ikon: "\u{1F697}\u{1F697} \u{1F9F8}\u{1F9F8}" },
  { nomor: 2, judul: "Hitung satu-satu", arti: "Langkah dua. Hitung satu-satu mainan yang sejenis. Tunjuk satu, sebut satu.", ikon: "\u{1F446}\u{1F697}" },
  { nomor: 3, judul: "Angka terakhir = jumlah", arti: "Langkah tiga. Angka terakhir yang disebut adalah jumlah mainan yang sejenis.", ikon: "\u{1F697}\u{1F697}\u{1F697} = 3" },
  { nomor: 4, judul: "Catat di tabel", arti: "Langkah empat. Catat hasilnya dalam tabel.", ikon: "\u{1F4CB}" },
];

export default function PetaLemari({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH.length;

  const ketuk = (n: number) => {
    const l = LANGKAH[n - 1];
    speakGuru(l.arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button
          type="button"
          onClick={() => speakGuru("Ini lemari mainan Igil. Ketuk tanda tanya di tiap rak untuk melihat langkah merapikan mainan.")}
          className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm"
          aria-label="Dengar petunjuk"
        >
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Lemari mainan Igil. Ketuk tanda tanya di tiap rak untuk melihat langkahnya.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-t-[2rem] rounded-b-xl border-[6px] border-[#78350F] bg-[#C08A4E] p-2 shadow-[0_6px_0_rgba(120,53,15,0.45)]">
        <p className="mb-2 rounded-lg bg-[#78350F] py-1 text-center text-sm font-black text-[#FDE68A]">
          {"\u{1F3E0}"} Lemari Mainan Igil
        </p>
        {LANGKAH.map((l) => {
          const terbuka = buka.includes(l.nomor);
          return (
            <div key={l.nomor} className="grid grid-cols-[4.6rem_1fr] items-center gap-2 border-b-[6px] border-[#78350F] bg-[#E8C48F] px-2 py-2 first:rounded-t-xl last:rounded-b-xl last:border-b-0">
              <span className="text-center text-lg font-black leading-none text-[#78350F]" aria-hidden="true">
                {l.ikon}
              </span>
              <button
                type="button"
                onClick={() => ketuk(l.nomor)}
                aria-label={terbuka ? `Langkah ${l.nomor}: ${l.judul}` : `Label kosong langkah ${l.nomor}`}
                className={`flex min-h-[56px] w-full items-center gap-2 rounded-xl border-[3px] px-2 py-1 text-left font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/70"}`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-base text-white ${terbuka ? "border-[#15803D] bg-[#15803D]" : "border-[#B45309] bg-[#B45309]"}`}
                >
                  {l.nomor}
                </span>
                <span className="text-sm">{terbuka ? l.judul : "?"}</span>
              </button>
            </div>
          );
        })}
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? "Lemari rapi! Empat langkah sudah kamu buka." : `Sudah dibuka ${buka.length} dari ${LANGKAH.length} langkah.`}
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
