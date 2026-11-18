"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahGudang } from "./LangkahGudang";
import { PENUTUP_BAB, PERAYAAN, PERAYAAN_SUARA, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 3 Sub-Bab C: dua belas tugas lanjutan Misi Gudang Mainan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, satu atau dua tugas Klik berupa Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8, Kelas 2 Bab 1 dan 2, dan Sub-Bab A dan B bab ini:
 * Concrete = papan kayu rak gudang dengan lereng, kemajuan berupa deret kotak kardus yang terisi;
 * Pictorial = papan model gelap berkisi garis putih, kemajuan berupa deret bangun datar (segitiga, persegi, lingkaran) yang terisi;
 * Abstract = spanduk Taman Dibuka hijau dengan konfeti dan bendera (perayaan akhir cerita bab), kemajuan berupa bendera yang menyala.
 * Abstract diakhiri perayaan dan Poin Penting, lalu penutup bab. Tanpa skor.
 */

type Tema = "rak" | "papan" | "spanduk";
const LATAR: Record<Tema, React.CSSProperties> = {
  rak: {
    backgroundColor: "#FEF3C7",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(146,64,14,0.2) 0 3px,transparent 3px 38px),linear-gradient(90deg,rgba(146,64,14,0.12) 0 3px,transparent 3px)",
    backgroundSize: "auto,76px 100%",
  },
  papan: {
    backgroundColor: "#1E293B",
    backgroundImage: "linear-gradient(rgba(248,250,252,0.16) 1px,transparent 1px),linear-gradient(90deg,rgba(248,250,252,0.16) 1px,transparent 1px)",
    backgroundSize: "24px 24px",
  },
  spanduk: {
    backgroundColor: "#15803D",
    backgroundImage:
      "radial-gradient(circle at 14% 20%,#FDE047 0 3px,transparent 4px),radial-gradient(circle at 80% 14%,#F9A8D4 0 3px,transparent 4px),radial-gradient(circle at 42% 74%,#FFFFFF 0 3px,transparent 4px),radial-gradient(circle at 90% 82%,#7DD3FC 0 3px,transparent 4px),linear-gradient(180deg,#22C55E,#166534)",
    backgroundSize: "90px 90px,110px 110px,100px 100px,120px 120px,auto",
  },
};

const WARNA_BENDERA = ["#F87171", "#FACC15", "#60A5FA", "#F472B6", "#FB923C", "#C084FC"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "rak")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 rounded-xl bg-white/70 px-2 py-1.5" aria-label={`Kardus ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`block h-4 w-5 border-2 ${i === nomor ? "animate-pulse" : ""}`}
            style={{ background: i < nomor ? "#D6A15E" : "transparent", borderColor: i <= nomor ? "#92400E" : "rgba(146,64,14,0.4)", borderStyle: i > nomor ? "dashed" : "solid", borderRadius: 2 }}
          />
        ))}
      </div>
    );
  if (tema === "papan")
    return (
      <div className="mx-auto flex max-w-md items-center justify-center gap-1.5 px-2 py-1" aria-label={`Bentuk ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => {
          const isi = i < nomor ? "#F8FAFC" : "none";
          const garis = { stroke: "#F8FAFC", strokeWidth: i === nomor ? 2.8 : 1.4, strokeDasharray: i > nomor ? "2 2" : undefined, strokeLinejoin: "round" as const };
          return (
            <svg key={i} viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
              {i % 3 === 0 ? <polygon points="10,2 18,17 2,17" fill={isi} {...garis} /> : i % 3 === 1 ? <rect x={3} y={3} width={14} height={14} fill={isi} {...garis} /> : <circle cx={10} cy={10} r={7} fill={isi} {...garis} />}
            </svg>
          );
        })}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-start justify-center gap-1 px-2 py-1" aria-label={`Bendera ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <svg key={i} viewBox="0 0 16 24" className={`h-6 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
          <line x1={2} y1={1} x2={2} y2={23} stroke="#FEF08A" strokeWidth={1.6} />
          <polygon points="2,2 15,7 2,13" fill={i < nomor ? WARNA_BENDERA[i % WARNA_BENDERA.length] : "none"} stroke="#FEF08A" strokeWidth={i === nomor ? 2.2 : 1.2} strokeDasharray={i > nomor ? "2 2" : undefined} />
        </svg>
      ))}
    </div>
  );
}

export default function TahapGudang({
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
  const tema: Tema = rupa === "benda" ? "rak" : rupa === "diagram" ? "papan" : "spanduk";
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
      umum.speakGuru(`${PERAYAAN_SUARA} Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_BAB}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-3xl border-[10px] border-[#CA8A04] bg-[#CA8A04] p-0 shadow-[0_6px_0_rgba(113,63,18,0.4)]">
        <div className="space-y-3 rounded-xl p-4" style={LATAR.spanduk}>
          <Kemajuan tema="spanduk" nomor={13} total={12} />
          <div className="rounded-2xl border-4 border-dashed border-[#FDE047] bg-[#14532D]/75 p-3 text-center">
            <p className="text-2xl" aria-hidden="true">
              {"\u{1F389}"} {"\u{1F38A}"} {"\u{1F389}"}
            </p>
            <p className="text-xl font-black tracking-wide text-[#FDE047]">TAMAN DIBUKA!</p>
            <p className="mt-1 text-sm font-bold text-white">{PERAYAAN}</p>
          </div>
          <div className="rounded-2xl border-4 border-dashed border-[#F8FAFC] bg-[#052E16]/80 p-3">
            <p className="text-center text-lg font-black text-[#FEF08A]">{"\u{270F}\u{FE0F}"} Poin Penting: Misi Gudang Mainan selesai!</p>
            <ul className="mt-2 space-y-1.5">
              {POIN_PENTING.map((p, i) => (
                <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#F8FAFC]/70 bg-[#166534] px-3 py-2 text-sm font-bold text-[#F8FAFC]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#F8FAFC] text-[10px] font-black text-[#FEF08A]">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F382}"} {PENUTUP_BAB}
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
    tema === "rak"
      ? "rounded-md border-4 border-[#92400E] bg-[#FFFBEB]"
      : tema === "papan"
        ? "rounded-md border-2 border-dashed border-[#F8FAFC] bg-[#0F172A]/85"
        : "rounded-xl border-4 border-dashed border-[#FDE047] bg-[#14532D]/80";
  const papan = tema === "rak" ? "rounded-md border-4 border-[#92400E]" : tema === "papan" ? "rounded-md border-2 border-[#F8FAFC]" : "rounded-xl border-4 border-[#FDE047]";
  const warnaKepala = tema === "spanduk" ? "text-[#FDE047]" : tema === "papan" ? "text-[#FDE68A]" : "text-[#92400E]";
  const warnaJudul = tema === "rak" ? "text-[#1C01A5]" : "text-white";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "rak" ? "text-[#1C01A5]/80" : "text-white/85"}`}>{so.cerita}</p>
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
        <LangkahGudang key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
      </div>

      {benar ? (
        <div className="flex justify-center">
          <button type="button" onClick={lanjut} className={TOMBOL_UTAMA}>
            {terakhirSemua ? (poinPenting ? "LIHAT PERAYAAN ⬇️" : teksAkhir) : l < so.langkah.length - 1 ? "TUGAS BERIKUTNYA ➡️" : `LANJUT: ${NAMA_CARA[soal[s + 1].cara].toUpperCase()} ➡️`}
          </button>
        </div>
      ) : null}
    </div>
  );
  return tema === "spanduk" ? <div className="rounded-3xl border-[10px] border-[#CA8A04] bg-[#CA8A04] shadow-[0_6px_0_rgba(113,63,18,0.4)]">{isi}</div> : <div className="rounded-3xl">{isi}</div>;
}
