"use client";

import { useEffect } from "react";
import {
  naskahPerkenalanGuru,
  pasanganGuru,
  type KelaminGuru,
} from "@/lib/guru";
import { mintaAudioTts, putarTtsPendek } from "@/lib/putar-tts-klien";
import { kelasLabel } from "@/lib/tema";

type PropsPilihGuru = {
  kelas: string;
  nilai: KelaminGuru;
  onGanti: (kelamin: KelaminGuru) => void;
  tanpaLabel?: boolean;
};

export default function PilihGuru({
  kelas,
  nilai,
  onGanti,
  tanpaLabel = false,
}: PropsPilihGuru) {
  useEffect(() => {
    for (const guru of pasanganGuru(kelas)) {
      void mintaAudioTts(
        naskahPerkenalanGuru(guru),
        guru.kelamin,
        kelas,
        { persist: true },
      );
    }
  }, [kelas]);

  return (
    <div>
      {tanpaLabel ? null : (
        <p className={kelasLabel}>Pilih guru pengajar</p>
      )}
      <div className="grid gap-3">
        {pasanganGuru(kelas).map((guru) => {
          const aktif = nilai === guru.kelamin;
          return (
            <button
              key={guru.gambar}
              type="button"
              aria-label={guru.nama}
              aria-pressed={aktif}
              onClick={() => {
                onGanti(guru.kelamin);
                void putarTtsPendek(
                  naskahPerkenalanGuru(guru),
                  guru.kelamin,
                  kelas,
                );
              }}
              className={`flex w-full items-center justify-center rounded-2xl border-2 p-4 transition-all ${
                aktif
                  ? "border-[#1C01A5] bg-[#1C01A5]/5"
                  : "border-[#1C01A5] bg-white"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={guru.gambar}
                alt=""
                className="h-32 w-32 shrink-0 rounded-2xl object-cover"
              />
              <span className="sr-only">{guru.nama}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
