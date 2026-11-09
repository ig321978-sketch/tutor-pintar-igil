"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { sebut } from "./dasar-k2";
import { BendaDatarSvg } from "./dasar-k2b3";
import { CariBenda, CetakPutar, PapanPaku } from "./geometri-k2b3";
import { Sortir, type BinSortir, type ItemSortir } from "./permainan-k2b3";
import { RONDE_CARI_A, RONDE_CETAKPUTAR_A, RONDE_KARET_A, RONDE_PILAH_A, bendaDatar, golonganBenda, namaSegi, sisiBenda } from "./data-k2b3";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 3 Sub-Bab A, Tahap 4 Concrete: benda nyata yang datar.          */
/*  1 Pilah Benda di Meja (seret)        2 Papan Paku dan Karet Gelang        */
/*  3 Cetak dan Putar (percobaan koin)   4 Cari Bentuk di Sekitar (ketuk)     */
/* Naskah: naskah/mtk-2-bab3-sub-a-bangun-datar.md                            */
/* ------------------------------------------------------------------------ */

type Ronde = { onBeres: () => void; ronde: number };

/* --------- Permainan 1. Pilah Benda di Meja ------------------------------- */

const BIN_A: BinSortir[] = [
  { id: "segi", label: "Segi banyak", ikon: "📐", warna: "#DBEAFE" },
  { id: "lengkung", label: "Bentuk lengkung", ikon: "🌀", warna: "#FCE7F3" },
];

function itemPilah(id: string): ItemSortir {
  const b = bendaDatar(id);
  const segi = golonganBenda(id) === "segiBanyak";
  const n = sisiBenda(id);
  return {
    id,
    label: b.nama,
    isi: <BendaDatarSvg id={id} kelas="h-12 w-12" />,
    bin: segi ? "segi" : "lengkung",
    petunjuk: segi ? `${b.nama} tepinya garis lurus dan punya ${sebut(n)} sisi, jadi masuk kotak segi banyak.` : `${b.nama} tepinya melengkung dan tidak punya sisi lurus, jadi masuk kotak bentuk lengkung.`,
    ucapan: segi ? `${b.nama} punya ${sebut(n)} sisi lurus. Segi banyak.` : `${b.nama} tepinya melengkung. Bentuk lengkung.`,
  };
}

function RondePilah({ ronde, onBeres }: Ronde) {
  const ids = RONDE_PILAH_A[ronde];
  return (
    <>
      <IgilBicara
        pendek="Lihat tepinya"
        teks="Lihat tepi tiap benda. Kalau tepinya garis lurus, taruh di kotak Segi banyak. Kalau tepinya melengkung, taruh di kotak Bentuk lengkung. Seret bendanya ke kotak, atau ketuk bendanya lalu ketuk kotaknya."
      />
      <Sortir item={ids.map(itemPilah)} bin={BIN_A} gaya="kayu" onBeres={onBeres} pesanBeres="Semua benda sudah masuk kotak yang tepat. Garis lurus berarti segi banyak, garis lengkung berarti bentuk lengkung." />
    </>
  );
}

export function LangkahPilahK2B3A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Pilah Benda di Meja"
      warna="#BBF7D0"
      petunjuk="Lihat tepi tiap benda di meja. Benda yang tepinya garis lurus masuk kotak Segi banyak. Benda yang tepinya melengkung masuk kotak Bentuk lengkung. Seret bendanya, atau ketuk bendanya lalu ketuk kotaknya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3a-pilah"
      jumlahRonde={RONDE_PILAH_A.length}
      belumSiap="Pilah semua benda dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePilah ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Papan Paku dan Karet Gelang ----------------------- */

function RondePapan({ ronde, onBeres }: Ronde) {
  const n = RONDE_KARET_A[ronde];
  return (
    <>
      <IgilBicara
        pendek={`Buat ${namaSegi(n)}`}
        teks={`Rentangkan karet gelang di papan paku untuk membuat ${namaSegi(n)}. Karetnya harus punya ${sebut(n)} sisi. Ketuk paku satu per satu, lalu ketuk paku pertama untuk menutup. Karet tidak boleh bersilang.`}
      />
      <PapanPaku sisiTarget={n} onBeres={onBeres} />
    </>
  );
}

export function LangkahPapanK2B3A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Papan Paku dan Karet Gelang"
      warna="#FDE68A"
      petunjuk="Rentangkan karet gelang di papan paku. Ketuk paku satu per satu, lalu ketuk paku pertama untuk menutup bentuknya. Banyak sisi karet harus sama dengan yang diminta. Pada soal terakhir, ucapkan banyak sisinya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3a-papan"
      jumlahRonde={RONDE_KARET_A.length}
      kunciAkhir={RONDE_KARET_A[RONDE_KARET_A.length - 1]}
      belumSiap="Selesaikan bentuknya di papan paku dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePapan ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Cetak dan Putar ----------------------------------- */

function RondeCetak({ ronde, onBeres }: Ronde) {
  const b = RONDE_CETAKPUTAR_A[ronde];
  return (
    <>
      <IgilBicara
        pendek={`${b.nama}: lingkaran?`}
        teks={`Percobaan dengan ${b.nama.toLowerCase()}. Tekan Cetak untuk mencetak tepinya di kertas. Lalu putar bendanya beberapa kali. Apakah benda selalu pas di atas cetakannya? Kalau selalu pas, itu lingkaran.`}
      />
      <CetakPutar benda={b} onBeres={onBeres} />
    </>
  );
}

export function LangkahCetakK2B3A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Cetak dan Putar"
      warna="#FBCFE8"
      petunjuk="Cetak tepi benda di kertas. Lalu putar bendanya di atas cetakan. Kalau benda selalu pas ke arah mana pun, itu lingkaran. Kalau kadang tidak pas, itu bukan lingkaran."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3a-cetak"
      jumlahRonde={RONDE_CETAKPUTAR_A.length}
      belumSiap="Putuskan dulu: lingkaran atau bukan."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeCetak ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Cari Bentuk di Sekitar ---------------------------- */

function RondeCari({ ronde, onBeres }: Ronde) {
  const r = RONDE_CARI_A[ronde];
  return (
    <>
      <IgilBicara
        pendek={`Cari ${r.sisi} sisi`}
        teks={`Cari semua benda yang punya ${sebut(r.sisi)} sisi. Hitung sisinya satu per satu, lalu ketuk bendanya. Benda yang tepinya melengkung tidak punya sisi lurus.`}
      />
      <CariBenda sisi={r.sisi} benda={r.benda} onBeres={onBeres} />
    </>
  );
}

export function LangkahCariK2B3A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Cari Bentuk di Sekitar"
      warna="#BAE6FD"
      petunjuk="Cari benda di sekitar yang punya sisi sebanyak yang diminta. Hitung sisinya satu per satu, lalu ketuk bendanya. Temukan semuanya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3a-cari"
      jumlahRonde={RONDE_CARI_A.length}
      belumSiap="Temukan semua bendanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeCari ronde={r} onBeres={beres} />}
    />
  );
}
