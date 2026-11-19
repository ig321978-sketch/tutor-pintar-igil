"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_TABEL, KOLOM_INFO_TABEL, SELESAI_INFO_TABEL, SUARA_INFO_TABEL, TEMA_INFO_TABEL } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 5 Sub-Bab B: Tabel Klub. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function TabelKlubK3B5({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_TABEL} kolom={KOLOM_INFO_TABEL} tema={TEMA_INFO_TABEL} suaraAwal={SUARA_INFO_TABEL} pesanSelesai={SELESAI_INFO_TABEL} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { TabelKlubK3B5 };
