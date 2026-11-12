"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B9 Sub-Bab A: tabel nilai tempat enam kolom (ratus ribuan   */
/* sampai satuan), kolom ketujuh jutaan bila diminta. Kolom kosong ditandai   */
/* tanda tanya, kolom yang ditunjuk bergaris emas, kolom salah bergaris merah. */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MERAH = "#C62828";
const KEPALA = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];

export type KolomTempat = { digit: number | null; sorot?: boolean; salah?: boolean };

/** Tabel tempat. digit null berarti kolom kosong. juta menambah kolom jutaan di kiri. */
export function TabelTempat({ digit, sorot = [], salah = [], juta = false, nama }: { digit: (number | null)[]; sorot?: number[]; salah?: number[]; juta?: boolean; nama: string }) {
  const kolom = juta ? ["jutaan", ...KEPALA] : KEPALA;
  const isi = juta ? [1, ...digit.map(() => 0)] : digit;
  return (
    <div className="mx-auto w-full max-w-md" role="img" aria-label={`Tabel nilai tempat ${nama}`}>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${kolom.length}, minmax(0, 1fr))` }}>
        {kolom.map((nm) => (
          <div key={nm} className="rounded-md bg-[#1C01A5] px-0.5 py-1 text-center text-[10px] font-black leading-tight text-white">
            {nm}
          </div>
        ))}
        {isi.map((v, k) => {
          const idx = juta ? k - 1 : k;
          const aktif = !juta && sorot.includes(idx);
          const buruk = !juta && salah.includes(idx);
          return (
            <div
              key={`${k}-${v}`}
              className="rounded-md bg-white py-2 text-center text-2xl font-black"
              style={{ color: v === null ? "#9ca3af" : BIRU, border: `3px solid ${buruk ? MERAH : aktif ? EMAS : "#1C01A5"}`, background: aktif ? "#FFF6CC" : buruk ? "#FDE8E8" : "#fff" }}
            >
              {v === null ? "?" : v}
            </div>
          );
        })}
      </div>
    </div>
  );
}
