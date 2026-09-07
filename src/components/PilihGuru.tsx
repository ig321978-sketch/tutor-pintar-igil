"use client";

import { type KelaminGuru } from "@/lib/guru";
import { pasanganGuru } from "@/lib/guru";
import { kelasLabel } from "@/lib/tema";

type PropsPilihGuru = {
  kelas: string;
  nilai: KelaminGuru;
  onGanti: (kelamin: KelaminGuru) => void;
};

export default function PilihGuru({ kelas, nilai, onGanti }: PropsPilihGuru) {
  return (
    <div>
      <p className={kelasLabel}>Pilih guru pengajar</p>
      <div className="grid gap-3">
        {pasanganGuru(kelas).map((guru) => {
          const aktif = nilai === guru.kelamin;
          return (
            <button
              key={guru.kelamin}
              type="button"
              onClick={() => onGanti(guru.kelamin)}
              className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                aktif
                  ? "border-[#1C01A5] bg-[#1C01A5]/5"
                  : "border-[#1C01A5]/15 bg-white"
              }`}
            >
              <p className="text-3xl" aria-hidden>
                {guru.kelamin === "wanita" ? "👩‍🏫" : "👨‍🏫"}
              </p>
              <p className="mt-2 font-extrabold text-[#1C01A5]">{guru.nama}</p>
              <p className="text-sm text-slate-600">{guru.peran}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
