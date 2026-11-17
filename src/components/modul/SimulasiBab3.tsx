"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiKotakBekal from "./bekal-k1b3a/SimulasiKotakBekal";
import SimulasiKursiKereta from "./peron-k1b3b/SimulasiKursiKereta";
import SimulasiPapanKondektur from "./kondektur-k1b3c/SimulasiPapanKondektur";
import SimulasiCeritaNenek from "./rumah-k1b3d/SimulasiCeritaNenek";
import { daftarMisiBab3, type KeadaanBab3 } from "./misi-bab3";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Bab 3 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Satu simulasi bercerita per sub-bab, melanjutkan cerita  */
/* Kereta ke Rumah Nenek, dengan misi wajib dan tantangan bebas            */
/* (misi-bab3.ts).                                                          */
/*   Sub-Bab A (Cerita Pengurangan): Kotak Bekal, Misi Perjalanan bagian    */
/*     satu, cerita Kereta ke Rumah Nenek (bekal-k1b3a).                    */
/*   Sub-Bab B (Berbagai Cara): Kursi Kereta Lanjutan, Misi Pindah Kereta   */
/*     bagian satu (peron-k1b3b).                                           */
/*   Sub-Bab C (Hubungan Tambah dan Kurang): Papan Kondektur, Misi          */
/*     Kondektur bagian satu (kondektur-k1b3c).                             */
/*   Sub-Bab D (Soal Cerita, sub-bab akhir): Pembuat Cerita Nenek, Misi     */
/*     Rumah Nenek bagian satu (rumah-k1b3d).                               */
/* Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak memilih       */
/* "Lewati misi" setelah mencoba. Simulasi tidak memberi Poin Kualifikasi.  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Misi Perjalanan bagian satu: ambil bekal dari kotak bersekat, lihat sisanya, lalu catat kalimat pengurangannya. Urutannya bebas.",
  B: "Misi Pindah Kereta bagian satu: atur kursi kereta lanjutan, lihat bagan, garis bilangan, dan dua kalimatnya, lalu catat. Urutannya bebas.",
  C: "Misi Kondektur bagian satu: atur penumpang biru dan merah, catat empat kalimat keluarganya, lalu tutup pojok segitiga dan tebak. Urutannya bebas.",
  D: "Misi Rumah Nenek bagian satu: buat cerita hitunganmu sendiri, periksa dengan penjumlahan, lalu kirim ke Nenek. Urutannya bebas.",
} as const;

const langkahBab3 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C", "D"].includes(sub) ? sub : "A") as "A" | "B" | "C" | "D";
  const daftar = daftarMisiBab3(huruf);
  return [
    {
      metode: "PhET",
      sub: { A: "Kotak Bekal", B: "Kursi Kereta Lanjutan", C: "Papan Kondektur", D: "Pembuat Cerita Nenek" }[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanBab3) => laporMisi(daftar, k, a.capai);
        const kotakBekal: TabLab = { id: "bekal", nama: "Kotak Bekal", render: () => <SimulasiKotakBekal speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const kursiKereta: TabLab = { id: "kursi", nama: "Kursi Kereta", render: () => <SimulasiKursiKereta speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const ceritaNenek: TabLab = { id: "cerita", nama: "Cerita Nenek", render: () => <SimulasiCeritaNenek speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const papan: TabLab = { id: "kondektur", nama: "Papan Kondektur", render: () => <SimulasiPapanKondektur speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const tab = huruf === "A" ? [kotakBekal] : huruf === "B" ? [kursiKereta] : huruf === "C" ? [papan] : [ceritaNenek];
        return <LabBertahap tab={tab} label="Simulasi pengurangan" />;
      },
    },
  ];
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