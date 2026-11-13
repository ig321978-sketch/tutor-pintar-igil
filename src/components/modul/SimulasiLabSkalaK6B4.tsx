"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK6B4 } from "./eja-k6b4";
import { Catatan, PilihTiga, Roda, TanggaPeluang, Wadah } from "./model-skala-k6b4";
import {
  SOAL_PERCOBAAN,
  SOAL_TANGGA,
  SOAL_UJUNG,
  TANGGA,
  awalSkalaK6B4A,
  idPercobaan,
  idTangga,
  idUjung,
  isiUjung,
  kCatatan,
  kJuring,
  kTangga,
  keadaanSkalaK6B4A,
  langkahSkalaK6B4A,
  nCatatan,
  nTangga,
  nomorTangga,
  opsiCocok,
  opsiCatat,
  opsiKTangga,
  opsiNTangga,
  opsiPasti,
  opsiPrediksi,
  opsiTanggaTangga,
  opsiTanggaUjung,
  opsiTidak,
  soalPercobaan,
  soalTangga,
  soalUjung,
  ucapPercobaanK6B4A,
  ucapTanggaK6B4A,
  ucapUjungK6B4A,
  type KeadaanSkalaK6B4A,
} from "./lab-skala-k6b4a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K6B4 Sub-Bab A): Lab Skala. Satu alat, tiga tampilan.             */
/*  Tangga    : hitung yang cocok dan semua yang ada, lalu tempatkan di tangga. */
/*  Ujung     : geser ke ujung kiri (tidak mungkin) dan ujung kanan (pasti).   */
/*  Percobaan : prediksi dari roda, catat putaran, lalu cocokkan.              */
/* Logika: lab-skala-k6b4a.ts.                                                 */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Tangga, hitung yang cocok dan semua yang ada. Mengapa nol berarti tidak mungkin?",
  "Di Ujung, ganti bola sampai semuanya merah. Mengapa itu pasti?",
  "Di Percobaan, mengapa prediksi dibuat sebelum memutar roda?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const NAMA_TANGGA = [...TANGGA] as string[];

export default function SimulasiLabSkalaK6B4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSkalaK6B4A) => void }) {
  const [x, kirim] = useReducer(langkahSkalaK6B4A, undefined, awalSkalaK6B4A);
  const [lihat, setLihat] = useState<"tangga" | "ujung" | "percobaan">("tangga");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanSkalaK6B4A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "tangga" ? ucapTanggaK6B4A(x) : lihat === "ujung" ? ucapUjungK6B4A(x) : ucapPercobaanK6B4A(x);
  const ta = soalTangga(x);
  const uj = soalUjung(x);
  const pe = soalPercobaan(x);
  const tanda = (id: string) => (x.pernah.includes(id) ? "✅ " : "");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Skala</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Tempatkan kejadian di lima tangga peluang dan uji dengan percobaan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK6B4(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "tangga"} onKlik={() => pilihTampilan("tangga")}>
          📶 Tangga
        </Pilihan>
        <Pilihan aktif={lihat === "ujung"} onKlik={() => pilihTampilan("ujung")}>
          🏁 Ujung
        </Pilihan>
        <Pilihan aktif={lihat === "percobaan"} onKlik={() => pilihTampilan("percobaan")}>
          🎡 Percobaan
        </Pilihan>
      </div>

      {lihat === "tangga" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal tangga">
            {SOAL_TANGGA.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.tangga.data === i} onKlik={() => kirim({ t: "T_DATA", i })} label={`Pilih soal tangga ${s.nama}`}>
                {tanda(idTangga(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {ta.wadah[0].toUpperCase() + ta.wadah.slice(1)}. Yang dicari: {ta.sebut}.
          </p>
          <Wadah isi={ta.isi} target={ta.target} label={`${ta.wadah}, ${nTangga(ta)} benda`} />
          {x.tangga.tahap >= 1 ? <p className="text-center text-sm font-black text-[#1C01A5]">Yang cocok: {kTangga(ta)}.</p> : null}
          {x.tangga.tahap >= 2 ? <p className="text-center text-sm font-black text-[#1C01A5]">{kTangga(ta)} dari {nTangga(ta)}.</p> : null}
          <TanggaPeluang nama={NAMA_TANGGA} aktif={x.tangga.tahap >= 3 ? nomorTangga(kTangga(ta), nTangga(ta)) : undefined} />
          {x.tangga.tahap === 0 ? <PilihTiga judul={`Berapa ${ta.sebut} yang ada? Hitung satu per satu.`} awalan="Yang cocok" opsi={opsiKTangga(x.tangga.data).opsi} onPilih={(o) => kirim({ t: "T_K", o })} /> : null}
          {x.tangga.tahap === 1 ? <PilihTiga judul="Berapa semua benda yang ada, apa pun jenisnya?" awalan="Semua yang ada" opsi={opsiNTangga(x.tangga.data).opsi} onPilih={(o) => kirim({ t: "T_N", o })} /> : null}
          {x.tangga.tahap === 2 ? <PilihTiga judul={`${kTangga(ta)} dari ${nTangga(ta)}: di tangga mana kejadian ini?`} awalan="Tangga" opsi={opsiTanggaTangga(x.tangga.data).opsi} onPilih={(o) => kirim({ t: "T_TANGGA", o })} /> : null}
        </div>
      ) : null}

      {lihat === "ujung" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal ujung">
            {SOAL_UJUNG.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.ujung.data === i} onKlik={() => kirim({ t: "U_DATA", i })} label={`Pilih soal ujung ${s.nama}`}>
                {tanda(idUjung(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {uj.nama}: {uj.n} bola, {uj.k} bola merah.
          </p>
          <Wadah isi={isiUjung(uj)} target="merah" label={`${uj.nama}, ${uj.k} bola merah dari ${uj.n} bola`} />
          <TanggaPeluang nama={NAMA_TANGGA} aktif={x.ujung.tahap >= 1 ? nomorTangga(uj.k, uj.n) : undefined} />
          {x.ujung.tahap === 0 ? <PilihTiga judul={`${uj.k} bola merah dari ${uj.n} bola: di tangga mana mengambil bola merah?`} awalan="Tangga" opsi={opsiTanggaUjung(x.ujung.data).opsi} onPilih={(o) => kirim({ t: "U_TANGGA", o })} /> : null}
          {x.ujung.tahap === 1 ? <PilihTiga judul="Agar bola merah pasti, berapa bola biru yang diganti menjadi merah?" awalan="Bola diganti" opsi={opsiPasti(x.ujung.data).opsi} onPilih={(o) => kirim({ t: "U_PASTI", o })} /> : null}
          {x.ujung.tahap === 2 ? <PilihTiga judul="Agar bola merah tidak mungkin, berapa bola merah yang dikeluarkan?" awalan="Bola dikeluarkan" opsi={opsiTidak(x.ujung.data).opsi} onPilih={(o) => kirim({ t: "U_TIDAK", o })} /> : null}
        </div>
      ) : null}

      {lihat === "percobaan" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal percobaan">
            {SOAL_PERCOBAAN.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.percobaan.data === i} onKlik={() => kirim({ t: "C_DATA", i })} label={`Pilih soal percobaan ${s.nama}`}>
                {tanda(idPercobaan(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {pe.nama}: {pe.juring.length} juring. Yang dicari: juring {pe.target}.
          </p>
          <Roda juring={pe.juring} target={pe.target} label={`${pe.nama}, ${pe.juring.length} juring, ${kJuring(pe)} juring ${pe.target}`} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Catatan {nCatatan(pe)} putaran (lingkaran emas menandai {pe.target}):</p>
          <Catatan hasil={pe.catatan} target={pe.target} label={`Catatan ${nCatatan(pe)} putaran, ${kCatatan(pe)} kali ${pe.target}`} />
          <TanggaPeluang nama={NAMA_TANGGA} aktif={x.percobaan.tahap >= 1 ? nomorTangga(kJuring(pe), pe.juring.length) : undefined} />
          {x.percobaan.tahap >= 1 ? <p className="text-center text-xs font-black text-[#1C01A5]/80">Tangga emas: prediksi dari roda.</p> : null}
          {x.percobaan.tahap === 0 ? <PilihTiga judul={`Roda punya ${kJuring(pe)} juring ${pe.target} dari ${pe.juring.length}. Prediksi: di tangga mana?`} awalan="Prediksi" opsi={opsiPrediksi(x.percobaan.data).opsi} onPilih={(o) => kirim({ t: "C_PREDIKSI", o })} /> : null}
          {x.percobaan.tahap === 1 ? <PilihTiga judul={`Dari ${nCatatan(pe)} putaran, berapa kali hasilnya ${pe.target}?`} awalan="Muncul" opsi={opsiCatat(x.percobaan.data).opsi} onPilih={(o) => kirim({ t: "C_CATAT", o })} /> : null}
          {x.percobaan.tahap === 2 ? <PilihTiga judul="Catatan percobaan itu cocok dengan prediksi atau tidak?" awalan="Catatan" opsi={opsiCocok(x.percobaan.data).opsi} onPilih={(o) => kirim({ t: "C_COCOK", o })} /> : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("tangga");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK6B4(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
