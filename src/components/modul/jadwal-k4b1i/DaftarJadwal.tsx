"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_JADWAL, KOLOM_INFO_JADWAL, SELESAI_INFO_JADWAL, SUARA_INFO_JADWAL, TEMA_INFO_JADWAL } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab I: Daftar Jadwal. Satu tabel lima baris dari kejadian Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarJadwalK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_JADWAL} kolom={KOLOM_INFO_JADWAL} tema={TEMA_INFO_JADWAL} suaraAwal={SUARA_INFO_JADWAL} pesanSelesai={SELESAI_INFO_JADWAL} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
export { DaftarJadwalK4B1 };
