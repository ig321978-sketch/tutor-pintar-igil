"use client";

import React, { useEffect, useRef, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { KalimatBesar, Pengatur, eja } from "./komponen-lab";
import { UnsurSvg } from "./dasar-k2b4";
import { bunyiUnsur } from "./pola-k2b4";
import {
  MAKS_SATUAN,
  MIN_ULANG,
  NAMA_JENIS,
  NAMA_UNSUR,
  PALET,
  URUT_JENIS,
  awalPabrik,
  batasUlang,
  berikutnya,
  gantiJenis,
  gantiUlang,
  hapusUnsur,
  kodeHuruf,
  maksUlang,
  sebutUnsur,
  statusPabrik,
  tambahUnsur,
  ucapanPabrik,
  type AturPabrik,
  type JenisPabrik,
} from "./lab-pabrik-k2b4";
import type { KeadaanPabrik } from "./misi-k2bab4";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B4 Sub-Bab B): Pabrik Pola — PhET.                             */
/* Susun satuan pola dari tiga unsur tiap jenis, atur berapa kali diulang.     */
/* Barisan, kode huruf, tanda satuan, lanjutan, dan kalimat berubah bersama.   */
/* Barisan yang semuanya sama bukan pola. Tanpa skor. Logika: lab-pabrik-k2b4.ts */
/* ------------------------------------------------------------------------ */

const JEDA_BUNYI = 480;

export default function SimulasiPabrikPola({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPabrik) => void }) {
  const [atur, setAtur] = useState<AturPabrik>(() => awalPabrik());
  const [kode, setKode] = useState(true);
  const [tanda, setTanda] = useState(false);
  const [lanjut, setLanjut] = useState(false);
  const [didengar, setDidengar] = useState(false);
  const timer = useRef<number[]>([]);

  const st = statusPabrik(atur.satuan, atur.ulang);
  const huruf = kodeHuruf(st.seq);
  const nanti = lanjut ? berikutnya(st.seq, 2) : null;

  const hentikanBunyi = () => {
    timer.current.forEach((t) => window.clearTimeout(t));
    timer.current = [];
  };
  useEffect(() => hentikanBunyi, []);

  useEffect(() => {
    onKeadaan?.({
      alat: "pabrik",
      jenis: atur.jenis,
      n: atur.satuan.length,
      kodeSatuan: st.kodeSatuan,
      ulang: atur.ulang,
      terpendek: st.terpendek,
      pola: st.pola,
      kode,
      tanda,
      lanjut,
      didengar,
    });
  }, [onKeadaan, atur.jenis, atur.satuan.length, atur.ulang, st.kodeSatuan, st.terpendek, st.pola, kode, tanda, lanjut, didengar]);

  /** Mengubah susunan membuat barisan baru, jadi "sudah didengar" dimulai lagi. */
  const ubah = (a: AturPabrik) => {
    hentikanBunyi();
    setAtur(a);
    setDidengar(false);
  };

  const dengarkan = () => {
    hentikanBunyi();
    st.seq.forEach((t, i) => {
      timer.current.push(window.setTimeout(() => bunyiUnsur(t), i * JEDA_BUNYI));
    });
    setDidengar(true);
  };

  const resetSemua = () => {
    ubah(awalPabrik());
    setKode(true);
    setTanda(false);
    setLanjut(false);
  };

  const kelompok = Array.from({ length: atur.ulang }, (_, g) => atur.satuan.map((t, i) => ({ t, kunci: `${g}-${i}`, indeks: g * atur.satuan.length + i })));
  const maks = maksUlang(atur.satuan.length);
  const kalimat = ucapanPabrik(atur, false);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Pabrik Pola</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Susun satu satuan, atur berapa kali diulang, lalu lihat apakah barisannya pola.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan penjelasannya" onClick={() => speakGuru(eja(ucapanPabrik(atur, lanjut)))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Jenis unsur">
          <span className="text-xs font-black text-[#1C01A5]">Jenis:</span>
          {URUT_JENIS.map((j: JenisPabrik) => (
            <Pilihan key={j} aktif={atur.jenis === j} onKlik={() => ubah(gantiJenis(atur, j))}>
              {NAMA_JENIS[j]}
            </Pilihan>
          ))}
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-black text-[#1C01A5]">Ketuk unsur untuk menambah ke satuan (paling banyak {MAKS_SATUAN}):</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Palet unsur">
            {PALET[atur.jenis].map((t) => (
              <button
                key={t}
                type="button"
                aria-label={`Tambah ${NAMA_UNSUR[t]}`}
                disabled={atur.satuan.length >= MAKS_SATUAN}
                onClick={() => {
                  ubah(tambahUnsur(atur, t));
                  if (atur.jenis === "suara") bunyiUnsur(t);
                }}
                className="flex min-h-14 min-w-16 flex-col items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1 text-[11px] font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5 disabled:opacity-40"
              >
                <UnsurSvg jenis={atur.jenis} token={t} kelas="h-9 w-9" label="" />
                {NAMA_UNSUR[t]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 rounded-2xl bg-[#FFF7CC] p-2">
          <p className="text-xs font-black text-[#1C01A5]">Satuanmu ({atur.satuan.length} unsur):</p>
          <div className="flex flex-wrap items-center gap-1.5" aria-label="Satuan pola">
            {atur.satuan.map((t, i) => (
              <span key={`${t}-${i}`} className="flex flex-col items-center rounded-xl border-2 border-[#F0AB00] bg-white p-1">
                <UnsurSvg jenis={atur.jenis} token={t} kelas="h-9 w-9" label={NAMA_UNSUR[t]} />
              </span>
            ))}
            <button type="button" className={TOMBOL_BIASA} disabled={atur.satuan.length <= 1} onClick={() => ubah(hapusUnsur(atur))}>
              ⌫ Hapus yang terakhir
            </button>
          </div>
        </div>

        <Pengatur
          nama={`Diulang (${MIN_ULANG} sampai ${maks} kali)`}
          nilai={atur.ulang}
          onKurang={() => ubah(gantiUlang(atur, batasUlang(atur.satuan.length, atur.ulang - 1)))}
          onTambah={() => ubah(gantiUlang(atur, batasUlang(atur.satuan.length, atur.ulang + 1)))}
          kurangMati={atur.ulang <= MIN_ULANG}
          tambahMati={atur.ulang >= maks}
        />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Perwakilan yang ditampilkan">
          <span className="text-xs font-black text-[#1C01A5]">Tampilkan:</span>
          <Cek aktif={kode} onKlik={() => setKode(!kode)}>
            Kode huruf
          </Cek>
          <Cek aktif={tanda} onKlik={() => setTanda(!tanda)}>
            Tanda satuan
          </Cek>
          <Cek aktif={lanjut} onKlik={() => setLanjut(!lanjut)}>
            Lanjutkan barisan
          </Cek>
        </div>

        <div className="flex flex-wrap items-end justify-center gap-1.5 rounded-2xl bg-indigo-50/60 p-2" role="img" aria-label={`Barisan: ${sebutUnsur(st.seq)}`}>
          {kelompok.map((grup, g) => (
            <div key={g} className={`flex items-end gap-1 ${tanda ? "rounded-xl border-4 border-dashed border-[#F0AB00] bg-[#FFFBE6] p-1" : ""}`}>
              {grup.map((u) => (
                <div key={u.kunci} className="flex flex-col items-center">
                  <UnsurSvg jenis={atur.jenis} token={u.t} kelas="h-10 w-10" label="" />
                  {kode ? <span className="text-sm font-black text-[#1C01A5]">{huruf[u.indeks]}</span> : null}
                </div>
              ))}
            </div>
          ))}
          {nanti
            ? nanti.map((t, i) => (
                <div key={`lanjut-${i}`} className="flex flex-col items-center opacity-60" aria-label={`Berikutnya: ${NAMA_UNSUR[t]}`}>
                  <span className="rounded-xl border-4 border-dashed border-[#16A34A] bg-white">
                    <UnsurSvg jenis={atur.jenis} token={t} kelas="h-10 w-10" label="" />
                  </span>
                  <span className="text-xs font-black text-[#14532D]">?</span>
                </div>
              ))
            : null}
        </div>
        {lanjut && !nanti ? <p className="text-center text-xs font-bold text-[#9F1239]">Barisan ini bukan pola, jadi tidak ada lanjutannya.</p> : null}

        <div className={`rounded-2xl border-4 px-3 py-2 text-center text-base font-black ${st.pola ? "border-[#16A34A] bg-[#E8F7EE] text-[#14532D]" : "border-[#EF4444] bg-[#FFF1F2] text-[#9F1239]"}`} role="status">
          {st.pola ? "✔ Ini pola!" : "✘ Ini bukan pola."}
        </div>
        <KalimatBesar teks={kalimat} />
        <p className="text-center text-xs font-bold text-[#1C01A5]/80">
          Panjang barisan: {st.seq.length} unsur. {st.terpendek > 0 ? `Satuan terpendek: ${st.terpendek} unsur.` : "Tidak ada satuan yang berulang dengan teratur."}
        </p>

        {atur.jenis === "suara" ? (
          <div className="space-y-1 text-center">
            <button type="button" className={TOMBOL_UTAMA} onClick={dengarkan}>
              🔊 Dengarkan barisan
            </button>
            <p className="text-xs font-bold text-[#1C01A5]/70">{didengar ? "Sudah didengar. Apakah kamu bisa menebak lanjutannya?" : "Tekan untuk mendengar tepukannya satu per satu."}</p>
          </div>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, susun satuan A B, lalu ubah banyak ulangnya. Apa yang tetap sama? Dua, hanya pakai satu unsur yang sama. Masih pola atau bukan? Tiga, susun A B A B, lalu nyalakan tanda satuan. Berapa satuan terpendeknya? Empat, pakai jenis suara dan tekan dengarkan. Lalu nyalakan lanjutkan barisan."
          )
        }
        langkah={[
          "Susun satuan merah, biru. Ubah banyak ulangnya. Apa yang tetap sama?",
          "Susun satuan yang semua unsurnya sama saja, misalnya merah, merah. Masih pola atau bukan?",
          "Susun A B A B, lalu nyalakan Tanda satuan. Berapa unsur satuan terpendeknya?",
          "Pilih jenis Suara, tekan Dengarkan, lalu nyalakan Lanjutkan barisan.",
        ]}
      />
    </div>
  );
}
