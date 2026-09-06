"use client";

import { Loader2, Sparkles } from "lucide-react";
import ModuleRenderer from "@/components/ModuleRenderer";
import { type SudutPandangMateri } from "@/lib/sudut-pandang";

export default function PanelMateriModul({
  materi,
  sapaan,
  naskah,
  doodleSrc,
  doodleMemuat,
  sudutPandang,
  onGantiSudut,
}: {
  materi: string;
  sapaan: string;
  naskah: string;
  doodleSrc?: string | null;
  doodleMemuat?: boolean;
  sudutPandang: SudutPandangMateri;
  onGantiSudut: (sudut: SudutPandangMateri) => void;
}) {

  return (
    <article className="space-y-5">
      <div className="relative aspect-[16/7] overflow-hidden rounded-2xl bg-[#fbf6ea]">
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
      <div>
        <h2 className="text-2xl font-black leading-tight text-[#1C01A5]">
          {materi}
        </h2>
        <p className="mt-1 text-sm font-bold text-[#1C01A5]/70">
          Mengikuti uraian buku siswa Kurikulum Merdeka
        </p>
        <p className="mt-3 whitespace-pre-line text-base font-semibold text-slate-700">
          {sapaan}
        </p>
        <div className="mt-4 flex gap-2">
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
      <div key={sudutPandang} className="border-t border-[#1C01A5]/10 pt-5">
        <ModuleRenderer konten={naskah} />
      </div>
    </article>
  );
}
