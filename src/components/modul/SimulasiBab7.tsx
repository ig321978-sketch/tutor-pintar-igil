"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import SimulasiMejaUkur from "./SimulasiMejaUkur";
import SimulasiBandingPanjang from "./SimulasiBandingPanjang";
import SimulasiPosisi from "./SimulasiPosisi";
import SimulasiSkenario from "./SimulasiSkenario";
import { SKENARIO_BAB7 } from "./skenario-kelas1";

/* ======================================================================== */
/* Simulasi Bab 7 di dalam Materi (tahap 4 SMISCPA, di antara Infografis    */
/* dan Concrete). Satu simulasi per layar, tiap simulasi diawali satu Misi. */
/* Tiap sub-bab memakai alat yang sesuai isi yang diajarkannya:            */
/*   Sub-Bab A (membandingkan dan mengurutkan): hanya dengan mata, tanpa    */
/*     angka dan tanpa satuan: Bandingkan Dua Pita, Paling Panjang dan      */
/*     Urutan (pensil), lalu Tinggi dan Rendah (posisi kupu-kupu).          */
/*   Sub-Bab B (mengukur): Meja Ukur (tebak, cara benar dan salah, alat     */
/*     berbeda), Bandingkan Hasil Ukur (pensil di kertas berpetak), lalu    */
/*     skenario Pita untuk Kado.                                            */
/* Tombol LANJUTKAN aktif setelah simulasinya disentuh sekali (semua mode   */
/* "sentuh"), supaya tahap ini ringan dan tidak menahan anak.               */
/* ======================================================================== */

const MAINKAN_DULU = "Mainkan dulu simulasinya, ya.";

const MISI = {
  duaPita: "Ketuk kedua pita. Lihat siapa yang lebih panjang dan siapa yang lebih pendek.",
  palingPensil: "Tekan plus pada satu pensil. Lihat siapa yang paling panjang dan siapa yang paling pendek.",
  posisi: "Tekan plus pada kupu-kupu kuning sampai lebih tinggi dari merah. Lihat siapa yang paling tinggi.",
  mejaUkur: "Tebak dulu panjang pita. Lalu letakkan stik satu per satu sampai pas di ujung pita. Lihat selisih tebakanmu.",
  hasilUkur: "Ketuk pensil Merah dan pensil Biru. Lihat berapa kotak bedanya.",
  kado: "Tekan Ayo mengukur! Lalu bantu Kak Dewi memilih pita.",
} as const;

const langkahBab7 = (sub: string): LangkahSim[] => {
  switch (sub) {
    case "B":
      return [
        {
          metode: "Lab 2D",
          sub: "Meja Ukur",
          petunjuk: MAINKAN_DULU,
          misi: MISI.mejaUkur,
          mode: "sentuh",
          render: (a) => <SimulasiMejaUkur speakGuru={a.speakGuru} />,
        },
        {
          metode: "PhET",
          sub: "Bandingkan Hasil Ukur",
          petunjuk: MAINKAN_DULU,
          misi: MISI.hasilUkur,
          mode: "sentuh",
          render: (a) => (
            <SimulasiBandingPanjang
              speakGuru={a.speakGuru}
              judul="Bandingkan Hasil Ukur"
              tampil={["sejajar", "paling", "dua"]}
              jumlah={4}
              gaya={{ benda: "pensil", satuan: "kotak", angka: true }}
              awal={[5, 9, 3, 6]}
            />
          ),
        },
        {
          metode: "Skenario",
          sub: "Pita untuk Kado",
          petunjuk: MAINKAN_DULU,
          misi: MISI.kado,
          mode: "sentuh",
          render: (a) => <SimulasiSkenario def={SKENARIO_BAB7} speakGuru={a.speakGuru} onTuntas={a.tuntas} />,
        },
      ];
    default:
      return [
        {
          metode: "PhET",
          sub: "Bandingkan Dua Pita",
          petunjuk: MAINKAN_DULU,
          misi: MISI.duaPita,
          mode: "sentuh",
          render: (a) => (
            <SimulasiBandingPanjang
              speakGuru={a.speakGuru}
              judul="Bandingkan Dua Pita"
              tampil={["sejajar", "dua"]}
              jumlah={2}
              gaya={{ benda: "pita", satuan: "stik", angka: false }}
              awal={[5, 8]}
            />
          ),
        },
        {
          metode: "PhET",
          sub: "Paling Panjang dan Urutan",
          petunjuk: MAINKAN_DULU,
          misi: MISI.palingPensil,
          mode: "sentuh",
          render: (a) => (
            <SimulasiBandingPanjang
              speakGuru={a.speakGuru}
              judul="Paling Panjang dan Urutan"
              tampil={["sejajar", "paling", "urut", "dua"]}
              jumlah={4}
              gaya={{ benda: "pensil", satuan: "stik", angka: false }}
            />
          ),
        },
        {
          metode: "PhET",
          sub: "Tinggi dan Rendah",
          petunjuk: MAINKAN_DULU,
          misi: MISI.posisi,
          mode: "sentuh",
          render: (a) => <SimulasiPosisi speakGuru={a.speakGuru} />,
        },
      ];
  }
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
