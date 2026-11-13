"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K6B2 Sub-Bab B: pecahan bertumpuk, tabel kali dua baris, dan  */
/* kotak satuan. Pilihan tiga jawaban dipakai bersama dari model-rasio-k6b2.  */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const UNGU = "#8B7CF6";

/** Pecahan bertumpuk; nilai "?" menandai bagian yang belum diketahui. */
export function PecahanTumpuk({ atas, bawah, warna = BIRU }: { atas: number | string; bawah: number | string; warna?: string }) {
  return (
    <span className="inline-flex flex-col items-center rounded-md px-1.5 py-0.5 align-middle text-xl font-black leading-none" style={{ color: warna }}>
      <span className="px-1 pb-0.5">{atas}</span>
      <span className="w-full border-t-[3px] pt-0.5 text-center" style={{ borderColor: warna }}>
        {bawah}
      </span>
    </span>
  );
}

/** Tabel dua baris: baris awal, panah kali, dan baris baru. Suku yang belum diketahui ditulis tanda tanya. */
export function TabelKali({ ka, kb, a, b, kiri, kanan, pengali }: { ka: string; kb: string; a: number; b: number; kiri: number | string; kanan: number | string; pengali: number | string }) {
  const sel = "rounded-md border-2 border-[#1C01A5] bg-white px-2 py-1 text-center text-lg font-black text-[#1C01A5]";
  return (
    <div className="mx-auto w-full max-w-sm space-y-1" role="img" aria-label={`Tabel rasio: ${a} ${ka} dan ${b} ${kb}, dikali ${pengali}, menjadi ${kiri} dan ${kanan}`}>
      <div className="grid grid-cols-2 gap-1 text-center text-xs font-black text-[#1C01A5]">
        <span style={{ background: EMAS }} className="rounded px-1">
          {ka}
        </span>
        <span style={{ background: UNGU }} className="rounded px-1">
          {kb}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <span className={sel}>{a}</span>
        <span className={sel}>{b}</span>
      </div>
      <p className="text-center text-sm font-black text-[#1C01A5]">kalikan keduanya dengan {pengali}</p>
      <div className="grid grid-cols-2 gap-1">
        <span className={sel}>{kiri}</span>
        <span className={sel}>{kanan}</span>
      </div>
    </div>
  );
}

/** Deretan kotak satuan: tiap kotak mewakili satu satuan dan memuat nilai satuannya (atau tanda tanya). */
export function KotakSatuan({ banyak, isi, nama }: { banyak: number; isi: string; nama: string }) {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-wrap justify-center gap-1" role="img" aria-label={`${banyak} ${nama}, tiap ${nama} bernilai ${isi}`}>
      {Array.from({ length: banyak }, (_, i) => (
        <span key={i} className="min-w-14 rounded-md border-4 border-[#1C01A5] px-1.5 py-1 text-center text-sm font-black text-[#1C01A5]" style={{ background: i % 2 === 0 ? EMAS : UNGU }}>
          {isi}
        </span>
      ))}
    </div>
  );
}
