"use client";

import React from "react";
import SimulasiAlur, { type LangkahSim } from "./simulasi-alur";
import { MISI_K5B3, hurufK5B3, misiAwalK5Bab3 } from "./misi-teks-k5b3";
import { daftarMisiK5Bab3 } from "./misi-k5bab3";
import { laporMisi as laporMisiTimbang } from "./misi-simulasi";
import SimulasiGarisTimbang from "./timbang-k5b3a/SimulasiGarisTimbang";
import type { KeadaanTimbang } from "./timbang-k5b3a/logika";
import { laporMisi as laporMisiLoyang } from "./misi-simulasi";
import SimulasiGabungLoyang from "./loyang-k5b3b/SimulasiGabungLoyang";
import type { KeadaanLoyang } from "./loyang-k5b3b/logika";
import { laporMisi as laporMisiAdonan } from "./misi-simulasi";
import SimulasiSisaAdonan from "./adonan-k5b3c/SimulasiSisaAdonan";
import type { KeadaanAdonan } from "./adonan-k5b3c/logika";

/* ======================================================================== */
/* Simulasi Kelas 5 Bab 3 di dalam Materi (tahap 4 SMISCPA), tema           */
/* Toko Roti Keliling: A Garis Timbang, B Gabung Loyang, C Sisa Adonan.    */
/* KERANGKA: agen Sub-Bab mengisi fungsi langkah-nya dan menambah impor.     */
/* ======================================================================== */

/** Sub-Bab A: Garis Timbang. */
const langkahGarisTimbangA = (): LangkahSim => ({
  metode: "PhET",
  sub: "Garis Timbang",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K5B3.A,
  misiDaftar: daftarMisiK5Bab3("A").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiGarisTimbang speakGuru={a.speakGuru} onKeadaan={(k: KeadaanTimbang) => laporMisiTimbang(daftarMisiK5Bab3("A"), k, a.capai)} />,
});

/** Sub-Bab B: Gabung Loyang. */
const langkahGabungLoyangB = (): LangkahSim => ({
  metode: "PhET",
  sub: "Gabung Loyang",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K5B3.B,
  misiDaftar: daftarMisiK5Bab3("B").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiGabungLoyang speakGuru={a.speakGuru} onKeadaan={(k: KeadaanLoyang) => laporMisiLoyang(daftarMisiK5Bab3("B"), k, a.capai)} />,
});

/** Sub-Bab C: Sisa Adonan. */
const langkahSisaAdonanC = (): LangkahSim => ({
  metode: "PhET",
  sub: "Sisa Adonan",
  petunjuk: "Mainkan dulu simulasinya, ya.",
  misi: MISI_K5B3.C,
  misiDaftar: daftarMisiK5Bab3("C").map(({ id, teks, wajib }) => ({ id, teks, wajib })),
  mode: "sentuh",
  render: (a) => <SimulasiSisaAdonan speakGuru={a.speakGuru} onKeadaan={(k: KeadaanAdonan) => laporMisiAdonan(daftarMisiK5Bab3("C"), k, a.capai)} />,
});

const langkahK5Bab3 = (sub: string): LangkahSim[] => {
  const huruf = hurufK5B3(sub);
  if (huruf === "A") return [langkahGarisTimbangA()];
  if (huruf === "B") return [langkahGabungLoyangB()];
  if (huruf === "C") return [langkahSisaAdonanC()];
  return [langkahGarisTimbangA()];
};

export { misiAwalK5Bab3 };

export default function SimulasiK5Bab3Materi({
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
  const huruf = hurufK5B3(sub);
  return (
    <SimulasiAlur
      judulBab={`Bab 3 · Sub-Bab ${huruf}`}
      langkah={langkahK5Bab3(sub)}
      speakGuru={speakGuru}
      onSelesai={onSelesai}
      teksAkhir={teksAkhir}
      dalamPopup
    />
  );
}
