"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { Keramik } from "./GambarEtalase";
import { IKON_JUDUL_PETA_ETALASE, JUDUL_PETA_ETALASE, LANGKAH_ETALASE, PETUNJUK_PETA_ETALASE, SELESAI_PETA_ETALASE } from "./data-kartu";

/**
 * Mind-map Kelas 4 Bab 5 Sub-Bab A "Etalase Keramik Bu Dewi" (rancangan bebas, bukan komponen bersama): gambar ETALASE KACA toko keramik dengan tiga rak kayu.
 * Lima keramik berbentuk sungguhan (SVG dari koordinat) menjadi tempat lima label kosong; tiap label menempel pada keramik yang sesuai langkahnya
 * (segilima = kenali bangun, persegi = pilah menurut sisi, segitiga = golongkan segitiga, jajargenjang = periksa sisi dan sudut, belah ketupat = pohon keluarga).
 * Anak mengetuk keramik: judul langkah muncul pada label dan dibacakan Guru. Tombol lanjut muncul setelah kelimanya terbuka. Satu layar tanpa gulir.
 */
const BENTUK = ["segilima-sembarang", "persegi", "segitiga-sama-kaki", "jajargenjang", "belah-ketupat"];
/** Tata rak: rak atas dua keramik, rak tengah dua keramik, rak bawah satu keramik di tengah. */
const RAK: number[][] = [[0, 1], [2, 3], [4]];

export default function PetaEtalase({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_ETALASE.length;
  const ketuk = (i: number) => {
    speakGuru(LANGKAH_ETALASE[i].arti);
    if (!buka.includes(i)) setBuka((b) => [...b, i]);
  };

  const keramik = (i: number) => {
    const l = LANGKAH_ETALASE[i];
    const terbuka = buka.includes(i);
    return (
      <button
        key={i}
        type="button"
        onClick={() => ketuk(i)}
        aria-label={terbuka ? `Langkah ${i + 1}: ${l.judul}` : `Label kosong langkah ${i + 1}`}
        className={`relative flex w-[46%] min-w-0 flex-col items-center rounded-lg px-1 pb-1 pt-1 ${terbuka ? "lm-muncul" : ""}`}
      >
        <svg viewBox="0 0 90 46" className="h-[44px] w-full" aria-hidden="true">
          <Keramik kunci={BENTUK[i]} x={10} y={2} w={70} h={42} rupa="benda" />
        </svg>
        <span
          className={`mt-0.5 flex min-h-[34px] w-full min-w-0 items-center justify-center gap-1 rounded-md border-2 px-1 text-center text-[12px] font-black leading-tight text-[#1C01A5] ${terbuka ? "border-[#15803D] bg-[#DCFCE7]" : "border-dashed border-[#B45309] bg-white/90"}`}
        >
          <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B45309] text-[11px] text-white">
            {i + 1}
          </span>
          <span className="min-w-0 break-words">{terbuka ? l.judul : "?"}</span>
        </span>
      </button>
    );
  };

  return (
    <div className="space-y-2">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA_ETALASE)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA_ETALASE}</p>
      </div>

      <div className="mx-auto w-full max-w-[420px] rounded-t-2xl border-[6px] border-[#6B4423] bg-[#E0F2FE] shadow-[0_6px_0_rgba(107,68,35,0.35)]" data-uji="etalase-kaca">
        <p className="rounded-b-none bg-[#6B4423] py-1 text-center text-sm font-black text-[#FDE68A]">
          {IKON_JUDUL_PETA_ETALASE} {JUDUL_PETA_ETALASE}
        </p>
        <div className="relative" style={{ backgroundImage: "linear-gradient(115deg,rgba(255,255,255,0.55) 0 14%,transparent 14% 22%,rgba(255,255,255,0.35) 22% 28%,transparent 28%)" }}>
          {RAK.map((baris, r) => (
            <div key={r} className="flex items-end justify-around border-b-[8px] border-[#B7814A] px-1 pt-1 last:border-b-[10px]">
              {baris.map(keramik)}
            </div>
          ))}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA_ETALASE : `Sudah dibuka ${buka.length} dari ${LANGKAH_ETALASE.length} langkah.`}
      </p>
      {selesai ? (
        <div className="flex justify-center">
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        </div>
      ) : null}
    </div>
  );
}
export { PetaEtalase };
