"use client";

import { memo } from "react";
import { Loader2, Sparkles } from "lucide-react";
import ModuleRenderer from "@/components/ModuleRenderer";
import { type GambarSisipan } from "@/components/GambarDoodle";
import { LABEL_SUDUT, type SudutPandangMateri } from "@/lib/sudut-pandang";

function PanelMateriModul({
  mapel = "",
  materi,
  sapaan,
  naskah,
  doodleSrc,
  doodleMemuat,
  gambarSisipan,
  sudutPandang,
  onGantiSudut,
  memuat,
}: {
  mapel?: string;
  materi: string;
  sapaan: string;
  naskah: string;
  doodleSrc?: string | null;
  doodleMemuat?: boolean;
  gambarSisipan?: GambarSisipan[];
  sudutPandang: SudutPandangMateri | null;
  onGantiSudut: (sudut: SudutPandangMateri) => void;
  memuat?: boolean;
}) {
  const label = sudutPandang ? LABEL_SUDUT[sudutPandang] : null;

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
          {label?.ringkas ??
            "Pilih Mode Kurikulum (paham konsep) atau Mode Global (trik percepatan)."}
        </p>
        {sapaan && sudutPandang ? (
          <p className="mt-3 whitespace-pre-line text-base font-semibold text-slate-700">
            {sapaan}
          </p>
        ) : null}
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onGantiSudut("kurikulum")}
            disabled={memuat}
            aria-pressed={sudutPandang === "kurikulum"}
            className={`flex-1 rounded-2xl px-3 py-3 text-sm font-extrabold ${
              sudutPandang === "kurikulum"
                ? "bg-[#1C01A5] text-white"
                : "bg-white text-[#1C01A5]"
            } ${memuat ? "cursor-wait opacity-70" : ""}`}
          >
            Mode Kurikulum
          </button>
          <button
            type="button"
            onClick={() => onGantiSudut("global")}
            disabled={memuat}
            aria-pressed={sudutPandang === "global"}
            className={`flex-1 rounded-2xl px-3 py-3 text-sm font-extrabold ${
              sudutPandang === "global"
                ? "bg-[#1C01A5] text-white"
                : "bg-white text-[#1C01A5]"
            } ${memuat ? "cursor-wait opacity-70" : ""}`}
          >
            Mode Global
          </button>
        </div>
      </div>
      {memuat && !naskah ? (
        <div className="rounded-2xl bg-white/80 p-8 text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#1C01A5]" />
          <p className="mt-4 text-lg font-extrabold text-[#1C01A5]">
            {sudutPandang === "global"
              ? "Menyusun trik percepatan Mode Global..."
              : "Menyusun naskah bergambar Mode Kurikulum..."}
          </p>
        </div>
      ) : null}
      {sudutPandang && naskah ? (
        <div key={sudutPandang} className="border-t border-[#1C01A5]/10 pt-5">
          <ModuleRenderer
            konten={naskah}
            mapel={mapel}
            materi={materi}
            className="mt-1"
            gambarSisipan={gambarSisipan}
            doodleMemuat={doodleMemuat}
          />
        </div>
      ) : null}
      {!memuat && !sudutPandang ? (
        <p className="text-sm font-semibold text-[#1C01A5]/70">
          Naskah belum dimuat. Kurikulum untuk paham konsep, Global untuk trik percepatan.
        </p>
      ) : null}
    </article>
  );
}

export default memo(PanelMateriModul, (sebelum, sekarang) => (
  sebelum.mapel === sekarang.mapel &&
  sebelum.materi === sekarang.materi &&
  sebelum.sapaan === sekarang.sapaan &&
  sebelum.naskah === sekarang.naskah &&
  sebelum.doodleSrc === sekarang.doodleSrc &&
  sebelum.doodleMemuat === sekarang.doodleMemuat &&
  sebelum.gambarSisipan === sekarang.gambarSisipan &&
  sebelum.sudutPandang === sekarang.sudutPandang &&
  sebelum.memuat === sekarang.memuat
));
