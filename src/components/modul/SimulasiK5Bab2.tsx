"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { MISI_K5B2, hurufK5B2, misiAwalK5Bab2 } from "./misi-teks-k5b2";
import { daftarMisiK5Bab2 } from "./misi-k5bab2";
import { laporMisi as laporMisiLonceng } from "./misi-simulasi";
import SimulasiLompatLonceng from "./lonceng-k5b2a/SimulasiLompatLonceng";
import type { KeadaanLonceng } from "./lonceng-k5b2a/logika";
import { laporMisi as laporMisiJadwal } from "./misi-simulasi";
import SimulasiDuaLonceng from "./jadwal-k5b2b/SimulasiDuaLonceng";
import type { KeadaanJadwal } from "./jadwal-k5b2b/logika";
import { laporMisi as laporMisiPiring } from "./misi-simulasi";
import SimulasiTataPiring from "./piring-k5b2c/SimulasiTataPiring";
import type { KeadaanPiring } from "./piring-k5b2c/logika";
import { laporMisi as laporMisiKotak } from "./misi-simulasi";
import SimulasiIsiKotak from "./kotak-k5b2d/SimulasiIsiKotak";
import type { KeadaanKotak } from "./kotak-k5b2d/logika";
import { laporMisi as laporMisiPapan } from "./misi-simulasi";
import SimulasiPohonPapan from "./papan-k5b2e/SimulasiPohonPapan";
import type { KeadaanPapan } from "./papan-k5b2e/logika";

/* ======================================================================== */
/* Simulasi Kelas 5 Bab 2 di dalam Materi (tahap 4 SMISCPA), tema           */
/* Pasar Kuliner Malam: A Lompat Lonceng, B Dua Lonceng, C Tata Piring,     */
/* D Isi Kotak, E Pohon Papan.                                               */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkah-nya (impor dari folder      */
/* miliknya; render sekarang null) dan menambah impor yang dibutuhkan.        */
/* ======================================================================== */

type Void = void;
const _tipe: [KeadaanLonceng?, KeadaanJadwal?, KeadaanPiring?, KeadaanKotak?, KeadaanPapan?, Void?] = [];
void _tipe;

/** Sub-Bab A: Lompat Lonceng. */
const langkahLompatLoncengA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Lompat Lonceng",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K5B2.A,
  misiDaftar: daftarMisiK5Bab2("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiLompatLonceng speakGuru={a.speakGuru} onKeadaan={(k: KeadaanLonceng) => laporMisiLonceng(daftarMisiK5Bab2("A"), k, a.capai)} />,
});

/** Sub-Bab B: Dua Lonceng. */
const langkahDuaLoncengB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Dua Lonceng",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K5B2.B,
  misiDaftar: daftarMisiK5Bab2("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiDuaLonceng speakGuru={a.speakGuru} onKeadaan={(k: KeadaanJadwal) => laporMisiJadwal(daftarMisiK5Bab2("B"), k, a.capai)} />,
});

/** Sub-Bab C: Tata Piring. */
const langkahTataPiringC = (): LangkahSim => ({
  metode: "PhET",
  sub: "Tata Piring",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K5B2.C,
  misiDaftar: daftarMisiK5Bab2("C").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiTataPiring speakGuru={a.speakGuru} onKeadaan={(k: KeadaanPiring) => laporMisiPiring(daftarMisiK5Bab2("C"), k, a.capai)} />,
});

/** Sub-Bab D: Isi Kotak. */
const langkahIsiKotakD = (): LangkahSim => ({
  metode: "PhET",
  sub: "Isi Kotak",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K5B2.D,
  misiDaftar: daftarMisiK5Bab2("D").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiIsiKotak speakGuru={a.speakGuru} onKeadaan={(k: KeadaanKotak) => laporMisiKotak(daftarMisiK5Bab2("D"), k, a.capai)} />,
});

/** Sub-Bab E: Pohon Papan. */
const langkahPohonPapanE = (): LangkahSim => ({
  metode: "PhET",
  sub: "Pohon Papan",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K5B2.E,
  misiDaftar: daftarMisiK5Bab2("E").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPohonPapan speakGuru={a.speakGuru} onKeadaan={(k: KeadaanPapan) => laporMisiPapan(daftarMisiK5Bab2("E"), k, a.capai)} />,
});

const langkahK5Bab2 = (sub: string): LangkahSim[] => {
  const huruf = hurufK5B2(sub);
  if (huruf === "A") return [langkahLompatLoncengA()];
  if (huruf === "B") return [langkahDuaLoncengB()];
  if (huruf === "C") return [langkahTataPiringC()];
  if (huruf === "D") return [langkahIsiKotakD()];
  if (huruf === "E") return [langkahPohonPapanE()];
  return [langkahLompatLoncengA()];
};

export { misiAwalK5Bab2 };

export default function SimulasiK5Bab2Materi({
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
  const huruf = hurufK5B2(sub);
  return (
    <SimulasiAlur
      judulBab={`Bab 2 · Sub-Bab ${huruf}`}
      langkah={langkahK5Bab2(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
