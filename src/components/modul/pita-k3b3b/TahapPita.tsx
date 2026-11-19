"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahPita } from "./LangkahPita";
import { PENUTUP_B, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 3 Bab 3 Sub-Bab B: dua belas tugas lanjutan Misi Bengkel Pita
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari bab lain dan Sub-Bab A Bab ini: Concrete = meja bengkel kayu beralas pita ukur kuning, kemajuan berupa deret pita yang tersambung;
 * Pictorial = kertas milimeter krem berkisi, kemajuan berupa deret batang pendek yang terisi; Abstract = lembar pesanan tukang bergaris dengan cap kuning, kemajuan berupa deret cap kuning.
 * Abstract diakhiri Poin Penting lalu jembatan ke Sub-Bab C (Bu Lastri membawa timbangan). Tanpa skor.
 */

type Tema = "bengkel" | "milimeter" | "pesanan";
const LATAR: Record<Tema, React.CSSProperties> = {
  bengkel: {
    backgroundColor: "#E8C99A",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(120,53,15,0.18) 0 2px,transparent 2px 46px),linear-gradient(90deg,rgba(255,255,255,0.3),transparent 20%)",
  },
  milimeter: {
    backgroundColor: "#FEF9E7",
    backgroundImage: "linear-gradient(rgba(180,83,9,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(180,83,9,0.2) 1px,transparent 1px),linear-gradient(rgba(180,83,9,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(180,83,9,0.12) 1px,transparent 1px)",
    backgroundSize: "60px 60px,60px 60px,12px 12px,12px 12px",
  },
  pesanan: {
    backgroundColor: "#FFFEF7",
    backgroundImage: "repeating-linear-gradient(0deg,transparent 0 26px,rgba(59,130,246,0.28) 26px 27px),linear-gradient(90deg,transparent 0 34px,rgba(217,119,6,0.5) 34px 36px,transparent 36px)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "bengkel")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center px-2 py-1" aria-label={`Pita ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 22 12" className={`h-3.5 w-[22px] ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x="1" y="2" width="20" height="8" rx="1.5" fill={i <= nomor ? "#FACC15" : "#FEF3C7"} stroke={i <= nomor ? "#A16207" : "#D6A15E"} strokeWidth="1" strokeDasharray={i <= nomor ? undefined : "2.4 1.6"} />
            {i <= nomor ? <path d="M6 2v3M11 2v5M16 2v3" stroke="#A16207" strokeWidth="0.9" /> : null}
          </svg>
        ))}
      </div>
    );
  if (tema === "milimeter")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 px-2 py-1" aria-label={`Batang ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-4 w-1.5 border-2 ${i === nomor ? "animate-pulse border-[#B45309] bg-[#FDE68A]" : i < nomor ? "border-[#B45309] bg-[#F59E0B]" : "border-dashed border-[#D97706]/60 bg-white/70"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-5 w-5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
          <circle cx="10" cy="10" r="8.6" fill={i < nomor ? "#FDE047" : "none"} stroke={i <= nomor ? "#CA8A04" : "#94A3B8"} strokeWidth="1.4" strokeDasharray={i <= nomor ? undefined : "2.4 2"} />
          {i < nomor ? <path d="M6 10.4l2.8 2.8L14 7.4" fill="none" stroke="#854D0E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /> : null}
        </svg>
      ))}
    </div>
  );
}

export default function TahapPita({
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
  const tema: Tema = rupa === "benda" ? "bengkel" : rupa === "diagram" ? "milimeter" : "pesanan";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_B}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-md border-[6px] border-[#D6A15E] bg-white shadow-[0_6px_0_rgba(146,64,14,0.3)]">
        <div className="space-y-3 rounded-sm p-4" style={LATAR.pesanan}>
          <p className="text-center text-lg font-black text-[#B45309]">{"\u{1F4CC}"} Poin Penting: Sentimeter dan Meter</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#D6A15E] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#CA8A04] bg-[#FEF9C3] text-[10px] font-black text-[#854D0E]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border-4 border-[#CA8A04] bg-[#FEF9C3] p-3 text-center" data-uji="jembatan-sub-bab-c">
            <p className="text-sm font-black text-[#713F12]">
              <span aria-hidden="true">{"\u{1F9F5}"}</span> {PENUTUP_B}
            </p>
          </div>
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
  const kepala = tema === "bengkel" ? "rounded-xl border-4 border-[#92400E] bg-[#FFFBEB]" : tema === "milimeter" ? "rounded-md border-2 border-[#D97706] bg-white" : "rounded-md border-2 border-dashed border-[#D6A15E] bg-white";
  const papan = tema === "bengkel" ? "rounded-2xl border-4 border-[#92400E]" : tema === "milimeter" ? "rounded-md border-2 border-[#D97706]" : "rounded-md border-2 border-dashed border-[#D6A15E]";
  const warnaKepala = tema === "milimeter" ? "text-[#92400E]" : tema === "bengkel" ? "text-[#9A3412]" : "text-[#A16207]";
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
        <LangkahPita key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "bengkel")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#92400E] bg-[#92400E] shadow-[0_6px_0_rgba(69,26,3,0.4)]">
        <div className="h-3 bg-[#FACC15]" aria-hidden="true" style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent 0 9px,rgba(146,64,14,0.55) 9px 10px)" }} />
        {isi}
        <div className="h-3 bg-[#FACC15]" aria-hidden="true" style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent 0 9px,rgba(146,64,14,0.55) 9px 10px)" }} />
      </div>
    );
  if (tema === "milimeter") return <div className="rounded-lg border-[6px] border-[#D97706] bg-[#FEF9E7] shadow-[0_6px_0_rgba(146,64,14,0.3)]">{isi}</div>;
  return <div className="rounded-md border-[6px] border-[#D6A15E] bg-white shadow-[0_6px_0_rgba(146,64,14,0.3)]">{isi}</div>;
}
