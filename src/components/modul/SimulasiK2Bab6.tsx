"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabNeraca from "./SimulasiLabNeraca";
import SimulasiLabSatuan from "./SimulasiLabSatuan";
import SimulasiMesinTebak from "./SimulasiMesinTebak";
import SimulasiLabJam from "./SimulasiLabJam";
import SimulasiLabHari from "./SimulasiLabHari";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K2B6B } from "./skenario-k2b6";
import { daftarMisiK2Bab6, type KeadaanK2Bab6 } from "./misi-k2bab6";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 6 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* alat bertambah per sub-bab, dengan misi wajib dan tantangan bebas         */
/* (misi-k2bab6.ts).                                                         */
/*   Sub-Bab A (berat): Lab Neraca + Lab Satuan + Mesin Tebak dan Buktikan.  */
/*   Sub-Bab B (waktu, akhir): Lab Jam + Lab Hariku + skenario Hari Minggu   */
/*                             Kira (pencapaian misi bab ini).               */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

type Huruf = "A" | "B";

const MISI: Record<Huruf, string> = {
  A: "Timbang dua benda di Lab Neraca dan lihat sisi yang turun, cari dua benda yang sama berat, temukan benda besar yang ternyata ringan, ukur boneka dengan bola tenis dan satuan lain di Lab Satuan, lalu selesaikan Mesin Tebak dan Buktikan. Selesaikan misi wajib di bawah, urutannya bebas.",
  B: "Atur jam ke pukul 5 dan pukul 4 sore di Lab Jam, temukan dua waktu dengan jarum yang sama, urutkan kegiatan dan bandingkan lama kegiatan di Lab Hariku, lalu selesaikan skenario Hari Minggu Kira. Selesaikan semua misi wajib.",
};

const NAMA_SIM: Record<Huruf, string> = {
  A: "Lab Neraca, Lab Satuan, dan Mesin Tebak",
  B: "Waktu: Pencapaian Misi",
};

const hurufSub = (sub: string): Huruf => (sub === "B" ? "B" : "A");

const langkahK2Bab6 = (sub: string): LangkahSim[] => {
  const huruf = hurufSub(sub);
  const daftar = daftarMisiK2Bab6(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK2Bab6) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });

        const neraca: TabLab = {
          id: "neraca",
          nama: "Lab Neraca",
          render: () => <SimulasiLabNeraca speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const satuan: TabLab = {
          id: "satuan",
          nama: "Lab Satuan",
          render: () => <SimulasiLabSatuan speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const mesin: TabLab = {
          id: "mesin-tebak",
          nama: "Mesin Tebak dan Buktikan",
          render: () => <SimulasiMesinTebak speakGuru={a.speakGuru} onTuntas={() => selesai("mesin-tebak")} />,
        };
        const jam: TabLab = {
          id: "jam",
          nama: "Lab Jam",
          render: () => <SimulasiLabJam speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const hari: TabLab = {
          id: "hari",
          nama: "Lab Hariku",
          render: () => <SimulasiLabHari speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const minggu: TabLab = {
          id: "minggu-kira",
          nama: "Hari Minggu Kira",
          render: () => <SimulasiSkenario def={SKENARIO_K2B6B} speakGuru={a.speakGuru} onTuntas={() => selesai("minggu-kira")} />,
        };

        const tab = huruf === "A" ? [neraca, satuan, mesin] : [jam, hari, minggu];
        return <LabBertahap tab={tab} label="Alat laboratorium pengukuran" />;
      },
    },
  ];
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab6 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab6(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab6Materi({
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
      judulBab={`Kelas 2 Bab 6 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab6(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
