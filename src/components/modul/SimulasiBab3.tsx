"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiKurang from "./SimulasiKurang";
import SimulasiMesinBus from "./SimulasiMesinBus";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB3 } from "./skenario-kelas1";

/* ======================================================================== */
/* Simulasi Bab 3 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Satu simulasi per layar, tiap simulasi diawali satu Misi. */
/* Laboratorium Pengurangan dipakai ulang tiap sub-bab, tetapi hanya        */
/* membuka perwakilan yang sudah diajarkan sampai sub-bab itu:              */
/*   Sub-Bab A (Cerita Pengurangan): benda dicoret, bingkai, kalimat.       */
/*   Sub-Bab B (Berbagai Cara): tiga lab, satu per cara. Pasangan (benda,   */
/*     bagan, dua pengurangan), Hitung Mundur (garis bilangan), Dari        */
/*     Sepuluh (bingkai).                                                   */
/*   Sub-Bab C (Hubungan Tambah dan Kurang): keluarga fakta, lalu Bus       */
/*     Sekolah yang mencatat kalimat tambah dan kurang.                     */
/*   Sub-Bab D (Soal Cerita): lab pemeriksa dengan penjumlahan, lalu Pesta  */
/*     Jeruk yang merangkum soal cerita pengurangan.                        */
/* Tombol LANJUTKAN aktif setelah simulasinya disentuh sekali (semua mode   */
/* "sentuh"), supaya tahap ini ringan dan tidak menahan anak.               */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  coret: "Ketuk satu benda untuk mencoretnya. Lihat sisanya ikut berubah.",
  pasangan: "Ketuk satu benda untuk mencoretnya. Lihat bagan dan dua pengurangan ikut berubah.",
  mundur: "Tekan plus pada Benda diambil. Lihat lompatan mundur di garis bilangan.",
  sepuluh: "Tekan plus pada Semua benda sampai 10. Lihat bingkai sepuluh jadi penuh.",
  keluarga: "Tekan plus pada Benda diambil. Lihat empat kalimat satu keluarga ikut berubah.",
  bus: "Tekan Turunkan 1 anak. Lihat isi bus berkurang.",
  periksa: "Coret beberapa benda. Lalu cek dengan kalimat tambah di keluarga fakta.",
  pesta: "Tekan Mulai pesta! Lalu bantu Bu Lina menghitung sisa jeruknya.",
} as const;

const langkahBab3 = (sub: string): LangkahSim[] => {
  switch (sub) {
    case "B":
      return [
        {
          metode: "PhET",
          sub: "Pasangan Bilangan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.pasangan,
          mode: "sentuh",
          render: (a) => <SimulasiKurang speakGuru={a.speakGuru} tampil={["benda", "kalimat", "dua", "bagan"]} />,
        },
        {
          metode: "PhET",
          sub: "Hitung Mundur",
          petunjuk: MAINKAN_DULU,
          misi: MISI.mundur,
          mode: "sentuh",
          render: (a) => <SimulasiKurang speakGuru={a.speakGuru} tampil={["kalimat", "garis"]} />,
        },
        {
          metode: "PhET",
          sub: "Dari Sepuluh",
          petunjuk: MAINKAN_DULU,
          misi: MISI.sepuluh,
          mode: "sentuh",
          render: (a) => <SimulasiKurang speakGuru={a.speakGuru} tampil={["kalimat", "bingkai"]} />,
        },
      ];
    case "C":
      return [
        {
          metode: "PhET",
          sub: "Keluarga Bilangan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.keluarga,
          mode: "sentuh",
          render: (a) => <SimulasiKurang speakGuru={a.speakGuru} tampil={["benda", "kalimat", "bagan", "keluarga"]} />,
        },
        {
          metode: "Mesin keadaan",
          sub: "Bus Sekolah",
          petunjuk: MAINKAN_DULU,
          misi: MISI.bus,
          mode: "sentuh",
          render: (a) => <SimulasiMesinBus speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
        },
      ];
    case "D":
      return [
        {
          metode: "PhET",
          sub: "Periksa Jawabanmu",
          petunjuk: MAINKAN_DULU,
          misi: MISI.periksa,
          mode: "sentuh",
          render: (a) => <SimulasiKurang speakGuru={a.speakGuru} tampil={["benda", "kalimat", "keluarga"]} />,
        },
        {
          metode: "Skenario",
          sub: "Pesta Jeruk",
          petunjuk: MAINKAN_DULU,
          misi: MISI.pesta,
          mode: "sentuh",
          render: (a) => <SimulasiSkenario def={SKENARIO_BAB3} speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
        },
      ];
    default:
      return [
        {
          metode: "PhET",
          sub: "Laboratorium Pengurangan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.coret,
          mode: "sentuh",
          render: (a) => <SimulasiKurang speakGuru={a.speakGuru} tampil={["benda", "kalimat", "bingkai"]} />,
        },
      ];
  }
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalBab3 = (sub: string): string => `Simulasi 1. Misi: ${langkahBab3(sub)[0].misi ?? ""}`;

export default function SimulasiBab3Materi({
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
  const huruf = ["A", "B", "C", "D"].includes(sub) ? sub : "A";
  return <SimulasiAlur judulBab={`Bab 3 · Sub-Bab ${huruf}`} langkah={langkahBab3(sub)} speakGuru={speakGuru} onSelesai={onSelesai} teksAkhir={teksAkhir} dalamPopup />;
}
