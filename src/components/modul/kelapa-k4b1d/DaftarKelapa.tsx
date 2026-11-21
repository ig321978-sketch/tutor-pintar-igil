"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { ATURAN_KELAPA, BILANGAN_KELAPA, JUDUL_INFO1_KELAPA, PETUNJUK1_INFO_KELAPA, PETUNJUK2_INFO_KELAPA, SELESAI1_INFO_KELAPA, SELESAI2_INFO_KELAPA, SEL_KARTU1_KELAPA, TEMPAT_KELAPA, rb, type SelKelapa } from "./data-peta";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab D "Kios Kelapa Pak Darwis" (dirancang sendiri, dua kartu, tiap kartu satu layar tanpa gulir): data dari Story.
 * Kartu 1 = papan panen 5.270 dengan empat keranjang (ribuan, ratusan, puluhan, satuan): angka dan harga tiap tempat, lalu cara lain 4.000 + 1.270 dan uraian keliru Satria; semua isi kosong (?) sampai diketuk.
 * Kartu 2 = kartu acuan empat aturan (menguraikan, menyusun, bagan bagian utuh, memeriksa). Tombol BERIKUTNYA hanya setelah semua kotak kartu 1 terbuka. Digital saja.
 */
const Keranjang = ({ kosong }: { kosong: boolean }) => (
  <svg viewBox="0 0 56 40" className="h-[34px] w-[48px]" aria-hidden="true">
    <path d="M6,16 L50,16 L44,38 L12,38 Z" fill={kosong ? "#FEF3C7" : "#D97706"} stroke="#78350F" strokeWidth={2.5} strokeDasharray={kosong ? "4 3" : undefined} />
    <rect x={4} y={13} width={48} height={6} rx={2} fill="#92400E" />
  </svg>
);

export default function DaftarKelapaK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const total1 = SEL_KARTU1_KELAPA.length;
  const buka1 = buka.filter((k) => !k.startsWith("r-")).length;
  const buka2 = buka.filter((k) => k.startsWith("r-")).length;
  const selesai1 = buka1 === total1;
  const selesai2 = buka2 === ATURAN_KELAPA.length;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_KELAPA : PETUNJUK2_INFO_KELAPA;

  const kotak = (s: { kunci: string; isi: string; suara: string; aria: string }, merah = false, kecil = false) => {
    const t = buka.includes(s.kunci);
    return (
      <button
        key={s.kunci}
        type="button"
        onClick={() => ketuk(s.kunci, s.suara)}
        aria-label={t ? s.aria : `Isi kosong: ${s.aria.split(":")[0]}`}
        data-sel={s.kunci}
        className={`flex min-h-[44px] w-full min-w-0 items-center justify-center rounded-lg border-[3px] px-1 text-center font-black leading-tight ${t ? `lm-muncul ${merah ? "border-[#B91C1C] bg-[#FEE2E2] text-[#7F1D1D]" : "border-[#15803D] bg-[#ECFDF5] text-[#1C01A5]"} ${kecil ? "text-xs" : "text-sm"}` : "border-dashed border-[#B45309] bg-white/80 text-lg text-[#B45309]"}`}
      >
        {t ? s.isi : "?"}
      </button>
    );
  };
  const sel = (kunci: string): SelKelapa => SEL_KARTU1_KELAPA.find((s) => s.kunci === kunci) as SelKelapa;

  return (
    <div className="space-y-2.5" data-uji="info-kios">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#92400E] bg-[#FEF3C7] p-2 shadow-[0_5px_0_rgba(146,64,14,0.4)]" data-uji="papan-keranjang">
          <p className="mx-auto mb-1.5 w-fit rounded-md border-2 border-[#92400E] bg-white px-3 py-0.5 text-sm font-black text-[#7C2D12]">
            {JUDUL_INFO1_KELAPA}: {rb(BILANGAN_KELAPA)} butir
          </p>
          <div className="grid grid-cols-[3.1rem_repeat(4,minmax(0,1fr))] items-center gap-1">
            <span aria-hidden="true" />
            {TEMPAT_KELAPA.map((t) => (
              <div key={t.nama} className="flex flex-col items-center">
                <Keranjang kosong={t.angka === 0} />
                <span className="text-[12px] font-black leading-none text-[#7C2D12]">{t.nama}</span>
              </div>
            ))}
            <span className="text-[12px] font-black leading-tight text-[#7C2D12]">Angka</span>
            {TEMPAT_KELAPA.map((_, i) => kotak(sel(`a-${i}`)))}
            <span className="text-[12px] font-black leading-tight text-[#7C2D12]">Harga</span>
            {TEMPAT_KELAPA.map((_, i) => kotak(sel(`h-${i}`), false, true))}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <div className="space-y-1 rounded-lg bg-white/80 p-1.5">
              <p className="text-center text-[12px] font-black leading-tight text-[#7C2D12]">Cara lain</p>
              {kotak(sel("lain"), false, true)}
            </div>
            <div className="space-y-1 rounded-lg bg-white/80 p-1.5">
              <p className="text-center text-[12px] font-black leading-tight text-[#B91C1C]">Uraian keliru</p>
              {kotak(sel("salah"), true, true)}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#166534] bg-[#F0FDF4] p-2 shadow-[0_5px_0_rgba(22,101,52,0.4)]" data-uji="kartu-aturan">
          <div className="space-y-1.5">
            {ATURAN_KELAPA.map((a) => (
              <div key={a.kunci} className="grid grid-cols-[6.4rem_minmax(0,1fr)] items-center gap-1.5 rounded-lg bg-white/80 p-1">
                <span className="flex items-center gap-1 text-[12px] font-black leading-tight text-[#14532D]">
                  <span aria-hidden="true" className="text-lg">
                    {a.ikon}
                  </span>
                  {a.nama}
                </span>
                {kotak({ kunci: `r-${a.kunci}`, isi: a.isi, suara: a.suara, aria: `${a.nama}: ${a.isi}` }, false, true)}
              </div>
            ))}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_KELAPA : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : selesai2 ? SELESAI2_INFO_KELAPA : `Sudah dibuka ${buka2} dari ${ATURAN_KELAPA.length} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke papan keranjang">
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
export { DaftarKelapaK4B1 };
