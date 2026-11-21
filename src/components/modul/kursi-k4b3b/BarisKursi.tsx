"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_KURSI, RINGKASAN_KURSI, SELESAI_KARTU_KURSI, SUARA_KARTU_KURSI, TEMA_KARTU_KURSI } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 3 Sub-Bab B: Barisan Kursi. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function BarisKursiK4B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_KURSI} tema={TEMA_KARTU_KURSI} ringkasan={RINGKASAN_KURSI} suaraAwal={SUARA_KARTU_KURSI} pesanSelesai={SELESAI_KARTU_KURSI} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { BarisKursiK4B3 };
