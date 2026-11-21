"use client";

import React from "react";
import PetaLabel, { type LangkahLabel } from "../peta-label/PetaLabel";

/**
 * Mind-map Kelas 1 Bab 1 Sub-Bab B "Hadiah Nenek untuk Rak yang Lebih Sedikit" (pola label kosong): rak hadiah dengan empat langkah membandingkan banyak benda.
 */
const LANGKAH: LangkahLabel[] = [
  { judul: "Pasangkan satu-satu", arti: "Langkah satu. Pasangkan satu-satu benda dari dua rak.", ikon: "\u{1F697}\u{1F9F8}" },
  { judul: "Lihat yang bersisa", arti: "Langkah dua. Lihat benda yang bersisa. Yang bersisa berarti lebih banyak.", ikon: "\u{1F697}\u{1F697}\u{1F697}" },
  { judul: "Tanpa sisa: sama banyak", arti: "Langkah tiga. Kalau tidak ada yang bersisa, kedua rak sama banyak.", ikon: "\u{1F697}\u{1F697}" },
  { judul: "Angka besar: lebih banyak", arti: "Langkah empat. Hitung kedua rak. Angka yang lebih besar berarti lebih banyak.", ikon: "\u{1F522}" },
];

export default function PetaRak({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return (
    <PetaLabel
      rupa="rak"
      judul="Rak Hadiah Nenek"
      ikonJudul={"\u{1F381}"}
      langkah={LANGKAH}
      petunjuk="Rak hadiah Nenek. Ketuk tanda tanya di tiap rak untuk melihat langkahnya."
      pesanSelesai="Rak hadiah rapi! Empat langkah sudah kamu buka."
      speakGuru={speakGuru}
      onLanjut={onLanjut}
      teksLanjut={teksLanjut}
    />
  );
}
