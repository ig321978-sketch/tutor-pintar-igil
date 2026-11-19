"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_BOTOL, KOLOM_INFO_BOTOL, SELESAI_INFO_BOTOL, SUARA_INFO_BOTOL, TEMA_INFO_BOTOL } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 2 Sub-Bab B: Catatan Persediaan. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function CatatanPersediaanK3B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_BOTOL} kolom={KOLOM_INFO_BOTOL} tema={TEMA_INFO_BOTOL} suaraAwal={SUARA_INFO_BOTOL} pesanSelesai={SELESAI_INFO_BOTOL} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { CatatanPersediaanK3B2 };
