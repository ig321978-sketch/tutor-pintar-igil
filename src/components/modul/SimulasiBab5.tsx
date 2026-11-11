"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiPuluhan, { SEMUA_TAMPIL_PULUHAN, type TampilPuluhan } from "./SimulasiPuluhan";
import SimulasiDeret from "./SimulasiDeret";
import SimulasiOdometer from "./SimulasiOdometer";
import SimulasiBanding, { type TampilBanding } from "./SimulasiBanding";
import { daftarMisiBab5, type KeadaanBab5 } from "./misi-bab5";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Bab 5 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Pola hibrida: satu laboratorium bilangan yang alatnya     */
/* bertambah per sub-bab, dengan misi wajib dan tantangan bebas             */
/* (misi-bab5.ts).                                                          */
/*   Sub-Bab A (11 sampai 20): Lab Puluhan dan Satuan tanpa tabel.          */
/*   Sub-Bab B (Maju dan mundur): + tab Maju dan Mundur dan Ulat dan Kisi.  */
/*   Sub-Bab C (Nilai tempat): + tabel nilai tempat dan tab Odometer.       */
/*   Sub-Bab D (Membandingkan, sub-bab akhir): semua alat + tab Banding     */
/*     dan Urutan, sekaligus simulasi pencapaian misi bab ini.              */
/* Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak memilih       */
/* "Lewati misi" setelah mencoba. Simulasi tidak memberi Poin Kualifikasi.  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Buat bilangan 11 sampai 20 dengan benda, bingkai, dan garis bilangan. Selesaikan misi di bawah, urutannya bebas.",
  B: "Maju dan mundur di deret bilangan, lalu cari bilangan yang hilang. Selesaikan misi wajib, lalu coba tantangan bebas.",
  C: "Baca puluhan dan satuan di tabel, lalu putar Odometer Bilangan. Selesaikan misi wajib, lalu coba tantangan bebas.",
  D: "Bandingkan dan urutkan bilangan sampai 20. Selesaikan semua misi wajib, lalu coba tantangan bebas.",
} as const;

const TAMPIL_PULUHAN: Record<"A" | "B" | "C" | "D", TampilPuluhan[]> = {
  A: ["benda", "ikat", "bingkai", "kalimat", "garis"],
  B: ["benda", "ikat", "bingkai", "kalimat", "garis"],
  C: ["benda", "ikat", "bingkai", "kalimat", "tabel", "garis"],
  D: SEMUA_TAMPIL_PULUHAN,
};

const TAMPIL_BANDING: TampilBanding[] = ["pasang", "tanda", "benda", "paling", "urut", "garis"];

const langkahBab5 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C", "D"].includes(sub) ? sub : "A") as "A" | "B" | "C" | "D";
  const daftar = daftarMisiBab5(huruf);
  return [
    {
      metode: "PhET",
      sub: huruf === "D" ? "Lab Bilangan 20: Pencapaian Misi" : "Lab Bilangan 20",
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanBab5) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const puluhan: TabLab = { id: "puluhan", nama: "Puluhan dan Satuan", render: () => <SimulasiPuluhan speakGuru={a.speakGuru} tampil={TAMPIL_PULUHAN[huruf]} onKeadaan={lapor} /> };
        const deret: TabLab = { id: "deret", nama: "Maju dan Mundur", render: () => <SimulasiDeret speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const odometer: TabLab = { id: "odometer", nama: "Odometer", render: () => <SimulasiOdometer speakGuru={a.speakGuru} onTuntas={() => selesai("odometer")} /> };
        const banding: TabLab = { id: "banding", nama: "Banding dan Urutan", render: () => <SimulasiBanding speakGuru={a.speakGuru} tampil={TAMPIL_BANDING} onKeadaan={lapor} /> };
        const tab = huruf === "A" ? [puluhan] : huruf === "B" ? [puluhan, deret] : huruf === "C" ? [puluhan, deret, odometer] : [puluhan, deret, odometer, banding];
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