"use client";

import type { ReactNode } from "react";
import {
  AMAL_IMAN_PAI1_BAB2,
  ASMAUL_HUSNA_PAI1_BAB2,
  RUKUN_IMAN_PAI1_BAB2,
  TEKS_KARTU_AMAL,
  TEKS_KARTU_ASMAUL,
  TEKS_KARTU_IMAN,
} from "@/lib/naskah-resmi-pai-1-bab2";
import LatihanSuaraRukunIman from "@/components/LatihanSuaraRukunIman";
import LatihanSuaraAsmaulHusna from "@/components/LatihanSuaraAsmaulHusna";
import LatihanSuaraImanAmal from "@/components/LatihanSuaraImanAmal";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import type { KelaminGuru } from "@/lib/guru";

const WARNA_HURUF = [
  "border-[#1D4ED8] bg-[#EFF6FF]",
  "border-[#15803D] bg-[#F0FDF4]",
  "border-[#7C3AED] bg-[#F5F3FF]",
  "border-[#C2410C] bg-[#FFF7ED]",
  "border-[#0F766E] bg-[#F0FDFA]",
  "border-[#B91C1C] bg-[#FEF2F2]",
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

export default function NaskahPai1Bab2({
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
          A. Pengertian Iman
        </h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            jenis="iman"
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
          {TEKS_KARTU_IMAN}
        </p>
        <p className="mt-5 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">
          6 Rukun Iman
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {RUKUN_IMAN_PAI1_BAB2.map((item, indeks) => (
            <article
              key={item.nama}
              className={`flex flex-col rounded-2xl border-2 px-3 py-4 ${WARNA_HURUF[indeks % WARNA_HURUF.length]}`}
            >
              <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
                {item.nomor}. {item.nama}
              </p>
              <p className="mt-1 text-xs font-bold leading-snug text-[#1C01A5]/70">
                {item.singkat}
              </p>
              <p className="mt-3 text-sm font-semibold leading-snug text-slate-700">
                {item.uraian}
              </p>
              <p className="mt-2 text-sm font-semibold leading-snug text-slate-600">
                Contoh: {item.contoh}
              </p>
            </article>
          ))}
        </div>
        <LatihanSuaraRukunIman />
      </KartuBingkai>

      <KartuBingkai>
        <h4 className="text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          B. Mengenal Allah melalui Asmaul Husna
        </h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            jenis="asmaul"
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
          {TEKS_KARTU_ASMAUL}
        </p>
        <p className="mt-5 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">
          Dua Asmaul Husna
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {ASMAUL_HUSNA_PAI1_BAB2.map((item, indeks) => (
            <article
              key={item.latin}
              className={`flex flex-col items-center rounded-2xl border-2 px-3 py-4 ${WARNA_HURUF[indeks % WARNA_HURUF.length]}`}
            >
              <p
                dir="rtl"
                lang="ar"
                className="font-arab text-4xl font-black leading-none text-[#1C01A5] sm:text-5xl"
              >
                {item.arab}
              </p>
              <p className="mt-3 text-xs font-black uppercase tracking-wide text-[#1C01A5]">
                {item.latin}
              </p>
              <span className="mt-2 rounded-full border-2 border-[#1C01A5]/15 bg-white px-3 py-1 text-xs font-black tracking-wide text-[#1C01A5]">
                {item.arti}
              </span>
              <p className="mt-3 text-center text-sm font-semibold leading-snug text-slate-700">
                {item.uraian}
              </p>
              <p className="mt-2 text-center text-sm font-semibold leading-snug text-slate-600">
                Contoh: {item.contoh}
              </p>
            </article>
          ))}
        </div>
        <LatihanSuaraAsmaulHusna />
      </KartuBingkai>

      <KartuBingkai>
        <h4 className="text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          C. Iman yang Terlihat dalam Perbuatan
        </h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            jenis="amal"
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
          {TEKS_KARTU_AMAL}
        </p>
        <p className="mt-5 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">
          Tiga Jejak Iman
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {AMAL_IMAN_PAI1_BAB2.map((item, indeks) => (
            <article
              key={item.nama}
              className={`flex flex-col rounded-2xl border-2 px-3 py-4 ${WARNA_HURUF[indeks % WARNA_HURUF.length]}`}
            >
              <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
                {item.nama}
              </p>
              <p className="mt-3 text-sm font-semibold leading-snug text-slate-700">
                {item.uraian}
              </p>
              <p className="mt-2 text-sm font-semibold leading-snug text-slate-600">
                Contoh: {item.contoh}
              </p>
            </article>
          ))}
        </div>
        <LatihanSuaraImanAmal />
      </KartuBingkai>
    </div>
  );
}
