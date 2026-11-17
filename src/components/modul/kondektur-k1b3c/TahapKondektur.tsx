"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahKondektur } from "./LangkahKondektur";
import { POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 3 Sub-Bab C: dua belas soal lanjutan Misi Kondektur
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Pola visual tiap tahap baru, berbeda dari Sub-Bab A dan B:
 * Concrete = lantai gerbong papan kayu dengan kemajuan berupa jejak langkah kondektur, Pictorial = lembar karbon biru bergaris dengan
 * kemajuan berupa kotak centang, Abstract = plat besi gerbong berpaku keling dengan kemajuan berupa paku keling yang mengilap.
 * Abstract diakhiri Poin Penting. Tanpa skor.
 */

type Tema = "kayu" | "karbon" | "plat";
const LATAR: Record<Tema, React.CSSProperties> = {
  kayu: {
    backgroundColor: "#B45309",
    backgroundImage: "repeating-linear-gradient(0deg,#92400E 0 2px,transparent 2px 34px),repeating-linear-gradient(90deg,rgba(120,53,15,0.35) 0 1px,transparent 1px 120px),linear-gradient(90deg,#B45309,#C2410C 50%,#B45309)",
  },
  karbon: { backgroundColor: "#1E3A8A", backgroundImage: "repeating-linear-gradient(0deg,rgba(255,255,255,0.18) 0 1px,transparent 1px 22px),linear-gradient(90deg,transparent 0 30px,rgba(248,113,113,0.5) 30px 32px,transparent 32px)" },
  plat: {
    backgroundColor: "#94A3B8",
    backgroundImage: "radial-gradient(circle,#E2E8F0 0 3px,#475569 3.5px,transparent 4.5px),linear-gradient(135deg,#CBD5E1,#94A3B8 50%,#CBD5E1)",
    backgroundSize: "28px 28px, 100% 100%",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "kayu")
    return (
      <div className="mx-auto flex max-w-md items-center justify-between rounded-xl bg-[#78350F]/80 px-2 py-1.5" aria-label={`Langkah ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span key={i} className={`leading-none ${i < nomor ? "text-lg" : i === nomor ? "animate-bounce text-lg" : "text-sm opacity-30"}`} aria-hidden="true">
            {"\u{1F463}"}
          </span>
        ))}
      </div>
    );
  if (tema === "karbon")
    return (
      <div className="mx-auto flex max-w-md flex-wrap justify-center gap-1" aria-label={`Centang ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span key={i} className={`flex h-6 w-6 items-center justify-center rounded border-2 text-xs font-black ${i < nomor ? "border-white bg-white text-[#1E3A8A]" : i === nomor ? "animate-pulse border-[#FDE047] text-[#FDE047]" : "border-white/40 text-white/40"}`}>
            {i < nomor ? "✓" : i}
          </span>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md items-center justify-between rounded-lg border-2 border-[#475569] bg-[#CBD5E1] px-2 py-1.5" aria-label={`Paku ${nomor} dari ${total}`}>
      {n.map((i) => (
        <span key={i} className={`h-5 w-5 rounded-full border-2 ${i < nomor ? "border-[#A16207] bg-[#FACC15] shadow-[0_0_6px_#FACC15]" : i === nomor ? "animate-pulse border-[#1C01A5] bg-white" : "border-[#475569] bg-[#94A3B8]"}`} />
      ))}
    </div>
  );
}

export default function TahapKondektur({
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
  const tema: Tema = rupa === "benda" ? "kayu" : rupa === "diagram" ? "karbon" : "plat";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} Semua catatan kondektur cocok. Hebat!`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.plat}>
        <div className="rounded-xl border-4 border-[#475569] bg-[#F8FAFC] p-3">
          <p className="text-center text-lg font-black text-[#1E293B]">{"\u{1F529}"} Poin Penting: Misi Kondektur bagian ini selesai!</p>
          <ul className="mt-2 space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-xl bg-white/95 px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#A16207] bg-[#FACC15] text-[10px] font-black text-[#1E293B]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
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
        className={`p-2 ${tema === "kayu" ? "rounded-md border-4 border-[#78350F] bg-[#FFF7ED]" : tema === "karbon" ? "rounded-sm border-2 border-white bg-[#1E40AF] text-white" : "rounded-xl border-4 border-[#475569] bg-[#F1F5F9]"}`}
      >
        <p className={`text-xs font-black uppercase tracking-wide ${tema === "karbon" ? "text-[#FDE047]" : "text-[#1D4ED8]"}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${tema === "karbon" ? "text-white" : "text-[#1C01A5]"}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "karbon" ? "text-[#DBEAFE]" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
      </div>

      <Kemajuan tema={tema} nomor={nomor} total={total} />

      <div className="flex justify-center gap-1.5">
        {soal.map((x, i) => (
          <span key={x.cara} className={`rounded-full px-2.5 py-0.5 text-xs font-black ${i === s ? "bg-[#FACC15] text-[#1C01A5]" : i < s ? "bg-[#DCFCE7] text-[#15803D]" : "bg-white/80 text-[#1C01A5]/50"}`}>
            {IKON_CARA[x.cara]} {NAMA_CARA[x.cara]}
          </span>
        ))}
      </div>

      <div className={`border-4 bg-white/95 p-3 ${tema === "kayu" ? "rounded-md border-[#78350F]" : tema === "karbon" ? "rounded-sm border-white" : "rounded-xl border-[#475569]"}`}>
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
        <LangkahKondektur key={`${s}-${l}`} ls={ls} rupa={rupa} benda={so.benda} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
