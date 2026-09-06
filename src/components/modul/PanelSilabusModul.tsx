"use client";

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

export default function PanelSilabusModul({
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
  return (
    <div className="space-y-5">
      <p className="text-sm font-semibold text-[#1C01A5]/75">
        Komponen utama Kurikulum Merdeka Kemendikbudristek.
      </p>
      <div className="space-y-3">
        {silabus.map((item) => (
          <article
            key={item.id}
            className={`flex items-start justify-between gap-3 rounded-none border border-black px-4 py-3 ${
              item.tingkat === "baik"
                ? "bg-emerald-50"
                : item.tingkat === "cukup"
                  ? "bg-[#FFF8E8]"
                  : "bg-rose-50"
            }`}
          >
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#1C01A5]/55">
                Komponen utama
              </p>
              <h4 className="mt-0.5 text-base font-black text-[#1C01A5]">
                {item.judul}
              </h4>
              <p className="mt-1 text-sm font-semibold leading-snug text-[#1C01A5]/75">
                {item.keterangan}
              </p>
            </div>
            <LencanaTingkat tingkat={item.tingkat} />
          </article>
        ))}
      </div>
    </div>
  );
}
