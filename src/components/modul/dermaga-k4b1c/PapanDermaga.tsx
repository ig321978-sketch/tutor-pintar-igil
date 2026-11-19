"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_DERMAGA, RINGKASAN_DERMAGA, SELESAI_KARTU_DERMAGA, SUARA_KARTU_DERMAGA, TEMA_KARTU_DERMAGA } from "./data-kartu";

/**
 * Mind-map K4 Bab 1 Sub-Bab C: Papan Dermaga Kak Tiara. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function PapanDermagaK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_DERMAGA} tema={TEMA_KARTU_DERMAGA} ringkasan={RINGKASAN_DERMAGA} suaraAwal={SUARA_KARTU_DERMAGA} pesanSelesai={SELESAI_KARTU_DERMAGA} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { PapanDermagaK4B1 };
