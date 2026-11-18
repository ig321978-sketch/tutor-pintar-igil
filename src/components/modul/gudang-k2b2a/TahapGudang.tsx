"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahGudang } from "./LangkahGudang";
import { JEMBATAN, JEMBATAN_SUARA, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 2 Sub-Bab A: dua belas tugas lanjutan Misi Kardus Kiriman
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik berupa Cari kesalahan dan memilih cara termudah). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8 dan Kelas 2 Bab 1 (etalase kaca, kertas kisi, struk kasir): Concrete = rak seragam kayu dengan gantungan baju, kemajuan berupa deret baju yang makin penuh;
 * Pictorial = karton berpetak berjahit putus-putus, kemajuan berupa jalur bilangan mini dengan penanda yang maju;
 * Abstract = kartu harga bertali berlubang, kemajuan berupa deret manik bernomor yang terisi.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B (pengurangan). Tanpa skor.
 */

type Tema = "rak" | "karton" | "kartu";
const LATAR: Record<Tema, React.CSSProperties> = {
  rak: {
    backgroundColor: "#FFEDD5",
    backgroundImage: "repeating-linear-gradient(180deg,transparent 0 118px,rgba(194,65,12,0.35) 118px 124px),linear-gradient(90deg,rgba(194,65,12,0.08) 0 2px,transparent 2px 100%)",
    backgroundSize: "100% 100%, 46px 100%",
  },
  karton: {
    backgroundColor: "#EBD9B8",
    backgroundImage: "radial-gradient(rgba(120,80,30,0.18) 1px,transparent 1.5px)",
    backgroundSize: "9px 9px",
  },
  kartu: { backgroundColor: "#FFFBEB" },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "rak")
    return (
      <div className="mx-auto max-w-md" aria-label={`Baju ${Math.min(nomor, total)} dari ${total}`}>
        <div className="h-1 rounded-full bg-[#92400E]" aria-hidden="true" />
        <div className="flex flex-wrap items-start justify-center gap-0.5 px-1">
          {n.map((i) => (
            <span key={i} aria-hidden="true" className={`flex h-8 w-7 items-start justify-center text-[17px] leading-none ${i === nomor ? "animate-pulse" : ""}`} style={{ opacity: i <= nomor ? 1 : 0.2, filter: i <= nomor ? "none" : "grayscale(1)" }}>
              {"\u{1F455}"}
            </span>
          ))}
        </div>
      </div>
    );
  if (tema === "karton") {
    const maks = Math.max(1, total - 1);
    const x = (i: number) => 14 + ((i - 1) / maks) * 272;
    return (
      <div className="mx-auto max-w-md rounded-md border-2 border-dashed border-white bg-white/50 px-1" aria-label={`Langkah ${Math.min(nomor, total)} dari ${total}`}>
        <svg viewBox="0 0 300 30" className="block h-8 w-full" aria-hidden="true">
          <line x1={14} y1={16} x2={286} y2={16} stroke="#1C01A5" strokeWidth={2.4} />
          {n.map((i) => (
            <line key={i} x1={x(i)} y1={11} x2={x(i)} y2={21} stroke="#1C01A5" strokeWidth={i <= nomor ? 2.6 : 1.2} />
          ))}
          <circle cx={x(Math.min(nomor, total))} cy={16} r={6} fill="#FACC15" stroke="#1C01A5" strokeWidth={2} />
        </svg>
      </div>
    );
  }
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Manik ${Math.min(nomor, total)} dari ${total}`}>
      <span className="h-px w-3 bg-[#92400E]" aria-hidden="true" />
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-black ${i < nomor ? "border-[#15803D] bg-[#15803D] text-white" : i === nomor ? "animate-pulse border-[#B45309] bg-[#FACC15] text-[#1C01A5]" : "border-[#CBD5E1] bg-white text-[#94A3B8]"}`}>
          {i}
        </span>
      ))}
      <span className="h-px w-3 bg-[#92400E]" aria-hidden="true" />
    </div>
  );
}

export default function TahapGudang({
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
  const tema: Tema = rupa === "benda" ? "rak" : rupa === "diagram" ? "karton" : "kartu";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${JEMBATAN_SUARA}`);
    } else selesaiTahap();
    umum.gulir();
  };

  /** Kartu harga bertali: tali di atas, lubang, lalu kartu bersudut miring. */
  const bungkusKartu = (isi: React.ReactNode) => (
    <div className="mx-auto max-w-lg">
      <div className="mx-auto flex h-10 w-24 items-end justify-center" aria-hidden="true">
        <svg viewBox="0 0 96 40" className="h-10 w-24">
          <path d="M6 38 C20 2 76 2 90 38" fill="none" stroke="#92400E" strokeWidth={3} strokeLinecap="round" />
        </svg>
      </div>
      <div className="relative rounded-xl border-[5px] border-[#B45309] bg-[#FFFBEB] shadow-[0_6px_0_rgba(146,64,14,0.3)]" style={{ clipPath: "polygon(0 0,92% 0,100% 8%,100% 100%,0 100%)" }}>
        <span className="absolute left-1/2 top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#B45309] bg-white" aria-hidden="true" />
        <div style={LATAR.kartu} className="px-2 pt-4">
          {isi}
        </div>
      </div>
    </div>
  );

  if (akhir)
    return bungkusKartu(
      <div className="space-y-3 py-3">
        <style>{CSS_LEMARI}</style>
        <Kemajuan tema="kartu" nomor={13} total={12} />
        <p className="rounded-lg border-2 border-dashed border-[#B45309] bg-[#FEF3C7] py-1 text-center text-base font-black text-[#78350F]">{"\u{1F3F7}\u{FE0F}"} Poin Penting Kardus Kiriman selesai!</p>
        <ul className="space-y-1.5">
          {POIN_PENTING.map((p, i) => (
            <li key={p} className="flex items-start gap-2 rounded-lg border-2 border-[#FDE68A] bg-white px-2 py-1.5 text-sm font-bold text-[#0F172A]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B45309] text-xs font-black text-white">{i + 1}</span>
              {p}
            </li>
          ))}
        </ul>
        <p className="rounded-xl border-2 border-dashed border-[#B45309] bg-[#FEF3C7] px-3 py-2 text-center text-sm font-black text-[#78350F]">
          {"\u{1F4E6}"} {JEMBATAN}
        </p>
        <div className="flex justify-center">
          <button type="button" className={TOMBOL_UTAMA} onClick={selesaiTahap}>
            {teksAkhir}
          </button>
        </div>
      </div>,
    );
  if (!so || !ls) return null;

  const terakhirSemua = s === soal.length - 1 && l === so.langkah.length - 1;
  const total = soal.reduce((n, x) => n + x.langkah.length, 0);
  const nomor = soal.slice(0, s).reduce((n, x) => n + x.langkah.length, 0) + l + 1;
  const kepala =
    tema === "rak" ? "rounded-lg border-4 border-[#C2410C] bg-[#FFF7ED]" : tema === "karton" ? "rounded-md border-2 border-dashed border-white bg-[#F5E9CF]" : "rounded-lg border-2 border-dashed border-[#B45309] bg-[#FEF3C7]";
  const warnaKepala = tema === "rak" ? "text-[#C2410C]" : tema === "karton" ? "text-[#7C2D12]" : "text-[#B45309]";
  const papan = tema === "rak" ? "rounded-2xl border-4 border-[#FDBA74]" : tema === "karton" ? "rounded-md border-2 border-dashed border-[#7C2D12]" : "rounded-xl border-2 border-[#FDE68A]";
  const cariSalah = ls.langkah.tipe === "salah";
  const pilihCara = ls.langkah.tipe === "banding";
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#92400E] bg-[#FEF3C7] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#92400E]">
              Tugas {nomor} dari {total} · {cariSalah ? "\u{1F50E} Cari kesalahan · " : ""}
              {pilihCara ? "Pilih cara termudah · " : ""}
              {rupa === "benda" ? `${IKON_METODE[ls.metode]} ` : ""}{NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahGudang key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "kartu") return bungkusKartu(isi);
  return tema === "rak" ? <div className="rounded-3xl border-[8px] border-[#C2410C] bg-[#C2410C] shadow-[0_6px_0_rgba(124,45,18,0.35)]">{isi}</div> : <div className="rounded-xl border-[6px] border-dashed border-[#7C2D12]">{isi}</div>;
}
