"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_TAMBAH, RINGKASAN_TAMBAH, SELESAI_KARTU_TAMBAH, SUARA_KARTU_TAMBAH, TEMA_KARTU_TAMBAH } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 1 Sub-Bab D: Nampan Kue. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function NampanKue({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_TAMBAH} tema={TEMA_KARTU_TAMBAH} ringkasan={RINGKASAN_TAMBAH} suaraAwal={SUARA_KARTU_TAMBAH} pesanSelesai={SELESAI_KARTU_TAMBAH} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
