"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahEtalase } from "./LangkahEtalase";
import { JEMBATAN, JEMBATAN_SUARA, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 1 Sub-Bab A: dua belas tugas lanjutan Misi Kotak Kue
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, satu tugas Klik berupa Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8: Concrete = etalase kaca berkilau dengan papan harga, kemajuan berupa deret kue yang makin utuh;
 * Pictorial = kertas kisi pesanan putih bergaris biru, kemajuan berupa bingkai sepuluh mini yang terisi titik;
 * Abstract = struk kasir panjang bergaris putus bertepi bergerigi, kemajuan berupa kode batang yang menebal.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B (puluhan dan satuan). Tanpa skor.
 */

type Tema = "etalase" | "kertas" | "struk";
const LATAR: Record<Tema, React.CSSProperties> = {
  etalase: {
    backgroundColor: "#E0F2FE",
    backgroundImage:
      "linear-gradient(115deg,rgba(255,255,255,0.7) 0 9%,transparent 9% 14%,rgba(255,255,255,0.45) 14% 17%,transparent 17% 100%),repeating-linear-gradient(180deg,transparent 0 150px,rgba(14,116,144,0.28) 150px 154px),linear-gradient(180deg,#F0F9FF,#BAE6FD)",
  },
  kertas: {
    backgroundColor: "#FFFFFF",
    backgroundImage: "linear-gradient(rgba(37,99,235,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.22) 1px,transparent 1px)",
    backgroundSize: "20px 20px",
  },
  struk: { backgroundColor: "#FFFDF5" },
};
const ZIGZAG = (arah: "atas" | "bawah"): React.CSSProperties => ({
  height: 10,
  backgroundImage: arah === "atas" ? "linear-gradient(135deg,#FFFDF5 25%,transparent 25%),linear-gradient(225deg,#FFFDF5 25%,transparent 25%)" : "linear-gradient(315deg,#FFFDF5 25%,transparent 25%),linear-gradient(45deg,#FFFDF5 25%,transparent 25%)",
  backgroundSize: "12px 12px",
  backgroundPosition: "-6px 0",
});

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "etalase")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 rounded-xl border-2 border-white/80 bg-white/55 px-2 py-1.5" aria-label={`Kue ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[15px] leading-none ${i === nomor ? "animate-pulse border-[#BE185D] bg-[#FDF2F8]" : i < nomor ? "border-[#BE185D]/60 bg-[#FBCFE8]" : "border-dashed border-[#0369A1]/50 bg-transparent"}`}
          >
            <span style={{ opacity: i <= nomor ? 1 : 0.18, filter: i <= nomor ? "none" : "grayscale(1)" }}>{"\u{1F370}"}</span>
          </span>
        ))}
      </div>
    );
  if (tema === "kertas")
    return (
      <div className="mx-auto w-fit rounded-md border-2 border-[#1C01A5] bg-white p-1" aria-label={`Titik ${Math.min(nomor, total)} dari ${total}`}>
        <div className="grid grid-cols-6">
          {n.map((i) => (
            <svg key={i} viewBox="0 0 20 20" className="h-6 w-6 border border-[#1C01A5]/50" aria-hidden="true">
              {i < nomor ? <circle cx={10} cy={10} r={5.5} fill="#1C01A5" /> : i === nomor ? <circle cx={10} cy={10} r={5.5} fill="none" stroke="#1C01A5" strokeWidth={2.4} /> : null}
            </svg>
          ))}
        </div>
      </div>
    );
  return (
    <div className="mx-auto max-w-md px-2 py-1" aria-label={`Kode batang ${Math.min(nomor, total)} dari ${total}`}>
      <svg viewBox={`0 0 ${total * 8 + 8} 24`} className="block h-6 w-full" aria-hidden="true">
        {n.map((i) => (
          <rect key={i} x={4 + (i - 1) * 8} y={2} width={i % 3 === 0 ? 4.5 : i % 2 === 0 ? 2.4 : 3.4} height={20} fill={i < nomor ? "#0F172A" : i === nomor ? "#F59E0B" : "#CBD5E1"} />
        ))}
      </svg>
    </div>
  );
}

export default function TahapEtalase({
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
  const tema: Tema = rupa === "benda" ? "etalase" : rupa === "diagram" ? "kertas" : "struk";
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

  const bungkusStruk = (isi: React.ReactNode) => (
    <div className="mx-auto max-w-lg drop-shadow-[0_6px_0_rgba(15,23,42,0.18)]">
      <div style={ZIGZAG("atas")} aria-hidden="true" />
      <div style={LATAR.struk} className="px-2 font-mono">
        {isi}
      </div>
      <div style={ZIGZAG("bawah")} aria-hidden="true" />
    </div>
  );

  if (akhir)
    return bungkusStruk(
      <div className="space-y-3 py-3">
        <style>{CSS_LEMARI}</style>
        <Kemajuan tema="struk" nomor={13} total={12} />
        <p className="border-y-2 border-dashed border-[#0F172A] py-1 text-center text-base font-black text-[#0F172A]">{"\u{1F9FE}"} TOTAL: Poin Penting Kotak Kue selesai!</p>
        <ul className="space-y-1.5">
          {POIN_PENTING.map((p, i) => (
            <li key={p} className="flex items-start gap-2 border-b border-dashed border-[#64748B] px-1 pb-1.5 text-sm font-bold text-[#0F172A]">
              <span className="shrink-0 font-black text-[#B45309]">{String(i + 1).padStart(2, "0")}.</span>
              {p}
            </li>
          ))}
        </ul>
        <p className="border-2 border-dashed border-[#B45309] bg-[#FEF3C7] px-3 py-2 text-center text-sm font-black text-[#78350F]">
          {"\u{1F370}"} {JEMBATAN}
        </p>
        <div className="flex justify-center">
          <button type="button" className={TOMBOL_UTAMA} onClick={selesaiTahap}>
            {teksAkhir}
          </button>
        </div>
      </div>,
    );
  if (!so || !ls) return null;

  const terakhirSemua = s === soal.length - 1 && l === so.langkah.length - 1;
  const total = soal.reduce((n, x) => n + x.langkah.length, 0);
  const nomor = soal.slice(0, s).reduce((n, x) => n + x.langkah.length, 0) + l + 1;
  const kepala =
    tema === "etalase" ? "rounded-xl border-4 border-[#F9A8D4] bg-[#FFF1F2]" : tema === "kertas" ? "rounded-md border-2 border-dashed border-[#1C01A5] bg-white" : "border-y-2 border-dashed border-[#0F172A] bg-transparent";
  const warnaKepala = tema === "etalase" ? "text-[#BE185D]" : tema === "kertas" ? "text-[#1C01A5]" : "text-[#B45309]";
  const papan = tema === "etalase" ? "rounded-2xl border-4 border-[#7DD3FC]" : tema === "kertas" ? "rounded-md border-2 border-[#1C01A5]" : "border-2 border-dashed border-[#0F172A]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
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
        <LangkahEtalase key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "struk") return bungkusStruk(isi);
  return tema === "etalase" ? <div className="rounded-3xl border-[8px] border-[#7DD3FC] bg-[#7DD3FC] shadow-[0_6px_0_rgba(3,105,161,0.35)]">{isi}</div> : <div className="rounded-xl border-2 border-[#1C01A5]">{isi}</div>;
}
