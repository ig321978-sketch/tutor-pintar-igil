"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_JUDUL_PETA, JUDUL_PETA, LANGKAH_BAZAR, PETUNJUK_PETA, SELESAI_PETA } from "./data-peta";

/**
 * Mind-map Kelas 4 Bab 6 Sub-Bab B "Diagram Batang Pak Dodi" (label kosong): papan diagram bazar berbentuk diagram batang sungguh dengan lima batang bertingkat,
 * tiap batang diberi label kosong "?" di atasnya. Ketuk label: judul langkah muncul, batang menyala hijau, dan Guru membacakan langkahnya.
 * Komponen sendiri (bukan PetaLabel): gambar dan tata letak mengikuti isi materi (sumbu, garis skala, batang), muat satu layar 344 piksel.
 */
const TINGGI_DASAR = 40;
const LANGKAH_TINGGI = 26;
/** Tinggi alas (nomor batang) di bawah batang, piksel. */
const ALAS = 28;
const WARNA = ["#F97316", "#FACC15", "#22C55E", "#38BDF8", "#A78BFA"];
/** Tinggi batang ke-n (piksel): naik sebesar satu tingkat tiap batang, sehingga ujung tiap batang tepat pada garis skala. */
export const tinggiBatangPeta = (n: number): number => TINGGI_DASAR + (n - 1) * LANGKAH_TINGGI;

export default function PetaBazarK4B6({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_BAZAR.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_BAZAR[n - 1].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA}</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-4 border-[#B91C1C] bg-[#FFFBEB] p-1.5 shadow-[0_6px_0_rgba(127,29,29,0.3)]" data-uji="papan-diagram">
        <p className="mb-2 rounded-lg bg-[#B91C1C] py-1 text-center text-sm font-black text-[#FEF3C7]">
          {IKON_JUDUL_PETA} {JUDUL_PETA}
        </p>
        <div className="relative border-l-2 border-[#7F1D1D] pl-0.5">
          {/* Garis skala di belakang batang: satu garis tiap tingkat; ujung tiap batang tepat pada garis. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0" aria-hidden="true">
            {LANGKAH_BAZAR.map((_, i) => (
              <span key={i} className="absolute inset-x-0 border-t border-dashed border-[#D6B98A]" style={{ bottom: ALAS + TINGGI_DASAR + i * LANGKAH_TINGGI }} />
            ))}
          </div>
          <div className="relative grid min-w-0 grid-cols-5 items-end gap-0.5">
            {LANGKAH_BAZAR.map((l, idx) => {
              const n = idx + 1;
              const terbuka = buka.includes(n);
              return (
                <div key={l.judul} className="relative flex min-w-0 flex-col items-stretch justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => ketuk(n)}
                    aria-label={terbuka ? `Langkah ${n}: ${l.judul}` : `Label kosong langkah ${n}`}
                    className={`flex min-h-[48px] w-full min-w-0 items-center justify-center rounded-lg border-2 px-0 text-center text-[10px] font-black leading-tight tracking-tight text-[#1C01A5] [overflow-wrap:normal] [word-break:keep-all] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/90 text-base text-[#B45309]"}`}
                  >
                    <span className="min-w-0">{terbuka ? l.judul : "?"}</span>
                  </button>
                  <div className="flex flex-col items-center justify-start rounded-t-md border-2 border-[#7F1D1D] pt-1 text-lg leading-none" style={{ height: tinggiBatangPeta(n), background: terbuka ? "#86EFAC" : WARNA[idx % WARNA.length] }} aria-hidden="true">
                    <span>{l.ikon}</span>
                  </div>
                  <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#7F1D1D] bg-white text-xs font-black text-[#7F1D1D]" aria-hidden="true">
                    {n}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-1 h-1 rounded bg-[#7F1D1D]" aria-hidden="true" />
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA : `Sudah dibuka ${buka.length} dari ${LANGKAH_BAZAR.length} langkah.`}
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

export { PetaBazarK4B6 };
