"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import LabPanjang from "./LabPanjang";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB7 } from "./skenario-kelas1";
import { daftarMisiBab7, type KeadaanBab7 } from "./misi-bab7";

/* ======================================================================== */
/* Simulasi Bab 7 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Pola hibrida: simulasi bertahap, misi, tantangan bebas.   */
/*   Sub-Bab A: Laboratorium Panjang tahap A (Bandingkan pensil tanpa       */
/*     angka, Tinggi dan Rendah). Misi wajib lalu tantangan bebas.          */
/*   Sub-Bab B (sub-bab akhir): Laboratorium Panjang tahap B = alat A       */
/*     ditambah Meja Ukur, sekaligus simulasi pencapaian misi bab ini;      */
/*     disusul skenario Pita untuk Kado.                                    */
/* Tombol LANJUTKAN aktif bila misi wajib tercapai, atau anak memilih       */
/* "Lewati misi" setelah mencoba. Simulasi tidak memberi Poin Kualifikasi.  */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  A: "Bandingkan pensil dan kupu-kupu. Selesaikan misi di bawah, urutannya bebas.",
  B: "Ukur, tebak, dan bandingkan. Selesaikan misi wajib, lalu coba tantangan bebas.",
  kado: "Tekan Ayo mengukur! Lalu bantu Kak Dewi memilih pita.",
} as const;

const tampilMisi = (sub: string) => daftarMisiBab7(sub).map(({ id, teks, wajib }) => ({ id, teks, wajib }));

const langkahBab7 = (sub: string): LangkahSim[] => {
  const huruf = sub === "B" ? "B" : "A";
  const daftar = daftarMisiBab7(huruf);
  const lab: LangkahSim = {
    metode: "PhET",
    sub: huruf === "B" ? "Lab Panjang: Pencapaian Misi" : "Lab Panjang",
    petunjuk: MAINKAN_DULU,
    misi: MISI[huruf],
    misiDaftar: tampilMisi(huruf),
    mode: "sentuh",
    render: (a) => (
      <LabPanjang
        tahap={huruf}
        speakGuru={a.speakGuru}
        onKeadaan={(k: KeadaanBab7) => {
          for (const d of daftar) if (d.cek(k)) a.capai(d.id);
        }}
      />
    ),
  };
  if (huruf === "A") return [lab];
  return [
    lab,
    {
      metode: "Skenario",
      sub: "Pita untuk Kado",
      petunjuk: MAINKAN_DULU,
      misi: MISI.kado,
      mode: "sentuh",
      render: (a) => <SimulasiSkenario def={SKENARIO_BAB7} speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
    },
  ];
};

/** Misi simulasi pertama sub-bab, untuk digabung ke ucapan saat tahap Simulasi dibuka. */
export const misiAwalBab7 = (sub: string): string => `Simulasi 1. Misi: ${langkahBab7(sub)[0].misi ?? ""}`;

export default function SimulasiBab7Materi({
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
  const huruf = ["A", "B"].includes(sub) ? sub : "A";
  return <SimulasiAlur judulBab={`Bab 7 · Sub-Bab ${huruf}`} langkah={langkahBab7(sub)} speakGuru={speakGuru} onSelesai={onSelesai} teksAkhir={teksAkhir} dalamPopup />;
}