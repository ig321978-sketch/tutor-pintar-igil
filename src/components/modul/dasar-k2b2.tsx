"use client";

import React from "react";
import { BIRU, EMAS, KUNING } from "./CeritaBandingB";
import { BIRU_K2, HIJAU_K2, MERAH_K2 } from "./dasar-k2";

/* ------------------------------------------------------------------------ */
/* Matematika Kelas 2 Bab 2 (Penjumlahan dan Pengurangan).                    */
/* Bagian gambar yang dipakai bersama oleh Sub-Bab A, B, dan C: benda nyata    */
/* (jambu air, burung), jalur kotak bilangan, tabel susun ke bawah, dan model  */
/* batang. Semua dibuat di klien (SVG), tanpa panggilan API. Benda nyata hanya */
/* dipakai di tahap Concrete. Picture memakai jalur, tabel, bagan, dan batang. */
/* Naskah: naskah/mtk-2-bab2-sub-*.md                                         */
/* ------------------------------------------------------------------------ */

/* ------------------------------ Benda nyata ------------------------------ */

/** Jambu air: buah berbentuk lonceng berwarna merah muda dengan kelopak hijau. Benda nyata untuk Concrete. */
export function JambuAir({ kelas = "h-8 w-8", warna = "#F43F5E" }: { kelas?: string; warna?: string }) {
  return (
    <svg viewBox="0 0 32 36" className={`shrink-0 ${kelas}`} aria-hidden="true">
      <path d="M16 6 C7 6 3.5 17 6.5 25.5 C8.5 31 12 33 16 33 C20 33 23.5 31 25.5 25.5 C28.5 17 25 6 16 6 Z" fill={warna} stroke={BIRU} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M10 14 Q9 19 11 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
      <path d="M11 7 L16 11 L21 7 L19 4 L16 6 L13 4 Z" fill="#22C55E" stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 4 V1.5" stroke={BIRU} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Burung kecil berwarna: hijau atau merah. Benda nyata untuk Concrete Sub-Bab C. */
export function Burung({ warna = "hijau", kelas = "h-8 w-9" }: { warna?: "hijau" | "merah"; kelas?: string }) {
  const badan = warna === "hijau" ? "#4ADE80" : "#F87171";
  const sayap = warna === "hijau" ? "#16A34A" : "#DC2626";
  return (
    <svg viewBox="0 0 44 36" className={`shrink-0 ${kelas}`} role="img" aria-label={`Burung ${warna}`}>
      <path d="M6 22 L-1 17 L2 27 Z" fill={sayap} stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      <ellipse cx="21" cy="22" rx="15" ry="10.5" fill={badan} stroke={BIRU} strokeWidth="2.2" />
      <circle cx="32" cy="14" r="8" fill={badan} stroke={BIRU} strokeWidth="2.2" />
      <path d="M39 13 L45 15.5 L39 18 Z" fill={EMAS} stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="33.5" cy="12.5" r="2" fill={BIRU} />
      <path d="M12 20 Q20 12 28 22 Q20 28 12 20 Z" fill={sayap} stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M18 32 V35 M25 32 V35" stroke={BIRU} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Baris n jambu air. `sorot` menandai indeks yang menyala, `redup` indeks yang dibayangkan. */
export function BarisJambu({
  n,
  sorot = [],
  redup = [],
  kelas = "h-7 w-7",
  warna,
}: {
  n: number;
  sorot?: number[];
  redup?: number[];
  kelas?: string;
  warna?: string;
}) {
  return (
    <span className="flex flex-wrap items-center justify-center gap-0.5" role="img" aria-label={`${n} jambu air`}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className={`rounded-lg ${sorot.includes(i) ? "bg-[#FFF3C4] ring-2 ring-[#F0AB00] igil-denyut" : ""} ${redup.includes(i) ? "opacity-30" : ""}`}>
          <JambuAir kelas={kelas} warna={warna} />
        </span>
      ))}
    </span>
  );
}

/* ----------------------------- Jalur kotak bilangan ----------------------------- */

/**
 * Jalur bilangan berkotak seperti di buku. `lompat` adalah pasangan [asal, tujuan] yang digambar sebagai busur.
 * `mulai` diberi warna merah muda, `sorot` kuning. Bila `onPilih` ada, kotak yang lolos `bisaDipilih` bisa diketuk.
 */
export function JalurKotakB2({
  dari,
  sampai,
  mulai,
  sorot = [],
  lompat = [],
  onPilih,
  bisaDipilih,
  kelas = "w-full",
  label,
}: {
  dari: number;
  sampai: number;
  mulai?: number;
  sorot?: number[];
  lompat?: [number, number][];
  onPilih?: (n: number) => void;
  bisaDipilih?: (n: number) => boolean;
  kelas?: string;
  label?: string;
}) {
  const banyak = sampai - dari + 1;
  const lebarKotak = Math.min(30, 288 / banyak);
  const x0 = (300 - lebarKotak * banyak) / 2;
  const xTengah = (n: number) => x0 + (n - dari) * lebarKotak + lebarKotak / 2;
  const ukuranAngka = lebarKotak < 20 ? 10 : lebarKotak < 26 ? 12 : 13;
  return (
    <svg viewBox="0 0 300 84" className={`block h-auto ${kelas}`} role="group" aria-label={label ?? `Jalur bilangan dari ${dari} sampai ${sampai}`}>
      {lompat.map(([a, b], i) => {
        const x1 = xTengah(a);
        const x2 = xTengah(b);
        const tinggi = Math.min(40, 14 + Math.abs(x2 - x1) * 0.25);
        const arah = x2 >= x1 ? 1 : -1;
        return (
          <g key={`${a}-${b}-${i}`}>
            <path d={`M${x1} 40 Q${(x1 + x2) / 2} ${40 - tinggi} ${x2} 40`} fill="none" stroke={BIRU_K2} strokeWidth="2.6" strokeLinecap="round" />
            <path d={`M${x2 - 5 * arah} ${40 - 4} L${x2} 41 L${x2 - 7 * arah} 43`} fill="none" stroke={BIRU_K2} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
      {Array.from({ length: banyak }, (_, i) => {
        const n = dari + i;
        const warna = n === mulai ? "#F9A8D4" : sorot.includes(n) ? "#FDE68A" : "#EDE9FE";
        const aktif = onPilih && (bisaDipilih ? bisaDipilih(n) : true);
        const isi = (
          <>
            <rect x={x0 + i * lebarKotak} y="46" width={lebarKotak} height="30" fill={warna} stroke={BIRU} strokeWidth="2" />
            <text x={xTengah(n)} y="66" textAnchor="middle" fontSize={ukuranAngka} fontWeight="900" fill={n % 10 === 0 ? MERAH_K2 : BIRU}>
              {n}
            </text>
          </>
        );
        return aktif ? (
          <g
            key={n}
            role="button"
            tabIndex={0}
            aria-label={`Kotak ${n}`}
            className="cursor-pointer"
            onClick={() => onPilih(n)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onPilih(n);
              }
            }}
          >
            {isi}
          </g>
        ) : (
          <g key={n}>{isi}</g>
        );
      })}
    </svg>
  );
}

/* ------------------------------ Tabel susun ke bawah ------------------------------ */

export type IsiSel = number | string | null;
export type SelSusun = { n: IsiSel; atas?: string; bawah?: string };

const KOSONG = (v: IsiSel) => v === null || v === "?" || v === "";

function KotakAngka({ sel, warna, nyala }: { sel: SelSusun; warna: string; nyala?: boolean }) {
  const kosong = KOSONG(sel.n);
  return (
    <div className="relative flex h-[3.6rem] w-[4.2rem] flex-col items-center justify-center">
      {sel.atas ? <span className="absolute -top-0.5 right-0.5 text-[11px] font-black leading-none" style={{ color: MERAH_K2 }}>{sel.atas}</span> : null}
      <span
        className={`flex h-12 w-14 items-center justify-center rounded-xl text-4xl font-black ${kosong ? "border-4 border-dashed border-[#1C01A5]/40 bg-white" : ""} ${nyala ? "igil-denyut ring-4 ring-[#F0AB00]" : ""}`}
        style={{ color: warna }}
      >
        {sel.n === null || sel.n === "" ? "" : sel.n === "?" ? "?" : sel.n}
      </span>
      {sel.bawah ? <span className="absolute -bottom-0.5 right-0.5 text-[11px] font-black leading-none" style={{ color: MERAH_K2 }}>{sel.bawah}</span> : null}
    </div>
  );
}

/**
 * Susun ke bawah dengan tabel nilai tempat (Puluhan, Satuan). Aturan warna: angka soal biru besar, angka jawaban hijau besar,
 * catatan pindah dan urai merah kecil yang menempel pada angka (tidak menggantikan angka soal).
 * Baris soal yang harus dihitung siswa tidak menampilkan hasil: isi `hasil` dengan "?" atau null.
 */
export function SusunTabel({
  op,
  atas,
  bawah,
  hasil,
  nyala = null,
  nyalaBaris = null,
}: {
  op: "+" | "−";
  atas: [SelSusun, SelSusun];
  bawah: [SelSusun, SelSusun];
  hasil: [SelSusun, SelSusun];
  nyala?: "p" | "s" | null;
  nyalaBaris?: "atas" | "bawah" | "hasil" | null;
}) {
  const sorot = (baris: "atas" | "bawah" | "hasil", kolom: "p" | "s") => nyala === kolom && (nyalaBaris === null || nyalaBaris === baris);
  const baca = (s: SelSusun) => (KOSONG(s.n) ? "kosong" : String(s.n));
  return (
    <div
      className="mx-auto w-fit rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-2"
      role="img"
      aria-label={`Susun ke bawah: ${baca(atas[0])}${baca(atas[1])} ${op} ${baca(bawah[0])}${baca(bawah[1])} sama dengan ${baca(hasil[0])}${baca(hasil[1])}`}
    >
      <div className="grid grid-cols-[2rem_4.2rem_4.2rem] items-center justify-items-center gap-x-1 gap-y-1">
        <span />
        <span className="rounded-full border-2 border-[#1C01A5] bg-[#FECACA] px-2 py-0.5 text-[11px] font-black text-[#1C01A5]">Puluhan</span>
        <span className="rounded-full border-2 border-[#1C01A5] bg-[#BFDBFE] px-2 py-0.5 text-[11px] font-black text-[#1C01A5]">Satuan</span>
        <span />
        <KotakAngka sel={atas[0]} warna={BIRU_K2} nyala={sorot("atas", "p")} />
        <KotakAngka sel={atas[1]} warna={BIRU_K2} nyala={sorot("atas", "s")} />
        <span className="text-4xl font-black" style={{ color: BIRU }}>
          {op}
        </span>
        <KotakAngka sel={bawah[0]} warna={BIRU_K2} nyala={sorot("bawah", "p")} />
        <KotakAngka sel={bawah[1]} warna={BIRU_K2} nyala={sorot("bawah", "s")} />
        <span className="col-span-3 my-0.5 h-1 w-full rounded-full bg-[#1C01A5]" />
        <span />
        <KotakAngka sel={hasil[0]} warna={HIJAU_K2} nyala={sorot("hasil", "p")} />
        <KotakAngka sel={hasil[1]} warna={HIJAU_K2} nyala={sorot("hasil", "s")} />
      </div>
    </div>
  );
}

/* ------------------------------ Model batang ------------------------------ */

/**
 * Model batang (bar model) untuk membandingkan dua bilangan, ala Singapura. Diagram polos tanpa gambar benda.
 * Batang A dan B ditarik dengan satuan yang sama. Bagian selisih diberi warna emas. Batang ketiga (jumlah) bisa ditampilkan.
 * `tandaiB` menyembunyikan bilangan B (diganti tanda tanya), `jumlah` menampilkan batang jumlah, `tandaiJumlah` menyembunyikannya.
 */
export function BatangBanding({
  a,
  b,
  namaA,
  namaB,
  tandaiB = false,
  jumlah = false,
  tandaiJumlah = false,
}: {
  a: number;
  b: number;
  namaA: string;
  namaB: string;
  tandaiB?: boolean;
  jumlah?: boolean;
  tandaiJumlah?: boolean;
}) {
  const satuan = 12.5;
  const x0 = 18;
  const tinggi = 26;
  const kecil = Math.min(a, b);
  const besar = Math.max(a, b);
  const selisih = besar - kecil;
  const baris = (y: number, nama: string, nilai: number, ditandai: boolean) => (
    <g key={nama}>
      <rect x={x0} y={y} width={Math.min(nilai, kecil) * satuan} height={tinggi} fill="#BFDBFE" stroke={BIRU} strokeWidth="2.4" />
      {nilai > kecil ? <rect x={x0 + kecil * satuan} y={y} width={(nilai - kecil) * satuan} height={tinggi} fill={KUNING} stroke={BIRU} strokeWidth="2.4" strokeDasharray="5 3" /> : null}
      {Array.from({ length: nilai - 1 }, (_, i) => (
        <path key={i} d={`M${x0 + (i + 1) * satuan} ${y + 4} V${y + tinggi - 4}`} stroke={BIRU} strokeWidth="0.9" opacity="0.28" />
      ))}
      <text x={x0 + 4} y={y + 18} fontSize="12" fontWeight="900" fill={BIRU}>
        {nama}
      </text>
      <text x={x0 + nilai * satuan + 7} y={y + 19} fontSize="15" fontWeight="900" fill={ditandai ? MERAH_K2 : BIRU_K2}>
        {ditandai ? "?" : nilai}
      </text>
    </g>
  );
  const dasarSelisih = a >= b ? a : b;
  return (
    <svg viewBox="0 0 300 150" className="mx-auto block h-auto w-full max-w-[340px]" role="img" aria-label={`Model batang: ${namaA} ${a}, ${namaB} ${tandaiB ? "belum diketahui" : b}`}>
      {baris(8, namaA, a, false)}
      {baris(56, namaB, b, tandaiB)}
      {selisih > 0 ? (
        <text x={x0 + (kecil + selisih / 2) * satuan} y={dasarSelisih === a ? 52 : 94} textAnchor="middle" fontSize="11" fontWeight="900" fill="#92400E">
          {tandaiB ? "selisih" : `selisih ${selisih}`}
        </text>
      ) : null}
      {jumlah ? (
        <g>
          <rect x={x0} y={100} width={a * satuan} height={tinggi} fill="#BFDBFE" stroke={BIRU} strokeWidth="2.4" />
          <rect x={x0 + a * satuan} y={100} width={b * satuan} height={tinggi} fill="#FBCFE8" stroke={BIRU} strokeWidth="2.4" />
          <text x={x0 + 4} y={118} fontSize="12" fontWeight="900" fill={BIRU}>
            jumlah
          </text>
          <text x={x0 + (a + b) * satuan + 7} y={119} fontSize="15" fontWeight="900" fill={tandaiJumlah ? MERAH_K2 : HIJAU_K2}>
            {tandaiJumlah ? "?" : a + b}
          </text>
          <path d={`M${x0} 132 H${x0 + (a + b) * satuan}`} stroke={BIRU} strokeWidth="2" />
          <text x={x0 + ((a + b) * satuan) / 2} y={146} textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
            {namaA} + {namaB}
          </text>
        </g>
      ) : null}
    </svg>
  );
}

/* ------------------------------ Potongan kecil ------------------------------ */

/** Kotak soal bergaris putus-putus. */
export function KotakSoal({ children }: { children: React.ReactNode }) {
  return <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-lg font-black leading-snug text-[#1C01A5]">{children}</p>;
}

/** Kalimat penjumlahan atau pengurangan dalam teks, dengan angka berwarna. */
export function Kalimat({ a, op, b, c, kecil = false }: { a: React.ReactNode; op: "+" | "−"; b: React.ReactNode; c?: React.ReactNode; kecil?: boolean }) {
  return (
    <p className={`text-center font-black text-[#1C01A5] ${kecil ? "text-xl" : "text-3xl"}`} aria-live="polite">
      <span style={{ color: BIRU_K2 }}>{a}</span> {op} <span style={{ color: BIRU_K2 }}>{b}</span>
      {c !== undefined ? (
        <>
          {" "}
          = <span style={{ color: HIJAU_K2 }}>{c}</span>
        </>
      ) : null}
    </p>
  );
}
