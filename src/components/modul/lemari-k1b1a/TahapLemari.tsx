"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika";
import { LangkahMetode } from "./LangkahMetode";
import { CSS_LEMARI, TOMBOL_UTAMA } from "./ui";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 1 Bab 1 Sub-Bab A: dua belas soal lanjutan Misi Rumah Rapi dalam
 * tiga kelompok cara (Klik, Tulis di kanvas, Rekam suara). Tiap kelompok empat soal, satu untuk tiap metode
 * (Metode IGIL, One-to-One, Cardinality, Subitizing). Tanpa skor.
 * Abstract diakhiri Poin Penting singkat sebelum sub-bab selesai.
 */

const POIN = [
  "Pisahkan dulu mainan yang sejenis.",
  "Tunjuk satu, sebut satu angka. Jangan dobel, jangan terlewat.",
  "Angka terakhir yang disebut adalah banyaknya.",
  "Yang sedikit bisa dikenali sekilas.",
  "Tidak ada isinya berarti nol.",
  "Catat banyaknya dengan lambang, lalu baca namanya.",
];

export default function TahapLemari({
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
  pita: { ikon: string; nama: string; cara: string; warna: string };
  teksAkhir: string;
  poinPenting?: boolean;
}) {
  const [s, setS] = useState(0);
  const [l, setL] = useState(0);
  const [benar, setBenar] = useState(false);
  const [akhir, setAkhir] = useState(false);
  const so = soal[s];
  const ls = so?.langkah[l];

  useEffect(() => {
    if (!ls || akhir) return;
    umum.speakGuru(l === 0 ? `${NAMA_CARA[so.cara]}. ${so.cerita} ${ls.suara}` : ls.suara);
    // Hanya saat langkah berganti.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s, l, akhir]);

  const lanjut = () => {
    setBenar(false);
    if (l < so.langkah.length - 1) setL(l + 1);
    else if (s < soal.length - 1) {
      setS(s + 1);
      setL(0);
    } else if (poinPenting) {
      setAkhir(true);
      umum.speakGuru(`Poin penting. ${POIN.join(" ")}`);
    } else {
      umum.hentikan();
      umum.onSelesai();
    }
    umum.gulir();
  };

  if (akhir) {
    return (
      <div className="space-y-3 rounded-3xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-3">
        <p className="text-center text-lg font-black text-[#1C01A5]">{"\u{2B50}"} Poin Penting: Misi Rumah Rapi selesai!</p>
        <ul className="space-y-1.5">
          {POIN.map((p) => (
            <li key={p} className="rounded-xl border-2 border-[#1C01A5]/30 bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
              {p}
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <button
            type="button"
            className={TOMBOL_UTAMA}
            onClick={() => {
              umum.hentikan();
              umum.onSelesai();
            }}
          >
            {teksAkhir}
          </button>
        </div>
      </div>
    );
  }
  if (!so || !ls) return null;

  const terakhirSemua = s === soal.length - 1 && l === so.langkah.length - 1;
  const total = soal.reduce((n, x) => n + x.langkah.length, 0);
  const nomor = soal.slice(0, s).reduce((n, x) => n + x.langkah.length, 0) + l + 1;
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#1C01A5] p-2" style={{ background: pita.warna }}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className="text-base font-black text-[#1C01A5]">
          Soal {nomor} dari {total}: {so.judul}
        </p>
        <p className="text-sm font-bold text-[#1C01A5]/80">{so.cerita}</p>
      </div>

      <ol className="grid grid-cols-3 gap-1" aria-label="Tiga cara menjawab">
        {soal.map((x, i) => (
          <li key={x.cara} aria-current={i === s ? "step" : undefined} className={`rounded-xl border-2 px-1 py-1.5 text-center text-xs font-black leading-tight sm:text-sm ${i === s ? "border-[#1C01A5] bg-[#1C01A5] text-[#FFE566]" : i < s ? "border-[#16A34A] bg-[#DCFCE7] text-[#15803D]" : "border-[#1C01A5]/20 bg-white text-[#1C01A5]/60"}`}>
            <span aria-hidden="true">{IKON_CARA[x.cara]}</span> {NAMA_CARA[x.cara]}
            <span className="block text-[10px] font-bold opacity-80">{i < s ? "selesai" : `${x.langkah.length} soal`}</span>
          </li>
        ))}
      </ol>

      <ol className="grid grid-cols-4 gap-1" aria-label="Empat metode kelompok ini">
        {so.langkah.map((x, i) => (
          <li key={i} className={`rounded-xl border-2 px-1 py-1 text-center text-[10px] font-black leading-tight sm:text-xs ${i === l ? "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]" : i < l ? "border-[#16A34A] bg-[#DCFCE7] text-[#15803D]" : "border-[#1C01A5]/20 bg-white text-[#1C01A5]/60"}`}>
            <span aria-hidden="true">{IKON_METODE[x.metode]}</span> {NAMA_METODE[x.metode].split(":")[0]}
          </li>
        ))}
      </ol>

      <div className="rounded-3xl border-4 border-[#1C01A5] bg-white p-3">
        <div className="mb-2 flex items-start gap-2">
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#7C3AED]">
              {IKON_CARA[ls.cara]} {NAMA_CARA[ls.cara]} · {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahMetode key={`${s}-${l}`} ls={ls} rupa={rupa} benih={s * 10 + l + 1} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
