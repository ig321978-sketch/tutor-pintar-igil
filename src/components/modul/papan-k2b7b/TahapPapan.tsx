"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahPapan } from "./LangkahPapan";
import { PENUTUP_B, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 7 Sub-Bab B: dua belas tugas lanjutan Misi Papan Pengumuman
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru, berbeda dari
 * Kelas 1 dan Kelas 2 Bab 1 sampai 6: Concrete = dinding gudang beratap seng bergaris tegak dengan papan krem berbingkai cokelat, kemajuan berupa deretan penjepit
 * jemuran yang terpasang; Pictorial = lembar catatan bergaris biru muda bermargin merah, kemajuan berupa titik-titik pada garis bilangan; Abstract = panggung hijau tua
 * berlampu sorot dengan kartu putih, kemajuan berupa daun yang tumbuh. Abstract diakhiri perayaan akhir cerita bab (spanduk SEKOLAH BERSIH dan konfeti), lalu Poin Penting.
 * Tanpa skor.
 */

type Tema = "gudang" | "catatan" | "panggung";
const LATAR: Record<Tema, React.CSSProperties> = {
  gudang: {
    backgroundColor: "#E2E8F0",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(100,116,139,0.3) 0 2px,transparent 2px 22px),linear-gradient(180deg,rgba(148,163,184,0.45) 0 14px,transparent 14px)",
  },
  catatan: {
    backgroundColor: "#FFFBEB",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(59,130,246,0.2) 0 1px,transparent 1px 24px),linear-gradient(90deg,transparent 0 34px,rgba(220,38,38,0.4) 34px 36px,transparent 36px)",
  },
  panggung: {
    backgroundColor: "#14532D",
    backgroundImage: "radial-gradient(ellipse at 50% 0%,rgba(254,240,138,0.42) 0 28%,transparent 62%)",
  },
};
const WARNA_KONFETI = ["#EF4444", "#FACC15", "#3B82F6", "#22C55E"];
const KONFETI = Array.from({ length: 22 }, (_, i) => ({ kiri: (i * 37) % 100, tunda: ((i * 53) % 20) / 10, warna: WARNA_KONFETI[i % 4], lebar: 6 + (i % 3) * 2 }));
const CSS_KONFETI = `
@keyframes pp-jatuh{0%{transform:translateY(-12px) rotate(0)}100%{transform:translateY(190px) rotate(300deg)}}
.pp-konfeti{animation:pp-jatuh 2.6s linear infinite}
@media (prefers-reduced-motion:reduce){.pp-konfeti{animation:none}}
`;
const WARNA_JEPIT = ["#EF4444", "#FACC15", "#22C55E", "#3B82F6"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "gudang")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 border-b-2 border-[#78350F] px-1" aria-label={`Penjepit ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 12 22" className={`h-5 w-3 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x="2" y="1" width="8" height="19" rx="1.6" fill={i < nomor ? WARNA_JEPIT[i % 4] : "transparent"} stroke="#78350F" strokeWidth={i <= nomor ? 1.6 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
            <line x1="6" y1="9" x2="6" y2="20" stroke="#78350F" strokeWidth="0.8" />
          </svg>
        ))}
      </div>
    );
  if (tema === "catatan")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-0 px-2 py-1" aria-label={`Titik ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} className="flex items-center" aria-hidden="true">
            <span className={`h-3 w-3 rounded-full border-2 border-[#1D4ED8] ${i < nomor ? "bg-[#1D4ED8]" : "bg-white"} ${i === nomor ? "animate-pulse border-[#DC2626]" : ""}`} />
            {i < total ? <span className="h-0.5 w-1.5 bg-[#93C5FD]" /> : null}
          </span>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-0.5 px-1" aria-label={`Daun ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
          <path d="M3 17 C3 7 9 3 17 3 C17 11 13 17 3 17 Z" fill={i < nomor ? "#4ADE80" : "transparent"} stroke="#BBF7D0" strokeWidth={i <= nomor ? 1.6 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

export default function TahapPapan({
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
  const tema: Tema = rupa === "benda" ? "gudang" : rupa === "diagram" ? "catatan" : "panggung";
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
      umum.speakGuru(`Sekolah bersih! Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_B}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-3xl border-[8px] border-[#166534] bg-[#14532D] shadow-[0_6px_0_rgba(5,46,22,0.5)]">
        <style>{CSS_KONFETI}</style>
        <div className="relative space-y-3 overflow-hidden rounded-xl p-4" style={LATAR.panggung}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[190px]" aria-hidden="true">
            {KONFETI.map((k, i) => (
              <span key={i} className="pp-konfeti absolute top-0 block rounded-[1px]" style={{ left: `${k.kiri}%`, width: k.lebar, height: k.lebar + 3, background: k.warna, animationDelay: `${k.tunda}s` }} />
            ))}
          </div>
          <p className="relative rounded-xl border-4 border-[#16A34A] bg-[#DCFCE7] px-3 py-2 text-center text-2xl font-black tracking-widest text-[#166534]">
            {"\u{1F389}"} SEKOLAH BERSIH {"\u{1F389}"}
          </p>
          <p className="relative text-center text-lg font-black text-[#FEF08A]">{"\u{1F4CC}"} Poin Penting: Membandingkan dan Mengurutkan Bilangan</p>
          <ul className="relative space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-[#BBF7D0] bg-white px-3 py-2 text-sm font-bold text-[#14532D]" style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-[10px] font-black text-white">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="relative rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F3C6}"} {PENUTUP_B}
          </p>
          <div className="relative flex justify-center">
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
  const kepala = tema === "gudang" ? "rounded-md border-4 border-[#92400E] bg-[#FEF3C7]" : tema === "catatan" ? "rounded-xl border-2 border-dashed border-[#2563EB] bg-white" : "rounded-xl border-4 border-[#FACC15] bg-[#FFFBEB]";
  const papan = tema === "gudang" ? "rounded-md border-4 border-[#92400E]" : tema === "catatan" ? "rounded-xl border-2 border-[#2563EB]" : "rounded-xl border-4 border-[#86EFAC]";
  const warnaKepala = tema === "catatan" ? "text-[#1D4ED8]" : tema === "gudang" ? "text-[#92400E]" : "text-[#166534]";
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
        <LangkahPapan key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
