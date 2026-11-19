"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_LINTASAN, RINGKASAN_LINTASAN, SELESAI_KARTU_LINTASAN, SUARA_KARTU_LINTASAN, TEMA_KARTU_LINTASAN } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 4 Sub-Bab C: Peta Lintasan. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function PetaLintasanK3B4({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_LINTASAN} tema={TEMA_KARTU_LINTASAN} ringkasan={RINGKASAN_LINTASAN} suaraAwal={SUARA_KARTU_LINTASAN} pesanSelesai={SELESAI_KARTU_LINTASAN} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { PetaLintasanK3B4 };
