"use client";

import React from "react";
import { type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { CatatanTempel } from "./tahap-b-gaya";
import { sebut } from "./dasar-k2";
import { LangkahBagan, LompatGaris, SusunBawah } from "./permainan-k2b2";
import { JALUR_B, RONDE_BAGAN_B, RONDE_MUNDUR_B, RONDE_SUSUN_B } from "./data-k2b2";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 2 Sub-Bab B, Tahap 5 Picture: diagram polos, tanpa gambar benda.*/
/*  5 Loncat Mundur di Jalur Bilangan (hitung mundur)                         */
/*  6 Susun Kurang (satuan dulu, urai satu puluhan bila perlu)                */
/*  7 Bagan Pasangan Kurang (pisah kedua bilangan)                            */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 5. Loncat Mundur di Jalur Bilangan ------------------- */

function RondeMundur({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_MUNDUR_B[ronde];
  return (
    <>
      <CatatanTempel
        pendek={`${r.a} − ${r.b} = ?`}
        teks={`Menghitung mundur. Mulai dari ${sebut(r.a)}, lalu lompat ${sebut(r.b)} kali ke kiri di jalur bilangan. Ketuk kotak sebelumnya satu per satu, lalu tekan Berhenti.`}
      />
      <LompatGaris dari={JALUR_B.dari} sampai={JALUR_B.sampai} mulai={r.a} arah="mundur" langkah={r.b} kataKerja="dikurangi" onBeres={() => onBeres()} />
    </>
  );
}

export function KartuMundurK2B2B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_MUNDUR_B[RONDE_MUNDUR_B.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Loncat Mundur di Jalur Bilangan"
      warna="#FBCFE8"
      petunjuk="Ketuk kotak sebelumnya di jalur bilangan, satu per satu, sebanyak bilangan yang dikurangkan. Busur lompatan akan tergambar ke kiri. Lalu tekan Berhenti. Pada soal terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2b-mundur"
      jumlahRonde={RONDE_MUNDUR_B.length}
      kunciAkhir={akhir.a - akhir.b}
      belumSiap="Lompat mundur dan tekan Berhenti dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeMundur ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Susun Kurang -------------------------------------- */

function RondeSusunKurang({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_SUSUN_B[ronde];
  return (
    <>
      <CatatanTempel
        pendek={`${r.a} − ${r.b} = ?`}
        teks={`Pengurangan bersusun. Bilangan besar di atas, ${sebut(r.b)} di bawahnya, satuan lurus dengan satuan. Kurangkan satuan dulu, lalu puluhan. Kalau satuan atas lebih kecil, urai satu puluhan.`}
      />
      <SusunBawah op="−" a={r.a} b={r.b} onBeres={() => onBeres()} />
    </>
  );
}

export function KartuSusunKurangK2B2B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_SUSUN_B[RONDE_SUSUN_B.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Susun Kurang"
      warna="#FDE68A"
      petunjuk="Susun bilangan pengurang di kolom Satuan. Kalau satuan atas lebih kecil, urai satu puluhan menjadi sepuluh satuan. Kurangkan satuan dulu, lalu puluhan. Angka soal berwarna biru, angka jawaban hijau, dan catatan urai berwarna merah kecil. Pada soal terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2b-susun"
      jumlahRonde={RONDE_SUSUN_B.length}
      kunciAkhir={akhir.a - akhir.b}
      belumSiap="Selesaikan susunan sampai hasilnya muncul dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSusunKurang ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Bagan Pasangan Kurang ----------------------------- */

function RondeBaganKurang({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_BAGAN_B[ronde];
  return (
    <>
      <CatatanTempel
        pendek={`${r.a} − ${r.b} = ?`}
        teks={`Pasangan bilangan untuk pengurangan. Pisahkan ${sebut(r.a)} dan ${sebut(r.b)} menjadi sepuluh dan satuannya. Kurangkan sepuluh dengan sepuluh, lalu satuan dengan satuan.`}
      />
      <LangkahBagan mode="kurang" a={r.a} b={r.b} onBeres={() => onBeres()} />
    </>
  );
}

export function KartuBaganKurangK2B2B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_BAGAN_B[RONDE_BAGAN_B.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Bagan Pasangan Kurang"
      warna="#C7D2FE"
      petunjuk="Pisahkan kedua bilangan menjadi sepuluh dan satuannya pada bagan pasangan. Kurangkan sepuluh dengan sepuluh, lalu satuan dengan satuan. Pilih bilangan yang tepat di setiap langkah. Pada soal terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2b-bagan"
      jumlahRonde={RONDE_BAGAN_B.length}
      kunciAkhir={akhir.a - akhir.b}
      belumSiap="Selesaikan semua langkah bagan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBaganKurang ronde={r} onBeres={beres} />}
    />
  );
}
