"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, ucapkan, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahLoyang } from "./LangkahLoyang";
import { PENUTUP_B, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 5 Bab 3 Sub-Bab B: dua belas tugas lanjutan Misi Loyang
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 sampai 4 dan dari Sub-Bab lain: Concrete = etalase mobil roti berkanopi merah-putih dengan rak kayu, kemajuan berupa deret roti bulat;
 * Pictorial = papan resep biru muda berpetak-petak, berbingkai putus-putus, kemajuan berupa deret batang pecahan; Abstract = nota Toko Roti Keliling berkertas krem bergaris
 * dengan cap TOKO ROTI KELILING, kemajuan berupa deret ceklis. Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab C. Tanpa skor.
 */

type Tema = "rak" | "resep" | "nota";
const LATAR: Record<Tema, React.CSSProperties> = {
  rak: {
    backgroundColor: "#FFF7ED",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(180,83,9,0.12) 0 2px,transparent 2px 26px),repeating-linear-gradient(0deg,rgba(180,83,9,0.1) 0 1px,transparent 1px 34px)",
  },
  resep: {
    backgroundColor: "#EFF6FF",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(37,99,235,0.25) 0 1px,transparent 1px 18px),repeating-linear-gradient(0deg,rgba(37,99,235,0.18) 0 1px,transparent 1px 18px)",
  },
  nota: {
    backgroundColor: "#FFFBEB",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(154,52,18,0.2) 0 1px,transparent 1px 26px),linear-gradient(90deg,rgba(220,38,38,0.45) 0 2px,transparent 2px)",
    backgroundSize: "auto, 34px 100%",
    backgroundRepeat: "repeat, no-repeat",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "rak")
    return (
      <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Roti ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block rounded-full border-2 ${i === nomor ? "h-5 w-5 animate-pulse border-[#9A3412] bg-[#FDE047]" : i < nomor ? "h-4 w-4 border-[#78350F] bg-[#F59E0B]" : "h-3 w-3 border-dashed border-[#9A3412]/50"}`} />
        ))}
      </div>
    );
  if (tema === "resep")
    return (
      <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-px px-2 py-1" aria-label={`Batang ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block border ${i === nomor ? "h-5 w-6 animate-pulse border-[#1D4ED8] bg-[#FDE68A]" : i < nomor ? "h-4 w-6 border-[#1E3A8A] bg-[#93C5FD]" : "h-3 w-6 border-[#1E3A8A]/30"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Ceklis ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block text-[13px] font-black leading-none ${i === nomor ? "animate-pulse text-[#B91C1C]" : i < nomor ? "text-[#9A3412]" : "text-[#9A3412]/30"}`}>
          {i < nomor ? "✔" : "○"}
        </span>
      ))}
    </div>
  );
}

export default function TahapLoyang({
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
  const tema: Tema = rupa === "benda" ? "rak" : rupa === "diagram" ? "resep" : "nota";
  const [s, setS] = useState(0);
  const [l, setL] = useState(0);
  const [benar, setBenar] = useState(false);
  const [akhir, setAkhir] = useState(false);
  const so = soal[s];
  const ls = so?.langkah[l];

  useEffect(() => {
    if (!ls || akhir) return;
    umum.speakGuru(ucapkan(l === 0 ? `${NAMA_CARA[so.cara]}. ${so.cerita} ${ls.suara}` : ls.suara));
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
      <div className="rounded-xl border-[10px] border-[#9A3412] bg-[#9A3412] shadow-[0_6px_0_rgba(124,45,18,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.nota}>
          <p className="text-center text-lg font-black text-[#7C2D12]">
            {"\u{1F4DD}"} Poin Penting: Penjumlahan Pecahan
          </p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#9A3412] bg-white/90 px-3 py-2 text-sm font-bold text-[#431407]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#B91C1C] bg-[#FEE2E2] text-[10px] font-black text-[#7F1D1D]">{i + 1}</span>
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
  const kepala = tema === "rak" ? "rounded-xl border-4 border-[#9A3412] bg-white" : tema === "resep" ? "rounded-md border-2 border-dashed border-[#1D4ED8] bg-white" : "rounded-md border-4 border-[#9A3412] bg-white";
  const papan = tema === "rak" ? "rounded-2xl border-4 border-[#9A3412]" : tema === "resep" ? "rounded-md border-2 border-dashed border-[#1D4ED8]" : "rounded-md border-4 border-[#9A3412]";
  const warnaKepala = tema === "rak" ? "text-[#7C2D12]" : tema === "resep" ? "text-[#1E3A8A]" : "text-[#9A3412]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "rak" ? (
        <div className="mx-auto max-w-[420px] text-center" aria-hidden="true">
          <div className="grid grid-cols-10">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} className={`block h-2.5 border border-[#9A3412] ${i % 2 === 0 ? "bg-[#F87171]" : "bg-white"}`} />
            ))}
          </div>
          <div className="mt-1 rounded-sm border-2 border-[#9A3412] bg-[#FED7AA] px-1.5 text-[10px] font-black text-[#7C2D12]">ETALASE MOBIL ROTI KELILING</div>
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "nota" ? (
            <span className="mt-1 block w-fit -rotate-3 rounded border-2 border-[#B91C1C] bg-[#FEE2E2] px-1 text-[10px] text-[#B91C1C]" aria-hidden="true">
              cap toko roti keliling
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
          <button type="button" onClick={() => umum.speakGuru(ucapkan(ls.suara))} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#475569] bg-[#F1F5F9] px-2 py-1 text-sm">
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
        <LangkahLoyang key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "rak") return <div className="overflow-hidden rounded-3xl border-[8px] border-[#9A3412] bg-[#FFF7ED] shadow-[0_6px_0_rgba(124,45,18,0.35)]">{isi}</div>;
  if (tema === "resep") return <div className="rounded-lg border-[10px] border-dashed border-[#1D4ED8] bg-[#EFF6FF] shadow-[0_6px_0_rgba(30,58,138,0.3)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#9A3412] bg-[#9A3412] shadow-[0_6px_0_rgba(124,45,18,0.4)]">{isi}</div>;
}
