"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { KERTAS_ANGKA, PilihAngka, TOMBOL_KECIL, TOTAL_GAME, type PropsLangkah } from "./SubBabA2Penjumlahan";
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
import { sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { PilihKata, RefleksiBab7 } from "./ukur-7-dasar";
import { BendaSvg, TabelMendatar, TabelMenurun, Turus, WARNA_TITIK, tebar, type JenisBenda } from "./data-8-dasar";
import { LangkahIsiDaftar, LangkahPesanan, LangkahRapikan, LangkahTurus } from "./SubBabA8Concrete";
import { KartuBarisKolom, KartuKelompokTitik, KartuUbahTabel } from "./SubBabA8Picture";

/* ------------------------------------------------------------------------ */
/* Bab 8 Sub-Bab A: Mengelompokkan Data (Buku Siswa Kelas 1 hlm. 221-228).    */
/* Semua di klien, tanpa API.                                                 */
/* Naskah: naskah/mtk-1-bab8-sub-a-mengelompokkan-data.md                     */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Rapikan Toko Mainan (seret), 2 Hitung dan Turus (ketuk),      */
/*            3 Isi Daftar Bola (seret kartu angka), 4 Pesanan Paman          */
/*            (seret ke keranjang).                                           */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Kelompokkan Titik, 6 Baris dan Kolom, 7 Menurun jadi          */
/*            Mendatar.                                                       */
/*  Abstract: 8 Baca Tabel, 9 Teka-Teki Data, 10 Kanvas Guratan dan Suara.    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman mengelompokkan data. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_A8 = [
  {
    ikon: "🔁",
    nama: "Cek jumlahnya",
    ket: "jumlah data = banyak benda",
    suara: "Setelah menghitung, periksa jumlahnya. Jumlah semua data harus sama dengan banyak benda yang kamu hitung.",
  },
  {
    ikon: "➡️",
    nama: "Daftar jadi tabel",
    ket: "data yang sama, bentuk berbeda",
    suara: "Data dalam daftar bisa dipindahkan ke tabel. Tabel bisa menurun atau mendatar, dan datanya tetap sama.",
  },
];

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

function BarisIkon({ j, n, kelas = "h-5 w-5" }: { j: JenisBenda; n: number; kelas?: string }) {
  return (
    <span className="flex flex-wrap items-center gap-0.5" role="img" aria-label={`${n} gambar`}>
      {Array.from({ length: n }, (_, i) => (
        <BendaSvg key={i} jenis={j} kelas={kelas} />
      ))}
    </span>
  );
}

function BerantakanRapi() {
  const campur: JenisBenda[] = ["pesawat", "bola", "mobil", "boneka", "bola", "pesawat", "boneka", "mobil", "pesawat", "bola"];
  const pos = tebar(campur.length, 120, 80, 3);
  return (
    <div className="grid grid-cols-2 gap-1.5">
      <div className="space-y-0.5 rounded-2xl border-4 border-[#DC2626] bg-white px-1 py-1">
        <p className="text-center text-xs font-black text-[#7F1D1D]">✘ berantakan</p>
        <div className="relative mx-auto w-full" style={{ height: 96 }} role="img" aria-label="Mainan berantakan">
          {campur.map((j, i) => (
            <span key={i} className="absolute block" style={{ left: `${((pos[i].x + 10) / 140) * 100}%`, top: pos[i].y + 4, transform: `translate(-50%, 0) rotate(${pos[i].rot}deg)` }}>
              <BendaSvg jenis={j} kelas="h-6 w-6" />
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-0.5 rounded-2xl border-4 border-[#16A34A] bg-white px-1 py-1">
        <p className="text-center text-xs font-black text-[#14532D]">✔ rapi</p>
        <div className="grid grid-cols-2 gap-1 px-1" role="img" aria-label="Mainan dikelompokkan di rak">
          {(
            [
              ["pesawat", 3],
              ["bola", 3],
              ["mobil", 2],
              ["boneka", 2],
            ] as [JenisBenda, number][]
          ).map(([j, n]) => (
            <span key={j} className="flex items-center justify-center rounded-lg bg-[#FDE9C4] py-1">
              <BarisIkon j={j} n={n} kelas="h-5 w-5" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function InfografisDataA({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Mengelompokkan Data</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="DATA ITU APA?"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Pesawat, boneka, bola, dan mobil-mobilan adalah contoh data. Data adalah keterangan tentang benda, misalnya jenisnya dan banyaknya. Kita mendapatkan data dengan mengamati dan menghitung. Data bisa dikelompokkan dan bisa ditulis dalam daftar supaya mudah dibaca."
      >
        <div className="flex items-center justify-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {(["pesawat", "mobil", "boneka", "bola"] as JenisBenda[]).map((j) => (
            <BendaSvg key={j} jenis={j} kelas="h-12 w-12" />
          ))}
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-sm font-black leading-snug text-[#1C01A5]">Data = keterangan hasil mengamati dan menghitung</p>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="BERANTAKAN ATAU RAPI?"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Lihat dua gambar ini. Di sebelah kiri, mainan berantakan sehingga sulit dihitung. Di sebelah kanan, mainan yang sama dikelompokkan di tempat yang sama sehingga mudah dihitung. Mengelompokkan membuat data menjadi mudah dibaca."
      >
        <BerantakanRapi />
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="DAFTAR MAINAN DI TOKO"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Ini daftar mainan di toko Paman. Ada dua belas pesawat. Ada delapan mobil-mobilan. Ada sepuluh boneka. Ada enam bola. Pesawat paling banyak dan bola paling sedikit. Daftar membuat data mudah dibaca."
      >
        <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <p className="text-center text-xs font-black text-[#1C01A5]/70">Daftar Mainan di Toko</p>
          {(
            [
              ["pesawat", 12],
              ["mobil", 8],
              ["boneka", 10],
              ["bola", 6],
            ] as [JenisBenda, number][]
          ).map(([j, n], i) => (
            <div key={j} className={`rounded-xl px-1.5 py-1 ${i % 2 ? "bg-[#F5F3FF]" : "bg-[#EDE9FE]"}`}>
              <p className="text-xs font-black text-[#1C01A5]">
                Ada {n} {j === "mobil" ? "mobil-mobilan" : j}.
              </p>
              <BarisIkon j={j} n={n} kelas="h-4 w-4" />
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="MENGHITUNG DENGAN TURUS"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Turus membantu kita menghitung tanpa lupa. Setiap benda diberi satu goresan tegak. Setiap lima goresan, goresan kelima dicoret miring sehingga menjadi satu kelompok lima. Merah tujuh, satu kelompok lima ditambah dua goresan. Kuning empat. Hijau enam, satu kelompok lima ditambah satu goresan."
      >
        <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {(
            [
              ["merah", 7],
              ["kuning", 4],
              ["hijau", 6],
            ] as [string, number][]
          ).map(([w, n]) => (
            <div key={w} className="flex items-center gap-2 rounded-xl bg-[#F5F3FF] px-1.5 py-1">
              <span className="block h-5 w-5 shrink-0 rounded-full border-2 border-[#1C01A5]" style={{ backgroundColor: WARNA_TITIK[w] }} />
              <span className="w-14 shrink-0 text-xs font-black text-[#1C01A5]">{w}</span>
              <span className="min-w-0 flex-1">
                <Turus n={n} tinggi={24} />
              </span>
              <span className="w-6 text-right text-xl font-black text-[#1C01A5]">{n}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">4 goresan tegak + 1 goresan miring = 5</p>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="PALING BANYAK, PALING SEDIKIT"
        warna="#B45309"
        speakGuru={speakGuru}
        suara="Bola yang paling banyak berwarna merah, banyaknya ada tujuh. Bola yang paling sedikit berwarna kuning, banyaknya ada empat. Bola hijau ada enam, jadi tidak paling banyak dan tidak paling sedikit. Kita membandingkan banyaknya untuk mencari yang paling banyak dan paling sedikit."
      >
        <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {(
            [
              ["merah", 7, "paling banyak"],
              ["kuning", 4, "paling sedikit"],
              ["hijau", 6, ""],
            ] as [string, number, string][]
          ).map(([w, n, ket]) => (
            <div key={w} className="flex items-center gap-1.5">
              <span className="w-12 shrink-0 text-xs font-black text-[#1C01A5]">{w}</span>
              <span className="flex min-w-0 flex-1 items-center gap-0.5">
                {Array.from({ length: n }, (_, i) => (
                  <span key={i} className="block h-4 w-4 rounded-full border-2 border-[#1C01A5]" style={{ backgroundColor: WARNA_TITIK[w] }} />
                ))}
              </span>
              <span className={`w-20 shrink-0 text-right text-[11px] font-black leading-tight ${ket ? "text-[#B45309]" : "text-transparent"}`}>{ket || "-"}</span>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="TABEL: BARIS DAN KOLOM"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Tabel terdiri dari baris dan kolom. Baris berjalan ke samping. Pada tabel ini, baris kuning berwarna emas. Kolom berjalan ke bawah. Kolom banyaknya berwarna kuning muda. Kotak tempat baris dan kolom bertemu berisi banyaknya, misalnya empat bola kuning."
      >
        <TabelMenurun judul="Tabel Banyak Bola" kepala={["Warna Bola", "Banyaknya"]} baris={[["Merah", 7], ["Kuning", 4], ["Hijau", 6]]} sorotBaris={1} sorotKolom={1} />
        <div className="grid grid-cols-2 gap-1.5">
          <p className="rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-1 text-center text-xs font-black text-[#1C01A5]">baris ➡ ke samping</p>
          <p className="rounded-xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-1 py-1 text-center text-xs font-black text-[#1C01A5]">kolom ⬇ ke bawah</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="CARA MEMBACA TABEL"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Cara membaca tabel. Pertama, baca judul data, untuk tahu tabel ini tentang apa. Kedua, lihat benda yang didata, yaitu nama setiap baris. Ketiga, lihat banyak setiap data, yaitu angka di sebelahnya. Tabel banyak bola ini berisi merah tujuh, kuning empat, dan hijau enam."
      >
        <TabelMenurun judul="Tabel Banyak Bola" kepala={["Warna Bola", "Banyaknya"]} baris={[["Merah", 7], ["Kuning", 4], ["Hijau", 6]]} kecil />
        <ol className="space-y-1">
          {["Judul data: tabel ini tentang apa", "Benda yang didata: nama setiap baris", "Banyak setiap data: angka di sebelahnya"].map((t, i) => (
            <li key={t} className="flex items-center gap-2 rounded-xl border-4 border-[#1C01A5] bg-white px-2 py-1 text-xs font-black text-[#1C01A5]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFE566] text-sm">{i + 1}</span>
              {t}
            </li>
          ))}
        </ol>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="TABEL MENURUN DAN MENDATAR"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Tabel A bentuknya menurun, nama warna berada satu di bawah yang lain. Tabel B bentuknya mendatar, nama warna berjajar ke samping. Datanya sama, yaitu merah tujuh, kuning empat, dan hijau enam. Kita boleh memilih bentuk tabel yang paling mudah dibaca."
      >
        <TabelMenurun judul="Tabel A (menurun)" kepala={["Warna Bola", "Banyaknya"]} baris={[["Merah", 7], ["Kuning", 4], ["Hijau", 6]]} kecil />
        <TabelMendatar judul="Tabel B (mendatar)" labelNama="Warna Bola" labelBanyak="Banyaknya" nama={["Merah", "Kuning", "Hijau"]} nilai={[7, 4, 6]} kecil />
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="PERTANYAAN UNTUK DATA"
        warna="#0E7490"
        speakGuru={speakGuru}
        suara="Dari satu tabel, kita bisa menanyakan banyak hal. Ada berapa bola merah? Jawabannya tujuh. Bola apa yang paling banyak? Merah. Mana yang lebih banyak, bola merah atau bola hijau, dan selisihnya berapa? Merah, selisihnya satu. Berapa jumlah semua bola? Tujuh ditambah empat ditambah enam sama dengan tujuh belas."
      >
        <div className="space-y-1">
          {[
            ["Ada berapa bola merah?", "7"],
            ["Bola apa yang paling banyak?", "merah"],
            ["Merah dan hijau, selisihnya?", "7 – 6 = 1"],
            ["Berapa jumlah semua bola?", "7 + 4 + 6 = 17"],
          ].map(([t, j]) => (
            <div key={t} className="flex items-center justify-between gap-2 rounded-xl border-4 border-[#1C01A5] bg-white px-2 py-1">
              <span className="min-w-0 text-xs font-black leading-tight text-[#1C01A5]">{t}</span>
              <span className="shrink-0 rounded-lg bg-[#FFE566] px-2 py-0.5 text-sm font-black text-[#1C01A5]">{j}</span>
            </div>
          ))}
        </div>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_A8.map((i) => (
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

type TipeConcrete = "rapikan" | "turus" | "daftar" | "pesanan";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "rapikan" },
  { nomor: 2, tipe: "turus" },
  { nomor: 3, tipe: "daftar" },
  { nomor: 4, tipe: "pesanan" },
];

export function ConcreteDataA(props: Umum) {
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
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Seret, ketuk, dan hitung!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span key={l.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "rapikan" ? <LangkahRapikan {...dasar} /> : null}
        {langkah.tipe === "turus" ? <LangkahTurus {...dasar} /> : null}
        {langkah.tipe === "daftar" ? <LangkahIsiDaftar {...dasar} /> : null}
        {langkah.tipe === "pesanan" ? <LangkahPesanan {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Diagram polos saja. Tidak ada gambar benda.              */
/* ------------------------------------------------------------------------ */

type TipePicture = "titik" | "barisKolom" | "ubah";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "titik" },
  { nomor: 6, tipe: "barisKolom" },
  { nomor: 7, tipe: "ubah" },
];

export function PictureDataA(props: Umum) {
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
        {kartu.tipe === "titik" ? <KartuKelompokTitik {...dasar} /> : null}
        {kartu.tipe === "barisKolom" ? <KartuBarisKolom {...dasar} /> : null}
        {kartu.tipe === "ubah" ? <KartuUbahTabel {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Baca Tabel ----------------------------------------- */

type RondeBaca = {
  arah: "menurun" | "mendatar";
  judul: string;
  kepala: [string, string];
  baris: [string, number][];
  tanya: string;
  tipe: "angka" | "kata";
  jawab: number | string;
  bantu: string;
};

const MAINAN: [string, number][] = [
  ["Boneka", 3],
  ["Gasing", 5],
  ["Kelereng", 4],
  ["Bola", 6],
];
const KUE: [string, number][] = [
  ["Kue Talam", 5],
  ["Kue Cucur", 3],
  ["Kue Lapis", 5],
  ["Kue Bugis", 6],
];
const ALAT: [string, number][] = [
  ["Pensil", 7],
  ["Pensil warna", 5],
  ["Penghapus", 2],
  ["Penggaris", 3],
];

const RONDE_BACA: RondeBaca[] = [
  { arah: "menurun", judul: "Tabel Mainan Kesukaan", kepala: ["Mainan", "Banyak anak"], baris: MAINAN, tanya: "Ada berapa anak yang suka bola?", tipe: "angka", jawab: 6, bantu: "Cari baris Bola, lalu baca angka pada kolom Banyak anak." },
  { arah: "mendatar", judul: "Tabel Mainan Kesukaan", kepala: ["Mainan", "Banyak anak"], baris: MAINAN, tanya: "Mainan apa yang paling disukai?", tipe: "kata", jawab: "Bola", bantu: "Cari angka yang paling besar, lalu lihat nama mainan di atasnya." },
  { arah: "menurun", judul: "Tabel Kue Kesukaan", kepala: ["Nama Kue", "Banyak anak"], baris: KUE, tanya: "Kue apa yang paling sedikit disukai?", tipe: "kata", jawab: "Kue Cucur", bantu: "Cari angka yang paling kecil, lalu lihat nama kue di sebelahnya." },
  { arah: "mendatar", judul: "Tabel Kue Kesukaan", kepala: ["Nama Kue", "Banyak anak"], baris: KUE, tanya: "Ada berapa anak yang suka kue talam?", tipe: "angka", jawab: 5, bantu: "Cari kolom Kue Talam, lalu baca angka pada baris Banyak anak." },
  { arah: "menurun", judul: "Tabel Alat Tulis", kepala: ["Alat Tulis", "Banyaknya"], baris: ALAT, tanya: "Alat tulis apa yang paling sedikit?", tipe: "kata", jawab: "Penghapus", bantu: "Cari angka yang paling kecil, lalu lihat nama alat tulisnya." },
];

function RondeBacaTabel({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_BACA[ronde];
  const akhir = ronde === RONDE_BACA.length - 1;
  const total = d.baris.reduce((a, b) => a + b[1], 0);
  const [salahAngka, setSalahAngka] = useState<number | null>(null);
  const [salahKata, setSalahKata] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["a8-baca-tabel"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.tanya.replace("?", "")} adalah ${typeof d.jawab === "number" ? sebut(d.jawab) : d.jawab}.${akhir ? ` Jumlah semua alat tulis ada ${sebut(total)}.` : ""}`);

  const selesai = () => {
    setKabar(null);
    setBeres(true);
    letusan.picu();
    onBeres();
  };
  const pilihAngka = (v: number) => {
    if (beres) return;
    if (v === d.jawab) {
      setSalahAngka(null);
      selesai();
    } else {
      setSalahAngka(v);
      setKabar({ teks: d.bantu, ok: false });
    }
  };
  const pilihKata = (t: string) => {
    if (beres) return;
    if (t === d.jawab) {
      setSalahKata(null);
      selesai();
    } else {
      setSalahKata(t);
      setKabar({ teks: d.bantu, ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semua" : suara ? "Hebat!" : beres ? "Bacaanmu tepat!" : "Baca tabelnya"}
        teks={`Baca tabelnya baik-baik. ${d.tanya}${akhir ? " Di akhir, ucapkan jumlah semua alat tulis." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        {d.arah === "menurun" ? (
          <TabelMenurun judul={d.judul} kepala={d.kepala} baris={d.baris} kecil />
        ) : (
          <TabelMendatar judul={d.judul} labelNama={d.kepala[0]} labelBanyak={d.kepala[1]} nama={d.baris.map((b) => b[0])} nilai={d.baris.map((b) => b[1])} kecil />
        )}
        {!beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">{d.tanya}</p>
            {d.tipe === "angka" ? (
              <PilihAngka opsi={opsiSekitar(d.jawab as number)} keliru={salahAngka} onPilih={pilihAngka} />
            ) : (
              <PilihKata opsi={d.baris.map((b) => b[0])} keliru={salahKata} onPilih={pilihKata} kolom={2} kecil />
            )}
          </div>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Jumlah semua alat tulis = ?" : `Jawabannya: ${d.jawab}`}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuBacaTabel({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_BACA[RONDE_BACA.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Baca Tabel"
      warna="#BBF7D0"
      petunjuk="Membaca tabel menurun dan tabel mendatar. Lihat tabelnya, lalu pilih jawaban pertanyaan tentang banyaknya, yang paling banyak, atau yang paling sedikit. Pada soal terakhir, ucapkan jumlah semua alat tulis."
      speakGuru={speakGuru}
      panel={panel}
      id="a8-baca-tabel"
      jumlahRonde={RONDE_BACA.length}
      kunciAkhir={terakhir.baris.reduce((a, b) => a + b[1], 0)}
      belumSiap="Baca dan jawab dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBacaTabel ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Teka-Teki Data ------------------------------------- */

type Hubungan = { dari: number; op: "+" | "-"; k: number };
type RondeTeka = { judul: string; kepala: [string, string]; baris: [string, number][]; petunjuk: string[]; hubungan: Hubungan[] };

const RONDE_TEKA: RondeTeka[] = [
  {
    judul: "Tabel Mainan Toko",
    kepala: ["Mainan", "Banyaknya"],
    baris: [
      ["Pesawat", 6],
      ["Mobil-mobilan", 4],
      ["Boneka", 7],
    ],
    petunjuk: ["Ada 6 pesawat.", "Mobil-mobilan 2 kurangnya dari pesawat.", "Boneka 3 lebihnya dari mobil-mobilan."],
    hubungan: [
      { dari: 0, op: "-", k: 2 },
      { dari: 1, op: "+", k: 3 },
    ],
  },
  {
    judul: "Tabel Hewan Pak Budi",
    kepala: ["Hewan", "Banyaknya"],
    baris: [
      ["Ayam", 5],
      ["Bebek", 2],
      ["Kelinci", 6],
    ],
    petunjuk: ["Ada 5 ayam.", "Bebek 3 kurangnya dari ayam.", "Kelinci 1 lebihnya dari ayam."],
    hubungan: [
      { dari: 0, op: "-", k: 3 },
      { dari: 0, op: "+", k: 1 },
    ],
  },
  {
    judul: "Tabel Buah-buahan",
    kepala: ["Buah", "Banyaknya"],
    baris: [
      ["Apel", 4],
      ["Jeruk", 7],
      ["Mangga", 5],
    ],
    petunjuk: ["Ada 4 apel.", "Jeruk 3 lebihnya dari apel.", "Mangga 2 kurangnya dari jeruk."],
    hubungan: [
      { dari: 0, op: "+", k: 3 },
      { dari: 1, op: "-", k: 2 },
    ],
  },
];

function RondeTekaData({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TEKA[ronde];
  const akhir = ronde === RONDE_TEKA.length - 1;
  const total = d.baris.reduce((a, b) => a + b[1], 0);
  const [langkah, setLangkah] = useState(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = langkah >= 3;
  const suara = panel.suara["a8-teka-data"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.petunjuk.join(" ")} Jumlah semua adalah ${sebut(total)}.`);

  const kunci = langkah < 2 ? d.baris[langkah + 1][1] : total;

  const pilih = (v: number) => {
    if (beres) return;
    if (v === kunci) {
      setSalah(null);
      setKabar(null);
      const berikut = langkah + 1;
      setLangkah(berikut);
      if (berikut >= 3) {
        letusan.picu();
        onBeres();
      }
    } else {
      setSalah(v);
      setKabar({
        teks:
          langkah < 2
            ? (() => {
                const h = d.hubungan[langkah];
                return `Baca petunjuknya lagi. ${d.baris[h.dari][0]} ada ${sebut(d.baris[h.dari][1])}. ${h.op === "+" ? "Kata lebihnya berarti ditambah." : "Kata kurangnya berarti dikurangi."}`;
              })()
            : "Jumlahkan semua angka pada tabel satu per satu.",
        ok: false,
      });
    }
  };

  const tampil = d.baris.map(([a, b], i) => [a, i <= Math.min(langkah, 2) ? b : "?"] as [string, number | string]);

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semua" : suara ? "Hebat!" : beres ? "Tekamu terpecahkan!" : "Isi tabel dari petunjuk"}
        teks={`Baca petunjuknya. ${d.petunjuk.join(" ")} Isi tabel satu per satu, lalu cari jumlah semuanya.${akhir ? " Di akhir, ucapkan jumlah semuanya." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="space-y-0.5 rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-base font-black leading-snug text-[#1C01A5]">
          {d.petunjuk.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <TabelMenurun judul={d.judul} kepala={d.kepala} baris={tampil} kecil />
        {!beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">{langkah < 2 ? `Banyaknya ${d.baris[langkah + 1][0].toLowerCase()} = ?` : "Jumlah semuanya = ?"}</p>
            <PilihAngka opsi={opsiSekitar(kunci)} keliru={salah} onPilih={pilih} />
          </div>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Jumlah semuanya = ?" : `Jumlah semuanya = ${total}`}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuTekaData({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_TEKA[RONDE_TEKA.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Teka-Teki Data"
      warna="#FDE68A"
      petunjuk="Isi tabel dari petunjuk. Kata lebihnya berarti ditambah dan kata kurangnya berarti dikurangi. Isi banyaknya satu per satu, lalu cari jumlah semuanya. Pada soal terakhir, ucapkan jumlah semuanya."
      speakGuru={speakGuru}
      panel={panel}
      id="a8-teka-data"
      jumlahRonde={RONDE_TEKA.length}
      kunciAkhir={terakhir.baris.reduce((a, b) => a + b[1], 0)}
      belumSiap="Isi tabelnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTekaData ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara -------------------------- */

const KARTU_DATA = [
  { judul: "Pita Wei", nama: ["Merah", "Biru", "Kuning"], nilai: [3, 2, 4] },
  { judul: "Buku Tika", nama: ["Cerita", "Gambar", "Dongeng"], nilai: [5, 4, 3] },
  { judul: "Kancing Kira", nama: ["Merah", "Putih", "Hijau"], nilai: [6, 5, 7] },
];

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<(typeof KARTU_DATA)[number] | null>(null);
  const [lulus, setLulus] = useState(false);
  const n = tahap === 0 ? 17 : pilih ? pilih.nilai.reduce((a, b) => a + b, 0) : null;
  const id = tahap === 0 ? "a8-tulis-0" : `a8-tulis-1-${pilih?.judul ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(
    suara && n !== null,
    n !== null ? `Jumlah semuanya ${kata(n).toLowerCase()}. Sekarang guratkan angkanya di kanvas.` : ""
  );

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Jumlahkan semua data pada tabel, ucapkan hasilnya, lalu guratkan angkanya di kanvas. Setelah itu, pilih sendiri satu tabel data.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Berapa jumlah semua bola?" : n === null ? "Pilih satu tabel" : "Ucapkan jumlahnya"}
          teks={
            tahap === 0
              ? "Tabel banyak bola berisi merah tujuh, kuning empat, dan hijau enam. Berapa jumlah semua bola? Ucapkan jumlahnya, lalu guratkan lambangnya di kanvas."
              : "Ayo mencoba. Pilih satu tabel data. Jumlahkan semua data pada tabel itu, ucapkan jumlahnya, lalu guratkan lambangnya di kanvas."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 0 ? (
            <>
              <TabelMendatar judul="Tabel Banyak Bola" labelNama="Warna Bola" labelBanyak="Banyaknya" nama={["Merah", "Kuning", "Hijau"]} nilai={[7, 4, 6]} kecil />
              <p className="text-center text-xl font-black text-[#1C01A5]">Jumlah semua bola: {suara && n !== null ? `${n} (${kata(n)})` : "?"}</p>
            </>
          ) : pilih === null ? (
            <div className="space-y-2">
              <p className="text-center text-sm font-black text-[#1C01A5]">Pilih satu tabel data.</p>
              <div className="grid grid-cols-3 gap-2">
                {KARTU_DATA.map((k) => (
                  <button
                    key={k.judul}
                    type="button"
                    aria-label={`Pilih ${k.judul}, ${k.nilai.join(", ")}`}
                    onClick={() => setPilih(k)}
                    className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-2 text-center shadow-[0_4px_0_rgba(28,1,165,0.25)]"
                  >
                    <span className="block text-sm font-black leading-tight text-[#1C01A5]">{k.judul}</span>
                    <span className="block text-2xl font-black text-[#1C01A5]">{k.nilai.join(" ")}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <TabelMendatar judul={`Tabel ${pilih.judul}`} labelNama="Jenis" labelBanyak="Banyaknya" nama={pilih.nama} nilai={pilih.nilai} kecil />
              <p className="text-center text-xl font-black text-[#1C01A5]">Jumlah semuanya: {suara && n !== null ? `${n} (${kata(n)})` : "?"}</p>
            </>
          )}
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
  "Ingat selalu! Data adalah keterangan hasil mengamati dan menghitung. Kelompokkan benda yang sama supaya mudah dihitung. Tulis data dalam daftar, atau catat dengan turus. Sajikan data dalam tabel yang punya judul, baris, dan kolom. Baris berjalan ke samping dan kolom berjalan ke bawah. Tabel bisa menurun atau mendatar dengan data yang sama. Dari tabel kita bisa membaca yang paling banyak, yang paling sedikit, dan jumlah semuanya.";

const POIN_A8: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "🧺",
    nama: "Mengelompokkan data",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">benda yang sama di tempat yang sama</p>,
    suara: "Mengelompokkan berarti menaruh benda yang sama di tempat yang sama, supaya mudah dihitung dan dibaca.",
  },
  {
    ikon: "📝",
    nama: "Daftar",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">Ada 12 pesawat • Ada 8 mobil-mobilan</p>,
    suara: "Daftar menulis data dengan kalimat. Contohnya, ada dua belas pesawat dan ada delapan mobil-mobilan.",
  },
  {
    ikon: "✏️",
    nama: "Turus",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">1 benda = 1 goresan, lima dicoret miring</p>,
    suara: "Turus membantu menghitung. Satu benda satu goresan, dan setiap lima goresan dicoret miring.",
  },
  {
    ikon: "📋",
    nama: "Tabel: baris dan kolom",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">baris ke samping • kolom ke bawah</p>,
    suara: "Tabel terdiri dari baris dan kolom. Baris berjalan ke samping. Kolom berjalan ke bawah.",
  },
  {
    ikon: "↔️",
    nama: "Menurun dan mendatar",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">bentuk berbeda, data sama</p>,
    suara: "Tabel bisa menurun atau mendatar. Bentuknya berbeda tetapi datanya sama. Pilih yang paling mudah kamu baca.",
  },
  {
    ikon: "🔍",
    nama: "Membaca data",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">paling banyak • paling sedikit • jumlah</p>,
    suara: "Dari tabel kita bisa mencari yang paling banyak, yang paling sedikit, selisihnya, dan jumlah semuanya.",
  },
];

const REFLEKSI_A8 = [
  "Aku sudah bisa mengelompokkan data.",
  "Aku sudah bisa membuat daftar dan tabel.",
  "Aku aktif berdiskusi.",
  "Aku bertanya jika belum mengerti.",
  "Aku belajar dengan hati senang.",
  "Aku belajar dengan tertib.",
];

function PoinPentingA8({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_A8.map((p) => (
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
            aria-label="Dengarkan: Cara menyebutkan data"
            onClick={() => speakGuru("Cara menyebutkan data. Ada tujuh bola merah. Bola merah paling banyak.")}
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
              { teks: "Ada", warna: "#FFFFFF" },
              { teks: "tujuh", warna: "#FFF7CC" },
              { teks: "bola merah", warna: "#FECACA" },
              { teks: "paling banyak", warna: "#BBF7D0" },
            ].map((k) => (
              <span key={k.teks} className="rounded-full border-4 border-[#1C01A5] px-3 py-0.5 text-base font-black text-[#1C01A5]" style={{ backgroundColor: k.warna }}>
                {k.teks}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-1 rounded-3xl border-4 border-dashed border-[#16A34A] bg-white px-3 py-2">
          <p className="flex items-center gap-2 text-base font-black text-[#14532D]">
            <span className="text-3xl" aria-hidden="true">
              🏠
            </span>
            Ayo Mencoba dan Ayo Bermain
          </p>
          <p className="text-sm font-black leading-snug text-[#14532D]">
            Ayo Mencoba: buatlah daftar alat tulis milikmu, yaitu pensil, pensil warna, penghapus, dan penggaris. Tulis banyaknya, lalu cari alat tulis yang paling banyak dan yang paling sedikit.
          </p>
          <p className="text-sm font-black leading-snug text-[#14532D]">
            Ayo Bermain: duduklah berkelompok dengan empat temanmu. Kumpulkan mainan yang kalian punya, lalu isi tabel data mainan berisi boneka, kelereng, mobil-mobilan, dan banyaknya.
          </p>
        </div>
        <RefleksiBab7 items={REFLEKSI_A8} speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB A ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "baca" | "teka" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "baca" },
  { nomor: 9, tipe: "teka" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractDataA(props: Umum) {
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
        <PoinPentingA8
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "baca" ? <KartuBacaTabel {...dasar} /> : null}
          {kartu.tipe === "teka" ? <KartuTekaData {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
