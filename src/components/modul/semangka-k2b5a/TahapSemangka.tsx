"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahSemangka } from "./LangkahSemangka";
import { PENUTUP_A, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 5 Sub-Bab A: dua belas tugas lanjutan Misi Meja Bagi
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8 dan Kelas 2 Bab 1 sampai 4: Concrete = gerobak panen berpapan kayu beroda dua di atas hamparan jerami, kemajuan berupa deret
 * buah bulat yang terisi dari setengah sampai penuh; Pictorial = lembar kisi putih bergaris abu-abu, kemajuan berupa deret persegi yang terbelah miring dan terisi satu setengahnya;
 * Abstract = papan kapur hijau berbingkai kayu, kemajuan berupa goresan kapur putih. Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B. Tanpa skor.
 */

type Tema = "gerobak" | "kisi" | "kapur";
const LATAR: Record<Tema, React.CSSProperties> = {
  gerobak: {
    backgroundColor: "#FEF3C7",
    backgroundImage: "repeating-linear-gradient(115deg,rgba(180,83,9,0.10) 0 2px,transparent 2px 9px),repeating-linear-gradient(65deg,rgba(217,119,6,0.08) 0 2px,transparent 2px 13px)",
  },
  kisi: {
    backgroundColor: "#FFFFFF",
    backgroundImage: "linear-gradient(rgba(100,116,139,0.28) 1px,transparent 1px),linear-gradient(90deg,rgba(100,116,139,0.28) 1px,transparent 1px)",
    backgroundSize: "24px 24px",
  },
  kapur: {
    backgroundColor: "#166534",
    backgroundImage: "radial-gradient(ellipse at 20% 25%,rgba(255,255,255,0.10) 0,transparent 45%),radial-gradient(ellipse at 80% 70%,rgba(255,255,255,0.08) 0,transparent 40%)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "gerobak")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Buah ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 16 16" className={`h-4 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <circle cx="8" cy="8" r="6.4" fill="#FFFFFF" stroke="#15803D" strokeWidth={i <= nomor ? 1.8 : 1.1} strokeDasharray={i > nomor ? "2 2" : undefined} />
            {i < nomor ? <circle cx="8" cy="8" r="6.4" fill="#4ADE80" stroke="#15803D" strokeWidth={1.8} /> : null}
            {i === nomor ? <path d="M8 1.6 A6.4 6.4 0 0 0 8 14.4 Z" fill="#4ADE80" /> : null}
          </svg>
        ))}
      </div>
    );
  if (tema === "kisi")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Persegi ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 14 14" className="h-3.5 w-3.5" aria-hidden="true">
            <rect x="1" y="1" width="12" height="12" fill="#FFFFFF" stroke="#475569" strokeWidth={i === nomor ? 2 : 1.2} strokeDasharray={i > nomor ? "2 2" : undefined} />
            {i <= nomor ? <polygon points="1,1 13,13 1,13" fill={i < nomor ? "#FDBA74" : "#FDE68A"} /> : null}
            {i <= nomor ? <line x1="1" y1="1" x2="13" y2="13" stroke="#475569" strokeWidth={1} /> : null}
          </svg>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1.5 px-2 py-1" aria-label={`Goresan ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`block h-4 w-[3px] rounded-full ${i === nomor ? "animate-pulse" : ""}`}
          style={{ transform: `rotate(${((i * 29) % 13) - 6}deg)`, background: i <= nomor ? "#F8FAFC" : "transparent", border: i <= nomor ? "none" : "1px dashed rgba(248,250,252,0.5)" }}
        />
      ))}
    </div>
  );
}

export default function TahapSemangka({
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
  const tema: Tema = rupa === "benda" ? "gerobak" : rupa === "diagram" ? "kisi" : "kapur";
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
      <div className="rounded-3xl border-[10px] border-[#92400E] bg-[#92400E] shadow-[0_6px_0_rgba(69,26,3,0.4)]">
        <div className="space-y-3 rounded-xl p-4" style={LATAR.kapur}>
          <p className="text-center text-lg font-black text-[#FDE68A]">{"\u{1F4CC}"} Poin Penting: Setengah dari Benda Utuh</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#F8FAFC]/80 bg-[#14532D] px-3 py-2 text-sm font-bold text-white" style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FDE047] text-[10px] font-black text-[#14532D]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F9FA}"} {PENUTUP_A}
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
  const kepala = tema === "gerobak" ? "rounded-xl border-4 border-[#92400E] bg-[#FFFBEB]" : tema === "kisi" ? "rounded-md border-2 border-[#475569] bg-white" : "rounded-md border-2 border-dashed border-[#F8FAFC]/80 bg-[#14532D]";
  const papan = tema === "gerobak" ? "rounded-2xl border-4 border-[#B45309]" : tema === "kisi" ? "rounded-md border-2 border-[#475569]" : "rounded-md border-2 border-[#F8FAFC]/80";
  const warnaKepala = tema === "kapur" ? "text-[#FDE047]" : tema === "kisi" ? "text-[#334155]" : "text-[#15803D]";
  const warnaJudul = tema === "kapur" ? "text-white" : "text-[#1C01A5]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "kapur" ? "text-white/85" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
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
              {rupa === "benda" ? `${IKON_METODE[ls.metode]} ` : ""}
              {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahSemangka key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "kapur") return <div className="rounded-3xl border-[10px] border-[#92400E] bg-[#92400E] shadow-[0_6px_0_rgba(69,26,3,0.4)]">{isi}</div>;
  if (tema === "gerobak")
    return (
      <div className="rounded-3xl">
        <div className="rounded-t-3xl border-[8px] border-b-0 border-[#92400E] bg-[#B45309]">{isi}</div>
        <div className="relative h-8 rounded-b-3xl border-[8px] border-t-0 border-[#92400E] bg-[#B45309]" aria-hidden="true">
          <span className="absolute -bottom-3 left-8 block h-9 w-9 rounded-full border-4 border-[#451A03] bg-[#FDE68A]" />
          <span className="absolute -bottom-3 right-8 block h-9 w-9 rounded-full border-4 border-[#451A03] bg-[#FDE68A]" />
        </div>
        <div className="h-3" aria-hidden="true" />
      </div>
    );
  return <div className="rounded-3xl">{isi}</div>;
}
