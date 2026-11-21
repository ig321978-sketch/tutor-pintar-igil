"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { BARIS_DATA, KERAMIK_INFO, PESAN_INFO_2, PETUNJUK_INFO_1, PETUNJUK_INFO_2, SEGITIGA_INFO, SELESAI_INFO_1, SUSUNAN_SAMA } from "./data-info";
import { BangunSvg } from "./GambarMosaik";

/**
 * Infografis Kelas 4 Bab 5 Sub-Bab B "Mosaik Pak Rudi" (rancangan bebas): PAPAN POTONG dan denah susunan, dua kartu, tiap kartu satu layar tanpa gulir. Digital saja.
 * Kartu 1 = papan potong: persegi, jajargenjang, trapesium, dan segienam beraturan (data bersambung dari Sub-Bab A) digambar BESAR dari koordinat dengan garis belahnya terlihat;
 * banyak segitiga tertutup (?) sampai diketuk, ditambah segitiga sebagai bagian paling sederhana.
 * Kartu 2 = mosaik banyak cara: dua keping segitiga yang sama disusun dengan tiga cara, nama bangun tertutup (?) sampai diketuk.
 * Tombol lanjut hanya muncul setelah semua isi kartu terbuka.
 */
const jumlah1 = KERAMIK_INFO.length + 1;

export default function InfoMosaikK4B5({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<string[]>([]);
  const [kartu, setKartu] = useState<1 | 2>(1);
  const buka1 = buka.filter((k) => k.startsWith("a")).length;
  const buka2 = buka.filter((k) => k.startsWith("b")).length;
  const selesai1 = buka1 === jumlah1;
  const selesai2 = buka2 === SUSUNAN_SAMA.length;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK_INFO_1 : PETUNJUK_INFO_2;
  const chip = (terbuka: boolean, teks: string) => (
    <span className={`mt-0.5 block rounded-lg border-[3px] px-1 py-0.5 text-center text-sm font-black leading-tight ${terbuka ? "lm-muncul border-[#15803D] bg-[#ECFDF5] text-[#14532D]" : "border-dashed border-[#B45309] bg-white/80 text-lg text-[#B45309]"}`}>{terbuka ? teks : "?"}</span>
  );
  return (
    <div className="space-y-2" data-uji="papan-potong">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-md rounded-2xl border-[6px] border-[#78350F] bg-[#FDE68A] p-2 shadow-[0_6px_0_rgba(0,0,0,0.25)]" data-uji="kartu-papan">
          <p className="mb-1.5 rounded-lg bg-[#78350F] py-0.5 text-center text-sm font-black text-[#FDE68A]">{"\u{1F9E9}"} Papan potong</p>
          <div className="grid grid-cols-2 gap-1.5">
            {KERAMIK_INFO.map((k, i) => {
              const b = BARIS_DATA[i];
              const terbuka = buka.includes(`a${i}`);
              return (
                <button key={k.nama} type="button" onClick={() => ketuk(`a${i}`, `${b.suaraNama} ${b.suaraCara} ${b.suaraBanyak}`)} aria-label={terbuka ? `${k.nama}: ${b.banyakTeks}` : `${k.nama}: banyak segitiga belum dibuka`} className="rounded-xl border-[3px] border-[#B45309] bg-white p-1 text-center" data-keramik={k.nama}>
                  <span className="mx-auto block h-[46px] [&_svg]:h-full [&_svg]:w-auto [&_svg]:max-w-full"><BangunSvg bidang={k.bidang} bagian={k.bagian} rupa="benda" label={`${k.nama} dibelah menjadi ${b.banyak} segitiga`} /></span>
                  <span className="block text-[11px] font-black leading-tight text-[#78350F]">{k.nama}</span>
                  {chip(terbuka, b.banyakTeks)}
                </button>
              );
            })}
          </div>
          <button type="button" onClick={() => ketuk("a4", SEGITIGA_INFO.suara)} aria-label={buka.includes("a4") ? `Segitiga: ${SEGITIGA_INFO.teks}` : "Segitiga: belum dibuka"} className="mt-1.5 flex w-full items-center gap-2 rounded-xl border-[3px] border-[#B45309] bg-white p-1 text-left" data-keramik="Segitiga">
            <span className="block h-[40px] w-[88px] shrink-0 [&_svg]:h-full [&_svg]:w-auto [&_svg]:max-w-full">
              <BangunSvg bidang={SEGITIGA_INFO.bidang} rupa="benda" label="segitiga sama sisi" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-black leading-tight text-[#78350F]">Segitiga</span>
              {chip(buka.includes("a4"), SEGITIGA_INFO.teks)}
            </span>
          </button>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-md rounded-2xl border-[6px] border-[#B45309] bg-[#FFFBEB] p-2 shadow-[0_6px_0_rgba(180,83,9,0.3)]" data-uji="kartu-susunan">
          <p className="mb-2 rounded-lg bg-[#B45309] py-1 text-center text-sm font-black text-[#FDE68A]">{"\u{1F3A8}"} Satu pasang keping, tiga susunan</p>
          <div className="space-y-2">
            {SUSUNAN_SAMA.map((s, i) => {
              const terbuka = buka.includes(`b${i}`);
              return (
                <button key={i} type="button" onClick={() => ketuk(`b${i}`, s.suara)} aria-label={terbuka ? `Susunan ${i + 1}: ${s.nama}` : `Susunan ${i + 1}: bangun belum dibuka`} className="flex w-full items-center gap-2 rounded-xl border-[3px] border-[#B45309] bg-white p-1 text-left" data-susunan={i + 1}>
                  <span className="block w-[132px] shrink-0">
                    <BangunSvg bidang={s.hasil} bagian={s.keping} rupa="benda" label={`dua keping disusun menjadi ${s.nama}`} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-black leading-tight text-[#78350F]">Susunan {i + 1}</span>
                    {chip(terbuka, s.nama)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black leading-tight text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI_INFO_1 : `Sudah dibuka ${buka1} dari ${jumlah1} kotak.`) : selesai2 ? PESAN_INFO_2 : `Sudah dibuka ${buka2} dari ${SUSUNAN_SAMA.length} kotak.`}
      </p>
      <div className="flex justify-center">
        {kartu === 1 && selesai1 ? (
          <button type="button" onClick={() => setKartu(2)} className={TOMBOL_UTAMA}>
            {"KARTU 2 ➡️"}
          </button>
        ) : null}
        {kartu === 2 && selesai2 ? (
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

export { InfoMosaikK4B5 };
