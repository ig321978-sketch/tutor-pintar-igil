"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_PAMERAN, RINGKASAN_PAMERAN, SELESAI_KARTU_PAMERAN, SUARA_KARTU_PAMERAN, TEMA_KARTU_PAMERAN } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 2 Sub-Bab E: Papan Pameran. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function PapanPameranK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_PAMERAN} tema={TEMA_KARTU_PAMERAN} ringkasan={RINGKASAN_PAMERAN} suaraAwal={SUARA_KARTU_PAMERAN} pesanSelesai={SELESAI_KARTU_PAMERAN} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { PapanPameranK4B2 };
