"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahJahit } from "./LangkahJahit";
import { PENUTUP_C, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 4 Bab 2 Sub-Bab C: dua belas tugas lanjutan Misi Jahit
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 sampai 3 dan Sub-Bab lain Bab ini: Concrete = meja jahit beralas kain kotak-kotak merah muda dengan tepi kayu, kemajuan berupa deret gulungan benang;
 * Pictorial = kertas pola jahit krem bergaris putus merah muda, kemajuan berupa deret belah ketupat; Abstract = nota pesanan Kak Sekar berkertas bergaris merah muda dengan cap meteran, kemajuan berupa deret cap bulat.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab D. Tanpa skor.
 */

type Tema = "meja" | "pola" | "nota";
const LATAR: Record<Tema, React.CSSProperties> = {
  meja: {
    backgroundColor: "#FCE7F3",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(190,24,93,0.2) 0 10px,transparent 10px 20px),repeating-linear-gradient(90deg,rgba(190,24,93,0.2) 0 10px,transparent 10px 20px)",
  },
  pola: {
    backgroundColor: "#FEFCE8",
    backgroundImage: "repeating-linear-gradient(135deg,rgba(219,39,119,0.18) 0 2px,transparent 2px 9px),repeating-linear-gradient(0deg,rgba(161,98,7,0.14) 0 1px,transparent 1px 28px)",
  },
  nota: {
    backgroundColor: "#FFF1F2",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(190,24,93,0.22) 0 1px,transparent 1px 26px),linear-gradient(90deg,rgba(37,99,235,0.3) 0 2px,transparent 2px)",
    backgroundSize: "auto, 34px 100%",
    backgroundRepeat: "repeat, no-repeat",
  },
};
const TEPI_KAYU = ["#FBCFE8", "#F9A8D4", "#F472B6", "#FDBA74", "#FCD34D"];

/** Gulungan benang kecil (lingkaran bergaris) untuk kemajuan Concrete. */
function BenangKecil({ keadaan }: { keadaan: "lalu" | "kini" | "nanti" }) {
  const isi = keadaan === "nanti" ? "transparent" : keadaan === "kini" ? "#FBCFE8" : "#EC4899";
  return (
    <svg viewBox="0 0 18 18" width={18} height={18} aria-hidden="true" className={keadaan === "kini" ? "animate-pulse" : ""}>
      <circle cx={9} cy={9} r={7.5} fill={isi} stroke="#9D174D" strokeWidth={1.4} strokeDasharray={keadaan === "nanti" ? "3 2" : undefined} />
      <circle cx={9} cy={9} r={2.4} fill="#FDF2F8" stroke="#9D174D" strokeWidth={1} />
    </svg>
  );
}

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "meja")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Benang ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <BenangKecil key={i} keadaan={i === nomor ? "kini" : i < nomor ? "lalu" : "nanti"} />
        ))}
      </div>
    );
  if (tema === "pola")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1.5 px-2 py-1" aria-label={`Pola ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3 w-3 rotate-45 border-2 ${i === nomor ? "animate-pulse border-[#BE185D] bg-[#FBCFE8]" : i < nomor ? "border-[#BE185D] bg-[#BE185D]" : "border-dashed border-[#BE185D]/50 bg-transparent"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#BE185D] bg-[#FBCFE8]" : i < nomor ? "border-[#9D174D] bg-[#DB2777]" : "border-dashed border-[#9D174D]/50 bg-transparent"}`} />
      ))}
    </div>
  );
}

export default function TahapJahit({
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
  const tema: Tema = rupa === "benda" ? "meja" : rupa === "diagram" ? "pola" : "nota";
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
      <div className="rounded-xl border-[10px] border-[#BE185D] bg-[#BE185D] shadow-[0_6px_0_rgba(131,24,67,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.nota}>
          <p className="text-center text-lg font-black text-[#831843]">
            {"\u{1F457}"} Poin Penting: Pecahan yang Sama Besar
          </p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#9D174D] bg-white/90 px-3 py-2 text-sm font-bold text-[#831843]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#DB2777] bg-[#FCE7F3] text-[10px] font-black text-[#9D174D]">{i + 1}</span>
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
  const kepala = tema === "meja" ? "rounded-xl border-4 border-[#BE185D] bg-white" : tema === "pola" ? "rounded-md border-2 border-dashed border-[#DB2777] bg-white" : "rounded-md border-4 border-[#9D174D] bg-white";
  const papan = tema === "meja" ? "rounded-2xl border-4 border-[#BE185D]" : tema === "pola" ? "rounded-md border-2 border-dashed border-[#DB2777]" : "rounded-md border-4 border-[#9D174D]";
  const warnaKepala = tema === "meja" ? "text-[#9D174D]" : tema === "pola" ? "text-[#BE185D]" : "text-[#831843]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "meja" ? (
        <div className="mx-auto flex max-w-[420px] items-center gap-1" aria-hidden="true">
          <span className="rounded-sm border-2 border-[#BE185D] bg-[#FDF2F8] px-1.5 text-[9px] font-black text-[#9D174D]">MEJA JAHIT</span>
          {TEPI_KAYU.map((w) => (
            <span key={w} className="block h-3 flex-1 rounded-sm border border-[#BE185D]/60" style={{ backgroundColor: w }} />
          ))}
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "nota" ? (
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#BE185D] bg-[#FCE7F3] px-1 text-[10px] text-[#BE185D]" aria-hidden="true">
              {"\u{1F4CF}"} cap
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
        <LangkahJahit key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#BE185D] bg-[#FCE7F3] shadow-[0_6px_0_rgba(131,24,67,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#BE185D 0 4px,#FBCFE8 4px 24px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#BE185D 0 4px,#FBCFE8 4px 24px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "pola") return <div className="rounded-lg border-[10px] border-dashed border-[#DB2777] bg-[#FEFCE8] shadow-[0_6px_0_rgba(131,24,67,0.3)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#BE185D] bg-[#BE185D] shadow-[0_6px_0_rgba(131,24,67,0.4)]">{isi}</div>;
}
