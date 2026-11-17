"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahLapak } from "./LangkahLapak";
import { PERAYAAN, PERAYAAN_SUARA, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 5 Sub-Bab D: dua belas soal lanjutan Misi Lapak Ikan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, satu soal Klik berupa Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Bab 1 sampai Bab 4 dan Sub-Bab A sampai C: Concrete = terpal biru lapak berlubang tali, kemajuan berupa ember yang terisi air;
 * Pictorial = lintasan lomba bernomor dengan garis start dan lajur, kemajuan berupa pelari yang maju di lajur;
 * Abstract = spanduk pembukaan dengan konfeti, kemajuan berupa bendera rangkai yang berwarna.
 * Abstract diakhiri Poin Penting dan perayaan akhir cerita Akuarium Ikan Hias Abang (lapak ikan dibuka). Tanpa skor.
 */

type Tema = "terpal" | "lintasan" | "spanduk";
const LATAR: Record<Tema, React.CSSProperties> = {
  terpal: {
    backgroundColor: "#1D4ED8",
    backgroundImage:
      "radial-gradient(circle at 12px 12px,#E5E7EB 0 4px,#6B7280 4.5px 6px,transparent 6.5px),repeating-linear-gradient(45deg,rgba(255,255,255,0.07) 0 2px,transparent 2px 6px),repeating-linear-gradient(-45deg,rgba(0,0,0,0.08) 0 2px,transparent 2px 6px),linear-gradient(180deg,#2563EB,#1E40AF)",
    backgroundSize: "120px 120px,auto,auto,auto",
  },
  lintasan: {
    backgroundColor: "#C2410C",
    backgroundImage:
      "repeating-linear-gradient(180deg,transparent 0 46px,#FFFFFF 46px 49px),linear-gradient(90deg,transparent 0 18px,#FFFFFF 18px 21px,transparent 21px),linear-gradient(180deg,#EA580C,#C2410C)",
    backgroundSize: "auto,auto,auto",
  },
  spanduk: {
    backgroundColor: "#4C1D95",
    backgroundImage:
      "radial-gradient(circle at 20% 30%,#FACC15 0 2px,transparent 2.5px),radial-gradient(circle at 70% 60%,#F472B6 0 2px,transparent 2.5px),radial-gradient(circle at 45% 85%,#34D399 0 2px,transparent 2.5px),radial-gradient(circle at 85% 15%,#60A5FA 0 2px,transparent 2.5px),linear-gradient(180deg,#5B21B6,#4C1D95)",
    backgroundSize: "70px 70px,90px 80px,80px 90px,60px 75px,auto",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "terpal")
    return (
      <div className="mx-auto flex max-w-md items-end justify-center gap-1 rounded-xl bg-white/20 px-2 py-1.5" aria-label={`Ember ${nomor} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 20 22" className={`h-5 w-5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <path d="M 4 4 Q 10 -2 16 4" fill="none" stroke="#374151" strokeWidth={1.4} />
            <path d="M 2 6 L 18 6 L 15.5 21 L 4.5 21 Z" fill={i === nomor ? "#FDE68A" : "#F3F4F6"} stroke="#374151" strokeWidth={1.4} />
            {i < nomor ? <path d="M 3.3 11 L 16.7 11 L 15.5 21 L 4.5 21 Z" fill="#38BDF8" /> : null}
          </svg>
        ))}
      </div>
    );
  if (tema === "lintasan")
    return (
      <div className="mx-auto max-w-md" aria-label={`Lajur ${nomor} dari ${total}`}>
        <svg viewBox="0 0 240 30" className="block w-full" aria-hidden="true">
          <rect x={0} y={0} width={240} height={30} rx={4} fill="#EA580C" />
          <line x1={0} x2={240} y1={15} y2={15} stroke="#FFFFFF" strokeWidth={1} strokeDasharray="6 4" />
          {[0, 1, 2, 3].map((r) => (
            <rect key={r} x={10 + (r % 2) * 4} y={r * 7.5} width={4} height={7.5} fill={r % 2 ? "#111827" : "#FFFFFF"} />
          ))}
          {n.map((i) => {
            const x = 22 + ((i - 0.5) / total) * 214;
            return (
              <text key={i} x={x} y={12} textAnchor="middle" fontSize={7} fontWeight={900} fill={i < nomor ? "#FEF08A" : "#FFFFFF"}>
                {i}
              </text>
            );
          })}
          <circle cx={22 + ((Math.min(nomor, total) - 0.5) / total) * 214} cy={23} r={5} fill="#1C01A5" stroke="#FFFFFF" strokeWidth={1.5} />
        </svg>
      </div>
    );
  return (
    <div className="mx-auto max-w-md" aria-label={`Bendera ${Math.min(nomor, total)} dari ${total}`}>
      <svg viewBox="0 0 240 26" className="block w-full" aria-hidden="true">
        <path d="M 2 4 Q 120 16 238 4" fill="none" stroke="#FDE68A" strokeWidth={1.4} />
        {n.map((i) => {
          const x = 2 + ((i - 0.5) / total) * 236;
          const y = 4 + 12 * (1 - Math.pow((x - 120) / 118, 2));
          return <path key={i} d={`M ${x - 7} ${y} L ${x + 7} ${y} L ${x} ${y + 12} Z`} fill={i < nomor ? ["#FACC15", "#F472B6", "#34D399", "#60A5FA"][i % 4] : i === nomor ? "#FFFFFF" : "rgba(255,255,255,0.25)"} />;
        })}
      </svg>
    </div>
  );
}

/** Perayaan akhir cerita bab: spanduk lapak dibuka, konfeti, dan ikan. */
function Perayaan() {
  const konfeti = Array.from({ length: 20 }, (_, i) => i);
  return (
    <div className="relative overflow-hidden rounded-2xl border-4 border-[#FACC15] bg-[#1E3A8A] p-3 text-center">
      <style>{`@keyframes lp-jatuh{0%{transform:translateY(-20px) rotate(0)}100%{transform:translateY(160px) rotate(320deg)}}`}</style>
      {konfeti.map((i) => (
        <span
          key={i}
          className="absolute top-0 block h-2.5 w-1.5 rounded-sm"
          style={{ left: `${(i * 41) % 100}%`, background: ["#FACC15", "#F472B6", "#60A5FA", "#34D399"][i % 4], animation: `lp-jatuh ${2 + (i % 5) * 0.4}s linear ${(i % 6) * 0.3}s infinite` }}
          aria-hidden="true"
        />
      ))}
      <p className="mx-auto inline-block rounded-lg border-4 border-[#BE185D] bg-white px-4 py-1 text-2xl font-black tracking-widest text-[#BE185D]">BUKA</p>
      <p className="mt-2 text-lg font-black text-[#FEF08A]">{PERAYAAN}</p>
      <p className="mt-1 text-2xl" aria-hidden="true">
        {"\u{1F420}\u{1F41F}\u{1F421}\u{1F990}\u{1F380}\u{1F389}"}
      </p>
    </div>
  );
}

export default function TahapLapak({
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
  const tema: Tema = rupa === "benda" ? "terpal" : rupa === "diagram" ? "lintasan" : "spanduk";
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
          <p className="text-center text-lg font-black text-[#5B21B6]">{"\u{1F389}"} Poin Penting: Misi Lapak Ikan selesai!</p>
          <ul className="mt-2 space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#DDD6FE] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5B21B6] text-[10px] font-black text-[#FDE68A]">{i + 1}</span>
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
    tema === "terpal"
      ? "rounded-xl border-4 border-dashed border-[#E5E7EB] bg-[#DBEAFE]"
      : tema === "lintasan"
        ? "rounded-md border-x-8 border-dashed border-white bg-[#FFEDD5]"
        : "rounded-b-[2rem] rounded-t-md border-4 border-[#FACC15] bg-[#FFFBEB]";
  const papan = tema === "terpal" ? "rounded-2xl border-4 border-[#1E3A8A]" : tema === "lintasan" ? "rounded-md border-4 border-white" : "rounded-2xl border-4 border-[#F472B6]";
  const warnaKepala = tema === "terpal" ? "text-[#1E3A8A]" : tema === "lintasan" ? "text-[#9A3412]" : "text-[#5B21B6]";
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#1D4ED8] bg-[#DBEAFE] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#1D4ED8]">
              Soal {nomor} dari {total} · {cariSalah ? "\u{1F50E} Cari kesalahan · " : ""}
              {IKON_METODE[ls.metode]} {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahLapak key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
      </div>

      {benar ? (
        <div className="flex justify-center">
          <button type="button" onClick={lanjut} className={TOMBOL_UTAMA}>
            {terakhirSemua ? (poinPenting ? "LIHAT POIN PENTING ⬇️" : teksAkhir) : l < so.langkah.length - 1 ? "SOAL BERIKUTNYA ➡️" : `LANJUT: ${NAMA_CARA[soal[s + 1].cara].toUpperCase()} ➡️`}
          </button>
        </div>
      ) : null}
    </div>
  );
}
