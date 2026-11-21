"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  BARIS_TEMPAT_RESEPSI,
  JUDUL_INFO1_RESEPSI,
  LABEL_TANGGA_RESEPSI,
  PETUNJUK1_INFO_RESEPSI,
  PETUNJUK2_INFO_RESEPSI,
  SELESAI1_INFO_RESEPSI,
  SELESAI2_INFO_RESEPSI,
  SEL_KARTU1_RESEPSI,
  SEL_KARTU2_RESEPSI,
  TAMU_PAGI,
  TAMU_SIANG,
  type SelResepsi,
} from "./data-peta";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab E "Meja Resepsi Bu Rina" (dirancang sendiri, dua kartu, tiap kartu satu layar tanpa gulir): data dari Story.
 * Kartu 1 = lembar daftar tamu bergaris dengan tiga tempat dari kanan (satuan, puluhan, ratusan): jumlah, ditulis, dan disimpan masing-masing (245 + 378);
 * lalu jumlah pagi dan siang, susun panjang (uraian lalu gabung per tempat), tiga bilangan dengan tamu sore, dan hasil keliru Satria. Semua isi kosong (?) sampai diketuk.
 * Kartu 2 = kartu acuan: gambar sepuluh satuan jadi satu puluhan dengan aturannya, dan tangga Genapkan Dulu empat anak tangga. Digital saja.
 */
const sel = (daftar: SelResepsi[], kunci: string): SelResepsi => daftar.find((s) => s.kunci === kunci) as SelResepsi;

export default function DaftarResepsiK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const total1 = SEL_KARTU1_RESEPSI.length;
  const total2 = SEL_KARTU2_RESEPSI.length;
  const buka1 = buka.filter((k) => !k.startsWith("g-")).length;
  const buka2 = buka.filter((k) => k.startsWith("g-")).length;
  const selesai1 = buka1 === total1;
  const selesai2 = buka2 === total2;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_RESEPSI : PETUNJUK2_INFO_RESEPSI;

  const kotak = (s: SelResepsi, merah = false) => {
    const t = buka.includes(s.kunci);
    return (
      <button
        key={s.kunci}
        type="button"
        onClick={() => ketuk(s.kunci, s.suara)}
        aria-label={t ? s.aria : `Isi kosong: ${s.aria.split(":")[0]}`}
        data-sel={s.kunci}
        className={`flex min-h-[32px] w-full min-w-0 items-center justify-center rounded-md border-[3px] px-1 text-center text-xs font-black leading-tight ${t ? `lm-muncul ${merah ? "border-[#B91C1C] bg-[#FEE2E2] text-[#7F1D1D]" : "border-[#15803D] bg-[#ECFDF5] text-[#1C01A5]"}` : "border-dashed border-[#B45309] bg-white/80 text-lg text-[#B45309]"}`}
      >
        {t ? s.isi : "?"}
      </button>
    );
  };
  const garis = "border-b-2 border-[#93C5FD]";

  return (
    <div className="space-y-2" data-uji="info-resepsi">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-lg border-[3px] border-[#1E3A8A] border-l-[14px] bg-[#FFFEF5] p-2 shadow-[0_5px_0_rgba(30,58,138,0.3)]" data-uji="lembar-tamu">
          <p className="mb-1 text-center text-sm font-black text-[#14532D]">
            {JUDUL_INFO1_RESEPSI}: pagi {TAMU_PAGI}, siang {TAMU_SIANG}
          </p>
          <div className="grid grid-cols-[4.6rem_minmax(0,1fr)_3.6rem_3.6rem] items-center gap-x-1 gap-y-1 text-[12px] font-black text-[#1E3A8A]">
            <span aria-hidden="true" />
            <span className="text-center">dijumlah</span>
            <span className="text-center">ditulis</span>
            <span className="text-center text-[11px]">disimpan</span>
            {BARIS_TEMPAT_RESEPSI.map((b, i) => (
              <React.Fragment key={b.nama}>
                <span className={`${garis} flex h-full min-h-[32px] items-center text-[#14532D]`}>
                  {b.nama}
                </span>
                {kotak(sel(SEL_KARTU1_RESEPSI, `t-${i}-jum`))}
                {kotak(sel(SEL_KARTU1_RESEPSI, `t-${i}-tulis`))}
                {kotak(sel(SEL_KARTU1_RESEPSI, `t-${i}-simpan`))}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-1.5 space-y-1 border-t-2 border-dashed border-[#93C5FD] pt-1.5">
            {[
              ["f-jumlah", "Pagi dan siang"],
              ["f-panjang", "Susun panjang"],
              ["f-tiga", "Dengan tamu sore"],
              ["f-salah", "Hasil Satria"],
            ].map(([k, label]) => (
              <div key={k} className="grid grid-cols-[6.2rem_minmax(0,1fr)] items-center gap-1.5">
                <span className={`text-[12px] font-black leading-tight ${k === "f-salah" ? "text-[#B91C1C]" : "text-[#14532D]"}`}>{label}</span>
                {kotak(sel(SEL_KARTU1_RESEPSI, k), k === "f-salah")}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#166534] bg-[#F0FDF4] p-2 shadow-[0_5px_0_rgba(22,101,52,0.4)]" data-uji="kartu-tangga">
          <div className="mb-1.5 flex items-center justify-center gap-2 rounded-xl bg-white/80 p-1" role="img" aria-label="Sepuluh satuan digabung menjadi satu puluhan">
            <span className="grid grid-cols-5 gap-0.5" data-banyak={10}>
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} aria-hidden="true" className="block h-3 w-3 rounded-full border border-[#92400E] bg-[#FDBA74]" />
              ))}
            </span>
            <span aria-hidden="true" className="text-xl font-black text-[#14532D]">
              ➜
            </span>
            <span aria-hidden="true" className="block h-[27px] w-3 rounded-sm border-2 border-[#14532D] bg-[#4ADE80]" />
            <div className="w-[8.4rem]">{kotak(sel(SEL_KARTU2_RESEPSI, "g-aturan"))}</div>
          </div>
          <p className="mb-1 text-center text-[12px] font-black text-[#14532D]">Tangga Genapkan Dulu</p>
          <div className="space-y-0.5">
            {LABEL_TANGGA_RESEPSI.map((label, i) => (
              <React.Fragment key={label}>
                {i > 0 ? (
                  <p aria-hidden="true" className="text-center text-sm leading-none text-[#15803D]">
                    ⬇
                  </p>
                ) : null}
                <div className="grid grid-cols-[1.6rem_6.2rem_minmax(0,1fr)] items-center gap-1.5 rounded-lg bg-white/80 p-1">
                  <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full bg-[#15803D] text-xs font-black text-white">
                    {i + 1}
                  </span>
                  <span className="text-[12px] font-black leading-tight text-[#14532D]">{label}</span>
                  {kotak(SEL_KARTU2_RESEPSI[i + 1])}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_RESEPSI : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : selesai2 ? SELESAI2_INFO_RESEPSI : `Sudah dibuka ${buka2} dari ${total2} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke daftar tamu">
            {"⬅️"} Kembali
          </button>
        ) : null}
        {kartu === 1 && selesai1 ? (
          <button type="button" onClick={() => setKartu(2)} className={TOMBOL_UTAMA}>
            BERIKUTNYA {"➡️"}
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
export { DaftarResepsiK4B1 };
