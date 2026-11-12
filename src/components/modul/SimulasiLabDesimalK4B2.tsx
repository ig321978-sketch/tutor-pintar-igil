"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK4B2 } from "./eja-k4b2";
import { Batang, Kisi100, Pengatur, TulisPecahan } from "./model-pecahan-k4b2";
import {
  awalDesimalK4B2D,
  banyakAngka,
  desimalJembatan,
  desimalPerseratus,
  desimalPersepuluh,
  keadaanDesimalK4B2D,
  langkahDesimalK4B2D,
  ucapJembatanK4B2D,
  ucapPerseratusK4B2D,
  ucapPersepuluhK4B2D,
  type KeadaanDesimalK4B2D,
} from "./lab-desimal-k4b2d";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B2 Sub-Bab D): Lab Desimal. Satu alat, tiga tampilan.          */
/*  Persepuluhan : batang 10 bagian; t/10 = 0,t.                               */
/*  Perseratusan : kisi 10 x 10; h/100 = 0,hh.                                 */
/*  Jembatan     : pecahan penyebut 10 atau 100 ke desimal.                    */
/* Logika: lab-desimal-k4b2d.ts.                                               */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Persepuluhan, atur batang menjadi 3/10. Berapa angka di belakang koma?",
  "Di Perseratusan, atur kisi menjadi 7/100. Mengapa ada nol setelah koma?",
  "Atur 10 kotak. 0,10 sama dengan desimal apa yang lebih pendek?",
  "Di Jembatan, atur 25/100 dan baca desimalnya.",
];

const arsirBagian = (p: number): number[] => Array.from({ length: p }, (_, i) => i);
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 font-black text-[#1C01A5]";

export default function SimulasiLabDesimalK4B2({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanDesimalK4B2D) => void }) {
  const [x, kirim] = useReducer(langkahDesimalK4B2D, undefined, awalDesimalK4B2D);
  const [lihat, setLihat] = useState<"persepuluh" | "perseratus" | "jembatan">("persepuluh");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanDesimalK4B2D(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "persepuluh" ? ucapPersepuluhK4B2D(x) : lihat === "perseratus" ? ucapPerseratusK4B2D(x) : ucapJembatanK4B2D(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Desimal</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Tulis pecahan per sepuluh dan per seratus sebagai desimal.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B2(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "persepuluh"} onKlik={() => pilihTampilan("persepuluh")}>
          🍞 Persepuluhan
        </Pilihan>
        <Pilihan aktif={lihat === "perseratus"} onKlik={() => pilihTampilan("perseratus")}>
          🔲 Perseratusan
        </Pilihan>
        <Pilihan aktif={lihat === "jembatan"} onKlik={() => pilihTampilan("jembatan")}>
          🌉 Jembatan
        </Pilihan>
      </div>

      {lihat === "persepuluh" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-black text-[#1C01A5]">Bagian diarsir</span>
            <Pengatur nama="bagian diarsir persepuluhan" nilai={x.t} onUbah={(d) => kirim({ t: "T", d })} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Batang bagian={10} arsir={arsirBagian(x.t)} lebar={200} tinggi={40} label={`Batang dibagi 10 bagian, ${x.t} diarsir`} />
            <TulisPecahan p={x.t} q={10} besar />
          </div>
          <p className="text-center text-3xl font-black text-[#1C01A5]" aria-live="polite">
            {x.t}/10 = {desimalPersepuluh(x.t)}
          </p>
        </div>
      ) : null}

      {lihat === "perseratus" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-black text-[#1C01A5]">Kotak diarsir</span>
            <Pengatur nama="kotak diarsir perseratusan" nilai={x.h} onUbah={(d) => kirim({ t: "H", d })} />
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" aria-label="Kurangi sepuluh kotak" onClick={() => kirim({ t: "H", d: -10 })} className={TOMBOL_KECIL}>
              − 10
            </button>
            <button type="button" aria-label="Tambah sepuluh kotak" onClick={() => kirim({ t: "H", d: 10 })} className={TOMBOL_KECIL}>
              + 10
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Kisi100 arsir={x.h} ukuran={140} label={`Kisi seratus kotak, ${x.h} diarsir`} />
            <TulisPecahan p={x.h} q={100} besar />
          </div>
          <p className="text-center text-3xl font-black text-[#1C01A5]" aria-live="polite">
            {x.h}/100 = {desimalPerseratus(x.h)}
          </p>
        </div>
      ) : null}

      {lihat === "jembatan" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih penyebut">
            <Pilihan aktif={x.q === 10} onKlik={() => kirim({ t: "JQ", q: 10 })}>
              Penyebut 10
            </Pilihan>
            <Pilihan aktif={x.q === 100} onKlik={() => kirim({ t: "JQ", q: 100 })}>
              Penyebut 100
            </Pilihan>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-black text-[#1C01A5]">Pembilang</span>
            <Pengatur nama="pembilang jembatan" nilai={x.p} onUbah={(d) => kirim({ t: "JP", d })} />
            {x.q === 100 ? (
              <>
                <button type="button" aria-label="Kurangi sepuluh pembilang" onClick={() => kirim({ t: "JP", d: -10 })} className={TOMBOL_KECIL}>
                  − 10
                </button>
                <button type="button" aria-label="Tambah sepuluh pembilang" onClick={() => kirim({ t: "JP", d: 10 })} className={TOMBOL_KECIL}>
                  + 10
                </button>
              </>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pecahan">
            {(
              [
                [3, 10],
                [5, 10],
                [7, 100],
                [25, 100],
              ] as const
            ).map(([p, q]) => (
              <button key={`${p}/${q}`} type="button" aria-label={`Pilih pecahan ${p} per ${q}`} onClick={() => kirim({ t: "JSET", p, q })} className={TOMBOL_KECIL}>
                {p}/{q}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <TulisPecahan p={x.p} q={x.q} besar />
            <span className="text-3xl font-black text-[#1C01A5]">= {desimalJembatan(x.p, x.q)}</span>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Angka di belakang koma: {banyakAngka(x.q)}</p>
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("persepuluh");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK4B2(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
