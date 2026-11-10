"use client";
import React from "react";
import { type PropsLangkah } from "./SubBabA2Penjumlahan";
import { KartuK2B5 } from "./kartu-k2b5";
import { teksPec, type Pec } from "./data-k4b2";
import { BatangPecahan, KotakPecahan, LingkaranPecahan, NotasiPecahan } from "./diagram-k4b2";

export type FnIsi = (ronde: number, beres: () => void) => React.ReactNode;

export function buatKartu(J: string[], total: number) {
  return function Kartu(d: PropsLangkah, idx: number, id: string, petunjuk: string, jumlahRonde: number, belumSiap: string, isi: FnIsi) {
    return <KartuK2B5 d={d} indeks={idx} judul={J[idx]} id={id} petunjuk={petunjuk} jumlahRonde={jumlahRonde} belumSiap={belumSiap} total={total} isi={isi} />;
  };
}

export const Numeral = ({ n, kelas = "text-2xl" }: { n: number | string; kelas?: string }) => (
  <span className={`font-black text-[#1C01A5] ${kelas}`}>{n}</span>
);

export function VisualPec({ pec, mode = "lingkaran", kecil = false }: { pec: Pec; mode?: "lingkaran" | "batang" | "kotak" | "notasi"; kecil?: boolean }) {
  if (mode === "notasi") return <NotasiPecahan pec={pec} besar={!kecil} />;
  if (mode === "batang") return <BatangPecahan pec={pec} lebar={kecil ? 100 : 140} tinggi={kecil ? 24 : 32} />;
  if (mode === "kotak") return <KotakPecahan pec={pec} />;
  return <LingkaranPecahan pec={pec} ukuran={kecil ? 72 : 100} />;
}

export function idPec(x: Pec) {
  return teksPec(x);
}
