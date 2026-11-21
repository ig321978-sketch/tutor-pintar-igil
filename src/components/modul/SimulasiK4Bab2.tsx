"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { MISI_K4B2, hurufK4B2, misiAwalK4Bab2 } from "./misi-teks-k4b2";
import { daftarMisiK4Bab2 as daftarMisiJahit } from "./misi-k4bab2";
import { laporMisi as laporMisiJahit } from "./misi-simulasi";
import SimulasiMejaJahit from "./jahit-k4b2c/SimulasiMejaJahit";
import type { KeadaanJahit } from "./jahit-k4b2c/logika";
import { daftarMisiK4Bab2 as daftarMisiPameran } from "./misi-k4bab2";
import { laporMisi as laporMisiPameran } from "./misi-simulasi";
import SimulasiPapanPameran from "./pameran-k4b2e/SimulasiPapanPameran";
import type { KeadaanPameran } from "./pameran-k4b2e/logika";
import { daftarMisiK4Bab2 as daftarMisiLipat } from "./misi-k4bab2";
import { laporMisi as laporMisiLipat } from "./misi-simulasi";
import SimulasiMejaLipat from "./lipat-k4b2a/SimulasiMejaLipat";
import type { KeadaanLipat } from "./lipat-k4b2a/logika";
import { daftarMisiK4Bab2 as daftarMisiWarna } from "./misi-k4bab2";
import { laporMisi as laporMisiWarna } from "./misi-simulasi";
import SimulasiBakWarna from "./warna-k4b2b/SimulasiBakWarna";
import type { KeadaanWarna } from "./warna-k4b2b/logika";
import { daftarMisiK4Bab2 as daftarMisiMeteran } from "./misi-k4bab2";
import { laporMisi as laporMisiMeteran } from "./misi-simulasi";
import SimulasiMeteranKain from "./meteran-k4b2d/SimulasiMeteranKain";
import type { KeadaanMeteran } from "./meteran-k4b2d/logika";

/* ======================================================================== */
/* Simulasi Kelas 4 Bab 2 di dalam Materi (tahap 4 SMISCPA), tema           */
/* Sanggar Batik Kampung Mekar: A Meja Lipat sampai E Papan Pameran.      */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkah-nya (impor dari folder      */
/* miliknya; render sekarang null) dan menambah impor yang dibutuhkan.        */
/* ======================================================================== */

/** Sub-Bab A: Meja Lipat. */
const langkahMejaLipatA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Lipat",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B2.A,
  misiDaftar: daftarMisiLipat("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMejaLipat speakGuru={a.speakGuru} onKeadaan={(k: KeadaanLipat) => laporMisiLipat(daftarMisiLipat("A"), k, a.capai)} />,
});

/** Sub-Bab B: Bak Warna. */
const langkahBakWarnaB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Bak Warna",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B2.B,
  misiDaftar: daftarMisiWarna("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiBakWarna speakGuru={a.speakGuru} onKeadaan={(k: KeadaanWarna) => laporMisiWarna(daftarMisiWarna("B"), k, a.capai)} />,
});

/** Sub-Bab C: Meja Jahit. */
const langkahMejaJahitC = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Jahit",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B2.C,
  misiDaftar: daftarMisiJahit("C").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMejaJahit speakGuru={a.speakGuru} onKeadaan={(k: KeadaanJahit) => laporMisiJahit(daftarMisiJahit("C"), k, a.capai)} />,
});

/** Sub-Bab D: Meteran Kain. */
const langkahMeteranKainD = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meteran Kain",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B2.D,
  misiDaftar: daftarMisiMeteran("D").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMeteranKain speakGuru={a.speakGuru} onKeadaan={(k: KeadaanMeteran) => laporMisiMeteran(daftarMisiMeteran("D"), k, a.capai)} />,
});

/** Sub-Bab E: Papan Pameran. */
const langkahPapanPameranE = (): LangkahSim => ({
  metode: "PhET",
  sub: "Papan Pameran",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B2.E,
  misiDaftar: daftarMisiPameran("E").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPapanPameran speakGuru={a.speakGuru} onKeadaan={(k: KeadaanPameran) => laporMisiPameran(daftarMisiPameran("E"), k, a.capai)} />,
});

const langkahK4Bab2 = (sub: string): LangkahSim[] => {
  const huruf = hurufK4B2(sub);
  if (huruf === "A") return [langkahMejaLipatA()];
  if (huruf === "B") return [langkahBakWarnaB()];
  if (huruf === "C") return [langkahMejaJahitC()];
  if (huruf === "D") return [langkahMeteranKainD()];
  if (huruf === "E") return [langkahPapanPameranE()];
  return [langkahMejaLipatA()];
};

export { misiAwalK4Bab2 };

export default function SimulasiK4Bab2Materi({
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
  const huruf = hurufK4B2(sub);
  return (
    <SimulasiAlur
      judulBab={`Bab 2 · Sub-Bab ${huruf}`}
      langkah={langkahK4Bab2(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
