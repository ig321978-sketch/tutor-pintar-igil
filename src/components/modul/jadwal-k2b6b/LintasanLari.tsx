"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_JADWAL, RINGKASAN_JADWAL, SELESAI_KARTU_JADWAL, SUARA_KARTU_JADWAL, TEMA_KARTU_JADWAL } from "./data-kartu";

/**
 * Mind-map Kelas 2 Bab 6 Sub-Bab B: Lintasan Lari. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di dua kartu pertama.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function LintasanLari({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_JADWAL} tema={TEMA_KARTU_JADWAL} ringkasan={RINGKASAN_JADWAL} suaraAwal={SUARA_KARTU_JADWAL} pesanSelesai={SELESAI_KARTU_JADWAL} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
