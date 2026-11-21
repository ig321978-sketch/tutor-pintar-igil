"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_ANGKLUNG, RINGKASAN_ANGKLUNG, SELESAI_KARTU_ANGKLUNG, SUARA_KARTU_ANGKLUNG, TEMA_KARTU_ANGKLUNG } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 3 Sub-Bab A: Deret Angklung. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function DeretAngklungK4B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_ANGKLUNG} tema={TEMA_KARTU_ANGKLUNG} ringkasan={RINGKASAN_ANGKLUNG} suaraAwal={SUARA_KARTU_ANGKLUNG} pesanSelesai={SELESAI_KARTU_ANGKLUNG} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DeretAngklungK4B3 };
