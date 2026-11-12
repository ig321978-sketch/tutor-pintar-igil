"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B1 } from "./eja-k5b1";
import { KartuAngka } from "./model-jalur-k5b2";
import { SusunanTitik } from "./model-faktor-k5b2";
import {
  DATA_PASANGAN,
  DATA_SUSUN,
  DATA_TANDA,
  awalFaktorK5B2C,
  bagiSusun,
  bilPasangan,
  bilSusun,
  bilTanda,
  keadaanFaktorK5B2C,
  langkahFaktorK5B2C,
  opsiPasangan,
  ucapPasanganK5B2C,
  ucapSusunK5B2C,
  ucapTandaK5B2C,
  type KeadaanFaktorK5B2C,
} from "./lab-faktor-k5b2c";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B2 Sub-Bab C): Lab Susunan Faktor. Satu alat, tiga tampilan.   */
/*  Susun    : susun titik dalam baris sama banyak, simpan yang tanpa sisa.  */
/*  Pasangan : cari pasangan tiap kandidat sampai bertemu di tengah.         */
/*  Tanda    : tandai semua faktor sebuah bilangan.                          */
/* Logika: lab-faktor-k5b2c.ts.                                               */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Susun, coba lima baris untuk dua puluh empat titik. Apa yang tersisa?",
  "Di Susun, simpan susunan satu baris. Apakah itu juga faktor?",
  "Di Pasangan, perhatikan kapan pencarian berhenti. Mengapa tidak perlu terus sampai akhir?",
  "Di Tanda, jangan tandai satu dan bilangannya sendiri. Apa kata lab?",
];
const SEBUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";

export default function SimulasiLabFaktorK5B2({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanFaktorK5B2C) => void }) {
  const [x, kirim] = useReducer(langkahFaktorK5B2C, undefined, awalFaktorK5B2C);
  const [lihat, setLihat] = useState<"susun" | "pasangan" | "tanda">("susun");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanFaktorK5B2C(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "susun" ? ucapSusunK5B2C(x) : lihat === "pasangan" ? ucapPasanganK5B2C(x) : ucapTandaK5B2C(x);
  const nS = bilSusun(x);
  const bagi = bagiSusun(x);
  const nP = bilPasangan(x);
  const nT = bilTanda(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Susunan Faktor</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Faktor membagi sebuah bilangan tanpa sisa.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "susun"} onKlik={() => pilihTampilan("susun")}>
          🧩 Susun
        </Pilihan>
        <Pilihan aktif={lihat === "pasangan"} onKlik={() => pilihTampilan("pasangan")}>
          🤝 Pasangan
        </Pilihan>
        <Pilihan aktif={lihat === "tanda"} onKlik={() => pilihTampilan("tanda")}>
          🏷️ Tanda
        </Pilihan>
      </div>

      {lihat === "susun" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih banyak titik">
            {DATA_SUSUN.map((n, i) => (
              <Pilihan key={n} aktif={x.susun.data === i} onKlik={() => kirim({ t: "S_DATA", i })} label={`Susun ${n} titik`}>
                {n} titik
              </Pilihan>
            ))}
          </div>
          <SusunanTitik baris={x.susun.baris} q={bagi.q} r={bagi.r} />
          <div className="flex items-center justify-center gap-3">
            <button type="button" aria-label="Kurangi baris" onClick={() => kirim({ t: "S_TURUN" })} className={TOMBOL_KECIL}>
              −
            </button>
            <p className="min-w-24 text-center text-lg font-black text-[#1C01A5]" aria-live="polite">
              {x.susun.baris} baris
            </p>
            <button type="button" aria-label="Tambah baris" onClick={() => kirim({ t: "S_NAIK" })} className={TOMBOL_KECIL}>
              +
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Kosongkan simpanan" onClick={() => kirim({ t: "S_BERSIH" })} className={TOMBOL_KECIL}>
              🧽 Kosongkan
            </button>
            <button type="button" aria-label="Simpan susunan" onClick={() => kirim({ t: "S_SIMPAN" })} className={TOMBOL_KECIL}>
              Simpan susunan
            </button>
          </div>
          <div className="flex min-h-9 flex-wrap items-center justify-center gap-1.5" aria-label="Susunan tersimpan">
            <span className="text-xs font-black text-[#1C01A5]">Tersimpan:</span>
            {x.susun.ditemukan.length === 0 ? <span className="text-xs font-black text-[#1C01A5]">belum ada</span> : null}
            {x.susun.ditemukan.map((v) => (
              <KartuAngka key={v} n={v} tandai={false} />
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">
            Susun {nS} titik dalam baris yang sama banyak. Simpan susunan yang semua titiknya terpakai.
          </p>
        </div>
      ) : null}

      {lihat === "pasangan" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan">
            {DATA_PASANGAN.map((n, i) => (
              <Pilihan key={n} aktif={x.pasangan.data === i} onKlik={() => kirim({ t: "P_DATA", i })} label={`Pasangan faktor ${n}`}>
                {n}
              </Pilihan>
            ))}
          </div>
          <div className="flex min-h-9 flex-wrap items-center justify-center gap-1.5" aria-live="polite" aria-label="Pasangan yang ditemukan">
            {x.pasangan.pasang.length === 0 ? <span className="text-xs font-black text-[#1C01A5]">Belum ada pasangan.</span> : null}
            {x.pasangan.pasang.map(([a, b]) => (
              <span key={a} className="rounded-lg border-2 border-[#1C01A5] bg-[#FFE566] px-2 py-0.5 text-sm font-black text-[#1C01A5]">
                {a} × {b}
              </span>
            ))}
          </div>
          {x.pasangan.selesai ? (
            <p className="text-center text-sm font-black text-[#1C01A5]">Pasangan sudah bertemu di tengah. Semua faktor {nP} sudah terdaftar.</p>
          ) : (
            <>
              <p className="text-center text-base font-black text-[#1C01A5]">
                {x.pasangan.a} × … = {nP}
              </p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan pasangan">
                {opsiPasangan(nP, x.pasangan.a).map((v) => (
                  <button key={v} type="button" aria-label={v === 0 ? "Pilih bukan faktor" : `Pilih ${v}`} onClick={() => kirim({ t: "P_JAWAB", nilai: v })} className={TOMBOL_KECIL}>
                    {v === 0 ? "Bukan faktor" : v}
                  </button>
                ))}
              </div>
            </>
          )}
          <div className="flex justify-center">
            <button type="button" aria-label="Mulai lagi" onClick={() => kirim({ t: "P_ULANG" })} className={TOMBOL_KECIL}>
              🔁 Mulai lagi
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "tanda" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan">
            {DATA_TANDA.map((n, i) => (
              <Pilihan key={n} aktif={x.tanda.data === i} onKlik={() => kirim({ t: "T_DATA", i })} label={`Tandai faktor ${n}`}>
                Faktor {n}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk semua bilangan yang membagi {nT} tanpa sisa. Ketuk lagi untuk melepas tanda.</p>
          <div className="flex flex-wrap justify-center gap-1" role="group" aria-label="Kartu bilangan">
            {Array.from({ length: nT }, (_, i) => i + 1).map((v) => (
              <KartuAngka key={v} n={v} tandai={x.tanda.tanda.includes(v)} onKlik={() => kirim({ t: "T_KLIK", n: v })} label={`Tandai ${v}`} warna="#fff" />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Bersihkan tanda" onClick={() => kirim({ t: "T_BERSIH" })} className={TOMBOL_KECIL}>
              🧽 Bersihkan
            </button>
            <button type="button" aria-label="Periksa tanda" onClick={() => kirim({ t: "T_CEK" })} className={TOMBOL_KECIL}>
              Periksa
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
          setLihat("susun");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((t, i) => `${SEBUT[i]}, ${ejaK5B1(t)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
