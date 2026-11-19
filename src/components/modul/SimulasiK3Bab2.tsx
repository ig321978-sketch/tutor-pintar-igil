"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { MISI_K3B2, hurufK3B2, misiAwalK3Bab2 } from "./misi-teks-k3b2";
import { laporMisi as laporMisiKayu } from "./misi-simulasi";
import { daftarMisiK3Bab2 } from "./misi-k3bab2";
import SimulasiTumpukanKayu from "./kayu-k3b2a/SimulasiTumpukanKayu";
import type { KeadaanKayu } from "./kayu-k3b2a/logika";
import { laporMisi as laporMisiPersediaan } from "./misi-simulasi";
import SimulasiPosPersediaan from "./botol-k3b2b/SimulasiPosPersediaan";
import type { KeadaanPersediaan } from "./botol-k3b2b/logika";

/* ======================================================================== */
/* Simulasi Kelas 3 Bab 2 di dalam Materi (tahap 4 SMISCPA), tema           */
/* Perkemahan Akhir Pekan: A Tumpukan Kayu, B Pos Persediaan.                */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkah-nya (impor dari folder      */
/* miliknya; render sekarang null) dan menambah impor yang dibutuhkan.        */
/* ======================================================================== */

/** Sub-Bab A: Tumpukan Kayu. */
const langkahTumpukanKayuA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Tumpukan Kayu",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B2.A,
  misiDaftar: daftarMisiK3Bab2("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiTumpukanKayu speakGuru={a.speakGuru} onKeadaan={(k: KeadaanKayu) => laporMisiKayu(daftarMisiK3Bab2("A"), k, a.capai)} />,
});

/** Sub-Bab B: Pos Persediaan. */
const langkahPosPersediaanB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Pos Persediaan",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B2.B,
  misiDaftar: daftarMisiK3Bab2("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPosPersediaan speakGuru={a.speakGuru} onKeadaan={(k: KeadaanPersediaan) => laporMisiPersediaan(daftarMisiK3Bab2("B"), k, a.capai)} />,
});

const langkahK3Bab2 = (sub: string): LangkahSim[] => {
  const huruf = hurufK3B2(sub);
  if (huruf === "A") return [langkahTumpukanKayuA()];
  if (huruf === "B") return [langkahPosPersediaanB()];
  return [langkahTumpukanKayuA()];
};

export { misiAwalK3Bab2 };

export default function SimulasiK3Bab2Materi({
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
  const huruf = hurufK3B2(sub);
  return (
    <SimulasiAlur
      judulBab={`Bab 2 · Sub-Bab ${huruf}`}
      langkah={langkahK3Bab2(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
