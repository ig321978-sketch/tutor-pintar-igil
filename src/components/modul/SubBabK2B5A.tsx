"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, IsiKalimatGame, PetaKonsepGame } from "./permainan-k2b3";
import { CariSetengah, CentangSilang, LipatKertas, PilihPotongan, TarikGaris, TuangSetengah, WarnaiBagian } from "./potong-k2b5";
import { FIGURA_SETENGAH_A, PETA_KONSEP_A, RONDE_BENARSALAH_A, RONDE_CARI_A, RONDE_KALIMAT_A, RONDE_LIPAT_A, RONDE_POTONG_A, RONDE_TARIK_A, RONDE_TUANG_A, RONDE_WARNAI_A, BENDA_POTONG } from "./data-k2b5";
import { KartuK2B5 } from "./kartu-k2b5";
import { visualInfografisK2B5A } from "./infografis-k2b5";
import { SUB_A5 } from "./naskah-k2b5";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 5 Sub-Bab A: Setengah dari Benda Utuh.                          */
/*  Concrete 1 Potongan yang Adil  2 Lipat Kertas  3 Tuang Setengah           */
/*           4 Cari Setengah di Sekitar                                       */
/*  Picture  5 Warnai Setengah  6 Tarik Garis Jadi Dua  7 Setengah atau Bukan? */
/*  Abstract 8 Isi Kalimat  9 Benar atau Salah?  10 Peta Konsep               */
/* Naskah: naskah-k2b5.ts (SUB_A5). Tanpa API.                                */
/* ------------------------------------------------------------------------ */

const J = SUB_A5.games.map((g) => g.title);

const SUARA_INFO =
  "Ini poster rangkuman setengah dari benda utuh. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK2B5AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A5} judul="Setengah dari Benda Utuh" suaraInfo={SUARA_INFO} visual={visualInfografisK2B5A()} speakGuru={speakGuru} />;
}

/* ------------------------------ Concrete ------------------------------ */

function KartuPotongA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={0}
      judul={J[0]}
      id="k2b5a-potong"
      petunjuk="Lihat enam cara memotong. Ketuk semua potongan yang membagi benda menjadi dua bagian sama besar, lalu tekan Periksa. Potongan yang sama besar adalah setengah."
      jumlahRonde={RONDE_POTONG_A.length}
      belumSiap="Pilih potongan yang adil dan tekan Periksa dulu, ya."
      isi={(r, beres) => (
        <>
          <IgilBicara pendek="Potongan yang adil" teks={`Ada enam cara memotong ${BENDA_POTONG[RONDE_POTONG_A[r].benda].nama.toLowerCase()}. Ketuk semua potongan yang membagi menjadi dua bagian sama besar. Lalu tekan Periksa.`} />
          <PilihPotongan ronde={RONDE_POTONG_A[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuLipatA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={1}
      judul={J[1]}
      id="k2b5a-lipat"
      petunjuk="Pilih garis lipat. Bagian yang dilipat akan menutupi bagian lain. Kalau menutup pas, itu setengah. Temukan semua cara melipatnya."
      jumlahRonde={RONDE_LIPAT_A.length}
      belumSiap="Temukan cara melipat yang diminta dulu, ya."
      isi={(r, beres) => (
        <>
          <IgilBicara pendek={`Lipat ${RONDE_LIPAT_A[r].nama}`} teks={`Pilih garis lipat untuk ${RONDE_LIPAT_A[r].nama}. Kalau kedua sisi menutup pas, lipatan diterima. Kalau ada yang menonjol, lipatan ditolak.`} />
          <LipatKertas ronde={RONDE_LIPAT_A[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuTuangA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={2}
      judul={J[2]}
      id="k2b5a-tuang"
      petunjuk="Satu wadah penuh dan satu wadah kosong. Tuang sedikit demi sedikit sampai kedua wadah sama tinggi. Lalu tekan Periksa."
      jumlahRonde={RONDE_TUANG_A.length}
      belumSiap="Tuang sampai kedua wadah sama tinggi dulu, ya."
      isi={(r, beres) => (
        <>
          <IgilBicara pendek={`Tuang ${RONDE_TUANG_A[r].nama}`} teks={`Tuang ${RONDE_TUANG_A[r].nama} dari wadah penuh ke wadah kosong. Berhenti ketika tinggi cairan kedua wadah sama. Lalu tekan Periksa.`} />
          <TuangSetengah ronde={RONDE_TUANG_A[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuCariA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={3}
      judul={J[3]}
      id="k2b5a-cari"
      petunjuk="Lihat benda dan gelas di sekitar. Ketuk semua yang tinggal tepat setengah. Benda yang tinggal seperempat, tiga perempat, utuh, atau tidak sama besar bukan setengah."
      jumlahRonde={RONDE_CARI_A.length}
      belumSiap="Temukan semua yang setengah dulu, ya."
      isi={(r, beres) => (
        <>
          <IgilBicara pendek="Cari yang setengah" teks="Lihat delapan benda dan gelas. Ketuk semua yang tinggal tepat setengah, lalu tekan Periksa." />
          <CariSetengah item={RONDE_CARI_A[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

/* ------------------------------ Picture ------------------------------ */

function KartuWarnaiA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={4}
      judul={J[4]}
      id="k2b5a-warnai"
      petunjuk="Ketuk bagian gambar untuk mewarnainya sampai tepat setengah dari seluruh gambar. Ketuk lagi untuk menghapus warna. Lalu tekan Periksa."
      jumlahRonde={RONDE_WARNAI_A.length}
      belumSiap="Warnai tepat setengah dan tekan Periksa dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanTempel pendek={RONDE_WARNAI_A[r].teks} teks={`${RONDE_WARNAI_A[r].teks} Ketuk bagian gambar untuk mewarnai. Kalau sudah tepat setengah, tekan Periksa.`} />
          <WarnaiBagian ronde={RONDE_WARNAI_A[r]} warna="#F59E0B" onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuTarikA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={5}
      judul={J[5]}
      id="k2b5a-tarik"
      petunjuk="Ketuk dua titik pada tepi bangun untuk menarik satu garis. Garis harus membagi bangun menjadi dua bagian sama besar. Lalu warnai setengahnya."
      jumlahRonde={RONDE_TARIK_A.length}
      belumSiap="Tarik garis yang membagi sama besar dan warnai setengahnya dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanTempel pendek="Tarik satu garis" teks="Ketuk dua titik pada tepi bangun untuk menarik satu garis. Dua bagian harus sama besar. Lalu ketuk satu bagian untuk mewarnainya." />
          <TarikGaris bentuk={RONDE_TARIK_A[r]} target={2} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuCentangA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={6}
      judul={J[6]}
      id="k2b5a-centang"
      petunjuk="Taruh setiap gambar ke kolom Setengah atau Bukan Setengah. Setengah berarti bagian berwarna tepat separuh dari seluruh gambar."
      jumlahRonde={1}
      belumSiap="Kelompokkan semua gambar dulu, ya."
      isi={(_r, beres) => (
        <>
          <CatatanTempel pendek="Setengah atau bukan" teks="Lihat bagian yang berwarna. Seret tiap gambar ke kolom Setengah atau Bukan Setengah, atau ketuk gambarnya lalu ketuk kolomnya." />
          <CentangSilang figura={FIGURA_SETENGAH_A} target="setengah" onBeres={beres} />
        </>
      )}
    />
  );
}

/* ------------------------------ Abstract ------------------------------ */

function KartuKalimatA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={7}
      judul={J[7]}
      id="k2b5a-kalimat"
      petunjuk="Lengkapi tiap kalimat dengan memilih satu kartu untuk bagian kosong. Kalimat yang lengkap akan dibacakan."
      jumlahRonde={RONDE_KALIMAT_A.length}
      belumSiap="Lengkapi semua kalimat dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanPensil pendek="Isi bagian kosong" teks="Baca kalimat, lalu pilih kartu yang tepat untuk bagian kosong. Setengah artinya dua bagian yang sama besar." />
          <IsiKalimatGame kalimat={RONDE_KALIMAT_A[r]} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap. Setengah adalah satu dari dua bagian yang sama besar." />
        </>
      )}
    />
  );
}

function KartuBenarSalahA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={8}
      judul={J[8]}
      id="k2b5a-benarsalah"
      petunjuk="Baca setiap pernyataan tentang setengah, lalu tekan Benar atau Salah. Kalau keliru, baca alasannya dan coba lagi."
      jumlahRonde={RONDE_BENARSALAH_A.length}
      belumSiap="Jawab semua pernyataan dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan dengan teliti. Ingat: setengah harus dua bagian dan sama besar." />
          <BenarSalahGame pernyataan={RONDE_BENARSALAH_A[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah dinilai dengan tepat." />
        </>
      )}
    />
  );
}

function KartuPetaA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={9}
      judul={J[9]}
      id="k2b5a-peta"
      petunjuk="Lengkapi peta konsep setengah. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat."
      jumlahRonde={PETA_KONSEP_A.length}
      belumSiap="Lengkapi peta konsepnya dulu, ya."
      isi={(r, beres) => {
        const p = PETA_KONSEP_A[r];
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
  { nomor: 1, render: (d) => <KartuPotongA {...d} /> },
  { nomor: 2, render: (d) => <KartuLipatA {...d} /> },
  { nomor: 3, render: (d) => <KartuTuangA {...d} /> },
  { nomor: 4, render: (d) => <KartuCariA {...d} /> },
];

const KARTU_PICTURE: KartuTahap[] = [
  { nomor: 5, render: (d) => <KartuWarnaiA {...d} /> },
  { nomor: 6, render: (d) => <KartuTarikA {...d} /> },
  { nomor: 7, render: (d) => <KartuCentangA {...d} /> },
];

const KARTU_ABSTRACT: KartuTahap[] = [
  { nomor: 8, render: (d) => <KartuKalimatA {...d} /> },
  { nomor: 9, render: (d) => <KartuBenarSalahA {...d} /> },
  { nomor: 10, render: (d) => <KartuPetaA {...d} /> },
];

export function ConcreteK2B5A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧸", nama: "CONCRETE", cara: "Potong, lipat, dan tuang!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B5A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan isi", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B5A(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan lambang", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_A5} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A ➡️" />}
    />
  );
}
