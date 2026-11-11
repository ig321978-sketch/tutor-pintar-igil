"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiBentukDatar from "./SimulasiBentukDatar";
import SimulasiMesinDetektif from "./SimulasiMesinDetektif";
import SimulasiBengkelUrai from "./SimulasiBengkelUrai";
import SimulasiLabPola from "./SimulasiLabPola";
import SimulasiLerengGelinding from "./SimulasiLerengGelinding";
import SimulasiLabCetak from "./SimulasiLabCetak";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K2B3 } from "./skenario-k2b3";
import { daftarMisiK2Bab3, type KeadaanK2Bab3 } from "./misi-k2bab3";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 3 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* alat bertambah per sub-bab, dengan misi wajib dan tantangan bebas         */
/* (misi-k2bab3.ts).                                                         */
/*   Sub-Bab A (bentuk datar): Lab Bentuk Datar (dengan Cetakan) + Mesin     */
/*                             Tiga Pertanyaan.                              */
/*   Sub-Bab B (mengurai dan menyusun): Bengkel Urai + Lab Pola Segitiga +   */
/*                             Lab Bentuk Datar (mengingat Sub-Bab A).       */
/*   Sub-Bab C (akhir, bangun ruang): Lereng Gelinding + Lab Cetak           */
/*                             Permukaan + skenario Toko Mainan Upe.         */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Hitung sisi segi lima, uji lingkaran dan bentuk lonjong dengan Cetakan, lalu selesaikan Mesin Tiga Pertanyaan. Selesaikan misi wajib di bawah, urutannya bebas.",
  B: "Potong bentuk lewat diagonal, uraikan segi enam menjadi segitiga, lalu temukan polanya di Lab Pola. Selesaikan misi wajib, lalu coba tantangan bebas.",
  C: "Lepaskan bangun ruang di lereng, cetak permukaannya, lalu selesaikan skenario Toko Mainan Upe. Selesaikan semua misi wajib.",
} as const;

const NAMA_SIM = {
  A: "Lab Bentuk Datar dan Mesin Tiga Pertanyaan",
  B: "Bengkel Urai dan Lab Pola Segitiga",
  C: "Bangun Ruang: Pencapaian Misi",
} as const;

const langkahK2Bab3 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C"].includes(sub) ? sub : "A") as "A" | "B" | "C";
  const daftar = daftarMisiK2Bab3(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK2Bab3) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });

        const bentuk: TabLab = {
          id: "bentuk",
          nama: "Lab Bentuk Datar",
          render: () => <SimulasiBentukDatar speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const detektif: TabLab = {
          id: "detektif",
          nama: "Mesin Tiga Pertanyaan",
          render: () => <SimulasiMesinDetektif speakGuru={a.speakGuru} onTuntas={() => selesai("detektif")} />,
        };
        const urai: TabLab = {
          id: "urai",
          nama: "Bengkel Urai",
          render: () => <SimulasiBengkelUrai speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const pola: TabLab = {
          id: "pola",
          nama: "Lab Pola Segitiga",
          render: () => <SimulasiLabPola speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const lereng: TabLab = {
          id: "lereng",
          nama: "Lereng Gelinding",
          render: () => <SimulasiLerengGelinding speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const cetak: TabLab = {
          id: "cetak",
          nama: "Lab Cetak",
          render: () => <SimulasiLabCetak speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: "Toko Mainan Upe",
          render: () => <SimulasiSkenario def={SKENARIO_K2B3} speakGuru={a.speakGuru} onTuntas={() => selesai("toko-mainan")} />,
        };

        const tab = huruf === "A" ? [bentuk, detektif] : huruf === "B" ? [urai, pola, bentuk] : [lereng, cetak, skenario];
        return <LabBertahap tab={tab} label="Alat laboratorium bentuk dan bangun ruang" />;
      },
    },
  ];
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab3 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab3(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab3Materi({
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
  return (
    <SimulasiAlur
      judulBab={`Kelas 2 Bab 3 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab3(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
