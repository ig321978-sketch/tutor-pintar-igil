"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahPuzzle } from "./LangkahPuzzle";
import { PENUTUP_B, POIN_PENTING, POIN_PENTING_SUARA, WARNA_KAYU } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 3 Sub-Bab B: dua belas tugas lanjutan Misi Papan Puzzle
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, satu tugas Klik berupa Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8, Kelas 2 Bab 1 dan 2, dan Sub-Bab lain bab ini: Concrete = meja kayu Bu Ratna bergaris serat, kemajuan berupa deret keping puzzle
 * yang terisi warna; Pictorial = lembar bayangan gelap, kemajuan berupa deret titik bayangan yang menyala; Abstract = lembar petunjuk lipat berwarna kertas dengan garis lipatan,
 * kemajuan berupa kotak bernomor dengan pojok terlipat. Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab C. Tanpa skor.
 */
type Tema = "kayu" | "bayangan" | "lipat";
const LATAR: Record<Tema, React.CSSProperties> = {
  kayu: { backgroundColor: "#E7C08E", backgroundImage: "repeating-linear-gradient(90deg,rgba(146,64,14,0.18) 0 2px,transparent 2px 30px),repeating-linear-gradient(0deg,rgba(146,64,14,0.08) 0 1px,transparent 1px 9px)" },
  bayangan: { backgroundColor: "#0F172A", backgroundImage: "radial-gradient(circle at 20% 15%,rgba(148,163,184,0.14) 0 40px,transparent 41px),radial-gradient(circle at 85% 80%,rgba(148,163,184,0.1) 0 50px,transparent 51px)" },
  lipat: { backgroundColor: "#FFF7E6", backgroundImage: "linear-gradient(90deg,transparent 49.5%,rgba(180,83,9,0.3) 49.5% 50.5%,transparent 50.5%),linear-gradient(0deg,transparent 49.5%,rgba(180,83,9,0.22) 49.5% 50.5%,transparent 50.5%)", backgroundSize: "160px 160px" },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "kayu")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 rounded-xl bg-white/60 px-2 py-1.5" aria-label={`Keping ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-5 w-5 rounded-md border-2 ${i === nomor ? "animate-pulse" : ""}`} style={{ background: i < nomor ? WARNA_KAYU[i % WARNA_KAYU.length] : "transparent", borderColor: i <= nomor ? "#92400E" : "rgba(146,64,14,0.4)", borderStyle: i > nomor ? "dashed" : "solid" }} />
        ))}
      </div>
    );
  if (tema === "bayangan")
    return (
      <div className="mx-auto flex max-w-md items-center justify-center gap-1.5 px-2 py-1" aria-label={`Bayangan ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-full ${i === nomor ? "animate-pulse" : ""}`} style={{ background: i < nomor ? "#E2E8F0" : "transparent", border: `2px ${i > nomor ? "dashed" : "solid"} ${i <= nomor ? "#E2E8F0" : "rgba(226,232,240,0.4)"}` }} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Lipatan ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`flex h-5 w-5 items-center justify-center text-[9px] font-black ${i === nomor ? "animate-pulse" : ""}`}
          style={{ clipPath: "polygon(0 0,70% 0,100% 30%,100% 100%,0 100%)", background: i < nomor ? "#B45309" : "rgba(180,83,9,0.12)", color: i < nomor ? "#FFF7E6" : "#92400E" }}
        >
          {i}
        </span>
      ))}
    </div>
  );
}

export default function TahapPuzzle({
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
  const tema: Tema = rupa === "benda" ? "kayu" : rupa === "diagram" ? "bayangan" : "lipat";
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
      <div className="space-y-3 rounded-3xl border-4 border-[#B45309] p-3" style={LATAR.lipat}>
        <style>{CSS_LEMARI}</style>
        <Kemajuan tema="lipat" nomor={13} total={12} />
        <div className="rounded-2xl border-4 border-dashed border-[#B45309] bg-white/90 p-3">
          <p className="text-center text-lg font-black text-[#92400E]">{"\u{270F}\u{FE0F}"} Poin Penting: Misi Papan Puzzle selesai!</p>
          <ul className="mt-2 space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#B45309]/60 bg-[#FEF3C7] px-3 py-2 text-sm font-bold text-[#78350F]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#92400E] text-[10px] font-black">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-3 py-2 text-center text-sm font-black text-[#1C01A5]">
          {"\u{1F3DA}\u{FE0F}"} {PENUTUP_B}
        </p>
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
  const kepala = tema === "kayu" ? "rounded-md border-4 border-[#92400E] bg-[#FEF3C7]" : tema === "bayangan" ? "rounded-xl border-2 border-[#64748B] bg-[#1E293B]" : "rounded-sm border-2 border-dashed border-[#B45309] bg-white/90";
  const papan = tema === "kayu" ? "rounded-md border-4 border-[#92400E]" : tema === "bayangan" ? "rounded-xl border-2 border-[#64748B]" : "rounded-sm border-2 border-[#B45309]";
  const warnaKepala = tema === "bayangan" ? "text-[#FACC15]" : "text-[#92400E]";
  const warnaJudul = tema === "bayangan" ? "text-white" : "text-[#1C01A5]";
  const cariSalah = ls.langkah.tipe === "salah";
  return (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "bayangan" ? "text-white/85" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
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
        <LangkahPuzzle key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
}
