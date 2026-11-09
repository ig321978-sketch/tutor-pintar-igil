"use client";

import React from "react";
import { type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { CatatanTempel } from "./tahap-b-gaya";
import { GarisPengurai, HasilSusunan, HitungKeping } from "./geometri-k2b3";
import { RONDE_GARIS_B, RONDE_HITUNG_B, RONDE_KOMPOSIT_B } from "./data-k2b3";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 3 Sub-Bab B, Tahap 5 Picture: diagram polos, tanpa gambar benda.*/
/*  5 Garis Pengurai   6 Hasil Susunan yang Mungkin   7 Hitung Keping         */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 5. Garis Pengurai ------------------------------------ */

function RondeGaris({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_GARIS_B[ronde];
  return (
    <>
      <CatatanTempel
        pendek={`Urai jadi ${r.teksTarget}`}
        teks={`Tarik garis pada ${r.nama.toLowerCase()} supaya terurai menjadi ${r.teksTarget}. Ketuk satu titik, lalu ketuk titik lain untuk menarik garis. Ketuk garis yang sama lagi untuk menghapusnya. Garis tidak boleh bersilang. Lalu tekan Periksa.`}
      />
      <GarisPengurai ronde={r} onBeres={onBeres} />
    </>
  );
}

export function KartuGarisK2B3B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Garis Pengurai"
      warna="#BBF7D0"
      petunjuk="Tarik garis pada bangun datar dengan mengetuk dua titik. Buat bangun terurai menjadi keping yang diminta. Garis tidak boleh bersilang. Lalu tekan Periksa."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3b-garis"
      jumlahRonde={RONDE_GARIS_B.length}
      belumSiap="Tarik garis sampai hasilnya sesuai target dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeGaris ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Hasil Susunan yang Mungkin ------------------------ */

function RondeKomposit({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_KOMPOSIT_B[ronde];
  return (
    <>
      <CatatanTempel
        pendek="Bentuk apa yang mungkin?"
        teks={`Kepingnya adalah ${r.judul}. Pilih semua bentuk yang bisa disusun dari keping-keping itu. Bentuk yang tidak mungkin punya luas yang berbeda dari semua keping digabung. Lalu tekan Periksa.`}
      />
      <HasilSusunan ronde={r} onBeres={onBeres} />
    </>
  );
}

export function KartuKompositK2B3B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Hasil Susunan yang Mungkin"
      warna="#FDE68A"
      petunjuk="Lihat keping yang diberikan. Pilih semua bentuk yang bisa disusun dari keping itu, dan jangan pilih yang tidak bisa. Lalu tekan Periksa."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3b-komposit"
      jumlahRonde={RONDE_KOMPOSIT_B.length}
      belumSiap="Pilih bentuknya dan tekan Periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKomposit ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Hitung Keping ------------------------------------- */

function RondeHitung({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_HITUNG_B[ronde];
  return (
    <>
      <CatatanTempel pendek={`Hitung keping ${r.nama.toLowerCase()}`} teks={`${r.nama} ini sudah diurai oleh garis tebal. Hitung ada berapa segitiga dan berapa segi empat. Atur angkanya dengan tombol plus dan minus, lalu tekan Periksa.`} />
      <HitungKeping ronde={r} onBeres={onBeres} />
    </>
  );
}

export function KartuHitungK2B3B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_HITUNG_B[RONDE_HITUNG_B.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Hitung Keping"
      warna="#FBCFE8"
      petunjuk="Hitung banyak segitiga dan banyak segi empat pada bangun yang sudah diurai. Atur angkanya dengan tombol plus dan minus, lalu tekan Periksa. Pada soal terakhir, ucapkan banyak segitiganya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3b-hitung"
      jumlahRonde={RONDE_HITUNG_B.length}
      kunciAkhir={akhir.target.segitiga}
      belumSiap="Hitung kepingnya dan tekan Periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeHitung ronde={r} onBeres={beres} />}
    />
  );
}
