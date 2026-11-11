"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiBilangan from "./SimulasiBilangan";
import SimulasiKatak from "./SimulasiKatak";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB1 } from "./skenario-kelas1";

/* ======================================================================== */
/* Simulasi Bab 1 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Satu simulasi per layar, tiap simulasi diawali satu Misi. */
/* Laboratorium Bilangan dipakai ulang tiap sub-bab, tetapi hanya membuka   */
/* perwakilan yang sudah diajarkan sampai sub-bab itu:                      */
/*   Sub-Bab A (Menghitung 0 sampai 10): benda bernomor, angka, dan nama.   */
/*   Sub-Bab B (Membandingkan): + bingkai sepuluh, garis bilangan, tanda.   */
/*   Sub-Bab C (Maju dan mundur): benda dan garis bilangan, lalu Katak.     */
/*   Sub-Bab D (Pasangan bilangan): benda, bingkai, pasangan, lalu Kasir    */
/*     Warung, yang merangkum menghitung, membandingkan, dan urutan.        */
/* Tombol LANJUTKAN aktif setelah simulasinya disentuh sekali (semua mode   */
/* "sentuh"), supaya tahap ini ringan dan tidak menahan anak.               */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  hitung: "Ketuk kotak benda ke-5. Lihat angka dan namanya ikut berubah.",
  banding: "Atur bilangan kedua sampai sama banyak dengan bilangan pertama.",
  garis: "Tekan plus tiga kali. Lihat garis bilangan ikut bergerak.",
  katak: "Bantu katak maju dari batu 3 sampai batu 7.",
  pasangan: "Tekan plus pada bagian merah. Lihat bilangan terbagi dua.",
  kasir: "Tekan Siap membantu! Lalu bantu Bu Ani menghitung apel.",
} as const;

const langkahBab1 = (sub: string): LangkahSim[] => {
  switch (sub) {
    case "B":
      return [
        {
          metode: "PhET",
          sub: "Laboratorium Bilangan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.banding,
          mode: "sentuh",
          render: (a) => <SimulasiBilangan speakGuru={a.speakGuru} tampil={["benda", "bingkai", "garis", "banding"]} awal={{ banding: true }} />,
        },
      ];
    case "C":
      return [
        {
          metode: "PhET",
          sub: "Laboratorium Bilangan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.garis,
          mode: "sentuh",
          render: (a) => <SimulasiBilangan speakGuru={a.speakGuru} tampil={["benda", "garis"]} />,
        },
        {
          metode: "Mesin keadaan",
          sub: "Katak Maju Mundur",
          petunjuk: MAINKAN_DULU,
          misi: MISI.katak,
          mode: "sentuh",
          render: (a) => <SimulasiKatak speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
        },
      ];
    case "D":
      return [
        {
          metode: "PhET",
          sub: "Laboratorium Bilangan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.pasangan,
          mode: "sentuh",
          render: (a) => <SimulasiBilangan speakGuru={a.speakGuru} tampil={["benda", "bingkai", "pasangan"]} />,
        },
        {
          metode: "Skenario",
          sub: "Kasir Warung",
          petunjuk: MAINKAN_DULU,
          misi: MISI.kasir,
          mode: "sentuh",
          render: (a) => <SimulasiSkenario def={SKENARIO_BAB1} speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
        },
      ];
    default:
      return [
        {
          metode: "PhET",
          sub: "Laboratorium Bilangan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.hitung,
          mode: "sentuh",
          render: (a) => <SimulasiBilangan speakGuru={a.speakGuru} tampil={["benda"]} />,
        },
      ];
  }
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalBab1 = (sub: string): string => `Simulasi 1. Misi: ${langkahBab1(sub)[0].misi ?? ""}`;

export default function SimulasiBab1Materi({
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
  return <SimulasiAlur judulBab={`Bab 1 · Sub-Bab ${huruf}`} langkah={langkahBab1(sub)} speakGuru={speakGuru} onSelesai={onSelesai} teksAkhir={teksAkhir} dalamPopup />;
}
