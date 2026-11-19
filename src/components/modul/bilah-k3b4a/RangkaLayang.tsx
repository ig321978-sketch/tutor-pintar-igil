"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_BILAH, RINGKASAN_BILAH, SELESAI_KARTU_BILAH, SUARA_KARTU_BILAH, TEMA_KARTU_BILAH } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 4 Sub-Bab A: Rangka Layang-layang. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function RangkaLayangK3B4({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_BILAH} tema={TEMA_KARTU_BILAH} ringkasan={RINGKASAN_BILAH} suaraAwal={SUARA_KARTU_BILAH} pesanSelesai={SELESAI_KARTU_BILAH} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { RangkaLayangK3B4 };
