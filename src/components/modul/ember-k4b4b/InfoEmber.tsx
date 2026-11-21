"use client";

import React from "react";
import InfoKartu, { type BarisInfo } from "../peta-label/InfoKartu";
import { BARIS_DATA, GRID_INFO, KARTU_ACUAN, KOLOM_INFO, LAPIS_BAK, PESAN_INFO_2, PETUNJUK_INFO_1, PETUNJUK_INFO_2, SELESAI_INFO_1 } from "./data-info";

/**
 * Infografis Kelas 4 Bab 4 Sub-Bab B "Ember Pak Anto" (pola label kosong): DATA bersambung dari Sub-Bab A. Lantai Tepi kolam anak (tiga kali empat), Ruang ganti (dua kali lima), dan Pojok pelampung (empat kali empat)
 * menjadi alas bak berisi kubus satuan; dengan tinggi dua lapisan, volumenya dalam cm³ sama dengan mililiter. Kartu 1 = tabel (isi sel kosong, diketuk); kartu 2 = kartu takaran.
 * Pembungkus tipis komponen bersama peta-label/InfoKartu.
 */
const BARIS: BarisInfo[] = BARIS_DATA.map((b) => ({
  kunci: b.nama,
  sel: [
    {
      isi: (
        <span className="flex flex-col items-center leading-tight">
          <span className="text-xl" aria-hidden="true">
            {b.ikon}
          </span>
          <span className="text-[10px] font-black text-[#78350F]">{b.nama}</span>
        </span>
      ),
      suara: b.suaraNama,
      aria: `Bak: ${b.nama}`,
    },
    {
      isi: (
        <span className="flex flex-col items-center leading-tight">
          <span className="text-base font-black text-[#1C01A5]">{b.alas}</span>
          <span className="text-[11px] font-black text-[#0E7490]">{b.lapisan}</span>
        </span>
      ),
      suara: b.suaraAlas,
      aria: `Alas: ${b.suaraAlas}`,
    },
    {
      isi: (
        <span className="flex flex-col items-center leading-tight">
          <span className="text-base font-black text-[#1C01A5]">{b.volumeTeks}</span>
          <span className="text-[11px] font-black text-[#0E7490]">{LAPIS_BAK} lapisan</span>
        </span>
      ),
      suara: b.suaraVolume,
      aria: `Volume: ${b.suaraVolume}`,
    },
    {
      isi: <span className="text-base font-black text-[#15803D]">{b.isiTeks}</span>,
      suara: b.suaraIsi,
      aria: `Isi air: ${b.suaraIsi}`,
    },
  ],
}));

export default function InfoEmberK4B4({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const kartu2 = (
    <div className="rounded-2xl border-[5px] border-[#0E7490] bg-[#ECFEFF] p-3 shadow-[0_5px_0_rgba(14,116,144,0.3)]">
      <p className="mb-2 rounded-lg bg-[#0E7490] py-1.5 text-center text-sm font-black text-[#FDE68A]">Kartu takaran</p>
      <div className="space-y-1.5">
        {KARTU_ACUAN.map((a) => (
          <button key={a.teks} type="button" onClick={() => speakGuru(a.suara)} className="flex min-h-[48px] w-full items-center gap-3 rounded-xl border-[3px] border-[#0E7490] bg-white px-3 py-1 text-left">
            <span className="text-2xl leading-none" aria-hidden="true">
              {a.ikon}
            </span>
            <span className="text-base font-black text-[#1C01A5]">{a.teks}</span>
          </button>
        ))}
      </div>
    </div>
  );
  return (
    <InfoKartu
      kolom={KOLOM_INFO}
      grid={GRID_INFO}
      baris={BARIS}
      petunjuk1={PETUNJUK_INFO_1}
      petunjuk2={PETUNJUK_INFO_2}
      pesanSelesai1={SELESAI_INFO_1}
      pesan2={PESAN_INFO_2}
      kartu2={kartu2}
      warna="#0E7490"
      speakGuru={speakGuru}
      onLanjut={onLanjut}
      teksLanjut={teksLanjut}
    />
  );
}

export { InfoEmberK4B4 };
