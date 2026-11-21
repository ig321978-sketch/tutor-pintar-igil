"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahEmber } from "./LangkahEmber";
import { PENUTUP_B, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Sub-Bab B (volume, akhir bab): dua belas tugas lanjutan Misi Ember
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru:
 * Concrete = rak ember di tepi kolam, kemajuan berupa deret gelas; Pictorial = kertas milimeter biru muda, kemajuan berupa deret tetes polos;
 * Abstract = lembar daftar Pak Anto berkertas krem bergaris dengan cap bundar biru, kemajuan berupa deret cap kecil.
 * Abstract diakhiri Poin Penting lalu perayaan akhir bab (spanduk PESTA RENANG TIRTA CERIA, pelampung berderet, balon, konfeti, kedua tamu dan semua tokoh). Tanpa skor.
 */

type Tema = "rak" | "kertas" | "daftar";
const LATAR: Record<Tema, React.CSSProperties> = {
  rak: {
    backgroundColor: "#E0F2FE",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(14,116,144,0.22) 0 3px,transparent 3px 46px),radial-gradient(circle at 80% 20%,rgba(255,255,255,0.7) 0 18px,transparent 19px)",
  },
  kertas: {
    backgroundColor: "#F0F9FF",
    backgroundImage: "linear-gradient(rgba(37,99,235,0.14) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.14) 1px,transparent 1px)",
    backgroundSize: "14px 14px",
  },
  daftar: {
    backgroundColor: "#FFFBEB",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(14,116,144,0.2) 0 1px,transparent 1px 28px),radial-gradient(ellipse at 82% 10%,rgba(37,99,235,0.14),transparent 55%)",
  },
};
/** Rak ember di atas tahap Concrete. */
const RAK_MINI = ["\u{1F95B}", "\u{1F37C}", "\u{1F95B}", "\u{1F37C}", "\u{1F95B}"];
/** Pelampung berderet pada perayaan akhir bab (digambar dengan bentuk bulat, bukan emoji). */
const DERET_PELAMPUNG = [0, 1, 2, 3, 4, 5, 6];
/** Tokoh perayaan akhir bab: kedua tamu dan keempat tokoh tampil sebagai emoji bernama (tanpa ZWJ, paling tinggi U+1FA95). */
const TOKOH_PESTA = [
  { ikon: "👩", nama: "Bu Sinta" },
  { ikon: "👨", nama: "Pak Anto" },
  { ikon: "👨", nama: "Pak Hendro" },
  { ikon: "👦", nama: "Satria" },
  { ikon: "👧", nama: "Laras" },
  { ikon: "🧒", nama: "Genta" },
];

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "rak")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-0.5 px-2 py-1" aria-label={`Gelas ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`text-base leading-none ${i === nomor ? "animate-pulse" : ""} ${i <= nomor ? "" : "opacity-30 grayscale"}`}>
            {"\u{1F95B}"}
          </span>
        ))}
      </div>
    );
  if (tema === "kertas")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Tetes ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-full border ${i === nomor ? "animate-pulse border-[#1D4ED8] bg-[#BFDBFE]" : i < nomor ? "border-[#1E3A8A] bg-[#60A5FA]" : "border-dashed border-[#1D4ED8]/60 bg-transparent"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-full border-2 ${i === nomor ? "animate-pulse border-[#0E7490] bg-[#A5F3FC]" : i < nomor ? "border-[#0E7490] bg-[#22D3EE]" : "border-dashed border-[#0E7490]/50 bg-transparent"}`} />
      ))}
    </div>
  );
}

export default function TahapEmber({
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
  const tema: Tema = rupa === "benda" ? "rak" : rupa === "diagram" ? "kertas" : "daftar";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_B}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-xl border-[10px] border-[#0E7490] bg-[#0E7490] shadow-[0_6px_0_rgba(21,94,117,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.daftar}>
          <p className="text-center text-lg font-black text-[#155E75]">Poin Penting: Volume</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#0E7490] bg-[#ECFEFF] px-3 py-2 text-sm font-bold text-[#155E75]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#0E7490] bg-[#A5F3FC] text-[10px] font-black text-[#155E75]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <div className="space-y-2 rounded-2xl border-4 border-[#0369A1] bg-[#F0F9FF] p-3 text-center" data-uji="perayaan">
            <p className="mx-auto max-w-[360px] rounded-md border-4 border-[#0369A1] bg-[#E0F2FE] px-2 py-1 text-sm font-black tracking-wide text-[#075985]">PESTA RENANG TIRTA CERIA</p>
            <div className="flex justify-center gap-1" aria-hidden="true" data-uji="pelampung">
              {DERET_PELAMPUNG.map((i) => (
                <span key={i} className={`block h-6 w-6 rounded-full border-[5px] ${i % 2 === 0 ? "border-[#DC2626]" : "border-[#F97316]"} bg-white`} />
              ))}
            </div>
            <p className="text-3xl leading-none" aria-hidden="true">
              {"\u{1F388}"} {"\u{1F389}"} {"\u{1F388}"} {"\u{1F38A}"} {"\u{1F388}"}
            </p>
            <div className="mx-auto grid max-w-[360px] grid-cols-3 gap-1.5" role="list" aria-label="Semua yang hadir">
              {TOKOH_PESTA.map((t) => (
                <div key={t.nama} role="listitem" className="rounded-xl border-2 border-[#0369A1] bg-white px-1 py-1">
                  <p className="text-2xl leading-none" aria-hidden="true">
                    {t.ikon}
                  </p>
                  <p className="text-xs font-black text-[#075985]">{t.nama}</p>
                </div>
              ))}
            </div>
            <p className="text-sm font-black text-[#075985]">
              {"\u{1F4E3}"} {PENUTUP_B}
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
  const kepala = tema === "rak" ? "rounded-xl border-4 border-[#0891B2] bg-white" : tema === "kertas" ? "rounded-md border-2 border-dashed border-[#1D4ED8] bg-[#EFF6FF]" : "rounded-md border-4 border-[#0E7490] bg-[#ECFEFF]";
  const papan = tema === "rak" ? "rounded-2xl border-4 border-[#0891B2]" : tema === "kertas" ? "rounded-md border-2 border-dashed border-[#1D4ED8]" : "rounded-md border-4 border-[#0E7490]";
  const warnaKepala = tema === "rak" ? "text-[#155E75]" : tema === "kertas" ? "text-[#1E3A8A]" : "text-[#155E75]";
  const warnaJudul = "text-[#1C01A5]";
  const warnaCerita = "text-[#1C01A5]/80";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "rak" ? (
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
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#1D4ED8] bg-[#DBEAFE] px-1 text-[10px] text-[#1E3A8A]" aria-hidden="true">
              cap kolam
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
        <LangkahEmber key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "rak")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#0891B2] bg-white shadow-[0_6px_0_rgba(21,94,117,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#0891B2 0 4px,#BAE6FD 4px 44px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#0891B2 0 4px,#BAE6FD 4px 44px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "kertas") return <div className="rounded-lg border-[6px] border-double border-[#1D4ED8] bg-[#EFF6FF] shadow-[0_6px_0_rgba(30,58,138,0.3)]">{isi}</div>;
  return (
    <div className="rounded-xl border-[10px] border-[#0E7490] bg-[#0E7490] shadow-[0_6px_0_rgba(21,94,117,0.4)]">
      {isi}
    </div>
  );
}
