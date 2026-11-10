"use client";

import React from "react";
import { empat, lambang } from "./data-k4b1";

/* ------------------------------------------------------------------------ */
/* Diagram bersama Matematika Kelas 4 Bab 1 (Bilangan Cacah sampai 10.000).    */
/* Blok: kubus ribuan (ungu), lempeng ratusan (hijau), batang puluhan (biru),  */
/* kotak satuan (merah). Aman untuk Picture dan Abstract (tanpa benda).        */
/* ------------------------------------------------------------------------ */

const TINTA = "#1C01A5";
export const WARNA_TEMPAT = {
  ribuan: { teks: "#6D28D9", isi: "#DDD6FE", blok: "#A78BFA" },
  ratusan: { teks: "#15803D", isi: "#BBF7D0", blok: "#4ADE80" },
  puluhan: { teks: "#1D4ED8", isi: "#BFDBFE", blok: "#60A5FA" },
  satuan: { teks: "#DC2626", isi: "#FECACA", blok: "#F87171" },
} as const;

/** Model blok empat tempat. rb = kubus ribuan (kotak besar), r/p/s seperti K3. */
export function ModelEmpat({ rb, r, p, s, skala = 1, label }: { rb: number; r: number; p: number; s: number; skala?: number; label?: string }) {
  const rs = 28;
  const g = 3;
  const kubus = 34;
  const kolRb = Math.min(rb, 5);
  const lebarRb = rb > 0 ? kolRb * (kubus + g) - g : 0;
  const kolR = Math.min(r, 5);
  const barisR = Math.ceil(r / 5) || 0;
  const lebarR = r > 0 ? kolR * (rs + g) - g : 0;
  const bw = 5;
  const gb = 2;
  const lebarP = p > 0 ? p * (bw + gb) - gb : 0;
  const cw = 6;
  const gc = 2;
  const lebarS = s > 0 ? Math.min(s, 5) * (cw + gc) - gc : 0;
  const jarak = 8;
  const bagian = [lebarRb, lebarR, lebarP, lebarS].filter((x) => x > 0);
  const W = Math.max(bagian.reduce((a, b) => a + b, 0) + jarak * Math.max(0, bagian.length - 1), 10);
  const H = Math.max(rb > 0 ? kubus : 0, barisR > 0 ? barisR * (rs + g) - g : 0, p > 0 ? rs : 0, s > 0 ? 2 * (cw + gc) : 0, 10);
  let x = 0;
  const xRb = x;
  x += lebarRb + (lebarRb > 0 ? jarak : 0);
  const xR = x;
  x += lebarR + (lebarR > 0 ? jarak : 0);
  const xP = x;
  x += lebarP + (lebarP > 0 ? jarak : 0);
  const xS = x;
  const sw = 1.3;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W * skala} height={H * skala} className="block max-w-full" style={{ height: "auto" }} role="img" aria-label={label ?? `${rb} ribuan, ${r} ratusan, ${p} puluhan, dan ${s} satuan`}>
      {Array.from({ length: rb }, (_, i) => (
        <g key={`rb${i}`}>
          <rect x={xRb + i * (kubus + g)} y={0} width={kubus} height={kubus} rx="3" fill={WARNA_TEMPAT.ribuan.blok} stroke={TINTA} strokeWidth={sw} />
          <text x={xRb + i * (kubus + g) + kubus / 2} y={kubus / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
            1rb
          </text>
        </g>
      ))}
      {Array.from({ length: r }, (_, i) => {
        const xx = xR + (i % 5) * (rs + g);
        const y = Math.floor(i / 5) * (rs + g);
        return (
          <g key={`r${i}`}>
            <rect x={xx} y={y} width={rs} height={rs} rx="2" fill={WARNA_TEMPAT.ratusan.blok} stroke={TINTA} strokeWidth={sw} />
            {Array.from({ length: 9 }, (_, j) => (
              <g key={j}>
                <line x1={xx + ((j + 1) * rs) / 10} x2={xx + ((j + 1) * rs) / 10} y1={y} y2={y + rs} stroke={TINTA} strokeWidth="0.4" opacity="0.5" />
                <line y1={y + ((j + 1) * rs) / 10} y2={y + ((j + 1) * rs) / 10} x1={xx} x2={xx + rs} stroke={TINTA} strokeWidth="0.4" opacity="0.5" />
              </g>
            ))}
          </g>
        );
      })}
      {Array.from({ length: p }, (_, i) => (
        <rect key={`p${i}`} x={xP + i * (bw + gb)} y={0} width={bw} height={rs} rx="1.5" fill={WARNA_TEMPAT.puluhan.blok} stroke={TINTA} strokeWidth={sw} />
      ))}
      {Array.from({ length: s }, (_, i) => (
        <rect key={`s${i}`} x={xS + (i % 5) * (cw + gc)} y={Math.floor(i / 5) * (cw + gc)} width={cw} height={cw} rx="1.5" fill={WARNA_TEMPAT.satuan.blok} stroke={TINTA} strokeWidth={sw} />
      ))}
    </svg>
  );
}

export const ModelDari = ({ n, skala = 1 }: { n: number; skala?: number }) => {
  const d = empat(n);
  return <ModelEmpat rb={d.rb} r={d.r} p={d.p} s={d.s} skala={skala} />;
};

export function PapanTempat({
  rb,
  r,
  p,
  s,
  tanya = [false, false, false, false],
  kecil = false,
}: {
  rb: number | null;
  r: number | null;
  p: number | null;
  s: number | null;
  tanya?: [boolean, boolean, boolean, boolean];
  kecil?: boolean;
}) {
  const nilai = [rb, r, p, s];
  const judul = ["Ribuan", "Ratusan", "Puluhan", "Satuan"] as const;
  const kunci = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
  return (
    <div className="flex flex-wrap items-center justify-center gap-1" role="img" aria-label={`Papan: ribuan ${rb}, ratusan ${r}, puluhan ${p}, satuan ${s}`}>
      {judul.map((j, i) => (
        <div key={j} className="flex flex-col items-center overflow-hidden rounded-xl border-[3px] border-[#1C01A5] bg-white">
          <span className={`w-full text-center font-black ${kecil ? "px-1.5 py-0 text-[9px]" : "px-2 py-0.5 text-[10px]"}`} style={{ backgroundColor: WARNA_TEMPAT[kunci[i]].isi, color: WARNA_TEMPAT[kunci[i]].teks }}>
            {j}
          </span>
          <span className={`flex items-center justify-center font-black text-[#1C01A5] ${kecil ? "h-7 w-9 text-lg" : "h-11 w-14 text-3xl"}`}>{tanya[i] || nilai[i] === null ? "?" : nilai[i]}</span>
        </div>
      ))}
    </div>
  );
}

export const PapanDari = ({ n, kecil = false }: { n: number; kecil?: boolean }) => {
  const d = empat(n);
  return <PapanTempat rb={d.rb} r={d.r} p={d.p} s={d.s} kecil={kecil} />;
};

export function KartuModel({ n, skala = 0.55 }: { n: number; skala?: number }) {
  return (
    <span className="flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl bg-white px-1 py-1">
      <ModelDari n={n} skala={skala} />
      <span className="text-[10px] font-black text-[#1C01A5]">{lambang(n)}</span>
    </span>
  );
}

export function AngkaBerwarna({ n, ukuran = "text-3xl" }: { n: number; ukuran?: string }) {
  const d = empat(n);
  return (
    <span className={`inline-flex font-black tracking-wide ${ukuran}`} aria-label={lambang(n)}>
      <span style={{ color: WARNA_TEMPAT.ribuan.teks }}>{d.rb}</span>
      <span className="text-[#1C01A5]/40">.</span>
      <span style={{ color: WARNA_TEMPAT.ratusan.teks }}>{d.r}</span>
      <span style={{ color: WARNA_TEMPAT.puluhan.teks }}>{d.p}</span>
      <span style={{ color: WARNA_TEMPAT.satuan.teks }}>{d.s}</span>
    </span>
  );
}

export function TabelTempat({
  baris,
  kepala = ["Bilangan", "Ribuan", "Ratusan", "Puluhan", "Satuan"],
}: {
  baris: { n: string; rb: string; r: string; p: string; s: string }[];
  kepala?: [string, string, string, string, string];
}) {
  const warna = ["#FEF3C7", WARNA_TEMPAT.ribuan.isi, WARNA_TEMPAT.ratusan.isi, WARNA_TEMPAT.puluhan.isi, WARNA_TEMPAT.satuan.isi];
  const tinta = [TINTA, WARNA_TEMPAT.ribuan.teks, WARNA_TEMPAT.ratusan.teks, WARNA_TEMPAT.puluhan.teks, WARNA_TEMPAT.satuan.teks];
  return (
    <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
      <div className="grid grid-cols-5 text-center text-[10px] font-black leading-tight">
        {kepala.map((k, i) => (
          <span key={k} className="px-0.5 py-1" style={{ backgroundColor: warna[i], color: tinta[i] }}>
            {k}
          </span>
        ))}
      </div>
      {baris.map((b, i) => (
        <div key={b.n} className={`grid grid-cols-5 items-center text-center text-sm font-black text-[#1C01A5] ${i % 2 ? "bg-[#F5F3FF]" : "bg-white"}`}>
          <span className="px-0.5 py-1">{b.n}</span>
          <span className="px-0.5 py-1" style={{ color: tinta[1] }}>{b.rb}</span>
          <span className="px-0.5 py-1" style={{ color: tinta[2] }}>{b.r}</span>
          <span className="px-0.5 py-1" style={{ color: tinta[3] }}>{b.p}</span>
          <span className="px-0.5 py-1" style={{ color: tinta[4] }}>{b.s}</span>
        </div>
      ))}
    </div>
  );
}
