"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahPanen } from "./LangkahPanen";
import { PENUTUP_C, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 5 Sub-Bab C: dua belas tugas lanjutan Misi Meja Panen
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru, berbeda dari
 * Kelas 1 dan Kelas 2 Bab 1 sampai 4: Concrete = petak tanah berpagar tali merah dengan patok di sudut, kemajuan berupa deretan patok kayu yang
 * terpasang; Pictorial = lembar kertas lipat ungu muda berlipatan miring, kemajuan berupa deretan segitiga lipatan yang terisi; Abstract = spanduk
 * dengan bendera segitiga warna-warni (bunting), kemajuan berupa bendera yang terpasang. Abstract diakhiri perayaan akhir cerita bab (spanduk PANEN RAYA
 * dan konfeti), lalu Poin Penting. Tanpa skor.
 */

type Tema = "petak" | "kertas" | "spanduk";
const LATAR: Record<Tema, React.CSSProperties> = {
  petak: {
    backgroundColor: "#E9C99A",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(120,53,15,0.16) 0 3px,transparent 3px 18px)",
  },
  kertas: {
    backgroundColor: "#EDE9FE",
    backgroundImage: "repeating-linear-gradient(45deg,rgba(124,58,237,0.13) 0 1px,transparent 1px 34px),repeating-linear-gradient(-45deg,rgba(124,58,237,0.13) 0 1px,transparent 1px 34px)",
  },
  spanduk: {
    backgroundColor: "#FFFBEB",
    backgroundImage: "radial-gradient(circle,rgba(234,88,12,0.12) 0 2px,transparent 3px)",
    backgroundSize: "24px 24px",
  },
};
const WARNA_BENDERA = ["#EF4444", "#FACC15", "#3B82F6", "#22C55E"];
const KONFETI = Array.from({ length: 22 }, (_, i) => ({ kiri: (i * 37) % 100, tunda: ((i * 53) % 20) / 10, warna: WARNA_BENDERA[i % 4], lebar: 6 + (i % 3) * 2 }));
const CSS_KONFETI = `
@keyframes pn-jatuh{0%{transform:translateY(-12px) rotate(0)}100%{transform:translateY(190px) rotate(300deg)}}
.pn-konfeti{animation:pn-jatuh 2.6s linear infinite}
@media (prefers-reduced-motion:reduce){.pn-konfeti{animation:none}}
`;

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "petak")
    return (
      <div className="mx-auto max-w-md" aria-label={`Patok ${Math.min(nomor, total)} dari ${total}`}>
        <div className="mx-1 h-1 rounded-full bg-[#DC2626]" aria-hidden="true" />
        <div className="-mt-1.5 flex flex-wrap items-start justify-center gap-1 px-1">
          {n.map((i) => (
            <svg key={i} viewBox="0 0 10 16" className={`h-4 w-2.5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
              <rect x="1" y="1" width="8" height="14" rx="1.5" fill={i < nomor ? "#B45309" : "transparent"} stroke="#78350F" strokeWidth={i <= nomor ? 1.6 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} />
            </svg>
          ))}
        </div>
      </div>
    );
  if (tema === "kertas")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Lipatan ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 14 14" className="h-3.5 w-3.5" aria-hidden="true">
            <polygon points="1,13 13,13 13,1" fill={i < nomor ? "#A78BFA" : "none"} stroke="#6D28D9" strokeWidth={i === nomor ? 2 : 1.2} strokeDasharray={i > nomor ? "2 2" : undefined} strokeLinejoin="round" />
          </svg>
        ))}
      </div>
    );
  return (
    <div className="mx-auto max-w-md" aria-label={`Bendera ${Math.min(nomor, total)} dari ${total}`}>
      <div className="mx-2 h-0.5 rounded-full bg-[#9A3412]" aria-hidden="true" />
      <div className="flex flex-wrap items-start justify-center gap-0.5 px-1">
        {n.map((i) => (
          <svg key={i} viewBox="0 0 16 20" className={`h-5 w-4 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <polygon points="1,0 15,0 8,18" fill={i < nomor ? WARNA_BENDERA[i % 4] : "transparent"} stroke="#9A3412" strokeWidth={i <= nomor ? 1.6 : 1} strokeDasharray={i > nomor ? "2 2" : undefined} strokeLinejoin="round" />
          </svg>
        ))}
      </div>
    </div>
  );
}

/** Bunting: untaian bendera segitiga di atas kartu. */
function Bunting() {
  return (
    <div className="-mx-3 -mt-3 flex justify-around rounded-t-xl border-b-4 border-[#9A3412] bg-[#FED7AA] px-2 pt-1" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <svg key={i} viewBox="0 0 16 18" className="h-4 w-3">
          <polygon points="1,0 15,0 8,17" fill={WARNA_BENDERA[i % 4]} stroke="#9A3412" strokeWidth={1.2} strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

export default function TahapPanen({
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
  const tema: Tema = rupa === "benda" ? "petak" : rupa === "diagram" ? "kertas" : "spanduk";
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
      umum.speakGuru(`Panen raya dimulai! Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_C}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-3xl border-[8px] border-[#9A3412] bg-[#FFFBEB] shadow-[0_6px_0_rgba(124,45,18,0.35)]">
        <style>{CSS_KONFETI}</style>
        <div className="relative space-y-3 overflow-hidden rounded-xl p-4" style={LATAR.spanduk}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[190px]" aria-hidden="true">
            {KONFETI.map((k, i) => (
              <span key={i} className="pn-konfeti absolute top-0 block rounded-[1px]" style={{ left: `${k.kiri}%`, width: k.lebar, height: k.lebar + 3, background: k.warna, animationDelay: `${k.tunda}s` }} />
            ))}
          </div>
          <p className="relative rounded-xl border-4 border-[#DC2626] bg-[#FECACA] px-3 py-2 text-center text-2xl font-black tracking-widest text-[#991B1B]">{"\u{1F389}"} PANEN RAYA {"\u{1F389}"}</p>
          <p className="relative text-center text-lg font-black text-[#14532D]">{"\u{1F4CC}"} Poin Penting: Seperempat</p>
          <ul className="relative space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-[#FDBA74] bg-white px-3 py-2 text-sm font-bold text-[#431407]" style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-[10px] font-black text-white">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="relative rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F33E}"} {PENUTUP_C}
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
  const kepala = tema === "petak" ? "rounded-md border-4 border-[#92400E] bg-[#FEF3C7]" : tema === "kertas" ? "rounded-xl border-2 border-dashed border-[#7C3AED] bg-white" : "rounded-xl border-4 border-[#EA580C] bg-[#FFF7ED]";
  const papan = tema === "petak" ? "rounded-md border-4 border-[#DC2626] border-dashed" : tema === "kertas" ? "rounded-xl border-2 border-[#7C3AED]" : "rounded-xl border-4 border-[#FDBA74]";
  const warnaKepala = tema === "kertas" ? "text-[#6D28D9]" : tema === "petak" ? "text-[#92400E]" : "text-[#C2410C]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "spanduk" ? <Bunting /> : null}
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#92400E] bg-[#FEF3C7] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#92400E]">
              Tugas {nomor} dari {total} · {cariSalah ? "\u{1F50E} Cari kesalahan · " : ""}
              {rupa === "benda" ? `${IKON_METODE[ls.metode]} ` : ""}
              {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahPanen key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
