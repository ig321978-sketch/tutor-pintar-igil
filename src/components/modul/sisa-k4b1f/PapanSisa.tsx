"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_SISA, RINGKASAN_SISA, SELESAI_KARTU_SISA, SUARA_KARTU_SISA, TEMA_KARTU_SISA } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab F: Papan Sisa. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function PapanSisaK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_SISA} tema={TEMA_KARTU_SISA} ringkasan={RINGKASAN_SISA} suaraAwal={SUARA_KARTU_SISA} pesanSelesai={SELESAI_KARTU_SISA} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { PapanSisaK4B1 };
