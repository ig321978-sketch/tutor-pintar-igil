"use client";

import React from "react";
import InfoKartu, { type BarisInfo } from "../peta-label/InfoKartu";
import { EMOJI, NAMA } from "../lemari-k1b1a/data";
import { kata } from "../lemari-k1b1a/logika";

/**
 * Infografis Kelas 1 Bab 1 Sub-Bab D (pola label kosong): DATA bersambung dari Sub-Bab A. Mainan Igil dibagi ke dua rak:
 * mobil 5 = 2 dan 3, boneka 4 = 1 dan 3, bola 3 = 1 dan 2, balok 10 = 4 dan 6. Kartu 1 = tabel (isi sel kosong, diketuk); kartu 2 = pasangan sepuluh.
 */
const DATA: { jenis: string; utuh: number; kiri: number }[] = [
  { jenis: "mobil", utuh: 5, kiri: 2 },
  { jenis: "boneka", utuh: 4, kiri: 1 },
  { jenis: "bola", utuh: 3, kiri: 1 },
  { jenis: "balok", utuh: 10, kiri: 4 },
];

const kelompok = (jenis: string, n: number) => (
  <span className="flex max-w-[3.6rem] flex-wrap items-center justify-center rounded-md bg-white px-0.5 text-[13px] leading-none" aria-hidden="true" data-banyak={n}>
    {Array.from({ length: n }, (_, i) => (
      <span key={i}>{EMOJI[jenis]}</span>
    ))}
  </span>
);

const BARIS: BarisInfo[] = DATA.map(({ jenis, utuh, kiri }) => {
  const kanan = utuh - kiri;
  return {
    kunci: jenis,
    sel: [
      {
        isi: (
          <span className="flex flex-col items-center leading-none">
            <span className="text-2xl" aria-hidden="true">
              {EMOJI[jenis]}
            </span>
            <span className="mt-0.5 text-[10px] font-black text-[#78350F]">{NAMA[jenis]}</span>
          </span>
        ),
        suara: `Mainan ini adalah ${NAMA[jenis]}.`,
        aria: `Mainan: ${NAMA[jenis]}`,
      },
      {
        isi: <span className="text-2xl font-black text-[#1C01A5]">{utuh}</span>,
        suara: `Ada ${kata(utuh)} ${NAMA[jenis]} semuanya.`,
        aria: `Utuh: ${kata(utuh)}`,
      },
      {
        isi: (
          <span className="flex flex-col items-center gap-0.5">
            <span className="flex items-center gap-1">
              {kelompok(jenis, kiri)}
              {kelompok(jenis, kanan)}
            </span>
            <span className="text-sm font-black text-[#9D174D]">
              {kiri} dan {kanan}
            </span>
          </span>
        ),
        suara: `${kata(utuh)} dipisah menjadi ${kata(kiri)} dan ${kata(kanan)}.`,
        aria: `Dua bagian: ${kata(kiri)} dan ${kata(kanan)}`,
      },
    ],
  };
});

const PASANGAN = [0, 1, 2, 3, 4, 5].map((a) => [a, 10 - a] as const);

export default function InfoPesta({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const kartu2 = (
    <div className="rounded-2xl border-[5px] border-[#9D174D] bg-[#FDF2F8] p-2 shadow-[0_5px_0_rgba(157,23,77,0.3)]">
      <p className="mb-2 rounded-lg bg-[#9D174D] py-1.5 text-center text-sm font-black text-[#FFF7CC]">{"\u{1F51F}"} Pasangan sepuluh</p>
      <div className="grid grid-cols-2 gap-2">
        {PASANGAN.map(([a, b]) => (
          <button
            key={a}
            type="button"
            onClick={() => speakGuru(`${kata(a)} dan ${kata(b)}, jumlahnya sepuluh.`)}
            aria-label={`${kata(a)} dan ${kata(b)} jumlahnya sepuluh`}
            className="flex min-h-[56px] items-center justify-center gap-1 rounded-xl border-[3px] border-[#F9A8D4] bg-white text-2xl font-black text-[#1C01A5] active:scale-95"
          >
            <span>{a}</span>
            <span className="text-base text-[#9D174D]">+</span>
            <span>{b}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <InfoKartu
      kolom={["Mainan", "Utuh", "Dua bagian"]}
      grid="grid-cols-[3.4rem_3rem_1fr]"
      baris={BARIS}
      warna="#9D174D"
      petunjuk1="Tabel pesta mainan Igil. Ketuk tanda tanya di tiap kotak untuk melihat isinya."
      petunjuk2="Pasangan sepuluh. Dua bagian yang digabung selalu menjadi sepuluh."
      pesanSelesai1="Tabel lengkap! Dua bagian digabung menjadi utuh lagi."
      pesan2="Ketuk satu pasangan untuk mendengarnya."
      kartu2={kartu2}
      speakGuru={speakGuru}
      onLanjut={onLanjut}
      teksLanjut={teksLanjut}
    />
  );
}
