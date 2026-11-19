"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahTambah } from "./LangkahTambah";
import { PENUTUP_D, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 3 Bab 1 Sub-Bab D: dua belas tugas lanjutan Misi Meja Pesanan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru, berbeda dari
 * Kelas 1, Kelas 2, dan Sub-Bab lain Kelas 3 Bab 1: Concrete = meja pesanan bertaplak kotak-kotak merah putih berbingkai kayu, kemajuan berupa deretan kotak kue yang terisi;
 * Pictorial = papan kapur hijau tua berbingkai kayu dengan lekuk kapur, kemajuan berupa batang puluhan biru yang terisi; Abstract = nota pesanan krem bergaris dengan garis margin merah dan jilidan,
 * kemajuan berupa deret kotak centang. Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab E. Tanpa skor.
 */

type Tema = "meja" | "kapur" | "nota";
const LATAR: Record<Tema, React.CSSProperties> = {
  meja: {
    backgroundColor: "#FFFFFF",
    backgroundImage: "linear-gradient(90deg,rgba(220,38,38,0.28) 50%,transparent 50%),linear-gradient(rgba(220,38,38,0.28) 50%,transparent 50%)",
    backgroundSize: "28px 28px",
  },
  kapur: {
    backgroundColor: "#1E5B43",
    backgroundImage: "radial-gradient(ellipse at 20% 10%,rgba(255,255,255,0.1),transparent 55%),radial-gradient(ellipse at 80% 90%,rgba(255,255,255,0.08),transparent 50%)",
  },
  nota: {
    backgroundColor: "#FFFBEB",
    backgroundImage: "linear-gradient(90deg,transparent 0 34px,rgba(220,38,38,0.45) 34px 36px,transparent 36px),linear-gradient(rgba(37,99,235,0.2) 1px,transparent 1px)",
    backgroundSize: "100% 100%,100% 26px",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "meja")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 rounded-lg bg-white/90 px-2 py-1" aria-label={`Kotak kue ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 20 16" className={`h-4 w-5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x="1.5" y="5" width="17" height="10" rx="1.5" fill={i <= nomor ? "#FCD34D" : "#FFFFFF"} stroke="#92400E" strokeWidth={i <= nomor ? 1.4 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
            {i < nomor ? <circle cx="10" cy="3.4" r="2.6" fill="#EC4899" stroke="#9D174D" strokeWidth="0.8" /> : null}
          </svg>
        ))}
      </div>
    );
  if (tema === "kapur")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 px-2 py-1" aria-label={`Batang ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 10 22" className={`h-5 w-2.5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x="1" y="1" width="8" height="20" rx="1.5" fill={i <= nomor ? "#60A5FA" : "transparent"} stroke="#E2E8F0" strokeWidth={i <= nomor ? 1.2 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
            {i <= nomor ? <path d="M1 7 H9 M1 12 H9 M1 17 H9" stroke="#1E3A8A" strokeWidth="0.7" /> : null}
          </svg>
        ))}
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

export default function TahapTambah({
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
  const tema: Tema = rupa === "benda" ? "meja" : rupa === "diagram" ? "kapur" : "nota";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_D}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-3xl border-[10px] border-[#9D174D] bg-[#BE185D] shadow-[0_6px_0_rgba(80,7,36,0.4)]">
        <div className="space-y-3 rounded-lg p-4" style={LATAR.nota}>
          <p className="pl-8 text-center text-lg font-black text-[#9D174D]">{"\u{1F4CC}"} Poin Penting: Penjumlahan sampai 100</p>
          <ul className="space-y-1.5 pl-8">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-[#F9A8D4] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]" style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#BE185D] text-[10px] font-black text-white">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="ml-8 rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F4E3}"} {PENUTUP_D}
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
  const kepala = tema === "meja" ? "rounded-xl border-4 border-[#92400E] bg-white/95" : tema === "kapur" ? "rounded-md border-2 border-[#E2E8F0] bg-white" : "rounded-md border-2 border-[#DC2626] bg-white";
  const papan = tema === "meja" ? "rounded-2xl border-4 border-[#92400E]" : tema === "kapur" ? "rounded-md border-2 border-[#E2E8F0]" : "rounded-md border-2 border-[#DC2626]";
  const warnaKepala = tema === "kapur" ? "text-[#166534]" : tema === "meja" ? "text-[#92400E]" : "text-[#B91C1C]";
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
        <LangkahTambah key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "nota")
    return (
      <div className="rounded-3xl border-[10px] border-[#9D174D] bg-[#BE185D] shadow-[0_6px_0_rgba(80,7,36,0.4)]">
        <div className="mx-auto -mt-4 mb-1 flex h-4 w-24 justify-around rounded-t-md bg-[#94A3B8] px-2 shadow-[0_2px_0_rgba(15,23,42,0.4)]" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="mt-0.5 block h-2 w-2 rounded-full bg-[#475569]" />
          ))}
        </div>
        {isi}
      </div>
    );
  if (tema === "kapur") return <div className="rounded-xl border-[8px] border-[#8B5A2B] bg-[#8B5A2B] shadow-[0_6px_0_rgba(69,43,20,0.45)]">{isi}</div>;
  return (
    <div className="overflow-hidden rounded-3xl border-[8px] border-[#7C2D12] bg-[#7C2D12] shadow-[0_6px_0_rgba(69,26,3,0.4)]">
      {isi}
      <div className="h-3 bg-[#C99A63]" aria-hidden="true" />
    </div>
  );
}
