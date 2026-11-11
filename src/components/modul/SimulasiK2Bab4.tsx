"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabPosisi from "./SimulasiLabPosisi";
import SimulasiLabPetunjuk from "./SimulasiLabPetunjuk";
import SimulasiPabrikPola from "./SimulasiPabrikPola";
import SimulasiMesinPola from "./SimulasiMesinPola";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K2B4A, SKENARIO_K2B4B } from "./skenario-k2b4";
import { daftarMisiK2Bab4, type KeadaanK2Bab4 } from "./misi-k2bab4";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 4 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* alat bertambah per sub-bab, dengan misi wajib dan tantangan bebas         */
/* (misi-k2bab4.ts).                                                         */
/*   Sub-Bab A (posisi benda): Lab Posisi + Lab Petunjuk Ganda + skenario    */
/*                             Panen di Sawah Paman.                         */
/*   Sub-Bab B (pola, akhir):  Pabrik Pola + Mesin Tiga Pemeriksaan +        */
/*                             skenario Pesta Pola di Desa.                  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Taruh benda di atas, di depan, dan di sebelah kanan acuan, susun petunjuk sampai tinggal satu benda yang cocok, lalu selesaikan skenario Panen di Sawah Paman. Selesaikan misi wajib di bawah, urutannya bebas.",
  B: "Susun satuan pola di Pabrik Pola, periksa barisan dengan Mesin Tiga Pemeriksaan, lalu selesaikan skenario Pesta Pola di Desa. Selesaikan semua misi wajib.",
} as const;

const NAMA_SIM = {
  A: "Lab Posisi dan Lab Petunjuk Ganda",
  B: "Pola: Pencapaian Misi",
} as const;

const langkahK2Bab4 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B"].includes(sub) ? sub : "A") as "A" | "B";
  const daftar = daftarMisiK2Bab4(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK2Bab4) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });

        const posisi: TabLab = {
          id: "posisi",
          nama: "Lab Posisi",
          render: () => <SimulasiLabPosisi speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const petunjuk: TabLab = {
          id: "petunjuk",
          nama: "Lab Petunjuk Ganda",
          render: () => <SimulasiLabPetunjuk speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const sawah: TabLab = {
          id: "sawah",
          nama: "Panen di Sawah Paman",
          render: () => <SimulasiSkenario def={SKENARIO_K2B4A} speakGuru={a.speakGuru} onTuntas={() => selesai("sawah")} />,
        };
        const pabrik: TabLab = {
          id: "pabrik",
          nama: "Pabrik Pola",
          render: () => <SimulasiPabrikPola speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const mesin: TabLab = {
          id: "mesin",
          nama: "Mesin Tiga Pemeriksaan",
          render: () => <SimulasiMesinPola speakGuru={a.speakGuru} onTuntas={() => selesai("mesin-pola")} />,
        };
        const pesta: TabLab = {
          id: "pesta",
          nama: "Pesta Pola di Desa",
          render: () => <SimulasiSkenario def={SKENARIO_K2B4B} speakGuru={a.speakGuru} onTuntas={() => selesai("pesta-pola")} />,
        };

        const tab = huruf === "A" ? [posisi, petunjuk, sawah] : [pabrik, mesin, pesta];
        return <LabBertahap tab={tab} label="Alat laboratorium posisi benda dan pola" />;
      },
    },
  ];
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab4 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab4(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab4Materi({
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
  const huruf = ["A", "B"].includes(sub) ? sub : "A";
  return (
    <SimulasiAlur
      judulBab={`Kelas 2 Bab 4 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab4(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
