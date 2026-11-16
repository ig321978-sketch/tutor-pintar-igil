"use client";

import { useSyncExternalStore } from "react";
import { suaraDidukung, ucapkan } from "./suara";

const tidakLangganan = () => () => {};

/** Tombol besar "Dengarkan". Bila peramban tidak mendukung suara, tombol disembunyikan (teks tetap terbaca). */
export default function TombolSuara({ teks, label = "Dengarkan", kecil }: { teks: string; label?: string; kecil?: boolean }) {
  const didukung = useSyncExternalStore(tidakLangganan, suaraDidukung, () => false);
  if (!didukung) return null;
  return (
    <button
      type="button"
      onClick={() => ucapkan(teks)}
      className={`inline-flex items-center gap-1 rounded-2xl border-4 border-violet-400 bg-violet-100 font-black text-violet-900 active:scale-95 ${kecil ? "min-h-10 px-3 text-sm" : "min-h-12 px-4 text-base"}`}
    >
      🔊 {label}
    </button>
  );
}
