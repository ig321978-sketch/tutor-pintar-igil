"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahBekal } from "./LangkahBekal";
import { POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 3 Sub-Bab A: dua belas soal lanjutan Misi Perjalanan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Pola visual tiap tahap baru, berbeda dari Bab 1 dan Bab 2:
 * Concrete = kain jok kursi kereta bergaris kotak dengan kemajuan berupa deretan kursi yang terisi, Pictorial = papan jadwal stasiun
 * gelap dengan angka lampu kuning, Abstract = karcis kereta bertepi sobekan dengan kemajuan berupa lubang pons.
 * Abstract diakhiri Poin Penting. Tanpa skor.
 */

type Tema = "jok" | "jadwal" | "karcis";
const LATAR: Record<Tema, React.CSSProperties> = {
  jok: {
    backgroundColor: "#1E3A8A",
    backgroundImage:
      "repeating-linear-gradient(0deg,rgba(250,204,21,0.28) 0 6px,transparent 6px 30px),repeating-linear-gradient(90deg,rgba(250,204,21,0.28) 0 6px,transparent 6px 30px),repeating-linear-gradient(90deg,rgba(239,68,68,0.25) 0 2px,transparent 2px 15px)",
  },
  jadwal: { backgroundColor: "#0F172A", backgroundImage: "radial-gradient(rgba(251,191,36,0.22) 1.2px,transparent 1.6px)", backgroundSize: "9px 9px" },
  karcis: {
    backgroundColor: "#FDE68A",
    backgroundImage: "repeating-linear-gradient(-45deg,rgba(234,88,12,0.12) 0 10px,transparent 10px 20px),radial-gradient(circle at 0 50%,#FEF3C7 10px,transparent 11px)",
    backgroundSize: "auto, 100% 34px",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "jok")
    return (
      <div className="mx-auto flex max-w-md items-end justify-between rounded-2xl bg-[#172554]/80 px-2 pb-1 pt-2" aria-label={`Kursi ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span key={i} className={`leading-none ${i < nomor ? "text-xl" : i === nomor ? "animate-bounce text-lg" : "text-sm opacity-35 grayscale"}`} aria-hidden="true">
            {i < nomor ? "\u{1F9D1}" : "\u{1F4BA}"}
          </span>
        ))}
      </div>
    );
  if (tema === "jadwal")
    return (
      <div className="mx-auto flex max-w-md flex-wrap justify-center gap-1 rounded-lg border-2 border-[#334155] bg-black/60 p-1.5" aria-label={`Soal ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            className={`flex h-7 w-6 items-center justify-center rounded-sm font-mono text-sm font-black ${i < nomor ? "bg-[#1E293B] text-[#FBBF24]" : i === nomor ? "animate-pulse bg-[#FBBF24] text-black" : "bg-[#1E293B] text-[#475569]"}`}
          >
            {i}
          </span>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md items-center justify-between rounded-md border-2 border-dashed border-[#C2410C] bg-[#FFFBEB] px-2 py-1.5" aria-label={`Lubang ${nomor} dari ${total}`}>
      {n.map((i) => (
        <span
          key={i}
          className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black ${i < nomor ? "bg-[#7C2D12] text-[#FDE68A]" : i === nomor ? "scale-125 border-2 border-[#C2410C] bg-white text-[#C2410C]" : "border border-[#FDBA74] text-[#FDBA74]"}`}
        >
          {i}
        </span>
      ))}
    </div>
  );
}

export default function TahapBekal({
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
  const tema: Tema = rupa === "benda" ? "jok" : rupa === "diagram" ? "jadwal" : "karcis";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} Bekal untuk Nenek tetap aman. Hebat!`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.karcis}>
        <div className="rounded-2xl border-4 border-dashed border-[#C2410C] bg-[#FFFBEB] p-3">
          <p className="text-center text-lg font-black text-[#7C2D12]">{"\u{1F3AB}"} Poin Penting: Misi Perjalanan bagian ini selesai!</p>
          <ul className="mt-2 space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#FDBA74] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7C2D12] text-[10px] font-black text-[#FDE68A]">{i + 1}</span>
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
        className={`p-2 ${tema === "jok" ? "rounded-2xl border-4 border-[#FACC15] bg-[#EFF6FF]" : tema === "jadwal" ? "rounded-md border-2 border-[#FBBF24] bg-[#111827] text-[#FDE68A]" : "rounded-lg border-4 border-dashed border-[#C2410C] bg-[#FFFBEB]"}`}
      >
        <p className={`text-xs font-black uppercase tracking-wide ${tema === "jadwal" ? "text-[#FBBF24]" : "text-[#1D4ED8]"}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${tema === "jadwal" ? "font-mono text-[#FDE68A]" : "text-[#1C01A5]"}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "jadwal" ? "text-[#E2E8F0]" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
      </div>

      <Kemajuan tema={tema} nomor={nomor} total={total} />

      <div className="flex justify-center gap-1.5">
        {soal.map((x, i) => (
          <span key={x.cara} className={`rounded-full px-2.5 py-0.5 text-xs font-black ${i === s ? "bg-[#FACC15] text-[#1C01A5]" : i < s ? "bg-[#DCFCE7] text-[#15803D]" : "bg-white/80 text-[#1C01A5]/50"}`}>
            {IKON_CARA[x.cara]} {NAMA_CARA[x.cara]}
          </span>
        ))}
      </div>

      <div className={`border-4 bg-white/95 p-3 ${tema === "jok" ? "rounded-[1.6rem] border-[#FACC15]" : tema === "jadwal" ? "rounded-md border-[#FBBF24]" : "rounded-xl border-dashed border-[#C2410C]"}`}>
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
        <LangkahBekal key={`${s}-${l}`} ls={ls} rupa={rupa} benda={so.benda} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
