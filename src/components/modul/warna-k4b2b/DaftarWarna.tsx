"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_WARNA, KOLOM_INFO_WARNA, SELESAI_INFO_WARNA, SUARA_INFO_WARNA, TEMA_INFO_WARNA } from "./data-kartu";

/**
 * Infografis K4 Bab 2 Sub-Bab B: Daftar Bak Warna. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarWarnaK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_WARNA} kolom={KOLOM_INFO_WARNA} tema={TEMA_INFO_WARNA} suaraAwal={SUARA_INFO_WARNA} pesanSelesai={SELESAI_INFO_WARNA} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarWarnaK4B2 };
