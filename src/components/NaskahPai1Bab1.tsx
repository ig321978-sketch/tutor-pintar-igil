"use client";

import type { ReactNode } from "react";
import {
  HARAKAT_PAI1_BAB1,
  TEKS_KARTU_FATIHAH,
  TEKS_KARTU_HARAKAT,
  TEKS_KARTU_HIJAIYAH,
} from "@/lib/naskah-resmi-pai-1-bab1";
import LatihanSuaraHijaiyah from "@/components/LatihanSuaraHijaiyah";
import LatihanSuaraHarakat from "@/components/LatihanSuaraHarakat";
import { FATIHAH, HIJAIYAH_30 } from "@/lib/paket-lengkap-materi";

const WARNA_HURUF = [
  "border-[#1D4ED8] bg-[#EFF6FF]",
  "border-[#15803D] bg-[#F0FDF4]",
  "border-[#7C3AED] bg-[#F5F3FF]",
  "border-[#C2410C] bg-[#FFF7ED]",
  "border-[#0F766E] bg-[#F0FDFA]",
  "border-[#B91C1C] bg-[#FEF2F2]",
  "border-[#D97706] bg-[#FFFBEB]",
];

const WARNA_HARAKAT = [
  { kepala: "bg-[#1D4ED8]", tepi: "border-[#1D4ED8]", isi: "bg-[#EFF6FF]", tinta: "#1D4ED8" },
  { kepala: "bg-[#15803D]", tepi: "border-[#15803D]", isi: "bg-[#F0FDF4]", tinta: "#15803D" },
  { kepala: "bg-[#7C3AED]", tepi: "border-[#7C3AED]", isi: "bg-[#F5F3FF]", tinta: "#7C3AED" },
];

function KartuBingkai({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6 ${className}`}
    >
      {children}
    </section>
  );
}

function IkonHarakat({
  jenis,
  warna,
}: {
  jenis: (typeof HARAKAT_PAI1_BAB1)[number]["jenis"];
  warna: string;
}) {
  return (
    <div className="relative mx-auto h-36 w-28" role="img" aria-label={`Ikon harakat ${jenis}`}>
      {jenis === "dhammah" ? (
        <span
          dir="rtl"
          lang="ar"
          className="font-arab pointer-events-none absolute left-1/2 top-1 z-10 -translate-x-1/2 text-4xl font-black leading-none sm:text-5xl"
          style={{ color: warna }}
        >
          و
        </span>
      ) : null}
      <svg viewBox="0 0 120 150" className="h-full w-full" aria-hidden>
        <ellipse
          cx="60"
          cy="78"
          rx="30"
          ry="34"
          fill="#ffffff"
          stroke="#1C01A5"
          strokeWidth="4"
          strokeDasharray="7 6"
        />
        <text
          x="60"
          y="88"
          textAnchor="middle"
          fontSize="18"
          fontWeight="800"
          fill="#94A3B8"
        >
          huruf
        </text>
        {jenis === "fathah" ? (
          <line
            x1="38"
            y1="32"
            x2="90"
            y2="14"
            stroke={warna}
            strokeWidth="10"
            strokeLinecap="round"
          />
        ) : null}
        {jenis === "kasrah" ? (
          <line
            x1="38"
            y1="138"
            x2="90"
            y2="120"
            stroke={warna}
            strokeWidth="10"
            strokeLinecap="round"
          />
        ) : null}
      </svg>
    </div>
  );
}

export default function NaskahPai1Bab1() {
  return (
    <div className="space-y-5">
      <KartuBingkai>
        <h4 className="text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          A. Mengenal Huruf Hijaiyah
        </h4>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
          {TEKS_KARTU_HIJAIYAH}
        </p>
        <p className="mt-5 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">
          30 Huruf Hijaiyah
        </p>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {HIJAIYAH_30.map((item, indeks) => (
            <article
              key={`${item.lambang}-${item.nama}`}
              className={`flex flex-col items-center justify-center rounded-2xl border-2 px-2 py-3 ${WARNA_HURUF[indeks % WARNA_HURUF.length]}`}
            >
              <p
                dir="rtl"
                lang="ar"
                className="font-arab text-3xl font-black leading-none text-[#1C01A5] sm:text-4xl"
              >
                {item.lambang}
              </p>
              <p className="mt-2 text-center text-xs font-extrabold uppercase tracking-wide text-slate-700">
                {item.nama}
              </p>
            </article>
          ))}
        </div>
        <LatihanSuaraHijaiyah />
      </KartuBingkai>

      <KartuBingkai>
        <h4 className="text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          B. Mengenal Harakat
        </h4>
        <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
          {TEKS_KARTU_HARAKAT}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {HARAKAT_PAI1_BAB1.map((item, indeks) => {
            const warna = WARNA_HARAKAT[indeks % WARNA_HARAKAT.length];
            return (
              <article
                key={item.nama}
                className={`overflow-hidden rounded-2xl border-2 bg-white ${warna.tepi}`}
              >
                <p className={`px-3 py-2 text-center text-sm font-black text-white ${warna.kepala}`}>
                  {item.nama}
                </p>
                <div className={`px-3 py-4 ${warna.isi}`}>
                  <IkonHarakat jenis={item.jenis} warna={warna.tinta} />
                  <p className="mt-2 text-center text-sm font-semibold text-slate-700">
                    {item.uraian}
                  </p>
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arab mt-3 text-center text-5xl font-black leading-none text-[#1C01A5]"
                  >
                    {item.contohArab}
                  </p>
                  <p className="mt-2 text-center text-sm font-extrabold text-slate-800">
                    Contoh: {item.contohLatin}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
        <LatihanSuaraHarakat />
      </KartuBingkai>

      <KartuBingkai>
        <h4 className="text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          C. Menghafal Surah Al-Fatihah
        </h4>
        <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
          {TEKS_KARTU_FATIHAH}
        </p>
        <div className="mt-4 space-y-3">
          {FATIHAH.map((item, indeks) => (
            <article
              key={item.nama}
              className={`rounded-2xl border-2 px-4 py-3 ${WARNA_HURUF[indeks % WARNA_HURUF.length]}`}
            >
              <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
                {item.nama}
              </p>
              {item.lambang ? (
                <p
                  dir="rtl"
                  lang="ar"
                  className="font-arab mt-2 text-right text-xl font-bold leading-relaxed text-[#1C01A5] sm:text-2xl"
                >
                  {item.lambang}
                </p>
              ) : null}
              {item.latin ? (
                <p className="mt-2 text-sm font-extrabold text-slate-800">{item.latin}</p>
              ) : null}
              {item.artinya ? (
                <p className="mt-2 text-sm font-semibold text-slate-700">
                  Artinya: {item.artinya}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </KartuBingkai>
    </div>
  );
}
