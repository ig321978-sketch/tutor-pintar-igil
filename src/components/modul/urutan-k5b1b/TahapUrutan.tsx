"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahUrutan } from "./LangkahUrutan";
import { PENUTUP_B, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Sub-Bab B (membandingkan dan mengurutkan bilangan): dua belas tugas lanjutan Misi Urutan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru:
 * Concrete = papan tiket di tribun berundak oranye, kemajuan berupa deret tiket; Pictorial = kertas garis bilangan ungu muda bergaris tegak, kemajuan berupa deret titik pada garis;
 * Abstract = lembar angka panitia berkertas ungu muda bergaris dengan cap bundar, kemajuan berupa deret cap kecil.
 * Abstract diakhiri Poin Penting dengan jembatan ke Sub-Bab C (Bu Lestari datang membawa bundel tiket). Tanpa skor.
 */

type Tema = "tribun" | "kertas" | "daftar";
const LATAR: Record<Tema, React.CSSProperties> = {
  tribun: {
    backgroundColor: "#FFF7ED",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(234,88,12,0.14) 0 26px,transparent 26px 52px),radial-gradient(circle at 80% 14%,rgba(255,255,255,0.8) 0 16px,transparent 17px)",
  },
  kertas: {
    backgroundColor: "#F8FAFC",
    backgroundImage: "linear-gradient(90deg,rgba(124,58,237,0.2) 1px,transparent 1px),linear-gradient(rgba(124,58,237,0.1) 1px,transparent 1px)",
    backgroundSize: "40px 14px",
  },
  daftar: {
    backgroundColor: "#FAF5FF",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(126,34,206,0.2) 0 1px,transparent 1px 28px),radial-gradient(ellipse at 82% 10%,rgba(126,34,206,0.12),transparent 55%)",
  },
};
/** Hiasan di atas tahap Concrete: kartu bernada stadion beremoji lama. */
const RAK_MINI = ["🎫", "🧣", "🚩", "🏆", "🧢"];
function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "tribun")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-0.5 px-2 py-1" aria-label={`Tiket ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`text-base leading-none ${i === nomor ? "animate-pulse" : ""} ${i <= nomor ? "" : "opacity-30 grayscale"}`}>
            {"\u{1F3AB}"}
          </span>
        ))}
      </div>
    );
  if (tema === "kertas")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Titik ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`block h-3 w-3 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#7C3AED] bg-[#DDD6FE]" : i < nomor ? "border-[#4C1D95] bg-[#A78BFA]" : "border-dashed border-[#7C3AED]/60 bg-transparent"}`}
          />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#7E22CE] bg-[#E9D5FF]" : i < nomor ? "border-[#7E22CE] bg-[#A855F7]" : "border-dashed border-[#7E22CE]/50 bg-transparent"}`} />
      ))}
    </div>
  );
}

export default function TahapUrutan({
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
  const tema: Tema = rupa === "benda" ? "tribun" : rupa === "diagram" ? "kertas" : "daftar";
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
      <div className="rounded-xl border-[10px] border-[#7E22CE] bg-[#7E22CE] shadow-[0_6px_0_rgba(59,7,100,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.daftar}>
          <p className="text-center text-lg font-black text-[#581C87]">Poin Penting: Membandingkan dan Mengurutkan</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#7E22CE] bg-white/90 px-3 py-2 text-sm font-bold text-[#3B0764]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#DC2626] bg-[#FEE2E2] text-[10px] font-black text-[#991B1B]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FAF5FF] px-3 py-2 text-center text-sm font-black text-[#78350F]" data-uji="jembatan">
            {"📣"} {PENUTUP_B}
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
  const kepala = tema === "tribun" ? "rounded-xl border-4 border-[#C2410C] bg-white" : tema === "kertas" ? "rounded-md border-2 border-dashed border-[#7C3AED] bg-[#F5F3FF]" : "rounded-md border-4 border-[#7E22CE] bg-[#FAF5FF]";
  const papan = tema === "tribun" ? "rounded-2xl border-4 border-[#C2410C]" : tema === "kertas" ? "rounded-md border-2 border-dashed border-[#7C3AED]" : "rounded-md border-4 border-[#7E22CE]";
  const warnaKepala = tema === "kertas" ? "text-[#4C1D95]" : "text-[#581C87]";
  const warnaJudul = "text-[#1C01A5]";
  const warnaCerita = "text-[#1C01A5]/80";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "tribun" ? (
        <div className="mx-auto flex max-w-[420px] justify-around rounded-md bg-white/80 px-2" aria-hidden="true">
          {RAK_MINI.map((e, i) => (
            <span key={i} className="text-lg leading-none">
              {e}
            </span>
          ))}
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "daftar" ? (
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#7E22CE] bg-[#FEE2E2] px-1 text-[10px] text-[#991B1B]" aria-hidden="true">
              cap panitia
            </span>
          ) : null}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${warnaCerita}`}>{so.cerita}</p>
      </div>

      <Kemajuan tema={tema} nomor={nomor} total={total} />

      <div className="flex justify-center gap-1.5">
        {soal.map((x, i) => (
          <span key={x.cara} className={`rounded-full px-2.5 py-0.5 text-xs font-black ${i === s ? "bg-[#FACC15] text-[#1C01A5]" : i < s ? "bg-[#DCFCE7] text-[#C2410C]" : "bg-white/80 text-[#1C01A5]/50"}`}>
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
        <LangkahUrutan key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "tribun")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#C2410C] bg-white shadow-[0_6px_0_rgba(124,45,18,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#EA580C 0 26px,#FB923C 26px 52px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#EA580C 0 26px,#FB923C 26px 52px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "kertas") return <div className="rounded-lg border-[6px] border-double border-[#7C3AED] bg-[#F5F3FF] shadow-[0_6px_0_rgba(76,29,149,0.3)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#7E22CE] bg-[#7E22CE] shadow-[0_6px_0_rgba(59,7,100,0.4)]">{isi}</div>;
}
