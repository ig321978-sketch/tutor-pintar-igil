"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { MISI_K4B1, hurufK4B1, misiAwalK4Bab1 } from "./misi-teks-k4b1";
import { daftarMisiK4Bab1 as daftarMisiTiket } from "./misi-k4bab1";
import { laporMisi as laporMisiTiket } from "./misi-simulasi";
import SimulasiLoketTiket from "./tiket-k4b1a/SimulasiLoketTiket";
import type { KeadaanTiket } from "./tiket-k4b1a/logika";
import { daftarMisiK4Bab1 as daftarMisiDermaga } from "./misi-k4bab1";
import { laporMisi as laporMisiDermaga } from "./misi-simulasi";
import SimulasiPapanDermaga from "./dermaga-k4b1c/SimulasiPapanDermaga";
import type { KeadaanDermaga } from "./dermaga-k4b1c/logika";
import { daftarMisiK4Bab1 as daftarMisiPerahu } from "./misi-k4bab1";
import { laporMisi as laporMisiPerahu } from "./misi-simulasi";
import SimulasiBarisPerahu from "./perahu-k4b1g/SimulasiBarisPerahu";
import type { KeadaanPerahu } from "./perahu-k4b1g/logika";
import { daftarMisiK4Bab1 as daftarMisiHanduk } from "./misi-k4bab1";
import { laporMisi as laporMisiHanduk } from "./misi-simulasi";
import SimulasiGudangHanduk from "./handuk-k4b1b/SimulasiGudangHanduk";
import type { KeadaanHanduk } from "./handuk-k4b1b/logika";
import { daftarMisiK4Bab1 as daftarMisiSisa } from "./misi-k4bab1";
import { laporMisi as laporMisiSisa } from "./misi-simulasi";
import SimulasiPapanSisa from "./sisa-k4b1f/SimulasiPapanSisa";
import type { KeadaanSisa } from "./sisa-k4b1f/logika";
import { daftarMisiK4Bab1 as daftarMisiKelapa } from "./misi-k4bab1";
import { laporMisi as laporMisiKelapa } from "./misi-simulasi";
import SimulasiKiosKelapa from "./kelapa-k4b1d/SimulasiKiosKelapa";
import type { KeadaanKelapa } from "./kelapa-k4b1d/logika";
import { daftarMisiK4Bab1 as daftarMisiResepsi } from "./misi-k4bab1";
import { laporMisi as laporMisiResepsi } from "./misi-simulasi";
import SimulasiMejaResepsi from "./resepsi-k4b1e/SimulasiMejaResepsi";
import type { KeadaanResepsi } from "./resepsi-k4b1e/logika";
import { daftarMisiK4Bab1 as daftarMisiJatah } from "./misi-k4bab1";
import { laporMisi as laporMisiJatah } from "./misi-simulasi";
import SimulasiPapanJatah from "./jatah-k4b1h/SimulasiPapanJatah";
import type { KeadaanJatah } from "./jatah-k4b1h/logika";
import { daftarMisiK4Bab1 as daftarMisiJadwal } from "./misi-k4bab1";
import { laporMisi as laporMisiJadwal } from "./misi-simulasi";
import SimulasiPapanJadwal from "./jadwal-k4b1i/SimulasiPapanJadwal";
import type { KeadaanJadwal } from "./jadwal-k4b1i/logika";

/* ======================================================================== */
/* Simulasi Kelas 4 Bab 1 di dalam Materi (tahap 4 SMISCPA), tema           */
/* Penginapan Pulau Karang Indah: A Loket Tiket sampai I Papan Jadwal.      */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkah-nya (impor dari folder      */
/* miliknya; render sekarang null) dan menambah impor yang dibutuhkan.        */
/* ======================================================================== */

/** Sub-Bab A: Loket Tiket. */
const langkahLoketTiketA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Loket Tiket",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B1.A,
  misiDaftar: daftarMisiTiket("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiLoketTiket speakGuru={a.speakGuru} onKeadaan={(k: KeadaanTiket) => laporMisiTiket(daftarMisiTiket("A"), k, a.capai)} />,
});

/** Sub-Bab B: Gudang Handuk. */
const langkahGudangHandukB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Gudang Handuk",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B1.B,
  misiDaftar: daftarMisiHanduk("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiGudangHanduk speakGuru={a.speakGuru} onKeadaan={(k: KeadaanHanduk) => laporMisiHanduk(daftarMisiHanduk("B"), k, a.capai)} />,
});

/** Sub-Bab C: Papan Dermaga. */
const langkahPapanDermagaC = (): LangkahSim => ({
  metode: "PhET",
  sub: "Papan Dermaga",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B1.C,
  misiDaftar: daftarMisiDermaga("C").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPapanDermaga speakGuru={a.speakGuru} onKeadaan={(k: KeadaanDermaga) => laporMisiDermaga(daftarMisiDermaga("C"), k, a.capai)} />,
});

/** Sub-Bab D: Kios Kelapa. */
const langkahKiosKelapaD = (): LangkahSim => ({
  metode: "PhET",
  sub: "Kios Kelapa",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B1.D,
  misiDaftar: daftarMisiKelapa("D").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiKiosKelapa speakGuru={a.speakGuru} onKeadaan={(k: KeadaanKelapa) => laporMisiKelapa(daftarMisiKelapa("D"), k, a.capai)} />,
});

/** Sub-Bab E: Meja Resepsi. */
const langkahMejaResepsiE = (): LangkahSim => ({
  metode: "PhET",
  sub: "Meja Resepsi",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B1.E,
  misiDaftar: daftarMisiResepsi("E").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiMejaResepsi speakGuru={a.speakGuru} onKeadaan={(k: KeadaanResepsi) => laporMisiResepsi(daftarMisiResepsi("E"), k, a.capai)} />,
});

/** Sub-Bab F: Papan Sisa. */
const langkahPapanSisaF = (): LangkahSim => ({
  metode: "PhET",
  sub: "Papan Sisa",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B1.F,
  misiDaftar: daftarMisiSisa("F").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPapanSisa speakGuru={a.speakGuru} onKeadaan={(k: KeadaanSisa) => laporMisiSisa(daftarMisiSisa("F"), k, a.capai)} />,
});

/** Sub-Bab G: Baris Perahu. */
const langkahBarisPerahuG = (): LangkahSim => ({
  metode: "PhET",
  sub: "Baris Perahu",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B1.G,
  misiDaftar: daftarMisiPerahu("G").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiBarisPerahu speakGuru={a.speakGuru} onKeadaan={(k: KeadaanPerahu) => laporMisiPerahu(daftarMisiPerahu("G"), k, a.capai)} />,
});

/** Sub-Bab H: Papan Jatah. */
const langkahPapanJatahH = (): LangkahSim => ({
  metode: "PhET",
  sub: "Papan Jatah",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B1.H,
  misiDaftar: daftarMisiJatah("H").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPapanJatah speakGuru={a.speakGuru} onKeadaan={(k: KeadaanJatah) => laporMisiJatah(daftarMisiJatah("H"), k, a.capai)} />,
});

/** Sub-Bab I: Papan Jadwal. */
const langkahPapanJadwalI = (): LangkahSim => ({
  metode: "PhET",
  sub: "Papan Jadwal",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K4B1.I,
  misiDaftar: daftarMisiJadwal("I").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiPapanJadwal speakGuru={a.speakGuru} onKeadaan={(k: KeadaanJadwal) => laporMisiJadwal(daftarMisiJadwal("I"), k, a.capai)} />,
});

const langkahK4Bab1 = (sub: string): LangkahSim[] => {
  const huruf = hurufK4B1(sub);
  if (huruf === "A") return [langkahLoketTiketA()];
  if (huruf === "B") return [langkahGudangHandukB()];
  if (huruf === "C") return [langkahPapanDermagaC()];
  if (huruf === "D") return [langkahKiosKelapaD()];
  if (huruf === "E") return [langkahMejaResepsiE()];
  if (huruf === "F") return [langkahPapanSisaF()];
  if (huruf === "G") return [langkahBarisPerahuG()];
  if (huruf === "H") return [langkahPapanJatahH()];
  if (huruf === "I") return [langkahPapanJadwalI()];
  return [langkahLoketTiketA()];
};

export { misiAwalK4Bab1 };

export default function SimulasiK4Bab1Materi({
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
  const huruf = hurufK4B1(sub);
  return (
    <SimulasiAlur
      judulBab={`Bab 1 · Sub-Bab ${huruf}`}
      langkah={langkahK4Bab1(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
