"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { daftarMisiK2Bab1 } from "./misi-k2bab1";
import { laporMisi } from "./misi-simulasi";
import SimulasiKotakKue from "./etalase-k2b1a/SimulasiKotakKue";
import { MISI_KOTAK } from "./etalase-k2b1a/data";
import type { KeadaanEtalase } from "./etalase-k2b1a/logika";
import SimulasiMejaKasir from "./kasir-k2b1b/SimulasiMejaKasir";
import { MISI_MEJA_KASIR } from "./kasir-k2b1b/data";
import type { KeadaanKasir } from "./kasir-k2b1b/logika";
import SimulasiMejaPesta from "./pesta-k2b1c/SimulasiMejaPesta";
import { MISI_PESTA } from "./pesta-k2b1c/data";
import type { KeadaanPesta } from "./pesta-k2b1c/logika";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 1 di dalam Materi (tahap 4 SMISCPA). Kue di Kantin   */
/* Sekolah: Sub-Bab A Kotak Kue, Sub-Bab B Meja Kasir, Sub-Bab C Meja Pesta. */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkahKotakKueA / langkahMejaKasirB / langkahMejaPestaC. */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const tampilMisi = (sub: string) => daftarMisiK2Bab1(sub).map(({ id, teks, wajib }) => ({ id, teks, wajib }));

/** Sub-Bab C (akhir bab): Meja Pesta. */
const langkahMejaPestaC = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Pesta",
  petunjuk: MAINKAN_DULU,
  misi: MISI_PESTA,
  misiDaftar: tampilMisi("C"),
  mode: "sentuh",
  render: (a) => <SimulasiMejaPesta speakGuru={a.speakGuru} onKeadaan={(k: KeadaanPesta) => laporMisi(daftarMisiK2Bab1("C"), k, a.capai)} />,
});

/** Sub-Bab B (tengah cerita): Meja Kasir. */
const langkahMejaKasirB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Kasir",
  petunjuk: MAINKAN_DULU,
  misi: MISI_MEJA_KASIR,
  misiDaftar: tampilMisi("B"),
  mode: "sentuh",
  render: (a) => <SimulasiMejaKasir speakGuru={a.speakGuru} onKeadaan={(k: KeadaanKasir) => laporMisi(daftarMisiK2Bab1("B"), k, a.capai)} />,
});

/** Sub-Bab A (awal cerita): Kotak Kue. */
const langkahKotakKueA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Kotak Kue",
  petunjuk: MAINKAN_DULU,
  misi: MISI_KOTAK,
  misiDaftar: tampilMisi("A"),
  mode: "sentuh",
  render: (a) => <SimulasiKotakKue speakGuru={a.speakGuru} onKeadaan={(k: KeadaanEtalase) => laporMisi(daftarMisiK2Bab1("A"), k, a.capai)} />,
});

const langkahK2Bab1 = (sub: string): LangkahSim[] => {
  if (sub === "B") return [langkahMejaKasirB()];
  if (sub === "C") return [langkahMejaPestaC()];
  return [langkahKotakKueA()];
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab1 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab1(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab1Materi({
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
      judulBab={`Bab 1 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab1(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
