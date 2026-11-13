"use client";

import React from "react";
import { ejaK6B2 } from "./eja-k6b2";

/* ------------------------------------------------------------------------ */
/* Model gambar K6B2: titik benda berwarna (emas untuk benda pertama, ungu    */
/* untuk benda kedua), kelompok rasio yang sama isinya, dan pilihan tiga      */
/* jawaban yang dibaca suara guru.                                            */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const UNGU = "#8B7CF6";

const OPSI_TOMBOL = "min-h-12 min-w-16 rounded-xl border-4 border-[#1C01A5] bg-white px-3 py-1 text-center text-lg font-black text-[#1C01A5]";

/** Satu baris pertanyaan dengan tiga pilihan. */
export function PilihTiga({ judul, awalan, opsi, onPilih }: { judul: string; awalan: string; opsi: readonly (string | number)[]; onPilih: (o: number) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-center text-sm font-black text-[#1C01A5]">{judul}</p>
      <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label={judul}>
        {opsi.map((v, o) => (
          <button key={String(v)} type="button" aria-label={`${awalan} ${ejaK6B2(String(v))}`} onClick={() => onPilih(o)} className={OPSI_TOMBOL}>
            {String(v)}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Satu titik benda; yang belum dihitung digambar kosong. */
function Titik({ warna, isi }: { warna: string; isi: boolean }) {
  return <span className="inline-block h-5 w-5 rounded-full border-2" style={{ background: isi ? warna : "#fff", borderColor: isi ? BIRU : "#cbd5e1" }} />;
}

/** Satu jajaran titik dengan nama jenis benda dan angkanya. */
export function BarisTitik({ nama, warna, banyak, isi }: { nama: string; warna: string; banyak: number; isi: number }) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-black text-[#1C01A5]">
        {nama}: {isi} dari {banyak}
      </p>
      <div className="flex flex-wrap gap-1" aria-hidden="true">
        {Array.from({ length: banyak }, (_, i) => (
          <Titik key={i} warna={warna} isi={i < isi} />
        ))}
      </div>
    </div>
  );
}

/** Dua jenis benda yang dibandingkan, dihitung satu per satu. */
export function KebunRasio({ ka, kb, a, b, na, nb }: { ka: string; kb: string; a: number; b: number; na: number; nb: number }) {
  return (
    <div className="mx-auto w-full max-w-sm space-y-2 rounded-lg border-4 border-[#1C01A5] bg-white p-2" role="img" aria-label={`${ka} ${na} dari ${a}, ${kb} ${nb} dari ${b}`}>
      <BarisTitik nama={ka} warna={EMAS} banyak={a} isi={na} />
      <BarisTitik nama={kb} warna={UNGU} banyak={b} isi={nb} />
    </div>
  );
}

/** Kelompok sama isi: g kotak, tiap kotak berisi a/g titik emas dan b/g titik ungu. */
export function KelompokRasio({ a, b, g, nama }: { a: number; b: number; g: number; nama: string }) {
  const kiri = a / g;
  const kanan = b / g;
  return (
    <div className="mx-auto flex w-full max-w-sm flex-wrap justify-center gap-2" role="img" aria-label={`${nama}: ${g} kelompok, tiap kelompok ${kiri} dan ${kanan}`}>
      {Array.from({ length: g }, (_, k) => (
        <div key={k} className="flex flex-col items-center gap-1 rounded-lg border-4 border-[#1C01A5] bg-white p-1">
          <div className="flex flex-wrap justify-center gap-0.5">
            {Array.from({ length: kiri }, (_, i) => (
              <Titik key={i} warna={EMAS} isi />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-0.5">
            {Array.from({ length: kanan }, (_, i) => (
              <Titik key={i} warna={UNGU} isi />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Dua suku rasio dalam kotak; suku yang belum diketahui ditulis tanda tanya. */
export function Rasio({ kiri, kanan, warna = BIRU }: { kiri: number | string; kanan: number | string; warna?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 align-middle text-2xl font-black" style={{ color: warna }}>
      <span className="rounded-md border-4 px-2" style={{ borderColor: EMAS }}>
        {kiri}
      </span>
      <span>:</span>
      <span className="rounded-md border-4 px-2" style={{ borderColor: UNGU }}>
        {kanan}
      </span>
    </span>
  );
}

/** Satu operator di antara dua rasio. */
export const Tanda = ({ t }: { t: string }) => <span className="px-1 text-2xl font-black text-[#1C01A5]">{t}</span>;
