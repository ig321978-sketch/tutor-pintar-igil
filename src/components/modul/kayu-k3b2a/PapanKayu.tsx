"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_KAYU, KOLOM_INFO_KAYU, SELESAI_INFO_KAYU, SUARA_INFO_KAYU, TEMA_INFO_KAYU } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 2 Sub-Bab A: Papan Kayu. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function PapanKayuK3B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_KAYU} kolom={KOLOM_INFO_KAYU} tema={TEMA_INFO_KAYU} suaraAwal={SUARA_INFO_KAYU} pesanSelesai={SELESAI_INFO_KAYU} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { PapanKayuK3B2 };
