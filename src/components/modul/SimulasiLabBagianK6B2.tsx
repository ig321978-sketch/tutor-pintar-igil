"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK6B2 } from "./eja-k6b2";
import { PilihTiga, Rasio } from "./model-rasio-k6b2";
import { BatangBagian, GarisWaktu } from "./model-bagian-k6b2";
import {
  SOAL_BAGIAN,
  SOAL_TOTAL,
  SOAL_WAKTU,
  awalBagianK6B2C,
  idBagian,
  idTotal,
  idWaktu,
  keadaanBagianK6B2C,
  langkahBagianK6B2C,
  opsiBedaTotal,
  opsiDurasi,
  opsiJam,
  opsiJumlah,
  opsiKa,
  opsiKb,
  opsiLaju,
  opsiSatu,
  opsiTargetWaktu,
  opsiTotalKa,
  opsiTotalKb,
  satuBagian,
  soalBagian,
  soalTotal,
  soalWaktu,
  ucapBagianK6B2C,
  ucapTotalK6B2C,
  ucapWaktuK6B2C,
  type KeadaanBagianK6B2C,
} from "./lab-bagian-k6b2c";

/* ------------------------------------------------------------------------ */
/* Simulasi (K6B2 Sub-Bab C): Lab Bagian. Satu alat, tiga tampilan.            */
/*  Bagian : jumlah suku menjadi banyak bagian, seluruhnya dibagi rata.        */
/*  Total  : bagian terhadap seluruhnya, beda dari bagian terhadap bagian.     */
/*  Waktu  : samakan satuan waktu (jam dan menit), lalu skala.                 */
/* Logika: lab-bagian-k6b2c.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Bagian, jumlahkan suku rasio untuk mendapat banyak bagian. Mengapa seluruhnya dibagi dengan jumlah itu?",
  "Di Total, bandingkan rasio bagian terhadap bagian dengan bagian terhadap seluruhnya. Apa bedanya?",
  "Di Waktu, samakan satuan waktu dulu. Mengapa kedua suku rasio dikali bilangan yang sama?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];

export default function SimulasiLabBagianK6B2({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBagianK6B2C) => void }) {
  const [x, kirim] = useReducer(langkahBagianK6B2C, undefined, awalBagianK6B2C);
  const [lihat, setLihat] = useState<"bagian" | "total" | "waktu">("bagian");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanBagianK6B2C(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "bagian" ? ucapBagianK6B2C(x) : lihat === "total" ? ucapTotalK6B2C(x) : ucapWaktuK6B2C(x);
  const bg = soalBagian(x);
  const tt = soalTotal(x);
  const wk = soalWaktu(x);
  const u = satuBagian(bg);
  const tanda = (id: string) => (x.pernah.includes(id) ? "✅ " : "");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Bagian</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Bagi menurut rasio, tulis bagian dari seluruhnya, lalu samakan satuan waktu.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK6B2(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "bagian"} onKlik={() => pilihTampilan("bagian")}>
          🧩 Bagian
        </Pilihan>
        <Pilihan aktif={lihat === "total"} onKlik={() => pilihTampilan("total")}>
          ⚖️ Total
        </Pilihan>
        <Pilihan aktif={lihat === "waktu"} onKlik={() => pilihTampilan("waktu")}>
          ⏱️ Waktu
        </Pilihan>
      </div>

      {lihat === "bagian" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal bagian">
            {SOAL_BAGIAN.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.bagian.data === i} onKlik={() => kirim({ t: "BG_DATA", i })} label={`Pilih soal bagian ${s.nama}`}>
                {tanda(idBagian(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {bg.ka} : {bg.kb} = {bg.a} : {bg.b}. Jumlah seluruhnya {bg.total}.
          </p>
          <BatangBagian a={bg.a} b={bg.b} nilai={x.bagian.tahap >= 2 ? u : "?"} nama={bg.nama} />
          {x.bagian.tahap >= 3 ? (
            <p className="text-center text-sm font-black text-[#1C01A5]">
              {bg.ka}: {u * bg.a}
              {x.bagian.tahap >= 4 ? `, ${bg.kb}: ${u * bg.b}` : ""}
            </p>
          ) : null}
          {x.bagian.tahap === 0 ? <PilihTiga judul={`Rasio ${bg.a} : ${bg.b}. Banyak bagian seluruhnya?`} awalan="Jumlah bagian" opsi={opsiJumlah(x.bagian.data).opsi} onPilih={(o) => kirim({ t: "BG_JUMLAH", o })} /> : null}
          {x.bagian.tahap === 1 ? <PilihTiga judul={`${bg.total} dibagi ${bg.a + bg.b} bagian. Nilai satu bagian?`} awalan="Nilai satu bagian" opsi={opsiSatu(x.bagian.data).opsi} onPilih={(o) => kirim({ t: "BG_SATU", o })} /> : null}
          {x.bagian.tahap === 2 ? <PilihTiga judul={`Banyak ${bg.ka}, yaitu ${bg.a} bagian?`} awalan="Benda pertama" opsi={opsiKa(x.bagian.data).opsi} onPilih={(o) => kirim({ t: "BG_KA", o })} /> : null}
          {x.bagian.tahap === 3 ? <PilihTiga judul={`Banyak ${bg.kb}, yaitu ${bg.b} bagian?`} awalan="Benda kedua" opsi={opsiKb(x.bagian.data).opsi} onPilih={(o) => kirim({ t: "BG_KB", o })} /> : null}
        </div>
      ) : null}

      {lihat === "total" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal total">
            {SOAL_TOTAL.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.total.data === i} onKlik={() => kirim({ t: "TT_DATA", i })} label={`Pilih soal total ${s.nama}`}>
                {tanda(idTotal(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {tt.ka} : {tt.kb} = {tt.a} : {tt.b}. Seluruhnya {tt.a + tt.b} bagian.
          </p>
          <BatangBagian a={tt.a} b={tt.b} nilai="1" nama={tt.nama} />
          <div className="flex flex-wrap items-center justify-center gap-2" role="img" aria-label={`${tt.ka} terhadap seluruhnya, dan ${tt.kb} terhadap seluruhnya`}>
            <Rasio kiri={tt.a} kanan={x.total.tahap >= 1 ? tt.a + tt.b : "?"} />
            <Rasio kiri={tt.b} kanan={x.total.tahap >= 2 ? tt.a + tt.b : "?"} />
          </div>
          {x.total.tahap === 0 ? <PilihTiga judul={`Tulis rasio ${tt.ka} terhadap seluruhnya.`} awalan="Rasio pertama" opsi={opsiTotalKa(x.total.data).opsi} onPilih={(o) => kirim({ t: "TT_KA", o })} /> : null}
          {x.total.tahap === 1 ? <PilihTiga judul={`Tulis rasio ${tt.kb} terhadap seluruhnya.`} awalan="Rasio kedua" opsi={opsiTotalKb(x.total.data).opsi} onPilih={(o) => kirim({ t: "TT_KB", o })} /> : null}
          {x.total.tahap === 2 ? <PilihTiga judul="Apa beda kedua jenis rasio itu?" awalan="Beda" opsi={opsiBedaTotal(x.total.data).opsi} onPilih={(o) => kirim({ t: "TT_BEDA", o })} /> : null}
        </div>
      ) : null}

      {lihat === "waktu" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal waktu">
            {SOAL_WAKTU.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.waktu.data === i} onKlik={() => kirim({ t: "WK_DATA", i })} label={`Pilih soal waktu ${s.nama}`}>
                {tanda(idWaktu(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {wk.a} {wk.satuan} dalam {wk.m} menit.
          </p>
          <GarisWaktu menit={wk.m} jumlah={wk.a} satuan={wk.satuan} nama={wk.nama} />
          {x.waktu.tahap >= 2 ? (
            <p className="text-center text-sm font-black text-[#1C01A5]">
              {(wk.a * 60) / wk.m} {wk.satuan} per jam.
            </p>
          ) : null}
          {x.waktu.tahap === 0 ? <PilihTiga judul="Satu jam sama dengan berapa menit?" awalan="Menit" opsi={opsiJam(x.waktu.data).opsi} onPilih={(o) => kirim({ t: "WK_JAM", o })} /> : null}
          {x.waktu.tahap === 1 ? <PilihTiga judul={`Dalam 60 menit, berapa ${wk.satuan}?`} awalan="Laju per jam" opsi={opsiLaju(x.waktu.data).opsi} onPilih={(o) => kirim({ t: "WK_LAJU", o })} /> : null}
          {x.waktu.tahap === 2 ? <PilihTiga judul={`Untuk ${wk.target} ${wk.satuan}, berapa menit?`} awalan="Menit untuk target" opsi={opsiTargetWaktu(x.waktu.data).opsi} onPilih={(o) => kirim({ t: "WK_TARGET", o })} /> : null}
          {x.waktu.tahap === 3 ? <PilihTiga judul={`Dalam ${wk.durasi} menit, berapa ${wk.satuan}?`} awalan="Hasil durasi" opsi={opsiDurasi(x.waktu.data).opsi} onPilih={(o) => kirim({ t: "WK_DURASI", o })} /> : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("bagian");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK6B2(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
