"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_BANDUL, RINGKASAN_BANDUL, SELESAI_KARTU_BANDUL, SUARA_KARTU_BANDUL, TEMA_KARTU_BANDUL } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 3 Sub-Bab D: Rak Bandul. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function RakBandulK3B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_BANDUL} tema={TEMA_KARTU_BANDUL} ringkasan={RINGKASAN_BANDUL} suaraAwal={SUARA_KARTU_BANDUL} pesanSelesai={SELESAI_KARTU_BANDUL} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { RakBandulK3B3 };
