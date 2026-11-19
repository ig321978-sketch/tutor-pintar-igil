"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahResepsi } from "./LangkahResepsi";
import { PENUTUP_E, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 4 Bab 1 Sub-Bab E: dua belas tugas lanjutan Misi Resepsi
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 sampai 3 dan dari Sub-Bab lain Bab ini: Concrete = meja resepsi hijau berpapan RESEPSI dengan lonceng, kemajuan berupa deret koper kecil;
 * Pictorial = kertas petak biru muda bergaris kolom, kemajuan berupa deret petak kolom; Abstract = lembar tamu resepsi berkertas krem bergaris dengan cap hijau, kemajuan berupa deret cap kecil.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab F. Tanpa skor.
 */

type Tema = "meja" | "petak" | "lembar";
const LATAR: Record<Tema, React.CSSProperties> = {
  meja: {
    backgroundColor: "#D1FAE5",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(22,101,52,0.16) 0 2px,transparent 2px 34px),repeating-linear-gradient(0deg,rgba(255,255,255,0.28) 0 1px,transparent 1px 30px)",
  },
  petak: {
    backgroundColor: "#ECFEFF",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(14,116,144,0.22) 0 1px,transparent 1px 18px),repeating-linear-gradient(90deg,rgba(14,116,144,0.22) 0 1px,transparent 1px 18px)",
  },
  lembar: {
    backgroundColor: "#FFFBEB",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(21,128,61,0.2) 0 1px,transparent 1px 26px),linear-gradient(90deg,rgba(220,38,38,0.35) 0 2px,transparent 2px)",
    backgroundSize: "auto, 34px 100%",
    backgroundRepeat: "repeat, no-repeat",
  },
};

/** Satu koper kecil untuk kemajuan Concrete. */
function KoperKecil({ aktif, selesai }: { aktif: boolean; selesai: boolean }) {
  return (
    <span aria-hidden="true" className={`relative block h-4 w-5 rounded-[4px] border-2 ${aktif ? "animate-pulse border-[#14532D] bg-[#FDE68A]" : selesai ? "border-[#14532D] bg-[#16A34A]" : "border-dashed border-[#14532D]/40 bg-transparent"}`}>
      <span className="absolute -top-[5px] left-1/2 block h-[4px] w-[8px] -translate-x-1/2 rounded-t-sm border-2 border-b-0 border-[#14532D]/70" />
    </span>
  );
}

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "meja")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1.5 px-2 py-1.5" aria-label={`Koper ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <KoperKecil key={i} aktif={i === nomor} selesai={i < nomor} />
        ))}
      </div>
    );
  if (tema === "petak")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-0.5 px-2 py-1" aria-label={`Petak ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-4 w-3.5 border-2 ${i === nomor ? "animate-pulse border-[#0E7490] bg-[#A5F3FC]" : i < nomor ? "border-[#0E7490] bg-[#22D3EE]" : "border-dashed border-[#0E7490]/50 bg-transparent"}`} />
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

export default function TahapResepsi({
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
  const tema: Tema = rupa === "benda" ? "meja" : rupa === "diagram" ? "petak" : "lembar";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_E}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-xl border-[10px] border-[#15803D] bg-[#15803D] shadow-[0_6px_0_rgba(20,83,45,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.lembar}>
          <p className="text-center text-lg font-black text-[#14532D]">{"\u{1F6CE}"} Poin Penting: Menjumlahkan sampai 1.000</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#14532D] bg-white/90 px-3 py-2 text-sm font-bold text-[#14532D]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#DC2626] bg-[#FEE2E2] text-[10px] font-black text-[#991B1B]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F4E3}"} {PENUTUP_E}
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
  const kepala = tema === "meja" ? "rounded-xl border-4 border-[#166534] bg-white" : tema === "petak" ? "rounded-md border-2 border-dashed border-[#0E7490] bg-white" : "rounded-md border-4 border-[#15803D] bg-white";
  const papan = tema === "meja" ? "rounded-2xl border-4 border-[#166534]" : tema === "petak" ? "rounded-md border-2 border-dashed border-[#0E7490]" : "rounded-md border-4 border-[#15803D]";
  const warnaKepala = tema === "meja" ? "text-[#166534]" : tema === "petak" ? "text-[#0E7490]" : "text-[#15803D]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "meja" ? (
        <div className="mx-auto flex max-w-[420px] items-center gap-1" aria-hidden="true">
          <span className="rounded-sm border-2 border-[#166534] bg-[#FEF3C7] px-1.5 text-[9px] font-black text-[#166534]">
            {"\u{1F6CE}"} RESEPSI
          </span>
          {["#FCA5A5", "#FDE047", "#86EFAC", "#93C5FD", "#F9A8D4"].map((w) => (
            <span key={w} className="block h-3 flex-1 rounded-sm border border-[#166534]/60" style={{ backgroundColor: w }} />
          ))}
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "lembar" ? (
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#15803D] bg-[#DCFCE7] px-1 text-[10px] text-[#15803D]" aria-hidden="true">
              {"\u{1F6CE}"} cap
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
        <LangkahResepsi key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#166534] bg-[#D1FAE5] shadow-[0_6px_0_rgba(20,83,45,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#166534 0 4px,#A7F3D0 4px 44px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#166534 0 4px,#A7F3D0 4px 44px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "petak") return <div className="rounded-lg border-[10px] border-[#0E7490] bg-[#ECFEFF] shadow-[0_6px_0_rgba(8,51,68,0.4)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#15803D] bg-[#15803D] shadow-[0_6px_0_rgba(20,83,45,0.4)]">{isi}</div>;
}
