"use client";

import React from "react";
import { type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { CatatanTempel } from "./tahap-b-gaya";
import { sebut } from "./dasar-k2";
import { TandaiSisi, WarnaiBentuk } from "./geometri-k2b3";
import { PasangGaris } from "./permainan-k2b3";
import { RONDE_GARIS_A, RONDE_SISI_A, RONDE_WARNAI_A, sisiBentuk, type IdBentuk } from "./data-k2b3";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 3 Sub-Bab A, Tahap 5 Picture: diagram polos, tanpa gambar benda.*/
/*  5 Tandai Setiap Sisi   6 Tarik Garis Bangun dan Ciri   7 Warnai Bentuk    */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 5. Tandai Setiap Sisi -------------------------------- */

function RondeTandai({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const id = RONDE_SISI_A[ronde];
  return (
    <>
      <CatatanTempel pendek="Tandai tiap sisi" teks="Ketuk setiap sisi satu kali. Sisi yang kamu ketuk akan berwarna dan bernomor. Setelah semua sisi ditandai, pilih banyak sisinya, lalu pilih namanya." />
      <TandaiSisi bentuk={id} onBeres={onBeres} />
    </>
  );
}

export function KartuTandaiK2B3A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_SISI_A[RONDE_SISI_A.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tandai Setiap Sisi"
      warna="#BBF7D0"
      petunjuk="Ketuk setiap sisi bangun datar satu kali. Sisi yang ditandai berwarna dan bernomor. Setelah semuanya ditandai, pilih banyak sisi dan namanya. Pada soal terakhir, ucapkan banyak sisinya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3a-tandai"
      jumlahRonde={RONDE_SISI_A.length}
      kunciAkhir={sisiBentuk(akhir)}
      belumSiap="Tandai semua sisi dan pilih namanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTandai ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Tarik Garis Bangun dan Ciri ----------------------- */

function petunjukGaris(b: IdBentuk): string {
  const n = sisiBentuk(b);
  return n === 0 ? "Tepi bangun ini melengkung. Cari ciri satu kurva atau garis lengkung." : `Hitung sisinya. Bangun ini punya ${sebut(n)} sisi. Cari cirinya.`;
}

function RondeGaris({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_GARIS_A[ronde];
  return (
    <>
      <CatatanTempel pendek="Hubungkan bangun dan ciri" teks="Ketuk bangun datar di kiri, lalu ketuk cirinya di kanan. Kalau cocok, garis penghubung akan tergambar. Hitung sisinya dulu kalau ragu." />
      <PasangGaris
        kiri={r.kiri}
        kanan={r.kanan.map((c) => ({ id: c.cocokDengan, teks: c.teks }))}
        kunci={Object.fromEntries(r.kiri.map((k) => [k, k]))}
        petunjuk={petunjukGaris}
        onBeres={onBeres}
        pesanBeres="Semua bangun sudah terhubung dengan cirinya."
      />
    </>
  );
}

export function KartuGarisK2B3A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tarik Garis Bangun dan Ciri"
      warna="#FDE68A"
      petunjuk="Ketuk bangun datar di kiri, lalu ketuk ciri yang cocok di kanan. Garis akan menghubungkan keduanya. Hitung sisi bangunnya untuk menemukan cirinya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3a-garis"
      jumlahRonde={RONDE_GARIS_A.length}
      belumSiap="Hubungkan semua bangun dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeGaris ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Warnai Bentuk ------------------------------------- */

function RondeWarnai({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_WARNAI_A[ronde];
  return (
    <>
      <CatatanTempel pendek={r.teks} teks={`${r.teks} Ketuk bentuk untuk mewarnainya. Ketuk lagi untuk menghapus warnanya. Kalau sudah, tekan Periksa.`} />
      <WarnaiBentuk aturan={r.aturan} warna={r.warna} namaWarna={r.namaWarna} bentuk={r.bentuk} onBeres={onBeres} />
    </>
  );
}

export function KartuWarnaiK2B3A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Warnai Bentuk"
      warna="#FBCFE8"
      petunjuk="Warnai hanya bentuk yang sesuai aturan. Ketuk bentuk untuk mewarnainya, ketuk lagi untuk menghapus warnanya. Lalu tekan Periksa."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3a-warnai"
      jumlahRonde={RONDE_WARNAI_A.length}
      belumSiap="Warnai dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeWarnai ronde={r} onBeres={beres} />}
    />
  );
}