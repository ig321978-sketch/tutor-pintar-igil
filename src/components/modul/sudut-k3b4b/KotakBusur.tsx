"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_SUDUT, RINGKASAN_SUDUT, SELESAI_KARTU_SUDUT, SUARA_KARTU_SUDUT, TEMA_KARTU_SUDUT } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 4 Sub-Bab B: Kotak Busur. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function KotakBusurK3B4({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_SUDUT} tema={TEMA_KARTU_SUDUT} ringkasan={RINGKASAN_SUDUT} suaraAwal={SUARA_KARTU_SUDUT} pesanSelesai={SELESAI_KARTU_SUDUT} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { KotakBusurK3B4 };
