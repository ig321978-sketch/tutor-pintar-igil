"use client";

import React from "react";
import { Pecahan } from "./model-kali-k6b1";

/* ------------------------------------------------------------------------ */
/* Model gambar K6B1 Sub-Bab B: batang yang dipotong lagi (Partition) dan      */
/* bilangan yang ditulis sebagai bilangan asli atau pecahan bertumpuk.         */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const UNGU = "#8B7CF6";

/** Bilangan asli bila penyebut 1, selain itu pecahan bertumpuk. */
export function Angka({ atas, bawah, kotak = false }: { atas: number | string; bawah: number | string; kotak?: boolean }) {
  if (bawah === 1 && !kotak) return <span className="px-1 text-2xl font-black text-[#1C01A5]">{atas}</span>;
  return <Pecahan atas={atas} bawah={bawah} kotak={kotak} />;
}

/**
 * Batang yang menggambarkan a/b : c. Tiap baris adalah satu utuh. Sebelum dipotong, tiap utuh berisi b kotak dan a kotak terarsir.
 * Sesudah dipotong, tiap kotak dipotong lagi menjadi c bagian sama (b × c kotak kecil per utuh); a × c kotak kecil terarsir
 * dan satu dari c bagian sama (a kotak kecil pertama) berwarna ungu.
 */
export function BatangPotong({ a, b, c, dipotong, nama }: { a: number; b: number; c: number; dipotong: boolean; nama: string }) {
  const baris = Math.max(1, Math.ceil(a / b));
  const perBaris = dipotong ? b * c : b;
  const arsir = dipotong ? a * c : a;
  const bagian = dipotong ? a : 0;
  return (
    <div
      className="mx-auto w-full max-w-sm space-y-2"
      role="img"
      aria-label={`Batang ${nama}: ${dipotong ? `${arsir} dari ${baris * perBaris} kotak kecil terarsir, satu dari ${c} bagian sama berisi ${bagian} kotak` : `${a} dari ${baris * perBaris} kotak terarsir`}`}
    >
      {Array.from({ length: baris }, (_, r) => (
        <div key={r} className="grid gap-0.5 rounded-lg border-4 border-[#1C01A5] bg-white p-1" style={{ gridTemplateColumns: `repeat(${perBaris}, minmax(0, 1fr))` }}>
          {Array.from({ length: perBaris }, (_, k) => {
            const urut = r * perBaris + k;
            const isi = urut < arsir;
            const warna = !isi ? "#fff" : urut < bagian ? UNGU : EMAS;
            return <div key={k} className="h-7 rounded-sm border-2" style={{ background: warna, borderColor: isi ? BIRU : "#cbd5e1" }} />;
          })}
        </div>
      ))}
    </div>
  );
}
