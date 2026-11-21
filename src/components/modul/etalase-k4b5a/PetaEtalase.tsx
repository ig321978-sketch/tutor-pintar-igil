"use client";

import React from "react";
import PetaLabel from "../peta-label/PetaLabel";
import { IKON_JUDUL_PETA_ETALASE, JUDUL_PETA_ETALASE, LANGKAH_ETALASE, PETUNJUK_PETA_ETALASE, SELESAI_PETA_ETALASE } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 5 Sub-Bab A "Etalase Keramik Bu Dewi" (pola label kosong, komponen bersama peta-label/PetaLabel.tsx): rak etalase dengan empat langkah
 * (kenali bangun tertutup, pilah menurut sisinya, periksa sisi dan sudut, telusuri pohon keluarga). Anak mengetuk label kosong, judul langkah muncul dan dibacakan Guru.
 */
export default function PetaEtalase({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return (
    <PetaLabel
      rupa="rak"
      judul={JUDUL_PETA_ETALASE}
      ikonJudul={IKON_JUDUL_PETA_ETALASE}
      langkah={LANGKAH_ETALASE}
      petunjuk={PETUNJUK_PETA_ETALASE}
      pesanSelesai={SELESAI_PETA_ETALASE}
      speakGuru={speakGuru}
      onLanjut={onLanjut}
      teksLanjut={teksLanjut}
    />
  );
}
export { PetaEtalase };
