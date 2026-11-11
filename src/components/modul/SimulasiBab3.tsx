"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiKurang, { SEMUA_TAMPIL_KURANG, type TampilKurang } from "./SimulasiKurang";
import SimulasiMesinBus from "./SimulasiMesinBus";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB3 } from "./skenario-kelas1";
import { daftarMisiBab3, type KeadaanBab3 } from "./misi-bab3";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Bab 3 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Pola hibrida: satu laboratorium yang alatnya bertambah    */
/* per sub-bab, dengan misi wajib dan tantangan bebas (misi-bab3.ts).       */
/*   Sub-Bab A (Cerita Pengurangan): benda, kalimat, bingkai sepuluh.       */
/*   Sub-Bab B (Berbagai Cara): + dua pengurangan, bagan, garis mundur.     */
/*   Sub-Bab C (Keluarga Bilangan): + keluarga fakta dan tab Bus Sekolah.   */
/*   Sub-Bab D (Soal Cerita, sub-bab akhir): semua alat + tab Pesta Jeruk,  */
/*     sekaligus simulasi pencapaian misi bab ini.                          */
/* Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak memilih       */
/* "Lewati misi" setelah mencoba. Simulasi tidak memberi Poin Kualifikasi.  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Coret benda yang diambil dan baca sisanya. Selesaikan misi di bawah, urutannya bebas.",
  B: "Coba berbagai cara mengurang: dua pengurangan, mundur, nol, dan dari sepuluh. Selesaikan misi wajib, lalu coba tantangan bebas.",
  C: "Temukan keluarga bilangan, periksa dengan tambah, dan bantu Bus Sekolah. Selesaikan misi wajib, lalu coba tantangan bebas.",
  D: "Ubah soal cerita menjadi pengurangan, periksa jawabanmu, dan bantu Bu Lina di pesta. Selesaikan semua misi wajib, lalu coba tantangan bebas.",
} as const;

const TAMPIL: Record<"A" | "B" | "C" | "D", TampilKurang[]> = {
  A: ["benda", "kalimat", "bingkai"],
  B: ["benda", "kalimat", "bingkai", "garis", "dua", "bagan"],
  C: SEMUA_TAMPIL_KURANG,
  D: SEMUA_TAMPIL_KURANG,
};

const langkahBab3 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C", "D"].includes(sub) ? sub : "A") as "A" | "B" | "C" | "D";
  const daftar = daftarMisiBab3(huruf);
  return [
    {
      metode: "PhET",
      sub: huruf === "D" ? "Lab Pengurangan: Pencapaian Misi" : "Lab Pengurangan",
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanBab3) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const kurang: TabLab = { id: "kurang", nama: "Pengurangan", render: () => <SimulasiKurang speakGuru={a.speakGuru} tampil={TAMPIL[huruf]} onKeadaan={lapor} /> };
        const bus: TabLab = { id: "bus", nama: "Bus Sekolah", render: () => <SimulasiMesinBus speakGuru={a.speakGuru} onTuntas={() => selesai("bus")} /> };
        const pesta: TabLab = { id: "pesta", nama: "Pesta Jeruk", render: () => <SimulasiSkenario def={SKENARIO_BAB3} speakGuru={a.speakGuru} onTuntas={() => selesai("pesta")} /> };
        const tab = huruf === "A" || huruf === "B" ? [kurang] : huruf === "C" ? [kurang, bus] : [kurang, bus, pesta];
        return <LabBertahap tab={tab} label="Alat laboratorium pengurangan" />;
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