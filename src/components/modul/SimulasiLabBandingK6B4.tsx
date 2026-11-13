"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK6B4 } from "./eja-k6b4";
import { PilihTiga, Roda } from "./model-skala-k6b4";
import { BatangBanding, HasilPemain, WadahCocok } from "./model-banding-k6b4";
import {
  SOAL_ADIL,
  SOAL_BANDING,
  SOAL_RASIO,
  awalBandingK6B4B,
  idAdil,
  idBanding,
  idRasio,
  kRasio,
  keadaanBandingK6B4B,
  langkahBandingK6B4B,
  menangA,
  menangB,
  nRasio,
  opsiMenangA,
  opsiMenangB,
  opsiNilaiAdil,
  opsiPilihBanding,
  opsiSisaRasio,
  opsiTotalBanding,
  opsiTotalRasio,
  opsiUntungBanding,
  opsiUntungRasio,
  soalAdil,
  soalBanding,
  soalRasio,
  totalBersama,
  ucapAdilK6B4B,
  ucapBandingK6B4B,
  ucapRasioK6B4B,
  untungA,
  untungB,
  type KeadaanBandingK6B4B,
} from "./lab-banding-k6b4b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K6B4 Sub-Bab B): Lab Banding. Satu alat, tiga tampilan.           */
/*  Rasio   : hasil menguntungkan, semua hasil, dan hasil yang tidak untung.   */
/*  Banding : samakan total dua peluang, lalu pilih yang lebih mungkin.        */
/*  Adil    : hasil menang dua pemain, lalu nilai adil atau kurang adil.       */
/* Logika: lab-banding-k6b4b.ts.                                               */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Rasio, hitung hasil menguntungkan dan semua hasil. Mengapa peluang besar belum pasti?",
  "Di Banding, samakan total dua peluang. Mengapa total harus sama sebelum dibandingkan?",
  "Di Adil, hitung hasil menang tiap pemain. Kapan permainan disebut adil?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];

export default function SimulasiLabBandingK6B4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBandingK6B4B) => void }) {
  const [x, kirim] = useReducer(langkahBandingK6B4B, undefined, awalBandingK6B4B);
  const [lihat, setLihat] = useState<"rasio" | "banding" | "adil">("rasio");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanBandingK6B4B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "rasio" ? ucapRasioK6B4B(x) : lihat === "banding" ? ucapBandingK6B4B(x) : ucapAdilK6B4B(x);
  const ra = soalRasio(x);
  const ba = soalBanding(x);
  const ad = soalAdil(x);
  const T = totalBersama(ba);
  const tanda = (id: string) => (x.pernah.includes(id) ? "✅ " : "");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Banding</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Hitung peluang, samakan total, lalu nilai adil atau tidak.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK6B4(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "rasio"} onKlik={() => pilihTampilan("rasio")}>
          ➗ Rasio
        </Pilihan>
        <Pilihan aktif={lihat === "banding"} onKlik={() => pilihTampilan("banding")}>
          🔎 Banding
        </Pilihan>
        <Pilihan aktif={lihat === "adil"} onKlik={() => pilihTampilan("adil")}>
          ⚖️ Adil
        </Pilihan>
      </div>

      {lihat === "rasio" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal rasio">
            {SOAL_RASIO.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.rasio.data === i} onKlik={() => kirim({ t: "R_DATA", i })} label={`Pilih soal rasio ${s.nama}`}>
                {tanda(idRasio(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {ra.wadah[0].toUpperCase() + ra.wadah.slice(1)}. Yang diharapkan: {ra.sebut}.
          </p>
          {ra.bentuk === "roda" ? (
            <Roda juring={ra.isi} target={ra.cocok[0]} label={`${ra.wadah}, ${nRasio(ra)} juring, ${kRasio(ra)} juring ${ra.cocok[0]}`} />
          ) : (
            <WadahCocok isi={ra.isi} cocok={ra.cocok} label={`${ra.wadah}, ${nRasio(ra)} hasil`} />
          )}
          {x.rasio.tahap >= 1 ? <p className="text-center text-sm font-black text-[#1C01A5]">Hasil menguntungkan: {kRasio(ra)}.</p> : null}
          {x.rasio.tahap >= 2 ? <p className="text-center text-sm font-black text-[#1C01A5]">Peluang: {kRasio(ra)} dari {nRasio(ra)}, ditulis {kRasio(ra)}/{nRasio(ra)}.</p> : null}
          {x.rasio.tahap === 0 ? <PilihTiga judul={`Berapa hasil menguntungkan, yaitu ${ra.sebut}?`} awalan="Menguntungkan" opsi={opsiUntungRasio(x.rasio.data).opsi} onPilih={(o) => kirim({ t: "R_UNTUNG", o })} /> : null}
          {x.rasio.tahap === 1 ? <PilihTiga judul="Berapa semua hasil yang mungkin?" awalan="Semua hasil" opsi={opsiTotalRasio(x.rasio.data).opsi} onPilih={(o) => kirim({ t: "R_TOTAL", o })} /> : null}
          {x.rasio.tahap === 2 ? <PilihTiga judul="Berapa hasil yang tidak menguntungkan?" awalan="Tidak menguntungkan" opsi={opsiSisaRasio(x.rasio.data).opsi} onPilih={(o) => kirim({ t: "R_SISA", o })} /> : null}
        </div>
      ) : null}

      {lihat === "banding" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal banding">
            {SOAL_BANDING.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.banding.data === i} onKlik={() => kirim({ t: "B_DATA", i })} label={`Pilih soal banding ${s.nama}`}>
                {tanda(idBanding(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <div className="space-y-1 text-center text-sm font-black text-[#1C01A5]">
            <p>
              {ba.a.sebut}: {ba.a.k} dari {ba.a.n}
              {x.banding.tahap >= 2 ? `, sama dengan ${untungA(ba)} dari ${T}` : ""}.
            </p>
            <p>
              {ba.b.sebut}: {ba.b.k} dari {ba.b.n}
              {x.banding.tahap >= 3 ? `, sama dengan ${untungB(ba)} dari ${T}` : ""}.
            </p>
            {x.banding.tahap >= 1 ? <p>Total bersama paling kecil: {T}.</p> : null}
          </div>
          {x.banding.tahap >= 3 ? (
            <BatangBanding
              label={`Pada total ${T}, ${ba.a.sebut} ${untungA(ba)} dan ${ba.b.sebut} ${untungB(ba)}`}
              baris={[
                { nama: ba.a.sebut, teks: `${untungA(ba)} dari ${T}`, isi: untungA(ba), total: T },
                { nama: ba.b.sebut, teks: `${untungB(ba)} dari ${T}`, isi: untungB(ba), total: T },
              ]}
            />
          ) : null}
          {x.banding.tahap === 0 ? <PilihTiga judul={`Total bersama paling kecil dari ${ba.a.n} dan ${ba.b.n}?`} awalan="Total bersama" opsi={opsiTotalBanding(x.banding.data).opsi} onPilih={(o) => kirim({ t: "B_TOTAL", o })} /> : null}
          {x.banding.tahap === 1 ? <PilihTiga judul={`${ba.a.k} dari ${ba.a.n} sama dengan berapa dari ${T}?`} awalan="Setara" opsi={opsiUntungBanding(x.banding.data).opsi} onPilih={(o) => kirim({ t: "B_UNTUNG", o })} /> : null}
          {x.banding.tahap === 2 ? <PilihTiga judul="Samakan yang kedua pada total yang sama. Mana yang lebih mungkin?" awalan="Pilihan" opsi={opsiPilihBanding(x.banding.data).opsi} onPilih={(o) => kirim({ t: "B_PILIH", o })} /> : null}
        </div>
      ) : null}

      {lihat === "adil" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal adil">
            {SOAL_ADIL.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.adil.data === i} onKlik={() => kirim({ t: "D_DATA", i })} label={`Pilih soal adil ${s.nama}`}>
                {tanda(idAdil(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {ad.wadah[0].toUpperCase() + ad.wadah.slice(1)}. Biru muda: hasil menang pemain A. Emas: hasil menang pemain B.
          </p>
          <HasilPemain isi={ad.isi} a={ad.a} b={ad.b} label={`${ad.wadah}, ${ad.isi.length} hasil, pemain A menang pada ${menangA(ad)} dan pemain B pada ${menangB(ad)}`} />
          {x.adil.tahap >= 1 ? <p className="text-center text-sm font-black text-[#1C01A5]">Pemain A menang pada {menangA(ad)} dari {ad.isi.length} hasil.</p> : null}
          {x.adil.tahap >= 2 ? <p className="text-center text-sm font-black text-[#1C01A5]">Pemain B menang pada {menangB(ad)} dari {ad.isi.length} hasil.</p> : null}
          {x.adil.tahap === 0 ? <PilihTiga judul="Berapa hasil yang membuat pemain A menang?" awalan="Pemain A menang" opsi={opsiMenangA(x.adil.data).opsi} onPilih={(o) => kirim({ t: "D_MENANG_A", o })} /> : null}
          {x.adil.tahap === 1 ? <PilihTiga judul="Berapa hasil yang membuat pemain B menang?" awalan="Pemain B menang" opsi={opsiMenangB(x.adil.data).opsi} onPilih={(o) => kirim({ t: "D_MENANG_B", o })} /> : null}
          {x.adil.tahap === 2 ? <PilihTiga judul="Bagaimana permainan ini?" awalan="Penilaian" opsi={opsiNilaiAdil(x.adil.data).opsi} onPilih={(o) => kirim({ t: "D_NILAI", o })} /> : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("rasio");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK6B4(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
