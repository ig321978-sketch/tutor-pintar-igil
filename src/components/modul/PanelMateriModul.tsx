"use client";

import { memo } from "react";
import { Loader2, Sparkles } from "lucide-react";
import ModuleRenderer from "@/components/ModuleRenderer";
import { type GambarSisipan } from "@/components/GambarDoodle";
import { jenjangGuru } from "@/lib/guru";

function PanelMateriModul({
  mapel = "",
  materi,
  naskah,
  doodleSrc,
  doodleMemuat,
  gambarSisipan,
  memuat,
  kelas = "",
}: {
  mapel?: string;
  materi: string;
  naskah: string;
  doodleSrc?: string | null;
  doodleMemuat?: boolean;
  gambarSisipan?: GambarSisipan[];
  memuat?: boolean;
  kelas?: string;
}) {
  const tanpaDoodleHero = Boolean(kelas) && jenjangGuru(kelas) === "SD";

  return (
    <article className="space-y-5">
      {tanpaDoodleHero ? null : (
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
      )}
      {memuat && !naskah ? (
        <div className="rounded-2xl bg-white/80 p-8 text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#1C01A5]" />
          <p className="mt-4 text-lg font-extrabold text-[#1C01A5]">
            Menyusun naskah bergambar...
          </p>
        </div>
      ) : null}
      {naskah ? (
        <div className="pt-1">
          <ModuleRenderer
            konten={naskah}
            mapel={mapel}
            materi={materi}
            kelas={kelas}
            className="mt-1"
            gambarSisipan={gambarSisipan}
            doodleMemuat={doodleMemuat}
            sembunyikanJudulUtama
          />
        </div>
      ) : null}
    </article>
  );
}

export default memo(PanelMateriModul, (sebelum, sekarang) => (
  sebelum.mapel === sekarang.mapel &&
  sebelum.materi === sekarang.materi &&
  sebelum.naskah === sekarang.naskah &&
  sebelum.doodleSrc === sekarang.doodleSrc &&
  sebelum.doodleMemuat === sekarang.doodleMemuat &&
  sebelum.gambarSisipan === sekarang.gambarSisipan &&
  sebelum.memuat === sekarang.memuat &&
  sebelum.kelas === sekarang.kelas
));
