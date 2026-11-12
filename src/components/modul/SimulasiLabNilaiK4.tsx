"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import PapanK4, { AturDigit, NAMA_TEMPAT_K4, PesanLabK4, WARNA_TEMPAT_K4 } from "./papan-k4b1";
import { ejaK4B1 } from "./eja-k4b1";
import {
  TABEL_B,
  angkaDari,
  awalNilaiK4B1B,
  kalimatNilai,
  keadaanNilaiK4B1B,
  kepingKolom,
  lambangB,
  langkahNilaiK4B1B,
  teksUraian,
  ucapNilaiK4B1B,
  type KeadaanNilaiK4B1B,
} from "./lab-nilai-k4b1b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B1 Sub-Bab B): Lab Nilai Tempat. Satu alat, dua tampilan.       */
/*  Nilai : papan empat kartu; ketuk angka untuk melihat nilainya; uraian.      */
/*  Tabel : tabel digit untuk bilangan buku; nilai penuh ditolak.               */
/* Logika: lab-nilai-k4b1b.ts. Hanya kartu angka dan warna tempat.             */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Atur papan menjadi 2.150. Ketuk angka 2, lalu angka 0. Berapa nilainya?",
  "Buat angka 6 di puluhan, lalu pindahkan ke ratusan. Apa yang berubah?",
  "Nyalakan Uraian. Apakah nol tetap ditulis?",
  "Di Tabel, coba tulis 7000 di kolom ribuan. Apa kata lab?",
];

export default function SimulasiLabNilaiK4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanNilaiK4B1B) => void }) {
  const [x, kirim] = useReducer(langkahNilaiK4B1B, undefined, awalNilaiK4B1B);
  const [lihat, setLihat] = useState<"nilai" | "tabel">("nilai");

  useEffect(() => {
    onKeadaan?.(keadaanNilaiK4B1B(x));
  }, [onKeadaan, x]);

  const n = angkaDari(x.d);
  const nTabel = TABEL_B[x.tabel];
  const ucap = lihat === "nilai" ? ucapNilaiK4B1B(x) : `Isi tabel digit untuk ${lambangB(nTabel)}. Pilih satu keping di tiap kolom.`;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Nilai Tempat</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Tempat menentukan nilai. Ketuk angka, nyalakan uraian, dan isi tabel digit.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "nilai"} onKlik={() => setLihat("nilai")}>
          📍 Nilai
        </Pilihan>
        <Pilihan aktif={lihat === "tabel"} onKlik={() => setLihat("tabel")}>
          📋 Tabel
        </Pilihan>
      </div>

      {lihat === "nilai" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Atur kartu angka">
            {x.d.map((v, i) => (
              <AturDigit key={i} i={i} nilai={v} onUbah={(d) => kirim({ t: "DIGIT", i, d })} />
            ))}
          </div>
          <PapanK4 digit={x.d} sorot={x.pilih} onKetuk={(i) => kirim({ t: "PILIH", i })} label="Ketuk angka untuk melihat nilainya" />
          <p className="text-center text-3xl font-black text-[#1C01A5]" aria-live="polite">
            {lambangB(n)}
          </p>
          <Cek aktif={x.uraian} onKlik={() => kirim({ t: "TOGGLE" })}>
            Uraian
          </Cek>
        </div>
      ) : null}
      {lihat === "nilai" && x.pilih !== null ? <KalimatBesar teks={kalimatNilai(x.d, x.pilih)} warna="bg-[#FFF7CC]" /> : null}
      {lihat === "nilai" && x.uraian ? <KalimatBesar teks={`${lambangB(n)} = ${teksUraian(x.d)}`} warna="bg-[#E8F7EE]" /> : null}

      {lihat === "tabel" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex items-center justify-between gap-2">
            <button type="button" aria-label="Bilangan sebelumnya" onClick={() => kirim({ t: "TABEL", d: -1 })} className={TOMBOL_BIASA}>
              ◀
            </button>
            <p className="text-3xl font-black text-[#1C01A5]">{lambangB(nTabel)}</p>
            <button type="button" aria-label="Bilangan berikutnya" onClick={() => kirim({ t: "TABEL", d: 1 })} className={TOMBOL_BIASA}>
              ▶
            </button>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="space-y-1 rounded-xl border-4 p-1 text-center" style={{ borderColor: WARNA_TEMPAT_K4[i] }}>
                <p className="text-[10px] font-black uppercase" style={{ color: WARNA_TEMPAT_K4[i] }}>
                  {NAMA_TEMPAT_K4[i]}
                </p>
                <p className="min-h-[2rem] text-2xl font-black text-[#1C01A5]">{x.isi[i] ?? "…"}</p>
                <div className="flex flex-col gap-1" role="group" aria-label={`Keping kolom ${NAMA_TEMPAT_K4[i].toLowerCase()}`}>
                  {kepingKolom(nTabel, i).map((kp) => (
                    <button
                      key={kp}
                      type="button"
                      aria-label={`Isi kolom ${NAMA_TEMPAT_K4[i].toLowerCase()} dengan ${kp}`}
                      aria-pressed={x.isi[i] === kp}
                      onClick={() => kirim({ t: "KEPING", i, nilai: kp })}
                      className={`rounded-lg border-2 px-1 py-0.5 text-sm font-black ${x.isi[i] === kp ? "border-indigo-950 bg-[#1C01A5] text-[#FFE566]" : "border-[#1C01A5]/40 bg-white text-[#1C01A5]"}`}
                    >
                      {kp}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => kirim({ t: "PERIKSA" })} className={TOMBOL_BIASA}>
            ✔ Periksa
          </button>
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("nilai");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK4B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
