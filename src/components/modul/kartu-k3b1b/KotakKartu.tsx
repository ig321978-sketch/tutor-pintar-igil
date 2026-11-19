"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_KARTU, RINGKASAN_KARTU, SELESAI_KARTU_KARTU, SUARA_KARTU_KARTU, TEMA_KARTU_KARTU } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 1 Sub-Bab B: Kotak Kartu. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function KotakKartu({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_KARTU} tema={TEMA_KARTU_KARTU} ringkasan={RINGKASAN_KARTU} suaraAwal={SUARA_KARTU_KARTU} pesanSelesai={SELESAI_KARTU_KARTU} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { KotakKartu as KotakKartuK3B1 };
