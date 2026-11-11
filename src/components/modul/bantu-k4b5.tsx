"use client";
import React from "react";
import { type PropsLangkah } from "./SubBabA2Penjumlahan";
import { KartuK2B5 } from "./kartu-k2b5";
import { SvgBangun, KomposisiMini } from "./diagram-k4b5";
import type { Bangun, Resep } from "./data-k4b5";

export type FnIsi = (ronde: number, beres: () => void) => React.ReactNode;

export function buatKartu(J: string[], total: number) {
  return function Kartu(d: PropsLangkah, idx: number, id: string, petunjuk: string, jumlahRonde: number, belumSiap: string, isi: FnIsi) {
    return <KartuK2B5 d={d} indeks={idx} judul={J[idx]} id={id} petunjuk={petunjuk} jumlahRonde={jumlahRonde} belumSiap={belumSiap} total={total} isi={isi} />;
  };
}

export const Numeral = ({ n, kelas = "text-2xl" }: { n: number | string; kelas?: string }) => (
  <span className={`font-black text-[#1C01A5] ${kelas}`}>{n}</span>
);

export function VisualBangun({ bangun, kecil = false }: { bangun: Bangun; kecil?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <SvgBangun jenis={bangun.jenis} kecil={kecil} ciriSisi={bangun.ciriSisi} ciriSudut={bangun.ciriSudut} />
      <span className="text-[10px] font-black text-[#1C01A5]/70">{bangun.nama}</span>
    </div>
  );
}

export function VisualResep({ resep }: { resep: Resep }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <KomposisiMini bagian={resep.bagian.join(" + ")} />
      <span className="text-lg font-black text-[#1C01A5]">↓</span>
      <KomposisiMini bagian={resep.hasil} />
      <span className="text-[10px] font-black text-amber-700">{resep.jenis}</span>
    </div>
  );
}
