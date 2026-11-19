"use client";

import React from "react";
import PetaKartu from "../peta-kartu/PetaKartu";
import { KARTU_TIMBANG, RINGKASAN_TIMBANG, SELESAI_KARTU_TIMBANG, SUARA_KARTU_TIMBANG, TEMA_KARTU_TIMBANG } from "./data-kartu";

/**
 * Mind-map Kelas 3 Bab 3 Sub-Bab C: Keranjang Pakan. Sembilan kartu geser (Masalah, Cara, Hasil) dengan label pendek; satu kotak contoh di kartu pertama saja.
 * Hanya poin pelajaran. Bentuk dan perilaku di peta-kartu/PetaKartu.tsx.
 */
export default function KeranjangPakanK3B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <PetaKartu kartu={KARTU_TIMBANG} tema={TEMA_KARTU_TIMBANG} ringkasan={RINGKASAN_TIMBANG} suaraAwal={SUARA_KARTU_TIMBANG} pesanSelesai={SELESAI_KARTU_TIMBANG} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { KeranjangPakanK3B3 };
