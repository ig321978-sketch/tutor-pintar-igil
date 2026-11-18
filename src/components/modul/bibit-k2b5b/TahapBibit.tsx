"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahBibit } from "./LangkahBibit";
import { PENUTUP_B, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 5 Sub-Bab B: dua belas tugas lanjutan Misi Bedeng Bibit
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 dan Kelas 2 Bab 1 sampai 4: Concrete = bedeng tanah berlarik krem dengan papan nama tanaman sebagai kepala, kemajuan berupa deretan
 * tunas yang tumbuh menjadi bunga; Pictorial = kertas kisi hijau dengan kotak label bergaris putus, kemajuan berupa deretan titik yang terisi;
 * Abstract = lembar tabel bergaris teal dengan kepala tabel, kemajuan berupa sel bernomor yang terisi. Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab C.
 * Tanpa skor.
 */

type Tema = "bedeng" | "kisi" | "tabel";
const LATAR: Record<Tema, React.CSSProperties> = {
  bedeng: { backgroundColor: "#FEF3C7", backgroundImage: "repeating-linear-gradient(0deg,#FCD9A0 0 6px,#FEF3C7 6px 26px)" },
  kisi: { backgroundColor: "#F0FDF4", backgroundImage: "linear-gradient(90deg,rgba(22,163,74,0.16) 1px,transparent 1px),linear-gradient(rgba(22,163,74,0.16) 1px,transparent 1px)", backgroundSize: "22px 22px" },
  tabel: { backgroundColor: "#FFFFFF", backgroundImage: "linear-gradient(rgba(15,118,110,0.2) 1px,transparent 1px)", backgroundSize: "100% 30px" },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "bedeng")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-0.5 px-2 py-1" aria-label={`Tunas ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`flex h-6 w-6 items-end justify-center text-base ${i === nomor ? "animate-pulse" : ""}`} style={{ opacity: i > nomor ? 0.25 : 1 }}>
            {i < nomor ? "\u{1F33B}" : "\u{1F331}"}
          </span>
        ))}
      </div>
    );
  if (tema === "kisi")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1.5 px-2 py-1.5" aria-label={`Titik ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3.5 w-3.5 rounded-full border-2 border-[#15803D] ${i === nomor ? "animate-pulse" : ""}`} style={{ background: i < nomor ? "#4ADE80" : "transparent", borderStyle: i > nomor ? "dashed" : "solid" }} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center px-2 py-1" aria-label={`Sel tabel ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`flex h-5 w-6 items-center justify-center border border-[#0F766E] text-[10px] font-black ${i === nomor ? "animate-pulse" : ""}`} style={{ background: i < nomor ? "#5EEAD4" : "#FFFFFF", color: i <= nomor ? "#134E4A" : "#99F6E4" }}>
          {i}
        </span>
      ))}
    </div>
  );
}

export default function TahapBibit({
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
  const tema: Tema = rupa === "benda" ? "bedeng" : rupa === "diagram" ? "kisi" : "tabel";
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
      <div className="rounded-3xl border-[8px] border-[#0F766E] bg-white shadow-[0_6px_0_rgba(19,78,74,0.4)]">
        <div className="space-y-3 rounded-xl p-4" style={LATAR.tabel}>
          <div className="overflow-hidden rounded-xl border-4 border-[#0F766E] bg-white">
            <p className="bg-[#0F766E] px-3 py-2 text-center text-lg font-black text-white">Poin Penting: Setengah dari Kumpulan Benda</p>
            <ol className="divide-y divide-[#99F6E4]">
              {POIN_PENTING.map((p, i) => (
                <li key={p} className="flex items-start gap-2 px-3 py-2 text-sm font-bold text-[#134E4A]">
                  <span className="flex h-6 w-7 shrink-0 items-center justify-center border border-[#0F766E] bg-[#CCFBF1] text-xs font-black">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ol>
          </div>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">{PENUTUP_B}</p>
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
  const kepala = tema === "bedeng" ? "rounded-md border-4 border-[#92400E] border-b-[10px] bg-[#FDE68A]" : tema === "kisi" ? "border-2 border-dashed border-[#16A34A] bg-white" : "rounded-t-lg border-2 border-[#0F766E] bg-[#0F766E]";
  const papan = tema === "bedeng" ? "rounded-2xl border-4 border-[#92400E]" : tema === "kisi" ? "border-2 border-[#16A34A]" : "rounded-md border-2 border-[#0F766E]";
  const warnaKepala = tema === "tabel" ? "text-[#CCFBF1]" : tema === "kisi" ? "text-[#15803D]" : "text-[#78350F]";
  const warnaJudul = tema === "tabel" ? "text-white" : "text-[#1C01A5]";
  const cariSalah = ls.langkah.tipe === "salah";
  return (
    <div className="rounded-3xl">
      <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
        <style>{CSS_LEMARI}</style>
        <div className={`p-2 ${kepala}`}>
          <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
            {pita.ikon} {pita.nama} · {pita.cara}
          </p>
          <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
          <p className={`text-sm font-bold ${tema === "tabel" ? "text-white/85" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
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
          <LangkahBibit key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
