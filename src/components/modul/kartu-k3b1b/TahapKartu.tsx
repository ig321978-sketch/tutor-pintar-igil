"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, WARNA_TEMPAT, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahKartu } from "./LangkahKartu";
import { PENUTUP_B, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 3 Bab 1 Sub-Bab B: dua belas tugas lanjutan Misi Meja Label
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru, berbeda dari
 * Kelas 1 dan Kelas 2 serta Sub-Bab lain: Concrete = meja label toko dengan rak kayu cokelat di atas dan latar kertas label bergaris halus, kemajuan berupa deretan label gantung yang terisi;
 * Pictorial = papan kapur hijau tua bertitik-titik, kemajuan berupa balok kecil hijau, biru, dan merah yang terisi bergiliran; Abstract = mesin kasir gelap dengan layar LCD hijau,
 * kemajuan berupa angka urutan tugas pada layar dan batang segmen. Abstract diakhiri Poin Penting (tanpa perayaan, karena bab belum selesai). Tanpa skor.
 */

type Tema = "label" | "kapur" | "kasir";
const LATAR: Record<Tema, React.CSSProperties> = {
  label: {
    backgroundColor: "#FFFBEB",
    backgroundImage: "linear-gradient(180deg,#B45309 0 10px,#D97706 10px 14px,transparent 14px),repeating-linear-gradient(90deg,rgba(217,119,6,0.10) 0 1px,transparent 1px 18px)",
    backgroundRepeat: "no-repeat,repeat",
  },
  kapur: {
    backgroundColor: "#14532D",
    backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 1px,transparent 1px)",
    backgroundSize: "16px 16px",
  },
  kasir: {
    backgroundColor: "#1E293B",
    backgroundImage: "linear-gradient(180deg,#0F172A 0 8px,transparent 8px),repeating-linear-gradient(0deg,rgba(148,163,184,0.12) 0 1px,transparent 1px 22px)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "label")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-1" aria-label={`Label ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 18 22" className={`h-5 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <path d="M9 1 L16 6 V21 H2 V6 Z" fill={i < nomor ? "#FDE68A" : "#FFFFFF"} stroke="#B45309" strokeWidth={i <= nomor ? 1.6 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
            <circle cx="9" cy="7" r="1.6" fill="#B45309" />
          </svg>
        ))}
      </div>
    );
  if (tema === "kapur")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-1" aria-label={`Balok ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 16 16" className={`h-4 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x="1.5" y="1.5" width="13" height="13" fill={i < nomor ? WARNA_TEMPAT[(i - 1) % 3] : "transparent"} stroke="#DCFCE7" strokeWidth={i <= nomor ? 1.6 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
          </svg>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-1 px-1" aria-label={`Tugas ${Math.min(nomor, total)} dari ${total}`}>
      <p className="rounded-md border-2 border-[#4ADE80] bg-[#BBF7D0] px-3 py-0.5 font-mono text-lg font-black tracking-[0.25em] text-[#064E3B]">
        {String(Math.min(nomor, total)).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </p>
      <div className="flex w-full flex-wrap justify-center gap-0.5">
        {n.map((i) => (
          <span key={i} className={`h-1.5 w-5 rounded-sm ${i < nomor ? "bg-[#4ADE80]" : i === nomor ? "animate-pulse bg-[#FDE047]" : "bg-[#475569]"}`} />
        ))}
      </div>
    </div>
  );
}

export default function TahapKartu({
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
  const tema: Tema = rupa === "benda" ? "label" : rupa === "diagram" ? "kapur" : "kasir";
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
      <div className="rounded-3xl border-[8px] border-[#0F172A] bg-[#1E293B] shadow-[0_6px_0_rgba(15,23,42,0.5)]">
        <div className="space-y-3 rounded-xl p-4" style={LATAR.kasir}>
          <p className="rounded-md border-2 border-[#4ADE80] bg-[#BBF7D0] px-3 py-2 text-center font-mono text-xl font-black tracking-widest text-[#064E3B]">
            {"\u{1F4CC}"} POIN PENTING
          </p>
          <p className="text-center text-lg font-black text-[#BBF7D0]">Tempat Angka</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-[#86EFAC] bg-white px-3 py-2 text-sm font-bold text-[#14532D]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-[10px] font-black text-white">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FDE047] bg-[#FEFCE8] px-3 py-2 text-center text-sm font-black text-[#713F12]">
            {"\u{1F69B}"} {PENUTUP_B}
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
  const kepala = tema === "label" ? "rounded-md border-4 border-[#B45309] bg-[#FEF3C7]" : tema === "kapur" ? "rounded-md border-4 border-dashed border-[#BBF7D0] bg-[#F0FDF4]" : "rounded-xl border-2 border-[#4ADE80] bg-[#ECFDF5]";
  const papan = tema === "label" ? "rounded-md border-4 border-[#B45309]" : tema === "kapur" ? "rounded-md border-4 border-[#BBF7D0]" : "rounded-xl border-2 border-[#4ADE80]";
  const warnaKepala = tema === "label" ? "text-[#92400E]" : tema === "kapur" ? "text-[#166534]" : "text-[#047857]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3 pt-5" style={LATAR[tema]}>
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
        <LangkahKartu key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  return <div className="rounded-3xl">{isi}</div>;
}
