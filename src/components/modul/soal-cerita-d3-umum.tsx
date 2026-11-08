"use client";

import React from "react";
import { WARNA_ADA } from "./diagram-pictorial";
import { Persamaan, type Isi } from "./SubBabA2Penjumlahan";

/* Bagian bersama Sub-Bab D (Soal Cerita Pengurangan): kalimat ringkas dan model batang. */

export type { Isi };
export const TINTA = "#1C01A5";

export const Tambah = (p: { a: Isi; b: Isi; c: Isi; kecil?: boolean; nyala?: number[] }) => (
  <Persamaan a={p.a} b={p.b} c={p.c} t1="+" kecil={p.kecil} nyala={p.nyala} />
);
export const Kurang = (p: { a: Isi; b: Isi; c: Isi; kecil?: boolean; nyala?: number[] }) => (
  <Persamaan a={p.a} b={p.b} c={p.c} t1="−" kecil={p.kecil} nyala={p.nyala} />
);

/**
 * Kalimat matematika satu baris dengan jumlah suku bebas, misalnya 9 − 2 − 4 = 3.
 * `nyala` memuat indeks suku yang disorot. Isi "?" tampil sebagai tanda tanya, null sebagai kotak kosong.
 */
export function Rangkai({ tok, nyala = [], kelas = "text-xl" }: { tok: (Isi | string)[]; nyala?: number[]; kelas?: string }) {
  const baca = tok.map((x) => (x === null ? "kosong" : x === "?" ? "tanda tanya" : x)).join(" ");
  return (
    <span
      role="img"
      aria-label={`Kalimat matematika: ${baca}`}
      className={`inline-flex flex-wrap items-center justify-center gap-1 rounded-xl border-[3px] border-[#1C01A5] bg-white px-2 py-1 font-black leading-none text-[#1C01A5] ${kelas}`}
    >
      {tok.map((x, i) => (
        <span key={i} className={nyala.includes(i) ? "igil-denyut rounded-md bg-[#FFE566] px-1 ring-2 ring-[#F0AB00]" : ""}>
          {x === null ? "" : x}
        </span>
      ))}
    </span>
  );
}

/** Kalimat pengurangan sekali: a − b = c. */
export const kurangTok = (a: Isi, b: Isi, c: Isi): (Isi | string)[] => [a, "−", b, "=", c];

/* ------------------------------ Model batang ---------------------------- */

const SEL_CORET = "border-[#1C01A5]/40 bg-white text-[#1C01A5]/50";

/** Satu sel batang. `jenis` ada (merah) atau pergi (dicoret). */
export function SelBatang({ jenis, nyala = false }: { jenis: "ada" | "pergi"; nyala?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-9 min-w-0 flex-1 items-center justify-center rounded-md border-[3px] text-lg font-black leading-none ${
        jenis === "ada" ? "border-[#1C01A5]" : SEL_CORET
      } ${nyala ? "igil-denyut ring-2 ring-[#F0AB00]" : ""}`}
      style={jenis === "ada" ? { backgroundColor: WARNA_ADA } : undefined}
    >
      {jenis === "pergi" ? "×" : ""}
    </span>
  );
}

/** Kotak "?" bergaris putus-putus untuk bagian yang belum diketahui. */
export function SelTanya({ lebar = 2 }: { lebar?: number }) {
  return (
    <span
      aria-hidden="true"
      className="igil-denyut flex h-9 min-w-0 items-center justify-center rounded-md border-[3px] border-dashed border-[#F0AB00] bg-[#FFF8D6] text-xl font-black leading-none text-[#1C01A5]"
      style={{ flexGrow: lebar, flexBasis: 0 }}
    >
      ?
    </span>
  );
}

/** Kurung label di atas atau di bawah batang. */
export function Label({ teks, nilai, grow, bawah = false, nyala = false }: { teks: string; nilai: Isi; grow: number; bawah?: boolean; nyala?: boolean }) {
  return (
    <div
      className={`min-w-0 text-center text-[11px] font-black leading-tight text-[#1C01A5] ${
        bawah ? "border-t-4 pt-0.5" : "border-b-4 pb-0.5"
      } border-[#1C01A5]/60 ${nyala ? "igil-denyut rounded bg-[#FFF8D6]" : ""}`}
      style={{ flexGrow: grow, flexBasis: 0 }}
    >
      {teks} <span className="text-base">{nilai}</span>
    </div>
  );
}

/**
 * Model batang (diagram, tanpa gambar benda). Batang kiri merah = sisa (ada), batang kanan dicoret = pergi.
 * Bagian yang `?` digambar sebagai satu kotak putus-putus, tidak memperlihatkan jumlah sebenarnya.
 */
export function BatangModel({
  mula,
  pergi,
  sisa,
  nyala,
}: {
  mula: number | "?";
  pergi: number | "?";
  sisa: number | "?";
  nyala?: "mula" | "pergi" | "sisa";
}) {
  const nSisa = typeof sisa === "number" ? sisa : 2;
  const nPergi = typeof pergi === "number" ? pergi : 2;
  return (
    <div
      role="img"
      aria-label={`Model batang: mula-mula ${mula}, sisa ${sisa}, pergi ${pergi}`}
      className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2"
    >
      <div className="flex">
        <Label teks="Mula-mula" nilai={mula} grow={nSisa + nPergi} nyala={nyala === "mula"} />
      </div>
      <div className="flex gap-0.5">
        {sisa === "?" ? (
          <SelTanya lebar={nSisa} />
        ) : (
          Array.from({ length: nSisa }, (_, i) => <SelBatang key={`s${i}`} jenis="ada" />)
        )}
        {pergi === "?" ? (
          <SelTanya lebar={nPergi} />
        ) : (
          Array.from({ length: nPergi }, (_, i) => <SelBatang key={`p${i}`} jenis="pergi" />)
        )}
      </div>
      <div className="flex gap-1">
        <Label teks="Sisa" nilai={sisa} grow={nSisa} bawah nyala={nyala === "sisa"} />
        <Label teks="Pergi" nilai={pergi} grow={nPergi} bawah nyala={nyala === "pergi"} />
      </div>
    </div>
  );
}
