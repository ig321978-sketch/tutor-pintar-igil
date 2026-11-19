"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahKurang } from "./LangkahKurang";
import { POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 3 Bab 1 Sub-Bab E: dua belas tugas lanjutan Misi Rak Sisa
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru, berbeda dari
 * Kelas 1, Kelas 2, dan Sub-Bab lain Bab ini: Concrete = rak kayu bertingkat dengan papan penyangga berwarna cokelat, kemajuan berupa deretan bungkus mi yang diambil satu per satu;
 * Pictorial = papan kapur hijau tua dengan bingkai kayu, kemajuan berupa goresan kapur (empat garis tegak dan satu coretan miring tiap lima tugas);
 * Abstract = kertas nota kasir dengan tepi bergerigi, kemajuan berupa baris nota yang tercetak. Abstract diakhiri Poin Penting. Tanpa skor.
 */

type Tema = "rak" | "papan" | "nota";
const LATAR: Record<Tema, React.CSSProperties> = {
  rak: {
    backgroundColor: "#FEF3C7",
    backgroundImage: "repeating-linear-gradient(180deg,transparent 0 78px,#B45309 78px 84px,#D6A15E 84px 88px)",
  },
  papan: {
    backgroundColor: "#166534",
    backgroundImage: "radial-gradient(circle at 30% 20%,rgba(255,255,255,0.10) 0 12%,transparent 40%),radial-gradient(circle at 80% 80%,rgba(255,255,255,0.07) 0 14%,transparent 42%)",
  },
  nota: {
    backgroundColor: "#FFFEF5",
    backgroundImage: "repeating-linear-gradient(180deg,transparent 0 27px,#E7E5E4 27px 28px)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "rak")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-1" aria-label={`Bungkus ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 22 16" className={`h-4 w-6 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x="1.5" y="2" width="19" height="12" rx="2.5" fill={i < nomor ? "transparent" : "#FDBA74"} stroke="#B45309" strokeWidth={i <= nomor ? 1.4 : 1} strokeDasharray={i < nomor ? "2 2" : undefined} />
            {i >= nomor ? <path d="M4 8 q2.5 -3 5 0 t5 0 t3 0" fill="none" stroke="#B45309" strokeWidth="1" /> : null}
          </svg>
        ))}
      </div>
    );
  if (tema === "papan") {
    const lengkap = Math.floor((Math.min(nomor, total + 1) - 1) / 5);
    const sisa = (Math.min(nomor, total + 1) - 1) % 5;
    const kelompok = Array.from({ length: Math.ceil(total / 5) }, (_, g) => g);
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-2 px-1" aria-label={`Goresan ${Math.min(nomor, total)} dari ${total}`}>
        {kelompok.map((g) => {
          const isi = g < lengkap ? 5 : g === lengkap ? sisa : 0;
          return (
            <svg key={g} viewBox="0 0 32 18" className="h-5 w-8" aria-hidden="true">
              {Array.from({ length: Math.min(4, isi) }, (_, j) => (
                <line key={j} x1={5 + j * 6} y1="2" x2={5 + j * 6} y2="16" stroke="#F8FAFC" strokeWidth="1.8" strokeLinecap="round" />
              ))}
              {isi === 5 ? <line x1="1" y1="14" x2="30" y2="4" stroke="#F8FAFC" strokeWidth="1.8" strokeLinecap="round" /> : null}
              {isi === 0 ? <rect x="2" y="2" width="28" height="14" fill="none" stroke="#86EFAC" strokeWidth="1" strokeDasharray="2 2" /> : null}
            </svg>
          );
        })}
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-md space-y-0.5 px-4" aria-label={`Baris ${Math.min(nomor, total)} dari ${total}`}>
      <div className="flex flex-wrap justify-center gap-0.5">
        {n.map((i) => (
          <span key={i} className={`h-2 w-5 rounded-sm ${i < nomor ? "bg-[#57534E]" : i === nomor ? "animate-pulse bg-[#F59E0B]" : "border border-dashed border-[#A8A29E] bg-transparent"}`} />
        ))}
      </div>
    </div>
  );
}

export default function TahapKurang({
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
  const tema: Tema = rupa === "benda" ? "rak" : rupa === "diagram" ? "papan" : "nota";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-3xl border-[8px] border-[#92400E] bg-[#FFFEF5] shadow-[0_6px_0_rgba(120,53,15,0.4)]">
        <div className="relative space-y-3 overflow-hidden rounded-xl p-4" style={LATAR.nota}>
          <p className="rounded-xl border-4 border-dashed border-[#92400E] bg-[#FEF3C7] px-3 py-2 text-center text-lg font-black tracking-widest text-[#78350F]">
            {"\u{1F9FE}"} NOTA SISA STOK {"\u{1F9FE}"}
          </p>
          <p className="text-center text-lg font-black text-[#92400E]">{"\u{1F4CC}"} Poin Penting: Pengurangan sampai Seratus</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#A8A29E] bg-white px-3 py-2 text-sm font-bold text-[#292524]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B45309] text-[10px] font-black text-white">{i + 1}</span>
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
      </div>
    );
  if (!so || !ls) return null;

  const terakhirSemua = s === soal.length - 1 && l === so.langkah.length - 1;
  const total = soal.reduce((n, x) => n + x.langkah.length, 0);
  const nomor = soal.slice(0, s).reduce((n, x) => n + x.langkah.length, 0) + l + 1;
  const kepala = tema === "rak" ? "rounded-lg border-4 border-[#92400E] bg-[#FFF7ED]" : tema === "papan" ? "rounded-md border-4 border-[#D6A15E] bg-[#14532D]" : "rounded-sm border-2 border-dashed border-[#78716C] bg-white";
  const papan = tema === "rak" ? "rounded-lg border-4 border-[#B45309]" : tema === "papan" ? "rounded-md border-4 border-[#D6A15E]" : "rounded-sm border-2 border-dashed border-[#78716C]";
  const warnaKepala = tema === "papan" ? "text-[#BBF7D0]" : tema === "rak" ? "text-[#92400E]" : "text-[#57534E]";
  const warnaJudul = tema === "papan" ? "text-white" : "text-[#1C01A5]";
  const cariSalah = ls.langkah.tipe === "salah";
  return (
    <div className="rounded-3xl">
      <div className="space-y-3 rounded-2xl p-3 pt-5" style={LATAR[tema]}>
        <style>{CSS_LEMARI}</style>
        <div className={`p-2 ${kepala}`}>
          <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
            {pita.ikon} {pita.nama} · {pita.cara}
          </p>
          <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
          <p className={`text-sm font-bold ${tema === "papan" ? "text-[#DCFCE7]" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
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
          <LangkahKurang key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
        </div>

        {benar ? (
          <div className="flex justify-center">
            <button type="button" onClick={lanjut} className={TOMBOL_UTAMA}>
              {terakhirSemua ? (poinPenting ? "LIHAT POIN PENTING ⬇️" : teksAkhir) : l < so.langkah.length - 1 ? "TUGAS BERIKUTNYA ➡️" : `LANJUT: ${NAMA_CARA[soal[s + 1].cara].toUpperCase()} ➡️`}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
