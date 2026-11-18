"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahHias } from "./LangkahHias";
import { PENUTUP_B, POIN_PENTING, POIN_PENTING_SUARA, SPANDUK } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 4 Sub-Bab B: dua belas tugas lanjutan Misi Meja Rangkai
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 dan Kelas 2 Bab 1 sampai 3 serta Sub-Bab A: Concrete = meja rangkai berkain tenun merah muda bergaris miring, kemajuan berupa benang jahit
 * yang makin panjang; Pictorial = lembar pita kotak-kotak biru muda, kemajuan berupa deret kotak yang terisi selang-seling dua warna (merah dan biru);
 * Abstract = papan spanduk ungu tua, kemajuan berupa kartu huruf A dan B yang menyala bergantian. Abstract diakhiri perayaan spanduk PAMERAN DIBUKA dengan
 * konfeti (akhir cerita bab), lalu Poin Penting. Tanpa skor.
 */

type Tema = "meja" | "pita" | "spanduk";
const LATAR: Record<Tema, React.CSSProperties> = {
  meja: { backgroundColor: "#FDF2F8", backgroundImage: "repeating-linear-gradient(135deg,#FCE7F3 0 14px,#FDF2F8 14px 28px)" },
  pita: { backgroundColor: "#EFF6FF", backgroundImage: "linear-gradient(90deg,rgba(59,130,246,0.14) 50%,transparent 50%),linear-gradient(rgba(59,130,246,0.14) 50%,transparent 50%)", backgroundSize: "26px 26px" },
  spanduk: { backgroundColor: "#1E1B4B", backgroundImage: "radial-gradient(circle at 18% 28%,rgba(253,224,71,0.18) 0 3px,transparent 4px),radial-gradient(circle at 76% 62%,rgba(253,224,71,0.14) 0 4px,transparent 5px)", backgroundSize: "120px 120px" },
};
const CSS_KONFETI = `
@keyframes hs-jatuh{0%{transform:translateY(-14px) rotate(0)}100%{transform:translateY(190px) rotate(300deg)}}
.hs-konfeti{animation:hs-jatuh 3.2s linear infinite}
@media (prefers-reduced-motion:reduce){.hs-konfeti{animation:none}}
`;
const WARNA_KONFETI = ["#F87171", "#60A5FA", "#FACC15", "#4ADE80", "#C084FC", "#FB923C"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "meja") {
    const persen = Math.round((Math.min(nomor, total) / total) * 100);
    return (
      <div className="mx-auto max-w-md px-2 py-1.5" aria-label={`Benang ${Math.min(nomor, total)} dari ${total}`}>
        <div className="relative h-4 rounded-full border-2 border-dashed border-[#DB2777]/60 bg-white/70">
          <div className="h-full rounded-full transition-all" style={{ width: `${persen}%`, background: "repeating-linear-gradient(90deg,#C026D3 0 8px,#E879F9 8px 16px)" }} />
          <span aria-hidden="true" className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#86198F] bg-white" style={{ left: `calc(${persen}% - 6px)` }} />
        </div>
      </div>
    );
  }
  if (tema === "pita")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Kotak pita ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-4 w-4 rounded-sm border-2 border-[#1D4ED8] ${i === nomor ? "animate-pulse" : ""}`} style={{ background: i < nomor ? (i % 2 === 0 ? "#60A5FA" : "#F87171") : "transparent", borderStyle: i > nomor ? "dashed" : "solid" }} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Kartu huruf ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`flex h-5 w-5 items-center justify-center rounded-md border-2 text-[10px] font-black ${i === nomor ? "animate-pulse" : ""}`} style={{ background: i < nomor ? "#FDE047" : "transparent", color: i < nomor ? "#312E81" : "#C7D2FE", borderColor: i <= nomor ? "#FDE047" : "rgba(199,210,254,0.5)", borderStyle: i > nomor ? "dashed" : "solid" }}>
          {i % 2 === 1 ? "A" : "B"}
        </span>
      ))}
    </div>
  );
}

export default function TahapHias({
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
  const tema: Tema = rupa === "benda" ? "meja" : rupa === "diagram" ? "pita" : "spanduk";
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
      umum.speakGuru(`Pameran dibuka! Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_B}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-3xl border-[10px] border-[#FDE047] bg-[#312E81] shadow-[0_6px_0_rgba(30,27,75,0.5)]">
        <style>{CSS_KONFETI}</style>
        <div className="space-y-3 rounded-xl p-4" style={LATAR.spanduk}>
          <div className="relative overflow-hidden rounded-2xl border-4 border-[#FDE047] bg-[#4C1D95] px-3 py-6 text-center" aria-label={`Spanduk ${SPANDUK}`}>
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              {Array.from({ length: 18 }, (_, i) => (
                <span key={i} className="hs-konfeti absolute top-0 block h-3 w-2 rounded-sm" style={{ left: `${(i * 37) % 96}%`, background: WARNA_KONFETI[i % WARNA_KONFETI.length], animationDelay: `${(i % 6) * 0.45}s` }} />
              ))}
            </div>
            <p className="relative text-2xl font-black tracking-wide text-[#FDE047]">{SPANDUK}</p>
            <p className="relative mt-1 text-sm font-bold text-white/90">Pita hias terpasang, semua karya sudah di tempatnya.</p>
          </div>
          <p className="text-center text-lg font-black text-[#FDE047]">Poin Penting: Pola</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#C7D2FE]/70 bg-[#312E81] px-3 py-2 text-sm font-bold text-white">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-[#FDE047] text-[10px] font-black text-[#FDE047]">{i % 2 === 0 ? "A" : "B"}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">{PENUTUP_B}</p>
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
  const kepala = tema === "meja" ? "rounded-xl border-4 border-dashed border-[#DB2777] bg-[#FFF1F2]" : tema === "pita" ? "rounded-sm border-2 border-[#1D4ED8] bg-white pr-5" : "rounded-lg border-4 border-[#FDE047] bg-[#312E81]";
  const papan = tema === "meja" ? "rounded-2xl border-4 border-dashed border-[#DB2777]" : tema === "pita" ? "rounded-sm border-2 border-[#1D4ED8]" : "rounded-lg border-4 border-[#FDE047]";
  const warnaKepala = tema === "spanduk" ? "text-[#FDE047]" : tema === "pita" ? "text-[#1D4ED8]" : "text-[#9D174D]";
  const warnaJudul = tema === "spanduk" ? "text-white" : "text-[#1C01A5]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`} style={tema === "pita" ? { clipPath: "polygon(0 0,100% 0,97% 50%,100% 100%,0 100%)" } : undefined}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${tema === "spanduk" ? "text-white/85" : "text-[#1C01A5]/80"}`}>{so.cerita}</p>
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#9D174D] bg-[#FCE7F3] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#9D174D]">
              Tugas {nomor} dari {total} · {cariSalah ? "\u{1F50E} Cari kesalahan · " : ""}
              {rupa === "benda" ? `${IKON_METODE[ls.metode]} ` : ""}
              {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahHias key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  return tema === "spanduk" ? <div className="rounded-3xl border-[10px] border-[#FDE047] bg-[#312E81] shadow-[0_6px_0_rgba(30,27,75,0.5)]">{isi}</div> : <div className="rounded-3xl">{isi}</div>;
}
