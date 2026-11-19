"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahKali } from "./LangkahKali";
import { PENUTUP_F, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 3 Bab 1 Sub-Bab F: dua belas tugas lanjutan Misi Rak Kotak
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru, berbeda dari
 * Kelas 1, Kelas 2, dan Sub-Bab lain Kelas 3 Bab 1: Concrete = rak telur karton cokelat berlekuk-lekuk dengan tutup bergerigi, kemajuan berupa deretan telur cokelat yang terisi satu per satu;
 * Pictorial = lembar petak hijau muda bertitik-titik dengan garis tepi tosca, kemajuan berupa kotak yang terisi satu titik; Abstract = struk mesin kasir putih bergaris putus-putus dengan huruf mesin ketik,
 * kemajuan berupa deret tombol kasir yang menghitam. Abstract diakhiri Poin Penting (struk perkalian) dan jembatan ke Sub-Bab G. Tanpa skor.
 */

type Tema = "rak" | "petak" | "struk";
const LATAR: Record<Tema, React.CSSProperties> = {
  rak: {
    backgroundColor: "#FDE9C8",
    backgroundImage: "radial-gradient(circle at 50% 50%,rgba(146,64,14,0.18) 0 7px,transparent 8px)",
    backgroundSize: "30px 30px",
  },
  petak: {
    backgroundColor: "#ECFDF5",
    backgroundImage: "radial-gradient(rgba(15,118,110,0.35) 1.2px,transparent 1.6px)",
    backgroundSize: "16px 16px",
  },
  struk: {
    backgroundColor: "#FFFDF5",
    backgroundImage: "repeating-linear-gradient(0deg,transparent 0 27px,rgba(71,85,105,0.14) 27px 28px)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "rak")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-1" aria-label={`Telur ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 16 20" className={`h-5 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <ellipse cx="8" cy="11" rx="6" ry="8" fill={i < nomor ? "#D9A066" : "#FFF7ED"} stroke="#8A4B1F" strokeWidth={i <= nomor ? 1.4 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
          </svg>
        ))}
      </div>
    );
  if (tema === "petak")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-0.5 px-1" aria-label={`Petak ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 16 16" className={`h-4 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x="1" y="1" width="14" height="14" fill="#FFFFFF" stroke="#0F766E" strokeWidth={i <= nomor ? 1.4 : 0.9} strokeDasharray={i > nomor ? "2 2" : undefined} />
            {i < nomor ? <circle cx="8" cy="8" r="3.6" fill="#2563EB" stroke="#1C01A5" strokeWidth="0.7" /> : null}
          </svg>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-1" aria-label={`Tombol ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <svg key={i} viewBox="0 0 14 14" className={`h-4 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
          <rect x="1" y="1" width="12" height="12" rx="2.5" fill={i < nomor ? "#1F2937" : "#FFFFFF"} stroke="#475569" strokeWidth={i <= nomor ? 1.4 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
        </svg>
      ))}
    </div>
  );
}

export default function TahapKali({
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
  const tema: Tema = rupa === "benda" ? "rak" : rupa === "diagram" ? "petak" : "struk";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_F}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-xl border-[6px] border-dashed border-[#475569] bg-[#FFFDF5] shadow-[0_6px_0_rgba(71,85,105,0.35)]">
        <div className="space-y-3 rounded-lg p-4 font-mono" style={LATAR.struk}>
          <p className="text-center text-xs font-black tracking-widest text-[#475569]">TOKO PAK JOKO</p>
          <p className="text-center text-lg font-black text-[#1F2937]">{"\u{1F4CC}"} Poin Penting: Perkalian</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 border-b-2 border-dashed border-[#CBD5E1] px-1 py-1.5 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#1F2937] text-[10px] font-black text-white">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-md border-2 border-dashed border-[#475569] bg-white px-3 py-2 text-center text-sm font-black text-[#1F2937]">
            {"\u{1F9FE}"} {PENUTUP_F}
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
  const kepala = tema === "rak" ? "rounded-xl border-4 border-[#A97B3F] bg-[#FFF7ED]" : tema === "petak" ? "rounded-md border-2 border-[#0F766E] bg-white" : "rounded-md border-2 border-dashed border-[#475569] bg-white";
  const papan = tema === "rak" ? "rounded-xl border-4 border-[#A97B3F]" : tema === "petak" ? "rounded-md border-2 border-[#0F766E]" : "rounded-md border-2 border-dashed border-[#475569]";
  const warnaKepala = tema === "petak" ? "text-[#0F766E]" : tema === "rak" ? "text-[#8A4B1F]" : "text-[#475569]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className={`space-y-3 rounded-2xl p-3 pt-5 ${tema === "struk" ? "font-mono" : ""}`} style={LATAR[tema]}>
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
        <LangkahKali key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#A97B3F] bg-[#C8955A] shadow-[0_6px_0_rgba(107,68,35,0.4)]">
        <div className="flex h-3 justify-around bg-[#B7814A]" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} className="block h-3 w-3 rounded-b-full bg-[#E9C98E]" />
          ))}
        </div>
        {isi}
      </div>
    );
  if (tema === "struk") return <div className="rounded-xl border-[6px] border-dashed border-[#475569] bg-[#FFFDF5] shadow-[0_6px_0_rgba(71,85,105,0.35)]">{isi}</div>;
  return <div className="rounded-xl border-[6px] border-[#0F766E] bg-[#0F766E] shadow-[0_6px_0_rgba(19,78,74,0.4)]">{isi}</div>;
}
