"use client";

import React from "react";
import { BENDA_INFO, type BendaId } from "./data-k2b7";
import { KoleksiDari, KoleksiTiga } from "./dasar-k3b1";
import { type KM } from "./data-k3b2";

/* ------------------------------------------------------------------------ */
/* Benda nyata Kelas 3 Bab 2 (tahap Concrete): kalimat Matematika sebagai      */
/* kumpulan benda. Tiap kalimat x op y = z digambar sebagai kumpulan benda     */
/* berbungkus sepuluh. Kumpulan yang belum diketahui diganti kotak bertanda     */
/* tanya, atau kumpulan yang sedang dirakit siswa. Tahap Picture memakai        */
/* diagram-k3b2.tsx tanpa gambar benda.                                         */
/* ------------------------------------------------------------------------ */

const Tanda = ({ children }: { children: React.ReactNode }) => <span className="text-3xl font-black leading-none text-[#1C01A5]">{children}</span>;

/** Kumpulan benda yang sudah diketahui dengan lambang bilangannya. */
function SelKoleksi({ n, benda, ukuran }: { n: number; benda: BendaId; ukuran: number }) {
  return (
    <div className="flex min-w-0 max-w-full flex-col items-center gap-0.5 rounded-2xl border-2 border-[#1C01A5]/30 bg-white px-1 py-1">
      <KoleksiDari n={n} benda={benda} ukuran={ukuran} />
      <span className="text-xs font-black text-[#1C01A5]">{n}</span>
    </div>
  );
}

/** Kotak yang belum diketahui: tanda tanya, atau kumpulan yang sedang dirakit siswa. */
function SelHilang({ benda, ukuran, rakit }: { benda: BendaId; ukuran: number; rakit?: { r: number; p: number; s: number } }) {
  return (
    <div className="flex min-h-[44px] min-w-[44px] max-w-full flex-col items-center justify-center gap-0.5 rounded-2xl border-[3px] border-dashed border-[#F0AB00] bg-[#FFF7CC] px-1 py-1">
      {rakit && rakit.r + rakit.p + rakit.s > 0 ? <KoleksiTiga r={rakit.r} p={rakit.p} s={rakit.s} benda={benda} ukuran={ukuran} /> : <span className="text-2xl font-black text-[#B45309]">?</span>}
    </div>
  );
}

/**
 * Kalimat Matematika sebagai kumpulan benda: x op y = z. Bilangan yang belum diketahui (hilang) ditampilkan sebagai kotak
 * bertanda tanya, atau sebagai kumpulan yang dirakit siswa bila `rakit` diberikan. `lebar="isi"` dipakai di dalam baris sempit.
 */
export function KoleksiKM({ p, benda, ukuran = 16, rakit, lebar = "penuh" }: { p: KM; benda: BendaId; ukuran?: number; rakit?: { r: number; p: number; s: number }; lebar?: "penuh" | "isi" }) {
  const x = p.hilang === "x" ? <SelHilang benda={benda} ukuran={ukuran} rakit={rakit} /> : <SelKoleksi n={p.x} benda={benda} ukuran={ukuran} />;
  const y = p.hilang === "y" ? <SelHilang benda={benda} ukuran={ukuran} rakit={rakit} /> : <SelKoleksi n={p.y} benda={benda} ukuran={ukuran} />;
  return (
    <div className={`flex ${lebar === "penuh" ? "w-full" : "w-auto"} max-w-full flex-wrap items-center justify-center gap-1`} role="img" aria-label={`Kalimat Matematika dengan ${BENDA_INFO[benda].nama}: ${p.x} ${p.op} ${p.y} = ${p.z}, satu bilangan belum diketahui`}>
      {x}
      <Tanda>{p.op}</Tanda>
      {y}
      <Tanda>=</Tanda>
      <SelKoleksi n={p.z} benda={benda} ukuran={ukuran} />
    </div>
  );
}
