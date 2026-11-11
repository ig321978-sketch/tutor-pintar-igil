"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { KalimatBesar, Pengatur, eja } from "./komponen-lab";
import { BaganPasangan, ModelBilangan, PapanNilai } from "./diagram-k2b7";
import { Koleksi } from "./dasar-k2b7";
import {
  INFO_BENDA_SERATUS,
  MAKS_LEPAS,
  MAKS_SERATUS,
  URUT_BENDA_SERATUS,
  URUT_TAMPIL_SERATUS,
  awalSeratus,
  bukaPuluhan,
  ikatSepuluh,
  kalimatSeratus,
  kurangPuluh,
  kurangSatu,
  laporanSeratus,
  nilaiSeratus,
  nyalakanSeratus,
  papanSeratus,
  pasanganSeratus,
  pilihBendaSeratus,
  resetSeratus,
  tambahPuluh,
  tambahSatu,
  type TampilSeratus,
} from "./lab-seratus-k2b7";
import type { KeadaanLabSeratus } from "./misi-k2bab7";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B7 Sub-Bab A): Lab Seratus — model PhET.                         */
/* Satu model (puluhan diikat dan satuan lepas, sampai seratus), banyak          */
/* perwakilan: batang dan kotak, benda nyata, papan nilai tempat, pasangan       */
/* bilangan, nama bilangan, dan kalimat. Mengikat sepuluh satuan lepas menjadi    */
/* satu puluhan tidak mengubah banyaknya. Papan dan pasangan ditahan sampai       */
/* tidak ada sepuluh satuan lepas yang belum diikat. Logika: lab-seratus-k2b7.ts.  */
/* ------------------------------------------------------------------------ */

const NAMA_TAMPIL: Record<TampilSeratus, string> = {
  batang: "Batang dan kotak",
  benda: "Benda nyata",
  papan: "Papan nilai tempat",
  pasangan: "Pasangan bilangan",
  nama: "Nama bilangan",
};

export default function SimulasiLabSeratus({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLabSeratus) => void }) {
  const [l, setL] = useState(awalSeratus);

  const lap = useMemo(() => laporanSeratus(l), [l]);
  useEffect(() => {
    onKeadaan?.(lap);
  }, [onKeadaan, lap]);

  const n = nilaiSeratus(l);
  const teks = kalimatSeratus(l);
  const papan = papanSeratus(l);
  const pasangan = pasanganSeratus(l);
  const info = INFO_BENDA_SERATUS[l.jenis];
  const bisaIkat = l.s >= 10;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Seratus</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Tambah puluhan dan satuan sampai seratus. Ikat sepuluh satuan lepas menjadi satu puluhan, lalu lihat banyaknya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kalimat ini" onClick={() => speakGuru(eja(teks))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex min-h-[110px] flex-col items-center justify-center gap-2 rounded-2xl bg-indigo-50/60 p-2">
          {n === 0 ? <p className="text-sm font-bold text-[#1C01A5]/60">Belum ada benda. Tekan tombol tambah.</p> : null}
          {l.batang && n > 0 ? (
            <div className="flex w-full justify-center overflow-x-auto" aria-label="Batang puluhan dan kotak satuan">
              <ModelBilangan p={l.p} s={l.s} skala={l.p > 6 ? 0.8 : 1} />
            </div>
          ) : null}
          {l.benda && n > 0 ? (
            <div className="flex w-full justify-center" aria-label={`${l.p} ${info.wadah} dan ${l.s} ${info.nama} lepas`}>
              <Koleksi p={l.p} s={l.s} benda={l.jenis} ukuran={52} />
            </div>
          ) : null}
          {!l.batang && !l.benda && n > 0 ? <p className="text-sm font-bold text-[#1C01A5]/60">Nyalakan Batang dan kotak atau Benda nyata untuk melihat bendanya.</p> : null}
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <Pengatur
            nama="Puluhan"
            nilai={l.p}
            onKurang={() => setL((x) => kurangPuluh(x))}
            onTambah={() => setL((x) => tambahPuluh(x))}
            kurangMati={l.p <= 0}
            tambahMati={n + 10 > MAKS_SERATUS}
            kurangLabel="Kurangi satu puluhan"
            tambahLabel="Tambah satu puluhan"
            warna="#E0F2FE"
          />
          <Pengatur
            nama="Satuan lepas"
            nilai={l.s}
            onKurang={() => setL((x) => kurangSatu(x))}
            onTambah={() => setL((x) => tambahSatu(x))}
            kurangMati={l.s <= 0}
            tambahMati={n >= MAKS_SERATUS || l.s >= MAKS_LEPAS}
            kurangLabel="Kurangi satu satuan"
            tambahLabel="Tambah satu satuan"
            warna="#FEF9C3"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button type="button" className={`${TOMBOL_UTAMA} ${bisaIkat ? "ring-4 ring-[#F0AB00]/60" : "opacity-80"}`} onClick={() => setL((x) => ikatSepuluh(x))}>
            🎀 Ikat 10 satuan jadi 1 puluhan
          </button>
          <button type="button" className={TOMBOL_BIASA} onClick={() => setL((x) => bukaPuluhan(x))}>
            ✂️ Buka 1 puluhan
          </button>
        </div>
        {l.catatan ? (
          <p role="status" className="igil-muncul rounded-xl bg-[#E8F7EE] px-3 py-1.5 text-center text-sm font-black text-[#14532D]">
            {l.catatan}
          </p>
        ) : null}

        <KalimatBesar teks={teks} />
        <p className="text-center text-3xl font-black text-[#1C01A5]" aria-label={`Banyaknya ${n}`}>
          {n}
        </p>
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Perwakilan yang ditampilkan">
          <span className="text-xs font-black text-[#1C01A5]">Tampilkan:</span>
          {URUT_TAMPIL_SERATUS.map((k) => (
            <Cek key={k} aktif={l[k]} onKlik={() => setL((x) => nyalakanSeratus(x, k, !x[k]))}>
              {NAMA_TAMPIL[k]}
            </Cek>
          ))}
        </div>

        {l.benda ? (
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Pilih benda">
            <span className="text-xs font-black text-[#1C01A5]">Benda:</span>
            {URUT_BENDA_SERATUS.map((j) => (
              <Pilihan key={j} aktif={l.jenis === j} onKlik={() => setL((x) => pilihBendaSeratus(x, j))}>
                {INFO_BENDA_SERATUS[j].nama}
              </Pilihan>
            ))}
          </div>
        ) : null}

        {l.papan ? (
          papan ? (
            <div className="space-y-1">
              <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Papan nilai tempat</p>
              <PapanNilai p={papan.puluhan} s={papan.satuan} />
            </div>
          ) : (
            <p className="rounded-xl bg-[#FFF7CC] px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">Papan nilai tempat menunggu. Ikat dulu sepuluh satuan lepas, supaya satuannya kurang dari sepuluh.</p>
          )
        ) : null}

        {l.pasangan ? (
          pasangan ? (
            <div className="flex flex-col items-center gap-1">
              <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Pasangan bilangan</p>
              <BaganPasangan total={pasangan.total} a={pasangan.a} b={pasangan.b} />
            </div>
          ) : (
            <p className="rounded-xl bg-[#FFF7CC] px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">Pasangan bilangan menunggu. Ikat dulu sepuluh satuan lepas.</p>
          )
        ) : null}
      </div>

      <div className="flex justify-center">
        <button type="button" className={TOMBOL_BIASA} onClick={() => setL(resetSeratus())}>
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, tambah satuan sampai sepuluh, lalu ikat menjadi satu puluhan. Apakah banyaknya berubah? Dua, nyalakan papan nilai tempat dan buat lima puluhan dan tiga satuan. Bilangan apa itu? Tiga, buat enam puluh dua, lalu dua puluh enam. Samakah keduanya? Empat, tambah puluhan sampai sepuluh. Bilangan apa itu?"
          )
        }
        langkah={[
          "Tambah satuan sampai sepuluh, lalu ikat menjadi 1 puluhan. Apakah banyaknya berubah?",
          "Nyalakan Papan nilai tempat dan buat 5 puluhan dan 3 satuan. Bilangan apa itu?",
          "Buat 62, lalu buat 26. Samakah keduanya? Lihat puluhannya.",
          "Tambah puluhan sampai sepuluh. Bilangan apa itu?",
        ]}
      />
    </div>
  );
}
