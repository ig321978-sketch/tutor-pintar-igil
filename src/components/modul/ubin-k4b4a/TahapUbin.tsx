"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahUbin } from "./LangkahUbin";
import { PENUTUP_A, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 4 Bab 4 Sub-Bab A: dua belas tugas lanjutan Misi Ubin
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 sampai 3 dan Kelas 4 Bab 1 sampai 3: Concrete = lantai tepi kolam berubin biru muda berselang-seling dengan pita air, kemajuan berupa deret ubin kecil;
 * Pictorial = kertas denah kuning gading berpetak dengan bingkai putus-putus cokelat, kemajuan berupa garis meteran; Abstract = daftar Bu Sinta berkertas biru muda bergaris dengan cap kolam, kemajuan berupa deret tetes.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B. Tanpa skor.
 */

type Tema = "tepi" | "denah" | "daftar";
const LATAR: Record<Tema, React.CSSProperties> = {
  tepi: {
    backgroundColor: "#E0F2FE",
    backgroundImage: "repeating-conic-gradient(#BAE6FD 0% 25%, #F0F9FF 0% 50%)",
    backgroundSize: "30px 30px",
  },
  denah: {
    backgroundColor: "#FEFCE8",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(161,98,7,0.2) 0 1px,transparent 1px 20px),repeating-linear-gradient(90deg,rgba(161,98,7,0.2) 0 1px,transparent 1px 20px)",
  },
  daftar: {
    backgroundColor: "#ECFEFF",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(14,116,144,0.22) 0 1px,transparent 1px 26px),linear-gradient(90deg,rgba(220,38,38,0.35) 0 2px,transparent 2px)",
    backgroundSize: "auto, 34px 100%",
    backgroundRepeat: "repeat, no-repeat",
  },
};
const PITA_AIR = "repeating-linear-gradient(90deg,#38BDF8 0 14px,#BAE6FD 14px 28px)";

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "tepi")
    return (
      <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Ubin ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-4 w-4 rounded-sm border-2 ${i === nomor ? "animate-pulse border-[#0284C7] bg-[#FDE68A]" : i < nomor ? "border-[#075985] bg-[#38BDF8]" : "border-dashed border-[#075985]/50 bg-transparent"}`} />
        ))}
      </div>
    );
  if (tema === "denah")
    return (
      <div className="mx-auto grid max-w-md grid-cols-12 items-end justify-items-center gap-1 px-2 py-1" aria-label={`Garis meteran ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block w-1.5 rounded-sm ${i === nomor ? "h-5 animate-pulse bg-[#D97706]" : i < nomor ? "h-4 bg-[#92400E]" : "h-2.5 bg-[#92400E]/30"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Tetes ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#0E7490] bg-[#A5F3FC]" : i < nomor ? "border-[#155E75] bg-[#0891B2]" : "border-dashed border-[#155E75]/50 bg-transparent"}`} />
      ))}
    </div>
  );
}

export default function TahapUbin({
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
  const tema: Tema = rupa === "benda" ? "tepi" : rupa === "diagram" ? "denah" : "daftar";
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
      <div className="rounded-xl border-[10px] border-[#0E7490] bg-[#0E7490] shadow-[0_6px_0_rgba(8,51,68,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.daftar}>
          <p className="text-center text-lg font-black text-[#164E63]">
            {"\u{1F3CA}"} Poin Penting: Pengukuran Luas
          </p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#155E75] bg-white/90 px-3 py-2 text-sm font-bold text-[#083344]">
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
  const kepala = tema === "tepi" ? "rounded-xl border-4 border-[#0284C7] bg-white" : tema === "denah" ? "rounded-md border-2 border-dashed border-[#A16207] bg-white" : "rounded-md border-4 border-[#0E7490] bg-white";
  const papan = tema === "tepi" ? "rounded-2xl border-4 border-[#0284C7]" : tema === "denah" ? "rounded-md border-2 border-dashed border-[#A16207]" : "rounded-md border-4 border-[#0E7490]";
  const warnaKepala = tema === "tepi" ? "text-[#075985]" : tema === "denah" ? "text-[#92400E]" : "text-[#0E7490]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "tepi" ? (
        <div className="mx-auto max-w-[420px] rounded-sm border-2 border-[#0284C7] bg-white/90 px-1.5 text-center text-[10px] font-black text-[#075985]" aria-hidden="true">
          KOLAM RENANG TIRTA CERIA
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "daftar" ? (
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#0E7490] bg-[#CFFAFE] px-1 text-[10px] text-[#0E7490]" aria-hidden="true">
              {"\u{1F3CA}"} cap
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
        <LangkahUbin key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "tepi")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#0284C7] bg-[#E0F2FE] shadow-[0_6px_0_rgba(7,89,133,0.35)]">
        <div className="h-3" style={{ backgroundImage: PITA_AIR }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: PITA_AIR }} aria-hidden="true" />
      </div>
    );
  if (tema === "denah") return <div className="rounded-lg border-[10px] border-dashed border-[#A16207] bg-[#FEFCE8] shadow-[0_6px_0_rgba(120,53,15,0.3)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#0E7490] bg-[#0E7490] shadow-[0_6px_0_rgba(8,51,68,0.4)]">{isi}</div>;
}
