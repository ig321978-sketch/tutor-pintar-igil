"use client";
/**
 * Visual skala peluang kualitatif Buku Siswa Kelas VI Bab 4.
 * Lima tangga: Tidak mungkin → Pasti. Tanpa jaringan.
 */
import React from "react";

export const TANGGA_SKALA = [
  { id: "tidak", label: "Tidak mungkin", warna: "bg-slate-200 text-slate-800 border-slate-500" },
  { id: "kurang", label: "Kurang mungkin", warna: "bg-sky-200 text-sky-950 border-sky-600" },
  { id: "mungkin", label: "Mungkin", warna: "bg-amber-200 text-amber-950 border-amber-500" },
  { id: "sangat", label: "Sangat mungkin", warna: "bg-orange-300 text-orange-950 border-orange-600" },
  { id: "pasti", label: "Pasti", warna: "bg-emerald-300 text-emerald-950 border-emerald-700" },
] as const;

export type IdTangga = (typeof TANGGA_SKALA)[number]["id"];

export function BatangSkala({ aktif, kecil = false }: { aktif?: IdTangga | IdTangga[]; kecil?: boolean }) {
  const set = new Set(Array.isArray(aktif) ? aktif : aktif ? [aktif] : []);
  return (
    <div className={`w-full ${kecil ? "max-w-xs" : "max-w-md"}`}>
      <div className="flex overflow-hidden rounded-2xl border-4 border-[#1C01A5]">
        {TANGGA_SKALA.map((t) => {
          const on = set.size === 0 || set.has(t.id);
          return (
            <div
              key={t.id}
              className={`flex flex-1 items-center justify-center border-r-2 border-[#1C01A5]/40 px-0.5 py-2 text-center last:border-r-0 ${t.warna} ${on ? "opacity-100" : "opacity-35"} ${kecil ? "min-h-12 text-[8px] font-black leading-tight" : "min-h-14 text-[9px] font-black leading-tight"}`}
            >
              {t.label}
            </div>
          );
        })}
      </div>
      <p className="mt-1 text-center text-[10px] font-bold text-[#1C01A5]/70">METODE LUAR · Likelihood Spectrum Scale</p>
    </div>
  );
}

export function KartuKoin({ sisi }: { sisi: "gambar" | "angka" | "dua" }) {
  const teks = sisi === "gambar" ? "🖼️" : sisi === "angka" ? "🔢" : "🖼️|🔢";
  return (
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-amber-500 bg-amber-200 text-2xl font-black text-amber-950 shadow-md">
      {teks}
    </div>
  );
}

export function KartuDadu({ sisi }: { sisi: number[] }) {
  return (
    <div className="inline-flex flex-wrap justify-center gap-1 rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
      {sisi.map((n, i) => (
        <span key={`${n}-${i}`} className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-indigo-800 bg-indigo-100 text-sm font-black text-[#1C01A5]">
          {n}
        </span>
      ))}
    </div>
  );
}

export function KantongBola({
  isi,
}: {
  isi: { warna: string; jumlah: number; kelas: string }[];
}) {
  const total = isi.reduce((a, b) => a + b.jumlah, 0);
  return (
    <div className="inline-block rounded-2xl border-4 border-[#1C01A5] bg-indigo-50 p-2">
      <p className="mb-1 text-center text-[10px] font-black text-[#1C01A5]">Total {total} bola</p>
      <div className="flex flex-wrap justify-center gap-1">
        {isi.flatMap((g) =>
          Array.from({ length: g.jumlah }, (_, i) => (
            <span key={`${g.warna}-${i}`} className={`h-5 w-5 rounded-full border-2 border-slate-700 ${g.kelas}`} title={g.warna} />
          )),
        )}
      </div>
      <p className="mt-1 text-center text-[9px] font-bold text-slate-600">
        {isi.map((g) => `${g.jumlah} ${g.warna}`).join(" · ")}
      </p>
    </div>
  );
}

export function RodaPutarRingkas({ sektor }: { sektor: { label: string; kelas: string; bagian: number }[] }) {
  const total = sektor.reduce((a, b) => a + b.bagian, 0) || 1;
  let acc = 0;
  const stops = sektor.map((s) => {
    const mulai = (acc / total) * 100;
    acc += s.bagian;
    const akhir = (acc / total) * 100;
    return `${s.kelas} ${mulai}% ${akhir}%`;
  });
  return (
    <div className="mx-auto flex flex-col items-center gap-1">
      <div
        className="h-24 w-24 rounded-full border-4 border-[#1C01A5] shadow-inner"
        style={{ background: `conic-gradient(${stops.join(", ")})` }}
        role="img"
        aria-label="Roda putar peluang"
      />
      <p className="text-[9px] font-bold text-[#1C01A5]">
        {sektor.map((s) => `${s.label}:${s.bagian}`).join(" · ")}
      </p>
    </div>
  );
}
