"use client";

import {
  BookOpen,
  Globe2,
  Lightbulb,
  Loader2,
  School,
  Sparkles,
  Star,
  Compass,
  Target,
  Volume2,
} from "lucide-react";
import { kartuTanpaNaskah, susunKonsepMateri } from "@/lib/konsep-materi";
import {
  LABEL_SUDUT,
  type SudutPandangMateri,
} from "@/lib/sudut-pandang";
import type { GambarSisipan } from "@/components/GambarDoodle";
import ModuleRenderer from "@/components/ModuleRenderer";
import TeksNaskah from "@/components/TeksNaskah";

const IKON = [Lightbulb, Compass, Target, Star];

function doodleKartu(
  gambarSisipan: GambarSisipan[] | undefined,
  indeks: number,
): GambarSisipan | undefined {
  return gambarSisipan?.find((item) => item.setelahParagraf === indeks + 1);
}

function LencanaSuara({ tampil }: { tampil: boolean }) {
  if (!tampil) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#F0AB00] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#1C01A5]">
      <Volume2 className="h-3 w-3" />
      Dibacakan
    </span>
  );
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
  ukuran?: "kartu" | "uraian";
}) {
  const kotak =
    ukuran === "uraian"
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

function TombolSudut({
  sudut,
  aktif,
  onPilih,
}: {
  sudut: SudutPandangMateri;
  aktif: boolean;
  onPilih: (sudut: SudutPandangMateri) => void;
}) {
  const Ikon = sudut === "kurikulum" ? School : Globe2;
  return (
    <button
      type="button"
      onClick={() => onPilih(sudut)}
      aria-pressed={aktif}
      className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-extrabold transition sm:text-base ${
        aktif
          ? "bg-[#1C01A5] text-white shadow-lg shadow-[#1C01A5]/25"
          : "bg-white text-[#1C01A5] hover:bg-[#FFF8E8]"
      }`}
    >
      <Ikon className="h-4 w-4 shrink-0" />
      {LABEL_SUDUT[sudut].pendek}
    </button>
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
  sudutPandang = "kurikulum",
  onGantiSudut,
  onPilihKartu,
  sedangMemutar = false,
}: {
  materi: string;
  mapel: string;
  kelas?: string;
  penjelasan: string;
  sapaan: string;
  kartuAktif: number;
  gambarSisipan?: GambarSisipan[];
  doodleMemuat?: boolean;
  sudutPandang?: SudutPandangMateri;
  onGantiSudut?: (sudut: SudutPandangMateri) => void;
  onPilihKartu?: (indeks: number) => void;
  sedangMemutar?: boolean;
}) {
  const { ideUtama, kartu } = susunKonsepMateri(materi, penjelasan, kelas);
  const ringkas = kartuTanpaNaskah(kelas);
  const label = LABEL_SUDUT[sudutPandang];
  const global = sudutPandang === "global";

  return (
    <section className="space-y-8">
      <div
        className={`rounded-[2rem] border-2 p-5 sm:p-8 ${
          global
            ? "border-[#1C01A5]/35 bg-gradient-to-br from-[#EEE9FF] via-white to-[#FFF8E8]"
            : "border-[#F0AB00]/50 bg-gradient-to-br from-[#FFF8E8] via-white to-[#EEE9FF]"
        }`}
      >
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#F0AB00]">
          Langkah 1 · Pahami konsep dulu
        </p>
        <h2 className="mt-2 text-3xl font-black leading-tight text-[#1C01A5] sm:text-4xl">
          {ideUtama}
        </h2>
        <p className="mt-2 text-sm font-bold text-[#1C01A5]/70">
          {mapel} - {kelas} - {label.ringkas}
        </p>
        <p className="mt-4 whitespace-pre-line text-lg font-semibold text-slate-700">
          {sapaan}
        </p>

        <div className="mt-6 rounded-[1.5rem] border-2 border-[#1C01A5]/10 bg-white/80 p-2">
          <p className="mb-2 px-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#1C01A5]/55">
            Pilih sudut pandang
          </p>
          <div className="flex gap-2">
            <TombolSudut
              sudut="kurikulum"
              aktif={sudutPandang === "kurikulum"}
              onPilih={(sudut) => onGantiSudut?.(sudut)}
            />
            <TombolSudut
              sudut="global"
              aktif={sudutPandang === "global"}
              onPilih={(sudut) => onGantiSudut?.(sudut)}
            />
          </div>
          <p className="mt-3 px-2 text-sm font-semibold leading-snug text-[#1C01A5]/75">
            {global
              ? "Cara Jenius Dunia memakai analogi dan kerangka visual, dengan fakta yang tetap selaras kurikulum."
              : "Kurikulum Sekolah memakai istilah baku dan alur bab buku teks agar siap ujian di sekolah."}
          </p>
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {kartu.map((item, indeks) => {
              const Ikon = IKON[indeks % IKON.length];
              const doodle = doodleKartu(gambarSisipan, indeks);
              return (
                <button
                  key={`kartu-${item.judul}-${indeks}`}
                  type="button"
                  onClick={() => onPilihKartu?.(indeks)}
                  className={`flex flex-col rounded-3xl border-2 p-4 text-center shadow-sm transition-all hover:brightness-[0.98] hover:shadow-md ${item.warna} ${
                    kartuAktif === indeks ? "ring-4 ring-[#1C01A5]/25" : ""
                  }`}
                  aria-label={`Dengar kartu ${indeks + 1}: ${item.judul}`}
                  aria-pressed={kartuAktif === indeks}
                >
                  <MiniDoodle
                    src={doodle?.src}
                    alt={doodle?.alt || item.judul}
                    memuat={doodleMemuat && !doodle?.src}
                  />
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
                    <Ikon className="h-3.5 w-3.5 text-[#1C01A5]" />
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#1C01A5]/70">
                      Kartu {indeks + 1}
                    </p>
                    <LencanaSuara tampil={sedangMemutar && kartuAktif === indeks} />
                  </div>
                  <h4 className="mt-1 text-sm font-black leading-snug text-[#1C01A5] sm:text-base">
                    {item.judul}
                  </h4>
                  <TeksNaskah teks={item.isi} ringkas className="mt-1" />
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid gap-4">
            {kartu.map((item, indeks) => {
              const Ikon = IKON[indeks % IKON.length];
              const doodle = doodleKartu(gambarSisipan, indeks);
              return (
                <button
                  key={`kartu-${item.judul}-${indeks}`}
                  type="button"
                  onClick={() => onPilihKartu?.(indeks)}
                  className={`flex gap-4 rounded-3xl border-2 p-5 text-left shadow-sm transition-all hover:brightness-[0.98] hover:shadow-md ${item.warna} ${
                    kartuAktif === indeks ? "ring-4 ring-[#1C01A5]/25" : ""
                  }`}
                  aria-label={`Dengar kartu ${indeks + 1}: ${item.judul}`}
                  aria-pressed={kartuAktif === indeks}
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
                      <p className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1C01A5]/70">
                        Kartu {indeks + 1} · {label.pendek}
                        <LencanaSuara tampil={sedangMemutar && kartuAktif === indeks} />
                      </p>
                    </div>
                    <h4 className="text-lg font-black leading-snug text-[#1C01A5] sm:text-xl">
                      {item.judul}
                    </h4>
                    <ModuleRenderer konten={item.isi} className="mt-2" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {ringkas ? (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#1C01A5]" />
            <h3 className="text-xl font-extrabold text-[#1C01A5]">
              {global ? "Naskah cara jenius" : "Naskah buku siswa"}
            </h3>
          </div>
          <div className="space-y-4">
            {kartu.map((item, indeks) => (
              <button
                key={`naskah-${item.judul}-${indeks}`}
                type="button"
                onClick={() => onPilihKartu?.(indeks)}
                className={`w-full rounded-3xl border-2 p-5 text-left transition-all hover:brightness-[0.98] hover:shadow-md ${item.warna} ${
                  kartuAktif === indeks ? "ring-4 ring-[#1C01A5]/25" : ""
                }`}
                aria-label={`Dengar kartu ${indeks + 1}: ${item.judul}`}
                aria-pressed={kartuAktif === indeks}
              >
                <p className="flex flex-wrap items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-[#1C01A5]/70">
                  Kartu {indeks + 1} · {label.pendek}
                  <LencanaSuara tampil={sedangMemutar && kartuAktif === indeks} />
                </p>
                <h4 className="mt-1 text-lg font-black leading-snug text-[#1C01A5]">
                  {item.judul}
                </h4>
                <ModuleRenderer konten={item.naskah} className="mt-2" />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
