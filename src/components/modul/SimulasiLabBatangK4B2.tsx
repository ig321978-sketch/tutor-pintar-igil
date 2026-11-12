"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK4B2 } from "./eja-k4b2";
import { Batang, Pengatur, TulisPecahan } from "./model-pecahan-k4b2";
import {
  awalBatangK4B2B,
  keadaanBatangK4B2B,
  langkahBatangK4B2B,
  tandaSama,
  ucapBacaK4B2B,
  ucapBandingK4B2B,
  ucapUrutK4B2B,
  urutanTampil,
  type KeadaanBatangK4B2B,
} from "./lab-batang-k4b2b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B2 Sub-Bab B): Lab Batang. Satu alat, tiga tampilan.           */
/*  Baca    : batang p dari q bagian; baca pembilang dan penyebut.             */
/*  Banding : dua batang; penyebut sama berarti banding pembilang.             */
/*  Urut    : urutkan pecahan berpenyebut sama.                                */
/* Logika: lab-batang-k4b2b.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Atur batang menjadi 3/8. Mana pembilang, mana penyebut?",
  "Bandingkan 2/5 dan 4/5. Lihat pembilangnya.",
  "Ubah penyebut salah satu batang. Apa kata lab?",
  "Di Urut, ketuk pecahan yang bukan terkecil dulu. Apa kata lab?",
];

const arsirBagian = (p: number): number[] => Array.from({ length: p }, (_, i) => i);

export default function SimulasiLabBatangK4B2({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBatangK4B2B) => void }) {
  const [x, kirim] = useReducer(langkahBatangK4B2B, undefined, awalBatangK4B2B);
  const [lihat, setLihat] = useState<"baca" | "banding" | "urut">("baca");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanBatangK4B2B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "baca" ? ucapBacaK4B2B(x) : lihat === "banding" ? ucapBandingK4B2B(x) : ucapUrutK4B2B(x);
  const tampil = urutanTampil(x.qu);
  const sama = x.q1 === x.q2;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Batang</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Baca pecahan dari batang, bandingkan penyebut yang sama, dan urutkan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B2(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "baca"} onKlik={() => pilihTampilan("baca")}>
          📖 Baca
        </Pilihan>
        <Pilihan aktif={lihat === "banding"} onKlik={() => pilihTampilan("banding")}>
          ⚖️ Banding
        </Pilihan>
        <Pilihan aktif={lihat === "urut"} onKlik={() => pilihTampilan("urut")}>
          📶 Urut
        </Pilihan>
      </div>

      {lihat === "baca" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap items-center gap-4">
            <div className="space-y-1">
              <p className="text-xs font-black text-[#1C01A5]">Diarsir (pembilang)</p>
              <Pengatur nama="bagian diarsir" nilai={x.p} onUbah={(d) => kirim({ t: "BACA_P", d })} />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-black text-[#1C01A5]">Semua bagian (penyebut)</p>
              <Pengatur nama="semua bagian" nilai={x.q} onUbah={(d) => kirim({ t: "BACA_Q", d })} />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Batang bagian={x.q} arsir={arsirBagian(x.p)} lebar={230} tinggi={44} label={`Batang dibagi ${x.q} bagian, ${x.p} diarsir`} />
            <TulisPecahan p={x.p} q={x.q} besar />
          </div>
        </div>
      ) : null}

      {lihat === "banding" ? (
        <div className={`${KARTU} space-y-3`}>
          {([1, 2] as const).map((no) => {
            const q = no === 1 ? x.q1 : x.q2;
            const p = no === 1 ? x.p1 : x.p2;
            return (
              <div key={no} className="space-y-1">
                <p className="text-xs font-black text-[#1C01A5]">Batang {no === 1 ? "pertama" : "kedua"}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Batang bagian={q} arsir={arsirBagian(p)} lebar={190} tinggi={36} label={`Batang ${no === 1 ? "pertama" : "kedua"} dibagi ${q} bagian, ${p} diarsir`} />
                  <TulisPecahan p={p} q={q} />
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Pengatur nama={`bagian diarsir batang ${no === 1 ? "pertama" : "kedua"}`} nilai={p} onUbah={(d) => kirim({ t: no === 1 ? "P1" : "P2", d })} />
                  <Pengatur nama={`semua bagian batang ${no === 1 ? "pertama" : "kedua"}`} nilai={q} onUbah={(d) => kirim({ t: no === 1 ? "Q1" : "Q2", d })} />
                </div>
              </div>
            );
          })}
          <p className="flex items-center justify-center gap-3 text-center text-3xl font-black text-[#1C01A5]" aria-live="polite">
            <TulisPecahan p={x.p1} q={x.q1} besar /> {sama ? tandaSama(x.p1, x.p2, x.q1) : "?"} <TulisPecahan p={x.p2} q={x.q2} besar />
          </p>
          {!sama ? <p className="text-center text-xs font-black text-[#7F1D1D]">Penyebut berbeda: bagiannya tidak sama besar.</p> : null}
        </div>
      ) : null}

      {lihat === "urut" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-black text-[#1C01A5]">Penyebut</span>
            <Pengatur nama="penyebut urutan" nilai={x.qu} onUbah={(d) => kirim({ t: "URUT_Q", d })} />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Arah urutan">
            <Pilihan aktif={x.arah === "naik"} onKlik={() => kirim({ t: "ARAH", arah: "naik" })}>
              Naik (dari terkecil)
            </Pilihan>
            <Pilihan aktif={x.arah === "turun"} onKlik={() => kirim({ t: "ARAH", arah: "turun" })}>
              Turun (dari terbesar)
            </Pilihan>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Ketuk menurut urutan">
            {tampil.map((p, i) => (
              <button
                key={p}
                type="button"
                aria-label={`${p} per ${x.qu}`}
                aria-pressed={x.dipilih.includes(i)}
                onClick={() => kirim({ t: "KETUK", i })}
                className={`rounded-xl border-4 px-3 py-2 ${x.dipilih.includes(i) ? "border-[#1C01A5]/20 bg-[#F5F3FF] opacity-40" : "border-[#1C01A5] bg-[#FFE566]"}`}
              >
                <TulisPecahan p={p} q={x.qu} />
              </button>
            ))}
          </div>
          <p className="text-sm font-black text-[#1C01A5]">Urutanmu: {x.dipilih.length ? x.dipilih.map((i) => `${tampil[i]}/${x.qu}`).join(", ") : "belum ada"}</p>
          <button type="button" onClick={() => kirim({ t: "ULANG_URUT" })} className={TOMBOL_BIASA}>
            ↺ Urut lagi
          </button>
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("baca");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK4B2(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
