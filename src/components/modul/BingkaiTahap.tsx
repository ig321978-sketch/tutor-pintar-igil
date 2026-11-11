"use client";

import type { CSSProperties, ReactNode, Ref } from "react";
import { GAYA_MEJA } from "@/components/modul/tahap-b-gaya";

/**
 * Wadah tiap Tahap SMICPA. Bentuknya mengikuti media tulis yang berbeda, tetapi
 * hanya SATU lapis: wadah ini menggantikan kartu lama, bukan dibungkus di luarnya.
 * Hiasan (spiral, klip, gagang, pita) menempel di tepi dan tidak memakan ruang isi.
 *
 * 2 Mind-Map   → gulungan kertas (dua gagang kayu)
 * 3 Infografis → buku tulis bergaris, spiral di atas
 * 4 Concrete   → papan jepit kayu dengan klip logam
 * 5 Picture    → buku gambar berspiral di kiri, kertas titik-titik
 * 6 Abstract   → buku catatan sampul keras, kertas kotak-kotak
 *
 * (Tahap 1 Story: tiap halaman cerita sendiri berbentuk halaman buku, lihat BukuCerita.)
 *
 * Isi tidak diberi transformasi atau overflow tersembunyi supaya seret-lepas dan
 * kanvas coret tetap bekerja.
 */

export type NomorTahap = 2 | 3 | 4 | 5 | 6;

interface Props {
  tahap: NomorTahap;
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

const uriSvg = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

/** Cincin spiral tegak untuk jilid di sisi atas buku tulis. */
const CINCIN_ATAS = uriSvg(
  "<svg xmlns='http://www.w3.org/2000/svg' width='26' height='38'>" +
    "<rect x='9' y='3' width='9' height='28' rx='4.5' fill='#8B95A7'/>" +
    "<rect x='9' y='3' width='4' height='28' rx='2' fill='#E2E8F0'/>" +
    "<circle cx='13.5' cy='33' r='3' fill='#312E81'/></svg>",
);

/** Cincin spiral mendatar untuk jilid di sisi kiri buku gambar. */
const CINCIN_KIRI = uriSvg(
  "<svg xmlns='http://www.w3.org/2000/svg' width='34' height='24'>" +
    "<rect x='3' y='8' width='26' height='8' rx='4' fill='#8B95A7'/>" +
    "<rect x='3' y='8' width='26' height='3.5' rx='1.7' fill='#E2E8F0'/>" +
    "<circle cx='31' cy='12' r='2.8' fill='#78350F'/></svg>",
);

const KERTAS_GULUNGAN: CSSProperties = {
  backgroundColor: "#FEF3C7",
  backgroundImage:
    "linear-gradient(90deg, rgba(180,83,9,0.22), transparent 5%, transparent 95%, rgba(180,83,9,0.22)), radial-gradient(circle at 15% 25%, rgba(217,119,6,0.08), transparent 40%), radial-gradient(circle at 85% 75%, rgba(217,119,6,0.1), transparent 45%)",
};

const KERTAS_BUKU_TULIS: CSSProperties = {
  backgroundColor: "#FFFFFF",
  backgroundImage: "repeating-linear-gradient(180deg, transparent 0 31px, rgba(96,165,250,0.32) 31px 32px)",
  backgroundPosition: "0 28px",
  boxShadow: "0 5px 0 #C7D2FE",
};

const KERTAS_BUKU_GAMBAR: CSSProperties = {
  backgroundColor: "#FFFEF6",
  backgroundImage: "radial-gradient(rgba(100,116,139,0.35) 1.1px, transparent 1.4px)",
  backgroundSize: "20px 20px",
  boxShadow: "0 5px 0 #B97C00",
};

const KERTAS_BUKU_CATATAN: CSSProperties = {
  backgroundColor: "#FFFFFF",
  backgroundImage:
    "linear-gradient(rgba(28,1,165,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(28,1,165,0.13) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
  boxShadow: "0 5px 0 #12006E",
};

function Gagang({ posisi }: { posisi: "atas" | "bawah" }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -left-1.5 -right-1.5 z-10 h-7 rounded-full ${
        posisi === "atas" ? "-top-3.5" : "-bottom-3.5"
      }`}
      style={{
        backgroundImage: "linear-gradient(180deg, #78350F 0%, #D97706 26%, #FDE68A 44%, #B45309 74%, #78350F 100%)",
        boxShadow: "0 3px 0 rgba(69,26,3,0.35)",
      }}
    >
      <span className="absolute -left-1 top-1/2 h-9 w-3 -translate-y-1/2 rounded-md bg-gradient-to-b from-[#451A03] via-[#A16207] to-[#451A03]" />
      <span className="absolute -right-1 top-1/2 h-9 w-3 -translate-y-1/2 rounded-md bg-gradient-to-b from-[#451A03] via-[#A16207] to-[#451A03]" />
    </span>
  );
}

export function BingkaiTahap({ tahap, className = "", children, ref }: Props) {
  switch (tahap) {
    case 2:
      return (
        <div ref={ref} className={`relative mx-2 my-4 px-3 pb-6 pt-7 ${className}`} style={KERTAS_GULUNGAN}>
          <Gagang posisi="atas" />
          {children}
          <Gagang posisi="bawah" />
        </div>
      );
    case 3:
      return (
        <div
          ref={ref}
          className={`relative mt-4 min-w-0 rounded-xl border-2 border-[#1C01A5] px-2 pb-2 pt-6 sm:mt-5 sm:border-4 sm:px-3 sm:pb-3 sm:pt-7 ${className}`}
          style={KERTAS_BUKU_TULIS}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-[24px] left-4 right-4 z-20 h-[38px]"
            style={{ backgroundImage: CINCIN_ATAS, backgroundRepeat: "repeat-x" }}
          />
          {children}
        </div>
      );
    case 4:
      return (
        <div
          ref={ref}
          className={`relative mt-5 rounded-2xl border-4 border-[#8A5429] px-3 pb-3 pt-8 ${className}`}
          style={{ ...GAYA_MEJA, boxShadow: "0 5px 0 #6B3F1D" }}
        >
          {/* Klip logam papan jepit */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-4 left-1/2 z-20 h-9 w-28 -translate-x-1/2 rounded-lg border-2 border-slate-500"
            style={{
              backgroundImage: "linear-gradient(180deg, #F8FAFC, #CBD5E1 45%, #94A3B8)",
              boxShadow: "0 3px 0 rgba(15,23,42,0.35)",
            }}
          >
            <span className="mx-auto mt-1.5 block h-3 w-3 rounded-full bg-[#7C4A24] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
            <span className="mx-auto mt-1 block h-1 w-16 rounded-full bg-slate-400/70" />
          </span>
          {children}
        </div>
      );
    case 5:
      return (
        <div
          ref={ref}
          className={`relative ml-3 mt-1 rounded-l-md rounded-r-2xl border-4 border-[#F0AB00] py-3 pl-8 pr-3 ${className}`}
          style={KERTAS_BUKU_GAMBAR}
        >
          {/* Jilid spiral di kiri */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-[18px] bottom-3 top-3 z-20 w-[34px]"
            style={{ backgroundImage: CINCIN_KIRI, backgroundRepeat: "repeat-y" }}
          />
          {children}
        </div>
      );
    default:
      return (
        <div
          ref={ref}
          className={`relative mb-5 rounded-l-md rounded-r-3xl border-4 border-[#1C01A5] border-l-[16px] px-3 pb-3 pt-3 ${className}`}
          style={KERTAS_BUKU_CATATAN}
        >
          {/* Garis emas di punggung buku */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-[12px] inset-y-0 w-1.5 bg-[#F0AB00]"
          />
          {/* Pelindung sudut emas */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-1 -top-1 h-6 w-6 rounded-tr-3xl bg-[#F0AB00]"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-1 -right-1 h-6 w-6 rounded-br-3xl bg-[#F0AB00]"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
          />
          {/* Pita penanda halaman */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-5 left-4 z-20 h-8 w-4 bg-[#F0AB00]"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)" }}
          />
          {children}
        </div>
      );
  }
}
