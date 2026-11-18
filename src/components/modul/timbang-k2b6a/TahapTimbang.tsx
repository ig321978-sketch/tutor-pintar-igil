"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahTimbang } from "./LangkahTimbang";
import { PENUTUP_A, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 6 Sub-Bab A: dua belas tugas lanjutan Misi Pos Timbang
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8 dan Kelas 2 Bab 1 sampai 5: Concrete = lapangan hijau bergaris putih berbingkai pagar rendah, kemajuan berupa deret kerucut oranye yang terisi;
 * Pictorial = lembar strategi biru berkotak (cetak biru) berbingkai biru tua, kemajuan berupa deret batang kecil yang makin tinggi dan terisi; Abstract = papan taktik putih berbingkai
 * aluminium dengan nampan spidol, kemajuan berupa tanda silang spidol. Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B. Tanpa skor.
 */

type Tema = "lapangan" | "cetak" | "taktik";
const LATAR: Record<Tema, React.CSSProperties> = {
  lapangan: {
    backgroundColor: "#86EFAC",
    backgroundImage: "linear-gradient(90deg,transparent 0 49%,rgba(255,255,255,0.75) 49% 51%,transparent 51% 100%),repeating-linear-gradient(0deg,rgba(22,163,74,0.16) 0 14px,transparent 14px 28px)",
  },
  cetak: {
    backgroundColor: "#DBEAFE",
    backgroundImage: "linear-gradient(rgba(37,99,235,0.35) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.35) 1px,transparent 1px)",
    backgroundSize: "22px 22px",
  },
  taktik: {
    backgroundColor: "#F8FAFC",
    backgroundImage: "linear-gradient(115deg,rgba(220,38,38,0.07) 0 3px,transparent 3px 40px),radial-gradient(ellipse at 80% 20%,rgba(37,99,235,0.07) 0,transparent 45%)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "lapangan")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 px-2 py-1" aria-label={`Kerucut ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 16 16" className={`h-4 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <polygon points="8,1.5 12.5,13 3.5,13" fill={i <= nomor ? "#FB923C" : "#FFFFFF"} stroke="#C2410C" strokeWidth={i === nomor ? 1.8 : 1.1} strokeDasharray={i > nomor ? "2 2" : undefined} />
            <rect x="2" y="13" width="12" height="2" rx="0.8" fill={i <= nomor ? "#C2410C" : "#FFFFFF"} stroke="#C2410C" strokeWidth="0.8" />
          </svg>
        ))}
      </div>
    );
  if (tema === "cetak")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 px-2 py-1" aria-label={`Batang ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => {
          const tinggi = 5 + (i % 5) * 2;
          return (
            <svg key={i} viewBox="0 0 10 16" className={`h-4 w-2.5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
              <rect x="1" y={15 - tinggi} width="8" height={tinggi} fill={i <= nomor ? "#60A5FA" : "#FFFFFF"} stroke="#1D4ED8" strokeWidth={i === nomor ? 1.8 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
            </svg>
          );
        })}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1.5 px-2 py-1" aria-label={`Tanda ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block text-sm font-black leading-none ${i === nomor ? "animate-pulse text-[#DC2626]" : i < nomor ? "text-[#2563EB]" : "text-[#94A3B8]"}`}>
          {i < nomor ? "\u{2715}" : i === nomor ? "\u{25CB}" : "\u{00B7}"}
        </span>
      ))}
    </div>
  );
}

export default function TahapTimbang({
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
  const tema: Tema = rupa === "benda" ? "lapangan" : rupa === "diagram" ? "cetak" : "taktik";
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
      <div className="rounded-3xl border-[10px] border-[#94A3B8] bg-[#94A3B8] shadow-[0_6px_0_rgba(51,65,85,0.4)]">
        <div className="space-y-3 rounded-xl p-4" style={LATAR.taktik}>
          <p className="text-center text-lg font-black text-[#1C01A5]">{"\u{1F4CC}"} Poin Penting: Berat Benda</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-[#2563EB] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]" style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DC2626] text-[10px] font-black text-white">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{23F0}"} {PENUTUP_A}
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
  const kepala = tema === "lapangan" ? "rounded-xl border-4 border-[#16A34A] bg-white/95" : tema === "cetak" ? "rounded-md border-2 border-[#1D4ED8] bg-white" : "rounded-md border-2 border-[#2563EB] bg-white";
  const papan = tema === "lapangan" ? "rounded-2xl border-4 border-white" : tema === "cetak" ? "rounded-md border-2 border-[#1D4ED8]" : "rounded-md border-2 border-[#94A3B8]";
  const warnaKepala = tema === "taktik" ? "text-[#DC2626]" : tema === "cetak" ? "text-[#1D4ED8]" : "text-[#15803D]";
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
        <LangkahTimbang key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "taktik")
    return (
      <div className="rounded-3xl border-[10px] border-[#94A3B8] bg-[#94A3B8] shadow-[0_6px_0_rgba(51,65,85,0.4)]">
        {isi}
        <div className="mx-auto mt-1 flex h-3 w-40 items-center justify-center gap-2 rounded-b-md bg-[#64748B]" aria-hidden="true">
          <span className="block h-1.5 w-6 rounded-full bg-[#DC2626]" />
          <span className="block h-1.5 w-6 rounded-full bg-[#2563EB]" />
          <span className="block h-1.5 w-6 rounded-full bg-[#16A34A]" />
        </div>
      </div>
    );
  if (tema === "lapangan")
    return (
      <div className="rounded-3xl border-[8px] border-[#FFFFFF] bg-[#16A34A] p-1 shadow-[0_6px_0_rgba(20,83,45,0.4)]">
        <div className="rounded-2xl border-4 border-dashed border-white/80">{isi}</div>
      </div>
    );
  return <div className="rounded-xl border-[6px] border-[#1D4ED8] bg-[#1D4ED8] shadow-[0_6px_0_rgba(30,58,138,0.4)]">{isi}</div>;
}
