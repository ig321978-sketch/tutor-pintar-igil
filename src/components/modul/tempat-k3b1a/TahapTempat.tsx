"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahTempat } from "./LangkahTempat";
import { PENUTUP_A, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 3 Bab 1 Sub-Bab A: dua belas tugas lanjutan Misi Rak Stok
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8, Kelas 2 Bab 1 sampai 8, dan Sub-Bab lain Bab ini: Concrete = rak gudang berpapan kayu dengan garis papan, kemajuan berupa deret toples yang terisi permen;
 * Pictorial = papan kapur hijau tua berbingkai kayu, kemajuan berupa deret kubus Dienes yang terisi; Abstract = nota stok berkertas krem bergaris putus-putus, kemajuan berupa deret cap bulat berpentung centang.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B. Tanpa skor.
 */

type Tema = "rak" | "kapur" | "nota";
const LATAR: Record<Tema, React.CSSProperties> = {
  rak: {
    backgroundColor: "#FDE7C2",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(146,64,14,0.18) 0 2px,transparent 2px 46px),linear-gradient(90deg,rgba(146,64,14,0.08),transparent 25%,transparent 75%,rgba(146,64,14,0.08))",
  },
  kapur: {
    backgroundColor: "#14532D",
    backgroundImage: "radial-gradient(circle at 20% 18%,rgba(255,255,255,0.1) 0 18%,transparent 40%),radial-gradient(circle at 82% 70%,rgba(255,255,255,0.08) 0 16%,transparent 38%)",
  },
  nota: {
    backgroundColor: "#FFFDF5",
    backgroundImage: "repeating-linear-gradient(0deg,transparent 0 24px,rgba(100,116,139,0.28) 24px 25px)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "rak")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 px-2 py-1" aria-label={`Toples ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 16 22" className={`h-5 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x="4" y="1" width="8" height="4" rx="1.2" fill="#16A34A" stroke="#166534" strokeWidth="0.8" />
            <rect x="2" y="5" width="12" height="15" rx="3" fill={i <= nomor ? "#FDBA74" : "#E0F2FE"} stroke="#0369A1" strokeWidth="1" />
            {i <= nomor ? <circle cx="8" cy="13" r="2.6" fill="#F97316" stroke="#9A3412" strokeWidth="0.8" /> : null}
          </svg>
        ))}
      </div>
    );
  if (tema === "kapur")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Kubus ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3.5 w-3.5 rounded-[2px] border-2 ${i === nomor ? "animate-pulse border-[#FDE047] bg-[#FDE047]" : i < nomor ? "border-white bg-white" : "border-white/50 bg-transparent"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`flex h-5 w-5 items-center justify-center rounded-full border-2 text-[10px] font-black leading-none ${i === nomor ? "animate-pulse border-[#B91C1C] bg-[#FEE2E2] text-[#B91C1C]" : i < nomor ? "border-[#B91C1C] bg-white text-[#B91C1C]" : "border-dashed border-[#94A3B8] bg-white text-transparent"}`}>
          {i < nomor ? "\u{2713}" : ""}
        </span>
      ))}
    </div>
  );
}

export default function TahapTempat({
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
  const tema: Tema = rupa === "benda" ? "rak" : rupa === "diagram" ? "kapur" : "nota";
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
      <div className="rounded-md border-[6px] border-double border-[#94A3B8] bg-white shadow-[0_6px_0_rgba(71,85,105,0.3)]">
        <div className="space-y-3 rounded-sm p-4" style={LATAR.nota}>
          <p className="text-center text-lg font-black text-[#B91C1C]">{"\u{1F4CC}"} Poin Penting: Bilangan Tiga Angka</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#94A3B8] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#B91C1C] text-[10px] font-black text-[#B91C1C]">{i + 1}</span>
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
  const kepala = tema === "rak" ? "rounded-xl border-4 border-[#92400E] bg-[#FFFBEB]" : tema === "kapur" ? "rounded-md border-2 border-white bg-white" : "rounded-md border-2 border-dashed border-[#94A3B8] bg-white";
  const papan = tema === "rak" ? "rounded-2xl border-4 border-[#92400E]" : tema === "kapur" ? "rounded-md border-2 border-white" : "rounded-md border-2 border-dashed border-[#94A3B8]";
  const warnaKepala = tema === "kapur" ? "text-[#166534]" : tema === "rak" ? "text-[#9A3412]" : "text-[#B91C1C]";
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
        <LangkahTempat key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "rak")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#92400E] bg-[#92400E] shadow-[0_6px_0_rgba(69,26,3,0.4)]">
        <div className="h-3 bg-[#B7814A]" aria-hidden="true" />
        {isi}
        <div className="h-3 bg-[#B7814A]" aria-hidden="true" />
      </div>
    );
  if (tema === "kapur") return <div className="rounded-xl border-[10px] border-[#A16207] bg-[#14532D] shadow-[0_6px_0_rgba(66,32,6,0.45)]">{isi}</div>;
  return <div className="rounded-md border-[6px] border-double border-[#94A3B8] bg-white shadow-[0_6px_0_rgba(71,85,105,0.3)]">{isi}</div>;
}
