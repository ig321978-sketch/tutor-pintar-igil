"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahUrut } from "./LangkahUrut";
import { POIN_PENTING } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 1 Sub-Bab C: dua belas soal lanjutan Misi Gudang Loteng
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Pola visual tiap tahap berbeda:
 * Concrete = papan kayu loteng dengan kemajuan berupa tangga naik, Pictorial = kertas bergaris dengan kemajuan berupa tongkat hitung,
 * Abstract = papan tulis putih dengan kemajuan berupa penggaris. Abstract diakhiri Poin Penting. Tanpa skor.
 */

type Tema = "kayu" | "garis" | "putih";
const LATAR: Record<Tema, React.CSSProperties> = {
  kayu: { background: "repeating-linear-gradient(180deg,#C8925A 0 26px,#A9743F 26px 28px)" },
  garis: { backgroundColor: "#FFFFFF", backgroundImage: "linear-gradient(90deg,transparent 30px,#FCA5A5 30px,#FCA5A5 32px,transparent 32px),repeating-linear-gradient(180deg,transparent 0 23px,#BFDBFE 23px 24px)" },
  putih: { background: "#F8FAFC", boxShadow: "inset 0 0 0 10px #94A3B8" },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "kayu")
    return (
      <div className="mx-auto flex h-16 max-w-md items-end gap-0.5" aria-label={`Anak tangga ${nomor} dari ${total}`}>
        {n.map((i) => (
          <div key={i} className={`flex-1 rounded-t border-2 text-center text-[10px] font-black ${i < nomor ? "border-[#14532D] bg-[#22C55E] text-white" : i === nomor ? "border-[#78350F] bg-[#FFE566] text-[#78350F]" : "border-[#78350F]/50 bg-[#F5D7A1] text-[#78350F]/60"}`} style={{ height: `${18 + i * 3.6}px` }}>
            {i === nomor ? "\u{1F467}" : i}
          </div>
        ))}
      </div>
    );
  if (tema === "garis")
    return (
      <div className="mx-auto flex max-w-md overflow-hidden rounded-md border-2 border-[#1C01A5]" aria-label={`Soal ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span key={i} className={`h-6 flex-1 text-center text-[10px] font-black leading-6 ${i < nomor ? "bg-[#16A34A] text-white" : i === nomor ? "bg-[#7C3AED] text-white" : i % 2 ? "bg-[#FFE566] text-[#1C01A5]/60" : "bg-white text-[#1C01A5]/60"}`}>
            {i}
          </span>
        ))}
      </div>
    );
  return (
    <div className="relative mx-auto max-w-md" aria-label={`Soal ${nomor} dari ${total}`}>
      <div className="flex h-7 items-end rounded-sm border-2 border-[#64748B] bg-[#FDE68A] px-1">
        {n.map((i) => (
          <span key={i} className="relative flex-1 border-l border-[#64748B] text-center text-[9px] font-black text-[#334155]" style={{ height: i % 2 ? 10 : 16 }}>
            <span className="absolute -top-3 left-0.5">{i}</span>
          </span>
        ))}
      </div>
      <span className="absolute -bottom-3 text-sm text-[#DC2626] transition-all" style={{ left: `${((nomor - 0.6) / total) * 100}%` }} aria-hidden="true">
        {"\u{25B2}"}
      </span>
    </div>
  );
}

export default function TahapUrut({
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
  const tema: Tema = rupa === "benda" ? "kayu" : rupa === "diagram" ? "garis" : "putih";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING.join(" ")}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.putih}>
        <p className="text-center text-lg font-black text-[#1C01A5]">{"\u{1F3C1}"} Poin Penting: Misi Gudang Loteng selesai!</p>
        <ol className="space-y-1.5">
          {POIN_PENTING.map((p, i) => (
            <li key={p} className="flex items-start gap-2 rounded-lg border-l-8 border-[#16A34A] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5] shadow-sm">
              <span className="font-black text-[#16A34A]">{i + 1}.</span>
              {p}
            </li>
          ))}
        </ol>
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
      <div className={`rounded-2xl p-2 ${tema === "kayu" ? "border-4 border-[#78350F] bg-[#FEF3C7]" : tema === "garis" ? "border-b-4 border-[#7C3AED] bg-white/80" : "border-4 border-dashed border-[#1C01A5]/40 bg-white"}`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#7C3AED]">
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className="text-base font-black text-[#1C01A5]">{so.judul}</p>
        <p className="text-sm font-bold text-[#1C01A5]/80">{so.cerita}</p>
      </div>

      <Kemajuan tema={tema} nomor={nomor} total={total} />

      <div className="flex justify-center gap-1" role="list" aria-label="Tiga cara menjawab">
        {soal.map((x, i) => (
          <span key={x.cara} role="listitem" className={`rounded-lg border-2 px-2 py-0.5 text-xs font-black ${i === s ? "border-[#7C3AED] bg-[#7C3AED] text-white" : i < s ? "border-[#16A34A] bg-white text-[#15803D]" : "border-[#1C01A5]/25 bg-white text-[#1C01A5]/50"}`}>
            {IKON_CARA[x.cara]} {NAMA_CARA[x.cara]}
          </span>
        ))}
      </div>

      <div className="rounded-2xl border-[3px] border-[#1C01A5] bg-white/90 p-3 shadow-[6px_6px_0_rgba(28,1,165,0.25)]">
        <div className="mb-2 flex items-start gap-2">
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#7C3AED]">
              Soal {nomor} dari {total} · {IKON_METODE[ls.metode]} {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahUrut key={`${s}-${l}`} ls={ls} rupa={rupa} benih={s * 10 + l + 3} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
