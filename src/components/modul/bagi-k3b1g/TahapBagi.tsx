"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahBagi } from "./LangkahBagi";
import { PENUTUP_G, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 3 Bab 1 Sub-Bab G (akhir bab): dua belas tugas lanjutan Misi Meja Bingkisan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru, berbeda dari
 * Kelas 1 dan Kelas 2: Concrete = meja pesta berbintik krem dengan bendera segitiga merah dan biru di tepi atas, kemajuan berupa deretan kotak hadiah berpita yang terbuka;
 * Pictorial = kertas pembungkus bergaris diagonal biru muda, kemajuan berupa pita kupu-kupu yang terikat; Abstract = spanduk pesta ungu tua berbintik konfeti,
 * kemajuan berupa balon yang menyala. Abstract diakhiri perayaan akhir cerita bab (spanduk OBRAL HARI JADI TOKO MERIAH, balon, konfeti), lalu Poin Penting. Tanpa skor.
 */

type Tema = "meja" | "kertas" | "spanduk";
const LATAR: Record<Tema, React.CSSProperties> = {
  meja: {
    backgroundColor: "#FFFBEB",
    backgroundImage: "linear-gradient(135deg,#EF4444 25%,transparent 25%),linear-gradient(225deg,#3B82F6 25%,transparent 25%),radial-gradient(circle at 50% 100%,rgba(251,191,36,0.25) 0 30%,transparent 60%)",
    backgroundSize: "24px 14px, 24px 14px, 100% 100%",
    backgroundRepeat: "repeat-x, repeat-x, no-repeat",
  },
  kertas: {
    backgroundColor: "#EFF6FF",
    backgroundImage: "repeating-linear-gradient(45deg,#DBEAFE 0 10px,#FFFFFF 10px 20px)",
  },
  spanduk: {
    backgroundColor: "#1E1B4B",
    backgroundImage: "radial-gradient(circle at 20% 20%,rgba(250,204,21,0.35) 0 4px,transparent 5px),radial-gradient(circle at 70% 60%,rgba(244,114,182,0.35) 0 4px,transparent 5px),radial-gradient(circle at 40% 85%,rgba(96,165,250,0.35) 0 4px,transparent 5px)",
    backgroundSize: "90px 90px",
  },
};
const WARNA_KONFETI = ["#EF4444", "#FACC15", "#3B82F6", "#22C55E", "#EC4899"];
const KONFETI = Array.from({ length: 24 }, (_, i) => ({ kiri: (i * 37) % 100, tunda: ((i * 53) % 20) / 10, warna: WARNA_KONFETI[i % 5], lebar: 6 + (i % 3) * 2 }));
const WARNA_BALON = ["#EF4444", "#FACC15", "#22C55E", "#3B82F6", "#EC4899", "#F97316"];
const CSS_PESTA = `
@keyframes hj-jatuh{0%{transform:translateY(-12px) rotate(0)}100%{transform:translateY(240px) rotate(300deg)}}
@keyframes hj-naik{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.hj-konfeti{animation:hj-jatuh 2.6s linear infinite}
.hj-balon{animation:hj-naik 2.4s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.hj-konfeti,.hj-balon{animation:none}}
`;

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "meja")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-1" aria-label={`Hadiah ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 18 18" className={`h-4 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x="2" y="6" width="14" height="10" rx="1.5" fill={i < nomor ? "#FCA5A5" : "#FFFFFF"} stroke="#B91C1C" strokeWidth={i <= nomor ? 1.4 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
            <line x1="9" y1="6" x2="9" y2="16" stroke="#B91C1C" strokeWidth="1" />
            {i < nomor ? <path d="M9 6 L5 2 L9 4 L13 2 Z" fill="#FACC15" stroke="#B91C1C" strokeWidth="0.8" /> : <rect x="2" y="3" width="14" height="3" rx="1" fill="none" stroke="#B91C1C" strokeWidth="0.8" strokeDasharray="2 2" />}
          </svg>
        ))}
      </div>
    );
  if (tema === "kertas")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-0.5 px-1" aria-label={`Pita ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 20 14" className={`h-4 w-5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <polygon points="10,7 2,2 2,12" fill={i < nomor ? "#3B82F6" : "#FFFFFF"} stroke="#1D4ED8" strokeWidth={i <= nomor ? 1.4 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
            <polygon points="10,7 18,2 18,12" fill={i < nomor ? "#3B82F6" : "#FFFFFF"} stroke="#1D4ED8" strokeWidth={i <= nomor ? 1.4 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
            <circle cx="10" cy="7" r="2" fill={i < nomor ? "#FACC15" : "#FFFFFF"} stroke="#1D4ED8" strokeWidth="1" />
          </svg>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-1" aria-label={`Balon ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <svg key={i} viewBox="0 0 14 20" className={`h-5 w-3.5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
          <ellipse cx="7" cy="7" rx="5" ry="6" fill={i < nomor ? WARNA_BALON[i % 6] : "transparent"} stroke="#FDE68A" strokeWidth={i <= nomor ? 1.4 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
          <path d="M7 13 Q5 16 7 19" fill="none" stroke="#FDE68A" strokeWidth="1" />
        </svg>
      ))}
    </div>
  );
}

export default function TahapBagi({
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
  const tema: Tema = rupa === "benda" ? "meja" : rupa === "diagram" ? "kertas" : "spanduk";
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
      umum.speakGuru(`Pesta toko meriah! Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_G}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-3xl border-[8px] border-[#4C1D95] bg-[#1E1B4B] shadow-[0_6px_0_rgba(30,27,75,0.5)]">
        <style>{CSS_PESTA}</style>
        <div className="relative space-y-3 overflow-hidden rounded-xl p-4" style={LATAR.spanduk}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[240px]" aria-hidden="true">
            {KONFETI.map((k, i) => (
              <span key={i} className="hj-konfeti absolute top-0 block rounded-[1px]" style={{ left: `${k.kiri}%`, width: k.lebar, height: k.lebar + 3, background: k.warna, animationDelay: `${k.tunda}s` }} />
            ))}
          </div>
          <div className="relative flex items-center justify-between gap-2" aria-hidden="true">
            <span className="hj-balon text-3xl">{"\u{1F388}"}</span>
            <p className="rounded-xl border-4 border-[#FACC15] bg-[#FEF9C3] px-3 py-2 text-center text-lg font-black tracking-widest text-[#9F1239]">OBRAL HARI JADI TOKO MERIAH</p>
            <span className="hj-balon text-3xl" style={{ animationDelay: "0.6s" }}>
              {"\u{1F388}"}
            </span>
          </div>
          <p className="sr-only">OBRAL HARI JADI TOKO MERIAH</p>
          <p className="relative text-center text-lg font-black text-[#FEF08A]">{"\u{1F4CC}"} Poin Penting: Pembagian sampai Seratus</p>
          <ul className="relative space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-[#C4B5FD] bg-white px-3 py-2 text-sm font-bold text-[#3730A3]" style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-[10px] font-black text-white">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="relative rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F3C6}"} {PENUTUP_G}
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
  const kepala = tema === "meja" ? "rounded-lg border-4 border-dashed border-[#B91C1C] bg-[#FEF2F2]" : tema === "kertas" ? "rounded-md border-2 border-[#2563EB] bg-white" : "rounded-xl border-4 border-[#FACC15] bg-[#FFFBEB]";
  const papan = tema === "meja" ? "rounded-lg border-4 border-[#B91C1C]" : tema === "kertas" ? "rounded-md border-2 border-[#2563EB]" : "rounded-xl border-4 border-[#A78BFA]";
  const warnaKepala = tema === "kertas" ? "text-[#1D4ED8]" : tema === "meja" ? "text-[#B91C1C]" : "text-[#6D28D9]";
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
        <LangkahBagi key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
