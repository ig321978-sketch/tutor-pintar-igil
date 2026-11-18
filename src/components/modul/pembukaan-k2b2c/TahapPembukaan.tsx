"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahPembukaan } from "./LangkahPembukaan";
import { PENUTUP_BAB, PERAYAAN, PERAYAAN_SUARA, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 2 Sub-Bab C: dua belas tugas lanjutan Misi Meja Pesanan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, satu tugas Klik berupa Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1, Kelas 2 Bab 1, dan Sub-Bab A dan B: Concrete = papan meja kayu bergaris serat dengan kertas pesanan berklip sebagai kepala,
 * kemajuan berupa deret pensil yang terisi warna; Pictorial = papan tulis hijau tua berbingkai kapur, kemajuan berupa deret bulatan kapur yang terisi;
 * Abstract = spanduk merah "Koperasi Sekolah Dibuka" berbingkai emas (perayaan akhir cerita bab), kemajuan berupa deret bintang yang menyala.
 * Abstract diakhiri perayaan spanduk dan konfeti, Poin Penting, lalu penutup bab. Tanpa skor.
 */

type Tema = "meja" | "papan" | "spanduk";
const LATAR: Record<Tema, React.CSSProperties> = {
  meja: {
    backgroundColor: "#E9C58F",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(120,53,15,0.16) 0 2px,transparent 2px 30px),repeating-linear-gradient(90deg,rgba(120,53,15,0.07) 0 1px,transparent 1px 9px)",
  },
  papan: {
    backgroundColor: "#14532D",
    backgroundImage: "radial-gradient(circle at 20% 25%,rgba(255,255,255,0.08) 0 40px,transparent 41px),radial-gradient(circle at 80% 70%,rgba(255,255,255,0.06) 0 50px,transparent 51px),linear-gradient(180deg,#166534,#14532D)",
  },
  spanduk: {
    backgroundColor: "#991B1B",
    backgroundImage:
      "radial-gradient(circle at 10% 14%,#FDE047 0 3px,transparent 4px),radial-gradient(circle at 86% 10%,#FFFFFF 0 3px,transparent 4px),radial-gradient(circle at 36% 80%,#FDBA74 0 3px,transparent 4px),radial-gradient(circle at 92% 84%,#FDE047 0 3px,transparent 4px),linear-gradient(180deg,#B91C1C,#7F1D1D)",
    backgroundSize: "90px 90px,110px 110px,100px 100px,120px 120px,auto",
  },
};

const WARNA_PENSIL = ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#F472B6", "#A78BFA"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "meja")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 rounded-xl bg-white/70 px-2 py-1.5" aria-label={`Pensil ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 12 28" className={`h-6 w-3 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x="2" y="6" width="8" height="17" fill={i < nomor ? WARNA_PENSIL[i % WARNA_PENSIL.length] : "none"} stroke="#78350F" strokeWidth={i === nomor ? 1.8 : 1.1} strokeDasharray={i > nomor ? "2 1.5" : undefined} />
            <polygon points="2,23 10,23 6,28" fill={i <= nomor ? "#FDE68A" : "none"} stroke="#78350F" strokeWidth="1" />
            <rect x="2" y="2" width="8" height="4" fill={i < nomor ? "#FBCFE8" : "none"} stroke="#78350F" strokeWidth="1" />
          </svg>
        ))}
      </div>
    );
  if (tema === "papan")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1.5 px-2 py-1" aria-label={`Kapur ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
            <circle cx="8" cy="8" r="6" fill={i < nomor ? "#F8FAFC" : "none"} stroke="#F8FAFC" strokeWidth={i === nomor ? 2.6 : 1.3} strokeDasharray={i > nomor ? "2 2" : undefined} />
          </svg>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Bintang ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`text-base leading-none ${i === nomor ? "animate-pulse" : ""}`} style={{ color: i < nomor ? "#FDE047" : "transparent", WebkitTextStroke: i <= nomor ? "1px #FDE047" : "1px rgba(253,224,71,0.45)" }}>
          {"★"}
        </span>
      ))}
    </div>
  );
}

export default function TahapPembukaan({
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
  const tema: Tema = rupa === "benda" ? "meja" : rupa === "diagram" ? "papan" : "spanduk";
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
      <div className="rounded-3xl border-[10px] border-[#FACC15] bg-[#FACC15] p-0 shadow-[0_6px_0_rgba(113,63,18,0.4)]">
        <div className="space-y-3 rounded-xl p-4" style={LATAR.spanduk}>
          <Kemajuan tema="spanduk" nomor={13} total={12} />
          <div className="rounded-2xl border-4 border-dashed border-[#FDE047] bg-[#7F1D1D]/80 p-3 text-center">
            <p className="text-2xl" aria-hidden="true">
              {"\u{1F389}"} {"\u{1F38A}"} {"\u{1F389}"}
            </p>
            <p className="text-xl font-black tracking-wide text-[#FDE047]">KOPERASI SEKOLAH DIBUKA!</p>
            <p className="mt-1 text-sm font-bold text-white">{PERAYAAN}</p>
          </div>
          <div className="rounded-2xl border-4 border-dashed border-[#FEF3C7] bg-[#450A0A]/70 p-3">
            <p className="text-center text-lg font-black text-[#FEF08A]">{"\u{270F}\u{FE0F}"} Poin Penting: Misi Meja Pesanan selesai!</p>
            <ul className="mt-2 space-y-1.5">
              {POIN_PENTING.map((p, i) => (
                <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#FEF3C7]/70 bg-[#991B1B] px-3 py-2 text-sm font-bold text-[#FEF3C7]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#FEF3C7] text-[10px] font-black text-[#FEF08A]">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F3C5}"} {PENUTUP_BAB}
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
    tema === "meja"
      ? "rounded-md border-2 border-[#1D4ED8] bg-white shadow-[0_3px_0_rgba(120,53,15,0.35)]"
      : tema === "papan"
        ? "rounded-md border-2 border-dashed border-[#F8FAFC] bg-[#052E16]/70"
        : "rounded-xl border-4 border-dashed border-[#FDE047] bg-[#7F1D1D]/80";
  const papan = tema === "meja" ? "rounded-lg border-4 border-[#92400E]" : tema === "papan" ? "rounded-md border-4 border-[#F8FAFC]" : "rounded-xl border-4 border-[#FDE047]";
  const warnaKepala = tema === "spanduk" ? "text-[#FDE047]" : tema === "papan" ? "text-[#BBF7D0]" : "text-[#1D4ED8]";
  const warnaJudul = tema === "meja" ? "text-[#1C01A5]" : "text-white";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`relative p-2 ${kepala}`}>
        {tema === "meja" ? <span className="absolute -top-2 left-4 block h-4 w-8 rounded-sm border-2 border-[#64748B] bg-[#CBD5E1]" aria-hidden="true" /> : null}
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "meja" ? "text-[#1C01A5]/80" : "text-white/85"}`}>{so.cerita}</p>
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
        <LangkahPembukaan key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  return tema === "spanduk" ? <div className="rounded-3xl border-[10px] border-[#FACC15] bg-[#FACC15] shadow-[0_6px_0_rgba(113,63,18,0.4)]">{isi}</div> : <div className="rounded-3xl">{isi}</div>;
}
