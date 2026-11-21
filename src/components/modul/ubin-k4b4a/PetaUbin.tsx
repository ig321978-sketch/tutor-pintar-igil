"use client";

import React from "react";
import PetaLabel from "../peta-label/PetaLabel";
import { IKON_JUDUL_PETA_UBIN, JUDUL_PETA_UBIN, LANGKAH_UBIN, PETUNJUK_PETA_UBIN, SELESAI_PETA_UBIN } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 4 Sub-Bab A "Lantai Ubin Bu Sinta" (pola label kosong, komponen bersama peta-label/PetaLabel.tsx): tangga satuan di tepi kolam dengan empat langkah
 * (tutup lantai dengan ubin, hitung baris kali kolom, tulis satuan luas, naik turun tangga satuan). Anak mengetuk label kosong, judul langkah muncul dan dibacakan Guru.
 */
export default function PetaUbin({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return (
    <PetaLabel
      rupa="tangga"
      judul={JUDUL_PETA_UBIN}
      ikonJudul={IKON_JUDUL_PETA_UBIN}
      langkah={LANGKAH_UBIN}
      petunjuk={PETUNJUK_PETA_UBIN}
      pesanSelesai={SELESAI_PETA_UBIN}
      speakGuru={speakGuru}
      onLanjut={onLanjut}
      teksLanjut={teksLanjut}
    />
  );
}
export { PetaUbin };
