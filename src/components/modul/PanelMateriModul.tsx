"use client";

import { memo } from "react";
import { Loader2, Sparkles } from "lucide-react";
import ModuleRenderer from "@/components/ModuleRenderer";
import { type GambarSisipan } from "@/components/GambarDoodle";
import { LABEL_SUDUT, type SudutPandangMateri } from "@/lib/sudut-pandang";

function pecahReferensiUrl(nilai?: string): string[] {
  if (!nilai?.trim()) return [];
  const seen = new Set<string>();
  const hasil: string[] = [];
  for (const potong of nilai.split(/[\n,]+/)) {
    const url = potong.trim();
    if (!/^https?:\/\//i.test(url) || seen.has(url)) continue;
    seen.add(url);
    hasil.push(url);
  }
  return hasil;
}

function PanelMateriModul({
  materi,
  sapaan,
  naskah,
  doodleSrc,
  doodleMemuat,
  gambarSisipan,
  sudutPandang,
  onGantiSudut,
  referensiUrl,
  memuat,
}: {
  materi: string;
  sapaan: string;
  naskah: string;
  doodleSrc?: string | null;
  doodleMemuat?: boolean;
  gambarSisipan?: GambarSisipan[];
  sudutPandang: SudutPandangMateri | null;
  onGantiSudut: (sudut: SudutPandangMateri) => void;
  referensiUrl?: string;
  memuat?: boolean;
}) {
  const daftarPustaka = pecahReferensiUrl(referensiUrl);
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
          {label?.ringkas ?? "Pilih Mode Kurikulum atau Mode Global untuk memuat naskah."}
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
            aria-pressed={sudutPandang === "kurikulum"}
            className={`flex-1 rounded-2xl px-3 py-3 text-sm font-extrabold ${
              sudutPandang === "kurikulum"
                ? "bg-[#1C01A5] text-white"
                : "bg-white text-[#1C01A5]"
            }`}
          >
            Mode Kurikulum
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
            Mode Global
          </button>
        </div>
      </div>
      {memuat && !naskah ? (
        <div className="rounded-2xl bg-white/80 p-8 text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#1C01A5]" />
          <p className="mt-4 text-lg font-extrabold text-[#1C01A5]">
            {sudutPandang === "global"
              ? "Menyusun naskah Mode Global..."
              : "Menyusun naskah Mode Kurikulum..."}
          </p>
        </div>
      ) : null}
      {sudutPandang && naskah ? (
        <div key={sudutPandang} className="border-t border-[#1C01A5]/10 pt-5">
          <ModuleRenderer
            konten={naskah}
            className="mt-1"
            gambarSisipan={gambarSisipan}
            doodleMemuat={doodleMemuat}
          />
        </div>
      ) : null}
      {!memuat && !sudutPandang ? (
        <p className="text-sm font-semibold text-[#1C01A5]/70">
          Naskah belum dimuat. Klik salah satu mode di atas — hanya mode itu yang disusun, supaya lebih cepat.
        </p>
      ) : null}
      {daftarPustaka.length > 0 && sudutPandang === "kurikulum" && naskah ? (
        <aside className="border-t border-[#1C01A5]/10 pt-4">
          <p className="text-xs font-extrabold uppercase tracking-wide text-[#1C01A5]/70">
            Sumber referensi
          </p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
            {daftarPustaka.map((url) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all font-semibold text-[#1C01A5] underline-offset-2 hover:underline"
                >
                  {url.replace(/^https?:\/\//i, "")}
                </a>
              </li>
            ))}
          </ol>
        </aside>
      ) : null}
    </article>
  );
}

export default memo(PanelMateriModul, (sebelum, sekarang) => (
  sebelum.materi === sekarang.materi &&
  sebelum.sapaan === sekarang.sapaan &&
  sebelum.naskah === sekarang.naskah &&
  sebelum.doodleSrc === sekarang.doodleSrc &&
  sebelum.doodleMemuat === sekarang.doodleMemuat &&
  sebelum.gambarSisipan === sekarang.gambarSisipan &&
  sebelum.sudutPandang === sekarang.sudutPandang &&
  sebelum.referensiUrl === sekarang.referensiUrl &&
  sebelum.memuat === sekarang.memuat
));
