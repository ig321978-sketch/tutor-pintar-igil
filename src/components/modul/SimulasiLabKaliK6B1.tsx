"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK6B1 } from "./eja-k6b1";
import { PetakArsir, Pecahan, Tanda, TeksPecahan } from "./model-kali-k6b1";
import {
  SOAL_LUAS,
  SOAL_PANAH,
  SOAL_TUKAR,
  awalKaliK6B1A,
  bisaSederhana,
  hasilTukar,
  idLuas,
  idPanah,
  idTukar,
  keadaanKaliK6B1A,
  langkahKaliK6B1A,
  opsiAsli,
  opsiAtas,
  opsiBawah,
  opsiCekTukar,
  opsiKaliTukar,
  opsiPembLuas,
  opsiPenyLuas,
  opsiRapiPanah,
  opsiRapiTukar,
  sederhanaTeks,
  soalLuas,
  soalPanah,
  soalTukar,
  ucapLuasK6B1A,
  ucapPanahK6B1A,
  ucapTukarK6B1A,
  type KeadaanKaliK6B1A,
} from "./lab-kali-k6b1a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K6B1 Sub-Bab A): Lab Kali Pecahan. Satu alat, tiga tampilan.      */
/*  Luas  : ember mengarsir kotak pada petak, pembilang bertambah, penyebut tetap. */
/*  Panah : bilangan asli ditulis a/1, panah lurus atas kali atas dan bawah kali bawah. */
/*  Tukar : pecahan kali bilangan asli, lalu urutan dibalik dan dicek.          */
/* Logika: lab-kali-k6b1a.ts.                                                  */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Luas, tambah ember satu per satu. Mengapa penyebutnya tidak berubah?",
  "Di Panah, tulis bilangan asli sebagai pecahan berpenyebut satu. Mengapa atas dikali atas dan bawah dikali bawah?",
  "Di Tukar, balik urutan perkaliannya. Apa yang terjadi pada hasilnya?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "min-h-11 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 font-black text-[#1C01A5]";
const OPSI_TOMBOL = "min-h-12 min-w-16 rounded-xl border-4 border-[#1C01A5] bg-white px-3 py-1 text-center text-lg font-black text-[#1C01A5]";

/** Satu baris pertanyaan dengan tiga pilihan; tiap pilihan bertumpuk bila berbentuk pecahan. */
function PilihTiga({ judul, awalan, opsi, onPilih }: { judul: string; awalan: string; opsi: readonly (string | number)[]; onPilih: (o: number) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-center text-sm font-black text-[#1C01A5]">{judul}</p>
      <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label={judul}>
        {opsi.map((v, o) => (
          <button key={String(v)} type="button" aria-label={`${awalan} ${ejaK6B1(String(v))}`} onClick={() => onPilih(o)} className={OPSI_TOMBOL}>
            <TeksPecahan teks={String(v)} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SimulasiLabKaliK6B1({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKaliK6B1A) => void }) {
  const [x, kirim] = useReducer(langkahKaliK6B1A, undefined, awalKaliK6B1A);
  const [lihat, setLihat] = useState<"luas" | "panah" | "tukar">("luas");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanKaliK6B1A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "luas" ? ucapLuasK6B1A(x) : lihat === "panah" ? ucapPanahK6B1A(x) : ucapTukarK6B1A(x);
  const lu = soalLuas(x);
  const pa = soalPanah(x);
  const tu = soalTukar(x);
  const tanda = (id: string) => (x.pernah.includes(id) ? "✅ " : "");
  const atasPanah = pa.w * pa.m;
  const atasTukar = tu.a * tu.b;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Kali Pecahan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Arsir petak, ikuti panah lurus, lalu tukar urutan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK6B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "luas"} onKlik={() => pilihTampilan("luas")}>
          🟩 Luas
        </Pilihan>
        <Pilihan aktif={lihat === "panah"} onKlik={() => pilihTampilan("panah")}>
          ➡️ Panah
        </Pilihan>
        <Pilihan aktif={lihat === "tukar"} onKlik={() => pilihTampilan("tukar")}>
          🔄 Tukar
        </Pilihan>
      </div>

      {lihat === "luas" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal luas">
            {SOAL_LUAS.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.luas.data === i} onKlik={() => kirim({ t: "L_DATA", i })} label={`Pilih soal luas ${s.nama}`}>
                {tanda(idLuas(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1" role="img" aria-label={`${lu.k} kali ${ejaK6B1(`${lu.m}/${lu.n}`)}`}>
            <span className="text-2xl font-black text-[#1C01A5]">{lu.k}</span>
            <Tanda t="×" />
            <Pecahan atas={lu.m} bawah={lu.n} />
            <Tanda t="=" />
            <Pecahan atas={x.luas.pemb ? lu.k * lu.m : "?"} bawah={x.luas.selesai ? lu.n : "?"} />
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Satu petak berisi {lu.n} kotak sama besar. Tiap ember mengisi {lu.m} kotak. Ember dipakai: {x.luas.ember} dari {lu.k}.
          </p>
          <PetakArsir n={lu.n} m={lu.m} ember={x.luas.ember} nama={lu.nama} />
          <div className="flex justify-center">
            <button type="button" aria-label="Tambah satu ember" onClick={() => kirim({ t: "L_TAMBAH" })} className={TOMBOL_KECIL}>
              + Ember
            </button>
          </div>
          {x.luas.ember >= lu.k && !x.luas.pemb ? <PilihTiga judul="Berapa kotak terarsir semuanya? Itu pembilangnya." awalan="Jumlah kotak" opsi={opsiPembLuas(x.luas.data).opsi} onPilih={(o) => kirim({ t: "L_PEMB", o })} /> : null}
          {x.luas.pemb && !x.luas.selesai ? <PilihTiga judul="Satu petak berisi berapa kotak? Itu penyebutnya." awalan="Penyebut" opsi={opsiPenyLuas(x.luas.data).opsi} onPilih={(o) => kirim({ t: "L_PENY", o })} /> : null}
        </div>
      ) : null}

      {lihat === "panah" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal panah">
            {SOAL_PANAH.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.panah.data === i} onKlik={() => kirim({ t: "P_DATA", i })} label={`Pilih soal panah ${s.nama}`}>
                {tanda(idPanah(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1" role="img" aria-label={`${pa.w} kali ${ejaK6B1(`${pa.m}/${pa.n}`)}`}>
            {x.panah.tahap >= 1 ? <Pecahan atas={pa.w} bawah={1} kotak /> : <span className="text-2xl font-black text-[#1C01A5]">{pa.w}</span>}
            <Tanda t="×" />
            <Pecahan atas={pa.m} bawah={pa.n} />
            <Tanda t="=" />
            <Pecahan atas={x.panah.tahap >= 2 ? atasPanah : "?"} bawah={x.panah.tahap >= 3 ? pa.n : "?"} />
            {x.panah.tahap === 4 && bisaSederhana(atasPanah, pa.n) ? (
              <>
                <Tanda t="=" />
                <TeksPecahan teks={sederhanaTeks(atasPanah, pa.n)} />
              </>
            ) : null}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Panah lurus: atas dikali atas, bawah dikali bawah.</p>
          {x.panah.tahap === 0 ? <PilihTiga judul={`Tulis ${pa.w} sebagai pecahan.`} awalan="Tulisan" opsi={opsiAsli(x.panah.data).opsi} onPilih={(o) => kirim({ t: "P_ASLI", o })} /> : null}
          {x.panah.tahap === 1 ? <PilihTiga judul="Atas dikali atas. Berapa pembilang hasilnya?" awalan="Atas" opsi={opsiAtas(x.panah.data).opsi} onPilih={(o) => kirim({ t: "P_ATAS", o })} /> : null}
          {x.panah.tahap === 2 ? <PilihTiga judul="Bawah dikali bawah. Berapa penyebut hasilnya?" awalan="Bawah" opsi={opsiBawah(x.panah.data).opsi} onPilih={(o) => kirim({ t: "P_BAWAH", o })} /> : null}
          {x.panah.tahap === 3 ? <PilihTiga judul="Sederhanakan pecahan hasilnya." awalan="Bentuk sederhana" opsi={opsiRapiPanah(x.panah.data).opsi} onPilih={(o) => kirim({ t: "P_RAPI", o })} /> : null}
        </div>
      ) : null}

      {lihat === "tukar" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal tukar">
            {SOAL_TUKAR.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.tukar.data === i} onKlik={() => kirim({ t: "T_DATA", i })} label={`Pilih soal tukar ${s.nama}`}>
                {tanda(idTukar(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1" role="img" aria-label={`${ejaK6B1(`${tu.a}/${tu.c}`)} kali ${tu.b}`}>
            <Pecahan atas={tu.a} bawah={tu.c} />
            <Tanda t="×" />
            <span className="text-2xl font-black text-[#1C01A5]">{tu.b}</span>
            <Tanda t="=" />
            {x.tukar.tahap >= 1 ? <Pecahan atas={atasTukar} bawah={tu.c} /> : <span className="text-2xl font-black text-[#1C01A5]">?</span>}
            {x.tukar.tahap >= 2 ? (
              <>
                <Tanda t="=" />
                <span className="text-2xl font-black text-[#1C01A5]">{hasilTukar(x.tukar.data)}</span>
              </>
            ) : null}
          </div>
          {x.tukar.tahap >= 2 ? (
            <div className="flex flex-wrap items-center justify-center gap-1" role="img" aria-label={`${tu.b} kali ${ejaK6B1(`${tu.a}/${tu.c}`)}`}>
              <span className="text-2xl font-black text-[#1C01A5]">{tu.b}</span>
              <Tanda t="×" />
              <Pecahan atas={tu.a} bawah={tu.c} />
              <Tanda t="=" />
              <span className="text-2xl font-black text-[#1C01A5]">{x.tukar.tahap === 3 ? hasilTukar(x.tukar.data) : "?"}</span>
            </div>
          ) : null}
          {x.tukar.tahap === 0 ? <PilihTiga judul={`Tulis ${tu.b} sebagai pecahan berpenyebut satu. Atas dikali atas: berapa pembilangnya?`} awalan="Hasil kali atas" opsi={opsiKaliTukar(x.tukar.data).opsi} onPilih={(o) => kirim({ t: "T_KALI", o })} /> : null}
          {x.tukar.tahap === 1 ? <PilihTiga judul={`${atasTukar}/${tu.c} sama dengan berapa utuh?`} awalan="Hasil utuh" opsi={opsiRapiTukar(x.tukar.data).opsi} onPilih={(o) => kirim({ t: "T_RAPI", o })} /> : null}
          {x.tukar.tahap === 2 ? <PilihTiga judul="Urutan dibalik. Apakah hasilnya sama?" awalan="Cek" opsi={opsiCekTukar(x.tukar.data).opsi} onPilih={(o) => kirim({ t: "T_CEK", o })} /> : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("luas");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK6B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
