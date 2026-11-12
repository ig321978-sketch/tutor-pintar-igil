"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK4B3 } from "./eja-k4b3";
import { Pengatur } from "./model-pecahan-k4b2";
import { BatangNilai, PengaturTanda, tandaSelisih } from "./model-pola-k4b3";
import {
  ATURAN_B,
  DERET_B,
  TABEL_B,
  awalPolaBilanganK4B3B,
  keadaanPolaBilanganK4B3B,
  langkahPolaBilanganK4B3B,
  teksAturan,
  ucapAturanK4B3B,
  ucapSelisihK4B3B,
  ucapTabelK4B3B,
  type KeadaanPolaBilanganK4B3B,
} from "./lab-pola-bilangan-k4b3b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B3 Sub-Bab B): Lab Pola Bilangan. Satu alat, tiga tampilan.    */
/*  Selisih : ketuk pasangan suku berurutan, lalu tetapkan beda.               */
/*  Aturan  : mesin fungsi masukan → aturan → keluaran, dicocokkan catatan.    */
/*  Tabel   : tabel nilai suku ke-n.                                           */
/* Logika: lab-pola-bilangan-k4b3b.ts.                                         */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Selisih, ketuk semua pasangan 23, 18, 13, 8. Bedanya tambah atau kurang?",
  "Coba tetapkan beda +5 untuk pola 23, 18, 13, 8. Apa kata lab?",
  "Di Aturan, pasang aturan yang salah untuk telur. Apakah keluarannya cocok?",
  "Di Tabel, isi rak buku sampai rak ke-5.",
];
const URUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const SUKU = "flex h-11 min-w-11 items-center justify-center rounded-xl border-4 border-[#1C01A5] bg-white px-1.5 text-lg font-black text-[#1C01A5]";

export default function SimulasiLabPolaBilanganK4B3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPolaBilanganK4B3B) => void }) {
  const [x, kirim] = useReducer(langkahPolaBilanganK4B3B, undefined, awalPolaBilanganK4B3B);
  const [lihat, setLihat] = useState<"selisih" | "aturan" | "tabel">("selisih");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanPolaBilanganK4B3B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "selisih" ? ucapSelisihK4B3B(x) : lihat === "aturan" ? ucapAturanK4B3B(x) : ucapTabelK4B3B(x);
  const deret = DERET_B[x.sd];
  const cerita = ATURAN_B[x.ap];
  const tabel = TABEL_B[x.tb];
  const masukan = x.rantai[x.rantai.length - 1];
  const maksTabel = Math.max(...x.baris, x.nilai, 1);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Pola Bilangan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Pola bilangan punya beda tetap antar suku yang berurutan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B3(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "selisih"} onKlik={() => pilihTampilan("selisih")}>
          ↔️ Selisih
        </Pilihan>
        <Pilihan aktif={lihat === "aturan"} onKlik={() => pilihTampilan("aturan")}>
          ⚙️ Aturan
        </Pilihan>
        <Pilihan aktif={lihat === "tabel"} onKlik={() => pilihTampilan("tabel")}>
          📋 Tabel
        </Pilihan>
      </div>

      {lihat === "selisih" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pola bilangan">
            {DERET_B.map((d, i) => (
              <Pilihan key={d.id} aktif={x.sd === i} onKlik={() => kirim({ t: "S_DERET", i })} label={`Pola ${d.nama}`}>
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1" role="group" aria-label={`Suku pola ${deret.nama}`}>
            {deret.suku.map((v, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                {i > 0 ? (
                  <button
                    type="button"
                    aria-label={`Ketuk selisih ${deret.suku[i - 1]} dan ${v}`}
                    onClick={() => kirim({ t: "S_KETUK", j: i - 1 })}
                    className={`h-9 min-w-10 rounded-full border-2 px-1 text-sm font-black ${x.ketuk[i - 1] ? "border-[#1C01A5] bg-[#1C01A5] text-[#FFE566]" : "border-dashed border-[#F0AB00] bg-[#FFFBEB] text-[#1C01A5]"}`}
                  >
                    {x.ketuk[i - 1] ? tandaSelisih(v - deret.suku[i - 1]) : "?"}
                  </button>
                ) : null}
                <span className={SUKU}>{v}</span>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-black text-[#1C01A5]">Beda</span>
            <PengaturTanda nama="beda" nilai={x.tebak} onUbah={(d) => kirim({ t: "S_BEDA", d })} />
            <button type="button" aria-label="Cek beda" onClick={() => kirim({ t: "S_CEK" })} className={TOMBOL_KECIL}>
              Cek beda
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "aturan" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih cerita aturan">
            {ATURAN_B.map((c, i) => (
              <Pilihan key={c.id} aktif={x.ap === i} onKlik={() => kirim({ t: "A_POLA", i })} label={`Cerita ${c.nama}`}>
                {c.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Catatan buku: {cerita.catatan.join(", ")}, … ({cerita.satuan} ke-1, ke-2, ke-3)
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2" aria-label="Mesin aturan">
            <span className={SUKU} aria-label={`Masukan ${masukan}`}>
              {masukan}
            </span>
            <span className="text-xl font-black text-[#1C01A5]" aria-hidden>
              →
            </span>
            <span className="rounded-xl border-4 border-[#1C01A5] bg-[#1C01A5] px-3 py-2 text-sm font-black text-[#FFE566]">⚙️ {teksAturan(x.aturan)}</span>
            <span className="text-xl font-black text-[#1C01A5]" aria-hidden>
              →
            </span>
            <span className={`${SUKU} border-dashed border-[#F0AB00]`}>?</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-black text-[#1C01A5]">Aturan</span>
            <PengaturTanda nama="aturan" nilai={x.aturan} onUbah={(d) => kirim({ t: "A_ATURAN", d })} />
            <button type="button" aria-label="Jalankan mesin aturan" onClick={() => kirim({ t: "A_JALAN" })} className={TOMBOL_KECIL}>
              Jalankan
            </button>
          </div>
          <ol className="flex flex-wrap justify-center gap-2" aria-label={`Rantai ${cerita.nama}`}>
            {x.rantai.map((v, i) => (
              <li key={i} className="flex flex-col items-center">
                <span className="text-xs font-black text-[#1C01A5]">
                  {cerita.satuan} ke-{i + 1}
                </span>
                <span className={SUKU}>{v}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {lihat === "tabel" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tabel nilai">
            {TABEL_B.map((c, i) => (
              <Pilihan key={c.id} aktif={x.tb === i} onKlik={() => kirim({ t: "N_POLA", i })} label={`Tabel ${c.nama}`}>
                {c.nama}
              </Pilihan>
            ))}
          </div>
          <table className="mx-auto w-full max-w-xs border-collapse text-center text-sm font-black text-[#1C01A5]" aria-label={`Tabel nilai ${tabel.nama}`}>
            <thead>
              <tr className="bg-[#EDE9FE]">
                <th className="border-2 border-[#1C01A5] px-2 py-1">Suku ke-</th>
                <th className="border-2 border-[#1C01A5] px-2 py-1">Nilai</th>
                <th className="w-1/2 border-2 border-[#1C01A5] px-2 py-1">Batang</th>
              </tr>
            </thead>
            <tbody>
              {x.baris.map((v, i) => (
                <tr key={i}>
                  <td className="border-2 border-[#1C01A5] px-2 py-0.5">{i + 1}</td>
                  <td className="border-2 border-[#1C01A5] px-2 py-0.5 text-base">{v}</td>
                  <td className="border-2 border-[#1C01A5] px-2 py-0.5">
                    <BatangNilai nilai={v} maks={maksTabel} label={`Batang nilai ${v}`} />
                  </td>
                </tr>
              ))}
              <tr className="bg-[#FFFBEB]">
                <td className="border-2 border-dashed border-[#F0AB00] px-2 py-0.5">{x.baris.length + 1}</td>
                <td className="border-2 border-dashed border-[#F0AB00] px-2 py-0.5 text-base">{x.nilai}?</td>
                <td className="border-2 border-dashed border-[#F0AB00] px-2 py-0.5">
                  <BatangNilai nilai={x.nilai} maks={maksTabel} label={`Batang nilai pilihan ${x.nilai}`} />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" aria-label="Kurangi sepuluh nilai" onClick={() => kirim({ t: "N_NILAI", d: -10 })} className={TOMBOL_KECIL}>
              − 10
            </button>
            <Pengatur nama="nilai suku berikutnya" nilai={x.nilai} onUbah={(d) => kirim({ t: "N_NILAI", d })} />
            <button type="button" aria-label="Tambah sepuluh nilai" onClick={() => kirim({ t: "N_NILAI", d: 10 })} className={TOMBOL_KECIL}>
              + 10
            </button>
          </div>
          <div className="flex justify-center">
            <button type="button" aria-label="Isi baris tabel" onClick={() => kirim({ t: "N_ISI" })} className={TOMBOL_KECIL}>
              Isi baris
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
          setLihat("selisih");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${URUT[i]}, ${ejaK4B3(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
