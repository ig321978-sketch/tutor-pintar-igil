"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_HANDUK, RINGKASAN_HANDUK, SELESAI_KARTU_HANDUK, SUARA_KARTU_HANDUK, TEMA_KARTU_HANDUK } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab B: Gudang Handuk (peta tempat angka). Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function GudangHanduk({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_HANDUK} tema={TEMA_KARTU_HANDUK} ringkasan={RINGKASAN_HANDUK} suaraAwal={SUARA_KARTU_HANDUK} pesanSelesai={SELESAI_KARTU_HANDUK} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { GudangHanduk as GudangHandukK4B1 };
