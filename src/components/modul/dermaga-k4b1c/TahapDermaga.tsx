"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahDermaga } from "./LangkahDermaga";
import { PENUTUP_C, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract K4 Bab 1 Sub-Bab C: dua belas tugas lanjutan Misi Dermaga
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Sub-Bab lain dan bab lain: Concrete = papan dermaga kayu di tepi laut, kemajuan berupa deret perahu kecil;
 * Pictorial = peta laut berpetak biru muda, kemajuan berupa deret tanda garis bilangan; Abstract = daftar Kak Tiara berkertas krem bergaris biru kehijauan dengan cap perahu, kemajuan berupa deret cap kecil.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab D. Tanpa skor.
 */

type Tema = "dermaga" | "peta" | "daftar";
const LATAR: Record<Tema, React.CSSProperties> = {
  dermaga: {
    backgroundColor: "#CFEAF5",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(14,116,144,0.18) 0 2px,transparent 2px 30px),repeating-linear-gradient(90deg,rgba(107,68,35,0.12) 0 2px,transparent 2px 44px)",
  },
  peta: {
    backgroundColor: "#EAF4FF",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(37,99,235,0.18) 0 1px,transparent 1px 24px),repeating-linear-gradient(90deg,rgba(37,99,235,0.18) 0 1px,transparent 1px 24px)",
  },
  daftar: {
    backgroundColor: "#FFF8E6",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(8,145,178,0.24) 0 1px,transparent 1px 26px),linear-gradient(90deg,rgba(220,38,38,0.32) 0 2px,transparent 2px)",
    backgroundSize: "auto, 34px 100%",
    backgroundRepeat: "repeat, no-repeat",
  },
};
const BENDERA = ["#FCA5A5", "#FDE047", "#86EFAC", "#93C5FD", "#F9A8D4"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "dermaga")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Perahu ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block text-base leading-none ${i === nomor ? "animate-pulse" : i < nomor ? "" : "opacity-30 grayscale"}`}>
            {"\u{1F6F6}"}
          </span>
        ))}
      </div>
    );
  if (tema === "peta")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 px-2 py-1" aria-label={`Tanda ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block w-1.5 rounded-sm ${i % 5 === 0 ? "h-5" : "h-3"} ${i === nomor ? "animate-pulse bg-[#F59E0B]" : i < nomor ? "bg-[#1D4ED8]" : "border border-dashed border-[#1D4ED8]/50 bg-transparent"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3 w-3 rotate-45 border-2 ${i === nomor ? "animate-pulse border-[#0891B2] bg-[#CFFAFE]" : i < nomor ? "border-[#155E75] bg-[#0891B2]" : "border-dashed border-[#155E75]/50 bg-transparent"}`} />
      ))}
    </div>
  );
}

export default function TahapDermaga({
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
  const tema: Tema = rupa === "benda" ? "dermaga" : rupa === "diagram" ? "peta" : "daftar";
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
      <div className="rounded-xl border-[10px] border-[#0891B2] bg-[#0891B2] shadow-[0_6px_0_rgba(21,94,117,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.daftar}>
          <p className="text-center text-lg font-black text-[#155E75]">{"\u{1F6A4}"} Poin Penting: Membandingkan dan Mengurutkan</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#155E75] bg-white/90 px-3 py-2 text-sm font-bold text-[#155E75]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#DC2626] bg-[#FEE2E2] text-[10px] font-black text-[#991B1B]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F4E3}"} {PENUTUP_C}
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
  const kepala = tema === "dermaga" ? "rounded-xl border-4 border-[#6B4423] bg-white" : tema === "peta" ? "rounded-md border-2 border-dashed border-[#1D4ED8] bg-white" : "rounded-md border-4 border-[#0891B2] bg-white";
  const papan = tema === "dermaga" ? "rounded-2xl border-4 border-[#6B4423]" : tema === "peta" ? "rounded-md border-2 border-dashed border-[#1D4ED8]" : "rounded-md border-4 border-[#0891B2]";
  const warnaKepala = tema === "dermaga" ? "text-[#6B4423]" : tema === "peta" ? "text-[#1D4ED8]" : "text-[#0E7490]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "dermaga" ? (
        <div className="mx-auto flex max-w-[420px] items-center gap-1" aria-hidden="true">
          <span className="rounded-sm border-2 border-[#6B4423] bg-[#FEF3C7] px-1.5 text-[9px] font-black text-[#6B4423]">PAPAN DERMAGA</span>
          {BENDERA.map((w) => (
            <span key={w} className="block h-3 flex-1 rounded-sm border border-[#6B4423]/60" style={{ backgroundColor: w }} />
          ))}
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "daftar" ? (
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#0891B2] bg-[#CFFAFE] px-1 text-[10px] text-[#0E7490]" aria-hidden="true">
              {"\u{1F6A4}"} cap
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
        <LangkahDermaga key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "dermaga")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#6B4423] bg-[#CFEAF5] shadow-[0_6px_0_rgba(69,26,3,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#6B4423 0 4px,#D9A566 4px 44px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#6B4423 0 4px,#D9A566 4px 44px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "peta") return <div className="rounded-lg border-[10px] border-[#1D4ED8] bg-[#EAF4FF] shadow-[0_6px_0_rgba(30,58,138,0.35)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#0891B2] bg-[#0891B2] shadow-[0_6px_0_rgba(21,94,117,0.4)]">{isi}</div>;
}
