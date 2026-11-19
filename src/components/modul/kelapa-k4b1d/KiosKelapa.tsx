"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_KELAPA, RINGKASAN_KELAPA, SELESAI_KARTU_KELAPA, SUARA_KARTU_KELAPA, TEMA_KARTU_KELAPA } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab D: Kios Pak Darwis. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function KiosKelapaK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_KELAPA} tema={TEMA_KARTU_KELAPA} ringkasan={RINGKASAN_KELAPA} suaraAwal={SUARA_KARTU_KELAPA} pesanSelesai={SELESAI_KARTU_KELAPA} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { KiosKelapaK4B1 };
