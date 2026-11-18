"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahPesta } from "./LangkahPesta";
import { PENUTUP_BAB, PERAYAAN, PERAYAAN_SUARA, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 2 Bab 1 Sub-Bab C: dua belas tugas lanjutan Misi Meja Pesta
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, satu tugas Klik berupa Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 Bab 1 sampai 8: Concrete = taplak kotak-kotak merah putih di meja Pesta Kue, kemajuan berupa deret balon yang terisi warna;
 * Pictorial = kertas lipat putih dengan garis lipatan, kemajuan berupa deret segitiga lipatan yang terisi;
 * Abstract = spanduk Pesta Kue berwarna dengan taburan konfeti (perayaan akhir cerita bab), kemajuan berupa konfeti yang menyala.
 * Abstract diakhiri perayaan dan Poin Penting, lalu penutup bab. Tanpa skor.
 */

type Tema = "taplak" | "lipat" | "spanduk";
const LATAR: Record<Tema, React.CSSProperties> = {
  taplak: {
    backgroundColor: "#FFF1F2",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(220,38,38,0.22) 0 22px,transparent 22px 44px),repeating-linear-gradient(90deg,rgba(220,38,38,0.22) 0 22px,transparent 22px 44px)",
  },
  lipat: {
    backgroundColor: "#FFFFFF",
    backgroundImage:
      "linear-gradient(135deg,transparent 49.4%,rgba(100,116,139,0.38) 49.4% 50.6%,transparent 50.6%),linear-gradient(45deg,transparent 49.4%,rgba(100,116,139,0.22) 49.4% 50.6%,transparent 50.6%)",
    backgroundSize: "140px 140px",
  },
  spanduk: {
    backgroundColor: "#7C3AED",
    backgroundImage:
      "radial-gradient(circle at 12% 18%,#FDE047 0 3px,transparent 4px),radial-gradient(circle at 78% 12%,#F9A8D4 0 3px,transparent 4px),radial-gradient(circle at 40% 72%,#86EFAC 0 3px,transparent 4px),radial-gradient(circle at 90% 80%,#7DD3FC 0 3px,transparent 4px),linear-gradient(180deg,#8B5CF6,#6D28D9)",
    backgroundSize: "90px 90px,110px 110px,100px 100px,120px 120px,auto",
  },
};

const WARNA_BALON = ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#F472B6", "#A78BFA"];
const WARNA_KONFETI = ["#FDE047", "#F9A8D4", "#86EFAC", "#7DD3FC", "#FDBA74", "#C4B5FD"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "taplak")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 rounded-xl bg-white/70 px-2 py-1.5" aria-label={`Balon ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className="flex flex-col items-center">
            <span
              className={`block h-5 w-4 border-2 ${i === nomor ? "animate-pulse" : ""}`}
              style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: i < nomor ? WARNA_BALON[i % WARNA_BALON.length] : "transparent", borderColor: i <= nomor ? "#991B1B" : "rgba(153,27,27,0.4)", borderStyle: i > nomor ? "dashed" : "solid" }}
            />
            <span className="block h-1.5 w-px bg-[#991B1B]/60" />
          </span>
        ))}
      </div>
    );
  if (tema === "lipat")
    return (
      <div className="mx-auto flex max-w-md items-center justify-center gap-1 px-2 py-1" aria-label={`Lipatan ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
            <polygon points="2,17 18,17 2,3" fill={i < nomor ? "#1C01A5" : "none"} stroke="#1C01A5" strokeWidth={i === nomor ? 2.6 : 1.4} strokeDasharray={i > nomor ? "2 2" : undefined} strokeLinejoin="round" />
          </svg>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1.5 px-2 py-1" aria-label={`Konfeti ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`block h-3 w-2 ${i === nomor ? "animate-pulse" : ""}`}
          style={{ transform: `rotate(${(i * 37) % 70 - 35}deg)`, background: i < nomor ? WARNA_KONFETI[i % WARNA_KONFETI.length] : "transparent", border: `2px ${i > nomor ? "dashed" : "solid"} ${i <= nomor ? "#FDE047" : "rgba(253,224,71,0.45)"}` }}
        />
      ))}
    </div>
  );
}

export default function TahapPesta({
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
  const tema: Tema = rupa === "benda" ? "taplak" : rupa === "diagram" ? "lipat" : "spanduk";
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
      umum.speakGuru(`${PERAYAAN_SUARA} Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_BAB}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-3xl border-[10px] border-[#DB2777] bg-[#DB2777] p-0 shadow-[0_6px_0_rgba(131,24,67,0.4)]">
        <div className="space-y-3 rounded-xl p-4" style={LATAR.spanduk}>
          <Kemajuan tema="spanduk" nomor={13} total={12} />
          <div className="rounded-2xl border-4 border-dashed border-[#FDE047] bg-[#5B21B6]/70 p-3 text-center">
            <p className="text-2xl" aria-hidden="true">
              {"\u{1F389}"} {"\u{1F38A}"} {"\u{1F389}"}
            </p>
            <p className="text-xl font-black tracking-wide text-[#FDE047]">PESTA KUE DIBUKA!</p>
            <p className="mt-1 text-sm font-bold text-white">{PERAYAAN}</p>
          </div>
          <div className="rounded-2xl border-4 border-dashed border-[#F8FAFC] bg-[#4C1D95]/80 p-3">
            <p className="text-center text-lg font-black text-[#FEF08A]">{"\u{270F}\u{FE0F}"} Poin Penting: Misi Meja Pesta selesai!</p>
            <ul className="mt-2 space-y-1.5">
              {POIN_PENTING.map((p, i) => (
                <li key={p} className="flex items-start gap-2 rounded-xl border-2 border-[#F8FAFC]/70 bg-[#6D28D9] px-3 py-2 text-sm font-bold text-[#F8FAFC]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#F8FAFC] text-[10px] font-black text-[#FEF08A]">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F382}"} {PENUTUP_BAB}
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
  const kepala =
    tema === "taplak"
      ? "rounded-xl border-4 border-[#DC2626] bg-[#FEF2F2]"
      : tema === "lipat"
        ? "rounded-md border-2 border-dashed border-[#1C01A5] bg-white"
        : "rounded-xl border-4 border-dashed border-[#FDE047] bg-[#5B21B6]/80";
  const papan = tema === "taplak" ? "rounded-2xl border-4 border-[#DC2626]" : tema === "lipat" ? "rounded-md border-2 border-[#1C01A5]" : "rounded-xl border-4 border-[#FDE047]";
  const warnaKepala = tema === "spanduk" ? "text-[#FDE047]" : tema === "lipat" ? "text-[#1C01A5]" : "text-[#991B1B]";
  const warnaJudul = tema === "spanduk" ? "text-white" : "text-[#1C01A5]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#92400E] bg-[#FEF3C7] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#92400E]">
              Tugas {nomor} dari {total} · {cariSalah ? "\u{1F50E} Cari kesalahan · " : ""}
              {rupa === "benda" ? `${IKON_METODE[ls.metode]} ` : ""}{NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahPesta key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
      </div>

      {benar ? (
        <div className="flex justify-center">
          <button type="button" onClick={lanjut} className={TOMBOL_UTAMA}>
            {terakhirSemua ? (poinPenting ? "LIHAT PERAYAAN ⬇️" : teksAkhir) : l < so.langkah.length - 1 ? "TUGAS BERIKUTNYA ➡️" : `LANJUT: ${NAMA_CARA[soal[s + 1].cara].toUpperCase()} ➡️`}
          </button>
        </div>
      ) : null}
    </div>
  );
  return tema === "spanduk" ? <div className="rounded-3xl border-[10px] border-[#DB2777] bg-[#DB2777] shadow-[0_6px_0_rgba(131,24,67,0.4)]">{isi}</div> : <div className="rounded-3xl">{isi}</div>;
}
