"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_RESEPSI, RINGKASAN_RESEPSI, SELESAI_KARTU_RESEPSI, SUARA_KARTU_RESEPSI, TEMA_KARTU_RESEPSI } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 1 Sub-Bab E: Meja Resepsi. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function MejaResepsiK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_RESEPSI} tema={TEMA_KARTU_RESEPSI} ringkasan={RINGKASAN_RESEPSI} suaraAwal={SUARA_KARTU_RESEPSI} pesanSelesai={SELESAI_KARTU_RESEPSI} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { MejaResepsiK4B1 };
