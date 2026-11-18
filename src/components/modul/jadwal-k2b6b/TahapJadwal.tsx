"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahJadwal } from "./LangkahJadwal";
import { PENUTUP_B, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 6 Sub-Bab B: dua belas tugas lanjutan Misi Pos Waktu
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru, berbeda dari
 * Kelas 1 dan Kelas 2 Bab 1 sampai 5: Concrete = lapangan hijau bergaris putih dengan papan jadwal berbingkai biru, kemajuan berupa deretan kerucut oranye
 * yang terpasang; Pictorial = lembar jalur jam berkisi biru muda, kemajuan berupa jalur kotak yang terisi; Abstract = panggung penutup berlampu sorot
 * dengan kartu putih, kemajuan berupa bintang yang menyala. Abstract diakhiri perayaan akhir cerita bab (spanduk HARI OLAHRAGA dan konfeti), lalu Poin Penting.
 * Tanpa skor.
 */

type Tema = "lapangan" | "jalur" | "panggung";
const LATAR: Record<Tema, React.CSSProperties> = {
  lapangan: {
    backgroundColor: "#86EFAC",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(255,255,255,0.55) 0 3px,transparent 3px 46px),repeating-linear-gradient(0deg,rgba(22,101,52,0.12) 0 8px,transparent 8px 16px)",
  },
  jalur: {
    backgroundColor: "#EFF6FF",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(37,99,235,0.14) 0 1px,transparent 1px 22px),repeating-linear-gradient(90deg,rgba(37,99,235,0.14) 0 1px,transparent 1px 22px)",
  },
  panggung: {
    backgroundColor: "#312E81",
    backgroundImage: "radial-gradient(ellipse at 50% 0%,rgba(254,240,138,0.45) 0 28%,transparent 62%)",
  },
};
const WARNA_KONFETI = ["#EF4444", "#FACC15", "#3B82F6", "#22C55E"];
const KONFETI = Array.from({ length: 22 }, (_, i) => ({ kiri: (i * 37) % 100, tunda: ((i * 53) % 20) / 10, warna: WARNA_KONFETI[i % 4], lebar: 6 + (i % 3) * 2 }));
const CSS_KONFETI = `
@keyframes jd-jatuh{0%{transform:translateY(-12px) rotate(0)}100%{transform:translateY(190px) rotate(300deg)}}
.jd-konfeti{animation:jd-jatuh 2.6s linear infinite}
@media (prefers-reduced-motion:reduce){.jd-konfeti{animation:none}}
`;

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "lapangan")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 px-1" aria-label={`Kerucut ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 16 18" className={`h-4 w-3.5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <polygon points="8,1 14,15 2,15" fill={i < nomor ? "#F97316" : "transparent"} stroke="#9A3412" strokeWidth={i <= nomor ? 1.6 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} strokeLinejoin="round" />
            <rect x="1" y="15" width="14" height="2.4" fill={i < nomor ? "#9A3412" : "transparent"} stroke="#9A3412" strokeWidth={0.8} />
          </svg>
        ))}
      </div>
    );
  if (tema === "jalur")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center px-2 py-1" aria-label={`Kotak ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} className={`h-3.5 w-4 border-2 border-[#1D4ED8] ${i < nomor ? "bg-[#93C5FD]" : "bg-white/70"} ${i === nomor ? "animate-pulse border-[#1C01A5]" : ""}`} aria-hidden="true" />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-0.5 px-1" aria-label={`Bintang ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-4 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
          <polygon points="10,1 12.6,7.4 19,7.6 14,11.8 15.7,18.4 10,14.7 4.3,18.4 6,11.8 1,7.6 7.4,7.4" fill={i < nomor ? "#FACC15" : "transparent"} stroke="#FDE68A" strokeWidth={i <= nomor ? 1.6 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

export default function TahapJadwal({
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
  const tema: Tema = rupa === "benda" ? "lapangan" : rupa === "diagram" ? "jalur" : "panggung";
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
      umum.speakGuru(`Hari Olahraga selesai! Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_B}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-3xl border-[8px] border-[#4338CA] bg-[#312E81] shadow-[0_6px_0_rgba(30,27,75,0.45)]">
        <style>{CSS_KONFETI}</style>
        <div className="relative space-y-3 overflow-hidden rounded-xl p-4" style={LATAR.panggung}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[190px]" aria-hidden="true">
            {KONFETI.map((k, i) => (
              <span key={i} className="jd-konfeti absolute top-0 block rounded-[1px]" style={{ left: `${k.kiri}%`, width: k.lebar, height: k.lebar + 3, background: k.warna, animationDelay: `${k.tunda}s` }} />
            ))}
          </div>
          <p className="relative rounded-xl border-4 border-[#DC2626] bg-[#FECACA] px-3 py-2 text-center text-2xl font-black tracking-widest text-[#991B1B]">
            {"\u{1F389}"} HARI OLAHRAGA {"\u{1F389}"}
          </p>
          <p className="relative text-center text-lg font-black text-[#FEF08A]">{"\u{1F4CC}"} Poin Penting: Waktu dan Jam</p>
          <ul className="relative space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-[#C7D2FE] bg-white px-3 py-2 text-sm font-bold text-[#1E1B4B]" style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4338CA] text-[10px] font-black text-white">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="relative rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F3C6}"} {PENUTUP_B}
          </p>
          <div className="relative flex justify-center">
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
  const kepala = tema === "lapangan" ? "rounded-md border-4 border-[#1C01A5] bg-[#FEF9C3]" : tema === "jalur" ? "rounded-xl border-2 border-dashed border-[#2563EB] bg-white" : "rounded-xl border-4 border-[#FACC15] bg-[#FFFBEB]";
  const papan = tema === "lapangan" ? "rounded-md border-4 border-white" : tema === "jalur" ? "rounded-xl border-2 border-[#2563EB]" : "rounded-xl border-4 border-[#A5B4FC]";
  const warnaKepala = tema === "jalur" ? "text-[#1D4ED8]" : tema === "lapangan" ? "text-[#166534]" : "text-[#4338CA]";
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-[#FEF9C3] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#4338CA]">
              Tugas {nomor} dari {total} · {cariSalah ? "\u{1F50E} Cari kesalahan · " : ""}
              {rupa === "benda" ? `${IKON_METODE[ls.metode]} ` : ""}
              {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahJadwal key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  return <div className="rounded-3xl">{isi}</div>;
}
