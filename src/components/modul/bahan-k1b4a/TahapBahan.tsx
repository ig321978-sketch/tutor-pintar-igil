"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahBahan } from "./LangkahBahan";
import { POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 4 Sub-Bab A: dua belas soal lanjutan Misi Festival
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Pola visual tiap tahap baru, berbeda dari Bab 1 sampai Bab 3:
 * Concrete = kardus bergelombang bersolatip dengan kemajuan berupa tumpukan kardus, Pictorial = kertas pola jahit tipis
 * dengan garis potong putus-putus dan gunting yang maju, Abstract = kertas kado bergaris dengan untaian lampu festival yang menyala.
 * Abstract diakhiri Poin Penting. Tanpa skor.
 */

type Tema = "kardus" | "pola" | "kado";
const LATAR: Record<Tema, React.CSSProperties> = {
  kardus: {
    backgroundColor: "#C08A4B",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(120,53,15,0.22) 0 3px,transparent 3px 9px),linear-gradient(180deg,transparent 0 46%,rgba(255,255,255,0.35) 46% 54%,transparent 54%)",
  },
  pola: {
    backgroundColor: "#FDF6E3",
    backgroundImage:
      "repeating-linear-gradient(0deg,rgba(14,116,144,0.10) 0 1px,transparent 1px 22px),repeating-linear-gradient(90deg,rgba(14,116,144,0.10) 0 1px,transparent 1px 22px),repeating-linear-gradient(35deg,transparent 0 60px,rgba(190,24,93,0.18) 60px 62px)",
  },
  kado: {
    backgroundColor: "#7C3AED",
    backgroundImage: "repeating-linear-gradient(45deg,rgba(250,204,21,0.35) 0 12px,transparent 12px 30px),repeating-linear-gradient(-45deg,rgba(244,114,182,0.30) 0 6px,transparent 6px 30px)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "kardus")
    return (
      <div className="mx-auto flex max-w-md items-end justify-center gap-0.5 rounded-xl bg-[#78350F]/70 px-2 pb-1 pt-2" aria-label={`Kardus ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            className={`flex w-6 items-center justify-center rounded-sm border-2 text-[9px] font-black ${i < nomor ? "border-[#451A03] bg-[#D6A15E] text-[#451A03]" : i === nomor ? "animate-bounce border-[#FACC15] bg-[#FDE68A] text-[#451A03]" : "border-dashed border-[#FDE68A]/50 text-[#FDE68A]/50"}`}
            style={{ height: `${14 + (i % 3) * 5}px` }}
          >
            {i}
          </span>
        ))}
      </div>
    );
  if (tema === "pola")
    return (
      <div className="relative mx-auto h-8 max-w-md rounded-lg border-2 border-[#0E7490] bg-white/80" aria-label={`Potongan ${nomor} dari ${total}`}>
        <div className="absolute left-2 right-2 top-1/2 border-t-2 border-dashed border-[#BE185D]" />
        <div className="absolute left-2 top-1/2 h-0.5 bg-[#0E7490]" style={{ width: `calc(${((nomor - 1) / total) * 100}% - 0.5rem)` }} />
        <span className="absolute top-0.5 text-lg leading-none" style={{ left: `calc(${((nomor - 1) / total) * 100}% - 0.2rem)` }} aria-hidden="true">
          {"\u{2702}\u{FE0F}"}
        </span>
      </div>
    );
  return (
    <div className="mx-auto max-w-md" aria-label={`Lampu ${nomor} dari ${total}`}>
      <svg viewBox="0 0 240 34" className="block w-full" aria-hidden="true">
        <path d="M 4 6 Q 120 30 236 6" fill="none" stroke="#1F2937" strokeWidth={1.6} />
        {n.map((i) => {
          const x = 4 + ((i - 0.5) / total) * 232;
          const t = (x - 4) / 232;
          const y = 6 + 4 * 24 * t * (1 - t) * 1;
          const nyala = i < nomor;
          const kini = i === nomor;
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={x} y2={y + 4} stroke="#1F2937" strokeWidth={1.2} />
              <ellipse cx={x} cy={y + 9} rx={5} ry={6.5} fill={nyala ? ["#FACC15", "#F472B6", "#34D399", "#60A5FA"][i % 4] : kini ? "#FFFFFF" : "#4B5563"} stroke={kini ? "#FACC15" : "#1F2937"} strokeWidth={kini ? 2 : 1} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function TahapBahan({
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
  const tema: Tema = rupa === "benda" ? "kardus" : rupa === "diagram" ? "pola" : "kado";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} Semua bahan festival sudah dikenali. Hebat!`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.kado}>
        <Kemajuan tema="kado" nomor={13} total={12} />
        <div className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] p-3">
          <p className="text-center text-lg font-black text-[#6D28D9]">{"\u{1F3AA}"} Poin Penting: Misi Festival bagian ini selesai!</p>
          <ul className="mt-2 space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#C4B5FD] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-[10px] font-black text-[#FDE68A]">{i + 1}</span>
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
    tema === "kardus"
      ? "rounded-md border-4 border-[#78350F] bg-[#FDE7C8] shadow-[inset_0_10px_0_rgba(250,204,21,0.55)]"
      : tema === "pola"
        ? "rounded-sm border-2 border-dashed border-[#BE185D] bg-white/90"
        : "rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB]";
  const papan = tema === "kardus" ? "rounded-md border-4 border-[#78350F]" : tema === "pola" ? "rounded-sm border-2 border-dashed border-[#0E7490]" : "rounded-[1.4rem] border-4 border-[#F472B6]";
  return (
    <div className="space-y-3 rounded-3xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${tema === "pola" ? "text-[#BE185D]" : tema === "kado" ? "text-[#6D28D9]" : "text-[#78350F]"}`}>
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
              Soal {nomor} dari {total} · {IKON_METODE[ls.metode]} {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahBahan key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
