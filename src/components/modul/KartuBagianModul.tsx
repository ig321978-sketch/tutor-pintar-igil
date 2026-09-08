"use client";

import type { ReactNode } from "react";
import { ChevronDown, Lock } from "lucide-react";
import {
  bagianWajibMateriTuntas,
  type BagianIsi,
  type BagianModul,
} from "@/lib/bagian-modul";

const META: Record<
  BagianIsi,
  { judul: string; ringkas: string; gambar: string }
> = {
  silabus: {
    judul: "Silabus",
    ringkas: "Komponen utama Kurikulum Merdeka yang akan dipelajari",
    gambar: "/kartu-modul/silabus.png",
  },
  materi: {
    judul: "Materi",
    ringkas: "Mode Kurikulum untuk paham konsep, Mode Global untuk trik percepatan",
    gambar: "/kartu-modul/materi.png",
  },
  simulasi: {
    judul: "Simulasi",
    ringkas: "Mainkan lab, kerjakan misi, kirim bukti ke guru AI",
    gambar: "/kartu-modul/simulasi.png",
  },
  latihan: {
    judul: "Latihan",
    ringkas: "10 soal pilihan ganda, dimuat saat kartu dibuka",
    gambar: "/kartu-modul/latihan.png",
  },
  praktikum: {
    judul: "Praktikum",
    ringkas: "Rancang ide, jalankan, dan dapatkan umpan balik AI",
    gambar: "/kartu-modul/praktikum.png",
  },
  ujian: {
    judul: "Ujian",
    ringkas: "3 soal uraian acak tanpa cache, beda setiap sesi",
    gambar: "/kartu-modul/ujian.png",
  },
};

export default function KartuBagianModul({
  daftar,
  aktif,
  isi,
  materiTuntas = false,
  mengunciKlik = false,
  onPilih,
}: {
  daftar: BagianIsi[];
  aktif: BagianModul;
  isi?: Partial<Record<BagianIsi, ReactNode>>;
  materiTuntas?: boolean;
  mengunciKlik?: boolean;
  onPilih: (bagian: BagianIsi) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {daftar.map((id) => {
        const item = META[id];
        const terbuka = aktif === id;
        const terkunci = bagianWajibMateriTuntas(id) && !materiTuntas;
        return (
          <article
            key={id}
            id={`kartu-bagian-${id}`}
            className={`overflow-hidden rounded-none border border-black bg-white transition ${
              terbuka ? "col-span-full" : terkunci ? "opacity-70" : "hover:bg-slate-50"
            }`}
          >
            <button
              type="button"
              onClick={() => {
                if (terkunci || mengunciKlik) return;
                onPilih(id);
              }}
              disabled={mengunciKlik}
              aria-expanded={terbuka}
              aria-disabled={terkunci || mengunciKlik}
              className={`w-full text-left ${mengunciKlik ? "cursor-wait opacity-80" : ""}`}
            >
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className={`h-full w-full object-cover ${terkunci ? "grayscale" : ""}`}
                />
                {terkunci ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/55">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#1C01A5] px-3 py-1.5 text-sm font-extrabold text-white">
                      <Lock className="h-4 w-4" />
                      Terkunci
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="flex items-start gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="text-xl font-black text-[#1C01A5]">
                    {item.judul}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-snug text-[#1C01A5]/70">
                    {terkunci
                      ? "Dengarkan audio Materi sampai tuntas untuk membuka kartu ini."
                      : item.ringkas}
                  </p>
                </div>
                {terkunci ? (
                  <Lock className="mt-1 h-5 w-5 shrink-0 text-[#1C01A5]/60" />
                ) : (
                  <ChevronDown
                    className={`mt-1 h-5 w-5 shrink-0 text-[#1C01A5]/60 transition-transform ${
                      terbuka ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>
            </button>
            {terbuka && !terkunci ? (
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
