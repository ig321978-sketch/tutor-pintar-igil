"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahPesta } from "./LangkahPesta";
import { POIN_PENTING } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 1 Sub-Bab D: dua belas soal lanjutan Misi Pesta
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Pola visual tiap tahap berbeda dari Sub-Bab A sampai C:
 * Concrete = taplak meja kotak merah dengan kemajuan berupa kue, Pictorial = kertas titik dengan kemajuan berupa rantai ikatan,
 * Abstract = kartu undangan emas dengan kemajuan berupa bintang. Abstract diakhiri Poin Penting dan perayaan akhir bab. Tanpa skor.
 */

type Tema = "taplak" | "titik" | "undangan";
const LATAR: Record<Tema, React.CSSProperties> = {
  taplak: { backgroundColor: "#FFFFFF", backgroundImage: "linear-gradient(90deg,rgba(220,38,38,0.35) 50%,transparent 50%),linear-gradient(rgba(220,38,38,0.35) 50%,transparent 50%)", backgroundSize: "28px 28px" },
  titik: { backgroundColor: "#F8FAFF", backgroundImage: "radial-gradient(#93C5FD 1.6px,transparent 1.8px)", backgroundSize: "16px 16px" },
  undangan: { background: "linear-gradient(135deg,#FFFBEB,#FEF3C7)", boxShadow: "inset 0 0 0 4px #D4A017, inset 0 0 0 9px #FFFBEB, inset 0 0 0 11px #D4A017" },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "taplak")
    return (
      <div className="mx-auto flex max-w-md justify-between rounded-full bg-white/90 px-2 py-1" aria-label={`Kue ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span key={i} className={`text-lg leading-none ${i < nomor ? "" : i === nomor ? "scale-125 animate-bounce" : "opacity-30 grayscale"}`} aria-hidden="true">
            {"\u{1F9C1}"}
          </span>
        ))}
      </div>
    );
  if (tema === "titik")
    return (
      <div className="mx-auto flex max-w-md items-center" aria-label={`Soal ${nomor} dari ${total}`}>
        {n.map((i) => (
          <React.Fragment key={i}>
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-black ${i < nomor ? "border-[#1D4ED8] bg-[#1D4ED8] text-white" : i === nomor ? "border-[#EC4899] bg-[#FCE7F3] text-[#BE185D]" : "border-[#1D4ED8]/40 bg-white text-[#1D4ED8]/50"}`}>{i}</span>
            {i < total ? <span className={`h-0.5 flex-1 ${i < nomor ? "bg-[#1D4ED8]" : "bg-[#1D4ED8]/25"}`} /> : null}
          </React.Fragment>
        ))}
      </div>
    );
  return (
    <div className="flex justify-center gap-0.5" aria-label={`Soal ${nomor} dari ${total}`}>
      {n.map((i) => (
        <span key={i} className={`text-lg ${i < nomor ? "" : i === nomor ? "animate-pulse" : "opacity-25"}`} aria-hidden="true">
          {i <= nomor ? "\u{2B50}" : "\u{2606}"}
        </span>
      ))}
    </div>
  );
}

export default function TahapPesta({
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
  const tema: Tema = rupa === "benda" ? "taplak" : rupa === "diagram" ? "titik" : "undangan";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING.join(" ")} Misi Rumah Rapi selesai. Hebat!`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.undangan}>
        <p className="text-center text-lg font-black text-[#92400E]">{"\u{1F389}"} Poin Penting: Misi Pesta dan Misi Rumah Rapi selesai!</p>
        <ul className="space-y-1.5">
          {POIN_PENTING.map((p) => (
            <li key={p} className="flex items-start gap-2 rounded-xl bg-white/90 px-3 py-2 text-sm font-bold text-[#1C01A5]">
              <span aria-hidden="true">{"\u{1F381}"}</span>
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
      <div className={`p-2 ${tema === "taplak" ? "rounded-2xl border-4 border-[#B91C1C] bg-white" : tema === "titik" ? "rounded-md border-l-8 border-[#EC4899] bg-white/90" : "rounded-[2rem] bg-white/70 text-center"}`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#BE185D]">
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className="text-base font-black text-[#1C01A5]">{so.judul}</p>
        <p className="text-sm font-bold text-[#1C01A5]/80">{so.cerita}</p>
      </div>

      <Kemajuan tema={tema} nomor={nomor} total={total} />

      <div className="flex justify-center gap-1.5">
        {soal.map((x, i) => (
          <span key={x.cara} className={`rounded-full px-2.5 py-0.5 text-xs font-black ${i === s ? "bg-[#BE185D] text-white" : i < s ? "bg-[#DCFCE7] text-[#15803D]" : "bg-white/80 text-[#1C01A5]/50"}`}>
            {IKON_CARA[x.cara]} {NAMA_CARA[x.cara]}
          </span>
        ))}
      </div>

      <div className="rounded-[1.6rem] border-4 border-[#BE185D] bg-white/95 p-3">
        <div className="mb-2 flex items-start gap-2">
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#BE185D] bg-[#FCE7F3] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#BE185D]">
              Soal {nomor} dari {total} · {IKON_METODE[ls.metode]} {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahPesta key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
