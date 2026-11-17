"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiBedengMamah from "./kebun-k1b2a/SimulasiBedengMamah";
import SimulasiMejaKemas from "./panen-k1b2b/SimulasiMejaKemas";
import SimulasiPesanan from "./pesanan-k1b2c/SimulasiPesanan";
import { daftarMisiBab2, type KeadaanBab2 } from "./misi-bab2";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Bab 2 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Satu simulasi bercerita per sub-bab, melanjutkan cerita   */
/* Kebun Sayur Mamah, dengan misi wajib dan tantangan bebas (misi-bab2.ts). */
/*   Sub-Bab A (Cerita Penjumlahan): Bedeng Mamah, Misi Kebun bagian satu.  */
/*   Sub-Bab B (Berbagai Cara): Meja Kemas, Misi Panen bagian satu.         */
/*   Sub-Bab C (Soal Cerita, sub-bab akhir): Pembuat Pesanan, Misi Pesanan  */
/*     bagian satu.                                                         */
/* Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak memilih       */
/* "Lewati misi" setelah mencoba. Simulasi tidak memberi Poin Kualifikasi.  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Misi Kebun bagian satu: tanam bibit kiriman ke bedeng Mamah, lalu catat kalimat penjumlahannya. Urutannya bebas.",
  B: "Misi Panen bagian satu: isi dua keranjang di meja kemas, tukar tempatnya, buat yang kembar dan yang penuh sepuluh, lalu catat kalimatnya.",
  C: "Misi Pesanan bagian satu: buat cerita pesananmu sendiri, periksa dengan tukar tempat, lalu kirim pesanannya.",
} as const;

const NAMA = { A: "Bedeng Mamah", B: "Meja Kemas", C: "Pembuat Pesanan" } as const;

const langkahBab2 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C"].includes(sub) ? sub : "A") as "A" | "B" | "C";
  const daftar = daftarMisiBab2(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanBab2) => laporMisi(daftar, k, a.capai);
        const tab: TabLab = {
          id: huruf === "A" ? "bedeng" : huruf === "B" ? "kemas" : "pesanan",
          nama: NAMA[huruf],
          render: () =>
            huruf === "A" ? <SimulasiBedengMamah speakGuru={a.speakGuru} onKeadaan={lapor} /> : huruf === "B" ? <SimulasiMejaKemas speakGuru={a.speakGuru} onKeadaan={lapor} /> : <SimulasiPesanan speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        return <LabBertahap tab={[tab]} label="Alat laboratorium penjumlahan" />;
      },
    },
  ];
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
