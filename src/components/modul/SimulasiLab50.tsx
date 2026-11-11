"use client";

import React, { useEffect, useRef, useState } from "react";
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
import type { KeadaanLab50 } from "./misi-k2bab1";

/* ------------------------------------------------------------------------ */
/* Laboratorium Bilangan 50 (K2B1), metode PhET. Bertahap lewat prop tampil: */
/* A: batang+satuan+kalimat+garis; B: +tabel; C: +banding. Melapor onKeadaan. */
/* ------------------------------------------------------------------------ */

export type TampilLab50 = "batang" | "satuan" | "tabel" | "kalimat" | "garis" | "banding";
export const SEMUA_TAMPIL_LAB50: TampilLab50[] = ["batang", "satuan", "tabel", "kalimat", "garis", "banding"];

const LABEL: Record<TampilLab50, string> = {
  batang: "Batang",
  satuan: "Satuan",
  tabel: "Tabel",
  kalimat: "Kalimat",
  garis: "Garis",
  banding: "Bandingkan",
};

function langkahCoba(tampil: TampilLab50[]): string[] {
  const ada = (k: TampilLab50) => tampil.includes(k);
  const langkah = ["Atur bilangan ke 26. Berapa puluhan dan satuan?"];
  if (ada("tabel")) langkah.push("Baca tabel nilai tempat untuk bilangan 34.");
  if (ada("banding")) langkah.push("Nyalakan Bandingkan, atur bilangan kedua ke 32. Mana yang dibandingkan lebih dulu?");
  if (ada("garis")) langkah.push("Ketuk angka 40 di garis bilangan.");
  if (!ada("banding") && !ada("tabel")) langkah.push("Atur ke 50. Apa yang terjadi di batang?");
  return langkah.slice(0, 3);
}

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
                  <span key={k} className={`h-2 w-8 rounded-sm ${aktif ? "bg-[#EF4444]" : "bg-[#1C01A5]/15"}`} />
                ))}
              </div>
              <span className={`mt-1 text-[10px] font-black ${aktif ? "text-[#1C01A5]" : "text-[#1C01A5]/35"}`}>{aktif ? "10" : "·"}</span>
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

export default function SimulasiLab50({
  speakGuru,
  tampil = SEMUA_TAMPIL_LAB50,
  onKeadaan,
}: {
  speakGuru: (t: string) => void;
  tampil?: TampilLab50[];
  onKeadaan?: (k: KeadaanLab50) => void;
}) {
  const [n, setN] = useState(AWAL_N);
  const [m, setM] = useState(AWAL_M);
  const [lihatMentah, setLihat] = useState<Record<string, boolean>>({
    batang: true,
    satuan: true,
    tabel: true,
    kalimat: true,
    garis: true,
  });
  const [banding, setBanding] = useState(false);
  const bolehBanding = tampil.includes("banding");
  const banding2 = bolehBanding && banding;
  const lihat = (k: TampilLab50) => tampil.includes(k) && (k === "banding" ? banding2 : Boolean(lihatMentah[k]));
  const fBatang = Boolean(lihat("batang"));
  const fSatuan = Boolean(lihat("satuan"));
  const fTabel = Boolean(lihat("tabel"));
  const fKalimat = Boolean(lihat("kalimat"));
  const fGaris = Boolean(lihat("garis"));
  const u = uraiNilai(n);
  const kb = bandingkanNilaiTempat(n, m);
  const coba = langkahCoba(tampil);
  const toggel = tampil.filter((k) => k !== "banding");

  const lapor = useRef(onKeadaan);
  lapor.current = onKeadaan;
  useEffect(() => {
    lapor.current?.({ alat: "lab50", n, m, batang: fBatang, tabel: fTabel, kalimat: fKalimat, garis: fGaris, banding: banding2 });
  }, [n, m, fBatang, fTabel, fKalimat, fGaris, banding2]);

  const resetSemua = () => {
    setN(AWAL_N);
    setM(AWAL_M);
    setBanding(false);
    setLihat({ batang: true, satuan: true, tabel: true, kalimat: true, garis: true });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">{fTabel ? "Laboratorium Bilangan 50 · Nilai Tempat" : "Laboratorium Bilangan 50"}</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Atur satu bilangan. Lihat batang, satuan, dan garis berubah bersama.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan bilangan ini" onClick={() => speakGuru(eja(ucapanLab50(n, fBatang)))} />
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
        {banding2 ? (
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
        <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih tampilan">
          {toggel.length > 1
            ? toggel.map((k) => (
                <Cek key={k} aktif={Boolean(lihatMentah[k])} onKlik={() => setLihat((x) => ({ ...x, [k]: !x[k] }))}>
                  {LABEL[k]}
                </Cek>
              ))
            : null}
          {bolehBanding ? (
            <Cek aktif={banding} onKlik={() => setBanding((x) => !x)}>
              Bandingkan
            </Cek>
          ) : null}
          <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
            ↺ Reset Semua
          </button>
        </div>
        {fBatang && !bisaIkat(n) ? (
          <p role="status" className="rounded-xl bg-[#F5F3FF] px-3 py-1 text-center text-xs font-black text-[#1C01A5]">
            Belum ada sepuluh. Tambah bilangan sampai 10 untuk melihat batang puluhan.
          </p>
        ) : null}
      </div>

      {fBatang || fSatuan ? (
        <div className={`${KARTU} space-y-3`}>
          {fBatang ? <BatangPuluhan puluhan={u.puluhan} onKetuk={(i) => setN(ketukBatang(n, i))} /> : null}
          {fSatuan ? <SatuanLepas satuan={u.satuan} onKetuk={(i) => setN(ketukSatuan(n, i))} /> : null}
        </div>
      ) : null}

      {fTabel || fKalimat ? (
        <div className={`${KARTU} space-y-2`}>
          {fTabel ? (
            <>
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
            </>
          ) : null}
          {fKalimat ? <KalimatBesar teks={kalimatNilai(n)} warna="bg-[#FFE566]" /> : null}
        </div>
      ) : null}

      {fGaris ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Garis bilangan 0 sampai 50 • ketuk angka</p>
          <GarisAngka
            maks={MAKS}
            nama={`Garis bilangan 0 sampai 50, bilangan pertama ${n}${banding2 ? `, bilangan kedua ${m}` : ""}`}
            sorot={[10, 20, 30, 40, 50, n]}
            penanda={[{ n, warna: MERAH }, ...(banding2 ? [{ n: m, warna: BIRU }] : [])]}
            onPilih={(x) => setN(batas(x))}
          />
        </div>
      ) : null}

      {banding2 ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Membandingkan dengan nilai tempat</p>
          <KalimatBesar teks={`${n} ${kb.simbol} ${m}`} warna="bg-[#FFE566]" />
          <p className="text-center text-sm font-black text-[#1C01A5]">{kb.alasan}</p>
        </div>
      ) : null}

      <CobaIni
        judul="Coba ini!"
        onDengar={() => speakGuru(`Coba ini. ${coba.join(" ")}`)}
        langkah={coba}
      />
    </div>
  );
}
