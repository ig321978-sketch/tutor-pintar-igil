"use client";

import type { ReactNode } from "react";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import { jawabanTulisMemuatAlias, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";

export default function KuisAkhirAdegan({
  idSuara,
  idKanvas,
  pertanyaanSuara,
  aliasSuara,
  petunjukSuara = "Ucapkan jawabannya.",
  pertanyaanKanvas,
  aliasKanvas,
  konteksKanvas,
  visualKanvas,
}: {
  idSuara: string;
  idKanvas?: string;
  pertanyaanSuara: string;
  aliasSuara: string[];
  petunjukSuara?: string;
  pertanyaanKanvas?: string;
  aliasKanvas?: string[];
  konteksKanvas?: string;
  visualKanvas?: ReactNode;
}) {
  return (
    <div className="mt-3 space-y-3 border-t-2 border-[#F0AB00] pt-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
      <SoalRekamSuara
        id={idSuara}
        pertanyaan={pertanyaanSuara}
        periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, aliasSuara)}
        petunjuk={petunjukSuara}
      />
      {idKanvas && pertanyaanKanvas && aliasKanvas && konteksKanvas ? (
        <KuisTulisKartu
          id={idKanvas}
          hanyaKanvas
          rapat
          pertanyaan={pertanyaanKanvas}
          alias={kumpulkanAlias(aliasKanvas)}
          konteks={konteksKanvas}
          visual={visualKanvas}
        />
      ) : null}
    </div>
  );
}
