"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLab50, { SEMUA_TAMPIL_LAB50, type TampilLab50 } from "./SimulasiLab50";
import SimulasiMesinTukar from "./SimulasiMesinTukar";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K2B1 } from "./skenario-k2b1";
import { daftarMisiK2Bab1, type KeadaanK2Bab1 } from "./misi-k2bab1";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 1 di dalam Materi (tahap 4 SMISCPA). Pola hibrida: */
/* satu laboratorium bilangan 50 yang alatnya bertambah per sub-bab, dengan */
/* misi wajib dan tantangan bebas (misi-k2bab1.ts).                         */
/*   Sub-Bab A: Lab batang, satuan, kalimat, garis.                         */
/*   Sub-Bab B: + tabel nilai tempat + tab Mesin Tukar.                     */
/*   Sub-Bab C (akhir): semua alat + Bandingkan + tab Stoples Permen.       */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Buat bilangan sampai 50 dengan batang, satuan, dan garis. Selesaikan misi wajib di bawah, urutannya bebas.",
  B: "Baca nilai tempat di tabel, lalu tukar sepuluh satuan di Mesin Tukar. Selesaikan misi wajib, lalu coba tantangan bebas.",
  C: "Bandingkan bilangan dengan nilai tempat, lalu selesaikan Stoples Permen Kira. Selesaikan semua misi wajib.",
} as const;

const TAMPIL: Record<"A" | "B" | "C", TampilLab50[]> = {
  A: ["batang", "satuan", "kalimat", "garis"],
  B: ["batang", "satuan", "tabel", "kalimat", "garis"],
  C: SEMUA_TAMPIL_LAB50,
};

const langkahK2Bab1 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C"].includes(sub) ? sub : "A") as "A" | "B" | "C";
  const daftar = daftarMisiK2Bab1(huruf);
  return [
    {
      metode: "PhET",
      sub: huruf === "C" ? "Lab Bilangan 50: Pencapaian Misi" : "Lab Bilangan 50",
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK2Bab1) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const lab: TabLab = {
          id: "lab50",
          nama: "Lab Bilangan 50",
          render: () => <SimulasiLab50 speakGuru={a.speakGuru} tampil={TAMPIL[huruf]} onKeadaan={lapor} />,
        };
        const tukar: TabLab = {
          id: "tukar",
          nama: "Mesin Tukar",
          render: () => <SimulasiMesinTukar speakGuru={a.speakGuru} onTuntas={() => selesai("tukar")} />,
        };
        const stoples: TabLab = {
          id: "stoples",
          nama: "Stoples Permen",
          render: () => <SimulasiSkenario def={SKENARIO_K2B1} speakGuru={a.speakGuru} onTuntas={() => selesai("stoples")} />,
        };
        const tab = huruf === "A" ? [lab] : huruf === "B" ? [lab, tukar] : [lab, tukar, stoples];
        return <LabBertahap tab={tab} label="Alat laboratorium bilangan 50" />;
      },
    },
  ];
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab1 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab1(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab1Materi({
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
      judulBab={`Kelas 2 Bab 1 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab1(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
