"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahRumah } from "./LangkahRumah";
import { POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 3 Sub-Bab D: dua belas soal lanjutan Misi Rumah Nenek
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Pola visual tiap tahap baru, berbeda dari Sub-Bab A sampai C:
 * Concrete = taplak meja kotak-kotak merah putih dengan kemajuan berupa kue di piring, Pictorial = kertas surat bergaris dengan kemajuan
 * berupa perangko yang ditempel, Abstract = papan tulis kapur hijau di rumah Nenek dengan kemajuan berupa goresan kapur.
 * Abstract diakhiri Poin Penting dan perayaan akhir cerita bab. Tanpa skor.
 */

type Tema = "taplak" | "surat" | "kapur";
const LATAR: Record<Tema, React.CSSProperties> = {
  taplak: {
    backgroundColor: "#FFFFFF",
    backgroundImage: "linear-gradient(90deg,rgba(220,38,38,0.45) 50%,transparent 50%),linear-gradient(rgba(220,38,38,0.45) 50%,transparent 50%)",
    backgroundSize: "28px 28px",
  },
  surat: { backgroundColor: "#F8FAFC", backgroundImage: "repeating-linear-gradient(0deg,transparent 0 25px,#BAE6FD 25px 26px),repeating-linear-gradient(45deg,#DC2626 0 10px,#FFFFFF 10px 20px,#2563EB 20px 30px,#FFFFFF 30px 40px)", backgroundSize: "100% 100%, 100% 8px", backgroundRepeat: "repeat, repeat-x" },
  kapur: { backgroundColor: "#166534", backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px,transparent 1.5px),linear-gradient(135deg,#14532D,#166534 60%,#15803D)", backgroundSize: "6px 6px, 100% 100%" },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "taplak")
    return (
      <div className="mx-auto flex max-w-md items-center justify-between rounded-full border-2 border-[#B91C1C] bg-white px-2 py-1" aria-label={`Kue ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span key={i} className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#CBD5E1] text-sm leading-none ${i < nomor ? "" : i === nomor ? "animate-bounce" : "opacity-30 grayscale"}`} aria-hidden="true">
            {"\u{1F370}"}
          </span>
        ))}
      </div>
    );
  if (tema === "surat")
    return (
      <div className="mx-auto flex max-w-md flex-wrap justify-center gap-1" aria-label={`Perangko ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            className={`flex h-7 w-6 items-center justify-center border-2 border-dotted text-[10px] font-black ${i < nomor ? "border-[#B91C1C] bg-[#FEE2E2] text-[#B91C1C]" : i === nomor ? "animate-pulse border-[#0369A1] bg-white text-[#0369A1]" : "border-[#94A3B8] bg-white/60 text-[#94A3B8]"}`}
          >
            {i}
          </span>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-2 font-black text-white" aria-label={`Goresan ${nomor} dari ${total}`}>
      {n.map((i) => (
        <span key={i} className={`text-lg leading-none ${i < nomor ? "opacity-100" : i === nomor ? "animate-pulse text-[#FDE047]" : "opacity-25"}`} aria-hidden="true">
          {"\u{2502}"}
        </span>
      ))}
    </div>
  );
}

export default function TahapRumah({
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
  const tema: Tema = rupa === "benda" ? "taplak" : rupa === "diagram" ? "surat" : "kapur";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} Semua cerita hitungan terjawab. Perjalanan ke rumah Nenek selesai. Hebat!`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.kapur}>
        <div className="rounded-md border-[8px] border-[#92400E] bg-[#14532D] p-3">
          <p className="text-center text-lg font-black text-[#FEFCE8]">{"\u{1F389}"} Poin Penting: Misi Rumah Nenek selesai, cerita Bab 3 tamat!</p>
          <ul className="mt-2 space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm font-bold text-white">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#14532D]">{i + 1}</span>
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
        className={`p-2 ${tema === "taplak" ? "rounded-2xl border-4 border-[#B91C1C] bg-white" : tema === "surat" ? "rounded-md border-2 border-[#0369A1] bg-[#F0F9FF]" : "rounded-md border-[6px] border-[#92400E] bg-[#14532D] text-white"}`}
      >
        <p className={`text-xs font-black uppercase tracking-wide ${tema === "kapur" ? "text-[#FDE047]" : "text-[#1D4ED8]"}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${tema === "kapur" ? "text-white" : "text-[#1C01A5]"}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "kapur" ? "text-[#DCFCE7]" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
      </div>

      <Kemajuan tema={tema} nomor={nomor} total={total} />

      <div className="flex justify-center gap-1.5">
        {soal.map((x, i) => (
          <span key={x.cara} className={`rounded-full px-2.5 py-0.5 text-xs font-black ${i === s ? "bg-[#FACC15] text-[#1C01A5]" : i < s ? "bg-[#DCFCE7] text-[#15803D]" : "bg-white/80 text-[#1C01A5]/50"}`}>
            {IKON_CARA[x.cara]} {NAMA_CARA[x.cara]}
          </span>
        ))}
      </div>

      <div className={`border-4 bg-white/95 p-3 ${tema === "taplak" ? "rounded-2xl border-[#B91C1C]" : tema === "surat" ? "rounded-md border-[#0369A1]" : "rounded-md border-[#92400E]"}`}>
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
        <LangkahRumah key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
