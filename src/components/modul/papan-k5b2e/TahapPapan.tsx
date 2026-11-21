"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahPapan } from "./LangkahPapan";
import { PENUTUP_E, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Sub-Bab E (bilangan prima, pohon faktor, KPK dan FPB, akhir bab): dua belas tugas lanjutan Misi Papan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru:
 * Concrete = tenda pasar malam bergaris merah-putih, kemajuan berupa deret lampion; Pictorial = kertas pohon ungu muda bergaris tegak, kemajuan berupa deret simpul pohon;
 * Abstract = lembar pengelola berkertas krem bergaris dengan cap bundar, kemajuan berupa deret cap kecil.
 * Abstract diakhiri Poin Penting lalu perayaan akhir bab (spanduk PASAR KULINER MALAM, lampu gantung, balon, kotak bingkisan, kelima tamu dan semua tokoh). Tanpa skor.
 */

type Tema = "tenda" | "kertas" | "daftar";
const LATAR: Record<Tema, React.CSSProperties> = {
  tenda: {
    backgroundColor: "#FFF7ED",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(220,38,38,0.12) 0 22px,transparent 22px 44px),radial-gradient(circle at 84% 12%,rgba(250,204,21,0.45) 0 14px,transparent 15px)",
  },
  kertas: {
    backgroundColor: "#FAF5FF",
    backgroundImage: "linear-gradient(90deg,rgba(124,58,237,0.18) 1px,transparent 1px),linear-gradient(rgba(124,58,237,0.09) 1px,transparent 1px)",
    backgroundSize: "40px 14px",
  },
  daftar: {
    backgroundColor: "#FFFBEB",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(180,83,9,0.2) 0 1px,transparent 1px 28px),radial-gradient(ellipse at 82% 10%,rgba(185,28,28,0.12),transparent 55%)",
  },
};
/** Hiasan di atas tahap Concrete: lampion dan benda pasar beremoji lama. */
const RAK_MINI = ["\u{1F3EE}", "\u{1F362}", "\u{1F361}", "\u{1F375}", "\u{1F3EE}"];
/** Lampu gantung pada perayaan akhir bab (digambar bulatan berwarna di tali, bukan emoji), warna silih berganti. */
const DERET_LAMPU = [0, 1, 2, 3, 4, 5, 6, 7];
const WARNA_LAMPU = ["bg-[#DC2626]", "bg-[#FACC15]", "bg-[#16A34A]", "bg-[#2563EB]", "bg-[#7C3AED]", "bg-[#F97316]", "bg-[#DB2777]", "bg-[#0EA5E9]"];
/** Tokoh perayaan akhir bab: kelima tamu dan keempat tokoh tampil sebagai emoji bernama (tanpa ZWJ, paling tinggi U+1FA95). */
const TOKOH_PESTA = [
  { ikon: "\u{1F469}", nama: "Bu Marni" },
  { ikon: "\u{1F468}", nama: "Pak Tarno" },
  { ikon: "\u{1F469}", nama: "Bu Wati" },
  { ikon: "\u{1F468}", nama: "Pak Joko" },
  { ikon: "\u{1F9D1}", nama: "Kak Lintang" },
  { ikon: "\u{1F468}", nama: "Pak Arif" },
  { ikon: "\u{1F466}", nama: "Bima" },
  { ikon: "\u{1F467}", nama: "Citra" },
  { ikon: "\u{1F9D2}", nama: "Fajar" },
];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "tenda")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-0.5 px-2 py-1" aria-label={`Lampion ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`text-base leading-none ${i === nomor ? "animate-pulse" : ""} ${i <= nomor ? "" : "opacity-30 grayscale"}`}>
            {"\u{1F3EE}"}
          </span>
        ))}
      </div>
    );
  if (tema === "kertas")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Simpul ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`block h-3 w-3 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#6D28D9] bg-[#DDD6FE]" : i < nomor ? "border-[#4C1D95] bg-[#A78BFA]" : "border-dashed border-[#6D28D9]/60 bg-transparent"}`}
          />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#B91C1C] bg-[#FECACA]" : i < nomor ? "border-[#B91C1C] bg-[#EF4444]" : "border-dashed border-[#B91C1C]/50 bg-transparent"}`} />
      ))}
    </div>
  );
}

export default function TahapPapan({
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
  const tema: Tema = rupa === "benda" ? "tenda" : rupa === "diagram" ? "kertas" : "daftar";
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
      <div className="rounded-xl border-[10px] border-[#B91C1C] bg-[#B91C1C] shadow-[0_6px_0_rgba(127,29,29,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.daftar}>
          <p className="text-center text-lg font-black text-[#7F1D1D]">Poin Penting: Bilangan Prima, KPK, dan FPB</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#B91C1C] bg-[#FFFBEB] px-3 py-2 text-sm font-bold text-[#7F1D1D]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#B91C1C] bg-[#FECACA] text-[10px] font-black text-[#7F1D1D]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="space-y-2 rounded-2xl border-4 border-[#B91C1C] bg-[#FFFBEB] p-3 text-center" data-uji="perayaan">
            <p className="mx-auto max-w-[360px] rounded-md border-4 border-[#B91C1C] bg-[#FEE2E2] px-2 py-1 text-sm font-black tracking-wide text-[#7F1D1D]">PASAR KULINER MALAM</p>
            <div className="relative mx-auto max-w-[340px] pt-2" aria-hidden="true" data-uji="lampu-gantung">
              <span className="absolute left-0 right-0 top-3 block h-0.5 bg-[#7F1D1D]" />
              <div className="relative flex items-start justify-around">
                {DERET_LAMPU.map((i) => (
                  <span key={i} className="flex flex-col items-center">
                    <span className="block h-2 w-px bg-[#7F1D1D]" />
                    <span className={`block h-4 w-4 rounded-full border-2 border-[#7F1D1D] ${WARNA_LAMPU[i % WARNA_LAMPU.length]}`} />
                  </span>
                ))}
              </div>
            </div>
            <p className="text-3xl leading-none" aria-hidden="true">
              {"\u{1F388}"} {"\u{1F514}"} {"\u{1F381}"} {"\u{1F3EE}"} {"\u{1F388}"}
            </p>
            <div className="mx-auto grid max-w-[360px] grid-cols-3 gap-1" role="list" aria-label="Semua yang hadir">
              {TOKOH_PESTA.map((t) => (
                <div key={t.nama} role="listitem" className="rounded-xl border-2 border-[#B91C1C] bg-white px-1 py-1">
                  <p className="text-xl leading-none" aria-hidden="true">
                    {t.ikon}
                  </p>
                  <p className="text-[11px] font-black leading-tight text-[#7F1D1D]">{t.nama}</p>
                </div>
              ))}
            </div>
            <p className="text-sm font-black text-[#7F1D1D]">
              {"\u{1F3EE}"} {PENUTUP_E}
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
  const kepala = tema === "tenda" ? "rounded-xl border-4 border-[#B91C1C] bg-white" : tema === "kertas" ? "rounded-md border-2 border-dashed border-[#6D28D9] bg-[#F5F3FF]" : "rounded-md border-4 border-[#B91C1C] bg-[#FFFBEB]";
  const papan = tema === "tenda" ? "rounded-2xl border-4 border-[#B91C1C]" : tema === "kertas" ? "rounded-md border-2 border-dashed border-[#6D28D9]" : "rounded-md border-4 border-[#B91C1C]";
  const warnaKepala = tema === "kertas" ? "text-[#4C1D95]" : "text-[#7F1D1D]";
  const warnaJudul = "text-[#1C01A5]";
  const warnaCerita = "text-[#1C01A5]/80";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "tenda" ? (
        <div className="mx-auto flex max-w-[420px] justify-around rounded-md bg-white/80 px-2" aria-hidden="true">
          {RAK_MINI.map((e, i) => (
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
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#B91C1C] bg-[#FEE2E2] px-1 text-[10px] text-[#991B1B]" aria-hidden="true">
              cap pengelola
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
        <LangkahPapan key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "tenda")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#B91C1C] bg-white shadow-[0_6px_0_rgba(127,29,29,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#DC2626 0 22px,#FFFFFF 22px 44px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#DC2626 0 22px,#FFFFFF 22px 44px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "kertas") return <div className="rounded-lg border-[6px] border-double border-[#6D28D9] bg-[#F5F3FF] shadow-[0_6px_0_rgba(76,29,149,0.3)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#B91C1C] bg-[#B91C1C] shadow-[0_6px_0_rgba(127,29,29,0.4)]">{isi}</div>;
}
