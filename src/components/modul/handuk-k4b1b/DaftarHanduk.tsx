"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_HANDUK, KOLOM_INFO_HANDUK, SELESAI_INFO_HANDUK, SUARA_INFO_HANDUK, TEMA_INFO_HANDUK } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab B: Daftar Handuk (tabel tempat angka). Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarHanduk({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_HANDUK} kolom={KOLOM_INFO_HANDUK} tema={TEMA_INFO_HANDUK} suaraAwal={SUARA_INFO_HANDUK} pesanSelesai={SELESAI_INFO_HANDUK} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarHanduk as DaftarHandukK4B1 };
