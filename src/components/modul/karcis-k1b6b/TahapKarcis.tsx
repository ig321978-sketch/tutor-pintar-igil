"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahKarcis } from "./LangkahKarcis";
import { POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 6 Sub-Bab B: dua belas soal lanjutan Misi Loket Karcis
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, satu soal Klik berupa Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Bab 1 sampai Bab 5 dan Sub-Bab lain Bab 6: Concrete = tikar pandan anyaman, kepala berupa karcis bergigi, kemajuan berupa
 * rangkaian karcis yang disobek satu per satu; Pictorial = denah arena pasar malam bergaris kisi, kepala berupa papan petunjuk panah,
 * kemajuan berupa jalan setapak dengan pin lokasi; Abstract = layar kasir LCD hijau, kepala berupa struk kasir, kemajuan berupa angka nomor
 * dan batang LCD. Abstract diakhiri Poin Penting (cerita bab berlanjut ke Sub-Bab C). Tanpa skor.
 */

type Tema = "tikar" | "denah" | "kasir";
const LATAR: Record<Tema, React.CSSProperties> = {
  tikar: {
    backgroundColor: "#D9B877",
    backgroundImage:
      "repeating-linear-gradient(0deg,rgba(120,72,16,0.22) 0 2px,transparent 2px 9px),repeating-linear-gradient(90deg,rgba(255,235,180,0.30) 0 2px,transparent 2px 9px),repeating-linear-gradient(45deg,rgba(120,72,16,0.10) 0 3px,transparent 3px 12px)",
  },
  denah: {
    backgroundColor: "#E0F2FE",
    backgroundImage:
      "linear-gradient(rgba(14,116,144,0.28) 1px,transparent 1px),linear-gradient(90deg,rgba(14,116,144,0.28) 1px,transparent 1px),linear-gradient(rgba(14,116,144,0.10) 1px,transparent 1px),linear-gradient(90deg,rgba(14,116,144,0.10) 1px,transparent 1px)",
    backgroundSize: "48px 48px,48px 48px,12px 12px,12px 12px",
  },
  kasir: {
    backgroundColor: "#052E16",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(74,222,128,0.09) 0 2px,transparent 2px 4px),radial-gradient(ellipse at center,rgba(34,197,94,0.18),transparent 70%)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "tikar")
    return (
      <div className="mx-auto flex max-w-md items-center justify-center gap-0.5 rounded-xl bg-[#FEF3C7]/70 px-2 py-1.5" aria-label={`Karcis ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 20 14" className={`h-4 w-5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x={1} y={1} width={18} height={12} rx={1.5} fill={i < nomor ? "#FACC15" : i === nomor ? "#FEF9C3" : "#F5F5F4"} stroke="#92400E" strokeWidth={1.2} strokeDasharray="2.4 1.6" />
            {i < nomor ? <path d="M 6 7.5 L 9 10 L 14 4.5" fill="none" stroke="#92400E" strokeWidth={1.6} /> : null}
          </svg>
        ))}
      </div>
    );
  if (tema === "denah")
    return (
      <div className="mx-auto max-w-md" aria-label={`Pin ${Math.min(nomor, total)} dari ${total}`}>
        <svg viewBox="0 0 240 34" className="block w-full" aria-hidden="true">
          <path d={`M 10 22 ${n.map((i) => `Q ${10 + ((i - 0.5) / total) * 220} ${i % 2 ? 8 : 34} ${10 + (i / total) * 220} 22`).join(" ")}`} fill="none" stroke="#0E7490" strokeWidth={1.6} strokeDasharray="4 3" />
          {n.map((i) => {
            const x = 10 + (i / total) * 220;
            return <circle key={i} cx={x} cy={22} r={i === nomor ? 5.5 : 3.5} fill={i < nomor ? "#0E7490" : i === nomor ? "#F97316" : "#FFFFFF"} stroke="#0E7490" strokeWidth={1.4} />;
          })}
        </svg>
      </div>
    );
  return (
    <div className="mx-auto max-w-md rounded-md border-2 border-[#4ADE80] bg-[#022C14] px-3 py-1.5 font-mono" aria-label={`Nomor ${Math.min(nomor, total)} dari ${total}`}>
      <p className="text-center text-2xl font-black tracking-widest text-[#86EFAC] [text-shadow:0_0_6px_#22C55E]">
        {String(Math.min(nomor, total)).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
      <div className="mt-1 flex gap-[3px]">
        {n.map((i) => (
          <span key={i} className={`h-2 flex-1 rounded-[1px] ${i < nomor ? "bg-[#4ADE80]" : i === nomor ? "bg-[#BBF7D0]" : "bg-[#14532D]"}`} />
        ))}
      </div>
    </div>
  );
}

export default function TahapKarcis({
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
  const tema: Tema = rupa === "benda" ? "tikar" : rupa === "diagram" ? "denah" : "kasir";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.kasir}>
        <Kemajuan tema="kasir" nomor={13} total={12} />
        <div className="rounded-sm border-4 border-[#4ADE80] bg-[#F8FAFC] p-3 font-mono" style={{ clipPath: "polygon(0 0,100% 0,100% calc(100% - 8px),95% 100%,90% calc(100% - 8px),85% 100%,80% calc(100% - 8px),75% 100%,70% calc(100% - 8px),65% 100%,60% calc(100% - 8px),55% 100%,50% calc(100% - 8px),45% 100%,40% calc(100% - 8px),35% 100%,30% calc(100% - 8px),25% 100%,20% calc(100% - 8px),15% 100%,10% calc(100% - 8px),5% 100%,0 calc(100% - 8px))" }}>
          <p className="text-center text-lg font-black text-[#14532D]">{"\u{1F9FE}"} Poin Penting: Misi Loket Karcis selesai!</p>
          <ul className="mt-2 space-y-1.5 pb-2">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#16A34A] bg-white px-3 py-2 text-sm font-bold text-[#14532D]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-[#14532D] text-[10px] font-black text-[#86EFAC]">{i + 1}</span>
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
  const kepala =
    tema === "tikar"
      ? "relative rounded-md border-4 border-dashed border-[#B45309] bg-[#FEF9C3] px-5"
      : tema === "denah"
        ? "bg-[#FBBF24] pr-8 [clip-path:polygon(0_0,94%_0,100%_50%,94%_100%,0_100%)] border-y-4 border-l-4 border-[#B45309]"
        : "rounded-sm border-2 border-[#4ADE80] bg-[#F8FAFC] font-mono";
  const papan = tema === "tikar" ? "rounded-2xl border-4 border-[#92400E]" : tema === "denah" ? "rounded-md border-4 border-[#0E7490]" : "rounded-sm border-4 border-[#4ADE80]";
  const warnaKepala = tema === "tikar" ? "text-[#92400E]" : tema === "denah" ? "text-[#7C2D12]" : "text-[#166534]";
  const cariSalah = ls.langkah.tipe === "salah";
  return (
    <div className="space-y-3 rounded-3xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        {tema === "tikar" ? (
          <>
            <span className="absolute -left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#D9B877]" aria-hidden="true" />
            <span className="absolute -right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#D9B877]" aria-hidden="true" />
          </>
        ) : null}
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
        <LangkahKarcis key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
