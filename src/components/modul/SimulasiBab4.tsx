"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiCiriBentuk from "./SimulasiCiriBentuk";
import SimulasiPapanPaku from "./SimulasiPapanPaku";
import SimulasiKelompok from "./SimulasiKelompok";
import SimulasiBangunGabungan from "./SimulasiBangunGabungan";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB4 } from "./skenario-kelas1";
import { daftarMisiBab4, type KeadaanBab4 } from "./misi-bab4";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Bab 4 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Pola hibrida: satu laboratorium bentuk yang alatnya       */
/* bertambah per sub-bab, dengan misi wajib dan tantangan bebas             */
/* (misi-bab4.ts).                                                          */
/*   Sub-Bab A (Mengenal Bentuk): tab Ciri Bentuk dan Papan Paku.           */
/*   Sub-Bab B (Mengelompokkan): + tab Kelompok.                            */
/*   Sub-Bab C (Menyusun Bentuk, sub-bab akhir): + menyusun bentuk,         */
/*     tab Bangun Gabungan dan Arsitek Cilik, sekaligus simulasi            */
/*     pencapaian misi bab ini.                                             */
/* Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak memilih       */
/* "Lewati misi" setelah mencoba. Simulasi tidak memberi Poin Kualifikasi.  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Putar dan besarkan bentuk, lalu buat bentuk di Papan Paku. Selesaikan misi di bawah, urutannya bebas.",
  B: "Kelompokkan balok dengan satu aturan, lalu ganti aturannya. Selesaikan misi wajib, lalu coba tantangan bebas.",
  C: "Susun bentuk, uraikan bangun, dan bantu Pak Arsitek. Selesaikan semua misi wajib, lalu coba tantangan bebas.",
} as const;

const langkahBab4 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C"].includes(sub) ? sub : "A") as "A" | "B" | "C";
  const daftar = daftarMisiBab4(huruf);
  return [
    {
      metode: "PhET",
      sub: huruf === "C" ? "Lab Bentuk: Pencapaian Misi" : "Lab Bentuk",
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanBab4) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const ciri: TabLab = {
          id: "ciri",
          nama: huruf === "C" ? "Ciri dan Susun" : "Ciri Bentuk",
          render: () => <SimulasiCiriBentuk speakGuru={a.speakGuru} tampil={huruf === "C" ? ["ciri", "menyusun"] : ["ciri"]} onKeadaan={lapor} />,
        };
        const papan: TabLab = { id: "papan", nama: "Papan Paku", render: () => <SimulasiPapanPaku speakGuru={a.speakGuru} tampilSiku={false} onKeadaan={lapor} /> };
        const kelompok: TabLab = { id: "kelompok", nama: "Kelompok", render: () => <SimulasiKelompok speakGuru={a.speakGuru} tampil={["benda", "tabel", "ciri", "kalimat"]} onKeadaan={lapor} /> };
        const bangun: TabLab = { id: "bangun", nama: "Bangun Gabungan", render: () => <SimulasiBangunGabungan speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const arsitek: TabLab = { id: "arsitek", nama: "Arsitek Cilik", render: () => <SimulasiSkenario def={SKENARIO_BAB4} speakGuru={a.speakGuru} onTuntas={() => selesai("arsitek")} /> };
        const tab = huruf === "A" ? [ciri, papan] : huruf === "B" ? [ciri, papan, kelompok] : [ciri, papan, kelompok, bangun, arsitek];
        return <LabBertahap tab={tab} label="Alat laboratorium bentuk" />;
      },
    },
  ];
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalBab4 = (sub: string): string => `Simulasi 1. Misi: ${langkahBab4(sub)[0].misi ?? ""}`;

export default function SimulasiBab4Materi({
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
  return <SimulasiAlur judulBab={`Bab 4 · Sub-Bab ${huruf}`} langkah={langkahBab4(sub)} speakGuru={speakGuru} onSelesai={onSelesai} teksAkhir={teksAkhir} dalamPopup />;
}