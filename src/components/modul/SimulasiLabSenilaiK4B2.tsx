"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK4B2 } from "./eja-k4b2";
import { Batang, Pengatur, TulisPecahan } from "./model-pecahan-k4b2";
import {
  MAKS_KALI,
  SOAL_C,
  awalSenilaiK4B2C,
  fpbC,
  keadaanSenilaiK4B2C,
  langkahSenilaiK4B2C,
  sama,
  ucapModelK4B2C,
  ucapSederhanaK4B2C,
  ucapUbahK4B2C,
  type KeadaanSenilaiK4B2C,
} from "./lab-senilai-k4b2c";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B2 Sub-Bab C): Lab Senilai. Satu alat, tiga tampilan.          */
/*  Model     : pilih pecahan; dua batang sama panjang berdampingan.           */
/*  Ubah      : kalikan atau bagi pembilang dan penyebut dengan bilangan sama. */
/*  Sederhana : bagi dengan FPB sampai paling sederhana.                       */
/* Logika: lab-senilai-k4b2c.ts.                                               */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Pilih 1/3, lalu kalikan pembilang dan penyebut dengan 2. Apakah senilai?",
  "Ubah pembilang saja. Apa kata lab?",
  "Pilih 6/12 dan bagi dengan 6.",
  "Di Sederhana, sederhanakan 4/16.",
];

const arsirBagian = (p: number): number[] => Array.from({ length: p }, (_, i) => i);
const KALI = [2, 3, 4, 5].filter((k) => k <= MAKS_KALI);
const BAGI = [2, 3, 4, 5, 6];

export default function SimulasiLabSenilaiK4B2({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSenilaiK4B2C) => void }) {
  const [x, kirim] = useReducer(langkahSenilaiK4B2C, undefined, awalSenilaiK4B2C);
  const [lihat, setLihat] = useState<"model" | "ubah" | "sederhana">("model");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanSenilaiK4B2C(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "model" ? ucapModelK4B2C(x) : lihat === "ubah" ? ucapUbahK4B2C(x) : ucapSederhanaK4B2C(x);
  const senilai = sama(x);
  const g = fpbC(x.a, x.b);

  const dua = (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-3">
        <Batang bagian={x.b0} arsir={arsirBagian(x.a0)} lebar={190} tinggi={34} label={`Batang awal dibagi ${x.b0} bagian, ${x.a0} diarsir`} />
        <TulisPecahan p={x.a0} q={x.b0} />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Batang bagian={x.b} arsir={arsirBagian(x.a)} lebar={190} tinggi={34} label={`Batang sekarang dibagi ${x.b} bagian, ${x.a} diarsir`} />
        <TulisPecahan p={x.a} q={x.b} />
      </div>
      <p className="flex items-center justify-center gap-3 text-center text-2xl font-black text-[#1C01A5]" aria-live="polite">
        <TulisPecahan p={x.a0} q={x.b0} /> {senilai ? "=" : "≠"} <TulisPecahan p={x.a} q={x.b} />
      </p>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Senilai</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Ubah pembilang dan penyebut dengan bilangan yang sama, lalu sederhanakan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B2(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "model"} onKlik={() => pilihTampilan("model")}>
          🖼️ Model
        </Pilihan>
        <Pilihan aktif={lihat === "ubah"} onKlik={() => pilihTampilan("ubah")}>
          🔁 Ubah
        </Pilihan>
        <Pilihan aktif={lihat === "sederhana"} onKlik={() => pilihTampilan("sederhana")}>
          ✨ Sederhana
        </Pilihan>
      </div>

      {lihat === "model" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pecahan awal">
            {SOAL_C.map(([a, b], i) => (
              <Pilihan key={`${a}/${b}`} aktif={x.a0 === a && x.b0 === b} onKlik={() => kirim({ t: "SOAL", i })} label={`Pecahan ${a} per ${b}`}>
                {a}/{b}
              </Pilihan>
            ))}
          </div>
          {dua}
        </div>
      ) : null}

      {lihat === "ubah" ? (
        <div className={`${KARTU} space-y-3`}>
          {dua}
          <div className="space-y-1">
            <p className="text-xs font-black text-[#1C01A5]">Pembilang dan penyebut sama-sama dikali</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Kalikan pembilang dan penyebut">
              {KALI.map((k) => (
                <button key={k} type="button" aria-label={`Kalikan dengan ${k}`} onClick={() => kirim({ t: "KALI", k })} className="h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 font-black text-[#1C01A5]">
                  × {k}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black text-[#1C01A5]">Pembilang dan penyebut sama-sama dibagi</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Bagi pembilang dan penyebut">
              {BAGI.map((k) => (
                <button key={k} type="button" aria-label={`Bagi dengan ${k}`} onClick={() => kirim({ t: "BAGI", k })} className="h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-white px-2 font-black text-[#1C01A5]">
                  : {k}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black text-[#1C01A5]">Coba ubah satu saja</p>
            <div className="flex flex-wrap items-center gap-4">
              <Pengatur nama="pembilang saja" nilai={x.a} onUbah={(d) => kirim({ t: "PEMBILANG", d })} />
              <Pengatur nama="penyebut saja" nilai={x.b} onUbah={(d) => kirim({ t: "PENYEBUT", d })} />
            </div>
          </div>
          <button type="button" onClick={() => kirim({ t: "KEMBALI" })} className={TOMBOL_BIASA}>
            ↺ Kembali ke pecahan awal
          </button>
        </div>
      ) : null}

      {lihat === "sederhana" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pecahan awal">
            {SOAL_C.map(([a, b], i) => (
              <Pilihan key={`${a}/${b}`} aktif={x.a0 === a && x.b0 === b} onKlik={() => kirim({ t: "SOAL", i })} label={`Pecahan ${a} per ${b}`}>
                {a}/{b}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <TulisPecahan p={x.a} q={x.b} besar />
            <p className="text-sm font-black text-[#1C01A5]">FPB {x.a} dan {x.b} adalah {g}</p>
          </div>
          <Cek aktif={g === 1} onKlik={() => kirim({ t: "SEDERHANA" })}>
            Sederhanakan
          </Cek>
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("model");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK4B2(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
