"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahRak } from "./LangkahRak";
import { PENUTUP_A, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 4 Sub-Bab A: dua belas tugas lanjutan Misi Rak Pameran
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8 dan Kelas 2 Bab 1 sampai 3: Concrete = stan pameran beratap kain merah putih berdinding papan kayu, kemajuan berupa untaian
 * bendera kain yang diwarnai; Pictorial = lembar denah biru tua bergaris putih, kemajuan berupa deret petak denah yang terisi lingkaran; Abstract = dinding
 * abu-abu berlubang paku tempat kartu kata disematkan, kemajuan berupa kartu kecil miring. Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B. Tanpa skor.
 */

type Tema = "stan" | "denah" | "dinding";
const LATAR: Record<Tema, React.CSSProperties> = {
  stan: {
    backgroundColor: "#FFF1DC",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(146,64,14,0.07) 0 2px,transparent 2px 26px)",
  },
  denah: {
    backgroundColor: "#1E3A8A",
    backgroundImage: "linear-gradient(rgba(255,255,255,0.16) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.16) 1px,transparent 1px)",
    backgroundSize: "28px 28px",
  },
  dinding: {
    backgroundColor: "#334155",
    backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.18) 0 2px,transparent 3px)",
    backgroundSize: "22px 22px",
  },
};
const WARNA_BENDERA = ["#F87171", "#FACC15", "#60A5FA", "#4ADE80"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "stan")
    return (
      <div className="mx-auto max-w-md" aria-label={`Bendera ${Math.min(nomor, total)} dari ${total}`}>
        <div className="mx-2 h-0.5 rounded-full bg-[#92400E]" aria-hidden="true" />
        <div className="flex flex-wrap items-start justify-center gap-0.5 px-1">
          {n.map((i) => (
            <svg key={i} viewBox="0 0 16 20" className={`h-5 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
              <polygon points="1,0 15,0 8,18" fill={i < nomor ? WARNA_BENDERA[i % 4] : "transparent"} stroke="#92400E" strokeWidth={i <= nomor ? 1.6 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} strokeLinejoin="round" />
            </svg>
          ))}
        </div>
      </div>
    );
  if (tema === "denah")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Petak denah ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 14 14" className="h-3.5 w-3.5" aria-hidden="true">
            <rect x="1" y="1" width="12" height="12" fill="none" stroke="#BFDBFE" strokeWidth={i === nomor ? 2 : 1.2} strokeDasharray={i > nomor ? "2 2" : undefined} />
            {i < nomor ? <circle cx="7" cy="7" r="3.4" fill="#FDE047" /> : null}
          </svg>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1.5 px-2 py-1" aria-label={`Kartu ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`block h-4 w-3 rounded-[2px] ${i === nomor ? "animate-pulse" : ""}`}
          style={{ transform: `rotate(${((i * 37) % 21) - 10}deg)`, background: i < nomor ? "#F8FAFC" : "transparent", border: `1.5px ${i > nomor ? "dashed" : "solid"} ${i <= nomor ? "#F8FAFC" : "rgba(248,250,252,0.45)"}` }}
        />
      ))}
    </div>
  );
}

export default function TahapRak({
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
  const tema: Tema = rupa === "benda" ? "stan" : rupa === "diagram" ? "denah" : "dinding";
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
      <div className="rounded-3xl border-[10px] border-[#0F172A] bg-[#0F172A] shadow-[0_6px_0_rgba(15,23,42,0.4)]">
        <div className="space-y-3 rounded-xl p-4" style={LATAR.dinding}>
          <p className="text-center text-lg font-black text-[#FDE68A]">{"\u{1F4CC}"} Poin Penting: Posisi Benda</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-sm font-bold text-[#1E293B]" style={{ transform: `rotate(${i % 2 === 0 ? -0.6 : 0.6}deg)` }}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DC2626] text-[10px] font-black text-white">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F4FF}"} {PENUTUP_A}
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
  const kepala = tema === "stan" ? "rounded-xl border-4 border-[#B91C1C] bg-[#FFFBEB]" : tema === "denah" ? "rounded-md border-2 border-[#BFDBFE] bg-white" : "rounded-md border-2 border-dashed border-[#F8FAFC]/80 bg-[#1E293B]";
  const papan = tema === "stan" ? "rounded-2xl border-4 border-[#B45309]" : tema === "denah" ? "rounded-md border-2 border-[#BFDBFE]" : "rounded-md border-2 border-[#F8FAFC]/80";
  const warnaKepala = tema === "dinding" ? "text-[#FDE047]" : tema === "denah" ? "text-[#1E3A8A]" : "text-[#B91C1C]";
  const warnaJudul = tema === "dinding" ? "text-white" : "text-[#1C01A5]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "stan" ? <div className="-mx-3 -mt-3 h-5 rounded-t-xl" style={{ background: "repeating-linear-gradient(90deg,#F87171 0 22px,#FFFFFF 22px 44px)", borderBottom: "3px solid #B91C1C" }} aria-hidden="true" /> : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "dinding" ? "text-white/85" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
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
        <LangkahRak key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  return tema === "dinding" ? <div className="rounded-3xl border-[10px] border-[#0F172A] bg-[#0F172A] shadow-[0_6px_0_rgba(15,23,42,0.4)]">{isi}</div> : <div className="rounded-3xl">{isi}</div>;
}
