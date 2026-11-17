"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiKurang, { SEMUA_TAMPIL_KURANG, type TampilKurang } from "./SimulasiKurang";
import SimulasiMesinBus from "./SimulasiMesinBus";
import SimulasiSkenario from "./SimulasiSkenario";
import SimulasiKotakBekal from "./bekal-k1b3a/SimulasiKotakBekal";
import SimulasiKursiKereta from "./peron-k1b3b/SimulasiKursiKereta";
import { SKENARIO_BAB3 } from "./skenario-kelas1";
import { daftarMisiBab3, type KeadaanBab3 } from "./misi-bab3";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Bab 3 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Pola hibrida: satu laboratorium yang alatnya bertambah    */
/* per sub-bab, dengan misi wajib dan tantangan bebas (misi-bab3.ts).       */
/*   Sub-Bab A (Cerita Pengurangan): Kotak Bekal, Misi Perjalanan bagian    */
/*     satu, cerita Kereta ke Rumah Nenek (bekal-k1b3a).                    */
/*   Sub-Bab B (Berbagai Cara): Kursi Kereta Lanjutan, Misi Pindah Kereta   */
/*     bagian satu (peron-k1b3b).                                           */
/*   Sub-Bab C (Keluarga Bilangan): + keluarga fakta dan tab Bus Sekolah.   */
/*   Sub-Bab D (Soal Cerita, sub-bab akhir): semua alat + tab Pesta Jeruk,  */
/*     sekaligus simulasi pencapaian misi bab ini.                          */
/* Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak memilih       */
/* "Lewati misi" setelah mencoba. Simulasi tidak memberi Poin Kualifikasi.  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Misi Perjalanan bagian satu: ambil bekal dari kotak bersekat, lihat sisanya, lalu catat kalimat pengurangannya. Urutannya bebas.",
  B: "Misi Pindah Kereta bagian satu: atur kursi kereta lanjutan, lihat bagan, garis bilangan, dan dua kalimatnya, lalu catat. Urutannya bebas.",
  C: "Temukan keluarga bilangan, periksa dengan tambah, dan bantu Bus Sekolah. Selesaikan misi wajib, lalu coba tantangan bebas.",
  D: "Ubah soal cerita menjadi pengurangan, periksa jawabanmu, dan bantu Bu Lina di pesta. Selesaikan semua misi wajib, lalu coba tantangan bebas.",
} as const;

const TAMPIL: Record<"A" | "B" | "C" | "D", TampilKurang[]> = {
  A: ["benda", "kalimat", "bingkai"],
  B: ["benda", "kalimat", "bingkai", "garis", "dua", "bagan"],
  C: SEMUA_TAMPIL_KURANG,
  D: SEMUA_TAMPIL_KURANG,
};

const langkahBab3 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C", "D"].includes(sub) ? sub : "A") as "A" | "B" | "C" | "D";
  const daftar = daftarMisiBab3(huruf);
  return [
    {
      metode: "PhET",
      sub: huruf === "D" ? "Lab Pengurangan: Pencapaian Misi" : huruf === "A" ? "Kotak Bekal" : huruf === "B" ? "Kursi Kereta Lanjutan" : "Lab Pengurangan",
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanBab3) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const kurang: TabLab = { id: "kurang", nama: "Pengurangan", render: () => <SimulasiKurang speakGuru={a.speakGuru} tampil={TAMPIL[huruf]} onKeadaan={lapor} /> };
        const bus: TabLab = { id: "bus", nama: "Bus Sekolah", render: () => <SimulasiMesinBus speakGuru={a.speakGuru} onTuntas={() => selesai("bus")} /> };
        const pesta: TabLab = { id: "pesta", nama: "Pesta Jeruk", render: () => <SimulasiSkenario def={SKENARIO_BAB3} speakGuru={a.speakGuru} onTuntas={() => selesai("pesta")} /> };
        const kotakBekal: TabLab = { id: "bekal", nama: "Kotak Bekal", render: () => <SimulasiKotakBekal speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const kursiKereta: TabLab = { id: "kursi", nama: "Kursi Kereta", render: () => <SimulasiKursiKereta speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const tab = huruf === "A" ? [kotakBekal] : huruf === "B" ? [kursiKereta] : huruf === "C" ? [kurang, bus] : [kurang, bus, pesta];
        return <LabBertahap tab={tab} label="Alat laboratorium pengurangan" />;
      },
    },
  ];
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalBab3 = (sub: string): string => `Simulasi 1. Misi: ${langkahBab3(sub)[0].misi ?? ""}`;

export default function SimulasiBab3Materi({
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
  return <SimulasiAlur judulBab={`Bab 3 · Sub-Bab ${huruf}`} langkah={langkahBab3(sub)} speakGuru={speakGuru} onSelesai={onSelesai} teksAkhir={teksAkhir} dalamPopup />;
}