"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_RESEPSI, KOLOM_INFO_RESEPSI, SELESAI_INFO_RESEPSI, SUARA_INFO_RESEPSI, TEMA_INFO_RESEPSI } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab E: Daftar Resepsi. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarResepsiK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_RESEPSI} kolom={KOLOM_INFO_RESEPSI} tema={TEMA_INFO_RESEPSI} suaraAwal={SUARA_INFO_RESEPSI} pesanSelesai={SELESAI_INFO_RESEPSI} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarResepsiK4B1 };
