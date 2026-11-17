"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahIkan } from "./LangkahIkan";
import { POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 5 Sub-Bab A: dua belas soal lanjutan Misi Lapak Ikan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Pola visual tiap tahap baru, berbeda dari Bab 1 sampai Bab 4:
 * Concrete = dasar akuarium berpasir dengan kerikil, kemajuan berupa rumput air yang tumbuh; Pictorial = pola jaring ikan (simpul jala),
 * kemajuan berupa simpul yang terikat; Abstract = kaca berembun, kemajuan berupa tetes air yang meluncur. Abstract diakhiri Poin Penting. Tanpa skor.
 */

type Tema = "pasir" | "jala" | "embun";
const LATAR: Record<Tema, React.CSSProperties> = {
  pasir: {
    backgroundColor: "#7DD3FC",
    backgroundImage:
      "radial-gradient(circle at 12% 88%,#A8A29E 0 7px,transparent 8px),radial-gradient(circle at 34% 93%,#78716C 0 5px,transparent 6px),radial-gradient(circle at 63% 90%,#D6D3D1 0 8px,transparent 9px),radial-gradient(circle at 86% 94%,#A8A29E 0 6px,transparent 7px),linear-gradient(180deg,#7DD3FC 0%,#38BDF8 72%,#F5DEB3 72%,#E9C98F 100%)",
  },
  jala: {
    backgroundColor: "#ECFEFF",
    backgroundImage:
      "repeating-linear-gradient(45deg,rgba(14,116,144,0.28) 0 2px,transparent 2px 26px),repeating-linear-gradient(-45deg,rgba(14,116,144,0.28) 0 2px,transparent 2px 26px),radial-gradient(circle,rgba(14,116,144,0.35) 0 3px,transparent 3.5px)",
    backgroundSize: "auto,auto,18.4px 18.4px",
  },
  embun: {
    backgroundColor: "#DBEAFE",
    backgroundImage:
      "radial-gradient(ellipse 5px 7px at 10% 20%,rgba(255,255,255,0.9) 0 60%,transparent 70%),radial-gradient(ellipse 4px 6px at 70% 12%,rgba(255,255,255,0.85) 0 60%,transparent 70%),radial-gradient(ellipse 6px 8px at 40% 60%,rgba(255,255,255,0.8) 0 60%,transparent 70%),radial-gradient(ellipse 4px 5px at 88% 70%,rgba(255,255,255,0.85) 0 60%,transparent 70%),radial-gradient(rgba(255,255,255,0.55) 1px,transparent 1.6px),linear-gradient(160deg,#E0F2FE,#C7D2FE)",
    backgroundSize: "120px 120px,140px 140px,160px 160px,110px 110px,7px 7px,auto",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "pasir")
    return (
      <div className="mx-auto flex max-w-md items-end justify-center gap-1 rounded-xl bg-[#E9C98F] px-2 pb-1 pt-2" aria-label={`Rumput air ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span key={i} className="flex flex-col items-center" aria-hidden="true">
            <span
              className={`w-2 rounded-t-full ${i < nomor ? "bg-[#16A34A]" : i === nomor ? "animate-pulse bg-[#86EFAC]" : "bg-[#A3A3A3]/40"}`}
              style={{ height: `${i < nomor ? 20 + (i % 3) * 4 : i === nomor ? 14 : 6}px` }}
            />
            <span className={`h-2 w-4 rounded-full ${i === nomor ? "bg-[#FACC15]" : "bg-[#78716C]"}`} />
          </span>
        ))}
      </div>
    );
  if (tema === "jala")
    return (
      <div className="mx-auto max-w-md" aria-label={`Simpul ${nomor} dari ${total}`}>
        <svg viewBox="0 0 240 30" className="block w-full" aria-hidden="true">
          {n.map((i) => {
            const x = 10 + ((i - 1) / (total - 1)) * 220;
            const y = i % 2 ? 9 : 21;
            const xs = 10 + (i / (total - 1)) * 220;
            return (
              <g key={i}>
                {i < total ? <line x1={x} y1={y} x2={xs} y2={i % 2 ? 21 : 9} stroke={i < nomor ? "#0E7490" : "#94A3B8"} strokeWidth={i < nomor ? 2.4 : 1.2} strokeDasharray={i < nomor ? undefined : "3 3"} /> : null}
                <circle cx={x} cy={y} r={i === nomor ? 6 : 4.5} fill={i < nomor ? "#0E7490" : i === nomor ? "#FACC15" : "#FFFFFF"} stroke="#0E7490" strokeWidth={1.4} />
              </g>
            );
          })}
        </svg>
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md items-start justify-center gap-1 rounded-xl bg-white/40 px-2 py-1" aria-label={`Tetes air ${nomor} dari ${total}`}>
      {n.map((i) => (
        <span key={i} className="flex flex-col items-center" aria-hidden="true">
          <span className={`w-0.5 ${i < nomor ? "bg-[#60A5FA]" : "bg-transparent"}`} style={{ height: `${i < nomor ? 14 : 2}px` }} />
          <span
            className={`h-3 w-2.5 ${i < nomor ? "bg-[#3B82F6]" : i === nomor ? "animate-bounce bg-[#FACC15]" : "bg-white/80"}`}
            style={{ borderRadius: "50% 50% 50% 50% / 65% 65% 35% 35%", border: "1px solid #1D4ED8" }}
          />
        </span>
      ))}
    </div>
  );
}

export default function TahapIkan({
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
  const tema: Tema = rupa === "benda" ? "pasir" : rupa === "diagram" ? "jala" : "embun";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} Semua ikan sudah dihitung dan berlabel. Hebat!`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.embun}>
        <Kemajuan tema="embun" nomor={13} total={12} />
        <div className="rounded-2xl border-4 border-[#1D4ED8] bg-white/90 p-3">
          <p className="text-center text-lg font-black text-[#1D4ED8]">{"\u{1F4A7}"} Poin Penting: Misi Lapak Ikan bagian ini selesai!</p>
          <ul className="mt-2 space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#BFDBFE] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-[10px] font-black text-[#FDE68A]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
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
    tema === "pasir"
      ? "rounded-t-3xl rounded-b-md border-4 border-[#0369A1] bg-[#F5DEB3] shadow-[inset_0_-8px_0_rgba(120,113,108,0.35)]"
      : tema === "jala"
        ? "rounded-md border-[3px] border-double border-[#0E7490] bg-white/90"
        : "rounded-3xl border-2 border-white bg-white/60 backdrop-blur-sm";
  const papan = tema === "pasir" ? "rounded-2xl border-4 border-[#0369A1]" : tema === "jala" ? "rounded-md border-[3px] border-dashed border-[#0E7490]" : "rounded-[1.6rem] border-4 border-white shadow-[0_0_0_3px_#93C5FD]";
  return (
    <div className="space-y-3 rounded-3xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${tema === "jala" ? "text-[#0E7490]" : tema === "embun" ? "text-[#1D4ED8]" : "text-[#0369A1]"}`}>
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#1D4ED8] bg-[#DBEAFE] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#1D4ED8]">
              Soal {nomor} dari {total} · {ls.langkah.tipe === "salah" ? "🔍 Cari kesalahan" : `${IKON_METODE[ls.metode]} ${NAMA_METODE[ls.metode]}`}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahIkan key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
