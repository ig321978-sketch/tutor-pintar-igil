"use client";

import {
  BookOpen,
  Compass,
  Lightbulb,
  Loader2,
  Sparkles,
  Star,
  Target,
} from "lucide-react";
import { susunKonsepMateri } from "@/lib/konsep-materi";
import type { GambarSisipan } from "@/components/GambarDoodle";

const IKON = [Lightbulb, Compass, Target, Star];

function posisiCabang(
  jumlah: number,
  indeks: number,
): { top: string; left: string } {
  if (jumlah === 1) return { top: "14%", left: "50%" };
  if (jumlah === 2) {
    return indeks === 0
      ? { top: "18%", left: "22%" }
      : { top: "18%", left: "78%" };
  }
  if (jumlah === 3) {
    return [
      { top: "14%", left: "50%" },
      { top: "78%", left: "22%" },
      { top: "78%", left: "78%" },
    ][indeks] ?? { top: "50%", left: "50%" };
  }
  return [
    { top: "12%", left: "50%" },
    { top: "50%", left: "86%" },
    { top: "88%", left: "50%" },
    { top: "50%", left: "14%" },
  ][indeks] ?? { top: "50%", left: "50%" };
}

function doodleKartu(
  gambarSisipan: GambarSisipan[] | undefined,
  indeks: number,
): GambarSisipan | undefined {
  return gambarSisipan?.find((item) => item.setelahParagraf === indeks + 1);
}

function MiniDoodle({
  src,
  alt,
  memuat,
  ukuran = "kartu",
}: {
  src?: string;
  alt: string;
  memuat: boolean;
  ukuran?: "peta" | "kartu";
}) {
  const kotak =
    ukuran === "peta"
      ? "h-12 w-12 sm:h-14 sm:w-14"
      : "h-20 w-20 shrink-0 sm:h-24 sm:w-24";
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl border-2 border-[#1C01A5]/15 bg-[#fbf6ea] shadow-inner ${kotak}`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : memuat ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-[#1C01A5]" />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[#1C01A5]/40">
          <Sparkles className="h-6 w-6" />
        </div>
      )}
    </div>
  );
}

export default function RingkasanKonsep({
  materi,
  mapel,
  penjelasan,
  sapaan,
  kartuAktif,
  gambarSisipan,
  doodleMemuat = false,
}: {
  materi: string;
  mapel: string;
  penjelasan: string;
  sapaan: string;
  kartuAktif: number;
  gambarSisipan?: GambarSisipan[];
  doodleMemuat?: boolean;
}) {
  const { ideUtama, kartu } = susunKonsepMateri(materi, penjelasan);

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border-2 border-[#F0AB00]/50 bg-gradient-to-br from-[#FFF8E8] via-white to-[#EEE9FF] p-5 sm:p-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#F0AB00]">
          Langkah 1 · Pahami konsep dulu
        </p>
        <h2 className="mt-2 text-3xl font-black leading-tight text-[#1C01A5] sm:text-4xl">
          {ideUtama}
        </h2>
        <p className="mt-2 text-sm font-bold text-[#1C01A5]/70">
          {mapel} · Infografis, peta pikiran, dan kartu pembahasan
        </p>
        <p className="mt-4 text-lg font-semibold text-slate-700">{sapaan}</p>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#F0AB00]" />
          <h3 className="text-xl font-extrabold text-[#1C01A5]">Peta pikiran</h3>
        </div>

        <div className="space-y-3 sm:hidden">
          <div className="mx-auto flex max-w-[220px] items-center justify-center rounded-[2rem] bg-[#F0AB00] px-4 py-5 text-center shadow-lg shadow-[#F0AB00]/40">
            <p className="text-sm font-black leading-snug text-[#1C01A5]">
              {ideUtama}
            </p>
          </div>
          {kartu.map((item, indeks) => {
            const Ikon = IKON[indeks % IKON.length];
            const doodle = doodleKartu(gambarSisipan, indeks);
            return (
              <div key={`peta-hp-${item.judul}-${indeks}`} className="flex gap-3">
                <div className="flex w-6 flex-col items-center">
                  <div className="h-4 w-0.5 bg-[#1C01A5]/20" />
                  <div className="h-3 w-3 rounded-full bg-[#1C01A5]" />
                </div>
                <div
                  className={`flex flex-1 items-center gap-3 rounded-2xl border-2 px-3 py-3 ${item.warna} ${
                    kartuAktif === indeks ? "ring-4 ring-[#1C01A5]/30" : ""
                  }`}
                >
                  <MiniDoodle
                    src={doodle?.src}
                    alt={doodle?.alt || item.judul}
                    memuat={doodleMemuat && !doodle?.src}
                    ukuran="peta"
                  />
                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <Ikon className="h-4 w-4 shrink-0 text-[#1C01A5]" />
                      <p className="text-sm font-extrabold text-[#1C01A5]">
                        {item.judul}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative mx-auto hidden min-h-[420px] overflow-hidden rounded-[2rem] border-2 border-[#1C01A5]/15 bg-[#F8F6FF] sm:block">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {kartu.map((item, indeks) => {
              const titik = posisiCabang(kartu.length, indeks);
              return (
                <line
                  key={`garis-${item.judul}-${indeks}`}
                  x1="50"
                  y1="50"
                  x2={Number.parseFloat(titik.left)}
                  y2={Number.parseFloat(titik.top)}
                  stroke="#1C01A5"
                  strokeWidth="0.7"
                  strokeOpacity="0.22"
                />
              );
            })}
          </svg>
          <div className="absolute left-1/2 top-1/2 z-10 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F0AB00] p-4 text-center shadow-lg shadow-[#F0AB00]/40">
            <p className="text-base font-black leading-snug text-[#1C01A5]">
              {ideUtama}
            </p>
          </div>
          {kartu.map((item, indeks) => {
            const titik = posisiCabang(kartu.length, indeks);
            const Ikon = IKON[indeks % IKON.length];
            const doodle = doodleKartu(gambarSisipan, indeks);
            return (
              <div
                key={`peta-${item.judul}-${indeks}`}
                className="absolute z-10 w-[170px] -translate-x-1/2 -translate-y-1/2"
                style={{ top: titik.top, left: titik.left }}
              >
                <div
                  className={`rounded-2xl border-2 px-3 py-2 text-center shadow-sm ${item.warna} ${
                    kartuAktif === indeks ? "scale-105 ring-4 ring-[#1C01A5]/30" : ""
                  }`}
                >
                  <div className="mx-auto mb-2">
                    <MiniDoodle
                      src={doodle?.src}
                      alt={doodle?.alt || item.judul}
                      memuat={doodleMemuat && !doodle?.src}
                      ukuran="peta"
                    />
                  </div>
                  <Ikon className="mx-auto mb-1 h-4 w-4 text-[#1C01A5]" />
                  <p className="text-xs font-extrabold leading-tight text-[#1C01A5]">
                    {item.judul}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-[#F0AB00]" />
          <h3 className="text-xl font-extrabold text-[#1C01A5]">Alur infografis</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {kartu.map((item, indeks) => (
            <div
              key={`alur-${item.judul}-${indeks}`}
              className={`relative rounded-2xl border-2 px-3 py-4 text-center ${item.warna} ${
                kartuAktif === indeks ? "ring-4 ring-[#1C01A5]/25" : ""
              }`}
            >
              <p className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#1C01A5] text-sm font-black text-white">
                {indeks + 1}
              </p>
              <p className="text-sm font-extrabold leading-snug text-[#1C01A5]">
                {item.judul}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#1C01A5]" />
          <h3 className="text-xl font-extrabold text-[#1C01A5]">Kartu pembahasan</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {kartu.map((item, indeks) => {
            const Ikon = IKON[indeks % IKON.length];
            const doodle = doodleKartu(gambarSisipan, indeks);
            return (
              <article
                key={`kartu-${item.judul}-${indeks}`}
                className={`rounded-3xl border-2 p-5 shadow-sm ${item.warna} ${
                  kartuAktif === indeks ? "ring-4 ring-[#1C01A5]/25" : ""
                }`}
              >
                <div className="mb-4 flex items-start gap-3">
                  <MiniDoodle
                    src={doodle?.src}
                    alt={doodle?.alt || item.judul}
                    memuat={doodleMemuat && !doodle?.src}
                  />
                  <div className="min-w-0">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#1C01A5] shadow-sm">
                      <Ikon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[#1C01A5]/70">
                      Kartu {indeks + 1}
                    </p>
                    <h4 className="mt-1 text-xl font-black leading-snug text-[#1C01A5]">
                      {item.judul}
                    </h4>
                  </div>
                </div>
                <p className="text-base font-medium leading-relaxed text-slate-700">
                  {item.isi}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
