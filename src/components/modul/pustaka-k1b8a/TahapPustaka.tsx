"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahPustaka } from "./LangkahPustaka";
import { JEMBATAN, JEMBATAN_SUARA, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 8 Sub-Bab A: dua belas tugas lanjutan Misi Meja Pilah
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, satu tugas Klik berupa Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Bab 1 sampai Bab 7: Concrete = lantai bak mobil pustaka berpapan hijau, kemajuan berupa deret kotak cerita bergambar yang diberi cap;
 * Pictorial = kertas label putih bergaris tabel dan titik, kemajuan berupa titik yang terisi satu per satu;
 * Abstract = papan data kapur berbingkai kayu, kemajuan berupa goresan turus (lima dicoret miring).
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B (diagram gambar). Tanpa skor.
 */

type Tema = "lantai" | "label" | "kapur";
const LATAR: Record<Tema, React.CSSProperties> = {
  lantai: {
    backgroundColor: "#166534",
    backgroundImage:
      "repeating-linear-gradient(90deg,rgba(0,0,0,0.18) 0 2px,transparent 2px 46px),repeating-linear-gradient(0deg,rgba(255,255,255,0.05) 0 1px,transparent 1px 9px),linear-gradient(180deg,#15803D,#14532D)",
  },
  label: {
    backgroundColor: "#F8FAFC",
    backgroundImage:
      "linear-gradient(rgba(100,116,139,0.35) 1px,transparent 1px),linear-gradient(90deg,rgba(100,116,139,0.35) 1px,transparent 1px),radial-gradient(circle,rgba(100,116,139,0.35) 1.2px,transparent 1.6px)",
    backgroundSize: "96px 48px,96px 48px,16px 16px",
  },
  kapur: {
    backgroundColor: "#14532D",
    backgroundImage: "radial-gradient(circle at 25% 25%,rgba(255,255,255,0.09),transparent 42%),radial-gradient(circle at 78% 72%,rgba(255,255,255,0.06),transparent 46%),linear-gradient(180deg,#166534,#14532D)",
  },
};

const WARNA_KOTAK = ["#FCA5A5", "#FDE68A", "#BBF7D0", "#BFDBFE", "#F9A8D4", "#FDBA74"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "lantai")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 rounded-xl bg-black/25 px-2 py-1.5" aria-label={`Kotak cerita ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`flex h-6 w-6 items-center justify-center rounded-md border-2 text-[11px] font-black ${i === nomor ? "animate-pulse" : ""}`}
            style={{ background: i < nomor ? WARNA_KOTAK[i % WARNA_KOTAK.length] : "transparent", borderColor: i <= nomor ? "#FEF3C7" : "rgba(254,243,199,0.45)", borderStyle: i > nomor ? "dashed" : "solid", color: "#14532D" }}
          >
            {i < nomor ? "✓" : ""}
          </span>
        ))}
      </div>
    );
  if (tema === "label")
    return (
      <div className="mx-auto flex max-w-md items-center justify-center gap-1.5 px-2 py-1" aria-label={`Titik ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
            <circle cx={10} cy={10} r={6.5} fill={i < nomor ? "#1C01A5" : "none"} stroke="#1C01A5" strokeWidth={i === nomor ? 2.6 : 1.4} strokeDasharray={i > nomor ? "2 2" : undefined} />
          </svg>
        ))}
      </div>
    );
  const lebar = 7;
  return (
    <div className="mx-auto max-w-md px-2 py-1" aria-label={`Goresan ${Math.min(nomor, total)} dari ${total}`}>
      <svg viewBox={`0 0 ${total * lebar + 14} 22`} className="block h-6 w-full" aria-hidden="true">
        {n.map((i) => {
          const g = Math.floor((i - 1) / 5);
          const j = (i - 1) % 5;
          const x = 4 + (i - 1) * lebar + g * 2;
          const warna = i < nomor ? "#F8FAFC" : i === nomor ? "#FDE68A" : "rgba(248,250,252,0.3)";
          return <line key={i} x1={x} x2={x} y1={3} y2={19} stroke={warna} strokeWidth={j === 4 ? 1.6 : 2} strokeDasharray={i > nomor ? "2 2" : undefined} strokeLinecap="round" />;
        })}
      </svg>
    </div>
  );
}

export default function TahapPustaka({
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
  const tema: Tema = rupa === "benda" ? "lantai" : rupa === "diagram" ? "label" : "kapur";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${JEMBATAN_SUARA}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-3xl border-[10px] border-[#92400E] bg-[#92400E] p-0 shadow-[0_6px_0_rgba(69,26,3,0.4)]">
        <div className="space-y-3 rounded-xl p-4" style={LATAR.kapur}>
          <Kemajuan tema="kapur" nomor={13} total={12} />
          <div className="rounded-2xl border-4 border-dashed border-[#F8FAFC] p-3">
            <p className="text-center text-lg font-black text-[#FEF08A]">{"\u{270F}\u{FE0F}"} Poin Penting: Misi Meja Pilah selesai!</p>
            <ul className="mt-2 space-y-1.5">
              {POIN_PENTING.map((p, i) => (
                <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#F8FAFC]/70 bg-[#14532D] px-3 py-2 text-sm font-bold text-[#F8FAFC]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#F8FAFC] text-[10px] font-black text-[#FEF08A]">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F69A}"} {JEMBATAN}
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
  const kepala =
    tema === "lantai"
      ? "rounded-xl border-4 border-[#FEF3C7] bg-[#FEF9C3]"
      : tema === "label"
        ? "rounded-md border-2 border-dashed border-[#1C01A5] bg-white"
        : "rounded-xl border-4 border-dashed border-[#F8FAFC] bg-[#166534]";
  const papan = tema === "lantai" ? "rounded-2xl border-4 border-[#FEF3C7]" : tema === "label" ? "rounded-md border-2 border-[#1C01A5]" : "rounded-xl border-4 border-[#F8FAFC]";
  const warnaKepala = tema === "kapur" ? "text-[#FEF08A]" : tema === "label" ? "text-[#1C01A5]" : "text-[#92400E]";
  const warnaJudul = tema === "kapur" ? "text-[#F8FAFC]" : "text-[#1C01A5]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "kapur" ? "text-[#F8FAFC]/85" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
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
              {IKON_METODE[ls.metode]} {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahPustaka key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  return tema === "kapur" ? <div className="rounded-3xl border-[10px] border-[#92400E] bg-[#92400E] shadow-[0_6px_0_rgba(69,26,3,0.4)]">{isi}</div> : <div className="rounded-3xl">{isi}</div>;
}
