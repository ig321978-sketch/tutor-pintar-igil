"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiMejaNampan from "./nampan-k1b6a/SimulasiMejaNampan";
import SimulasiLoketKarcis from "./karcis-k1b6b/SimulasiLoketKarcis";
import SimulasiMejaTutup from "./tutup-k1b6c/SimulasiMejaTutup";
import { daftarMisiBab6, type KeadaanBab6 } from "./misi-bab6";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Bab 6 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Pola hibrida: satu laboratorium yang alatnya bertambah    */
/* per sub-bab, dengan misi wajib dan tantangan bebas (misi-bab6.ts).       */
/*   Sub-Bab A (Lebih dari, Kurang dari, Selisih): tab Selisih Dua          */
/*     Kelompok dan Garis Bilangan (selisih).                               */
/*   Sub-Bab B (Penjumlahan kurang dari 20): + garis tambah, Jembatan       */
/*     Sepuluh, dan Menjumlah Belasan.                                      */
/*   Sub-Bab C (Pengurangan kurang dari 20, sub-bab akhir): + garis         */
/*     kurang, Mengurang Belasan, dan Loket Pasar Malam, sekaligus          */
/*     simulasi pencapaian misi bab ini.                                    */
/* Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak memilih       */
/* "Lewati misi" setelah mencoba. Simulasi tidak memberi Poin Kualifikasi.  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Misi Pasar Malam bagian satu: pilih dua nampan, pasangkan kuenya, sorot selisih di batang, loncat di garis bilangan, lalu samakan banyaknya.",
  B: "Misi Loket Karcis bagian satu: hitung karcis tiap rombongan dengan hitung maju, genapkan sepuluh, atau belasan tambah satuan, lalu catat di papan. Selesaikan misi wajib, lalu coba tantangan bebas.",
  C: "Misi Pasar Malam bagian dua: laporkan sisa tiap lapak dengan mundur, kurangi satuan, atau lewat sepuluh, periksa dengan menambah, lalu tutup pasar malam. Selesaikan semua misi wajib.",
} as const;

const langkahBab6 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C"].includes(sub) ? sub : "A") as "A" | "B" | "C";
  const daftar = daftarMisiBab6(huruf);
  return [
    {
      metode: "PhET",
      sub: huruf === "A" ? "Meja Dua Nampan" : huruf === "C" ? "Meja Tutup Lapak" : "Lab Hitung 20",
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanBab6) => laporMisi(daftar, k, a.capai);
        const loketKarcis: TabLab = { id: "karcis", nama: "Loket Karcis", render: () => <SimulasiLoketKarcis speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const tab = huruf === "A" ? [{ id: "nampan", nama: "Meja Dua Nampan", render: () => <SimulasiMejaNampan speakGuru={a.speakGuru} onKeadaan={lapor} /> } as TabLab] : huruf === "B" ? [loketKarcis] : [{ id: "tutup", nama: "Meja Tutup Lapak", render: () => <SimulasiMejaTutup speakGuru={a.speakGuru} onKeadaan={lapor} /> } as TabLab];
        return <LabBertahap tab={tab} label="Alat laboratorium hitung 20" />;
      },
    },
  ];
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalBab6 = (sub: string): string => `Simulasi 1. Misi: ${langkahBab6(sub)[0].misi ?? ""}`;

export default function SimulasiBab6Materi({
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
  return <SimulasiAlur judulBab={`Bab 6 · Sub-Bab ${huruf}`} langkah={langkahBab6(sub)} speakGuru={speakGuru} onSelesai={onSelesai} teksAkhir={teksAkhir} dalamPopup />;
}