"use client";

import { Loader2 } from "lucide-react";

export const TEKS_MENYUSUN_NASKAH = "sedang menyusun naskah";

export default function TungguNaskah({
  padat = false,
}: {
  padat?: boolean;
}) {
  if (padat) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-sm font-extrabold text-[#1C01A5] shadow-sm">
        <Loader2 className="h-4 w-4 animate-spin" />
        {TEKS_MENYUSUN_NASKAH}
      </span>
    );
  }
  return (
    <div className="rounded-2xl bg-white/80 p-8 text-center">
      <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#1C01A5]" />
      <p className="mt-4 text-lg font-extrabold text-[#1C01A5]">
        {TEKS_MENYUSUN_NASKAH}
      </p>
    </div>
  );
}
