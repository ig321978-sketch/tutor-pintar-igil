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
import LatihanSuaraFatihah from "@/components/LatihanSuaraFatihah";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { FATIHAH, HIJAIYAH_30 } from "@/lib/paket-lengkap-materi";
import type { KelaminGuru } from "@/lib/guru";

const WARNA_HURUF = [
  "border-[#1D4ED8] bg-[#EFF6FF]",
  "border-[#15803D] bg-[#F0FDF4]",
  "border-[#7C3AED] bg-[#F5F3FF]",
  "border-[#C2410C] bg-[#FFF7ED]",
  "border-[#0F766E] bg-[#F0FDFA]",
  "border-[#B91C1C] bg-[#FEF2F2]",
  "border-[#D97706] bg-[#FFFBEB]",
];

const SUARA_HARAKAT: Record<(typeof HARAKAT_PAI1_BAB1)[number]["jenis"], string> = {
  fathah: "A",
  kasrah: "I",
  dhammah: "U",
};

const INFO_HARAKAT: Record<
  (typeof HARAKAT_PAI1_BAB1)[number]["jenis"],
  { subjudul: string }
> = {
  fathah: { subjudul: "garis di atas huruf" },
  kasrah: { subjudul: "garis di bawah huruf" },
  dhammah: { subjudul: "wau kecil di atas huruf" },
};

function HurufBaHarakat({ contohArab }: { contohArab: string }) {
  return (
    <span className="relative inline-block" dir="rtl" lang="ar">
      <span className="font-arab text-5xl font-black leading-none text-[#DC2626] sm:text-6xl">
        {contohArab}
      </span>
      <span className="font-arab pointer-events-none absolute inset-0 flex items-center justify-center text-5xl font-black leading-none text-[#1C01A5] sm:text-6xl">
        ب
      </span>
    </span>
  );
}

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

export default function NaskahPai1Bab1({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  return (
    <div className="space-y-5">
      <KartuBingkai>
        <h4 className="text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          A. Mengenal Huruf Hijaiyah
        </h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} />
        </div>
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
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            jenis="harakat"
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
          {TEKS_KARTU_HARAKAT}
        </p>
        <p className="mt-5 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">
          Tiga Harakat Dasar
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {HARAKAT_PAI1_BAB1.map((item, indeks) => {
            const info = INFO_HARAKAT[item.jenis];
            return (
            <article
              key={item.nama}
              className={`flex flex-col items-center rounded-2xl border-2 px-3 py-4 ${WARNA_HURUF[indeks % WARNA_HURUF.length]}`}
            >
              <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
                {item.nama}
              </p>
              <p className="mt-1 text-center text-xs font-bold leading-snug text-[#1C01A5]/70">
                {info.subjudul}
              </p>
              <p className="mt-3">
                <HurufBaHarakat contohArab={item.contohArab} />
              </p>
              <p className="mt-3 text-center text-xs font-extrabold uppercase tracking-wide text-slate-700">
                {item.contohLatin}
              </p>
              <span className="mt-2 rounded-full border-2 border-[#1C01A5]/15 bg-white px-3 py-1 text-xs font-black tracking-wide text-[#1C01A5]">
                Bersuara “{SUARA_HARAKAT[item.jenis]}”
              </span>
              <p className="mt-3 text-center text-sm font-semibold leading-snug text-slate-700">
                {item.uraian}
              </p>
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
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            jenis="fatihah"
          />
        </div>
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
        <LatihanSuaraFatihah />
      </KartuBingkai>
    </div>
  );
}
