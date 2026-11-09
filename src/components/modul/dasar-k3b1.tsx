"use client";

import React from "react";
import { BendaB7, Wadah } from "./dasar-k2b7";
import { BENDA_INFO, type BendaId } from "./data-k2b7";
import { tiga } from "./data-k3b1";

/* ------------------------------------------------------------------------ */
/* Benda nyata Matematika Kelas 3 Bab 1 (tahap Concrete): satu benda adalah     */
/* satu satuan, satu bungkus berisi sepuluh benda adalah satu puluhan, dan satu */
/* dus berisi sepuluh bungkus adalah satu ratusan. Gambar benda memakai         */
/* BendaB7 dan Wadah dari bab 7 kelas 2. Tahap Picture memakai                  */
/* diagram-k3b1.tsx tanpa gambar benda.                                         */
/* ------------------------------------------------------------------------ */

const WARNA_DUS: Record<BendaId, { latar: string; tepi: string }> = {
  kue: { latar: "#FEF3C7", tepi: "#B45309" },
  kelereng: { latar: "rgba(186,230,253,0.7)", tepi: "#1D4ED8" },
  rambutan: { latar: "#FDE9C4", tepi: "#A8672D" },
  ikan: { latar: "#E0F2FE", tepi: "#0369A1" },
  lidi: { latar: "#FFF7ED", tepi: "#C2410C" },
  jeruk: { latar: "#FFEDD5", tepi: "#C2410C" },
  pensil: { latar: "#FCE7F3", tepi: "#BE185D" },
  anggur: { latar: "#F3E8FF", tepi: "#7E22CE" },
};

/** Satu dus: sepuluh bungkus kecil di dalam kotak karton. Satu dus adalah satu ratusan (seratus benda). */
export function Dus({ benda, ukuran = 56 }: { benda: BendaId; ukuran?: number }) {
  const w = WARNA_DUS[benda];
  const sel = Math.max(6, (ukuran - 14) / 5 - 2);
  return (
    <span className="relative inline-flex shrink-0 flex-col items-center" role="img" aria-label={`1 dus berisi 10 ${BENDA_INFO[benda].wadah} atau 100 ${BENDA_INFO[benda].nama}, satu ratusan`}>
      <span className="block h-2 rounded-t-md border-[3px] border-b-0 border-[#7C2D12] bg-[#D6A15E]" style={{ width: ukuran + 6 }} aria-hidden="true" />
      <span className="grid grid-cols-5 gap-[2px] border-[3px] border-[#7C2D12] bg-[#E8C48C] p-[3px]" style={{ width: ukuran + 6 }}>
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="block rounded-[3px] border-[1.5px]" style={{ width: sel, height: sel, backgroundColor: w.latar, borderColor: w.tepi }} />
        ))}
      </span>
    </span>
  );
}

export type Jenis = "r" | "p" | "s";

/** Satu kemasan: dus (ratusan), bungkus (puluhan), atau benda lepas (satuan). */
export function Kemasan({ jenis, benda, ukuran = 52 }: { jenis: Jenis; benda: BendaId; ukuran?: number }) {
  if (jenis === "r") return <Dus benda={benda} ukuran={ukuran} />;
  if (jenis === "p") return <Wadah benda={benda} ukuran={ukuran * 0.9} />;
  return <BendaB7 id={benda} ukuran={Math.max(18, ukuran * 0.5)} />;
}

/** Sekumpulan kemasan sejenis: k buah. */
export function KelompokKemasan({ jenis, k, benda, ukuran = 44 }: { jenis: Jenis; k: number; benda: BendaId; ukuran?: number }) {
  const nama = jenis === "r" ? "dus" : jenis === "p" ? BENDA_INFO[benda].wadah : "benda lepas";
  return (
    <span className="inline-flex max-w-full flex-wrap items-end justify-center gap-1" role="img" aria-label={`${k} ${nama}`}>
      {Array.from({ length: k }, (_, i) => (
        <Kemasan key={i} jenis={jenis} benda={benda} ukuran={ukuran} />
      ))}
    </span>
  );
}

/** Kumpulan benda: r dus, p bungkus, dan s benda lepas. Ukuran menyesuaikan banyak kemasan. */
export function KoleksiTiga({ r, p, s, benda, ukuran = 52 }: { r: number; p: number; s: number; benda: BendaId; ukuran?: number }) {
  const banyak = r + p;
  const u = ukuran * (banyak <= 4 ? 1 : banyak <= 7 ? 0.82 : banyak <= 11 ? 0.66 : 0.54);
  const lepas = Math.max(14, u * 0.4);
  return (
    <span className="inline-flex max-w-full flex-wrap items-end justify-center gap-1" role="img" aria-label={`${r} dus, ${p} ${BENDA_INFO[benda].wadah}, dan ${s} ${BENDA_INFO[benda].nama} lepas`}>
      {Array.from({ length: r }, (_, i) => (
        <Dus key={`r${i}`} benda={benda} ukuran={u * 1.05} />
      ))}
      {Array.from({ length: p }, (_, i) => (
        <Wadah key={`p${i}`} benda={benda} ukuran={u * 0.9} />
      ))}
      {s > 0 ? (
        <span className="inline-flex max-w-[120px] flex-wrap items-end justify-center">
          {Array.from({ length: s }, (_, i) => (
            <BendaB7 key={`s${i}`} id={benda} ukuran={lepas} />
          ))}
        </span>
      ) : null}
    </span>
  );
}

/** Kumpulan dari satu bilangan tiga angka. */
export const KoleksiDari = ({ n, benda, ukuran = 52 }: { n: number; benda: BendaId; ukuran?: number }) => {
  const d = tiga(n);
  return <KoleksiTiga r={d.r} p={d.p} s={d.s} benda={benda} ukuran={ukuran} />;
};
