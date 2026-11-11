"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiPuluhan from "./SimulasiPuluhan";
import SimulasiOdometer from "./SimulasiOdometer";
import SimulasiDeret from "./SimulasiDeret";
import SimulasiBanding from "./SimulasiBanding";

/* ======================================================================== */
/* Simulasi Bab 5 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Satu simulasi per layar, tiap simulasi diawali satu Misi. */
/* Tiap sub-bab memakai alat yang sesuai isi yang diajarkannya, dan hanya   */
/* menampilkan perwakilan yang sudah dipelajari sampai sub-bab itu:         */
/*   Sub-Bab A (Menghitung, Membaca, Menulis sampai 20): Laboratorium       */
/*     Bilangan sampai 20 (benda, ikat sepuluh, dua bingkai, sepuluh dulu   */
/*     lalu sisanya, garis bilangan), tanpa istilah puluhan dan satuan.     */
/*   Sub-Bab B (Maju dan Mundur): Maju dan Mundur (garis bilangan,          */
/*     urutan), lalu Ulat dan Kisi Bilangan (kisi, ulat, tetangga).         */
/*   Sub-Bab C (Nilai Tempat): Laboratorium Puluhan dan Satuan (benda,      */
/*     ikat, tabel), lalu Odometer Bilangan (mesin keadaan).                */
/*   Sub-Bab D (Membandingkan dan Mengurutkan): Banding Dua Kelompok,       */
/*     Paling Banyak dan Urutan, lalu Puluhan Dulu Baru Satuan.             */
/* Tombol LANJUTKAN aktif setelah simulasinya disentuh sekali (semua mode   */
/* "sentuh"), supaya tahap ini ringan dan tidak menahan anak.               */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  lab: "Tekan plus pada Bilangan sampai lebih dari 10. Lihat bingkai kedua mulai terisi.",
  maju: "Tekan Maju beberapa kali, lalu tekan Mundur. Lihat panah di garis bilangan.",
  kisi: "Ketuk satu kotak di kisi. Lihat bilangan sebelum dan sesudahnya.",
  nilaiTempat: "Tekan plus sampai 10, lalu centang Ikat sepuluh. Lihat tabelnya.",
  odometer: "Tekan Satuan naik sampai melewati 9. Lihat apa yang terjadi pada puluhan.",
  pasang: "Tekan plus pada jeruk Kira beberapa kali. Lihat siapa yang punya sisa tidak berpasangan.",
  paling: "Ubah jumlah jeruk Wei. Lihat siapa yang paling banyak dan siapa yang paling sedikit.",
  puluhanDulu: "Centang Bandingkan. Lihat angka mana yang dibandingkan lebih dulu.",
} as const;

const langkahBab5 = (sub: string): LangkahSim[] => {
  switch (sub) {
    case "B":
      return [
        {
          metode: "PhET",
          sub: "Maju dan Mundur",
          petunjuk: MAINKAN_DULU,
          misi: MISI.maju,
          mode: "sentuh",
          render: (a) => <SimulasiDeret speakGuru={a.speakGuru} tampil={["garis", "urutan"]} />,
        },
        {
          metode: "PhET",
          sub: "Ulat dan Kisi Bilangan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.kisi,
          mode: "sentuh",
          render: (a) => <SimulasiDeret speakGuru={a.speakGuru} tampil={["kisi", "ulat", "tetangga"]} />,
        },
      ];
    case "C":
      return [
        {
          metode: "PhET",
          sub: "Laboratorium Puluhan dan Satuan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.nilaiTempat,
          mode: "sentuh",
          render: (a) => <SimulasiPuluhan speakGuru={a.speakGuru} tampil={["benda", "ikat", "tabel"]} />,
        },
        {
          metode: "Mesin keadaan",
          sub: "Odometer Bilangan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.odometer,
          mode: "sentuh",
          render: (a) => <SimulasiOdometer speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
        },
      ];
    case "D":
      return [
        {
          metode: "PhET",
          sub: "Banding Dua Kelompok",
          petunjuk: MAINKAN_DULU,
          misi: MISI.pasang,
          mode: "sentuh",
          render: (a) => <SimulasiBanding speakGuru={a.speakGuru} tampil={["pasang", "tanda"]} />,
        },
        {
          metode: "PhET",
          sub: "Paling Banyak dan Urutan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.paling,
          mode: "sentuh",
          render: (a) => <SimulasiBanding speakGuru={a.speakGuru} tampil={["benda", "paling", "urut", "garis"]} />,
        },
        {
          metode: "PhET",
          sub: "Puluhan Dulu, Baru Satuan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.puluhanDulu,
          mode: "sentuh",
          render: (a) => <SimulasiPuluhan speakGuru={a.speakGuru} tampil={["tabel", "garis", "banding"]} />,
        },
      ];
    default:
      return [
        {
          metode: "PhET",
          sub: "Laboratorium Bilangan sampai 20",
          petunjuk: MAINKAN_DULU,
          misi: MISI.lab,
          mode: "sentuh",
          render: (a) => <SimulasiPuluhan speakGuru={a.speakGuru} tampil={["benda", "ikat", "bingkai", "kalimat", "garis"]} />,
        },
      ];
  }
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalBab5 = (sub: string): string => `Simulasi 1. Misi: ${langkahBab5(sub)[0].misi ?? ""}`;

export default function SimulasiBab5Materi({
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
  return <SimulasiAlur judulBab={`Bab 5 · Sub-Bab ${huruf}`} langkah={langkahBab5(sub)} speakGuru={speakGuru} onSelesai={onSelesai} teksAkhir={teksAkhir} dalamPopup />;
}
