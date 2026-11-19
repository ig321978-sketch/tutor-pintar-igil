"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_PERAHU, KOLOM_INFO_PERAHU, SELESAI_INFO_PERAHU, SUARA_INFO_PERAHU, TEMA_INFO_PERAHU } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab G: Daftar Perahu. Satu tabel lima baris dari kegiatan Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarPerahuK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_PERAHU} kolom={KOLOM_INFO_PERAHU} tema={TEMA_INFO_PERAHU} suaraAwal={SUARA_INFO_PERAHU} pesanSelesai={SELESAI_INFO_PERAHU} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarPerahuK4B1 };
