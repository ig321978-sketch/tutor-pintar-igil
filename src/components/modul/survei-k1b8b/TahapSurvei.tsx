"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahSurvei } from "./LangkahSurvei";
import { PERAYAAN, PERAYAAN_SUARA, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 8 Sub-Bab B: dua belas soal lanjutan Misi Papan Survei
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, satu soal Klik berupa Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Bab 1 sampai Bab 7 dan Sub-Bab A: Concrete = sore di jalan kampung di bawah spanduk, kemajuan berupa antrean anak yang mendapat stiker bintang;
 * Pictorial = kertas diagram putih bergaris, kemajuan berupa deret lingkaran polos yang diisi; Abstract = spanduk Perpustakaan Keliling berumbul-umbul,
 * kemajuan berupa bendera kecil yang naik di tali. Abstract diakhiri Poin Penting dan perayaan akhir cerita bab (spanduk dikibarkan, konfeti). Tanpa skor.
 */

type Tema = "sore" | "kertas" | "spanduk";
const LATAR: Record<Tema, React.CSSProperties> = {
  sore: {
    backgroundColor: "#FDBA74",
    backgroundImage: "linear-gradient(180deg,#FDE68A 0%,#FDBA74 55%,#A8A29E 55% 58%,#D6D3D1 58%)",
  },
  kertas: {
    backgroundColor: "#FFFFFF",
    backgroundImage: "linear-gradient(#BFDBFE 1px,transparent 1px),linear-gradient(90deg,#BFDBFE 1px,transparent 1px)",
    backgroundSize: "18px 18px,18px 18px",
  },
  spanduk: {
    backgroundColor: "#0F766E",
    backgroundImage: "radial-gradient(circle at 15% 20%,rgba(255,255,255,0.18) 0 18px,transparent 19px),radial-gradient(circle at 85% 70%,rgba(255,255,255,0.14) 0 24px,transparent 25px),linear-gradient(180deg,#14B8A6,#0F766E)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "sore")
    return (
      <div className="mx-auto flex max-w-md items-end justify-center gap-0.5 rounded-lg bg-[#78350F]/25 px-2 py-1" aria-label={`Anak ${Math.min(nomor, total)} dari ${total} di antrean`}>
        {n.map((i) => (
          <span key={i} className={`flex flex-col items-center text-[13px] leading-none ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <span className="text-[9px]">{i < nomor ? "\u{1F31F}" : " "}</span>
            <span style={{ opacity: i <= nomor ? 1 : 0.45 }}>{"\u{1F9D2}"}</span>
          </span>
        ))}
      </div>
    );
  if (tema === "kertas")
    return (
      <div className="mx-auto max-w-md" aria-label={`Lingkaran ${Math.min(nomor, total)} dari ${total}`}>
        <svg viewBox="0 0 240 26" className="block w-full" aria-hidden="true">
          {n.map((i) => (
            <circle key={i} cx={10 + ((i - 1) * 220) / (total - 1)} cy={13} r={8} fill={i < nomor ? "#93C5FD" : i === nomor ? "#FDE047" : "#FFFFFF"} stroke="#1D4ED8" strokeWidth={1.4} />
          ))}
        </svg>
      </div>
    );
  return (
    <div className="mx-auto max-w-md" aria-label={`Bendera ${Math.min(nomor, total)} dari ${total}`}>
      <svg viewBox="0 0 240 30" className="block w-full" aria-hidden="true">
        <path d="M2 6 Q120 22 238 6" fill="none" stroke="#FEF3C7" strokeWidth={1.5} />
        {n.map((i) => {
          const t = (i - 0.5) / total;
          const x = 2 + t * 236;
          const y = 6 + 32 * t * (1 - t) + (i < nomor ? 0 : 3);
          return <path key={i} d={`M ${x - 7} ${y} L ${x + 7} ${y} L ${x} ${y + (i < nomor ? 13 : 8)} Z`} fill={i < nomor ? ["#FACC15", "#F472B6", "#34D399", "#FB923C"][i % 4] : i === nomor ? "#FFFFFF" : "rgba(255,255,255,0.3)"} />;
        })}
      </svg>
    </div>
  );
}

/** Perayaan akhir cerita bab: mobil pustaka berspanduk, konfeti, dan umbul-umbul. */
function Perayaan() {
  const konfeti = Array.from({ length: 20 }, (_, i) => i);
  return (
    <div className="relative overflow-hidden rounded-2xl border-4 border-[#FACC15] bg-[#134E4A] p-3 text-center">
      <style>{`@keyframes sv-jatuh{0%{transform:translateY(-20px) rotate(0)}100%{transform:translateY(160px) rotate(320deg)}}@keyframes sv-jalan{0%{transform:translateX(-40px)}100%{transform:translateX(40px)}}`}</style>
      {konfeti.map((i) => (
        <span
          key={i}
          className="absolute top-0 block h-2.5 w-1.5 rounded-sm"
          style={{ left: `${(i * 41) % 100}%`, background: ["#FACC15", "#F472B6", "#60A5FA", "#34D399"][i % 4], animation: `sv-jatuh ${2 + (i % 5) * 0.4}s linear ${(i % 6) * 0.3}s infinite` }}
          aria-hidden="true"
        />
      ))}
      <div className="mx-auto max-w-[260px] rounded-md border-2 border-[#92400E] bg-[#FACC15] px-2 py-1 text-sm font-black text-[#1C01A5]" aria-hidden="true">
        Perpustakaan Keliling
      </div>
      <p className="mt-1 text-4xl" style={{ animation: "sv-jalan 2.4s ease-in-out infinite alternate" }} aria-hidden="true">
        {"\u{1F69A}"}
      </p>
      <p className="mt-2 text-lg font-black text-[#FEF08A]">{PERAYAAN}</p>
      <p className="mt-1 text-2xl" aria-hidden="true">
        {"\u{1F996}\u{1F916}\u{1F9DA}\u{1F3AA}\u{1F389}"}
      </p>
    </div>
  );
}

export default function TahapSurvei({
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
  const tema: Tema = rupa === "benda" ? "sore" : rupa === "diagram" ? "kertas" : "spanduk";
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
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.spanduk}>
        <Kemajuan tema="spanduk" nomor={13} total={12} />
        <div className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] p-3">
          <p className="text-center text-lg font-black text-[#134E4A]">{"\u{1F389}"} Poin Penting: Misi Papan Survei selesai!</p>
          <ul className="mt-2 space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#99F6E4] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0F766E] text-[10px] font-black text-[#FEF08A]">{i + 1}</span>
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
    tema === "sore"
      ? "rounded-xl border-4 border-[#92400E] bg-[#FEF3C7]"
      : tema === "kertas"
        ? "rounded-none border-2 border-dashed border-[#1D4ED8] bg-white"
        : "rounded-md border-4 border-[#92400E] bg-[#FACC15]";
  const papan = tema === "sore" ? "rounded-xl border-4 border-[#92400E]" : tema === "kertas" ? "rounded-none border-2 border-[#1D4ED8]" : "rounded-2xl border-4 border-[#FEF3C7]";
  const warnaKepala = tema === "sore" ? "text-[#78350F]" : tema === "kertas" ? "text-[#1D4ED8]" : "text-[#78350F]";
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
        <LangkahSurvei key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
