"use client";

import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { BarisPoster } from "@/components/InfografisKelas1";
import DaftarLengkapMateri from "@/components/DaftarLengkapMateri";
import GambarDoodle, { type GambarSisipan } from "@/components/GambarDoodle";
import { BlokTampil, TeksBuku } from "@/components/BlokNaskahTampil";
import {
  daftarPendekUntukGrid,
  pecahKartuPembahasanSd,
} from "@/lib/naskah-kartu-sd";
import type { BlokNaskahModul } from "@/lib/blok-naskah-modul";

const WARNA_GRID = [
  "border-[#1D4ED8] bg-[#EFF6FF]",
  "border-[#15803D] bg-[#F0FDF4]",
  "border-[#7C3AED] bg-[#F5F3FF]",
  "border-[#C2410C] bg-[#FFF7ED]",
  "border-[#0F766E] bg-[#F0FDFA]",
  "border-[#B91C1C] bg-[#FEF2F2]",
  "border-[#D97706] bg-[#FFFBEB]",
];

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function GridDaftar({ item, berurutan }: { item: string[]; berurutan: boolean }) {
  return (
    <div
      className={`mt-4 grid gap-2 ${
        item.length > 6 ? "grid-cols-2 sm:grid-cols-4" : "sm:grid-cols-3"
      }`}
    >
      {item.map((isi, indeks) => (
        <article
          key={`${isi.slice(0, 20)}-${indeks}`}
          className={`rounded-2xl border-2 px-3 py-3 ${WARNA_GRID[indeks % WARNA_GRID.length]}`}
        >
          {berurutan ? (
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
              Langkah {indeks + 1}
            </p>
          ) : null}
          <p className="text-center text-sm font-extrabold leading-snug text-slate-800">
            <TeksBuku teks={isi} />
          </p>
        </article>
      ))}
    </div>
  );
}

function VisualBlok({ blok }: { blok: BlokNaskahModul }) {
  if (blok.jenis === "daftar" && daftarPendekUntukGrid(blok.item)) {
    return <GridDaftar item={blok.item} berurutan={blok.berurutan} />;
  }
  return <BlokTampil blok={blok} padat={false} />;
}

export default function NaskahKartuSd({
  konten,
  materi = "",
  gambarSisipan,
  doodleMemuat = false,
}: {
  konten: string;
  materi?: string;
  gambarSisipan?: GambarSisipan[];
  doodleMemuat?: boolean;
}) {
  const data = pecahKartuPembahasanSd(konten, materi);
  if (data.kartu.length === 0) return null;

  return (
    <div className="space-y-5">
      {data.judul && data.judul !== materi ? (
        <h3 className="text-left text-xl font-black leading-tight text-[#1C01A5] sm:text-2xl">
          {data.judul}
        </h3>
      ) : null}
      {data.kartu.map((kartu, indeks) => {
        const doodle = gambarSisipan?.find(
          (gambar) => gambar.setelahParagraf === indeks + 1,
        );
        return (
          <KartuBingkai key={`${kartu.kode}-${kartu.judul}-${indeks}`}>
            <h4 className="text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
              {kartu.kode}. {kartu.judul}
            </h4>
            {kartu.pengantar ? (
              <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
                <TeksBuku teks={kartu.pengantar} />
              </p>
            ) : null}
            {doodle ? (
              <div className="mt-4 flex justify-center">
                <GambarDoodle
                  src={doodle.src}
                  alt={doodle.alt || kartu.judul}
                  ukuran={doodle.ukuran}
                />
              </div>
            ) : doodleMemuat ? (
              <div className="mx-auto mt-4 flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-[#1C01A5]/20 bg-[#fbf6ea]">
                <Loader2 className="h-6 w-6 animate-spin text-[#1C01A5]" />
              </div>
            ) : null}
            {kartu.infografis.length > 0 ? (
              <div className="mt-4 space-y-4">
                {kartu.infografis.map((baris, i) => (
                  <BarisPoster
                    key={`${baris.nomor}-${baris.judul}-${i}`}
                    item={{
                      ...baris,
                      judul: baris.judul === kartu.judul ? "" : baris.judul,
                    }}
                    indeks={indeks + i}
                  />
                ))}
              </div>
            ) : null}
            {kartu.blok.length > 0 ? (
              <div className="mt-4 space-y-3">
                {kartu.blok.map((blok, i) => (
                  <VisualBlok key={`${blok.jenis}-${i}`} blok={blok} />
                ))}
              </div>
            ) : null}
            {kartu.lengkap.length > 0 ? (
              <div className="mt-4">
                <DaftarLengkapMateri data={kartu.lengkap} />
              </div>
            ) : null}
          </KartuBingkai>
        );
      })}
    </div>
  );
}
