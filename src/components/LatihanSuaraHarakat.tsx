"use client";

import SoalRekamSuara, { ucapanMemuatAlias } from "@/components/SoalRekamSuara";
import { ID_KUIS_HARAKAT } from "@/lib/kuis-materi";

function HurufArab({ huruf }: { huruf: string }) {
  return (
    <span
      dir="rtl"
      lang="ar"
      className="font-arab mx-1 inline-block text-2xl font-black leading-none text-[#1C01A5] align-middle"
    >
      {huruf}
    </span>
  );
}

const SOAL = [
  {
    id: ID_KUIS_HARAKAT[0],
    pertanyaan: (
      <>
        1. Jika huruf
        <HurufArab huruf="ش" />
        dikasih kasrah maka berbunyi apa?:
      </>
    ),
    alias: ["syi", "shi", "sii", "syii", "shii", "si", "شِ"],
  },
  {
    id: ID_KUIS_HARAKAT[1],
    pertanyaan: (
      <>
        2. Jika huruf
        <HurufArab huruf="ڧ" />
        dikasih dhammah maka berbunyi apa?:
      </>
    ),
    alias: ["qu", "qo", "quu", "qoo", "ku", "ko", "fu", "fo", "قُ", "ڧُ", "فُ"],
  },
  {
    id: ID_KUIS_HARAKAT[2],
    pertanyaan: (
      <>
        3. Jika huruf
        <HurufArab huruf="ر" />
        dikasih fathah maka berbunyi apa?:
      </>
    ),
    alias: ["ra", "ro", "raa", "roo", "رَ"],
  },
] as const;

export default function LatihanSuaraHarakat() {
  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold leading-relaxed text-[#1C01A5]">
        QUIZ:
      </p>
      {SOAL.map((soal) => (
        <SoalRekamSuara
          key={soal.id}
          id={soal.id}
          pertanyaan={soal.pertanyaan}
          periksa={(transkrip) => ucapanMemuatAlias(transkrip, [...soal.alias])}
          petunjuk="Ketuk Rekam suara, sebutkan bunyinya, lalu kirim jawaban."
        />
      ))}
    </div>
  );
}
