"use client";

import React from "react";
import InfoKartu, { type BarisInfo } from "../peta-label/InfoKartu";
import { ejaK4B4 } from "../eja-k4b4";
import { ACUAN_UBIN, KOLOM_INFO_UBIN, PESAN2_INFO_UBIN, PETUNJUK1_INFO_UBIN, PETUNJUK2_INFO_UBIN, SATUAN_INFO, SELESAI1_INFO_UBIN, TEMPAT_UBIN, luasTempat, suaraSel, type TempatInfo } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 4 Sub-Bab A (pola label kosong, komponen bersama peta-label/InfoKartu.tsx): DATA luas lantai kolam dari cerita (tepi kolam anak, ruang ganti, pojok pelampung),
 * satu meter persegi tiap ubin, dan menjadi bahan Sub-Bab B. Kartu 1 = tabel (gambar ubin, baris kali kolom, luas dengan satuan; isi sel kosong, diketuk);
 * kartu 2 = kartu acuan baris kali kolom dan satu meter persegi sama dengan sepuluh ribu sentimeter persegi.
 */
const MiniKisi = ({ b, k }: { b: number; k: number }) => (
  <span className="grid gap-px" style={{ gridTemplateColumns: `repeat(${k}, 11px)` }} role="img" aria-label={`${b} baris, ${k} kolom ubin`} data-baris={b} data-kolom={k}>
    {Array.from({ length: b * k }, (_, i) => (
      <span key={i} aria-hidden="true" className="block h-[11px] w-[11px] border border-[#0369A1] bg-[#BAE6FD]" />
    ))}
  </span>
);

const baris = (t: TempatInfo): BarisInfo => ({
  kunci: t.kunci,
  sel: [
    {
      isi: (
        <span className="flex flex-col items-center leading-tight">
          <span className="text-xl" aria-hidden="true">
            {t.ikon}
          </span>
          <span className="text-[10px] font-black text-[#78350F]">{t.nama}</span>
        </span>
      ),
      suara: suaraSel(t, 0),
      aria: `Tempat: ${t.nama}`,
    },
    { isi: <MiniKisi b={t.b} k={t.k} />, suara: suaraSel(t, 1), aria: `Ubin: ${t.b} baris, ${t.k} kolom` },
    {
      isi: (
        <span className="flex flex-col items-center leading-tight">
          <span className="text-base font-black text-[#1C01A5]">
            {t.b} × {t.k}
          </span>
          <span className="text-[9px] font-black text-[#6B7280]">baris kolom</span>
        </span>
      ),
      suara: suaraSel(t, 2),
      aria: `Baris kali kolom: ${t.b} kali ${t.k}`,
    },
    {
      isi: (
        <span className="text-base font-black leading-tight text-[#15803D]">
          {luasTempat(t)} {SATUAN_INFO}
        </span>
      ),
      suara: suaraSel(t, 3),
      aria: `Luas: ${luasTempat(t)} ${SATUAN_INFO}`,
    },
  ],
});

export default function InfoUbin({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const { b, k } = ACUAN_UBIN.contoh;
  const kartu2 = (
    <div className="rounded-2xl border-[5px] border-[#1C01A5] bg-[#F5F3FF] p-3 shadow-[0_5px_0_rgba(28,1,165,0.3)]">
      <p className="mb-2 rounded-lg bg-[#1C01A5] py-1.5 text-center text-sm font-black text-[#FFE566]">Baris kali kolom</p>
      <div className="mb-2 flex justify-center">
        <span className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${k}, 22px)` }} role="img" aria-label={`${b} baris, ${k} kolom ubin, luas ${b * k} meter persegi`} data-baris={b} data-kolom={k}>
          {Array.from({ length: b * k }, (_, i) => (
            <span key={i} aria-hidden="true" className="block h-[22px] w-[22px] rounded-sm border-2 border-[#0369A1] bg-[#BAE6FD]" />
          ))}
        </span>
      </div>
      <div className="space-y-1.5">
        {ACUAN_UBIN.kalimat.map((s) => (
          <button key={s.teks} type="button" onClick={() => speakGuru(ejaK4B4(s.suara))} className="w-full rounded-xl bg-[#DCFCE7] px-2 py-2 text-center text-sm font-black text-[#14532D]">
            {"\u{1F50A}"} {s.teks}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <InfoKartu
      kolom={KOLOM_INFO_UBIN}
      grid="grid-cols-[4.4rem_1fr_3.6rem_3.6rem]"
      baris={TEMPAT_UBIN.map(baris)}
      petunjuk1={PETUNJUK1_INFO_UBIN}
      petunjuk2={PETUNJUK2_INFO_UBIN}
      pesanSelesai1={SELESAI1_INFO_UBIN}
      pesan2={PESAN2_INFO_UBIN}
      kartu2={kartu2}
      warna="#0369A1"
      speakGuru={speakGuru}
      onLanjut={onLanjut}
      teksLanjut={teksLanjut}
    />
  );
}
export { InfoUbin };
