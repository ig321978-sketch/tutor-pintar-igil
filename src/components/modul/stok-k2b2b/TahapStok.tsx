"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahStok } from "./LangkahStok";
import { JEMBATAN, JEMBATAN_SUARA, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 2 Sub-Bab B: dua belas tugas lanjutan Misi Meja Stok
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, satu tugas Klik berupa Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1, Kelas 2 Bab 1 (kantin) dan Sub-Bab lain Bab ini: Concrete = papan gabus koperasi bertepi kayu, kemajuan berupa deret kartu stok berpaku
 * yang dicentang; Pictorial = kertas cetak biru berpetak putih bergaris putus, kemajuan berupa titik-titik di jalur bilangan mundur;
 * Abstract = slip stok putih bergaris dengan garis tepi merah, kemajuan berupa deret kotak daftar periksa yang dicentang.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab C (cerita hitungan). Tanpa skor.
 */

type Tema = "gabus" | "cetak" | "slip";
const LATAR: Record<Tema, React.CSSProperties> = {
  gabus: {
    backgroundColor: "#C9A66B",
    backgroundImage:
      "radial-gradient(circle at 20% 30%,rgba(120,72,24,0.38) 0 2px,transparent 3px),radial-gradient(circle at 70% 60%,rgba(120,72,24,0.3) 0 1.5px,transparent 2.5px),radial-gradient(circle at 45% 82%,rgba(255,255,255,0.28) 0 2px,transparent 3px)",
    backgroundSize: "34px 34px, 27px 27px, 41px 41px",
  },
  cetak: {
    backgroundColor: "#93C5FD",
    backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)",
    backgroundSize: "20px 20px",
  },
  slip: {
    backgroundColor: "#FFFFFF",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(100,116,139,0.22) 0 1px,transparent 1px 24px),linear-gradient(90deg,transparent 0 30px,rgba(220,38,38,0.4) 30px 32px,transparent 32px)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "gabus")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1.5 px-2 py-1" aria-label={`Kartu stok ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`relative flex h-7 w-6 items-center justify-center rounded-sm border text-[11px] font-black ${i === nomor ? "animate-pulse" : ""}`}
            style={{ background: i < nomor ? "#FFFBEB" : "rgba(255,251,235,0.45)", borderColor: "#92400E", borderWidth: i === nomor ? 2.5 : 1.2, color: "#15803D" }}
          >
            <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#DC2626]" />
            {i < nomor ? "✓" : ""}
          </span>
        ))}
      </div>
    );
  if (tema === "cetak")
    return (
      <div className="mx-auto max-w-md px-2 py-1" aria-label={`Titik ${Math.min(nomor, total)} dari ${total}`}>
        <svg viewBox={`0 0 ${total * 22 + 8} 22`} className="h-6 w-full" aria-hidden="true">
          <line x1={4} x2={total * 22 + 4} y1={11} y2={11} stroke="#FFFFFF" strokeWidth={2} />
          {n.map((i) => (
            <circle key={i} cx={i * 22 - 7} cy={11} r={i === nomor ? 7 : 5} fill={i < nomor ? "#FFFFFF" : "#1E3A8A"} stroke="#FFFFFF" strokeWidth={i === nomor ? 2.6 : 1.4} strokeDasharray={i > nomor ? "2 2" : undefined} />
          ))}
        </svg>
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Daftar periksa ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`flex h-6 w-6 items-center justify-center border-2 text-[12px] font-black ${i === nomor ? "animate-pulse" : ""}`}
          style={{ background: i < nomor ? "#DCFCE7" : "#FFFFFF", borderColor: i <= nomor ? "#1C01A5" : "#94A3B8", color: "#15803D", borderRadius: 3 }}
        >
          {i < nomor ? "✓" : ""}
        </span>
      ))}
    </div>
  );
}

export default function TahapStok({
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
  const tema: Tema = rupa === "benda" ? "gabus" : rupa === "diagram" ? "cetak" : "slip";
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
      <div className="rounded-xl border-x-[6px] border-y-2 border-[#1C01A5] bg-white p-0 shadow-[0_6px_0_rgba(28,1,165,0.25)]">
        <div className="space-y-3 rounded-xl p-4" style={LATAR.slip}>
          <Kemajuan tema="slip" nomor={13} total={12} />
          <div className="rounded-lg border-2 border-[#1C01A5] bg-white/95 p-3">
            <p className="text-center text-lg font-black text-[#1C01A5]">{"\u{1F9FE}"} Poin Penting: Misi Meja Stok selesai!</p>
            <ul className="mt-2 space-y-1.5">
              {POIN_PENTING.map((p, i) => (
                <li key={p} className="flex items-start gap-2 rounded-md border-2 border-[#1C01A5]/60 bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-2 border-[#1C01A5] text-[10px] font-black text-[#1C01A5]">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <p className="rounded-lg border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F4CC}"} {JEMBATAN}
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
    tema === "gabus"
      ? "rounded-sm border-2 border-[#92400E] bg-[#FFFBEB] shadow-[0_3px_0_rgba(69,26,3,0.3)]"
      : tema === "cetak"
        ? "rounded-md border-2 border-dashed border-white bg-[#1E3A8A]"
        : "rounded-md border-2 border-[#1C01A5] bg-white";
  const papan = tema === "gabus" ? "rounded-sm border-2 border-[#92400E]" : tema === "cetak" ? "rounded-md border-2 border-dashed border-white" : "rounded-md border-2 border-[#1C01A5]";
  const warnaKepala = tema === "cetak" ? "text-[#BFDBFE]" : tema === "gabus" ? "text-[#92400E]" : "text-[#1C01A5]";
  const warnaJudul = tema === "cetak" ? "text-white" : tema === "gabus" ? "text-[#451A03]" : "text-[#1C01A5]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "cetak" ? "text-[#DBEAFE]" : tema === "gabus" ? "text-[#451A03]/85" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
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
              {rupa === "benda" ? `${IKON_METODE[ls.metode]} ` : ""}{NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahStok key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  return tema === "gabus" ? <div className="rounded-lg border-[10px] border-[#A16207] bg-[#A16207] shadow-[0_6px_0_rgba(69,26,3,0.4)]">{isi}</div> : tema === "cetak" ? <div className="rounded-lg border-4 border-dashed border-white">{isi}</div> : <div className="rounded-xl border-x-[6px] border-y-2 border-[#1C01A5]">{isi}</div>;
}
