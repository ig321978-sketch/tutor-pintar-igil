"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_PERAHU, RINGKASAN_PERAHU, SELESAI_KARTU_PERAHU, SUARA_KARTU_PERAHU, TEMA_KARTU_PERAHU } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab G: Baris Perahu. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function BarisPerahuK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_PERAHU} tema={TEMA_KARTU_PERAHU} ringkasan={RINGKASAN_PERAHU} suaraAwal={SUARA_KARTU_PERAHU} pesanSelesai={SELESAI_KARTU_PERAHU} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { BarisPerahuK4B1 };
