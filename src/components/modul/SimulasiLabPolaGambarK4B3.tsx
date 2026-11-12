"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK4B3 } from "./eja-k4b3";
import { Pengatur } from "./model-pecahan-k4b2";
import { DeretKumpulan, PengaturTanda, tandaSelisih } from "./model-pola-k4b3";
import {
  POLA_A,
  TABEL_A,
  awalPolaGambarK4B3A,
  jenisDari,
  keadaanPolaGambarK4B3A,
  kumpulanBuat,
  langkahPolaGambarK4B3A,
  selisihA,
  ucapBuatK4B3A,
  ucapLanjutK4B3A,
  ucapTabelK4B3A,
  type KeadaanPolaGambarK4B3A,
} from "./lab-pola-gambar-k4b3a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B3 Sub-Bab A): Lab Pola Gambar. Satu alat, tiga tampilan.      */
/*  Lanjut : susun titik kumpulan berikutnya, lalu periksa.                    */
/*  Tabel  : tabel selisih sampai kumpulan ke-n.                               */
/*  Buat   : pilih kumpulan pertama dan selisih, lab menentukan jenis pola.    */
/* Logika: lab-pola-gambar-k4b3a.ts.                                           */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Lanjut, pilih jeruk 2, 4, 6 lalu susun kumpulan berikutnya.",
  "Di Tabel, isi tabel jeruk sampai kumpulan ke-7.",
  "Di Tabel, pilih permen dan lanjutkan setelah kumpulan berisi 1.",
  "Di Buat, atur selisih 0. Apakah polanya membesar?",
];
const URUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";

export default function SimulasiLabPolaGambarK4B3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPolaGambarK4B3A) => void }) {
  const [x, kirim] = useReducer(langkahPolaGambarK4B3A, undefined, awalPolaGambarK4B3A);
  const [lihat, setLihat] = useState<"lanjut" | "tabel" | "buat">("lanjut");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanPolaGambarK4B3A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "lanjut" ? ucapLanjutK4B3A(x) : lihat === "tabel" ? ucapTabelK4B3A(x) : ucapBuatK4B3A(x);
  const pl = POLA_A[x.lp];
  const pt = POLA_A[TABEL_A[x.tp]];
  const buat = kumpulanBuat(x.awal, x.beda);
  const buatSah = buat.every((v) => v >= 0);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Pola Gambar</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Bandingkan dua kumpulan yang berurutan. Selisihnya tetap.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B3(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "lanjut"} onKlik={() => pilihTampilan("lanjut")}>
          ➡️ Lanjut
        </Pilihan>
        <Pilihan aktif={lihat === "tabel"} onKlik={() => pilihTampilan("tabel")}>
          📋 Tabel
        </Pilihan>
        <Pilihan aktif={lihat === "buat"} onKlik={() => pilihTampilan("buat")}>
          ✏️ Buat
        </Pilihan>
      </div>

      {lihat === "lanjut" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pola gambar">
            {POLA_A.map((p, i) => (
              <Pilihan key={p.id} aktif={x.lp === i} onKlik={() => kirim({ t: "L_POLA", i })} label={`Pola ${p.nama} ${p.awal.join(", ")}`}>
                {p.nama} {p.awal.join(", ")}
              </Pilihan>
            ))}
          </div>
          <DeretKumpulan label={`Pola ${pl.benda}`} nilai={[...pl.awal.map((n) => ({ n })), { n: x.isi, sorot: true }]} />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-black text-[#1C01A5]">Titik kumpulan ke-4</span>
            <Pengatur nama="titik kumpulan berikutnya" nilai={x.isi} onUbah={(d) => kirim({ t: "L_ISI", d })} />
            <button type="button" aria-label="Cek kumpulan berikutnya" onClick={() => kirim({ t: "L_CEK" })} className={TOMBOL_KECIL}>
              Cek
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "tabel" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pola tabel">
            {TABEL_A.map((pi, i) => (
              <Pilihan key={POLA_A[pi].id} aktif={x.tp === i} onKlik={() => kirim({ t: "T_POLA", i })} label={`Tabel ${POLA_A[pi].nama}`}>
                {POLA_A[pi].nama} {POLA_A[pi].awal.join(", ")}
              </Pilihan>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="mx-auto border-collapse text-center text-sm font-black text-[#1C01A5]" aria-label={`Tabel selisih ${pt.benda}`}>
              <thead>
                <tr className="bg-[#EDE9FE]">
                  <th className="border-2 border-[#1C01A5] px-2 py-1">Kumpulan</th>
                  <th className="border-2 border-[#1C01A5] px-2 py-1">Banyak {pt.benda}</th>
                  <th className="border-2 border-[#1C01A5] px-2 py-1">Selisih</th>
                </tr>
              </thead>
              <tbody>
                {x.baris.map((v, i) => (
                  <tr key={i}>
                    <td className="border-2 border-[#1C01A5] px-2 py-0.5">ke-{i + 1}</td>
                    <td className="border-2 border-[#1C01A5] px-2 py-0.5 text-base">{v}</td>
                    <td className="border-2 border-[#1C01A5] px-2 py-0.5">{i === 0 ? "" : tandaSelisih(v - x.baris[i - 1])}</td>
                  </tr>
                ))}
                <tr className="bg-[#FFFBEB]">
                  <td className="border-2 border-dashed border-[#F0AB00] px-2 py-0.5">ke-{x.baris.length + 1}</td>
                  <td className="border-2 border-dashed border-[#F0AB00] px-2 py-0.5 text-base">{x.nilai}?</td>
                  <td className="border-2 border-dashed border-[#F0AB00] px-2 py-0.5">…</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-black text-[#1C01A5]">Kumpulan ke-{x.baris.length + 1}</span>
            <Pengatur nama="banyak kumpulan berikutnya" nilai={x.nilai} onUbah={(d) => kirim({ t: "T_NILAI", d })} />
            <button type="button" aria-label="Tambah baris" onClick={() => kirim({ t: "T_TAMBAH" })} className={TOMBOL_KECIL}>
              Tambah baris
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "buat" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="w-32 text-sm font-black text-[#1C01A5]">Kumpulan pertama</span>
            <Pengatur nama="kumpulan pertama" nilai={x.awal} onUbah={(d) => kirim({ t: "B_AWAL", d })} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="w-32 text-sm font-black text-[#1C01A5]">Selisih</span>
            <PengaturTanda nama="selisih" nilai={x.beda} onUbah={(d) => kirim({ t: "B_BEDA", d })} />
          </div>
          {buatSah ? (
            <DeretKumpulan label="Pola buatanmu" nilai={buat.map((n) => ({ n }))} />
          ) : (
            <p className="rounded-xl bg-[#FDECEC] px-3 py-2 text-center text-sm font-black text-[#7F1D1D]">Ada kumpulan yang kurang dari nol. Banyak benda tidak bisa kurang dari nol.</p>
          )}
          <p className="text-center text-sm font-black text-[#1C01A5]">{buatSah ? `Selisih ${tandaSelisih(selisihA(buat))}: banyaknya ${jenisDari(buat) === "tetap" ? "tidak berubah" : jenisDari(buat) === "membesar" ? "bertambah" : "berkurang"}.` : "Besarkan kumpulan pertama."}</p>
          <div className="flex justify-center">
            <button type="button" aria-label="Periksa pola" onClick={() => kirim({ t: "B_CEK" })} className={TOMBOL_KECIL}>
              Periksa pola
            </button>
          </div>
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("lanjut");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${URUT[i]}, ${ejaK4B3(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
