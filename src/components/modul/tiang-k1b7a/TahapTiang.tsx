"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahTiang } from "./LangkahTiang";
import { JEMBATAN, JEMBATAN_SUARA, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 7 Sub-Bab A: dua belas tugas lanjutan Misi Rumah Pohon
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, satu tugas Klik berupa Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Bab 1 sampai Bab 6: Concrete = alas serbuk kayu di bengkel, kemajuan berupa serutan kayu yang menumpuk;
 * Pictorial = kertas cetak biru bergaris putih, kemajuan berupa anak tangga yang tergambar satu per satu;
 * Abstract = papan tulis kecil bertulisan kapur dalam bingkai kayu, kemajuan berupa lingkaran kapur yang terisi.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B (papan lantai). Tanpa skor.
 */

type Tema = "serbuk" | "cetakbiru" | "papan";
const LATAR: Record<Tema, React.CSSProperties> = {
  serbuk: {
    backgroundColor: "#E8CBA0",
    backgroundImage:
      "radial-gradient(circle at 18% 22%,#C79A5B 0 1.5px,transparent 2px),radial-gradient(circle at 62% 48%,#B7824A 0 1.5px,transparent 2px),radial-gradient(circle at 83% 80%,#D8B07A 0 2px,transparent 2.5px),radial-gradient(circle at 36% 74%,#A9733B 0 1px,transparent 1.5px),linear-gradient(180deg,#F1D9B5,#E0BE8E)",
    backgroundSize: "34px 34px,47px 41px,29px 38px,23px 27px,auto",
  },
  cetakbiru: {
    backgroundColor: "#1E40AF",
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.28) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.28) 1px,transparent 1px),linear-gradient(rgba(255,255,255,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.12) 1px,transparent 1px),linear-gradient(180deg,#1D4ED8,#1E3A8A)",
    backgroundSize: "80px 80px,80px 80px,16px 16px,16px 16px,auto",
  },
  papan: {
    backgroundColor: "#14532D",
    backgroundImage: "radial-gradient(circle at 30% 20%,rgba(255,255,255,0.08),transparent 40%),radial-gradient(circle at 75% 75%,rgba(255,255,255,0.06),transparent 45%),linear-gradient(180deg,#166534,#14532D)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "serbuk")
    return (
      <div className="mx-auto flex max-w-md items-end justify-center gap-1 rounded-xl bg-white/40 px-2 py-1.5" aria-label={`Serutan ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 20 22" className={`h-5 w-5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <path d="M 3 17 Q 3 6 11 6 Q 17 6 17 11 Q 17 15 12 15 Q 9 15 9 12" fill="none" stroke={i < nomor ? "#B45309" : i === nomor ? "#F59E0B" : "#A8A29E"} strokeWidth={i < nomor ? 3 : 2} strokeLinecap="round" opacity={i <= nomor ? 1 : 0.5} />
          </svg>
        ))}
      </div>
    );
  if (tema === "cetakbiru") {
    const lebar = 214 / total;
    return (
      <div className="mx-auto max-w-md" aria-label={`Anak tangga ${Math.min(nomor, total)} dari ${total}`}>
        <svg viewBox="0 0 240 40" className="block w-full" aria-hidden="true">
          {n.map((i) => {
            const x = 12 + (i - 1) * lebar;
            const y = 34 - (i * 28) / total;
            return <rect key={i} x={x} y={y} width={lebar} height={34 - y + 2} fill={i < nomor ? "rgba(255,255,255,0.9)" : "none"} stroke="#FFFFFF" strokeWidth={1.2} strokeDasharray={i > nomor ? "3 2" : undefined} opacity={i === nomor ? 1 : 0.9} />;
          })}
          <line x1={6} x2={234} y1={36} y2={36} stroke="#FFFFFF" strokeWidth={1.4} />
        </svg>
      </div>
    );
  }
  return (
    <div className="mx-auto flex max-w-md items-center justify-center gap-1 px-2 py-1" aria-label={`Kapur ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
          <circle cx={10} cy={10} r={7} fill={i < nomor ? "rgba(248,250,252,0.92)" : "none"} stroke="#F8FAFC" strokeWidth={i === nomor ? 2.4 : 1.4} strokeDasharray={i > nomor ? "2 2" : undefined} />
        </svg>
      ))}
    </div>
  );
}

export default function TahapTiang({
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
  const tema: Tema = rupa === "benda" ? "serbuk" : rupa === "diagram" ? "cetakbiru" : "papan";
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
        <div className="space-y-3 rounded-xl p-4" style={LATAR.papan}>
          <Kemajuan tema="papan" nomor={13} total={12} />
          <div className="rounded-2xl border-4 border-dashed border-[#F8FAFC] p-3">
            <p className="text-center text-lg font-black text-[#FEF08A]">{"\u{270F}\u{FE0F}"} Poin Penting: Misi Rumah Pohon bagian satu selesai!</p>
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
            {"\u{1F3E0}"} {JEMBATAN}
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
    tema === "serbuk"
      ? "rounded-md border-4 border-[#92400E] bg-[#FEF3C7]"
      : tema === "cetakbiru"
        ? "rounded-sm border-2 border-dashed border-white bg-[#DBEAFE]"
        : "rounded-xl border-4 border-dashed border-[#F8FAFC] bg-[#166534]";
  const papan = tema === "serbuk" ? "rounded-2xl border-4 border-[#92400E]" : tema === "cetakbiru" ? "rounded-sm border-2 border-white" : "rounded-xl border-4 border-[#F8FAFC]";
  const warnaKepala = tema === "papan" ? "text-[#FEF08A]" : tema === "cetakbiru" ? "text-[#1E3A8A]" : "text-[#92400E]";
  const warnaJudul = tema === "papan" ? "text-[#F8FAFC]" : "text-[#1C01A5]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "papan" ? "text-[#F8FAFC]/85" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
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
        <LangkahTiang key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  return tema === "papan" ? <div className="rounded-3xl border-[10px] border-[#92400E] bg-[#92400E] shadow-[0_6px_0_rgba(69,26,3,0.4)]">{isi}</div> : <div className="rounded-3xl">{isi}</div>;
}
