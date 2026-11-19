"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahSudut } from "./LangkahSudut";
import { PENUTUP_B, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 3 Bab 4 Sub-Bab B: dua belas tugas lanjutan Misi Sudut
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8, Kelas 2 Bab 1 sampai 8, Kelas 3 Bab 1 sampai 3, dan Sub-Bab lain Bab ini: Concrete = tanah lapang berumput dengan patok, kemajuan berupa deret layang-layang yang naik;
 * Pictorial = papan busur kayu terang bergaris biru, kemajuan berupa deret busur kecil; Abstract = lembar Kak Anton berkertas biru pucat dengan cap topi biru, kemajuan berupa deret cap.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab C. Tanpa skor.
 */

type Tema = "rumput" | "busur" | "lembar";
const LATAR: Record<Tema, React.CSSProperties> = {
  rumput: {
    backgroundColor: "#DCFCE7",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(21,128,61,0.2) 0 2px,transparent 2px 26px),repeating-linear-gradient(90deg,rgba(255,255,255,0.3) 0 1px,transparent 1px 52px)",
  },
  busur: {
    backgroundColor: "#FDE9C4",
    backgroundImage: "linear-gradient(rgba(37,99,235,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(180,120,60,0.2) 1px,transparent 1px)",
    backgroundSize: "24px 24px",
  },
  lembar: {
    backgroundColor: "#EFF6FF",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(37,99,235,0.22) 0 1px,transparent 1px 26px),linear-gradient(90deg,transparent 0 30px,rgba(220,38,38,0.35) 30px 31px,transparent 31px)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "rumput")
    return (
      <div className="mx-auto flex h-12 max-w-md flex-wrap items-end justify-center gap-0.5 px-2 py-1" aria-label={`Layang-layang ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" style={{ marginBottom: `${Math.round((i / total) * 14)}px` }} className={`text-base leading-none ${i === nomor ? "animate-pulse" : ""} ${i <= nomor ? "" : "opacity-30 grayscale"}`}>
            {"\u{1FA81}"}
          </span>
        ))}
      </div>
    );
  if (tema === "busur")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 px-2 py-1" aria-label={`Busur ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-2.5 w-5 rounded-t-full border-2 border-b-0 ${i === nomor ? "animate-pulse border-[#1D4ED8] bg-[#93C5FD]" : i < nomor ? "border-[#1E3A8A] bg-[#2563EB]" : "border-dashed border-[#2563EB]/60 bg-transparent"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3.5 w-3.5 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#1D4ED8] bg-white" : i < nomor ? "border-[#1E3A8A] bg-[#2563EB]" : "border-[#2563EB]/40 bg-transparent"}`} />
      ))}
    </div>
  );
}

export default function TahapSudut({
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
  const tema: Tema = rupa === "benda" ? "rumput" : rupa === "diagram" ? "busur" : "lembar";
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
      <div className="rounded-xl border-[10px] border-[#1D4ED8] bg-[#1D4ED8] shadow-[0_6px_0_rgba(30,58,138,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.lembar}>
          <p className="text-center text-lg font-black text-[#1E3A8A]">{"\u{1F9E2}"} Poin Penting: Sudut pada Bidang Datar</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#93C5FD] bg-white px-3 py-2 text-sm font-bold text-[#1E3A8A]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#1D4ED8] text-[10px] font-black text-[#1D4ED8]">{i + 1}</span>
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
  const kepala = tema === "rumput" ? "rounded-xl border-4 border-[#15803D] bg-white" : tema === "busur" ? "rounded-md border-2 border-dashed border-[#2563EB] bg-[#FFF7E6]" : "relative rounded-md border-2 border-[#93C5FD] bg-white pr-14";
  const papan = tema === "rumput" ? "rounded-2xl border-4 border-[#15803D]" : tema === "busur" ? "rounded-md border-2 border-dashed border-[#2563EB]" : "rounded-md border-2 border-[#93C5FD]";
  const warnaKepala = tema === "rumput" ? "text-[#15803D]" : tema === "busur" ? "text-[#1D4ED8]" : "text-[#1E40AF]";
  const warnaJudul = "text-[#1C01A5]";
  const warnaCerita = "text-[#1C01A5]/80";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "rumput" ? <div className="mx-auto h-4 max-w-[420px] rounded-sm" style={{ backgroundImage: "repeating-linear-gradient(90deg,#92400E 0 5px,transparent 5px 20px)" }} aria-hidden="true" /> : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${warnaCerita}`}>{so.cerita}</p>
        {tema === "lembar" ? (
          <span className="absolute right-2 top-2 flex h-10 w-10 -rotate-12 items-center justify-center rounded-full border-4 border-double border-[#1D4ED8] text-center text-[7px] font-black leading-none text-[#1D4ED8]" aria-hidden="true">
            TOPI BIRU
          </span>
        ) : null}
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
        <LangkahSudut key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "rumput")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#15803D] bg-[#DCFCE7] shadow-[0_6px_0_rgba(20,83,45,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#92400E 0 6px,#86EFAC 6px 22px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#92400E 0 6px,#86EFAC 6px 22px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "busur") return <div className="rounded-lg border-[6px] border-double border-[#B45309] bg-[#FDE9C4] shadow-[0_6px_0_rgba(120,53,15,0.3)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#1D4ED8] bg-[#1D4ED8] shadow-[0_6px_0_rgba(30,58,138,0.4)]">{isi}</div>;
}
