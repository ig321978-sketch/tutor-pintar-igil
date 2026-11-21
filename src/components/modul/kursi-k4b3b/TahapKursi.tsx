"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahKursi } from "./LangkahKursi";
import { PENUTUP_B, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Sub-Bab B (pola bilangan, akhir bab): dua belas tugas lanjutan Misi Kursi
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru:
 * Concrete = lapangan konser berumput dengan tali lampu, kemajuan berupa deret lampu; Pictorial = kertas titik biru muda, kemajuan berupa deret titik;
 * Abstract = lembar program konser berkertas krem bergaris dengan cap bundar merah, kemajuan berupa deret cap kecil.
 * Abstract diakhiri Poin Penting lalu perayaan akhir bab (spanduk KONSER ANGKLUNG KAMPUNG SENANDUNG, angklung berderet, lampu, balon, konfeti, kedua tamu dan semua tokoh). Tanpa skor.
 */

type Tema = "lapangan" | "titik" | "program";
const LATAR: Record<Tema, React.CSSProperties> = {
  lapangan: {
    backgroundColor: "#FEF3C7",
    backgroundImage: "radial-gradient(circle at 20% 80%,rgba(180,83,9,0.18) 0 3px,transparent 4px),repeating-linear-gradient(0deg,rgba(217,119,6,0.14) 0 2px,transparent 2px 22px)",
    backgroundSize: "26px 26px,100% 100%",
  },
  titik: {
    backgroundColor: "#EFF6FF",
    backgroundImage: "radial-gradient(circle,rgba(29,78,216,0.35) 1.4px,transparent 1.6px)",
    backgroundSize: "16px 16px",
  },
  program: {
    backgroundColor: "#FFFFFF",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(100,116,139,0.18) 0 1px,transparent 1px 28px),radial-gradient(ellipse at 80% 12%,rgba(220,38,38,0.12),transparent 55%)",
  },
};
/** Tali lampu di atas lapangan konser (Concrete). */
const LAMPU_MINI = ["\u{1F4A1}", "\u{1F4A1}", "\u{1F4A1}", "\u{1F4A1}", "\u{1F4A1}"];
/** Angklung berderet pada perayaan akhir bab. */
const DERET_ANGKLUNG = ["\u{1F3B6}", "\u{1F3B6}", "\u{1F3B6}", "\u{1F3B6}", "\u{1F3B6}", "\u{1F3B6}", "\u{1F3B6}"];
/** Tokoh perayaan akhir bab: kedua tamu dan keempat tokoh tampil sebagai emoji bernama (tanpa ZWJ, paling tinggi U+1FA95). */
const TOKOH_PESTA = [
  { ikon: "👩", nama: "Bu Ratri" },
  { ikon: "👨", nama: "Pak Gunawan" },
  { ikon: "👨", nama: "Pak Hendro" },
  { ikon: "👦", nama: "Satria" },
  { ikon: "👧", nama: "Laras" },
  { ikon: "🧒", nama: "Genta" },
];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "lapangan")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-0.5 px-2 py-1" aria-label={`Lampu ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`text-base leading-none ${i === nomor ? "animate-pulse" : ""} ${i <= nomor ? "" : "opacity-30 grayscale"}`}>
            {"\u{1F4A1}"}
          </span>
        ))}
      </div>
    );
  if (tema === "titik")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Titik ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-full border ${i === nomor ? "animate-pulse border-[#1D4ED8] bg-[#BFDBFE]" : i < nomor ? "border-[#1E3A8A] bg-[#60A5FA]" : "border-dashed border-[#1D4ED8]/60 bg-transparent"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#B91C1C] bg-[#FECACA]" : i < nomor ? "border-[#B91C1C] bg-[#F87171]" : "border-dashed border-[#B91C1C]/50 bg-transparent"}`} />
      ))}
    </div>
  );
}

export default function TahapKursi({
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
  const tema: Tema = rupa === "benda" ? "lapangan" : rupa === "diagram" ? "titik" : "program";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_B}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-xl border-[10px] border-[#B91C1C] bg-[#B91C1C] shadow-[0_6px_0_rgba(127,29,29,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.program}>
          <p className="text-center text-lg font-black text-[#7F1D1D]">Poin Penting: Pola Bilangan</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#B91C1C] bg-[#FEF2F2] px-3 py-2 text-sm font-bold text-[#7F1D1D]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#B91C1C] bg-[#FECACA] text-[10px] font-black text-[#7F1D1D]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="space-y-2 rounded-2xl border-4 border-[#B45309] bg-[#FFFBEB] p-3 text-center" data-uji="perayaan">
            <p className="mx-auto max-w-[360px] rounded-md border-4 border-[#B45309] bg-[#FEF3C7] px-2 py-1 text-sm font-black tracking-wide text-[#92400E]">KONSER ANGKLUNG KAMPUNG SENANDUNG</p>
            <p className="flex justify-center gap-0.5 text-xl leading-none" aria-hidden="true">
              {DERET_ANGKLUNG.map((e, i) => (
                <span key={i}>{e}</span>
              ))}
            </p>
            <p className="text-3xl leading-none" aria-hidden="true">
              {"\u{1F4A1}"} {"\u{1F388}"} {"\u{1F389}"} {"\u{1F388}"} {"\u{1F4A1}"}
            </p>
            <div className="mx-auto grid max-w-[360px] grid-cols-3 gap-1.5" role="list" aria-label="Semua yang hadir">
              {TOKOH_PESTA.map((t) => (
                <div key={t.nama} role="listitem" className="rounded-xl border-2 border-[#B45309] bg-white px-1 py-1">
                  <p className="text-2xl leading-none" aria-hidden="true">
                    {t.ikon}
                  </p>
                  <p className="text-xs font-black text-[#7C2D12]">{t.nama}</p>
                </div>
              ))}
            </div>
            <p className="text-sm font-black text-[#78350F]">
              {"\u{1F4E3}"} {PENUTUP_B}
            </p>
          </div>
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
  const kepala = tema === "lapangan" ? "rounded-xl border-4 border-[#B45309] bg-white" : tema === "titik" ? "rounded-md border-2 border-dashed border-[#1D4ED8] bg-[#EFF6FF]" : "rounded-md border-4 border-[#B91C1C] bg-[#FEF2F2]";
  const papan = tema === "lapangan" ? "rounded-2xl border-4 border-[#B45309]" : tema === "titik" ? "rounded-md border-2 border-dashed border-[#1D4ED8]" : "rounded-md border-4 border-[#B91C1C]";
  const warnaKepala = tema === "lapangan" ? "text-[#92400E]" : tema === "titik" ? "text-[#1E3A8A]" : "text-[#991B1B]";
  const warnaJudul = "text-[#1C01A5]";
  const warnaCerita = "text-[#1C01A5]/80";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "lapangan" ? (
        <div className="mx-auto flex max-w-[420px] justify-around rounded-md bg-white/80 px-2" aria-hidden="true">
          {LAMPU_MINI.map((e, i) => (
            <span key={i} className="text-lg leading-none">
              {e}
            </span>
          ))}
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "program" ? (
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#B91C1C] bg-[#FECACA] px-1 text-[10px] text-[#7F1D1D]" aria-hidden="true">
              cap konser
            </span>
          ) : null}
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
        <LangkahKursi key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "lapangan")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#B45309] bg-white shadow-[0_6px_0_rgba(120,53,15,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#B45309 0 4px,#FDE68A 4px 44px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#B45309 0 4px,#FDE68A 4px 44px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "titik") return <div className="rounded-lg border-[6px] border-double border-[#1D4ED8] bg-[#EFF6FF] shadow-[0_6px_0_rgba(30,58,138,0.3)]">{isi}</div>;
  return (
    <div className="rounded-xl border-[10px] border-[#B91C1C] bg-[#B91C1C] shadow-[0_6px_0_rgba(127,29,29,0.4)]">
      {isi}
    </div>
  );
}
