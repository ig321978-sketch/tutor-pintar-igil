"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { MISI_K3B3, hurufK3B3, misiAwalK3Bab3 } from "./misi-teks-k3b3";
import { daftarMisiK3Bab3 } from "./misi-k3bab3";
import { laporMisi as laporMisiPita } from "./misi-simulasi";
import SimulasiBengkelPita from "./pita-k3b3b/SimulasiBengkelPita";
import type { KeadaanPita } from "./pita-k3b3b/logika";
import { laporMisi as laporMisiUkur } from "./misi-simulasi";
import SimulasiMejaUkur from "./ukur-k3b3a/SimulasiMejaUkur";
import type { KeadaanUkur } from "./ukur-k3b3a/logika";
import { laporMisi as laporMisiTimbang } from "./misi-simulasi";
import SimulasiGudangTimbang from "./timbang-k3b3c/SimulasiGudangTimbang";
import type { KeadaanTimbang } from "./timbang-k3b3c/logika";
import { laporMisi as laporMisiBandul } from "./misi-simulasi";
import SimulasiMejaBandul from "./bandul-k3b3d/SimulasiMejaBandul";
import type { KeadaanBandul } from "./bandul-k3b3d/logika";

/* ======================================================================== */
/* Simulasi Kelas 3 Bab 3 di dalam Materi (tahap 4 SMISCPA), tema           */
/* Kebun Binatang Mini: A Meja Ukur, B Bengkel Pita, C Gudang Timbang, D Meja Bandul.*/
/* KERANGKA: agen Sub-Bab mengisi fungsi langkah-nya (impor dari folder      */
/* miliknya; render sekarang null) dan menambah impor yang dibutuhkan.        */
/* ======================================================================== */

/** Sub-Bab A: Meja Ukur. */
const langkahMejaUkurA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Ukur",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B3.A,
  misiDaftar: daftarMisiK3Bab3("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMejaUkur speakGuru={a.speakGuru} onKeadaan={(k: KeadaanUkur) => laporMisiUkur(daftarMisiK3Bab3("A"), k, a.capai)} />,
});

/** Sub-Bab B: Bengkel Pita. */
const langkahBengkelPitaB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Bengkel Pita",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B3.B,
  misiDaftar: daftarMisiK3Bab3("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiBengkelPita speakGuru={a.speakGuru} onKeadaan={(k: KeadaanPita) => laporMisiPita(daftarMisiK3Bab3("B"), k, a.capai)} />,
});

/** Sub-Bab C: Gudang Timbang. */
const langkahGudangTimbangC = (): LangkahSim => ({
  metode: "PhET",
  sub: "Gudang Timbang",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B3.C,
  misiDaftar: daftarMisiK3Bab3("C").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiGudangTimbang speakGuru={a.speakGuru} onKeadaan={(k: KeadaanTimbang) => laporMisiTimbang(daftarMisiK3Bab3("C"), k, a.capai)} />,
});

/** Sub-Bab D: Meja Bandul. */
const langkahMejaBandulD = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Bandul",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B3.D,
  misiDaftar: daftarMisiK3Bab3("D").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMejaBandul speakGuru={a.speakGuru} onKeadaan={(k: KeadaanBandul) => laporMisiBandul(daftarMisiK3Bab3("D"), k, a.capai)} />,
});

const langkahK3Bab3 = (sub: string): LangkahSim[] => {
  const huruf = hurufK3B3(sub);
  if (huruf === "A") return [langkahMejaUkurA()];
  if (huruf === "B") return [langkahBengkelPitaB()];
  if (huruf === "C") return [langkahGudangTimbangC()];
  if (huruf === "D") return [langkahMejaBandulD()];
  return [langkahMejaUkurA()];
};

export { misiAwalK3Bab3 };

export default function SimulasiK3Bab3Materi({
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
  const huruf = hurufK3B3(sub);
  return (
    <SimulasiAlur
      judulBab={`Bab 3 · Sub-Bab ${huruf}`}
      langkah={langkahK3Bab3(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
