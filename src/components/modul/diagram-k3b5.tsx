"use client";

import React from "react";
import { GambarTurus, KartuTurus, TabelTurus, type BarisTurus } from "./diagram-k2b8";
import { BarisTitik } from "./diagram-pictorial";
import { banyakHuruf, type Anak, type BarisNilai } from "./data-k3b5";

/* ------------------------------------------------------------------------ */
/* Diagram Picture Bab 5: turus, tabel turus, tabel nilai, tabel huruf, dan    */
/* titik kelompok lima. Tanpa gambar benda dan tanpa emoji benda. Tanpa API.   */
/* ------------------------------------------------------------------------ */

export { GambarTurus, KartuTurus, TabelTurus };

/** Kartu turus bertanda huruf (A, B, C, …). */
export function KartuTurusHuruf({ n, huruf, kecil = false }: { n: number; huruf?: string; kecil?: boolean }) {
  return (
    <span className="flex flex-col items-center gap-0.5">
      {huruf ? <span className="text-xs font-black text-[#1C01A5]">{huruf}</span> : null}
      <KartuTurus n={n} kecil={kecil} />
    </span>
  );
}

/** Tabel nama anak dan turus banyaknya. */
export function TabelAnakTurus({ judul, anak, kecil = false }: { judul: string; anak: readonly Anak[]; kecil?: boolean }) {
  const baris: BarisTurus[] = anak.map((a) => ({ nama: a.nama, n: a.n }));
  return <TabelTurus judul={judul} kolom={["Nama", "Turus", "Banyak"]} baris={baris} kecil={kecil} />;
}

/** Tabel nilai, turus, dan banyak (dari buku). */
export function TabelNilaiTurus({ judul = "Tabel nilai", baris, kecil = false }: { judul?: string; baris: readonly BarisNilai[]; kecil?: boolean }) {
  const data: BarisTurus[] = baris.map((b) => ({ nama: String(b.nilai), n: b.banyak }));
  return <TabelTurus judul={judul} kolom={["Nilai", "Turus", "Banyak"]} baris={data} kecil={kecil} />;
}

/** Satu baris huruf dengan turus di sampingnya. */
export function BarisHurufTurus({ huruf, kata, kecil = false }: { huruf: string; kata: string; kecil?: boolean }) {
  const n = banyakHuruf(kata, huruf);
  return (
    <span className="flex items-center gap-2 rounded-xl border-2 border-[#1C01A5] bg-white px-2 py-1">
      <span className="w-6 text-center text-lg font-black text-[#1C01A5]">{huruf}</span>
      <KartuTurus n={n} kecil={kecil} />
      <span className="text-sm font-black text-[#B45309]">{n}</span>
    </span>
  );
}

/** Tabel huruf dan turus untuk sebuah kata. */
export function TabelHurufTurus({ kata, huruf, kecil = false }: { kata: string; huruf: readonly string[]; kecil?: boolean }) {
  const baris: BarisTurus[] = huruf.map((h) => ({ nama: h, n: banyakHuruf(kata, h) }));
  return (
    <div className="space-y-1">
      <p className="text-center text-xs font-black text-[#1C01A5]">Kata: {kata}</p>
      <TabelTurus judul="Tabel huruf" kolom={["Huruf", "Turus", "Banyak"]} baris={baris} kecil={kecil} />
    </div>
  );
}

/** Titik polos kelompok lima (Picture, bukan benda). */
export function TitikKelompokLima({ n }: { n: number }) {
  const penuh = Math.floor(n / 5);
  const sisa = n % 5;
  return (
    <span className="flex flex-col items-center gap-1" role="img" aria-label={`${n} titik`}>
      {Array.from({ length: penuh }, (_, i) => (
        <BarisTitik key={`p${i}`} n={5} warna="#DC2626" />
      ))}
      {sisa > 0 ? <BarisTitik n={sisa} warna="#2563EB" /> : null}
      <span className="text-xs font-black text-[#1C01A5]">{n}</span>
    </span>
  );
}

/** Angka besar untuk Abstract. */
export function AngkaBesar({ n, kelas = "text-4xl" }: { n: number | string; kelas?: string }) {
  return <span className={`font-black text-[#1C01A5] ${kelas}`}>{n}</span>;
}

/** Daftar bilangan data sebagai chip. */
export function ChipData({ data }: { data: readonly number[] }) {
  return (
    <span className="flex flex-wrap justify-center gap-1">
      {data.map((n, i) => (
        <span key={`${n}-${i}`} className="rounded-lg border-2 border-[#1C01A5] bg-[#EEF2FF] px-2 py-0.5 text-sm font-black text-[#1C01A5]">
          {n}
        </span>
      ))}
    </span>
  );
}
