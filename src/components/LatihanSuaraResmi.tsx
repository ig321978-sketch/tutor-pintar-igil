"use client";

import SoalRekamSuara, { ucapanMemuatAlias } from "@/components/SoalRekamSuara";
import type { KuisSuaraResmi } from "@/lib/modul-resmi-pai";

export default function LatihanSuaraResmi({
  soal,
  idPrefix,
}: {
  soal: KuisSuaraResmi[];
  idPrefix: string;
}) {
  if (soal.length === 0) return null;
  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold leading-relaxed text-[#1C01A5]">
        QUIZ:
      </p>
      {soal.map((item, indeks) => (
        <SoalRekamSuara
          key={item.pertanyaan}
          id={`${idPrefix}-${indeks}`}
          pertanyaan={item.pertanyaan}
          periksa={(transkrip) => ucapanMemuatAlias(transkrip, item.alias)}
          petunjuk="Ketuk Rekam suara, sebutkan jawabannya, lalu kirim."
        />
      ))}
    </div>
  );
}
