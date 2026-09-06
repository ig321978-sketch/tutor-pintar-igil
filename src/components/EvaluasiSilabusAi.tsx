"use client";

import { ClipboardList } from "lucide-react";
import {
  LABEL_TINGKAT,
  susunSilabusMerdeka,
  type TingkatSilabus,
} from "@/lib/silabus-merdeka";

function LencanaTingkat({ tingkat }: { tingkat: TingkatSilabus }) {
  const label = LABEL_TINGKAT[tingkat];
  const gaya =
    tingkat === "baik"
      ? "bg-emerald-600 text-white"
      : tingkat === "cukup"
        ? "bg-[#F0AB00] text-[#1C01A5]"
        : "bg-rose-600 text-white";
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${gaya}`}
    >
      {label.teks}
    </span>
  );
}

export default function EvaluasiSilabusAi({
  kelas,
  mapel,
  materi,
  naskahKurikulum,
}: {
  kelas: string;
  mapel: string;
  materi: string;
  naskahKurikulum: string;
}) {
  const silabus = susunSilabusMerdeka({
    kelas,
    mapel,
    materi,
    naskahKurikulum,
  });
  const kerangka = silabus.filter((item) => item.kelompok === "kerangka");
  const materiPokok = silabus.filter((item) => item.kelompok === "materi");
  const kosong = !naskahKurikulum.trim();

  return (
    <details className="rounded-3xl border border-[#1C01A5]/15 bg-[#F8F7FF] px-5 py-4">
      <summary className="flex cursor-pointer list-none items-center gap-2 font-extrabold text-[#1C01A5] [&::-webkit-details-marker]:hidden">
        <ClipboardList className="h-5 w-5 shrink-0 text-[#F0AB00]" />
        <span>Evaluasi Silabus AI</span>
        <span className="ml-auto text-xs font-bold uppercase tracking-wider text-[#1C01A5]/50">
          Buka / tutup
        </span>
      </summary>
      <div className="mt-4 space-y-3 text-sm">
        <p className="font-semibold leading-snug text-[#1C01A5]/70">
          Skor komponen Kurikulum Merdeka dari naskah cache. Merah = kurang ·
          kuning = cukup · hijau = baik.
        </p>
        {kosong ? (
          <p className="rounded-2xl border border-dashed border-[#1C01A5]/20 bg-white px-4 py-3 font-semibold text-slate-500">
            Naskah Kurikulum Sekolah masih kosong, jadi evaluasi belum bisa
            dihitung.
          </p>
        ) : null}
        {kerangka.map((item) => (
          <article
            key={item.id}
            className={`flex items-start justify-between gap-3 rounded-2xl border px-3 py-2.5 ${
              item.tingkat === "baik"
                ? "border-emerald-200 bg-emerald-50"
                : item.tingkat === "cukup"
                  ? "border-[#F0AB00]/50 bg-[#FFF8E8]"
                  : "border-rose-200 bg-rose-50"
            }`}
          >
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#1C01A5]/50">
                Komponen utama
              </p>
              <h4 className="mt-0.5 text-sm font-black text-[#1C01A5]">
                {item.judul}
              </h4>
              <p className="mt-1 text-xs font-semibold leading-snug text-[#1C01A5]/70">
                {item.keterangan}
              </p>
            </div>
            <LencanaTingkat tingkat={item.tingkat} />
          </article>
        ))}
        {materiPokok.length > 0 ? (
          <div className="pt-1">
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#1C01A5]/50">
              Materi pokok · tujuan subbab buku siswa
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {materiPokok.map((item, indeks) => (
                <article
                  key={item.id}
                  className={`flex items-start justify-between gap-3 rounded-2xl border px-3 py-2.5 ${
                    item.tingkat === "baik"
                      ? "border-emerald-200 bg-emerald-50"
                      : item.tingkat === "cukup"
                        ? "border-[#F0AB00]/50 bg-[#FFF8E8]"
                        : "border-rose-200 bg-rose-50"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#1C01A5]/45">
                      {indeks + 1}
                    </p>
                    <h4 className="text-sm font-black leading-snug text-[#1C01A5]">
                      {item.judul}
                    </h4>
                    <p className="mt-1 text-xs font-semibold leading-snug text-[#1C01A5]/70">
                      {item.keterangan}
                    </p>
                  </div>
                  <LencanaTingkat tingkat={item.tingkat} />
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </details>
  );
}
