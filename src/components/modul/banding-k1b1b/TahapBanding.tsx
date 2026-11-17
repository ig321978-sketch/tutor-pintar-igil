"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahBanding } from "./LangkahBanding";
import { POIN_PENTING } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 1 Sub-Bab B: dua belas soal lanjutan Misi Hadiah Nenek
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Tiap tahap berpola visual sendiri:
 * Concrete = kardus hadiah dengan deret kado, Pictorial = kertas kotak dengan jalur titik, Abstract = papan angka berubin.
 * Abstract diakhiri Poin Penting. Tanpa skor.
 */

type Tema = "kardus" | "kertas" | "papan";
const TEMA: Record<Tema, { latar: React.CSSProperties; kepala: string; isi: string; teks: string }> = {
  kardus: {
    latar: { background: "repeating-linear-gradient(90deg,#E2C08F 0 18px,#D9B47E 18px 36px)" },
    kepala: "border-[#92400E] bg-[#FDE68A]",
    isi: "border-[#92400E] bg-[#FFF8EC]",
    teks: "text-[#78350F]",
  },
  kertas: {
    latar: { backgroundColor: "#EFF6FF", backgroundImage: "linear-gradient(#BFDBFE 1px,transparent 1px),linear-gradient(90deg,#BFDBFE 1px,transparent 1px)", backgroundSize: "18px 18px" },
    kepala: "border-[#1D4ED8] bg-white",
    isi: "border-[#1D4ED8] bg-white/90",
    teks: "text-[#1D4ED8]",
  },
  papan: {
    latar: { background: "radial-gradient(circle at 30% 20%,#2D14C4,#1C01A5 60%,#12006E)" },
    kepala: "border-[#FFE566] bg-[#1C01A5]",
    isi: "border-[#FFE566] bg-[#F8F7FF]",
    teks: "text-[#FFE566]",
  },
};

/** Penanda kemajuan dua belas soal, berbeda tiap tema. */
function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "kardus")
    return (
      <ol className="flex flex-wrap justify-center gap-1" aria-label="Kado yang sudah dibuka">
        {n.map((i) => (
          <li key={i} aria-current={i === nomor ? "step" : undefined} className={`flex h-8 w-8 items-center justify-center rounded-lg text-lg ${i === nomor ? "scale-125 bg-[#FFE566] ring-2 ring-[#92400E]" : ""}`}>
            {i < nomor ? "\u{2705}" : "\u{1F381}"}
          </li>
        ))}
      </ol>
    );
  if (tema === "kertas")
    return (
      <div className="relative mx-auto h-8 max-w-md" aria-label={`Soal ${nomor} dari ${total}`}>
        <div className="absolute left-3 right-3 top-1/2 h-1 -translate-y-1/2 rounded bg-[#1D4ED8]/40" />
        <ol className="relative flex justify-between">
          {n.map((i) => (
            <li key={i} className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[10px] font-black ${i < nomor ? "border-[#16A34A] bg-[#16A34A] text-white" : i === nomor ? "border-[#1D4ED8] bg-[#FFE566] text-[#1D4ED8]" : "border-[#1D4ED8]/50 bg-white text-[#1D4ED8]/60"}`}>
              {i}
            </li>
          ))}
        </ol>
      </div>
    );
  return (
    <ol className="grid grid-cols-6 gap-1 sm:grid-cols-12" aria-label={`Soal ${nomor} dari ${total}`}>
      {n.map((i) => (
        <li key={i} className={`rounded-md py-1 text-center text-xs font-black ${i < nomor ? "bg-[#FFE566] text-[#1C01A5]" : i === nomor ? "bg-white text-[#DC2626] ring-2 ring-[#FFE566]" : "bg-white/15 text-white/70"}`}>
          {i}
        </li>
      ))}
    </ol>
  );
}

export default function TahapBanding({
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
  const tema: Tema = rupa === "benda" ? "kardus" : rupa === "diagram" ? "kertas" : "papan";
  const t = TEMA[tema];
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING.join(" ")}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl border-4 border-[#FFE566] p-3" style={TEMA.papan.latar}>
        <p className="text-center text-lg font-black text-[#FFE566]">{"\u{2B50}"} Poin Penting: Misi Hadiah Nenek selesai!</p>
        <ol className="space-y-1.5">
          {POIN_PENTING.map((p, i) => (
            <li key={p} className="flex items-start gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
              <span className="rounded-md bg-[#FFE566] px-1.5 font-black">{i + 1}</span>
              {p}
            </li>
          ))}
        </ol>
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
  return (
    <div className="space-y-3 rounded-3xl p-2 sm:p-3" style={t.latar}>
      <style>{CSS_LEMARI}</style>
      <div className={`rounded-2xl border-4 p-2 ${t.kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${tema === "papan" ? "text-white/80" : t.teks}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${tema === "papan" ? "text-[#FFE566]" : "text-[#1C01A5]"}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "papan" ? "text-white" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
      </div>

      <Kemajuan tema={tema} nomor={nomor} total={total} />

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {soal.map((x, i) => (
          <span key={x.cara} className={`rounded-full border-2 px-2.5 py-1 text-xs font-black ${i === s ? "border-[#1C01A5] bg-[#1C01A5] text-[#FFE566]" : i < s ? "border-[#16A34A] bg-[#DCFCE7] text-[#15803D]" : "border-[#1C01A5]/30 bg-white text-[#1C01A5]/60"}`}>
            {IKON_CARA[x.cara]} {NAMA_CARA[x.cara]}
          </span>
        ))}
      </div>

      <div className={`rounded-3xl border-4 p-3 ${t.isi}`}>
        <div className="mb-2 flex items-start gap-2">
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#7C3AED]">
              Soal {nomor} dari {total} · {IKON_METODE[ls.metode]} {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahBanding key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
