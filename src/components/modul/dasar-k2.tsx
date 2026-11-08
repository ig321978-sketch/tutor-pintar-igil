"use client";

import React from "react";
import { BIRU, EMAS, KUNING } from "./CeritaBandingB";
import { NamaBilangan, namaBilangan } from "./data-k2";

/* ------------------------------------------------------------------------ */
/* Matematika Kelas 2 Bab 1 (Ayo Membilang sampai dengan 50).                 */
/* Bagian gambar dan penolong yang dipakai bersama oleh Sub-Bab A dan B.      */
/* Semua dibuat di klien (SVG), tanpa panggilan API. Aturan Concrete dan      */
/* Picture dijaga: benda nyata hanya di Concrete, diagram polos di Picture.   */
/* ------------------------------------------------------------------------ */

export const MERAH_K2 = "#E53E3E";
export const BIRU_K2 = "#2563EB";
export const HIJAU_K2 = "#16A34A";
export const UNGU_K2 = "#9333EA";
export const JINGGA_K2 = "#EA580C";

/** Nama bilangan huruf kecil untuk kalimat yang dibacakan. */
export const sebut = (n: number) => namaBilangan(n);
export const Sebut = (n: number) => NamaBilangan(n);

/* ------------------------------ Benda nyata ------------------------------ */

const WARNA_TAS = ["#3B82F6", "#A855F7", "#22C55E", "#F59E0B", "#EC4899"];

/** Tas sekolah kecil. Dipakai di cerita dan di tahap Concrete. */
export function Tas({ warna = 0, kelas = "h-10 w-10" }: { warna?: number; kelas?: string }) {
  const w = WARNA_TAS[warna % WARNA_TAS.length];
  return (
    <svg viewBox="0 0 40 44" className={kelas} aria-hidden="true">
      <path d="M13 8 Q20 -2 27 8" fill="none" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      <rect x="5" y="8" width="30" height="32" rx="9" fill={w} stroke={BIRU} strokeWidth="2.6" />
      <rect x="10" y="22" width="20" height="13" rx="4" fill="#FFFFFF" fillOpacity="0.35" stroke={BIRU} strokeWidth="2" />
      <path d="M12 15 H28" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/** Balok bangunan kecil (kubus). Satu balok adalah satu satuan. */
export function Balok({ warna = 0, kelas = "h-9 w-9" }: { warna?: number; kelas?: string }) {
  const w = ["#F97316", "#3B82F6", "#22C55E", "#EAB308", "#EC4899"][warna % 5];
  return (
    <svg viewBox="0 0 40 40" className={kelas} aria-hidden="true">
      <rect x="6" y="10" width="26" height="26" rx="3" fill={w} stroke={BIRU} strokeWidth="2.4" />
      <path d="M6 10 L12 4 H38 L32 10 Z" fill={w} fillOpacity="0.7" stroke={BIRU} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M32 10 L38 4 V30 L32 36 Z" fill={w} fillOpacity="0.5" stroke={BIRU} strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="19" cy="23" r="4.2" fill="#FFFFFF" fillOpacity="0.7" />
    </svg>
  );
}

/** Satu susun balok berisi sepuluh (dua baris lima), sebagai satu benda. */
export function SusunBalok({ isi = 10, kelas = "h-14 w-24" }: { isi?: number; kelas?: string }) {
  return (
    <svg viewBox="0 0 110 62" className={kelas} role="img" aria-label={`Satu susun berisi ${isi} balok`}>
      <rect x="2" y="2" width="106" height="58" rx="8" fill="#FFF7CC" stroke={EMAS} strokeWidth="3" />
      {Array.from({ length: isi }, (_, i) => (
        <rect
          key={i}
          x={8 + (i % 5) * 19}
          y={8 + Math.floor(i / 5) * 25}
          width="16"
          height="21"
          rx="3"
          fill={["#F97316", "#3B82F6", "#22C55E", "#EAB308", "#EC4899"][(i % 5) % 5]}
          stroke={BIRU}
          strokeWidth="1.8"
        />
      ))}
    </svg>
  );
}

/** Telur ayam. */
export function Telur({ kelas = "h-7 w-6" }: { kelas?: string }) {
  return (
    <svg viewBox="0 0 24 30" className={kelas} aria-hidden="true">
      <path d="M12 2 C4 6 2 20 12 27 C22 20 20 6 12 2 Z" fill="#FFF3D6" stroke={BIRU} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M8 10 Q9 7 12 6" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

/** Rak telur penuh berisi sepuluh telur (dua baris lima). */
export function RakTelur({ kelas = "h-16 w-28" }: { kelas?: string }) {
  return (
    <svg viewBox="0 0 120 70" className={kelas} role="img" aria-label="Satu rak berisi sepuluh telur">
      <rect x="3" y="14" width="114" height="52" rx="10" fill="#E5C79A" stroke="#A8672D" strokeWidth="3.2" />
      {Array.from({ length: 10 }, (_, i) => {
        const cx = 17 + (i % 5) * 22;
        const cy = 30 + Math.floor(i / 5) * 24;
        return (
          <g key={i}>
            <ellipse cx={cx} cy={cy + 3} rx="9" ry="7" fill="#C9A06A" opacity="0.7" />
            <path d={`M${cx} ${cy - 13} C${cx - 8} ${cy - 9} ${cx - 10} ${cy + 3} ${cx} ${cy + 9} C${cx + 10} ${cy + 3} ${cx + 8} ${cy - 9} ${cx} ${cy - 13} Z`} fill="#FFF3D6" stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
          </g>
        );
      })}
    </svg>
  );
}

/** Kantong kelereng penuh berisi sepuluh kelereng. */
export function KantongKelereng({ kelas = "h-16 w-16" }: { kelas?: string }) {
  const w = ["#EF4444", "#3B82F6", "#22C55E", "#EAB308", "#A855F7"];
  return (
    <svg viewBox="0 0 70 76" className={kelas} role="img" aria-label="Satu kantong berisi sepuluh kelereng">
      <path d="M22 8 Q35 -2 48 8" fill="none" stroke="#A8672D" strokeWidth="4" strokeLinecap="round" />
      <path d="M16 10 H54 L62 62 Q62 72 52 72 H18 Q8 72 8 62 Z" fill="#FDE9C4" stroke="#A8672D" strokeWidth="3.2" strokeLinejoin="round" />
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={20 + (i % 4) * 10 + (Math.floor(i / 4) % 2) * 5} cy={30 + Math.floor(i / 4) * 12} r="5.2" fill={w[i % 5]} stroke={BIRU} strokeWidth="1.4" />
      ))}
    </svg>
  );
}

/** Batang puluhan (Dienes): sepuluh ruas tersusun menjadi satu batang. Benda nyata di tahap Concrete. */
export function BatangPuluhan({ kelas = "h-20 w-5", warna = "#F97316" }: { kelas?: string; warna?: string }) {
  return (
    <svg viewBox="0 0 22 104" className={kelas} role="img" aria-label="Satu batang puluhan, sepuluh ruas">
      <rect x="2" y="2" width="18" height="100" rx="3" fill={warna} stroke={BIRU} strokeWidth="2.2" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M2 ${12 + i * 10} H20`} stroke={BIRU} strokeWidth="1.4" opacity="0.7" />
      ))}
    </svg>
  );
}

/** Kubus satuan (Dienes): satu ruas. */
export function KubusSatuan({ kelas = "h-5 w-5", warna = "#3B82F6" }: { kelas?: string; warna?: string }) {
  return (
    <svg viewBox="0 0 22 22" className={kelas} role="img" aria-label="Satu kubus satuan">
      <rect x="2" y="2" width="18" height="18" rx="3" fill={warna} stroke={BIRU} strokeWidth="2.2" />
      <path d="M5 6 H12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/* ------------------------------ Diagram polos ----------------------------- */

/** Satu bingkai sepuluh (dua baris lima). Sel diberi warna menurut isi: true merah, false kosong. */
export function BingkaiSepuluh({
  isi,
  warna = MERAH_K2,
  kelas = "h-14 w-28",
  onSel,
  label,
}: {
  /** Banyak sel terisi 0 sampai 10 atau daftar sepuluh boolean. */
  isi: number | boolean[];
  warna?: string;
  kelas?: string;
  onSel?: (i: number) => void;
  label?: string;
}) {
  const sel = Array.isArray(isi) ? isi : Array.from({ length: 10 }, (_, i) => i < isi);
  return (
    <svg viewBox="0 0 110 48" className={`block ${kelas}`} role="img" aria-label={label ?? `Bingkai sepuluh berisi ${sel.filter(Boolean).length} titik`}>
      <rect x="3" y="3" width="104" height="42" rx="5" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.6" />
      <path d="M3 24 H107 M23.8 3 V45 M44.6 3 V45 M65.4 3 V45 M86.2 3 V45" stroke={BIRU} strokeWidth="1.3" opacity="0.45" />
      {sel.map((aktif, i) => {
        const cx = 13.4 + (i % 5) * 20.8;
        const cy = 13.5 + Math.floor(i / 5) * 21;
        return (
          <g key={i}>
            {onSel ? (
              <rect
                x={cx - 10.4}
                y={cy - 10.5}
                width="20.8"
                height="21"
                fill="transparent"
                role="button"
                tabIndex={0}
                aria-label={`Kotak ${i + 1}${aktif ? ", terwarnai" : ", kosong"}`}
                className="cursor-pointer"
                onClick={() => onSel(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSel(i);
                  }
                }}
              />
            ) : null}
            {aktif ? <circle cx={cx} cy={cy} r="7.2" fill={warna} stroke={BIRU} strokeWidth="1.6" pointerEvents="none" /> : null}
          </g>
        );
      })}
    </svg>
  );
}

/** Batang puluhan polos untuk diagram (model batang): sepuluh ruas. Tanpa gambar benda. */
export function BatangModel({ kelas = "h-16 w-4" }: { kelas?: string }) {
  return (
    <svg viewBox="0 0 16 84" className={kelas} aria-hidden="true">
      <rect x="1.5" y="1.5" width="13" height="81" rx="2.5" fill="#FECACA" stroke={BIRU} strokeWidth="2" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M1.5 ${9.6 + i * 8.1} H14.5`} stroke={BIRU} strokeWidth="1.2" opacity="0.7" />
      ))}
    </svg>
  );
}

/** Kotak satuan polos untuk diagram. */
export function KotakModel({ kelas = "h-4 w-4" }: { kelas?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={kelas} aria-hidden="true">
      <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" fill="#BFDBFE" stroke={BIRU} strokeWidth="2" />
    </svg>
  );
}

/** Diagram model batang untuk n: p batang puluhan dan s kotak satuan. */
export function ModelBatang({ p, s, kelas = "" }: { p: number; s: number; kelas?: string }) {
  return (
    <div className={`flex flex-wrap items-end justify-center gap-1 ${kelas}`} role="img" aria-label={`Diagram: ${p} batang puluhan dan ${s} kotak satuan`}>
      {Array.from({ length: p }, (_, i) => (
        <BatangModel key={`p${i}`} />
      ))}
      {s > 0 ? (
        <span className="grid grid-cols-3 gap-0.5 pb-0.5">
          {Array.from({ length: s }, (_, i) => (
            <KotakModel key={`s${i}`} />
          ))}
        </span>
      ) : null}
    </div>
  );
}

/** Tabel nilai tempat: kolom Puluhan dan Satuan. `p` atau `s` bernilai "?" bila tersembunyi. */
export function TabelNilaiTempat({
  p,
  s,
  total,
  kecil = false,
  nyala,
  onKlik,
}: {
  p: number | string | null;
  s: number | string | null;
  total?: number | string | null;
  kecil?: boolean;
  nyala?: "p" | "s" | null;
  onKlik?: (kolom: "p" | "s") => void;
}) {
  const ukuran = kecil ? "h-12 w-16 text-3xl" : "h-16 w-20 text-5xl";
  const sel = (kolom: "p" | "s", nilai: number | string | null, warna: string, judul: string) => {
    const isi = (
      <span
        className={`flex items-center justify-center rounded-xl border-4 border-[#1C01A5] font-black text-[#1C01A5] ${ukuran} ${nilai === null || nilai === "?" ? "border-dashed bg-white" : ""} ${
          nyala === kolom ? "igil-denyut ring-4 ring-[#F0AB00]" : ""
        }`}
        style={nilai === null || nilai === "?" ? undefined : { backgroundColor: warna }}
      >
        {nilai === null ? "" : nilai}
      </span>
    );
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="rounded-full border-2 border-[#1C01A5] px-2 py-0.5 text-[11px] font-black text-[#1C01A5]" style={{ backgroundColor: warna }}>
          {judul}
        </span>
        {onKlik ? (
          <button type="button" aria-label={`Kolom ${judul}${nilai === null || nilai === "?" ? ", kosong" : `, ${nilai}`}`} onClick={() => onKlik(kolom)} className="igil-tanpa-tepi">
            {isi}
          </button>
        ) : (
          isi
        )}
      </div>
    );
  };
  return (
    <div className="flex flex-wrap items-center justify-center gap-3" role="group" aria-label="Tabel nilai tempat">
      {sel("p", p, "#FECACA", "Puluhan")}
      {sel("s", s, "#BFDBFE", "Satuan")}
      {total !== undefined ? (
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-[#1C01A5]">=</span>
          <span className={`flex items-center justify-center rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] font-black text-[#1C01A5] ${ukuran}`}>{total}</span>
        </div>
      ) : null}
    </div>
  );
}

/** Garis bilangan umum. `tandai` adalah bilangan yang disorot, `lompat` pasangan [asal, tujuan]. */
export function GarisBilanganK2({
  dari = 0,
  sampai = 50,
  langkah = 1,
  tandai = [],
  lompat = [],
  kelas = "h-20 w-full",
  onPilih,
  bisaDipilih,
  label,
}: {
  dari?: number;
  sampai?: number;
  /** Jarak antar tanda yang diberi angka. Tanda kecil tiap satu tetap digambar. */
  langkah?: number;
  tandai?: number[];
  lompat?: [number, number][];
  kelas?: string;
  onPilih?: (n: number) => void;
  /** Bila ada, hanya bilangan yang lolos pemeriksaan ini yang bisa diketuk. */
  bisaDipilih?: (n: number) => boolean;
  label?: string;
}) {
  const banyak = sampai - dari;
  const x = (n: number) => 14 + ((n - dari) * 272) / banyak;
  return (
    <svg viewBox="0 0 300 92" className={`block ${kelas}`} role="group" aria-label={label ?? `Garis bilangan dari ${dari} sampai ${sampai}`}>
      <path d="M6 56 H294 M288 50 L294 56 L288 62" fill="none" stroke={BIRU} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {Array.from({ length: banyak + 1 }, (_, i) => {
        const n = dari + i;
        const puluhan = n % 10 === 0;
        const bernomor = n % langkah === 0 || n === dari || n === sampai;
        const sorot = tandai.includes(n);
        const isi = (
          <>
            <path d={`M${x(n)} ${puluhan ? 46 : 50} V${puluhan ? 66 : 62}`} stroke={BIRU} strokeWidth={puluhan ? 3.4 : 2} strokeLinecap="round" />
            {sorot ? <circle cx={x(n)} cy="56" r="8" fill={KUNING} stroke={MERAH_K2} strokeWidth="2.6" /> : null}
            {bernomor ? (
              <text x={x(n)} y="82" textAnchor="middle" fontSize={banyak > 20 ? 10 : 12} fontWeight="900" fill={puluhan ? MERAH_K2 : BIRU}>
                {n}
              </text>
            ) : null}
          </>
        );
        return onPilih && (bisaDipilih ? bisaDipilih(n) : true) ? (
          <g
            key={n}
            role="button"
            tabIndex={0}
            aria-label={`Bilangan ${n}`}
            className="cursor-pointer"
            onClick={() => onPilih(n)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onPilih(n);
              }
            }}
          >
            <rect x={x(n) - 136 / banyak} y="40" width={272 / banyak} height="50" fill="transparent" />
            {isi}
          </g>
        ) : (
          <g key={n}>{isi}</g>
        );
      })}
      {lompat.map(([a, b], i) => {
        const tengah = (x(a) + x(b)) / 2;
        return (
          <g key={`${a}-${b}-${i}`}>
            <path d={`M${x(a)} 46 Q${tengah} 8 ${x(b)} 46`} fill="none" stroke={BIRU_K2} strokeWidth="2.8" strokeLinecap="round" />
            <path d={`M${x(b) - 5} 38 L${x(b)} 46 L${x(b) - 8} 47`} fill="none" stroke={BIRU_K2} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
    </svg>
  );
}

/** Kartu angka besar: dipakai sebagai lambang bilangan di infografis. */
export function KartuLambang({ n, nama = true, kecil = false }: { n: number; nama?: boolean; kecil?: boolean }) {
  return (
    <span className="inline-flex flex-col items-center">
      <span className={`flex items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] font-black text-[#1C01A5] ${kecil ? "h-10 min-w-12 px-1 text-2xl" : "h-14 min-w-16 px-2 text-4xl"}`}>{n}</span>
      {nama ? <span className="pt-0.5 text-[11px] font-black leading-tight text-[#1C01A5]">{sebut(n)}</span> : null}
    </span>
  );
}
