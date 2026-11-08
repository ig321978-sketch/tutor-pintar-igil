"use client";

import React from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { kata } from "./SubBabBBanding";
import { BendaSvg, SimbolSvg, type JenisBenda } from "./data-8-dasar";

/* ------------------------------------------------------------------------ */
/* Bagian bersama simulasi Bab 8 (PhET, mesin keadaan, skenario).             */
/* Tanpa jaringan. Dipakai SimulasiBab8, SimulasiMesinData, dan skenario.     */
/* ------------------------------------------------------------------------ */

export type Kategori = { nama: string; jenis: JenisBenda };

export const MAKS_JENIS = 8;
export const MAKS_TOTAL = 20;
export const WARNA_KOLOM = ["#FDE047", "#FB923C", "#4ADE80", "#60A5FA"];
export const RAMBUT = ["#1F2937", "#7A4A1E", "#111827", "#4B2E1A"];

export const sebut = (n: number) => kata(n).toLowerCase();

/**
 * Zona tujuan di titik layar. Benda yang sedang diseret berada tepat di bawah jari dan hidup di dalam
 * zona asalnya (meja atau rak), jadi dilewati supaya yang terbaca adalah zona di bawahnya.
 */
export function zonaTujuan(x: number, y: number): string | null {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el.closest('[role="button"]')) continue;
    const z = el.closest("[data-zona]");
    if (z) return z.getAttribute("data-zona");
  }
  return null;
}

export const KARTU = "rounded-2xl border-4 border-[#1C01A5] bg-white p-3";
export const TOMBOL_UTAMA =
  "rounded-full border-2 border-indigo-950 bg-amber-400 px-4 py-2 text-sm font-black text-indigo-950 shadow-[0_3px_0_rgba(30,27,75,0.35)] active:translate-y-0.5";
export const TOMBOL_BIASA =
  "rounded-full border-2 border-[#1C01A5] bg-white px-4 py-2 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.2)] active:translate-y-0.5";

/* ------------------------------ Komponen umum ---------------------------- */

export function Pilihan({ aktif, onKlik, children, label }: { aktif: boolean; onKlik: () => void; children: React.ReactNode; label?: string }) {
  return (
    <button
      type="button"
      aria-pressed={aktif}
      aria-label={label}
      onClick={onKlik}
      className={`rounded-full border-2 px-3 py-1.5 text-xs font-black transition-colors ${
        aktif ? "border-indigo-950 bg-[#1C01A5] text-[#FFE566]" : "border-[#1C01A5]/40 bg-white text-[#1C01A5]"
      }`}
    >
      {children}
    </button>
  );
}

export function Cek({ aktif, onKlik, children }: { aktif: boolean; onKlik: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={aktif}
      onClick={onKlik}
      className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-xs font-black ${
        aktif ? "border-indigo-950 bg-amber-300 text-indigo-950" : "border-[#1C01A5]/40 bg-white text-[#1C01A5]"
      }`}
    >
      <span aria-hidden="true">{aktif ? "☑" : "☐"}</span>
      {children}
    </button>
  );
}

export function Pencacah({
  nama,
  jenis,
  n,
  tambahLabel,
  kurangLabel,
  onTambah,
  onKurang,
  tambahMati,
  warna,
}: {
  nama: string;
  jenis: JenisBenda;
  n: number;
  tambahLabel: string;
  kurangLabel: string;
  onTambah: () => void;
  onKurang: () => void;
  tambahMati: boolean;
  warna?: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl border-2 border-[#1C01A5] px-2 py-1.5" style={{ backgroundColor: warna ?? "#F5F3FF" }}>
      <BendaSvg jenis={jenis} kelas="h-9 w-9" />
      <span className="min-w-0 flex-1 text-xs font-black leading-tight text-[#1C01A5]">{nama}</span>
      <button
        type="button"
        aria-label={kurangLabel}
        disabled={n <= 0}
        onClick={onKurang}
        className="h-9 w-9 shrink-0 rounded-full border-4 border-[#1C01A5] bg-white text-xl font-black leading-none text-[#1C01A5] disabled:opacity-30"
      >
        –
      </button>
      <span className="w-6 shrink-0 text-center text-xl font-black text-[#1C01A5]" aria-live="polite">
        {n}
      </span>
      <button
        type="button"
        aria-label={tambahLabel}
        disabled={tambahMati}
        onClick={onTambah}
        className="h-9 w-9 shrink-0 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-xl font-black leading-none text-[#1C01A5] disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}

export function CobaIni({ judul, langkah, onDengar }: { judul: string; langkah: string[]; onDengar: () => void }) {
  return (
    <div className="rounded-2xl border-4 border-dashed border-[#F0AB00] bg-[#FFFDF2] p-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-black text-[#1C01A5]">🔎 {judul}</h4>
        <TombolSuaraGuru kecil label="Dengarkan: Coba ini" onClick={onDengar} />
      </div>
      <ol className="mt-1 space-y-1 text-sm font-bold leading-snug text-[#1C01A5]">
        {langkah.map((l, i) => (
          <li key={l} className="flex gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFE566] text-xs font-black">{i + 1}</span>
            <span>{l}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export type Lambang = "benda" | "bulat" | "wajah";

export function Lambangnya({ lambang, jenis, k }: { lambang: Lambang; jenis: JenisBenda; k: number }) {
  if (lambang === "benda") return <BendaSvg jenis={jenis} kelas="h-5 w-5 igil-muncul" />;
  return <SimbolSvg jenis={lambang === "wajah" ? "wajah" : "bulat"} warna={WARNA_KOLOM[k % WARNA_KOLOM.length]} kelas="h-5 w-5 igil-muncul" />;
}

export function DiagramSim({
  arah,
  kat,
  jumlah,
  lambang,
  banding,
  sorotMax,
  sorotMin,
  onPilih,
}: {
  arah: "tegak" | "mendatar";
  kat: Kategori[];
  jumlah: number[];
  lambang: Lambang;
  banding: number[];
  sorotMax: number[];
  sorotMin: number[];
  /** Bila kosong, nama kolom hanya label (tidak bisa diketuk untuk dibandingkan). */
  onPilih?: (k: number) => void;
}) {
  const baris = Array.from({ length: MAKS_JENIS }, (_, j) => j);
  const lo = banding.length === 2 ? Math.min(jumlah[banding[0]], jumlah[banding[1]]) : 0;
  const hi = banding.length === 2 ? Math.max(jumlah[banding[0]], jumlah[banding[1]]) : 0;
  const tinggiKe = banding.length === 2 ? (jumlah[banding[0]] >= jumlah[banding[1]] ? banding[0] : banding[1]) : -1;

  const sel = (k: number, j: number, lebar: string) => {
    const isi = j < jumlah[k];
    const selisih = banding.length === 2 && tinggiKe === k && j >= lo && j < hi;
    return (
      <span
        key={j}
        className={`flex h-7 ${lebar} items-center justify-center border border-[#C4B5FD] ${selisih ? "bg-[#FEE2E2] ring-2 ring-inset ring-[#EF4444]" : "bg-white"}`}
      >
        {isi ? <Lambangnya lambang={lambang} jenis={kat[k].jenis} k={k} /> : null}
      </span>
    );
  };

  const label = (k: number, lebar: string) => {
    const dipilih = banding.includes(k);
    const tanda = sorotMax.includes(k) ? "bg-[#FFE566]" : sorotMin.includes(k) ? "bg-[#DBEAFE]" : "bg-[#E9D8F3]";
    const gaya = `${lebar} ${tanda} px-0.5 py-1 text-center text-[10px] font-black leading-tight text-[#1C01A5] ${dipilih ? "ring-4 ring-[#1C01A5]" : ""}`;
    if (!onPilih) {
      return <div className={gaya}>{kat[k].nama}</div>;
    }
    return (
      <button type="button" aria-label={`Bandingkan ${kat[k].nama}`} aria-pressed={dipilih} onClick={() => onPilih(k)} className={gaya}>
        {kat[k].nama}
      </button>
    );
  };

  const ringkas = kat.map((c, i) => `${c.nama} ${jumlah[i]}`).join(", ");

  if (arah === "tegak") {
    return (
      <div
        className="grid gap-x-1"
        style={{ gridTemplateColumns: `1.5rem repeat(${kat.length}, 3.6rem)` }}
        role="group"
        aria-label={`Diagram gambar tegak: ${ringkas}`}
      >
        <div className="flex flex-col-reverse" style={{ gridRow: 1, gridColumn: 1 }}>
          {baris.map((j) => (
            <span key={j} className="flex h-7 w-6 items-center justify-center rounded-md bg-[#E9D8F3] text-[11px] font-black text-[#1C01A5]">
              {j + 1}
            </span>
          ))}
        </div>
        {kat.map((c, k) => (
          <div
            key={c.nama}
            className={`flex flex-col-reverse rounded-md ${sorotMax.includes(k) ? "ring-4 ring-[#F0AB00]" : ""}`}
            style={{ gridRow: 1, gridColumn: k + 2 }}
          >
            {baris.map((j) => sel(k, j, "w-full"))}
          </div>
        ))}
        {kat.map((c, k) => (
          <div key={`nama-${c.nama}`} className="flex" style={{ gridRow: 2, gridColumn: k + 2 }}>
            {label(k, "flex w-full items-center justify-center")}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-0.5" role="group" aria-label={`Diagram gambar mendatar: ${ringkas}`}>
      {kat.map((c, k) => (
        <div key={c.nama} className={`flex items-center justify-center gap-0.5 rounded-md ${sorotMax.includes(k) ? "ring-4 ring-[#F0AB00]" : ""}`}>
          {label(k, "w-[4.6rem] shrink-0 rounded-md")}
          <div className="flex">{baris.map((j) => sel(k, j, "w-7"))}</div>
        </div>
      ))}
      <div className="flex items-center justify-center gap-0.5">
        <span className="w-[4.6rem] shrink-0" />
        <div className="flex">
          {baris.map((j) => (
            <span key={j} className="flex h-6 w-7 items-center justify-center rounded-md bg-[#E9D8F3] text-[11px] font-black text-[#1C01A5]">
              {j + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

