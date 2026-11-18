"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { daftarMisiK2Bab2 } from "./misi-k2bab2";
import { laporMisi } from "./misi-simulasi";
import SimulasiKardusKiriman from "./gudang-k2b2a/SimulasiKardusKiriman";
import { MISI_KARDUS } from "./gudang-k2b2a/data";
import type { KeadaanGudang } from "./gudang-k2b2a/logika";
import SimulasiMejaStok from "./stok-k2b2b/SimulasiMejaStok";
import { MISI_STOK } from "./stok-k2b2b/data";
import type { KeadaanStok } from "./stok-k2b2b/logika";
import SimulasiMejaPesananBesar from "./pembukaan-k2b2c/SimulasiMejaPesananBesar";
import { MISI_PESANAN } from "./pembukaan-k2b2c/data";
import type { KeadaanPembukaan } from "./pembukaan-k2b2c/logika";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 2 di dalam Materi (tahap 4 SMISCPA). Toko Seragam    */
/* dan Alat Tulis Sekolah: Sub-Bab A Kardus Kiriman, Sub-Bab B Meja Stok,    */
/* Sub-Bab C Meja Pesanan Besar.                                             */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkahKardusA / langkahMejaStokB / */
/* langkahMejaPesananC (impor komponen dan data dari folder masing-masing).  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const tampilMisi = (sub: string) => daftarMisiK2Bab2(sub).map(({ id, teks, wajib }) => ({ id, teks, wajib }));

/** Sub-Bab C (akhir bab): Meja Pesanan Besar. */
const langkahMejaPesananC = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Pesanan Besar",
  petunjuk: MAINKAN_DULU,
  misi: MISI_PESANAN,
  misiDaftar: tampilMisi("C"),
  mode: "sentuh",
  render: (a) => <SimulasiMejaPesananBesar speakGuru={a.speakGuru} onKeadaan={(k: KeadaanPembukaan) => laporMisi(daftarMisiK2Bab2("C"), k, a.capai)} />,
});

/** Sub-Bab B (tengah cerita): Meja Stok. */
const langkahMejaStokB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Stok",
  petunjuk: MAINKAN_DULU,
  misi: MISI_STOK,
  misiDaftar: tampilMisi("B"),
  mode: "sentuh",
  render: (a) => <SimulasiMejaStok speakGuru={a.speakGuru} onKeadaan={(k: KeadaanStok) => laporMisi(daftarMisiK2Bab2("B"), k, a.capai)} />,
});

/** Sub-Bab A (awal cerita): Kardus Kiriman. */
const langkahKardusA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Kardus Kiriman",
  petunjuk: MAINKAN_DULU,
  misi: MISI_KARDUS,
  misiDaftar: tampilMisi("A"),
  mode: "sentuh",
  render: (a) => <SimulasiKardusKiriman speakGuru={a.speakGuru} onKeadaan={(k: KeadaanGudang) => laporMisi(daftarMisiK2Bab2("A"), k, a.capai)} />,
});

const langkahK2Bab2 = (sub: string): LangkahSim[] => {
  if (sub === "B") return [langkahMejaStokB()];
  if (sub === "C") return [langkahMejaPesananC()];
  return [langkahKardusA()];
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab2 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab2(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab2Materi({
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
      judulBab={`Bab 2 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab2(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
