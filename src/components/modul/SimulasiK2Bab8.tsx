"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { daftarMisiK2Bab8 } from "./misi-k2bab8";
import { laporMisi as laporMisiCatat, laporMisi as laporMisiLayar } from "./misi-simulasi";
import SimulasiMejaCatat from "./turus-k2b8a/SimulasiMejaCatat";
import { MISI_CATAT_TEKS } from "./turus-k2b8a/data-peta";
import type { KeadaanCatat } from "./turus-k2b8a/logika";
import SimulasiPapanLayar from "./gambar-k2b8b/SimulasiPapanLayar";
import { MISI_LAYAR_TEKS } from "./gambar-k2b8b/data-sim";
import type { KeadaanLayar } from "./gambar-k2b8b/logika";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 8 di dalam Materi (tahap 4 SMISCPA). Pentas Seni:    */
/* Sub-Bab A Meja Catat, Sub-Bab B Papan Layar.                              */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkahMejaCatatA /                 */
/* langkahPapanLayarB (impor dari folder miliknya; render sekarang null).    */
/* ======================================================================== */

/** Sub-Bab B (akhir bab): Papan Layar. */
const langkahPapanLayarB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Papan Layar",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_LAYAR_TEKS,
  misiDaftar: daftarMisiK2Bab8("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPapanLayar speakGuru={a.speakGuru} onKeadaan={(k: KeadaanLayar) => laporMisiLayar(daftarMisiK2Bab8("B"), k, a.capai)} />,
});

/** Sub-Bab A (awal cerita): Meja Catat. */
const langkahMejaCatatA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Catat",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_CATAT_TEKS,
  misiDaftar: daftarMisiK2Bab8("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMejaCatat speakGuru={a.speakGuru} onKeadaan={(k: KeadaanCatat) => laporMisiCatat(daftarMisiK2Bab8("A"), k, a.capai)} />,
});

const langkahK2Bab8 = (sub: string): LangkahSim[] => {
  if (sub === "B") return [langkahPapanLayarB()];
  return [langkahMejaCatatA()];
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab8 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab8(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab8Materi({
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
  const huruf = ["A", "B"].includes(sub) ? sub : "A";
  return (
    <SimulasiAlur
      judulBab={`Bab 8 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab8(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
