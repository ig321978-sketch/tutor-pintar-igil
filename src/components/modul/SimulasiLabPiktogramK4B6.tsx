"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK4B6 } from "./eja-k4b6";
import { DeretSimbol, Keterangan, Piktogram, TurusK4B6 } from "./model-piktogram-k4b6";
import {
  DATA_BACA,
  DATA_SUSUN,
  DATA_TURUS,
  MAKS_SIMBOL,
  SKALA,
  awalPiktoK4B6A,
  bacaAktif,
  bendaSekarang,
  dataSusun,
  dataTurus,
  hitungTurus,
  keadaanPiktoK4B6A,
  labelKategori,
  langkahPiktoK4B6A,
  soalAktif,
  ucapBacaK4B6A,
  ucapSusunK4B6A,
  ucapTurusK4B6A,
  urutanBenda,
  type KeadaanPiktoK4B6A,
} from "./lab-piktogram-k4b6a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B6 Sub-Bab A): Lab Piktogram. Satu alat, tiga tampilan.        */
/*  Turus : catat benda satu per satu dengan turus.                           */
/*  Susun : pilih keterangan simbol, lalu susun simbol tiap baris.            */
/*  Baca  : baca piktogram jadi: paling banyak, nilai, selisih, jumlah.       */
/* Logika: lab-piktogram-k4b6a.ts.                                            */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Susun, pilih buku dipinjam dengan keterangan 1 simbol = 4 buku. Apa kata lab?",
  "Di Susun, coba siswa per kelas dengan 1 simbol = 1 siswa. Mengapa ditolak?",
  "Di Baca, pilih banyak simbolnya saja untuk Kelas 3. Apa yang terlupa?",
  "Di Turus, mengapa tiap kelompok lima diberi garis miring?",
];
const URUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const TOMBOL_BULAT = "h-9 w-9 shrink-0 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] font-black leading-none text-[#1C01A5]";

export default function SimulasiLabPiktogramK4B6({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPiktoK4B6A) => void }) {
  const [x, kirim] = useReducer(langkahPiktoK4B6A, undefined, awalPiktoK4B6A);
  const [lihat, setLihat] = useState<"turus" | "susun" | "baca">("turus");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanPiktoK4B6A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "turus" ? ucapTurusK4B6A(x) : lihat === "susun" ? ucapSusunK4B6A(x) : ucapBacaK4B6A(x);
  const dT = dataTurus(x);
  const benda = bendaSekarang(x);
  const turus = hitungTurus(dT, x.turus.catat);
  const nBenda = urutanBenda(dT).length;
  const dS = dataSusun(x);
  const baca = bacaAktif(x);
  const soal = soalAktif(x);
  const q = soal[x.baca.ke];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Piktogram</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Satu simbol bisa mewakili lebih dari satu benda.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B6(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "turus"} onKlik={() => pilihTampilan("turus")}>
          ✏️ Turus
        </Pilihan>
        <Pilihan aktif={lihat === "susun"} onKlik={() => pilihTampilan("susun")}>
          🧩 Susun
        </Pilihan>
        <Pilihan aktif={lihat === "baca"} onKlik={() => pilihTampilan("baca")}>
          🔍 Baca
        </Pilihan>
      </div>

      {lihat === "turus" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih data turus">
            {DATA_TURUS.map((d, i) => (
              <Pilihan key={d.id} aktif={x.turus.data === i} onKlik={() => kirim({ t: "T_DATA", i })} label={`Data ${d.judul}`}>
                {d.judul}
              </Pilihan>
            ))}
          </div>
          <div className="rounded-xl border-4 border-dashed border-[#F0AB00] bg-[#FFF8DC] p-2 text-center">
            <p className="text-xs font-black text-[#1C01A5]">
              {benda === null ? `${nBenda} dari ${nBenda} sudah dicatat` : `Benda ke-${x.turus.catat.length + 1} dari ${nBenda}`}
            </p>
            <p className="text-2xl font-black text-[#1C01A5]" aria-live="polite">
              {benda === null ? "Selesai dicatat" : labelKategori(dT, benda)}
            </p>
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk baris yang sesuai dengan benda di atas. Satu benda, satu turus.</p>
          <div className="space-y-1">
            {dT.kategori.map((k, i) => (
              <button
                key={k.id}
                type="button"
                aria-label={`Catat ${k.label}`}
                onClick={() => kirim({ t: "T_CATAT", k: k.id })}
                className="grid w-full grid-cols-[5.5rem_1fr_2rem] items-center gap-2 rounded-xl border-2 border-[#1C01A5]/40 bg-white px-2 py-1 text-left"
              >
                <span className="text-sm font-black text-[#1C01A5]">{k.label}</span>
                <span className="flex min-h-6 items-center overflow-hidden">{turus[i] > 0 ? <TurusK4B6 n={turus[i]} /> : null}</span>
                <span className="text-right text-sm font-black text-[#1C01A5]">{turus[i]}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Batalkan turus terakhir" onClick={() => kirim({ t: "T_BATAL" })} className={TOMBOL_KECIL}>
              ↩️ Batal
            </button>
            <button type="button" aria-label="Ulangi turus" onClick={() => kirim({ t: "T_ULANG" })} className={TOMBOL_KECIL}>
              🔁 Ulangi
            </button>
            <button type="button" aria-label="Periksa turus" onClick={() => kirim({ t: "T_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "susun" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih data piktogram">
            {DATA_SUSUN.map((d, i) => (
              <Pilihan key={d.id} aktif={x.susun.data === i} onKlik={() => kirim({ t: "S_DATA", i })} label={`Data ${d.judul}`}>
                {d.judul}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Pilih keterangan simbol">
            <span className="text-xs font-black text-[#1C01A5]">Keterangan:</span>
            {SKALA.map((s) => (
              <Pilihan key={s} aktif={x.susun.skala === s} onKlik={() => kirim({ t: "S_SKALA", s })} label={`1 simbol = ${s} ${dS.satuan}`}>
                ● = {s}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">
            Data: {dS.kategori.map((k) => `${k.label} ${k.nilai}`).join(", ")}. Paling banyak {MAKS_SIMBOL} simbol per baris.
          </p>
          <div className="space-y-1 rounded-xl border-2 border-[#1C01A5]/40 bg-white p-2">
            <p className="text-center text-sm font-black text-[#1C01A5]">{dS.judul}</p>
            {dS.kategori.map((k, r) => (
              <div key={k.id} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-1 border-t border-[#1C01A5]/15 pt-1">
                <span className="text-xs font-black text-[#1C01A5]">{k.label}</span>
                <DeretSimbol n={x.susun.simbol[r]} ukuran={16} />
                <span className="flex items-center gap-1">
                  <button type="button" aria-label={`Kurangi simbol ${k.label}`} onClick={() => kirim({ t: "S_KURANG", r })} className={TOMBOL_BULAT}>
                    −
                  </button>
                  <button type="button" aria-label={`Tambah simbol ${k.label}`} onClick={() => kirim({ t: "S_TAMBAH", r })} className={TOMBOL_BULAT}>
                    +
                  </button>
                </span>
              </div>
            ))}
            <Keterangan skala={x.susun.skala} satuan={dS.satuan} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Kosongkan simbol" onClick={() => kirim({ t: "S_ULANG" })} className={TOMBOL_KECIL}>
              🧽 Kosongkan
            </button>
            <button type="button" aria-label="Periksa piktogram" onClick={() => kirim({ t: "S_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "baca" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih piktogram">
            {DATA_BACA.map((b, i) => (
              <Pilihan key={b.data.id} aktif={x.baca.data === i} onKlik={() => kirim({ t: "B_DATA", i })} label={`Piktogram ${b.data.judul}`}>
                {b.data.judul}
              </Pilihan>
            ))}
          </div>
          <Piktogram judul={baca.data.judul} baris={baca.data.kategori.map((k) => ({ label: k.label, n: k.nilai / baca.skala }))} skala={baca.skala} satuan={baca.data.satuan} />
          <div className="flex flex-wrap justify-center gap-1" role="group" aria-label="Pilih pertanyaan">
            {soal.map((s, i) => (
              <Pilihan key={s.id} aktif={x.baca.ke === i} onKlik={() => kirim({ t: "B_SOAL", i })} label={`Pertanyaan ${i + 1}`}>
                {i + 1}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">{q.tanya}</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan jawaban">
            {q.opsi.map((o) => (
              <button key={o} type="button" aria-label={`Jawab ${o}`} onClick={() => kirim({ t: "B_JAWAB", nilai: o })} className={TOMBOL_KECIL}>
                {o}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("turus");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${URUT[i]}, ${ejaK4B6(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
