"use client";

import React from "react";
import { dalamGaris, idPetak, lebarKisi, barisKisi, type BangunPotong } from "./lab-petak-k5b5a";

/* ------------------------------------------------------------------------ */
/* Model gambar K5B5 Sub-Bab A: kisi petak polos. Petak satuan, baris dan     */
/* kolom, dan bangun tangga yang petaknya bisa dipindah. Tanpa gambar benda.  */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const MUDA = "#FFF3B0";
const SEL = "aspect-square w-full min-w-0 rounded-md border-2 text-[10px] font-black";

/** Daerah yang ditutup: tiap petak bisa diketuk untuk dipasangi petak satuan. */
export function KisiTutup({ w, h, petak, onKetuk }: { w: number; h: number; petak: number[]; onKetuk: (ru: number, k: number) => void }) {
  const lebar = Math.min(300, w * 52);
  return (
    <div className="mx-auto grid gap-1" style={{ gridTemplateColumns: `repeat(${w}, minmax(0, 1fr))`, maxWidth: lebar }} role="group" aria-label={`Daerah ${w} petak ke samping dan ${h} petak ke bawah`}>
      {Array.from({ length: w * h }, (_, n) => {
        const ru = Math.floor(n / w);
        const k = n % w;
        const tutup = petak[n] === 1;
        return (
          <button
            key={n}
            type="button"
            aria-label={`Petak baris ${ru + 1} kolom ${k + 1}`}
            aria-pressed={tutup}
            onClick={() => onKetuk(ru, k)}
            className={`${SEL} ${tutup ? "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]" : "border-dashed border-[#1C01A5]/50 bg-white text-[#1C01A5]/40"}`}
          >
            {tutup ? "1" : ""}
          </button>
        );
      })}
    </div>
  );
}

/** Susunan r baris dan k kolom petak, hanya untuk dilihat. */
export function KisiBaris({ r, k }: { r: number; k: number }) {
  const lebar = Math.min(300, k * 40);
  return (
    <div className="mx-auto grid gap-1" style={{ gridTemplateColumns: `repeat(${k}, minmax(0, 1fr))`, maxWidth: lebar }} role="img" aria-label={`Susunan ${r} baris dan ${k} kolom petak`}>
      {Array.from({ length: r * k }, (_, n) => (
        <div key={n} className="aspect-square rounded-md border-2" style={{ borderColor: BIRU, backgroundColor: MUDA }} />
      ))}
    </div>
  );
}

/**
 * Bangun tangga di kisi. Garis putus membatasi persegi panjang tujuan. Petak yang menonjol di luar garis putus diambil
 * lalu ditaruh di lubang di dalamnya. onKlik dipanggil dengan baris (dari atas) dan kolom, kedua-duanya mulai dari nol.
 */
export function KisiPotong({ d, petak, pilih, onKlik }: { d: BangunPotong; petak: string[]; pilih: string | null; onKlik: (ru: number, k: number) => void }) {
  const H = barisKisi(d);
  const W = lebarKisi(d);
  const lebar = Math.min(320, W * 50);
  const sel: React.ReactNode[] = Array.from({ length: H * W }, (_, n) => {
    const ru = Math.floor(n / W);
    const k = n % W;
      const ada = petak.includes(idPetak(ru, k));
      const dalam = dalamGaris(d, ru, k);
      if (!ada && !dalam) {
        return <div key={`${ru}-${k}`} aria-hidden="true" className="aspect-square" />;
      }
      const dipilih = pilih === idPetak(ru, k);
      const nama = ada ? (dalam ? "Petak pas" : "Petak lebih") : "Lubang";
      const gaya = ada
        ? dalam
          ? "border-[#1C01A5] bg-[#FFF3B0]"
          : "border-[#1C01A5] bg-[#FFE566]"
        : "border-dashed border-[#1C01A5] bg-white";
      return (
        <button
          key={`${ru}-${k}`}
          type="button"
          aria-label={`${nama} baris ${ru + 1} kolom ${k + 1}`}
          aria-pressed={dipilih}
          onClick={() => onKlik(ru, k)}
          className={`${SEL} ${gaya} ${dipilih ? "ring-4 ring-[#F0AB00]" : ""} ${ada && !dalam ? "shadow-[0_0_0_3px_#F0AB00]" : ""}`}
        >
          {ada ? "1" : ""}
        </button>
      );
  });
  return (
    <div className="relative mx-auto" style={{ maxWidth: lebar }}>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${W}, minmax(0, 1fr))` }} role="group" aria-label={`Bangun ${d.nama}, garis putus menandai persegi panjang ${d.r} baris dan ${d.c} kolom`}>
        {sel}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-md"
        style={{
          left: -3,
          right: `calc(${((W - d.c) / W) * 100}% - 3px)`,
          bottom: -3,
          height: `calc(${(d.r / H) * 100}% + 6px)`,
          border: `3px dashed ${EMAS}`,
        }}
      />
    </div>
  );
}
