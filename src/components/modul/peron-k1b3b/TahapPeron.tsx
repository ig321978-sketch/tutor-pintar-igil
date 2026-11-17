"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahPeron } from "./LangkahPeron";
import { POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 3 Sub-Bab B: dua belas soal lanjutan Misi Pindah Kereta
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Pola visual tiap tahap baru, berbeda dari Sub-Bab A:
 * Concrete = lantai peron dengan ubin pemandu kuning dan kemajuan berupa koper di ban berjalan, Pictorial = peta rute kereta
 * dengan kemajuan berupa stasiun di garis rute, Abstract = jendela kereta malam dengan kemajuan berupa bintang yang menyala.
 * Abstract diakhiri Poin Penting. Tanpa skor.
 */

type Tema = "ubin" | "rute" | "malam";
const LATAR: Record<Tema, React.CSSProperties> = {
  ubin: {
    backgroundColor: "#9CA3AF",
    backgroundImage:
      "linear-gradient(90deg,transparent 0 40%,#FACC15 40% 60%,transparent 60%),radial-gradient(#CA8A04 2.5px,transparent 3px)",
    backgroundSize: "100% 100%, 12px 12px",
    backgroundPosition: "0 0, 0 0",
  },
  rute: {
    backgroundColor: "#F8FAFC",
    backgroundImage:
      "repeating-linear-gradient(35deg,transparent 0 46px,rgba(239,68,68,0.35) 46px 50px),repeating-linear-gradient(-20deg,transparent 0 70px,rgba(37,99,235,0.3) 70px 74px),repeating-linear-gradient(80deg,transparent 0 90px,rgba(22,163,74,0.3) 90px 94px)",
  },
  malam: { background: "radial-gradient(circle at 85% 12%,#FEF3C7 0 18px,transparent 19px),radial-gradient(#E0E7FF 1px,transparent 1.5px) 0 0/22px 22px,linear-gradient(180deg,#0B1437,#312E81)" },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "ubin")
    return (
      <div className="mx-auto flex max-w-md items-end justify-between rounded-xl border-2 border-[#334155] bg-[#475569] px-2 pb-1 pt-2" style={{ backgroundImage: "repeating-linear-gradient(90deg,#334155 0 10px,#475569 10px 20px)" }} aria-label={`Koper ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span key={i} className={`leading-none ${i < nomor ? "text-xl" : i === nomor ? "animate-bounce text-lg" : "text-sm opacity-30 grayscale"}`} aria-hidden="true">
            {"🧳"}
          </span>
        ))}
      </div>
    );
  if (tema === "rute")
    return (
      <div className="relative mx-auto flex max-w-md items-center justify-between px-1 py-2" aria-label={`Stasiun ${nomor} dari ${total}`}>
        <span className="absolute left-2 right-2 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#DC2626]" />
        {n.map((i) => (
          <span
            key={i}
            className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-[3px] text-[10px] font-black ${i < nomor ? "border-[#DC2626] bg-[#DC2626] text-white" : i === nomor ? "scale-125 border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]" : "border-[#DC2626] bg-white text-[#DC2626]"}`}
          >
            {i}
          </span>
        ))}
      </div>
    );
  return (
    <div className="flex flex-wrap justify-center gap-1" aria-label={`Bintang ${nomor} dari ${total}`}>
      {n.map((i) => (
        <span key={i} className={`text-lg leading-none ${i < nomor ? "drop-shadow-[0_0_6px_#FDE047]" : i === nomor ? "animate-pulse" : "opacity-25 grayscale"}`} aria-hidden="true">
          {"⭐"}
        </span>
      ))}
    </div>
  );
}

export default function TahapPeron({
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
  const tema: Tema = rupa === "benda" ? "ubin" : rupa === "diagram" ? "rute" : "malam";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} Semua sudah duduk di kereta lanjutan. Hebat!`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.malam}>
        <div className="rounded-[2rem] border-[6px] border-[#94A3B8] bg-[#1E1B4B]/80 p-3">
          <p className="text-center text-lg font-black text-[#FEF3C7]">{"\u{1F319}"} Poin Penting: Misi Pindah Kereta bagian ini selesai!</p>
          <ul className="mt-2 space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-xl bg-white/95 px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FDE047] text-[10px] font-black text-[#312E81]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
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
  return (
    <div className="space-y-3 rounded-3xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div
        className={`p-2 ${tema === "ubin" ? "rounded-xl border-4 border-[#FACC15] bg-[#F8FAFC]" : tema === "rute" ? "rounded-2xl border-[3px] border-[#DC2626] bg-white" : "rounded-[2rem] border-[6px] border-[#94A3B8] bg-[#1E1B4B] text-[#FEF3C7]"}`}
      >
        <p className={`text-xs font-black uppercase tracking-wide ${tema === "malam" ? "text-[#FDE047]" : "text-[#1D4ED8]"}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${tema === "malam" ? "text-[#FEF3C7]" : "text-[#1C01A5]"}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "malam" ? "text-[#E0E7FF]" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
      </div>

      <Kemajuan tema={tema} nomor={nomor} total={total} />

      <div className="flex justify-center gap-1.5">
        {soal.map((x, i) => (
          <span key={x.cara} className={`rounded-full px-2.5 py-0.5 text-xs font-black ${i === s ? "bg-[#FACC15] text-[#1C01A5]" : i < s ? "bg-[#DCFCE7] text-[#15803D]" : "bg-white/80 text-[#1C01A5]/50"}`}>
            {IKON_CARA[x.cara]} {NAMA_CARA[x.cara]}
          </span>
        ))}
      </div>

      <div className={`border-4 bg-white/95 p-3 ${tema === "ubin" ? "rounded-xl border-[#FACC15]" : tema === "rute" ? "rounded-2xl border-[#DC2626]" : "rounded-[2rem] border-[#94A3B8]"}`}>
        <div className="mb-2 flex items-start gap-2">
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#1D4ED8] bg-[#DBEAFE] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#1D4ED8]">
              Soal {nomor} dari {total} · {IKON_METODE[ls.metode]} {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahPeron key={`${s}-${l}`} ls={ls} rupa={rupa} benda={so.benda} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
