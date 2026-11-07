"use client";

import type { CSSProperties, ReactNode, Ref } from "react";

/**
 * Bingkai unik untuk tiap Tahap SMICPA. Setiap tahap tampil seperti media tulis
 * atau buku yang berbeda, supaya anak langsung tahu sedang berada di tahap mana.
 *
 * 1 Story      → buku cerita terbuka (sampul biru, pita penanda merah)
 * 2 Mind-Map   → gulungan kertas (dua gagang kayu)
 * 3 Infografis → buku tulis bergaris berjilid spiral di atas
 * 4 Concrete   → papan jepit dengan klip logam dan selotip
 * 5 Picture    → buku gambar berjilid spiral di kiri, kertas titik-titik
 * 6 Abstract   → buku catatan sampul keras, tali karet, pita penanda
 *
 * Isi tahap tidak diberi transformasi atau overflow tersembunyi agar seret-lepas
 * dan kanvas coret tetap bekerja normal.
 */

export type NomorTahap = 1 | 2 | 3 | 4 | 5 | 6;

interface Props {
  tahap: NomorTahap;
  /** Tulisan di label, misalnya "Tahap 1: Story". */
  label: string;
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

const GARIS_BUKU_TULIS: CSSProperties = {
  backgroundColor: "#FFFFFF",
  backgroundImage: "repeating-linear-gradient(180deg, transparent 0 31px, rgba(96,165,250,0.32) 31px 32px)",
  backgroundPosition: "0 30px",
};

const TITIK_BUKU_GAMBAR: CSSProperties = {
  backgroundColor: "#FFFEF6",
  backgroundImage: "radial-gradient(rgba(100,116,139,0.35) 1.1px, transparent 1.4px)",
  backgroundSize: "20px 20px",
};

const KOTAK_BUKU_CATATAN: CSSProperties = {
  backgroundColor: "#FFFEF9",
  backgroundImage:
    "linear-gradient(rgba(99,102,241,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.14) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

function BukuCeritaBingkai({ label, children, ref }: Omit<Props, "tahap">) {
  return (
    <div
      ref={ref}
      className="relative rounded-2xl bg-[#1C01A5] p-1.5 pt-3 md:p-2.5 md:pt-4"
      style={{ boxShadow: "0 6px 0 #12006E, inset 0 0 0 2px #4B3AE0" }}
    >
      {/* Pita penanda halaman */}
      <span
        className="absolute -top-2 left-5 z-20 px-3 pb-5 pt-3 text-xs font-black text-white"
        style={{
          backgroundColor: "#DC2626",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)",
          filter: "drop-shadow(0 2px 0 rgba(0,0,0,0.25))",
        }}
      >
        📖 {label}
      </span>
      <div
        className="relative rounded-xl bg-[#FFFBEB] px-2 pb-4 pt-9 md:px-6"
        style={{ boxShadow: "0 3px 0 #FFFFFF, 0 5px 0 #FDE68A, 0 7px 0 #FFFFFF, 0 8px 0 #FCD34D" }}
      >
        {/* Lipatan tengah buku, hanya di layar lebar */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-12 -translate-x-1/2 md:block"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(120,53,15,0.12) 40%, rgba(120,53,15,0.26) 50%, rgba(120,53,15,0.12) 60%, transparent)",
          }}
        />
        {/* Sudut halaman terlipat */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 rounded-br-xl"
          style={{ background: "linear-gradient(135deg, transparent 50%, #FCD34D 50%)" }}
        />
        <div className="relative space-y-3">{children}</div>
      </div>
    </div>
  );
}

function Gagang({ posisi }: { posisi: "atas" | "bawah" }) {
  return (
    <div
      aria-hidden="true"
      className={`relative z-10 h-7 rounded-full ${posisi === "atas" ? "" : "-mt-1"}`}
      style={{
        backgroundImage: "linear-gradient(180deg, #78350F 0%, #D97706 26%, #FDE68A 44%, #B45309 74%, #78350F 100%)",
        boxShadow: "0 3px 0 rgba(69,26,3,0.35)",
      }}
    >
      <span className="absolute -left-2 top-1/2 h-9 w-4 -translate-y-1/2 rounded-md bg-gradient-to-b from-[#451A03] via-[#A16207] to-[#451A03]" />
      <span className="absolute -right-2 top-1/2 h-9 w-4 -translate-y-1/2 rounded-md bg-gradient-to-b from-[#451A03] via-[#A16207] to-[#451A03]" />
    </div>
  );
}

function GulunganBingkai({ label, children, ref }: Omit<Props, "tahap">) {
  return (
    <div ref={ref} className="relative px-3">
      <Gagang posisi="atas" />
      <div
        className="relative mx-4 -mt-1 px-2 pb-7 pt-5 md:px-6"
        style={{
          backgroundColor: "#FEF3C7",
          backgroundImage:
            "linear-gradient(90deg, rgba(180,83,9,0.25), transparent 7%, transparent 93%, rgba(180,83,9,0.25)), radial-gradient(circle at 20% 30%, rgba(217,119,6,0.08), transparent 40%), radial-gradient(circle at 80% 70%, rgba(217,119,6,0.1), transparent 45%)",
        }}
      >
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border-2 border-[#92400E] bg-[#FFFBEB] px-3 py-1 text-xs font-black text-[#92400E]">
          📜 {label}
        </span>
        <div className="space-y-3">{children}</div>
      </div>
      <Gagang posisi="bawah" />
    </div>
  );
}

function BukuTulisBingkai({ label, children, ref }: Omit<Props, "tahap">) {
  return (
    <div ref={ref} className="relative pt-[18px]">
      {/* Jilid spiral di atas */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3 right-3 top-0 z-20 h-[38px]"
        style={{ backgroundImage: CINCIN_ATAS, backgroundRepeat: "repeat-x" }}
      />
      <div
        className="relative rounded-xl border-2 border-[#1C01A5] px-2 pb-4 pt-10 md:px-6"
        style={{ ...GARIS_BUKU_TULIS, boxShadow: "0 5px 0 #C7D2FE, 0 7px 0 #1C01A5" }}
      >
        {/* Garis tepi merah buku tulis */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-4 w-px bg-red-300/80 md:left-8" />
        <span
          className="absolute right-4 top-3 z-10 rounded-sm border-2 border-[#1C01A5] bg-white px-2.5 py-0.5 text-xs font-black text-[#1C01A5]"
          style={{ transform: "rotate(-2deg)", boxShadow: "2px 2px 0 #FFE566" }}
        >
          📒 {label}
        </span>
        <div className="relative space-y-3">{children}</div>
      </div>
    </div>
  );
}

function PapanJepitBingkai({ label, children, ref }: Omit<Props, "tahap">) {
  return (
    <div
      ref={ref}
      className="relative rounded-2xl p-2 pt-8 md:p-3 md:pt-9"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, rgba(120,53,15,0.07) 0 2px, transparent 2px 9px), linear-gradient(135deg, #C98F5A, #A9703F 50%, #BE824B)",
        boxShadow: "0 6px 0 #6B3F1D, inset 0 0 0 2px #8A5429",
      }}
    >
      {/* Klip logam */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-0 z-20 h-9 w-28 -translate-x-1/2 rounded-lg border-2 border-slate-500"
        style={{
          backgroundImage: "linear-gradient(180deg, #F8FAFC, #CBD5E1 45%, #94A3B8)",
          boxShadow: "0 3px 0 rgba(15,23,42,0.35)",
        }}
      >
        <span className="mx-auto mt-1.5 block h-3 w-3 rounded-full bg-[#7C4A24] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
        <span className="mx-auto mt-1 block h-1 w-16 rounded-full bg-slate-400/70" />
      </span>
      <div
        className="relative rounded-md bg-white px-2 pb-4 pt-7 md:px-6"
        style={{ boxShadow: "0 2px 0 rgba(15,23,42,0.12), 0 0 0 1px #E2E8F0" }}
      >
        {/* Selotip kertas sebagai label */}
        <span
          className="absolute -top-3 left-4 z-10 px-4 py-1 text-xs font-black text-[#1C01A5]"
          style={{
            transform: "rotate(-2deg)",
            backgroundColor: "rgba(253, 224, 71, 0.92)",
            backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.35) 0 6px, transparent 6px 12px)",
            clipPath: "polygon(0 0, 100% 0, 97% 25%, 100% 50%, 97% 75%, 100% 100%, 0 100%, 3% 75%, 0 50%, 3% 25%)",
          }}
        >
          📋 {label}
        </span>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}

function BukuGambarBingkai({ label, children, ref }: Omit<Props, "tahap">) {
  return (
    <div
      ref={ref}
      className="relative rounded-2xl bg-[#F0AB00] py-1.5 pr-1.5"
      style={{ boxShadow: "0 6px 0 #B97C00, inset 0 0 0 2px #FFD25A" }}
    >
      {/* Jilid spiral di kiri */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-0 top-3 z-20 w-[34px]"
        style={{ backgroundImage: CINCIN_KIRI, backgroundRepeat: "repeat-y" }}
      />
      <div className="relative ml-5 rounded-r-xl rounded-l-sm px-2 pb-4 pt-4 pl-6 md:pr-6" style={TITIK_BUKU_GAMBAR}>
        {/* Stiker sebagai label */}
        <span
          className="mb-3 inline-flex items-center gap-1.5 rounded-xl border-2 border-[#1C01A5] bg-[#FFE566] px-3 py-1 text-xs font-black text-[#1C01A5]"
          style={{ transform: "rotate(1.5deg)", boxShadow: "2px 2px 0 #1C01A5" }}
        >
          🎨 {label}
        </span>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}

function BukuCatatanBingkai({ label, children, ref }: Omit<Props, "tahap">) {
  return (
    <div ref={ref} className="relative mb-6">
      <div
        className="relative rounded-l-md rounded-r-3xl bg-[#1C01A5] pb-3.5 pl-6 pr-2 pt-12 md:pr-4"
        style={{ boxShadow: "0 6px 0 #12006E, inset 0 0 0 2px #4B3AE0" }}
      >
        {/* Punggung buku */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-4 rounded-l-md"
          style={{ background: "linear-gradient(90deg, #0B0066 0 55%, #F0AB00 55% 70%, #0B0066 70%)" }}
        />
        {/* Tali karet di sampul */}
        <span aria-hidden="true" className="absolute right-8 top-0 h-12 w-2.5 bg-[#0B0066]" />
        {/* Pelat judul emas */}
        <span className="absolute left-9 top-2.5 z-10 border-b-2 border-[#F0AB00] pb-0.5 text-xs font-black tracking-wide text-[#FFE566]">
          ✨ {label}
        </span>
        {/* Pelindung sudut emas */}
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-9 w-9 rounded-tr-3xl bg-[#F0AB00]"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 h-9 w-9 rounded-br-3xl bg-[#F0AB00]"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        />
        <div
          className="relative rounded-l-sm rounded-r-2xl px-2 pb-4 pt-4 md:px-6"
          style={{ ...KOTAK_BUKU_CATATAN, boxShadow: "0 2px 0 rgba(255,255,255,0.4)" }}
        >
          <div className="space-y-4">{children}</div>
        </div>
      </div>
      {/* Pita penanda halaman */}
      <span
        aria-hidden="true"
        className="absolute -bottom-5 left-12 z-20 h-8 w-4 bg-[#F0AB00]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)" }}
      />
    </div>
  );
}

export function BingkaiTahap({ tahap, label, children, ref }: Props) {
  switch (tahap) {
    case 1:
      return <BukuCeritaBingkai label={label} ref={ref}>{children}</BukuCeritaBingkai>;
    case 2:
      return <GulunganBingkai label={label} ref={ref}>{children}</GulunganBingkai>;
    case 3:
      return <BukuTulisBingkai label={label} ref={ref}>{children}</BukuTulisBingkai>;
    case 4:
      return <PapanJepitBingkai label={label} ref={ref}>{children}</PapanJepitBingkai>;
    case 5:
      return <BukuGambarBingkai label={label} ref={ref}>{children}</BukuGambarBingkai>;
    default:
      return <BukuCatatanBingkai label={label} ref={ref}>{children}</BukuCatatanBingkai>;
  }
}
