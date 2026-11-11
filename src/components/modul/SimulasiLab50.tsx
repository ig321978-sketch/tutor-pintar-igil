"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, TOMBOL_BIASA, sebut } from "./simulasi-bersama";
import { BIRU, GarisAngka, KalimatBesar, MERAH, Pengatur, eja } from "./komponen-lab";
import {
  AWAL_M,
  AWAL_N,
  MAKS,
  bandingkanNilaiTempat,
  batas,
  bisaIkat,
  kalimatNilai,
  ketukBatang,
  ketukSatuan,
  ucapanLab50,
  uraiNilai,
} from "./lab-bilangan-k2b1";

/* ------------------------------------------------------------------------ */
/* Simulasi 1 (K2B1): Laboratorium Bilangan 50, metode PhET.                  */
/* Batang puluhan + satuan lepas, tabel, garis 0–50, bandingkan. Tanpa 50 SVG */
/* benda individual. Logika di lab-bilangan-k2b1.ts.                          */
/* ------------------------------------------------------------------------ */

function BatangPuluhan({ puluhan, onKetuk }: { puluhan: number; onKetuk: (i: number) => void }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Batang puluhan (ketuk)</p>
      <div className="flex flex-wrap items-end justify-center gap-2" role="group" aria-label={`${puluhan} batang puluhan`}>
        {Array.from({ length: 5 }, (_, i) => {
          const aktif = i < puluhan;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Batang puluhan ke-${i + 1}${aktif ? ", terisi" : ", kosong"}`}
              onClick={() => onKetuk(i)}
              className={`flex flex-col items-center justify-end rounded-xl border-4 px-1.5 py-1.5 transition-colors ${
                aktif ? "border-[#F0AB00] bg-[#FFF7CC]" : "border-dashed border-[#1C01A5]/25 bg-[#F5F3FF]"
              }`}
            >
              <div className="flex flex-col-reverse gap-0.5">
                {Array.from({ length: 10 }, (_, k) => (
                  <span
                    key={k}
                    className={`h-2 w-8 rounded-sm ${aktif ? "bg-[#EF4444]" : "bg-[#1C01A5]/15"}`}
                  />
                ))}
              </div>
              <span className={`mt-1 text-[10px] font-black ${aktif ? "text-[#1C01A5]" : "text-[#1C01A5]/35"}`}>
                {aktif ? "10" : "·"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SatuanLepas({ satuan, onKetuk }: { satuan: number; onKetuk: (i: number) => void }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Satuan lepas (ketuk)</p>
      <div className="mx-auto grid max-w-[220px] grid-cols-5 gap-1.5" role="group" aria-label={`${satuan} satuan`}>
        {Array.from({ length: 10 }, (_, i) => {
          const aktif = i < satuan;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Satuan ke-${i + 1}${aktif ? "" : ", kosong"}`}
              onClick={() => onKetuk(i)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-black ${
                aktif ? "border-[#1C01A5] bg-[#60A5FA] text-white" : "border-dashed border-[#1C01A5]/25 bg-white text-[#1C01A5]/30"
              }`}
            >
              {aktif ? i + 1 : "·"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SimulasiLab50({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [n, setN] = useState(AWAL_N);
  const [m, setM] = useState(AWAL_M);
  const [ikat, setIkat] = useState(true);
  const [banding, setBanding] = useState(false);
  const u = uraiNilai(n);
  const kb = bandingkanNilaiTempat(n, m);

  const resetSemua = () => {
    setN(AWAL_N);
    setM(AWAL_M);
    setIkat(true);
    setBanding(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Bilangan 50</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Atur satu bilangan. Lihat batang, satuan, tabel, dan garis berubah bersama.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan bilangan ini" onClick={() => speakGuru(eja(ucapanLab50(n, ikat)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex items-center justify-center">
          <span
            className="flex h-16 min-w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-4xl font-black text-[#1C01A5]"
            aria-live="polite"
            aria-label={`Bilangan ${n}`}
          >
            {n}
          </span>
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]">{sebut(n)}</p>
        <Pengatur nama="Bilangan" nilai={n} onKurang={() => setN(batas(n - 1))} onTambah={() => setN(batas(n + 1))} kurangMati={n <= 0} tambahMati={n >= MAKS} />
        {banding ? (
          <Pengatur
            nama="Bilangan kedua"
            nilai={m}
            warna="#DBEAFE"
            onKurang={() => setM(batas(m - 1))}
            onTambah={() => setM(batas(m + 1))}
            kurangMati={m <= 0}
            tambahMati={m >= MAKS}
          />
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <Cek aktif={ikat} onKlik={() => setIkat((x) => !x)}>
            Tampilkan batang
          </Cek>
          <Cek aktif={banding} onKlik={() => setBanding((x) => !x)}>
            Bandingkan
          </Cek>
          <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
            ↺ Reset Semua
          </button>
        </div>
        {ikat && !bisaIkat(n) ? (
          <p role="status" className="rounded-xl bg-[#F5F3FF] px-3 py-1 text-center text-xs font-black text-[#1C01A5]">
            Belum ada sepuluh. Tambah bilangan sampai 10 untuk melihat batang puluhan.
          </p>
        ) : null}
      </div>

      {ikat ? (
        <div className={`${KARTU} space-y-3`}>
          <BatangPuluhan puluhan={u.puluhan} onKetuk={(i) => setN(ketukBatang(n, i))} />
          <SatuanLepas satuan={u.satuan} onKetuk={(i) => setN(ketukSatuan(n, i))} />
        </div>
      ) : null}

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tabel nilai tempat</p>
        <div className="mx-auto grid w-full max-w-[280px] grid-cols-2 overflow-hidden rounded-xl border-4 border-[#1C01A5]" role="table" aria-label="Tabel nilai tempat">
          <p role="columnheader" className="bg-[#FEE2E2] py-1 text-center text-sm font-black text-[#7F1D1D]">
            Puluhan
          </p>
          <p role="columnheader" className="bg-[#DBEAFE] py-1 text-center text-sm font-black text-[#1E3A8A]">
            Satuan
          </p>
          <p role="cell" className="border-t-4 border-[#1C01A5] py-2 text-center text-4xl font-black text-[#1C01A5]">
            {u.puluhan}
          </p>
          <p role="cell" className="border-l-4 border-t-4 border-[#1C01A5] py-2 text-center text-4xl font-black text-[#1C01A5]">
            {u.satuan}
          </p>
        </div>
        <KalimatBesar teks={kalimatNilai(n)} warna="bg-[#FFE566]" />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Garis bilangan 0 sampai 50 • ketuk angka</p>
        <GarisAngka
          maks={MAKS}
          nama={`Garis bilangan 0 sampai 50, bilangan pertama ${n}${banding ? `, bilangan kedua ${m}` : ""}`}
          sorot={[10, 20, 30, 40, 50, n]}
          penanda={[{ n, warna: MERAH }, ...(banding ? [{ n: m, warna: BIRU }] : [])]}
          onPilih={(x) => setN(batas(x))}
        />
      </div>

      {banding ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Membandingkan dengan nilai tempat</p>
          <KalimatBesar teks={`${n} ${kb.simbol} ${m}`} warna="bg-[#FFE566]" />
          <p className="text-center text-sm font-black text-[#1C01A5]">{kb.alasan}</p>
        </div>
      ) : null}

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, atur bilangan ke dua puluh enam. Berapa puluhan dan satuan? Dua, nyalakan bandingkan, atur bilangan kedua ke tiga puluh dua. Mana yang dibandingkan lebih dulu? Tiga, atur ke lima puluh. Apa yang terjadi di batang?"
          )
        }
        langkah={[
          "Atur bilangan ke 26. Berapa puluhan dan satuan?",
          "Nyalakan Bandingkan, atur bilangan kedua ke 32. Mana yang dibandingkan lebih dulu?",
          "Atur ke 50. Apa yang terjadi di batang?",
        ]}
      />
    </div>
  );
}
