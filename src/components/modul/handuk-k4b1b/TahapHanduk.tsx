"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahHanduk } from "./LangkahHanduk";
import { JEMBATAN_C, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 4 Bab 1 Sub-Bab B: dua belas tugas lanjutan Misi Handuk
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 sampai 3 dan dari Sub-Bab lain: Concrete = rak gudang kayu bersekat dengan papan kayu bergaris, kemajuan berupa deret keranjang;
 * Pictorial = kertas denah biru berkisi putih, kemajuan berupa deret balok kecil; Abstract = catatan stok merah muda bergaris dengan cap gudang, kemajuan berupa deret cap kecil.
 * Abstract diakhiri Poin Penting dengan jembatan ke Sub-Bab C (Kak Tiara membawa papan dermaga). Tanpa skor.
 */

type Tema = "rak" | "denah" | "stok";
const LATAR: Record<Tema, React.CSSProperties> = {
  rak: {
    backgroundColor: "#FDE9C0",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(146,64,14,0.2) 0 2px,transparent 2px 46px),repeating-linear-gradient(90deg,rgba(146,64,14,0.1) 0 1px,transparent 1px 38px)",
  },
  denah: {
    backgroundColor: "#DBEAFE",
    backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
    backgroundSize: "22px 22px",
  },
  stok: {
    backgroundColor: "#FFFFFF",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(236,72,153,0.2) 0 1px,transparent 1px 28px),linear-gradient(90deg,transparent 28px,rgba(220,38,38,0.35) 28px 30px,transparent 30px)",
  },
};
const RAK_DEKOR = ["\u{1F965}", "\u{1F34D}", "\u{1F349}", "\u{1F41A}", "\u{1F9F3}"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "rak")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-0.5 px-2 py-1" aria-label={`Keranjang ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`text-base leading-none ${i === nomor ? "animate-pulse" : ""} ${i <= nomor ? "" : "opacity-30 grayscale"}`}>
            {"\u{1F9FA}"}
          </span>
        ))}
      </div>
    );
  if (tema === "denah")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Balok ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-[2px] border ${i === nomor ? "animate-pulse border-[#1D4ED8] bg-[#93C5FD]" : i < nomor ? "border-[#1E3A8A] bg-[#2563EB]" : "border-dashed border-[#2563EB]/60 bg-transparent"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#9D174D] bg-[#FBCFE8]" : i < nomor ? "border-[#9D174D] bg-[#EC4899]" : "border-dashed border-[#9D174D]/50 bg-transparent"}`} />
      ))}
    </div>
  );
}

export default function TahapHanduk({
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
  const tema: Tema = rupa === "benda" ? "rak" : rupa === "diagram" ? "denah" : "stok";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${JEMBATAN_C}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-xl border-[10px] border-[#BE185D] bg-[#BE185D] shadow-[0_6px_0_rgba(131,24,67,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.stok}>
          <p className="text-center text-lg font-black text-[#831843]">{"\u{1F3F7}"} Poin Penting: Tempat Angka</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#BE185D] bg-[#FDF2F8] px-3 py-2 text-sm font-bold text-[#831843]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#9D174D] bg-[#FBCFE8] text-[10px] font-black text-[#831843]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="space-y-2 rounded-2xl border-4 border-[#0369A1] bg-[#F0F9FF] p-3 text-center" data-uji="jembatan">
            <p className="mx-auto max-w-[360px] rounded-md border-4 border-[#0369A1] bg-[#E0F2FE] px-2 py-1 text-sm font-black tracking-wide text-[#0369A1]">PAPAN DERMAGA</p>
            <p className="text-3xl leading-none" aria-hidden="true">
              {"\u{1F3D6}"} {"\u{26F5}"} {"\u{1F3DD}"}
            </p>
            <p className="text-2xl leading-none" aria-hidden="true">
              {"\u{1F469}"}
            </p>
            <p className="text-xs font-black text-[#0C4A6E]">Kak Tiara</p>
            <p className="text-sm font-black text-[#0C4A6E]">
              {"\u{1F4E3}"} {JEMBATAN_C}
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
  const kepala = tema === "rak" ? "rounded-xl border-4 border-[#92400E] bg-[#FFFBEB]" : tema === "denah" ? "rounded-md border-2 border-dashed border-[#2563EB] bg-[#EFF6FF]" : "rounded-md border-4 border-[#BE185D] bg-[#FDF2F8]";
  const papan = tema === "rak" ? "rounded-2xl border-4 border-[#92400E]" : tema === "denah" ? "rounded-md border-2 border-dashed border-[#2563EB]" : "rounded-md border-4 border-[#BE185D]";
  const warnaKepala = tema === "rak" ? "text-[#92400E]" : tema === "denah" ? "text-[#1D4ED8]" : "text-[#9D174D]";
  const warnaJudul = "text-[#1C01A5]";
  const warnaCerita = "text-[#1C01A5]/80";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "rak" ? (
        <div className="mx-auto flex max-w-[420px] justify-around rounded-md bg-white/80 px-2" aria-hidden="true">
          {RAK_DEKOR.map((e, i) => (
            <span key={i} className="text-lg leading-none">
              {e}
            </span>
          ))}
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "stok" ? (
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#9D174D] bg-[#FBCFE8] px-1 text-[10px] text-[#831843]" aria-hidden="true">
              {"\u{1F3F7}"} cap gudang
            </span>
          ) : null}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${warnaCerita}`}>{so.cerita}</p>
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
        <LangkahHanduk key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "rak")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#92400E] bg-[#FDE9C0] shadow-[0_6px_0_rgba(69,26,3,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#92400E 0 4px,#D6A867 4px 44px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#92400E 0 4px,#D6A867 4px 44px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "denah") return <div className="rounded-lg border-[6px] border-double border-[#2563EB] bg-[#DBEAFE] shadow-[0_6px_0_rgba(30,58,138,0.3)]">{isi}</div>;
  return (
    <div className="rounded-xl border-[10px] border-[#BE185D] bg-[#BE185D] shadow-[0_6px_0_rgba(131,24,67,0.4)]">
      {isi}
    </div>
  );
}
