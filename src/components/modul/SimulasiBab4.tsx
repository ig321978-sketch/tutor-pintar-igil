"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiMejaBahan from "./bahan-k1b4a/SimulasiMejaBahan";
import SimulasiRakTeras from "./teras-k1b4b/SimulasiRakTeras";
import SimulasiMejaRakit from "./susun-k1b4c/SimulasiMejaRakit";
import { daftarMisiBab4, type KeadaanBab4 } from "./misi-bab4";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Bab 4 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Pola hibrida: satu laboratorium bentuk yang alatnya       */
/* bertambah per sub-bab, dengan misi wajib dan tantangan bebas             */
/* (misi-bab4.ts).                                                          */
/*   Sub-Bab A (Mengenal Bentuk): Meja Periksa Bahan, Misi Festival bagian  */
/*     satu, cerita Festival Mainan Kardus (bahan-k1b4a).                   */
/*   Sub-Bab B (Mengelompokkan): Rak Teras, Misi Festival bagian satu,      */
/*     cerita Teras Penuh Barang (teras-k1b4b).                             */
/*   Sub-Bab C (Menyusun Bentuk, sub-bab akhir): Meja Rakit Mainan, Misi    */
/*     Festival bagian satu dan penutup bab (susun-k1b4c).                  */
/* Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak memilih       */
/* "Lewati misi" setelah mencoba. Simulasi tidak memberi Poin Kualifikasi.  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Misi Festival bagian satu: periksa bahan bekas di meja. Putar, tampilkan sisi dan sudut, gelindingkan, lalu beri label roda, atap, atau badan. Urutannya bebas.",
  B: "Misi Festival bagian satu: rak teras. Pilih aturan bentuk, warna, atau ukuran, lalu lihat barang pindah keranjang. Ketuk barang, cat, atau ubah ukurannya.",
  C: "Misi Festival bagian satu: rakit mainan di meja. Susun bagiannya, urai lagi, baca kalimat tambah dan kurang, lalu bawa ke panggung juri. Urutannya bebas.",
} as const;

const langkahBab4 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C"].includes(sub) ? sub : "A") as "A" | "B" | "C";
  const daftar = daftarMisiBab4(huruf);
  return [
    {
      metode: "PhET",
      sub: huruf === "C" ? "Meja Rakit Mainan" : huruf === "A" ? "Meja Periksa Bahan" : "Rak Teras",
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanBab4) => laporMisi(daftar, k, a.capai);
        const mejaBahan: TabLab = { id: "bahan", nama: "Meja Bahan", render: () => <SimulasiMejaBahan speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const rakTeras: TabLab = { id: "teras", nama: "Rak Teras", render: () => <SimulasiRakTeras speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const mejaRakit: TabLab = { id: "rakit", nama: "Meja Rakit", render: () => <SimulasiMejaRakit speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const tab = huruf === "A" ? [mejaBahan] : huruf === "B" ? [rakTeras] : [mejaRakit];
        return <LabBertahap tab={tab} label="Alat laboratorium bentuk" />;
      },
    },
  ];
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