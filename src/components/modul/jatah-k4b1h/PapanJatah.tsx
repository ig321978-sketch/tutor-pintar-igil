"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_JATAH, RINGKASAN_JATAH, SELESAI_KARTU_JATAH, SUARA_KARTU_JATAH, TEMA_KARTU_JATAH } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab H: Papan Jatah. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function PapanJatahK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_JATAH} tema={TEMA_KARTU_JATAH} ringkasan={RINGKASAN_JATAH} suaraAwal={SUARA_KARTU_JATAH} pesanSelesai={SELESAI_KARTU_JATAH} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { PapanJatahK4B1 };
