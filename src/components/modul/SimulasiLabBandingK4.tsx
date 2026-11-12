"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import PapanK4, { AturDigit, PesanLabK4 } from "./papan-k4b1";
import { ejaK4B1 } from "./eja-k4b1";
import {
  DAFTAR_URUT,
  KARTU_C,
  URUT_C,
  angkaC,
  awalBandingK4B1C,
  bandingDariKiri,
  kalimatBandingC,
  keadaanBandingK4B1C,
  lambangC,
  langkahBanding,
  langkahBandingK4B1C,
  ucapBandingK4B1C,
  type KeadaanBandingK4B1C,
} from "./lab-banding-k4b1c";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B1 Sub-Bab C): Lab Banding. Satu alat, tiga tampilan.           */
/*  Dua Bilangan : banding dari ribuan; tempat penentu disorot; tanda.         */
/*  Urut         : tinggi gunung dan harga; naik atau turun.                    */
/*  Kartu Digit  : bilangan terbesar dan terkecil dari empat kartu.             */
/* Logika: lab-banding-k4b1c.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Buat 4.999 dan 5.111. Bilangan mana yang lebih besar? Mengapa?",
  "Buat dua bilangan yang hanya berbeda di satuan. Nyalakan Langkah.",
  "Di Urut, coba ketuk gunung yang bukan terendah dulu. Apa kata lab?",
  "Di Kartu Digit, boleh 0 di ribuan untuk bilangan terkecil?",
];

export default function SimulasiLabBandingK4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBandingK4B1C) => void }) {
  const [x, kirim] = useReducer(langkahBandingK4B1C, undefined, awalBandingK4B1C);
  const [lihat, setLihat] = useState<"dua" | "urut" | "kartu">("dua");

  useEffect(() => {
    onKeadaan?.(keadaanBandingK4B1C(x));
  }, [onKeadaan, x]);

  const h = bandingDariKiri(x.a, x.b);
  const urut = URUT_C[x.urut];
  const kartu = KARTU_C[x.kartu];
  const ucap = lihat === "dua" ? ucapBandingK4B1C(x) : lihat === "urut" ? `Urutkan ${urut.judul.toLowerCase()} ${x.arah === "naik" ? "dari terkecil" : "dari terbesar"}.` : `Susun bilangan ${x.tujuan} dari kartu ${kartu.join(", ")}.`;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Banding</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Bandingkan dari ribuan, temukan tempat penentu, urutkan, dan susun kartu digit.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "dua"} onKlik={() => setLihat("dua")}>
          ⚖️ Dua Bilangan
        </Pilihan>
        <Pilihan aktif={lihat === "urut"} onKlik={() => setLihat("urut")}>
          📶 Urut
        </Pilihan>
        <Pilihan aktif={lihat === "kartu"} onKlik={() => setLihat("kartu")}>
          🃏 Kartu Digit
        </Pilihan>
      </div>

      {lihat === "dua" ? (
        <div className={`${KARTU} space-y-3`}>
          {(["a", "b"] as const).map((bil) => (
            <div key={bil} className="space-y-1">
              <p className="text-xs font-black text-[#1C01A5]">Bilangan {bil === "a" ? "pertama" : "kedua"}</p>
              <div className="grid grid-cols-4 gap-1.5" role="group" aria-label={`Atur bilangan ${bil === "a" ? "pertama" : "kedua"}`}>
                {x[bil].map((v, i) => (
                  <AturDigit key={i} i={i} nilai={v} akhiran={bil === "a" ? " bilangan pertama" : " bilangan kedua"} onUbah={(d) => kirim({ t: "DIGIT", bil, i, d })} />
                ))}
              </div>
              <PapanK4 digit={x[bil]} sorot={x.langkah ? h.penentu : null} label={`Papan bilangan ${bil === "a" ? "pertama" : "kedua"}`} />
            </div>
          ))}
          <p className="text-center text-3xl font-black text-[#1C01A5]" aria-live="polite">
            {lambangC(angkaC(x.a))} {x.langkah ? h.tanda : "?"} {lambangC(angkaC(x.b))}
          </p>
          <Cek aktif={x.langkah} onKlik={() => kirim({ t: "LANGKAH" })}>
            Langkah
          </Cek>
        </div>
      ) : null}
      {lihat === "dua" && x.langkah ? (
        <div className={`${KARTU} space-y-1`}>
          <ol className="list-decimal space-y-0.5 pl-5 text-sm font-bold text-[#1C01A5]">
            {langkahBanding(x.a, x.b).map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ol>
          <KalimatBesar teks={kalimatBandingC(x.a, x.b)} warna="bg-[#FFF7CC]" />
        </div>
      ) : null}

      {lihat === "urut" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih data">
            {DAFTAR_URUT.map((id) => (
              <Pilihan key={id} aktif={x.urut === id} onKlik={() => kirim({ t: "URUT", id })}>
                {URUT_C[id].judul}
              </Pilihan>
            ))}
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
            {urut.item.map((it, i) => (
              <button
                key={it.nama}
                type="button"
                aria-label={`${it.nama} ${lambangC(it.n)}`}
                aria-pressed={x.dipilih.includes(i)}
                onClick={() => kirim({ t: "KETUK", i })}
                className={`rounded-xl border-4 px-3 py-2 text-left font-black ${x.dipilih.includes(i) ? "border-[#1C01A5]/20 bg-[#F5F3FF] text-[#1C01A5]/40" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
              >
                <span className="block text-xs">{it.nama}</span>
                <span className="block text-xl">{lambangC(it.n)}</span>
              </button>
            ))}
          </div>
          <p className="text-sm font-black text-[#1C01A5]">Urutanmu: {x.dipilih.length ? x.dipilih.map((i) => lambangC(urut.item[i].n)).join(", ") : "belum ada"}</p>
          <button type="button" onClick={() => kirim({ t: "ULANG_URUT" })} className={TOMBOL_BIASA}>
            ↺ Urut lagi
          </button>
        </div>
      ) : null}

      {lihat === "kartu" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih kartu">
            {KARTU_C.map((k, i) => (
              <Pilihan key={k.join("")} aktif={x.kartu === i} onKlik={() => kirim({ t: "KARTU_SET", i })} label={`Kartu ${k.join(" ")}`}>
                {k.join(" ")}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Tujuan">
            <Pilihan aktif={x.tujuan === "terbesar"} onKlik={() => kirim({ t: "TUJUAN", tujuan: "terbesar" })}>
              Bilangan terbesar
            </Pilihan>
            <Pilihan aktif={x.tujuan === "terkecil"} onKlik={() => kirim({ t: "TUJUAN", tujuan: "terkecil" })}>
              Bilangan terkecil
            </Pilihan>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Kartu yang tersedia">
            {kartu.map((v, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Taruh kartu ke-${i + 1} angka ${v}`}
                disabled={x.slot.includes(i)}
                onClick={() => kirim({ t: "TARUH", kartu: i })}
                className="h-12 w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] text-2xl font-black text-[#1C01A5] disabled:opacity-30"
              >
                {v}
              </button>
            ))}
          </div>
          <PapanK4 digit={x.slot.map((s) => (s === null ? null : kartu[s]))} label="Kartu di papan" />
          <p className="text-xs font-bold text-[#1C01A5]/70">Kartu diletakkan berurutan dari ribuan ke satuan.</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => kirim({ t: "KOSONGKAN" })} className={TOMBOL_BIASA}>
              ↺ Kosongkan
            </button>
            <button type="button" onClick={() => kirim({ t: "PERIKSA" })} className={TOMBOL_BIASA}>
              ✔ Periksa
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
          setLihat("dua");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK4B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
