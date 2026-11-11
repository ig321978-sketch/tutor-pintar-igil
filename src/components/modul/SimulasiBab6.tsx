"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiBanding from "./SimulasiBanding";
import SimulasiLoncat from "./SimulasiLoncat";
import SimulasiJembatan from "./SimulasiJembatan";
import SimulasiBelasan from "./SimulasiBelasan";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB6 } from "./skenario-kelas1";

/* ======================================================================== */
/* Simulasi Bab 6 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Satu simulasi per layar, tiap simulasi diawali satu Misi. */
/* Tiap sub-bab memakai alat yang sesuai isi yang diajarkannya:            */
/*   Sub-Bab A (Lebih dari, Kurang dari, Selisih): Selisih Dua Kelompok     */
/*     (pasangkan, model batang, selisih), lalu Selisih di Garis Bilangan.  */
/*   Sub-Bab B (Penjumlahan kurang dari 20): Loncat Menjumlah (satu-satu    */
/*     atau lewat sepuluh), Jembatan Sepuluh (mesin keadaan), lalu          */
/*     Menjumlah Belasan dan Satuan (pasangan bilangan, nilai tempat).      */
/*   Sub-Bab C (Pengurangan kurang dari 20): Loncat Mengurang, Mengurang    */
/*     Belasan dan Satuan (termasuk periksa dengan penjumlahan), lalu       */
/*     skenario Loket Pasar Malam yang merangkum bab.                       */
/* Tombol LANJUTKAN aktif setelah simulasinya disentuh sekali (semua mode   */
/* "sentuh"), supaya tahap ini ringan dan tidak menahan anak.               */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  selisih: "Tekan plus pada jeruk Kira beberapa kali. Lihat jeruk yang tidak berpasangan dan selisihnya.",
  garisSelisih: "Atur bilangan pertama dan kedua. Lihat jarak dari yang kecil ke yang besar di garis bilangan.",
  loncatTambah: "Tekan plus pada Loncat maju, lalu bandingkan loncat satu-satu dengan lewat sepuluh. Lihat mana yang lebih sedikit lompatannya.",
  jembatan: "Tekan Baca soal. Lihat bilangan mana yang akan dipecah.",
  belasanTambah: "Tekan plus pada Ditambah. Lihat satuannya berubah, puluhannya tetap.",
  loncatKurang: "Tekan plus pada Loncat mundur sampai 6. Bandingkan loncat satu-satu dengan lewat sepuluh.",
  belasanKurang: "Tekan plus pada Dikurangi. Lihat satuannya berkurang, puluhannya tetap.",
  loket: "Tekan Buka loket! Lalu bantu Kak Tiket menghitung tiketnya.",
} as const;

const langkahBab6 = (sub: string): LangkahSim[] => {
  switch (sub) {
    case "B":
      return [
        {
          metode: "PhET",
          sub: "Loncat Menjumlah",
          petunjuk: MAINKAN_DULU,
          misi: MISI.loncatTambah,
          mode: "sentuh",
          render: (a) => <SimulasiLoncat speakGuru={a.speakGuru} ops={["tambah"]} />,
        },
        {
          metode: "Mesin keadaan",
          sub: "Jembatan Sepuluh",
          petunjuk: MAINKAN_DULU,
          misi: MISI.jembatan,
          mode: "sentuh",
          render: (a) => <SimulasiJembatan speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
        },
        {
          metode: "PhET",
          sub: "Menjumlah Belasan dan Satuan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.belasanTambah,
          mode: "sentuh",
          render: (a) => <SimulasiBelasan speakGuru={a.speakGuru} op="tambah" tampil={["benda", "tabel", "pecah"]} />,
        },
      ];
    case "C":
      return [
        {
          metode: "PhET",
          sub: "Loncat Mengurang",
          petunjuk: MAINKAN_DULU,
          misi: MISI.loncatKurang,
          mode: "sentuh",
          render: (a) => <SimulasiLoncat speakGuru={a.speakGuru} ops={["kurang"]} />,
        },
        {
          metode: "PhET",
          sub: "Mengurang Belasan dan Satuan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.belasanKurang,
          mode: "sentuh",
          render: (a) => <SimulasiBelasan speakGuru={a.speakGuru} op="kurang" tampil={["benda", "tabel", "pecah", "periksa"]} />,
        },
        {
          metode: "Skenario",
          sub: "Loket Pasar Malam",
          petunjuk: MAINKAN_DULU,
          misi: MISI.loket,
          mode: "sentuh",
          render: (a) => <SimulasiSkenario def={SKENARIO_BAB6} speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
        },
      ];
    default:
      return [
        {
          metode: "PhET",
          sub: "Selisih Dua Kelompok",
          petunjuk: MAINKAN_DULU,
          misi: MISI.selisih,
          mode: "sentuh",
          render: (a) => <SimulasiBanding speakGuru={a.speakGuru} tampil={["pasang", "batang", "selisih"]} />,
        },
        {
          metode: "PhET",
          sub: "Selisih di Garis Bilangan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.garisSelisih,
          mode: "sentuh",
          render: (a) => <SimulasiLoncat speakGuru={a.speakGuru} ops={["selisih"]} />,
        },
      ];
  }
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalBab6 = (sub: string): string => `Simulasi 1. Misi: ${langkahBab6(sub)[0].misi ?? ""}`;

export default function SimulasiBab6Materi({
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
  return <SimulasiAlur judulBab={`Bab 6 · Sub-Bab ${huruf}`} langkah={langkahBab6(sub)} speakGuru={speakGuru} onSelesai={onSelesai} teksAkhir={teksAkhir} dalamPopup />;
}
