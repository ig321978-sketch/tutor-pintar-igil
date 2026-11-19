"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_UKUR, RINGKASAN_UKUR, SELESAI_KARTU_UKUR, SUARA_KARTU_UKUR, TEMA_KARTU_UKUR } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 3 Sub-Bab A: Papan Nama Kandang. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function PapanNamaKandangK3B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_UKUR} tema={TEMA_KARTU_UKUR} ringkasan={RINGKASAN_UKUR} suaraAwal={SUARA_KARTU_UKUR} pesanSelesai={SELESAI_KARTU_UKUR} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { PapanNamaKandangK3B3 };
