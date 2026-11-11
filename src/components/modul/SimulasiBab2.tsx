"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiTambah, { SEMUA_TAMPIL_TAMBAH, type TampilTambah } from "./SimulasiTambah";
import SimulasiMesinTambah from "./SimulasiMesinTambah";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB2 } from "./skenario-kelas1";
import { daftarMisiBab2, type KeadaanBab2 } from "./misi-bab2";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Bab 2 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Pola hibrida: satu laboratorium yang alatnya bertambah    */
/* per sub-bab, dengan misi wajib dan tantangan bebas (misi-bab2.ts).       */
/*   Sub-Bab A (Cerita Penjumlahan): benda, kalimat, bingkai + tab Mesin    */
/*     Tambah (gabung dulu, baru jawab).                                    */
/*   Sub-Bab B (Berbagai Cara): + bagan pasangan, garis bilangan, Tukar     */
/*     tempat.                                                              */
/*   Sub-Bab C (Soal Cerita, sub-bab akhir): semua alat + tab Kantin        */
/*     Sekolah, sekaligus simulasi pencapaian misi bab ini.                 */
/* Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak memilih       */
/* "Lewati misi" setelah mencoba. Simulasi tidak memberi Poin Kualifikasi.  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Gabungkan dua kelompok benda dan bantu Mesin Tambah. Selesaikan misi di bawah, urutannya bebas.",
  B: "Coba berbagai cara menjumlah: tukar tempat, hitung maju, kembar, dan jadi sepuluh. Selesaikan misi wajib, lalu coba tantangan bebas.",
  C: "Ubah soal cerita menjadi penjumlahan, periksa jawabanmu, dan bantu Rani di kantin. Selesaikan semua misi wajib, lalu coba tantangan bebas.",
} as const;

const TAMPIL: Record<"A" | "B" | "C", TampilTambah[]> = {
  A: ["benda", "kalimat", "bingkai"],
  B: ["benda", "kalimat", "bagan", "tukar", "garis", "bingkai"],
  C: SEMUA_TAMPIL_TAMBAH,
};

const langkahBab2 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C"].includes(sub) ? sub : "A") as "A" | "B" | "C";
  const daftar = daftarMisiBab2(huruf);
  return [
    {
      metode: "PhET",
      sub: huruf === "C" ? "Lab Penjumlahan: Pencapaian Misi" : "Lab Penjumlahan",
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanBab2) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const tambah: TabLab = { id: "tambah", nama: "Penjumlahan", render: () => <SimulasiTambah speakGuru={a.speakGuru} tampil={TAMPIL[huruf]} onKeadaan={lapor} /> };
        const mesin: TabLab = { id: "mesin", nama: "Mesin Tambah", render: () => <SimulasiMesinTambah speakGuru={a.speakGuru} onTuntas={() => selesai("mesin")} /> };
        const kantin: TabLab = { id: "kantin", nama: "Kantin Sekolah", render: () => <SimulasiSkenario def={SKENARIO_BAB2} speakGuru={a.speakGuru} onTuntas={() => selesai("kantin")} /> };
        return <LabBertahap tab={huruf === "C" ? [tambah, mesin, kantin] : [tambah, mesin]} label="Alat laboratorium penjumlahan" />;
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