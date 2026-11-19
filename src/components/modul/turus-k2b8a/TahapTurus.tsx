"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahTurus } from "./LangkahTurus";
import { PENUTUP_A, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 8 Sub-Bab A: dua belas tugas lanjutan Misi Meja Catat
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8 dan Kelas 2 Bab 1 sampai 7: Concrete = balik tirai panggung bertirai merah dengan rumbai dan lantai papan, kemajuan berupa deret lampu sorot yang menyala;
 * Pictorial = lembar catatan biru berkisi dengan garis tepi, kemajuan berupa turus yang bertambah (empat garis dan coretan miring); Abstract = papan jepit cokelat dengan jepitan logam dan kertas
 * bergaris, kemajuan berupa deret kotak centang. Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B. Tanpa skor.
 */

type Tema = "tirai" | "catatan" | "jepit";
const LATAR: Record<Tema, React.CSSProperties> = {
  tirai: {
    backgroundColor: "#DC2626",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(127,29,29,0.28) 0 3px,transparent 3px 26px),linear-gradient(180deg,rgba(0,0,0,0.12),transparent 30%)",
  },
  catatan: {
    backgroundColor: "#F0F9FF",
    backgroundImage: "linear-gradient(rgba(59,130,246,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.2) 1px,transparent 1px)",
    backgroundSize: "20px 20px",
  },
  jepit: {
    backgroundColor: "#FFFDF5",
    backgroundImage: "linear-gradient(rgba(37,99,235,0.22) 1px,transparent 1px)",
    backgroundSize: "100% 26px",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "tirai")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1.5 px-2 py-1" aria-label={`Lampu ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 16 20" className={`h-5 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x="4" y="1" width="8" height="6" rx="1.5" fill="#475569" />
            <circle cx="8" cy="10" r="3.4" fill={i <= nomor ? "#FDE047" : "#7F1D1D"} stroke={i <= nomor ? "#A16207" : "#450A0A"} strokeWidth="1" />
            {i <= nomor ? <path d="M3 18 L8 13 L13 18" fill="none" stroke="#FEF08A" strokeWidth="1.2" /> : null}
          </svg>
        ))}
      </div>
    );
  if (tema === "catatan")
    return (
      <div className="mx-auto flex max-w-md justify-center px-2 py-1" aria-label={`Turus ${Math.min(nomor, total)} dari ${total}`}>
        <svg viewBox={`0 0 ${Math.ceil(total / 5) * 34} 18`} className="h-5" style={{ width: Math.ceil(total / 5) * 34 }} aria-hidden="true">
          {n.map((i) => {
            const j = Math.floor((i - 1) / 5);
            const p = (i - 1) % 5;
            const warna = i <= nomor ? "#1D4ED8" : "#93C5FD";
            const tebal = i === nomor ? 2.6 : 1.6;
            return p < 4 ? (
              <line key={i} x1={4 + j * 34 + p * 6} y1={2} x2={4 + j * 34 + p * 6} y2={16} stroke={warna} strokeWidth={tebal} strokeLinecap="round" strokeDasharray={i > nomor ? "2 2" : undefined} />
            ) : (
              <line key={i} x1={j * 34 + 1} y1={14} x2={j * 34 + 27} y2={4} stroke={i <= nomor ? "#DC2626" : "#FCA5A5"} strokeWidth={tebal} strokeLinecap="round" />
            );
          })}
        </svg>
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Centang ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`flex h-4 w-4 items-center justify-center rounded-[3px] border-2 text-[10px] font-black leading-none ${i === nomor ? "animate-pulse border-[#B45309] bg-[#FEF08A] text-[#B45309]" : i < nomor ? "border-[#15803D] bg-[#DCFCE7] text-[#15803D]" : "border-[#CBD5E1] bg-white text-transparent"}`}>
          {i < nomor ? "\u{2713}" : ""}
        </span>
      ))}
    </div>
  );
}

export default function TahapTurus({
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
  const tema: Tema = rupa === "benda" ? "tirai" : rupa === "diagram" ? "catatan" : "jepit";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_A}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-3xl border-[10px] border-[#92400E] bg-[#B45309] shadow-[0_6px_0_rgba(69,26,3,0.4)]">
        <div className="mx-auto -mt-4 mb-1 h-4 w-24 rounded-t-md bg-[#94A3B8] shadow-[0_2px_0_rgba(15,23,42,0.4)]" aria-hidden="true" />
        <div className="space-y-3 rounded-lg p-4" style={LATAR.jepit}>
          <p className="text-center text-lg font-black text-[#9A3412]">{"\u{1F4CC}"} Poin Penting: Diagram Turus</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-[#FDBA74] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]" style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B91C1C] text-[10px] font-black text-white">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F4E3}"} {PENUTUP_A}
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
  const kepala = tema === "tirai" ? "rounded-xl border-4 border-[#FDE047] bg-white/95" : tema === "catatan" ? "rounded-md border-2 border-[#1D4ED8] bg-white" : "rounded-md border-2 border-[#B45309] bg-white";
  const papan = tema === "tirai" ? "rounded-2xl border-4 border-[#FDE047]" : tema === "catatan" ? "rounded-md border-2 border-[#1D4ED8]" : "rounded-md border-2 border-[#B45309]";
  const warnaKepala = tema === "catatan" ? "text-[#1D4ED8]" : tema === "tirai" ? "text-[#991B1B]" : "text-[#9A3412]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#475569] bg-[#F1F5F9] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#475569]">
              Tugas {nomor} dari {total} · {cariSalah ? "\u{1F50E} Cari kesalahan · " : ""}
              {rupa === "benda" ? `${IKON_METODE[ls.metode]} ` : ""}
              {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahTurus key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "jepit")
    return (
      <div className="rounded-3xl border-[10px] border-[#92400E] bg-[#B45309] shadow-[0_6px_0_rgba(69,26,3,0.4)]">
        <div className="mx-auto -mt-4 mb-1 h-4 w-24 rounded-t-md bg-[#94A3B8] shadow-[0_2px_0_rgba(15,23,42,0.4)]" aria-hidden="true" />
        {isi}
      </div>
    );
  if (tema === "tirai")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#7F1D1D] bg-[#7F1D1D] shadow-[0_6px_0_rgba(69,10,10,0.4)]">
        <div className="flex h-3 justify-around bg-[#991B1B]" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} className="block h-3 w-3 rounded-b-full bg-[#DC2626]" />
          ))}
        </div>
        {isi}
        <div className="h-3 bg-[#A5733E]" aria-hidden="true" />
      </div>
    );
  return <div className="rounded-xl border-[6px] border-[#1D4ED8] bg-[#1D4ED8] shadow-[0_6px_0_rgba(30,58,138,0.4)]">{isi}</div>;
}
