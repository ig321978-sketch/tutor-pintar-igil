"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiTambah from "./SimulasiTambah";
import SimulasiMesinTambah from "./SimulasiMesinTambah";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB2 } from "./skenario-kelas1";

/* ======================================================================== */
/* Simulasi Bab 2 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Satu simulasi per layar, tiap simulasi diawali satu Misi. */
/* Laboratorium Penjumlahan dipakai ulang tiap sub-bab, tetapi hanya        */
/* membuka alat yang sudah diajarkan sampai sub-bab itu:                    */
/*   Sub-Bab A (Cerita Penjumlahan): benda, bingkai sepuluh, kalimat; lalu  */
/*     Mesin Tambah yang melatih urutan gabung dulu, baru jawab.            */
/*   Sub-Bab B (Berbagai Cara): dua lab. Pasangan: benda, bagan, tukar      */
/*     tempat. Hitung maju dan sepuluh: garis bilangan dan bingkai.         */
/*   Sub-Bab C (Soal Cerita): lab pemeriksa (benda, garis, tukar tempat),   */
/*     lalu Kantin Sekolah yang merangkum soal cerita.                      */
/* Tombol LANJUTKAN aktif setelah simulasinya disentuh sekali (semua mode   */
/* "sentuh"), supaya tahap ini ringan dan tidak menahan anak.               */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  kalimat: "Tekan plus pada kelompok biru. Lihat kalimat penjumlahannya ikut berubah.",
  mesin: "Tekan Terima pesanan. Lalu isi Kotak A sesuai pesanan.",
  tukar: "Tekan Tukar tempat. Lihat jumlahnya, apakah berubah?",
  maju: "Tekan plus pada kelompok biru. Lihat lompatan di garis bilangan.",
  periksa: "Hitung maju dari bilangan merah di garis bilangan. Cocokkah dengan jumlahnya?",
  kantin: "Tekan Ayo ke kantin! Lalu bantu Rani menghitung kuenya.",
} as const;

const langkahBab2 = (sub: string): LangkahSim[] => {
  switch (sub) {
    case "B":
      return [
        {
          metode: "PhET",
          sub: "Laboratorium Penjumlahan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.tukar,
          mode: "sentuh",
          render: (a) => <SimulasiTambah speakGuru={a.speakGuru} tampil={["benda", "kalimat", "bagan", "tukar"]} />,
        },
        {
          metode: "PhET",
          sub: "Hitung Maju dan Sepuluh",
          petunjuk: MAINKAN_DULU,
          misi: MISI.maju,
          mode: "sentuh",
          render: (a) => <SimulasiTambah speakGuru={a.speakGuru} tampil={["kalimat", "garis", "bingkai"]} />,
        },
      ];
    case "C":
      return [
        {
          metode: "PhET",
          sub: "Periksa Jawabanmu",
          petunjuk: MAINKAN_DULU,
          misi: MISI.periksa,
          mode: "sentuh",
          render: (a) => <SimulasiTambah speakGuru={a.speakGuru} tampil={["benda", "kalimat", "garis", "tukar"]} />,
        },
        {
          metode: "Skenario",
          sub: "Kantin Sekolah",
          petunjuk: MAINKAN_DULU,
          misi: MISI.kantin,
          mode: "sentuh",
          render: (a) => <SimulasiSkenario def={SKENARIO_BAB2} speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
        },
      ];
    default:
      return [
        {
          metode: "PhET",
          sub: "Laboratorium Penjumlahan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.kalimat,
          mode: "sentuh",
          render: (a) => <SimulasiTambah speakGuru={a.speakGuru} tampil={["benda", "kalimat", "bingkai"]} />,
        },
        {
          metode: "Mesin keadaan",
          sub: "Mesin Tambah",
          petunjuk: MAINKAN_DULU,
          misi: MISI.mesin,
          mode: "sentuh",
          render: (a) => <SimulasiMesinTambah speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
        },
      ];
  }
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalBab2 = (sub: string): string => `Simulasi 1. Misi: ${langkahBab2(sub)[0].misi ?? ""}`;

export default function SimulasiBab2Materi({
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
  return <SimulasiAlur judulBab={`Bab 2 · Sub-Bab ${huruf}`} langkah={langkahBab2(sub)} speakGuru={speakGuru} onSelesai={onSelesai} teksAkhir={teksAkhir} dalamPopup />;
}
