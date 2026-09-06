"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  ChevronDown,
  ClipboardList,
  FlaskConical,
  GraduationCap,
  ListChecks,
  MonitorPlay,
} from "lucide-react";
import type { BagianIsi, BagianModul } from "@/lib/bagian-modul";

const META: Record<
  BagianIsi,
  { judul: string; ringkas: string; ikon: LucideIcon; warna: string }
> = {
  silabus: {
    judul: "Silabus",
    ringkas: "Komponen Kurikulum Merdeka dan materi pokok yang akan dipelajari",
    ikon: ListChecks,
    warna: "bg-[#F8F7FF] border-[#1C01A5]/30",
  },
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
  isi,
  onPilih,
}: {
  daftar: BagianIsi[];
  aktif: BagianModul;
  isi?: Partial<Record<BagianIsi, ReactNode>>;
  onPilih: (bagian: BagianIsi) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {daftar.map((id) => {
        const item = META[id];
        const Ikon = item.ikon;
        const terbuka = aktif === id;
        return (
          <article
            key={id}
            id={`kartu-bagian-${id}`}
            className={`rounded-3xl border-2 shadow-sm transition ${item.warna} ${
              terbuka
                ? "col-span-full ring-4 ring-[#1C01A5]/20"
                : "hover:shadow-md"
            }`}
          >
            <button
              type="button"
              onClick={() => onPilih(id)}
              aria-expanded={terbuka}
              className="flex w-full items-start gap-3 p-5 text-left"
            >
              <Ikon className="mt-0.5 h-7 w-7 shrink-0 text-[#1C01A5]" />
              <div className="min-w-0 flex-1">
                <p className="text-xl font-black text-[#1C01A5]">{item.judul}</p>
                <p className="mt-1 text-sm font-semibold leading-snug text-[#1C01A5]/70">
                  {item.ringkas}
                </p>
              </div>
              <ChevronDown
                className={`mt-1 h-5 w-5 shrink-0 text-[#1C01A5]/60 transition-transform ${
                  terbuka ? "rotate-180" : ""
                }`}
              />
            </button>
            {terbuka ? (
              <div className="border-t border-[#1C01A5]/10 px-5 pb-5 pt-4">
                {isi?.[id] ?? null}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
