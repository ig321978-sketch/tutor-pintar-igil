"use client";

import type { ReactNode } from "react";
import { ChevronDown, Lock } from "lucide-react";
import {
  bagianWajibKuisMateriTuntas,
  type BagianIsi,
  type BagianModul,
} from "@/lib/bagian-modul";
import { PESAN_KUNCI_KUIS_MATERI } from "@/lib/kuis-materi";
import TungguNaskah, { TEKS_MENYUSUN_NASKAH } from "@/components/modul/TungguNaskah";

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
    ringkas: "Pelajari konsep bab lewat naskah bergambar",
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
  menyusun,
  onPilih,
}: {
  daftar: BagianIsi[];
  aktif: BagianModul;
  isi?: Partial<Record<BagianIsi, ReactNode>>;
  materiTuntas?: boolean;
  mengunciKlik?: boolean;
  menyusun?: Partial<Record<BagianIsi, boolean>>;
  onPilih: (bagian: BagianIsi) => void;
}) {
  const kartu = daftar.map((id) => {
    const item = META[id];
    const terbuka = aktif === id;
    const terkunci = bagianWajibKuisMateriTuntas(id) && !materiTuntas;
    const menunggu = Boolean(menyusun?.[id]);
    const ringkas = terkunci
      ? PESAN_KUNCI_KUIS_MATERI
      : menunggu
        ? TEKS_MENYUSUN_NASKAH
        : item.ringkas;
    return { id, item, terbuka, terkunci, menunggu, ringkas };
  });

  const pilih = (id: BagianIsi, terkunci: boolean) => {
    if (terkunci || mengunciKlik) return;
    onPilih(id);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:hidden">
        {kartu.map(({ id, item, terbuka, terkunci, menunggu, ringkas }) => (
          <button
            key={id}
            type="button"
            data-kartu-bagian={id}
            onClick={() => pilih(id, terkunci)}
            disabled={mengunciKlik || terkunci}
            aria-expanded={terbuka}
            aria-disabled={terkunci || mengunciKlik}
            className={`flex min-h-16 min-w-0 items-center gap-2 rounded-2xl px-2.5 py-2 text-left ${
              terbuka
                ? "border-[#F0AB00] bg-[#1C01A5] text-white"
                : "border-black bg-white text-[#1C01A5]"
            } ${terkunci ? "opacity-70" : ""} ${mengunciKlik ? "cursor-wait opacity-80" : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.gambar}
              alt=""
              className={`h-11 w-11 shrink-0 rounded-lg object-cover ${terkunci ? "grayscale" : ""}`}
            />
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-1 text-sm font-black leading-tight">
                {terkunci ? <Lock className="h-3.5 w-3.5 shrink-0" /> : null}
                {item.judul}
              </span>
              <span
                className={`mt-0.5 line-clamp-2 text-[11px] font-semibold leading-snug ${
                  terbuka ? "text-white/80" : "text-[#1C01A5]/70"
                }`}
              >
                {menunggu ? TEKS_MENYUSUN_NASKAH : ringkas}
              </span>
            </span>
          </button>
        ))}
      </div>

      {kartu.map(({ id, terbuka, terkunci }) =>
        terbuka && !terkunci ? (
          <div
            key={id}
            id={`kartu-bagian-${id}`}
            data-kartu-bagian={id}
            className="isi-modul-hp mt-3 sm:hidden"
          >
            {isi?.[id] ?? null}
          </div>
        ) : null,
      )}

      <div className="hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {kartu.map(({ id, item, terbuka, terkunci, menunggu, ringkas }) => (
          <article
            key={id}
            data-kartu-bagian={id}
            className={`overflow-hidden rounded-none border border-black bg-white transition ${
              terbuka ? "col-span-full" : terkunci ? "opacity-70" : "hover:bg-slate-50"
            }`}
          >
            <button
              type="button"
              onClick={() => pilih(id, terkunci)}
              disabled={mengunciKlik || terkunci}
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
                ) : menunggu ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                    <TungguNaskah padat />
                  </div>
                ) : null}
              </div>
              <div className="flex items-start gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="text-xl font-black text-[#1C01A5]">{item.judul}</p>
                  <p className="mt-1 text-sm font-semibold leading-snug text-[#1C01A5]/70">
                    {ringkas}
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
              <div className="border-t border-black px-4 pb-5 pt-4">{isi?.[id] ?? null}</div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
