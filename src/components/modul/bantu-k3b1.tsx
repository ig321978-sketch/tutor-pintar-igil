"use client";

import React from "react";
import { type PropsLangkah } from "./SubBabA2Penjumlahan";
import { KartuK2B5 } from "./kartu-k2b5";
import { BENDA_INFO, type BendaId } from "./data-k2b7";
import { KoleksiDari } from "./dasar-k3b1";
import { KartuModel } from "./diagram-k3b1";
import { kata, Kapital, TEKS_SYARAT, type Syarat } from "./data-k3b1";

/* ------------------------------------------------------------------------ */
/* Pembantu bersama permainan Kelas 3 Bab 1: pembungkus kartu permainan dan     */
/* kalimat syarat. Isi permainan ada di SubBabK3B1A.tsx dan SubBabK3B1B.tsx.    */
/* ------------------------------------------------------------------------ */

export type FnIsi = (ronde: number, beres: () => void) => React.ReactNode;

/** Pembungkus satu kartu permainan. J berisi judul dari naskah, total banyak permainan di sub-bab. */
export function buatKartu(J: string[], total: number) {
  return function Kartu(d: PropsLangkah, idx: number, id: string, petunjuk: string, jumlahRonde: number, belumSiap: string, isi: FnIsi) {
    return <KartuK2B5 d={d} indeks={idx} judul={J[idx]} id={id} petunjuk={petunjuk} jumlahRonde={jumlahRonde} belumSiap={belumSiap} total={total} isi={isi} />;
  };
}

export const wadahDari = (benda: BendaId): string => BENDA_INFO[benda].wadah;
export const namaDari = (benda: BendaId): string => BENDA_INFO[benda].nama;

/** Syarat untuk kumpulan benda (tahap Concrete): kata bungkus dan dus dipakai, bukan "angka puluhannya". */
export function syaratBenda(syarat: Syarat, benda: BendaId): string {
  const w = wadahDari(benda);
  switch (syarat) {
    case "puluhan-nol":
      return `tidak punya ${w} (puluhannya 0)`;
    case "satuan-nol":
      return "tidak punya benda lepas (satuannya 0)";
    case "ratusan-lebih-5":
      return "punya lebih dari 5 dus";
    case "ratusan-4":
      return "punya 4 dus";
    case "puluhan-6":
      return `punya 6 ${w}`;
    case "ratusan-300":
      return "punya 3 dus";
    case "angka-nol":
      return `tidak punya ${w} atau tidak punya benda lepas`;
    default:
      return TEKS_SYARAT[syarat];
  }
}

/** Kumpulan benda kecil untuk kartu pilihan. */
export const Koleksi = ({ n, benda, ukuran = 24 }: { n: number; benda: BendaId; ukuran?: number }) => <KoleksiDari n={n} benda={benda} ukuran={ukuran} />;

/** Kartu model kecil untuk kartu pilihan (tahap Picture). */
export const Model = ({ n, skala = 0.6 }: { n: number; skala?: number }) => <KartuModel n={n} skala={skala} />;

/** Lambang bilangan besar pada kartu. */
export const Numeral = ({ n, kelas = "text-2xl" }: { n: number | string; kelas?: string }) => <span className={`font-black text-[#1C01A5] ${kelas}`}>{n}</span>;

export const Kata = ({ n }: { n: number }) => <span className="text-[11px] font-black leading-tight text-[#1C01A5]">{kata(n)}</span>;

export { Kapital };
