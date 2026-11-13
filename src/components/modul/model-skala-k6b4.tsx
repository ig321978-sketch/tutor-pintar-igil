"use client";

import React from "react";
import { ejaK6B4 } from "./eja-k6b4";

/* ------------------------------------------------------------------------ */
/* Model gambar K6B4 Sub-Bab A: lima tangga peluang, wadah berisi benda yang  */
/* digambar satu per satu, roda putar berjuring, deretan catatan putaran, dan  */
/* pilihan tiga jawaban yang dibaca suara guru. Bilangan bulat. Koin digambar  */
/* sebagai bulatan, bukan emoji.                                               */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const WARNA: Record<string, string> = {
  merah: "#DC2626",
  biru: "#3B82F6",
  kuning: "#FACC15",
  hijau: "#22C55E",
  putih: "#FFFFFF",
  gambar: "#FDE68A",
  angka: "#E5E7EB",
};

const OPSI_TOMBOL = "min-h-12 min-w-16 rounded-xl border-4 border-[#1C01A5] bg-white px-3 py-1 text-center text-base font-black text-[#1C01A5]";

/** Satu baris pertanyaan dengan tiga pilihan. */
export function PilihTiga({ judul, awalan, opsi, onPilih }: { judul: string; awalan: string; opsi: readonly (string | number)[]; onPilih: (o: number) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-center text-sm font-black text-[#1C01A5]">{judul}</p>
      <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label={judul}>
        {opsi.map((v, o) => (
          <button key={String(v)} type="button" aria-label={`${awalan} ${ejaK6B4(String(v))}`} onClick={() => onPilih(o)} className={OPSI_TOMBOL}>
            {String(v)}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Lima tangga peluang. `aktif` menandai satu tangga (nomor 0 sampai 4); tanpa nomor, semua netral. */
export function TanggaPeluang({ nama, aktif, kecil = false }: { nama: readonly string[]; aktif?: number; kecil?: boolean }) {
  return (
    <div className={`mx-auto grid w-full max-w-[420px] grid-cols-5 items-end gap-1 ${kecil ? "" : "pt-1"}`} role="img" aria-label={aktif === undefined ? "Lima tangga peluang dari tidak mungkin sampai pasti" : `Lima tangga peluang, kejadian ada di tangga ${nama[aktif].toLowerCase()}`}>
      {nama.map((n, i) => (
        <div key={n} className="flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-md border-2 border-[#1C01A5]"
            style={{ height: `${14 + i * 10}px`, background: aktif === i ? "#FFC800" : i === 0 ? "#E0E7FF" : i === 4 ? "#DDD6FE" : "#F3F0FF" }}
          />
          <span className={`text-center text-[10px] font-black leading-tight ${aktif === i ? "text-[#1C01A5]" : "text-[#1C01A5]/70"}`}>{n}</span>
        </div>
      ))}
    </div>
  );
}

const SEL = 26;

function Benda({ isi, tebal }: { isi: string; tebal: boolean }) {
  const garis = tebal ? 3 : 1;
  if (/^\d+$/.test(isi)) {
    return (
      <g>
        <rect x={2} y={2} width={SEL - 4} height={SEL - 4} rx={3} fill="#fff" stroke={BIRU} strokeWidth={garis} />
        <text x={SEL / 2} y={SEL / 2 + 4} textAnchor="middle" fontSize={12} fontWeight={900} fill={BIRU}>
          {isi}
        </text>
      </g>
    );
  }
  const huruf = isi === "gambar" ? "G" : isi === "angka" ? "A" : "";
  return (
    <g>
      <circle cx={SEL / 2} cy={SEL / 2} r={SEL / 2 - 3} fill={WARNA[isi] ?? "#fff"} stroke={BIRU} strokeWidth={garis} />
      {huruf ? (
        <text x={SEL / 2} y={SEL / 2 + 4} textAnchor="middle" fontSize={11} fontWeight={900} fill={BIRU}>
          {huruf}
        </text>
      ) : null}
    </g>
  );
}

/** Wadah berisi benda, satu gambar untuk tiap benda. Benda target bergaris tebal. */
export function Wadah({ isi, target, label }: { isi: readonly string[]; target?: string; label: string }) {
  const lebar = Math.min(isi.length, 10);
  const baris = Math.ceil(isi.length / 10);
  return (
    <svg viewBox={`0 0 ${lebar * SEL} ${baris * SEL}`} className="mx-auto h-auto w-full" style={{ maxWidth: `${lebar * 30}px` }} role="img" aria-label={label}>
      {isi.map((v, i) => (
        <g key={i} transform={`translate(${(i % 10) * SEL}, ${Math.floor(i / 10) * SEL})`} opacity={target !== undefined && v !== target ? 0.55 : 1}>
          <Benda isi={v} tebal={target !== undefined && v === target} />
        </g>
      ))}
    </svg>
  );
}

/** Deretan catatan putaran, satu bulatan berwarna untuk tiap putaran. */
export function Catatan({ hasil, target, label }: { hasil: readonly string[]; target: string; label: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1" role="img" aria-label={label}>
      {hasil.map((v, i) => (
        <span key={i} className="inline-block h-5 w-5 rounded-full border-2 border-[#1C01A5]" style={{ background: WARNA[v] ?? "#fff", boxShadow: v === target ? "0 0 0 2px #FFC800" : undefined }} />
      ))}
    </div>
  );
}

/** Roda putar: tiap juring sama besar, juring target bergaris tebal. */
export function Roda({ juring, target, label }: { juring: readonly string[]; target: string; label: string }) {
  const n = juring.length;
  const R = 58;
  const C = 64;
  const titik = (sudut: number): [number, number] => [C + R * Math.sin(sudut), C - R * Math.cos(sudut)];
  return (
    <svg viewBox="0 0 128 132" className="mx-auto h-auto w-full max-w-[200px]" role="img" aria-label={label}>
      <polygon points={`${C - 6},1 ${C + 6},1 ${C},12`} fill={BIRU} />
      {juring.map((v, i) => {
        const a0 = (i * 2 * Math.PI) / n;
        const a1 = ((i + 1) * 2 * Math.PI) / n;
        const [x0, y0] = titik(a0);
        const [x1, y1] = titik(a1);
        const d = n === 1 ? "" : `M${C},${C + 4} L${x0.toFixed(2)},${(y0 + 4).toFixed(2)} A${R},${R} 0 0 1 ${x1.toFixed(2)},${(y1 + 4).toFixed(2)} Z`;
        return <path key={i} d={d} fill={WARNA[v] ?? "#fff"} stroke={BIRU} strokeWidth={v === target ? 3 : 1} strokeLinejoin="round" />;
      })}
    </svg>
  );
}
