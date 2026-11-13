"use client";

import React from "react";

/* ------------------------------------------------------------------------ */
/* Model gambar K6B1 Sub-Bab C: kisi sepuluh atau seratus kotak untuk pecahan  */
/* berpenyebut 10 atau 100, dan tabel nilai tempat desimal (satuan, koma,      */
/* persepuluhan, perseratusan).                                                */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";

/** Kisi t kotak (10 atau 100); `terisi` kotak pertama diarsir. */
export function KisiDesimal({ t, terisi, nama }: { t: number; terisi: number; nama: string }) {
  return (
    <div className="mx-auto w-full max-w-xs" role="img" aria-label={`Kisi ${t} kotak untuk ${nama}: ${terisi} kotak terarsir`}>
      <div className="grid gap-0.5 rounded-lg border-4 border-[#1C01A5] bg-white p-1" style={{ gridTemplateColumns: `repeat(10, minmax(0, 1fr))` }}>
        {Array.from({ length: t }, (_, k) => (
          <div key={k} className={t === 10 ? "h-6 rounded-sm border-2" : "aspect-square rounded-sm border"} style={{ background: k < terisi ? EMAS : "#fff", borderColor: k < terisi ? BIRU : "#cbd5e1" }} />
        ))}
      </div>
    </div>
  );
}

const KEPALA = ["satuan", "koma", "persepuluhan", "perseratusan"];

/** Tabel tempat desimal. `sorot` adalah kolom angka yang ditanyakan (0 satuan, 1 persepuluhan, 2 perseratusan). */
export function TabelDesimal({ bulat, p, s, sorot, nama }: { bulat: number; p: number | null; s: number | null; sorot: number; nama: string }) {
  const isi: (string | number)[] = [bulat, ",", p ?? "·", s ?? "·"];
  return (
    <div className="mx-auto w-full max-w-sm" role="img" aria-label={`Tabel nilai tempat desimal ${nama}`}>
      <div className="grid gap-1" style={{ gridTemplateColumns: "1.2fr 0.5fr 1.4fr 1.5fr" }}>
        {KEPALA.map((nm) => (
          <div key={nm} className="rounded-md bg-[#1C01A5] px-0.5 py-1 text-center text-[10px] font-black leading-tight text-white">
            {nm}
          </div>
        ))}
        {isi.map((v, k) => {
          const aktif = k !== 1 && sorot === (k === 0 ? 0 : k - 1);
          return (
            <div key={k} className="rounded-md py-2 text-center text-2xl font-black" style={{ color: v === "·" ? "#9ca3af" : BIRU, border: `3px solid ${aktif ? EMAS : BIRU}`, background: aktif ? "#FFF6CC" : "#fff" }}>
              {v}
            </div>
          );
        })}
      </div>
    </div>
  );
}
