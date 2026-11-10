"use client";

import React from "react";
import { BendaB7, Wadah } from "./dasar-k2b7";
import { BENDA_INFO, type BendaId } from "./data-k2b7";
import { empat } from "./data-k4b1";
import { Dus } from "./dasar-k3b1";

/* ------------------------------------------------------------------------ */
/* Benda nyata Kelas 4 Bab 1: peti (1.000), dus (100), bungkus (10), benda (1). */
/* Hanya untuk tahap Concrete. Picture memakai diagram-k4b1.                   */
/* ------------------------------------------------------------------------ */

/** Satu peti = sepuluh dus = 1.000 satuan (satu ribuan). Digambar sebagai dus bertumpuk. */
export function Peti({ benda, ukuran = 56 }: { benda: BendaId; ukuran?: number }) {
  return (
    <span className="relative inline-flex shrink-0 flex-col items-center" role="img" aria-label={`1 peti berisi 10 dus atau 1.000 ${BENDA_INFO[benda].nama}, satu ribuan`}>
      <span className="block rounded-t-md border-[3px] border-b-0 border-[#5B21B6] bg-[#C4B5FD]" style={{ width: ukuran + 10, height: 8 }} aria-hidden="true" />
      <span className="flex flex-col gap-[2px] border-[3px] border-[#5B21B6] bg-[#EDE9FE] p-[3px]" style={{ width: ukuran + 10 }}>
        {Array.from({ length: 2 }, (_, baris) => (
          <span key={baris} className="flex justify-center gap-[2px]">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className="block rounded-[2px] border border-[#7C2D12] bg-[#E8C48C]" style={{ width: (ukuran - 8) / 5, height: (ukuran - 8) / 5 }} />
            ))}
          </span>
        ))}
      </span>
      <span className="-mt-0.5 text-[9px] font-black text-[#6D28D9]">1rb</span>
    </span>
  );
}

export type Jenis4 = "rb" | "r" | "p" | "s";

export function Kemasan4({ jenis, benda, ukuran = 48 }: { jenis: Jenis4; benda: BendaId; ukuran?: number }) {
  if (jenis === "rb") return <Peti benda={benda} ukuran={ukuran} />;
  if (jenis === "r") return <Dus benda={benda} ukuran={ukuran} />;
  if (jenis === "p") return <Wadah benda={benda} ukuran={ukuran * 0.85} />;
  return <BendaB7 id={benda} ukuran={Math.max(16, ukuran * 0.45)} />;
}

export function KelompokKemasan4({ jenis, k, benda, ukuran = 40 }: { jenis: Jenis4; k: number; benda: BendaId; ukuran?: number }) {
  const nama = jenis === "rb" ? "peti" : jenis === "r" ? "dus" : jenis === "p" ? BENDA_INFO[benda].wadah : "benda lepas";
  return (
    <span className="inline-flex max-w-full flex-wrap items-end justify-center gap-1" role="img" aria-label={`${k} ${nama}`}>
      {Array.from({ length: k }, (_, i) => (
        <Kemasan4 key={i} jenis={jenis} benda={benda} ukuran={ukuran} />
      ))}
    </span>
  );
}

/** Kumpulan empat tingkat: rb peti, r dus, p bungkus, s benda lepas. */
export function KoleksiEmpat({ rb, r, p, s, benda, ukuran = 44 }: { rb: number; r: number; p: number; s: number; benda: BendaId; ukuran?: number }) {
  const banyak = rb + r + p;
  const u = ukuran * (banyak <= 4 ? 1 : banyak <= 7 ? 0.78 : banyak <= 11 ? 0.62 : 0.5);
  const lepas = Math.max(12, u * 0.38);
  return (
    <span className="inline-flex max-w-full flex-wrap items-end justify-center gap-1" role="img" aria-label={`${rb} peti, ${r} dus, ${p} ${BENDA_INFO[benda].wadah}, dan ${s} ${BENDA_INFO[benda].nama} lepas`}>
      {Array.from({ length: rb }, (_, i) => (
        <Peti key={`rb${i}`} benda={benda} ukuran={u * 1.05} />
      ))}
      {Array.from({ length: r }, (_, i) => (
        <Dus key={`r${i}`} benda={benda} ukuran={u} />
      ))}
      {Array.from({ length: p }, (_, i) => (
        <Wadah key={`p${i}`} benda={benda} ukuran={u * 0.85} />
      ))}
      {s > 0 ? (
        <span className="inline-flex max-w-[100px] flex-wrap items-end justify-center">
          {Array.from({ length: s }, (_, i) => (
            <BendaB7 key={`s${i}`} id={benda} ukuran={lepas} />
          ))}
        </span>
      ) : null}
    </span>
  );
}

export const KoleksiDari = ({ n, benda, ukuran = 44 }: { n: number; benda: BendaId; ukuran?: number }) => {
  const d = empat(n);
  return <KoleksiEmpat rb={d.rb} r={d.r} p={d.p} s={d.s} benda={benda} ukuran={ukuran} />;
};
