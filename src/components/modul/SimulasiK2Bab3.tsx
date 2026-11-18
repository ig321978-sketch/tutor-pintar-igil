"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { daftarMisiK2Bab3 } from "./misi-k2bab3";
import { laporMisi } from "./misi-simulasi";
import SimulasiPetakUbin from "./ubin-k2b3a/SimulasiPetakUbin";
import { MISI_PETAK } from "./ubin-k2b3a/data-peta";
import type { KeadaanUbin } from "./ubin-k2b3a/logika";
import SimulasiPapanPuzzle from "./puzzle-k2b3b/SimulasiPapanPuzzle";
import { MISI_PAPAN_TEKS } from "./puzzle-k2b3b/data";
import type { KeadaanPuzzle } from "./puzzle-k2b3b/logika";
import SimulasiGudangMainan from "./gudang-k2b3c/SimulasiGudangMainan";
import { MISI_GUDANG } from "./gudang-k2b3c/data";
import type { KeadaanGudang } from "./gudang-k2b3c/logika";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 3 di dalam Materi (tahap 4 SMISCPA). Taman Bermain   */
/* Sekolah: Sub-Bab A Petak Ubin, Sub-Bab B Papan Puzzle, Sub-Bab C Gudang   */
/* Mainan. KERANGKA: agen Sub-Bab mengisi fungsi langkahPetakUbinA /         */
/* langkahPapanPuzzleB / langkahGudangMainanC (impor dari folder miliknya).  */
/* ======================================================================== */

/** Sub-Bab C (akhir bab): Gudang Mainan. */
const langkahGudangMainanC = (): LangkahSim => ({
  metode: "PhET",
  sub: "Gudang Mainan",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_GUDANG,
  misiDaftar: daftarMisiK2Bab3("C").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiGudangMainan speakGuru={a.speakGuru} onKeadaan={(k: KeadaanGudang) => laporMisi(daftarMisiK2Bab3("C"), k, a.capai)} />,
});

/** Sub-Bab B (tengah cerita): Papan Puzzle. */
const langkahPapanPuzzleB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Papan Puzzle",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_PAPAN_TEKS,
  misiDaftar: daftarMisiK2Bab3("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPapanPuzzle speakGuru={a.speakGuru} onKeadaan={(k: KeadaanPuzzle) => laporMisi(daftarMisiK2Bab3("B"), k, a.capai)} />,
});

/** Sub-Bab A (awal cerita): Petak Ubin. */
const langkahPetakUbinA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Petak Ubin",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_PETAK,
  misiDaftar: daftarMisiK2Bab3("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPetakUbin speakGuru={a.speakGuru} onKeadaan={(k: KeadaanUbin) => laporMisi(daftarMisiK2Bab3("A"), k, a.capai)} />,
});

const langkahK2Bab3 = (sub: string): LangkahSim[] => {
  if (sub === "B") return [langkahPapanPuzzleB()];
  if (sub === "C") return [langkahGudangMainanC()];
  return [langkahPetakUbinA()];
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab3 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab3(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab3Materi({
  sub,
  speakGuru,
  onSelesai,
  teksAkhir,
}: {
  sub: string;
  speakGuru: (t: string) => void;
  onSelesai: () => void;
  teksAkhir: string;
}) {
  const huruf = ["A", "B", "C"].includes(sub) ? sub : "A";
  return (
    <SimulasiAlur
      judulBab={`Bab 3 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab3(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
