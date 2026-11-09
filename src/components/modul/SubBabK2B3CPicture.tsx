"use client";

import React from "react";
import { type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { CatatanTempel } from "./tahap-b-gaya";
import { Bayangan, BeriNama, TabelPermukaan } from "./ruang-k2b3";
import { NAMA_RUANG, RONDE_BAYANGAN_C, RONDE_NAMA_C } from "./data-k2b3";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 3 Sub-Bab C, Tahap 5 Picture: model bangun ruang polos, tanpa   */
/* gambar benda. 5 Bayangan Bangun Ruang  6 Tabel Permukaan  7 Beri Nama      */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 5. Bayangan Bangun Ruang ----------------------------- */

function RondeBayangan({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const s = RONDE_BAYANGAN_C[ronde];
  return (
    <>
      <CatatanTempel
        pendek={`${NAMA_RUANG[s.jenis]} dari ${s.arah}`}
        teks={`Model ${NAMA_RUANG[s.jenis].toLowerCase()} dilihat dari ${s.arah}. Lihat arah matanya. Bangun datar apa yang tampak? Pilih satu dari tiga bayangan.`}
      />
      <Bayangan soal={s} onBeres={onBeres} />
    </>
  );
}

export function KartuBayanganK2B3C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Bayangan Bangun Ruang"
      warna="#BBF7D0"
      petunjuk="Model bangun ruang dilihat dari atas atau dari samping. Lihat arah matanya, lalu pilih bayangan bangun datar yang tampak."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3c-bayangan"
      jumlahRonde={RONDE_BAYANGAN_C.length}
      belumSiap="Pilih bayangannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBayangan ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Tabel Permukaan ----------------------------------- */

export function KartuTabelK2B3C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tabel Permukaan"
      warna="#FDE68A"
      petunjuk="Isi tabel untuk lima bangun ruang. Centang kotak permukaan datar, permukaan lengkung, dan menggelinding yang benar pada tiap baris. Lalu tekan Periksa."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3c-tabel"
      jumlahRonde={1}
      belumSiap="Isi tabel dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(_, beres) => (
        <>
          <CatatanTempel pendek="Centang yang benar" teks="Untuk tiap bangun ruang, centang kotak yang benar: permukaan datar, permukaan lengkung, dan menggelinding. Ingat percobaan di lereng. Lalu tekan Periksa." />
          <TabelPermukaan onBeres={beres} />
        </>
      )}
    />
  );
}

/* --------- Permainan 7. Beri Nama Bangun Ruang ---------------------------- */

function RondeNama({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_NAMA_C[ronde];
  return (
    <>
      <CatatanTempel pendek="Beri nama tiap model" teks="Seret label nama ke model bangun ruang yang sesuai, atau ketuk label lalu ketuk modelnya. Ada kubus, balok, tabung, kerucut, dan bola." />
      <BeriNama urut={r.urut} warna={r.warna} onBeres={onBeres} />
    </>
  );
}

export function KartuNamaK2B3C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Beri Nama Bangun Ruang"
      warna="#FBCFE8"
      petunjuk="Seret label nama ke model bangun ruang yang sesuai, atau ketuk label lalu ketuk modelnya. Ada kubus, balok, tabung, kerucut, dan bola."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3c-nama"
      jumlahRonde={RONDE_NAMA_C.length}
      belumSiap="Beri nama semua model dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeNama ronde={r} onBeres={beres} />}
    />
  );
}
