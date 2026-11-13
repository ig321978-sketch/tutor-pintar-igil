"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK6B3 } from "./eja-k6b3";
import { KisiPetak, PilihTiga } from "./model-petak-k6b3";
import {
  SOAL_JALUR,
  SOAL_JARAK,
  SOAL_LOKASI,
  awalPetakK6B3C,
  idJalur,
  idJarak,
  idLokasi,
  jarakPetak,
  keadaanPetakK6B3C,
  langkahPetakK6B3C,
  opsiAngkaLokasi,
  opsiBanyakJalur,
  opsiHurufLokasi,
  opsiJalur,
  opsiJarak,
  opsiLangkah,
  opsiSelisihAngka,
  opsiSelisihHuruf,
  opsiTulisLokasi,
  soalJalur,
  soalJarak,
  soalLokasi,
  ucapJalurK6B3C,
  ucapJarakK6B3C,
  ucapLokasiK6B3C,
  type KeadaanPetakK6B3C,
} from "./lab-petak-k6b3c";

/* ------------------------------------------------------------------------ */
/* Simulasi (K6B3 Sub-Bab C): Lab Petak. Satu alat, tiga tampilan.             */
/*  Lokasi : tulis letak titik, huruf baris lebih dulu lalu angka kolom.       */
/*  Jarak  : selisih huruf ditambah selisih angka, tanpa serong.               */
/*  Jalur  : langkah terpendek, jalur sah, dan banyak jalur sama pendek.       */
/* Logika: lab-petak-k6b3c.ts.                                                 */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Lokasi, tulis huruf baris lebih dulu lalu angka kolom. Apa yang berubah bila urutannya terbalik?",
  "Di Jarak, jumlahkan selisih huruf dan selisih angka. Mengapa tidak boleh bergerak serong?",
  "Di Jalur, hitung jalur yang sama pendek. Mengapa urutan gerak yang berbeda bisa sama pendek?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];

export default function SimulasiLabPetakK6B3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPetakK6B3C) => void }) {
  const [x, kirim] = useReducer(langkahPetakK6B3C, undefined, awalPetakK6B3C);
  const [lihat, setLihat] = useState<"lokasi" | "jarak" | "jalur">("lokasi");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanPetakK6B3C(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "lokasi" ? ucapLokasiK6B3C(x) : lihat === "jarak" ? ucapJarakK6B3C(x) : ucapJalurK6B3C(x);
  const lo = soalLokasi(x);
  const ja = soalJarak(x);
  const jl = soalJalur(x);
  const tanda = (id: string) => (x.pernah.includes(id) ? "✅ " : "");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Petak</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Tulis letak, hitung jarak, dan cari jalur terpendek.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK6B3(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "lokasi"} onKlik={() => pilihTampilan("lokasi")}>
          📍 Lokasi
        </Pilihan>
        <Pilihan aktif={lihat === "jarak"} onKlik={() => pilihTampilan("jarak")}>
          📏 Jarak
        </Pilihan>
        <Pilihan aktif={lihat === "jalur"} onKlik={() => pilihTampilan("jalur")}>
          ➡️ Jalur
        </Pilihan>
      </div>

      {lihat === "lokasi" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal lokasi">
            {SOAL_LOKASI.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.lokasi.data === i} onKlik={() => kirim({ t: "L_DATA", i })} label={`Pilih soal lokasi ${s.nama}`}>
                {tanda(idLokasi(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Di mana letak {lo.nama}? Huruf ada di sisi kiri, angka di sisi atas.</p>
          <KisiPetak titik={[{ t: lo.t, nama: x.lokasi.tahap >= 3 ? lo.t : "?", warna: "emas" }]} label={`Kisi berpetak dengan satu titik untuk ${lo.nama}`} />
          {x.lokasi.tahap === 0 ? <PilihTiga judul="Titik itu berada di baris huruf apa?" awalan="Huruf" opsi={opsiHurufLokasi(x.lokasi.data).opsi} onPilih={(o) => kirim({ t: "L_HURUF", o })} /> : null}
          {x.lokasi.tahap === 1 ? <PilihTiga judul="Titik itu berada di kolom angka berapa?" awalan="Angka" opsi={opsiAngkaLokasi(x.lokasi.data).opsi} onPilih={(o) => kirim({ t: "L_ANGKA", o })} /> : null}
          {x.lokasi.tahap === 2 ? <PilihTiga judul="Bagaimana letak itu ditulis?" awalan="Tulis" opsi={opsiTulisLokasi(x.lokasi.data).opsi} onPilih={(o) => kirim({ t: "L_TULIS", o })} /> : null}
        </div>
      ) : null}

      {lihat === "jarak" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal jarak">
            {SOAL_JARAK.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.jarak.data === i} onKlik={() => kirim({ t: "J_DATA", i })} label={`Pilih soal jarak ${s.nama}`}>
                {tanda(idJarak(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Dari {ja.dari} ke {ja.ke}. Hanya boleh kanan, kiri, naik, atau turun.
          </p>
          <KisiPetak
            titik={ja.dari === ja.ke ? [{ t: ja.dari, nama: "P", warna: "emas" }] : [{ t: ja.dari, nama: "P", warna: "emas" }, { t: ja.ke, nama: "Q", warna: "ungu" }]}
            jalur={x.jarak.tahap >= 3 ? { dari: ja.dari, ke: ja.ke } : undefined}
            label={`Kisi berpetak dengan titik ${ja.dari} dan ${ja.ke}`}
          />
          {x.jarak.tahap === 0 ? <PilihTiga judul={`Berapa langkah petak dari baris ${ja.dari[0]} ke baris ${ja.ke[0]}?`} awalan="Selisih huruf" opsi={opsiSelisihHuruf(x.jarak.data).opsi} onPilih={(o) => kirim({ t: "J_HURUF", o })} /> : null}
          {x.jarak.tahap === 1 ? <PilihTiga judul={`Berapa langkah petak dari kolom ${ja.dari.slice(1)} ke kolom ${ja.ke.slice(1)}?`} awalan="Selisih angka" opsi={opsiSelisihAngka(x.jarak.data).opsi} onPilih={(o) => kirim({ t: "J_ANGKA", o })} /> : null}
          {x.jarak.tahap === 2 ? <PilihTiga judul="Berapa jarak dari P ke Q?" awalan="Jarak" opsi={opsiJarak(x.jarak.data).opsi} onPilih={(o) => kirim({ t: "J_JARAK", o })} /> : null}
        </div>
      ) : null}

      {lihat === "jalur" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal jalur">
            {SOAL_JALUR.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.jalur.data === i} onKlik={() => kirim({ t: "R_DATA", i })} label={`Pilih soal jalur ${s.nama}`}>
                {tanda(idJalur(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Dari {jl.dari} ke {jl.ke}. Beberapa jalur bisa sama pendek.
          </p>
          <KisiPetak
            titik={[{ t: jl.dari, nama: "P", warna: "emas" }, { t: jl.ke, nama: "Q", warna: "ungu" }]}
            jalur={x.jalur.tahap >= 2 ? { dari: jl.dari, ke: jl.ke } : undefined}
            label={`Kisi berpetak dengan titik ${jl.dari} dan ${jl.ke}`}
          />
          {x.jalur.tahap >= 1 ? <p className="text-center text-sm font-black text-[#1C01A5]">Langkah terpendek: {jarakPetak(jl.dari, jl.ke)}.</p> : null}
          {x.jalur.tahap === 0 ? <PilihTiga judul="Berapa langkah terpendek dari P ke Q?" awalan="Langkah" opsi={opsiLangkah(x.jalur.data).opsi} onPilih={(o) => kirim({ t: "R_LANGKAH", o })} /> : null}
          {x.jalur.tahap === 1 ? <PilihTiga judul="Jalur mana yang sah dan terpendek?" awalan="Jalur" opsi={opsiJalur(x.jalur.data).opsi} onPilih={(o) => kirim({ t: "R_JALUR", o })} /> : null}
          {x.jalur.tahap === 2 ? <PilihTiga judul="Berapa banyak jalur yang sama pendek?" awalan="Banyak jalur" opsi={opsiBanyakJalur(x.jalur.data).opsi} onPilih={(o) => kirim({ t: "R_BANYAK", o })} /> : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("lokasi");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK6B3(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
