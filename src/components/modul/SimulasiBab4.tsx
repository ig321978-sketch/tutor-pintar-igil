"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiPapanPaku from "./SimulasiPapanPaku";
import SimulasiCiriBentuk from "./SimulasiCiriBentuk";
import SimulasiKelompok from "./SimulasiKelompok";
import SimulasiBangunGabungan from "./SimulasiBangunGabungan";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB4 } from "./skenario-kelas1";

/* ======================================================================== */
/* Simulasi Bab 4 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Satu simulasi per layar, tiap simulasi diawali satu Misi. */
/* Tiap sub-bab memakai alat yang sesuai isi yang diajarkannya:            */
/*   Sub-Bab A (Mendeskripsikan Benda): Laboratorium Ciri Bentuk (empat     */
/*     bentuk dasar, sisi dan sudut), lalu Papan Paku Bebas (lab 2D).       */
/*   Sub-Bab B (Mengelompokkan Benda): Laboratorium Kelompok, dua kali:     */
/*     satu aturan dengan tabel hitung, lalu satu balok dengan banyak       */
/*     kelompok.                                                            */
/*   Sub-Bab C (Menyusun dan Mengurai): Menyusun Bentuk, Bangun Gabungan    */
/*     (hitung bagian), lalu skenario Arsitek Cilik yang merangkum bab.     */
/* Tombol LANJUTKAN aktif setelah simulasinya disentuh sekali (semua mode   */
/* "sentuh"), supaya tahap ini ringan dan tidak menahan anak.               */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  ciri: "Tekan Putar 90°. Lihat apakah jumlah sisi dan sudutnya berubah.",
  papan: "Ketuk empat paku, lalu tekan Tutup bentuk. Lihat nama bentuknya.",
  kelompokSatu: "Ketuk Warna. Lihat balok yang sama pindah ke nampan baru.",
  kelompokBanyak: "Ketuk satu balok. Lihat kelompoknya menurut bentuk, warna, dan ukuran.",
  susun: "Pilih 2 segitiga, lalu centang Gabungkan bagian. Bentuk apa yang lahir?",
  gabungan: "Tekan Uraikan bangun. Lihat bagian-bagian kereta.",
  arsitek: "Tekan Ayo membangun! Lalu bantu Pak Arsitek memilih bentuk.",
} as const;

const langkahBab4 = (sub: string): LangkahSim[] => {
  switch (sub) {
    case "B":
      return [
        {
          metode: "PhET",
          sub: "Kelompok Satu Aturan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.kelompokSatu,
          mode: "sentuh",
          render: (a) => <SimulasiKelompok speakGuru={a.speakGuru} tampil={["benda", "tabel"]} />,
        },
        {
          metode: "PhET",
          sub: "Satu Balok, Banyak Kelompok",
          petunjuk: MAINKAN_DULU,
          misi: MISI.kelompokBanyak,
          mode: "sentuh",
          render: (a) => <SimulasiKelompok speakGuru={a.speakGuru} tampil={["benda", "ciri", "kalimat"]} />,
        },
      ];
    case "C":
      return [
        {
          metode: "PhET",
          sub: "Menyusun Bentuk",
          petunjuk: MAINKAN_DULU,
          misi: MISI.susun,
          mode: "sentuh",
          render: (a) => <SimulasiCiriBentuk speakGuru={a.speakGuru} tampil={["menyusun"]} />,
        },
        {
          metode: "PhET",
          sub: "Bangun Gabungan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.gabungan,
          mode: "sentuh",
          render: (a) => <SimulasiBangunGabungan speakGuru={a.speakGuru} />,
        },
        {
          metode: "Skenario",
          sub: "Arsitek Cilik",
          petunjuk: MAINKAN_DULU,
          misi: MISI.arsitek,
          mode: "sentuh",
          render: (a) => <SimulasiSkenario def={SKENARIO_BAB4} speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
        },
      ];
    default:
      return [
        {
          metode: "PhET",
          sub: "Laboratorium Ciri Bentuk",
          petunjuk: MAINKAN_DULU,
          misi: MISI.ciri,
          mode: "sentuh",
          render: (a) => <SimulasiCiriBentuk speakGuru={a.speakGuru} tampil={["ciri"]} />,
        },
        {
          metode: "Lab 2D",
          sub: "Papan Paku Bebas",
          petunjuk: MAINKAN_DULU,
          misi: MISI.papan,
          mode: "sentuh",
          render: (a) => <SimulasiPapanPaku speakGuru={a.speakGuru} tampilSiku={false} />,
        },
      ];
  }
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalBab4 = (sub: string): string => `Simulasi 1. Misi: ${langkahBab4(sub)[0].misi ?? ""}`;

export default function SimulasiBab4Materi({
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
  return <SimulasiAlur judulBab={`Bab 4 · Sub-Bab ${huruf}`} langkah={langkahBab4(sub)} speakGuru={speakGuru} onSelesai={onSelesai} teksAkhir={teksAkhir} dalamPopup />;
}
