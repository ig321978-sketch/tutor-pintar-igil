"use client";
import React from "react";
import { type PropsLangkah } from "./SubBabA2Penjumlahan";
import { KartuK2B5 } from "./kartu-k2b5";
import { BarisPola, RantaiBilangan } from "./diagram-k4b3";

export type FnIsi = (ronde: number, beres: () => void) => React.ReactNode;

export function buatKartu(J: string[], total: number) {
  return function Kartu(d: PropsLangkah, idx: number, id: string, petunjuk: string, jumlahRonde: number, belumSiap: string, isi: FnIsi) {
    return <KartuK2B5 d={d} indeks={idx} judul={J[idx]} id={id} petunjuk={petunjuk} jumlahRonde={jumlahRonde} belumSiap={belumSiap} total={total} isi={isi} />;
  };
}

export const Numeral = ({ n, kelas = "text-2xl" }: { n: number | string; kelas?: string }) => (
  <span className={`font-black text-[#1C01A5] ${kelas}`}>{n}</span>
);

export function VisualPola({ suku, mode = "benda", emoji = "🟠", kecil = false }: { suku: number[]; mode?: "benda" | "angka"; emoji?: string; kecil?: boolean }) {
  if (mode === "angka") return <RantaiBilangan suku={suku} />;
  return <BarisPola suku={suku} emoji={emoji} kecil={kecil} />;
}
