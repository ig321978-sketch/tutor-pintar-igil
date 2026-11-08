"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { KERTAS_ANGKA, TOMBOL_KECIL, TOTAL_GAME, kataK, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import {
  JawabSuara,
  JudulGame,
  KABAR_TULIS_OK,
  KabarChip,
  Letusan,
  PanelPoster,
  STIKER,
  TombolLanjut,
  kata,
  useLetusan,
  type Kabar,
  type PanelSuara,
  type Umum,
} from "./SubBabBBanding";
import { CatatanPensil, LencanaSuara, PitaTahap, SuaraCtx, TombolSuaraGuru, useBicara } from "./tahap-b-gaya";
import { Bangun } from "./bentuk-a4-dasar";
import { BendaB, WARNA_ISI, type JenisBendaB, type Warna } from "./kelompok-b4-dasar";
import { LangkahAturan, LangkahBuah, LangkahLemari, LangkahNampan } from "./SubBabB4Concrete";
import { KartuBeda, KartuKetuk, KartuTabel } from "./SubBabB4Picture";

/* ------------------------------------------------------------------------ */
/* Bab 4 Sub-Bab B: Mengelompokkan Benda (Buku Siswa Kelas 1 hlm. 127-133).   */
/* Semua di klien, tanpa API. Naskah: naskah/mtk-1-bab4-sub-b-mengelompokkan-benda.md */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Nampan Kue dan Mainan (seret), 2 Tangkap Buah Besar dan Kecil  */
/*            (satu-satu), 3 Tebak Aturan Rahasia, 4 Lemari Dua Aturan.        */
/*  Picture:  (bentuk polos, tanpa gambar benda)                              */
/*            5 Ketuk Semua yang Sama, 6 Tabel Hitung Kelompok,                */
/*            7 Cari yang Beda.                                               */
/*  Abstract: 8 Lengkapi Kalimat Kelompok, 9 Kantong Angka,                    */
/*            10 Kanvas Guratan dan Suara.                                    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman mengelompokkan benda. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_B4 = [
  {
    ikon: "🎯",
    nama: "Aturan",
    ket: "Ciri yang dipilih untuk mengelompokkan",
    suara: "Aturan adalah ciri yang kita pilih untuk mengelompokkan. Aturannya bisa bentuk, warna, atau ukuran. Dalam sekali mengelompokkan, pakai satu aturan saja.",
  },
  {
    ikon: "🧺",
    nama: "Kelompok",
    ket: "Kumpulan benda yang cirinya sama",
    suara: "Kelompok adalah kumpulan benda yang punya ciri sama menurut aturan yang kita pilih. Benda yang sama bisa masuk kelompok lain kalau aturannya diganti.",
  },
];

/** Kartu kecil benda nyata dengan nama. */
function KartuKue({ jenis, warna, nama, kelas = "h-11 w-11" }: { jenis: JenisBendaB; warna?: Warna; nama: string; kelas?: string }) {
  return (
    <span className="flex w-16 flex-col items-center">
      <BendaB jenis={jenis} warna={warna} kelas={kelas} label={nama} />
      <span className="text-center text-[10px] font-black leading-tight text-[#1C01A5]">{nama}</span>
    </span>
  );
}

const SEL = "space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2";

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

export function InfografisKelompokB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Mengelompokkan Benda</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="TIGA CARA MENGELOMPOKKAN"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Ada tiga cara mengelompokkan benda. Pertama, menurut bentuk, misalnya bulat, segitiga, dan segi empat. Kedua, menurut warna, misalnya merah, kuning, dan biru. Ketiga, menurut ukuran, yaitu besar dan kecil."
      >
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className={SEL}>
            <div className="flex justify-center gap-0.5">
              <Bangun jenis="bulat" isi="#FFE566" kelas="h-8 w-8" />
              <Bangun jenis="segitiga" isi="#E98989" kelas="h-8 w-8" />
              <Bangun jenis="persegi" isi="#7FCB96" kelas="h-8 w-8" />
            </div>
            <p className="text-sm font-black text-[#1C01A5]">Bentuk</p>
          </div>
          <div className={SEL}>
            <div className="flex justify-center gap-1 pt-1">
              {(["merah", "kuning", "biru"] as Warna[]).map((w) => (
                <span key={w} aria-hidden="true" className="block h-7 w-7 rounded-full border-2 border-[#1C01A5]" style={{ backgroundColor: WARNA_ISI[w] }} />
              ))}
            </div>
            <p className="pt-1 text-sm font-black text-[#1C01A5]">Warna</p>
          </div>
          <div className={SEL}>
            <div className="flex items-end justify-center gap-1">
              <BendaB jenis="bola" warna="merah" kelas="h-10 w-10" />
              <BendaB jenis="bola" warna="merah" kelas="h-5 w-5" />
            </div>
            <p className="text-sm font-black text-[#1C01A5]">Ukuran</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="KUE MENURUT BENTUK"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Kue tradisional dikelompokkan menurut bentuk. Kelompok lengkung: kue cucur dan kue talam. Kelompok segitiga: kue risol dan kue lupis. Kelompok segi empat: kue lapis hijau dan bolu cokelat. Ada dua kue di setiap kelompok."
      >
        <div className="grid grid-cols-3 gap-2 text-center">
          {(
            [
              ["Lengkung", [["cucur", "Kue cucur"], ["talam", "Kue talam"]]],
              ["Segitiga", [["risol", "Kue risol"], ["lupis", "Kue lupis"]]],
              ["Segi empat", [["lapisHijau", "Kue lapis hijau"], ["brownies", "Bolu cokelat"]]],
            ] as [string, [JenisBendaB, string][]][]
          ).map(([nama, isi]) => (
            <div key={nama} className={SEL}>
              <p className="rounded-full bg-[#FFE566] px-1 text-xs font-black text-[#1C01A5]">{nama}</p>
              <div className="flex flex-col items-center gap-1">
                {isi.map(([j, n]) => (
                  <KartuKue key={j} jenis={j} nama={n} />
                ))}
              </div>
              <p className="text-lg font-black text-[#166534]">2 kue</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="KUE MENURUT WARNA"
        warna="#A8672D"
        speakGuru={speakGuru}
        suara="Kue yang sama bisa dikelompokkan menurut warna. Kelompok cokelat: kue cucur, kue risol, dan bolu cokelat. Kelompok hijau: kue talam, kue lapis hijau, dan kue lupis. Ada tiga kue cokelat dan tiga kue hijau."
      >
        <div className="grid grid-cols-2 gap-2 text-center">
          {(
            [
              ["Cokelat", "#F3D9B8", [["cucur", "Kue cucur"], ["risol", "Kue risol"], ["brownies", "Bolu cokelat"]]],
              ["Hijau", "#D7F2E0", [["talam", "Kue talam"], ["lapisHijau", "Kue lapis hijau"], ["lupis", "Kue lupis"]]],
            ] as [string, string, [JenisBendaB, string][]][]
          ).map(([nama, latar, isi]) => (
            <div key={nama} className="space-y-1 rounded-2xl border-4 border-[#1C01A5] px-1 py-2" style={{ backgroundColor: latar }}>
              <p className="text-sm font-black text-[#1C01A5]">{nama}</p>
              <div className="flex flex-wrap justify-center gap-1">
                {isi.map(([j, n]) => (
                  <KartuKue key={j} jenis={j} nama={n} kelas="h-9 w-9" />
                ))}
              </div>
              <p className="text-lg font-black text-[#166534]">3 kue</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="BUAH MENURUT UKURAN"
        warna="#0891B2"
        speakGuru={speakGuru}
        suara="Buah juga bisa dikelompokkan menurut ukuran. Semangka dan melon ukurannya besar. Anggur dan sawo ukurannya kecil. Besar dan kecil dibandingkan dengan benda lain di dekatnya."
      >
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className={SEL}>
            <p className="rounded-full bg-[#7FCB96] px-1 text-sm font-black text-[#1C01A5]">Besar</p>
            <div className="flex items-end justify-center gap-1">
              <KartuKue jenis="semangka" nama="Semangka" kelas="h-14 w-14" />
              <KartuKue jenis="melon" nama="Melon" kelas="h-12 w-12" />
            </div>
          </div>
          <div className={SEL}>
            <p className="rounded-full bg-[#FFE566] px-1 text-sm font-black text-[#1C01A5]">Kecil</p>
            <div className="flex items-end justify-center gap-1 pt-3">
              <KartuKue jenis="anggur" nama="Anggur" kelas="h-8 w-8" />
              <KartuKue jenis="sawo" nama="Sawo" kelas="h-8 w-8" />
            </div>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="SATU KUE, DUA KELOMPOK"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Tabel ciri kue. Kue cucur: lengkung, cokelat. Kue risol: segitiga, cokelat. Kue talam: lengkung, hijau. Kue lapis hijau: segi empat, hijau. Bolu cokelat: segi empat, cokelat. Kue lupis: segitiga, hijau. Kue talam masuk kelompok lengkung menurut bentuk, dan masuk kelompok hijau menurut warna."
      >
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          <table className="w-full border-collapse text-center text-sm font-black text-[#1C01A5]">
            <thead>
              <tr className="bg-[#1C01A5] text-xs text-[#FFE566]">
                <th className="px-1 py-1.5 text-left">Kue</th>
                <th className="px-1 py-1.5">Bentuk</th>
                <th className="px-1 py-1.5">Warna</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["cucur", "Kue cucur", "lengkung", "cokelat"],
                  ["risol", "Kue risol", "segitiga", "cokelat"],
                  ["talam", "Kue talam", "lengkung", "hijau"],
                  ["lapisHijau", "Kue lapis hijau", "segi empat", "hijau"],
                  ["brownies", "Bolu cokelat", "segi empat", "cokelat"],
                  ["lupis", "Kue lupis", "segitiga", "hijau"],
                ] as [JenisBendaB, string, string, string][]
              ).map(([j, n, bentuk, warna]) => (
                <tr key={j} className="border-t-2 border-[#1C01A5]/20">
                  <td className="px-1 py-1 text-left text-xs">
                    <span className="flex items-center gap-1.5">
                      <BendaB jenis={j} kelas="h-8 w-8" label={n} />
                      {n}
                    </span>
                  </td>
                  <td className="px-1 py-1 text-xs">{bentuk}</td>
                  <td className={`px-1 py-1 text-xs ${warna === "hijau" ? "bg-[#E8F7EE]" : "bg-[#F9EAD3]"}`}>{warna}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="MENGHITUNG KELOMPOK"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Setelah mengelompokkan, kita bisa menghitung. Kue cokelat ada tiga. Kue hijau ada tiga. Tiga ditambah tiga sama dengan enam. Menurut bentuk, kue lengkung ada dua, segitiga ada dua, segi empat ada dua. Dua ditambah dua ditambah dua sama dengan enam. Banyak kue semuanya tetap enam, apa pun aturannya."
      >
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className={SEL}>
            <p className="text-xs font-black text-[#1C01A5]">Menurut warna</p>
            <p className="text-xl font-black text-[#1C01A5]">3 + 3 = 6</p>
            <p className="text-[11px] font-black text-[#1C01A5]/70">cokelat + hijau</p>
          </div>
          <div className={SEL}>
            <p className="text-xs font-black text-[#1C01A5]">Menurut bentuk</p>
            <p className="text-xl font-black text-[#1C01A5]">2 + 2 + 2 = 6</p>
            <p className="text-[11px] font-black text-[#1C01A5]/70">lengkung + segitiga + segi empat</p>
          </div>
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Banyak semuanya tetap sama: 6 kue</p>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="LANGKAH MENGELOMPOKKAN"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Lima langkah mengelompokkan. Amati bendanya. Pilih satu aturan. Periksa setiap benda, apakah cocok dengan aturan. Taruh di kelompoknya. Lalu hitung setiap kelompok."
      >
        <div className="grid grid-cols-5 gap-1 text-center">
          {[
            ["👀", "Amati"],
            ["📏", "Pilih aturan"],
            ["🔍", "Periksa"],
            ["🧺", "Taruh"],
            ["🔢", "Hitung"],
          ].map(([ikon, nama], i) => (
            <div key={nama} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-0.5 py-1.5">
              <p className="text-[10px] font-black text-[#0F766E]">{i + 1}</p>
              <p className="text-xl" aria-hidden="true">
                {ikon}
              </p>
              <p className="text-[10px] font-black leading-tight text-[#1C01A5]">{nama}</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="KENAPA KITA MENGELOMPOKKAN?"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Mengelompokkan berguna dalam hidup sehari-hari. Baju yang dikelompokkan membuat lemari rapi. Buku yang dikelompokkan di rak mudah dicari. Barang di toko yang dikelompokkan, seperti sayur, buah, dan susu, mudah ditemukan dan mudah dihitung."
      >
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            ["👕", "Rapi", "baju di lemari"],
            ["📚", "Mudah dicari", "buku di rak"],
            ["🛒", "Mudah dihitung", "barang di toko"],
          ].map(([ikon, nama, ket]) => (
            <div key={nama} className={SEL}>
              <p className="text-3xl" aria-hidden="true">
                {ikon}
              </p>
              <p className="text-xs font-black text-[#1C01A5]">{nama}</p>
              <p className="text-[10px] font-black leading-tight text-[#4338CA]">{ket}</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="KELOMPOKKAN DI RUMAH"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Ayo mencoba di rumah. Kumpulkan sepuluh benda kecil, misalnya sendok, tutup botol, atau kancing. Kelompokkan menurut satu aturan. Lalu ganti aturannya dan kelompokkan lagi. Ceritakan pada Ibu atau Ayah apa aturan yang kamu pakai."
      >
        <div className="flex items-center gap-2 rounded-2xl border-4 border-dashed border-[#16A34A] bg-[#F0FDF4] px-2 py-2">
          <span className="text-3xl" aria-hidden="true">
            🏠
          </span>
          <p className="text-sm font-black leading-snug text-[#14532D]">
            Kumpulkan benda kecil di rumah. Kelompokkan menurut <span className="rounded bg-[#FFE566] px-1">satu aturan</span>. Lalu ganti aturannya dan coba lagi.
          </p>
        </div>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_B4.map((i) => (
          <button
            key={i.nama}
            type="button"
            aria-label={`Dengarkan: ${i.nama}`}
            onClick={() => speakGuru(i.suara)}
            className="igil-tanpa-tepi space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-2 py-3 text-center shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="block text-3xl" aria-hidden="true">
              {i.ikon}
            </span>
            <span className="block text-lg font-black text-[#1C01A5]">{i.nama}</span>
            <span className="block text-[11px] font-black leading-tight text-[#1C01A5]/80">{i.ket}</span>
            <LencanaSuara />
          </button>
        ))}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 4: Concrete                                                          */
/* ------------------------------------------------------------------------ */

type TipeConcrete = "nampan" | "buah" | "aturan" | "lemari";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "nampan" },
  { nomor: 2, tipe: "buah" },
  { nomor: 3, tipe: "aturan" },
  { nomor: 4, tipe: "lemari" },
];

export function ConcreteKelompokB(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <ConcreteIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function ConcreteIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const langkah = LANGKAH_CONCRETE[indeks];
  const terakhir = indeks >= LANGKAH_CONCRETE.length - 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    if (terakhir) {
      onSelesai();
      return;
    }
    setIndeks((n) => n + 1);
    gulir();
  };
  const dasar = {
    speakGuru,
    lanjut,
    nomor: langkah.nomor,
    panel,
    teksLanjut: terakhir ? "LANJUTKAN KE PICTURE ⬇️" : "LANJUTKAN ⬇️",
  };

  return (
    <BingkaiTahap tahap={4} className="space-y-3">
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pegang, seret, dan tebak!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span key={l.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "nampan" ? <LangkahNampan {...dasar} /> : null}
        {langkah.tipe === "buah" ? <LangkahBuah {...dasar} /> : null}
        {langkah.tipe === "aturan" ? <LangkahAturan {...dasar} /> : null}
        {langkah.tipe === "lemari" ? <LangkahLemari {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Bentuk polos saja. Tidak ada gambar benda.               */
/* ------------------------------------------------------------------------ */

type TipePicture = "ketuk" | "tabel" | "beda";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "ketuk" },
  { nomor: 6, tipe: "tabel" },
  { nomor: 7, tipe: "beda" },
];

export function PictureKelompokB(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <PictureIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function PictureIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const kartu = KARTU_PICTURE[indeks];
  const terakhir = indeks >= KARTU_PICTURE.length - 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    if (terakhir) {
      onSelesai();
      return;
    }
    setIndeks((n) => n + 1);
    gulir();
  };
  const dasar = {
    speakGuru,
    lanjut,
    nomor: kartu.nomor,
    panel,
    teksLanjut: terakhir ? "LANJUTKAN KE ABSTRACT ⬇️" : "LANJUTKAN ⬇️",
  };

  return (
    <BingkaiTahap tahap={5} className="space-y-3">
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat diagram dan tandai" warna="#B45309" />
      <div className="flex items-center gap-1.5" aria-label={`Kartu ${indeks + 1} dari ${KARTU_PICTURE.length}`}>
        {KARTU_PICTURE.map((k, i) => (
          <span key={k.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={kartu.tipe} className="space-y-3">
        {kartu.tipe === "ketuk" ? <KartuKetuk {...dasar} /> : null}
        {kartu.tipe === "tabel" ? <KartuTabel {...dasar} /> : null}
        {kartu.tipe === "beda" ? <KartuBeda {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Lengkapi Kalimat Kelompok ------------------------- */

type SoalKalimat = { depan: string; belakang: string; opsi: string[]; kunci: string; petunjuk: string; jelas: string };

const RONDE_KALIMAT: SoalKalimat[] = [
  {
    depan: "Kue cucur dan kue talam berbentuk",
    belakang: ".",
    opsi: ["segitiga", "lengkung", "segi empat"],
    kunci: "lengkung",
    petunjuk: "Tepi kue cucur dan kue talam melengkung terus. Pilih bentuk yang tidak punya pojok.",
    jelas: "Tepi kue cucur dan kue talam melengkung, jadi keduanya berbentuk lengkung.",
  },
  {
    depan: "Kue risol dan kue lupis dikelompokkan menurut",
    belakang: ".",
    opsi: ["warna", "ukuran", "bentuk"],
    kunci: "bentuk",
    petunjuk: "Kue risol cokelat dan kue lupis hijau, jadi warnanya beda. Keduanya punya tiga pojok. Apa yang sama dari keduanya?",
    jelas: "Kue risol dan kue lupis sama-sama segitiga, jadi dikelompokkan menurut bentuk.",
  },
  {
    depan: "Bolu cokelat dan kue cucur dikelompokkan menurut",
    belakang: ".",
    opsi: ["bentuk", "warna", "ukuran"],
    kunci: "warna",
    petunjuk: "Bolu cokelat berbentuk segi empat dan kue cucur berbentuk lengkung, jadi bentuknya beda. Apa yang sama dari keduanya?",
    jelas: "Bolu cokelat dan kue cucur sama-sama cokelat, jadi dikelompokkan menurut warna.",
  },
  {
    depan: "Semangka dan melon masuk kelompok ukuran",
    belakang: ".",
    opsi: ["kecil", "besar"],
    kunci: "besar",
    petunjuk: "Bandingkan semangka dan melon dengan anggur. Mana yang lebih besar?",
    jelas: "Semangka dan melon ukurannya besar, jadi masuk kelompok besar.",
  },
];

function RondeKalimat({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const s = RONDE_KALIMAT[ronde];
  const akhir = ronde === RONDE_KALIMAT.length - 1;
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const suara = panel.suara["b4-kalimat"] === true && akhir;
  useBicara(akhir ? suara : benar, s.jelas);

  const pilih = (o: string) => {
    if (benar) return;
    if (o === s.kunci) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(o);
      setKabar({ teks: s.petunjuk, ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat! Ucapkan jawabannya." : benar ? (akhir ? "Ucapkan: banyak kue cokelat" : "Kalimatnya lengkap!") : "Lengkapi kalimatnya"}
        teks={`Baca kalimatnya. ${s.depan} ... ${s.belakang === "." ? "" : s.belakang} Pilih kata yang tepat untuk melengkapinya.${akhir ? " Setelah itu, ucapkan berapa banyak kue yang berwarna cokelat, yaitu kue cucur, kue risol, dan bolu cokelat." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-4 text-center text-xl font-black leading-relaxed text-[#1C01A5]">
          {s.depan}{" "}
          <span
            className={`inline-block min-w-[96px] rounded-lg border-4 px-2 ${benar ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-dashed border-[#F0AB00] bg-[#FFF7CC]"}`}
            aria-label={benar ? s.kunci : "kosong"}
          >
            {benar ? s.kunci : "\u00A0"}
          </span>
          {s.belakang}
        </p>
        <div className={`grid gap-2 ${s.opsi.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
          {s.opsi.map((o) => (
            <button
              key={`${o}-${keliru === o ? "x" : "o"}`}
              type="button"
              aria-label={`Pilih ${o}`}
              disabled={benar}
              onClick={() => pilih(o)}
              className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-3 text-base font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-50 ${
                keliru === o ? "igil-goyang" : ""
              }`}
            >
              {o}
            </button>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuKalimat({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Lengkapi Kalimat Kelompok"
      warna="#C7D2FE"
      petunjuk="Baca kalimat tentang kelompok. Pilih kata yang tepat untuk melengkapinya: bentuk, warna, atau ukuran. Setelah itu, ucapkan berapa banyak kue yang berwarna cokelat."
      speakGuru={speakGuru}
      panel={panel}
      id="b4-kalimat"
      jumlahRonde={RONDE_KALIMAT.length}
      kunciAkhir={3}
      belumSiap="Lengkapi kalimatnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKalimat ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Kantong Angka ------------------------------------- */

type SoalAngka = { cerita: string; suku: number[]; petunjuk: string };

const RONDE_ANGKA: SoalAngka[] = [
  {
    cerita: "Kelompok merah ada 3 benda. Kelompok biru ada 2 benda. Semuanya ada berapa benda?",
    suku: [3, 2],
    petunjuk: "Mulai dari 3, lalu hitung maju 2 kali: empat, lima.",
  },
  {
    cerita: "Kelompok besar ada 4 benda. Kelompok kecil ada 3 benda. Semuanya ada berapa benda?",
    suku: [4, 3],
    petunjuk: "Mulai dari 4, lalu hitung maju 3 kali: lima, enam, tujuh.",
  },
  {
    cerita: "Kelompok bola ada 2 benda. Kelompok kotak ada 3 benda. Kelompok topi ada 4 benda. Semuanya ada berapa benda?",
    suku: [2, 3, 4],
    petunjuk: "Jumlahkan dua kelompok dulu: 2 ditambah 3 sama dengan 5. Lalu tambahkan 4.",
  },
];

function RondeAngka({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const s = RONDE_ANGKA[ronde];
  const akhir = ronde === RONDE_ANGKA.length - 1;
  const hasil = s.suku.reduce((a, b) => a + b, 0);
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const suara = panel.suara["b4-angka"] === true && akhir;
  useBicara(akhir ? suara : benar, `${s.suku.map(kataK).join(" ditambah ")} sama dengan ${kataK(hasil)}.`);

  const pilih = (n: number) => {
    if (benar) return;
    if (n === hasil) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: s.petunjuk, ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat! Ucapkan jawabannya." : benar ? (akhir ? "Ucapkan: banyak benda kelompok topi" : "Jumlahnya tepat!") : "Jumlahkan semua kelompok"}
        teks={`${s.cerita} Ketuk angka jawabanmu.${akhir ? " Setelah itu, ucapkan berapa banyak benda di kelompok topi." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-3 text-center text-lg font-black leading-snug text-[#1C01A5]">{s.cerita}</p>
        <p className="text-center text-4xl font-black text-[#1C01A5]">
          {s.suku.join(" + ")} = <span className={benar ? "text-[#166534]" : "text-[#1C01A5]/50"}>{benar ? hasil : "?"}</span>
        </p>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 10 }, (_, n) => (
            <button
              key={`${n}-${keliru === n ? "x" : "o"}`}
              type="button"
              aria-label={`Angka ${n}`}
              disabled={benar}
              onClick={() => pilih(n)}
              className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-3 text-2xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-50 ${
                keliru === n ? "igil-goyang" : ""
              } ${benar && n === hasil ? "ring-4 ring-[#7FCB96]" : ""}`}
            >
              {n}
            </button>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuAngka({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kantong Angka"
      warna="#C7D2FE"
      petunjuk="Baca ceritanya, lalu jumlahkan banyak benda semua kelompok. Ketuk angka jawabanmu. Pada soal terakhir, ucapkan berapa benda di kelompok topi."
      speakGuru={speakGuru}
      panel={panel}
      id="b4-angka"
      jumlahRonde={RONDE_ANGKA.length}
      kunciAkhir={4}
      belumSiap="Jawab soalnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeAngka ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara ------------------------- */

const PILIHAN_TULIS: { id: string; teks: string; n: number }[] = [
  { id: "cokelat", teks: "Kue cokelat", n: 3 },
  { id: "besar", teks: "Buah besar", n: 2 },
  { id: "kecil", teks: "Buah kecil", n: 2 },
];

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<string | null>(null);
  const [lulus, setLulus] = useState(false);
  const pil = PILIHAN_TULIS.find((p) => p.id === pilih) ?? null;
  const g = tahap === 0 ? { teks: "Kue hijau", n: 3 } : pil;
  const id = tahap === 0 ? "b4-tulis-0" : `b4-tulis-1-${pilih ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(suara && g !== null, g ? `${g.teks} ada ${kataK(g.n)}. Sekarang guratkan angkanya di kanvas.` : "");

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Ucapkan banyak anggota sebuah kelompok, lalu guratkan angkanya di kanvas. Setelah itu, pilih kelompok milikmu sendiri.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Kue hijau ada berapa?" : pil ? `Ucapkan: banyak ${pil.teks.toLowerCase()}` : "Pilih satu kelompok"}
          teks={
            tahap === 0
              ? "Kue hijau ada berapa? Ada kue talam, kue lapis hijau, dan kue lupis. Ucapkan jawabannya, lalu guratkan angkanya di kanvas."
              : "Ayo mencoba. Pilih satu kelompok sesukamu. Ucapkan berapa banyak anggotanya, lalu guratkan angkanya di kanvas. Kue cokelat ada tiga. Buah besar ada dua. Buah kecil ada dua."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 0 ? (
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">Kue talam • kue lapis hijau • kue lupis</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {PILIHAN_TULIS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`Pilih ${p.teks}`}
                  disabled={pilih !== null}
                  onClick={() => setPilih(p.id)}
                  className={`rounded-2xl border-4 border-[#1C01A5] px-1 py-3 text-sm font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-60 ${
                    pilih === p.id ? "bg-[#7FCB96]" : "bg-[#FFE566]"
                  }`}
                >
                  {p.teks}
                </button>
              ))}
            </div>
          )}
          {g ? (
            <p className="text-center text-3xl font-black text-[#1C01A5]">
              {g.teks} = {suara ? g.n : "?"}
            </p>
          ) : null}
        </div>
        {g ? <JawabSuara id={id} jumlah={g.n} panel={panel} siap belumSiap="" /> : null}
        {suara && g ? (
          <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
            <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
            <DottedNumberTracingCanvas key={`tulis-${id}`} digit={g.n} kata={kata(g.n)} onCompletedTrace={() => setLulus(true)} />
            <KabarChip kabar={lulus ? KABAR_TULIS_OK : null} />
          </div>
        ) : null}
        {suara && tahap === 0 ? (
          <button
            type="button"
            onClick={() => {
              panel.bersih();
              setLulus(false);
              setTahap(1);
            }}
            className={TOMBOL_KECIL}
          >
            ▶ Ayo Mencoba
          </button>
        ) : null}
        {suara && tahap === 1 ? <TombolLanjut teks={teksLanjut} onClick={lanjut} /> : null}
      </div>
    </>
  );
}

/* --------- Poin Penting dan Catatanku ------------------------------------- */

const SUARA_POIN =
  "Ingat selalu! Mengelompokkan artinya mengumpulkan benda yang punya ciri sama. Aturan mengelompokkan ada tiga: bentuk, warna, dan ukuran. Dalam sekali mengelompokkan, pakai satu aturan saja. Benda yang sama bisa masuk kelompok lain kalau aturannya diganti. Setelah mengelompokkan, hitung banyak benda di setiap kelompok.";

const POIN_B4: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "🧺",
    nama: "Mengelompokkan",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">mengumpulkan benda yang cirinya sama</p>,
    suara: "Mengelompokkan artinya mengumpulkan benda yang punya ciri sama. Contohnya kue cokelat dikumpulkan dengan kue cokelat.",
  },
  {
    ikon: "🎯",
    nama: "Tiga aturan",
    isi: (
      <div className="flex flex-wrap justify-center gap-1.5">
        {["bentuk", "warna", "ukuran"].map((a) => (
          <span key={a} className="rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-3 text-sm font-black text-[#1C01A5]">
            {a}
          </span>
        ))}
      </div>
    ),
    suara: "Aturan mengelompokkan ada tiga. Menurut bentuk, menurut warna, dan menurut ukuran.",
  },
  {
    ikon: "1️⃣",
    nama: "Satu aturan sekali",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">pakai satu aturan saja dalam sekali mengelompokkan</p>,
    suara: "Dalam sekali mengelompokkan, pakai satu aturan saja. Kalau aturannya dicampur, kelompoknya membingungkan.",
  },
  {
    ikon: "🔄",
    nama: "Ganti aturan",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">benda sama, aturan beda, kelompok beda</p>,
    suara: "Benda yang sama bisa masuk kelompok yang berbeda kalau aturannya diganti. Kue talam masuk kelompok lengkung menurut bentuk, dan kelompok hijau menurut warna.",
  },
  {
    ikon: "🔢",
    nama: "Hitung kelompok",
    isi: <p className="text-center text-xl font-black text-[#1C01A5]">3 + 3 = 6</p>,
    suara: "Setelah mengelompokkan, hitung banyak benda di setiap kelompok. Tiga kue cokelat ditambah tiga kue hijau sama dengan enam kue.",
  },
];

const CATATANKU = [
  "Aku bisa mengelompokkan benda menurut bentuk.",
  "Aku bisa mengelompokkan benda menurut warna dan ukuran.",
  "Aku bisa menyebutkan aturan kelompokku.",
  "Aku aktif berdiskusi.",
  "Aku bertanya jika belum mengerti.",
];

function Catatanku({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [iya, setIya] = useState<boolean[]>(() => CATATANKU.map(() => false));
  return (
    <div className="space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-[#F5F3FF] px-2 py-2">
      <p className="text-center text-base font-black text-[#1C01A5]">📝 Catatanku</p>
      <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk kotak kalau jawabanmu iya.</p>
      {CATATANKU.map((tx, i) => (
        <button
          key={tx}
          type="button"
          aria-pressed={iya[i]}
          aria-label={`${tx} ${iya[i] ? "Iya" : "Belum dicentang"}`}
          onClick={() => {
            const baru = iya.slice();
            baru[i] = !baru[i];
            setIya(baru);
            speakGuru(baru[i] ? `${tx} Iya.` : tx);
          }}
          className="igil-tanpa-tepi flex w-full items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1 text-left"
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-4 border-[#1C01A5] text-xl ${iya[i] ? "bg-[#FFE566]" : "bg-white"}`}>{iya[i] ? "😊" : ""}</span>
          <span className="min-w-0 flex-1 text-sm font-black leading-tight text-[#1C01A5]">{tx}</span>
        </button>
      ))}
    </div>
  );
}

function PoinPentingB4({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_B4.map((p) => (
          <button
            key={p.nama}
            type="button"
            aria-label={`Dengarkan: ${p.nama}`}
            onClick={() => speakGuru(p.suara)}
            className="igil-tanpa-tepi block w-full space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-left shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
                <span className="text-3xl">{p.ikon}</span>
                {p.nama}
              </span>
              <LencanaSuara />
            </span>
            {p.isi}
          </button>
        ))}
        <div className="space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
          <button
            type="button"
            aria-label="Dengarkan: Cara mendeskripsikan kelompok"
            onClick={() => speakGuru("Cara menyebutkan kelompok. Kue talam masuk kelompok hijau menurut warna.")}
            className="igil-tanpa-tepi flex w-full items-center justify-between gap-2 text-left"
          >
            <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
              <span className="text-3xl">🗣️</span>
              Cara menyebutkan
            </span>
            <LencanaSuara />
          </button>
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {[
              { teks: "Kue talam", warna: "#FFFFFF" },
              { teks: "masuk kelompok", warna: "#FFE566" },
              { teks: "hijau", warna: "#7FCB96" },
              { teks: "menurut warna", warna: "#FFE566" },
            ].map((k) => (
              <span key={k.teks} className="rounded-full border-4 border-[#1C01A5] px-3 py-0.5 text-base font-black text-[#1C01A5]" style={{ backgroundColor: k.warna }}>
                {k.teks}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-[#16A34A] bg-white px-3 py-2">
          <span className="text-3xl" aria-hidden="true">
            🏠
          </span>
          <p className="text-sm font-black leading-snug text-[#14532D]">
            Ayo Mencoba di rumah: kumpulkan sepuluh benda kecil. Kelompokkan menurut satu aturan, lalu ganti aturannya. Ceritakan aturanmu kepada Ibu atau Ayah.
          </p>
        </div>
        <Catatanku speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB B ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "kalimat" | "angka" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "kalimat" },
  { nomor: 9, tipe: "angka" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractKelompokB(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <AbstractIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function AbstractIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const poin = indeks >= KARTU_ABSTRACT.length;
  const kartu = KARTU_ABSTRACT[Math.min(indeks, KARTU_ABSTRACT.length - 1)];
  const langkahTotal = KARTU_ABSTRACT.length + 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    setIndeks((n) => n + 1);
    gulir();
  };
  const dasar = {
    speakGuru,
    lanjut,
    nomor: kartu.nomor,
    panel,
    teksLanjut: indeks >= KARTU_ABSTRACT.length - 1 ? "LANJUTKAN KE POIN PENTING ⬇️" : "LANJUTKAN ⬇️",
  };

  return (
    <BingkaiTahap tahap={6} className="space-y-3">
      <PitaTahap ikon="✏️" nama="ABSTRACT" cara="Kata dan angka" warna="#1C01A5" />
      <div className="flex items-center gap-1.5" aria-label={`Langkah ${Math.min(indeks + 1, langkahTotal)} dari ${langkahTotal}`}>
        {Array.from({ length: langkahTotal }, (_, i) => (
          <span key={i} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      {poin ? (
        <PoinPentingB4
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "kalimat" ? <KartuKalimat {...dasar} /> : null}
          {kartu.tipe === "angka" ? <KartuAngka {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}