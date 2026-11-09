"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { Bongkar, DuaSegitiga, Gunting, SusunKeping } from "./geometri-k2b3";
import { INDEKS_BONGKAR_B, RONDE_GUNTING_B, RONDE_RAKIT_B } from "./data-k2b3";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 3 Sub-Bab B, Tahap 4 Concrete: kertas dan keping yang dipegang. */
/*  1 Gunting Kertas        2 Susun Keping di Papan                           */
/*  3 Bongkar Bangunan Mainan   4 Dua Segitiga, Tiga Bentuk                   */
/* Naskah: naskah/mtk-2-bab3-sub-b-mengurai-menyusun-bangun-datar.md          */
/* ------------------------------------------------------------------------ */

type Ronde = { onBeres: () => void; ronde: number };

/* --------- Permainan 1. Gunting Kertas ------------------------------------ */

function RondeGunting({ ronde, onBeres }: Ronde) {
  const r = RONDE_GUNTING_B[ronde];
  return (
    <>
      <IgilBicara
        pendek={`Jadikan ${r.teksTarget}`}
        teks={`Gunting kertas ${r.nama.toLowerCase()} sepanjang garis putus-putus supaya menjadi ${r.teksTarget}. Ketuk garis putus-putus untuk menggunting. Ketuk tombol garis lagi untuk menyatukan kembali. Dua garis yang bersilang tidak boleh dipakai bersamaan.`}
      />
      <Gunting ronde={r} onBeres={onBeres} />
    </>
  );
}

export function LangkahGuntingK2B3B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Gunting Kertas"
      warna="#FBCFE8"
      petunjuk="Gunting kertas sepanjang garis putus-putus. Ketuk garis untuk menggunting dan ketuk lagi untuk menyatukannya. Buat keping sesuai target. Beri nama keping hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3b-gunting"
      jumlahRonde={RONDE_GUNTING_B.length}
      belumSiap="Gunting sampai hasilnya sesuai target dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeGunting ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Susun Keping di Papan ----------------------------- */

function RondeSusun({ ronde, onBeres }: Ronde) {
  const r = RONDE_RAKIT_B[ronde];
  return (
    <>
      <IgilBicara
        pendek={`Susun: ${r.siluet}`}
        teks={`Susun keping-keping di nampan menjadi ${r.siluet}. Seret keping ke bayangan yang bentuknya sama, atau ketuk keping lalu ketuk bayangannya. Perhatikan banyak sisi dan ukurannya.`}
      />
      <SusunKeping ronde={r} onBeres={onBeres} />
    </>
  );
}

export function LangkahSusunK2B3B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Susun Keping di Papan"
      warna="#FDE68A"
      petunjuk="Susun keping di nampan menjadi bentuk yang diminta. Seret keping ke bayangan yang bentuknya sama, atau ketuk keping lalu ketuk bayangannya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3b-susun"
      jumlahRonde={RONDE_RAKIT_B.length}
      belumSiap="Susun semua keping dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSusun ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Bongkar Bangunan Mainan --------------------------- */

function RondeBongkar({ ronde, onBeres }: Ronde) {
  const r = RONDE_RAKIT_B[INDEKS_BONGKAR_B[ronde]];
  return (
    <>
      <IgilBicara
        pendek={`Bongkar ${r.siluet}`}
        teks={`Bongkar ${r.siluet} mainan ini. Ketuk tiap keping sampai terlepas. Lalu hitung ada berapa segitiga dan berapa segi empat. Segitiga punya tiga sisi, segi empat punya empat sisi.`}
      />
      <Bongkar ronde={r} onBeres={onBeres} />
    </>
  );
}

export function LangkahBongkarK2B3B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Bongkar Bangunan Mainan"
      warna="#BBF7D0"
      petunjuk="Ketuk tiap keping bangunan mainan sampai terlepas. Lalu hitung banyak segitiga dan banyak segi empat, dan tekan Periksa."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3b-bongkar"
      jumlahRonde={INDEKS_BONGKAR_B.length}
      belumSiap="Bongkar dan hitung dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBongkar ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Dua Segitiga, Tiga Bentuk ------------------------- */

export function LangkahDuaSegitigaK2B3B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Dua Segitiga, Tiga Bentuk"
      warna="#BAE6FD"
      petunjuk="Ada dua segitiga siku-siku yang sama. Tempelkan dengan tiga cara yang berbeda. Lalu namai bentuk yang terjadi. Temukan ketiganya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3b-dua"
      jumlahRonde={1}
      belumSiap="Temukan ketiga bentuknya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(_, beres) => (
        <>
          <IgilBicara
            pendek="Tempel dengan tiga cara"
            teks="Ini dua segitiga siku-siku yang sama. Tekan tombol tempel untuk melihat hasil tiap cara. Lalu pilih nama bentuk yang terjadi. Cara menempel memengaruhi hasilnya."
          />
          <DuaSegitiga onBeres={beres} />
        </>
      )}
    />
  );
}
