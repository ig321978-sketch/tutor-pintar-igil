"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahLintasan } from "./LangkahLintasan";
import { PENUTUP_C, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 3 Bab 4 Sub-Bab C: dua belas tugas lanjutan Misi Lintasan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 sampai Kelas 3 Bab 3 dan Sub-Bab A, B Bab ini: Concrete = lintasan lomba berumput dengan tali oranye dan patok, kemajuan berupa deret bendera kecil;
 * Pictorial = kertas petak hijau muda, kemajuan berupa deret petak hijau; Abstract = lembar panitia berkertas krem bergaris dengan cap peluit sebagai kemajuan.
 * Abstract diakhiri Poin Penting lalu perayaan akhir cerita bab (spanduk FESTIVAL LAYANG-LAYANG MERIAH, balon, konfeti). Tanpa skor.
 */

type Tema = "lintasan" | "petak" | "panitia";
const LATAR: Record<Tema, React.CSSProperties> = {
  lintasan: {
    backgroundColor: "#ECFCCB",
    backgroundImage: "repeating-linear-gradient(0deg,transparent 0 40px,rgba(234,88,12,0.4) 40px 43px),linear-gradient(90deg,rgba(234,88,12,0.3) 0 4px,transparent 4px)",
  },
  petak: {
    backgroundColor: "#F0FDF4",
    backgroundImage: "linear-gradient(rgba(22,163,74,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(22,163,74,0.2) 1px,transparent 1px)",
    backgroundSize: "22px 22px,22px 22px",
  },
  panitia: {
    backgroundColor: "#FEF8E4",
    backgroundImage: "repeating-linear-gradient(0deg,transparent 0 26px,rgba(120,113,108,0.3) 26px 27px),linear-gradient(90deg,transparent 0 34px,rgba(234,88,12,0.5) 34px 36px,transparent 36px)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "lintasan")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 px-2 py-1" aria-label={`Bendera ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 20 22" className={`h-5 w-[18px] ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <line x1="4" y1="2" x2="4" y2="21" stroke={i <= nomor ? "#7C2D12" : "#A8A29E"} strokeWidth="1.8" />
            <path d="M4 3 L18 7 L4 12 Z" fill={i <= nomor ? "#F97316" : "#F1F5F9"} stroke={i <= nomor ? "#9A3412" : "#94A3B8"} strokeWidth="1.2" strokeDasharray={i <= nomor ? undefined : "2.4 2"} />
          </svg>
        ))}
      </div>
    );
  if (tema === "petak")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Petak ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3.5 w-3.5 border-2 ${i === nomor ? "animate-pulse border-[#15803D] bg-[#86EFAC]" : i < nomor ? "border-[#15803D] bg-[#16A34A]" : "border-dashed border-[#16A34A]/60 bg-white/70"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <svg key={i} viewBox="0 0 24 20" className={`h-5 w-6 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
          <circle cx="8" cy="12" r="5.6" fill={i < nomor ? "#C2410C" : "none"} stroke={i <= nomor ? "#C2410C" : "#A8A29E"} strokeWidth="1.5" strokeDasharray={i <= nomor ? undefined : "2.4 2"} />
          <rect x="11" y="6" width="10" height="4.4" rx="1.4" fill={i < nomor ? "#C2410C" : "none"} stroke={i <= nomor ? "#C2410C" : "#A8A29E"} strokeWidth="1.3" strokeDasharray={i <= nomor ? undefined : "2.4 2"} />
          <circle cx="8" cy="12" r="1.8" fill={i <= nomor ? "#FED7AA" : "none"} />
        </svg>
      ))}
    </div>
  );
}

/** Perayaan akhir cerita bab: spanduk FESTIVAL LAYANG-LAYANG MERIAH, balon, layang-layang, dan konfeti jatuh. */
function Perayaan() {
  const konfeti = ["#EF4444", "#F59E0B", "#22C55E", "#3B82F6", "#A855F7", "#EC4899"];
  return (
    <div className="relative overflow-hidden rounded-2xl border-4 border-[#C2410C] bg-[#FFF7ED] px-3 pb-3 pt-4 text-center" data-uji="perayaan-akhir-bab">
      <style>{`
        @keyframes konfeti-jatuh-c { 0% { transform: translateY(-14px) rotate(0deg); opacity: 1; } 100% { transform: translateY(190px) rotate(300deg); opacity: 0.2; } }
        @keyframes balon-naik-c { 0%, 100% { transform: translateY(6px); } 50% { transform: translateY(-8px); } }
        @keyframes layang-goyang-c { 0%, 100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-6px) rotate(6deg); } }
        @media (prefers-reduced-motion: reduce) { .konfeti-c, .balon-c, .layang-c { animation: none !important; } }
      `}</style>
      {Array.from({ length: 16 }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="konfeti-c pointer-events-none absolute top-0 block h-2 w-1.5 rounded-[1px]"
          style={{ left: `${4 + i * 6}%`, background: konfeti[i % konfeti.length], animation: `konfeti-jatuh-c ${2.6 + (i % 5) * 0.5}s linear ${(i % 7) * 0.35}s infinite` }}
        />
      ))}
      <div className="relative mx-auto mb-2 flex max-w-sm flex-wrap justify-center gap-3 text-2xl" aria-hidden="true">
        {["\u{1F388}", "\u{1F389}", "\u{1F388}", "\u{1F38A}", "\u{1F388}"].map((b, i) => (
          <span key={i} className="balon-c" style={{ animation: `balon-naik-c ${1.8 + i * 0.3}s ease-in-out infinite` }}>
            {b}
          </span>
        ))}
      </div>
      <p className="relative mx-auto max-w-sm rounded-md border-4 border-[#FDE68A] bg-[#C2410C] px-3 py-2 text-lg font-black tracking-wide text-[#FEF3C7] shadow-[0_4px_0_rgba(0,0,0,0.3)]">FESTIVAL LAYANG-LAYANG MERIAH</p>
      <div className="relative mt-2 flex flex-wrap items-end justify-center gap-2 text-2xl" aria-hidden="true">
        {["\u{1FA81}", "\u{1F388}", "\u{1FA81}", "\u{1F388}", "\u{1FA81}"].map((h, i) => (
          <span key={i} className="layang-c" style={{ animation: `layang-goyang-c ${1.2 + i * 0.2}s ease-in-out infinite` }}>
            {h}
          </span>
        ))}
      </div>
      <div className="relative mt-2 flex flex-wrap items-start justify-center gap-x-3 gap-y-1" aria-hidden="true">
        {[
          ["\u{1F469}", "Bu Ratih"],
          ["\u{1F9D1}", "Kak Anton"],
          ["\u{1F468}", "Pak Samsul"],
          ["\u{1F466}", "Raka"],
          ["\u{1F467}", "Salsa"],
          ["\u{1F9D2}", "Bima"],
          ["\u{1F468}", "Pak Joko"],
        ].map(([e, n], i) => (
          <span key={i} className="flex w-14 flex-col items-center text-2xl leading-none">
            {e}
            <span className="mt-1 text-[10px] font-black leading-tight text-[#7C2D12]">{n}</span>
          </span>
        ))}
      </div>
      <p className="relative mt-2 text-sm font-black text-[#9A3412]">{PENUTUP_C}</p>
    </div>
  );
}

export default function TahapLintasan({
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
  const tema: Tema = rupa === "benda" ? "lintasan" : rupa === "diagram" ? "petak" : "panitia";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_C}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-md border-[6px] border-[#C2410C] bg-white shadow-[0_6px_0_rgba(124,45,18,0.3)]">
        <div className="space-y-3 rounded-sm p-4" style={LATAR.panitia}>
          <p className="text-center text-lg font-black text-[#9A3412]">{"\u{1F4CC}"} Poin Penting: Garis dan Bangun Datar</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#C2410C] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#C2410C] text-[10px] font-black text-[#C2410C]">{i + 1}</span>
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
  const kepala = tema === "lintasan" ? "rounded-xl border-4 border-[#EA580C] bg-[#FFFBEB]" : tema === "petak" ? "rounded-md border-2 border-[#16A34A] bg-white" : "rounded-md border-2 border-dashed border-[#C2410C] bg-white";
  const papan = tema === "lintasan" ? "rounded-2xl border-4 border-[#EA580C]" : tema === "petak" ? "rounded-md border-2 border-[#16A34A]" : "rounded-md border-2 border-dashed border-[#C2410C]";
  const warnaKepala = tema === "petak" ? "text-[#15803D]" : tema === "lintasan" ? "text-[#C2410C]" : "text-[#9A3412]";
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
        <LangkahLintasan key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "lintasan")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#EA580C] bg-[#EA580C] shadow-[0_6px_0_rgba(124,45,18,0.4)]">
        <div className="h-3 bg-[#FDBA74]" aria-hidden="true" />
        {isi}
        <div className="h-3 bg-[#FDBA74]" aria-hidden="true" />
      </div>
    );
  if (tema === "petak") return <div className="rounded-lg border-[6px] border-[#16A34A] bg-[#F0FDF4] shadow-[0_6px_0_rgba(22,101,52,0.3)]">{isi}</div>;
  return <div className="rounded-md border-[6px] border-[#C2410C] bg-white shadow-[0_6px_0_rgba(124,45,18,0.3)]">{isi}</div>;
}
