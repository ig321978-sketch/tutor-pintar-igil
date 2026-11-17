"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabBertahap, { type TabLab } from "./LabBertahap";
import SimulasiTambah, { SEMUA_TAMPIL_TAMBAH, type TampilTambah } from "./SimulasiTambah";
import SimulasiMesinTambah from "./SimulasiMesinTambah";
import SimulasiSkenario from "./SimulasiSkenario";
import SimulasiBedengMamah from "./kebun-k1b2a/SimulasiBedengMamah";
import SimulasiMejaKemas from "./panen-k1b2b/SimulasiMejaKemas";
import { SKENARIO_BAB2 } from "./skenario-kelas1";
import { daftarMisiBab2, type KeadaanBab2 } from "./misi-bab2";
import { laporMisi, tampilMisi } from "./misi-simulasi";

/* ======================================================================== */
/* Simulasi Bab 2 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Pola hibrida: satu laboratorium yang alatnya bertambah    */
/* per sub-bab, dengan misi wajib dan tantangan bebas (misi-bab2.ts).       */
/*   Sub-Bab A (Cerita Penjumlahan): Bedeng Mamah, Misi Kebun bagian satu.  */
/*   Sub-Bab B (Berbagai Cara): Meja Kemas, Misi Panen bagian satu.         */
/*   Sub-Bab C (Soal Cerita, sub-bab akhir): semua alat + tab Kantin        */
/*     Sekolah, sekaligus simulasi pencapaian misi bab ini.                 */
/* Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak memilih       */
/* "Lewati misi" setelah mencoba. Simulasi tidak memberi Poin Kualifikasi.  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Misi Kebun bagian satu: tanam bibit kiriman ke bedeng Mamah, lalu catat kalimat penjumlahannya. Urutannya bebas.",
  B: "Misi Panen bagian satu: isi dua keranjang di meja kemas, tukar tempatnya, buat yang kembar dan yang penuh sepuluh, lalu catat kalimatnya.",
  C: "Ubah soal cerita menjadi penjumlahan, periksa jawabanmu, dan bantu Rani di kantin. Selesaikan semua misi wajib, lalu coba tantangan bebas.",
} as const;

const TAMPIL: Record<"A" | "B" | "C", TampilTambah[]> = {
  A: ["benda", "kalimat", "bingkai"],
  B: ["benda", "kalimat", "bagan", "tukar", "garis", "bingkai"],
  C: SEMUA_TAMPIL_TAMBAH,
};

const langkahBab2 = (sub: string): LangkahSim[] => {
  const huruf = (["A", "B", "C"].includes(sub) ? sub : "A") as "A" | "B" | "C";
  const daftar = daftarMisiBab2(huruf);
  return [
    {
      metode: "PhET",
      sub: huruf === "C" ? "Lab Penjumlahan: Pencapaian Misi" : huruf === "A" ? "Bedeng Mamah" : huruf === "B" ? "Meja Kemas" : "Lab Penjumlahan",
      petunjuk: MAINKAN_DULU,
      misi: MISI[huruf],
      misiDaftar: tampilMisi(daftar),
      mode: "sentuh",
      render: (a) => {
        const lapor = (k: KeadaanBab2) => laporMisi(daftar, k, a.capai);
        const selesai = (id: string) => lapor({ alat: "selesai", id });
        const tambah: TabLab = { id: "tambah", nama: "Penjumlahan", render: () => <SimulasiTambah speakGuru={a.speakGuru} tampil={TAMPIL[huruf]} onKeadaan={lapor} /> };
        const mesin: TabLab = { id: "mesin", nama: "Mesin Tambah", render: () => <SimulasiMesinTambah speakGuru={a.speakGuru} onTuntas={() => selesai("mesin")} /> };
        const kantin: TabLab = { id: "kantin", nama: "Kantin Sekolah", render: () => <SimulasiSkenario def={SKENARIO_BAB2} speakGuru={a.speakGuru} onTuntas={() => selesai("kantin")} /> };
        const bedeng: TabLab = { id: "bedeng", nama: "Bedeng Mamah", render: () => <SimulasiBedengMamah speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        const kemas: TabLab = { id: "kemas", nama: "Meja Kemas", render: () => <SimulasiMejaKemas speakGuru={a.speakGuru} onKeadaan={lapor} /> };
        return <LabBertahap tab={huruf === "A" ? [bedeng] : huruf === "B" ? [kemas] : [tambah, mesin, kantin]} label="Alat laboratorium penjumlahan" />;
      },
    },
  ];
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalBab2 = (sub: string): string => `Simulasi 1. Misi: ${langkahBab2(sub)[0].misi ?? ""}`;

export default function SimulasiBab2Materi({
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
  return <SimulasiAlur judulBab={`Bab 2 · Sub-Bab ${huruf}`} langkah={langkahBab2(sub)} speakGuru={speakGuru} onSelesai={onSelesai} teksAkhir={teksAkhir} dalamPopup />;
}