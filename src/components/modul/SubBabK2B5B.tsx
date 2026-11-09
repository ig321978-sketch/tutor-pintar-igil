"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { DetektifTeks, IsiTabel, Sortir, type BinSortir, type ItemSortir } from "./permainan-k2b3";
import { BagiDua, GarisPembagi, KembalikanUtuh, LingkariSetengah, PasangBerdua, PasangSatuSatu } from "./kumpulan-k2b5";
import { sebut } from "./dasar-k2";
import {
  NAMA_ITEM,
  RONDE_BAGI_B,
  RONDE_BISA_B,
  RONDE_DETEKTIF_B,
  RONDE_LINGKARI_B,
  RONDE_NERACA_B,
  RONDE_PASANG_B,
  RONDE_PEMBAGI_B,
  RONDE_SATU_B,
  RONDE_TABEL_B,
  RONDE_UTUH_B,
} from "./data-k2b5";
import { KartuK2B5 } from "./kartu-k2b5";
import { visualInfografisK2B5B } from "./infografis-k2b5";
import { SUB_B5 } from "./naskah-k2b5";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 5 Sub-Bab B: Setengah dari Kumpulan Benda.                      */
/*  Concrete 1 Bagi Kelereng  2 Neraca Setengah  3 Pasang Berdua              */
/*           4 Kembalikan Jadi Utuh                                           */
/*  Picture  5 Lingkari Setengah  6 Garis Pembagi Titik  7 Satu-Satu          */
/*  Abstract 8 Isi Tabel  9 Detektif Bilangan  10 Bisa Dibagi Dua?            */
/* Naskah: naskah-k2b5.ts (SUB_B5). Tanpa API.                                */
/* ------------------------------------------------------------------------ */

const J = SUB_B5.games.map((g) => g.title);

const SUARA_INFO =
  "Ini poster rangkuman setengah dari kumpulan benda. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK2B5BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B5} judul="Setengah dari Kumpulan Benda" suaraInfo={SUARA_INFO} visual={visualInfografisK2B5B()} speakGuru={speakGuru} />;
}

/* ------------------------------ Concrete ------------------------------ */

function KartuBagiB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={0}
      judul={J[0]}
      id="k2b5b-bagi"
      petunjuk="Bagi kelereng dari meja ke mangkuk Malosi dan mangkuk Upe sampai sama banyak. Seret kelerengnya, atau ketuk kelerengnya lalu ketuk mangkuk. Lalu pilih banyak kelereng setengahnya."
      jumlahRonde={RONDE_BAGI_B.length}
      belumSiap="Bagi semua kelereng sama banyak dan jawab dulu, ya."
      isi={(r, beres) => {
        const x = RONDE_BAGI_B[r];
        return (
          <>
            <IgilBicara pendek={`Bagi ${x.n} ${NAMA_ITEM[x.item].jamak}`} teks={`Malosi dan Upe mau berbagi ${sebut(x.n)} ${NAMA_ITEM[x.item].jamak}. Bagi sama banyak ke dua mangkuk. Seret bendanya ke mangkuk, atau ketuk bendanya lalu ketuk mangkuknya.`} />
            <BagiDua key={r} n={x.n} item={x.item} mode="mangkuk" nama={["Malosi", "Upe"]} onBeres={beres} />
          </>
        );
      }}
    />
  );
}

function KartuNeracaB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={1}
      judul={J[1]}
      id="k2b5b-neraca"
      petunjuk="Taruh benda di kedua piringan neraca. Neraca seimbang kalau kedua piringan sama banyak. Bagi semua benda sampai seimbang, lalu pilih banyak benda setengahnya."
      jumlahRonde={RONDE_NERACA_B.length}
      belumSiap="Seimbangkan neraca dan jawab dulu, ya."
      isi={(r, beres) => {
        const x = RONDE_NERACA_B[r];
        return (
          <>
            <IgilBicara pendek="Seimbangkan neraca" teks={`Ada ${sebut(x.n)} ${NAMA_ITEM[x.item].jamak}. Taruh di piringan kiri dan kanan sampai neraca seimbang. Seimbang berarti sama banyak.`} />
            <BagiDua key={r} n={x.n} item={x.item} mode="neraca" nama={["Kiri", "Kanan"]} onBeres={beres} />
          </>
        );
      }}
    />
  );
}

function KartuPasangB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={2}
      judul={J[2]}
      id="k2b5b-pasang"
      petunjuk="Ketuk dua benda untuk memasangkannya. Pasangkan semua benda berdua-berdua. Lalu hitung pasangannya, atau tentukan apakah ada yang tersisa."
      jumlahRonde={RONDE_PASANG_B.length}
      belumSiap="Pasangkan semua benda dan jawab dulu, ya."
      isi={(r, beres) => {
        const x = RONDE_PASANG_B[r];
        return (
          <>
            <IgilBicara pendek="Pasang berdua" teks={`Ketuk satu ${NAMA_ITEM[x.item].tunggal}, lalu ketuk ${NAMA_ITEM[x.item].tunggal} lain untuk memasangkannya. Pasangkan semuanya berdua-berdua. Satu pasang berisi dua benda.`} />
            <PasangBerdua key={r} n={x.n} item={x.item} onBeres={beres} />
          </>
        );
      }}
    />
  );
}

function KartuUtuhB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={3}
      judul={J[3]}
      id="k2b5b-utuh"
      petunjuk="Kamu diberi setengahnya saja. Tambahkan kelompok kedua yang sama banyak, lalu pilih berapa seluruh bendanya."
      jumlahRonde={RONDE_UTUH_B.length}
      belumSiap="Kembalikan jadi utuh dan jawab dulu, ya."
      isi={(r, beres) => {
        const x = RONDE_UTUH_B[r];
        return (
          <>
            <IgilBicara pendek="Cari seluruhnya" teks={`Setengahnya ${sebut(x.setengah)} ${NAMA_ITEM[x.item].jamak}. Tambahkan kelompok kedua yang sama banyak. Lalu pilih banyak seluruh benda.`} />
            <KembalikanUtuh key={r} item={x.item} setengah={x.setengah} onBeres={beres} />
          </>
        );
      }}
    />
  );
}

/* ------------------------------ Picture ------------------------------ */

function KartuLingkariB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={4}
      judul={J[4]}
      id="k2b5b-lingkari"
      petunjuk="Ketuk titik untuk melingkarinya. Lingkari tepat setengah dari seluruh titik, lalu tekan Periksa."
      jumlahRonde={RONDE_LINGKARI_B.length}
      belumSiap="Lingkari tepat setengah dan tekan Periksa dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanTempel pendek="Lingkari setengah" teks={`Ada ${sebut(RONDE_LINGKARI_B[r])} titik. Ketuk titik untuk melingkarinya. Lingkari tepat setengah dari semuanya, lalu tekan Periksa.`} />
          <LingkariSetengah key={r} n={RONDE_LINGKARI_B[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuPembagiB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={5}
      judul={J[5]}
      id="k2b5b-pembagi"
      petunjuk="Ketuk celah di antara titik untuk memasang garis. Kedua sisi garis harus punya titik sama banyak. Kalau tidak ada garis yang bisa, tekan Tidak ada garis."
      jumlahRonde={RONDE_PEMBAGI_B.length}
      belumSiap="Pasang garis yang membagi sama banyak dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanTempel pendek="Pasang garis pembagi" teks="Ketuk celah di antara titik untuk memasang satu garis lurus. Kedua sisi garis harus berisi titik sama banyak. Hitung titik di tiap sisi sebelum menekan Periksa." />
          <GarisPembagi key={r} larik={RONDE_PEMBAGI_B[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuSatuB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={6}
      judul={J[6]}
      id="k2b5b-satu"
      petunjuk="Hubungkan satu titik kiri dengan satu titik kanan. Kalau semua titik mendapat pasangan, kedua kelompok sama banyak. Lalu tentukan setengah atau bukan."
      jumlahRonde={RONDE_SATU_B.length}
      belumSiap="Hubungkan semua titik dan jawab dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanTempel pendek="Satu titik, satu pasangan" teks="Ketuk satu titik di kiri, lalu ketuk satu titik di kanan untuk menghubungkannya. Hubungkan sebanyak mungkin. Titik yang tersisa tanpa pasangan berarti kedua kelompok tidak sama banyak." />
          <PasangSatuSatu key={r} kiri={RONDE_SATU_B[r].kiri} kanan={RONDE_SATU_B[r].kanan} onBeres={beres} />
        </>
      )}
    />
  );
}

/* ------------------------------ Abstract ------------------------------ */

function KartuTabelB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={7}
      judul={J[7]}
      id="k2b5b-tabel"
      petunjuk="Ketuk baris tabel, lalu ketuk kartu jawaban yang tepat. Setengah dari suatu bilangan didapat dengan membagi dua sama banyak."
      jumlahRonde={RONDE_TABEL_B.length}
      belumSiap="Isi semua baris tabel dulu, ya."
      isi={(r, beres) => {
        const t = RONDE_TABEL_B[r];
        return (
          <>
            <CatatanPensil pendek={t.judul} teks={`${t.judul}. Ketuk baris tabel, lalu ketuk kartu jawaban yang tepat.`} />
            <IsiTabel
              key={r}
              kepala={t.kepala}
              baris={t.baris}
              kartu={t.kartu}
              petunjuk={(b) => `Bagi dua sama banyak atau gabungkan dua kelompok. ${b.label} adalah ${b.jawab}.`}
              onBeres={beres}
              pesanBeres="Tabel sudah lengkap. Setengah adalah hasil membagi dua sama banyak."
            />
          </>
        );
      }}
    />
  );
}

function KartuDetektifB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={8}
      judul={J[8]}
      id="k2b5b-detektif"
      petunjuk="Baca kedua petunjuk tentang bilangan misterius. Lalu pilih bilangan yang cocok dengan kedua petunjuk."
      jumlahRonde={RONDE_DETEKTIF_B.length}
      belumSiap="Temukan bilangannya dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanPensil pendek="Baca dua petunjuk" teks="Baca kedua petunjuk. Ketuk petunjuk untuk mendengarnya. Lalu pilih bilangan yang cocok dengan kedua petunjuk." />
          <DetektifTeks key={r} soal={RONDE_DETEKTIF_B[r]} onBeres={beres} pesanBeres={(n) => `Betul! Bilangan itu adalah ${n}.`} />
        </>
      )}
    />
  );
}

const BIN_BISA: BinSortir[] = [
  { id: "bisa", label: "Bisa dibagi dua sama banyak", ikon: "✅", warna: "#DCFCE7" },
  { id: "tidak", label: "Tidak bisa, tersisa satu", ikon: "❓", warna: "#FEE2E2" },
];

function itemBisa(n: number): ItemSortir {
  const bisa = n % 2 === 0;
  return {
    id: `n${n}`,
    label: String(n),
    isi: <span className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-2xl font-black text-[#1C01A5]">{n}</span>,
    bin: bisa ? "bisa" : "tidak",
    petunjuk: bisa ? `${sebut(n)} dibagi dua sama banyak masing-masing ${sebut(n / 2)}, tanpa sisa. Jadi masuk kotak bisa dibagi dua.` : `${sebut(n)} dibagi dua sama banyak menyisakan satu. Jadi masuk kotak tidak bisa.`,
    ucapan: bisa ? `${sebut(n)} bisa dibagi dua. Setengahnya ${sebut(n / 2)}.` : `${sebut(n)} tidak bisa dibagi dua sama banyak.`,
  };
}

function KartuBisaB(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={9}
      judul={J[9]}
      id="k2b5b-bisa"
      petunjuk="Pilah tiap bilangan. Bilangan yang bisa dibagi dua sama banyak tanpa sisa masuk kotak hijau. Bilangan yang menyisakan satu masuk kotak merah muda."
      jumlahRonde={RONDE_BISA_B.length}
      belumSiap="Pilah semua bilangan dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanPensil pendek="Bisa dibagi dua?" teks="Bayangkan membagi sebanyak itu benda kepada dua anak sama banyak. Kalau tidak ada sisa, bilangan itu bisa dibagi dua. Seret bilangan ke kotak yang tepat, atau ketuk bilangannya lalu ketuk kotaknya." />
          <Sortir key={r} item={RONDE_BISA_B[r].map((x) => itemBisa(x.bilangan))} bin={BIN_BISA} onBeres={beres} pesanBeres="Semua bilangan sudah dipilah. Bilangan genap bisa dibagi dua sama banyak, bilangan ganjil menyisakan satu." />
        </>
      )}
    />
  );
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [
  { nomor: 1, render: (d) => <KartuBagiB {...d} /> },
  { nomor: 2, render: (d) => <KartuNeracaB {...d} /> },
  { nomor: 3, render: (d) => <KartuPasangB {...d} /> },
  { nomor: 4, render: (d) => <KartuUtuhB {...d} /> },
];

const KARTU_PICTURE: KartuTahap[] = [
  { nomor: 5, render: (d) => <KartuLingkariB {...d} /> },
  { nomor: 6, render: (d) => <KartuPembagiB {...d} /> },
  { nomor: 7, render: (d) => <KartuSatuB {...d} /> },
];

const KARTU_ABSTRACT: KartuTahap[] = [
  { nomor: 8, render: (d) => <KartuTabelB {...d} /> },
  { nomor: 9, render: (d) => <KartuDetektifB {...d} /> },
  { nomor: 10, render: (d) => <KartuBisaB {...d} /> },
];

export function ConcreteK2B5B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧸", nama: "CONCRETE", cara: "Bagi, seimbangkan, dan pasangkan!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B5B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan isi", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B5B(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Bilangan dan kata", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_B5} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />}
    />
  );
}
