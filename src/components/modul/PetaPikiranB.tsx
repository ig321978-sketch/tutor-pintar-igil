"use client";

import React, { useEffect, useRef, useState } from "react";
import { MulutBuaya } from "./gambar-banding-b";
import { LencanaSuara } from "./tahap-b-gaya";
import { BingkaiTahap } from "./BingkaiTahap";

/* ------------------------------------------------------------------------ */
/* Tahap 2: Mind-map. Teks layar = judul + subjudul saja. Penjelasan penuh    */
/* dibacakan suara guru saat simpul diketuk. Enam gaya visual per kelas SD.  */
/* ------------------------------------------------------------------------ */

export const IGIL_PETA_UI = "peta-per-kelas-v2-dalam";

export type LangkahPeta = {
  stepNumber: number;
  stepTitle: string;
  stepDesc: string;
  icon: string;
  flowFrom?: string;
  flowTo?: string;
};

export type KelasPeta = 1 | 2 | 3 | 4 | 5 | 6;

const WARNA = [
  { isi: "#BFDBFE", tepi: "#2563EB", kartu: "#EFF6FF" },
  { isi: "#FBCFE8", tepi: "#DB2777", kartu: "#FDF2F8" },
  { isi: "#FDE68A", tepi: "#D97706", kartu: "#FFFBEB" },
  { isi: "#BBF7D0", tepi: "#16A34A", kartu: "#F0FDF4" },
  { isi: "#DDD6FE", tepi: "#7C3AED", kartu: "#F5F3FF" },
  { isi: "#FED7AA", tepi: "#EA580C", kartu: "#FFF7ED" },
];

const TITIK_X = { tengah: 50, kiri: 13, kanan: 87 } as const;

const LABEL_GAYA: Record<KelasPeta, string> = {
  1: "Pohon langkah",
  2: "Bintang pusat",
  3: "Tangga naik",
  4: "Batu sungai",
  5: "Sarang lebah",
  6: "Jaringan konsep",
};

function judulBersih(teks: string) {
  return teks.replace(/^\d+\.\s*/, "");
}

function alurAngka(s?: string) {
  return !s || /^(?:\d+|START|END)$/i.test(s.trim());
}

/** Subjudul visual: alur konsep bermakna; jangan tampilkan "1 → 3". */
function subJudul(l: LangkahPeta) {
  if (l.flowFrom && l.flowTo && !alurAngka(l.flowFrom) && !alurAngka(l.flowTo)) {
    return `${l.flowFrom} → ${l.flowTo}`;
  }
  const d = String(l.stepDesc || "").replace(/\s+/g, " ").trim();
  if (d) {
    const potong = (d.split(/(?<=[.!?])\s/)[0] || d).trim();
    return potong.length > 72 ? `${potong.slice(0, 70)}…` : potong;
  }
  return "Ketuk untuk dengar penjelasan";
}

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

function KartuTeks({
  l,
  sudah,
  w,
  rata = "kiri",
}: {
  l: LangkahPeta;
  sudah: boolean;
  w: (typeof WARNA)[number];
  rata?: "kiri" | "kanan" | "tengah";
}) {
  const align = rata === "kanan" ? "text-right" : rata === "tengah" ? "text-center" : "text-left";
  return (
    <span
      className={`min-w-0 flex-1 space-y-1 rounded-3xl border-4 px-3 py-2 shadow-[0_4px_0_rgba(28,1,165,0.15)] ${align}`}
      style={{ backgroundColor: w.kartu, borderColor: w.tepi }}
    >
      <span className="block text-base font-black leading-tight text-[#1C01A5]">{judulBersih(l.stepTitle)}</span>
      <span className="block text-[11px] font-bold leading-snug text-[#1C01A5]/70">{subJudul(l)}</span>
      {sudah ? (
        <span className="inline-block rounded-full border-2 border-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 text-base font-black text-[#166534]">
          ✔ Didengar
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-[11px] font-black text-[#1C01A5]/80">
          <LencanaSuara kelas="h-8 w-8" /> Dengarkan penjelasan
        </span>
      )}
    </span>
  );
}

function BulatIkon({
  l,
  sudah,
  w,
  ukuran = "besar",
}: {
  l: LangkahPeta;
  sudah: boolean;
  w: (typeof WARNA)[number];
  ukuran?: "besar" | "sedang" | "kecil";
}) {
  const ukuranKelas = ukuran === "besar" ? "h-24 w-24 text-5xl" : ukuran === "sedang" ? "h-20 w-20 text-4xl" : "h-16 w-16 text-3xl";
  const badge = ukuran === "kecil" ? "h-7 w-7 text-sm" : "h-9 w-9 text-lg";
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center rounded-full border-4 shadow-[0_6px_0_rgba(28,1,165,0.22)] ${ukuranKelas} ${
        sudah ? "" : "igil-lompat"
      }`}
      style={{ backgroundColor: w.isi, borderColor: w.tepi }}
    >
      <span aria-hidden="true">{l.icon}</span>
      <span
        className={`absolute -left-1 -top-1 flex items-center justify-center rounded-full border-4 border-white font-black text-white ${badge}`}
        style={{ backgroundColor: w.tepi }}
      >
        {l.stepNumber}
      </span>
      {sudah ? (
        <span className="igil-muncul absolute -bottom-2 -right-1 text-2xl" aria-hidden="true">
          ⭐
        </span>
      ) : null}
    </span>
  );
}

function SimpulBaris({
  l,
  sudah,
  w,
  kiri,
  onKetuk,
}: {
  l: LangkahPeta;
  sudah: boolean;
  w: (typeof WARNA)[number];
  kiri: boolean;
  onKetuk: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Dengarkan penjelasan langkah ${l.stepNumber}: ${judulBersih(l.stepTitle)}`}
      onClick={onKetuk}
      className={`igil-tanpa-tepi flex w-full items-center gap-3 ${kiri ? "" : "flex-row-reverse"}`}
    >
      <BulatIkon l={l} sudah={sudah} w={w} />
      <KartuTeks l={l} sudah={sudah} w={w} rata={kiri ? "kiri" : "kanan"} />
    </button>
  );
}

/** Kelas 1 — pohon berkelok kiri-kanan (gaya awal). */
function GayaPohon({
  langkah,
  didengar,
  ketuk,
}: {
  langkah: LangkahPeta[];
  didengar: number[];
  ketuk: (l: LangkahPeta) => void;
}) {
  return (
    <>
      {langkah.map((l, i) => {
        const w = WARNA[i % WARNA.length];
        const kiri = i % 2 === 0;
        return (
          <React.Fragment key={l.stepNumber}>
            <Kelok dari={i === 0 ? "tengah" : kiri ? "kanan" : "kiri"} ke={kiri ? "kiri" : "kanan"} />
            <SimpulBaris l={l} sudah={didengar.includes(l.stepNumber)} w={w} kiri={kiri} onKetuk={() => ketuk(l)} />
          </React.Fragment>
        );
      })}
    </>
  );
}

/** Kelas 2 — bintang: pusat di tengah, simpul mengelilingi dalam kisi 2 kolom. */
function GayaBintang({
  langkah,
  didengar,
  ketuk,
}: {
  langkah: LangkahPeta[];
  didengar: number[];
  ketuk: (l: LangkahPeta) => void;
}) {
  return (
    <div className="relative mx-auto max-w-lg space-y-3 pt-2">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#FFE566] bg-[#1C01A5] text-2xl shadow-[0_4px_0_rgba(240,171,0,0.5)]" aria-hidden="true">
        ⭐
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {langkah.map((l, i) => {
          const w = WARNA[i % WARNA.length];
          const sudah = didengar.includes(l.stepNumber);
          return (
            <button
              key={l.stepNumber}
              type="button"
              aria-label={`Dengarkan penjelasan langkah ${l.stepNumber}: ${judulBersih(l.stepTitle)}`}
              onClick={() => ketuk(l)}
              className="igil-tanpa-tepi flex flex-col items-center gap-2 rounded-3xl border-4 p-3 text-center shadow-[0_5px_0_rgba(28,1,165,0.18)]"
              style={{ backgroundColor: w.kartu, borderColor: w.tepi }}
            >
              <BulatIkon l={l} sudah={sudah} w={w} ukuran="sedang" />
              <span className="text-sm font-black leading-tight text-[#1C01A5]">{judulBersih(l.stepTitle)}</span>
              <span className="text-[10px] font-bold leading-snug text-[#1C01A5]/70">{subJudul(l)}</span>
              {sudah ? (
                <span className="rounded-full border-2 border-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 text-xs font-black text-[#166534]">✔ Didengar</span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#1C01A5]/80">
                  <LencanaSuara kelas="h-7 w-7" /> Dengarkan
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Kelas 3 — tangga naik: setiap anak tangga menjorok bergantian. */
function GayaTangga({
  langkah,
  didengar,
  ketuk,
}: {
  langkah: LangkahPeta[];
  didengar: number[];
  ketuk: (l: LangkahPeta) => void;
}) {
  return (
    <div className="space-y-2 pt-2">
      {langkah.map((l, i) => {
        const w = WARNA[i % WARNA.length];
        const sudah = didengar.includes(l.stepNumber);
        const pad = `${Math.min(i * 8, 40)}px`;
        return (
          <div key={l.stepNumber} style={{ paddingLeft: pad }}>
            <button
              type="button"
              aria-label={`Dengarkan penjelasan langkah ${l.stepNumber}: ${judulBersih(l.stepTitle)}`}
              onClick={() => ketuk(l)}
              className="igil-tanpa-tepi flex w-full items-center gap-3 rounded-2xl border-4 border-b-[10px] bg-white p-2 shadow-[0_3px_0_rgba(28,1,165,0.2)]"
              style={{ borderColor: w.tepi }}
            >
              <BulatIkon l={l} sudah={sudah} w={w} ukuran="sedang" />
              <KartuTeks l={l} sudah={sudah} w={w} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

/** Kelas 4 — batu di sungai: gulir mendatar. */
function GayaSungai({
  langkah,
  didengar,
  ketuk,
}: {
  langkah: LangkahPeta[];
  didengar: number[];
  ketuk: (l: LangkahPeta) => void;
}) {
  return (
    <div className="rounded-[1.5rem] border-4 border-[#1C01A5]/30 bg-gradient-to-b from-[#DBEAFE] to-[#BFDBFE] p-3">
      <div
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-color:#FFE566_#1C01A5] [scrollbar-width:thin]"
        role="list"
        aria-label="Langkah peta pikiran menyamping"
      >
        {langkah.map((l, i) => {
          const w = WARNA[i % WARNA.length];
          const sudah = didengar.includes(l.stepNumber);
          return (
            <button
              key={l.stepNumber}
              type="button"
              role="listitem"
              aria-label={`Dengarkan penjelasan langkah ${l.stepNumber}: ${judulBersih(l.stepTitle)}`}
              onClick={() => ketuk(l)}
              className="igil-tanpa-tepi w-[min(70vw,14rem)] shrink-0 snap-start flex flex-col items-center gap-2 rounded-[2rem] border-4 px-3 py-4 shadow-[0_6px_0_rgba(28,1,165,0.2)]"
              style={{ backgroundColor: w.kartu, borderColor: w.tepi }}
            >
              <BulatIkon l={l} sudah={sudah} w={w} ukuran="sedang" />
              <span className="text-center text-sm font-black leading-tight text-[#1C01A5]">{judulBersih(l.stepTitle)}</span>
              <span className="text-center text-[10px] font-bold leading-snug text-[#1C01A5]/70">{subJudul(l)}</span>
              {sudah ? (
                <span className="rounded-full border-2 border-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 text-xs font-black text-[#166534]">✔</span>
              ) : (
                <LencanaSuara kelas="h-8 w-8" />
              )}
            </button>
          );
        })}
      </div>
      <p className="mt-1 text-center text-[10px] font-black text-[#1C01A5]/70">Geser ke samping · ketuk batu untuk mendengar</p>
    </div>
  );
}

/** Kelas 5 — sarang lebah: kisi hex-ish (rounded hex via clip). */
function GayaLebah({
  langkah,
  didengar,
  ketuk,
}: {
  langkah: LangkahPeta[];
  didengar: number[];
  ketuk: (l: LangkahPeta) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {langkah.map((l, i) => {
        const w = WARNA[i % WARNA.length];
        const sudah = didengar.includes(l.stepNumber);
        return (
          <button
            key={l.stepNumber}
            type="button"
            aria-label={`Dengarkan penjelasan langkah ${l.stepNumber}: ${judulBersih(l.stepTitle)}`}
            onClick={() => ketuk(l)}
            className="igil-tanpa-tepi flex flex-col items-center gap-1.5 border-4 px-2 py-3 shadow-[0_5px_0_rgba(28,1,165,0.18)]"
            style={{
              backgroundColor: w.kartu,
              borderColor: w.tepi,
              clipPath: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
              minHeight: "11.5rem",
            }}
          >
            <BulatIkon l={l} sudah={sudah} w={w} ukuran="kecil" />
            <span className="px-1 text-center text-xs font-black leading-tight text-[#1C01A5]">{judulBersih(l.stepTitle)}</span>
            <span className="px-1 text-center text-[9px] font-bold leading-snug text-[#1C01A5]/70">{subJudul(l)}</span>
            {sudah ? <span className="text-sm">⭐</span> : <LencanaSuara kelas="h-7 w-7" />}
          </button>
        );
      })}
    </div>
  );
}

/** Kelas 6 — jaringan: daftar vertikal dengan jalur nomor di kiri. */
function GayaJaringan({
  langkah,
  didengar,
  ketuk,
}: {
  langkah: LangkahPeta[];
  didengar: number[];
  ketuk: (l: LangkahPeta) => void;
}) {
  return (
    <div className="relative space-y-0 pl-2">
      <div className="absolute bottom-4 left-[1.65rem] top-4 w-1 rounded-full bg-[#1C01A5]/25" aria-hidden="true" />
      {langkah.map((l, i) => {
        const w = WARNA[i % WARNA.length];
        const sudah = didengar.includes(l.stepNumber);
        return (
          <div key={l.stepNumber} className="relative flex gap-3 py-2">
            <span
              className="relative z-[1] mt-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white text-sm font-black text-white shadow"
              style={{ backgroundColor: w.tepi }}
            >
              {l.stepNumber}
            </span>
            <button
              type="button"
              aria-label={`Dengarkan penjelasan langkah ${l.stepNumber}: ${judulBersih(l.stepTitle)}`}
              onClick={() => ketuk(l)}
              className="igil-tanpa-tepi flex min-w-0 flex-1 items-start gap-2 rounded-2xl border-4 p-3 text-left shadow-[0_4px_0_rgba(28,1,165,0.15)]"
              style={{ backgroundColor: w.kartu, borderColor: w.tepi }}
            >
              <span className="text-3xl leading-none" aria-hidden="true">
                {l.icon}
              </span>
              <span className="min-w-0 flex-1 space-y-1">
                <span className="block text-base font-black leading-tight text-[#1C01A5]">{judulBersih(l.stepTitle)}</span>
                <span className="block text-[11px] font-bold leading-snug text-[#1C01A5]/70">{subJudul(l)}</span>
                {sudah ? (
                  <span className="inline-block rounded-full border-2 border-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 text-xs font-black text-[#166534]">
                    ✔ Didengar
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-[#1C01A5]/80">
                    <LencanaSuara kelas="h-7 w-7" /> Dengarkan penjelasan
                  </span>
                )}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function PetaPikiranB({
  langkah,
  judul,
  speakGuru,
  maskot,
  uraian: _uraian = false,
  kelas = 1,
}: {
  langkah: LangkahPeta[];
  judul: string;
  speakGuru: (teks: string, selesai?: () => void) => void;
  maskot?: React.ReactNode;
  /** Diabaikan: uraian panjang hanya lewat suara, bukan teks layar. */
  uraian?: boolean;
  /** Gaya visual berbeda per kelas SD (1–6). */
  kelas?: KelasPeta;
}) {
  const [didengar, setDidengar] = useState<number[]>([]);
  const [sedang, setSedang] = useState<number | null>(null);
  const introSudah = useRef(false);
  const semua = didengar.length >= langkah.length;
  const gaya = (Math.min(6, Math.max(1, kelas || 1)) as KelasPeta);

  const ketuk = (l: LangkahPeta) => {
    const judulLangkah = judulBersih(l.stepTitle);
    const alur = l.flowFrom && l.flowTo ? ` Dari ${l.flowFrom} menuju ${l.flowTo}.` : "";
    setSedang(l.stepNumber);
    speakGuru(`${judulLangkah}.${alur} ${l.stepDesc}`, () => {
      setSedang(null);
      setDidengar((d) => (d.includes(l.stepNumber) ? d : [...d, l.stepNumber]));
    });
  };

  useEffect(() => {
    if (introSudah.current || langkah.length === 0) return;
    introSudah.current = true;
    const t = window.setTimeout(() => {
      speakGuru(
        `Ini peta pikiran ${judul}. Ada ${langkah.length} langkah. Ketuk setiap langkah untuk mendengar penjelasannya.`,
      );
    }, 450);
    return () => window.clearTimeout(t);
  }, [judul, langkah.length, speakGuru]);

  const isiGaya =
    gaya === 2 ? (
      <GayaBintang langkah={langkah} didengar={didengar} ketuk={ketuk} />
    ) : gaya === 3 ? (
      <GayaTangga langkah={langkah} didengar={didengar} ketuk={ketuk} />
    ) : gaya === 4 ? (
      <GayaSungai langkah={langkah} didengar={didengar} ketuk={ketuk} />
    ) : gaya === 5 ? (
      <GayaLebah langkah={langkah} didengar={didengar} ketuk={ketuk} />
    ) : gaya === 6 ? (
      <GayaJaringan langkah={langkah} didengar={didengar} ketuk={ketuk} />
    ) : (
      <GayaPohon langkah={langkah} didengar={didengar} ketuk={ketuk} />
    );

  return (
    <div data-igil-peta-ui={IGIL_PETA_UI} data-igil-peta-kelas={gaya}>
      <BingkaiTahap tahap={2} className="space-y-1">
        <div className="flex items-end gap-2">
          {maskot ?? <MulutBuaya arah="kiri" kelas="h-14 w-24 igil-lompat" />}
          <div className="min-w-0 flex-1 rounded-3xl rounded-bl-md border-4 border-[#1C01A5] bg-white px-3 py-2 text-sm font-black leading-snug text-[#1C01A5]">
            Ketuk langkah — guru menjelaskan dengan suara! 🔊
          </div>
        </div>

        <div className="mx-auto mt-2 w-fit max-w-full rounded-[2rem] border-4 border-[#1C01A5] bg-[#FFE566] px-5 py-3 text-center shadow-[0_5px_0_rgba(28,1,165,0.25)]">
          <p className="text-[10px] font-black tracking-widest text-[#1C01A5]/70">
            PETA PIKIRAN · KELAS {gaya} · {LABEL_GAYA[gaya].toUpperCase()}
          </p>
          <p className="text-lg font-black leading-tight text-[#1C01A5]">{judul}</p>
        </div>

        {isiGaya}

        <div className="flex items-center justify-center gap-2 pt-3" aria-label={`${didengar.length} dari ${langkah.length} langkah didengar`}>
          {langkah.map((l) => (
            <span key={l.stepNumber} className="text-3xl" aria-hidden="true">
              {didengar.includes(l.stepNumber) ? "⭐" : "☆"}
            </span>
          ))}
        </div>
        <p
          className={`rounded-2xl border-4 px-3 py-2 text-center text-base font-black leading-snug ${
            semua ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-dashed border-[#1C01A5]/40 bg-white/80 text-[#1C01A5]"
          }`}
        >
          {sedang !== null
            ? `🔊 Sedang dibacakan langkah ${sedang}… Centang ✔ muncul setelah selesai.`
            : semua
              ? "🌟 Hebat! Semua penjelasan sudah didengar."
              : `🔊 ${didengar.length}/${langkah.length} penjelasan didengar — centang muncul setelah suara selesai`}
        </p>
      </BingkaiTahap>
    </div>
  );
}
