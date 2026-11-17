"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahPesanan } from "./LangkahPesanan";
import { POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 2 Sub-Bab C: dua belas soal lanjutan Misi Pesanan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Pola visual tiap tahap berbeda dari Sub-Bab A dan B:
 * Concrete = karung goni dengan kemajuan berupa truk pengantar di jalan, Pictorial = peta jalan dengan kemajuan berupa pin rumah,
 * Abstract = amplop pos bertepi merah biru dengan kemajuan berupa perangko. Abstract diakhiri Poin Penting dan perayaan akhir bab. Tanpa skor.
 */

type Tema = "goni" | "peta" | "amplop";
const LATAR: Record<Tema, React.CSSProperties> = {
  goni: {
    backgroundColor: "#C9A56B",
    backgroundImage: "repeating-linear-gradient(45deg,rgba(92,64,26,0.25) 0 2px,transparent 2px 6px),repeating-linear-gradient(-45deg,rgba(255,248,230,0.25) 0 2px,transparent 2px 6px)",
  },
  peta: {
    backgroundColor: "#E5E7EB",
    backgroundImage: "linear-gradient(90deg,#FFFFFF 0 10px,transparent 10px),linear-gradient(#FFFFFF 0 10px,transparent 10px)",
    backgroundSize: "70px 70px",
  },
  amplop: {
    backgroundColor: "#FFFFFF",
    backgroundImage: "repeating-linear-gradient(135deg,#DC2626 0 14px,#FFFFFF 14px 22px,#1D4ED8 22px 36px,#FFFFFF 36px 44px)",
    padding: "14px",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "goni")
    return (
      <div className="relative mx-auto h-9 max-w-md rounded-full bg-[#4B5563] px-3" aria-label={`Pengantaran ${nomor} dari ${total}`}>
        <span className="absolute left-3 right-3 top-1/2 border-t-2 border-dashed border-white/80" />
        <span className="absolute top-0.5 -translate-x-1/2 text-xl" style={{ left: `calc(12px + ${((nomor - 1) / (total - 1)) * 100}% - ${((nomor - 1) / (total - 1)) * 24}px)` }} aria-hidden="true">
          {"\u{1F69A}"}
        </span>
        <span className="absolute right-1 top-0.5 text-xl" aria-hidden="true">
          {"\u{1F3E1}"}
        </span>
      </div>
    );
  if (tema === "peta")
    return (
      <div className="mx-auto flex max-w-md items-end justify-between px-1" aria-label={`Soal ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span key={i} className={`flex flex-col items-center leading-none ${i > nomor ? "opacity-35" : ""}`}>
            <span className={`text-base ${i === nomor ? "animate-bounce" : ""}`} aria-hidden="true">
              {i <= nomor ? "\u{1F4CD}" : "\u{26AA}"}
            </span>
            <span className="text-[9px] font-black text-[#374151]">{i}</span>
          </span>
        ))}
      </div>
    );
  return (
    <div className="flex flex-wrap justify-center gap-1" aria-label={`Soal ${nomor} dari ${total}`}>
      {n.map((i) => (
        <span
          key={i}
          className={`flex h-8 w-7 items-center justify-center border-2 border-dotted text-[11px] font-black ${i < nomor ? "border-[#DC2626] bg-[#FEF3C7] text-[#DC2626]" : i === nomor ? "border-[#1D4ED8] bg-white text-[#1D4ED8]" : "border-[#CBD5E1] bg-white text-[#94A3B8]"}`}
        >
          {i < nomor ? "\u{2709}" : i}
        </span>
      ))}
    </div>
  );
}

export default function TahapPesanan({
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
  const tema: Tema = rupa === "benda" ? "goni" : rupa === "diagram" ? "peta" : "amplop";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} Semua pesanan terkirim. Kebun Sayur Mamah selesai. Hebat!`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.amplop}>
        <p className="rounded-xl bg-white text-center text-lg font-black text-[#B91C1C]">{"\u{1F389}"} Poin Penting: Misi Pesanan dan Kebun Sayur Mamah selesai!</p>
        <ul className="space-y-1.5">
          {POIN_PENTING.map((p) => (
            <li key={p} className="flex items-start gap-2 rounded-xl bg-white/90 px-3 py-2 text-sm font-bold text-[#1C01A5]">
              <span aria-hidden="true">{"\u{1F4E8}"}</span>
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
        className={`p-2 ${tema === "goni" ? "rounded-2xl border-4 border-[#5C4033] bg-[#FFF8E7]" : tema === "peta" ? "rounded-lg border-2 border-[#6B7280] bg-white shadow-[0_3px_0_#9CA3AF]" : "rounded-none bg-white text-center"}`}
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

      <div className={`border-4 bg-white/95 p-3 ${tema === "goni" ? "rounded-[1.6rem] border-[#5C4033]" : tema === "peta" ? "rounded-lg border-[#6B7280]" : "rounded-none border-[#1D4ED8]"}`}>
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
        <LangkahPesanan key={`${s}-${l}`} ls={ls} rupa={rupa} benda={so.benda} nama={so.nama} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
