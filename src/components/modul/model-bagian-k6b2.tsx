"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K6B2 Sub-Bab C: batang bagian (a bagian emas dan b bagian      */
/* ungu sama besar) dan garis waktu satu jam yang terbagi blok sama panjang.   */
/* Pilihan tiga jawaban dipakai bersama dari model-rasio-k6b2.                 */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const UNGU = "#8B7CF6";

/** Batang dengan a + b petak sama besar. Nilai tiap petak ditulis bila sudah diketahui, selain itu tanda tanya. */
export function BatangBagian({ a, b, nilai, nama }: { a: number; b: number; nilai: number | string; nama: string }) {
  return (
    <div className="mx-auto w-full max-w-sm space-y-1" role="img" aria-label={`Batang ${nama}: ${a} petak dan ${b} petak, tiap petak bernilai ${nilai}`}>
      <div className="grid gap-1 rounded-lg border-4 border-[#1C01A5] bg-white p-1" style={{ gridTemplateColumns: `repeat(${a + b}, minmax(0, 1fr))` }}>
        {Array.from({ length: a + b }, (_, i) => (
          <div key={i} className="flex aspect-square items-center justify-center rounded-sm border-2 text-[10px] font-black text-[#1C01A5]" style={{ background: i < a ? EMAS : UNGU, borderColor: BIRU }}>
            {nilai}
          </div>
        ))}
      </div>
      <div className="grid text-center text-xs font-black text-[#1C01A5]" style={{ gridTemplateColumns: `${a}fr ${b}fr` }}>
        <span>{a} bagian</span>
        <span>{b} bagian</span>
      </div>
    </div>
  );
}

/** Garis waktu satu jam: 60 menit dibagi blok sama panjang, tiap blok menempuh atau menghasilkan jumlah yang sama. */
export function GarisWaktu({ menit, jumlah, satuan, nama }: { menit: number; jumlah: number; satuan: string; nama: string }) {
  const blok = 60 / menit;
  return (
    <div className="mx-auto w-full max-w-sm space-y-1" role="img" aria-label={`Garis waktu satu jam untuk ${nama}: ${blok} blok, tiap blok ${menit} menit`}>
      <div className="flex flex-wrap gap-1 rounded-lg border-4 border-[#1C01A5] bg-white p-1">
        {Array.from({ length: blok }, (_, i) => (
          <div key={i} className="min-w-16 flex-1 rounded-sm border-2 px-1 py-0.5 text-center text-[11px] font-black text-[#1C01A5]" style={{ background: i % 2 === 0 ? EMAS : UNGU, borderColor: BIRU }}>
            {menit} menit
            <br />
            {jumlah} {satuan}
          </div>
        ))}
      </div>
      <p className="text-center text-xs font-black text-[#1C01A5]">Satu jam = 60 menit</p>
    </div>
  );
}
