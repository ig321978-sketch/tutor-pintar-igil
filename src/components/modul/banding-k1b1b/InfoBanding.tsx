"use client";

import React from "react";
import InfoKartu, { type BarisInfo } from "../peta-label/InfoKartu";
import { BARIS_RAK, EMOJI, NAMA } from "../lemari-k1b1a/data";
import { kata } from "../lemari-k1b1a/logika";

/**
 * Infografis Kelas 1 Bab 1 Sub-Bab B (pola label kosong): DATA bersambung dari Sub-Bab A. Mainan di lemari Igil (mobil 5, boneka 4, bola 3, balok 10, kereta 0)
 * dibandingkan berpasangan. Kartu 1 = tabel pasangan (isi sel kosong, diketuk); kartu 2 = acuan "pasangkan satu-satu" mobil dan boneka.
 */
const jumlah = Object.fromEntries(BARIS_RAK.map((b) => [b.jenis, b.n])) as Record<string, number>;
const PASANGAN: [string, string][] = [
  ["mobil", "boneka"],
  ["boneka", "bola"],
  ["bola", "balok"],
  ["kereta", "bola"],
];

const banding = (a: string, b: string) => {
  const na = jumlah[a];
  const nb = jumlah[b];
  const banyak = na > nb ? a : b;
  const sedikit = na > nb ? b : a;
  return { banyak, sedikit };
};

const BARIS: BarisInfo[] = PASANGAN.map(([a, b]) => {
  const { banyak, sedikit } = banding(a, b);
  return {
    kunci: `${a}-${b}`,
    sel: [
      {
        isi: (
          <span className="flex flex-nowrap items-center justify-center gap-0.5 whitespace-nowrap text-xl leading-none" aria-hidden="true">
            {EMOJI[a]}
            {EMOJI[b]}
          </span>
        ),
        suara: `${NAMA[a]} dan ${NAMA[b]}.`,
        aria: `Pasangan: ${NAMA[a]} dan ${NAMA[b]}`,
      },
      {
        isi: (
          <span className="text-lg font-black leading-tight text-[#1C01A5]">
            {jumlah[a]} dan {jumlah[b]}
          </span>
        ),
        suara: `${NAMA[a]} ${kata(jumlah[a])}, ${NAMA[b]} ${kata(jumlah[b])}.`,
        aria: `Angka: ${kata(jumlah[a])} dan ${kata(jumlah[b])}`,
      },
      {
        isi: (
          <span className="flex flex-col items-center leading-tight">
            <span className="text-xl" aria-hidden="true">
              {EMOJI[banyak]}
            </span>
            <span className="text-[11px] font-black text-[#15803D]">lebih banyak</span>
          </span>
        ),
        suara: `${NAMA[banyak]} lebih banyak. ${NAMA[sedikit]} lebih sedikit.`,
        aria: `Hasil: ${NAMA[banyak]} lebih banyak, ${NAMA[sedikit]} lebih sedikit`,
      },
    ],
  };
});

export default function InfoBanding({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const a = jumlah.mobil;
  const b = jumlah.boneka;
  const kartu2 = (
    <div className="rounded-2xl border-[5px] border-[#1C01A5] bg-[#F5F3FF] p-3 shadow-[0_5px_0_rgba(28,1,165,0.3)]">
      <p className="mb-2 rounded-lg bg-[#1C01A5] py-1.5 text-center text-sm font-black text-[#FFE566]">Pasangkan satu-satu</p>
      <div className="grid grid-cols-5 gap-1.5" role="img" aria-label={`${a} mobil dan ${b} boneka dipasangkan satu-satu, satu mobil bersisa`} data-banyak-atas={a} data-banyak-bawah={b}>
        {Array.from({ length: a }, (_, i) => (
          <span key={`m${i}`} className={`flex items-center justify-center rounded-lg py-1 text-3xl leading-none ${i >= b ? "border-[3px] border-dashed border-[#B91C1C] bg-[#FEE2E2]" : "bg-white"}`} aria-hidden="true">
            {EMOJI.mobil}
          </span>
        ))}
        {Array.from({ length: a }, (_, i) => (
          <span key={`p${i}`} className="text-center text-xl font-black leading-none text-[#6D28D9]" aria-hidden="true">
            {i < b ? "↕" : ""}
          </span>
        ))}
        {Array.from({ length: a }, (_, i) => (
          <span key={`b${i}`} className={`flex items-center justify-center rounded-lg py-1 text-3xl leading-none ${i < b ? "bg-white" : "border-[3px] border-dashed border-[#9CA3AF] text-sm font-black text-[#9CA3AF]"}`} aria-hidden="true">
            {i < b ? EMOJI.boneka : "kosong"}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => speakGuru("Mobil dan boneka dipasangkan satu-satu. Satu mobil bersisa, jadi mobil lebih banyak dari boneka.")}
        className="mt-3 w-full rounded-xl bg-[#DCFCE7] px-2 py-2 text-center text-sm font-black text-[#14532D]"
      >
        {"\u{1F50A}"} Satu mobil bersisa, jadi mobil lebih banyak.
      </button>
    </div>
  );

  return (
    <InfoKartu
      kolom={["Pasangan", "Angka", "Hasil"]}
      grid="grid-cols-[4.6rem_1fr_1fr]"
      baris={BARIS}
      petunjuk1="Tabel membandingkan mainan Igil. Ketuk tanda tanya di tiap kotak untuk melihat isinya."
      petunjuk2="Pasangkan satu-satu. Mobil yang bersisa berarti lebih banyak."
      pesanSelesai1="Tabel lengkap! Yang angkanya lebih besar, lebih banyak."
      pesan2="Ketuk tombol hijau untuk mendengar hasilnya."
      kartu2={kartu2}
      speakGuru={speakGuru}
      onLanjut={onLanjut}
      teksLanjut={teksLanjut}
    />
  );
}
