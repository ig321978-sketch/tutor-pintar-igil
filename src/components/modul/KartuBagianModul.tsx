"use client";

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  ClipboardList,
  FlaskConical,
  GraduationCap,
  MonitorPlay,
} from "lucide-react";
import type { BagianModul } from "@/lib/bagian-modul";

const META: Record<
  Exclude<BagianModul, "pilih">,
  { judul: string; ringkas: string; ikon: LucideIcon; warna: string }
> = {
  materi: {
    judul: "Materi",
    ringkas: "Uraian, diagram, rumus, dan dua contoh soal tuntas",
    ikon: BookOpen,
    warna: "bg-[#FFF8E8] border-[#F0AB00]",
  },
  simulasi: {
    judul: "Simulasi",
    ringkas: "Simulasi PhET yang selaras mapel dan bab",
    ikon: MonitorPlay,
    warna: "bg-[#EEE9FF] border-[#1C01A5]/35",
  },
  latihan: {
    judul: "Latihan",
    ringkas: "10 soal pilihan ganda: 3 reguler dan 7 HOTS",
    ikon: ClipboardList,
    warna: "bg-[#DDF7E8] border-emerald-400",
  },
  praktikum: {
    judul: "Praktikum",
    ringkas: "Rancang ide, jalankan, dan dapatkan umpan balik AI",
    ikon: FlaskConical,
    warna: "bg-[#FFE4EC] border-rose-300",
  },
  ujian: {
    judul: "Ujian",
    ringkas: "3 soal uraian: 1 reguler dan 2 HOTS",
    ikon: GraduationCap,
    warna: "bg-[#E8E4FF] border-[#1C01A5]/40",
  },
};

export default function KartuBagianModul({
  daftar,
  aktif,
  onPilih,
}: {
  daftar: Array<Exclude<BagianModul, "pilih">>;
  aktif: BagianModul;
  onPilih: (bagian: Exclude<BagianModul, "pilih">) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {daftar.map((id) => {
        const item = META[id];
        const Ikon = item.ikon;
        const dipilih = aktif === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onPilih(id)}
            aria-pressed={dipilih}
            className={`rounded-3xl border-2 p-5 text-left shadow-sm transition hover:shadow-md ${item.warna} ${
              dipilih ? "ring-4 ring-[#1C01A5]/20" : ""
            }`}
          >
            <Ikon className="h-7 w-7 text-[#1C01A5]" />
            <p className="mt-3 text-xl font-black text-[#1C01A5]">{item.judul}</p>
            <p className="mt-1 text-sm font-semibold leading-snug text-[#1C01A5]/70">
              {item.ringkas}
            </p>
          </button>
        );
      })}
    </div>
  );
}
