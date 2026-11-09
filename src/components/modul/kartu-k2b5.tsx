"use client";

import React from "react";
import { type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";

/** Warna latar kartu permainan, bergilir supaya tiap kartu mudah dibedakan. */
export const WARNA_KARTU_K2B5 = ["#BBF7D0", "#FDE68A", "#FBCFE8", "#BAE6FD", "#C7D2FE", "#FED7AA", "#A5F3FC", "#DDD6FE", "#FECACA", "#D9F99D"];

/**
 * Pembungkus satu kartu permainan Bab 5. Judul diambil dari naskah (satu sumber), isi diberikan oleh sub-bab.
 * Tanpa API, tanpa acak.
 */
export function KartuK2B5({
  d,
  indeks,
  judul,
  id,
  petunjuk,
  jumlahRonde,
  belumSiap,
  isi,
  kunciAkhir,
  total,
}: {
  d: PropsLangkah;
  indeks: number;
  judul: string;
  id: string;
  petunjuk: string;
  jumlahRonde: number;
  belumSiap: string;
  isi: (ronde: number, beres: () => void) => React.ReactNode;
  kunciAkhir?: number;
  total?: number;
}) {
  return (
    <GameBentuk
      nomor={d.nomor}
      judul={judul}
      warna={WARNA_KARTU_K2B5[indeks % WARNA_KARTU_K2B5.length]}
      petunjuk={petunjuk}
      speakGuru={d.speakGuru}
      panel={d.panel}
      id={id}
      jumlahRonde={jumlahRonde}
      kunciAkhir={kunciAkhir}
      total={total}
      belumSiap={belumSiap}
      teksLanjut={d.teksLanjut}
      lanjut={d.lanjut}
      isi={isi}
    />
  );
}
