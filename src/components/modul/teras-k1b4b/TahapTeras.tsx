"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahTeras } from "./LangkahTeras";
import { POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 4 Sub-Bab B: dua belas soal lanjutan Misi Festival
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode). Pola visual tiap tahap baru, berbeda dari Bab 1 sampai Bab 3 dan Sub-Bab A:
 * Concrete = ubin teraso berbintik dengan kemajuan berupa deretan keranjang yang terisi, Pictorial = papan berlubang (papan pasak)
 * dengan pasak gantungan yang terpasang satu per satu, Abstract = dinding kertas tempel warna-warni dengan kertas tempel yang tertempel bertanda centang.
 * Abstract diakhiri Poin Penting. Tanpa skor.
 */

type Tema = "teraso" | "pasak" | "tempel";
const LATAR: Record<Tema, React.CSSProperties> = {
  teraso: {
    backgroundColor: "#E7E0D6",
    backgroundImage:
      "radial-gradient(circle at 20% 30%,rgba(185,28,28,0.45) 0 2px,transparent 3px),radial-gradient(circle at 70% 60%,rgba(29,78,216,0.40) 0 2.5px,transparent 3.5px),radial-gradient(circle at 45% 80%,rgba(202,138,4,0.45) 0 1.8px,transparent 2.8px),radial-gradient(circle at 85% 15%,rgba(87,83,78,0.45) 0 1.5px,transparent 2.5px)",
    backgroundSize: "38px 38px, 46px 46px, 30px 30px, 26px 26px",
  },
  pasak: {
    backgroundColor: "#D9B98C",
    backgroundImage: "radial-gradient(circle,rgba(68,38,10,0.55) 0 2.6px,transparent 3.2px)",
    backgroundSize: "18px 18px",
  },
  tempel: {
    backgroundColor: "#E0F2FE",
    backgroundImage:
      "linear-gradient(8deg,transparent 0 70%,rgba(253,224,71,0.55) 70% 88%,transparent 88%),linear-gradient(-6deg,transparent 0 12%,rgba(249,168,212,0.45) 12% 28%,transparent 28%),linear-gradient(4deg,transparent 0 44%,rgba(134,239,172,0.45) 44% 58%,transparent 58%)",
    backgroundSize: "140px 120px, 170px 150px, 120px 160px",
  },
};
const WARNA_TEMPEL = ["#FDE047", "#F9A8D4", "#86EFAC", "#7DD3FC", "#FDBA74"];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "teraso")
    return (
      <div className="mx-auto flex max-w-md items-end justify-center gap-1 rounded-xl bg-white/70 px-2 py-1.5" aria-label={`Keranjang ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            className={`relative flex h-5 w-6 items-end justify-center gap-px rounded-b-lg border-2 pb-0.5 ${i < nomor ? "border-[#92400E] bg-[#F5DEB3]" : i === nomor ? "animate-bounce border-[#15803D] bg-[#DCFCE7]" : "border-dashed border-[#92400E]/40 bg-transparent"}`}
          >
            {i < nomor ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
                <span className="h-1.5 w-1.5 bg-[#3B82F6]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              </>
            ) : null}
          </span>
        ))}
      </div>
    );
  if (tema === "pasak")
    return (
      <div className="mx-auto flex max-w-md justify-center gap-1.5 rounded-lg border-2 border-[#78350F] bg-[#C9A270] px-2 py-1" aria-label={`Pasak ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span key={i} className="flex w-5 flex-col items-center">
            <span className={`h-2 w-2 rounded-full ${i <= nomor ? "bg-[#334155]" : "bg-[#44260A]/60"}`} />
            {i < nomor ? <span className="h-3 w-1 rounded-b bg-[#334155]" /> : null}
            {i < nomor ? <span className="h-2.5 w-4 rounded-sm" style={{ background: ["#EF4444", "#3B82F6", "#FACC15"][i % 3] }} /> : null}
            {i === nomor ? <span className="h-3 w-1 animate-pulse rounded-b bg-[#FFFFFF]" /> : null}
          </span>
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap justify-center gap-1" aria-label={`Kertas tempel ${nomor} dari ${total}`}>
      {n.map((i) => (
        <span
          key={i}
          className={`flex h-6 w-6 items-center justify-center text-[10px] font-black shadow-sm ${i < nomor ? "text-[#15803D]" : i === nomor ? "border-2 border-[#1C01A5] text-[#1C01A5]" : "border border-dashed border-[#1C01A5]/30 text-[#1C01A5]/30"}`}
          style={{ background: i <= nomor ? WARNA_TEMPEL[i % WARNA_TEMPEL.length] : "transparent", transform: `rotate(${i === nomor ? -8 : ((i % 3) - 1) * 4}deg)` }}
        >
          {i < nomor ? "\u{2714}\u{FE0F}" : i}
        </span>
      ))}
    </div>
  );
}

export default function TahapTeras({
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
  const tema: Tema = rupa === "benda" ? "teraso" : rupa === "diagram" ? "pasak" : "tempel";
  const [s, setS] = useState(0);
  const [l, setL] = useState(0);
  const [benar, setBenar] = useState(false);
  const [akhir, setAkhir] = useState(false);
  const so = soal[s];
  const ls = so?.langkah[l];

  useEffect(() => {
    if (!ls || akhir) return;
    umum.speakGuru(l === 0 ? `${NAMA_CARA[so.cara]}. ${so.cerita} ${ls.suara}` : ls.suara);
    // Hanya saat soal berganti.
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} Semua bahan festival sudah rapi di keranjang. Hebat!`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.tempel}>
        <Kemajuan tema="tempel" nomor={13} total={12} />
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white/90 p-3">
          <p className="text-center text-lg font-black text-[#1C01A5]">{"\u{1F9FA}"} Poin Penting: Misi Festival bagian ini selesai!</p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {POIN_PENTING.map((p, i) => (
              <li
                key={p}
                className="flex items-start gap-2 px-3 py-2 text-sm font-bold text-[#1C01A5] shadow-md"
                style={{ background: WARNA_TEMPEL[i % WARNA_TEMPEL.length], transform: `rotate(${((i % 3) - 1) * 1.5}deg)` }}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1C01A5] text-[10px] font-black text-[#FFE566]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center">
          <button type="button" className={TOMBOL_UTAMA} onClick={selesaiTahap}>
            {teksAkhir}
          </button>
        </div>
      </div>
    );
  if (!so || !ls) return null;

  const terakhirSemua = s === soal.length - 1 && l === so.langkah.length - 1;
  const total = soal.reduce((n, x) => n + x.langkah.length, 0);
  const nomor = soal.slice(0, s).reduce((n, x) => n + x.langkah.length, 0) + l + 1;
  const kepala =
    tema === "teraso"
      ? "rounded-xl border-4 border-[#57534E] bg-[#FAF7F2] shadow-[0_4px_0_rgba(87,83,78,0.35)]"
      : tema === "pasak"
        ? "rounded-md border-4 border-[#334155] bg-[#F1F5F9] shadow-[inset_0_0_0_3px_#CBD5E1]"
        : "rounded-none border-0 bg-[#FDE047] shadow-[3px_4px_0_rgba(28,1,165,0.25)] -rotate-1";
  const papan = tema === "teraso" ? "rounded-2xl border-4 border-[#57534E]" : tema === "pasak" ? "rounded-md border-4 border-[#78350F]" : "rounded-sm border-2 border-[#1C01A5] shadow-[4px_5px_0_rgba(28,1,165,0.2)]";
  const warnaPita = tema === "teraso" ? "text-[#57534E]" : tema === "pasak" ? "text-[#334155]" : "text-[#9D174D]";
  return (
    <div className="space-y-3 rounded-3xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaPita}`}>
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#1D4ED8] bg-[#DBEAFE] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#1D4ED8]">
              Soal {nomor} dari {total} · {IKON_METODE[ls.metode]} {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahTeras key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
      </div>

      {benar ? (
        <div className="flex justify-center">
          <button type="button" onClick={lanjut} className={TOMBOL_UTAMA}>
            {terakhirSemua ? (poinPenting ? "LIHAT POIN PENTING ⬇️" : teksAkhir) : l < so.langkah.length - 1 ? "SOAL BERIKUTNYA ➡️" : `LANJUT: ${NAMA_CARA[soal[s + 1].cara].toUpperCase()} ➡️`}
          </button>
        </div>
      ) : null}
    </div>
  );
}
