"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B8 } from "./eja-k5b8";
import { TurusSatu } from "./model-data-k5b8";
import {
  DATA_TURUS,
  awalDataK5B8A,
  banyakData,
  dataMode,
  dataTabel,
  dataTurus,
  idMode,
  idSalah,
  idTabel,
  idTurus,
  idPutus,
  jawabanBerikut,
  jumlahF,
  keadaanDataK5B8A,
  langkahDataK5B8A,
  opsiPutus,
  rekapSalah,
  ucapModeK5B8A,
  ucapTabelK5B8A,
  ucapTurusK5B8A,
  type KeadaanDataK5B8A,
} from "./lab-data-k5b8a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B8 Sub-Bab A): Lab Data. Satu alat, tiga tampilan.              */
/*  Turus : catat jawaban mentah satu per satu, kelompokkan lima-lima.         */
/*  Tabel : isi frekuensi dari turus, jumlahnya sama dengan banyak data.       */
/*  Mode  : cari frekuensi terbesar, lalu ambil keputusan dari data.           */
/* Logika: lab-data-k5b8a.ts.                                                  */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Turus, catat jawaban satu per satu. Mengapa empat garis tegak diberi satu garis miring?",
  "Di Tabel, jumlahkan semua frekuensi. Mengapa hasilnya harus sama dengan banyak data?",
  "Di Mode, cari frekuensi terbesar. Bagaimana bila ada dua kategori yang sama tinggi?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "min-h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 font-black text-[#1C01A5]";
const BARIS = "flex items-center justify-between gap-2 rounded-xl border-2 border-[#1C01A5]/30 bg-white px-2 py-1";

export default function SimulasiLabDataK5B8({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanDataK5B8A) => void }) {
  const [x, kirim] = useReducer(langkahDataK5B8A, undefined, awalDataK5B8A);
  const [lihat, setLihat] = useState<"turus" | "tabel" | "mode">("turus");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanDataK5B8A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "turus" ? ucapTurusK5B8A(x) : lihat === "tabel" ? ucapTabelK5B8A(x) : ucapModeK5B8A(x);
  const tu = dataTurus(x);
  const tb = dataTabel(x);
  const mo = dataMode(x);
  const berikut = jawabanBerikut(x);
  const tabelBenar = x.pernah.includes(idTabel(x.tabel.data));
  const modeBenar = x.pernah.includes(idMode(x.mode.data));
  const rekap = rekapSalah(tb);
  const putus = opsiPutus(x.mode.data);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Data</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Catat turus, susun tabel frekuensi, dan cari mode.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B8(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "turus"} onKlik={() => pilihTampilan("turus")}>
          ✏️ Turus
        </Pilihan>
        <Pilihan aktif={lihat === "tabel"} onKlik={() => pilihTampilan("tabel")}>
          📋 Tabel
        </Pilihan>
        <Pilihan aktif={lihat === "mode"} onKlik={() => pilihTampilan("mode")}>
          🏆 Mode
        </Pilihan>
      </div>

      {lihat === "turus" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih data">
            {DATA_TURUS.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.turus.data === i} onKlik={() => kirim({ t: "R_DATA", i })} label={`Pilih data ${d.nama}`}>
                {x.pernah.includes(idTurus(i)) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {berikut === null ? `Semua ${tu.mentah.length} jawaban sudah dicatat.` : `Jawaban ke-${x.turus.titik + 1} dari ${tu.mentah.length}: ${tu.kategori[berikut]}`}
          </p>
          <div className="space-y-2" role="group" aria-label="Catat turus">
            {tu.kategori.map((nama, k) => (
              <button key={nama} type="button" aria-label={`Catat ${nama}`} onClick={() => kirim({ t: "R_CATAT", k })} className={`${BARIS} w-full`}>
                <span className="text-left font-black text-[#1C01A5]">{nama}</span>
                <TurusSatu jumlah={x.turus.tally[k]} nama={nama} />
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "tabel" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih data tabel">
            {DATA_TURUS.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.tabel.data === i} onKlik={() => kirim({ t: "T_DATA", i })} label={`Pilih tabel ${d.nama}`}>
                {x.pernah.includes(idSalah(i)) ? "✅✅ " : x.pernah.includes(idTabel(i)) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <div className="space-y-2" role="group" aria-label="Isi frekuensi">
            {tb.kategori.map((nama, k) => (
              <div key={nama} className={`${BARIS} flex-wrap`}>
                <span className="w-24 shrink-0 text-left text-sm font-black text-[#1C01A5]">{nama}</span>
                <span className="min-w-0 flex-1 overflow-hidden">
                  <TurusSatu jumlah={tb.f[k]} nama={nama} />
                </span>
                <span className="flex items-center gap-1">
                  <button type="button" aria-label={`Kurangi frekuensi ${nama}`} onClick={() => kirim({ t: "T_UBAH", k, delta: -1 })} className={TOMBOL_KECIL}>
                    −
                  </button>
                  <span className="w-8 text-center text-lg font-black text-[#1C01A5]">{x.tabel.f[k]}</span>
                  <button type="button" aria-label={`Tambah frekuensi ${nama}`} onClick={() => kirim({ t: "T_UBAH", k, delta: 1 })} className={TOMBOL_KECIL}>
                    +
                  </button>
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Jumlah frekuensi = {jumlahF(x.tabel.f)} · Banyak data = {banyakData(tb)}
          </p>
          <div className="flex justify-center">
            <button type="button" aria-label="Periksa tabel" onClick={() => kirim({ t: "T_PERIKSA" })} className={TOMBOL_KECIL}>
              Periksa tabel
            </button>
          </div>
          {tabelBenar ? (
            <div className="space-y-2 rounded-xl border-2 border-dashed border-[#F0AB00] p-2">
              <p className="text-center text-sm font-black text-[#1C01A5]">Rekap temanmu: ada satu kategori yang salah. Ketuk kategorinya.</p>
              {tb.kategori.map((nama, k) => (
                <button key={nama} type="button" aria-label={`Tunjuk ${nama} salah`} onClick={() => kirim({ t: "T_TUNJUK", k })} className={`${BARIS} w-full`}>
                  <span className="text-left font-black text-[#1C01A5]">{nama}</span>
                  <span className="font-black text-[#1C01A5]">{rekap[k]}</span>
                </button>
              ))}
              <p className="text-center text-sm font-black text-[#1C01A5]">
                Jumlah rekap = {jumlahF(rekap)} · Banyak data = {banyakData(tb)}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}

      {lihat === "mode" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih data mode">
            {DATA_TURUS.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.mode.data === i} onKlik={() => kirim({ t: "M_DATA", i })} label={`Pilih mode ${d.nama}`}>
                {x.pernah.includes(idPutus(i)) ? "✅✅ " : x.pernah.includes(idMode(i)) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Frekuensi mana yang paling besar?</p>
          <div className="space-y-2" role="group" aria-label="Pilih mode">
            {mo.kategori.map((nama, k) => (
              <button key={nama} type="button" aria-label={`Pilih mode ${nama}`} onClick={() => kirim({ t: "M_PILIH", k })} className={`${BARIS} w-full`}>
                <span className="text-left font-black text-[#1C01A5]">{nama}</span>
                <span className="text-lg font-black text-[#1C01A5]">{mo.f[k]}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <button type="button" aria-label="Pilih ada yang sama tinggi" onClick={() => kirim({ t: "M_SERI" })} className={TOMBOL_KECIL}>
              Ada yang sama tinggi
            </button>
          </div>
          {modeBenar ? (
            <div className="space-y-2 rounded-xl border-2 border-dashed border-[#F0AB00] p-2">
              <p className="text-center text-sm font-black text-[#1C01A5]">Keputusan apa yang baik berdasarkan data?</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan keputusan">
                {putus.opsi.map((teks, o) => (
                  <button key={teks} type="button" aria-label={`Keputusan ${teks}`} onClick={() => kirim({ t: "M_PUTUS", o })} className={TOMBOL_KECIL}>
                    {teks}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
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

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B8(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
