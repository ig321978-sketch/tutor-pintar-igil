"use client";

import React from "react";
import InfoKartu, { type BarisInfo } from "../peta-label/InfoKartu";
import { BARIS_RAK, EMOJI, NAMA } from "../lemari-k1b1a/data";
import { kata } from "../lemari-k1b1a/logika";

/**
 * Infografis Kelas 1 Bab 1 Sub-Bab C (pola label kosong): DATA bersambung dari Sub-Bab A dan B. Jumlah mainan Igil (bola 3, boneka 4, mobil 5)
 * disusun di anak tangga: angka sebelumnya dan sesudahnya. Kartu 1 = tabel (isi sel kosong, diketuk); kartu 2 = tangga angka nol sampai sepuluh, maju dan mundur.
 */
const jumlah = Object.fromEntries(BARIS_RAK.map((b) => [b.jenis, b.n])) as Record<string, number>;
const JENIS = ["bola", "boneka", "mobil"];

const BARIS: BarisInfo[] = JENIS.map((j) => {
  const n = jumlah[j];
  return {
    kunci: j,
    sel: [
      {
        isi: (
          <span className="flex flex-col items-center leading-none">
            <span className="text-2xl" aria-hidden="true">
              {EMOJI[j]}
            </span>
            <span className="mt-0.5 text-[10px] font-black text-[#78350F]">{NAMA[j]}</span>
          </span>
        ),
        suara: `Mainan ini adalah ${NAMA[j]}.`,
        aria: `Mainan: ${NAMA[j]}`,
      },
      {
        isi: <span className="text-2xl font-black text-[#1D4ED8]">{n - 1}</span>,
        suara: `Sebelum ${kata(n)} adalah ${kata(n - 1)}.`,
        aria: `Sebelum: ${kata(n - 1)}`,
      },
      {
        isi: <span className="text-2xl font-black text-[#1C01A5]">{n}</span>,
        suara: `Jumlah ${NAMA[j]} adalah ${kata(n)}.`,
        aria: `Jumlah: ${kata(n)}`,
      },
      {
        isi: <span className="text-2xl font-black text-[#15803D]">{n + 1}</span>,
        suara: `Sesudah ${kata(n)} adalah ${kata(n + 1)}.`,
        aria: `Sesudah: ${kata(n + 1)}`,
      },
    ],
  };
});

const DERET = Array.from({ length: 11 }, (_, i) => i);

export default function InfoLoteng({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const chip = (n: number, warna: string) => (
    <button
      key={n}
      type="button"
      onClick={() => speakGuru(`${kata(n)}.`)}
      aria-label={`Angka ${kata(n)}`}
      className="flex h-10 w-10 items-center justify-center rounded-xl border-[3px] bg-white text-xl font-black text-[#1C01A5] active:scale-95"
      style={{ borderColor: warna }}
    >
      {n}
    </button>
  );
  const kartu2 = (
    <div className="space-y-2 rounded-2xl border-[5px] border-[#1E3A8A] bg-[#EFF6FF] p-2 shadow-[0_5px_0_rgba(30,58,138,0.3)]">
      <div>
        <p className="mb-1 rounded-lg bg-[#15803D] py-1 text-center text-sm font-black text-white">{"⬆️"} Hitung maju: makin besar</p>
        <div className="flex flex-wrap justify-center gap-1">{DERET.map((n) => chip(n, "#15803D"))}</div>
      </div>
      <div>
        <p className="mb-1 rounded-lg bg-[#B91C1C] py-1 text-center text-sm font-black text-white">{"⬇️"} Hitung mundur: makin kecil</p>
        <div className="flex flex-wrap justify-center gap-1">{[...DERET].reverse().map((n) => chip(n, "#B91C1C"))}</div>
      </div>
    </div>
  );

  return (
    <InfoKartu
      kolom={["Mainan", "Sebelum", "Jumlah", "Sesudah"]}
      grid="grid-cols-[3.4rem_1fr_1fr_1fr]"
      baris={BARIS}
      warna="#1E3A8A"
      petunjuk1="Tabel tangga mainan Igil. Ketuk tanda tanya di tiap kotak untuk melihat isinya."
      petunjuk2="Tangga angka nol sampai sepuluh. Naik berarti hitung maju, turun berarti hitung mundur."
      pesanSelesai1="Tabel lengkap! Sebelum satu lebih sedikit, sesudah satu lebih banyak."
      pesan2="Ketuk satu angka untuk mendengarnya."
      kartu2={kartu2}
      speakGuru={speakGuru}
      onLanjut={onLanjut}
      teksLanjut={teksLanjut}
    />
  );
}
