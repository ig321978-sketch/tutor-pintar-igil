"use client";

import type { ReactNode } from "react";
import {
  HARAKAT_PAI1_BAB1,
  JUDUL_PAI1_BAB1,
  TEKS_KARTU_FATIHAH,
  TEKS_KARTU_HARAKAT,
  TEKS_KARTU_HIJAIYAH,
} from "@/lib/naskah-resmi-pai-1-bab1";
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
  { kepala: "bg-[#1D4ED8]", tepi: "border-[#1D4ED8]", isi: "bg-[#EFF6FF]" },
  { kepala: "bg-[#15803D]", tepi: "border-[#15803D]", isi: "bg-[#F0FDF4]" },
  { kepala: "bg-[#7C3AED]", tepi: "border-[#7C3AED]", isi: "bg-[#F5F3FF]" },
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

export default function NaskahPai1Bab1() {
  return (
    <div className="space-y-5">
      <h3 className="text-right text-xl font-black leading-tight text-[#1C01A5] sm:text-2xl">
        {JUDUL_PAI1_BAB1}
      </h3>

      <KartuBingkai>
        <h4 className="text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          A. Mengenal Huruf Hijaiyah
        </h4>
        <p className="mt-4 text-center text-base font-semibold leading-relaxed text-slate-700">
          {TEKS_KARTU_HIJAIYAH}
        </p>
      </KartuBingkai>

      <KartuBingkai>
        <h4 className="text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          30 Huruf Hijaiyah
        </h4>
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
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
                  {item.nama}{" "}
                  <span dir="rtl" lang="ar" className="font-arab text-lg">
                    ({item.lambang})
                  </span>
                </p>
                <div className={`px-3 py-3 ${warna.isi}`}>
                  <p className="text-center text-sm font-semibold text-slate-700">{item.uraian}</p>
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arab mt-3 text-center text-4xl font-black text-[#1C01A5]"
                  >
                    {item.contohArab}
                  </p>
                  <p className="mt-1 text-center text-sm font-extrabold text-slate-800">
                    Contoh: {item.contohLatin}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
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
