"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_KURSI, KOLOM_INFO_KURSI, SELESAI_INFO_KURSI, SUARA_INFO_KURSI, TEMA_INFO_KURSI } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 3 Sub-Bab B: Daftar Kursi. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarKursiK4B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_KURSI} kolom={KOLOM_INFO_KURSI} tema={TEMA_INFO_KURSI} suaraAwal={SUARA_INFO_KURSI} pesanSelesai={SELESAI_INFO_KURSI} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarKursiK4B3 };
