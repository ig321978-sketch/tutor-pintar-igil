"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahKemas } from "./LangkahKemas";
import { POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 5 Sub-Bab C: dua belas soal lanjutan Misi Lapak Ikan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, termasuk satu soal Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Bab 1 sampai Bab 4 dan Sub-Bab A dan B: Concrete = plastik gelembung, kemajuan berupa gelembung yang dipencet kempis;
 * Pictorial = kertas kotak hijau pembukuan, kemajuan berupa kotak buku yang dicentang; Abstract = label harga kertas termal bergaris,
 * kemajuan berupa label yang tercetak dari gulungan. Abstract diakhiri Poin Penting. Tanpa skor.
 */

type Tema = "gelembung" | "pembukuan" | "termal";
const LATAR: Record<Tema, React.CSSProperties> = {
  gelembung: {
    backgroundColor: "#E0F2FE",
    backgroundImage:
      "radial-gradient(circle at 40% 35%,rgba(255,255,255,0.95) 0 3px,rgba(255,255,255,0) 4px),radial-gradient(circle,rgba(186,230,253,0.9) 0 10px,rgba(125,211,252,0.9) 11px 12px,transparent 13px),radial-gradient(circle at 40% 35%,rgba(255,255,255,0.95) 0 3px,rgba(255,255,255,0) 4px),radial-gradient(circle,rgba(186,230,253,0.9) 0 10px,rgba(125,211,252,0.9) 11px 12px,transparent 13px)",
    backgroundSize: "30px 30px,30px 30px,30px 30px,30px 30px",
    backgroundPosition: "0 0,0 0,15px 15px,15px 15px",
  },
  pembukuan: {
    backgroundColor: "#F0FDF4",
    backgroundImage:
      "linear-gradient(90deg,transparent 30px,rgba(220,38,38,0.55) 30px 32px,transparent 32px),linear-gradient(rgba(22,101,52,0.28) 1px,transparent 1px),linear-gradient(90deg,rgba(22,101,52,0.28) 1px,transparent 1px)",
    backgroundSize: "100% 100%,14px 14px,14px 14px",
  },
  termal: {
    backgroundColor: "#F8FAFC",
    backgroundImage: "repeating-linear-gradient(180deg,#FFFFFF 0 22px,#E2E8F0 22px 23px),linear-gradient(90deg,rgba(148,163,184,0.25),transparent 12%,transparent 88%,rgba(148,163,184,0.25))",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "gelembung")
    return (
      <div className="mx-auto flex max-w-md flex-wrap justify-center gap-1 rounded-xl border-2 border-[#7DD3FC] bg-white/70 px-2 py-1.5" aria-label={`Gelembung ${nomor} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`h-5 w-5 rounded-full border-2 ${i === nomor ? "animate-pulse" : ""}`}
            style={
              i < nomor
                ? { borderColor: "#94A3B8", background: "#E2E8F0", transform: "scaleY(0.45)" }
                : i === nomor
                  ? { borderColor: "#CA8A04", background: "radial-gradient(circle at 35% 30%,#FFFFFF 0 2px,#FDE68A 3px)" }
                  : { borderColor: "#38BDF8", background: "radial-gradient(circle at 35% 30%,#FFFFFF 0 2px,#BAE6FD 3px)" }
            }
          />
        ))}
      </div>
    );
  if (tema === "pembukuan")
    return (
      <div className="mx-auto max-w-md" aria-label={`Kotak buku ${nomor} dari ${total}`}>
        <div className="grid border-2 border-[#166534] bg-white" style={{ gridTemplateColumns: `repeat(${total},minmax(0,1fr))` }} aria-hidden="true">
          {n.map((i) => (
            <span key={i} className={`flex h-6 items-center justify-center border-r border-[#86EFAC] text-xs font-black last:border-r-0 ${i === nomor ? "bg-[#FEF9C3]" : ""}`}>
              {i < nomor ? <span className="text-[#166534]">{"\u{2714}"}</span> : i === nomor ? <span className="text-[#CA8A04]">{"\u{270F}\u{FE0F}"}</span> : null}
            </span>
          ))}
        </div>
      </div>
    );
  const tampil = Math.min(nomor, total);
  return (
    <div className="mx-auto flex max-w-md items-end gap-2" aria-label={`Label ${tampil} dari ${total}`}>
      <span className="h-8 w-8 shrink-0 rounded-full border-4 border-[#94A3B8] bg-white shadow-[inset_0_0_0_6px_#E2E8F0]" aria-hidden="true" />
      <span className="flex flex-1 items-end gap-0.5" aria-hidden="true">
        {n.map((i) => (
          <span
            key={i}
            className={`flex-1 rounded-sm border ${i <= Math.min(nomor - 1, total) ? "h-7 border-[#64748B] bg-white" : i === nomor ? "h-4 animate-pulse border-[#64748B] bg-[#F1F5F9]" : "h-2 border-dashed border-[#CBD5E1] bg-transparent"}`}
            style={i < nomor ? { backgroundImage: "repeating-linear-gradient(90deg,#0F172A 0 1px,transparent 1px 3px,#0F172A 3px 5px,transparent 5px 6px)", backgroundSize: "100% 40%", backgroundRepeat: "no-repeat", backgroundPosition: "center 70%" } : undefined}
          />
        ))}
      </span>
    </div>
  );
}

export default function TahapKemas({
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
  const tema: Tema = rupa === "benda" ? "gelembung" : rupa === "diagram" ? "pembukuan" : "termal";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} Semua barang sudah dikemas dan tercatat di papan persediaan. Hebat!`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="space-y-3 rounded-3xl p-4" style={LATAR.termal}>
        <Kemajuan tema="termal" nomor={13} total={12} />
        <div className="rounded-md border-2 border-dashed border-[#64748B] bg-white p-3 shadow-[0_3px_0_#CBD5E1]">
          <p className="text-center font-mono text-lg font-black text-[#0F172A]">{"\u{1F3F7}\u{FE0F}"} Poin Penting: Misi Lapak Ikan bagian ini selesai!</p>
          <ul className="mt-2 space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-sm border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-[#0F172A] font-mono text-[10px] font-black text-white">{i + 1}</span>
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
    tema === "gelembung"
      ? "rounded-[1.4rem] border-4 border-[#38BDF8] bg-white/85 shadow-[inset_0_0_0_3px_rgba(186,230,253,0.9)]"
      : tema === "pembukuan"
        ? "rounded-none border-2 border-[#166534] border-l-[8px] border-l-[#DC2626] bg-white"
        : "rounded-md border-2 border-dashed border-[#64748B] bg-white shadow-[0_3px_0_#CBD5E1]";
  const papan =
    tema === "gelembung" ? "rounded-[1.6rem] border-4 border-[#0EA5E9]" : tema === "pembukuan" ? "rounded-none border-2 border-[#166534]" : "rounded-md border-2 border-[#334155] shadow-[0_3px_0_#94A3B8]";
  const warnaKepala = tema === "termal" ? "text-[#334155]" : tema === "pembukuan" ? "text-[#166534]" : "text-[#0369A1]";
  return (
    <div className="space-y-3 rounded-3xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala} ${tema === "termal" ? "font-mono" : ""}`}>
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
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#0369A1] bg-[#E0F2FE] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#0369A1]">
              Soal {nomor} dari {total} · {IKON_METODE[ls.metode]} {ls.langkah.tipe === "cari" ? "\u{1F50E} Cari kesalahan · " : ""}
              {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahKemas key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
