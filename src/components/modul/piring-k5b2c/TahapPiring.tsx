"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahPiring } from "./LangkahPiring";
import { PENUTUP_C, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 5 Bab 2 Sub-Bab C: dua belas tugas lanjutan Misi Piring
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 sampai 4: Concrete = meja klepon pasar malam bertaplak kotak hijau dengan untaian lampion, kemajuan berupa deret klepon bulat;
 * Pictorial = kertas pita krem berpetak-petak teal berbingkai putus-putus, kemajuan berupa deret petak pita; Abstract = lembar pengelola pasar berkertas jingga bergaris
 * dengan cap PENGELOLA PASAR, kemajuan berupa deret ceklis. Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab D. Tanpa skor.
 */

type Tema = "meja" | "pita" | "lembar";
const LATAR: Record<Tema, React.CSSProperties> = {
  meja: {
    backgroundColor: "#ECFDF5",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(22,163,74,0.13) 0 14px,transparent 14px 28px),repeating-linear-gradient(90deg,rgba(22,163,74,0.13) 0 14px,transparent 14px 28px)",
  },
  pita: {
    backgroundColor: "#FEFCE8",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(13,148,136,0.28) 0 1px,transparent 1px 16px),repeating-linear-gradient(0deg,rgba(13,148,136,0.14) 0 1px,transparent 1px 30px)",
  },
  lembar: {
    backgroundColor: "#FFF7ED",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(194,65,12,0.2) 0 1px,transparent 1px 26px),linear-gradient(90deg,rgba(21,128,61,0.4) 0 2px,transparent 2px)",
    backgroundSize: "auto, 34px 100%",
    backgroundRepeat: "repeat, no-repeat",
  },
};
const LAMPION = ["#DC2626", "#FACC15", "#16A34A", "#F97316"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "meja")
    return (
      <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Klepon ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block rounded-full border-2 ${i === nomor ? "h-5 w-5 animate-pulse border-[#166534] bg-[#FDE047]" : i < nomor ? "h-4 w-4 border-[#14532D] bg-[#22C55E]" : "h-3 w-3 border-dashed border-[#166534]/50"}`} />
        ))}
      </div>
    );
  if (tema === "pita")
    return (
      <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-px px-2 py-1" aria-label={`Petak ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block border ${i === nomor ? "h-5 w-6 animate-pulse border-[#0F766E] bg-[#FDE68A]" : i < nomor ? "h-4 w-6 border-[#115E59] bg-[#5EEAD4]" : "h-3 w-6 border-[#115E59]/30"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Ceklis ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block text-[13px] font-black leading-none ${i === nomor ? "animate-pulse text-[#15803D]" : i < nomor ? "text-[#C2410C]" : "text-[#C2410C]/30"}`}>
          {i < nomor ? "✔" : "○"}
        </span>
      ))}
    </div>
  );
}

export default function TahapPiring({
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
  const tema: Tema = rupa === "benda" ? "meja" : rupa === "diagram" ? "pita" : "lembar";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_C}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-xl border-[10px] border-[#C2410C] bg-[#C2410C] shadow-[0_6px_0_rgba(124,45,18,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.lembar}>
          <p className="text-center text-lg font-black text-[#7C2D12]">
            {"\u{1F4DD}"} Poin Penting: Faktor
          </p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#C2410C] bg-white/90 px-3 py-2 text-sm font-bold text-[#431407]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#15803D] bg-[#DCFCE7] text-[10px] font-black text-[#14532D]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F4E3}"} {PENUTUP_C}
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
  const kepala = tema === "meja" ? "rounded-xl border-4 border-[#166534] bg-white" : tema === "pita" ? "rounded-md border-2 border-dashed border-[#0D9488] bg-white" : "rounded-md border-4 border-[#C2410C] bg-white";
  const papan = tema === "meja" ? "rounded-2xl border-4 border-[#166534]" : tema === "pita" ? "rounded-md border-2 border-dashed border-[#0D9488]" : "rounded-md border-4 border-[#C2410C]";
  const warnaKepala = tema === "meja" ? "text-[#14532D]" : tema === "pita" ? "text-[#115E59]" : "text-[#9A3412]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "meja" ? (
        <div className="mx-auto max-w-[420px] text-center" aria-hidden="true">
          <div className="flex items-end justify-center gap-1.5">
            {Array.from({ length: 9 }, (_, i) => (
              <span key={i} className="block h-3.5 w-3 rounded-full border border-[#7F1D1D]" style={{ backgroundColor: LAMPION[i % LAMPION.length] }} />
            ))}
          </div>
          <div className="mt-1 rounded-sm border-2 border-[#166534] bg-[#BBF7D0] px-1.5 text-[10px] font-black text-[#14532D]">MEJA KLEPON PASAR MALAM</div>
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "lembar" ? (
            <span className="mt-1 block w-fit -rotate-3 rounded border-2 border-[#15803D] bg-[#DCFCE7] px-1 text-[10px] text-[#15803D]" aria-hidden="true">
              cap pengelola pasar
            </span>
          ) : null}
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#475569] bg-[#F1F5F9] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#475569]">
              Tugas {nomor} dari {total} · {cariSalah ? "\u{1F50E} Cari kesalahan · " : ""}
              {rupa === "benda" ? `${IKON_METODE[ls.metode]} ` : ""}
              {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahPiring key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "meja") return <div className="overflow-hidden rounded-3xl border-[8px] border-[#166534] bg-[#ECFDF5] shadow-[0_6px_0_rgba(20,83,45,0.35)]">{isi}</div>;
  if (tema === "pita") return <div className="rounded-lg border-[10px] border-dashed border-[#0D9488] bg-[#FEFCE8] shadow-[0_6px_0_rgba(17,94,89,0.3)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#C2410C] bg-[#C2410C] shadow-[0_6px_0_rgba(124,45,18,0.4)]">{isi}</div>;
}
