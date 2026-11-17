"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahNampan } from "./LangkahNampan";
import { POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 6 Sub-Bab A: dua belas soal lanjutan Misi Pasar Malam
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, satu soal Klik berupa Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Bab 1 sampai Bab 5 dan Sub-Bab lain Bab 6: Concrete = alas anyaman bambu (tampah), kemajuan berupa deretan kue cubit yang matang;
 * Pictorial = taplak kotak-kotak merah putih, kemajuan berupa petak taplak yang berwarna; Abstract = kertas koran pembungkus,
 * kemajuan berupa cap tinta bundar. Abstract diakhiri Poin Penting (tanpa perayaan; perayaan akhir cerita bab ada di Sub-Bab C). Tanpa skor.
 */

type Tema = "tampah" | "taplak" | "koran";
const LATAR: Record<Tema, React.CSSProperties> = {
  tampah: {
    backgroundColor: "#D6A15E",
    backgroundImage: "repeating-linear-gradient(45deg,#C58B45 0 6px,#E4B877 6px 12px),repeating-linear-gradient(-45deg,rgba(120,53,15,0.18) 0 6px,transparent 6px 12px)",
  },
  taplak: {
    backgroundColor: "#FFFFFF",
    backgroundImage: "linear-gradient(90deg,rgba(220,38,38,0.5) 50%,transparent 50%),linear-gradient(rgba(220,38,38,0.5) 50%,transparent 50%)",
    backgroundSize: "36px 36px",
  },
  koran: {
    backgroundColor: "#E7E0CF",
    backgroundImage: "repeating-linear-gradient(180deg,transparent 0 9px,rgba(31,41,55,0.14) 9px 10px),linear-gradient(90deg,transparent 0 49%,rgba(31,41,55,0.25) 49% 50%,transparent 50%)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "tampah")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 rounded-full bg-[#FEF3C7]/90 px-3 py-1.5" aria-label={`Kue ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 20 20" className={`h-5 w-5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <circle cx={10} cy={10} r={8} fill={i < nomor ? "#FBBF24" : i === nomor ? "#FDE68A" : "#F3F4F6"} stroke={i < nomor ? "#B45309" : "#9CA3AF"} strokeWidth={1.6} />
            {i < nomor ? <circle cx={7.5} cy={8} r={1.3} fill="#B45309" /> : null}
            {i < nomor ? <circle cx={12.5} cy={11.5} r={1.3} fill="#B45309" /> : null}
          </svg>
        ))}
      </div>
    );
  if (tema === "taplak")
    return (
      <div className="mx-auto max-w-md" aria-label={`Petak ${Math.min(nomor, total)} dari ${total}`}>
        <svg viewBox="0 0 240 26" className="block w-full" aria-hidden="true">
          <rect x={0} y={0} width={240} height={26} fill="#FFFFFF" stroke="#DC2626" strokeWidth={2} rx={3} />
          {n.map((i) => {
            const x = 6 + (i - 1) * 19;
            return <rect key={i} x={x} y={4} width={17} height={18} fill={i < nomor ? "#DC2626" : i === nomor ? "#FECACA" : "#FFF1F2"} stroke="#DC2626" strokeWidth={i === nomor ? 2 : 1} />;
          })}
        </svg>
      </div>
    );
  return (
    <div className="mx-auto max-w-md" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      <svg viewBox="0 0 240 26" className="block w-full" aria-hidden="true">
        {n.map((i) => {
          const x = 10 + (i - 1) * 19.5;
          return (
            <g key={i}>
              <circle cx={x} cy={13} r={8.5} fill={i < nomor ? "#1F2937" : "none"} stroke={i <= nomor ? "#1F2937" : "#9CA3AF"} strokeWidth={1.6} strokeDasharray={i === nomor ? "3 2" : undefined} />
              {i < nomor ? (
                <path d={`M ${x - 4} ${13} L ${x - 1} ${16} L ${x + 4.5} ${10}`} fill="none" stroke="#F5F0E1" strokeWidth={1.8} strokeLinecap="round" />
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function TahapNampan({
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
  const tema: Tema = rupa === "benda" ? "tampah" : rupa === "diagram" ? "taplak" : "koran";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.koran}>
        <Kemajuan tema="koran" nomor={13} total={12} />
        <div className="rounded-sm border-y-4 border-double border-[#1F2937] bg-[#F5F0E1] p-3 font-serif">
          <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#1F2937]">Harian Pasar Malam</p>
          <p className="mt-1 text-center text-lg font-black text-[#1F2937]">{"\u{1F4F0}"} Poin Penting: Dua Nampan Kue</p>
          <ul className="mt-2 space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 border-b border-[#1F2937]/30 px-1 py-1.5 text-sm font-bold text-[#1F2937]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1F2937] text-[10px] font-black text-[#F5F0E1]">{i + 1}</span>
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
  const kepala =
    tema === "tampah"
      ? "rounded-3xl border-4 border-[#92400E] bg-[#FEF3C7]"
      : tema === "taplak"
        ? "rounded-lg border-4 border-dashed border-[#DC2626] bg-[#FEF2F2]"
        : "rounded-sm border-y-4 border-double border-[#1F2937] bg-[#F5F0E1] font-serif";
  const papan = tema === "tampah" ? "rounded-3xl border-4 border-[#92400E]" : tema === "taplak" ? "rounded-lg border-4 border-[#DC2626]" : "rounded-sm border-4 border-double border-[#1F2937]";
  const warnaKepala = tema === "tampah" ? "text-[#92400E]" : tema === "taplak" ? "text-[#B91C1C]" : "text-[#1F2937]";
  const cariSalah = ls.langkah.tipe === "salah";
  return (
    <div className="space-y-3 rounded-3xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
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
              Soal {nomor} dari {total} · {cariSalah ? "\u{1F50E} Cari kesalahan · " : ""}
              {IKON_METODE[ls.metode]} {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahNampan key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
