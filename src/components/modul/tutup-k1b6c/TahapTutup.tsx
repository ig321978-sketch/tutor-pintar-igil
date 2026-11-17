"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahTutup } from "./LangkahTutup";
import { PERAYAAN, PERAYAAN_SUARA, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 6 Sub-Bab C: dua belas soal lanjutan Misi Pasar Malam
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, satu soal Klik berupa Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Bab 1 sampai Bab 5 dan Sub-Bab A dan B: Concrete = langit malam dengan tiang dan tali balon, kemajuan berupa deretan balon yang naik;
 * Pictorial = peta malam berpetak yang bertaburan lampion, kemajuan berupa jalur lampion yang menyala satu per satu;
 * Abstract = langit malam berkembang api, kemajuan berupa kilau bintang api yang menyala.
 * Abstract diakhiri Poin Penting dan perayaan akhir cerita Pasar Malam Kampung (pasar malam ditutup). Tanpa skor.
 */

type Tema = "balon" | "peta" | "langit";
const LATAR: Record<Tema, React.CSSProperties> = {
  balon: {
    backgroundColor: "#312E81",
    backgroundImage:
      "radial-gradient(ellipse 9px 11px at 20px 22px,#F472B6 0 8px,transparent 9px),radial-gradient(ellipse 9px 11px at 56px 50px,#FACC15 0 8px,transparent 9px),radial-gradient(ellipse 9px 11px at 38px 74px,#38BDF8 0 8px,transparent 9px),repeating-linear-gradient(90deg,transparent 0 35px,rgba(255,255,255,0.2) 35px 37px),linear-gradient(180deg,#1E1B4B,#4338CA)",
    backgroundSize: "76px 96px,76px 96px,76px 96px,auto,auto",
  },
  peta: {
    backgroundColor: "#0F172A",
    backgroundImage:
      "radial-gradient(circle at 24% 30%,#FDBA74 0 3px,rgba(251,146,60,0.3) 4px 11px,transparent 12px),radial-gradient(circle at 72% 66%,#FDBA74 0 3px,rgba(251,146,60,0.3) 4px 11px,transparent 12px),linear-gradient(rgba(148,163,184,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.22) 1px,transparent 1px)",
    backgroundSize: "120px 110px,150px 130px,28px 28px,28px 28px",
  },
  langit: {
    backgroundColor: "#020617",
    backgroundImage:
      "radial-gradient(circle at 18% 22%,#FDE047 0 2px,rgba(253,224,71,0.35) 3px 12px,transparent 13px),radial-gradient(circle at 78% 30%,#F472B6 0 2px,rgba(244,114,182,0.35) 3px 14px,transparent 15px),radial-gradient(circle at 52% 78%,#67E8F9 0 2px,rgba(103,232,249,0.3) 3px 12px,transparent 13px),radial-gradient(circle at 90% 82%,#A3E635 0 2px,rgba(163,230,53,0.3) 3px 10px,transparent 11px),linear-gradient(180deg,#020617,#1E1B4B)",
  },
};

const WARNA_BALON = ["#F472B6", "#FACC15", "#38BDF8", "#34D399", "#FB923C", "#A78BFA"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "balon")
    return (
      <div className="mx-auto max-w-md" aria-label={`Balon ${Math.min(nomor, total)} dari ${total}`}>
        <svg viewBox="0 0 240 44" className="block w-full" aria-hidden="true">
          <line x1={4} x2={236} y1={40} y2={40} stroke="#E5E7EB" strokeWidth={1.6} />
          {n.map((i) => {
            const x = 12 + ((i - 0.5) / total) * 216;
            const naik = i < nomor ? 0 : i === nomor ? 4 : 10;
            return (
              <g key={i}>
                <line x1={x} x2={x} y1={14 + naik + 7} y2={40} stroke="#E5E7EB" strokeWidth={0.8} />
                <ellipse cx={x} cy={12 + naik} rx={6} ry={7.4} fill={i <= nomor ? WARNA_BALON[i % 6] : "rgba(255,255,255,0.22)"} stroke="#FFFFFF" strokeWidth={i === nomor ? 1.6 : 0.6} />
              </g>
            );
          })}
        </svg>
      </div>
    );
  if (tema === "peta")
    return (
      <div className="mx-auto max-w-md" aria-label={`Lampion ${Math.min(nomor, total)} dari ${total}`}>
        <svg viewBox="0 0 240 40" className="block w-full" aria-hidden="true">
          <path d={`M 10 28 ${n.map((i) => `L ${10 + ((i - 0.5) / total) * 220} ${i % 2 ? 14 : 28}`).join(" ")}`} fill="none" stroke="#94A3B8" strokeWidth={1.2} strokeDasharray="3 3" />
          {n.map((i) => {
            const x = 10 + ((i - 0.5) / total) * 220;
            const y = i % 2 ? 14 : 28;
            const nyala = i <= nomor;
            return (
              <g key={i}>
                {nyala ? <circle cx={x} cy={y} r={i === nomor ? 10 : 8} fill="rgba(251,146,60,0.3)" /> : null}
                <circle cx={x} cy={y} r={5} fill={nyala ? "#FDBA74" : "#334155"} stroke={nyala ? "#FFF7ED" : "#64748B"} strokeWidth={1.2} />
              </g>
            );
          })}
        </svg>
      </div>
    );
  return (
    <div className="mx-auto max-w-md" aria-label={`Kembang api ${Math.min(nomor, total)} dari ${total}`}>
      <svg viewBox="0 0 240 28" className="block w-full" aria-hidden="true">
        {n.map((i) => {
          const x = 12 + ((i - 0.5) / total) * 216;
          const r = i === nomor ? 9 : 6.5;
          return <path key={i} d={`M ${x} ${14 - r} L ${x + r * 0.28} ${14 - r * 0.28} L ${x + r} 14 L ${x + r * 0.28} ${14 + r * 0.28} L ${x} ${14 + r} L ${x - r * 0.28} ${14 + r * 0.28} L ${x - r} 14 L ${x - r * 0.28} ${14 - r * 0.28} Z`} fill={i <= nomor ? ["#FDE047", "#F472B6", "#67E8F9", "#A3E635"][i % 4] : "rgba(255,255,255,0.2)"} />;
        })}
      </svg>
    </div>
  );
}

/** Perayaan akhir cerita bab: papan TUTUP, TERIMA KASIH, lampion, dan kembang api. */
function Perayaan() {
  const percik = Array.from({ length: 20 }, (_, i) => i);
  return (
    <div className="relative overflow-hidden rounded-2xl border-4 border-[#FDE047] bg-[#1E1B4B] p-3 text-center">
      <style>{`@keyframes tp-naik{0%{transform:translateY(150px) scale(0.6);opacity:0}30%{opacity:1}100%{transform:translateY(-30px) scale(1.1);opacity:0.2}}`}</style>
      {percik.map((i) => (
        <span
          key={i}
          className="absolute bottom-0 block h-2 w-2 rounded-full"
          style={{ left: `${(i * 37) % 100}%`, background: ["#FDE047", "#F472B6", "#67E8F9", "#A3E635"][i % 4], animation: `tp-naik ${2.2 + (i % 5) * 0.4}s ease-out ${(i % 6) * 0.3}s infinite` }}
          aria-hidden="true"
        />
      ))}
      <p className="mx-auto inline-block rounded-lg border-4 border-[#BE123C] bg-white px-3 py-1 text-xl font-black tracking-widest text-[#BE123C]">TUTUP, TERIMA KASIH</p>
      <p className="mt-2 text-lg font-black text-[#FEF08A]">{PERAYAAN}</p>
      <p className="mt-1 text-2xl" aria-hidden="true">
        {"\u{1F3EE}\u{1F386}\u{1F3EE}\u{1F388}\u{1F389}"}
      </p>
    </div>
  );
}

export default function TahapTutup({
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
  const tema: Tema = rupa === "benda" ? "balon" : rupa === "diagram" ? "peta" : "langit";
  const [s, setS] = useState(0);
  const [l, setL] = useState(0);
  const [benar, setBenar] = useState(false);
  const [akhir, setAkhir] = useState(false);
  const so = soal[s];
  const ls = so?.langkah[l];

  useEffect(() => {
    if (!ls || akhir) return;
    umum.speakGuru(l === 0 ? `${NAMA_CARA[so.cara]}. ${so.cerita} ${ls.suara}` : ls.suara);
    // Hanya saat soal berganti.
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PERAYAAN_SUARA}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.langit}>
        <Kemajuan tema="langit" nomor={13} total={12} />
        <div className="rounded-2xl border-4 border-[#FDE047] bg-[#FFFBEB] p-3">
          <p className="text-center text-lg font-black text-[#3730A3]">{"\u{1F386}"} Poin Penting: Misi Pasar Malam selesai!</p>
          <ul className="mt-2 space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#C7D2FE] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3730A3] text-[10px] font-black text-[#FDE047]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <Perayaan />
        <div className="flex justify-center">
          <button type="button" className={TOMBOL_UTAMA} onClick={selesaiTahap}>
            {teksAkhir}
          </button>
        </div>
      </div>
    );
  if (!so || !ls) return null;

  const terakhirSemua = s === soal.length - 1 && l === so.langkah.length - 1;
  const total = soal.reduce((n, x) => n + x.langkah.length, 0);
  const nomor = soal.slice(0, s).reduce((n, x) => n + x.langkah.length, 0) + l + 1;
  const kepala =
    tema === "balon"
      ? "rounded-3xl border-4 border-[#F472B6] bg-[#FDF2F8]"
      : tema === "peta"
        ? "rounded-md border-2 border-dashed border-[#FBBF24] bg-[#FEF3C7]"
        : "rounded-b-md rounded-t-[2.5rem] border-2 border-[#FDE047] bg-[#312E81]";
  const papan = tema === "balon" ? "rounded-[2rem] border-4 border-[#F472B6]" : tema === "peta" ? "rounded-none border-4 border-double border-[#FBBF24]" : "rounded-2xl border-4 border-[#A78BFA]";
  const warnaKepala = tema === "balon" ? "text-[#9D174D]" : tema === "peta" ? "text-[#92400E]" : "text-[#FDE047]";
  const warnaJudul = tema === "langit" ? "text-white" : "text-[#1C01A5]";
  const warnaCerita = tema === "langit" ? "text-white/80" : "text-[#1C01A5]/80";
  const cariSalah = ls.langkah.tipe === "salah";
  return (
    <div className="space-y-3 rounded-3xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${warnaCerita}`}>{so.cerita}</p>
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#4338CA] bg-[#E0E7FF] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#4338CA]">
              Soal {nomor} dari {total} · {cariSalah ? "\u{1F50E} Cari kesalahan · " : ""}
              {IKON_METODE[ls.metode]} {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahTutup key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
      </div>

      {benar ? (
        <div className="flex justify-center">
          <button type="button" onClick={lanjut} className={TOMBOL_UTAMA}>
            {terakhirSemua ? (poinPenting ? "LIHAT POIN PENTING ⬇️" : teksAkhir) : l < so.langkah.length - 1 ? "SOAL BERIKUTNYA ➡️" : `LANJUT: ${NAMA_CARA[soal[s + 1].cara].toUpperCase()} ➡️`}
          </button>
        </div>
      ) : null}
    </div>
  );
}
