"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahUbin } from "./LangkahUbin";
import { PENUTUP_A, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 3 Sub-Bab A: dua belas tugas lanjutan Misi Petak Ubin
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8 dan Kelas 2 Bab 1 dan 2: Concrete = lantai taman berpetak ubin kuning dan hijau, kemajuan berupa deret ubin yang terisi;
 * Pictorial = kertas kisi putih bergaris biru tipis, kemajuan berupa deret titik kisi yang terisi; Abstract = papan tulis hijau berbingkai kayu, kemajuan berupa goresan kapur.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B. Tanpa skor.
 */

type Tema = "lantai" | "kisi" | "papan";
const LATAR: Record<Tema, React.CSSProperties> = {
  lantai: {
    backgroundColor: "#FEF3C7",
    backgroundImage: "linear-gradient(45deg,#BBF7D0 25%,transparent 25%,transparent 75%,#BBF7D0 75%),linear-gradient(45deg,#BBF7D0 25%,transparent 25%,transparent 75%,#BBF7D0 75%)",
    backgroundSize: "48px 48px",
    backgroundPosition: "0 0,24px 24px",
  },
  kisi: {
    backgroundColor: "#FFFFFF",
    backgroundImage: "linear-gradient(rgba(59,130,246,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.22) 1px,transparent 1px)",
    backgroundSize: "20px 20px",
  },
  papan: {
    backgroundColor: "#166534",
    backgroundImage: "radial-gradient(circle at 20% 30%,rgba(255,255,255,0.07) 0 40px,transparent 41px),radial-gradient(circle at 80% 70%,rgba(255,255,255,0.06) 0 50px,transparent 51px)",
  },
};
const WARNA_UBIN = ["#FDE047", "#4ADE80"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "lantai")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 rounded-xl bg-white/70 px-2 py-1.5" aria-label={`Ubin ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`block h-4 w-4 border-2 ${i === nomor ? "animate-pulse" : ""}`}
            style={{ background: i < nomor ? WARNA_UBIN[i % 2] : "transparent", borderColor: i <= nomor ? "#92400E" : "rgba(146,64,14,0.4)", borderStyle: i > nomor ? "dashed" : "solid" }}
          />
        ))}
      </div>
    );
  if (tema === "kisi")
    return (
      <div className="mx-auto flex max-w-md items-center justify-center gap-2 px-2 py-1" aria-label={`Titik kisi ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
            <circle cx="6" cy="6" r={i === nomor ? 4.6 : 3.6} fill={i < nomor ? "#1C01A5" : "none"} stroke="#1C01A5" strokeWidth={i === nomor ? 2.2 : 1.2} strokeDasharray={i > nomor ? "2 2" : undefined} />
          </svg>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1.5 px-2 py-1" aria-label={`Goresan kapur ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-4 w-1 rounded-full ${i === nomor ? "animate-pulse" : ""}`} style={{ transform: `rotate(${((i * 23) % 24) - 12}deg)`, background: i < nomor ? "#F8FAFC" : "transparent", border: `1.5px ${i > nomor ? "dashed" : "solid"} ${i <= nomor ? "#F8FAFC" : "rgba(248,250,252,0.45)"}` }} />
      ))}
    </div>
  );
}

export default function TahapUbin({
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
  const tema: Tema = rupa === "benda" ? "lantai" : rupa === "diagram" ? "kisi" : "papan";
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
      <div className="rounded-3xl border-[10px] border-[#92400E] bg-[#92400E] shadow-[0_6px_0_rgba(69,26,3,0.4)]">
        <div className="space-y-3 rounded-xl p-4" style={LATAR.papan}>
          <p className="text-center text-lg font-black text-[#FEF08A]">{"\u{270F}\u{FE0F}"} Poin Penting: Bangun Datar</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#F8FAFC]/70 bg-[#14532D] px-3 py-2 text-sm font-bold text-[#F8FAFC]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#F8FAFC] text-[10px] font-black text-[#FEF08A]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F9E9}"} {PENUTUP_A}
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
  const kepala = tema === "lantai" ? "rounded-xl border-4 border-[#CA8A04] bg-[#FFFBEB]" : tema === "kisi" ? "rounded-md border border-[#1C01A5] bg-white" : "rounded-xl border-4 border-dashed border-[#F8FAFC]/80 bg-[#14532D]";
  const papan = tema === "lantai" ? "rounded-2xl border-4 border-[#CA8A04]" : tema === "kisi" ? "rounded-md border border-[#1C01A5]" : "rounded-xl border-4 border-[#F8FAFC]/80";
  const warnaKepala = tema === "papan" ? "text-[#FDE047]" : tema === "kisi" ? "text-[#1C01A5]" : "text-[#92400E]";
  const warnaJudul = tema === "papan" ? "text-white" : "text-[#1C01A5]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "papan" ? "text-white/85" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#92400E] bg-[#FEF3C7] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#92400E]">
              Tugas {nomor} dari {total} · {cariSalah ? "\u{1F50E} Cari kesalahan · " : ""}
              {rupa === "benda" ? `${IKON_METODE[ls.metode]} ` : ""}
              {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahUbin key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  return tema === "papan" ? <div className="rounded-3xl border-[10px] border-[#92400E] bg-[#92400E] shadow-[0_6px_0_rgba(69,26,3,0.4)]">{isi}</div> : <div className="rounded-3xl">{isi}</div>;
}
