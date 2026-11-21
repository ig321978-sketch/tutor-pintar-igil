"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_JAHIT, RINGKASAN_JAHIT, SELESAI_KARTU_JAHIT, SUARA_KARTU_JAHIT, TEMA_KARTU_JAHIT } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 2 Sub-Bab C: Meja Jahit. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function MejaJahitK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_JAHIT} tema={TEMA_KARTU_JAHIT} ringkasan={RINGKASAN_JAHIT} suaraAwal={SUARA_KARTU_JAHIT} pesanSelesai={SELESAI_KARTU_JAHIT} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { MejaJahitK4B2 };
