"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK6B2 } from "./eja-k6b2";
import { KebunRasio, KelompokRasio, PilihTiga, Rasio, Tanda } from "./model-rasio-k6b2";
import {
  SOAL_ARAH,
  SOAL_SEDERHANA,
  SOAL_TULIS,
  awalRasioK6B2A,
  gcd,
  idArah,
  idSederhana,
  idTulis,
  keadaanRasioK6B2A,
  langkahRasioK6B2A,
  opsiBalik,
  opsiBeda,
  opsiKalimatTulis,
  opsiKanan,
  opsiKiri,
  opsiPembagi,
  opsiPertama,
  opsiRasioTulis,
  soalArah,
  soalSederhana,
  soalTulis,
  ucapArahK6B2A,
  ucapSederhanaK6B2A,
  ucapTulisK6B2A,
  type KeadaanRasioK6B2A,
} from "./lab-rasio-k6b2a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K6B2 Sub-Bab A): Lab Rasio. Satu alat, tiga tampilan.             */
/*  Tulis     : hitung dua jenis benda, tulis a : b, baca setiap a ada b.      */
/*  Sederhana : cari FPB, bagi kedua suku, kelompok sama isi tampak di gambar. */
/*  Arah      : a : b dan b : a berbeda makna.                                 */
/* Logika: lab-rasio-k6b2a.ts.                                                 */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Tulis, hitung kedua jenis benda lalu baca rasionya dengan kalimat setiap ada. Apa arti angka kiri?",
  "Di Sederhana, bagi kedua suku dengan pembagi yang sama. Mengapa tidak boleh membagi satu suku saja?",
  "Di Arah, balik urutan rasionya. Apa yang berubah pada maknanya?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "min-h-11 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 font-black text-[#1C01A5]";

export default function SimulasiLabRasioK6B2({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanRasioK6B2A) => void }) {
  const [x, kirim] = useReducer(langkahRasioK6B2A, undefined, awalRasioK6B2A);
  const [lihat, setLihat] = useState<"tulis" | "sederhana" | "arah">("tulis");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanRasioK6B2A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "tulis" ? ucapTulisK6B2A(x) : lihat === "sederhana" ? ucapSederhanaK6B2A(x) : ucapArahK6B2A(x);
  const tu = soalTulis(x);
  const se = soalSederhana(x);
  const ar = soalArah(x);
  const g = gcd(se.a, se.b);
  const tanda = (id: string) => (x.pernah.includes(id) ? "✅ " : "");
  const lengkapTulis = x.tulis.na === tu.a && x.tulis.nb === tu.b;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Rasio</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Tulis rasio, sederhanakan, lalu jaga arahnya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK6B2(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "tulis"} onKlik={() => pilihTampilan("tulis")}>
          ✏️ Tulis
        </Pilihan>
        <Pilihan aktif={lihat === "sederhana"} onKlik={() => pilihTampilan("sederhana")}>
          ➗ Sederhana
        </Pilihan>
        <Pilihan aktif={lihat === "arah"} onKlik={() => pilihTampilan("arah")}>
          ↔️ Arah
        </Pilihan>
      </div>

      {lihat === "tulis" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal tulis">
            {SOAL_TULIS.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.tulis.data === i} onKlik={() => kirim({ t: "T_DATA", i })} label={`Pilih soal tulis ${s.nama}`}>
                {tanda(idTulis(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Ada {tu.a} {tu.ka} dan {tu.b} {tu.kb}. Hitung satu per satu.
          </p>
          <KebunRasio ka={tu.ka} kb={tu.kb} a={tu.a} b={tu.b} na={x.tulis.na} nb={x.tulis.nb} />
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" aria-label={`Tambah satu ${tu.ka}`} onClick={() => kirim({ t: "T_TAMBAH_A" })} className={TOMBOL_KECIL}>
              + {tu.ka}
            </button>
            <button type="button" aria-label={`Tambah satu ${tu.kb}`} onClick={() => kirim({ t: "T_TAMBAH_B" })} className={TOMBOL_KECIL}>
              + {tu.kb}
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1" role="img" aria-label={`Rasio ${tu.ka} terhadap ${tu.kb}`}>
            <Rasio kiri={x.tulis.rasio ? tu.a : "?"} kanan={x.tulis.rasio ? tu.b : "?"} />
          </div>
          {lengkapTulis && !x.tulis.rasio ? (
            <PilihTiga judul={`Tulis rasio ${tu.ka} terhadap ${tu.kb}.`} awalan="Rasio" opsi={opsiRasioTulis(x.tulis.data).opsi} onPilih={(o) => kirim({ t: "T_RASIO", o })} />
          ) : null}
          {x.tulis.rasio && !x.tulis.selesai ? <PilihTiga judul="Pilih kalimat bacaan yang benar." awalan="Kalimat" opsi={opsiKalimatTulis(x.tulis.data).opsi} onPilih={(o) => kirim({ t: "T_KALIMAT", o })} /> : null}
        </div>
      ) : null}

      {lihat === "sederhana" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal sederhana">
            {SOAL_SEDERHANA.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.sederhana.data === i} onKlik={() => kirim({ t: "S_DATA", i })} label={`Pilih soal sederhana ${s.nama}`}>
                {tanda(idSederhana(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1" role="img" aria-label={`${se.a} banding ${se.b}`}>
            <Rasio kiri={se.a} kanan={se.b} />
            <Tanda t="=" />
            <Rasio kiri={x.sederhana.tahap >= 2 ? se.a / g : "?"} kanan={x.sederhana.tahap >= 3 ? se.b / g : "?"} />
          </div>
          {x.sederhana.tahap >= 1 ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">
                Dibagi {g}: ada {g} kelompok sama isi, tiap kelompok {se.a / g} dan {se.b / g}.
              </p>
              <KelompokRasio a={se.a} b={se.b} g={g} nama={se.nama} />
            </>
          ) : (
            <p className="text-center text-sm font-black text-[#1C01A5]">Cari pembagi yang membagi habis kedua suku.</p>
          )}
          {x.sederhana.tahap === 0 ? <PilihTiga judul="Pilih pembagi terbesar yang membagi habis kedua suku." awalan="Pembagi" opsi={opsiPembagi(x.sederhana.data).opsi} onPilih={(o) => kirim({ t: "S_PEMBAGI", o })} /> : null}
          {x.sederhana.tahap === 1 ? <PilihTiga judul={`Bagi suku kiri ${se.a} dengan ${g}. Hasilnya?`} awalan="Suku kiri" opsi={opsiKiri(x.sederhana.data).opsi} onPilih={(o) => kirim({ t: "S_KIRI", o })} /> : null}
          {x.sederhana.tahap === 2 ? <PilihTiga judul={`Bagi suku kanan ${se.b} dengan ${g}. Hasilnya?`} awalan="Suku kanan" opsi={opsiKanan(x.sederhana.data).opsi} onPilih={(o) => kirim({ t: "S_KANAN", o })} /> : null}
        </div>
      ) : null}

      {lihat === "arah" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal arah">
            {SOAL_ARAH.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.arah.data === i} onKlik={() => kirim({ t: "R_DATA", i })} label={`Pilih soal arah ${s.nama}`}>
                {tanda(idArah(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Ada {ar.a} {ar.ka} dan {ar.b} {ar.kb}.
          </p>
          <div className="space-y-1 text-center" role="img" aria-label={`${ar.ka} terhadap ${ar.kb}`}>
            <p className="text-sm font-black text-[#1C01A5]">
              {ar.ka} terhadap {ar.kb}
            </p>
            <Rasio kiri={x.arah.tahap >= 1 ? ar.a : "?"} kanan={x.arah.tahap >= 1 ? ar.b : "?"} />
          </div>
          <div className="space-y-1 text-center" role="img" aria-label={`${ar.kb} terhadap ${ar.ka}`}>
            <p className="text-sm font-black text-[#1C01A5]">
              {ar.kb} terhadap {ar.ka}
            </p>
            <Rasio kiri={x.arah.tahap >= 2 ? ar.b : "?"} kanan={x.arah.tahap >= 2 ? ar.a : "?"} />
          </div>
          {x.arah.tahap === 0 ? <PilihTiga judul={`Tulis rasio ${ar.ka} terhadap ${ar.kb}.`} awalan="Rasio pertama" opsi={opsiPertama(x.arah.data).opsi} onPilih={(o) => kirim({ t: "R_PERTAMA", o })} /> : null}
          {x.arah.tahap === 1 ? <PilihTiga judul={`Sekarang tulis rasio ${ar.kb} terhadap ${ar.ka}.`} awalan="Rasio kedua" opsi={opsiBalik(x.arah.data).opsi} onPilih={(o) => kirim({ t: "R_BALIK", o })} /> : null}
          {x.arah.tahap === 2 ? <PilihTiga judul="Apakah kedua rasio itu bermakna sama?" awalan="Makna" opsi={opsiBeda(x.arah.data).opsi} onPilih={(o) => kirim({ t: "R_BEDA", o })} /> : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("tulis");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK6B2(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
