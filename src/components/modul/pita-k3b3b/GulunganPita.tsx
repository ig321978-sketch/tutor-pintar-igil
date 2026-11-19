"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_PITA, RINGKASAN_PITA, SELESAI_KARTU_PITA, SUARA_KARTU_PITA, TEMA_KARTU_PITA } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 3 Sub-Bab B: Gulungan Pita. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function GulunganPitaK3B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_PITA} tema={TEMA_KARTU_PITA} ringkasan={RINGKASAN_PITA} suaraAwal={SUARA_KARTU_PITA} pesanSelesai={SELESAI_KARTU_PITA} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { GulunganPitaK3B3 };
