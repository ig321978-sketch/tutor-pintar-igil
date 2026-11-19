"use client";

import React from "react";
import InfografisKartu from "../peta-kartu/InfografisKartu";
import { BARIS_INFO_TAMBAH, KOLOM_INFO_TAMBAH, SELESAI_INFO_TAMBAH, SUARA_INFO_TAMBAH, TEMA_INFO_TAMBAH } from "./data-kartu";

/**
 * Infografis Kelas 3 Bab 1 Sub-Bab D: Daftar Pesanan. Satu tabel lima baris dari data Story (kolom sejajar, label tiap baris di bawah barisnya dengan posisi kolom acak, satu baris contoh penuh).
 * Bentuk dan perilaku di peta-kartu/InfografisKartu.tsx.
 */
export default function DaftarPesanan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  return <InfografisKartu baris={BARIS_INFO_TAMBAH} kolom={KOLOM_INFO_TAMBAH} tema={TEMA_INFO_TAMBAH} suaraAwal={SUARA_INFO_TAMBAH} pesanSelesai={SELESAI_INFO_TAMBAH} speakGuru={speakGuru} onLanjut={onLanjut} teksLanjut={teksLanjut} />;
}
