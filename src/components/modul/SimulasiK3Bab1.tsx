"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { laporMisi as laporMisiUrut } from "./misi-simulasi";
import SimulasiPapanUrut from "./urut-k3b1c/SimulasiPapanUrut";
import type { KeadaanUrutan } from "./urut-k3b1c/logika";
import { MISI_K3B1, hurufK3B1, misiAwalK3Bab1 } from "./misi-teks-k3b1";
import { laporMisi as laporMisiStok } from "./misi-simulasi";
import { laporMisi as laporMisiSisa } from "./misi-simulasi";
import SimulasiRakStok from "./tempat-k3b1a/SimulasiRakStok";
import type { KeadaanStok } from "./tempat-k3b1a/logika";
import { daftarMisiK3Bab1 } from "./misi-k3bab1";
import { laporMisi as laporMisiKotak } from "./misi-simulasi";
import SimulasiRakKotak from "./kali-k3b1f/SimulasiRakKotak";
import type { KeadaanIsi } from "./kali-k3b1f/logika";
import { laporMisi as laporMisiLabel } from "./misi-simulasi";
import SimulasiMejaLabel from "./kartu-k3b1b/SimulasiMejaLabel";
import type { KeadaanLabel } from "./kartu-k3b1b/logika";
import { laporMisi as laporMisiPesanan } from "./misi-simulasi";
import SimulasiMejaPesanan from "./tambah-k3b1d/SimulasiMejaPesanan";
import type { KeadaanPesanan } from "./tambah-k3b1d/logika";
import SimulasiRakSisa from "./kurang-k3b1e/SimulasiRakSisa";
import type { KeadaanSisa } from "./kurang-k3b1e/logika";
import { laporMisi as laporMisiBagi } from "./misi-simulasi";
import SimulasiMejaBingkisan from "./bagi-k3b1g/SimulasiMejaBingkisan";
import type { KeadaanBagi } from "./bagi-k3b1g/logika";

/* ======================================================================== */
/* Simulasi Kelas 3 Bab 1 di dalam Materi (tahap 4 SMISCPA), tema Toko       */
/* Kelontong Pak Joko: A Rak Stok, B Meja Label, C Papan Urut, D Meja        */
/* Pesanan, E Rak Sisa, F Rak Kotak, G Meja Bingkisan.                       */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkah-nya (impor dari folder      */
/* miliknya; render sekarang null) dan menambah impor yang dibutuhkan.        */
/* ======================================================================== */

/** Sub-Bab A: Rak Stok. */
const langkahRakStokA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Rak Stok",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B1.A,
  misiDaftar: daftarMisiK3Bab1("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiRakStok speakGuru={a.speakGuru} onKeadaan={(k: KeadaanStok) => laporMisiStok(daftarMisiK3Bab1("A"), k, a.capai)} />,
});

/** Sub-Bab B: Meja Label. */
const langkahMejaLabelB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Label",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B1.B,
  misiDaftar: daftarMisiK3Bab1("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMejaLabel speakGuru={a.speakGuru} onKeadaan={(k: KeadaanLabel) => laporMisiLabel(daftarMisiK3Bab1("B"), k, a.capai)} />,
});

/** Sub-Bab C: Papan Urut. */
const langkahPapanUrutC = (): LangkahSim => ({
  metode: "PhET",
  sub: "Papan Urut",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B1.C,
  misiDaftar: daftarMisiK3Bab1("C").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPapanUrut speakGuru={a.speakGuru} onKeadaan={(k: KeadaanUrutan) => laporMisiUrut(daftarMisiK3Bab1("C"), k, a.capai)} />,
});

/** Sub-Bab D: Meja Pesanan. */
const langkahMejaPesananD = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Pesanan",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B1.D,
  misiDaftar: daftarMisiK3Bab1("D").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMejaPesanan speakGuru={a.speakGuru} onKeadaan={(k: KeadaanPesanan) => laporMisiPesanan(daftarMisiK3Bab1("D"), k, a.capai)} />,
});

/** Sub-Bab E: Rak Sisa. */
const langkahRakSisaE = (): LangkahSim => ({
  metode: "PhET",
  sub: "Rak Sisa",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B1.E,
  misiDaftar: daftarMisiK3Bab1("E").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiRakSisa speakGuru={a.speakGuru} onKeadaan={(k: KeadaanSisa) => laporMisiSisa(daftarMisiK3Bab1("E"), k, a.capai)} />,
});

/** Sub-Bab F: Rak Kotak. */
const langkahRakKotakF = (): LangkahSim => ({
  metode: "PhET",
  sub: "Rak Kotak",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B1.F,
  misiDaftar: daftarMisiK3Bab1("F").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiRakKotak speakGuru={a.speakGuru} onKeadaan={(k: KeadaanIsi) => laporMisiKotak(daftarMisiK3Bab1("F"), k, a.capai)} />,
});

/** Sub-Bab G: Meja Bingkisan. */
const langkahMejaBingkisanG = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Bingkisan",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K3B1.G,
  misiDaftar: daftarMisiK3Bab1("G").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMejaBingkisan speakGuru={a.speakGuru} onKeadaan={(k: KeadaanBagi) => laporMisiBagi(daftarMisiK3Bab1("G"), k, a.capai)} />,
});

const langkahK3Bab1 = (sub: string): LangkahSim[] => {
  const huruf = hurufK3B1(sub);
  if (huruf === "A") return [langkahRakStokA()];
  if (huruf === "B") return [langkahMejaLabelB()];
  if (huruf === "C") return [langkahPapanUrutC()];
  if (huruf === "D") return [langkahMejaPesananD()];
  if (huruf === "E") return [langkahRakSisaE()];
  if (huruf === "F") return [langkahRakKotakF()];
  if (huruf === "G") return [langkahMejaBingkisanG()];
  return [langkahRakStokA()];
};

export { misiAwalK3Bab1 };

export default function SimulasiK3Bab1Materi({
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
  const huruf = hurufK3B1(sub);
  return (
    <SimulasiAlur
      judulBab={`Bab 1 · Sub-Bab ${huruf}`}
      langkah={langkahK3Bab1(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
