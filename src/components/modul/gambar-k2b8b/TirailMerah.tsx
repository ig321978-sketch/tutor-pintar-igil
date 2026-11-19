"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_GAMBAR, RINGKASAN_GAMBAR, SELESAI_KARTU_GAMBAR, SUARA_KARTU_GAMBAR, TEMA_KARTU_GAMBAR } from "./data-kartu";

/**
 * Mind-map Kelas 2 Bab 8 Sub-Bab B: Tirai Merah. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function TirailMerah({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_GAMBAR} tema={TEMA_KARTU_GAMBAR} ringkasan={RINGKASAN_GAMBAR} suaraAwal={SUARA_KARTU_GAMBAR} pesanSelesai={SELESAI_KARTU_GAMBAR} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
