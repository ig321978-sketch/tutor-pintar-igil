"use client";

import React from "react";
import PetaLabel from "../peta-label/PetaLabel";
import { IKON_JUDUL_PETA, JUDUL_PETA, LANGKAH_EMBER, PETUNJUK_PETA, SELESAI_PETA } from "./data-peta";

/**
 * Mind-map Kelas 4 Bab 4 Sub-Bab B "Ember Pak Anto" (pola label kosong): rak ember dengan empat langkah mengukur volume (Isi dan Tuang, Susun Lapisan, Tangga Liter, kubik sama dengan mililiter).
 * Pembungkus tipis komponen bersama peta-label/PetaLabel.
 */
export default function PetaEmberK4B4({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return (
    <PetaLabel
      rupa="rak"
      judul={JUDUL_PETA}
      ikonJudul={IKON_JUDUL_PETA}
      langkah={LANGKAH_EMBER}
      petunjuk={PETUNJUK_PETA}
      pesanSelesai={SELESAI_PETA}
      speakGuru={speakGuru}
      onLanjut={onLanjut}
      teksLanjut={teksLanjut}
    />
  );
}

export { PetaEmberK4B4 };
