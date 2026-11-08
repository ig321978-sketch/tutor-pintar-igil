"use client";

import React from "react";
import { sebut } from "./simulasi-bersama";

/* ------------------------------------------------------------------------ */
/* Komponen kecil bersama untuk simulasi Kelas 1 Bab 1 sampai 7.              */
/* Semua digambar di perangkat. Tanpa jaringan, tanpa gambar dari luar.       */
/* ------------------------------------------------------------------------ */

export const MERAH = "#EF4444";
export const BIRU = "#3B82F6";
export const EMAS = "#F0AB00";
export const UNGU = "#1C01A5";
export const HIJAU = "#16A34A";

/** Angka pada kalimat dieja supaya terbaca jelas oleh suara guru. */
export const eja = (teks: string) => teks.replace(/\d+/g, (n) => sebut(Number(n)));

/** Tanda kurang pada kalimat dibaca "dikurangi" oleh suara guru. */
export const ejaHitung = (teks: string) => eja(teks.replace(/ \+ /g, " ditambah ").replace(/ [−-] /g, " dikurangi ").replace(/ = /g, " sama dengan "));

/* -------------------------------- Pengatur ------------------------------- */

export function Pengatur({
  nama,
  nilai,
  onKurang,
  onTambah,
  kurangMati,
  tambahMati,
  warna = "#F5F3FF",
  kurangLabel,
  tambahLabel,
}: {
  nama: string;
  nilai: number | string;
  onKurang: () => void;
  onTambah: () => void;
  kurangMati: boolean;
  tambahMati: boolean;
  warna?: string;
  kurangLabel?: string;
  tambahLabel?: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl border-2 border-[#1C01A5] px-2 py-1.5" style={{ backgroundColor: warna }}>
      <span className="min-w-0 flex-1 text-xs font-black leading-tight text-[#1C01A5]">{nama}</span>
      <button
        type="button"
        aria-label={kurangLabel ?? `Kurangi ${nama}`}
        disabled={kurangMati}
        onClick={onKurang}
        className="h-9 w-9 shrink-0 rounded-full border-4 border-[#1C01A5] bg-white text-xl font-black leading-none text-[#1C01A5] disabled:opacity-30"
      >
        –
      </button>
      <span className="w-8 shrink-0 text-center text-2xl font-black text-[#1C01A5]" aria-live="polite">
        {nilai}
      </span>
      <button
        type="button"
        aria-label={tambahLabel ?? `Tambah ${nama}`}
        disabled={tambahMati}
        onClick={onTambah}
        className="h-9 w-9 shrink-0 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-xl font-black leading-none text-[#1C01A5] disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}

/* ------------------------------ Garis bilangan --------------------------- */

export type Penanda = { n: number; warna: string; teks?: string };
export type Lompatan = { dari: number; ke: number; warna: string; label?: string };

export function GarisAngka({
  maks,
  penanda = [],
  lompatan = [],
  onPilih,
  nama = "Garis bilangan",
  sorot = [],
}: {
  maks: number;
  penanda?: Penanda[];
  lompatan?: Lompatan[];
  onPilih?: (n: number) => void;
  nama?: string;
  /** Bilangan yang diberi lingkaran tebal pada garis. */
  sorot?: number[];
}) {
  const kecil = maks > 10;
  const lebar = kecil ? 22 : 34;
  const x = (n: number) => 17 + n * lebar;
  const W = x(maks) + 17;
  const garisY = 62;
  const tinggi = 102;
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${tinggi}`} style={{ maxWidth: W * 1.5 }} className="mx-auto block w-full" role="group" aria-label={nama}>
        <line x1={x(0) - 10} y1={garisY} x2={x(maks) + 10} y2={garisY} stroke={UNGU} strokeWidth="3" strokeLinecap="round" />
        {lompatan.map((l, k) => {
          const a = x(l.dari);
          const b = x(l.ke);
          const tengah = (a + b) / 2;
          const tinggiBusur = (kecil ? 24 : 18) + Math.min(14, Math.abs(l.ke - l.dari) * 2);
          const arah = b >= a ? 1 : -1;
          return (
            <g key={`${l.dari}-${l.ke}-${k}`}>
              <path d={`M ${a} ${garisY - 6} Q ${tengah} ${garisY - 6 - tinggiBusur * 2} ${b} ${garisY - 6}`} fill="none" stroke={l.warna} strokeWidth="3" strokeLinecap="round" />
              <polygon points={`${b},${garisY - 3} ${b - 5 * arah - 3},${garisY - 13} ${b - 5 * arah + 5},${garisY - 12}`} fill={l.warna} />
              {l.label ? (
                <text x={tengah} y={garisY - 6 - tinggiBusur - 4} textAnchor="middle" fontSize={kecil ? 15 : 12} fontWeight="900" fill={l.warna} stroke="#FFFFFF" strokeWidth="3" paintOrder="stroke">
                  {l.label}
                </text>
              ) : null}
            </g>
          );
        })}
        {Array.from({ length: maks + 1 }, (_, n) => {
          const dipilih = sorot.includes(n);
          const gambar = (
            <>
              <circle cx={x(n)} cy={garisY} r={dipilih ? 7.5 : 5.5} fill={dipilih ? "#FFE566" : "#FFFFFF"} stroke={UNGU} strokeWidth={dipilih ? 3 : 2} />
              <text x={x(n)} y={garisY + 24} textAnchor="middle" fontSize={kecil ? 15 : 13} fontWeight="900" fill={UNGU}>
                {n}
              </text>
            </>
          );
          return onPilih ? (
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
              <rect x={x(n) - lebar / 2} y={garisY - 24} width={lebar} height="58" fill="transparent" />
              {gambar}
            </g>
          ) : (
            <g key={n}>{gambar}</g>
          );
        })}
        {penanda.map((p, k) => (
          <g key={`${p.n}-${k}`} className="igil-muncul">
            <circle cx={x(p.n)} cy={garisY} r="9" fill={p.warna} stroke="#1E1B4B" strokeWidth="2" opacity="0.92" />
            <text x={x(p.n)} y={garisY + 4} textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF">
              {p.teks ?? p.n}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------ Bingkai sepuluh -------------------------- */

export type SelBingkai = "a" | "b" | "kosong" | "coret";

export function Bingkai({
  sel,
  onPilih,
  nama = "Bingkai sepuluh",
}: {
  sel: SelBingkai[];
  onPilih?: (i: number) => void;
  nama?: string;
}) {
  return (
    <div className="mx-auto grid w-max grid-cols-5 gap-0 rounded-lg border-4 border-[#1C01A5] bg-white" role="group" aria-label={nama}>
      {sel.map((s, i) => {
        const isi = (
          <svg viewBox="0 0 30 30" className="block h-8 w-8" aria-hidden="true">
            {s === "a" ? <circle cx="15" cy="15" r="10.5" fill={MERAH} stroke="#7F1D1D" strokeWidth="1.6" /> : null}
            {s === "b" ? <circle cx="15" cy="15" r="10.5" fill={BIRU} stroke="#1E3A8A" strokeWidth="1.6" /> : null}
            {s === "coret" ? (
              <g>
                <circle cx="15" cy="15" r="10.5" fill="#FEE2E2" stroke="#9CA3AF" strokeWidth="1.6" strokeDasharray="3 2" />
                <path d="M9 9 L21 21 M21 9 L9 21" stroke="#B91C1C" strokeWidth="2.6" strokeLinecap="round" />
              </g>
            ) : null}
          </svg>
        );
        const gaya = "flex h-9 w-9 items-center justify-center border border-[#C4B5FD]";
        return onPilih ? (
          <button key={i} type="button" aria-label={`Kotak ke-${i + 1}`} onClick={() => onPilih(i)} className={gaya}>
            {isi}
          </button>
        ) : (
          <span key={i} className={gaya}>
            {isi}
          </span>
        );
      })}
    </div>
  );
}

/* ------------------------------- Bagan pasangan -------------------------- */

export function BaganPasangan({ total, a, b, tanda = "+" }: { total: number | string; a: number | string; b: number | string; tanda?: string }) {
  return (
    <svg viewBox="0 0 150 96" className="mx-auto block h-24 w-36" role="img" aria-label={`Bagan pasangan: ${total} ${tanda === "+" ? "terdiri dari" : "dipecah menjadi"} ${a} dan ${b}`}>
      <line x1="75" y1="30" x2="36" y2="62" stroke={UNGU} strokeWidth="3" />
      <line x1="75" y1="30" x2="114" y2="62" stroke={UNGU} strokeWidth="3" />
      <circle cx="75" cy="20" r="18" fill="#FFE566" stroke={UNGU} strokeWidth="3" />
      <circle cx="36" cy="70" r="18" fill="#FEE2E2" stroke={MERAH} strokeWidth="3" />
      <circle cx="114" cy="70" r="18" fill="#DBEAFE" stroke={BIRU} strokeWidth="3" />
      {[
        [75, 20, total],
        [36, 70, a],
        [114, 70, b],
      ].map(([cx, cy, v]) => (
        <text key={`${cx}`} x={Number(cx)} y={Number(cy) + 6} textAnchor="middle" fontSize="18" fontWeight="900" fill={UNGU}>
          {v}
        </text>
      ))}
    </svg>
  );
}

/* --------------------------- Blok kalimat bilangan ----------------------- */

export function KalimatBesar({ teks, warna = "bg-[#FFF7CC]" }: { teks: string; warna?: string }) {
  return <p className={`rounded-xl ${warna} px-3 py-1.5 text-center text-xl font-black text-[#1C01A5]`}>{teks}</p>;
}

/* ------------------------------- Status mesin ---------------------------- */

export type StasiunMesin = { id: string; nama: string; ikon: string };

export function PetaStasiun({
  stasiun,
  aktif,
  nama = "Peta keadaan mesin",
  onPilih,
}: {
  stasiun: StasiunMesin[];
  aktif: number;
  nama?: string;
  /** Bila diberikan, stasiun bisa diketuk untuk mencoba pindah (mesin yang memutuskan boleh atau tidak). */
  onPilih?: (i: number) => void;
}) {
  return (
    <ol className="flex items-start justify-between gap-0.5" aria-label={nama}>
      {stasiun.map((s, i) => {
        const sedang = i === aktif;
        const lewat = i < aktif;
        const labelStasiun = `Stasiun ${s.nama}${sedang ? ", sedang di sini" : lewat ? ", sudah dilewati" : ", belum"}`;
        const gaya = `flex h-11 w-11 items-center justify-center rounded-full border-4 text-lg ${
          sedang ? "scale-110 border-[#F0AB00] bg-[#FFE566] shadow-[0_3px_0_#F0AB00]" : lewat ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5]/30 bg-white opacity-70"
        }`;
        const isi = <span aria-hidden="true">{lewat ? "✔️" : sedang ? s.ikon : "🔒"}</span>;
        return (
          <React.Fragment key={s.id}>
            <li className="flex min-w-0 flex-1 flex-col items-center gap-0.5">
              {onPilih ? (
                <button type="button" aria-label={labelStasiun} aria-current={sedang ? "step" : undefined} onClick={() => onPilih(i)} className={gaya}>
                  {isi}
                </button>
              ) : (
                <span role="img" aria-label={labelStasiun} aria-current={sedang ? "step" : undefined} className={gaya}>
                  {isi}
                </span>
              )}
              <span className={`text-center text-[10px] font-black leading-tight ${sedang ? "text-[#1C01A5]" : "text-[#1C01A5]/60"}`}>{s.nama}</span>
            </li>
            {i < stasiun.length - 1 ? (
              <li aria-hidden="true" className={`mt-2.5 shrink-0 text-lg font-black ${i < aktif ? "text-[#16A34A]" : "text-[#1C01A5]/30"}`}>
                ➜
              </li>
            ) : null}
          </React.Fragment>
        );
      })}
    </ol>
  );
}

export function StatusMesin({ pesan, terakhir, awal }: { pesan: string; terakhir: string; awal: string }) {
  const gaya =
    pesan !== ""
      ? { k: "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]", t: `⛔ Mesin berhenti: ${pesan}` }
      : terakhir !== ""
        ? { k: "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]", t: `✅ ${terakhir}` }
        : { k: "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]", t: `🔧 ${awal}` };
  return (
    <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${gaya.k}`}>
      {gaya.t}
    </p>
  );
}

export function RiwayatMesin({ riwayat, ditolak }: { riwayat: string[]; ditolak: number }) {
  return (
    <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-3 space-y-1">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Riwayat mesin • {ditolak} kali ditolak</p>
      {riwayat.length === 0 ? (
        <p className="text-sm font-bold text-[#1C01A5]/50">Belum ada perpindahan.</p>
      ) : (
        <ol className="flex flex-wrap gap-1.5">
          {riwayat.map((r, i) => (
            <li key={`${r}-${i}`} className="rounded-full bg-[#F5F3FF] px-2 py-0.5 text-xs font-black text-[#1C01A5]">
              {r}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
