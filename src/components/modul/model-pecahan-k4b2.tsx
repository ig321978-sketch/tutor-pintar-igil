"use client";

import React from "react";

/**
 * Gambar model pecahan Kelas 4 Bab 2: lingkaran, batang, kisi 10 × 10, dan garis bilangan 0 sampai 1.
 * Hanya bentuk polos berwarna (bukan gambar benda), sehingga batas Concrete dan Picture terjaga.
 */
export const BIRU_PECAHAN = "#1C01A5";
export const EMAS_PECAHAN = "#FFE566";
export const LATAR_PECAHAN = "#F5F3FF";

const rad = (d: number) => (d * Math.PI) / 180;
const titikLingkaran = (cx: number, cy: number, r: number, sudut: number): [number, number] => [cx + r * Math.sin(rad(sudut)), cy - r * Math.cos(rad(sudut))];

/** Pengatur satu bilangan: tombol −/+ (aria-label "Tambah <nama>" dan "Kurangi <nama>"). */
export function Pengatur({ nama, nilai, onUbah }: { nama: string; nilai: number; onUbah: (d: 1 | -1) => void }) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label={`Atur ${nama}`}>
      <button type="button" aria-label={`Kurangi ${nama}`} onClick={() => onUbah(-1)} className="h-9 w-10 rounded-full border-4 border-[#1C01A5] bg-white text-lg font-black leading-none text-[#1C01A5]">
        −
      </button>
      <span className="min-w-8 text-center text-2xl font-black text-[#1C01A5]" aria-live="polite">
        {nilai}
      </span>
      <button type="button" aria-label={`Tambah ${nama}`} onClick={() => onUbah(1)} className="h-9 w-10 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-lg font-black leading-none text-[#1C01A5]">
        +
      </button>
    </div>
  );
}

/** Tulisan pecahan bertingkat: pembilang di atas garis, penyebut di bawah. */
export function TulisPecahan({ p, q, besar = false }: { p: number; q: number; besar?: boolean }) {
  return (
    <span className={`inline-flex flex-col items-center align-middle font-black leading-none text-[#1C01A5] ${besar ? "text-3xl" : "text-xl"}`} aria-label={`${p} per ${q}`}>
      <span className="px-1">{p}</span>
      <span className="my-0.5 h-[3px] w-full min-w-5 bg-[#1C01A5]" />
      <span className="px-1">{q}</span>
    </span>
  );
}

/** Bobot potongan tidak sama besar (hanya untuk gambar peringatan). Selalu ada yang berbeda. */
export const bobotTidakSama = (n: number): number[] => Array.from({ length: n }, (_, i) => 1 + ((i * 7) % 5) * 0.55);

/** Lingkaran dibagi n bagian. Bila `sama` salah, potongan digambar tidak sama besar. `arsir` adalah indeks bagian yang diarsir. */
export function Lingkaran({ bagian, arsir = [], sama = true, ukuran = 120, label }: { bagian: number; arsir?: number[]; sama?: boolean; ukuran?: number; label?: string }) {
  const bobot = sama ? Array.from({ length: bagian }, () => 1) : bobotTidakSama(bagian);
  const total = bobot.reduce((a, b) => a + b, 0);
  const irisan = bobot.map((w, i) => {
    const awal = (bobot.slice(0, i).reduce((a, b) => a + b, 0) / total) * 360;
    return { i, awal, akhir: awal + (w / total) * 360 };
  });
  const c = 60;
  const r = 52;
  return (
    <svg viewBox="0 0 120 120" width={ukuran} height={ukuran} role="img" aria-label={label ?? `Lingkaran dibagi ${bagian} bagian${sama ? " sama besar" : " tidak sama besar"}, ${arsir.length} diarsir`} className="shrink-0">
      {irisan.map(({ i, awal, akhir }) => {
        const [x1, y1] = titikLingkaran(c, c, r, awal);
        const [x2, y2] = titikLingkaran(c, c, r, akhir);
        const besar = akhir - awal > 180 ? 1 : 0;
        const d = bagian === 1 ? `M ${c - r} ${c} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0` : `M ${c} ${c} L ${x1} ${y1} A ${r} ${r} 0 ${besar} 1 ${x2} ${y2} Z`;
        return <path key={i} d={d} fill={arsir.includes(i) ? EMAS_PECAHAN : "#FFFFFF"} stroke={BIRU_PECAHAN} strokeWidth="2.5" strokeLinejoin="round" />;
      })}
    </svg>
  );
}

/** Batang dibagi n bagian sama panjang; `arsir` adalah indeks bagian yang diarsir. */
export function Batang({ bagian, arsir = [], lebar = 260, tinggi = 34, label }: { bagian: number; arsir?: number[]; lebar?: number; tinggi?: number; label?: string }) {
  const w = lebar / bagian;
  return (
    <svg viewBox={`0 0 ${lebar + 4} ${tinggi + 4}`} width={lebar + 4} height={tinggi + 4} role="img" aria-label={label ?? `Batang dibagi ${bagian} bagian sama panjang, ${arsir.length} diarsir`} className="max-w-full shrink-0">
      {Array.from({ length: bagian }, (_, i) => (
        <rect key={i} x={2 + i * w} y={2} width={w} height={tinggi} fill={arsir.includes(i) ? EMAS_PECAHAN : "#FFFFFF"} stroke={BIRU_PECAHAN} strokeWidth="2" />
      ))}
    </svg>
  );
}

/** Kisi 10 × 10 (seratus kotak); `arsir` adalah banyak kotak yang diarsir, dari kiri atas baris demi baris. */
export function Kisi100({ arsir, ukuran = 150, label }: { arsir: number; ukuran?: number; label?: string }) {
  const s = ukuran / 10;
  return (
    <svg viewBox={`0 0 ${ukuran + 4} ${ukuran + 4}`} width={ukuran + 4} height={ukuran + 4} role="img" aria-label={label ?? `Kisi seratus kotak, ${arsir} diarsir`} className="shrink-0">
      {Array.from({ length: 100 }, (_, i) => (
        <rect key={i} x={2 + (i % 10) * s} y={2 + Math.floor(i / 10) * s} width={s} height={s} fill={i < arsir ? EMAS_PECAHAN : "#FFFFFF"} stroke={BIRU_PECAHAN} strokeWidth="1" />
      ))}
    </svg>
  );
}

/** Garis bilangan 0 sampai 1 dibagi `bagian` sama panjang. `tanda` berisi nomor tanda (1 sampai bagian) yang diberi titik. */
export function GarisPecahan({ bagian, tanda = [], sorot = null, label }: { bagian: number; tanda?: number[]; sorot?: number | null; label?: string }) {
  const lebar = 300;
  const x = (k: number) => 20 + (k / bagian) * lebar;
  return (
    <svg viewBox="0 0 340 70" width="100%" role="img" aria-label={label ?? `Garis dari 0 sampai 1 dibagi ${bagian} sama panjang`} className="max-w-sm">
      <line x1={x(0)} y1={30} x2={x(bagian)} y2={30} stroke={BIRU_PECAHAN} strokeWidth="3" />
      {Array.from({ length: bagian + 1 }, (_, k) => (
        <g key={k}>
          <line x1={x(k)} y1={22} x2={x(k)} y2={38} stroke={BIRU_PECAHAN} strokeWidth={k === 0 || k === bagian ? 3 : 2} />
          {k === 0 || k === bagian ? (
            <text x={x(k)} y={58} textAnchor="middle" fontSize="13" fontWeight="900" fill={BIRU_PECAHAN}>
              {k === 0 ? "0" : "1"}
            </text>
          ) : null}
        </g>
      ))}
      {tanda.map((k) => (
        <circle key={k} cx={x(k)} cy={30} r={7} fill={sorot === k ? "#F0AB00" : EMAS_PECAHAN} stroke={BIRU_PECAHAN} strokeWidth="2.5" />
      ))}
    </svg>
  );
}
