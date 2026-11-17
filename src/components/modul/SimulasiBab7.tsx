"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { daftarMisiBab7 } from "./misi-bab7";
import { laporMisi } from "./misi-simulasi";
import SimulasiPapanLantai from "./lantai-k1b7b/SimulasiPapanLantai";
import { MISI_LANTAI } from "./lantai-k1b7b/data";
import type { KeadaanLantai } from "./lantai-k1b7b/logika";
import SimulasiMejaTukang from "./tiang-k1b7a/SimulasiMejaTukang";
import { MISI_MEJA } from "./tiang-k1b7a/data";
import type { KeadaanTukang } from "./tiang-k1b7a/logika";

/* ======================================================================== */
/* Simulasi Bab 7 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Rumah Pohon Abang: Sub-Bab A Meja Tukang, Sub-Bab B       */
/* Papan Lantai. Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak */
/* memilih "Lewati misi". Simulasi tidak memberi Poin Kualifikasi.          */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const tampilMisi = (sub: string) => daftarMisiBab7(sub).map(({ id, teks, wajib }) => ({ id, teks, wajib }));

/** Sub-Bab B (penutup bab): Misi Papan Lantai, Simulasi Papan Lantai (lantai-k1b7b). */
const langkahLantaiB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Papan Lantai",
  petunjuk: MAINKAN_DULU,
  misi: MISI_LANTAI,
  misiDaftar: tampilMisi("B"),
  mode: "sentuh",
  render: (a) => <SimulasiPapanLantai speakGuru={a.speakGuru} onKeadaan={(k: KeadaanLantai) => laporMisi(daftarMisiBab7("B"), k, a.capai)} />,
});

/** Sub-Bab A (awal cerita Rumah Pohon Abang): Misi Rumah Pohon bagian satu, Simulasi Meja Tukang (tiang-k1b7a). */
const langkahTukangA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Tukang",
  petunjuk: MAINKAN_DULU,
  misi: MISI_MEJA,
  misiDaftar: tampilMisi("A"),
  mode: "sentuh",
  render: (a) => <SimulasiMejaTukang speakGuru={a.speakGuru} onKeadaan={(k: KeadaanTukang) => laporMisi(daftarMisiBab7("A"), k, a.capai)} />,
});

const langkahBab7 = (sub: string): LangkahSim[] => {
  if (sub === "A") return [langkahTukangA()];
  return [langkahLantaiB()];
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalBab7 = (sub: string): string => `Simulasi 1. Misi: ${langkahBab7(sub)[0].misi ?? ""}`;

export default function SimulasiBab7Materi({
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
  return <SimulasiAlur judulBab={`Bab 7 · Sub-Bab ${huruf}`} langkah={langkahBab7(sub)} speakGuru={speakGuru} onSelesai={onSelesai} teksAkhir={teksAkhir} dalamPopup />;
}