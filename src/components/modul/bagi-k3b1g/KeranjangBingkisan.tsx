"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_BAGI, RINGKASAN_BAGI, SELESAI_KARTU_BAGI, SUARA_KARTU_BAGI, TEMA_KARTU_BAGI } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 1 Sub-Bab G: Keranjang Bingkisan. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function KeranjangBingkisan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_BAGI} tema={TEMA_KARTU_BAGI} ringkasan={RINGKASAN_BAGI} suaraAwal={SUARA_KARTU_BAGI} pesanSelesai={SELESAI_KARTU_BAGI} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { KeranjangBingkisan as KeranjangBingkisanK3B1 };
