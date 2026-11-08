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
import { BIRU_B5, Kelereng, MERAH_B5, Pensil, sebut } from "./belas-a5-dasar";
import {
  BalokSatu,
  IkatPensil,
  KantongKelereng,
  MenaraBalok,
  TabelNilai,
  kalimatNilai,
} from "./nilai-c5-dasar";
import { LangkahPapan, LangkahSortir, LangkahToko, LangkahTukar } from "./SubBabC5Concrete";
import { KartuLingkar, KartuTabel, KartuWarna } from "./SubBabC5Picture";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab C: Nilai Tempat (Buku Siswa Kelas 1 hlm. 160-164).           */
/* Semua di klien, tanpa API.                                                 */
/* Naskah: naskah/mtk-1-bab5-sub-c-nilai-tempat.md                            */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Sortir ke Papan Nilai Tempat (seret), 2 Tukar Sepuluh         */
/*            (pilih dan tukar), 3 Toko Pensil (susun pesanan),               */
/*            4 Papan Kartu Angka (taruh kartu).                              */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Warnai Puluhan dan Satuan, 6 Lingkari Puluhan,                */
/*            7 Pilih Tabel yang Cocok.                                       */
/*  Abstract: 8 Mesin Digit (atur puluhan dan satuan), 9 Detektif Nilai       */
/*            Angka, 10 Kanvas Guratan dan Suara.                             */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman nilai tempat puluhan dan satuan. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_C5 = [
  {
    ikon: "🎀",
    nama: "Sepuluh jadi satu puluhan",
    ket: "10 benda digabung = 1 puluhan",
    suara: "Sepuluh benda yang digabungkan disebut satu puluhan. Benda yang tidak ikut digabung disebut satuan.",
  },
  {
    ikon: "👈",
    nama: "Kiri puluhan, kanan satuan",
    ket: "Baca angka dari kiri ke kanan",
    suara: "Pada bilangan dua angka, angka di sebelah kiri menunjukkan puluhan dan angka di sebelah kanan menunjukkan satuan.",
  },
];

const KOTAK_ANGKA = "flex h-14 w-12 items-center justify-center rounded-2xl border-4 border-[#1C01A5] text-3xl font-black text-[#1C01A5]";

/** Dua bingkai sepuluh tegak, statis. Bingkai pertama merah penuh (puluhan), bingkai kedua biru sebagian (satuan). */
function BingkaiTegak({ satuan }: { satuan: number }) {
  const fx = [14, 100];
  return (
    <svg viewBox="0 0 186 150" className="mx-auto block h-auto w-full max-w-[220px]" role="img" aria-label={`Dua bingkai sepuluh tegak: satu bingkai penuh dan satu bingkai berisi ${satuan}`}>
      {[0, 1].map((f) => (
        <g key={f}>
          <rect x={fx[f]} y="6" width="72" height="130" rx="4" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.6" />
          <path d={`M${fx[f] + 36} 6 V136 M${fx[f]} 32 H${fx[f] + 72} M${fx[f]} 58 H${fx[f] + 72} M${fx[f]} 84 H${fx[f] + 72} M${fx[f]} 110 H${fx[f] + 72}`} stroke={BIRU} strokeWidth="1.2" opacity="0.4" />
          {Array.from({ length: 10 }, (_, i) => {
            const aktif = f === 0 || i < satuan;
            return aktif ? (
              <circle key={i} cx={fx[f] + 18 + (i % 2) * 36} cy={19 + Math.floor(i / 2) * 26} r="10" fill={f === 0 ? MERAH_B5 : BIRU_B5} stroke={BIRU} strokeWidth="1.8" />
            ) : null;
          })}
          <text x={fx[f] + 36} y="148" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={f === 0 ? "#B91C1C" : "#1D4ED8"}>
            {f === 0 ? "1 puluhan" : `${satuan} satuan`}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

export function InfografisNilaiC({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Puluhan dan Satuan</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="SEPULUH BENDA = 1 PULUHAN"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Sepuluh benda yang digabungkan disebut satu puluhan. Sepuluh pensil yang diikat adalah satu puluhan. Sepuluh kelereng dalam satu kantong adalah satu puluhan. Sepuluh balok yang disusun menjadi satu menara juga satu puluhan."
      >
        <div className="grid grid-cols-3 items-end gap-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-3 text-center">
          <div className="flex flex-col items-center gap-1">
            <IkatPensil kelas="h-16 w-[4.5rem]" />
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]">10 pensil diikat</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <KantongKelereng kelas="h-16 w-16" />
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]">10 kelereng dalam kantong</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <MenaraBalok kelas="h-20 w-8" />
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]">10 balok disusun</p>
          </div>
        </div>
        <p className="text-center text-xl font-black text-[#B91C1C]">Semuanya = 1 puluhan</p>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="SATUAN: BENDA YANG SENDIRIAN"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Satu benda yang berdiri sendiri disebut satu satuan. Lima kelereng yang lepas adalah lima satuan. Banyak satuan selalu kurang dari sepuluh, karena sepuluh satuan digabung menjadi satu puluhan."
      >
        <div className="flex items-end justify-center gap-4 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          <div className="text-center">
            <Pensil warna={1} kelas="mx-auto h-14 w-5" />
            <p className="text-[11px] font-black text-[#1C01A5]">1 pensil</p>
          </div>
          <div className="text-center">
            <Kelereng warna={0} kelas="mx-auto h-10 w-10" />
            <p className="text-[11px] font-black text-[#1C01A5]">1 kelereng</p>
          </div>
          <div className="text-center">
            <BalokSatu kelas="mx-auto h-10 w-14" />
            <p className="text-[11px] font-black text-[#1C01A5]">1 balok</p>
          </div>
        </div>
        <p className="text-center text-xl font-black text-[#1D4ED8]">Masing-masing = 1 satuan</p>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="TABEL NILAI TEMPAT"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Ini tabel nilai tempat. Tabel ini punya dua kolom, puluhan di kiri dan satuan di kanan. Halim punya lima belas kelereng. Sepuluh kelereng dalam kantong adalah satu puluhan. Lima kelereng yang lepas adalah lima satuan. Nilai tempat lima belas adalah satu puluhan dan lima satuan."
      >
        <div className="flex items-center justify-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          <div className="text-center">
            <KantongKelereng kelas="mx-auto h-14 w-14" />
            <p className="text-[10px] font-black text-[#B91C1C]">1 puluhan</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              {[1, 2, 3, 4, 5].map((w) => (
                <Kelereng key={w} warna={w} kelas="h-6 w-6" />
              ))}
            </div>
            <p className="text-[10px] font-black text-[#1D4ED8]">5 satuan</p>
          </div>
          <span className="text-2xl font-black text-[#B45309]">➡</span>
          <TabelNilai puluhan={1} satuan={5} kecil kelas="max-w-[120px]" />
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-base font-black text-[#1C01A5]">Nilai tempat 15 = 1 puluhan dan 5 satuan</p>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="TIGA BENDA, TIGA TABEL"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Cara yang sama berlaku untuk benda apa pun. Lima belas kelereng: satu kantong dan lima kelereng lepas. Tiga belas pensil: satu ikat dan tiga pensil lepas. Empat belas balok: satu menara dan empat balok lepas. Semuanya satu puluhan, dengan satuan yang berbeda."
      >
        <div className="grid grid-cols-3 gap-1">
          {[
            { judul: "15 kelereng", isi: <KantongKelereng kelas="mx-auto h-12 w-12" />, p: 1, s: 5 },
            { judul: "13 pensil", isi: <IkatPensil kelas="mx-auto h-12 w-14" />, p: 1, s: 3 },
            { judul: "14 balok", isi: <MenaraBalok kelas="mx-auto h-14 w-6" />, p: 1, s: 4 },
          ].map((k) => (
            <div key={k.judul} className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-0.5 py-1.5">
              <p className="text-center text-[11px] font-black text-[#1C01A5]">{k.judul}</p>
              <div className="flex h-16 items-end justify-center">{k.isi}</div>
              <TabelNilai puluhan={k.p} satuan={k.s} kecil kelas="max-w-[92px]" />
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="BACA ANGKANYA"
        warna="#B45309"
        speakGuru={speakGuru}
        suara="Bilangan sebelas sampai sembilan belas ditulis dengan dua angka. Angka di sebelah kiri menunjukkan banyak puluhan. Angka di sebelah kanan menunjukkan banyak satuan. Pada tiga belas, angka satu berarti satu puluhan, dan angka tiga berarti tiga satuan. Pada tujuh belas, angka satu berarti satu puluhan, dan angka tujuh berarti tujuh satuan."
      >
        <div className="grid grid-cols-2 gap-2">
          {[
            { n: "13", p: 1, s: 3 },
            { n: "17", p: 1, s: 7 },
          ].map((c) => (
            <div key={c.n} className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="flex h-14 w-12 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FECACA] text-4xl font-black text-[#1C01A5]">{c.p}</span>
                <span className="flex h-14 w-12 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#BFDBFE] text-4xl font-black text-[#1C01A5]">{c.s}</span>
              </div>
              <p className="text-[11px] font-black leading-tight text-[#B91C1C]">{c.p} puluhan</p>
              <p className="text-[11px] font-black leading-tight text-[#1D4ED8]">{c.s} satuan</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="NILAI TEMPAT 10 SAMPAI 20"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Ini tabel nilai tempat sepuluh sampai dua puluh. Sepuluh adalah satu puluhan dan nol satuan. Sebelas sampai sembilan belas semuanya satu puluhan, dengan satuan satu sampai sembilan. Dua puluh adalah dua puluhan dan nol satuan."
      >
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          <div className="grid grid-cols-3 bg-[#E9D8F3] px-1 py-1 text-center text-[11px] font-black text-[#1C01A5]">
            <span>Bilangan</span>
            <span>Puluhan</span>
            <span>Satuan</span>
          </div>
          {Array.from({ length: 11 }, (_, i) => {
            const n = 10 + i;
            return (
              <div key={n} className={`grid grid-cols-3 items-center px-1 py-0.5 text-center ${i % 2 ? "bg-[#F5F3FF]" : "bg-white"}`}>
                <span className="text-lg font-black text-[#1C01A5]">{n}</span>
                <span className="text-lg font-black text-[#B91C1C]">{n === 20 ? 2 : 1}</span>
                <span className="text-lg font-black text-[#1D4ED8]">{n === 20 ? 0 : n - 10}</span>
              </div>
            );
          })}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="TULIS KALIMATNYA"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Kita menulis nilai tempat dengan kalimat. Satu puluhan dan tiga satuan sama dengan tiga belas. Puluhan dan satuan digabung menjadi satu bilangan. Satu puluhan itu sepuluh, jadi tiga belas sama dengan sepuluh ditambah tiga."
      >
        <div className="space-y-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {[
              { t: "1 puluhan", w: "#FECACA" },
              { t: "dan", w: "#FFFFFF" },
              { t: "3 satuan", w: "#BFDBFE" },
              { t: "=", w: "#FFFFFF" },
              { t: "13", w: "#FFE566" },
            ].map((k) => (
              <span key={k.t} className="rounded-full border-4 border-[#1C01A5] px-3 py-0.5 text-lg font-black text-[#1C01A5]" style={{ backgroundColor: k.w }}>
                {k.t}
              </span>
            ))}
          </div>
          <p className="text-center text-2xl font-black text-[#1C01A5]">13 = 10 + 3</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="ANGKA SAMA, NILAI BERBEDA"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Perhatikan sebelas. Ada dua angka satu, tetapi nilainya berbeda. Angka satu di sebelah kiri ada di tempat puluhan, jadi nilainya sepuluh. Angka satu di sebelah kanan ada di tempat satuan, jadi nilainya satu. Nilai sebuah angka bergantung pada tempatnya. Pada dua puluh, angka dua ada di tempat puluhan, jadi nilainya dua puluh."
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="flex h-14 w-12 items-center justify-center rounded-2xl border-4 border-[#B91C1C] bg-[#FECACA] text-4xl font-black text-[#1C01A5]">1</span>
              <span className="flex h-14 w-12 items-center justify-center rounded-2xl border-4 border-[#1D4ED8] bg-[#BFDBFE] text-4xl font-black text-[#1C01A5]">1</span>
            </div>
            <p className="text-[11px] font-black leading-tight text-[#B91C1C]">kiri: 1 puluhan = 10</p>
            <p className="text-[11px] font-black leading-tight text-[#1D4ED8]">kanan: 1 satuan = 1</p>
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="flex h-14 w-12 items-center justify-center rounded-2xl border-4 border-[#B91C1C] bg-[#FECACA] text-4xl font-black text-[#1C01A5]">2</span>
              <span className="flex h-14 w-12 items-center justify-center rounded-2xl border-4 border-[#1D4ED8] bg-[#BFDBFE] text-4xl font-black text-[#1C01A5]">0</span>
            </div>
            <p className="text-[11px] font-black leading-tight text-[#B91C1C]">kiri: 2 puluhan = 20</p>
            <p className="text-[11px] font-black leading-tight text-[#1D4ED8]">kanan: 0 satuan = 0</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="BINGKAI SEPULUH TEGAK"
        warna="#0E7490"
        speakGuru={speakGuru}
        suara="Bingkai sepuluh juga bisa menunjukkan nilai tempat. Satu bingkai yang penuh adalah satu puluhan. Bingkai yang satunya berisi satuan. Di sini ada satu bingkai penuh dan empat lingkaran di bingkai kedua. Satu puluhan dan empat satuan sama dengan empat belas."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <BingkaiTegak satuan={4} />
          <p className="text-center text-xl font-black text-[#1C01A5]">1 puluhan dan 4 satuan = 14</p>
        </div>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_C5.map((i) => (
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

type TipeConcrete = "sortir" | "tukar" | "toko" | "papan";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "sortir" },
  { nomor: 2, tipe: "tukar" },
  { nomor: 3, tipe: "toko" },
  { nomor: 4, tipe: "papan" },
];

export function ConcreteNilaiC(props: Umum) {
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
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pegang, pilah, dan tukar!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span key={l.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "sortir" ? <LangkahSortir {...dasar} /> : null}
        {langkah.tipe === "tukar" ? <LangkahTukar {...dasar} /> : null}
        {langkah.tipe === "toko" ? <LangkahToko {...dasar} /> : null}
        {langkah.tipe === "papan" ? <LangkahPapan {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Diagram polos saja. Tidak ada gambar benda.              */
/* ------------------------------------------------------------------------ */

type TipePicture = "warna" | "lingkar" | "tabel";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "warna" },
  { nomor: 6, tipe: "lingkar" },
  { nomor: 7, tipe: "tabel" },
];

export function PictureNilaiC(props: Umum) {
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
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat diagram dan warnai" warna="#B45309" />
      <div className="flex items-center gap-1.5" aria-label={`Kartu ${indeks + 1} dari ${KARTU_PICTURE.length}`}>
        {KARTU_PICTURE.map((k, i) => (
          <span key={k.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={kartu.tipe} className="space-y-3">
        {kartu.tipe === "warna" ? <KartuWarna {...dasar} /> : null}
        {kartu.tipe === "lingkar" ? <KartuLingkar {...dasar} /> : null}
        {kartu.tipe === "tabel" ? <KartuTabel {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Mesin Digit --------------------------------------- */

const RONDE_MESIN: { soal: string; p: number; s: number; suara: string }[] = [
  { soal: "Nilai tempat lima belas", p: 1, s: 5, suara: "nilai tempat lima belas" },
  { soal: "Nilai tempat 10 + 8", p: 1, s: 8, suara: "nilai tempat sepuluh ditambah delapan" },
  { soal: "Nilai tempat sepuluh", p: 1, s: 0, suara: "nilai tempat sepuluh" },
  { soal: "Nilai tempat dua puluh", p: 2, s: 0, suara: "nilai tempat dua puluh" },
  { soal: "Nilai tempat 19", p: 1, s: 9, suara: "nilai tempat sembilan belas" },
];

function Roda({
  judul,
  nilai,
  maks,
  warna,
  onUbah,
  keliru,
}: {
  judul: string;
  nilai: number;
  maks: number;
  warna: string;
  onUbah: (v: number) => void;
  keliru: boolean;
}) {
  return (
    <div className={`flex flex-col items-center gap-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 ${keliru ? "igil-goyang" : ""}`}>
      <p className="w-full rounded-lg py-0.5 text-center text-sm font-black text-[#1C01A5]" style={{ backgroundColor: warna }}>
        {judul}
      </p>
      <button
        type="button"
        aria-label={`Tambah ${judul}`}
        disabled={nilai >= maks}
        onClick={() => onUbah(nilai + 1)}
        className="h-11 w-16 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] text-2xl font-black text-[#1C01A5] disabled:opacity-40"
      >
        ▲
      </button>
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFFDF2] text-5xl font-black text-[#1C01A5]" aria-label={`${judul} sekarang ${nilai}`}>
        {nilai}
      </span>
      <button
        type="button"
        aria-label={`Kurangi ${judul}`}
        disabled={nilai <= 0}
        onClick={() => onUbah(nilai - 1)}
        className="h-11 w-16 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] text-2xl font-black text-[#1C01A5] disabled:opacity-40"
      >
        ▼
      </button>
    </div>
  );
}

function RondeMesin({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_MESIN[ronde];
  const akhir = ronde === RONDE_MESIN.length - 1;
  const [p, setP] = useState(0);
  const [s, setS] = useState(0);
  const [salah, setSalah] = useState<"p" | "s" | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["c5-mesin"] === true && akhir;
  useBicara(akhir ? suara : beres, `${kalimatNilai(d.p, d.s).replace("=", "sama dengan")}.`);

  const periksa = () => {
    if (beres) return;
    if (p === d.p && s === d.s) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
      return;
    }
    setSalah(p !== d.p ? "p" : "s");
    setKabar({
      teks:
        p !== d.p
          ? "Periksa kolom puluhan. Angka kiri menunjukkan banyak puluhan, yaitu banyak kelompok sepuluh."
          : "Periksa kolom satuan. Angka kanan menunjukkan benda yang tersisa di luar kelompok sepuluh.",
      ok: false,
    });
  };

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: bilangannya" : suara ? "Hebat!" : beres ? "Mesinmu tepat!" : "Atur puluhan dan satuan"}
        teks={`Atur mesin digit untuk ${d.suara}. Tekan panah atas atau bawah untuk mengubah angka puluhan dan angka satuan. Lalu tekan Periksa.${akhir ? " Di akhir, ucapkan bilangannya." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-center text-lg font-black leading-snug text-[#1C01A5]">🎯 {d.soal}</p>
        <div className="grid grid-cols-2 gap-2">
          <Roda
            judul="Puluhan"
            nilai={p}
            maks={2}
            warna="#FECACA"
            onUbah={(v) => {
              if (beres) return;
              setP(v);
              setSalah(null);
              setKabar(null);
            }}
            keliru={salah === "p"}
          />
          <Roda
            judul="Satuan"
            nilai={s}
            maks={9}
            warna="#BFDBFE"
            onUbah={(v) => {
              if (beres) return;
              setS(v);
              setSalah(null);
              setKabar(null);
            }}
            keliru={salah === "s"}
          />
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {akhir && !suara ? `${d.p} puluhan dan ${d.s} satuan = ?` : kalimatNilai(d.p, d.s)}
          </p>
        ) : (
          <button
            type="button"
            onClick={periksa}
            className="mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-2 text-base font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]"
          >
            ✔ Periksa
          </button>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuMesin({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_MESIN[RONDE_MESIN.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Mesin Digit"
      warna="#BBF7D0"
      petunjuk="Atur mesin digit sesuai soal. Angka kiri adalah puluhan dan angka kanan adalah satuan. Tekan panah atas dan bawah, lalu tekan Periksa. Soal bisa berupa nama bilangan atau penjumlahan sepuluh. Pada soal terakhir, ucapkan bilangannya."
      speakGuru={speakGuru}
      panel={panel}
      id="c5-mesin"
      jumlahRonde={RONDE_MESIN.length}
      kunciAkhir={terakhir.p * 10 + terakhir.s}
      belumSiap="Atur mesinnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeMesin ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Detektif Nilai Angka ------------------------------ */

const RONDE_NILAI: { n: number; sisi: "kiri" | "kanan"; jawab: number; opsi: number[]; alasan: string }[] = [
  { n: 13, sisi: "kiri", jawab: 10, opsi: [1, 10, 13], alasan: "Angka 1 di kiri ada di tempat puluhan, jadi 1 puluhan sama dengan 10." },
  { n: 14, sisi: "kanan", jawab: 4, opsi: [4, 10, 14], alasan: "Angka 4 di kanan ada di tempat satuan, jadi nilainya 4 satuan, yaitu 4." },
  { n: 11, sisi: "kanan", jawab: 1, opsi: [1, 10, 11], alasan: "Angka 1 di kanan ada di tempat satuan, jadi nilainya 1." },
  { n: 20, sisi: "kiri", jawab: 20, opsi: [2, 10, 20], alasan: "Angka 2 di kiri ada di tempat puluhan, jadi 2 puluhan sama dengan 20." },
  { n: 12, sisi: "kiri", jawab: 10, opsi: [1, 10, 12], alasan: "Angka 1 di kiri ada di tempat puluhan, jadi 1 puluhan sama dengan 10." },
];

function RondeNilai({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_NILAI[ronde];
  const akhir = ronde === RONDE_NILAI.length - 1;
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["c5-nilai"] === true && akhir;
  const digit = String(d.n).split("");
  const kiri = d.sisi === "kiri";
  useBicara(akhir ? suara : beres, d.alasan);

  const pilih = (v: number) => {
    if (beres) return;
    if (v === d.jawab) {
      setKeliru(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(v);
      setKabar({
        teks: kiri
          ? "Angka di kiri ada di tempat puluhan. Nilainya sebanyak puluhan itu, dikali sepuluh."
          : "Angka di kanan ada di tempat satuan. Nilainya sama dengan angka itu sendiri.",
        ok: false,
      });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: nilai angka itu" : suara ? "Hebat!" : beres ? "Kamu detektif hebat!" : "Berapa nilai angka yang ditandai?"}
        teks={`Lihat bilangan ini: ${sebut(d.n)}. Angka di sebelah ${d.sisi} diberi tanda. Berapa nilai angka yang ditandai? Ingat, kiri adalah puluhan dan kanan adalah satuan.${akhir ? " Setelah ketemu, ucapkan nilainya." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="flex items-start justify-center gap-2">
          {digit.map((g, i) => {
            const ditandai = (kiri && i === 0) || (!kiri && i === 1);
            return (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span
                  className={`${KOTAK_ANGKA} h-16 w-14 text-5xl ${ditandai ? "bg-[#FFE566] ring-4 ring-[#F0AB00]" : "bg-white"}`}
                  aria-label={`Angka ${g}${ditandai ? ", ditandai" : ""}`}
                >
                  {g}
                </span>
                <span className="text-[11px] font-black text-[#1C01A5]/80">{i === 0 ? "kiri" : "kanan"}</span>
              </div>
            );
          })}
        </div>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-center text-base font-black leading-snug text-[#1C01A5]">
          🔎 Angka yang ditandai bernilai...
        </p>
        <PilihAngka opsi={d.opsi} keliru={keliru} onPilih={pilih} mati={beres} />
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Nilainya: ?" : d.alasan}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuNilai({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_NILAI[RONDE_NILAI.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Detektif Nilai Angka"
      warna="#FDE68A"
      petunjuk="Lihat bilangan dua angka. Satu angka diberi tanda. Tentukan nilai angka itu. Angka di kiri berada di tempat puluhan, angka di kanan berada di tempat satuan. Pada soal terakhir, ucapkan nilainya."
      speakGuru={speakGuru}
      panel={panel}
      id="c5-nilai"
      jumlahRonde={RONDE_NILAI.length}
      kunciAkhir={terakhir.jawab}
      belumSiap="Temukan nilai angkanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeNilai ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara ------------------------- */

type SoalTulis = { id: string; p: number; s: number };
const AWAL_TULIS: SoalTulis = { id: "awal", p: 1, s: 4 };
const PILIHAN_TULIS: SoalTulis[] = [
  { id: "enam-belas", p: 1, s: 6 },
  { id: "sembilan-belas", p: 1, s: 9 },
  { id: "dua-puluh", p: 2, s: 0 },
];

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<string | null>(null);
  const [lulus, setLulus] = useState(false);
  const pil = PILIHAN_TULIS.find((x) => x.id === pilih) ?? null;
  const soal: SoalTulis | null = tahap === 0 ? AWAL_TULIS : pil;
  const n = soal ? soal.p * 10 + soal.s : null;
  const id = tahap === 0 ? "c5-tulis-0" : `c5-tulis-1-${pilih ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(suara && n !== null, n !== null ? `${kata(n)}. Lambangnya ${n}. Sekarang guratkan angkanya di kanvas.` : "");

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Baca nilai tempatnya, ucapkan bilangannya, lalu guratkan angkanya di kanvas. Setelah itu, pilih nilai tempatmu sendiri.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Baca dan ucapkan bilangannya" : soal ? "Ucapkan bilangannya" : "Pilih satu nilai tempat"}
          teks={
            tahap === 0
              ? "Lihat tabel nilai tempat ini: satu puluhan dan empat satuan. Bilangan apa itu? Ucapkan bilangannya, lalu guratkan lambangnya di kanvas."
              : "Ayo mencoba. Pilih satu nilai tempat sesukamu. Ucapkan bilangannya, lalu guratkan lambangnya di kanvas."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 1 && pilih === null ? (
            <div className="grid grid-cols-1 gap-2">
              {PILIHAN_TULIS.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  aria-label={`Pilih ${x.p} puluhan dan ${x.s} satuan`}
                  onClick={() => setPilih(x.id)}
                  className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 py-3 text-xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]"
                >
                  {x.p} puluhan dan {x.s} satuan
                </button>
              ))}
            </div>
          ) : soal ? (
            <>
              <TabelNilai puluhan={soal.p} satuan={soal.s} />
              <p className="text-center text-2xl font-black text-[#1C01A5]">
                {soal.p} puluhan dan {soal.s} satuan = {suara && n !== null ? n : "?"}
              </p>
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
  "Ingat selalu! Sepuluh benda yang digabungkan disebut satu puluhan. Benda yang sendirian disebut satuan. Pada tabel nilai tempat, puluhan ada di kiri dan satuan ada di kanan. Angka di kiri menunjukkan puluhan, angka di kanan menunjukkan satuan. Tulis nilai tempat dengan kalimat, misalnya satu puluhan dan tiga satuan sama dengan tiga belas. Angka yang sama bisa bernilai berbeda, tergantung tempatnya.";

const POIN_C5: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "🎀",
    nama: "Satu puluhan",
    isi: <p className="text-center text-xl font-black text-[#1C01A5]">10 benda digabung = 1 puluhan</p>,
    suara: "Sepuluh benda yang digabungkan disebut satu puluhan. Contohnya sepuluh pensil yang diikat.",
  },
  {
    ikon: "☝️",
    nama: "Satuan",
    isi: <p className="text-center text-xl font-black text-[#1C01A5]">1 benda sendirian = 1 satuan</p>,
    suara: "Satu benda yang berdiri sendiri disebut satu satuan. Lima benda lepas adalah lima satuan.",
  },
  {
    ikon: "📋",
    nama: "Tabel nilai tempat",
    isi: <TabelNilai puluhan={1} satuan={5} kecil kelas="max-w-[170px]" />,
    suara: "Tabel nilai tempat punya kolom puluhan di kiri dan kolom satuan di kanan. Pada lima belas, ada satu puluhan dan lima satuan.",
  },
  {
    ikon: "🔍",
    nama: "Baca angkanya",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">13: angka 1 = puluhan, angka 3 = satuan</p>,
    suara: "Pada tiga belas, angka satu di kiri berarti satu puluhan, dan angka tiga di kanan berarti tiga satuan.",
  },
  {
    ikon: "✍️",
    nama: "Tulis kalimatnya",
    isi: <p className="text-center text-lg font-black text-[#1C01A5]">1 puluhan dan 3 satuan = 13</p>,
    suara: "Satu puluhan dan tiga satuan sama dengan tiga belas. Itu sama dengan sepuluh ditambah tiga.",
  },
  {
    ikon: "⚖️",
    nama: "Angka sama, tempat beda",
    isi: <p className="text-center text-lg font-black text-[#1C01A5]">11: kiri = 10, kanan = 1</p>,
    suara: "Pada sebelas, angka satu di kiri bernilai sepuluh, dan angka satu di kanan bernilai satu. Nilai angka bergantung pada tempatnya.",
  },
];

const REFLEKSI = [
  "Aku tahu sepuluh benda yang digabung disebut satu puluhan.",
  "Aku bisa mengisi tabel nilai tempat.",
  "Aku bisa membaca puluhan dan satuan dari sebuah bilangan.",
  "Aku tahu angka yang sama bisa bernilai berbeda.",
];

function Refleksi({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [iya, setIya] = useState<boolean[]>(() => REFLEKSI.map(() => false));
  return (
    <div className="space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-[#F5F3FF] px-2 py-2">
      <p className="text-center text-base font-black text-[#1C01A5]">📝 Refleksiku</p>
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

function PoinPentingC5({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_C5.map((p) => (
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
            aria-label="Dengarkan: Cara menyebutkan nilai tempat"
            onClick={() => speakGuru("Cara menyebutkan nilai tempat. Nilai tempat lima belas adalah satu puluhan dan lima satuan.")}
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
              { teks: "Nilai tempat 15", warna: "#FFFFFF" },
              { teks: "adalah", warna: "#FFFFFF" },
              { teks: "1 puluhan", warna: "#FECACA" },
              { teks: "dan", warna: "#FFFFFF" },
              { teks: "5 satuan", warna: "#BFDBFE" },
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
            Ayo Bermain di rumah: ambil benda yang ada, misalnya pensil warna atau lidi. Ambil sepuluh lalu ikat. Hitung benda yang tidak diikat. Tulis hasilnya: puluhan dan satuan sama dengan berapa. Lalu ceritakan hasilnya kepada temanmu.
          </p>
        </div>
        <Refleksi speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB C ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "mesin" | "nilai" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "mesin" },
  { nomor: 9, tipe: "nilai" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractNilaiC(props: Umum) {
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
        <PoinPentingC5
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "mesin" ? <KartuMesin {...dasar} /> : null}
          {kartu.tipe === "nilai" ? <KartuNilai {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
