"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahJadwal } from "./LangkahJadwal";
import { PENUTUP_I, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Sub-Bab I (faktor dan kelipatan, akhir bab): dua belas tugas lanjutan Misi Jadwal
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru:
 * Concrete = hamparan pasir pantai dengan jalur ombak dan deret payung, kemajuan berupa deret payung; Pictorial = kertas jadwal berkisi lavender, kemajuan berupa deret lompatan;
 * Abstract = lembar jadwal Kak Yoga berkertas putih bergaris dengan cap bundar, kemajuan berupa deret cap kecil.
 * Abstract diakhiri Poin Penting lalu perayaan akhir bab (spanduk FESTIVAL LENTERA PANTAI, lentera, balon, konfeti, semua tamu dan tokoh). Tanpa skor.
 */

type Tema = "pantai" | "jadwal" | "lembar";
const LATAR: Record<Tema, React.CSSProperties> = {
  pantai: {
    backgroundColor: "#FEF3C7",
    backgroundImage: "repeating-linear-gradient(170deg,rgba(14,165,233,0.22) 0 6px,transparent 6px 40px),radial-gradient(circle at 20% 80%,rgba(217,119,6,0.18) 0 3px,transparent 4px)",
    backgroundSize: "100% 100%,28px 28px",
  },
  jadwal: {
    backgroundColor: "#F5F3FF",
    backgroundImage: "linear-gradient(rgba(124,58,237,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.16) 1px,transparent 1px)",
    backgroundSize: "26px 26px",
  },
  lembar: {
    backgroundColor: "#FFFFFF",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(100,116,139,0.18) 0 1px,transparent 1px 28px),radial-gradient(ellipse at 80% 12%,rgba(250,204,21,0.18),transparent 55%)",
  },
};
/** Tokoh perayaan akhir bab: semua tamu Sub-Bab A sampai I dan tokoh tampil sebagai emoji bernama (tanpa ZWJ, paling tinggi U+1FA95). */
const PAYUNG_MINI = ["🌂", "🌂", "🌂", "🌂", "🌂"];
const TOKOH_PESTA = [
  { ikon: "👩", nama: "Bu Maya" },
  { ikon: "👨", nama: "Pak Laode" },
  { ikon: "👩", nama: "Kak Tiara" },
  { ikon: "👨", nama: "Pak Darwis" },
  { ikon: "👩", nama: "Bu Rina" },
  { ikon: "👨", nama: "Pak Usman" },
  { ikon: "👩", nama: "Bu Marni" },
  { ikon: "👩", nama: "Bu Ratna" },
  { ikon: "🧑", nama: "Kak Yoga" },
  { ikon: "👨", nama: "Pak Hendro" },
  { ikon: "👦", nama: "Satria" },
  { ikon: "👧", nama: "Laras" },
  { ikon: "🧒", nama: "Genta" },
];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "pantai")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-0.5 px-2 py-1" aria-label={`Payung ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`text-base leading-none ${i === nomor ? "animate-pulse" : ""} ${i <= nomor ? "" : "opacity-30 grayscale"}`}>
            {"\u{1F302}"}
          </span>
        ))}
      </div>
    );
  if (tema === "jadwal")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Lompatan ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-full border ${i === nomor ? "animate-pulse border-[#6D28D9] bg-[#C4B5FD]" : i < nomor ? "border-[#4C1D95] bg-[#7C3AED]" : "border-dashed border-[#7C3AED]/60 bg-transparent"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#A16207] bg-[#FDE68A]" : i < nomor ? "border-[#A16207] bg-[#FACC15]" : "border-dashed border-[#A16207]/50 bg-transparent"}`} />
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
  const tema: Tema = rupa === "benda" ? "pantai" : rupa === "diagram" ? "jadwal" : "lembar";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_I}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-xl border-[10px] border-[#CA8A04] bg-[#CA8A04] shadow-[0_6px_0_rgba(113,63,18,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.lembar}>
          <p className="text-center text-lg font-black text-[#713F12]">Poin Penting: Faktor dan Kelipatan</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#CA8A04] bg-[#FEFCE8] px-3 py-2 text-sm font-bold text-[#713F12]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#A16207] bg-[#FDE68A] text-[10px] font-black text-[#713F12]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="space-y-2 rounded-2xl border-4 border-[#DC2626] bg-[#FFFBEB] p-3 text-center" data-uji="perayaan">
            <p className="mx-auto max-w-[360px] rounded-md border-4 border-[#DC2626] bg-[#FEF3C7] px-2 py-1 text-sm font-black tracking-wide text-[#DC2626]">FESTIVAL LENTERA PANTAI</p>
            <p className="text-3xl leading-none" aria-hidden="true">
              {"\u{1F3EE}"} {"\u{1F388}"} {"\u{1F389}"} {"\u{1F388}"} {"\u{1F3EE}"}
            </p>
            <div className="mx-auto grid max-w-[360px] grid-cols-3 gap-1.5" role="list" aria-label="Semua yang hadir">
              {TOKOH_PESTA.map((t) => (
                <div key={t.nama} role="listitem" className="rounded-xl border-2 border-[#CA8A04] bg-white px-1 py-1">
                  <p className="text-2xl leading-none" aria-hidden="true">
                    {t.ikon}
                  </p>
                  <p className="text-xs font-black text-[#713F12]">{t.nama}</p>
                </div>
              ))}
            </div>
            <p className="text-sm font-black text-[#78350F]">
              {"\u{1F4E3}"} {PENUTUP_I}
            </p>
          </div>
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
  const kepala = tema === "pantai" ? "rounded-xl border-4 border-[#0284C7] bg-white" : tema === "jadwal" ? "rounded-md border-2 border-dashed border-[#7C3AED] bg-[#F5F3FF]" : "rounded-md border-4 border-[#CA8A04] bg-[#FEFCE8]";
  const papan = tema === "pantai" ? "rounded-2xl border-4 border-[#0284C7]" : tema === "jadwal" ? "rounded-md border-2 border-dashed border-[#7C3AED]" : "rounded-md border-4 border-[#CA8A04]";
  const warnaKepala = tema === "pantai" ? "text-[#0369A1]" : tema === "jadwal" ? "text-[#6D28D9]" : "text-[#A16207]";
  const warnaJudul = "text-[#1C01A5]";
  const warnaCerita = "text-[#1C01A5]/80";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "pantai" ? (
        <div className="mx-auto flex max-w-[420px] justify-around rounded-md bg-white/80 px-2" aria-hidden="true">
          {PAYUNG_MINI.map((e, i) => (
            <span key={i} className="text-lg leading-none">
              {e}
            </span>
          ))}
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "lembar" ? (
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#A16207] bg-[#FDE68A] px-1 text-[10px] text-[#713F12]" aria-hidden="true">
              cap jadwal
            </span>
          ) : null}
        </p>
        <p className={`text-base font-black ${warnaJudul}`}>{so.judul}</p>
        <p className={`text-sm font-bold ${warnaCerita}`}>{so.cerita}</p>
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
  if (tema === "pantai")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#0284C7] bg-white shadow-[0_6px_0_rgba(69,26,3,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#0284C7 0 4px,#7DD3FC 4px 44px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#0284C7 0 4px,#7DD3FC 4px 44px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "jadwal") return <div className="rounded-lg border-[6px] border-double border-[#7C3AED] bg-[#F5F3FF] shadow-[0_6px_0_rgba(30,58,138,0.3)]">{isi}</div>;
  return (
    <div className="rounded-xl border-[10px] border-[#CA8A04] bg-[#CA8A04] shadow-[0_6px_0_rgba(113,63,18,0.4)]">
      {isi}
    </div>
  );
}
