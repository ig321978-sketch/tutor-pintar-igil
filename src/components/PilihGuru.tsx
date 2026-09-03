"use client";

import { Volume2 } from "lucide-react";
import {
  pasanganGuru,
  putarContohSuaraGuru,
  type KelaminGuru,
} from "@/lib/guru";
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
      <div className="grid gap-3 sm:grid-cols-2">
        {pasanganGuru(kelas).map((guru) => {
          const aktif = nilai === guru.kelamin;
          return (
            <div
              key={guru.kelamin}
              className={`rounded-2xl border-2 p-4 transition-all ${
                aktif
                  ? "border-[#1C01A5] bg-[#1C01A5]/5"
                  : "border-[#1C01A5]/15 bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => onGanti(guru.kelamin)}
                className="w-full text-left"
              >
                <p className="text-3xl" aria-hidden>
                  {guru.kelamin === "wanita" ? "👩‍🏫" : "👨‍🏫"}
                </p>
                <p className="mt-2 font-extrabold text-[#1C01A5]">{guru.nama}</p>
                <p className="text-sm text-slate-600">{guru.peran}</p>
              </button>
              <button
                type="button"
                onClick={() => putarContohSuaraGuru(guru)}
                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#F0AB00] bg-[#F0AB00] px-3 py-2 text-sm font-extrabold text-[#1C01A5] hover:bg-[#e09e00]"
              >
                <Volume2 className="h-4 w-4" />
                Putar suara
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
