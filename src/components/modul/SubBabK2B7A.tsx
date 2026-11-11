"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KartuK2B5 } from "./kartu-k2b5";
import { GarisAngkaGame, KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { PapanDigit, TabelSeratus, TebakHitung, TulisAngka } from "./mesin-k2b7";
import { IkatSepuluh, IsiBungkus, RakitBilangan } from "./konkret-k2b7";
import { Koleksi, KoleksiDari, LepasBanyak, LepasKelompok } from "./dasar-k2b7";
import { BaganPasangan, ModelBilangan, ModelDari, TitikKelompok, TitikSebar } from "./diagram-k2b7";
import {
  BENDA_INFO, Kapital, PETA_KONSEP_A, RONDE_BATANG_PA, RONDE_BENARSALAH_QA, RONDE_BOND_PA, RONDE_BUNGKUS_A, RONDE_CARIMODEL_PA, RONDE_DETEKTIF_QA, RONDE_GARISPULUHAN_PA, RONDE_HITUNGBUNGKUS_A,
  RONDE_IKAT_A, RONDE_ISIPAPAN_PA, RONDE_JODOHBUNGKUS_A, RONDE_JODOHKATA_QA, RONDE_JODOHMODEL_PA, RONDE_KALIMAT_QA, RONDE_KANTONG_A, RONDE_KETUKSEMUA_QA, RONDE_MEMORI_A, RONDE_NAMA_QA,
  RONDE_PILAH_A, RONDE_PILAHMODEL_PA, RONDE_RAKIT_A, RONDE_SUSUN_QA, RONDE_TABEL_QA, RONDE_TABELSERATUS_PA, RONDE_TEBAKTITIK_PA, RONDE_TEBAK_A, RONDE_URUTANGKA_QA, RONDE_URUTBANYAK_A, RONDE_URUTMODEL_PA,
  hasilLoncat, kalimatIsianPS, kataPS, opsiBilangan, opsiPuluhan, puluhan, teksKlue, terbilang, urutBilangan, urutTampil, urutanTetap,
  type BendaId,
} from "./data-k2b7";
import { visualInfografisK2B7A } from "./infografis-k2b7";
import { SUB_A7 } from "./naskah-k2b7";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 7 Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan sampai   */
/* 100. Tiga puluh permainan, sepuluh per tahap.                                */
/*  Concrete 1 Isi Bungkus  2 Hitung Bungkus  3 Jodohkan  4 Rakit Bilangan      */
/*           5 Ikat Sepuluh  6 Tebak dan Hitung  7 Memori  8 Urutkan Banyak       */
/*           9 Pilah  10 Kantong Misterius                                       */
/*  Picture  11 Hitung Batang  12 Cari Model  13 Isi Papan  14 Jodohkan Model    */
/*           15 Pasangan Bilangan  16 Garis Puluhan  17 Tabel Seratus            */
/*           18 Urutkan Model  19 Pilah Model  20 Tebak Titik                    */
/*  Abstract 21 Jodohkan Kata  22 Kalimat  23 Susun Kata  24 Tabel  25 Benar Salah */
/*           26 Lambang dari Nama  27 Detektif  28 Peta  29 Urutkan  30 Ketuk Semua */
/* Naskah: naskah-k2b7.ts (SUB_A7). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_A7.games.map((g) => g.title);
const TOTAL = 10;
const HURUF = ["A", "B", "C", "D", "E", "F"];

const SUARA_INFO =
  "Ini poster rangkuman tentang menghitung, membaca, dan menulis bilangan sampai seratus. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK2B7AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A7} judul="Bilangan sampai 100" suaraInfo={SUARA_INFO} visual={visualInfografisK2B7A()} speakGuru={speakGuru} />;
}

type FnIsi = (ronde: number, beres: () => void) => React.ReactNode;

function Kartu(d: PropsLangkah, idx: number, id: string, petunjuk: string, jumlahRonde: number, belumSiap: string, isi: FnIsi) {
  return <KartuK2B5 d={d} indeks={idx} judul={J[idx]} id={id} petunjuk={petunjuk} jumlahRonde={jumlahRonde} belumSiap={belumSiap} total={TOTAL} isi={isi} />;
}

const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const BENDA_RONDE: BendaId[] = ["kue", "kelereng", "rambutan"];

/* ------------------------------ Concrete ------------------------------ */

function KartuBungkusA(d: PropsLangkah) {
  return Kartu(d, 0, "k2b7a-bungkus", "Tekan plus untuk memasukkan benda satu per satu. Berhenti saat wadah berisi sepuluh. Sepuluh satuan sama dengan satu puluhan.", RONDE_BUNGKUS_A.length, "Isi semua wadahnya sampai penuh dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Isi bungkus sepuluh" teks="Masukkan benda ke dalam wadah satu per satu sampai berisi sepuluh. Sepuluh satuan sama dengan satu puluhan." />
      <IsiBungkus key={r} benda={RONDE_BUNGKUS_A[r]} onBeres={beres} pesanBeres="Wadahnya sudah penuh." />
    </>
  ));
}

const soalHitungBungkusA = (r: number): SoalBertahap[] =>
  RONDE_HITUNGBUNGKUS_A[r].map((t, i) => {
    const jml = t.n * 10;
    const o = opsiPuluhan(jml, r * 2 + i);
    const info = BENDA_INFO[t.benda];
    return {
      visual: <Koleksi p={t.n} s={0} benda={t.benda} ukuran={58} />,
      tanya: `Ada berapa ${info.nama} seluruhnya?`,
      opsi: o.map(String),
      jawab: o.indexOf(jml),
      petunjuk: `Satu ${info.wadah} berisi sepuluh. Hitung ${info.wadah}nya, lalu hitung sepuluh-sepuluh.`,
      pesan: `${t.n} puluhan sama dengan ${jml}, dibaca ${terbilang(jml)}.`,
      angka: true,
    };
  });

function KartuHitungBungkusA(d: PropsLangkah) {
  return Kartu(d, 1, "k2b7a-hitungbungkus", "Satu wadah berisi sepuluh. Hitung wadahnya, lalu hitung sepuluh-sepuluh. Pilih banyak benda seluruhnya.", RONDE_HITUNGBUNGKUS_A.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung bungkus" teks="Setiap wadah berisi sepuluh. Hitung wadahnya, lalu hitung sepuluh-sepuluh untuk mencari banyak benda seluruhnya." />
      <PilihBertahap key={r} soal={soalHitungBungkusA(r)} onBeres={beres} pesanBeres="Semua wadah sudah kamu hitung dengan benar." />
    </>
  ));
}

function KartuJodohBungkusA(d: PropsLangkah) {
  return Kartu(d, 2, "k2b7a-jodohbungkus", "Ketuk satu gambar di kiri, lalu ketuk bilangan yang sama dengan banyak kuenya di kanan.", RONDE_JODOHBUNGKUS_A.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOHBUNGKUS_A[r];
    const kanan = ro.map((n) => ({ id: `n${n}`, label: String(n * 10), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan bungkus dan bilangan" teks="Setiap bungkus berisi sepuluh kue cubit. Hitung bungkusnya, lalu jodohkan dengan bilangan yang menunjukkan banyak kuenya." />
        <PasangKartu
          key={r}
          kiri={ro.map((n, i) => ({ id: `n${n}`, label: `Tumpukan ${HURUF[i]}`, isi: <Koleksi p={n} s={0} benda="kue" ukuran={50} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((n) => [`n${n}`, `n${n}`]))}
          petunjuk={() => "Belum cocok. Hitung bungkusnya, lalu hitung sepuluh-sepuluh."}
          onBeres={beres}
          pesanBeres="Semua bungkus sudah cocok dengan bilangannya."
        />
      </>
    );
  });
}

function KartuRakitA(d: PropsLangkah) {
  return Kartu(d, 3, "k2b7a-rakit", "Tambahkan wadah penuh (puluhan) dan benda lepas (satuan) sampai banyaknya sama dengan bilangan yang diminta.", RONDE_RAKIT_A.length, "Rakit semua bilangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Rakit bilangan" teks="Rakit bilangan yang diminta. Tambahkan wadah penuh untuk puluhan dan benda lepas untuk satuan." />
      <RakitBilangan key={r} benda={RONDE_RAKIT_A[r].benda} target={RONDE_RAKIT_A[r].n} onBeres={beres} pesanBeres="Bilangannya sudah pas." />
    </>
  ));
}

function KartuIkatA(d: PropsLangkah) {
  return Kartu(d, 4, "k2b7a-ikat", "Tekan Ikat sepuluh sampai tidak bisa lagi. Lalu pilih banyak benda seluruhnya.", RONDE_IKAT_A.length, "Ikat dan hitung semuanya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Ikat sepuluh" teks="Benda-benda ini berserakan. Ikat setiap sepuluh menjadi satu kelompok, lalu hitung semuanya." />
      <IkatSepuluh key={r} benda={RONDE_IKAT_A[r].benda} n={RONDE_IKAT_A[r].n} nomor={r} onBeres={beres} pesanBeres="Semua benda sudah kamu hitung." />
    </>
  ));
}

function KartuTebakA(d: PropsLangkah) {
  return Kartu(d, 5, "k2b7a-tebak", "Tebak dulu kira-kira ada berapa. Lalu benda dikelompokkan sepuluh-sepuluh, dan kamu memilih banyak yang sebenarnya.", RONDE_TEBAK_A.length, "Tebak dan hitung semuanya dulu, ya.", (r, beres) => {
    const t = RONDE_TEBAK_A[r];
    return (
      <>
        <IgilBicara pendek="Tebak dan hitung" teks="Tebak dulu kira-kira ada berapa benda. Tidak apa-apa kalau tebakanmu belum tepat. Lalu kita hitung dengan kelompok sepuluh." />
        <TebakHitung key={r} n={t.n} nama={BENDA_INFO[t.benda].nama} nomor={r} sebar={<LepasBanyak n={t.n} benda={t.benda} ukuran={t.n > 60 ? 18 : 22} />} kelompok={<LepasKelompok n={t.n} benda={t.benda} ukuran={t.n > 60 ? 15 : 17} />} onBeres={beres} pesanBeres="Tebakan dan hitunganmu sudah selesai." />
      </>
    );
  });
}

function KartuMemoriA(d: PropsLangkah) {
  return Kartu(d, 6, "k2b7a-memori", "Balik dua kartu. Cari kumpulan benda dan lambang bilangan yang banyaknya sama.", RONDE_MEMORI_A.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori banyak benda" teks="Balik dua kartu. Cari kartu kumpulan benda dan kartu bilangan yang banyaknya sama." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_A[r].map((n, i) => ({
          id: String(n),
          a: <KoleksiDari n={n} benda={BENDA_RONDE[r]} ukuran={34} />,
          labelA: `kumpulan ${HURUF[i]}`,
          b: <span className="text-4xl font-black text-[#1C01A5]">{n}</span>,
          labelB: `bilangan ${n}`,
        }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuUrutBanyakA(d: PropsLangkah) {
  return Kartu(d, 7, "k2b7a-urutbanyak", "Hitung banyak benda di tiap keranjang. Ketuk keranjang satu per satu menurut urutan banyaknya.", RONDE_URUTBANYAK_A.length, "Urutkan semua keranjangnya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUTBANYAK_A[r];
    const kunci = urutBilangan(ro.angka, ro.dari).map(String);
    const awal = ro.dari === "kecil" ? "paling sedikit" : "paling banyak";
    const akhir = ro.dari === "kecil" ? "paling banyak" : "paling sedikit";
    return (
      <>
        <IgilBicara pendek={`Urutkan dari ${awal}`} teks={`Hitung banyak benda di tiap keranjang. Ketuk keranjang dari yang ${awal} sampai yang ${akhir}.`} />
        <UrutKetuk
          key={r}
          item={urutTampil(ro.angka.map(String), kunci, r).map((x) => ({ id: x, label: `Keranjang ${HURUF[ro.angka.indexOf(Number(x))]}`, isi: <KoleksiDari n={Number(x)} benda={BENDA_RONDE[r]} ukuran={34} /> }))}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={akhir}
          petunjuk={(i) => `Belum, bukan ${i.label}. Hitung puluhannya dulu: puluhan yang lebih ${ro.dari === "kecil" ? "sedikit" : "banyak"} lebih dulu.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

function KartuPilahA(d: PropsLangkah) {
  return Kartu(d, 8, "k2b7a-pilah", "Hitung puluhan tiap kumpulan. Seret atau ketuk kumpulan ke kotak kurang dari 50 atau lebih dari 50.", RONDE_PILAH_A.length, "Pilah semua kumpulannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Kurang atau lebih dari 50" teks="Hitung puluhannya. Kurang dari lima puluhan berarti kurang dari lima puluh. Pilah setiap kumpulan ke kotak yang tepat." />
      <Sortir
        key={r}
        lebarItem={108}
        item={urutanKe(RONDE_PILAH_A[r].length, r).map((i) => {
          const n = RONDE_PILAH_A[r][i];
          return {
            id: String(n),
            label: `Kumpulan ${HURUF[i]}`,
            isi: <KoleksiDari n={n} benda={BENDA_RONDE[r]} ukuran={36} />,
            bin: n < 50 ? "kurang" : "lebih",
            petunjuk: `Belum tepat. Kumpulan ini ada ${kataPS(n)}, yaitu ${n}. Bandingkan dengan lima puluh.`,
            ucapan: `${kataPS(n)}, yaitu ${n}, ${n < 50 ? "kurang dari" : "lebih dari"} lima puluh.`,
          };
        })}
        bin={[
          { id: "kurang", label: "Kurang dari 50", warna: "#BAE6FD", ikon: "⬇️" },
          { id: "lebih", label: "Lebih dari 50", warna: "#FDE68A", ikon: "⬆️" },
        ]}
        onBeres={beres}
        pesanBeres="Semua kumpulan sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuKantongA(d: PropsLangkah) {
  return Kartu(d, 9, "k2b7a-kantong", "Baca bilangan di pertanyaan. Ketuk kumpulan benda yang banyaknya sama dengan bilangan itu.", RONDE_KANTONG_A.length, "Temukan semua kumpulannya dulu, ya.", (r, beres) => {
    const benda: BendaId = (["kelereng", "rambutan", "kue"] as BendaId[])[r];
    const info = BENDA_INFO[benda];
    const soal = RONDE_KANTONG_A[r].map((s) => ({
      tanya: `Ketuk kumpulan yang berisi ${s.target} ${info.nama}.`,
      jawab: String(s.target),
      petunjuk: "Belum tepat. Hitung puluhan dan satuannya. Hati-hati dengan angka yang tertukar.",
      pesan: `Benar, ${kataPS(s.target)} sama dengan ${s.target}.`,
      item: s.item.map((x, i) => ({ id: String(x), label: `Kumpulan ${HURUF[i]}`, isi: <KoleksiDari n={x} benda={benda} ukuran={38} /> })),
    }));
    return (
      <>
        <IgilBicara pendek="Kantong misterius" teks="Baca bilangannya, lalu cari kumpulan benda yang banyaknya sama dengan bilangan itu." />
        <KetukPilih key={r} item={soal[0].item} kolom={2} soal={soal} onBeres={beres} pesanBeres="Semua kumpulan sudah kamu temukan." />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

const soalBatangPA = (r: number) =>
  RONDE_BATANG_PA[r].map((n) => ({
    visual: <ModelBilangan p={n} s={0} skala={n > 8 ? 0.85 : 1} />,
    tanya: "Ada berapa puluhan?",
    jawab: n,
    min: 0,
    max: 10,
    label: "puluhan",
    petunjuk: "Hitung batangnya satu per satu. Satu batang adalah satu puluhan.",
    pesan: `${n} batang sama dengan ${n} puluhan, yaitu ${n * 10}.`,
  }));

function KartuBatangA(d: PropsLangkah) {
  return Kartu(d, 10, "k2b7a-batang", "Setiap batang berisi sepuluh kotak, jadi satu batang adalah satu puluhan. Hitung batangnya, lalu atur penghitung.", RONDE_BATANG_PA.length, "Hitung semua batangnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Hitung batang puluhan" teks="Setiap batang berisi sepuluh kotak, jadi satu batang adalah satu puluhan. Hitung batangnya, lalu atur penghitung." />
      <TulisAngka key={r} soal={soalBatangPA(r)} onBeres={beres} pesanBeres="Semua batang sudah kamu hitung." />
    </>
  ));
}

function KartuCariModelA(d: PropsLangkah) {
  return Kartu(d, 11, "k2b7a-carimodel", "Baca bilangan di pertanyaan. Hitung batang puluhan dan kotak satuan, lalu ketuk model yang sama dengan bilangan itu.", RONDE_CARIMODEL_PA.length, "Temukan semua modelnya dulu, ya.", (r, beres) => {
    const soal = RONDE_CARIMODEL_PA[r].map((s) => ({
      tanya: `Ketuk model yang sama dengan ${s.target}.`,
      jawab: String(s.target),
      petunjuk: "Belum tepat. Batang adalah puluhan dan kotak lepas adalah satuan. Hati-hati dengan angka yang tertukar.",
      pesan: `Benar, ${kataPS(s.target)} sama dengan ${s.target}.`,
      item: s.item.map((x, i) => ({ id: String(x), label: `Model ${HURUF[i]}`, isi: <ModelDari n={x} skala={0.62} /> })),
    }));
    return (
      <>
        <CatatanTempel pendek="Cari model bilangan" teks="Baca bilangannya. Hitung batang puluhan dan kotak satuan pada tiap model, lalu ketuk model yang sama." />
        <KetukPilih key={r} item={soal[0].item} kolom={2} soal={soal} onBeres={beres} pesanBeres="Semua model sudah kamu temukan." />
      </>
    );
  });
}

function KartuIsiPapanA(d: PropsLangkah) {
  return Kartu(d, 12, "k2b7a-isipapan", "Hitung batang puluhan dan kotak satuan. Atur angka puluhan dan angka satuan pada papan, lalu tekan Periksa.", RONDE_ISIPAPAN_PA.length, "Isi semua papannya dulu, ya.", (r, beres) => {
    const n = RONDE_ISIPAPAN_PA[r];
    return (
      <>
        <CatatanTempel pendek="Isi papan nilai tempat" teks="Hitung batang puluhan dan kotak satuan. Atur angka puluhan dan angka satuan pada papan." />
        <PapanDigit key={r} soal={[{ visual: <ModelDari n={n} />, tanya: "Tulis bilangannya pada papan nilai tempat.", jawab: n, petunjuk: "Belum tepat. Batang adalah puluhan, kotak lepas adalah satuan. Angka puluhan di kiri.", pesan: `${kataPS(n)} sama dengan ${n}.` }]} onBeres={beres} pesanBeres="Papan sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuJodohModelA(d: PropsLangkah) {
  return Kartu(d, 13, "k2b7a-jodohmodel", "Ketuk satu model di kiri, lalu ketuk bilangan yang sama di kanan.", RONDE_JODOHMODEL_PA.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOHMODEL_PA[r];
    const kanan = ro.map((n) => ({ id: `n${n}`, label: String(n), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan model dan bilangan" teks="Hitung batang puluhan dan kotak satuan pada tiap model. Jodohkan dengan bilangan yang sama." />
        <PasangKartu
          key={r}
          kiri={ro.map((n, i) => ({ id: `n${n}`, label: `Model ${HURUF[i]}`, isi: <ModelDari n={n} skala={0.55} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((n) => [`n${n}`, `n${n}`]))}
          petunjuk={() => "Belum cocok. Hitung batangnya sebagai puluhan, lalu kotak lepas sebagai satuan."}
          onBeres={beres}
          pesanBeres="Semua model sudah cocok dengan bilangannya."
        />
      </>
    );
  });
}

const soalBondPA = (r: number): SoalBertahap[] =>
  RONDE_BOND_PA[r].map((s, i) => {
    const jawab = s.a === null ? s.total - (s.b as number) : s.total - (s.a as number);
    const o = opsiBilangan(jawab, r * 2 + i);
    return {
      visual: <BaganPasangan total={s.total} a={s.a} b={s.b} />,
      tanya: `Bilangan ${s.total} terdiri dari dua bagian. Bagian yang hilang adalah...`,
      opsi: o.map(String),
      jawab: o.indexOf(jawab),
      petunjuk: "Belum tepat. Jumlah kedua bagian harus sama dengan bilangan di atas.",
      pesan: `${s.a ?? jawab} dan ${s.b ?? jawab} adalah pasangan bilangan ${s.total}.`,
      angka: true,
    };
  });

function KartuBondA(d: PropsLangkah) {
  return Kartu(d, 14, "k2b7a-bond", "Bilangan di atas terdiri dari dua bagian di bawah. Cari bagian yang hilang.", RONDE_BOND_PA.length, "Lengkapi semua bagannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pasangan bilangan" teks="Bilangan di atas terdiri dari dua bagian di bawah. Cari bagian yang hilang, supaya jumlah kedua bagian sama dengan bilangan di atas." />
      <PilihBertahap key={r} soal={soalBondPA(r)} onBeres={beres} pesanBeres="Semua bagan sudah lengkap." />
    </>
  ));
}

function KartuGarisPuluhanA(d: PropsLangkah) {
  return Kartu(d, 15, "k2b7a-garispuluhan", "Mulai dari bilangan yang disebut, lompat sepuluh-sepuluh. Ketuk bilangan tempat mendarat pada garis.", RONDE_GARISPULUHAN_PA.length, "Selesaikan semua lompatannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Garis puluhan" teks="Mulai dari bilangan yang disebut, lalu lompat sepuluh-sepuluh. Ketuk bilangan tempat mendarat pada garis." />
      <GarisAngkaGame
        key={r}
        soal={RONDE_GARISPULUHAN_PA[r].map((s) => ({
          tanya: `Mulai dari ${s.mulai}, lompat ${s.loncat} puluhan. Di bilangan berapa kamu mendarat?`,
          dari: 0,
          sampai: 100,
          langkah: 10,
          jawab: hasilLoncat(s),
          petunjuk: `Setiap lompatan sepuluh. Lompat ${s.loncat} kali dari ${s.mulai}.`,
          pesan: `${s.mulai} lompat ${s.loncat} puluhan mendarat di ${hasilLoncat(s)}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua lompatan sudah kamu selesaikan."
      />
    </>
  ));
}

function KartuTabelSeratusA(d: PropsLangkah) {
  return Kartu(d, 16, "k2b7a-tabelseratus", "Isi kotak yang menyala pada tabel bilangan. Lihat bilangan di kiri dan kanannya.", RONDE_TABELSERATUS_PA.length, "Lengkapi semua tabelnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Lengkapi tabel seratus" teks="Isi kotak yang menyala pada tabel bilangan lima puluh satu sampai seratus. Lihat bilangan di kiri dan di kanannya." />
      <TabelSeratus key={r} tersembunyi={RONDE_TABELSERATUS_PA[r]} nomorAwal={r * 3} onBeres={beres} pesanBeres="Tabel sudah lengkap." />
    </>
  ));
}

function KartuUrutModelA(d: PropsLangkah) {
  return Kartu(d, 17, "k2b7a-urutmodel", "Hitung puluhan dan satuan tiap model. Ketuk model satu per satu menurut urutan banyaknya.", RONDE_URUTMODEL_PA.length, "Urutkan semua modelnya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUTMODEL_PA[r];
    const kunci = urutBilangan(ro.angka, ro.dari).map(String);
    const awal = ro.dari === "kecil" ? "terkecil" : "terbesar";
    const akhir = ro.dari === "kecil" ? "terbesar" : "terkecil";
    return (
      <>
        <CatatanTempel pendek={`Urutkan dari yang ${awal}`} teks={`Hitung puluhan dan satuan tiap model. Ketuk model dari yang ${awal} sampai yang ${akhir}.`} />
        <UrutKetuk
          key={r}
          item={urutTampil(ro.angka.map(String), kunci, r).map((x) => ({ id: x, label: `Model ${HURUF[ro.angka.indexOf(Number(x))]}`, isi: <ModelDari n={Number(x)} skala={0.5} /> }))}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={akhir}
          petunjuk={(i) => `Belum, bukan ${i.label}. Bandingkan banyak batang puluhan dulu.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

function KartuPilahModelA(d: PropsLangkah) {
  return Kartu(d, 18, "k2b7a-pilahmodel", "Hitung batang puluhan tiap model. Seret atau ketuk model ke kotak dengan banyak puluhan yang sama.", RONDE_PILAHMODEL_PA.length, "Pilah semua modelnya dulu, ya.", (r, beres) => {
    const ro = RONDE_PILAHMODEL_PA[r];
    const warna = ["#BAE6FD", "#FDE68A", "#FBCFE8"];
    return (
      <>
        <CatatanTempel pendek="Pilah model menurut puluhan" teks="Hitung batang puluhan tiap model. Pilah model ke kotak dengan banyak puluhan yang sama." />
        <Sortir
          key={r}
          lebarItem={104}
          kolomBin={3}
          item={urutanKe(ro.angka.length, r).map((i) => {
            const n = ro.angka[i];
            return { id: String(n), label: `Model ${HURUF[i]}`, isi: <ModelDari n={n} skala={0.5} />, bin: `p${puluhan(n)}`, petunjuk: `Belum tepat. Model ini punya ${puluhan(n)} batang puluhan.`, ucapan: `${kataPS(n)}, yaitu ${n}.` };
          })}
          bin={ro.puluhan.map((p, i) => ({ id: `p${p}`, label: `${p} puluhan`, warna: warna[i] }))}
          onBeres={beres}
          pesanBeres="Semua model sudah masuk kotak yang tepat."
        />
      </>
    );
  });
}

function KartuTebakTitikA(d: PropsLangkah) {
  return Kartu(d, 19, "k2b7a-tebaktitik", "Tebak dulu kira-kira ada berapa titik. Lalu titik dikelompokkan sepuluh-sepuluh, dan kamu memilih banyak yang sebenarnya.", RONDE_TEBAKTITIK_PA.length, "Tebak dan hitung semuanya dulu, ya.", (r, beres) => {
    const n = RONDE_TEBAKTITIK_PA[r];
    return (
      <>
        <CatatanTempel pendek="Tebak banyak titik" teks="Tebak dulu kira-kira ada berapa titik. Lalu titik dikelompokkan sepuluh-sepuluh dan kita hitung." />
        <TebakHitung key={r} n={n} nama="titik" nomor={r} sebar={<TitikSebar n={n} />} kelompok={<TitikKelompok n={n} />} onBeres={beres} pesanBeres="Tebakan dan hitunganmu sudah selesai." />
      </>
    );
  });
}

/* ------------------------------ Abstract ------------------------------ */

function KartuJodohKataA(d: PropsLangkah) {
  return Kartu(d, 20, "k2b7a-jodohkata", "Ketuk satu kalimat puluhan dan satuan di kiri, lalu ketuk lambang bilangan yang sama di kanan.", RONDE_JODOHKATA_QA.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOHKATA_QA[r];
    const kanan = ro.map((n) => ({ id: `n${n}`, label: String(n), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan puluhan, satuan, dan bilangan" teks="Baca kalimat puluhan dan satuan. Jodohkan dengan lambang bilangan yang sama." />
        <PasangKartu
          key={r}
          kiri={ro.map((n) => ({ id: `n${n}`, label: kataPS(n), isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((n) => [`n${n}`, `n${n}`]))}
          petunjuk={() => "Belum cocok. Angka puluhan ditulis di kiri, dan angka satuan di kanan."}
          onBeres={beres}
          pesanBeres="Semua kalimat sudah cocok dengan bilangannya."
        />
      </>
    );
  });
}

function KartuKalimatA(d: PropsLangkah) {
  return Kartu(d, 21, "k2b7a-kalimat", "Lengkapi tiap kalimat dengan bilangan yang tepat. Hati-hati dengan angka yang tertukar.", RONDE_KALIMAT_QA.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Lengkapi kalimat puluhan dan satuan" teks="Baca kalimat. Pilih bilangan yang tepat untuk bagian kosong. Hati-hati dengan angka yang tertukar." />
      <IsiKalimatGame key={r} kalimat={RONDE_KALIMAT_QA[r].map((n, i) => kalimatIsianPS(n, r * 3 + i))} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
    </>
  ));
}

function KartuSusunA(d: PropsLangkah) {
  return Kartu(d, 22, "k2b7a-susun", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUN_QA.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun nama dan kalimat bilangan" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUN_QA[r].kata} pengecoh={RONDE_SUSUN_QA[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

function KartuTabelA(d: PropsLangkah) {
  return Kartu(d, 23, "k2b7a-tabel", "Ketuk baris tabel, lalu ketuk kartu puluhan dan satuan yang tepat untuk bilangan itu.", RONDE_TABEL_QA.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_QA[r];
    return (
      <>
        <CatatanPensil pendek="Isi tabel puluhan dan satuan" teks="Ketuk baris tabel, lalu ketuk kartu puluhan dan satuan yang tepat untuk bilangan itu." />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Bilangan ${b.label}: angka di kiri adalah puluhan dan angka di kanan adalah satuan.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuBenarSalahA(d: PropsLangkah) {
  return Kartu(d, 24, "k2b7a-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QA.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QA[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

const soalNamaQA = (r: number): SoalBertahap[] =>
  RONDE_NAMA_QA[r].map((n, i) => {
    const o = opsiBilangan(n, r * 2 + i);
    return {
      tanya: `Lambang bilangan dari "${terbilang(n)}" adalah...`,
      opsi: o.map(String),
      jawab: o.indexOf(n),
      petunjuk: "Belum tepat. Tulis puluhannya dulu di kiri, lalu satuannya di kanan.",
      pesan: `${Kapital(terbilang(n))} ditulis ${n}.`,
      angka: true,
    };
  });

function KartuNamaA(d: PropsLangkah) {
  return Kartu(d, 25, "k2b7a-nama", "Baca nama bilangan, lalu pilih lambang bilangan yang sesuai. Ingat, puluhan di kiri dan satuan di kanan.", RONDE_NAMA_QA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Tulis lambang dari nama" teks="Baca nama bilangan, lalu pilih lambang bilangan yang sesuai. Puluhan di kiri dan satuan di kanan." />
      <PilihBertahap key={r} soal={soalNamaQA(r)} onBeres={beres} pesanBeres="Semua lambang bilangan sudah benar." />
    </>
  ));
}

function KartuDetektifA(d: PropsLangkah) {
  return Kartu(d, 26, "k2b7a-detektif", "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", RONDE_DETEKTIF_QA.length, "Tebak dulu aku bilangan apa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QA[r];
    return (
      <>
        <CatatanPensil pendek="Detektif bilangan" teks="Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya." />
        <DetektifTeks
          key={r}
          soal={{
            petunjuk: s.klue.map(teksKlue),
            opsi: s.opsi.map(String),
            jawab: s.opsi.indexOf(s.jawab),
            salah: `Periksa tiap petunjuk satu per satu. Hanya ${s.jawab} yang cocok dengan semuanya.`,
          }}
          onBeres={beres}
          pesanBeres={(nama) => `Benar, aku bilangan ${nama}.`}
        />
      </>
    );
  });
}

function KartuPetaKonsepA(d: PropsLangkah) {
  return Kartu(d, 27, "k2b7a-konsep", "Lengkapi peta konsep bilangan. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_A.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_A[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuUrutAngkaA(d: PropsLangkah) {
  return Kartu(d, 28, "k2b7a-urutangka", "Ketuk bilangan satu per satu menurut urutan. Bandingkan puluhannya dulu.", RONDE_URUTANGKA_QA.length, "Urutkan semua bilangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUTANGKA_QA[r];
    const kunci = urutBilangan(ro.angka, ro.dari).map(String);
    const awal = ro.dari === "kecil" ? "paling kecil" : "paling besar";
    const akhir = ro.dari === "kecil" ? "paling besar" : "paling kecil";
    return (
      <>
        <CatatanPensil pendek={`Urutkan dari ${awal}`} teks={`Ketuk bilangan dari yang ${awal} sampai yang ${akhir}. Bandingkan puluhannya dulu.`} />
        <UrutKetuk
          key={r}
          item={urutTampil(ro.angka.map(String), kunci, r).map((x) => ({ id: x, label: x }))}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={akhir}
          petunjuk={(i) => `Belum, bukan ${i.label}. Bandingkan banyak puluhan dulu.`}
          onBeres={beres}
          pesanBeres="Urutannya sudah benar."
        />
      </>
    );
  });
}

function KartuSemuaA(d: PropsLangkah) {
  return Kartu(d, 29, "k2b7a-semua", "Ketuk semua bilangan yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_KETUKSEMUA_QA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const s = RONDE_KETUKSEMUA_QA[r];
    return (
      <>
        <CatatanPensil pendek="Ketuk semua yang cocok" teks={`${s.tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={s.tanya}
          item={s.angka.map((n) => ({ id: String(n), label: String(n), benar: s.ciri(n), penjelasan: `${n} adalah ${kataPS(n)}. ${s.ciri(n) ? "Ini cocok." : "Ini belum cocok."} Baca lagi perintahnya.` }))}
          onBeres={beres}
          pesanBeres="Semua bilangan yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuBungkusA, KartuHitungBungkusA, KartuJodohBungkusA, KartuRakitA, KartuIkatA, KartuTebakA, KartuMemoriA, KartuUrutBanyakA, KartuPilahA, KartuKantongA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuBatangA, KartuCariModelA, KartuIsiPapanA, KartuJodohModelA, KartuBondA, KartuGarisPuluhanA, KartuTabelSeratusA, KartuUrutModelA, KartuPilahModelA, KartuTebakTitikA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuJodohKataA, KartuKalimatA, KartuSusunA, KartuTabelA, KartuBenarSalahA, KartuNamaA, KartuDetektifA, KartuPetaKonsepA, KartuUrutAngkaA, KartuSemuaA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

export function ConcreteK2B7A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧺", nama: "CONCRETE", cara: "Isi, ikat, dan hitung!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B7A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan pilih", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B7A(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_A7} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A ➡️" />}
    />
  );
}
