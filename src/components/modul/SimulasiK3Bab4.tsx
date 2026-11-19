"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { MISI_K3B4, hurufK3B4, misiAwalK3Bab4 } from "./misi-teks-k3b4";
import { daftarMisiK3Bab4 } from "./misi-k3bab4";
import { laporMisi as laporMisiBilah } from "./misi-simulasi";
import SimulasiMejaBilah from "./bilah-k3b4a/SimulasiMejaBilah";
import type { KeadaanBilah } from "./bilah-k3b4a/logika";
import { laporMisi as laporMisiSudut } from "./misi-simulasi";
import SimulasiLapanganSudut from "./sudut-k3b4b/SimulasiLapanganSudut";
import type { KeadaanSudut } from "./sudut-k3b4b/logika";
import { laporMisi as laporMisiLintasan } from "./misi-simulasi";
import SimulasiLintasanLomba from "./lintasan-k3b4c/SimulasiLintasanLomba";
import type { KeadaanLintasan } from "./lintasan-k3b4c/logika";

/* ======================================================================== */
/* Simulasi Kelas 3 Bab 4 di dalam Materi (tahap 4 SMISCPA), tema           */
/* Festival Layang-layang Kampung: A Meja Bilah, B Lapangan Sudut, C Lintasan Lomba.*/
/* KERANGKA: agen Sub-Bab mengisi fungsi langkah-nya (impor dari folder      */
/* miliknya; render sekarang null) dan menambah impor yang dibutuhkan.        */
/* ======================================================================== */

/** Sub-Bab A: Meja Bilah. */
const langkahMejaBilahA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Bilah",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B4.A,
  misiDaftar: daftarMisiK3Bab4("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMejaBilah speakGuru={a.speakGuru} onKeadaan={(k: KeadaanBilah) => laporMisiBilah(daftarMisiK3Bab4("A"), k, a.capai)} />,
});

/** Sub-Bab B: Lapangan Sudut. */
const langkahLapanganSudutB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Lapangan Sudut",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B4.B,
  misiDaftar: daftarMisiK3Bab4("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiLapanganSudut speakGuru={a.speakGuru} onKeadaan={(k: KeadaanSudut) => laporMisiSudut(daftarMisiK3Bab4("B"), k, a.capai)} />,
});

/** Sub-Bab C: Lintasan Lomba. */
const langkahLintasanLombaC = (): LangkahSim => ({
  metode: "PhET",
  sub: "Lintasan Lomba",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B4.C,
  misiDaftar: daftarMisiK3Bab4("C").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiLintasanLomba speakGuru={a.speakGuru} onKeadaan={(k: KeadaanLintasan) => laporMisiLintasan(daftarMisiK3Bab4("C"), k, a.capai)} />,
});

const langkahK3Bab4 = (sub: string): LangkahSim[] => {
  const huruf = hurufK3B4(sub);
  if (huruf === "A") return [langkahMejaBilahA()];
  if (huruf === "B") return [langkahLapanganSudutB()];
  if (huruf === "C") return [langkahLintasanLombaC()];
  return [langkahMejaBilahA()];
};

export { misiAwalK3Bab4 };

export default function SimulasiK3Bab4Materi({
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
  const huruf = hurufK3B4(sub);
  return (
    <SimulasiAlur
      judulBab={`Bab 4 · Sub-Bab ${huruf}`}
      langkah={langkahK3Bab4(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
