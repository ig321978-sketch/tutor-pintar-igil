"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahPanen } from "./LangkahPanen";
import { POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 2 Sub-Bab B: dua belas soal lanjutan Misi Panen
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Pola visual tiap tahap berbeda dari Sub-Bab A:
 * Concrete = anyaman keranjang dengan kemajuan berupa keranjang yang terisi, Pictorial = cetak biru berkisi putih dengan
 * kemajuan berupa garis bilangan yang dilompati, Abstract = nota kertas bergaris dengan kemajuan berupa cap centang.
 * Abstract diakhiri Poin Penting. Tanpa skor.
 */

type Tema = "anyaman" | "cetakbiru" | "nota";
const LATAR: Record<Tema, React.CSSProperties> = {
  anyaman: {
    backgroundColor: "#D9A35B",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(120,53,15,0.35) 0 6px,transparent 6px 14px),repeating-linear-gradient(90deg,rgba(255,237,213,0.35) 0 6px,transparent 6px 14px)",
  },
  cetakbiru: {
    backgroundColor: "#1E3A8A",
    backgroundImage: "linear-gradient(rgba(255,255,255,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.18) 1px,transparent 1px)",
    backgroundSize: "20px 20px",
  },
  nota: {
    backgroundColor: "#FFFDF5",
    backgroundImage: "repeating-linear-gradient(180deg,transparent 0 27px,rgba(148,163,184,0.35) 27px 28px)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "anyaman")
    return (
      <div className="mx-auto flex max-w-md justify-between rounded-full bg-[#78350F]/70 px-2 py-1" aria-label={`Keranjang ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span key={i} className={`text-lg leading-none ${i < nomor ? "" : i === nomor ? "animate-bounce" : "opacity-30 grayscale"}`} aria-hidden="true">
            {"\u{1F9FA}"}
          </span>
        ))}
      </div>
    );
  if (tema === "cetakbiru")
    return (
      <div className="mx-auto max-w-md px-3" aria-label={`Soal ${nomor} dari ${total}`}>
        <div className="relative h-10">
          <span className="absolute left-0 right-0 top-6 h-0.5 bg-white" />
          {n.map((i) => (
            <span key={i} className="absolute top-5 flex -translate-x-1/2 flex-col items-center" style={{ left: `${((i - 1) / (total - 1)) * 100}%` }}>
              <span className={`h-3 w-0.5 ${i <= nomor ? "bg-[#FDE047]" : "bg-white/60"}`} />
              <span className={`text-[9px] font-black ${i === nomor ? "text-[#FDE047]" : "text-white/80"}`}>{i}</span>
            </span>
          ))}
          <span className="absolute top-0 -translate-x-1/2 text-base" style={{ left: `${((nomor - 1) / (total - 1)) * 100}%` }} aria-hidden="true">
            {"\u{1F407}"}
          </span>
        </div>
      </div>
    );
  return (
    <div className="flex flex-wrap justify-center gap-1" aria-label={`Soal ${nomor} dari ${total}`}>
      {n.map((i) => (
        <span
          key={i}
          className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[11px] font-black ${i < nomor ? "-rotate-12 border-[#DC2626] text-[#DC2626]" : i === nomor ? "border-dashed border-[#1C01A5] text-[#1C01A5]" : "border-[#CBD5E1] text-[#94A3B8]"}`}
        >
          {i < nomor ? "\u{2713}" : i}
        </span>
      ))}
    </div>
  );
}

export default function TahapPanen({
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
  const tema: Tema = rupa === "benda" ? "anyaman" : rupa === "diagram" ? "cetakbiru" : "nota";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} Semua panen siap dikirim. Hebat!`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.nota}>
        <p className="text-center text-lg font-black text-[#B91C1C]">{"\u{1F9FE}"} Poin Penting: Misi Panen selesai!</p>
        <ul className="space-y-1.5">
          {POIN_PENTING.map((p) => (
            <li key={p} className="flex items-start gap-2 rounded-xl bg-white/90 px-3 py-2 text-sm font-bold text-[#1C01A5]">
              <span aria-hidden="true">{"\u{2705}"}</span>
              {p}
            </li>
          ))}
        </ul>
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
    <div className="space-y-3 rounded-3xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div
        className={`p-2 ${tema === "anyaman" ? "rounded-2xl border-4 border-[#78350F] bg-[#FFF7ED]" : tema === "cetakbiru" ? "rounded-md border-2 border-white bg-[#EFF6FF]" : "rounded-none border-y-4 border-dashed border-[#94A3B8] bg-white text-center font-mono"}`}
      >
        <p className="text-xs font-black uppercase tracking-wide text-[#4D7C0F]">
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className="text-base font-black text-[#1C01A5]">{so.judul}</p>
        <p className="text-sm font-bold text-[#1C01A5]/80">{so.cerita}</p>
      </div>

      <Kemajuan tema={tema} nomor={nomor} total={total} />

      <div className="flex justify-center gap-1.5">
        {soal.map((x, i) => (
          <span key={x.cara} className={`rounded-full px-2.5 py-0.5 text-xs font-black ${i === s ? "bg-[#4D7C0F] text-white" : i < s ? "bg-[#DCFCE7] text-[#15803D]" : "bg-white/80 text-[#1C01A5]/50"}`}>
            {IKON_CARA[x.cara]} {NAMA_CARA[x.cara]}
          </span>
        ))}
      </div>

      <div className={`border-4 bg-white/95 p-3 ${tema === "anyaman" ? "rounded-[1.6rem] border-[#92400E]" : tema === "cetakbiru" ? "rounded-md border-[#FDE047]" : "rounded-sm border-[#94A3B8]"}`}>
        <div className="mb-2 flex items-start gap-2">
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#4D7C0F] bg-[#ECFCCB] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#4D7C0F]">
              Soal {nomor} dari {total} · {IKON_METODE[ls.metode]} {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahPanen key={`${s}-${l}`} ls={ls} rupa={rupa} benda={so.benda} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
