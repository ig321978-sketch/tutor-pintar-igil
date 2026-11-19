"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_BOTOL, RINGKASAN_BOTOL, SELESAI_KARTU_BOTOL, SUARA_KARTU_BOTOL, TEMA_KARTU_BOTOL } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 2 Sub-Bab B: Pos Jaga. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function PosJagaK3B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_BOTOL} tema={TEMA_KARTU_BOTOL} ringkasan={RINGKASAN_BOTOL} suaraAwal={SUARA_KARTU_BOTOL} pesanSelesai={SELESAI_KARTU_BOTOL} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { PosJagaK3B2 };
