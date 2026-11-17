"use client";

import React from "react";

/**
 * Kartu "Cari kesalahan" untuk CPA Bab 3: seorang tokoh sudah menulis jawaban yang keliru, anak menilai lalu memilih yang benar.
 * Dipakai bersama oleh bekal-k1b3a, peron-k1b3b, kondektur-k1b3c, dan rumah-k1b3d.
 */
export function TokohKeliru({ tokoh, tulisan }: { tokoh: string; tulisan: string }) {
  return (
    <div className="mb-2 flex items-center gap-2 rounded-2xl border-4 border-dashed border-[#DC2626] bg-[#FEF2F2] p-2" role="note" aria-label={`Cari kesalahan: ${tokoh} menulis ${tulisan}`}>
      <span className="text-2xl" aria-hidden="true">
        {"\u{1F50E}"}
      </span>
      <div className="text-sm font-black text-[#7F1D1D]">
        <p className="text-xs uppercase tracking-wide text-[#DC2626]">Cari kesalahan</p>
        <p>
          {tokoh} menulis: <span className="rounded bg-white px-1.5 text-[#1C01A5]">{tulisan}</span>
        </p>
        <p className="text-xs font-bold">Benar atau keliru? Pilih kalimat yang benar.</p>
      </div>
    </div>
  );
}
