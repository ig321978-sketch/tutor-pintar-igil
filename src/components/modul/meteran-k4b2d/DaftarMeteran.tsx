"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_METERAN, KOLOM_INFO_METERAN, SELESAI_INFO_METERAN, SUARA_INFO_METERAN, TEMA_INFO_METERAN } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 2 Sub-Bab D: Daftar Meteran. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarMeteranK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_METERAN} kolom={KOLOM_INFO_METERAN} tema={TEMA_INFO_METERAN} suaraAwal={SUARA_INFO_METERAN} pesanSelesai={SELESAI_INFO_METERAN} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarMeteranK4B2 };
