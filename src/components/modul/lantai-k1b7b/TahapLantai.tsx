"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahLantai } from "./LangkahLantai";
import { PERAYAAN, PERAYAAN_SUARA, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 7 Sub-Bab B: dua belas soal lanjutan Misi Papan Lantai
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, satu soal Klik berupa Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Bab 1 sampai Bab 6 dan Sub-Bab A: Concrete = lantai papan rumah pohon bercelah, kemajuan berupa papan lantai yang terpasang;
 * Pictorial = denah di kertas berpetak, kemajuan berupa kotak denah yang diwarnai; Abstract = langit dengan bendera rumah pohon,
 * kemajuan berupa bendera di tiang yang naik satu per satu. Abstract diakhiri Poin Penting dan perayaan akhir cerita Rumah Pohon Abang
 * (papan lantai terpasang, bendera dikibarkan). Tanpa skor.
 */

type Tema = "lantai" | "denah" | "bendera";
const LATAR: Record<Tema, React.CSSProperties> = {
  lantai: {
    backgroundColor: "#92400E",
    backgroundImage:
      "repeating-linear-gradient(90deg,transparent 0 58px,#3F2306 58px 62px),repeating-linear-gradient(0deg,rgba(255,255,255,0.06) 0 3px,transparent 3px 9px),linear-gradient(180deg,#B7791F,#92400E)",
    backgroundSize: "auto,auto,auto",
  },
  denah: {
    backgroundColor: "#F7FEE7",
    backgroundImage: "linear-gradient(#A3E635 1px,transparent 1px),linear-gradient(90deg,#A3E635 1px,transparent 1px),linear-gradient(180deg,#ECFCCB,#F7FEE7)",
    backgroundSize: "22px 22px,22px 22px,auto",
  },
  bendera: {
    backgroundColor: "#1E3A8A",
    backgroundImage:
      "radial-gradient(ellipse at 20% 18%,rgba(255,255,255,0.85) 0 14px,transparent 15px),radial-gradient(ellipse at 28% 20%,rgba(255,255,255,0.85) 0 10px,transparent 11px),radial-gradient(ellipse at 78% 10%,rgba(255,255,255,0.8) 0 12px,transparent 13px),linear-gradient(180deg,#38BDF8,#1E3A8A)",
    backgroundSize: "auto",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "lantai")
    return (
      <div className="mx-auto flex max-w-md items-center justify-center gap-0.5 rounded-lg bg-[#451A03]/60 px-2 py-1.5" aria-label={`Papan lantai ${nomor} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 20 14" className={`h-4 w-5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x={1} y={1} width={18} height={12} rx={1.5} fill={i < nomor ? "#E8B979" : i === nomor ? "#FDE68A" : "#78350F"} stroke="#3F2306" strokeWidth={1.2} />
            {i < nomor ? <line x1={3} x2={17} y1={7} y2={7} stroke="#92400E" strokeWidth={0.8} /> : null}
          </svg>
        ))}
      </div>
    );
  if (tema === "denah")
    return (
      <div className="mx-auto max-w-md" aria-label={`Kotak denah ${nomor} dari ${total}`}>
        <svg viewBox="0 0 240 26" className="block w-full" aria-hidden="true">
          {n.map((i) => (
            <rect key={i} x={2 + ((i - 1) * 236) / total} y={3} width={236 / total - 2} height={20} fill={i < nomor ? "#86EFAC" : i === nomor ? "#FDE047" : "#FFFFFF"} stroke="#4D7C0F" strokeWidth={1.2} />
          ))}
        </svg>
      </div>
    );
  return (
    <div className="mx-auto max-w-md" aria-label={`Bendera ${Math.min(nomor, total)} dari ${total}`}>
      <svg viewBox="0 0 240 36" className="block w-full" aria-hidden="true">
        <line x1={0} x2={240} y1={34} y2={34} stroke="#FFFFFF" strokeWidth={1.5} />
        {n.map((i) => {
          const x = 6 + ((i - 0.5) / total) * 228;
          const naik = i < nomor;
          const y = naik ? 4 : 20;
          return (
            <g key={i}>
              <line x1={x} x2={x} y1={3} y2={34} stroke="#E5E7EB" strokeWidth={1.2} />
              <path d={`M ${x} ${y} L ${x + 9} ${y + 4} L ${x} ${y + 8} Z`} fill={naik ? ["#FACC15", "#F472B6", "#34D399", "#FB923C"][i % 4] : i === nomor ? "#FFFFFF" : "rgba(255,255,255,0.3)"} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Perayaan akhir cerita bab: rumah pohon selesai, papan lantai rapat, bendera dikibarkan. */
function Perayaan() {
  const konfeti = Array.from({ length: 20 }, (_, i) => i);
  return (
    <div className="relative overflow-hidden rounded-2xl border-4 border-[#FACC15] bg-[#14532D] p-3 text-center">
      <style>{`@keyframes lt-jatuh{0%{transform:translateY(-20px) rotate(0)}100%{transform:translateY(160px) rotate(320deg)}}@keyframes lt-kibar{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(5deg)}}`}</style>
      {konfeti.map((i) => (
        <span
          key={i}
          className="absolute top-0 block h-2.5 w-1.5 rounded-sm"
          style={{ left: `${(i * 41) % 100}%`, background: ["#FACC15", "#F472B6", "#60A5FA", "#34D399"][i % 4], animation: `lt-jatuh ${2 + (i % 5) * 0.4}s linear ${(i % 6) * 0.3}s infinite` }}
          aria-hidden="true"
        />
      ))}
      <p className="text-4xl" style={{ animation: "lt-kibar 1.6s ease-in-out infinite", transformOrigin: "50% 100%" }} aria-hidden="true">
        {"\u{1F6A9}"}
      </p>
      <div className="mx-auto my-1 h-3 max-w-[260px] rounded-sm border-2 border-[#3F2306] bg-[#E8B979]" aria-hidden="true" />
      <p className="mt-2 text-lg font-black text-[#FEF08A]">{PERAYAAN}</p>
      <p className="mt-1 text-2xl" aria-hidden="true">
        {"\u{1F333}\u{1F3E0}\u{1F6A9}\u{1F380}\u{1F389}"}
      </p>
    </div>
  );
}

export default function TahapLantai({
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
  const tema: Tema = rupa === "benda" ? "lantai" : rupa === "diagram" ? "denah" : "bendera";
  const [s, setS] = useState(0);
  const [l, setL] = useState(0);
  const [benar, setBenar] = useState(false);
  const [akhir, setAkhir] = useState(false);
  const so = soal[s];
  const ls = so?.langkah[l];

  useEffect(() => {
    if (!ls || akhir) return;
    umum.speakGuru(l === 0 ? `${NAMA_CARA[so.cara]}. ${so.cerita} ${ls.suara}` : ls.suara);
    // Hanya saat soal berganti.
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PERAYAAN_SUARA}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.bendera}>
        <Kemajuan tema="bendera" nomor={13} total={12} />
        <div className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] p-3">
          <p className="text-center text-lg font-black text-[#1E3A8A]">{"\u{1F389}"} Poin Penting: Misi Papan Lantai selesai!</p>
          <ul className="mt-2 space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#BAE6FD] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1E3A8A] text-[10px] font-black text-[#FDE68A]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <Perayaan />
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
  const kepala =
    tema === "lantai"
      ? "rounded-md border-4 border-[#3F2306] bg-[#FDE68A]"
      : tema === "denah"
        ? "rounded-none border-2 border-dashed border-[#4D7C0F] bg-white"
        : "rounded-t-3xl rounded-b-md border-4 border-white bg-[#E0F2FE]";
  const papan = tema === "lantai" ? "rounded-xl border-4 border-[#3F2306]" : tema === "denah" ? "rounded-none border-2 border-[#4D7C0F]" : "rounded-2xl border-4 border-white";
  const warnaKepala = tema === "lantai" ? "text-[#78350F]" : tema === "denah" ? "text-[#3F6212]" : "text-[#1E3A8A]";
  const cariSalah = ls.langkah.tipe === "salah";
  return (
    <div className="space-y-3 rounded-3xl p-3" style={LATAR[tema]}>
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#15803D] bg-[#DCFCE7] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#15803D]">
              Tugas {nomor} dari {total} · {cariSalah ? "\u{1F50E} Cari kesalahan · " : ""}
              {IKON_METODE[ls.metode]} {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahLantai key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
