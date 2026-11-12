"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B1 } from "./eja-k5b1";
import { KartuSuku, TumpukKartu, WARNA_KARTU_K5B1 } from "./model-susun-k5b1";
import {
  DATA_SUSUN,
  DATA_TUKAR,
  DATA_URAI,
  NAMA_KARTU,
  awalSusunK5B1C,
  dataSusun,
  dataTukar,
  dataUrai,
  jumlahKartu,
  keadaanSusunK5B1C,
  langkahSusunK5B1C,
  poolUrai,
  titik,
  ucapSusunK5B1C,
  ucapTukarK5B1C,
  ucapUraiK5B1C,
  type KeadaanSusunK5B1C,
} from "./lab-susun-k5b1c";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B1 Sub-Bab C): Lab Susun Bilangan. Satu alat, tiga tampilan.    */
/*  Urai  : pilih kartu suku bentuk panjang.                                  */
/*  Susun : susun bilangan dari kartu 10.000 sampai 1.                        */
/*  Tukar : tukar sepuluh kartu dengan satu kartu di kirinya.                 */
/* Logika: lab-susun-k5b1c.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Urai, pilih satu kartu yang hanya digitnya saja. Apa kata lab?",
  "Di Susun, tambah kartu sampai lebih dari seratus ribu. Apa yang terjadi?",
  "Di Susun, susun empat puluh lima ribu enam ratus dengan cara yang lain. Apakah boleh?",
  "Di Tukar, ubah seribu menjadi sepuluh kartu seratus. Apakah jumlahnya berubah?",
];
const SEBUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const TOMBOL_BULAT = "h-8 w-8 shrink-0 rounded-full border-2 border-[#1C01A5] bg-[#FFE566] font-black leading-none text-[#1C01A5]";

function Kolom({ k, n, children }: { k: number; n: number; children?: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1 rounded-lg border-2 border-[#1C01A5]/40 p-1" style={{ background: `${WARNA_KARTU_K5B1[k]}55` }}>
      <span className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{NAMA_KARTU[k]}</span>
      {children}
      <span className="text-xl font-black leading-none text-[#1C01A5]">{n}</span>
      <TumpukKartu n={n} warna={WARNA_KARTU_K5B1[k]} />
    </div>
  );
}

export default function SimulasiLabSusunK5B1({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSusunK5B1C) => void }) {
  const [x, kirim] = useReducer(langkahSusunK5B1C, undefined, awalSusunK5B1C);
  const [lihat, setLihat] = useState<"urai" | "susun" | "tukar">("urai");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanSusunK5B1C(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "urai" ? ucapUraiK5B1C(x) : lihat === "susun" ? ucapSusunK5B1C(x) : ucapTukarK5B1C(x);
  const dU = dataUrai(x);
  const dS = dataSusun(x);
  const dT = dataTukar(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Susun Bilangan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Satu bilangan, banyak cara menyusunnya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "urai"} onKlik={() => pilihTampilan("urai")}>
          🔍 Urai
        </Pilihan>
        <Pilihan aktif={lihat === "susun"} onKlik={() => pilihTampilan("susun")}>
          🧱 Susun
        </Pilihan>
        <Pilihan aktif={lihat === "tukar"} onKlik={() => pilihTampilan("tukar")}>
          🔄 Tukar
        </Pilihan>
      </div>

      {lihat === "urai" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan yang diuraikan">
            {DATA_URAI.map((d, i) => (
              <Pilihan key={d.n} aktif={x.urai.data === i} onKlik={() => kirim({ t: "U_DATA", i })} label={`Uraikan ${titik(d.n)}`}>
                {titik(d.n)}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-3xl font-black text-[#1C01A5]">{titik(dU.n)}</p>
          <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk kartu suku yang tepat. Satu suku untuk tiap digit yang bukan nol.</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Kartu suku">
            {poolUrai(x.urai.data).map((v) => (
              <KartuSuku key={v} teks={titik(v)} aktif={x.urai.pilih.includes(v)} onKlik={() => kirim({ t: "U_TOGGLE", v })} label={`Suku ${titik(v)}`} />
            ))}
          </div>
          <div className="min-h-12 rounded-xl border-4 border-dashed border-[#F0AB00] bg-[#FFF8DC] p-2 text-center" aria-live="polite">
            <span className="text-xs font-black text-[#1C01A5]">Bentuk panjang: </span>
            <span className="text-base font-black text-[#1C01A5]">{x.urai.pilih.length === 0 ? "…" : `${titik(dU.n)} = ${x.urai.pilih.map(titik).join(" + ")}`}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Kosongkan suku" onClick={() => kirim({ t: "U_ULANG" })} className={TOMBOL_KECIL}>
              🧽 Kosongkan
            </button>
            <button type="button" aria-label="Periksa uraian" onClick={() => kirim({ t: "U_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "susun" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan yang disusun">
            {DATA_SUSUN.map((d, i) => (
              <Pilihan key={d.n} aktif={x.susun.data === i} onKlik={() => kirim({ t: "S_DATA", i })} label={`Susun ${titik(d.n)}`}>
                {titik(d.n)}
              </Pilihan>
            ))}
          </div>
          <div className="rounded-xl border-4 border-dashed border-[#F0AB00] bg-[#FFF8DC] p-2 text-center">
            <p className="text-xs font-black text-[#1C01A5]">Susun dari kartu:</p>
            <p className="text-2xl font-black text-[#1C01A5]">{titik(dS.n)}</p>
          </div>
          <div className="grid grid-cols-5 gap-1" role="group" aria-label="Kartu">
            {NAMA_KARTU.map((nama, k) => (
              <Kolom key={nama} k={k} n={x.susun.kartu[k]}>
                <button type="button" aria-label={`Tambah kartu ${nama}`} onClick={() => kirim({ t: "S_TAMBAH", k })} className={TOMBOL_BULAT}>
                  +
                </button>
                <button type="button" aria-label={`Kurangi kartu ${nama}`} onClick={() => kirim({ t: "S_KURANG", k })} className={TOMBOL_BULAT}>
                  −
                </button>
              </Kolom>
            ))}
          </div>
          <p className="text-center text-xl font-black text-[#1C01A5]">Jumlah kartu: {titik(jumlahKartu(x.susun.kartu))}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Kosongkan kartu" onClick={() => kirim({ t: "S_ULANG" })} className={TOMBOL_KECIL}>
              🧽 Kosongkan
            </button>
            <button type="button" aria-label="Periksa kartu" onClick={() => kirim({ t: "S_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "tukar" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan yang ditukar">
            {DATA_TUKAR.map((d, i) => (
              <Pilihan key={d.n} aktif={x.tukar.data === i} onKlik={() => kirim({ t: "X_DATA", i })} label={`Tukar ${titik(d.n)}`}>
                {titik(d.n)}
              </Pilihan>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-1" role="group" aria-label="Kartu yang ditukar">
            {NAMA_KARTU.map((nama, k) => (
              <Kolom key={nama} k={k} n={x.tukar.kartu[k]} />
            ))}
          </div>
          <p className="text-center text-xl font-black text-[#1C01A5]">
            Jumlah tetap: {titik(jumlahKartu(x.tukar.kartu))}
            <span className="sr-only"> dari {titik(dT.n)}</span>
          </p>
          <div className="space-y-1" role="group" aria-label="Penukaran">
            {NAMA_KARTU.slice(0, 4).map((nama, k) => (
              <div key={nama} className="space-y-1 rounded-xl border-2 border-[#1C01A5]/40 px-2 py-1">
                <p className="text-center text-xs font-black text-[#1C01A5]">
                  1 kartu {nama} = 10 kartu {NAMA_KARTU[k + 1]}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" aria-label={`Tukar 1 kartu ${nama} menjadi 10 kartu ${NAMA_KARTU[k + 1]}`} onClick={() => kirim({ t: "X_PECAH", k })} className={TOMBOL_KECIL}>
                    ⬇ Pecah
                  </button>
                  <button type="button" aria-label={`Tukar 10 kartu ${NAMA_KARTU[k + 1]} menjadi 1 kartu ${nama}`} onClick={() => kirim({ t: "X_GABUNG", k })} className={TOMBOL_KECIL}>
                    ⬆ Gabung
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button type="button" aria-label="Kembalikan kartu awal" onClick={() => kirim({ t: "X_ULANG" })} className={TOMBOL_KECIL}>
              🔁 Awal
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
          setLihat("urai");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
