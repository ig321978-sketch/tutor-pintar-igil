"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahLonceng } from "./LangkahLonceng";
import { PENUTUP_A, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 5 Bab 2 Sub-Bab A: dua belas tugas lanjutan Misi Lonceng
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 sampai 4 dan Bab 1: Concrete = tenda stan pasar malam bergaris merah-putih dengan papan STAN LONCENG dan lampion berderet, kemajuan berupa deret lampion;
 * Pictorial = kertas jadwal biru pucat bertabel petak berbingkai putus-putus, kemajuan berupa deret titik lompatan; Abstract = lembar pengelola pasar berkertas lavender bergaris dengan cap PENGELOLA PASAR,
 * kemajuan berupa deret ceklis. Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B. Tanpa skor.
 */

type Tema = "stan" | "kertas" | "lembar";
const LATAR: Record<Tema, React.CSSProperties> = {
  stan: {
    backgroundColor: "#FFFBEB",
    backgroundImage: "radial-gradient(circle at 10px 10px,rgba(220,38,38,0.12) 0 4px,transparent 4px)",
    backgroundSize: "28px 28px",
  },
  kertas: {
    backgroundColor: "#EFF6FF",
    backgroundImage: "linear-gradient(0deg,rgba(37,99,235,0.16) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.16) 1px,transparent 1px)",
    backgroundSize: "24px 24px",
  },
  lembar: {
    backgroundColor: "#EEF2FF",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(67,56,202,0.2) 0 1px,transparent 1px 26px),linear-gradient(90deg,rgba(185,28,28,0.4) 0 2px,transparent 2px)",
    backgroundSize: "auto, 34px 100%",
    backgroundRepeat: "repeat, no-repeat",
  },
};
const ATAP = "repeating-linear-gradient(90deg,#DC2626 0 16px,#FFFFFF 16px 32px)";

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "stan")
    return (
      <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Lampion ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-5 w-4 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#B91C1C] bg-[#FDE68A]" : i < nomor ? "border-[#7F1D1D] bg-[#EF4444]" : "border-dashed border-[#7F1D1D]/50 bg-transparent"}`} />
        ))}
      </div>
    );
  if (tema === "kertas")
    return (
      <div className="mx-auto grid max-w-md grid-cols-12 items-end justify-items-center gap-1 px-2 py-1" aria-label={`Lompatan ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#1D4ED8] bg-[#BFDBFE]" : i < nomor ? "border-[#1E3A8A] bg-[#2563EB]" : "border-[#1D4ED8]/40"}`} style={{ marginBottom: i % 2 === 0 ? 4 : 0 }} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Ceklis ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block text-[13px] font-black leading-none ${i === nomor ? "animate-pulse text-[#B91C1C]" : i < nomor ? "text-[#4338CA]" : "text-[#4338CA]/30"}`}>
          {i < nomor ? "✔" : "○"}
        </span>
      ))}
    </div>
  );
}

export default function TahapLonceng({
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
  const tema: Tema = rupa === "benda" ? "stan" : rupa === "diagram" ? "kertas" : "lembar";
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
      <div className="rounded-xl border-[10px] border-[#4338CA] bg-[#4338CA] shadow-[0_6px_0_rgba(30,27,75,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.lembar}>
          <p className="text-center text-lg font-black text-[#312E81]">
            {"\u{1F514}"} Poin Penting: Kelipatan
          </p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#4338CA] bg-white/90 px-3 py-2 text-sm font-bold text-[#1E1B4B]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#B91C1C] bg-[#FEE2E2] text-[10px] font-black text-[#7F1D1D]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F4E3}"} {PENUTUP_A}
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
  const kepala = tema === "stan" ? "rounded-xl border-4 border-[#DC2626] bg-white" : tema === "kertas" ? "rounded-md border-2 border-dashed border-[#2563EB] bg-white" : "rounded-md border-4 border-[#4338CA] bg-white";
  const papan = tema === "stan" ? "rounded-2xl border-4 border-[#DC2626]" : tema === "kertas" ? "rounded-md border-2 border-dashed border-[#2563EB]" : "rounded-md border-4 border-[#4338CA]";
  const warnaKepala = tema === "stan" ? "text-[#991B1B]" : tema === "kertas" ? "text-[#1E40AF]" : "text-[#3730A3]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "stan" ? (
        <div className="mx-auto max-w-[420px] rounded-sm border-2 border-[#7F1D1D] bg-[#FDE68A] px-1.5 text-center text-[10px] font-black text-[#7F1D1D]" aria-hidden="true">
          STAN LONCENG PASAR KULINER MALAM
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "lembar" ? (
            <span className="mt-1 block w-fit -rotate-3 rounded border-2 border-[#B91C1C] bg-[#FEE2E2] px-1 text-[10px] text-[#7F1D1D]" aria-hidden="true">
              cap pengelola
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
        <LangkahLonceng key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "stan")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#DC2626] bg-[#FFFBEB] shadow-[0_6px_0_rgba(127,29,29,0.35)]">
        <div className="h-4" style={{ backgroundImage: ATAP }} aria-hidden="true" />
        {isi}
      </div>
    );
  if (tema === "kertas") return <div className="rounded-lg border-[10px] border-dashed border-[#2563EB] bg-[#EFF6FF] shadow-[0_6px_0_rgba(30,58,138,0.3)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#4338CA] bg-[#4338CA] shadow-[0_6px_0_rgba(30,27,75,0.4)]">{isi}</div>;
}
