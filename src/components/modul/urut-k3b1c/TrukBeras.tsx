"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_URUT, RINGKASAN_URUT, SELESAI_KARTU_URUT, SUARA_KARTU_URUT, TEMA_KARTU_URUT } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 1 Sub-Bab C: Truk Beras. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function TrukBeras({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_URUT} tema={TEMA_KARTU_URUT} ringkasan={RINGKASAN_URUT} suaraAwal={SUARA_KARTU_URUT} pesanSelesai={SELESAI_KARTU_URUT} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
