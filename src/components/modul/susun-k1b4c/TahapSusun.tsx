"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahSusun } from "./LangkahSusun";
import { PERAYAAN, PERAYAAN_SUARA, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 4 Sub-Bab C: dua belas soal lanjutan Misi Festival
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Pola visual tiap tahap baru, berbeda dari Bab 1 sampai Bab 3
 * dan dari Sub-Bab A: Concrete = alas potong hijau berpetak dengan kemajuan berupa mozaik keping karton yang tertempel,
 * Pictorial = kertas titik dengan lidi yang diletakkan satu per satu, Abstract = tirai panggung beludru dengan pita juri yang muncul.
 * Abstract diakhiri Poin Penting dan perayaan akhir cerita Festival Mainan Kardus. Tanpa skor.
 */

type Tema = "alas" | "titik" | "tirai";
const LATAR: Record<Tema, React.CSSProperties> = {
  alas: {
    backgroundColor: "#15803D",
    backgroundImage:
      "repeating-linear-gradient(0deg,rgba(255,255,255,0.18) 0 1px,transparent 1px 16px),repeating-linear-gradient(90deg,rgba(255,255,255,0.18) 0 1px,transparent 1px 16px),repeating-linear-gradient(0deg,rgba(254,240,138,0.35) 0 2px,transparent 2px 80px)",
  },
  titik: {
    backgroundColor: "#F8FAFC",
    backgroundImage: "radial-gradient(rgba(29,78,216,0.35) 1.4px,transparent 1.6px)",
    backgroundSize: "18px 18px",
  },
  tirai: {
    backgroundColor: "#7F1D1D",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(0,0,0,0.28) 0 10px,rgba(255,255,255,0.06) 10px 22px,rgba(0,0,0,0.18) 22px 30px)",
  },
};
const WARNA_MOZAIK = ["#D6A15E", "#FCA5A5", "#FDE047", "#93C5FD", "#86EFAC", "#F9A8D4"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "alas")
    return (
      <div className="mx-auto grid max-w-md grid-cols-12 gap-0.5 rounded-lg border-2 border-[#FEF08A]/70 bg-[#14532D] p-1" aria-label={`Keping ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            className={`flex h-6 items-center justify-center text-[9px] font-black ${i === nomor ? "animate-pulse border-2 border-[#FEF08A] bg-white text-[#14532D]" : i < nomor ? "text-[#451A03]" : "border border-dashed border-white/40 text-white/40"}`}
            style={{ background: i < nomor ? WARNA_MOZAIK[i % WARNA_MOZAIK.length] : undefined, clipPath: i < nomor && i % 3 === 0 ? "polygon(50% 0,100% 100%,0 100%)" : undefined }}
          >
            {i}
          </span>
        ))}
      </div>
    );
  if (tema === "titik")
    return (
      <div className="mx-auto max-w-md" aria-label={`Lidi ${nomor} dari ${total}`}>
        <svg viewBox="0 0 240 30" className="block w-full" aria-hidden="true">
          {n.map((i) => {
            const x = 8 + (i - 1) * 20;
            const ada = i < nomor;
            const kini = i === nomor;
            return (
              <g key={i}>
                <line x1={x} y1={4} x2={x + 10} y2={26} stroke={ada ? "#B45309" : kini ? "#1D4ED8" : "#CBD5E1"} strokeWidth={ada ? 4 : 2.5} strokeDasharray={ada ? undefined : "3 3"} strokeLinecap="round" />
                {ada ? <circle cx={x} cy={4} r={2.4} fill="#7C2D12" /> : null}
              </g>
            );
          })}
        </svg>
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md justify-center gap-0.5" aria-label={`Pita ${nomor} dari ${total}`}>
      {n.map((i) => (
        <svg key={i} viewBox="0 0 20 30" className={`h-7 w-5 ${i === nomor ? "animate-bounce" : ""}`} aria-hidden="true">
          <path d="M 6 14 L 3 29 L 8 25 L 10 29 L 10 16 Z M 14 14 L 17 29 L 12 25 L 10 29 L 10 16 Z" fill={i < nomor ? "#1D4ED8" : "#78350F"} opacity={i <= nomor ? 1 : 0.4} />
          <circle cx={10} cy={10} r={8} fill={i < nomor ? "#FACC15" : i === nomor ? "#FFFFFF" : "#92400E"} stroke={i <= nomor ? "#FEF3C7" : "#78350F"} strokeWidth={1.6} />
        </svg>
      ))}
    </div>
  );
}

/** Perayaan akhir cerita: piala, konfeti, dan pita juri. */
function Perayaan() {
  const konfeti = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="relative overflow-hidden rounded-2xl border-4 border-[#FACC15] bg-[#1E1B4B] p-3 text-center">
      <style>{`@keyframes sk-jatuh{0%{transform:translateY(-20px) rotate(0)}100%{transform:translateY(150px) rotate(300deg)}}`}</style>
      {konfeti.map((i) => (
        <span
          key={i}
          className="absolute top-0 block h-2.5 w-1.5 rounded-sm"
          style={{ left: `${(i * 37) % 100}%`, background: ["#FACC15", "#F472B6", "#60A5FA", "#34D399"][i % 4], animation: `sk-jatuh ${2 + (i % 5) * 0.4}s linear ${(i % 6) * 0.3}s infinite` }}
          aria-hidden="true"
        />
      ))}
      <p className="text-5xl" aria-hidden="true">
        {"\u{1F3C6}"}
      </p>
      <p className="mt-1 text-lg font-black text-[#FEF08A]">{PERAYAAN}</p>
      <p className="mt-1 text-2xl" aria-hidden="true">
        {"\u{1F682}\u{1F3E0}\u{1F916}\u{1F397}\u{FE0F}\u{1F389}"}
      </p>
    </div>
  );
}

export default function TahapSusun({
  umum,
  rupa,
  soal,
  pita,
  teksAkhir,
  poinPenting = false,
}: {
  umum: Umum;
  rupa: Rupa;
  soal: SoalMisi[];
  pita: { ikon: string; nama: string; cara: string };
  teksAkhir: string;
  poinPenting?: boolean;
}) {
  const tema: Tema = rupa === "benda" ? "alas" : rupa === "diagram" ? "titik" : "tirai";
  const [s, setS] = useState(0);
  const [l, setL] = useState(0);
  const [benar, setBenar] = useState(false);
  const [akhir, setAkhir] = useState(false);
  const so = soal[s];
  const ls = so?.langkah[l];

  useEffect(() => {
    if (!ls || akhir) return;
    umum.speakGuru(l === 0 ? `${NAMA_CARA[so.cara]}. ${so.cerita} ${ls.suara}` : ls.suara);
    // Hanya saat soal berganti.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s, l, akhir]);

  const selesaiTahap = () => {
    umum.hentikan();
    umum.onSelesai();
  };
  const lanjut = () => {
    setBenar(false);
    if (l < so.langkah.length - 1) setL(l + 1);
    else if (s < soal.length - 1) {
      setS(s + 1);
      setL(0);
    } else if (poinPenting) {
      setAkhir(true);
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PERAYAAN_SUARA}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.tirai}>
        <Kemajuan tema="tirai" nomor={13} total={12} />
        <div className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] p-3">
          <p className="text-center text-lg font-black text-[#7F1D1D]">{"\u{1F397}\u{FE0F}"} Poin Penting: Misi Festival selesai!</p>
          <ul className="mt-2 space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#FCA5A5] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7F1D1D] text-[10px] font-black text-[#FDE68A]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <Perayaan />
        <div className="flex justify-center">
          <button type="button" className={TOMBOL_UTAMA} onClick={selesaiTahap}>
            {teksAkhir}
          </button>
        </div>
      </div>
    );
  if (!so || !ls) return null;

  const terakhirSemua = s === soal.length - 1 && l === so.langkah.length - 1;
  const total = soal.reduce((n, x) => n + x.langkah.length, 0);
  const nomor = soal.slice(0, s).reduce((n, x) => n + x.langkah.length, 0) + l + 1;
  const kepala =
    tema === "alas"
      ? "rounded-none border-4 border-[#14532D] bg-[#FEF3C7] [clip-path:polygon(0_6px,6px_0,calc(100%-6px)_0,100%_6px,100%_calc(100%-6px),calc(100%-6px)_100%,6px_100%,0_calc(100%-6px))]"
      : tema === "titik"
        ? "rounded-xl border-2 border-dashed border-[#1D4ED8] bg-white/95"
        : "rounded-xl border-4 border-[#B45309] bg-gradient-to-b from-[#FDE68A] to-[#FACC15] shadow-[0_4px_0_#78350F]";
  const papan = tema === "alas" ? "rounded-md border-4 border-[#14532D]" : tema === "titik" ? "rounded-xl border-2 border-[#1D4ED8]" : "rounded-2xl border-4 border-[#FACC15]";
  return (
    <div className="space-y-3 rounded-3xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${tema === "titik" ? "text-[#1D4ED8]" : tema === "tirai" ? "text-[#7F1D1D]" : "text-[#14532D]"}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className="text-base font-black text-[#1C01A5]">{so.judul}</p>
        <p className="text-sm font-bold text-[#1C01A5]/80">{so.cerita}</p>
      </div>

      <Kemajuan tema={tema} nomor={nomor} total={total} />

      <div className="flex justify-center gap-1.5">
        {soal.map((x, i) => (
          <span key={x.cara} className={`rounded-full px-2.5 py-0.5 text-xs font-black ${i === s ? "bg-[#FACC15] text-[#1C01A5]" : i < s ? "bg-[#DCFCE7] text-[#15803D]" : "bg-white/80 text-[#1C01A5]/50"}`}>
            {IKON_CARA[x.cara]} {NAMA_CARA[x.cara]}
          </span>
        ))}
      </div>

      <div className={`bg-white/95 p-3 ${papan}`}>
        <div className="mb-2 flex items-start gap-2">
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#1D4ED8] bg-[#DBEAFE] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#1D4ED8]">
              Soal {nomor} dari {total} · {IKON_METODE[ls.metode]} {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahSusun key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
      </div>

      {benar ? (
        <div className="flex justify-center">
          <button type="button" onClick={lanjut} className={TOMBOL_UTAMA}>
            {terakhirSemua ? (poinPenting ? "LIHAT POIN PENTING ⬇️" : teksAkhir) : l < so.langkah.length - 1 ? "SOAL BERIKUTNYA ➡️" : `LANJUT: ${NAMA_CARA[soal[s + 1].cara].toUpperCase()} ➡️`}
          </button>
        </div>
      ) : null}
    </div>
  );
}
