"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahUkur } from "./LangkahUkur";
import { PENUTUP_A, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 3 Bab 3 Sub-Bab A: dua belas tugas lanjutan Misi Ukur
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8, Kelas 2 Bab 1 sampai 8, Kelas 3 Bab 1 dan 2, dan Sub-Bab lain Bab ini: Concrete = papan kayu bercat dengan penggaris tempel, kemajuan berupa deret jejak kaki kelinci;
 * Pictorial = kertas denah kandang bergaris biru, kemajuan berupa deret ubin kecil; Abstract = papan nama kandang kayu bertuliskan kapur, kemajuan berupa deret goresan kapur.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B. Tanpa skor.
 */

type Tema = "cat" | "denah" | "kapur";
const LATAR: Record<Tema, React.CSSProperties> = {
  cat: {
    backgroundColor: "#CCFBF1",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(15,118,110,0.22) 0 2px,transparent 2px 30px),repeating-linear-gradient(90deg,rgba(255,255,255,0.35) 0 1px,transparent 1px 60px)",
  },
  denah: {
    backgroundColor: "#FEFCE8",
    backgroundImage: "linear-gradient(rgba(37,99,235,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.2) 1px,transparent 1px)",
    backgroundSize: "22px 22px",
  },
  kapur: {
    backgroundColor: "#2F5D3F",
    backgroundImage: "radial-gradient(ellipse at 20% 30%,rgba(255,255,255,0.1),transparent 55%),radial-gradient(ellipse at 80% 70%,rgba(255,255,255,0.07),transparent 50%)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "cat")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-0.5 px-2 py-1" aria-label={`Jejak ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`text-base leading-none ${i === nomor ? "animate-pulse" : ""} ${i <= nomor ? "" : "opacity-30 grayscale"}`}>
            {"\u{1F43E}"}
          </span>
        ))}
      </div>
    );
  if (tema === "denah")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Ubin ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3 w-3 border-2 ${i === nomor ? "animate-pulse border-[#1D4ED8] bg-[#93C5FD]" : i < nomor ? "border-[#1E3A8A] bg-[#2563EB]" : "border-dashed border-[#2563EB]/60 bg-transparent"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Goresan ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-4 w-1.5 rounded-full ${i === nomor ? "animate-pulse bg-white" : i < nomor ? "bg-[#E5E7EB]" : "bg-white/25"}`} />
      ))}
    </div>
  );
}

export default function TahapUkur({
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
  const tema: Tema = rupa === "benda" ? "cat" : rupa === "diagram" ? "denah" : "kapur";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_A}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-xl border-[10px] border-[#92400E] bg-[#92400E] shadow-[0_6px_0_rgba(69,26,3,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.kapur}>
          <p className="text-center text-lg font-black text-white">{"\u{1F4CB}"} Poin Penting: Mengukur Panjang dengan Satuan Baku</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#E5E7EB] bg-[#1F3D2B] px-3 py-2 text-sm font-bold text-white">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#FDE68A] text-[10px] font-black text-[#FDE68A]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F4E3}"} {PENUTUP_A}
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
  const kepala = tema === "cat" ? "rounded-xl border-4 border-[#0F766E] bg-white" : tema === "denah" ? "rounded-md border-2 border-dashed border-[#2563EB] bg-[#EFF6FF]" : "rounded-md border-4 border-[#E5E7EB] bg-[#1F3D2B]";
  const papan = tema === "cat" ? "rounded-2xl border-4 border-[#0F766E]" : tema === "denah" ? "rounded-md border-2 border-dashed border-[#2563EB]" : "rounded-md border-4 border-[#E5E7EB]";
  const warnaKepala = tema === "cat" ? "text-[#0F766E]" : tema === "denah" ? "text-[#1D4ED8]" : "text-[#FDE68A]";
  const warnaJudul = tema === "kapur" ? "text-white" : "text-[#1C01A5]";
  const warnaCerita = tema === "kapur" ? "text-white/85" : "text-[#1C01A5]/80";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "cat" ? (
        <div className="mx-auto h-4 max-w-[420px] rounded-sm border-2 border-[#92400E] bg-[#FDE68A]" style={{ backgroundImage: "repeating-linear-gradient(90deg,#1C01A5 0 1px,transparent 1px 12px)" }} aria-hidden="true" />
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
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
        <LangkahUkur key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "cat")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#0F766E] bg-[#CCFBF1] shadow-[0_6px_0_rgba(19,78,74,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#0F766E 0 12px,#99F6E4 12px 24px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#0F766E 0 12px,#99F6E4 12px 24px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "denah") return <div className="rounded-lg border-[6px] border-double border-[#2563EB] bg-[#FEFCE8] shadow-[0_6px_0_rgba(30,58,138,0.3)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#92400E] bg-[#92400E] shadow-[0_6px_0_rgba(69,26,3,0.4)]">{isi}</div>;
}
