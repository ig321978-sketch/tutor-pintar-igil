"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_WARNA, RINGKASAN_WARNA, SELESAI_KARTU_WARNA, SUARA_KARTU_WARNA, TEMA_KARTU_WARNA } from "./data-kartu";

/**
 * Mind-map K4 Bab 2 Sub-Bab B: Bak Warna Pak Joyo. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function BakWarnaK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_WARNA} tema={TEMA_KARTU_WARNA} ringkasan={RINGKASAN_WARNA} suaraAwal={SUARA_KARTU_WARNA} pesanSelesai={SELESAI_KARTU_WARNA} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { BakWarnaK4B2 };
