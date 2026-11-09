"use client";

import React, { useState } from "react";
import { MulutBuaya } from "./gambar-banding-b";
import { LencanaSuara } from "./tahap-b-gaya";
import { BingkaiTahap } from "./BingkaiTahap";

/* ------------------------------------------------------------------------ */
/* Tahap 2: Mind-map Sub-Bab B. Peta jalan bagi anak: akar di atas, empat     */
/* simpul berkelok. Ketuk simpul untuk mendengar langkahnya. Tidak ada kunci. */
/* ------------------------------------------------------------------------ */

export type LangkahPeta = {
  stepNumber: number;
  stepTitle: string;
  stepDesc: string;
  icon: string;
  flowFrom?: string;
  flowTo?: string;
};

const WARNA = [
  { isi: "#BFDBFE", tepi: "#2563EB", kartu: "#EFF6FF" },
  { isi: "#FBCFE8", tepi: "#DB2777", kartu: "#FDF2F8" },
  { isi: "#FDE68A", tepi: "#D97706", kartu: "#FFFBEB" },
  { isi: "#BBF7D0", tepi: "#16A34A", kartu: "#F0FDF4" },
];

const TITIK_X = { tengah: 50, kiri: 13, kanan: 87 } as const;

function Kelok({ dari, ke }: { dari: keyof typeof TITIK_X; ke: "kiri" | "kanan" }) {
  const a = TITIK_X[dari];
  const b = TITIK_X[ke];
  return (
    <svg viewBox="0 0 100 44" preserveAspectRatio="none" className="block h-11 w-full" aria-hidden="true">
      <path
        d={`M${a} 0 C${a} 28, ${b} 16, ${b} 44`}
        fill="none"
        stroke="#1C01A5"
        strokeOpacity="0.45"
        strokeWidth="4"
        strokeDasharray="2 7"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function PetaPikiranB({
  langkah,
  judul,
  speakGuru,
  maskot,
  uraian = false,
}: {
  langkah: LangkahPeta[];
  judul: string;
  speakGuru: (teks: string) => void;
  maskot?: React.ReactNode;
  /** Tampilkan uraian tiap langkah di layar, selain dibacakan. Dipakai bab dengan materi mendalam. */
  uraian?: boolean;
}) {
  const [didengar, setDidengar] = useState<number[]>([]);
  const semua = didengar.length >= langkah.length;

  const ketuk = (l: LangkahPeta) => {
    speakGuru(`${l.stepTitle}. ${l.stepDesc}`);
    setDidengar((d) => (d.includes(l.stepNumber) ? d : [...d, l.stepNumber]));
  };

  return (
    <BingkaiTahap tahap={2} className="space-y-1">
      <div className="flex items-end gap-2">
        {maskot ?? <MulutBuaya arah="kiri" kelas="h-14 w-24 igil-lompat" />}
        <div className="min-w-0 flex-1 rounded-3xl rounded-bl-md border-4 border-[#1C01A5] bg-white px-3 py-2 text-sm font-black leading-snug text-[#1C01A5]">
          Ketuk bulatan! 👆
        </div>
      </div>

      <div className="mx-auto mt-2 w-fit max-w-full rounded-[2rem] border-4 border-[#1C01A5] bg-[#FFE566] px-5 py-3 text-center shadow-[0_5px_0_rgba(28,1,165,0.25)]">
        <p className="text-[10px] font-black tracking-widest text-[#1C01A5]/70">PETA PIKIRAN</p>
        <p className="text-lg font-black leading-tight text-[#1C01A5]">{judul}</p>
      </div>

      {langkah.map((l, i) => {
        const w = WARNA[i % WARNA.length];
        const kiri = i % 2 === 0;
        const sudah = didengar.includes(l.stepNumber);
        return (
          <React.Fragment key={l.stepNumber}>
            <Kelok dari={i === 0 ? "tengah" : kiri ? "kanan" : "kiri"} ke={kiri ? "kiri" : "kanan"} />
            <button
              type="button"
              aria-label={`Dengarkan langkah ${l.stepNumber}: ${l.stepTitle}`}
              onClick={() => ketuk(l)}
              className={`igil-tanpa-tepi flex w-full items-center gap-3 text-left ${kiri ? "" : "flex-row-reverse text-right"}`}
            >
              <span
                className={`relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 text-5xl shadow-[0_6px_0_rgba(28,1,165,0.22)] ${
                  sudah ? "" : "igil-lompat"
                }`}
                style={{ backgroundColor: w.isi, borderColor: w.tepi }}
              >
                <span aria-hidden="true">{l.icon}</span>
                <span
                  className="absolute -left-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white text-lg font-black text-white"
                  style={{ backgroundColor: w.tepi }}
                >
                  {l.stepNumber}
                </span>
                {sudah ? (
                  <span key="bintang" className="igil-muncul absolute -bottom-2 -right-1 text-2xl" aria-hidden="true">
                    ⭐
                  </span>
                ) : null}
              </span>
              <span
                className="min-w-0 flex-1 space-y-1 rounded-3xl border-4 px-3 py-2 shadow-[0_4px_0_rgba(28,1,165,0.15)]"
                style={{ backgroundColor: w.kartu, borderColor: w.tepi }}
              >
                <span className="block text-base font-black leading-tight text-[#1C01A5]">
                  {l.stepTitle.replace(/^\d+\.\s*/, "")}
                </span>
                {uraian ? <span className="block text-left text-[13px] font-semibold leading-snug text-slate-700">{l.stepDesc}</span> : null}
                {sudah ? (
                  <span className="inline-block rounded-full border-2 border-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 text-base font-black text-[#166534]">
                    ✔
                  </span>
                ) : (
                  <LencanaSuara kelas="h-9 w-9" />
                )}
              </span>
            </button>
          </React.Fragment>
        );
      })}

      <div className="flex items-center justify-center gap-2 pt-3" aria-label={`${didengar.length} dari ${langkah.length} langkah didengar`}>
        {langkah.map((l) => (
          <span key={l.stepNumber} className="text-3xl" aria-hidden="true">
            {didengar.includes(l.stepNumber) ? "⭐" : "☆"}
          </span>
        ))}
      </div>
      <p
        className={`rounded-2xl border-4 px-3 py-2 text-center text-xl font-black leading-snug ${
          semua ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-dashed border-[#1C01A5]/40 bg-white/80 text-[#1C01A5]"
        }`}
      >
        {semua ? "🌟 Hebat!" : uraian ? Array.from({ length: langkah.length }, () => "⭐").join(" ") : "⭐ ⭐ ⭐ ⭐"}
      </p>
    </BingkaiTahap>
  );
}
