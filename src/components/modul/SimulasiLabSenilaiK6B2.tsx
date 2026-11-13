"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK6B2 } from "./eja-k6b2";
import { PilihTiga, Tanda } from "./model-rasio-k6b2";
import { KotakSatuan, PecahanTumpuk, TabelKali } from "./model-senilai-k6b2";
import {
  SOAL_JEMBATAN,
  SOAL_SATUAN,
  SOAL_TABEL,
  awalSenilaiK6B2B,
  idJembatan,
  idSatuan,
  idTabel,
  keadaanSenilaiK6B2B,
  langkahSenilaiK6B2B,
  nilaiSatuan,
  opsiBanding,
  opsiCekTabel,
  opsiIsi,
  opsiPengali,
  opsiPengaliJ,
  opsiSatuan,
  opsiSenilai,
  opsiSilang,
  opsiTarget,
  satuanRata,
  soalJembatan,
  soalSatuan,
  soalTabel,
  ucapJembatanK6B2B,
  ucapSatuanK6B2B,
  ucapTabelK6B2B,
  type KeadaanSenilaiK6B2B,
} from "./lab-senilai-k6b2b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K6B2 Sub-Bab B): Lab Senilai. Satu alat, tiga tampilan.           */
/*  Tabel    : kalikan kedua suku dengan bilangan sama, lalu sederhanakan.     */
/*  Jembatan : rasio sebagai pecahan senilai, dicek perkalian silang.          */
/*  Satuan   : nilai untuk satu satuan, target, dan perbandingan.              */
/* Logika: lab-senilai-k6b2b.ts.                                               */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Tabel, kalikan kedua suku dengan bilangan yang sama. Mengapa menambah bilangan sama tidak menjaga rasio?",
  "Di Jembatan, cari pecahan senilai lalu cek dengan perkalian silang. Apa yang sama pada kedua hasil kali?",
  "Di Satuan, cari nilai untuk satu satuan. Mengapa nilai satuan membuat perbandingan paket lebih adil?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];

export default function SimulasiLabSenilaiK6B2({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSenilaiK6B2B) => void }) {
  const [x, kirim] = useReducer(langkahSenilaiK6B2B, undefined, awalSenilaiK6B2B);
  const [lihat, setLihat] = useState<"tabel" | "jembatan" | "satuan">("tabel");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanSenilaiK6B2B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "tabel" ? ucapTabelK6B2B(x) : lihat === "jembatan" ? ucapJembatanK6B2B(x) : ucapSatuanK6B2B(x);
  const tb = soalTabel(x);
  const jm = soalJembatan(x);
  const st = soalSatuan(x);
  const tanda = (id: string) => (x.pernah.includes(id) ? "✅ " : "");
  const u = satuanRata(st);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Senilai</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Kalikan kedua suku, cek pecahan senilai, lalu cari nilai satuan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK6B2(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "tabel"} onKlik={() => pilihTampilan("tabel")}>
          ▦ Tabel
        </Pilihan>
        <Pilihan aktif={lihat === "jembatan"} onKlik={() => pilihTampilan("jembatan")}>
          ⚖️ Jembatan
        </Pilihan>
        <Pilihan aktif={lihat === "satuan"} onKlik={() => pilihTampilan("satuan")}>
          1️⃣ Satuan
        </Pilihan>
      </div>

      {lihat === "tabel" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal tabel">
            {SOAL_TABEL.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.tabel.data === i} onKlik={() => kirim({ t: "TB_DATA", i })} label={`Pilih soal tabel ${s.nama}`}>
                {tanda(idTabel(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Suku kiri baru: {tb.a * tb.k}. Cari baris yang senilai dengan {tb.a} : {tb.b}.
          </p>
          <TabelKali ka={tb.ka} kb={tb.kb} a={tb.a} b={tb.b} kiri={tb.a * tb.k} kanan={x.tabel.tahap >= 2 ? tb.b * tb.k : "?"} pengali={x.tabel.tahap >= 1 ? tb.k : "?"} />
          {x.tabel.tahap === 0 ? <PilihTiga judul={`Suku kiri ${tb.a} menjadi ${tb.a * tb.k}. Kedua suku diapakan?`} awalan="Pengali" opsi={opsiPengali(x.tabel.data).opsi} onPilih={(o) => kirim({ t: "TB_PENGALI", o })} /> : null}
          {x.tabel.tahap === 1 ? <PilihTiga judul={`Berapa suku kanan baris baru, dari ${tb.b}?`} awalan="Suku kanan" opsi={opsiIsi(x.tabel.data).opsi} onPilih={(o) => kirim({ t: "TB_ISI", o })} /> : null}
          {x.tabel.tahap === 2 ? <PilihTiga judul={`Sederhanakan kembali ${tb.a * tb.k} : ${tb.b * tb.k}.`} awalan="Bentuk sederhana" opsi={opsiCekTabel(x.tabel.data).opsi} onPilih={(o) => kirim({ t: "TB_CEK", o })} /> : null}
        </div>
      ) : null}

      {lihat === "jembatan" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal jembatan">
            {SOAL_JEMBATAN.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.jembatan.data === i} onKlik={() => kirim({ t: "JM_DATA", i })} label={`Pilih soal jembatan ${s.nama}`}>
                {tanda(idJembatan(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1" role="img" aria-label={`${jm.a}/${jm.b} senilai dengan ${x.jembatan.tahap >= 1 ? `${jm.a * jm.m}/${jm.b * jm.m}` : "pecahan yang dicari"}`}>
            <PecahanTumpuk atas={jm.a} bawah={jm.b} />
            <Tanda t="=" />
            <PecahanTumpuk atas={x.jembatan.tahap >= 1 ? jm.a * jm.m : "?"} bawah={x.jembatan.tahap >= 1 ? jm.b * jm.m : "?"} />
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {x.jembatan.tahap >= 2 ? `Pembilang dan penyebut dikali ${jm.m}.` : `Rasio ${jm.a} : ${jm.b} ditulis sebagai pecahan ${jm.a}/${jm.b}.`}
          </p>
          {x.jembatan.tahap === 0 ? <PilihTiga judul={`Mana pecahan yang senilai dengan ${jm.a}/${jm.b}?`} awalan="Pecahan senilai" opsi={opsiSenilai(x.jembatan.data).opsi} onPilih={(o) => kirim({ t: "JM_SENILAI", o })} /> : null}
          {x.jembatan.tahap === 1 ? <PilihTiga judul="Apa yang dilakukan pada pembilang dan penyebut?" awalan="Pengali" opsi={opsiPengaliJ(x.jembatan.data).opsi} onPilih={(o) => kirim({ t: "JM_PENGALI", o })} /> : null}
          {x.jembatan.tahap === 2 ? <PilihTiga judul="Cek dengan perkalian silang. Mana yang benar?" awalan="Perkalian silang" opsi={opsiSilang(x.jembatan.data).opsi} onPilih={(o) => kirim({ t: "JM_SILANG", o })} /> : null}
        </div>
      ) : null}

      {lihat === "satuan" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal satuan">
            {SOAL_SATUAN.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.satuan.data === i} onKlik={() => kirim({ t: "ST_DATA", i })} label={`Pilih soal satuan ${s.nama}`}>
                {tanda(idSatuan(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {nilaiSatuan(st, st.a)} untuk {st.b} {st.kb}. Pembanding: {nilaiSatuan(st, st.pembanding)} per {st.kb}.
          </p>
          <KotakSatuan banyak={st.b} isi={x.satuan.tahap >= 1 ? nilaiSatuan(st, u) : "?"} nama={st.kb} />
          {x.satuan.tahap >= 2 ? (
            <p className="text-center text-sm font-black text-[#1C01A5]">
              {st.t} {st.kb} bernilai {nilaiSatuan(st, u * st.t)}.
            </p>
          ) : null}
          {x.satuan.tahap === 0 ? <PilihTiga judul={`Berapa nilai untuk satu ${st.kb}?`} awalan="Nilai satuan" opsi={opsiSatuan(x.satuan.data).opsi} onPilih={(o) => kirim({ t: "ST_SATUAN", o })} /> : null}
          {x.satuan.tahap === 1 ? <PilihTiga judul={`Berapa nilai untuk ${st.t} ${st.kb}?`} awalan="Nilai target" opsi={opsiTarget(x.satuan.data).opsi} onPilih={(o) => kirim({ t: "ST_TARGET", o })} /> : null}
          {x.satuan.tahap === 2 ? <PilihTiga judul="Bandingkan nilai satuan dengan pembanding." awalan="Perbandingan" opsi={opsiBanding(x.satuan.data).opsi} onPilih={(o) => kirim({ t: "ST_BANDING", o })} /> : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("tabel");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK6B2(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
