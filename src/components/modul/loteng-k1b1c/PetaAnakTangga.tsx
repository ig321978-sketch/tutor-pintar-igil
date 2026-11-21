"use client";

import React from "react";
import PetaLabel, { type LangkahLabel } from "../peta-label/PetaLabel";

/**
 * Mind-map Kelas 1 Bab 1 Sub-Bab C "Tangga Gudang Loteng" (pola label kosong): anak tangga dengan empat langkah menghitung maju dan mundur.
 */
const LANGKAH: LangkahLabel[] = [
  { judul: "Hitung maju: makin besar", arti: "Langkah satu. Hitung maju, naik tangga. Angkanya makin besar.", ikon: "⬆️" },
  { judul: "Hitung mundur: makin kecil", arti: "Langkah dua. Hitung mundur, turun tangga. Angkanya makin kecil.", ikon: "⬇️" },
  { judul: "Sebelum dan sesudah", arti: "Langkah tiga. Sebelum berarti satu lebih sedikit. Sesudah berarti satu lebih banyak.", ikon: "\u{1F463}" },
  { judul: "Lengkapi yang hilang", arti: "Langkah empat. Lihat angka tetangganya, lalu lengkapi angka yang hilang.", ikon: "❓" },
];

export default function PetaAnakTangga({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return (
    <PetaLabel
      rupa="tangga"
      judul="Tangga Gudang Loteng"
      ikonJudul={"\u{1F4E6}"}
      langkah={LANGKAH}
      petunjuk="Tangga gudang loteng. Ketuk tanda tanya di tiap anak tangga untuk melihat langkahnya."
      pesanSelesai="Sampai di loteng! Empat langkah sudah kamu buka."
      speakGuru={speakGuru}
      onLanjut={onLanjut}
      teksLanjut={teksLanjut}
    />
  );
}
