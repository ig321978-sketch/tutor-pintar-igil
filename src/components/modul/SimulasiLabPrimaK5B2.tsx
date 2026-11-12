"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B1 } from "./eja-k5b1";
import { KartuAngka } from "./model-jalur-k5b2";
import {
  DATA_GABUNG,
  DATA_POHON,
  DATA_PRIMA,
  PEMBAGI_PRIMA,
  adalahPrimaE,
  awalPrimaK5B2E,
  batasAmbil,
  bilPohon,
  bilPrima,
  daftarFaktorE,
  hasilGabung,
  hitungA,
  hitungB,
  keadaanPrimaK5B2E,
  langkahPrimaK5B2E,
  pasanganGabung,
  primaDaftarGabung,
  teksGabung,
  ucapGabungK5B2E,
  ucapPohonK5B2E,
  ucapPrimaK5B2E,
  type KeadaanPrimaK5B2E,
} from "./lab-prima-k5b2e";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B2 Sub-Bab E): Lab Pohon Prima. Satu alat, tiga tampilan.      */
/*  Prima  : cari faktor, putuskan prima atau bukan.                         */
/*  Pohon  : pecah daun dengan bilangan prima sampai semua daun prima.       */
/*  Gabung : KPK (terbanyak) dan FPB (paling sedikit) dari faktor prima.     */
/* Logika: lab-prima-k5b2e.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Prima, periksa satu. Mengapa satu bukan bilangan prima?",
  "Di Prima, periksa empat puluh sembilan. Mengapa ia bukan prima, padahal ganjil?",
  "Di Pohon, pilih daun yang sudah prima. Apa kata lab?",
  "Di Gabung, tukar cara KPK dengan cara FPB. Apa yang berbeda?",
];
const SEBUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const TOMBOL_PANAH = "h-8 w-8 rounded-lg border-2 border-[#1C01A5] bg-[#FFE566] text-sm font-black leading-none text-[#1C01A5]";

export default function SimulasiLabPrimaK5B2({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPrimaK5B2E) => void }) {
  const [x, kirim] = useReducer(langkahPrimaK5B2E, undefined, awalPrimaK5B2E);
  const [lihat, setLihat] = useState<"prima" | "pohon" | "gabung">("prima");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanPrimaK5B2E(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "prima" ? ucapPrimaK5B2E(x) : lihat === "pohon" ? ucapPohonK5B2E(x) : ucapGabungK5B2E(x);
  const nP = bilPrima(x);
  const nO = bilPohon(x);
  const [ga, gb] = pasanganGabung(x);
  const daftarPrima = primaDaftarGabung(x);
  const ca = hitungA(ga, gb);
  const cb = hitungB(ga, gb);
  const modeNama = x.gabung.mode === "kpk" ? "KPK" : "FPB";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Pohon Prima</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Pecah sampai prima, lalu cari KPK dan FPB.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "prima"} onKlik={() => pilihTampilan("prima")}>
          🔢 Prima
        </Pilihan>
        <Pilihan aktif={lihat === "pohon"} onKlik={() => pilihTampilan("pohon")}>
          🌳 Pohon
        </Pilihan>
        <Pilihan aktif={lihat === "gabung"} onKlik={() => pilihTampilan("gabung")}>
          🔗 Gabung
        </Pilihan>
      </div>

      {lihat === "prima" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan">
            {DATA_PRIMA.map((n, i) => (
              <Pilihan key={n} aktif={x.prima.data === i} onKlik={() => kirim({ t: "P_DATA", i })} label={`Periksa ${n}`}>
                {n}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <p className="text-3xl font-black text-[#1C01A5]">{nP}</p>
            <button type="button" aria-label="Cari faktor" onClick={() => kirim({ t: "P_CARI" })} className={TOMBOL_KECIL}>
              🔎 Cari faktor
            </button>
          </div>
          {x.prima.cari ? (
            <div className="flex flex-wrap items-center justify-center gap-1" aria-label="Semua faktor">
              <span className="text-xs font-black text-[#1C01A5]">Faktor {nP}:</span>
              {daftarFaktorE(nP).map((v) => (
                <KartuAngka key={v} n={v} tandai={false} />
              ))}
            </div>
          ) : null}
          <p className="text-center text-sm font-black text-[#1C01A5]">Apakah {nP} bilangan prima?</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Jawab prima" onClick={() => kirim({ t: "P_JAWAB", prima: true })} className={TOMBOL_KECIL}>
              Prima
            </button>
            <button type="button" aria-label="Jawab bukan prima" onClick={() => kirim({ t: "P_JAWAB", prima: false })} className={TOMBOL_KECIL}>
              Bukan prima
            </button>
          </div>
          <div className="flex min-h-9 flex-wrap items-center justify-center gap-1.5" aria-label="Bilangan prima yang ditemukan">
            <span className="text-xs font-black text-[#1C01A5]">Prima yang ditemukan:</span>
            {x.prima.ditemukan.length === 0 ? <span className="text-xs font-black text-[#1C01A5]">belum ada</span> : null}
            {x.prima.ditemukan.map((v) => (
              <KartuAngka key={v} n={v} tandai={false} />
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "pohon" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan">
            {DATA_POHON.map((n, i) => (
              <Pilihan key={n} aktif={x.pohon.data === i} onKlik={() => kirim({ t: "O_DATA", i })} label={`Pohon ${n}`}>
                {n}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk daun yang belum prima, lalu bagi dengan bilangan prima.</p>
          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Daun pohon faktor">
            {x.pohon.daun.map((v, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Daun ${i + 1}: ${v}`}
                aria-pressed={x.pohon.pilih === i}
                onClick={() => kirim({ t: "O_PILIH", i })}
                className={`min-w-11 rounded-xl border-4 px-2 py-1.5 text-lg font-black text-[#1C01A5] ${adalahPrimaE(v) ? "border-[#1C01A5] bg-[#FFE566]" : "border-[#1C01A5]/50 bg-white"} ${x.pohon.pilih === i ? "ring-4 ring-[#F0AB00]" : ""}`}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Bilangan prima pembagi">
            {PEMBAGI_PRIMA.map((p) => (
              <button key={p} type="button" aria-label={`Bagi dengan ${p}`} onClick={() => kirim({ t: "O_BAGI", p })} className={TOMBOL_KECIL}>
                ÷ {p}
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <button type="button" aria-label="Mulai lagi" onClick={() => kirim({ t: "O_ULANG" })} className={TOMBOL_KECIL}>
              🔁 Mulai lagi
            </button>
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Pohon faktor {nO}: kuning berarti sudah prima.</p>
        </div>
      ) : null}

      {lihat === "gabung" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pasangan bilangan">
            {DATA_GABUNG.map(([p, q], i) => (
              <Pilihan key={`${p}-${q}`} aktif={x.gabung.data === i} onKlik={() => kirim({ t: "G_DATA", i })} label={`Gabung ${p} dan ${q}`}>
                {p} dan {q}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih yang dicari">
            <Pilihan aktif={x.gabung.mode === "kpk"} onKlik={() => kirim({ t: "G_MODE", mode: "kpk" })} label="Cari KPK">
              KPK
            </Pilihan>
            <Pilihan aktif={x.gabung.mode === "fpb"} onKlik={() => kirim({ t: "G_MODE", mode: "fpb" })} label="Cari FPB">
              FPB
            </Pilihan>
          </div>
          <div className="space-y-1.5" role="group" aria-label="Faktor prima kedua bilangan">
            {daftarPrima.map((p, k) => (
              <div key={p} className="flex items-center justify-between gap-2 rounded-xl border-2 border-[#1C01A5]/40 bg-white px-2 py-1">
                <span className="text-sm font-black text-[#1C01A5]">
                  Faktor {p}: {ca[k]} kali di {ga}, {cb[k]} kali di {gb}
                </span>
                <span className="flex shrink-0 items-center gap-1">
                  <button type="button" aria-label={`Kurangi ${p}`} onClick={() => kirim({ t: "G_TURUN", k })} className={TOMBOL_PANAH}>
                    −
                  </button>
                  <span className="w-5 text-center text-base font-black text-[#1C01A5]">{x.gabung.ambil[k]}</span>
                  <button type="button" aria-label={`Tambah ${p}`} onClick={() => kirim({ t: "G_NAIK", k })} className={TOMBOL_PANAH} disabled={x.gabung.ambil[k] >= batasAmbil(x, k)}>
                    +
                  </button>
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]" aria-live="polite">
            {modeNama} sementara: {teksGabung(daftarPrima, x.gabung.ambil)} = {hasilGabung(daftarPrima, x.gabung.ambil)}
          </p>
          <div className="flex justify-center">
            <button type="button" aria-label="Periksa hasil" onClick={() => kirim({ t: "G_PERIKSA" })} className={TOMBOL_KECIL}>
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
          setLihat("prima");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((t, i) => `${SEBUT[i]}, ${ejaK5B1(t)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
