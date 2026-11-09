"use client";

import {
  naskahPerkenalanGuru,
  pasanganGuru,
  type KelaminGuru,
} from "@/lib/guru";
import { ucapkanGuruModul } from "@/lib/suara-guru-modul";
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
              aria-pressed={aktif}
              onClick={() => {
                onGanti(guru.kelamin);
                // Pilot suara seragam: contoh suara Kelas 1 sama dengan suara di Materi Kelas 1 Bab 1 Sub-Bab A.
                ucapkanGuruModul(naskahPerkenalanGuru(guru), { kelas, kelamin: guru.kelamin, seragam: kelas === "1 SD" });
              }}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
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
              <div className="min-w-0">
                <p className="text-lg font-extrabold text-[#1C01A5]">{guru.nama}</p>
                <p className="text-sm text-slate-600">{guru.peran}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
