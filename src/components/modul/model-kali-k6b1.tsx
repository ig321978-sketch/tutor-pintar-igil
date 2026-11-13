"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K6B1 Sub-Bab A: pecahan bertumpuk (pembilang di atas garis,   */
/* penyebut di bawah) dan petak berisi n kotak sama besar yang diarsir ember   */
/* demi ember. Kotak merah menandai bilangan asli yang ditulis a/1.            */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const UNGU = "#8B7CF6";
const MERAH = "#C62828";

/** Satu pecahan bertumpuk. Nilai "?" menandai bagian yang belum diketahui. */
export function Pecahan({ atas, bawah, kotak = false, warna = BIRU }: { atas: number | string; bawah: number | string; kotak?: boolean; warna?: string }) {
  return (
    <span
      className="inline-flex flex-col items-center rounded-md px-1.5 py-0.5 align-middle text-xl font-black leading-none"
      style={{ color: warna, border: `3px solid ${kotak ? MERAH : "transparent"}` }}
    >
      <span className="px-1 pb-0.5">{atas}</span>
      <span className="w-full border-t-[3px] pt-0.5 text-center" style={{ borderColor: warna }}>
        {bawah}
      </span>
    </span>
  );
}

/** Teks yang berbentuk "a/b" digambar bertumpuk; selain itu ditulis apa adanya. */
export function TeksPecahan({ teks }: { teks: string }) {
  const m = /^(\d+)\/(\d+)$/.exec(teks);
  if (!m) return <span>{teks}</span>;
  return <Pecahan atas={m[1]} bawah={m[2]} />;
}

/** Satu operator di antara dua pecahan. */
export const Tanda = ({ t }: { t: string }) => <span className="px-1 text-2xl font-black text-[#1C01A5]">{t}</span>;

/**
 * Petak-petak berisi n kotak sama besar. Kotak terarsir diisi ember demi ember (tiap ember m kotak),
 * ember ganjil berwarna emas dan ember genap berwarna ungu. Petak baru dibuka bila kotak terarsir melewati satu petak.
 */
export function PetakArsir({ n, m, ember, nama }: { n: number; m: number; ember: number; nama: string }) {
  const terisi = ember * m;
  const banyakPetak = Math.max(1, Math.ceil(terisi / n));
  return (
    <div className="mx-auto w-full max-w-xs space-y-2" role="img" aria-label={`Petak berisi ${n} kotak untuk ${nama}: ${ember} ember mengarsir ${terisi} kotak`}>
      {Array.from({ length: banyakPetak }, (_, p) => (
        <div key={p} className="grid gap-1 rounded-lg border-4 border-[#1C01A5] bg-white p-1" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {Array.from({ length: n }, (_, c) => {
            const urut = p * n + c;
            const isi = urut < terisi;
            const warna = isi ? (Math.floor(urut / m) % 2 === 0 ? EMAS : UNGU) : "#fff";
            return <div key={c} className="aspect-square rounded-sm border-2" style={{ background: warna, borderColor: isi ? BIRU : "#cbd5e1" }} />;
          })}
        </div>
      ))}
    </div>
  );
}
