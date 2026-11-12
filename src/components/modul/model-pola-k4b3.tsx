"use client";

import React from "react";

/**
 * Gambar model pola Kelas 4 Bab 3: kumpulan titik polos (disusun baris berisi lima agar mudah dilihat kelompoknya),
 * deretan kumpulan, dan pengatur selisih bertanda. Hanya bentuk polos berwarna (bukan gambar benda),
 * sehingga batas Concrete dan Picture terjaga.
 */
export const BIRU_POLA = "#1C01A5";
export const EMAS_POLA = "#FFE566";
export const JINGGA_POLA = "#F0AB00";

const PER_BARIS = 5;
const R = 6;
const JARAK = 16;

/** Satu kumpulan titik: baris berisi lima titik. Bila n kosong (null), digambar kotak tanya. */
export function KumpulanTitik({ n, sorot = false, label }: { n: number | null; sorot?: boolean; label: string }) {
  const banyak = n === null ? 0 : Math.max(0, n);
  const baris = Math.max(1, Math.ceil(banyak / PER_BARIS));
  const lebar = PER_BARIS * JARAK + 8;
  const tinggi = Math.max(4, baris) * JARAK + 8;
  return (
    <svg viewBox={`0 0 ${lebar} ${tinggi}`} width={lebar} height={tinggi} role="img" aria-label={label} className="shrink-0">
      <rect x={1} y={1} width={lebar - 2} height={tinggi - 2} rx={8} fill={sorot ? "#FFFBEB" : "#F5F3FF"} stroke={sorot ? JINGGA_POLA : BIRU_POLA} strokeWidth={2} strokeDasharray={sorot ? "5 3" : undefined} />
      {n === null ? (
        <text x={lebar / 2} y={tinggi / 2 + 7} textAnchor="middle" fontSize={22} fontWeight={900} fill={BIRU_POLA}>
          ?
        </text>
      ) : (
        Array.from({ length: banyak }, (_, i) => (
          <circle key={i} cx={4 + JARAK / 2 + (i % PER_BARIS) * JARAK} cy={4 + JARAK / 2 + Math.floor(i / PER_BARIS) * JARAK} r={R} fill={sorot ? JINGGA_POLA : BIRU_POLA} />
        ))
      )}
    </svg>
  );
}

/** Deretan kumpulan titik dengan label urutan dan banyaknya. */
export function DeretKumpulan({ nilai, label }: { nilai: { n: number | null; sorot?: boolean }[]; label: string }) {
  return (
    <div className="flex flex-wrap items-end justify-center gap-2" role="group" aria-label={label}>
      {nilai.map((k, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5">
          <KumpulanTitik n={k.n} sorot={k.sorot} label={k.n === null ? `Kumpulan ke-${i + 1} belum diketahui` : `Kumpulan ke-${i + 1}: ${k.n} titik`} />
          <span className="text-xs font-black text-[#1C01A5]">ke-{i + 1}</span>
          <span className="text-lg font-black leading-none text-[#1C01A5]">{k.n === null ? "?" : k.n}</span>
        </div>
      ))}
    </div>
  );
}

/** Teks selisih bertanda: +2, −2, atau 0. */
export const tandaSelisih = (d: number): string => (d > 0 ? `+${d}` : d < 0 ? `−${-d}` : "0");

/** Pengatur bilangan bertanda (selisih atau beda). Tombol beraria-label "Kurangi <nama>" dan "Tambah <nama>". */
export function PengaturTanda({ nama, nilai, onUbah }: { nama: string; nilai: number; onUbah: (d: 1 | -1) => void }) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label={`Atur ${nama}`}>
      <button type="button" aria-label={`Kurangi ${nama}`} onClick={() => onUbah(-1)} className="h-9 w-10 rounded-full border-4 border-[#1C01A5] bg-white text-lg font-black leading-none text-[#1C01A5]">
        −
      </button>
      <span className="min-w-12 text-center text-2xl font-black text-[#1C01A5]" aria-live="polite">
        {tandaSelisih(nilai)}
      </span>
      <button type="button" aria-label={`Tambah ${nama}`} onClick={() => onUbah(1)} className="h-9 w-10 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-lg font-black leading-none text-[#1C01A5]">
        +
      </button>
    </div>
  );
}

/** Batang polos sepanjang nilai (untuk tabel nilai), lebar maksimum `maks`. */
export function BatangNilai({ nilai, maks, label }: { nilai: number; maks: number; label: string }) {
  const lebar = Math.max(2, Math.round((Math.max(0, nilai) / Math.max(1, maks)) * 100));
  return (
    <div className="h-3 w-full rounded-full bg-[#EDE9FE]" role="img" aria-label={label}>
      <div className="h-3 rounded-full bg-[#1C01A5]" style={{ width: `${lebar}%` }} />
    </div>
  );
}
