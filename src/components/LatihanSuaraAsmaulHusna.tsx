"use client";

import SoalRekamSuara, { ucapanMemuatAlias } from "@/components/SoalRekamSuara";
import { ID_KUIS_ASMAUL } from "@/lib/kuis-materi";

const SOAL = [
  {
    id: ID_KUIS_ASMAUL[0],
    pertanyaan: "1. Ar-Rahman artinya Allah Maha apa?",
    alias: ["pengasih", "maha pengasih", "kasih", "mengasihi"],
  },
  {
    id: ID_KUIS_ASMAUL[1],
    pertanyaan: "2. Ar-Rahim artinya Allah Maha apa?",
    alias: ["penyayang", "maha penyayang", "sayang", "menyayangi"],
  },
  {
    id: ID_KUIS_ASMAUL[2],
    pertanyaan: "3. Ar-Rahman mengasihi siapa?",
    alias: [
      "semua",
      "semua makhluk",
      "semua orang",
      "seluruh makhluk",
      "semuanya",
    ],
  },
] as const;

export default function LatihanSuaraAsmaulHusna() {
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
          petunjuk="Ketuk Rekam suara, sebutkan jawabannya, lalu kirim."
        />
      ))}
    </div>
  );
}
