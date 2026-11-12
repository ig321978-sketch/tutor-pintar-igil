"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK4B2 } from "./eja-k4b2";
import { GarisPecahan, Lingkaran, Pengatur, TulisPecahan } from "./model-pecahan-k4b2";
import {
  awalPecahanK4B2A,
  keadaanPecahanK4B2A,
  langkahPecahanK4B2A,
  tandaUnit,
  ucapBagiK4B2A,
  ucapBandingK4B2A,
  ucapGarisK4B2A,
  type KeadaanPecahanK4B2A,
} from "./lab-pecahan-k4b2a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B2 Sub-Bab A): Lab Pecahan. Satu alat, tiga tampilan.          */
/*  Bagi    : bagi keseluruhan menjadi n bagian sama besar, arsir satu.        */
/*  Banding : dua model satu per a dan satu per b berdampingan.                */
/*  Garis   : garis 0 sampai 1; temukan 1/n.                                    */
/* Logika: lab-pecahan-k4b2a.ts.                                               */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Bagi pizza menjadi 4 bagian sama besar, lalu arsir satu bagian.",
  "Nyalakan potongan tidak sama besar, lalu coba arsir. Apa kata lab?",
  "Bandingkan 1/2 dan 1/4. Bagian mana yang lebih besar?",
  "Di Garis, bagi garis menjadi 8 bagian dan ketuk 1/8.",
];

export default function SimulasiLabPecahanK4B2({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPecahanK4B2A) => void }) {
  const [x, kirim] = useReducer(langkahPecahanK4B2A, undefined, awalPecahanK4B2A);
  const [lihat, setLihat] = useState<"bagi" | "banding" | "garis">("bagi");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanPecahanK4B2A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "bagi" ? ucapBagiK4B2A(x) : lihat === "banding" ? ucapBandingK4B2A(x) : ucapGarisK4B2A(x);
  const t = tandaUnit(x.a, x.b);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Pecahan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Bagi sama besar, arsir satu bagian, bandingkan, dan temukan pecahan pada garis.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B2(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "bagi"} onKlik={() => pilihTampilan("bagi")}>
          🍕 Bagi
        </Pilihan>
        <Pilihan aktif={lihat === "banding"} onKlik={() => pilihTampilan("banding")}>
          ⚖️ Banding
        </Pilihan>
        <Pilihan aktif={lihat === "garis"} onKlik={() => pilihTampilan("garis")}>
          📏 Garis
        </Pilihan>
      </div>

      {lihat === "bagi" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-black text-[#1C01A5]">Banyak bagian</span>
            <Pengatur nama="banyak bagian" nilai={x.n} onUbah={(d) => kirim({ t: "PENYEBUT", d })} />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Ukuran potongan">
            <Pilihan aktif={x.sama} onKlik={() => (x.sama ? null : kirim({ t: "SAMA" }))}>
              Potongan sama besar
            </Pilihan>
            <Pilihan aktif={!x.sama} onKlik={() => (x.sama ? kirim({ t: "SAMA" }) : null)}>
              Potongan tidak sama besar
            </Pilihan>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Lingkaran bagian={x.n} sama={x.sama} arsir={x.arsir ? [0] : []} ukuran={150} />
            <div className="text-center">
              {x.arsir && x.sama ? <TulisPecahan p={1} q={x.n} besar /> : <span className="text-3xl font-black text-[#1C01A5]/40">?</span>}
            </div>
          </div>
          <Cek aktif={x.arsir} onKlik={() => kirim({ t: "ARSIR" })}>
            Arsir satu bagian
          </Cek>
        </div>
      ) : null}

      {lihat === "banding" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="grid grid-cols-2 gap-3">
            {(["a", "b"] as const).map((sisi) => (
              <div key={sisi} className="flex flex-col items-center gap-2">
                <p className="text-xs font-black text-[#1C01A5]">Model {sisi === "a" ? "pertama" : "kedua"}</p>
                <Lingkaran bagian={x[sisi]} arsir={[0]} ukuran={110} label={`Lingkaran dibagi ${x[sisi]} bagian sama besar, satu diarsir`} />
                <TulisPecahan p={1} q={x[sisi]} />
                <Pengatur nama={`banyak bagian model ${sisi === "a" ? "pertama" : "kedua"}`} nilai={x[sisi]} onUbah={(d) => kirim({ t: sisi === "a" ? "KIRI" : "KANAN", d })} />
              </div>
            ))}
          </div>
          <p className="flex items-center justify-center gap-3 text-center text-3xl font-black text-[#1C01A5]" aria-live="polite">
            <TulisPecahan p={1} q={x.a} besar /> {t} <TulisPecahan p={1} q={x.b} besar />
          </p>
        </div>
      ) : null}

      {lihat === "garis" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-black text-[#1C01A5]">Garis dibagi</span>
            <Pengatur nama="banyak bagian garis" nilai={x.g} onUbah={(d) => kirim({ t: "GARIS", d })} />
          </div>
          <GarisPecahan bagian={x.g} tanda={x.titik ? [x.titik] : []} sorot={x.titik} />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Ketuk tanda pada garis">
            {Array.from({ length: x.g }, (_, i) => i + 1).map((k) => (
              <button
                key={k}
                type="button"
                aria-label={`Tanda ke-${k} setelah nol`}
                aria-pressed={x.titik === k}
                onClick={() => kirim({ t: "TITIK", k })}
                className={`h-10 min-w-10 rounded-xl border-4 border-[#1C01A5] px-2 font-black ${x.titik === k ? "bg-[#F0AB00]" : "bg-[#FFE566]"} text-[#1C01A5]`}
              >
                {k}
              </button>
            ))}
          </div>
          <p className="text-xs font-bold text-[#1C01A5]/70">Ketuk nomor tanda yang menunjukkan 1/{x.g}. Hitung dari 0.</p>
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("bagi");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK4B2(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
