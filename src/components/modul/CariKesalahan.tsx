"use client";

import React, { useState } from "react";

/**
 * Soal "Cari kesalahan" (pedoman mutu modul): seorang tokoh sudah menjawab; anak menilai jawabannya benar atau salah dulu,
 * lalu memeriksa sendiri. `alasan` menjelaskan kesalahan (atau kebenaran) jawaban tokoh dan dipakai sebagai petunjuk.
 * Dipakai CPA Kelas 1 Bab 4 Sub-Bab B dan C.
 */
export function CariKesalahan({
  tokoh,
  ucapan,
  benar,
  alasan,
  salah,
  onLulus,
}: {
  tokoh: string;
  ucapan: string;
  benar: boolean;
  alasan: string;
  salah: (p: string) => void;
  onLulus: (pesan: string) => void;
}) {
  const [mati, setMati] = useState<boolean[]>([]);
  const tentukan = (b: boolean) => {
    if (b === benar) onLulus(benar ? `Betul, ${tokoh} benar. ${alasan}` : `Betul, ${tokoh} keliru. ${alasan} Sekarang periksa sendiri.`);
    else {
      setMati((m) => [...m, b]);
      salah(benar ? `Periksa lagi dengan teliti. ${alasan}` : `Coba periksa lagi. ${alasan}`);
    }
  };
  return (
    <div className="mb-2 space-y-2 rounded-2xl border-4 border-dashed border-[#DC2626] bg-[#FFF1F2] p-2">
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#B91C1C]">{"\u{1F50E}"} Cari kesalahan</p>
      <p className="mx-auto max-w-xs rounded-2xl border-2 border-[#1C01A5] bg-white px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">
        {tokoh}: &ldquo;{ucapan}&rdquo;
      </p>
      <div className="flex justify-center gap-2" role="group" aria-label="Periksa jawaban tokoh">
        {[true, false].map((b) => (
          <button
            key={String(b)}
            type="button"
            disabled={mati.includes(b)}
            onClick={() => tentukan(b)}
            className="min-h-[48px] min-w-[96px] rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-base font-black text-[#1C01A5] disabled:opacity-30"
          >
            {b ? "\u{2705} Benar" : "\u{274C} Salah"}
          </button>
        ))}
      </div>
    </div>
  );
}
