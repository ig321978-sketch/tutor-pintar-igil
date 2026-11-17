"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahRak } from "./LangkahRak";
import { POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 5 Sub-Bab B: dua belas soal lanjutan Misi Lapak Ikan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Pola visual tiap tahap baru, berbeda dari Bab 1 sampai Bab 4 dan Sub-Bab A:
 * Concrete = batu kali berlumut, kemajuan berupa batu pijakan yang ditumbuhi lumut; Pictorial = pita ukur kain kuning bertanda,
 * kemajuan berupa tanda pita yang terisi; Abstract = papan angka lampu hijau tujuh segmen, kemajuan berupa lampu yang menyala.
 * Abstract diakhiri Poin Penting. Tanpa skor.
 */

type Tema = "batu" | "pita" | "segmen";
const LATAR: Record<Tema, React.CSSProperties> = {
  batu: {
    backgroundColor: "#A8B5A2",
    backgroundImage:
      "radial-gradient(ellipse 34px 22px at 14% 22%,#6B7F5E 0 55%,#4D5E43 56% 62%,transparent 64%),radial-gradient(ellipse 40px 26px at 78% 14%,#8A9A7B 0 55%,#5F6F52 56% 62%,transparent 64%),radial-gradient(ellipse 30px 20px at 52% 82%,#7C8C6C 0 55%,#55663F 56% 62%,transparent 64%),radial-gradient(ellipse 26px 18px at 90% 70%,#6B7F5E 0 55%,#4D5E43 56% 62%,transparent 64%),radial-gradient(circle at 30% 60%,rgba(74,222,128,0.35) 0 6px,transparent 7px),linear-gradient(180deg,#BFD8C9,#9FB7A6)",
    backgroundSize: "180px 160px,200px 170px,170px 150px,160px 180px,90px 80px,auto",
  },
  pita: {
    backgroundColor: "#FEF3C7",
    backgroundImage:
      "repeating-linear-gradient(90deg,rgba(146,64,14,0.55) 0 2px,transparent 2px 12px),repeating-linear-gradient(90deg,rgba(146,64,14,0.75) 0 2px,transparent 2px 60px),linear-gradient(180deg,#FDE047 0 14px,#FEF3C7 14px calc(100% - 14px),#FDE047 calc(100% - 14px))",
    backgroundSize: "auto 10px,auto 18px,auto",
    backgroundRepeat: "repeat-x,repeat-x,no-repeat",
  },
  segmen: {
    backgroundColor: "#052E16",
    backgroundImage: "radial-gradient(rgba(74,222,128,0.18) 1px,transparent 1.6px),linear-gradient(180deg,#022C22,#052E16)",
    backgroundSize: "8px 8px,auto",
  },
};

/** Satu angka tujuh segmen (nol sampai sembilan) untuk papan lampu hijau. */
const SEGMEN: Record<number, string> = { 0: "abcdef", 1: "bc", 2: "abged", 3: "abgcd", 4: "fgbc", 5: "afgcd", 6: "afgedc", 7: "abc", 8: "abcdefg", 9: "abcdfg" };
function Segmen({ d, x }: { d: number; x: number }) {
  const on = SEGMEN[d] ?? "";
  const s = (k: string) => (on.includes(k) ? "#4ADE80" : "rgba(74,222,128,0.12)");
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x={2} y={0} width={10} height={2.4} rx={1} fill={s("a")} />
      <rect x={12} y={2} width={2.4} height={9} rx={1} fill={s("b")} />
      <rect x={12} y={13} width={2.4} height={9} rx={1} fill={s("c")} />
      <rect x={2} y={22} width={10} height={2.4} rx={1} fill={s("d")} />
      <rect x={-0.4} y={13} width={2.4} height={9} rx={1} fill={s("e")} />
      <rect x={-0.4} y={2} width={2.4} height={9} rx={1} fill={s("f")} />
      <rect x={2} y={11} width={10} height={2.4} rx={1} fill={s("g")} />
    </g>
  );
}

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "batu")
    return (
      <div className="mx-auto flex max-w-md items-end justify-center gap-1 rounded-xl bg-[#7DA0B5]/60 px-2 py-1.5" aria-label={`Batu pijakan ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`h-4 w-5 ${i === nomor ? "animate-pulse" : ""}`}
            style={{
              borderRadius: "50% 50% 45% 45% / 60% 60% 40% 40%",
              background: i < nomor ? "linear-gradient(180deg,#4ADE80 0 40%,#78716C 41%)" : i === nomor ? "linear-gradient(180deg,#FACC15 0 40%,#78716C 41%)" : "#A8A29E",
              border: "1.5px solid #44403C",
            }}
          />
        ))}
      </div>
    );
  if (tema === "pita")
    return (
      <div className="mx-auto max-w-md" aria-label={`Tanda pita ${nomor} dari ${total}`}>
        <svg viewBox="0 0 240 26" className="block w-full" aria-hidden="true">
          <rect x={2} y={4} width={236} height={18} rx={2} fill="#FDE047" stroke="#92400E" strokeWidth={1.4} />
          <rect x={2} y={4} width={Math.min(236, ((nomor - 1) / total) * 236)} height={18} rx={2} fill="#F59E0B" />
          {n.map((i) => {
            const x = 2 + ((i - 0.5) / total) * 236;
            return (
              <g key={i}>
                <line x1={x} x2={x} y1={4} y2={i % 2 ? 11 : 15} stroke="#78350F" strokeWidth={1.4} />
                {i === nomor ? <path d={`M ${x - 4} 25 L ${x} 18 L ${x + 4} 25 Z`} fill="#1C01A5" /> : null}
              </g>
            );
          })}
        </svg>
      </div>
    );
  const tampil = Math.min(nomor, total);
  return (
    <div className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-xl border-2 border-[#166534] bg-black/60 px-2 py-1" aria-label={`Lampu ${tampil} dari ${total}`}>
      <svg viewBox="0 0 36 26" className="h-7 w-10" aria-hidden="true">
        <Segmen d={Math.floor(tampil / 10)} x={2} />
        <Segmen d={tampil % 10} x={20} />
      </svg>
      <span className="flex gap-1" aria-hidden="true">
        {n.map((i) => (
          <span key={i} className={`h-2.5 w-2.5 rounded-full ${i < nomor ? "bg-[#4ADE80] shadow-[0_0_6px_#4ADE80]" : i === nomor ? "animate-pulse bg-[#FACC15]" : "bg-[#14532D]"}`} />
        ))}
      </span>
    </div>
  );
}

export default function TahapRak({
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
  const tema: Tema = rupa === "benda" ? "batu" : rupa === "diagram" ? "pita" : "segmen";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} Semua akuarium sudah diberi pakan dan bernomor lagi. Hebat!`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.segmen}>
        <Kemajuan tema="segmen" nomor={13} total={12} />
        <div className="rounded-2xl border-4 border-[#4ADE80] bg-white/95 p-3">
          <p className="text-center text-lg font-black text-[#166534]">{"\u{1F7E9}"} Poin Penting: Misi Lapak Ikan bagian ini selesai!</p>
          <ul className="mt-2 space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#BBF7D0] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#052E16] font-mono text-[10px] font-black text-[#4ADE80]">{i + 1}</span>
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
    tema === "batu"
      ? "rounded-[2rem_2rem_1.4rem_1.4rem] border-4 border-[#44403C] bg-[#D6D3D1] shadow-[inset_0_6px_0_rgba(74,222,128,0.55)]"
      : tema === "pita"
        ? "rounded-sm border-y-4 border-[#92400E] bg-[#FDE047]"
        : "rounded-xl border-4 border-[#166534] bg-black/70";
  const papan = tema === "batu" ? "rounded-[1.6rem] border-4 border-[#57534E]" : tema === "pita" ? "rounded-sm border-x-[10px] border-[#FDE047]" : "rounded-xl border-4 border-[#22C55E] shadow-[0_0_12px_rgba(74,222,128,0.6)]";
  const warnaKepala = tema === "segmen" ? "text-[#4ADE80]" : tema === "pita" ? "text-[#78350F]" : "text-[#3F6212]";
  return (
    <div className="space-y-3 rounded-3xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala} ${tema === "segmen" ? "font-mono" : ""}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${tema === "segmen" ? "text-[#BBF7D0]" : "text-[#1C01A5]"}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "segmen" ? "text-[#BBF7D0]/80" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#15803D] bg-[#DCFCE7] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#15803D]">
              Soal {nomor} dari {total} · {IKON_METODE[ls.metode]} {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahRak key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
