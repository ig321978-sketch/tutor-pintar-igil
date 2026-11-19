"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahPerahu } from "./LangkahPerahu";
import { JEMBATAN_G, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 4 Bab 1 Sub-Bab G: dua belas tugas lanjutan Misi Perahu
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari bab dan sub-bab lain: Concrete = dermaga kayu berpapan dengan laut di tepinya, kemajuan berupa deret perahu kecil;
 * Pictorial = kertas kotak biru muda, kemajuan berupa deret kotak; Abstract = lembar jadwal perahu berkertas krem dengan cap caping, kemajuan berupa deret cap kecil.
 * Abstract diakhiri Poin Penting lalu jembatan ke Sub-Bab H (Bu Ratna membawa daftar tamu). Tanpa skor.
 */

type Tema = "dermaga" | "kotak" | "jadwal";
const LATAR: Record<Tema, React.CSSProperties> = {
  dermaga: {
    backgroundColor: "#E0F2FE",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(180,83,9,0.28) 0 2px,transparent 2px 30px),linear-gradient(180deg,rgba(125,211,252,0.35),transparent 40%)",
  },
  kotak: {
    backgroundColor: "#F0F9FF",
    backgroundImage: "linear-gradient(rgba(14,165,233,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,0.22) 1px,transparent 1px)",
    backgroundSize: "24px 24px",
  },
  jadwal: {
    backgroundColor: "#FFFBEB",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(146,64,14,0.16) 0 1px,transparent 1px 28px),radial-gradient(ellipse at 82% 12%,rgba(234,179,8,0.2),transparent 55%)",
  },
};
const PERAHU_MINI = ["\u{26F5}", "\u{1F6F6}", "\u{26F5}", "\u{1F6F6}", "\u{26F5}"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "dermaga")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-0.5 px-2 py-1" aria-label={`Perahu ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`text-base leading-none ${i === nomor ? "animate-pulse" : ""} ${i <= nomor ? "" : "opacity-30 grayscale"}`}>
            {"\u{26F5}"}
          </span>
        ))}
      </div>
    );
  if (tema === "kotak")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Kotak ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3 w-3 border ${i === nomor ? "animate-pulse border-[#0369A1] bg-[#7DD3FC]" : i < nomor ? "border-[#075985] bg-[#0EA5E9]" : "border-dashed border-[#0EA5E9]/60 bg-transparent"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#A16207] bg-[#FDE68A]" : i < nomor ? "border-[#A16207] bg-[#EAB308]" : "border-dashed border-[#A16207]/50 bg-transparent"}`} />
      ))}
    </div>
  );
}

export default function TahapPerahu({
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
  const tema: Tema = rupa === "benda" ? "dermaga" : rupa === "diagram" ? "kotak" : "jadwal";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${JEMBATAN_G}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-xl border-[10px] border-[#CA8A04] bg-[#CA8A04] shadow-[0_6px_0_rgba(113,63,18,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.jadwal}>
          <p className="text-center text-lg font-black text-[#713F12]">{"\u{26F5}"} Poin Penting: Perkalian sampai Seratus</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#CA8A04] bg-[#FEFCE8] px-3 py-2 text-sm font-bold text-[#713F12]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#A16207] bg-[#FDE68A] text-[10px] font-black text-[#713F12]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="space-y-2 rounded-2xl border-4 border-[#0369A1] bg-[#F0F9FF] p-3 text-center" data-uji="jembatan">
            <p className="text-3xl leading-none" aria-hidden="true">
              {"\u{26F5}"} {"\u{1F6F6}"} {"\u{26F5}"}
            </p>
            <p className="text-sm font-black text-[#0C4A6E]">
              {"\u{1F4E3}"} {JEMBATAN_G}
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
  const kepala = tema === "dermaga" ? "rounded-xl border-4 border-[#B45309] bg-white" : tema === "kotak" ? "rounded-md border-2 border-dashed border-[#0EA5E9] bg-[#E0F2FE]" : "rounded-md border-4 border-[#CA8A04] bg-[#FEFCE8]";
  const papan = tema === "dermaga" ? "rounded-2xl border-4 border-[#B45309]" : tema === "kotak" ? "rounded-md border-2 border-dashed border-[#0EA5E9]" : "rounded-md border-4 border-[#CA8A04]";
  const warnaKepala = tema === "dermaga" ? "text-[#B45309]" : tema === "kotak" ? "text-[#0369A1]" : "text-[#A16207]";
  const warnaJudul = "text-[#1C01A5]";
  const warnaCerita = "text-[#1C01A5]/80";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "dermaga" ? (
        <div className="mx-auto flex max-w-[420px] justify-around rounded-md bg-white/80 px-2" aria-hidden="true">
          {PERAHU_MINI.map((e, i) => (
            <span key={i} className="text-lg leading-none">
              {e}
            </span>
          ))}
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "jadwal" ? (
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#A16207] bg-[#FDE68A] px-1 text-[10px] text-[#713F12]" aria-hidden="true">
              cap caping
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
        <LangkahPerahu key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#92400E] bg-white shadow-[0_6px_0_rgba(69,26,3,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#92400E 0 4px,#D6A867 4px 44px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#92400E 0 4px,#D6A867 4px 44px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "kotak") return <div className="rounded-lg border-[6px] border-double border-[#0EA5E9] bg-[#F0F9FF] shadow-[0_6px_0_rgba(3,105,161,0.3)]">{isi}</div>;
  return (
    <div className="rounded-xl border-[10px] border-[#CA8A04] bg-[#CA8A04] shadow-[0_6px_0_rgba(113,63,18,0.4)]">
      {isi}
    </div>
  );
}
