"use client";

import SoalRekamSuara, { ucapanMemuatAlias } from "@/components/SoalRekamSuara";

const SOAL = [
  {
    id: "iman-terlihat",
    pertanyaan: "1. Iman yang benar terlihat dari apa?",
    alias: [
      "perbuatan",
      "perbuatan baik",
      "tingkah laku",
      "amal",
      "kelakuan",
    ],
  },
  {
    id: "allah-melihat",
    pertanyaan: "2. Kalau Allah melihat kita, pensil teman boleh diambil tidak?",
    alias: ["tidak", "tidak boleh", "jangan", "tidak boleh diambil"],
  },
  {
    id: "menolong",
    pertanyaan: "3. Karena Allah Maha Pengasih, jika teman sedih kita harus apa?",
    alias: ["menolong", "menyayangi", "menghibur", "membantu", "berbagi"],
  },
] as const;

export default function LatihanSuaraImanAmal() {
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
