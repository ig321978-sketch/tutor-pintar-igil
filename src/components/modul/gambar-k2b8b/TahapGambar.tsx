"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahGambar } from "./LangkahGambar";
import { PENUTUP_B, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 8 Sub-Bab B: dua belas tugas lanjutan Misi Papan Layar
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru, berbeda dari
 * Kelas 1 dan Kelas 2 Bab 1 sampai 7: Concrete = loket tiket dengan kanopi merah-putih dan papan merah muda berbingkai putus-putus, kemajuan berupa deretan karcis yang tersobek;
 * Pictorial = papan layar kotak-kotak abu-abu muda, kemajuan berupa kotak yang terisi bintang; Abstract = panggung ungu tua bertirai merah di kedua sisi dengan lampu sorot,
 * kemajuan berupa lampu pijar yang menyala. Abstract diakhiri perayaan akhir cerita bab (spanduk PENTAS SENI MERIAH dan konfeti), lalu Poin Penting. Tanpa skor.
 */

type Tema = "loket" | "layar" | "panggung";
const LATAR: Record<Tema, React.CSSProperties> = {
  loket: {
    backgroundColor: "#FEE2E2",
    backgroundImage: "repeating-linear-gradient(90deg,#DC2626 0 16px,#FFFFFF 16px 32px),radial-gradient(circle at 50% 100%,rgba(255,255,255,0.6) 0 30%,transparent 60%)",
    backgroundSize: "100% 12px, 100% 100%",
    backgroundRepeat: "no-repeat",
  },
  layar: {
    backgroundColor: "#F8FAFC",
    backgroundImage: "linear-gradient(#CBD5E1 1px,transparent 1px),linear-gradient(90deg,#CBD5E1 1px,transparent 1px)",
    backgroundSize: "20px 20px",
  },
  panggung: {
    backgroundColor: "#3B0764",
    backgroundImage: "linear-gradient(90deg,#9F1239 0 7%,#BE123C 7% 9%,transparent 9% 91%,#BE123C 91% 93%,#9F1239 93%),radial-gradient(ellipse at 50% 0%,rgba(254,240,138,0.42) 0 26%,transparent 60%)",
  },
};
const WARNA_KONFETI = ["#EF4444", "#FACC15", "#3B82F6", "#22C55E", "#EC4899"];
const KONFETI = Array.from({ length: 24 }, (_, i) => ({ kiri: (i * 37) % 100, tunda: ((i * 53) % 20) / 10, warna: WARNA_KONFETI[i % 5], lebar: 6 + (i % 3) * 2 }));
const CSS_KONFETI = `
@keyframes ps-jatuh{0%{transform:translateY(-12px) rotate(0)}100%{transform:translateY(200px) rotate(300deg)}}
.ps-konfeti{animation:ps-jatuh 2.6s linear infinite}
@media (prefers-reduced-motion:reduce){.ps-konfeti{animation:none}}
`;
const titikBintang = (cx: number, cy: number, r: number): string =>
  Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.46;
    return `${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "loket")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-1" aria-label={`Karcis ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 22 14" className={`h-4 w-6 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <path d="M1 1 H21 V5 A2 2 0 0 0 21 9 V13 H1 V9 A2 2 0 0 0 1 5 Z" fill={i < nomor ? "#FCA5A5" : "#FFFFFF"} stroke="#B91C1C" strokeWidth={i <= nomor ? 1.4 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
            <line x1="14" y1="2" x2="14" y2="12" stroke="#B91C1C" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          </svg>
        ))}
      </div>
    );
  if (tema === "layar")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-0.5 px-1" aria-label={`Kotak ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 16 16" className={`h-4 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x="1" y="1" width="14" height="14" fill="#FFFFFF" stroke="#475569" strokeWidth={i <= nomor ? 1.4 : 0.9} strokeDasharray={i > nomor ? "2 2" : undefined} />
            {i < nomor ? <polygon points={titikBintang(8, 8.4, 5.6)} fill="#FACC15" stroke="#1C01A5" strokeWidth="0.7" /> : null}
          </svg>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-1" aria-label={`Lampu ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <svg key={i} viewBox="0 0 14 18" className={`h-4 w-3 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
          <circle cx="7" cy="7" r="5.2" fill={i < nomor ? "#FDE047" : "transparent"} stroke="#FDE68A" strokeWidth={i <= nomor ? 1.4 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
          <rect x="4.6" y="12" width="4.8" height="4" rx="0.8" fill="#FDE68A" />
        </svg>
      ))}
    </div>
  );
}

export default function TahapGambar({
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
  const tema: Tema = rupa === "benda" ? "loket" : rupa === "diagram" ? "layar" : "panggung";
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
      umum.speakGuru(`Pentas seni meriah! Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_B}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-3xl border-[8px] border-[#9F1239] bg-[#3B0764] shadow-[0_6px_0_rgba(59,7,100,0.5)]">
        <style>{CSS_KONFETI}</style>
        <div className="relative space-y-3 overflow-hidden rounded-xl p-4" style={LATAR.panggung}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[200px]" aria-hidden="true">
            {KONFETI.map((k, i) => (
              <span key={i} className="ps-konfeti absolute top-0 block rounded-[1px]" style={{ left: `${k.kiri}%`, width: k.lebar, height: k.lebar + 3, background: k.warna, animationDelay: `${k.tunda}s` }} />
            ))}
          </div>
          <p className="relative rounded-xl border-4 border-[#FACC15] bg-[#FEF9C3] px-3 py-2 text-center text-xl font-black tracking-widest text-[#9F1239]">
            {"\u{1F389}"} PENTAS SENI MERIAH {"\u{1F389}"}
          </p>
          <p className="relative text-center text-lg font-black text-[#FEF08A]">{"\u{1F4CC}"} Poin Penting: Diagram Gambar</p>
          <ul className="relative space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-[#F5D0FE] bg-white px-3 py-2 text-sm font-bold text-[#581C87]" style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#BE123C] text-[10px] font-black text-white">{i + 1}</span>
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
  const kepala = tema === "loket" ? "rounded-lg border-4 border-dashed border-[#B91C1C] bg-[#FFF1F2]" : tema === "layar" ? "rounded-md border-2 border-[#475569] bg-white" : "rounded-xl border-4 border-[#FACC15] bg-[#FFFBEB]";
  const papan = tema === "loket" ? "rounded-lg border-4 border-[#B91C1C]" : tema === "layar" ? "rounded-md border-2 border-[#475569]" : "rounded-xl border-4 border-[#E879F9]";
  const warnaKepala = tema === "layar" ? "text-[#334155]" : tema === "loket" ? "text-[#B91C1C]" : "text-[#86198F]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3 pt-5" style={LATAR[tema]}>
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
        <LangkahGambar key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
