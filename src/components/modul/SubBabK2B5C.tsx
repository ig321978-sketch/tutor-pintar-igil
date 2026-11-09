"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { IsiTabel, PetaKonsepGame } from "./permainan-k2b3";
import { PasangTeks } from "./kumpulan-k2b5";
import { BelahApel, CentangSilang, LipatDuaKali, PilihPotongan, SusunPotongan, TarikGaris, WarnaiBagian } from "./potong-k2b5";
import { BENDA_POTONG, FIGURA_SEPEREMPAT_C, PETA_KONSEP_C, RONDE_BELAH_C, RONDE_LIPAT_C, RONDE_PASANG_C, RONDE_POTONG_C, RONDE_SUSUN_C, RONDE_TABEL_C, RONDE_TARIK_C, RONDE_WARNAI_C } from "./data-k2b5";
import { KartuK2B5 } from "./kartu-k2b5";
import { visualInfografisK2B5C } from "./infografis-k2b5";
import { SUB_C5 } from "./naskah-k2b5";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 5 Sub-Bab C: Seperempat dari Benda Utuh.                        */
/*  Concrete 1 Empat Potongan yang Adil  2 Lipat Dua Kali                     */
/*           3 Belah Apel Bertahap  4 Susun Kembali Potongan                  */
/*  Picture  5 Warnai Seperempat  6 Tarik Garis Jadi Empat  7 Centang/Silang  */
/*  Abstract 8 Kata dan Lambang  9 Isi Tabel Hubungan  10 Peta Konsep         */
/* Naskah: naskah-k2b5.ts (SUB_C5). Tanpa API.                                */
/* ------------------------------------------------------------------------ */

const J = SUB_C5.games.map((g) => g.title);

const SUARA_INFO =
  "Ini poster rangkuman seperempat dari benda utuh. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK2B5CKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_C5} judul="Seperempat dari Benda Utuh" suaraInfo={SUARA_INFO} visual={visualInfografisK2B5C()} speakGuru={speakGuru} />;
}

/* ------------------------------ Concrete ------------------------------ */

function KartuPotongC(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={0}
      judul={J[0]}
      id="k2b5c-potong"
      petunjuk="Lihat enam cara memotong. Ketuk semua potongan yang membagi benda menjadi empat bagian sama besar, lalu tekan Periksa. Bagian yang sama besar disebut seperempat."
      jumlahRonde={RONDE_POTONG_C.length}
      belumSiap="Pilih potongan yang adil dan tekan Periksa dulu, ya."
      isi={(r, beres) => (
        <>
          <IgilBicara pendek="Empat potongan adil" teks={`Ada enam cara memotong ${BENDA_POTONG[RONDE_POTONG_C[r].benda].nama.toLowerCase()}. Ketuk semua potongan yang membagi menjadi empat bagian sama besar. Lalu tekan Periksa.`} />
          <PilihPotongan ronde={RONDE_POTONG_C[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuLipatC(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={1}
      judul={J[1]}
      id="k2b5c-lipat"
      petunjuk="Lipat kertas dua kali. Pilih garis lipat pertama, lalu garis lipat kedua. Kalau semua lipatan menutup pas, kertas terbagi menjadi empat bagian sama besar."
      jumlahRonde={RONDE_LIPAT_C.length}
      belumSiap="Lipat sampai menjadi empat bagian sama besar dulu, ya."
      isi={(r, beres) => (
        <>
          <IgilBicara pendek={`Lipat ${RONDE_LIPAT_C[r].nama} dua kali`} teks={`Lipat ${RONDE_LIPAT_C[r].nama} dua kali. Pilih garis lipat pertama, lalu garis lipat kedua. Lipatan yang menutup pas diterima.`} />
          <LipatDuaKali ronde={RONDE_LIPAT_C[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuBelahC(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={2}
      judul={J[2]}
      id="k2b5c-belah"
      petunjuk="Belah benda utuh menjadi setengah, lalu belah setengahnya lagi menjadi seperempat. Jawab pertanyaan di setiap langkah."
      jumlahRonde={RONDE_BELAH_C.length}
      belumSiap="Belah sampai seperempat dan jawab dulu, ya."
      isi={(r, beres) => (
        <>
          <IgilBicara pendek={`Belah ${BENDA_POTONG[RONDE_BELAH_C[r]].nama.toLowerCase()}`} teks={`Belah ${BENDA_POTONG[RONDE_BELAH_C[r]].nama.toLowerCase()} menjadi dua sama besar. Lalu belah tiap bagian menjadi dua lagi. Setelah itu kita sebut nama bagiannya.`} />
          <BelahApel key={r} benda={RONDE_BELAH_C[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuSusunC(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={3}
      judul={J[3]}
      id="k2b5c-susun"
      petunjuk="Susun kembali potongan sampai jumlah bagiannya sama dengan yang diminta. Seret potongan ke tempatnya, atau ketuk potongan lalu ketuk tempatnya."
      jumlahRonde={RONDE_SUSUN_C.length}
      belumSiap="Susun potongan sesuai yang diminta dulu, ya."
      isi={(r, beres) => (
        <>
          <IgilBicara pendek={`Susun ${RONDE_SUSUN_C[r].kata}`} teks={`Susun potongan sampai membentuk ${RONDE_SUSUN_C[r].kata}. Seret potongan ke tempatnya, atau ketuk potongan lalu ketuk tempatnya.`} />
          <SusunPotongan key={r} benda={RONDE_SUSUN_C[r].benda} target={RONDE_SUSUN_C[r].target} kata={RONDE_SUSUN_C[r].kata} onBeres={beres} />
        </>
      )}
    />
  );
}

/* ------------------------------ Picture ------------------------------ */

function KartuWarnaiC(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={4}
      judul={J[4]}
      id="k2b5c-warnai"
      petunjuk="Ketuk bagian gambar untuk mewarnainya sampai tepat seperempat dari seluruh gambar. Ketuk lagi untuk menghapus warna. Lalu tekan Periksa."
      jumlahRonde={RONDE_WARNAI_C.length}
      belumSiap="Warnai tepat seperempat dan tekan Periksa dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanTempel pendek={RONDE_WARNAI_C[r].teks} teks={`${RONDE_WARNAI_C[r].teks} Ketuk bagian gambar untuk mewarnai. Kalau sudah tepat, tekan Periksa.`} />
          <WarnaiBagian ronde={RONDE_WARNAI_C[r]} warna="#16A34A" onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuTarikC(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={5}
      judul={J[5]}
      id="k2b5c-tarik"
      petunjuk="Ketuk dua titik untuk tiap garis. Tarik paling banyak dua garis sehingga bangun terbagi menjadi empat bagian sama besar. Lalu warnai satu bagian."
      jumlahRonde={RONDE_TARIK_C.length}
      belumSiap="Tarik garis yang membagi empat sama besar dan warnai satu bagian dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanTempel pendek="Tarik dua garis" teks="Ketuk dua titik pada tepi bangun untuk menarik satu garis. Tarik dua garis sehingga ada empat bagian sama besar. Lalu ketuk satu bagian untuk mewarnainya." />
          <TarikGaris key={r} bentuk={RONDE_TARIK_C[r]} target={4} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuCentangC(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={6}
      judul={J[6]}
      id="k2b5c-centang"
      petunjuk="Taruh setiap gambar ke kolom Seperempat atau Bukan Seperempat. Seperempat berarti bagian berwarna tepat satu dari empat bagian sama besar."
      jumlahRonde={1}
      belumSiap="Kelompokkan semua gambar dulu, ya."
      isi={(_r, beres) => (
        <>
          <CatatanTempel pendek="Seperempat atau bukan" teks="Lihat bagian yang berwarna. Seret tiap gambar ke kolom Seperempat atau Bukan Seperempat, atau ketuk gambarnya lalu ketuk kolomnya." />
          <CentangSilang figura={FIGURA_SEPEREMPAT_C} target="seperempat" onBeres={beres} />
        </>
      )}
    />
  );
}

/* ------------------------------ Abstract ------------------------------ */

function KartuPasangC(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={7}
      judul={J[7]}
      id="k2b5c-pasang"
      petunjuk="Ketuk kartu di kiri, lalu ketuk kartu yang cocok di kanan. Pasangkan kata dengan lambangnya, dan lambang dengan artinya."
      jumlahRonde={RONDE_PASANG_C.length}
      belumSiap="Hubungkan semua kartu dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanPensil pendek="Kata dan lambang" teks="Ketuk kartu di kiri, lalu ketuk kartu yang cocok di kanan. Setengah ditulis dengan lambang setengah. Seperempat ditulis dengan lambang seperempat." />
          <PasangTeks key={r} pasang={RONDE_PASANG_C[r]} onBeres={beres} pesanBeres="Semua kartu sudah terhubung dengan pasangannya." />
        </>
      )}
    />
  );
}

function KartuTabelC(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={8}
      judul={J[8]}
      id="k2b5c-tabel"
      petunjuk="Ketuk baris tabel, lalu ketuk kartu jawaban yang tepat. Hubungan utuh, setengah, dan seperempat: satu utuh sama dengan dua setengah, dan sama dengan empat seperempat."
      jumlahRonde={RONDE_TABEL_C.length}
      belumSiap="Isi semua baris tabel dulu, ya."
      isi={(r, beres) => {
        const t = RONDE_TABEL_C[r];
        return (
          <>
            <CatatanPensil pendek={t.judul} teks={`${t.judul}. Ketuk baris tabel, lalu ketuk kartu jawaban yang tepat. Satu utuh sama dengan dua setengah dan sama dengan empat seperempat.`} />
            <IsiTabel
              key={r}
              kepala={t.kepala}
              baris={t.baris}
              kartu={t.kartu}
              petunjuk={(b) => `Ingat: satu utuh sama dengan dua setengah, dan sama dengan empat seperempat. Jawaban baris ini ${b.jawab}.`}
              onBeres={beres}
              pesanBeres="Tabel sudah lengkap. Satu utuh sama dengan dua setengah dan empat seperempat."
            />
          </>
        );
      }}
    />
  );
}

function KartuPetaC(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={9}
      judul={J[9]}
      id="k2b5c-peta"
      petunjuk="Lengkapi peta konsep seperempat. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat."
      jumlahRonde={PETA_KONSEP_C.length}
      belumSiap="Lengkapi peta konsepnya dulu, ya."
      isi={(r, beres) => {
        const p = PETA_KONSEP_C[r];
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
  { nomor: 1, render: (d) => <KartuPotongC {...d} /> },
  { nomor: 2, render: (d) => <KartuLipatC {...d} /> },
  { nomor: 3, render: (d) => <KartuBelahC {...d} /> },
  { nomor: 4, render: (d) => <KartuSusunC {...d} /> },
];

const KARTU_PICTURE: KartuTahap[] = [
  { nomor: 5, render: (d) => <KartuWarnaiC {...d} /> },
  { nomor: 6, render: (d) => <KartuTarikC {...d} /> },
  { nomor: 7, render: (d) => <KartuCentangC {...d} /> },
];

const KARTU_ABSTRACT: KartuTahap[] = [
  { nomor: 8, render: (d) => <KartuPasangC {...d} /> },
  { nomor: 9, render: (d) => <KartuTabelC {...d} /> },
  { nomor: 10, render: (d) => <KartuPetaC {...d} /> },
];

export function ConcreteK2B5C(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧸", nama: "CONCRETE", cara: "Potong, lipat, dan susun!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B5C(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan isi", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B5C(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan lambang", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_C5} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB C ➡️" />}
    />
  );
}
