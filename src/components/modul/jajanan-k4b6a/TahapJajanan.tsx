"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahJajanan } from "./LangkahJajanan";
import { PENUTUP_A, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 4 Bab 6 Sub-Bab A: dua belas tugas lanjutan Misi Jajanan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 sampai 3 dan Kelas 4 Bab 1 sampai 5: Concrete = tenda bazar berawning merah-putih dengan papan BAZAR KULINER SEKOLAH, kemajuan berupa deret lampu bohlam;
 * Pictorial = kertas berpetak hijau muda berbingkai putus-putus hijau, kemajuan berupa deret kotak tabel; Abstract = lembar panitia bazar berkertas ungu muda bergaris dengan cap PANITIA BAZAR, kemajuan berupa deret ceklis.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B. Tanpa skor.
 */

type Tema = "tenda" | "kertas" | "lembar";
const LATAR: Record<Tema, React.CSSProperties> = {
  tenda: {
    backgroundColor: "#FFF1F2",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(220,38,38,0.12) 0 18px,transparent 18px 36px)",
  },
  kertas: {
    backgroundColor: "#F0FDF4",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(22,163,74,0.2) 0 1px,transparent 1px 20px),repeating-linear-gradient(90deg,rgba(22,163,74,0.2) 0 1px,transparent 1px 20px)",
  },
  lembar: {
    backgroundColor: "#FAF5FF",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(126,34,206,0.2) 0 1px,transparent 1px 26px),linear-gradient(90deg,rgba(220,38,38,0.35) 0 2px,transparent 2px)",
    backgroundSize: "auto, 34px 100%",
    backgroundRepeat: "repeat, no-repeat",
  },
};
const AWNING = "repeating-linear-gradient(90deg,#DC2626 0 20px,#FFFFFF 20px 40px)";

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "tenda")
    return (
      <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Lampu ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-4 w-4 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#CA8A04] bg-[#FEF08A]" : i < nomor ? "border-[#CA8A04] bg-[#FACC15]" : "border-dashed border-[#991B1B]/50 bg-transparent"}`} />
        ))}
      </div>
    );
  if (tema === "kertas")
    return (
      <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Kotak ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block rounded-sm border-2 ${i === nomor ? "h-5 w-5 animate-pulse border-[#16A34A] bg-[#BBF7D0]" : i < nomor ? "h-4 w-4 border-[#166534] bg-[#4ADE80]" : "h-3 w-3 border-[#166534]/30"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto grid max-w-md grid-cols-12 items-center justify-items-center gap-1 px-2 py-1" aria-label={`Ceklis ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block text-[13px] font-black leading-none ${i === nomor ? "animate-pulse text-[#B91C1C]" : i < nomor ? "text-[#7E22CE]" : "text-[#7E22CE]/30"}`}>
          {i < nomor ? "✔" : "○"}
        </span>
      ))}
    </div>
  );
}

export default function TahapJajanan({
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
  const tema: Tema = rupa === "benda" ? "tenda" : rupa === "diagram" ? "kertas" : "lembar";
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
      <div className="rounded-xl border-[10px] border-[#7E22CE] bg-[#7E22CE] shadow-[0_6px_0_rgba(59,7,100,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.lembar}>
          <p className="text-center text-lg font-black text-[#581C87]">
            {"\u{1F4DD}"} Poin Penting: Piktogram
          </p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#7E22CE] bg-white/90 px-3 py-2 text-sm font-bold text-[#3B0764]">
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
  const kepala = tema === "tenda" ? "rounded-xl border-4 border-[#DC2626] bg-white" : tema === "kertas" ? "rounded-md border-2 border-dashed border-[#16A34A] bg-white" : "rounded-md border-4 border-[#7E22CE] bg-white";
  const papan = tema === "tenda" ? "rounded-2xl border-4 border-[#DC2626]" : tema === "kertas" ? "rounded-md border-2 border-dashed border-[#16A34A]" : "rounded-md border-4 border-[#7E22CE]";
  const warnaKepala = tema === "tenda" ? "text-[#991B1B]" : tema === "kertas" ? "text-[#166534]" : "text-[#6B21A8]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "tenda" ? (
        <div className="mx-auto max-w-[420px] rounded-sm border-2 border-[#991B1B] bg-[#FEF3C7] px-1.5 text-center text-[10px] font-black text-[#991B1B]" aria-hidden="true">
          BAZAR KULINER SEKOLAH
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "lembar" ? (
            <span className="mt-1 block w-fit -rotate-3 rounded border-2 border-[#B91C1C] bg-[#FEE2E2] px-1 text-[10px] text-[#B91C1C]" aria-hidden="true">
              cap panitia
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
        <LangkahJajanan key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "tenda")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#DC2626] bg-[#FFF1F2] shadow-[0_6px_0_rgba(127,29,29,0.35)]">
        <div className="h-4" style={{ backgroundImage: AWNING }} aria-hidden="true" />
        {isi}
      </div>
    );
  if (tema === "kertas") return <div className="rounded-lg border-[10px] border-dashed border-[#16A34A] bg-[#F0FDF4] shadow-[0_6px_0_rgba(20,83,45,0.3)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#7E22CE] bg-[#7E22CE] shadow-[0_6px_0_rgba(59,7,100,0.4)]">{isi}</div>;
}
