"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_UKUR, KOLOM_INFO_UKUR, SELESAI_INFO_UKUR, SUARA_INFO_UKUR, TEMA_INFO_UKUR } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 3 Sub-Bab A: Daftar Ukuran. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarUkuranK3B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_UKUR} kolom={KOLOM_INFO_UKUR} tema={TEMA_INFO_UKUR} suaraAwal={SUARA_INFO_UKUR} pesanSelesai={SELESAI_INFO_UKUR} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarUkuranK3B3 };
