"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabTurus from "./SimulasiLabTurus";
import SimulasiMesinCatat from "./SimulasiMesinCatat";
import SimulasiLabBaca from "./SimulasiLabBaca";
import SimulasiLabGambar from "./SimulasiLabGambar";
import SimulasiMesinSusun from "./SimulasiMesinSusun";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K2B8B } from "./skenario-k2b8";
import { daftarMisiK2Bab8, type KeadaanK2Bab8 } from "./misi-k2bab8";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 8 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* alat bertambah per sub-bab, dengan misi wajib dan tantangan bebas         */
/* (misi-k2bab8.ts).                                                         */
/*   Sub-Bab A (diagram turus): Lab Turus + Mesin Catat Turus + Lab Baca      */
/*                             Turus.                                         */
/*   Sub-Bab B (diagram gambar, akhir): Lab Diagram Gambar + Mesin Susun      */
/*                             Diagram + skenario Survei Kira (pencapaian      */
/*                             misi bab ini).                                  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

type Huruf = "A" | "B";

const MISI: Record<Huruf, string> = {
  A: "Buat turus di Lab Turus sampai satu kelompok lima dan dua kelompok lima, buat data buah kesukaan, selesaikan Mesin Catat Turus, lalu bandingkan bebek dengan ayam dan cari yang paling banyak di Lab Baca Turus. Selesaikan misi wajib di bawah, urutannya bebas.",
  B: "Ganti lambang di Lab Diagram Gambar, buat data warna kesukaan, nyalakan turus dan gambar bersamaan, susun diagram di Mesin Susun Diagram, lalu selesaikan skenario Survei Kira. Selesaikan semua misi wajib.",
};

const NAMA_SIM: Record<Huruf, string> = {
  A: "Lab Turus, Mesin Catat, dan Lab Baca",
  B: "Diagram Gambar: Pencapaian Misi",
};

const hurufSub = (sub: string): Huruf => (sub === "B" ? "B" : "A");

const langkahK2Bab8 = (sub: string): LangkahSim[] => {
  const huruf = hurufSub(sub);
  const daftar = daftarMisiK2Bab8(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK2Bab8) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });

        const labTurus: TabLab = {
          id: "turus",
          nama: "Lab Turus",
          render: () => <SimulasiLabTurus speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const catat: TabLab = {
          id: "mesin-catat",
          nama: "Mesin Catat Turus",
          render: () => <SimulasiMesinCatat speakGuru={a.speakGuru} onTuntas={() => selesai("mesin-catat")} />,
        };
        const baca: TabLab = {
          id: "baca",
          nama: "Lab Baca Turus",
          render: () => <SimulasiLabBaca speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const labGambar: TabLab = {
          id: "gambar",
          nama: "Lab Diagram Gambar",
          render: () => <SimulasiLabGambar speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const susun: TabLab = {
          id: "susun-diagram",
          nama: "Mesin Susun Diagram",
          render: () => <SimulasiMesinSusun speakGuru={a.speakGuru} onTuntas={() => selesai("susun-diagram")} />,
        };
        const survei: TabLab = {
          id: "survei-kira",
          nama: "Survei Kira",
          render: () => <SimulasiSkenario def={SKENARIO_K2B8B} speakGuru={a.speakGuru} onTuntas={() => selesai("survei-kira")} />,
        };

        const tab = huruf === "A" ? [labTurus, catat, baca] : [labGambar, susun, survei];
        return <LabBertahap tab={tab} label="Alat laboratorium diagram" />;
      },
    },
  ];
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab8 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab8(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab8Materi({
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
  const huruf = hurufSub(sub);
  return (
    <SimulasiAlur
      judulBab={`Kelas 2 Bab 8 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab8(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
