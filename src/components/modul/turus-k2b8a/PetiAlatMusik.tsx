"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_TURUS, RINGKASAN_TURUS, SELESAI_KARTU_TURUS, SUARA_KARTU_TURUS, TEMA_KARTU_TURUS } from "./data-kartu";

/**
 * Mind-map Kelas 2 Bab 8 Sub-Bab A: Peti Alat Musik. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function PetiAlatMusik({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_TURUS} tema={TEMA_KARTU_TURUS} ringkasan={RINGKASAN_TURUS} suaraAwal={SUARA_KARTU_TURUS} pesanSelesai={SELESAI_KARTU_TURUS} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
