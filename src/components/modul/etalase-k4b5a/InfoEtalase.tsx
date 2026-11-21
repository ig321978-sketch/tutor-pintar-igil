"use client";

import React from "react";
import InfoKartu, { type BarisInfo } from "../peta-label/InfoKartu";
import { Keramik, glasirDari } from "./GambarEtalase";
import { bangun, muatkan, teksTitik } from "./logika-bangun";
import { ACUAN_ETALASE, KERAMIK_INFO, KOLOM_INFO_ETALASE, PESAN2_INFO_ETALASE, PETUNJUK1_INFO_ETALASE, PETUNJUK2_INFO_ETALASE, SELESAI1_INFO_ETALASE, sejajarInfo, sisiInfo, suaraSel, type KeramikInfo } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 5 Sub-Bab A (pola label kosong, komponen bersama peta-label/InfoKartu.tsx): DATA keramik etalase dari cerita (persegi, jajargenjang, trapesium, segienam beraturan),
 * dan menjadi bahan Sub-Bab B. Kartu 1 = tabel (gambar keramik, nama, banyak sisi, pasang sisi sejajar; isi sel kosong, diketuk);
 * kartu 2 = kartu acuan ciri persegi, jajargenjang, dan belah ketupat. Gambar keramik dan angka dihitung dari koordinat bangun.
 */
const MiniBangun = ({ b }: { b: string }) => {
  const t = muatkan(bangun(b).titik, 3, 3, 46, 32);
  const [isi, tepi] = glasirDari(b);
  return (
    <svg viewBox="0 0 52 38" className="h-[38px] w-[52px]" role="img" aria-label={`Keramik ${bangun(b).nama}`} data-bangun={b}>
      <polygon points={teksTitik(t)} fill={isi} stroke={tepi} strokeWidth={2} strokeLinejoin="round" />
    </svg>
  );
};

const baris = (k: KeramikInfo): BarisInfo => ({
  kunci: k.kunci,
  sel: [
    { isi: <MiniBangun b={k.bangun} />, suara: suaraSel(k, 0), aria: `Keramik: ${k.nama}` },
    { isi: <span className="text-[11px] font-black leading-tight text-[#78350F]">{k.nama}</span>, suara: suaraSel(k, 1), aria: `Nama: ${k.nama}` },
    { isi: <span className="text-lg font-black text-[#1C01A5]">{sisiInfo(k)}</span>, suara: suaraSel(k, 2), aria: `Sisi: ${sisiInfo(k)}` },
    {
      isi: (
        <span className="flex flex-col items-center leading-tight">
          <span className="text-lg font-black text-[#15803D]">{sejajarInfo(k)}</span>
          <span className="text-[9px] font-black text-[#6B7280]">pasang</span>
        </span>
      ),
      suara: suaraSel(k, 3),
      aria: `Sisi sejajar: ${sejajarInfo(k)} pasang`,
    },
  ],
});

export default function InfoEtalase({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const kartu2 = (
    <div className="rounded-2xl border-[5px] border-[#1C01A5] bg-[#F5F3FF] p-3 shadow-[0_5px_0_rgba(28,1,165,0.3)]">
      <p className="mb-2 rounded-lg bg-[#1C01A5] py-1.5 text-center text-sm font-black text-[#FFE566]">Ciri keramik</p>
      <svg viewBox="0 0 300 96" className="mb-2 block h-auto w-full" role="img" aria-label="Persegi, jajargenjang, dan belah ketupat dengan tanda sisi sama panjang, sisi sejajar, dan sudut siku-siku">
        {["persegi", "jajargenjang", "belah-ketupat"].map((b, i) => (
          <Keramik key={b} kunci={b} x={8 + i * 98} y={8} w={86} h={66} rupa="diagram" ukuranTanda={8} />
        ))}
        {["persegi", "jajargenjang", "belah ketupat"].map((n, i) => (
          <text key={n} x={51 + i * 98} y={90} textAnchor="middle" fontSize={10} fontWeight={900} fill="#1C01A5">
            {n}
          </text>
        ))}
      </svg>
      <div className="space-y-1.5">
        {ACUAN_ETALASE.kalimat.map((s) => (
          <button key={s.teks} type="button" onClick={() => speakGuru(s.suara)} className="w-full rounded-xl bg-[#DCFCE7] px-2 py-2 text-center text-sm font-black text-[#14532D]">
            {"\u{1F50A}"} {s.teks}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <InfoKartu
      kolom={KOLOM_INFO_ETALASE}
      grid="grid-cols-[3.9rem_1fr_2.6rem_3.9rem]"
      baris={KERAMIK_INFO.map(baris)}
      petunjuk1={PETUNJUK1_INFO_ETALASE}
      petunjuk2={PETUNJUK2_INFO_ETALASE}
      pesanSelesai1={SELESAI1_INFO_ETALASE}
      pesan2={PESAN2_INFO_ETALASE}
      kartu2={kartu2}
      warna="#9A3412"
      speakGuru={speakGuru}
      onLanjut={onLanjut}
      teksLanjut={teksLanjut}
    />
  );
}
export { InfoEtalase };
