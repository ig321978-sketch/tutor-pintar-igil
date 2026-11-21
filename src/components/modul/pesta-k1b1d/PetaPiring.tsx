"use client";

import React from "react";
import PetaLabel, { type LangkahLabel } from "../peta-label/PetaLabel";

/**
 * Mind-map Kelas 1 Bab 1 Sub-Bab D "Pesta Rumah Rapi" (pola label kosong): meja pesta dengan empat piring langkah pasangan bilangan.
 */
const LANGKAH: LangkahLabel[] = [
  { judul: "Pisahkan jadi dua bagian", arti: "Langkah satu. Pisahkan satu kumpulan menjadi dua bagian.", ikon: "\u{1F370}" },
  { judul: "Gabungkan jadi utuh", arti: "Langkah dua. Gabungkan dua bagian menjadi satu kumpulan yang utuh.", ikon: "\u{1F95B}" },
  { judul: "Cari semua pasangan", arti: "Langkah tiga. Cari semua pasangan dua bagian dari satu bilangan.", ikon: "\u{1F50D}" },
  { judul: "Pasangan sepuluh", arti: "Langkah empat. Ingat pasangan sepuluh, misalnya empat dan enam.", ikon: "\u{1F51F}" },
];

export default function PetaPiring({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return (
    <PetaLabel
      rupa="meja"
      judul="Meja Pesta Rumah Rapi"
      ikonJudul={"\u{1F389}"}
      langkah={LANGKAH}
      petunjuk="Meja pesta. Ketuk tanda tanya di tiap piring untuk melihat langkahnya."
      pesanSelesai="Meja pesta siap! Empat langkah sudah kamu buka."
      speakGuru={speakGuru}
      onLanjut={onLanjut}
      teksLanjut={teksLanjut}
    />
  );
}
