"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahPapan } from "./LangkahPapan";
import { PENUTUP_A, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 3 Bab 5 Sub-Bab A: dua belas tugas lanjutan Misi Catatan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8, Kelas 2 Bab 1 sampai 8, Kelas 3 Bab 1 sampai 4, dan Sub-Bab lain Bab ini: Concrete = etalase bengkel dengan rak kayu dan papan harga, kemajuan berupa deret ban kecil;
 * Pictorial = papan tulis hijau tua berkapur, kemajuan berupa deret garis turus; Abstract = daftar catatan Pak Hasan berkertas bergaris dengan cap sepeda, kemajuan berupa deret cap kecil.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B. Tanpa skor.
 */

type Tema = "etalase" | "kapur" | "catatan";
const LATAR: Record<Tema, React.CSSProperties> = {
  etalase: {
    backgroundColor: "#F3D9A4",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(124,45,18,0.22) 0 2px,transparent 2px 38px),repeating-linear-gradient(90deg,rgba(255,255,255,0.2) 0 1px,transparent 1px 30px)",
  },
  kapur: {
    backgroundColor: "#1F6B3A",
    backgroundImage: "radial-gradient(ellipse at 20% 15%,rgba(255,255,255,0.14),transparent 55%),radial-gradient(ellipse at 80% 85%,rgba(255,255,255,0.08),transparent 50%)",
  },
  catatan: {
    backgroundColor: "#FBF3DC",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(37,99,235,0.2) 0 1px,transparent 1px 26px),linear-gradient(90deg,rgba(220,38,38,0.35) 0 2px,transparent 2px)",
    backgroundSize: "auto, 34px 100%",
    backgroundRepeat: "repeat, no-repeat",
  },
};
const TAG_HARGA = ["#FCA5A5", "#FDE047", "#86EFAC", "#93C5FD", "#F9A8D4"];

/** Satu bundel turus kecil (empat tegak dan satu miring) untuk kemajuan Pictorial. */
function GrupTurus({ isi, aktif }: { isi: number; aktif: boolean }) {
  return (
    <svg viewBox="0 0 24 16" width={24} height={16} aria-hidden="true" className={aktif ? "animate-pulse" : ""}>
      {Array.from({ length: Math.min(isi, 4) }, (_, i) => (
        <line key={i} x1={4 + i * 5} y1={1} x2={4 + i * 5} y2={15} stroke="#FEF9C3" strokeWidth={1.8} strokeLinecap="round" />
      ))}
      {isi >= 5 ? <line x1={1} y1={12} x2={23} y2={4} stroke="#FCA5A5" strokeWidth={1.8} strokeLinecap="round" /> : null}
    </svg>
  );
}

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "etalase")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Ban ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-4 w-4 rounded-full border-[3px] ${i === nomor ? "animate-pulse border-[#1F2937] bg-[#FDE68A]" : i < nomor ? "border-[#1F2937] bg-[#9CA3AF]" : "border-dashed border-[#1F2937]/40 bg-transparent"}`} />
        ))}
      </div>
    );
  if (tema === "kapur") {
    const grup = Math.ceil(total / 5);
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Turus ${Math.min(nomor, total)} dari ${total}`}>
        {Array.from({ length: grup }, (_, g) => {
          const dalam = Math.min(5, total - g * 5);
          const selesai = Math.max(0, Math.min(dalam, nomor - g * 5 - 1));
          return <GrupTurus key={g} isi={selesai} aktif={nomor - 1 >= g * 5 && nomor - 1 < g * 5 + dalam} />;
        })}
      </div>
    );
  }
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-sm border-2 ${i === nomor ? "animate-pulse border-[#1D4ED8] bg-[#BFDBFE]" : i < nomor ? "border-[#1E3A8A] bg-[#2563EB]" : "border-dashed border-[#1E3A8A]/50 bg-transparent"}`} />
      ))}
    </div>
  );
}

export default function TahapPapan({
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
  const tema: Tema = rupa === "benda" ? "etalase" : rupa === "diagram" ? "kapur" : "catatan";
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
      <div className="rounded-xl border-[10px] border-[#1D4ED8] bg-[#1D4ED8] shadow-[0_6px_0_rgba(30,58,138,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.catatan}>
          <p className="text-center text-lg font-black text-[#1E3A8A]">{"\u{1F6B2}"} Poin Penting: Data, Jangkauan, dan Turus</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#1E3A8A] bg-white/90 px-3 py-2 text-sm font-bold text-[#1E3A8A]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#DC2626] bg-[#FEE2E2] text-[10px] font-black text-[#991B1B]">{i + 1}</span>
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
  const kepala = tema === "etalase" ? "rounded-xl border-4 border-[#92400E] bg-white" : tema === "kapur" ? "rounded-md border-2 border-dashed border-[#FEF9C3] bg-[#14532D]" : "rounded-md border-4 border-[#1D4ED8] bg-white";
  const papan = tema === "etalase" ? "rounded-2xl border-4 border-[#92400E]" : tema === "kapur" ? "rounded-md border-2 border-dashed border-[#FEF9C3]" : "rounded-md border-4 border-[#1D4ED8]";
  const warnaKepala = tema === "etalase" ? "text-[#92400E]" : tema === "kapur" ? "text-[#FEF9C3]" : "text-[#1D4ED8]";
  const warnaJudul = tema === "kapur" ? "text-white" : "text-[#1C01A5]";
  const warnaCerita = tema === "kapur" ? "text-[#FEF9C3]" : "text-[#1C01A5]/80";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "etalase" ? (
        <div className="mx-auto flex max-w-[420px] items-center gap-1" aria-hidden="true">
          <span className="rounded-sm border-2 border-[#92400E] bg-[#FEF3C7] px-1.5 text-[9px] font-black text-[#92400E]">BENGKEL SEPEDA</span>
          {TAG_HARGA.map((w) => (
            <span key={w} className="block h-3 flex-1 rounded-sm border border-[#92400E]/60" style={{ backgroundColor: w }} />
          ))}
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "catatan" ? (
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#1D4ED8] bg-[#DBEAFE] px-1 text-[10px] text-[#1D4ED8]" aria-hidden="true">
              {"\u{1F6B2}"} cap
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
        <LangkahPapan key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#92400E] bg-[#F3D9A4] shadow-[0_6px_0_rgba(69,26,3,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#92400E 0 4px,#E7C48F 4px 44px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#92400E 0 4px,#E7C48F 4px 44px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "kapur") return <div className="rounded-lg border-[10px] border-[#8B5A2B] bg-[#1F6B3A] shadow-[0_6px_0_rgba(69,26,3,0.4)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#1D4ED8] bg-[#1D4ED8] shadow-[0_6px_0_rgba(30,58,138,0.4)]">{isi}</div>;
}
