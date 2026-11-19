"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_TIMBANG, KOLOM_INFO_TIMBANG, SELESAI_INFO_TIMBANG, SUARA_INFO_TIMBANG, TEMA_INFO_TIMBANG } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 3 Sub-Bab C: Catatan Berat. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function CatatanBeratK3B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_TIMBANG} kolom={KOLOM_INFO_TIMBANG} tema={TEMA_INFO_TIMBANG} suaraAwal={SUARA_INFO_TIMBANG} pesanSelesai={SELESAI_INFO_TIMBANG} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { CatatanBeratK3B3 };
