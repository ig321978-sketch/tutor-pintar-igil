"use client";

import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara, { ucapanMemuatAlias } from "@/components/SoalRekamSuara";
import type { KuisSuaraResmi } from "@/lib/modul-resmi-pai";
import { aliasDariKuisSuara } from "@/lib/nilai-kuis-tulis";

function pertanyaanTulisDariSoal(
  soal: KuisSuaraResmi[],
  cadangan?: string,
): string {
  if (cadangan?.trim()) return cadangan.trim();
  const pertama = soal[0]?.pertanyaan.replace(/^\d+\.\s*/, "").trim();
  if (pertama) return `Tuliskan jawaban: ${pertama}`;
  return "Tuliskan jawaban dari materi kartu ini.";
}

export default function LatihanSuaraResmi({
  soal,
  idPrefix,
  pertanyaan,
}: {
  soal: KuisSuaraResmi[];
  idPrefix: string;
  pertanyaan?: string;
}) {
  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      {soal.length > 0 ? (
        <>
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
        </>
      ) : null}
      <KuisTulisKartu
        id={`${idPrefix}-tulis`}
        rapat
        pertanyaan={pertanyaanTulisDariSoal(soal, pertanyaan)}
        alias={soal[0]?.alias ?? aliasDariKuisSuara(soal)}
        konteks={soal
          .slice(0, 1)
          .map((item) => `${item.pertanyaan} ${item.alias.join(", ")}`)
          .join(" ")}
      />
    </div>
  );
}
