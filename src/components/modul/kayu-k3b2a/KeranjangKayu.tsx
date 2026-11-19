"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_KAYU, RINGKASAN_KAYU, SELESAI_KARTU_KAYU, SUARA_KARTU_KAYU, TEMA_KARTU_KAYU } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 2 Sub-Bab A: Keranjang Kayu. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function KeranjangKayuK3B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_KAYU} tema={TEMA_KARTU_KAYU} ringkasan={RINGKASAN_KAYU} suaraAwal={SUARA_KARTU_KAYU} pesanSelesai={SELESAI_KARTU_KAYU} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { KeranjangKayuK3B2 };
