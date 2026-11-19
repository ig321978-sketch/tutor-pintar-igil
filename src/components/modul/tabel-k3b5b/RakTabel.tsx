"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_TABEL, RINGKASAN_TABEL, SELESAI_KARTU_TABEL, SUARA_KARTU_TABEL, TEMA_KARTU_TABEL } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 5 Sub-Bab B: Tabel Klub Sepeda (rak tabel). Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function RakTabelK3B5({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_TABEL} tema={TEMA_KARTU_TABEL} ringkasan={RINGKASAN_TABEL} suaraAwal={SUARA_KARTU_TABEL} pesanSelesai={SELESAI_KARTU_TABEL} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { RakTabelK3B5 };
