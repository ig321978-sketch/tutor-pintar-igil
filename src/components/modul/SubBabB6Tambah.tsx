"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { KERTAS_ANGKA, PilihAngka, Persamaan, TOMBOL_KECIL, TOTAL_GAME, type PropsLangkah } from "./SubBabA2Penjumlahan";
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
import { BIRU } from "./CeritaBandingB";
import { BingkaiGanda, Ikatan, sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { Donat } from "./selisih-a6-dasar";
import { DeretMaju, TabelTambah } from "./tambah-b6-dasar";
import { LangkahBingkai, LangkahKembar, LangkahMaju, LangkahPensil } from "./SubBabB6Concrete";
import { KartuIkatan, KartuLompat, KartuTabel } from "./SubBabB6Picture";

/* ------------------------------------------------------------------------ */
/* Bab 6 Sub-Bab B: Penjumlahan yang Hasilnya Kurang dari 20                  */
/* (Buku Siswa Kelas 1 hlm. 182-189). Semua di klien, tanpa API.              */
/* Naskah: naskah/mtk-1-bab6-sub-b-penjumlahan-kurang-dari-20.md              */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Gabung Donat (ketuk, hitung maju), 2 Isi Bingkai Sepuluh      */
/*            (seret), 3 Ikat dan Gabung Pensil (seret), 4 Kembar Kelereng    */
/*            (seret satu kelereng).                                          */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Loncat Maju, 6 Bagan Pasangan, 7 Isi Tabel Nilai Tempat.      */
/*  Abstract: 8 Rantai Sepuluh, 9 Detektif Salah Hitung,                      */
/*            10 Kanvas Guratan dan Suara.                                    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman penjumlahan yang hasilnya kurang dari dua puluh. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_B6 = [
  {
    ikon: "🔟",
    nama: "Genapkan sepuluh dulu",
    ket: "Isi sepuluh, sisanya menyusul",
    suara: "Untuk menjumlahkan dua bilangan satuan, genapkan sepuluh dulu. Cari berapa yang dibutuhkan bilangan pertama untuk menjadi sepuluh, lalu tambahkan sisanya.",
  },
  {
    ikon: "🏷️",
    nama: "Satuan dulu, puluhan tetap",
    ket: "Tambahkan satuan dengan satuan",
    suara: "Untuk belasan ditambah satuan, tambahkan satuan dengan satuan dulu. Puluhannya tetap sama.",
  },
];

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

function BarisDonat({ n, coklat = false }: { n: number; coklat?: boolean }) {
  return (
    <span className="flex flex-wrap items-center justify-center gap-0.5" role="img" aria-label={`${n} donat`}>
      {Array.from({ length: n }, (_, i) => (
        <Donat key={i} coklat={coklat} kelas="h-7 w-7" />
      ))}
    </span>
  );
}

export function InfografisTambahB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Penjumlahan yang Hasilnya Kurang dari 20</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="GABUNGKAN DUA KELOMPOK"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Ibu mempunyai tujuh donat. Tika mempunyai enam donat. Berapakah jumlah donat Ibu dan Tika? Jumlah berarti kedua kelompok digabungkan. Tujuh ditambah enam sama dengan tiga belas."
      >
        <div className="space-y-1.5">
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Donat Ibu: 7</p>
            <BarisDonat n={7} />
          </div>
          <p className="text-center text-3xl font-black text-[#1C01A5]">+</p>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Donat Tika: 6</p>
            <BarisDonat n={6} coklat />
          </div>
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-2xl font-black text-[#1C01A5]">7 + 6 = 13</p>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="MENGHITUNG MAJU"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Cara pertama adalah menghitung maju. Mulai dari tujuh, lalu hitung maju enam kali. Delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas. Jadi tujuh ditambah enam sama dengan tiga belas."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <DeretMaju dari={7} sampai={13} />
          <p className="text-center text-sm font-black text-[#1C01A5]">mulai dari 7, maju 6 kali</p>
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-xl font-black text-[#1C01A5]">7, 8, 9, 10, 11, 12, 13</p>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="MENGHITUNG DENGAN 10"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Cara kedua adalah menghitung dengan sepuluh. Tujuh dan tiga menjadi sepuluh, jadi enam dipisah menjadi tiga dan tiga. Tujuh ditambah tiga sama dengan sepuluh. Sepuluh ditambah tiga sama dengan tiga belas."
      >
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
            <Ikatan atas={6} kiri={3} kanan={3} kelas="h-24 w-28" />
            <p className="text-center text-xs font-black text-[#1C01A5]">6 dipisah 3 dan 3</p>
          </div>
          <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <BingkaiGanda isi={13} kelas="h-14 w-full" />
            <p className="text-center text-xs font-black text-[#1C01A5]">10 dan 3</p>
          </div>
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-lg font-black text-[#1C01A5]">7 + 6 = 10 + 3 = 13</p>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="PENJUMLAHAN BERULANG"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Cara ketiga adalah penjumlahan berulang. Tujuh dipisah menjadi satu dan enam. Enam ditambah enam sama dengan dua belas. Lalu dua belas ditambah satu sama dengan tiga belas."
      >
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
            <Ikatan atas={7} kiri={1} kanan={6} kelas="h-24 w-28" />
            <p className="text-center text-xs font-black text-[#1C01A5]">7 dipisah 1 dan 6</p>
          </div>
          <div className="space-y-1.5">
            <p className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center text-lg font-black text-[#1C01A5]">6 + 6 = 12</p>
            <p className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center text-lg font-black text-[#1C01A5]">12 + 1 = 13</p>
          </div>
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Enam dan enam kembar, jadi mudah dijumlahkan.</p>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="PASANGAN BILANGAN"
        warna="#B45309"
        speakGuru={speakGuru}
        suara="Untuk puluhan dengan satuan, kita pakai pasangan bilangan. Upe punya dua belas pensil dan Malosi punya tiga pensil. Dua belas dipisah menjadi sepuluh dan dua. Dua ditambah tiga sama dengan lima. Sepuluh ditambah lima sama dengan lima belas."
      >
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
            <Ikatan atas={12} kiri={10} kanan={2} kelas="h-24 w-28" />
            <p className="text-center text-xs font-black text-[#1C01A5]">12 dipisah 10 dan 2</p>
          </div>
          <div className="space-y-1.5">
            <p className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center text-lg font-black text-[#1C01A5]">2 + 3 = 5</p>
            <p className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center text-lg font-black text-[#1C01A5]">10 + 5 = 15</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="NILAI TEMPAT"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Dengan nilai tempat, dua belas adalah satu puluhan dan dua satuan. Tambahkan satuannya, dua ditambah tiga sama dengan lima. Puluhannya tetap satu. Jadi dua belas ditambah tiga sama dengan lima belas."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <TabelTambah a={12} b={3} puluhHasil={1} satuHasil={5} />
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]">Satuan: 2 + 3 = 5 • Puluhan tetap 1</p>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="PILIH CARA TERMUDAH"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Pilih cara yang paling mudah menurutmu. Sembilan ditambah dua mudah dengan menghitung maju. Delapan ditambah enam mudah dengan menggenapkan sepuluh. Enam ditambah tujuh mudah dengan penjumlahan berulang karena hampir kembar. Empat belas ditambah tiga mudah dengan pasangan bilangan atau nilai tempat."
      >
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          {[
            ["9 + 2", "menghitung maju", "yang ditambah kecil"],
            ["8 + 6", "menggenapkan sepuluh", "8 hampir sepuluh"],
            ["6 + 7", "penjumlahan berulang", "hampir kembar"],
            ["14 + 3", "pasangan atau nilai tempat", "ada puluhan"],
          ].map(([s, cara, ket], i) => (
            <div key={s} className={`flex items-center gap-2 px-2 py-1 ${i % 2 ? "bg-[#F0FDF4]" : "bg-white"}`}>
              <span className="w-16 shrink-0 text-lg font-black text-[#B91C1C]">{s}</span>
              <span className="min-w-0">
                <span className="block text-sm font-black leading-tight text-[#1C01A5]">{cara}</span>
                <span className="block text-[11px] font-black leading-tight text-[#1C01A5]/70">{ket}</span>
              </span>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="SEPULUH DITAMBAH SATUAN"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Sepuluh ditambah satuan itu mudah. Sepuluh ditambah lima sama dengan lima belas. Sepuluh ditambah tiga sama dengan tiga belas. Sepuluh ditambah tujuh sama dengan tujuh belas. Angka satuannya tinggal ditulis di samping angka satu."
      >
        <div className="grid grid-cols-3 gap-1.5">
          {["10 + 5 = 15", "10 + 3 = 13", "10 + 7 = 17"].map((k) => (
            <p key={k} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-0.5 py-3 text-center text-base font-black leading-tight text-[#1C01A5]">
              {k}
            </p>
          ))}
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Satuannya tinggal ditulis di samping angka 1.</p>
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="KATA PENJUMLAHAN"
        warna="#0E7490"
        speakGuru={speakGuru}
        suara="Kata-kata ini menandakan penjumlahan: jumlah, ditambah, digabungkan, semuanya, dan datang lagi. Contohnya, ada dua belas anak ayam mencari makan. Datang lagi tiga anak ayam. Jumlah semuanya dua belas ditambah tiga sama dengan lima belas."
      >
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {["jumlah", "ditambah", "digabungkan", "semuanya", "datang lagi"].map((k) => (
            <span key={k} className="rounded-full border-4 border-[#1C01A5] bg-[#FFF7CC] px-3 py-0.5 text-base font-black text-[#1C01A5]">
              {k}
            </span>
          ))}
        </div>
        <p className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2 text-center text-sm font-black leading-snug text-[#1C01A5]">
          12 anak ayam, datang lagi 3.
          <br />
          12 + 3 = 15
        </p>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_B6.map((i) => (
          <button
            key={i.nama}
            type="button"
            aria-label={`Dengarkan: ${i.nama}`}
            onClick={() => speakGuru(i.suara)}
            className="space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-2 py-3 text-center shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="block text-3xl" aria-hidden="true">
              {i.ikon}
            </span>
            <span className="block text-lg font-black leading-tight text-[#1C01A5]">{i.nama}</span>
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

type TipeConcrete = "maju" | "bingkai" | "pensil" | "kembar";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "maju" },
  { nomor: 2, tipe: "bingkai" },
  { nomor: 3, tipe: "pensil" },
  { nomor: 4, tipe: "kembar" },
];

export function ConcreteTambahB(props: Umum) {
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
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Hitung, isi, gabung, dan pisah!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span key={l.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "maju" ? <LangkahMaju {...dasar} /> : null}
        {langkah.tipe === "bingkai" ? <LangkahBingkai {...dasar} /> : null}
        {langkah.tipe === "pensil" ? <LangkahPensil {...dasar} /> : null}
        {langkah.tipe === "kembar" ? <LangkahKembar {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Diagram polos saja. Tidak ada gambar benda.              */
/* ------------------------------------------------------------------------ */

type TipePicture = "lompat" | "ikatan" | "tabel";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "lompat" },
  { nomor: 6, tipe: "ikatan" },
  { nomor: 7, tipe: "tabel" },
];

export function PictureTambahB(props: Umum) {
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
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat diagram dan pilih" warna="#B45309" />
      <div className="flex items-center gap-1.5" aria-label={`Kartu ${indeks + 1} dari ${KARTU_PICTURE.length}`}>
        {KARTU_PICTURE.map((k, i) => (
          <span key={k.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={kartu.tipe} className="space-y-3">
        {kartu.tipe === "lompat" ? <KartuLompat {...dasar} /> : null}
        {kartu.tipe === "ikatan" ? <KartuIkatan {...dasar} /> : null}
        {kartu.tipe === "tabel" ? <KartuTabel {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Rantai Sepuluh ------------------------------------ */

const RONDE_RANTAI: { a: number; b: number }[] = [
  { a: 7, b: 6 },
  { a: 8, b: 5 },
  { a: 9, b: 7 },
  { a: 6, b: 9 },
  { a: 8, b: 9 },
];

function RondeRantai({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { a, b } = RONDE_RANTAI[ronde];
  const akhir = ronde === RONDE_RANTAI.length - 1;
  const x = 10 - a;
  const y = b - x;
  const jumlah = a + b;
  const [tahap, setTahap] = useState(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["b6-rantai"] === true && akhir;
  const benarTahap = [x, y, jumlah];
  useBicara(
    akhir ? suara : beres,
    `${sebut(a)} membutuhkan ${sebut(x)} untuk menjadi sepuluh. ${sebut(b)} dipisah menjadi ${sebut(x)} dan ${sebut(y)}. Sepuluh ditambah ${sebut(y)} sama dengan ${sebut(jumlah)}. Jadi ${sebut(a)} ditambah ${sebut(b)} sama dengan ${sebut(jumlah)}.`
  );

  const soal = [`${a} + ? = 10`, `${b} = ${x} + ?`, `10 + ${y} = ?`];
  const petunjuk = [
    `Cari bilangan yang melengkapi ${sebut(a)} menjadi sepuluh. Hitung maju dari ${sebut(a)} sampai sepuluh.`,
    `${sebut(b)} dipisah menjadi dua bagian. Satu bagian sudah dipakai, yaitu ${sebut(x)}. Cari bagian yang lain.`,
    `Sepuluh ditambah ${sebut(y)}. Puluhannya satu dan satuannya ${sebut(y)}.`,
  ];

  const pilih = (v: number) => {
    if (beres) return;
    if (v === benarTahap[tahap]) {
      setSalah(null);
      setKabar(null);
      if (tahap === 2) {
        setBeres(true);
        letusan.picu();
        onBeres();
      } else {
        setTahap(tahap + 1);
      }
    } else {
      setSalah(v);
      setKabar({ teks: petunjuk[tahap], ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: jumlahnya" : suara ? "Hebat!" : beres ? "Rantaimu lengkap!" : "Susun rantai sepuluh"}
        teks={`Hitung ${sebut(a)} ditambah ${sebut(b)} dengan menggenapkan sepuluh. Isi langkahnya satu per satu: berapa yang melengkapi ${sebut(a)} menjadi sepuluh, bagian lainnya, lalu sepuluh ditambah sisanya.${akhir ? " Di akhir, ucapkan jumlahnya." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="space-y-1 rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-xl font-black leading-snug text-[#1C01A5]">
          <p>
            {a} + {b} = {beres && !(akhir && !suara) ? jumlah : "?"}
          </p>
          <p className={tahap >= 1 ? "" : "opacity-40"}>
            {a} + {tahap >= 1 ? x : "?"} = 10
          </p>
          <p className={tahap >= 1 ? "" : "opacity-40"}>
            {b} = {tahap >= 1 ? x : "?"} + {tahap >= 2 ? y : "?"}
          </p>
          <p className={tahap >= 2 ? "" : "opacity-40"}>
            10 + {tahap >= 2 ? y : "?"} = {beres && !(akhir && !suara) ? jumlah : "?"}
          </p>
        </div>
        {!beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              Langkah {tahap + 1} dari 3: {soal[tahap]}
            </p>
            <PilihAngka opsi={opsiSekitar(benarTahap[tahap])} keliru={salah} onPilih={pilih} />
          </div>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${a} + ${b} = 10 + ${y} = ?` : `${a} + ${b} = 10 + ${y} = ${jumlah}`}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuRantai({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_RANTAI[RONDE_RANTAI.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Rantai Sepuluh"
      warna="#BBF7D0"
      petunjuk="Hitung dengan menggenapkan sepuluh. Isi tiga langkah: berapa yang melengkapi bilangan pertama menjadi sepuluh, bagian lain dari bilangan kedua, lalu sepuluh ditambah sisanya. Pada soal terakhir, ucapkan jumlahnya."
      speakGuru={speakGuru}
      panel={panel}
      id="b6-rantai"
      jumlahRonde={RONDE_RANTAI.length}
      kunciAkhir={terakhir.a + terakhir.b}
      belumSiap="Susun rantainya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeRantai ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Detektif Salah Hitung ----------------------------- */

type RondeSalahData = { a: number; b: number; langkah: string[]; salah: number; perbaikan: string; benar: number };

const RONDE_SALAH: RondeSalahData[] = [
  { a: 12, b: 3, langkah: ["12 dipisah menjadi 10 dan 2", "2 + 3 = 5", "10 + 5 = 16"], salah: 2, perbaikan: "10 + 5 = 15", benar: 15 },
  { a: 7, b: 6, langkah: ["6 dipisah menjadi 3 dan 3", "7 + 3 = 11", "11 + 3 = 14"], salah: 1, perbaikan: "7 + 3 = 10", benar: 13 },
  { a: 14, b: 5, langkah: ["14 dipisah menjadi 10 dan 5", "5 + 5 = 10", "10 + 10 = 20"], salah: 0, perbaikan: "14 dipisah menjadi 10 dan 4", benar: 19 },
  { a: 8, b: 7, langkah: ["7 dipisah menjadi 2 dan 5", "8 + 2 = 11", "11 + 5 = 16"], salah: 1, perbaikan: "8 + 2 = 10", benar: 15 },
];

function RondeSalah({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_SALAH[ronde];
  const akhir = ronde === RONDE_SALAH.length - 1;
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [salahLangkah, setSalahLangkah] = useState<number | null>(null);
  const [salahAngka, setSalahAngka] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["b6-salah"] === true && akhir;
  useBicara(akhir ? suara : beres, `Kesalahan pertama ada di langkah ${d.salah + 1}. Yang benar adalah ${d.perbaikan}. Hasil yang benar ${sebut(d.a)} ditambah ${sebut(d.b)} adalah ${sebut(d.benar)}.`);

  const pilihLangkah = (i: number) => {
    if (tahap !== 0) return;
    if (i === d.salah) {
      setSalahLangkah(null);
      setKabar(null);
      setTahap(1);
    } else {
      setSalahLangkah(i);
      setKabar({
        teks: i < d.salah ? "Langkah ini sudah benar. Hitung ulang dan periksa langkah berikutnya." : "Ada kesalahan sebelum langkah ini. Cari kesalahan yang pertama.",
        ok: false,
      });
    }
  };

  const pilihAngka = (v: number) => {
    if (tahap !== 1 || beres) return;
    if (v === d.benar) {
      setSalahAngka(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalahAngka(v);
      setKabar({ teks: `Perbaiki langkah yang salah, lalu hitung lagi sampai akhir: ${d.perbaikan}.`, ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: hasil yang benar" : suara ? "Hebat!" : beres ? "Kamu detektif hebat!" : tahap === 0 ? "Cari kesalahan pertama" : "Berapa hasil yang benar?"}
        teks={`Tika menghitung ${d.a} ditambah ${d.b} dalam tiga langkah, tetapi ada satu kesalahan. Ketuk langkah yang salah, yaitu kesalahan yang pertama. Lalu pilih hasil yang benar.${akhir ? " Di akhir, ucapkan hasil yang benar." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="text-center text-3xl font-black text-[#1C01A5]">
          {d.a} + {d.b} = {beres && !(akhir && !suara) ? d.benar : "?"}
        </p>
        <div className="space-y-1.5">
          {d.langkah.map((t, i) => {
            const dipilihBenar = tahap === 1 && i === d.salah;
            return (
              <button
                key={`${i}-${salahLangkah === i ? "x" : "o"}`}
                type="button"
                aria-label={`Langkah ${i + 1}: ${t}`}
                onClick={() => pilihLangkah(i)}
                className={`flex w-full items-center gap-2 rounded-2xl border-4 px-2 py-2 text-left ${
                  dipilihBenar ? "border-[#E98989] bg-[#FDECEC]" : "border-[#1C01A5] bg-white"
                } ${salahLangkah === i ? "igil-goyang" : ""}`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#FFE566] text-base font-black text-[#1C01A5]">{i + 1}</span>
                <span className="min-w-0 flex-1 text-lg font-black leading-tight text-[#1C01A5]">
                  {t}
                  {dipilihBenar ? <span className="block text-sm text-[#15803D]">seharusnya: {d.perbaikan}</span> : null}
                </span>
              </button>
            );
          })}
        </div>
        {tahap === 1 && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              Hasil yang benar {d.a} + {d.b} = ?
            </p>
            <PilihAngka opsi={opsiSekitar(d.benar)} keliru={salahAngka} onPilih={pilihAngka} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${d.a} + ${d.b} = ?` : `${d.a} + ${d.b} = ${d.benar}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuSalah({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_SALAH[RONDE_SALAH.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Detektif Salah Hitung"
      warna="#FDE68A"
      petunjuk="Tika menghitung dalam tiga langkah, tetapi ada satu kesalahan. Ketuk langkah yang salah, yaitu kesalahan yang pertama. Lalu pilih hasil yang benar. Pada soal terakhir, ucapkan hasil yang benar."
      speakGuru={speakGuru}
      panel={panel}
      id="b6-salah"
      jumlahRonde={RONDE_SALAH.length}
      kunciAkhir={terakhir.benar}
      belumSiap="Cari kesalahannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSalah ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara ------------------------- */

type PasanganTulis = { id: string; a: number; b: number };
const AWAL_TULIS: PasanganTulis = { id: "awal", a: 12, b: 5 };
const PILIHAN_TULIS: PasanganTulis[] = [
  { id: "p1", a: 2, b: 13 },
  { id: "p2", a: 6, b: 12 },
  { id: "p3", a: 4, b: 15 },
];

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<string | null>(null);
  const [lulus, setLulus] = useState(false);
  const pil = PILIHAN_TULIS.find((x) => x.id === pilih) ?? null;
  const soal: PasanganTulis | null = tahap === 0 ? AWAL_TULIS : pil;
  const n = soal ? soal.a + soal.b : null;
  const id = tahap === 0 ? "b6-tulis-0" : `b6-tulis-1-${pilih ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(
    suara && n !== null && soal !== null,
    n !== null && soal ? `${sebut(soal.a)} ditambah ${sebut(soal.b)} sama dengan ${kata(n).toLowerCase()}. Sekarang guratkan angkanya di kanvas.` : ""
  );

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Jumlahkan dua bilangan, ucapkan jumlahnya, lalu guratkan angkanya di kanvas. Setelah itu, pilih dua bilangan kesukaanmu.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Berapa jumlahnya?" : soal ? "Ucapkan jumlahnya" : "Pilih dua bilangan"}
          teks={
            tahap === 0
              ? "Dua belas ditambah lima. Gunakan cara yang paling mudah menurutmu. Ucapkan jumlahnya, lalu guratkan lambangnya di kanvas."
              : "Ayo mencoba. Pilih dua bilangan yang kamu suka. Jumlahkan dengan cara yang paling mudah menurutmu. Ucapkan jumlahnya, lalu guratkan lambangnya di kanvas."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 1 && pilih === null ? (
            <div className="grid grid-cols-3 gap-2">
              {PILIHAN_TULIS.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  aria-label={`Pilih ${x.a} dan ${x.b}`}
                  onClick={() => setPilih(x.id)}
                  className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-3 text-2xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]"
                >
                  {x.a} dan {x.b}
                </button>
              ))}
            </div>
          ) : soal ? (
            <>
              <Persamaan a={soal.a} b={soal.b} c={suara && n !== null ? n : "?"} />
              <p className="text-center text-xl font-black text-[#1C01A5]">Jumlahnya: {suara && n !== null ? `${n} (${kata(n)})` : "?"}</p>
            </>
          ) : null}
        </div>
        {n !== null ? <JawabSuara id={id} jumlah={n} panel={panel} siap belumSiap="" /> : null}
        {suara && n !== null ? (
          <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
            <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
            <DottedNumberTracingCanvas key={`tulis-${id}`} digit={n} kata={kata(n)} onCompletedTrace={() => setLulus(true)} />
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

/* --------- Poin Penting --------------------------------------------------- */

const SUARA_POIN =
  "Ingat selalu! Jumlah berarti dua kelompok digabungkan. Kita bisa menghitung maju dari bilangan pertama. Kita bisa menggenapkan sepuluh dulu. Kita bisa memakai penjumlahan berulang kalau kedua bilangan hampir kembar. Untuk belasan ditambah satuan, kita pakai pasangan bilangan atau nilai tempat, yaitu satuan dengan satuan dulu dan puluhan tetap. Pilih cara yang paling mudah menurutmu.";

const POIN_B6: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "➕",
    nama: "Jumlah artinya digabung",
    isi: <p className="text-center text-2xl font-black text-[#1C01A5]">7 + 6 = 13</p>,
    suara: "Jumlah berarti dua kelompok digabungkan. Tujuh ditambah enam sama dengan tiga belas.",
  },
  {
    ikon: "🚶",
    nama: "Menghitung maju",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">7, 8, 9, 10, 11, 12, 13</p>,
    suara: "Mulai dari tujuh, hitung maju enam kali. Delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas.",
  },
  {
    ikon: "🔟",
    nama: "Genapkan sepuluh",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">7 + 3 = 10, lalu 10 + 3 = 13</p>,
    suara: "Tujuh dan tiga menjadi sepuluh. Sisanya tiga. Sepuluh ditambah tiga sama dengan tiga belas.",
  },
  {
    ikon: "👯",
    nama: "Penjumlahan berulang",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">6 + 6 = 12, lalu 12 + 1 = 13</p>,
    suara: "Tujuh dipisah menjadi satu dan enam. Enam ditambah enam sama dengan dua belas, lalu ditambah satu menjadi tiga belas.",
  },
  {
    ikon: "🧩",
    nama: "Pasangan bilangan",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">12 = 10 + 2 • 2 + 3 = 5 • 10 + 5 = 15</p>,
    suara: "Dua belas dipisah menjadi sepuluh dan dua. Dua ditambah tiga sama dengan lima. Sepuluh ditambah lima sama dengan lima belas.",
  },
  {
    ikon: "🏷️",
    nama: "Nilai tempat",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">satuan + satuan dulu • puluhan tetap</p>,
    suara: "Tambahkan satuan dengan satuan dulu. Puluhannya tetap sama. Dua belas ditambah tiga sama dengan lima belas.",
  },
];

const REFLEKSI = [
  "Aku sudah mengerti tentang lebih dari, kurang dari, dan selisih.",
  "Aku sudah bisa penjumlahan yang hasilnya kurang dari 20.",
  "Aku sudah bisa pengurangan yang hasilnya kurang dari 20.",
];

function Refleksi({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [iya, setIya] = useState<boolean[]>(() => REFLEKSI.map(() => false));
  return (
    <div className="space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-[#F5F3FF] px-2 py-2">
      <p className="text-center text-base font-black text-[#1C01A5]">📝 Catatanku</p>
      <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk kotak kalau jawabanmu iya.</p>
      {REFLEKSI.map((tx, i) => (
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
          className="flex w-full items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1 text-left"
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-4 border-[#1C01A5] text-xl ${iya[i] ? "bg-[#FFE566]" : "bg-white"}`}>{iya[i] ? "😊" : ""}</span>
          <span className="min-w-0 flex-1 text-sm font-black leading-tight text-[#1C01A5]">{tx}</span>
        </button>
      ))}
    </div>
  );
}

function PoinPentingB6({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_B6.map((p) => (
          <button
            key={p.nama}
            type="button"
            aria-label={`Dengarkan: ${p.nama}`}
            onClick={() => speakGuru(p.suara)}
            className="block w-full space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-left shadow-[0_4px_0_rgba(28,1,165,0.22)]"
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
            aria-label="Dengarkan: Cara menyebutkan penjumlahan"
            onClick={() => speakGuru("Cara menyebutkan penjumlahan. Tujuh ditambah enam sama dengan tiga belas. Jumlah donat Ibu dan Tika adalah tiga belas.")}
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
              { teks: "tujuh", warna: "#FECACA" },
              { teks: "ditambah", warna: "#FFFFFF" },
              { teks: "enam", warna: "#BFDBFE" },
              { teks: "sama dengan tiga belas", warna: "#FFF7CC" },
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
            Ayo Bermain di rumah: pilih dua bilangan yang kamu suka, misalnya 2 dan 13. Jumlahkan dengan cara yang menurutmu paling mudah, lalu jelaskan kepada temanmu atau keluargamu mengapa kamu memilih cara itu.
          </p>
        </div>
        <Refleksi speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB B ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "rantai" | "salah" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "rantai" },
  { nomor: 9, tipe: "salah" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractTambahB(props: Umum) {
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
      <PitaTahap ikon="✏️" nama="ABSTRACT" cara="Kata dan angka" warna={BIRU} />
      <div className="flex items-center gap-1.5" aria-label={`Langkah ${Math.min(indeks + 1, langkahTotal)} dari ${langkahTotal}`}>
        {Array.from({ length: langkahTotal }, (_, i) => (
          <span key={i} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      {poin ? (
        <PoinPentingB6
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "rantai" ? <KartuRantai {...dasar} /> : null}
          {kartu.tipe === "salah" ? <KartuSalah {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
