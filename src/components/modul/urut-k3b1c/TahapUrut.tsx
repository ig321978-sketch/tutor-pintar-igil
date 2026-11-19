"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahUrut } from "./LangkahUrut";
import { PENUTUP_C, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 3 Bab 1 Sub-Bab C: dua belas tugas lanjutan Misi Papan Urut
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru, berbeda dari
 * Kelas 1 sampai Kelas 2: Concrete = bak truk berpapan kayu dengan kepala berbingkai putus-putus cokelat, kemajuan berupa tumpukan karung beras;
 * Pictorial = kertas bergaris penggaris abu-abu, kemajuan berupa garis bilangan dengan titik yang terisi; Abstract = papan kapur hijau tua berbingkai kayu,
 * kemajuan berupa deretan centang kapur. Abstract diakhiri Poin Penting. Tanpa skor.
 */

type Tema = "bak" | "garis" | "kapur";
const LATAR: Record<Tema, React.CSSProperties> = {
  bak: {
    backgroundColor: "#E7CFA3",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(146,64,14,0.28) 0 2px,transparent 2px 26px),linear-gradient(90deg,rgba(146,64,14,0.2) 0 3px,transparent 3px 100%)",
    backgroundSize: "100% 100%, 100% 100%",
  },
  garis: {
    backgroundColor: "#F8FAFC",
    backgroundImage: "repeating-linear-gradient(90deg,#94A3B8 0 1px,transparent 1px 14px),linear-gradient(#CBD5E1,#CBD5E1)",
    backgroundSize: "100% 14px, 100% 1px",
    backgroundRepeat: "repeat-x, no-repeat",
    backgroundPosition: "0 100%, 0 100%",
  },
  kapur: {
    backgroundColor: "#14532D",
    backgroundImage: "radial-gradient(circle at 18% 22%,rgba(255,255,255,0.08) 0 22%,transparent 24%),radial-gradient(circle at 78% 70%,rgba(255,255,255,0.06) 0 20%,transparent 22%)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "bak")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-0.5 px-1" aria-label={`Karung ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 18 20" className={`h-5 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <path d="M4 2 H14 L16 6 L17 18 H1 L2 6 Z" fill={i < nomor ? "#FDE68A" : "#FFFFFF"} stroke="#92400E" strokeWidth={i <= nomor ? 1.4 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
            <path d="M5 5 H13" stroke="#92400E" strokeWidth="0.9" />
          </svg>
        ))}
      </div>
    );
  if (tema === "garis")
    return (
      <div className="mx-auto flex max-w-md items-center justify-center px-1" aria-label={`Titik ${Math.min(nomor, total)} dari ${total}`}>
        <svg viewBox={`0 0 ${total * 14 + 8} 18`} className="h-5 w-full max-w-[320px]" aria-hidden="true">
          <line x1="2" y1="9" x2={total * 14 + 6} y2="9" stroke="#475569" strokeWidth="1.6" />
          {n.map((i) => (
            <g key={i}>
              <line x1={i * 14 - 4} y1="5" x2={i * 14 - 4} y2="13" stroke="#475569" strokeWidth="1" />
              {i < nomor ? <circle cx={i * 14 - 4} cy="9" r="4.2" fill="#2563EB" stroke="#1C01A5" strokeWidth="0.8" /> : null}
              {i === nomor ? <circle className="animate-pulse" cx={i * 14 - 4} cy="9" r="4.4" fill="#FACC15" stroke="#1C01A5" strokeWidth="1.2" /> : null}
            </g>
          ))}
        </svg>
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-1" aria-label={`Centang ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} className={`w-4 text-center text-sm font-black leading-none ${i < nomor ? "text-[#FEF9C3]" : i === nomor ? "animate-pulse text-[#FDE047]" : "text-[#FEF9C3]/30"}`} aria-hidden="true">
          {i < nomor ? "✓" : "·"}
        </span>
      ))}
    </div>
  );
}

export default function TahapUrut({
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
  const tema: Tema = rupa === "benda" ? "bak" : rupa === "diagram" ? "garis" : "kapur";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_C}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-3xl border-[8px] border-[#92400E] bg-[#14532D] shadow-[0_6px_0_rgba(20,83,45,0.5)]">
        <div className="relative space-y-3 overflow-hidden rounded-xl p-4" style={LATAR.kapur}>
          <p className="relative text-center text-lg font-black text-[#FEF9C3]">{"\u{1F4CC}"} Poin Penting: Membandingkan dan Mengurutkan Bilangan</p>
          <ul className="relative space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-[#FDE68A] bg-[#FFFBEB] px-3 py-2 text-sm font-bold text-[#78350F]" style={{ transform: `rotate(${i % 2 === 0 ? -0.4 : 0.4}deg)` }}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B45309] text-[10px] font-black text-white">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="relative rounded-2xl border-4 border-[#FDE68A] bg-[#FEF9C3] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F69A}"} {PENUTUP_C}
          </p>
          <div className="relative flex justify-center">
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
  const kepala = tema === "bak" ? "rounded-lg border-4 border-dashed border-[#92400E] bg-[#FFFBEB]" : tema === "garis" ? "rounded-md border-2 border-[#475569] bg-white" : "rounded-xl border-4 border-[#FDE68A] bg-[#FEF9C3]";
  const papan = tema === "bak" ? "rounded-lg border-4 border-[#92400E]" : tema === "garis" ? "rounded-md border-2 border-[#475569]" : "rounded-xl border-4 border-[#FDE68A]";
  const warnaKepala = tema === "garis" ? "text-[#334155]" : tema === "bak" ? "text-[#92400E]" : "text-[#78350F]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3 pt-5" style={LATAR[tema]}>
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-[#FEF9C3] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#4338CA]">
              Tugas {nomor} dari {total} · {cariSalah ? "\u{1F50E} Cari kesalahan · " : ""}
              {rupa === "benda" ? `${IKON_METODE[ls.metode]} ` : ""}
              {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahUrut key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  return <div className="rounded-3xl">{isi}</div>;
}
