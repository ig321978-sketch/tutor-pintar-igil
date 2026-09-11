"use client";

import type { ReactNode } from "react";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import type { KartuModulResmi, ModulResmiPai } from "@/lib/modul-resmi-pai";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import type { KelaminGuru } from "@/lib/guru";

const WARNA_HURUF = [
  "border-[#1D4ED8] bg-[#EFF6FF]",
  "border-[#15803D] bg-[#F0FDF4]",
  "border-[#7C3AED] bg-[#F5F3FF]",
  "border-[#C2410C] bg-[#FFF7ED]",
  "border-[#0F766E] bg-[#F0FDFA]",
  "border-[#B91C1C] bg-[#FEF2F2]",
];

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function kelasKolom(kolom?: 1 | 2 | 3): string {
  if (kolom === 1) return "grid gap-2";
  if (kolom === 3) return "grid gap-2 sm:grid-cols-3";
  return "grid gap-2 sm:grid-cols-2";
}

function KartuPembahasan({
  kartu,
  kelas,
  kelamin,
}: {
  kartu: KartuModulResmi;
  kelas: string;
  kelamin?: KelaminGuru;
}) {
  return (
    <KartuBingkai>
      <h4 className="text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
        {kartu.judul}
      </h4>
      <div className="mt-4">
        <TombolVoiceMateriPai1
          kelas={kelas}
          kelamin={kelamin}
          cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
        />
      </div>
      <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
        {kartu.pengantar}
      </p>
      {kartu.labelDaftar ? (
        <p className="mt-5 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">
          {kartu.labelDaftar}
        </p>
      ) : null}
      <div className={`mt-3 ${kelasKolom(kartu.kolom)}`}>
        {kartu.item.map((item, indeks) => (
          <article
            key={`${item.nama}-${indeks}`}
            className={`flex flex-col rounded-2xl border-2 px-3 py-4 ${WARNA_HURUF[indeks % WARNA_HURUF.length]}`}
          >
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
              {item.nomor ? `${item.nomor}. ` : ""}
              {item.nama}
            </p>
            {item.arab ? (
              <p
                dir="rtl"
                lang="ar"
                className="font-arab mt-2 text-right text-2xl font-black leading-relaxed text-[#1C01A5]"
              >
                {item.arab}
              </p>
            ) : null}
            {item.latin ? (
              <p className="mt-2 text-sm font-extrabold text-slate-800">{item.latin}</p>
            ) : null}
            {item.singkat ? (
              <p className="mt-1 text-xs font-bold leading-snug text-[#1C01A5]/70">
                {item.singkat}
              </p>
            ) : null}
            <p className="mt-3 text-sm font-semibold leading-snug text-slate-700">
              {item.uraian}
            </p>
            {item.contoh ? (
              <p className="mt-2 text-sm font-semibold leading-snug text-slate-600">
                Contoh: {item.contoh}
              </p>
            ) : null}
          </article>
        ))}
      </div>
      <LatihanSuaraResmi soal={kartu.kuis} />
    </KartuBingkai>
  );
}

export default function NaskahPaiResmi({
  modul,
  kelas = "1 SD",
  kelamin,
}: {
  modul: ModulResmiPai;
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  return (
    <div className="space-y-5">
      {modul.kartu.map((kartu) => (
        <KartuPembahasan
          key={kartu.judul}
          kartu={kartu}
          kelas={kelas}
          kelamin={kelamin}
        />
      ))}
    </div>
  );
}
