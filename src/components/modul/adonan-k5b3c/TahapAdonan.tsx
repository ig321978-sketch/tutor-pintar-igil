"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahAdonan } from "./LangkahAdonan";
import { PENUTUP_C, POIN_PENTING, POIN_PENTING_SUARA } from "./data";
import { TeksBaris } from "./GambarAdonan";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 5 Bab 3 Sub-Bab C: dua belas tugas lanjutan Misi Adonan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 sampai 4 dan bab lain: Concrete = dapur roti Bu Nani beratap kain bergaris merah muda dengan untaian bendera segitiga, kemajuan berupa deret loyang kecil;
 * Pictorial = papan jepit Bima berkertas biru bergaris kotak berbingkai ganda, kemajuan berupa deret bar pecahan; Abstract = lembar Toko Roti Keliling berkertas kuning bergaris
 * dengan cap TOKO ROTI KELILING, kemajuan berupa deret ceklis. Abstract diakhiri Poin Penting dan perayaan Toko Roti Keliling (akhir bab). Tanpa skor.
 */

type Tema = "dapur" | "papan" | "lembar";
const LATAR: Record<Tema, React.CSSProperties> = {
  dapur: {
    backgroundColor: "#FFF1F2",
    backgroundImage: "repeating-linear-gradient(45deg,rgba(190,24,93,0.1) 0 12px,transparent 12px 24px),repeating-linear-gradient(-45deg,rgba(37,99,235,0.07) 0 12px,transparent 12px 24px)",
  },
  papan: {
    backgroundColor: "#EFF6FF",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(37,99,235,0.2) 0 1px,transparent 1px 18px),repeating-linear-gradient(0deg,rgba(37,99,235,0.2) 0 1px,transparent 1px 18px)",
  },
  lembar: {
    backgroundColor: "#FEFCE8",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(161,98,7,0.2) 0 1px,transparent 1px 26px),linear-gradient(90deg,rgba(190,24,93,0.4) 0 2px,transparent 2px)",
    backgroundSize: "auto, 34px 100%",
    backgroundRepeat: "repeat, no-repeat",
  },
};
const BENDERA = ["#F472B6", "#60A5FA", "#FDE047", "#34D399"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "dapur")
    return (
      <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Loyang ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block rounded-md border-2 ${i === nomor ? "h-5 w-5 animate-pulse border-[#9D174D] bg-[#FDE047]" : i < nomor ? "h-4 w-4 border-[#831843] bg-[#F472B6]" : "h-3 w-3 border-dashed border-[#9D174D]/50"}`} />
        ))}
      </div>
    );
  if (tema === "papan")
    return (
      <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-px px-2 py-1" aria-label={`Bar ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block border ${i === nomor ? "h-5 w-6 animate-pulse border-[#1D4ED8] bg-[#FDE68A]" : i < nomor ? "h-4 w-6 border-[#1E3A8A] bg-[#93C5FD]" : "h-3 w-6 border-[#1E3A8A]/30"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Ceklis ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block text-[13px] font-black leading-none ${i === nomor ? "animate-pulse text-[#BE185D]" : i < nomor ? "text-[#A16207]" : "text-[#A16207]/30"}`}>
          {i < nomor ? "✔" : "○"}
        </span>
      ))}
    </div>
  );
}

export default function TahapAdonan({
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
  const tema: Tema = rupa === "benda" ? "dapur" : rupa === "diagram" ? "papan" : "lembar";
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
      <div className="rounded-xl border-[10px] border-[#CA8A04] bg-[#CA8A04] shadow-[0_6px_0_rgba(113,63,18,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.lembar}>
          <p className="text-center text-lg font-black text-[#713F12]">{"\u{1F4DD}"} Poin Penting: Pengurangan Pecahan</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#CA8A04] bg-white/90 px-3 py-2 text-sm font-bold text-[#422006]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#BE185D] bg-[#FCE7F3] text-[10px] font-black text-[#831843]">{i + 1}</span>
                <span>
                  <TeksBaris t={p} />
                </span>
              </li>
            ))}
          </ul>
          <div className="space-y-1 rounded-2xl border-4 border-[#F472B6] bg-[#FDF2F8] px-3 py-2 text-center" aria-label="Perayaan Toko Roti Keliling">
            <p className="text-xs font-black tracking-wide text-[#9D174D]">TOKO ROTI KELILING</p>
            <div className="flex items-end justify-center gap-1" aria-hidden="true">
              {BENDERA.concat(BENDERA).map((w, i) => (
                <span key={i} className="block h-0 w-0 border-x-[7px] border-t-[12px] border-x-transparent" style={{ borderTopColor: w }} />
              ))}
            </div>
            <p className="text-sm font-black text-[#831843]">
              {"\u{1F35E}"} {PENUTUP_C}
            </p>
          </div>
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
  const kepala = tema === "dapur" ? "rounded-xl border-4 border-[#BE185D] bg-white" : tema === "papan" ? "rounded-md border-2 border-double border-[#1D4ED8] bg-white" : "rounded-md border-4 border-[#CA8A04] bg-white";
  const papan = tema === "dapur" ? "rounded-2xl border-4 border-[#BE185D]" : tema === "papan" ? "rounded-md border-4 border-double border-[#1D4ED8]" : "rounded-md border-4 border-[#CA8A04]";
  const warnaKepala = tema === "dapur" ? "text-[#831843]" : tema === "papan" ? "text-[#1E3A8A]" : "text-[#713F12]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "dapur" ? (
        <div className="mx-auto max-w-[420px] text-center" aria-hidden="true">
          <div className="flex items-start justify-center gap-0.5">
            {Array.from({ length: 14 }, (_, i) => (
              <span key={i} className="block h-0 w-0 border-x-[9px] border-t-[14px] border-x-transparent" style={{ borderTopColor: BENDERA[i % BENDERA.length] }} />
            ))}
          </div>
          <div className="mt-1 rounded-sm border-2 border-[#BE185D] bg-[#FBCFE8] px-1.5 text-[10px] font-black text-[#831843]">DAPUR ROTI BU NANI</div>
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "lembar" ? (
            <span className="mt-1 block w-fit -rotate-3 rounded border-2 border-[#BE185D] bg-[#FCE7F3] px-1 text-[10px] text-[#BE185D]" aria-hidden="true">
              cap Toko Roti Keliling
            </span>
          ) : null}
        </p>
        <p className="text-base font-black text-[#1C01A5]">{so.judul}</p>
        <p className="text-sm font-bold text-[#1C01A5]/80">{so.cerita}</p>
      </div>

      <Kemajuan tema={tema} nomor={nomor} total={total} />

      <div className="flex justify-center gap-1.5">
        {soal.map((x, i) => (
          <span key={x.cara} className={`rounded-full px-2.5 py-0.5 text-xs font-black ${i === s ? "bg-[#FACC15] text-[#1C01A5]" : i < s ? "bg-[#FCE7F3] text-[#9D174D]" : "bg-white/80 text-[#1C01A5]/50"}`}>
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
        <LangkahAdonan key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "dapur") return <div className="overflow-hidden rounded-3xl border-[8px] border-[#BE185D] bg-[#FFF1F2] shadow-[0_6px_0_rgba(131,24,67,0.35)]">{isi}</div>;
  if (tema === "papan") return <div className="rounded-lg border-[10px] border-double border-[#1D4ED8] bg-[#EFF6FF] shadow-[0_6px_0_rgba(30,58,138,0.3)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#CA8A04] bg-[#CA8A04] shadow-[0_6px_0_rgba(113,63,18,0.4)]">{isi}</div>;
}
