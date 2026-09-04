"use client";

import {
  BookOpen,
  Compass,
  Lightbulb,
  Loader2,
  Sparkles,
  Star,
  Target,
  Volume2,
} from "lucide-react";
import { kartuTanpaNaskah, susunKonsepMateri } from "@/lib/konsep-materi";
import type { GambarSisipan } from "@/components/GambarDoodle";
import TeksNaskah from "@/components/TeksNaskah";

const IKON = [Lightbulb, Compass, Target, Star];

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
  ukuran?: "peta" | "kartu" | "uraian";
}) {
  const kotak =
    ukuran === "peta"
      ? "h-12 w-12 sm:h-14 sm:w-14"
      : ukuran === "uraian"
        ? "h-20 w-20 shrink-0 sm:h-24 sm:w-24"
        : "mx-auto h-28 w-28 sm:h-32 sm:w-32";
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
  kelas = "3 SD",
  penjelasan,
  sapaan,
  kartuAktif,
  gambarSisipan,
  doodleMemuat = false,
}: {
  materi: string;
  mapel: string;
  kelas?: string;
  penjelasan: string;
  sapaan: string;
  kartuAktif: number;
  gambarSisipan?: GambarSisipan[];
  doodleMemuat?: boolean;
}) {
  const { ideUtama, kartu } = susunKonsepMateri(materi, penjelasan, kelas);
  const ringkas = kartuTanpaNaskah(kelas);

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
          {mapel} · Infografis, peta pikiran, dan{" "}
          {ringkas ? "kartu materi" : "kartu pembahasan"}
        </p>
        <p className="mt-4 text-lg font-semibold text-slate-700">{sapaan}</p>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#F0AB00]" />
          <h3 className="text-xl font-extrabold text-[#1C01A5]">Peta pikiran</h3>
        </div>

        <div className="rounded-[2rem] border-2 border-[#1C01A5]/15 bg-[#F8F6FF] p-4 sm:p-6">
          <div className="mx-auto mb-5 flex max-w-xs items-center justify-center rounded-[2rem] bg-[#F0AB00] px-4 py-4 text-center shadow-lg shadow-[#F0AB00]/40">
            <p className="text-sm font-black leading-snug text-[#1C01A5] sm:text-base">
              {ideUtama}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {kartu.map((item, indeks) => {
              const Ikon = IKON[indeks % IKON.length];
              return (
                <div
                  key={`peta-${item.judul}-${indeks}`}
                  className={`rounded-2xl border-2 px-3 py-3 text-center ${item.warna} ${
                    kartuAktif === indeks ? "ring-4 ring-[#1C01A5]/30" : ""
                  }`}
                >
                  <Ikon className="mx-auto mb-1 h-4 w-4 text-[#1C01A5]" />
                  <p className="text-xs font-extrabold leading-tight text-[#1C01A5] sm:text-sm">
                    {item.judul}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-[#F0AB00]" />
          <h3 className="text-xl font-extrabold text-[#1C01A5]">Alur infografis</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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
          <h3 className="text-xl font-extrabold text-[#1C01A5]">
            {ringkas ? "Kartu materi" : "Kartu pembahasan"}
          </h3>
        </div>
        {ringkas ? (
          <p className="mb-4 flex items-start gap-2 text-sm font-semibold leading-snug text-[#1C01A5]/75">
            <Volume2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F0AB00]" />
            Kartu ini singkat. Uraian lengkap ada di naskah di bawah, dan bisa didengar lewat Tutor Suara.
          </p>
        ) : null}
        {ringkas ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {kartu.map((item, indeks) => {
              const Ikon = IKON[indeks % IKON.length];
              const doodle = doodleKartu(gambarSisipan, indeks);
              return (
                <article
                  key={`kartu-${item.judul}-${indeks}`}
                  className={`flex flex-col rounded-3xl border-2 p-4 text-center shadow-sm ${item.warna} ${
                    kartuAktif === indeks ? "ring-4 ring-[#1C01A5]/25" : ""
                  }`}
                >
                  <MiniDoodle
                    src={doodle?.src}
                    alt={doodle?.alt || item.judul}
                    memuat={doodleMemuat && !doodle?.src}
                  />
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <Ikon className="h-3.5 w-3.5 text-[#1C01A5]" />
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#1C01A5]/70">
                      Kartu {indeks + 1}
                    </p>
                  </div>
                  <h4 className="mt-1 text-sm font-black leading-snug text-[#1C01A5] sm:text-base">
                    {item.judul}
                  </h4>
                  <TeksNaskah teks={item.isi} ringkas className="mt-1" />
                </article>
              );
            })}
          </div>
        ) : (
          <div className="grid gap-4">
            {kartu.map((item, indeks) => {
              const Ikon = IKON[indeks % IKON.length];
              const doodle = doodleKartu(gambarSisipan, indeks);
              return (
                <article
                  key={`kartu-${item.judul}-${indeks}`}
                  className={`flex gap-4 rounded-3xl border-2 p-5 shadow-sm ${item.warna} ${
                    kartuAktif === indeks ? "ring-4 ring-[#1C01A5]/25" : ""
                  }`}
                >
                  <MiniDoodle
                    src={doodle?.src}
                    alt={doodle?.alt || item.judul}
                    memuat={doodleMemuat && !doodle?.src}
                    ukuran="uraian"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Ikon className="h-4 w-4 shrink-0 text-[#1C01A5]" />
                      <p className="text-xs font-extrabold uppercase tracking-wider text-[#1C01A5]/70">
                        Kartu {indeks + 1}
                      </p>
                    </div>
                    <h4 className="text-lg font-black leading-snug text-[#1C01A5] sm:text-xl">
                      {item.judul}
                    </h4>
                    <TeksNaskah teks={item.isi} className="mt-2" />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {ringkas ? (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#1C01A5]" />
            <h3 className="text-xl font-extrabold text-[#1C01A5]">Naskah penjelasan</h3>
          </div>
          <div className="space-y-4">
            {kartu.map((item, indeks) => (
              <article
                key={`naskah-${item.judul}-${indeks}`}
                className={`rounded-3xl border-2 p-5 ${item.warna} ${
                  kartuAktif === indeks ? "ring-4 ring-[#1C01A5]/25" : ""
                }`}
              >
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#1C01A5]/70">
                  Kartu {indeks + 1}
                </p>
                <h4 className="mt-1 text-lg font-black leading-snug text-[#1C01A5]">
                  {item.judul}
                </h4>
                <TeksNaskah teks={item.naskah} className="mt-2" />
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
