"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahPameran } from "./LangkahPameran";
import { PENUTUP_E, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Sub-Bab E (desimal perseratusan dan persen, akhir bab): dua belas tugas lanjutan Misi Pameran
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru:
 * Concrete = halaman pameran berumput dengan tali lampion, kemajuan berupa deret lampion; Pictorial = kertas kisi seratus krem, kemajuan berupa deret kotak kisi;
 * Abstract = lembar daftar pameran Bu Tuti berkertas putih bergaris dengan cap bundar, kemajuan berupa deret cap kecil.
 * Abstract diakhiri Poin Penting lalu perayaan akhir bab (spanduk PAMERAN BATIK KAMPUNG MEKAR, lampion, balon, konfeti, semua tamu dan tokoh). Tanpa skor.
 */

type Tema = "halaman" | "kisi" | "daftar";
const LATAR: Record<Tema, React.CSSProperties> = {
  halaman: {
    backgroundColor: "#F7FEE7",
    backgroundImage: "radial-gradient(circle at 20% 80%,rgba(101,163,13,0.22) 0 3px,transparent 4px),repeating-linear-gradient(0deg,rgba(132,204,22,0.14) 0 2px,transparent 2px 22px)",
    backgroundSize: "26px 26px,100% 100%",
  },
  kisi: {
    backgroundColor: "#FFFBEB",
    backgroundImage: "linear-gradient(rgba(194,65,12,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(194,65,12,0.16) 1px,transparent 1px)",
    backgroundSize: "22px 22px",
  },
  daftar: {
    backgroundColor: "#FFFFFF",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(100,116,139,0.18) 0 1px,transparent 1px 28px),radial-gradient(ellipse at 80% 12%,rgba(250,204,21,0.18),transparent 55%)",
  },
};
/** Tali lampion di atas halaman pameran (Concrete). */
const LAMPION_MINI = ["🏮", "🏮", "🏮", "🏮", "🏮"];
/** Tokoh perayaan akhir bab: semua tamu Sub-Bab A sampai E dan tokoh tampil sebagai emoji bernama (tanpa ZWJ, paling tinggi U+1FA95). */
const TOKOH_PESTA = [
  { ikon: "👩", nama: "Bu Wulan" },
  { ikon: "👨", nama: "Pak Joyo" },
  { ikon: "👩", nama: "Kak Sekar" },
  { ikon: "👨", nama: "Pak Bagas" },
  { ikon: "👩", nama: "Bu Tuti" },
  { ikon: "👨", nama: "Pak Hendro" },
  { ikon: "👦", nama: "Satria" },
  { ikon: "👧", nama: "Laras" },
  { ikon: "🧒", nama: "Genta" },
];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "halaman")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-0.5 px-2 py-1" aria-label={`Lampion ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`text-base leading-none ${i === nomor ? "animate-pulse" : ""} ${i <= nomor ? "" : "opacity-30 grayscale"}`}>
            {"\u{1F3EE}"}
          </span>
        ))}
      </div>
    );
  if (tema === "kisi")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Kotak ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3 w-3 border ${i === nomor ? "animate-pulse border-[#C2410C] bg-[#FED7AA]" : i < nomor ? "border-[#9A3412] bg-[#FB923C]" : "border-dashed border-[#C2410C]/60 bg-transparent"}`} />
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

export default function TahapPameran({
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
  const tema: Tema = rupa === "benda" ? "halaman" : rupa === "diagram" ? "kisi" : "daftar";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_E}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-xl border-[10px] border-[#CA8A04] bg-[#CA8A04] shadow-[0_6px_0_rgba(113,63,18,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.daftar}>
          <p className="text-center text-lg font-black text-[#713F12]">Poin Penting: Desimal dan Persen</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#CA8A04] bg-[#FEFCE8] px-3 py-2 text-sm font-bold text-[#713F12]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#A16207] bg-[#FDE68A] text-[10px] font-black text-[#713F12]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="space-y-2 rounded-2xl border-4 border-[#DC2626] bg-[#FFFBEB] p-3 text-center" data-uji="perayaan">
            <p className="mx-auto max-w-[360px] rounded-md border-4 border-[#DC2626] bg-[#FEF3C7] px-2 py-1 text-sm font-black tracking-wide text-[#DC2626]">PAMERAN BATIK KAMPUNG MEKAR</p>
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
              {"\u{1F4E3}"} {PENUTUP_E}
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
  const kepala = tema === "halaman" ? "rounded-xl border-4 border-[#65A30D] bg-white" : tema === "kisi" ? "rounded-md border-2 border-dashed border-[#C2410C] bg-[#FFFBEB]" : "rounded-md border-4 border-[#CA8A04] bg-[#FEFCE8]";
  const papan = tema === "halaman" ? "rounded-2xl border-4 border-[#65A30D]" : tema === "kisi" ? "rounded-md border-2 border-dashed border-[#C2410C]" : "rounded-md border-4 border-[#CA8A04]";
  const warnaKepala = tema === "halaman" ? "text-[#3F6212]" : tema === "kisi" ? "text-[#9A3412]" : "text-[#A16207]";
  const warnaJudul = "text-[#1C01A5]";
  const warnaCerita = "text-[#1C01A5]/80";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "halaman" ? (
        <div className="mx-auto flex max-w-[420px] justify-around rounded-md bg-white/80 px-2" aria-hidden="true">
          {LAMPION_MINI.map((e, i) => (
            <span key={i} className="text-lg leading-none">
              {e}
            </span>
          ))}
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "daftar" ? (
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#A16207] bg-[#FDE68A] px-1 text-[10px] text-[#713F12]" aria-hidden="true">
              cap pameran
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
        <LangkahPameran key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "halaman")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#65A30D] bg-white shadow-[0_6px_0_rgba(54,83,20,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#65A30D 0 4px,#BEF264 4px 44px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#65A30D 0 4px,#BEF264 4px 44px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "kisi") return <div className="rounded-lg border-[6px] border-double border-[#C2410C] bg-[#FFFBEB] shadow-[0_6px_0_rgba(124,45,18,0.3)]">{isi}</div>;
  return (
    <div className="rounded-xl border-[10px] border-[#CA8A04] bg-[#CA8A04] shadow-[0_6px_0_rgba(113,63,18,0.4)]">
      {isi}
    </div>
  );
}
