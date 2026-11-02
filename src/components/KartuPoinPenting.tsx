"use client";

import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import type { KelaminGuru } from "@/lib/guru";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";

export default function KartuPoinPenting({
  kelas,
  kelamin,
  cuplikan,
  poin,
  penutup,
  gambar,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
  cuplikan: CuplikanVoiceMateri[];
  poin: string[];
  penutup?: string;
  gambar?: { src: string; alt: string };
}) {
  return (
    <section className="rounded-[1.75rem] border-4 border-violet-200 bg-violet-50/70 px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      <p className="text-center text-4xl" aria-hidden>
        🔑
      </p>
      <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
        D. Poin Penting
      </h4>
      {gambar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={gambar.src}
          alt={gambar.alt}
          className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
        />
      ) : null}
      <div className="mt-4">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikan} />
      </div>
      <ul className="daftar-poin mt-4 space-y-2 text-sm font-semibold text-slate-700">
        {poin.map((teks) => (
          <li key={teks}>{teks}</li>
        ))}
      </ul>
      {penutup ? (
        <p className="mt-4 rounded-2xl bg-violet-100 px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
          {penutup}
        </p>
      ) : null}
    </section>
  );
}
