"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { MISI_K5B1, hurufK5B1, misiAwalK5Bab1 } from "./misi-teks-k5b1";
import { daftarMisiK5Bab1 as daftarMisiTribun } from "./misi-k5bab1";
import { laporMisi as laporMisiTribun } from "./misi-simulasi";
import SimulasiTabelTribun from "./tribun-k5b1a/SimulasiTabelTribun";
import type { KeadaanTribun } from "./tribun-k5b1a/logika";
import { daftarMisiK5Bab1 as daftarMisiUrutan } from "./misi-k5bab1";
import { laporMisi as laporMisiUrutan } from "./misi-simulasi";
import SimulasiGarisUrutan from "./urutan-k5b1b/SimulasiGarisUrutan";
import type { KeadaanUrutan } from "./urutan-k5b1b/logika";
import { daftarMisiK5Bab1 as daftarMisiBundel } from "./misi-k5bab1";
import { laporMisi as laporMisiBundel } from "./misi-simulasi";
import SimulasiTukarBundel from "./bundel-k5b1c/SimulasiTukarBundel";
import type { KeadaanBundel } from "./bundel-k5b1c/logika";
import { daftarMisiK5Bab1 as daftarMisiHitung } from "./misi-k5bab1";
import { laporMisi as laporMisiHitung } from "./misi-simulasi";
import SimulasiSusunHitung from "./hitung-k5b1d/SimulasiSusunHitung";
import type { KeadaanHitung } from "./hitung-k5b1d/logika";

/* ======================================================================== */
/* Simulasi Kelas 5 Bab 1 di dalam Materi (tahap 4 SMISCPA), tema           */
/* Hari Pertandingan di Stadion Kota: A Tabel Tribun, B Garis Urutan,        */
/* C Tukar Bundel, D Susun Hitung.                                           */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkah-nya (impor dari folder      */
/* miliknya; render sekarang null) dan menambah impor yang dibutuhkan.        */
/* ======================================================================== */

type Void = void;
const _tipe: [KeadaanTribun?, KeadaanUrutan?, KeadaanBundel?, KeadaanHitung?, Void?] = [];
void _tipe;

/** Sub-Bab A: Tabel Tribun. */
const langkahTabelTribunA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Tabel Tribun",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K5B1.A,
  misiDaftar: daftarMisiTribun("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiTabelTribun speakGuru={a.speakGuru} onKeadaan={(k: KeadaanTribun) => laporMisiTribun(daftarMisiTribun("A"), k, a.capai)} />,
});

/** Sub-Bab B: Garis Urutan. */
const langkahGarisUrutanB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Garis Urutan",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K5B1.B,
  misiDaftar: daftarMisiUrutan("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiGarisUrutan speakGuru={a.speakGuru} onKeadaan={(k: KeadaanUrutan) => laporMisiUrutan(daftarMisiUrutan("B"), k, a.capai)} />,
});

/** Sub-Bab C: Tukar Bundel. */
const langkahTukarBundelC = (): LangkahSim => ({
  metode: "PhET",
  sub: "Tukar Bundel",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K5B1.C,
  misiDaftar: daftarMisiBundel("C").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiTukarBundel speakGuru={a.speakGuru} onKeadaan={(k: KeadaanBundel) => laporMisiBundel(daftarMisiBundel("C"), k, a.capai)} />,
});

/** Sub-Bab D: Susun Hitung. */
const langkahSusunHitungD = (): LangkahSim => ({
  metode: "PhET",
  sub: "Susun Hitung",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K5B1.D,
  misiDaftar: daftarMisiHitung("D").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiSusunHitung speakGuru={a.speakGuru} onKeadaan={(k: KeadaanHitung) => laporMisiHitung(daftarMisiHitung("D"), k, a.capai)} />,
});

const langkahK5Bab1 = (sub: string): LangkahSim[] => {
  const huruf = hurufK5B1(sub);
  if (huruf === "A") return [langkahTabelTribunA()];
  if (huruf === "B") return [langkahGarisUrutanB()];
  if (huruf === "C") return [langkahTukarBundelC()];
  if (huruf === "D") return [langkahSusunHitungD()];
  return [langkahTabelTribunA()];
};

export { misiAwalK5Bab1 };

export default function SimulasiK5Bab1Materi({
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
  const huruf = hurufK5B1(sub);
  return (
    <SimulasiAlur
      judulBab={`Bab 1 · Sub-Bab ${huruf}`}
      langkah={langkahK5Bab1(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
