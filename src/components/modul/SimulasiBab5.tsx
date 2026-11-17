"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiJaringIkan from "./ikan-k1b5a/SimulasiJaringIkan";
import SimulasiRakAkuarium from "./rak-k1b5b/SimulasiRakAkuarium";
import SimulasiMejaKemas from "./kemas-k1b5c/SimulasiMejaKemas";
import SimulasiLapakIkan from "./lapak-k1b5d/SimulasiLapakIkan";
import { daftarMisiBab5, type KeadaanBab5 } from "./misi-bab5";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Bab 5 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Pola hibrida: satu laboratorium bilangan yang alatnya     */
/* bertambah per sub-bab, dengan misi wajib dan tantangan bebas             */
/* (misi-bab5.ts).                                                          */
/*   Sub-Bab A (11 sampai 20): Wadah Sekat Sepuluh, Misi Lapak Ikan bagian  */
/*     satu, cerita Ikan Baru Datang (ikan-k1b5a).                          */
/*   Sub-Bab B (Maju dan mundur): Rak Akuarium Bernomor, Misi Lapak Ikan   */
/*     bagian satu, cerita Rak Akuarium Bernomor (rak-k1b5b).               */
/*   Sub-Bab C (Nilai tempat): Meja Kemas, Misi Lapak Ikan bagian dua,      */
/*     cerita Meja Kemas (kemas-k1b5c).                                     */
/*   Sub-Bab D (Membandingkan, sub-bab akhir): Lapak Ikan, penutup bab      */
/*     (lapak-k1b5d).                                                       */
/* Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak memilih       */
/* "Lewati misi" setelah mencoba. Simulasi tidak memberi Poin Kualifikasi.  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Misi Lapak Ikan bagian satu: tebak dulu, pindahkan ikan satu per satu ke wadah bersekat sepuluh, lalu pasang label angka dan nama. Urutannya bebas.",
  B: "Misi Lapak Ikan bagian satu: hitung maju dan mundur di rak cupang, beri pakan tiap akuarium tepat sekali, dan pasang lagi label nomor yang jatuh.",
  C: "Misi Lapak Ikan bagian dua: kumpulkan sepuluh barang, ikat dengan karet menjadi satu puluhan, lalu isi tabel puluhan dan satuan. Urutannya bebas.",
  D: "Misi Lapak Ikan bagian dua: bandingkan isi akuarium, urutkan di rak, lalu layani pembeli dan buka lapak ikan Abang. Selesaikan semua misi wajib.",
} as const;

const langkahBab5 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C", "D"].includes(sub) ? sub : "A") as "A" | "B" | "C" | "D";
  const daftar = daftarMisiBab5(huruf);
  return [
    {
      metode: "PhET",
      sub: huruf === "A" ? "Wadah Sekat Sepuluh" : huruf === "B" ? "Rak Akuarium Bernomor" : huruf === "C" ? "Meja Kemas" : "Lapak Ikan",
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanBab5) => laporMisi(daftar, k, a.capai);
        const wadahIkan: TabLab = { id: "ikan", nama: "Wadah Ikan", render: () => <SimulasiJaringIkan speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const rakAkuarium: TabLab = { id: "rak", nama: "Rak Akuarium", render: () => <SimulasiRakAkuarium speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const mejaKemas: TabLab = { id: "kemas", nama: "Meja Kemas", render: () => <SimulasiMejaKemas speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const lapakIkan: TabLab = { id: "lapak", nama: "Lapak Ikan", render: () => <SimulasiLapakIkan speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const tab = huruf === "D" ? [lapakIkan] : huruf === "C" ? [mejaKemas] : huruf === "B" ? [rakAkuarium] : [wadahIkan];
        return <LabBertahap tab={tab} label="Alat laboratorium bilangan 20" />;
      },
    },
  ];
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