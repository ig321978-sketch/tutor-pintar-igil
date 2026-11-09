"use client";

import React from "react";
import { type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { CatatanTempel } from "./tahap-b-gaya";
import { sebut } from "./dasar-k2";
import { LangkahBagan, LompatGaris, SusunBawah } from "./permainan-k2b2";
import { JALUR_A, RONDE_BAGAN_A, RONDE_LOMPAT_A, RONDE_SUSUN_A } from "./data-k2b2";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 2 Sub-Bab A, Tahap 5 Picture: diagram polos, tanpa gambar benda.*/
/* Jalur bilangan, tabel nilai tempat susun ke bawah, dan bagan pasangan.      */
/*  5 Loncat di Jalur Bilangan (hitung maju)                                  */
/*  6 Susun ke Bawah (satuan dulu, pindah sepuluh, lalu puluhan)              */
/*  7 Bagan Pasangan (pisah jadi sepuluh dan satuan)                          */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 5. Loncat di Jalur Bilangan -------------------------- */

function RondeLompat({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_LOMPAT_A[ronde];
  return (
    <>
      <CatatanTempel
        pendek={`${r.a} + ${r.b} = ?`}
        teks={`Menghitung maju. Mulai dari ${sebut(r.a)}, lalu lompat ${sebut(r.b)} kali ke kanan di jalur bilangan. Ketuk kotak berikutnya satu per satu, lalu tekan Berhenti.`}
      />
      <LompatGaris dari={JALUR_A.dari} sampai={JALUR_A.sampai} mulai={r.a} arah="maju" langkah={r.b} kataKerja="ditambah" onBeres={() => onBeres()} />
    </>
  );
}

export function KartuLompatK2B2A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_LOMPAT_A[RONDE_LOMPAT_A.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Loncat di Jalur Bilangan"
      warna="#BBF7D0"
      petunjuk="Ketuk kotak berikutnya di jalur bilangan, satu per satu, sebanyak bilangan kedua. Busur lompatan akan tergambar. Lalu tekan Berhenti. Pada soal terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2a-lompat"
      jumlahRonde={RONDE_LOMPAT_A.length}
      kunciAkhir={akhir.a + akhir.b}
      belumSiap="Lompat dan tekan Berhenti dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeLompat ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Susun ke Bawah ------------------------------------ */

function RondeSusun({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_SUSUN_A[ronde];
  return (
    <>
      <CatatanTempel
        pendek={`${r.a} + ${r.b} = ?`}
        teks={`Penjumlahan bersusun. Susun ${sebut(r.b)} di bawah ${sebut(r.a)}, satuan lurus dengan satuan. Jumlahkan satuan dulu, lalu puluhan. Kalau satuan berjumlah sepuluh, pindahkan satu puluhan.`}
      />
      <SusunBawah op="+" a={r.a} b={r.b} onBeres={() => onBeres()} />
    </>
  );
}

export function KartuSusunK2B2A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_SUSUN_A[RONDE_SUSUN_A.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Susun ke Bawah"
      warna="#FDE68A"
      petunjuk="Susun bilangan kedua di kolom yang tepat. Jumlahkan satuan dulu. Kalau satuan berjumlah sepuluh, pindahkan satu puluhan ke kolom Puluhan. Lalu jumlahkan puluhan. Angka soal berwarna biru, angka jawaban hijau, dan catatan pindah berwarna merah kecil. Pada soal terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2a-susun"
      jumlahRonde={RONDE_SUSUN_A.length}
      kunciAkhir={akhir.a + akhir.b}
      belumSiap="Selesaikan susunan sampai hasilnya muncul dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSusun ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Bagan Pasangan ------------------------------------ */

function RondeBagan({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_BAGAN_A[ronde];
  return (
    <>
      <CatatanTempel
        pendek={`${r.a} + ${r.b} = ?`}
        teks={`Pasangan bilangan. Pisahkan ${sebut(r.a)} menjadi sepuluh dan satuannya. Jumlahkan satuannya dengan ${sebut(r.b)}, lalu tambahkan sepuluh. Jawab satu langkah demi satu langkah.`}
      />
      <LangkahBagan mode="tambah" a={r.a} b={r.b} onBeres={() => onBeres()} />
    </>
  );
}

export function KartuBaganK2B2A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_BAGAN_A[RONDE_BAGAN_A.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Bagan Pasangan"
      warna="#FBCFE8"
      petunjuk="Pisahkan bilangan pertama menjadi sepuluh dan satuannya pada bagan pasangan. Jumlahkan satuan dengan bilangan kedua. Lalu tambahkan sepuluh. Pilih bilangan yang tepat di setiap langkah. Pada soal terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2a-bagan"
      jumlahRonde={RONDE_BAGAN_A.length}
      kunciAkhir={akhir.a + akhir.b}
      belumSiap="Selesaikan semua langkah bagan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBagan ronde={r} onBeres={beres} />}
    />
  );
}
