"use client";

import React from "react";
import InfoKartu, { type BarisInfo } from "../peta-label/InfoKartu";
import { BARIS_DATA, GRID_INFO, KARTU_ACUAN, KERAMIK_INFO, KOLOM_INFO, PESAN_INFO_2, PETUNJUK_INFO_1, PETUNJUK_INFO_2, SELESAI_INFO_1 } from "./data-info";
import { BangunSvg } from "./GambarMosaik";

/**
 * Infografis Kelas 4 Bab 5 Sub-Bab B "Mosaik Pak Rudi" (pola label kosong): DATA bersambung dari Sub-Bab A. Persegi, jajargenjang, trapesium, dan segienam beraturan dibelah menjadi segitiga
 * (kolom Keramik berupa gambar SVG kecil yang digambar dari koordinat, kolom Dibelah, kolom Segitiga). Kartu 1 = tabel (isi sel kosong, diketuk); kartu 2 = kartu acuan.
 * Pembungkus tipis komponen bersama peta-label/InfoKartu.
 */
const BARIS: BarisInfo[] = BARIS_DATA.map((b, i) => ({
  kunci: b.nama,
  sel: [
    {
      isi: (
        <span className="flex flex-col items-center leading-tight">
          <span className="block w-[68px]">
            <BangunSvg bidang={KERAMIK_INFO[i].bidang} bagian={KERAMIK_INFO[i].bagian} rupa="benda" label={`${b.nama} dibelah menjadi ${b.banyak} segitiga`} />
          </span>
          <span className="text-[10px] font-black text-[#78350F]">{b.nama}</span>
        </span>
      ),
      suara: b.suaraNama,
      aria: `Keramik: ${b.nama}`,
    },
    { isi: <span className="text-sm font-black text-[#1C01A5]">{b.cara}</span>, suara: b.suaraCara, aria: `Dibelah: ${b.suaraCara}` },
    { isi: <span className="text-base font-black text-[#15803D]">{b.banyakTeks}</span>, suara: b.suaraBanyak, aria: `Segitiga: ${b.suaraBanyak}` },
  ],
}));

export default function InfoMosaikK4B5({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const kartu2 = (
    <div className="rounded-2xl border-[5px] border-[#B45309] bg-[#FFFBEB] p-3 shadow-[0_5px_0_rgba(180,83,9,0.3)]">
      <p className="mb-2 rounded-lg bg-[#B45309] py-1.5 text-center text-sm font-black text-[#FDE68A]">Kartu acuan</p>
      <div className="space-y-1.5">
        {KARTU_ACUAN.map((a) => (
          <button key={a.teks} type="button" onClick={() => speakGuru(a.suara)} className="flex min-h-[48px] w-full items-center gap-3 rounded-xl border-[3px] border-[#B45309] bg-white px-3 py-1 text-left">
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
      warna="#B45309"
      speakGuru={speakGuru}
      onLanjut={onLanjut}
      teksLanjut={teksLanjut}
    />
  );
}

export { InfoMosaikK4B5 };
