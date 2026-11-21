"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_METERAN, RINGKASAN_METERAN, SELESAI_KARTU_METERAN, SUARA_KARTU_METERAN, TEMA_KARTU_METERAN } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 2 Sub-Bab D: Meteran Pak Bagas. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function MeteranKainK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_METERAN} tema={TEMA_KARTU_METERAN} ringkasan={RINGKASAN_METERAN} suaraAwal={SUARA_KARTU_METERAN} pesanSelesai={SELESAI_KARTU_METERAN} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { MeteranKainK4B2 };
