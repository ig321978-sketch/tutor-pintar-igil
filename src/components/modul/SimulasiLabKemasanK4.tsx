"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import PapanK4, { AturDigit, LATAR_TEMPAT_K4, PesanLabK4, WARNA_TEMPAT_K4 } from "./papan-k4b1";
import { ejaK4B1 } from "./eja-k4b1";
import {
  BATAS_K4B1,
  TARGET_TULIS,
  URUT_KEMASAN,
  awalKemasanK4B1A,
  bacaK4B1A,
  bagianBaca,
  digitEmpat,
  keadaanKemasanK4B1A,
  lambangK4B1,
  langkahKemasanK4B1A,
  totalKemasan,
  ucapRakitK4B1A,
  ucapTulisK4B1A,
  type JenisKemasan,
  type KeadaanKemasanK4B1A,
} from "./lab-kemasan-k4b1a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B1 Sub-Bab A): Lab Kemasan. Satu alat, dua tampilan.            */
/*  Rakit : peti, dus, bungkus, benda; penukaran otomatis; papan dan bacaan.    */
/*  Tulis : kata bilangan menjadi empat kartu angka.                            */
/* Logika: lab-kemasan-k4b1a.ts. Gambar hanya kotak, batang, titik, dan angka.  */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Tambah dus sampai sepuluh. Apa yang terjadi pada dus dan peti?",
  "Rakit 7.003 dan nyalakan Bacaan. Tempat mana yang tidak dibaca?",
  "Rakit 1.025. Mengapa dibaca seribu, bukan satu ribu?",
  "Di Tulis, susun kartu untuk tinggi Gunung Semeru, lalu tekan Periksa.",
];
const NAMA_KEMASAN: Record<JenisKemasan, string> = { peti: "Peti", dus: "Dus", bungkus: "Bungkus", benda: "Benda" };
const ISI_TEKS: Record<JenisKemasan, string> = { peti: "1.000", dus: "100", bungkus: "10", benda: "1" };

/** Gambar polos kemasan: peti kotak besar, dus kotak sedang, bungkus batang, benda titik. */
function GambarKemasan({ jenis, n, i }: { jenis: JenisKemasan; n: number; i: number }) {
  const warna = WARNA_TEMPAT_K4[i];
  const ukuran = jenis === "peti" ? "h-9 w-9" : jenis === "dus" ? "h-6 w-6" : jenis === "bungkus" ? "h-6 w-2" : "h-2.5 w-2.5 rounded-full";
  return (
    <span className="flex min-h-[2.5rem] flex-wrap items-center gap-1" aria-hidden="true">
      {Array.from({ length: n }, (_, k) => (
        <span key={k} className={`inline-block border-2 ${ukuran} ${jenis === "benda" ? "" : "rounded"}`} style={{ borderColor: warna, backgroundColor: LATAR_TEMPAT_K4[i] }} />
      ))}
      {n === 0 ? <span className="text-xs font-bold text-[#1C01A5]/40">kosong</span> : null}
    </span>
  );
}

export default function SimulasiLabKemasanK4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKemasanK4B1A) => void }) {
  const [x, kirim] = useReducer(langkahKemasanK4B1A, undefined, awalKemasanK4B1A);
  const [lihat, setLihat] = useState<"rakit" | "tulis">("rakit");

  useEffect(() => {
    onKeadaan?.(keadaanKemasanK4B1A(x));
  }, [onKeadaan, x]);

  const n = totalKemasan(x.k);
  const target = TARGET_TULIS[x.target];
  const ucap = lihat === "rakit" ? ucapRakitK4B1A(x) : ucapTulisK4B1A(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Kemasan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Rakit bilangan dengan peti, dus, bungkus, dan benda. Baca dan tulis bilangan sampai 10.000.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "rakit"} onKlik={() => setLihat("rakit")}>
          📦 Rakit
        </Pilihan>
        <Pilihan aktif={lihat === "tulis"} onKlik={() => setLihat("tulis")}>
          ✍️ Tulis
        </Pilihan>
      </div>

      {lihat === "rakit" ? (
        <div className={`${KARTU} space-y-3`}>
          <ul className="space-y-1.5" aria-label="Kemasan">
            {URUT_KEMASAN.map((j, i) => (
              <li key={j} className="flex items-center gap-2 rounded-xl border-2 px-2 py-1" style={{ borderColor: WARNA_TEMPAT_K4[i] }}>
                <span className="w-20 shrink-0 text-xs font-black" style={{ color: WARNA_TEMPAT_K4[i] }}>
                  {NAMA_KEMASAN[j]}
                  <span className="block text-[10px] font-bold text-[#1C01A5]/60">isi {ISI_TEKS[j]}</span>
                </span>
                <span className="min-w-0 flex-1">
                  <GambarKemasan jenis={j} n={x.k[j]} i={i} />
                </span>
                <button type="button" aria-label={`Kurangi 1 ${j}`} onClick={() => kirim({ t: "UBAH", jenis: j, d: -1 })} className="h-8 w-8 shrink-0 rounded-full border-4 border-[#1C01A5] bg-white text-lg font-black leading-none text-[#1C01A5]">
                  −
                </button>
                <span className="w-6 shrink-0 text-center text-lg font-black text-[#1C01A5]">{x.k[j]}</span>
                <button type="button" aria-label={`Tambah 1 ${j}`} onClick={() => kirim({ t: "UBAH", jenis: j, d: 1 })} className="h-8 w-8 shrink-0 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-lg font-black leading-none text-[#1C01A5]">
                  +
                </button>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Tampilan">
            <Cek aktif={x.papan} onKlik={() => kirim({ t: "TOGGLE", rep: "papan" })}>
              Papan
            </Cek>
            <Cek aktif={x.baca} onKlik={() => kirim({ t: "TOGGLE", rep: "baca" })}>
              Bacaan
            </Cek>
          </div>
          {x.papan ? (
            n === BATAS_K4B1 ? (
              <p className="rounded-xl bg-[#F3E8FF] p-2 text-center text-sm font-black text-[#1C01A5]">10 peti = 10.000 (sepuluh ribu). Papan empat tempat sudah penuh: ini batas bab ini.</p>
            ) : (
              <PapanK4 digit={digitEmpat(n)} />
            )
          ) : null}
          <p className="text-center text-3xl font-black text-[#1C01A5]" aria-live="polite">
            {lambangK4B1(n)}
          </p>
        </div>
      ) : null}
      {lihat === "rakit" && x.baca ? (
        <div className={`${KARTU} space-y-2`} aria-label="Bacaan per tempat">
          {n > 0 && n < BATAS_K4B1 ? (
            <div className="flex flex-wrap gap-1.5">
              {bagianBaca(n).map((b, i) =>
                b.kata === null && !b.lewati ? null : (
                  <span key={b.tempat} className="rounded-lg border-2 px-2 py-1 text-sm font-black" style={{ borderColor: WARNA_TEMPAT_K4[i], color: b.kata ? WARNA_TEMPAT_K4[i] : "#9CA3AF" }}>
                    {b.kata ?? `${b.tempat}: 0, dilewati`}
                  </span>
                ),
              )}
            </div>
          ) : null}
          <KalimatBesar teks={`${lambangK4B1(n)} dibaca ${bacaK4B1A(n)}`} warna="bg-[#FFF7CC]" />
        </div>
      ) : null}

      {lihat === "tulis" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex items-center justify-between gap-2">
            <button type="button" aria-label="Kata sebelumnya" onClick={() => kirim({ t: "TARGET", d: -1 })} className={TOMBOL_BIASA}>
              ◀
            </button>
            <div className="text-center">
              <p className="text-xs font-bold text-[#1C01A5]/70">{target.konteks}</p>
              <p className="text-lg font-black text-[#1C01A5]">{bacaK4B1A(target.n)}</p>
            </div>
            <button type="button" aria-label="Kata berikutnya" onClick={() => kirim({ t: "TARGET", d: 1 })} className={TOMBOL_BIASA}>
              ▶
            </button>
          </div>
          <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Kartu angka">
            {x.kartu.map((v, i) => (
              <AturDigit key={i} i={i} nilai={v} onUbah={(d) => kirim({ t: "KARTU", i, d })} />
            ))}
          </div>
          <PapanK4 digit={x.kartu} label="Kartu angka di papan" />
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
          setLihat("rakit");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK4B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
