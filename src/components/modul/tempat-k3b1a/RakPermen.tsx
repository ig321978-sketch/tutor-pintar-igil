"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_TEMPAT, RINGKASAN_TEMPAT, SELESAI_KARTU_TEMPAT, SUARA_KARTU_TEMPAT, TEMA_KARTU_TEMPAT } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 1 Sub-Bab A: Rak Permen. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function RakPermenK3B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_TEMPAT} tema={TEMA_KARTU_TEMPAT} ringkasan={RINGKASAN_TEMPAT} suaraAwal={SUARA_KARTU_TEMPAT} pesanSelesai={SELESAI_KARTU_TEMPAT} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { RakPermenK3B1 };
