"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_JUDUL_PETA, JUDUL_PETA, LANGKAH_JADWAL, PETUNJUK_PETA, SELESAI_PETA } from "./data-peta";

/**
 * Mind-map Kelas 5 Bab 2 Sub-Bab B "Dua Lonceng Pak Tarno" (label kosong): dua jalur lonceng (jalur Bu Marni di kiri dan jalur Pak Tarno di kanan) yang turun lalu bertemu
 * menjadi satu jalur. Lima lonceng bernomor, tiap lonceng punya papan label kosong "?". Ketuk label: judul langkah muncul, lonceng menyala hijau, dan Guru membacakan langkahnya.
 * Komponen sendiri (bukan PetaLabel): gambar dan tata letak mengikuti isi materi (dua daftar, yang sama, terkecil, bertemu lagi, tiga bilangan), muat satu layar 344 piksel.
 */
export default function PetaJadwalK5B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_JADWAL.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_JADWAL[n - 1].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  /** Lonceng kiri dan kanan ditumpuk (lonceng di atas label); tiga lonceng jalur bersama sebaris supaya seluruh peta muat satu layar. */
  const sel = (n: number, sebaris = false) => {
    const l = LANGKAH_JADWAL[n - 1];
    const terbuka = buka.includes(n);
    return (
      <div key={l.judul} role="listitem" className={sebaris ? "flex items-center gap-1.5" : "space-y-1"} data-lonceng={n}>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-full border-2 border-[#7C2D12] text-[#7C2D12]" style={{ background: terbuka ? "#86EFAC" : "#FCD34D" }} aria-hidden="true">
            <span className="text-base leading-none">{l.ikon}</span>
          </span>
          {sebaris ? null : (
            <span className="text-[11px] font-black text-[#7C2D12]" aria-hidden="true">
              Lonceng {n}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => ketuk(n)}
          aria-label={terbuka ? `Langkah ${n}: ${l.judul}` : `Label kosong langkah ${n}`}
          className={`flex min-h-[48px] min-w-0 flex-1 items-center justify-center rounded-lg border-2 px-1 text-center text-[13px] font-black leading-tight text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/90 text-lg text-[#B45309]"}`}
        >
          {terbuka ? l.judul : "?"}
        </button>
      </div>
    );
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

      <div className="mx-auto w-full max-w-xl rounded-2xl border-4 border-[#B91C1C] bg-[#FFF1F2] p-2 shadow-[0_6px_0_rgba(127,29,29,0.3)]" data-uji="dua-jalur">
        <p className="mb-2 rounded-lg bg-[#B91C1C] py-1 text-center text-sm font-black text-[#FEE2E2]">
          {IKON_JUDUL_PETA} {JUDUL_PETA}
        </p>
        <div className="grid grid-cols-2 gap-3" role="list" aria-label="Dua jalur lonceng">
          <div className="space-y-0 border-l-[6px] border-[#EA580C] pl-2" data-jalur="kiri">
            {sel(1)}
          </div>
          <div className="space-y-0 border-r-[6px] border-[#0D9488] pr-2" data-jalur="kanan">
            {sel(2)}
          </div>
        </div>
        <svg viewBox="0 0 100 36" preserveAspectRatio="none" className="block h-9 w-full" aria-hidden="true" data-uji="jalur-bertemu">
          <path d="M3 0 L50 34" stroke="#EA580C" strokeWidth={6} fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M97 0 L50 34" stroke="#0D9488" strokeWidth={6} fill="none" vectorEffect="non-scaling-stroke" />
          <circle cx={50} cy={34} r={2.4} fill="#7C2D12" />
        </svg>
        <div className="mx-auto w-[78%] space-y-2 border-x-[6px] border-[#7C2D12]/70 px-2 py-1" role="list" aria-label="Jalur bersama" data-jalur="tengah">
          {sel(3, true)}
          {sel(4, true)}
          {sel(5, true)}
        </div>
        <div className="mx-auto mt-1 h-1.5 w-[70%] rounded bg-[#7C2D12]" aria-hidden="true" />
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA : `Sudah dibuka ${buka.length} dari ${LANGKAH_JADWAL.length} langkah.`}
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

export { PetaJadwalK5B2 };
