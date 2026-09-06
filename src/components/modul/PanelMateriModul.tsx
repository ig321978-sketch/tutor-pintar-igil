"use client";

import { Loader2, Sparkles } from "lucide-react";
import ModuleRenderer from "@/components/ModuleRenderer";
import { pisahNaskahDanContoh } from "@/lib/contoh-soal-materi";
import {
  LABEL_SUDUT,
  type SudutPandangMateri,
} from "@/lib/sudut-pandang";

export default function PanelMateriModul({
  materi,
  mapel,
  kelas,
  sapaan,
  naskah,
  doodleSrc,
  doodleMemuat,
  sudutPandang,
  onGantiSudut,
}: {
  materi: string;
  mapel: string;
  kelas: string;
  sapaan: string;
  naskah: string;
  doodleSrc?: string | null;
  doodleMemuat?: boolean;
  sudutPandang: SudutPandangMateri;
  onGantiSudut: (sudut: SudutPandangMateri) => void;
}) {
  const { uraian, contoh } = pisahNaskahDanContoh(naskah);
  const label = LABEL_SUDUT[sudutPandang];

  return (
    <article className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border-2 border-[#F0AB00]/50 bg-gradient-to-br from-[#FFF8E8] via-white to-[#EEE9FF]">
        <div className="relative aspect-[16/7] bg-[#fbf6ea]">
          {doodleSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={doodleSrc}
              alt={`Ilustrasi ${materi}`}
              className="h-full w-full object-cover"
            />
          ) : doodleMemuat ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-[#1C01A5]" />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-[#1C01A5]/30">
              <Sparkles className="h-10 w-10" />
            </div>
          )}
        </div>
        <div className="p-5 sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#F0AB00]">
            Materi
          </p>
          <h2 className="mt-2 text-3xl font-black leading-tight text-[#1C01A5] sm:text-4xl">
            {materi}
          </h2>
          <p className="mt-2 text-sm font-bold text-[#1C01A5]/70">
            {mapel} - {kelas} - {label.ringkas}
          </p>
          <p className="mt-4 whitespace-pre-line text-lg font-semibold text-slate-700">
            {sapaan}
          </p>
          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={() => onGantiSudut("kurikulum")}
              aria-pressed={sudutPandang === "kurikulum"}
              className={`flex-1 rounded-2xl px-3 py-3 text-sm font-extrabold ${
                sudutPandang === "kurikulum"
                  ? "bg-[#1C01A5] text-white"
                  : "bg-white text-[#1C01A5]"
              }`}
            >
              Kurikulum Sekolah
            </button>
            <button
              type="button"
              onClick={() => onGantiSudut("global")}
              aria-pressed={sudutPandang === "global"}
              className={`flex-1 rounded-2xl px-3 py-3 text-sm font-extrabold ${
                sudutPandang === "global"
                  ? "bg-[#1C01A5] text-white"
                  : "bg-white text-[#1C01A5]"
              }`}
            >
              Cara Jenius Dunia
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border-2 border-[#1C01A5]/10 bg-white p-5 sm:p-8">
        <ModuleRenderer konten={uraian} />
      </div>

      {contoh.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xl font-black text-[#1C01A5]">
            Dua contoh soal tuntas
          </h3>
          {contoh.map((item, indeks) => (
            <section
              key={`${item.judul}-${indeks}`}
              className="rounded-[1.5rem] border-2 border-[#F0AB00]/50 bg-[#FFF8E8] p-5"
            >
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#C48800]">
                Contoh {indeks + 1}
              </p>
              <ModuleRenderer konten={item.isi} className="mt-2" />
            </section>
          ))}
        </div>
      ) : null}
    </article>
  );
}
