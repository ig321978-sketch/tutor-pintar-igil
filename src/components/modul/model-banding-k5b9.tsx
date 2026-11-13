"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B9 Sub-Bab B: dua bilangan dalam tabel tempat enam kolom.   */
/* Kolom yang sudah dilewati karena sama berlatar hijau, kolom penunjuk       */
/* bergaris emas, dan kolom pertama yang berbeda bergaris merah.              */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MERAH = "#C62828";
const HIJAU = "#15803d";
const KEPALA = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];
const enam = (n: number): number[] => String(n).padStart(6, "0").split("").map(Number);

/** Dua baris angka. kolom: posisi penunjuk. berhenti: kolom penunjuk adalah kolom pertama yang berbeda. */
export function TabelBanding({ a, b, kolom, berhenti, nama }: { a: number; b: number; kolom: number; berhenti: boolean; nama: string }) {
  const p = enam(a);
  const q = enam(b);
  const sel = (v: number, k: number, kunci: string) => {
    const lewat = k < kolom;
    const penunjuk = k === kolom;
    const warna = penunjuk ? (berhenti ? MERAH : EMAS) : lewat ? HIJAU : BIRU;
    return (
      <div
        key={kunci}
        className="rounded-md py-2 text-center text-2xl font-black"
        style={{ color: BIRU, border: `3px solid ${warna}`, background: penunjuk ? (berhenti ? "#FDE8E8" : "#FFF6CC") : lewat ? "#E6F4EA" : "#fff" }}
      >
        {v}
      </div>
    );
  };
  return (
    <div className="mx-auto w-full max-w-md" role="img" aria-label={`Tabel banding ${nama}`}>
      <div className="grid grid-cols-6 gap-1">
        {KEPALA.map((nm) => (
          <div key={nm} className="rounded-md bg-[#1C01A5] px-0.5 py-1 text-center text-[10px] font-black leading-tight text-white">
            {nm}
          </div>
        ))}
        {p.map((v, k) => sel(v, k, `a${k}`))}
        {q.map((v, k) => sel(v, k, `b${k}`))}
      </div>
      <p className="mt-1 text-center text-xs font-black" style={{ color: BIRU }}>
        Baris atas: bilangan pertama. Baris bawah: bilangan kedua.
      </p>
    </div>
  );
}
