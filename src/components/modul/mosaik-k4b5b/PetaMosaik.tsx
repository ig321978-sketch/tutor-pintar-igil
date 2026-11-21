"use client";

import React from "react";
import PetaLabel from "../peta-label/PetaLabel";
import { IKON_JUDUL_PETA, JUDUL_PETA, LANGKAH_MOSAIK, PETUNJUK_PETA, SELESAI_PETA } from "./data-peta";

/**
 * Mind-map Kelas 4 Bab 5 Sub-Bab B "Mosaik Pak Rudi" (pola label kosong): tangga mosaik dengan empat langkah menyusun dan menguraikan bangun (Pasang Keping, Bagi dari titik tengah, Bagi dari satu sudut, Coba banyak cara).
 * Pembungkus tipis komponen bersama peta-label/PetaLabel.
 */
export default function PetaMosaikK4B5({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return (
    <PetaLabel
      rupa="tangga"
      judul={JUDUL_PETA}
      ikonJudul={IKON_JUDUL_PETA}
      langkah={LANGKAH_MOSAIK}
      petunjuk={PETUNJUK_PETA}
      pesanSelesai={SELESAI_PETA}
      speakGuru={speakGuru}
      onLanjut={onLanjut}
      teksLanjut={teksLanjut}
    />
  );
}

export { PetaMosaikK4B5 };
