"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiCaraHitung from "./SimulasiCaraHitung";
import SimulasiLabCerita from "./SimulasiLabCerita";
import SimulasiMesinSimpan from "./SimulasiMesinSimpan";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_K2B2 } from "./skenario-k2b2";
import { TAMPIL_CARA_A, SEMUA_TAMPIL_CARA } from "./lab-cara-k2b2";
import { daftarMisiK2Bab2, type KeadaanK2Bab2 } from "./misi-k2bab2";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Kelas 2 Bab 2 di dalam Materi (tahap 4 SMISCPA). Pola hibrida:  */
/* alat bertambah per sub-bab, dengan misi wajib dan tantangan bebas         */
/* (misi-k2bab2.ts).                                                         */
/*   Sub-Bab A (penjumlahan): Lab Cara Hitung (tambah) + Mesin Simpan.       */
/*   Sub-Bab B (pengurangan): Lab Cara Hitung (+ kurang, Selisih, Periksa,   */
/*                            Tambah sampai pas) + Mesin Urai.               */
/*   Sub-Bab C (akhir): Lab Soal Cerita + Lab Cara Hitung penuh + skenario   */
/*                      Jambu dan Burung.                                    */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Buat penjumlahan sampai 20 dengan garis, pasangan, dan bersusun, lalu simpan sepuluh satuan di Mesin Simpan. Selesaikan misi wajib di bawah, urutannya bebas.",
  B: "Kurangkan dengan garis, selisih, dan bersusun, urai satu puluhan di Mesin Urai, lalu periksa dengan penjumlahan. Selesaikan misi wajib, lalu coba tantangan bebas.",
  C: "Pilih jenis soal cerita, baca kata kuncinya, lihat batangnya, lalu selesaikan skenario Jambu dan Burung. Selesaikan semua misi wajib.",
} as const;

const NAMA_SIM = {
  A: "Lab Cara Hitung: Penjumlahan",
  B: "Lab Cara Hitung: Pengurangan",
  C: "Lab Soal Cerita: Pencapaian Misi",
} as const;

const langkahK2Bab2 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C"].includes(sub) ? sub : "A") as "A" | "B" | "C";
  const daftar = daftarMisiK2Bab2(huruf);
  return [
    {
      metode: "PhET",
      sub: NAMA_SIM[huruf],
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanK2Bab2) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });

        const caraA: TabLab = {
          id: "cara",
          nama: "Lab Cara Hitung",
          render: () => <SimulasiCaraHitung speakGuru={a.speakGuru} tampil={TAMPIL_CARA_A} ops={["tambah"]} onKeadaan={lapor} />,
        };
        const caraB: TabLab = {
          id: "cara",
          nama: "Lab Cara Hitung",
          render: () => <SimulasiCaraHitung speakGuru={a.speakGuru} tampil={SEMUA_TAMPIL_CARA} opAwal="kurang" onKeadaan={lapor} />,
        };
        const caraC: TabLab = {
          id: "cara",
          nama: "Lab Cara Hitung",
          render: () => <SimulasiCaraHitung speakGuru={a.speakGuru} tampil={SEMUA_TAMPIL_CARA} onKeadaan={lapor} />,
        };
        const simpan: TabLab = {
          id: "simpan",
          nama: "Mesin Simpan",
          render: () => <SimulasiMesinSimpan speakGuru={a.speakGuru} ragam="tambah" onTuntas={() => selesai("simpan")} />,
        };
        const urai: TabLab = {
          id: "urai",
          nama: "Mesin Urai",
          render: () => <SimulasiMesinSimpan speakGuru={a.speakGuru} ragam="kurang" onTuntas={() => selesai("urai")} />,
        };
        const cerita: TabLab = {
          id: "cerita",
          nama: "Lab Soal Cerita",
          render: () => <SimulasiLabCerita speakGuru={a.speakGuru} onKeadaan={lapor} />,
        };
        const skenario: TabLab = {
          id: "skenario",
          nama: "Jambu dan Burung",
          render: () => <SimulasiSkenario def={SKENARIO_K2B2} speakGuru={a.speakGuru} onTuntas={() => selesai("jambu-burung")} />,
        };

        const tab = huruf === "A" ? [caraA, simpan] : huruf === "B" ? [caraB, urai] : [cerita, caraC, skenario];
        return <LabBertahap tab={tab} label="Alat laboratorium penjumlahan dan pengurangan" />;
      },
    },
  ];
};

/** Misi simulasi pertama sub-bab, digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalK2Bab2 = (sub: string): string => `Simulasi 1. Misi: ${langkahK2Bab2(sub)[0].misi ?? ""}`;

export default function SimulasiK2Bab2Materi({
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
      judulBab={`Kelas 2 Bab 2 · Sub-Bab ${huruf}`}
      langkah={langkahK2Bab2(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
