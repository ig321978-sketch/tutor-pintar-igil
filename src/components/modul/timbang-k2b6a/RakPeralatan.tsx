"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_TIMBANG, RINGKASAN_TIMBANG, SELESAI_KARTU_TIMBANG, SUARA_KARTU_TIMBANG, TEMA_KARTU_TIMBANG } from "./data-kartu";

/**
 * Mind-map Kelas 2 Bab 6 Sub-Bab A: Troli Peralatan. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di dua kartu pertama.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function RakPeralatan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_TIMBANG} tema={TEMA_KARTU_TIMBANG} ringkasan={RINGKASAN_TIMBANG} suaraAwal={SUARA_KARTU_TIMBANG} pesanSelesai={SELESAI_KARTU_TIMBANG} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
