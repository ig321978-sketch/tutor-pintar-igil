"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahWarna } from "./LangkahWarna";
import { PENUTUP_B, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract K4 Bab 2 Sub-Bab B: dua belas tugas lanjutan Misi Warna
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Sub-Bab lain dan bab lain: Concrete = meja pewarna kain bergaris warna-warni, kemajuan berupa deret tetes pewarna;
 * Pictorial = kertas hitung ungu muda berpetak, kemajuan berupa deret batang kecil; Abstract = daftar Pak Joyo berkertas krem bergaris merah muda dengan cap palet, kemajuan berupa deret cap kecil.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab C. Kemajuan digambar sebagai kisi tetap. Tanpa skor.
 */

type Tema = "meja" | "kertas" | "daftar";
const LATAR: Record<Tema, React.CSSProperties> = {
  meja: {
    backgroundColor: "#FDEBD0",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(124,45,18,0.16) 0 2px,transparent 2px 30px),repeating-linear-gradient(90deg,rgba(14,116,144,0.12) 0 2px,transparent 2px 44px)",
  },
  kertas: {
    backgroundColor: "#F5F3FF",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(109,40,217,0.18) 0 1px,transparent 1px 24px),repeating-linear-gradient(90deg,rgba(109,40,217,0.18) 0 1px,transparent 1px 24px)",
  },
  daftar: {
    backgroundColor: "#FFF8E6",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(219,39,119,0.22) 0 1px,transparent 1px 26px),linear-gradient(90deg,rgba(14,116,144,0.32) 0 2px,transparent 2px)",
    backgroundSize: "auto, 34px 100%",
    backgroundRepeat: "repeat, no-repeat",
  },
};
const PEWARNA = ["#93C5FD", "#FCA5A5", "#86EFAC", "#FDE047", "#C4B5FD"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  const kisi: React.CSSProperties = { gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` };
  if (tema === "meja")
    return (
      <div className="mx-auto grid max-w-md items-center justify-items-center gap-0.5 px-2 py-1" style={kisi} aria-label={`Tetes ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block text-sm leading-none ${i === nomor ? "animate-pulse" : i < nomor ? "" : "opacity-30 grayscale"}`}>
            {"\u{1F4A7}"}
          </span>
        ))}
      </div>
    );
  if (tema === "kertas")
    return (
      <div className="mx-auto grid max-w-md items-end justify-items-center gap-0.5 px-2 py-1" style={kisi} aria-label={`Batang ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-sm border ${i === nomor ? "animate-pulse border-[#F59E0B] bg-[#FDE68A]" : i < nomor ? "border-[#6D28D9] bg-[#A78BFA]" : "border-dashed border-[#6D28D9]/50 bg-transparent"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto grid max-w-md items-center justify-items-center gap-0.5 px-2 py-1" style={kisi} aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3 w-3 rotate-45 border-2 ${i === nomor ? "animate-pulse border-[#DB2777] bg-[#FBCFE8]" : i < nomor ? "border-[#9D174D] bg-[#DB2777]" : "border-dashed border-[#9D174D]/50 bg-transparent"}`} />
      ))}
    </div>
  );
}

export default function TahapWarna({
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
  const tema: Tema = rupa === "benda" ? "meja" : rupa === "diagram" ? "kertas" : "daftar";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_B}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-xl border-[10px] border-[#DB2777] bg-[#DB2777] shadow-[0_6px_0_rgba(131,24,67,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.daftar}>
          <p className="text-center text-lg font-black text-[#9D174D]">{"\u{1F3A8}"} Poin Penting: Membandingkan dan Mengurutkan Pecahan</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#9D174D] bg-white/90 px-3 py-2 text-sm font-bold text-[#9D174D]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#0E7490] bg-[#CFFAFE] text-[10px] font-black text-[#155E75]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F4E3}"} {PENUTUP_B}
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
  const kepala = tema === "meja" ? "rounded-xl border-4 border-[#7C2D12] bg-white" : tema === "kertas" ? "rounded-md border-2 border-dashed border-[#6D28D9] bg-white" : "rounded-md border-4 border-[#DB2777] bg-white";
  const papan = tema === "meja" ? "rounded-2xl border-4 border-[#7C2D12]" : tema === "kertas" ? "rounded-md border-2 border-dashed border-[#6D28D9]" : "rounded-md border-4 border-[#DB2777]";
  const warnaKepala = tema === "meja" ? "text-[#7C2D12]" : tema === "kertas" ? "text-[#6D28D9]" : "text-[#9D174D]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "meja" ? (
        <div className="mx-auto grid max-w-[420px] items-center gap-1" style={{ gridTemplateColumns: "auto repeat(5, minmax(0, 1fr))" }} aria-hidden="true">
          <span className="rounded-sm border-2 border-[#7C2D12] bg-[#FEF3C7] px-1.5 text-[9px] font-black text-[#7C2D12]">MEJA PEWARNA</span>
          {PEWARNA.map((w) => (
            <span key={w} className="block h-3 rounded-sm border border-[#7C2D12]/60" style={{ backgroundColor: w }} />
          ))}
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "daftar" ? (
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#DB2777] bg-[#FCE7F3] px-1 text-[10px] text-[#9D174D]" aria-hidden="true">
              {"\u{1F3A8}"} cap
            </span>
          ) : null}
        </p>
        <p className="text-base font-black text-[#1C01A5]">{so.judul}</p>
        <p className="text-sm font-bold text-[#1C01A5]/80">{so.cerita}</p>
      </div>

      <Kemajuan tema={tema} nomor={nomor} total={total} />

      <div className="grid grid-cols-3 justify-items-center gap-1.5">
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
        <LangkahWarna key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "meja")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#7C2D12] bg-[#FDEBD0] shadow-[0_6px_0_rgba(69,26,3,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#7C2D12 0 4px,#F59E0B 4px 44px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#7C2D12 0 4px,#F59E0B 4px 44px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "kertas") return <div className="rounded-lg border-[10px] border-[#6D28D9] bg-[#F5F3FF] shadow-[0_6px_0_rgba(76,29,149,0.35)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#DB2777] bg-[#DB2777] shadow-[0_6px_0_rgba(131,24,67,0.4)]">{isi}</div>;
}
