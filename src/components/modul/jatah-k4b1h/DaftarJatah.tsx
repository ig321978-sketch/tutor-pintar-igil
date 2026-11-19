"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_JATAH, KOLOM_INFO_JATAH, SELESAI_INFO_JATAH, SUARA_INFO_JATAH, TEMA_INFO_JATAH } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab H: Daftar Jatah. Satu tabel lima baris (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarJatahK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_JATAH} kolom={KOLOM_INFO_JATAH} tema={TEMA_INFO_JATAH} suaraAwal={SUARA_INFO_JATAH} pesanSelesai={SELESAI_INFO_JATAH} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarJatahK4B1 };
