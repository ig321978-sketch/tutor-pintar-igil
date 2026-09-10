"use client";

import SoalRekamSuara, { ucapanMemuatAlias } from "@/components/SoalRekamSuara";

const SOAL = [
  {
    id: "arti-iman",
    pertanyaan: "1. Iman artinya apa?",
    alias: ["percaya", "yakin", "iman artinya percaya"],
  },
  {
    id: "jumlah-rukun",
    pertanyaan: "2. Rukun Iman ada berapa?",
    alias: ["enam", "6", "enam perkara", "enam rukun"],
  },
  {
    id: "rukun-pertama",
    pertanyaan: "3. Rukun Iman yang pertama iman kepada siapa?",
    alias: ["allah", "allah swt", "tuhan", "iman kepada allah"],
  },
] as const;

export default function LatihanSuaraRukunIman() {
  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold leading-relaxed text-[#1C01A5]">
        QUIZ:
      </p>
      {SOAL.map((soal) => (
        <SoalRekamSuara
          key={soal.id}
          pertanyaan={soal.pertanyaan}
          periksa={(transkrip) => ucapanMemuatAlias(transkrip, [...soal.alias])}
          petunjuk="Ketuk Rekam suara, sebutkan jawabannya, lalu kirim."
        />
      ))}
    </div>
  );
}
