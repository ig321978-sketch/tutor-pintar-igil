"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahKasir } from "./LangkahKasir";
import { JEMBATAN, JEMBATAN_SUARA, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 1 Sub-Bab B: dua belas tugas lanjutan Misi Meja Kasir
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, satu tugas Klik berupa Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8: Concrete = meja kasir kayu bersambungan papan, kemajuan berupa deret koin emas yang diberi tanda;
 * Pictorial = kertas dua kolom (puluhan biru muda dan satuan merah muda) bergaris, kemajuan berupa batang kecil yang terisi satu per satu;
 * Abstract = tiket pesanan lomba bergerigi, kemajuan berupa deret potongan tiket bernomor.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab C (membandingkan dua nampan). Tanpa skor.
 */

type Tema = "kayu" | "kolom" | "tiket";
const LATAR: Record<Tema, React.CSSProperties> = {
  kayu: {
    backgroundColor: "#B07A3C",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(69,26,3,0.22) 0 2px,transparent 2px 26px),repeating-linear-gradient(90deg,rgba(255,255,255,0.05) 0 1px,transparent 1px 7px),linear-gradient(180deg,#C48A48,#A06A30)",
  },
  kolom: {
    backgroundColor: "#FFFFFF",
    backgroundImage: "linear-gradient(90deg,rgba(191,219,254,0.6) 0 50%,rgba(251,207,232,0.6) 50% 100%),repeating-linear-gradient(0deg,rgba(100,116,139,0.28) 0 1px,transparent 1px 28px)",
  },
  tiket: {
    backgroundColor: "#FEF3C7",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(180,83,9,0.13) 0 2px,transparent 2px 16px),radial-gradient(circle at 20% 15%,rgba(255,255,255,0.7),transparent 40%)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "kayu")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 rounded-xl bg-[#451A03]/35 px-2 py-1.5" aria-label={`Koin ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-[11px] font-black ${i === nomor ? "animate-pulse" : ""}`}
            style={{ background: i < nomor ? "#FACC15" : "transparent", borderColor: i <= nomor ? "#FEF3C7" : "rgba(254,243,199,0.45)", borderStyle: i > nomor ? "dashed" : "solid", color: "#78350F" }}
          >
            {i < nomor ? "✓" : ""}
          </span>
        ))}
      </div>
    );
  if (tema === "kolom")
    return (
      <div className="mx-auto flex max-w-md items-end justify-center gap-1.5 px-2 py-1" aria-label={`Batang ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 12 26" className="h-6 w-3" aria-hidden="true">
            <rect x={1.5} y={1.5} width={9} height={23} rx={1.5} fill={i < nomor ? "#1C01A5" : "none"} stroke="#1C01A5" strokeWidth={i === nomor ? 2.6 : 1.3} strokeDasharray={i > nomor ? "2 2" : undefined} />
            {i < nomor ? [6, 11, 16, 21].map((y) => <line key={y} x1={1.5} x2={10.5} y1={y} y2={y} stroke="#FFFFFF" strokeWidth={0.8} />) : null}
          </svg>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Tiket ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`flex h-6 min-w-[1.6rem] items-center justify-center px-1 text-[10px] font-black ${i === nomor ? "animate-pulse" : ""}`}
          style={{
            background: i < nomor ? "#92400E" : "#FFFBEB",
            color: i < nomor ? "#FEF3C7" : "#92400E",
            borderWidth: 2,
            borderColor: "#92400E",
            borderTopStyle: i > nomor ? "dashed" : "solid",
            borderBottomStyle: i > nomor ? "dashed" : "solid",
            borderLeftStyle: i > nomor ? "dashed" : "solid",
            borderRightStyle: "dotted",
            borderRadius: "10px 3px 3px 10px",
          }}
        >
          {i}
        </span>
      ))}
    </div>
  );
}

export default function TahapKasir({
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
  const tema: Tema = rupa === "benda" ? "kayu" : rupa === "diagram" ? "kolom" : "tiket";
  const [s, setS] = useState(0);
  const [l, setL] = useState(0);
  const [benar, setBenar] = useState(false);
  const [akhir, setAkhir] = useState(false);
  const so = soal[s];
  const ls = so?.langkah[l];

  useEffect(() => {
    if (!ls || akhir) return;
    umum.speakGuru(l === 0 ? `${NAMA_CARA[so.cara]}. ${so.cerita} ${ls.suara}` : ls.suara);
    // Hanya saat tugas berganti.
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${JEMBATAN_SUARA}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-[14px] border-[6px] border-dotted border-[#92400E] bg-[#FEF3C7] p-0 shadow-[0_6px_0_rgba(69,26,3,0.35)]">
        <div className="space-y-3 rounded-xl p-4" style={LATAR.tiket}>
          <Kemajuan tema="tiket" nomor={13} total={12} />
          <div className="rounded-2xl border-4 border-dashed border-[#92400E] bg-[#FFFBEB]/90 p-3">
            <p className="text-center text-lg font-black text-[#92400E]">{"\u{1F3AB}"} Poin Penting: Misi Meja Kasir selesai!</p>
            <ul className="mt-2 space-y-1.5">
              {POIN_PENTING.map((p, i) => (
                <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#92400E]/70 bg-white px-3 py-2 text-sm font-bold text-[#451A03]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#92400E] text-[10px] font-black text-[#92400E]">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F36A}"} {JEMBATAN}
          </p>
          <div className="flex justify-center">
            <button type="button" className={TOMBOL_UTAMA} onClick={selesaiTahap}>
              {teksAkhir}
            </button>
          </div>
        </div>
      </div>
    );
  if (!so || !ls) return null;

  const terakhirSemua = s === soal.length - 1 && l === so.langkah.length - 1;
  const total = soal.reduce((n, x) => n + x.langkah.length, 0);
  const nomor = soal.slice(0, s).reduce((n, x) => n + x.langkah.length, 0) + l + 1;
  const kepala =
    tema === "kayu"
      ? "rounded-xl border-4 border-[#FDE68A] bg-[#FEF9C3]"
      : tema === "kolom"
        ? "rounded-md border-2 border-dashed border-[#1C01A5] bg-white"
        : "rounded-[10px_3px_3px_10px] border-4 border-dotted border-[#92400E] bg-[#FFFBEB]";
  const papan = tema === "kayu" ? "rounded-2xl border-4 border-[#FDE68A]" : tema === "kolom" ? "rounded-md border-2 border-[#1C01A5]" : "rounded-xl border-4 border-dashed border-[#92400E]";
  const warnaKepala = tema === "kolom" ? "text-[#1C01A5]" : "text-[#92400E]";
  const warnaJudul = tema === "kolom" ? "text-[#1C01A5]" : "text-[#451A03]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "kolom" ? "text-[#1C01A5]/80" : "text-[#451A03]/85"}`}>{so.cerita}</p>
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#92400E] bg-[#FEF3C7] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#92400E]">
              Tugas {nomor} dari {total} · {cariSalah ? "\u{1F50E} Cari kesalahan · " : ""}
              {rupa === "benda" ? `${IKON_METODE[ls.metode]} ` : ""}{NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahKasir key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
      </div>

      {benar ? (
        <div className="flex justify-center">
          <button type="button" onClick={lanjut} className={TOMBOL_UTAMA}>
            {terakhirSemua ? (poinPenting ? "LIHAT POIN PENTING ⬇️" : teksAkhir) : l < so.langkah.length - 1 ? "TUGAS BERIKUTNYA ➡️" : `LANJUT: ${NAMA_CARA[soal[s + 1].cara].toUpperCase()} ➡️`}
          </button>
        </div>
      ) : null}
    </div>
  );
  return tema === "kayu" ? <div className="rounded-3xl border-[10px] border-[#78350F] bg-[#78350F] shadow-[0_6px_0_rgba(69,26,3,0.4)]">{isi}</div> : <div className="rounded-3xl">{isi}</div>;
}
