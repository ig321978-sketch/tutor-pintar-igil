"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahBandul } from "./LangkahBandul";
import { PENUTUP_D, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 3 Bab 3 Sub-Bab D: dua belas tugas lanjutan Misi Meja Bandul
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 sampai Kelas 3 Bab 2 dan Sub-Bab A, B, C Bab ini: Concrete = meja periksa dokter hewan putih bergaris berbingkai biru laut, kemajuan berupa deret bandul logam;
 * Pictorial = kertas biru pucat berkisi, kemajuan berupa deret persegi biru; Abstract = rekam medis hewan berkertas krem bergaris dengan garis tepi merah, kemajuan berupa deret cap telapak kaki.
 * Abstract diakhiri Poin Penting lalu perayaan akhir cerita bab (spanduk KEBUN BINATANG MINI MERIAH, balon, konfeti). Tanpa skor.
 */

type Tema = "meja" | "biru" | "rekam";
const LATAR: Record<Tema, React.CSSProperties> = {
  meja: {
    backgroundColor: "#FFFFFF",
    backgroundImage: "repeating-linear-gradient(0deg,transparent 0 28px,rgba(14,116,144,0.2) 28px 29px),linear-gradient(90deg,rgba(14,116,144,0.1) 0 3px,transparent 3px)",
  },
  biru: {
    backgroundColor: "#EFF6FF",
    backgroundImage: "linear-gradient(rgba(37,99,235,0.16) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.16) 1px,transparent 1px)",
    backgroundSize: "22px 22px,22px 22px",
  },
  rekam: {
    backgroundColor: "#FEF8E4",
    backgroundImage: "repeating-linear-gradient(0deg,transparent 0 26px,rgba(120,113,108,0.3) 26px 27px),linear-gradient(90deg,transparent 0 34px,rgba(220,38,38,0.45) 34px 36px,transparent 36px)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "meja")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 px-2 py-1" aria-label={`Bandul ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 22 16" className={`h-4 w-[22px] ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <path d="M4 15 L2 6 Q2 2 6 2 L16 2 Q20 2 20 6 L18 15 Z" fill={i <= nomor ? "#FBBF24" : "#F1F5F9"} stroke={i <= nomor ? "#92400E" : "#94A3B8"} strokeWidth="1.2" strokeDasharray={i <= nomor ? undefined : "2.4 2"} />
            {i <= nomor ? <rect x="8" y="5" width="6" height="2.2" rx="1" fill="#92400E" /> : null}
          </svg>
        ))}
      </div>
    );
  if (tema === "biru")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Persegi ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3.5 w-3.5 border-2 ${i === nomor ? "animate-pulse border-[#1D4ED8] bg-[#93C5FD]" : i < nomor ? "border-[#1D4ED8] bg-[#2563EB]" : "border-dashed border-[#2563EB]/60 bg-white/70"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-5 w-5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
          <ellipse cx="10" cy="13" rx="5" ry="4.2" fill="none" stroke={i <= nomor ? "#B45309" : "#A8A29E"} strokeWidth="1.4" strokeDasharray={i <= nomor ? undefined : "2.4 2"} />
          {[3.6, 8, 12, 16.4].map((x, j) => (
            <circle key={x} cx={x} cy={j === 0 || j === 3 ? 7.6 : 4.6} r="1.7" fill={i < nomor ? "#B45309" : "none"} stroke={i <= nomor ? "#B45309" : "#A8A29E"} strokeWidth="1.1" />
          ))}
          {i < nomor ? <ellipse cx="10" cy="13" rx="3.4" ry="2.6" fill="#B45309" /> : null}
        </svg>
      ))}
    </div>
  );
}

/** Perayaan akhir cerita bab: spanduk KEBUN BINATANG MINI MERIAH, balon, hewan kebun binatang, dan konfeti jatuh. */
function Perayaan() {
  const konfeti = ["#EF4444", "#F59E0B", "#22C55E", "#3B82F6", "#A855F7", "#EC4899"];
  return (
    <div className="relative overflow-hidden rounded-2xl border-4 border-[#0E7490] bg-[#ECFEFF] px-3 pb-3 pt-4 text-center" data-uji="perayaan-akhir-bab">
      <style>{`
        @keyframes konfeti-jatuh-d { 0% { transform: translateY(-14px) rotate(0deg); opacity: 1; } 100% { transform: translateY(190px) rotate(300deg); opacity: 0.2; } }
        @keyframes balon-naik-d { 0%, 100% { transform: translateY(6px); } 50% { transform: translateY(-8px); } }
        @keyframes hewan-loncat-d { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @media (prefers-reduced-motion: reduce) { .konfeti-d, .balon-d, .hewan-d { animation: none !important; } }
      `}</style>
      {Array.from({ length: 16 }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="konfeti-d pointer-events-none absolute top-0 block h-2 w-1.5 rounded-[1px]"
          style={{ left: `${4 + i * 6}%`, background: konfeti[i % konfeti.length], animation: `konfeti-jatuh-d ${2.6 + (i % 5) * 0.5}s linear ${(i % 7) * 0.35}s infinite` }}
        />
      ))}
      <div className="relative mx-auto mb-2 flex max-w-sm flex-wrap justify-center gap-3 text-2xl" aria-hidden="true">
        {["\u{1F388}", "\u{1F389}", "\u{1F388}", "\u{1F38A}", "\u{1F388}"].map((b, i) => (
          <span key={i} className="balon-d" style={{ animation: `balon-naik-d ${1.8 + i * 0.3}s ease-in-out infinite` }}>
            {b}
          </span>
        ))}
      </div>
      <p className="relative mx-auto max-w-sm rounded-md border-4 border-[#FDE68A] bg-[#0E7490] px-3 py-2 text-lg font-black tracking-wide text-[#FEF3C7] shadow-[0_4px_0_rgba(0,0,0,0.3)]">KEBUN BINATANG MINI MERIAH</p>
      <div className="relative mt-2 flex items-end justify-center gap-3 text-3xl" aria-hidden="true">
        {["\u{1F407}", "\u{1F422}", "\u{1F410}", "\u{1F99C}", "\u{1F98C}"].map((h, i) => (
          <span key={i} className="hewan-d" style={{ animation: `hewan-loncat-d ${1.2 + i * 0.2}s ease-in-out infinite` }}>
            {h}
          </span>
        ))}
      </div>
      <p className="relative mt-2 text-sm font-black text-[#155E75]">{PENUTUP_D}</p>
    </div>
  );
}

export default function TahapBandul({
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
  const tema: Tema = rupa === "benda" ? "meja" : rupa === "diagram" ? "biru" : "rekam";
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
      <div className="rounded-md border-[6px] border-[#B45309] bg-white shadow-[0_6px_0_rgba(120,53,15,0.3)]">
        <div className="space-y-3 rounded-sm p-4" style={LATAR.rekam}>
          <p className="text-center text-lg font-black text-[#B91C1C]">{"\u{1F4CC}"} Poin Penting: Kilogram, Ons, dan Gram</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#B45309] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#0E7490] text-[10px] font-black text-[#0E7490]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <Perayaan />
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
  const kepala = tema === "meja" ? "rounded-xl border-4 border-[#0E7490] bg-[#F0FDFF]" : tema === "biru" ? "rounded-md border-2 border-[#2563EB] bg-white" : "rounded-md border-2 border-dashed border-[#B45309] bg-white";
  const papan = tema === "meja" ? "rounded-2xl border-4 border-[#0E7490]" : tema === "biru" ? "rounded-md border-2 border-[#2563EB]" : "rounded-md border-2 border-dashed border-[#B45309]";
  const warnaKepala = tema === "biru" ? "text-[#1D4ED8]" : tema === "meja" ? "text-[#0E7490]" : "text-[#B91C1C]";
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
        <LangkahBandul key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "meja")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#0E7490] bg-[#0E7490] shadow-[0_6px_0_rgba(21,94,117,0.4)]">
        <div className="h-3 bg-[#67E8F9]" aria-hidden="true" />
        {isi}
        <div className="h-3 bg-[#67E8F9]" aria-hidden="true" />
      </div>
    );
  if (tema === "biru") return <div className="rounded-lg border-[6px] border-[#2563EB] bg-[#EFF6FF] shadow-[0_6px_0_rgba(30,64,175,0.3)]">{isi}</div>;
  return <div className="rounded-md border-[6px] border-[#B45309] bg-white shadow-[0_6px_0_rgba(120,53,15,0.3)]">{isi}</div>;
}
