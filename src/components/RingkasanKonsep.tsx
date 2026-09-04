"use client";

import {
  BookOpen,
  ClipboardList,
  Globe2,
  Lightbulb,
  Loader2,
  Pencil,
  School,
  Sparkles,
  Star,
  Compass,
  Target,
  Volume2,
} from "lucide-react";
import { kartuTanpaNaskah, susunKonsepMateri } from "@/lib/konsep-materi";
import { mapelHitungan } from "@/lib/mapel-hitungan";
import {
  LABEL_TINGKAT,
  susunSilabusMerdeka,
  type TingkatSilabus,
} from "@/lib/silabus-merdeka";
import {
  LABEL_SUDUT,
  type SudutPandangMateri,
} from "@/lib/sudut-pandang";
import type { GambarSisipan } from "@/components/GambarDoodle";
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

function LencanaTingkat({ tingkat }: { tingkat: TingkatSilabus }) {
  const label = LABEL_TINGKAT[tingkat];
  const gaya =
    tingkat === "baik"
      ? "bg-emerald-600 text-white"
      : tingkat === "cukup"
        ? "bg-[#F0AB00] text-[#1C01A5]"
        : "bg-rose-600 text-white";
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider ${gaya}`}
    >
      {label.teks}
    </span>
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
  naskahKurikulum,
  sapaan,
  kartuAktif,
  gambarSisipan,
  doodleMemuat = false,
  sudutPandang = "kurikulum",
  onGantiSudut,
  sedangMemutar = false,
}: {
  materi: string;
  mapel: string;
  kelas?: string;
  penjelasan: string;
  naskahKurikulum?: string;
  sapaan: string;
  kartuAktif: number;
  gambarSisipan?: GambarSisipan[];
  doodleMemuat?: boolean;
  sudutPandang?: SudutPandangMateri;
  onGantiSudut?: (sudut: SudutPandangMateri) => void;
  sedangMemutar?: boolean;
}) {
  const { ideUtama, kartu } = susunKonsepMateri(materi, penjelasan, kelas);
  const ringkas = kartuTanpaNaskah(kelas);
  const hitungan = mapelHitungan(mapel, materi);
  const label = LABEL_SUDUT[sudutPandang];
  const global = sudutPandang === "global";
  const silabus = susunSilabusMerdeka({
    kelas,
    mapel,
    materi,
    naskahKurikulum: naskahKurikulum || penjelasan,
  });
  const kerangka = silabus.filter((item) => item.kelompok === "kerangka");
  const materiPokok = silabus.filter((item) => item.kelompok === "materi");

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
          {mapel} · {label.ringkas}
        </p>
        <p className="mt-4 text-lg font-semibold text-slate-700">{sapaan}</p>

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
          <ClipboardList className="h-5 w-5 text-[#F0AB00]" />
          <h3 className="text-xl font-extrabold text-[#1C01A5]">Silabus</h3>
        </div>
        <p className="mb-4 text-sm font-semibold text-[#1C01A5]/75">
          Komponen utama Kurikulum Merdeka Kemendikbudristek. Skor:{" "}
          <span className="font-black text-rose-600">Merah = Kurang</span>
          {" · "}
          <span className="font-black text-[#C48800]">Kuning = Cukup</span>
          {" · "}
          <span className="font-black text-emerald-700">Hijau = Baik</span>
        </p>
        <div className="space-y-3">
          {kerangka.map((item) => (
            <article
              key={item.id}
              className={`flex items-start justify-between gap-3 rounded-2xl border-2 px-4 py-3 ${
                item.tingkat === "baik"
                  ? "border-emerald-300 bg-emerald-50"
                  : item.tingkat === "cukup"
                    ? "border-[#F0AB00]/70 bg-[#FFF8E8]"
                    : "border-rose-300 bg-rose-50"
              }`}
            >
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#1C01A5]/55">
                  Komponen utama
                </p>
                <h4 className="mt-0.5 text-base font-black text-[#1C01A5]">
                  {item.judul}
                </h4>
                <p className="mt-1 text-sm font-semibold leading-snug text-[#1C01A5]/75">
                  {item.keterangan}
                </p>
              </div>
              <LencanaTingkat tingkat={item.tingkat} />
            </article>
          ))}
        </div>
        {materiPokok.length > 0 ? (
          <div className="mt-5">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#1C01A5]/55">
              Materi pokok · tujuan subbab buku siswa
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {materiPokok.map((item, indeks) => (
                <article
                  key={item.id}
                  className={`flex items-start justify-between gap-3 rounded-2xl border-2 px-4 py-3 ${
                    item.tingkat === "baik"
                      ? "border-emerald-300 bg-emerald-50"
                      : item.tingkat === "cukup"
                        ? "border-[#F0AB00]/70 bg-[#FFF8E8]"
                        : "border-rose-300 bg-rose-50"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#1C01A5]/50">
                      {indeks + 1}
                    </p>
                    <h4 className="text-sm font-black leading-snug text-[#1C01A5] sm:text-base">
                      {item.judul}
                    </h4>
                    <p className="mt-1 text-xs font-semibold leading-snug text-[#1C01A5]/70">
                      {item.keterangan}
                    </p>
                  </div>
                  <LencanaTingkat tingkat={item.tingkat} />
                </article>
              ))}
            </div>
          </div>
        ) : null}
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
            Kartu ini singkat. Uraian {global ? "cara jenius" : "buku siswa"} ada di naskah di bawah, dan Tutor Suara membacakan sudut pandang yang sedang dipilih.
          </p>
        ) : hitungan ? (
          <p className="mb-4 flex items-start gap-2 text-sm font-semibold leading-snug text-[#1C01A5]/75">
            <Pencil className="mt-0.5 h-4 w-4 shrink-0 text-[#F0AB00]" />
            Setelah uraian ada contoh soal dan latihan, plus kunci untuk dicek sendiri.
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
                      <p className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1C01A5]/70">
                        Kartu {indeks + 1} · {label.pendek}
                        <LencanaSuara tampil={sedangMemutar && kartuAktif === indeks} />
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
            <h3 className="text-xl font-extrabold text-[#1C01A5]">
              {global ? "Naskah cara jenius" : "Naskah buku siswa"}
            </h3>
          </div>
          {hitungan ? (
            <p className="mb-4 flex items-start gap-2 text-sm font-semibold leading-snug text-[#1C01A5]/75">
              <Pencil className="mt-0.5 h-4 w-4 shrink-0 text-[#F0AB00]" />
              Setelah uraian ada contoh soal dan latihan, plus kunci untuk dicek sendiri.
            </p>
          ) : null}
          <div className="space-y-4">
            {kartu.map((item, indeks) => (
              <article
                key={`naskah-${item.judul}-${indeks}`}
                className={`rounded-3xl border-2 p-5 ${item.warna} ${
                  kartuAktif === indeks ? "ring-4 ring-[#1C01A5]/25" : ""
                }`}
              >
                <p className="flex flex-wrap items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider text-[#1C01A5]/70">
                  Kartu {indeks + 1} · {label.pendek}
                  <LencanaSuara tampil={sedangMemutar && kartuAktif === indeks} />
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
