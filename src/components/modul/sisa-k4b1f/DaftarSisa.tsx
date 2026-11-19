"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_SISA, KOLOM_INFO_SISA, SELESAI_INFO_SISA, SUARA_INFO_SISA, TEMA_INFO_SISA } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab F: Daftar Sisa. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarSisaK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_SISA} kolom={KOLOM_INFO_SISA} tema={TEMA_INFO_SISA} suaraAwal={SUARA_INFO_SISA} pesanSelesai={SELESAI_INFO_SISA} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarSisaK4B1 };
