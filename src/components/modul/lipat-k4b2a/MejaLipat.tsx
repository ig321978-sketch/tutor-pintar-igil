"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_LIPAT, RINGKASAN_LIPAT, SELESAI_KARTU_LIPAT, SUARA_KARTU_LIPAT, TEMA_KARTU_LIPAT } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 2 Sub-Bab A: Meja Lipat. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function MejaLipatK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_LIPAT} tema={TEMA_KARTU_LIPAT} ringkasan={RINGKASAN_LIPAT} suaraAwal={SUARA_KARTU_LIPAT} pesanSelesai={SELESAI_KARTU_LIPAT} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { MejaLipatK4B2 };
