"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahTimbang } from "./LangkahTimbang";
import { PENUTUP_C, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 3 Bab 3 Sub-Bab C: dua belas tugas lanjutan Misi Pakan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1, Kelas 2, Kelas 3 Bab 1 dan 2, dan Sub-Bab lain Bab ini: Concrete = lantai gudang pakan beralas karung goni, kemajuan berupa deret mangkuk terisi;
 * Pictorial = layar hijau gelap bergaris seperti papan kapur timbangan, kemajuan berupa deret lingkaran jarum; Abstract = catatan juru pakan berkertas cokelat muda, kemajuan berupa deret kotak catatan bertanda centang.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab D. Tanpa skor.
 */

type Tema = "goni" | "layar" | "catatan";
const LATAR: Record<Tema, React.CSSProperties> = {
  goni: {
    backgroundColor: "#D8B98A",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(120,80,30,0.25) 0 2px,transparent 2px 6px),repeating-linear-gradient(90deg,rgba(120,80,30,0.22) 0 2px,transparent 2px 7px)",
  },
  layar: {
    backgroundColor: "#1F3D2B",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(255,255,255,0.1) 0 1px,transparent 1px 22px),repeating-linear-gradient(90deg,rgba(255,255,255,0.08) 0 1px,transparent 1px 22px)",
  },
  catatan: {
    backgroundColor: "#F3E3C3",
    backgroundImage: "repeating-linear-gradient(0deg,transparent 0 23px,rgba(146,64,14,0.25) 23px 24px)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "goni")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-0.5 px-2 py-1" aria-label={`Mangkuk ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`text-base leading-none ${i === nomor ? "animate-pulse" : ""} ${i <= nomor ? "" : "opacity-30 grayscale"}`}>
            {"\u{1F963}"}
          </span>
        ))}
      </div>
    );
  if (tema === "layar")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Jarum ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 16 16" className={`h-4 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <circle cx="8" cy="8" r="6.5" fill="none" stroke={i <= nomor ? "#86EFAC" : "#4B6B57"} strokeWidth="1.4" strokeDasharray={i <= nomor ? undefined : "2 1.6"} />
            <line x1="8" y1="8" x2={i <= nomor ? 12 : 8} y2={i <= nomor ? 4 : 3.5} stroke={i <= nomor ? "#FDE047" : "#4B6B57"} strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-0.5 px-2 py-1" aria-label={`Catatan ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <svg key={i} viewBox="0 0 14 16" className={`h-4 w-3.5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
          <rect x="1.5" y="1.5" width="11" height="13" rx="1.5" fill={i <= nomor ? "#FFFBEB" : "#F5F5F4"} stroke="#92400E" strokeWidth="1" strokeDasharray={i <= nomor ? undefined : "2 1.4"} />
          {i <= nomor ? <path d="M3.5 8 L6 10.5 L10.5 5" fill="none" stroke="#15803D" strokeWidth="1.6" strokeLinecap="round" /> : null}
        </svg>
      ))}
    </div>
  );
}

export default function TahapTimbang({
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
  const tema: Tema = rupa === "benda" ? "goni" : rupa === "diagram" ? "layar" : "catatan";
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
      <div className="rounded-xl border-[10px] border-[#B45309] bg-[#B45309] shadow-[0_6px_0_rgba(69,26,3,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.catatan}>
          <p className="text-center text-lg font-black text-[#7C2D12]">{"\u{1F4D2}"} Poin Penting: Mengukur Berat dengan Satuan Baku</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#B45309] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#15803D] text-[10px] font-black text-[#15803D]">{i + 1}</span>
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
  const kepala = tema === "goni" ? "rounded-xl border-4 border-[#92400E] bg-[#FEF3C7]" : tema === "layar" ? "rounded-md border-2 border-dashed border-[#86EFAC] bg-[#F0FDF4]" : "rounded-md border-4 border-[#B45309] bg-[#FFFBEB]";
  const papan = tema === "goni" ? "rounded-2xl border-4 border-[#92400E]" : tema === "layar" ? "rounded-md border-2 border-dashed border-[#86EFAC]" : "rounded-md border-4 border-[#B45309]";
  const warnaKepala = tema === "goni" ? "text-[#92400E]" : tema === "layar" ? "text-[#166534]" : "text-[#7C2D12]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
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
        <LangkahTimbang key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "goni")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#92400E] bg-[#D8B98A] shadow-[0_6px_0_rgba(69,26,3,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#92400E 0 8px,#D8B98A 8px 16px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#92400E 0 8px,#D8B98A 8px 16px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "layar") return <div className="rounded-lg border-[8px] border-[#A16207] bg-[#1F3D2B] shadow-[0_6px_0_rgba(69,26,3,0.4)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#B45309] bg-[#B45309] shadow-[0_6px_0_rgba(69,26,3,0.4)]">{isi}</div>;
}
