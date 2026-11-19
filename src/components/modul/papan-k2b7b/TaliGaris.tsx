"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_PAPAN, RINGKASAN_PAPAN, SELESAI_KARTU_PAPAN, SUARA_KARTU_PAPAN, TEMA_KARTU_PAPAN } from "./data-kartu";

/**
 * Mind-map Kelas 2 Bab 7 Sub-Bab B: Tali Garis. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function TaliGaris({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_PAPAN} tema={TEMA_KARTU_PAPAN} ringkasan={RINGKASAN_PAPAN} suaraAwal={SUARA_KARTU_PAPAN} pesanSelesai={SELESAI_KARTU_PAPAN} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
