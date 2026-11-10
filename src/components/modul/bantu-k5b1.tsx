"use client";
import React from "react";
import { type PropsLangkah } from "./SubBabA2Penjumlahan";
import { KartuK2B5 } from "./kartu-k2b5";
import { BandingMini, ModelLima, PapanLima } from "./diagram-k5b1";
import { lima, lambang } from "./data-k5b1";

export type FnIsi = (ronde: number, beres: () => void) => React.ReactNode;

export function buatKartu(J: string[], total: number) {
  return function Kartu(d: PropsLangkah, idx: number, id: string, petunjuk: string, jumlahRonde: number, belumSiap: string, isi: FnIsi) {
    return <KartuK2B5 d={d} indeks={idx} judul={J[idx]} id={id} petunjuk={petunjuk} jumlahRonde={jumlahRonde} belumSiap={belumSiap} total={total} isi={isi} />;
  };
}

export const Numeral = ({ n, kelas = "text-2xl" }: { n: number | string; kelas?: string }) => (
  <span className={`font-black text-[#1C01A5] ${kelas}`}>{typeof n === "number" ? lambang(n) : n}</span>
);

export function VisualPapan({ n, kecil = false }: { n: number; kecil?: boolean }) {
  return <PapanLima n={n} kecil={kecil} />;
}

export function VisualModel({ n }: { n: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <ModelLima d={lima(n)} />
      <Numeral n={n} kelas="text-base" />
    </div>
  );
}

export function VisualBanding({ a, b, tanda }: { a: number; b: number; tanda: string }) {
  return <BandingMini a={a} b={b} tanda={tanda} />;
}
