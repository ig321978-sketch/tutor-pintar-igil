"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiBilangan from "./SimulasiBilangan";
import SimulasiKamarKaka from "./lemari-k1b1a/SimulasiKamarKaka";
import SimulasiGudangHadiah from "./banding-k1b1b/SimulasiGudangHadiah";
import SimulasiTanggaLoteng from "./loteng-k1b1c/SimulasiTanggaLoteng";
import SimulasiMejaPesta from "./pesta-k1b1d/SimulasiMejaPesta";
import { daftarMisiBab1, type KeadaanBab1 } from "./misi-bab1";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Bab 1 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Pola hibrida: satu laboratorium yang alatnya bertambah    */
/* per sub-bab, dengan misi wajib dan tantangan bebas (misi-bab1.ts).       */
/*   Sub-Bab A (Menghitung 0 sampai 10): Kamar Kaka, Misi Rumah Rapi bagian satu. */
/*   Sub-Bab B (Membandingkan): Gudang Hadiah, Misi Hadiah Nenek bagian satu. */
/*   Sub-Bab C (Maju dan mundur): Tangga Loteng, Misi Gudang Loteng bagian satu. */
/*   Sub-Bab D (Pasangan bilangan, sub-bab akhir): Meja Pesta, Misi Pesta.  */
/* Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak memilih       */
/* "Lewati misi" setelah mencoba. Simulasi tidak memberi Poin Kualifikasi.  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Misi Rumah Rapi bagian satu: rapikan kamar Kaka. Pisahkan, hitung, lalu catat. Urutannya bebas.",
  B: "Misi Hadiah Nenek bagian satu: bagikan hadiah dengan adil. Bandingkan dulu, lalu beri hadiah ke rak yang lebih sedikit.",
  C: "Misi Gudang Loteng bagian satu: naik dan turun tangga sambil menghitung, lalu susun kardus dan lengkapi nomor yang hilang.",
  D: "Misi Pesta bagian satu: bagi kue, gelas, dan kursi ke dua meja, lalu catat setiap pasangan yang kamu temukan.",
} as const;

const langkahBab1 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C", "D"].includes(sub) ? sub : "A") as "A" | "B" | "C" | "D";
  const daftar = daftarMisiBab1(huruf);
  return [
    {
      metode: "PhET",
      sub: huruf === "D" ? "Meja Pesta" : huruf === "A" ? "Kamar Kaka" : huruf === "B" ? "Gudang Hadiah" : huruf === "C" ? "Tangga Loteng" : "Lab Bilangan",
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanBab1) => laporMisi(daftar, k, a.capai);
        const bilangan: TabLab = {
          id: "bilangan",
          nama: huruf === "A" ? "Kamar Kaka" : huruf === "B" ? "Gudang Hadiah" : huruf === "C" ? "Tangga Loteng" : "Meja Pesta",
          render: () => {
            switch (huruf) {
              case "A":
                return <SimulasiKamarKaka speakGuru={a.speakGuru} onKeadaan={lapor} />;
              case "B":
                return <SimulasiGudangHadiah speakGuru={a.speakGuru} onKeadaan={lapor} />;
              case "C":
                return <SimulasiTanggaLoteng speakGuru={a.speakGuru} onKeadaan={lapor} />;
              case "D":
                return <SimulasiMejaPesta speakGuru={a.speakGuru} onKeadaan={lapor} />;
              default:
                return <SimulasiBilangan speakGuru={a.speakGuru} tampil={["benda", "bingkai", "garis", "banding"]} onKeadaan={lapor} />;
            }
          },
        };
        const tab = [bilangan];
        return <LabBertahap tab={tab} label="Alat laboratorium bilangan" />;
      },
    },
  ];
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