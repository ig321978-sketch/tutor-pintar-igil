"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahKelapa } from "./LangkahKelapa";
import { PENUTUP_D, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 4 Bab 1 Sub-Bab D: dua belas tugas lanjutan Misi Kios
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 sampai 3 dan dari Sub-Bab lain Bab ini: Concrete = kios kelapa beratap rumbia dengan rak bambu, kemajuan berupa deret keranjang anyaman;
 * Pictorial = papan harga putih berbingkai jingga dengan garis jingga, kemajuan berupa deret balok kecil; Abstract = nota Pak Darwis berkertas krem bergaris merah dan hijau dengan cap kelapa, kemajuan berupa deret cap kecil.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab E. Tanpa skor.
 */

type Tema = "kios" | "papanharga" | "nota";
const LATAR: Record<Tema, React.CSSProperties> = {
  kios: {
    backgroundColor: "#F8E3B0",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(124,74,30,0.2) 0 2px,transparent 2px 26px),repeating-linear-gradient(0deg,rgba(255,255,255,0.18) 0 1px,transparent 1px 34px)",
  },
  papanharga: {
    backgroundColor: "#FFFBF5",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(234,88,12,0.2) 0 1px,transparent 1px 24px),repeating-linear-gradient(90deg,rgba(234,88,12,0.12) 0 1px,transparent 1px 24px)",
  },
  nota: {
    backgroundColor: "#FEF9E7",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(21,128,61,0.22) 0 1px,transparent 1px 26px),linear-gradient(90deg,rgba(220,38,38,0.35) 0 2px,transparent 2px)",
    backgroundSize: "auto, 34px 100%",
    backgroundRepeat: "repeat, no-repeat",
  },
};
const DAUN = ["#86EFAC", "#4ADE80", "#BEF264", "#A3E635", "#86EFAC"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "kios")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Keranjang ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`block h-4 w-5 rounded-b-xl rounded-t-sm border-[3px] ${i === nomor ? "animate-pulse border-[#7C4A1E] bg-[#FDE68A]" : i < nomor ? "border-[#7C4A1E] bg-[#C99A63]" : "border-dashed border-[#7C4A1E]/40 bg-transparent"}`}
          />
        ))}
      </div>
    );
  if (tema === "papanharga")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Balok ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3.5 w-3.5 rounded-[3px] border-2 ${i === nomor ? "animate-pulse border-[#C2410C] bg-[#FED7AA]" : i < nomor ? "border-[#9A3412] bg-[#F97316]" : "border-dashed border-[#C2410C]/50 bg-transparent"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#15803D] bg-[#BBF7D0]" : i < nomor ? "border-[#14532D] bg-[#16A34A]" : "border-dashed border-[#14532D]/50 bg-transparent"}`} />
      ))}
    </div>
  );
}

export default function TahapKelapa({
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
  const tema: Tema = rupa === "benda" ? "kios" : rupa === "diagram" ? "papanharga" : "nota";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_D}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-xl border-[10px] border-[#15803D] bg-[#15803D] shadow-[0_6px_0_rgba(20,83,45,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.nota}>
          <p className="text-center text-lg font-black text-[#14532D]">{"\u{1F965}"} Poin Penting: Menyusun dan Menguraikan Bilangan</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#14532D] bg-white/90 px-3 py-2 text-sm font-bold text-[#14532D]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#DC2626] bg-[#FEE2E2] text-[10px] font-black text-[#991B1B]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F4E3}"} {PENUTUP_D}
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
  const kepala = tema === "kios" ? "rounded-xl border-4 border-[#7C4A1E] bg-white" : tema === "papanharga" ? "rounded-md border-4 border-[#EA580C] bg-[#FFF7ED]" : "rounded-md border-4 border-[#15803D] bg-white";
  const papan = tema === "kios" ? "rounded-2xl border-4 border-[#7C4A1E]" : tema === "papanharga" ? "rounded-md border-4 border-[#EA580C]" : "rounded-md border-4 border-[#15803D]";
  const warnaKepala = tema === "kios" ? "text-[#7C4A1E]" : tema === "papanharga" ? "text-[#C2410C]" : "text-[#15803D]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "kios" ? (
        <div className="mx-auto flex max-w-[420px] items-center gap-1" aria-hidden="true">
          <span className="rounded-sm border-2 border-[#7C4A1E] bg-[#FEF3C7] px-1.5 text-[9px] font-black text-[#7C4A1E]">KIOS KELAPA</span>
          {DAUN.map((w, i) => (
            <span key={i} className="block h-3 flex-1 rounded-b-full border border-[#166534]/60" style={{ backgroundColor: w }} />
          ))}
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "nota" ? (
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#15803D] bg-[#DCFCE7] px-1 text-[10px] text-[#15803D]" aria-hidden="true">
              {"\u{1F965}"} cap
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
        <LangkahKelapa key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "kios")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#7C4A1E] bg-[#F8E3B0] shadow-[0_6px_0_rgba(69,26,3,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#B45309 0 10px,#D97706 10px 20px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#7C4A1E 0 4px,#E7C48F 4px 44px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "papanharga") return <div className="rounded-lg border-[10px] border-[#EA580C] bg-[#FFFBF5] shadow-[0_6px_0_rgba(124,45,18,0.35)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#15803D] bg-[#15803D] shadow-[0_6px_0_rgba(20,83,45,0.4)]">{isi}</div>;
}
