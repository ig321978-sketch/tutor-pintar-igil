"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahKebun } from "./LangkahKebun";
import { POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 2 Sub-Bab A: dua belas soal lanjutan Misi Kebun
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Pola visual tiap tahap berbeda dari Bab 1:
 * Concrete = tanah kebun berbintik dengan kemajuan berupa tunas yang tumbuh, Pictorial = kertas milimeter hijau dengan
 * kemajuan berupa tetes air di selang, Abstract = langit biru berawan dengan kemajuan berupa awan bernomor yang disinari.
 * Abstract diakhiri Poin Penting. Tanpa skor.
 */

type Tema = "tanah" | "milimeter" | "langit";
const LATAR: Record<Tema, React.CSSProperties> = {
  tanah: { backgroundColor: "#8B5A2B", backgroundImage: "radial-gradient(rgba(255,237,213,0.35) 1.5px,transparent 2px),radial-gradient(rgba(60,30,10,0.35) 2px,transparent 2.5px)", backgroundSize: "18px 18px, 26px 26px", backgroundPosition: "0 0, 9px 13px" },
  milimeter: {
    backgroundColor: "#F7FEE7",
    backgroundImage: "linear-gradient(rgba(101,163,13,0.35) 1px,transparent 1px),linear-gradient(90deg,rgba(101,163,13,0.35) 1px,transparent 1px),linear-gradient(rgba(101,163,13,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(101,163,13,0.12) 1px,transparent 1px)",
    backgroundSize: "40px 40px, 40px 40px, 8px 8px, 8px 8px",
  },
  langit: { background: "radial-gradient(ellipse 30% 14% at 20% 12%,#FFFFFF 60%,transparent 62%),radial-gradient(ellipse 26% 12% at 78% 22%,#FFFFFF 60%,transparent 62%),linear-gradient(180deg,#7DD3FC,#E0F2FE)" },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "tanah")
    return (
      <div className="mx-auto flex max-w-md items-end justify-between rounded-2xl bg-[#5C3A1A]/70 px-2 pb-1 pt-2" aria-label={`Tunas ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span key={i} className={`leading-none ${i < nomor ? "text-xl" : i === nomor ? "animate-bounce text-lg" : "text-sm opacity-40"}`} aria-hidden="true">
            {i < nomor ? "\u{1F33F}" : i === nomor ? "\u{1F331}" : "\u{1F7E4}"}
          </span>
        ))}
      </div>
    );
  if (tema === "milimeter")
    return (
      <div className="relative mx-auto flex max-w-md items-center justify-between px-1 py-2" aria-label={`Tetes ${nomor} dari ${total}`}>
        <span className="absolute left-2 right-2 top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#65A30D]" />
        {n.map((i) => (
          <span
            key={i}
            className={`relative z-10 flex h-6 w-5 items-center justify-center text-[10px] font-black ${i < nomor ? "text-white" : i === nomor ? "scale-125 text-[#1E3A8A]" : "text-[#65A30D]"}`}
            style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: i < nomor ? "#2563EB" : i === nomor ? "#BFDBFE" : "#FFFFFF", border: "2px solid #2563EB" }}
          >
            {i}
          </span>
        ))}
      </div>
    );
  return (
    <div className="flex flex-wrap justify-center gap-1" aria-label={`Soal ${nomor} dari ${total}`}>
      {n.map((i) => (
        <span
          key={i}
          className={`flex h-6 min-w-[2rem] items-center justify-center rounded-full text-[11px] font-black ${i < nomor ? "bg-[#FDE047] text-[#92400E] shadow-[0_0_8px_#FACC15]" : i === nomor ? "animate-pulse bg-white text-[#0369A1] ring-2 ring-[#FACC15]" : "bg-white/60 text-[#0369A1]/50"}`}
        >
          {i}
        </span>
      ))}
    </div>
  );
}

export default function TahapKebun({
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
  const tema: Tema = rupa === "benda" ? "tanah" : rupa === "diagram" ? "milimeter" : "langit";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} Semua bibit sudah tertanam. Hebat!`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.langit}>
        <p className="text-center text-lg font-black text-[#0C4A6E]">{"\u{1F331}"} Poin Penting: Misi Kebun bagian ini selesai!</p>
        <ul className="space-y-1.5">
          {POIN_PENTING.map((p) => (
            <li key={p} className="flex items-start gap-2 rounded-xl bg-white/90 px-3 py-2 text-sm font-bold text-[#1C01A5]">
              <span aria-hidden="true">{"\u{2600}\u{FE0F}"}</span>
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
        className={`p-2 ${tema === "tanah" ? "rounded-2xl border-4 border-[#65A30D] bg-[#FEFCE8]" : tema === "milimeter" ? "rounded-none border-2 border-[#65A30D] bg-white/95 shadow-[4px_4px_0_#65A30D]" : "rounded-[2.5rem] bg-white/85 px-4 text-center"}`}
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

      <div className={`border-4 bg-white/95 p-3 ${tema === "tanah" ? "rounded-[1.6rem] border-[#65A30D]" : tema === "milimeter" ? "rounded-md border-[#2563EB]" : "rounded-[2rem] border-[#38BDF8]"}`}>
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
        <LangkahKebun key={`${s}-${l}`} ls={ls} rupa={rupa} benda={so.benda} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
