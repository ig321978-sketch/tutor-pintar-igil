"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { BagianIsi, BagianModul } from "@/lib/bagian-modul";

const META: Record<
  BagianIsi,
  { judul: string; ringkas: string; gambar: string }
> = {
  silabus: {
    judul: "Silabus",
    ringkas: "Komponen Kurikulum Merdeka dan materi pokok yang akan dipelajari",
    gambar: "/kartu-modul/silabus.png",
  },
  materi: {
    judul: "Materi",
    ringkas: "Uraian, diagram, rumus, dan dua contoh soal tuntas",
    gambar: "/kartu-modul/materi.png",
  },
  simulasi: {
    judul: "Simulasi",
    ringkas: "Simulasi PhET yang selaras mapel dan bab",
    gambar: "/kartu-modul/simulasi.png",
  },
  latihan: {
    judul: "Latihan",
    ringkas: "10 soal pilihan ganda: 3 reguler dan 7 HOTS",
    gambar: "/kartu-modul/latihan.png",
  },
  praktikum: {
    judul: "Praktikum",
    ringkas: "Rancang ide, jalankan, dan dapatkan umpan balik AI",
    gambar: "/kartu-modul/praktikum.png",
  },
  ujian: {
    judul: "Ujian",
    ringkas: "3 soal uraian: 1 reguler dan 2 HOTS",
    gambar: "/kartu-modul/ujian.png",
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
        const terbuka = aktif === id;
        return (
          <article
            key={id}
            id={`kartu-bagian-${id}`}
            className={`overflow-hidden rounded-none border border-black bg-white transition ${
              terbuka ? "col-span-full" : "hover:bg-slate-50"
            }`}
          >
            <button
              type="button"
              onClick={() => onPilih(id)}
              aria-expanded={terbuka}
              className="w-full text-left"
            >
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-start gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="text-xl font-black text-[#1C01A5]">
                    {item.judul}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-snug text-[#1C01A5]/70">
                    {item.ringkas}
                  </p>
                </div>
                <ChevronDown
                  className={`mt-1 h-5 w-5 shrink-0 text-[#1C01A5]/60 transition-transform ${
                    terbuka ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>
            {terbuka ? (
              <div className="border-t border-black px-4 pb-5 pt-4">
                {isi?.[id] ?? null}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
