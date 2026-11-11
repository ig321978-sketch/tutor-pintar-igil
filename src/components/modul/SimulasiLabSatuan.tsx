"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, Pengatur, eja } from "./komponen-lab";
import { NeracaRangka, TitikUkur } from "./diagram-k2b6";
import { BendaB6 } from "./dasar-k2b6";
import {
  MAKS_SATUAN,
  NAMA_BENDA_UKUR,
  NAMA_SATUAN_UKUR,
  URUT_BENDA_UKUR,
  URUT_SATUAN_UKUR,
  awalUkur,
  barisTabelUkur,
  kalimatBandingHasil,
  kalimatUkur,
  laporanSatuan,
  miringUkur,
  pilihBendaUkur,
  pilihSatuanUkur,
  resetUkur,
  statusUkur,
  ubahBanyak,
} from "./lab-satuan-k2b6";
import type { KeadaanLabSatuan } from "./misi-k2bab6";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B6 Sub-Bab A): Lab Satuan — lab 2D alat ukur.                   */
/* Satu benda ditimbang dengan satuan tidak baku yang ditambah satu per satu.   */
/* Seimbang hanya pada satu banyak satuan. Satuan lebih ringan butuh lebih      */
/* banyak. Perwakilan: benda, titik, dan tabel hasil. Logika: lab-satuan-k2b6.ts */
/* ------------------------------------------------------------------------ */

const pikselSatuan = (n: number) => (n <= 3 ? 34 : n <= 6 ? 26 : n <= 10 ? 20 : n <= 16 ? 15 : 12);

export default function SimulasiLabSatuan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLabSatuan) => void }) {
  const [l, setL] = useState(awalUkur);
  const [titik, setTitik] = useState(false);
  const [tabel, setTabel] = useState(false);

  const lap = useMemo(() => laporanSatuan(l, titik, tabel), [l, titik, tabel]);
  useEffect(() => {
    onKeadaan?.(lap);
  }, [onKeadaan, lap]);

  const status = statusUkur(l.benda, l.satuan, l.n);
  const miring = miringUkur(l.benda, l.satuan, l.n);
  const teks = kalimatUkur(l);
  const banding = kalimatBandingHasil(l);
  const baris = barisTabelUkur(l);
  const px = pikselSatuan(l.n);

  const label = `Neraca: 1 ${NAMA_BENDA_UKUR[l.benda]} di kiri, ${l.n} ${NAMA_SATUAN_UKUR[l.satuan]} di kanan. ${status === "pas" ? "Seimbang." : status === "kurang" ? "Sisi benda turun." : "Sisi satuan turun."}`;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Satuan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Tambah satuan satu per satu sampai neraca seimbang. Hitung berapa satuan yang dibutuhkan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kalimat ini" onClick={() => speakGuru(eja(`${teks} ${banding}`))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Benda yang ditimbang">
          <span className="text-xs font-black text-[#1C01A5]">Benda:</span>
          {URUT_BENDA_UKUR.map((b) => (
            <Pilihan key={b} aktif={l.benda === b} onKlik={() => setL((x) => pilihBendaUkur(x, b))} label={`Benda ${NAMA_BENDA_UKUR[b]}`}>
              <span className="inline-flex items-center gap-1">
                <BendaB6 id={b} ukuran={20} />
                {NAMA_BENDA_UKUR[b]}
              </span>
            </Pilihan>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Satuan pengukur">
          <span className="text-xs font-black text-[#1C01A5]">Satuan:</span>
          {URUT_SATUAN_UKUR.map((s) => (
            <Pilihan key={s} aktif={l.satuan === s} onKlik={() => setL((x) => pilihSatuanUkur(x, s))} label={`Satuan ${NAMA_SATUAN_UKUR[s]}`}>
              <span className="inline-flex items-center gap-1">
                <BendaB6 id={s} ukuran={20} />
                {NAMA_SATUAN_UKUR[s]}
              </span>
            </Pilihan>
          ))}
        </div>

        <NeracaRangka
          miring={miring}
          kiri={<BendaB6 id={l.benda} ukuran={38} />}
          kanan={Array.from({ length: l.n }, (_, i) => (
            <BendaB6 key={i} id={l.satuan} ukuran={px} />
          ))}
          label={label}
        />

        <Pengatur
          nama={`Banyak ${NAMA_SATUAN_UKUR[l.satuan]}`}
          nilai={l.n}
          onKurang={() => setL((x) => ubahBanyak(x, -1))}
          onTambah={() => setL((x) => ubahBanyak(x, 1))}
          kurangMati={l.n <= 0}
          tambahMati={l.n >= MAKS_SATUAN}
          kurangLabel="Kurangi satu satuan"
          tambahLabel="Tambah satu satuan"
        />
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button type="button" className={TOMBOL_BIASA} disabled={l.n <= 0} onClick={() => setL((x) => ubahBanyak(x, -5))}>
            −5
          </button>
          <button type="button" className={TOMBOL_BIASA} disabled={l.n >= MAKS_SATUAN} onClick={() => setL((x) => ubahBanyak(x, 5))}>
            +5
          </button>
        </div>

        <KalimatBesar teks={teks} warna={status === "pas" ? "bg-[#E8F7EE]" : "bg-[#FFF7CC]"} />
        {banding ? <KalimatBesar teks={banding} warna="bg-[#E0E7FF]" /> : null}
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Perwakilan yang ditampilkan">
          <span className="text-xs font-black text-[#1C01A5]">Tampilkan:</span>
          <Cek aktif={titik} onKlik={() => setTitik(!titik)}>
            Titik
          </Cek>
          <Cek aktif={tabel} onKlik={() => setTabel(!tabel)}>
            Tabel hasil
          </Cek>
        </div>

        {titik ? (
          <div className="space-y-1 rounded-2xl bg-indigo-50/60 p-2 text-center">
            <TitikUkur n={l.n} ukuran={14} kelas="mx-auto max-w-[300px]" />
            <p className="text-xs font-black text-[#1C01A5]">{l.n} titik, satu titik untuk satu {NAMA_SATUAN_UKUR[l.satuan]}</p>
          </div>
        ) : null}

        {tabel ? (
          baris.length === 0 ? (
            <p className="text-center text-sm font-bold text-[#1C01A5]/60">Belum ada hasil. Seimbangkan neraca untuk mengisi tabel.</p>
          ) : (
            <table className="w-full border-collapse overflow-hidden rounded-2xl text-center text-xs font-black text-[#1C01A5]" aria-label="Tabel hasil mengukur berat">
              <thead>
                <tr className="bg-[#1C01A5] text-[#FFE566]">
                  <th className="p-1">Benda</th>
                  <th className="p-1">Satuan</th>
                  <th className="p-1">Banyaknya</th>
                </tr>
              </thead>
              <tbody>
                {baris.map((r) => (
                  <tr key={`${r.benda}-${r.satuan}`} className={`border-t-2 border-[#1C01A5]/20 ${r.benda === l.benda && r.satuan === l.satuan ? "bg-[#FFE566]" : "bg-white"}`}>
                    <td className="p-1">{NAMA_BENDA_UKUR[r.benda]}</td>
                    <td className="p-1">{NAMA_SATUAN_UKUR[r.satuan]}</td>
                    <td className="p-1">{r.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : null}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className={TOMBOL_BIASA}
          onClick={() => {
            setL((x) => resetUkur(x));
            setTitik(false);
            setTabel(false);
          }}
        >
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, timbang boneka dengan bola tenis. Berapa bola tenis sampai seimbang? Dua, timbang boneka yang sama dengan kelereng. Apakah hitungannya sama? Mengapa? Tiga, nyalakan tabel hasil. Satuan mana yang hitungannya paling banyak? Empat, ganti bendanya menjadi tas. Apa yang berubah?"
          )
        }
        langkah={[
          "Timbang boneka dengan bola tenis. Berapa bola tenis sampai seimbang?",
          "Timbang boneka yang sama dengan kelereng. Apakah hitungannya sama? Mengapa?",
          "Nyalakan Tabel hasil. Satuan mana yang hitungannya paling banyak?",
          "Ganti bendanya menjadi tas. Apa yang berubah?",
        ]}
      />
    </div>
  );
}
