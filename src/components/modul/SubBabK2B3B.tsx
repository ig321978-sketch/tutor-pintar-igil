"use client";

import React from "react";
import { type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, KotakPoster, PoinK2B2 } from "./kit-k2b2";
import { BIRU, PotongSvg, TangramSvg } from "./dasar-k2b3";
import { FiguraUrai, KotakKecil } from "./kit-k2b3";
import { IsiKalimatGame, IsiTabel, Sortir, type BinSortir, type ItemSortir } from "./permainan-k2b3";
import {
  GABUNGAN_B,
  RONDE_GARIS_B,
  RONDE_HITUNG_B,
  RONDE_KALIMAT_B,
  RONDE_KOMPOSIT_B,
  RONDE_POLA_B,
  RONDE_SORTIR_B,
  SEGITIGA_DASAR_B,
  jalurTitik,
  namaSegi,
  poligonBeraturan,
  type Ruas,
  type Titik,
} from "./data-k2b3";
import { SUB_B3 } from "./naskah-k2b3";
import { LangkahBongkarK2B3B, LangkahDuaSegitigaK2B3B, LangkahGuntingK2B3B, LangkahSusunK2B3B } from "./SubBabK2B3BConcrete";
import { KartuGarisK2B3B, KartuHitungK2B3B, KartuKompositK2B3B } from "./SubBabK2B3BPicture";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 3 Sub-Bab B: Mengurai dan Menyusun Bangun Datar. Poster          */
/* Infografis (sepuluh panel dari naskah), tiga permainan Abstract, dan        */
/* pembungkus tiga tahap permainan. Tanpa API.                                 */
/* Naskah: naskah/mtk-2-bab3-sub-b-mengurai-menyusun-bangun-datar.md           */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman mengurai dan menyusun bangun datar. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const PERSEGI: Titik[] = [[14, 14], [86, 14], [86, 86], [14, 86]];
const PERSEGI_8: Titik[] = [[14, 14], [50, 14], [86, 14], [86, 50], [86, 86], [50, 86], [14, 86], [14, 50]];

/** Poligon beraturan dengan diagonal dari pojok pertama. */
function dariPojok(n: number): { titik: Titik[]; ruas: Ruas[] } {
  return { titik: poligonBeraturan(n, 50, 50, 44), ruas: Array.from({ length: Math.max(0, n - 3) }, (_, i) => [0, i + 2] as Ruas) };
}
/** Poligon beraturan dengan garis dari titik tengah ke tiap pojok. */
function dariTengah(n: number): { titik: Titik[]; ruas: Ruas[] } {
  return { titik: [...poligonBeraturan(n, 50, 50, 44), [50, 50] as Titik], ruas: Array.from({ length: n }, (_, i) => [i, n] as Ruas) };
}

function Panah() {
  return (
    <span className="flex items-center justify-center text-3xl font-black text-[#1C01A5]" aria-hidden="true">
      ➜
    </span>
  );
}

function visualInfografis(): React.ReactNode[] {
  const hitung1 = RONDE_HITUNG_B[1];
  const garis4 = RONDE_GARIS_B[3];
  const heks = RONDE_KOMPOSIT_B[2];
  return [
    /* 1 Mengurai Satu Bangun */
    <div key="1" className="grid grid-cols-[1fr_auto_1fr] items-center gap-1">
      <KotakKecil ket="1 persegi" warna="#FEF3C7">
        <FiguraUrai titik={PERSEGI} batas={4} ruas={[]} label="Satu persegi" kelas="h-24 w-24" />
      </KotakKecil>
      <Panah />
      <KotakKecil ket="2 segitiga" warna="#DBEAFE">
        <FiguraUrai titik={PERSEGI} batas={4} ruas={[[0, 2]]} label="Persegi diurai menjadi dua segitiga" kelas="h-24 w-24" jarak={0.14} />
      </KotakKecil>
    </div>,
    /* 2 Persegi Diurai Dua Cara */
    <div key="2" className="grid grid-cols-2 gap-2">
      <KotakKecil ket="Garis miring: 2 segitiga" warna="#DBEAFE">
        <FiguraUrai titik={PERSEGI_8} batas={8} ruas={[[0, 4]]} label="Persegi dengan garis miring" kelas="h-24 w-24" jarak={0.14} />
      </KotakKecil>
      <KotakKecil ket="Garis tengah: 2 segi empat" warna="#FCE7F3">
        <FiguraUrai titik={PERSEGI_8} batas={8} ruas={[[1, 5]]} label="Persegi dengan garis tegak di tengah" kelas="h-24 w-24" jarak={0.14} />
      </KotakKecil>
    </div>,
    /* 3 Dua Segitiga dan Satu Segi Empat */
    <div key="3" className="grid grid-cols-2 gap-2">
      <KotakKecil ket="2 segitiga + 1 segi empat" warna="#DCFCE7">
        <FiguraUrai titik={hitung1.titik} batas={hitung1.batas} ruas={hitung1.ruas} label="Persegi panjang diurai dengan dua garis" kelas="h-24 w-full" jarak={0.08} />
      </KotakKecil>
      <KotakKecil ket="2 segitiga + 2 segi empat" warna="#FEF3C7">
        <FiguraUrai titik={garis4.titik} batas={garis4.batas} ruas={garis4.solusi} label="Persegi panjang diurai dengan tiga garis" kelas="h-24 w-full" jarak={0.08} />
      </KotakKecil>
    </div>,
    /* 4 Menyusun Beberapa Bangun */
    <div key="4" className="grid grid-cols-[auto_auto_1fr] items-center justify-center gap-1.5">
      <div className="flex flex-col items-center gap-1">
        {heks.keping.map((k, i) => (
          <PotongSvg key={i} titik={k.titik} warna={["#FCA5A5", "#93C5FD", "#86EFAC"][i]} kelas="h-9 w-14" label={`Keping ${k.nama}`} />
        ))}
      </div>
      <Panah />
      <KotakKecil ket="1 segi enam memanjang" warna="#EDE9FE">
        <PotongSvg titik={heks.opsi[0].titik} warna="#C4B5FD" kelas="h-20 w-28" label="Segi enam yang memanjang" />
      </KotakKecil>
    </div>,
    /* 5 Dua Segitiga, Tiga Bentuk */
    <div key="5" className="grid grid-cols-3 gap-1.5">
      {GABUNGAN_B.map((g, i) => (
        <KotakKecil key={g.id} ket={g.nama} warna={["#DBEAFE", "#FEF3C7", "#FCE7F3"][i]}>
          <svg viewBox="-20 -50 80 100" className="h-20 w-full" role="img" aria-label={`Dua segitiga menjadi ${g.nama}`}>
            <path d={jalurTitik(SEGITIGA_DASAR_B)} fill="#F9A8D4" stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
            <path d={jalurTitik(g.keping2)} fill="#93C5FD" stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </KotakKecil>
      ))}
    </div>,
    /* 6 Cara Memengaruhi Hasil */
    <div key="6" className="grid grid-cols-2 gap-2">
      <KotakPoster warna="#FCE7F3">
        <p className="text-center text-3xl" aria-hidden="true">✂️</p>
        <p className="text-center text-sm font-black leading-tight text-[#1C01A5]">Mengurai</p>
        <p className="text-center text-xs font-black leading-tight text-[#1C01A5]/80">satu bangun, banyak cara uraian</p>
      </KotakPoster>
      <KotakPoster warna="#DBEAFE">
        <p className="text-center text-3xl" aria-hidden="true">🧩</p>
        <p className="text-center text-sm font-black leading-tight text-[#1C01A5]">Menyusun</p>
        <p className="text-center text-xs font-black leading-tight text-[#1C01A5]/80">beberapa keping, banyak cara susunan</p>
      </KotakPoster>
    </div>,
    /* 7 Segi Banyak Dibagi Jadi Segitiga */
    <div key="7" className="grid grid-cols-4 gap-1">
      {[3, 4, 5, 6].map((n) => {
        const d = dariPojok(n);
        return (
          <KotakKecil key={n} ket={`${n - 2} segitiga`} warna="#F5F3FF">
            <FiguraUrai titik={d.titik} batas={n} ruas={d.ruas} label={`${namaSegi(n)} diurai dari satu pojok`} kelas="h-14 w-14" />
          </KotakKecil>
        );
      })}
    </div>,
    /* 8 Dari Titik Tengah */
    <div key="8" className="grid grid-cols-4 gap-1">
      {[3, 4, 5, 6].map((n) => {
        const d = dariTengah(n);
        return (
          <KotakKecil key={n} ket={`${n} segitiga`} warna="#FEF3C7">
            <FiguraUrai titik={d.titik} batas={n} ruas={d.ruas} label={`${namaSegi(n)} diurai dari titik tengah`} kelas="h-14 w-14" />
          </KotakKecil>
        );
      })}
    </div>,
    /* 9 Tangram Tujuh Keping */
    <div key="9" className="flex flex-wrap items-center justify-center gap-3">
      <TangramSvg kelas="h-36 w-36" terurai={0.1} />
      <div className="space-y-0.5 text-sm font-black leading-tight text-[#1C01A5]">
        <p>5 segitiga</p>
        <p>1 persegi</p>
        <p>1 segi empat miring</p>
        <p className="text-base">= 7 keping</p>
      </div>
    </div>,
    /* 10 Aturan Bermain dan Tips */
    <div key="10" className="grid grid-cols-2 gap-1.5">
      {[
        ["✅", "Pakai semua keping"],
        ["🚫", "Tidak bertumpuk"],
        ["🤝", "Sisi saling menempel"],
        ["🔄", "Boleh diputar dan dibalik"],
      ].map(([ikon, t]) => (
        <KotakPoster key={t} warna="#F5F3FF">
          <p className="text-center text-2xl" aria-hidden="true">{ikon}</p>
          <p className="text-center text-xs font-black leading-tight text-[#1C01A5]">{t}</p>
        </KotakPoster>
      ))}
    </div>,
  ];
}

export function InfografisK2B3BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B3} judul="Mengurai dan Menyusun" suaraInfo={SUARA_INFO} visual={visualInfografis()} speakGuru={speakGuru} />;
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar benda.                 */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Isi Kalimat Uraian -------------------------------- */

function RondeKalimat({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  return (
    <>
      <CatatanPensil pendek="Lengkapi kalimat" teks="Lengkapi tiga kalimat tentang mengurai dan menyusun. Baca kalimat yang menyala, lalu pilih kartu yang tepat untuk bagian kosongnya." />
      <IsiKalimatGame kalimat={RONDE_KALIMAT_B[ronde]} onBeres={onBeres} pesanBeres="Ketiga kalimat sudah lengkap." />
    </>
  );
}

export function KartuKalimatK2B3B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Isi Kalimat Uraian"
      warna="#BBF7D0"
      petunjuk="Lengkapi kalimat tentang mengurai dan menyusun. Baca kalimat yang menyala, lalu pilih kartu yang tepat untuk bagian yang kosong."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3b-kalimat"
      jumlahRonde={RONDE_KALIMAT_B.length}
      belumSiap="Lengkapi ketiga kalimat dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKalimat ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Mengurai atau Menyusun? --------------------------- */

const BIN_B: BinSortir[] = [
  { id: "mengurai", label: "Mengurai: satu jadi banyak", ikon: "✂️", warna: "#FCE7F3" },
  { id: "menyusun", label: "Menyusun: banyak jadi satu", ikon: "🧩", warna: "#DBEAFE" },
];

function RondeSortir({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const item: ItemSortir[] = RONDE_SORTIR_B[ronde].map((k, i) => ({ id: `s${ronde}-${i}`, label: k.teks, bin: k.bin, petunjuk: k.alasan, ucapan: k.alasan }));
  return (
    <>
      <CatatanPensil pendek="Satu jadi banyak, atau banyak jadi satu?" teks="Baca tiap kalimat. Kalau satu bangun menjadi banyak bagian, itu mengurai. Kalau banyak bangun menjadi satu bentuk, itu menyusun. Seret kalimat ke kotak yang tepat, atau ketuk kalimat lalu ketuk kotaknya." />
      <Sortir item={item} bin={BIN_B} kartuTeks onBeres={onBeres} pesanBeres="Semua kalimat sudah masuk kotak yang tepat. Mengurai berarti satu menjadi banyak, menyusun berarti banyak menjadi satu." />
    </>
  );
}

export function KartuSortirK2B3B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Mengurai atau Menyusun?"
      warna="#FDE68A"
      petunjuk="Baca tiap kalimat. Satu bangun menjadi banyak bagian berarti mengurai. Banyak bangun menjadi satu bentuk berarti menyusun. Seret kalimat ke kotak yang tepat, atau ketuk kalimat lalu ketuk kotaknya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3b-sortir"
      jumlahRonde={RONDE_SORTIR_B.length}
      belumSiap="Pilah semua kalimat dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSortir ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Tabel Pola Segitiga ------------------------------ */

function RondePola({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_POLA_B[ronde];
  return (
    <>
      <CatatanPensil pendek={r.judul} teks={`${r.judul}. ${r.ket} Ketuk baris tabel, lalu ketuk kartu angka yang tepat. Cari pola dari atas ke bawah.`} />
      <IsiTabel
        kepala={["Bangun datar", "Banyak segitiga"]}
        baris={r.baris}
        kartu={r.kartu}
        petunjuk={(b) => (ronde === 0 ? `Dari satu pojok, banyak segitiga sama dengan banyak sisi dikurangi dua. ${b.label} menjadi ${b.jawab}.` : `Dari titik tengah, banyak segitiga sama dengan banyak sisinya. ${b.label} menjadi ${b.jawab}.`)}
        onBeres={onBeres}
        pesanBeres={ronde === 0 ? "Pola ditemukan: banyak segitiga sama dengan banyak sisi dikurangi dua." : "Pola ditemukan: banyak segitiga sama dengan banyak sisi."}
      />
    </>
  );
}

export function KartuPolaK2B3B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tabel Pola Segitiga"
      warna="#C7D2FE"
      petunjuk="Isi tabel pola. Ronde pertama: garis dari satu pojok. Ronde kedua: garis dari titik tengah ke setiap pojok. Ketuk baris tabel, lalu ketuk kartu angka yang tepat. Cari polanya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3b-pola"
      jumlahRonde={RONDE_POLA_B.length}
      belumSiap="Isi semua baris tabel dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePola ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus tiga tahap ------------------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [
  { nomor: 1, render: (d) => <LangkahGuntingK2B3B {...d} /> },
  { nomor: 2, render: (d) => <LangkahSusunK2B3B {...d} /> },
  { nomor: 3, render: (d) => <LangkahBongkarK2B3B {...d} /> },
  { nomor: 4, render: (d) => <LangkahDuaSegitigaK2B3B {...d} /> },
];

const KARTU_PICTURE: KartuTahap[] = [
  { nomor: 5, render: (d) => <KartuGarisK2B3B {...d} /> },
  { nomor: 6, render: (d) => <KartuKompositK2B3B {...d} /> },
  { nomor: 7, render: (d) => <KartuHitungK2B3B {...d} /> },
];

const KARTU_ABSTRACT: KartuTahap[] = [
  { nomor: 8, render: (d) => <KartuKalimatK2B3B {...d} /> },
  { nomor: 9, render: (d) => <KartuSortirK2B3B {...d} /> },
  { nomor: 10, render: (d) => <KartuPolaK2B3B {...d} /> },
];

export function ConcreteK2B3B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧸", nama: "CONCRETE", cara: "Gunting, susun, dan bongkar!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B3B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan isi", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B3B(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_B3} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />}
    />
  );
}
