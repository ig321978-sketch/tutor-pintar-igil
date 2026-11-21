"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_PAMERAN, KOLOM_INFO_PAMERAN, SELESAI_INFO_PAMERAN, SUARA_INFO_PAMERAN, TEMA_INFO_PAMERAN } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 2 Sub-Bab E: Daftar Pameran. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarPameranK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_PAMERAN} kolom={KOLOM_INFO_PAMERAN} tema={TEMA_INFO_PAMERAN} suaraAwal={SUARA_INFO_PAMERAN} pesanSelesai={SELESAI_INFO_PAMERAN} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarPameranK4B2 };
