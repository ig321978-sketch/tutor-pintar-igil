"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_JUDUL_PETA, JUDUL_PETA, LANGKAH_URUTAN, PETUNJUK_PETA, SELESAI_PETA } from "./data-peta";

/**
 * Mind-map Kelas 5 Bab 1 Sub-Bab B "Urutan Tribun Pak Hasto" (label kosong): tangga tribun dengan lima undakan, makin ke atas makin ke kanan.
 * Tiap undakan punya papan label kosong "?" di sebelahnya. Ketuk label: judul langkah muncul, undakan menyala hijau, dan Guru membacakan langkahnya.
 * Komponen sendiri (bukan PetaLabel): gambar dan tata letak mengikuti isi materi (undakan tribun yang naik), muat satu layar 344 piksel.
 */
const GESER = 12;
const WARNA = ["#FDBA74", "#FCD34D", "#86EFAC", "#7DD3FC", "#C4B5FD"];

export default function PetaUrutanK5B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_URUTAN.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_URUTAN[n - 1].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  const baris = LANGKAH_URUTAN.map((l, idx) => ({ l, n: idx + 1 })).reverse();
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA}</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-4 border-[#C2410C] bg-[#FFF7ED] p-2 shadow-[0_6px_0_rgba(124,45,18,0.3)]" data-uji="tangga-tribun">
        <p className="mb-2 rounded-lg bg-[#C2410C] py-1 text-center text-sm font-black text-[#FFEDD5]">
          {IKON_JUDUL_PETA} {JUDUL_PETA}
        </p>
        <div className="space-y-1" role="list" aria-label="Undakan tribun">
          {baris.map(({ l, n }) => {
            const terbuka = buka.includes(n);
            return (
              <div key={l.judul} role="listitem" className="flex items-stretch gap-1" style={{ marginLeft: (n - 1) * GESER }} data-undakan={n}>
                <div className="flex h-[52px] w-[58px] shrink-0 flex-col items-center justify-center rounded-t-lg border-2 border-[#7C2D12] text-[#7C2D12]" style={{ background: terbuka ? "#86EFAC" : WARNA[(n - 1) % WARNA.length] }} aria-hidden="true">
                  <span className="flex h-[24px] items-center text-base leading-none">{l.ikon}</span>
                  <span className="mt-0.5 text-[11px] font-black leading-none">{n}</span>
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
          })}
        </div>
        <div className="mt-1 h-1.5 rounded bg-[#7C2D12]" aria-hidden="true" />
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA : `Sudah dibuka ${buka.length} dari ${LANGKAH_URUTAN.length} langkah.`}
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

export { PetaUrutanK5B1 };
