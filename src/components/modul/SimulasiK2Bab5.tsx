"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiLabPotong from "./SimulasiLabPotong";
import SimulasiMesinBagian from "./SimulasiMesinBagian";
import SimulasiLabKumpulan from "./SimulasiLabKumpulan";
import SimulasiMesinKumpulan from "./SimulasiMesinKumpulan";
import SimulasiDindingPecahan from "./SimulasiDindingPecahan";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K2B5A, SKENARIO_K2B5B, SKENARIO_K2B5C } from "./skenario-k2b5";
import { daftarMisiK2Bab5, type KeadaanK2Bab5 } from "./misi-k2bab5";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 5 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* alat bertambah per sub-bab, dengan misi wajib dan tantangan bebas         */
/* (misi-k2bab5.ts).                                                         */
/*   Sub-Bab A (setengah, benda utuh): Lab Potong + Mesin Pemeriksa Bagian   */
/*                             + skenario Roti Bu Lili.                      */
/*   Sub-Bab B (setengah, kumpulan): Lab Kumpulan + Mesin Pembagi Adil       */
/*                             + skenario Bagi Adil di Kebun Tika.           */
/*   Sub-Bab C (seperempat, akhir): Lab Potong dua garis + Dinding Pecahan   */
/*                             + skenario Kue Ulang Tahun Upe.               */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

type Huruf = "A" | "B" | "C";

const MISI: Record<Huruf, string> = {
  A: "Belah persegi dan lingkaran menjadi dua bagian sama besar, geser garis sampai dua bagian tidak sama besar, periksa bentuk dengan Mesin Pemeriksa Bagian, lalu selesaikan skenario Roti Bu Lili. Selesaikan misi wajib di bawah, urutannya bebas.",
  B: "Bagi 6 dan 10 benda menjadi dua kelompok sama banyak, coba banyak benda yang ganjil, periksa kumpulan dengan Mesin Pembagi Adil, lalu selesaikan skenario Bagi Adil di Kebun Tika. Selesaikan semua misi wajib.",
  C: "Belah bentuk jadi empat bagian sama besar dan warnai satu lalu dua bagian, samakan dua seperempat dengan satu setengah di Dinding Pecahan, lalu selesaikan skenario Kue Ulang Tahun Upe. Selesaikan semua misi wajib.",
};

const NAMA_SIM: Record<Huruf, string> = {
  A: "Lab Potong dan Mesin Pemeriksa Bagian",
  B: "Lab Kumpulan dan Mesin Pembagi Adil",
  C: "Pecahan: Pencapaian Misi",
};

const hurufSub = (sub: string): Huruf => (sub === "B" || sub === "C" ? sub : "A");

const langkahK2Bab5 = (sub: string): LangkahSim[] => {
  const huruf = hurufSub(sub);
  const daftar = daftarMisiK2Bab5(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK2Bab5) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });

        const potongA: TabLab = {
          id: "potong",
          nama: "Lab Potong",
          render: () => <SimulasiLabPotong mode="A" speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const mesinBagian: TabLab = {
          id: "mesin-bagian",
          nama: "Mesin Pemeriksa Bagian",
          render: () => <SimulasiMesinBagian speakGuru={a.speakGuru} onTuntas={() => selesai("mesin-bagian")} />,
        };
        const roti: TabLab = {
          id: "roti",
          nama: "Roti Bu Lili",
          render: () => <SimulasiSkenario def={SKENARIO_K2B5A} speakGuru={a.speakGuru} onTuntas={() => selesai("roti-lili")} />,
        };
        const labKumpulan: TabLab = {
          id: "kumpulan",
          nama: "Lab Kumpulan",
          render: () => <SimulasiLabKumpulan speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const mesinKumpulan: TabLab = {
          id: "mesin-kumpulan",
          nama: "Mesin Pembagi Adil",
          render: () => <SimulasiMesinKumpulan speakGuru={a.speakGuru} onTuntas={() => selesai("mesin-kumpulan")} />,
        };
        const tika: TabLab = {
          id: "tika",
          nama: "Bagi Adil di Kebun Tika",
          render: () => <SimulasiSkenario def={SKENARIO_K2B5B} speakGuru={a.speakGuru} onTuntas={() => selesai("bagi-adil")} />,
        };
        const potongC: TabLab = {
          id: "potong-c",
          nama: "Lab Potong",
          render: () => <SimulasiLabPotong mode="C" speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const dinding: TabLab = {
          id: "dinding",
          nama: "Dinding Pecahan",
          render: () => <SimulasiDindingPecahan speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const upe: TabLab = {
          id: "upe",
          nama: "Kue Ulang Tahun Upe",
          render: () => <SimulasiSkenario def={SKENARIO_K2B5C} speakGuru={a.speakGuru} onTuntas={() => selesai("kue-upe")} />,
        };

        const tab = huruf === "A" ? [potongA, mesinBagian, roti] : huruf === "B" ? [labKumpulan, mesinKumpulan, tika] : [potongC, dinding, upe];
        return <LabBertahap tab={tab} label="Alat laboratorium pecahan" />;
      },
    },
  ];
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab5 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab5(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab5Materi({
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
      judulBab={`Kelas 2 Bab 5 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab5(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
