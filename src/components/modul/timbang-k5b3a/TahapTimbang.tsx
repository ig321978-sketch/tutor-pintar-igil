"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahTimbang } from "./LangkahTimbang";
import { TeksPecahan } from "./GambarTimbang";
import { PENUTUP_A, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 5 Bab 3 Sub-Bab A: dua belas tugas lanjutan Misi Timbang
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 sampai 4 dan Bab 1 dan 2: Concrete = etalase roti berkayu dengan kanopi merah muda dan papan TOKO ROTI KELILING, kemajuan berupa deret roti;
 * Pictorial = kertas bar pecahan putih kehijauan berpetak berbingkai putus-putus, kemajuan berupa deret bar kecil berarsir; Abstract = lembar toko berkertas krem bergaris dengan cap TOKO ROTI KELILING,
 * kemajuan berupa deret ceklis. Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B. Tanpa skor.
 */

type Tema = "etalase" | "kertas" | "lembar";
const LATAR: Record<Tema, React.CSSProperties> = {
  etalase: {
    backgroundColor: "#FFF7ED",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(180,83,9,0.13) 0 2px,transparent 2px 34px)",
  },
  kertas: {
    backgroundColor: "#F0FDFA",
    backgroundImage: "linear-gradient(0deg,rgba(15,118,110,0.16) 1px,transparent 1px),linear-gradient(90deg,rgba(15,118,110,0.16) 1px,transparent 1px)",
    backgroundSize: "24px 24px",
  },
  lembar: {
    backgroundColor: "#FFFBEB",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(159,18,57,0.18) 0 1px,transparent 1px 26px),linear-gradient(90deg,rgba(159,18,57,0.4) 0 2px,transparent 2px)",
    backgroundSize: "auto, 34px 100%",
    backgroundRepeat: "repeat, no-repeat",
  },
};
const KANOPI = "repeating-linear-gradient(90deg,#F472B6 0 16px,#FFFFFF 16px 32px)";

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "etalase")
    return (
      <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Roti ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block text-[15px] leading-none ${i === nomor ? "animate-pulse" : i < nomor ? "" : "opacity-25 grayscale"}`}>
            {"\u{1F35E}"}
          </span>
        ))}
      </div>
    );
  if (tema === "kertas")
    return (
      <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Bar ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3 w-4 rounded-sm border-2 ${i === nomor ? "animate-pulse border-[#0F766E] bg-[#99F6E4]" : i < nomor ? "border-[#134E4A] bg-[#14B8A6]" : "border-dashed border-[#0F766E]/45 bg-white"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Ceklis ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block text-[13px] font-black leading-none ${i === nomor ? "animate-pulse text-[#9F1239]" : i < nomor ? "text-[#881337]" : "text-[#9F1239]/30"}`}>
          {i < nomor ? "✔" : "○"}
        </span>
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
  const tema: Tema = rupa === "benda" ? "etalase" : rupa === "diagram" ? "kertas" : "lembar";
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
      <div className="rounded-xl border-[10px] border-[#9F1239] bg-[#9F1239] shadow-[0_6px_0_rgba(76,5,25,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.lembar}>
          <p className="text-center text-lg font-black text-[#881337]">
            {"\u{1F35E}"} Poin Penting: Membandingkan Pecahan
          </p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#9F1239] bg-white/90 px-3 py-2 text-sm font-bold text-[#4C0519]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#9F1239] bg-[#FFE4E6] text-[10px] font-black text-[#881337]">{i + 1}</span>
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
  const kepala = tema === "etalase" ? "rounded-xl border-4 border-[#B45309] bg-white" : tema === "kertas" ? "rounded-md border-2 border-dashed border-[#0F766E] bg-white" : "rounded-md border-4 border-[#9F1239] bg-white";
  const papan = tema === "etalase" ? "rounded-2xl border-4 border-[#B45309]" : tema === "kertas" ? "rounded-md border-2 border-dashed border-[#0F766E]" : "rounded-md border-4 border-[#9F1239]";
  const warnaKepala = tema === "etalase" ? "text-[#78350F]" : tema === "kertas" ? "text-[#115E59]" : "text-[#881337]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "etalase" ? (
        <div className="mx-auto max-w-[420px] rounded-sm border-2 border-[#9F1239] bg-[#FBCFE8] px-1.5 text-center text-[10px] font-black text-[#831843]" aria-hidden="true">
          ETALASE TOKO ROTI KELILING
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "lembar" ? (
            <span className="mt-1 block w-fit -rotate-3 rounded border-2 border-[#9F1239] bg-[#FFE4E6] px-1 text-[10px] text-[#881337]" aria-hidden="true">
              cap toko
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
            <p className="text-sm font-black text-[#1C01A5]">
              <TeksPecahan t={ls.judul} />
            </p>
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
  if (tema === "etalase")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#B45309] bg-[#FFF7ED] shadow-[0_6px_0_rgba(120,53,15,0.35)]">
        <div className="h-4" style={{ backgroundImage: KANOPI }} aria-hidden="true" />
        {isi}
      </div>
    );
  if (tema === "kertas") return <div className="rounded-lg border-[10px] border-dashed border-[#0F766E] bg-[#F0FDFA] shadow-[0_6px_0_rgba(19,78,74,0.3)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#9F1239] bg-[#9F1239] shadow-[0_6px_0_rgba(76,5,25,0.4)]">{isi}</div>;
}
