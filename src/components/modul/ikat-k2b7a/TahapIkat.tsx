"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahIkat } from "./LangkahIkat";
import { PENUTUP_A, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 7 Sub-Bab A: dua belas tugas lanjutan Misi Gudang Ikat
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8 dan Kelas 2 Bab 1 sampai 6: Concrete = lantai gudang berpapan kayu berbingkai tali rafia, kemajuan berupa deret ikat kecil yang terisi;
 * Pictorial = lembar catatan hijau berkisi dengan garis tepi merah, kemajuan berupa deret kotak sepuluh yang terisi; Abstract = papan tulis hijau berbingkai kayu dengan
 * nampan kapur, kemajuan berupa deret titik kapur. Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B. Tanpa skor.
 */

type Tema = "gudang" | "catatan" | "kapur";
const LATAR: Record<Tema, React.CSSProperties> = {
  gudang: {
    backgroundColor: "#E7D3A8",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(120,53,15,0.2) 0 2px,transparent 2px 30px),repeating-linear-gradient(90deg,rgba(120,53,15,0.07) 0 1px,transparent 1px 70px)",
  },
  catatan: {
    backgroundColor: "#F0FDF4",
    backgroundImage: "linear-gradient(90deg,transparent 0 34px,rgba(220,38,38,0.45) 34px 36px,transparent 36px 100%),linear-gradient(rgba(22,163,74,0.28) 1px,transparent 1px)",
    backgroundSize: "100% 100%,100% 24px",
  },
  kapur: {
    backgroundColor: "#166534",
    backgroundImage: "radial-gradient(ellipse at 22% 30%,rgba(255,255,255,0.1) 0,transparent 42%),radial-gradient(ellipse at 78% 74%,rgba(255,255,255,0.08) 0,transparent 40%)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "gudang")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 px-2 py-1" aria-label={`Ikat ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 18 14" className={`h-3.5 w-[18px] ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x="1" y="1" width="16" height="12" rx="3" fill={i <= nomor ? "#FDE68A" : "#FFFFFF"} stroke="#A16207" strokeWidth={i === nomor ? 1.8 : 1.1} strokeDasharray={i > nomor ? "2 2" : undefined} />
            <rect x="7" y="4" width="4" height="6" rx="1.2" fill={i <= nomor ? "#CA8A04" : "#FFFFFF"} stroke="#A16207" strokeWidth="0.8" />
          </svg>
        ))}
      </div>
    );
  if (tema === "catatan")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 px-2 py-1" aria-label={`Kotak ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 12 12" className={`h-3 w-3 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x="1" y="1" width="10" height="10" fill={i <= nomor ? "#86EFAC" : "#FFFFFF"} stroke="#15803D" strokeWidth={i === nomor ? 1.8 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
          </svg>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1.5 px-2 py-1" aria-label={`Titik ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block text-sm font-black leading-none ${i === nomor ? "animate-pulse text-[#FDE047]" : i < nomor ? "text-white" : "text-white/40"}`}>
          {i < nomor ? "\u{25CF}" : i === nomor ? "\u{25C9}" : "\u{25CB}"}
        </span>
      ))}
    </div>
  );
}

export default function TahapIkat({
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
  const tema: Tema = rupa === "benda" ? "gudang" : rupa === "diagram" ? "catatan" : "kapur";
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
      <div className="rounded-3xl border-[10px] border-[#78350F] bg-[#78350F] shadow-[0_6px_0_rgba(69,26,3,0.4)]">
        <div className="space-y-3 rounded-xl p-4" style={LATAR.kapur}>
          <p className="text-center text-lg font-black text-[#FDE047]">{"\u{1F4CC}"} Poin Penting: Bilangan sampai Seratus</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-[#FDE68A] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]" style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-[10px] font-black text-white">{i + 1}</span>
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
  const kepala = tema === "gudang" ? "rounded-xl border-4 border-[#CA8A04] bg-white/95" : tema === "catatan" ? "rounded-md border-2 border-[#15803D] bg-white" : "rounded-md border-2 border-[#FDE68A] bg-white";
  const papan = tema === "gudang" ? "rounded-2xl border-4 border-[#FDE68A]" : tema === "catatan" ? "rounded-md border-2 border-[#15803D]" : "rounded-md border-2 border-[#FDE68A]";
  const warnaKepala = tema === "catatan" ? "text-[#15803D]" : tema === "gudang" ? "text-[#92400E]" : "text-[#166534]";
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
        <LangkahIkat key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "kapur")
    return (
      <div className="rounded-3xl border-[10px] border-[#78350F] bg-[#78350F] shadow-[0_6px_0_rgba(69,26,3,0.4)]">
        {isi}
        <div className="mx-auto mt-1 flex h-3 w-40 items-center justify-center gap-2 rounded-b-md bg-[#451A03]" aria-hidden="true">
          <span className="block h-1.5 w-6 rounded-full bg-white" />
          <span className="block h-1.5 w-6 rounded-full bg-[#FDE047]" />
          <span className="block h-1.5 w-6 rounded-full bg-[#F9A8D4]" />
        </div>
      </div>
    );
  if (tema === "gudang")
    return (
      <div className="rounded-3xl border-[8px] border-[#B45309] bg-[#B45309] p-1 shadow-[0_6px_0_rgba(69,26,3,0.4)]">
        <div className="rounded-2xl border-4 border-dashed border-[#FDE68A]">{isi}</div>
      </div>
    );
  return <div className="rounded-xl border-[6px] border-[#15803D] bg-[#15803D] shadow-[0_6px_0_rgba(20,83,45,0.4)]">{isi}</div>;
}
