"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B1 Sub-Bab D: kolom nilai tempat untuk hitung bersusun.     */
/* Angka polos di kolom, tanda simpanan atau pinjaman, dan hasil yang sedang  */
/* diisi. Tanpa gambar benda.                                                  */
/* ------------------------------------------------------------------------ */

const KEPALA = ["PRb", "Rb", "R", "P", "S"];
const WARNA = ["#C4B5FD", "#FDE68A", "#86EFAC", "#93C5FD", "#F9A8D4"];
const lima = (n: number): number[] => String(n).padStart(5, "0").split("").map(Number);

/**
 * Kolom bersusun. Kolom ditampilkan dari puluh ribuan (kiri) sampai satuan (kanan).
 * `isi` berisi digit hasil yang sudah benar, dari satuan ke kiri. `masuk[c]` adalah simpanan atau pinjaman yang
 * masuk ke kolom c (0 bila tidak ada). `sekarang` adalah kolom yang sedang diisi.
 */
export function KolomBersusun({ a, b, op, isi, masuk, sekarang }: { a: number; b: number; op: "+" | "−"; isi: number[]; masuk: number[]; sekarang: number }) {
  const da = lima(a);
  const db = lima(b);
  const kata = op === "+" ? "simpan 1" : "pinjam 1";
  // Indeks tampilan i (0 = kiri) sesuai kolom c = 4 - i.
  const tampil = [0, 1, 2, 3, 4];
  return (
    <div className="grid grid-cols-[1.6rem_repeat(5,minmax(0,1fr))] items-center gap-x-1 gap-y-1 rounded-xl border-2 border-[#1C01A5]/40 bg-white p-2" role="group" aria-label={`Kolom bersusun ${a} ${op} ${b}`}>
      <span />
      {tampil.map((i) => (
        <span key={`k${i}`} className="rounded-md py-0.5 text-center text-[10px] font-black text-[#1C01A5]" style={{ background: `${WARNA[i]}99` }}>
          {KEPALA[i]}
        </span>
      ))}
      <span />
      {tampil.map((i) => {
        const c = 4 - i;
        const ada = masuk[c] === 1 && c <= sekarang;
        return (
          <span key={`m${i}`} className="flex h-5 items-center justify-center">
            {ada ? <span className="rounded bg-[#FFE566] px-0.5 text-[9px] font-black leading-tight text-[#1C01A5]">{kata}</span> : null}
          </span>
        );
      })}
      <span />
      {tampil.map((i) => (
        <span key={`a${i}`} className="text-center text-2xl font-black text-[#1C01A5]">
          {da[i]}
        </span>
      ))}
      <span className="text-center text-2xl font-black text-[#1C01A5]">{op}</span>
      {tampil.map((i) => (
        <span key={`b${i}`} className="text-center text-2xl font-black text-[#1C01A5]">
          {db[i]}
        </span>
      ))}
      <span />
      {tampil.map((i) => (
        <span key={`g${i}`} className="h-1 rounded bg-[#1C01A5]" />
      ))}
      <span className="text-center text-lg font-black text-[#1C01A5]">=</span>
      {tampil.map((i) => {
        const c = 4 - i;
        const sudah = c < isi.length;
        const giliran = c === sekarang;
        return (
          <span
            key={`h${i}`}
            className={`flex h-9 items-center justify-center rounded-lg text-2xl font-black ${giliran ? "border-2 border-dashed border-[#F0AB00] bg-[#FFF8DC] text-[#1C01A5]" : sudah ? "bg-[#E8F7EE] text-[#1C01A5]" : "text-[#1C01A5]/30"}`}
          >
            {sudah ? isi[c] : giliran ? "?" : ""}
          </span>
        );
      })}
    </div>
  );
}
