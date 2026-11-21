"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahMeteran } from "./LangkahMeteran";
import { PENUTUP_D, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 4 Bab 2 Sub-Bab D: dua belas tugas lanjutan Misi Meteran
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Sub-Bab lain Bab ini: Concrete = meja ukur Pak Bagas beralas kain kotak-kotak biru dengan pinggiran meteran kuning, kemajuan berupa deret gulungan kain;
 * Pictorial = kertas milimeter hijau muda berbingkai teal dengan garis ukur, kemajuan berupa deret garis ukur kecil; Abstract = nota Pak Bagas berkertas krem bergaris biru dengan cap meteran, kemajuan berupa deret cap kecil.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab E. Tanpa skor.
 */

type Tema = "meja" | "milimeter" | "nota";
const LATAR: Record<Tema, React.CSSProperties> = {
  meja: {
    backgroundColor: "#DBEAFE",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(37,99,235,0.2) 0 10px,transparent 10px 26px),repeating-linear-gradient(0deg,rgba(37,99,235,0.2) 0 10px,transparent 10px 26px)",
  },
  milimeter: {
    backgroundColor: "#F0FDFA",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(15,118,110,0.22) 0 1px,transparent 1px 12px),repeating-linear-gradient(90deg,rgba(15,118,110,0.22) 0 1px,transparent 1px 12px)",
  },
  nota: {
    backgroundColor: "#FFFBEB",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(67,56,202,0.22) 0 1px,transparent 1px 26px),linear-gradient(90deg,rgba(219,39,119,0.35) 0 2px,transparent 2px)",
    backgroundSize: "auto, 34px 100%",
    backgroundRepeat: "repeat, no-repeat",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "meja")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Gulungan ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`block h-4 w-4 rounded-full border-[3px] ${i === nomor ? "animate-pulse border-[#1D4ED8] bg-[#BFDBFE]" : i < nomor ? "border-[#1E3A8A] bg-[#3B82F6]" : "border-dashed border-[#1E3A8A]/40 bg-transparent"}`}
          />
        ))}
      </div>
    );
  if (tema === "milimeter")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 px-2 py-1" aria-label={`Garis ukur ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block w-1 rounded-sm border ${i % 5 === 0 ? "h-4" : "h-2.5"} ${i === nomor ? "animate-pulse border-[#0F766E] bg-[#99F6E4]" : i < nomor ? "border-[#115E59] bg-[#14B8A6]" : "border-dashed border-[#115E59]/50 bg-transparent"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-[3px] border-2 ${i === nomor ? "animate-pulse border-[#4338CA] bg-[#C7D2FE]" : i < nomor ? "border-[#312E81] bg-[#6366F1]" : "border-dashed border-[#312E81]/50 bg-transparent"}`} />
      ))}
    </div>
  );
}

export default function TahapMeteran({
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
  const tema: Tema = rupa === "benda" ? "meja" : rupa === "diagram" ? "milimeter" : "nota";
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
      <div className="rounded-xl border-[10px] border-[#4338CA] bg-[#4338CA] shadow-[0_6px_0_rgba(30,27,75,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.nota}>
          <p className="text-center text-lg font-black text-[#312E81]">{"\u{1F4CF}"} Poin Penting: Pecahan Desimal</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#312E81] bg-white/90 px-3 py-2 text-sm font-bold text-[#312E81]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#DB2777] bg-[#FCE7F3] text-[10px] font-black text-[#9D174D]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F4E3}"} {PENUTUP_D}
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
  const kepala = tema === "meja" ? "rounded-xl border-4 border-[#1D4ED8] bg-white" : tema === "milimeter" ? "rounded-md border-4 border-[#0F766E] bg-[#F0FDFA]" : "rounded-md border-4 border-[#4338CA] bg-white";
  const papan = tema === "meja" ? "rounded-2xl border-4 border-[#1D4ED8]" : tema === "milimeter" ? "rounded-md border-4 border-[#0F766E]" : "rounded-md border-4 border-[#4338CA]";
  const warnaKepala = tema === "meja" ? "text-[#1D4ED8]" : tema === "milimeter" ? "text-[#0F766E]" : "text-[#4338CA]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "meja" ? (
        <div className="mx-auto flex max-w-[420px] items-center gap-1" aria-hidden="true">
          <span className="rounded-sm border-2 border-[#1D4ED8] bg-[#FEF9C3] px-1.5 text-[9px] font-black text-[#1E3A8A]">METERAN KAIN</span>
          <span className="block h-3 flex-1 border-y-2 border-[#CA8A04]" style={{ backgroundImage: "repeating-linear-gradient(90deg,#FDE047 0 6px,#CA8A04 6px 7px)" }} />
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "nota" ? (
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#4338CA] bg-[#E0E7FF] px-1 text-[10px] text-[#4338CA]" aria-hidden="true">
              {"\u{1F4CF}"} cap
            </span>
          ) : null}
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
        <LangkahMeteran key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#1D4ED8] bg-[#DBEAFE] shadow-[0_6px_0_rgba(30,58,138,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#FDE047 0 6px,#CA8A04 6px 7px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#FDE047 0 6px,#CA8A04 6px 7px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "milimeter") return <div className="rounded-lg border-[10px] border-[#0F766E] bg-[#F0FDFA] shadow-[0_6px_0_rgba(17,94,89,0.35)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#4338CA] bg-[#4338CA] shadow-[0_6px_0_rgba(30,27,75,0.4)]">{isi}</div>;
}
