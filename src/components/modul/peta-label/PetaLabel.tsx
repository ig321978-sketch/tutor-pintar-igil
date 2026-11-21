"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";

/**
 * Mind-map pola label kosong (disetujui pemilik dari pilot Kelas 1 Bab 1 Sub-Bab A): gambar tema cerita dengan empat label kosong.
 * Anak mengetuk label satu per satu, judul langkah muncul dan dibacakan guru. Anak tidak membuat konsep; konsep diberitahukan.
 * Satu layar tanpa gulir. Tiga rupa gambar tema: "rak" (rak bersusun), "tangga" (anak tangga naik), "meja" (piring di meja).
 */
export type LangkahLabel = { judul: string; arti: string; ikon: string };
export type RupaPeta = "rak" | "tangga" | "meja";

const TEMA: Record<RupaPeta, { bingkai: string; isi: string; garis: string; judul: string; judulTeks: string; sel: string }> = {
  rak: { bingkai: "#78350F", isi: "#C08A4E", garis: "#78350F", judul: "#78350F", judulTeks: "#FDE68A", sel: "#E8C48F" },
  tangga: { bingkai: "#1E3A8A", isi: "#BFDBFE", garis: "#1E3A8A", judul: "#1E3A8A", judulTeks: "#FDE68A", sel: "#DBEAFE" },
  meja: { bingkai: "#9D174D", isi: "#FBCFE8", garis: "#9D174D", judul: "#9D174D", judulTeks: "#FFF7CC", sel: "#FCE7F3" },
};

export default function PetaLabel({
  rupa,
  judul,
  ikonJudul,
  langkah,
  petunjuk,
  pesanSelesai,
  speakGuru,
  onLanjut,
  teksLanjut,
}: {
  rupa: RupaPeta;
  judul: string;
  ikonJudul: string;
  langkah: LangkahLabel[];
  petunjuk: string;
  pesanSelesai: string;
  speakGuru: (t: string) => void;
  onLanjut: () => void;
  teksLanjut: string;
}) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === langkah.length;
  const tema = TEMA[rupa];

  const ketuk = (n: number) => {
    speakGuru(langkah[n - 1].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };

  const label = (n: number, kelas = "") => {
    const l = langkah[n - 1];
    const terbuka = buka.includes(n);
    return (
      <button
        type="button"
        onClick={() => ketuk(n)}
        aria-label={terbuka ? `Langkah ${n}: ${l.judul}` : `Label kosong langkah ${n}`}
        className={`flex min-h-[56px] w-full min-w-0 rounded-xl border-[3px] font-black leading-tight text-[#1C01A5] ${rupa === "meja" ? "min-h-[92px] flex-col items-center justify-center gap-1 px-1 py-1.5 text-center" : "items-center gap-2 px-2 py-1 text-left"} ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/70"} ${kelas}`}
      >
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-base text-white ${terbuka ? "border-[#15803D] bg-[#15803D]" : "border-[#B45309] bg-[#B45309]"}`}
        >
          {n}
        </span>
        <span className={`min-w-0 break-words ${rupa === "meja" ? "text-[13px]" : "text-sm"}`}>{terbuka ? l.judul : "?"}</span>
      </button>
    );
  };

  const nomor = langkah.map((_, i) => i + 1);

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      <div
        className="mx-auto w-full max-w-xl rounded-2xl border-[6px] p-2 shadow-[0_6px_0_rgba(0,0,0,0.25)]"
        style={{ borderColor: tema.bingkai, background: tema.isi }}
        data-rupa={rupa}
      >
        <p className="mb-2 rounded-lg py-1 text-center text-sm font-black" style={{ background: tema.judul, color: tema.judulTeks }}>
          {ikonJudul} {judul}
        </p>

        {rupa === "rak" ? (
          <div>
            {nomor.map((n) => (
              <div key={n} className="grid grid-cols-[4.6rem_1fr] items-center gap-2 border-b-[6px] px-2 py-2 first:rounded-t-xl last:rounded-b-xl last:border-b-0" style={{ background: tema.sel, borderColor: tema.garis }}>
                <span className="text-center text-lg font-black leading-none" style={{ color: tema.garis }} aria-hidden="true">
                  {langkah[n - 1].ikon}
                </span>
                {label(n)}
              </div>
            ))}
          </div>
        ) : null}

        {rupa === "tangga" ? (
          <div className="flex flex-col gap-1.5 rounded-xl bg-[#EFF6FF] p-2">
            {[...nomor].reverse().map((n) => (
              <div key={n} className="flex items-center gap-2 border-b-[6px] pb-1" style={{ marginLeft: (n - 1) * 16, borderColor: tema.garis }}>
                <span className="w-10 shrink-0 text-center text-lg leading-none" aria-hidden="true">
                  {langkah[n - 1].ikon}
                </span>
                {label(n, "min-w-0 flex-1")}
              </div>
            ))}
          </div>
        ) : null}

        {rupa === "meja" ? (
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#FFF1F2] p-2">
            {nomor.map((n) => (
              <div key={n} className="flex flex-col items-center gap-1 rounded-2xl border-4 border-white bg-white/80 p-1.5 shadow-[0_3px_0_rgba(157,23,77,0.25)]">
                <span className="text-xl leading-none" aria-hidden="true">
                  {langkah[n - 1].ikon}
                </span>
                {label(n)}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? pesanSelesai : `Sudah dibuka ${buka.length} dari ${langkah.length} langkah.`}
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
