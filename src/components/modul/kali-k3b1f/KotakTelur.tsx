"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_KALI, RINGKASAN_KALI, SELESAI_KARTU_KALI, SUARA_KARTU_KALI, TEMA_KARTU_KALI } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 1 Sub-Bab F: Rak telur perkalian. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export function KotakTelurK3B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_KALI} tema={TEMA_KARTU_KALI} ringkasan={RINGKASAN_KALI} suaraAwal={SUARA_KARTU_KALI} pesanSelesai={SELESAI_KARTU_KALI} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export default KotakTelurK3B1;
