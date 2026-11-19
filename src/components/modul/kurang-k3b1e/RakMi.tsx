"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_KURANG, RINGKASAN_KURANG, SELESAI_KARTU_KURANG, SUARA_KARTU_KURANG, TEMA_KARTU_KURANG } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 1 Sub-Bab E: Rak Mi. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function RakMi({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_KURANG} tema={TEMA_KARTU_KURANG} ringkasan={RINGKASAN_KURANG} suaraAwal={SUARA_KARTU_KURANG} pesanSelesai={SELESAI_KARTU_KURANG} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
