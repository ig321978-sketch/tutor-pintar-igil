"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabSeratus from "./SimulasiLabSeratus";
import SimulasiLabTabel from "./SimulasiLabTabel";
import SimulasiMesinTebakBanyak from "./SimulasiMesinTebakBanyak";
import SimulasiLabGaris from "./SimulasiLabGaris";
import SimulasiLabBanding from "./SimulasiLabBanding";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K2B7B } from "./skenario-k2b7";
import { daftarMisiK2Bab7, type KeadaanK2Bab7 } from "./misi-k2bab7";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 7 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* alat bertambah per sub-bab, dengan misi wajib dan tantangan bebas         */
/* (misi-k2bab7.ts).                                                         */
/*   Sub-Bab A (menghitung, membaca, menulis): Lab Seratus + Tabel Seratus   */
/*                             + Mesin Tebak Banyak.                          */
/*   Sub-Bab B (membandingkan, akhir): Lab Garis Seratus + Lab Banding dan    */
/*                             Urut + skenario Kelereng Kira (pencapaian      */
/*                             misi bab ini).                                 */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

type Huruf = "A" | "B";

const MISI: Record<Huruf, string> = {
  A: "Buat seratus dan ikat sepuluh satuan lepas menjadi satu puluhan di Lab Seratus, buat lima puluhan dan tiga satuan, bandingkan enam puluh dua dengan dua puluh enam, lompat turun empat kali di Tabel Seratus, lalu selesaikan Mesin Tebak Banyak. Selesaikan misi wajib di bawah, urutannya bebas.",
  B: "Maju dan mundur di Lab Garis Seratus, bandingkan puluhan dan satuan di Lab Banding dan Urut, urutkan tiga bilangan dari yang paling kecil, lalu selesaikan skenario Kelereng Kira. Selesaikan semua misi wajib.",
};

const NAMA_SIM: Record<Huruf, string> = {
  A: "Lab Seratus, Tabel Seratus, dan Mesin Tebak",
  B: "Membandingkan: Pencapaian Misi",
};

const hurufSub = (sub: string): Huruf => (sub === "B" ? "B" : "A");

const langkahK2Bab7 = (sub: string): LangkahSim[] => {
  const huruf = hurufSub(sub);
  const daftar = daftarMisiK2Bab7(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK2Bab7) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });

        const seratus: TabLab = {
          id: "seratus",
          nama: "Lab Seratus",
          render: () => <SimulasiLabSeratus speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const tabel: TabLab = {
          id: "tabel",
          nama: "Tabel Seratus",
          render: () => <SimulasiLabTabel speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const tebak: TabLab = {
          id: "tebak-banyak",
          nama: "Mesin Tebak Banyak",
          render: () => <SimulasiMesinTebakBanyak speakGuru={a.speakGuru} onTuntas={() => selesai("tebak-banyak")} />,
        };
        const garis: TabLab = {
          id: "garis",
          nama: "Lab Garis Seratus",
          render: () => <SimulasiLabGaris speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const banding: TabLab = {
          id: "banding",
          nama: "Lab Banding dan Urut",
          render: () => <SimulasiLabBanding speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const kelereng: TabLab = {
          id: "kelereng-kira",
          nama: "Kelereng Kira",
          render: () => <SimulasiSkenario def={SKENARIO_K2B7B} speakGuru={a.speakGuru} onTuntas={() => selesai("kelereng-kira")} />,
        };

        const tab = huruf === "A" ? [seratus, tabel, tebak] : [garis, banding, kelereng];
        return <LabBertahap tab={tab} label="Alat laboratorium bilangan sampai seratus" />;
      },
    },
  ];
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab7 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab7(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab7Materi({
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
      judulBab={`Kelas 2 Bab 7 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab7(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
