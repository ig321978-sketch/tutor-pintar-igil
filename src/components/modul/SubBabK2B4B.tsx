"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { PetaKonsepGame } from "./permainan-k2b3";
import { KartuK2B5 } from "./kartu-k2b5";
import { AturBarisan, CariSatuan, IsiKotakPola, LanjutPola, PolaAtauBukan, WarnaiPola } from "./pola-k2b4";
import { PETA_KONSEP_B, RONDE_BARISAN_B, RONDE_CARI_B, RONDE_GERAK_B, RONDE_ISI_B, RONDE_LANJUT_B, RONDE_MANIK_B, RONDE_POLABUKAN_B, RONDE_TEPUK_B, RONDE_WARNAI_B } from "./data-k2b4";
import { visualInfografisK2B4B } from "./infografis-k2b4";
import { SUB_B4 } from "./naskah-k2b4";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 4 Sub-Bab B: Pola.                                              */
/*  Concrete 1 Rangkai Manik-Manik  2 Atur Barisan Sahabat                     */
/*           3 Gerakan Berpola  4 Tepuk Berpola                               */
/*  Picture  5 Pola atau Bukan?  6 Lanjutkan Pola  7 Warnai Pola              */
/*  Abstract 8 Isi Kotak Pola  9 Cari Satuan Pola  10 Peta Konsep Pola        */
/* Naskah: naskah-k2b4.ts (SUB_B4). Tanpa API.                                 */
/* ------------------------------------------------------------------------ */

const J = SUB_B4.games.map((g) => g.title);

const SUARA_INFO =
  "Ini poster rangkuman pola. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK2B4BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B4} judul="Pola" suaraInfo={SUARA_INFO} visual={visualInfografisK2B4B()} speakGuru={speakGuru} />;
}

/* ------------------------------ Concrete ------------------------------ */

function KartuManikB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={0}
      judul={J[0]}
      id="k2b4b-manik"
      petunjuk="Lihat untaian manik. Warnanya berulang dengan teratur. Ketuk warna manik berikutnya untuk tempat yang kosong."
      jumlahRonde={RONDE_MANIK_B.length}
      belumSiap="Lengkapi untaian manik dulu, ya."
      isi={(r, beres) => (
        <>
          <IgilBicara pendek="Rangkai manik-manik" teks="Lihat untaian manik. Cari kelompok warna yang berulang. Lalu ketuk warna manik berikutnya untuk tempat yang kosong." />
          <LanjutPola key={r} ronde={RONDE_MANIK_B[r]} mode="concrete" onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuBarisanB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={1}
      judul={J[1]}
      id="k2b4b-barisan"
      petunjuk="Susun keenam sahabat dalam satu barisan sehingga sifat mereka membentuk pola yang diminta. Ketuk sahabat, lalu ketuk tempat di barisan."
      jumlahRonde={RONDE_BARISAN_B.length}
      belumSiap="Susun barisan sampai membentuk pola dulu, ya."
      isi={(r, beres) => (
        <>
          <IgilBicara pendek="Atur barisan" teks="Susun enam sahabat dalam satu barisan. Sifat mereka harus membentuk pola yang diminta. Ketuk sahabat, lalu ketuk tempat di barisan, dan tekan Periksa." />
          <AturBarisan key={r} ronde={RONDE_BARISAN_B[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuGerakB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={2}
      judul={J[2]}
      id="k2b4b-gerak"
      petunjuk="Lihat gerakan anak-anak. Gerakannya berulang dengan teratur. Ketuk gerakan berikutnya, lalu tirukan gerakannya di tempat dudukmu."
      jumlahRonde={RONDE_GERAK_B.length}
      belumSiap="Lengkapi pola gerakan dulu, ya."
      isi={(r, beres) => (
        <>
          <IgilBicara pendek="Gerakan berpola" teks="Lihat gerakan anak-anak. Cari gerakan yang berulang. Ketuk gerakan berikutnya, lalu tirukan gerakannya di tempat dudukmu." />
          <LanjutPola key={r} ronde={RONDE_GERAK_B[r]} mode="concrete" onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuTepukB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={3}
      judul={J[3]}
      id="k2b4b-tepuk"
      petunjuk="Tekan Dengarkan untuk mendengar pola tepukan. Lingkaran besar tepuk keras, lingkaran kecil tepuk pelan, cincin putus-putus diam. Ketuk tepukan berikutnya."
      jumlahRonde={RONDE_TEPUK_B.length}
      belumSiap="Lengkapi pola tepukan dulu, ya."
      isi={(r, beres) => (
        <>
          <IgilBicara pendek="Tepuk berpola" teks="Tekan Dengarkan untuk mendengar polanya. Lingkaran besar berarti tepuk keras, lingkaran kecil berarti tepuk pelan, dan cincin putus-putus berarti diam. Ketuk tepukan berikutnya." />
          <LanjutPola key={r} ronde={RONDE_TEPUK_B[r]} mode="concrete" onBeres={beres} />
        </>
      )}
    />
  );
}

/* ------------------------------ Picture ------------------------------ */

function KartuPolaBukanB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={4}
      judul={J[4]}
      id="k2b4b-polabukan"
      petunjuk="Lihat tiap barisan bangun. Tekan centang bila barisan itu pola, yaitu berulang dan teratur. Tekan silang bila bukan pola."
      jumlahRonde={RONDE_POLABUKAN_B.length}
      belumSiap="Nilai semua barisan dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanTempel pendek="Pola atau bukan" teks="Lihat tiap barisan bangun. Kalau kelompoknya berulang dengan teratur, tekan centang. Kalau tidak, tekan silang." />
          <PolaAtauBukan key={r} barisan={RONDE_POLABUKAN_B[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuLanjutB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={5}
      judul={J[5]}
      id="k2b4b-lanjut"
      petunjuk="Lihat barisan bangun yang berpola. Ketuk bentuk berikutnya untuk dua tempat kosong. Cari kelompok yang berulang dulu."
      jumlahRonde={RONDE_LANJUT_B.length}
      belumSiap="Lanjutkan polanya dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanTempel pendek="Lanjutkan pola" teks="Lihat barisan bangun. Cari kelompok yang berulang dari awal. Lalu ketuk bentuk berikutnya untuk tempat yang kosong." />
          <LanjutPola key={r} ronde={RONDE_LANJUT_B[r]} mode="picture" onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuWarnaiB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={6}
      judul={J[6]}
      id="k2b4b-warnai"
      petunjuk="Pilih warna, lalu ketuk bangun yang kosong untuk mewarnainya sampai polanya berlanjut. Pada ronde terakhir, buat polamu sendiri."
      jumlahRonde={RONDE_WARNAI_B.length}
      belumSiap="Warnai pola dan tekan Periksa dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanTempel pendek={RONDE_WARNAI_B[r].bebas ? "Buat polamu" : "Warnai pola"} teks={RONDE_WARNAI_B[r].bebas ? "Buat polamu sendiri. Pilih paling sedikit dua warna, lalu warnai delapan bangun supaya warnanya berulang dengan teratur. Tekan Periksa." : "Pilih warna, lalu ketuk bangun yang kosong untuk mewarnainya. Lanjutkan pola warna dari awal, lalu tekan Periksa."} />
          <WarnaiPola key={r} ronde={RONDE_WARNAI_B[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

/* ------------------------------ Abstract ------------------------------ */

function KartuIsiB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={7}
      judul={J[7]}
      id="k2b4b-isi"
      petunjuk="Lihat barisan huruf atau kata. Pilih kartu untuk tiap kotak kosong, berurutan dari kiri, sehingga barisan membentuk pola."
      jumlahRonde={RONDE_ISI_B.length}
      belumSiap="Isi semua kotak kosong dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanPensil pendek="Isi kotak pola" teks="Baca barisan. Cari kelompok yang berulang dari awal. Lalu pilih kartu yang tepat untuk tiap kotak kosong, dari kiri ke kanan." />
          <IsiKotakPola key={r} ronde={RONDE_ISI_B[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuCariB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={8}
      judul={J[8]}
      id="k2b4b-cari"
      petunjuk="Baca barisan huruf. Pilih kelompok yang berulang dari awal, yaitu satuan polanya. Kelompok itu bila diulang akan menyusun seluruh barisan."
      jumlahRonde={RONDE_CARI_B.length}
      belumSiap="Temukan satuan polanya dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanPensil pendek="Satuan pola" teks="Baca barisan huruf. Pilih kelompok yang berulang dari awal. Kelompok itu, bila diulang, akan menyusun seluruh barisan." />
          <CariSatuan key={r} ronde={RONDE_CARI_B[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuPetaKonsepB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={9}
      judul={J[9]}
      id="k2b4b-konsep"
      petunjuk="Lengkapi peta konsep pola. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat."
      jumlahRonde={PETA_KONSEP_B.length}
      belumSiap="Lengkapi peta konsepnya dulu, ya."
      isi={(r, beres) => {
        const p = PETA_KONSEP_B[r];
        return (
          <>
            <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
            <PetaKonsepGame pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
          </>
        );
      }}
    />
  );
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [
  { nomor: 1, render: (d) => <KartuManikB {...d} /> },
  { nomor: 2, render: (d) => <KartuBarisanB {...d} /> },
  { nomor: 3, render: (d) => <KartuGerakB {...d} /> },
  { nomor: 4, render: (d) => <KartuTepukB {...d} /> },
];

const KARTU_PICTURE: KartuTahap[] = [
  { nomor: 5, render: (d) => <KartuPolaBukanB {...d} /> },
  { nomor: 6, render: (d) => <KartuLanjutB {...d} /> },
  { nomor: 7, render: (d) => <KartuWarnaiB {...d} /> },
];

const KARTU_ABSTRACT: KartuTahap[] = [
  { nomor: 8, render: (d) => <KartuIsiB {...d} /> },
  { nomor: 9, render: (d) => <KartuCariB {...d} /> },
  { nomor: 10, render: (d) => <KartuPetaKonsepB {...d} /> },
];

export function ConcreteK2B4B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧸", nama: "CONCRETE", cara: "Rangkai, susun, dan tirukan!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B4B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan warnai", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B4B(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Huruf dan kata", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_B4} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />}
    />
  );
}
