"use client";

import { Loader2, Sparkles, Volume2 } from "lucide-react";
import ModuleRenderer from "@/components/ModuleRenderer";
import type { KartuKonsep } from "@/lib/konsep-materi";
import {
  LABEL_SUDUT,
  type SudutPandangMateri,
} from "@/lib/sudut-pandang";

const WARNA = [
  "bg-[#FFF4CC] border-[#F0AB00]",
  "bg-[#E8E4FF] border-[#1C01A5]/40",
  "bg-[#DDF7E8] border-emerald-400",
  "bg-[#FFE4EC] border-rose-300",
];

export default function PanelMateriModul({
  materi,
  mapel,
  kelas,
  sapaan,
  kartu,
  kartuTerbuka,
  doodleSrc,
  doodleMemuat,
  sudutPandang,
  sedangMemutar = false,
  onGantiSudut,
  onPilihKartu,
}: {
  materi: string;
  mapel: string;
  kelas: string;
  sapaan: string;
  kartu: KartuKonsep[];
  kartuTerbuka: number;
  doodleSrc?: string | null;
  doodleMemuat?: boolean;
  sudutPandang: SudutPandangMateri;
  sedangMemutar?: boolean;
  onGantiSudut: (sudut: SudutPandangMateri) => void;
  onPilihKartu: (indeks: number) => void;
}) {
  const label = LABEL_SUDUT[sudutPandang];

  return (
    <article className="space-y-5">
      <div className="overflow-hidden rounded-2xl border border-[#F0AB00]/40 bg-white/70">
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
        <div className="p-4 sm:p-5">
          <h2 className="text-2xl font-black leading-tight text-[#1C01A5]">
            {materi}
          </h2>
          <p className="mt-1 text-sm font-bold text-[#1C01A5]/70">
            {mapel} - {kelas} - {label.ringkas}
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
      </div>

      <div key={sudutPandang} className="grid gap-3">
        {kartu.map((item, indeks) => {
          const terbuka = kartuTerbuka === indeks;
          return (
            <div
              key={`${sudutPandang}-${item.judul}-${indeks}`}
              className={`rounded-3xl border-2 p-5 shadow-sm ${item.warna || WARNA[indeks % WARNA.length]} ${
                terbuka ? "ring-4 ring-[#1C01A5]/20" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => onPilihKartu(indeks)}
                aria-pressed={terbuka}
                className="flex w-full items-start justify-between gap-3 text-left"
              >
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#1C01A5]/60">
                    Bagian {indeks + 1} · {label.pendek}
                  </p>
                  <h3 className="mt-1 text-lg font-black leading-snug text-[#1C01A5]">
                    {item.judul}
                  </h3>
                </div>
                {sedangMemutar && terbuka ? (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#F0AB00] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#1C01A5]">
                    <Volume2 className="h-3 w-3" />
                    Dibacakan
                  </span>
                ) : null}
              </button>
              {terbuka ? (
                <div className="mt-4 border-t border-[#1C01A5]/10 pt-4">
                  <ModuleRenderer konten={item.naskah || item.isi} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </article>
  );
}
